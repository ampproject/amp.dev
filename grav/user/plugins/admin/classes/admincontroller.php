<?php
namespace Grav\Plugin\Admin;

use Grav\Common\Cache;
use Grav\Common\Config\Config;
use Grav\Common\File\CompiledYamlFile;
use Grav\Common\Filesystem\Folder;
use Grav\Common\GPM\GPM as GravGPM;
use Grav\Common\GPM\Installer;
use Grav\Common\Grav;
use Grav\Common\Data;
use Grav\Common\Page\Media;
use Grav\Common\Page\Medium\Medium;
use Grav\Common\Page\Page;
use Grav\Common\Page\Pages;
use Grav\Common\Page\Collection;
use Grav\Common\User\User;
use Grav\Common\Utils;
use Grav\Common\Backup\ZipBackup;
use Grav\Plugin\Admin\Twig\AdminTwigExtension;
use Grav\Plugin\Login\TwoFactorAuth\TwoFactorAuth;
use Grav\Common\Yaml;
use RocketTheme\Toolbox\Event\Event;
use RocketTheme\Toolbox\File\File;
use RocketTheme\Toolbox\File\JsonFile;
use RocketTheme\Toolbox\ResourceLocator\UniformResourceLocator;


/**
 * Class AdminController
 *
 * @package Grav\Plugin
 */
class AdminController extends AdminBaseController
{
    /**
     * @var Grav
     */
    public $grav;

    /**
     * @var string
     */
    public $view;

    /**
     * @var string
     */
    public $task;

    /**
     * @var string
     */
    public $route;

    /**
     * @var array
     */
    public $post;

    /**
     * @var array|null
     */
    public $data;

    /**
     * @var Admin
     */
    protected $admin;

    /**
     * @var string
     */
    protected $redirect;

    /**
     * @var \Grav\Common\Uri $uri
     */
    protected $uri;

    /**
     * @var int
     */
    protected $redirectCode;

    protected $upload_errors = [
        0 => "There is no error, the file uploaded with success",
        1 => "The uploaded file exceeds the max upload size",
        2 => "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML",
        3 => "The uploaded file was only partially uploaded",
        4 => "No file was uploaded",
        6 => "Missing a temporary folder",
        7 => "Failed to write file to disk",
        8 => "A PHP extension stopped the file upload"
    ];

    /**
     * @param Grav   $grav
     * @param string $view
     * @param string $task
     * @param string $route
     * @param array  $post
     */
    public function initialize(Grav $grav = null, $view = null, $task = null, $route = null, $post = null)
    {
        $this->grav = $grav;
        $this->view = $view;
        $this->task = $task ? $task : 'display';
        if (isset($post['data'])) {
            $this->data = $this->getPost($post['data']);
            unset($post['data']);
        } else {
            // Backwards compatibility for Form plugin <= 1.2
            $this->data = $this->getPost($post);
        }
        $this->post  = $this->getPost($post);
        $this->route = $route;
        $this->admin = $this->grav['admin'];

        $this->grav->fireEvent('onAdminControllerInit', new Event(['controller' => &$this]));
    }

    /**
     * Handle login.
     *
     * @return bool True if the action was performed.
     */
    protected function taskLogin()
    {
        $this->admin->authenticate($this->data, $this->post);

        return true;
    }

    /**
     * @return bool True if the action was performed.
     */
    protected function taskTwofa()
    {
        $this->admin->twoFa($this->data, $this->post);

        return true;
    }

    /**
     * Handle logout.
     *
     * @return bool True if the action was performed.
     */
    protected function taskLogout()
    {
        $this->admin->logout($this->data, $this->post);

        return true;
    }

    /**
     * @param null $secret
     * @return bool
     */
    public function taskRegenerate2FASecret()
    {
        if (!$this->authorizeTask('regenerate 2FA Secret', ['admin.login'])) {
            return false;
        }

        try {
            /** @var User $user */
            $user = $this->grav['user'];

            /** @var TwoFactorAuth $twoFa */
            $twoFa = $this->grav['login']->twoFactorAuth();
            $secret = $twoFa->createSecret();
            $image = $twoFa->getQrImageData($user->username, $secret);

            // Save secret into the user file.
            $file = $user->file();
            if ($file->exists()) {
                $content = $file->content();
                $content['twofa_secret'] = $secret;
                $file->save($content);
                $file->free();
            }

            // Change secret in the session.
            $user->twofa_secret = $secret;

            $this->admin->json_response = ['status' => 'success', 'image' => $image, 'secret' => preg_replace('|(\w{4})|', '\\1 ', $secret)];
        } catch (\Exception $e) {
            $this->admin->json_response = ['status' => 'error', 'message' => $e->getMessage()];
            return false;
        }

        return true;
    }

    /**
     * Handle the reset password action.
     *
     * @return bool True if the action was performed.
     */
    public function taskReset()
    {
        $data = $this->data;

        if (isset($data['password'])) {
            $username = isset($data['username']) ? strip_tags(strtolower($data['username'])) : null;
            $user     = $username ? User::load($username) : null;
            $password = isset($data['password']) ? $data['password'] : null;
            $token    = isset($data['token']) ? $data['token'] : null;

            if ($user && $user->exists() && !empty($user->reset)) {
                list($good_token, $expire) = explode('::', $user->reset);

                if ($good_token === $token) {
                    if (time() > $expire) {
                        $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.RESET_LINK_EXPIRED'), 'error');
                        $this->setRedirect('/forgot');

                        return true;
                    }

                    unset($user->hashed_password, $user->reset);
                    $user->password = $password;

                    $user->validate();
                    $user->filter();
                    $user->save();

                    $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.RESET_PASSWORD_RESET'), 'info');
                    $this->setRedirect('/');

                    return true;
                }
            }

            $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.RESET_INVALID_LINK'), 'error');
            $this->setRedirect('/forgot');

            return true;

        }

        $user  = $this->grav['uri']->param('user');
        $token = $this->grav['uri']->param('token');

        if (empty($user) || empty($token)) {
            $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.RESET_INVALID_LINK'), 'error');
            $this->setRedirect('/forgot');

            return true;
        }

        $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.RESET_NEW_PASSWORD'), 'info');

        $this->admin->forgot = ['username' => $user, 'token' => $token];

        return true;
    }

    /**
     * Handle the email password recovery procedure.
     *
     * @return bool True if the action was performed.
     * @todo LOGIN
     */
    protected function taskForgot()
    {
        $param_sep = $this->grav['config']->get('system.param_sep', ':');
        $post      = $this->post;
        $data      = $this->data;
        $login     = $this->grav['login'];

        $username = isset($data['username']) ? strip_tags(strtolower($data['username'])) : '';
        $user     = !empty($username) ? User::load($username) : null;

        if (!isset($this->grav['Email'])) {
            $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.FORGOT_EMAIL_NOT_CONFIGURED'), 'error');
            $this->setRedirect($post['redirect']);

            return true;
        }

        if (!$user || !$user->exists()) {
            $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.FORGOT_INSTRUCTIONS_SENT_VIA_EMAIL'),
                'info');
            $this->setRedirect($post['redirect']);

            return true;
        }

        if (empty($user->email)) {
            $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.FORGOT_INSTRUCTIONS_SENT_VIA_EMAIL'),
                'info');
            $this->setRedirect($post['redirect']);

            return true;
        }

        $count = $this->grav['config']->get('plugins.login.max_pw_resets_count', 0);
        $interval =$this->grav['config']->get('plugins.login.max_pw_resets_interval', 2);

        if ($login->isUserRateLimited($user, 'pw_resets', $count, $interval)) {
            $this->admin->setMessage($this->admin->translate(['PLUGIN_LOGIN.FORGOT_CANNOT_RESET_IT_IS_BLOCKED', $user->email, $interval]), 'error');
            $this->setRedirect($post['redirect']);

            return true;
        }

        $token  = md5(uniqid(mt_rand(), true));
        $expire = time() + 604800; // next week

        $user->reset = $token . '::' . $expire;
        $user->save();

        $author     = $this->grav['config']->get('site.author.name', '');
        $fullname   = $user->fullname ?: $username;
        $reset_link = rtrim($this->grav['uri']->rootUrl(true), '/') . '/' . trim($this->admin->base,
                '/') . '/reset/task' . $param_sep . 'reset/user' . $param_sep . $username . '/token' . $param_sep . $token . '/admin-nonce' . $param_sep . Utils::getNonce('admin-form');

        $sitename = $this->grav['config']->get('site.title', 'Website');
        $from     = $this->grav['config']->get('plugins.email.from');

        if (empty($from)) {
            $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.FORGOT_EMAIL_NOT_CONFIGURED'), 'error');
            $this->setRedirect($post['redirect']);

            return true;
        }

        $to = $user->email;

        $subject = $this->admin->translate(['PLUGIN_ADMIN.FORGOT_EMAIL_SUBJECT', $sitename]);
        $content = $this->admin->translate([
            'PLUGIN_ADMIN.FORGOT_EMAIL_BODY',
            $fullname,
            $reset_link,
            $author,
            $sitename
        ]);

        $body = $this->grav['twig']->processTemplate('email/base.html.twig', ['content' => $content]);

        $message = $this->grav['Email']->message($subject, $body, 'text/html')->setFrom($from)->setTo($to);

        $sent = $this->grav['Email']->send($message);

        if ($sent < 1) {
            $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.FORGOT_FAILED_TO_EMAIL'), 'error');
        } else {
            $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.FORGOT_INSTRUCTIONS_SENT_VIA_EMAIL'),
                'info');
        }

        $this->setRedirect('/');

        return true;
    }

    /**
     * Enable a plugin.
     *
     * @return bool True if the action was performed.
     */
    public function taskEnable()
    {
        if (!$this->authorizeTask('enable plugin', ['admin.plugins', 'admin.super'])) {
            return false;
        }

        if ($this->view !== 'plugins') {
            return false;
        }

        // Filter value and save it.
        $this->post = ['enabled' => true];
        $obj        = $this->prepareData($this->post);
        $obj->save();

        $this->post = ['_redirect' => 'plugins'];
        $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.SUCCESSFULLY_ENABLED_PLUGIN'), 'info');

        return true;
    }

    /**
     * Gets the configuration data for a given view & post
     *
     * @param array $data
     *
     * @return object
     */
    protected function prepareData(array $data)
    {
        $type = trim("{$this->view}/{$this->admin->route}", '/');
        $data = $this->admin->data($type, $data);

        return $data;
    }

    /**
     * Disable a plugin.
     *
     * @return bool True if the action was performed.
     */
    public function taskDisable()
    {
        if (!$this->authorizeTask('disable plugin', ['admin.plugins', 'admin.super'])) {
            return false;
        }

        if ($this->view !== 'plugins') {
            return false;
        }

        // Filter value and save it.
        $this->post = ['enabled' => false];
        $obj        = $this->prepareData($this->post);
        $obj->save();

        $this->post = ['_redirect' => 'plugins'];
        $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.SUCCESSFULLY_DISABLED_PLUGIN'), 'info');

        return true;
    }

    /**
     * Set the default theme.
     *
     * @return bool True if the action was performed.
     */
    public function taskActivate()
    {
        if (!$this->authorizeTask('activate theme', ['admin.themes', 'admin.super'])) {
            return false;
        }

        if ($this->view !== 'themes') {
            return false;
        }

        $this->post = ['_redirect' => 'themes'];

        // Make sure theme exists (throws exception)
        $name = $this->route;
        $this->grav['themes']->get($name);

        // Store system configuration.
        $system = $this->admin->data('config/system');
        $system->set('pages.theme', $name);
        $system->save();

        // Force configuration reload and save.
        /** @var Config $config */
        $config = $this->grav['config'];
        $config->reload()->save();

        $config->set('system.pages.theme', $name);

        $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.SUCCESSFULLY_CHANGED_THEME'), 'info');

        return true;
    }

    /**
     * Handles updating Grav
     *
     * @return bool True if the action was performed
     */
    public function taskUpdategrav()
    {
        if (!$this->authorizeTask('install grav', ['admin.super'])) {
            return false;
        }

        $gpm     = Gpm::GPM();
        $version = $gpm->grav->getVersion();
        $result  = Gpm::selfupgrade();

        if ($result) {
            $this->admin->json_response = [
                'status'  => 'success',
                'type'    => 'updategrav',
                'version' => $version,
                'message' => $this->admin->translate('PLUGIN_ADMIN.GRAV_WAS_SUCCESSFULLY_UPDATED_TO') . ' ' . $version
            ];
        } else {
            $this->admin->json_response = [
                'status'  => 'error',
                'type'    => 'updategrav',
                'version' => GRAV_VERSION,
                'message' => $this->admin->translate('PLUGIN_ADMIN.GRAV_UPDATE_FAILED') . ' <br>' . Installer::lastErrorMsg()
            ];
        }

        return true;
    }

    /**
     * Handles uninstalling plugins and themes
     *
     * @deprecated
     *
     * @return bool True if the action was performed
     */
    public function taskUninstall()
    {
        $type = $this->view === 'plugins' ? 'plugins' : 'themes';
        if (!$this->authorizeTask('uninstall ' . $type, ['admin.' . $type, 'admin.super'])) {
            return false;
        }

        $package = $this->route;

        $result = Gpm::uninstall($package, []);

        if ($result) {
            $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.UNINSTALL_SUCCESSFUL'), 'info');
        } else {
            $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.UNINSTALL_FAILED'), 'error');
        }

        $this->post = ['_redirect' => $this->view];

        return true;
    }

    /**
     * Handles creating an empty page folder (without markdown file)
     *
     * @return bool True if the action was performed.
     */
    public function taskSaveNewFolder()
    {
        if (!$this->authorizeTask('save', $this->dataPermissions())) {
            return false;
        }

        $data = (array)$this->data;

        if ($data['route'] === '/') {
            $path = $this->grav['locator']->findResource('page://');
        } else {
            $path = $this->grav['page']->find($data['route'])->path();
        }

        $orderOfNewFolder = $this->getNextOrderInFolder($path);
        $new_path         = $path . '/' . $orderOfNewFolder . '.' . $data['folder'];

        Folder::create($new_path);
        Cache::clearCache('standard');

        $this->grav->fireEvent('onAdminAfterSaveAs', new Event(['path' => $new_path]));

        $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.SUCCESSFULLY_SAVED'), 'info');

        $multilang    = $this->isMultilang();
        $admin_route  = $this->admin->base;
        $redirect_url = '/' . ($multilang ? ($this->grav['session']->admin_lang) : '') . $admin_route . '/' . $this->view;
        $this->setRedirect($redirect_url);

        return true;
    }

    /**
     * Get the next available ordering number in a folder
     *
     * @param $path
     *
     * @return string the correct order string to prepend
     */
    public static function getNextOrderInFolder($path)
    {
        $files = Folder::all($path, ['recursive' => false]);

        $highestOrder = 0;
        foreach ($files as $file) {
            preg_match(PAGE_ORDER_PREFIX_REGEX, $file, $order);

            if (isset($order[0])) {
                $theOrder = (int)trim($order[0], '.');
            } else {
                $theOrder = 0;
            }

            if ($theOrder >= $highestOrder) {
                $highestOrder = $theOrder;
            }
        }

        $orderOfNewFolder = $highestOrder + 1;

        if ($orderOfNewFolder < 10) {
            $orderOfNewFolder = '0' . $orderOfNewFolder;
        }

        return $orderOfNewFolder;
    }

    /**
     * Handles form and saves the input data if its valid.
     *
     * @return bool True if the action was performed.
     */
    public function taskSave()
    {
        if (!$this->authorizeTask('save', $this->dataPermissions())) {
            return false;
        }

        $reorder = true;
        $data    = (array)$this->data;

        // Special handler for user data.
        if ($this->view === 'user') {
            if (!$this->grav['user']->exists()) {
                $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.NO_USER_EXISTS'),'error');
                return false;
            }
            if (!$this->admin->authorize(['admin.super', 'admin.users'])) {
                // no user file or not admin.super or admin.users
                if ($this->prepareData($data)->username !== $this->grav['user']->username) {
                    $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.INSUFFICIENT_PERMISSIONS_FOR_TASK') . ' save.','error');
                    return false;
                }
            }
        }

        // Special handler for pages data.
        if ($this->view === 'pages') {
            /** @var Pages $pages */
            $pages = $this->grav['pages'];

            // Find new parent page in order to build the path.
            $route = !isset($data['route']) ? dirname($this->admin->route) : $data['route'];

            /** @var Page $obj */
            $obj = $this->admin->page(true);

            if (!isset($data['folder']) || !$data['folder']) {
                $data['folder'] = $obj->slug();
                $this->data['folder'] = $obj->slug();
            }

            // Ensure route is prefixed with a forward slash.
            $route = '/' . ltrim($route, '/');

            if (isset($data['frontmatter']) && !$this->checkValidFrontmatter($data['frontmatter'])) {
                $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.INVALID_FRONTMATTER_COULD_NOT_SAVE'),
                    'error');

                return false;
            }


            $parent = $route && $route !== '/' && $route !== '.' && $route !== '/.' ? $pages->dispatch($route, true) : $pages->root();
            $original_order = (int)trim($obj->order(), '.');

            try {
                // Change parent if needed and initialize move (might be needed also on ordering/folder change).
                $obj = $obj->move($parent);
                $this->preparePage($obj, false, $obj->language());
                $obj->validate();

            } catch (\Exception $e) {
                $this->admin->setMessage($e->getMessage(), 'error');

                return false;
            }
            $obj->filter();

            // rename folder based on visible
            if ($original_order === 1000) {
                // increment order to force reshuffle
                $obj->order($original_order + 1);
            }

            if (isset($data['order']) && !empty($data['order'])) {
                $reorder = explode(',', $data['order']);
            }

            // add or remove numeric prefix based on ordering value
            if (isset($data['ordering'])) {
                if ($data['ordering'] && !$obj->order()) {
                    $obj->order($this->getNextOrderInFolder($obj->parent()->path()));
                    $reorder = false;
                } elseif (!$data['ordering'] && $obj->order()) {
                    $obj->folder($obj->slug());
                }
            }

        } else {
            // Handle standard data types.
            $obj = $this->prepareData($data);

            try {
                $obj->validate();
            } catch (\Exception $e) {
                $this->admin->setMessage($e->getMessage(), 'error');

                return false;
            }

            $obj->filter();
        }

        $obj = $this->storeFiles($obj);

        if ($obj) {
            // Event to manipulate data before saving the object
            $this->grav->fireEvent('onAdminSave', new Event(['object' => &$obj]));
            $obj->save($reorder);
            $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.SUCCESSFULLY_SAVED'), 'info');
            $this->grav->fireEvent('onAdminAfterSave', new Event(['object' => $obj]));
        }

        if ($this->view !== 'pages') {
            // Force configuration reload.
            /** @var Config $config */
            $config = $this->grav['config'];
            $config->reload();

            if ($this->view === 'user') {
                if ($obj->username === $this->grav['user']->username) {
                    //Editing current user. Reload user object
                    unset($this->grav['user']->avatar);
                    $this->grav['user']->merge(User::load($this->admin->route)->toArray());
                }
            }
        }

        // Always redirect if a page route was changed, to refresh it
        if ($obj instanceof Page) {
            if (method_exists($obj, 'unsetRouteSlug')) {
                $obj->unsetRouteSlug();
            }

            $multilang = $this->isMultilang();

            if ($multilang) {
                if (!$obj->language()) {
                    $obj->language($this->grav['session']->admin_lang);
                }
            }
            $admin_route = $this->admin->base;

            $route           = $obj->rawRoute();
            $redirect_url = ($multilang ? '/' . $obj->language() : '') . $admin_route . '/' . $this->view . $route;
            $this->setRedirect($redirect_url);
        }

        return true;
    }

    /**
     * @param string $frontmatter
     *
     * @return bool
     */
    public function checkValidFrontmatter($frontmatter)
    {
        try {
            Yaml::parse($frontmatter);
        } catch (\RuntimeException $e) {
            return false;
        }

        return true;
    }

    /**
     * Continue to the new page.
     *
     * @return bool True if the action was performed.
     */
    public function taskContinue()
    {
        $data = (array)$this->data;

        if ($this->view === 'users') {
            $username = strip_tags(strtolower($data['username']));
            $this->setRedirect("{$this->view}/{$username}");

            return true;
        }

        if ($this->view === 'groups') {
            $this->setRedirect("{$this->view}/{$data['groupname']}");

            return true;
        }

        if ($this->view !== 'pages') {
            return false;
        }

        $route  = $data['route'] !== '/' ? $data['route'] : '';
        $folder = $data['folder'];
        // Handle @slugify-{field} value, automatically slugifies the specified field
        if (0 === strpos($folder, '@slugify-')) {
            $folder = \Grav\Plugin\Admin\Utils::slug($data[substr($folder, 9)]);
        }
        $folder = ltrim($folder, '_');
        if (!empty($data['modular'])) {
            $folder = '_' . $folder;
        }
        $path = $route . '/' . $folder;

        $this->admin->session()->{$path} = $data;

        // Store the name and route of a page, to be used pre-filled defaults of the form in the future
        $this->admin->session()->lastPageName  = $data['name'];
        $this->admin->session()->lastPageRoute = $data['route'];

        $this->setRedirect("{$this->view}/" . ltrim($path, '/'));

        return true;
    }

    /**
     * Toggle the gpm.releases setting
     */
    protected function taskGpmRelease()
    {
        if (!$this->authorizeTask('configuration', ['admin.configuration', 'admin.super'])) {
            return false;
        }

        // Default release state
        $release = 'stable';
        $reload  = false;

        // Get the testing release value if set
        if ($this->post['release'] === 'testing') {
            $release = 'testing';
        }

        $config          = $this->grav['config'];
        $current_release = $config->get('system.gpm.releases');

        // If the releases setting is different, save it in the system config
        if ($current_release !== $release) {
            $data = new Data\Data($config->get('system'));
            $data->set('gpm.releases', $release);

            // Get the file location
            $file = CompiledYamlFile::instance($this->grav['locator']->findResource('config://system.yaml'));
            $data->file($file);

            // Save the configuration
            $data->save();
            $config->reload();
            $reload = true;
        }

        $this->admin->json_response = ['status' => 'success', 'reload' => $reload];

        return true;
    }

    /**
     * Keep alive
     */
    protected function taskKeepAlive()
    {
        exit();
    }

    protected function taskGetNewsFeed()
    {
        if (!$this->authorizeTask('dashboard', ['admin.login', 'admin.super'])) {
            return false;
        }

        $cache = $this->grav['cache'];

        if ($this->post['refresh'] === 'true') {
            $cache->delete('news-feed');
        }

        $feed_data = $cache->fetch('news-feed');

        if (!$feed_data) {
            try {
                $feed = $this->admin->getFeed();
                if (is_object($feed)) {

                    require_once __DIR__ . '/../classes/Twig/AdminTwigExtension.php';
                    $adminTwigExtension = new AdminTwigExtension;

                    $feed_items = $feed->getItems();

                    // Feed should only every contain 10, but just in case!
                    if (count($feed_items) > 10) {
                        $feed_items = array_slice($feed_items, 0, 10);
                    }

                    foreach ($feed_items as $item) {
                        $datetime    = $adminTwigExtension->adminNicetimeFilter($item->getDate()->getTimestamp());
                        $feed_data[] = '<li><span class="date">' . $datetime . '</span> <a href="' . $item->getUrl() . '" target="_blank" title="' . str_replace('"',
                                '″', $item->getTitle()) . '">' . $item->getTitle() . '</a></li>';
                    }
                }

                // cache for 1 hour
                $cache->save('news-feed', $feed_data, 60 * 60);

            } catch (\Exception $e) {
                $this->admin->json_response = ['status' => 'error', 'message' => $e->getMessage()];

                return;
            }
        }

        $this->admin->json_response = ['status' => 'success', 'feed_data' => $feed_data];
    }

    /**
     * Get update status from GPM
     */
    protected function taskGetUpdates()
    {
        if (!$this->authorizeTask('dashboard', ['admin.login', 'admin.super'])) {
            return false;
        }

        $data  = $this->post;
        $flush = (isset($data['flush']) && $data['flush'] == true) ? true : false;

        if (isset($this->grav['session'])) {
            $this->grav['session']->close();
        }

        try {
            $gpm = new GravGPM($flush);

            $resources_updates = $gpm->getUpdatable();
            if ($gpm->grav != null) {
                $grav_updates = [
                    'isUpdatable' => $gpm->grav->isUpdatable(),
                    'assets'      => $gpm->grav->getAssets(),
                    'version'     => GRAV_VERSION,
                    'available'   => $gpm->grav->getVersion(),
                    'date'        => $gpm->grav->getDate(),
                    'isSymlink'   => $gpm->grav->isSymlink()
                ];

                $this->admin->json_response = [
                    'status'  => 'success',
                    'payload' => [
                        'resources' => $resources_updates,
                        'grav'      => $grav_updates,
                        'installed' => $gpm->countInstalled(),
                        'flushed'   => $flush
                    ]
                ];
            } else {
                $this->admin->json_response = ['status' => 'error', 'message' => 'Cannot connect to the GPM'];
            }

        } catch (\Exception $e) {
            $this->admin->json_response = ['status' => 'error', 'message' => $e->getMessage()];
        }

    }

    /**
     * Get Notifications from cache.
     *
     */
    protected function taskGetNotifications()
    {
        if (!$this->authorizeTask('dashboard', ['admin.login', 'admin.super'])) {
            return false;
        }

        $cache = $this->grav['cache'];
        if (!(bool)$this->grav['config']->get('system.cache.enabled') || !$notifications = $cache->fetch('notifications')) {
            //No notifications cache (first time)
            $this->admin->json_response = ['status' => 'success', 'notifications' => [], 'need_update' => true];

            return;
        }

        $need_update = false;
        if (!$last_checked = $cache->fetch('notifications_last_checked')) {
            $need_update = true;
        } else {
            if (time() - $last_checked > 86400) {
                $need_update = true;
            }
        }

        try {
            $notifications = $this->admin->processNotifications($notifications);
        } catch (\Exception $e) {
            $this->admin->json_response = ['status' => 'error', 'message' => $e->getMessage()];

            return;
        }

        $this->admin->json_response = [
            'status'        => 'success',
            'notifications' => $notifications,
            'need_update'   => $need_update
        ];
    }

    /**
     * Process Notifications. Store the notifications object locally.
     *
     * @return bool
     */
    protected function taskProcessNotifications()
    {
        if (!$this->authorizeTask('notifications', ['admin.login', 'admin.super'])) {
            return false;
        }

        $cache = $this->grav['cache'];

        $data          = $this->post;
        $notifications = json_decode($data['notifications']);

        try {
            $notifications = $this->admin->processNotifications($notifications);
        } catch (\Exception $e) {
            $this->admin->json_response = ['status' => 'error', 'message' => $e->getMessage()];

            return false;
        }

        $show_immediately = false;
        if (!$cache->fetch('notifications_last_checked')) {
            $show_immediately = true;
        }

        $cache->save('notifications', $notifications);
        $cache->save('notifications_last_checked', time());

        $this->admin->json_response = [
            'status'           => 'success',
            'notifications'    => $notifications,
            'show_immediately' => $show_immediately
        ];

        return true;
    }

    /**
     * Handle getting a new package dependencies needed to be installed
     *
     * @return bool
     */
    protected function taskGetPackagesDependencies()
    {
        $data     = $this->post;
        $packages = isset($data['packages']) ? explode(',', $data['packages']) : '';
        $packages = (array)$packages;

        try {
            $this->admin->checkPackagesCanBeInstalled($packages);
            $dependencies = $this->admin->getDependenciesNeededToInstall($packages);
        } catch (\Exception $e) {
            $this->admin->json_response = ['status' => 'error', 'message' => $e->getMessage()];

            return false;
        }

        $this->admin->json_response = ['status' => 'success', 'dependencies' => $dependencies];

        return true;
    }

    protected function taskInstallDependenciesOfPackages()
    {
        $data     = $this->post;
        $packages = isset($data['packages']) ? explode(',', $data['packages']) : '';
        $packages = (array)$packages;

        $type = isset($data['type']) ? $data['type'] : '';

        if (!$this->authorizeTask('install ' . $type, ['admin.' . $type, 'admin.super'])) {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => $this->admin->translate('PLUGIN_ADMIN.INSUFFICIENT_PERMISSIONS_FOR_TASK')
            ];

            return false;
        }

        try {
            $dependencies = $this->admin->getDependenciesNeededToInstall($packages);
        } catch (\Exception $e) {
            $this->admin->json_response = ['status' => 'error', 'message' => $e->getMessage()];

            return false;
        }

        $result = Gpm::install(array_keys($dependencies), ['theme' => $type === 'theme']);

        if ($result) {
            $this->admin->json_response = ['status' => 'success', 'message' => 'Dependencies installed successfully'];
        } else {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => $this->admin->translate('PLUGIN_ADMIN.INSTALLATION_FAILED')
            ];
        }

        return true;
    }

    protected function taskInstallPackage($reinstall = false)
    {
        $data    = $this->post;
        $package = isset($data['package']) ? $data['package'] : '';
        $type    = isset($data['type']) ? $data['type'] : '';

        if (!$this->authorizeTask('install ' . $type, ['admin.' . $type, 'admin.super'])) {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => $this->admin->translate('PLUGIN_ADMIN.INSUFFICIENT_PERMISSIONS_FOR_TASK')
            ];

            return false;
        }

        try {
            $result = Gpm::install($package, ['theme' => $type === 'theme']);
        } catch (\Exception $e) {
            $this->admin->json_response = ['status' => 'error', 'message' => $e->getMessage()];

            return false;
        }

        if ($result) {
            $this->admin->json_response = [
                'status'  => 'success',
                'message' => $this->admin->translate(is_string($result) ? $result : sprintf($this->admin->translate($reinstall ?: 'PLUGIN_ADMIN.PACKAGE_X_REINSTALLED_SUCCESSFULLY',
                    null), $package))
            ];
        } else {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => $this->admin->translate($reinstall ?: 'PLUGIN_ADMIN.INSTALLATION_FAILED')
            ];
        }

        return true;
    }

    /**
     * Handle removing a package
     *
     * @return bool
     */
    protected function taskRemovePackage()
    {
        $data    = $this->post;
        $package = isset($data['package']) ? $data['package'] : '';
        $type    = isset($data['type']) ? $data['type'] : '';

        if (!$this->authorizeTask('uninstall ' . $type, ['admin.' . $type, 'admin.super'])) {
            $json_response = [
                'status'  => 'error',
                'message' => $this->admin->translate('PLUGIN_ADMIN.INSUFFICIENT_PERMISSIONS_FOR_TASK')
            ];
            echo json_encode($json_response);
            exit;
        }

        //check if there are packages that have this as a dependency. Abort and show which ones
        $dependent_packages = $this->admin->getPackagesThatDependOnPackage($package);
        if (count($dependent_packages) > 0) {
            if (count($dependent_packages) > 1) {
                $message = 'The installed packages <cyan>' . implode('</cyan>, <cyan>',
                        $dependent_packages) . '</cyan> depends on this package. Please remove those first.';
            } else {
                $message = 'The installed package <cyan>' . implode('</cyan>, <cyan>',
                        $dependent_packages) . '</cyan> depends on this package. Please remove it first.';
            }

            $json_response = ['status' => 'error', 'message' => $message];
            echo json_encode($json_response);
            exit;
        }

        try {
            $dependencies = $this->admin->dependenciesThatCanBeRemovedWhenRemoving($package);
            $result       = Gpm::uninstall($package, []);
        } catch (\Exception $e) {
            $json_response = ['status' => 'error', 'message' => $e->getMessage()];
            echo json_encode($json_response);
            exit;
        }

        if ($result) {
            $json_response = [
                'status'       => 'success',
                'dependencies' => $dependencies,
                'message'      => $this->admin->translate(is_string($result) ? $result : 'PLUGIN_ADMIN.UNINSTALL_SUCCESSFUL')
            ];
            echo json_encode($json_response);
            exit;
        }

        $json_response = [
            'status'  => 'error',
            'message' => $this->admin->translate('PLUGIN_ADMIN.UNINSTALL_FAILED')
        ];
        echo json_encode($json_response);
        exit;
    }

    /**
     * Handle reinstalling a package
     */
    protected function taskReinstallPackage()
    {
        $data = $this->post;

        $slug            = isset($data['slug']) ? $data['slug'] : '';
        $type            = isset($data['type']) ? $data['type'] : '';
        $package_name    = isset($data['package_name']) ? $data['package_name'] : '';
        $current_version = isset($data['current_version']) ? $data['current_version'] : '';

        if (!$this->authorizeTask('install ' . $type, ['admin.' . $type, 'admin.super'])) {
            $json_response = [
                'status'  => 'error',
                'message' => $this->admin->translate('PLUGIN_ADMIN.INSUFFICIENT_PERMISSIONS_FOR_TASK')
            ];
            echo json_encode($json_response);
            exit;
        }

        $url = "https://getgrav.org/download/{$type}s/$slug/$current_version";

        $result = Gpm::directInstall($url);

        if ($result === true) {
            $this->admin->json_response = [
                'status'  => 'success',
                'message' => $this->admin->translate(sprintf($this->admin->translate('PLUGIN_ADMIN.PACKAGE_X_REINSTALLED_SUCCESSFULLY',
                    null), $package_name))
            ];
        } else {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => $this->admin->translate('PLUGIN_ADMIN.REINSTALLATION_FAILED')
            ];
        }
    }

    /**
     * Clear the cache.
     *
     * @return bool True if the action was performed.
     */
    protected function taskClearCache()
    {
        if (!$this->authorizeTask('clear cache', ['admin.cache', 'admin.super', 'admin.maintenance'])) {
            return false;
        }

        // get optional cleartype param
        $clear_type = $this->grav['uri']->param('cleartype');

        if ($clear_type) {
            $clear = $clear_type;
        } else {
            $clear = 'standard';
        }

        $results = Cache::clearCache($clear);
        if (count($results) > 0) {
            $this->admin->json_response = [
                'status'  => 'success',
                'message' => $this->admin->translate('PLUGIN_ADMIN.CACHE_CLEARED') . ' <br />' . $this->admin->translate('PLUGIN_ADMIN.METHOD') . ': ' . $clear . ''
            ];
        } else {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => $this->admin->translate('PLUGIN_ADMIN.ERROR_CLEARING_CACHE')
            ];
        }

        return true;
    }

    /**
     * Clear the cache.
     *
     * @return bool True if the action was performed.
     */
    protected function taskHideNotification()
    {
        if (!$this->authorizeTask('hide notification', ['admin.login'])) {
            return false;
        }

        $notification_id = $this->grav['uri']->param('notification_id');

        if (!$notification_id) {
            $this->admin->json_response = [
                'status' => 'error'
            ];

            return false;
        }

        $filename = $this->grav['locator']->findResource('user://data/notifications/' . $this->grav['user']->username . YAML_EXT,
            true, true);
        $file     = CompiledYamlFile::instance($filename);
        $data     = $file->content();
        $data[]   = $notification_id;
        $file->save($data);

        $this->admin->json_response = [
            'status' => 'success'
        ];

        return true;
    }

    /**
     * Handle the backup action
     *
     * @return bool True if the action was performed.
     */
    protected function taskBackup()
    {
        $param_sep = $this->grav['config']->get('system.param_sep', ':');
        if (!$this->authorizeTask('backup', ['admin.maintenance', 'admin.super'])) {
            return false;
        }

        $download = $this->grav['uri']->param('download');

        if ($download) {
            $file             = base64_decode(urldecode($download));
            $backups_root_dir = $this->grav['locator']->findResource('backup://', true);

            if (0 !== strpos($file, $backups_root_dir)) {
                header('HTTP/1.1 401 Unauthorized');
                exit();
            }

            Utils::download($file, true);
        }

        $log = JsonFile::instance($this->grav['locator']->findResource("log://backup.log", true, true));

        try {
            $backup = ZipBackup::backup();
        } catch (\Exception $e) {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => $this->admin->translate('PLUGIN_ADMIN.AN_ERROR_OCCURRED') . '. ' . $e->getMessage()
            ];

            return true;
        }

        $download = urlencode(base64_encode($backup));
        $url      = rtrim($this->grav['uri']->rootUrl(true), '/') . '/' . trim($this->admin->base,
                '/') . '/task' . $param_sep . 'backup/download' . $param_sep . $download . '/admin-nonce' . $param_sep . Utils::getNonce('admin-form');

        $log->content([
            'time'     => time(),
            'location' => $backup
        ]);
        $log->save();

        $this->admin->json_response = [
            'status'  => 'success',
            'message' => $this->admin->translate('PLUGIN_ADMIN.YOUR_BACKUP_IS_READY_FOR_DOWNLOAD') . '. <a href="' . $url . '" class="button">' . $this->admin->translate('PLUGIN_ADMIN.DOWNLOAD_BACKUP') . '</a>',
            'toastr'  => [
                'timeOut'         => 0,
                'extendedTimeOut' => 0,
                'closeButton'     => true
            ]
        ];

        return true;
    }

    protected function taskGetChildTypes()
    {
        if (!$this->authorizeTask('get childtypes', ['admin.pages', 'admin.super'])) {
            return false;
        }

        $data = $this->post;

        $rawroute = !empty($data['rawroute']) ? $data['rawroute'] : null;

        if ($rawroute) {
            /** @var Page $page */
            $page = $this->grav['pages']->dispatch($rawroute);

            if ($page) {
                $child_type = $page->childType();

                if (isset($child_type)) {
                    $this->admin->json_response = [
                        'status' => 'success',
                        'child_type' => $child_type
                    ];
                    return true;
                }
            }
        }

        $this->admin->json_response = [
            'status'  => 'success',
            'child_type' => '',
            'message' => $this->admin->translate('PLUGIN_ADMIN.NO_CHILD_TYPE')
        ];

        return true;
    }

    /**
     * Handles filtering the page by modular/visible/routable in the pages list.
     */
    protected function taskFilterPages()
    {
        if (!$this->authorizeTask('filter pages', ['admin.pages', 'admin.super'])) {
            return;
        }

        $data = $this->post;

        $flags   = !empty($data['flags']) ? array_map('strtolower', explode(',', $data['flags'])) : [];
        $queries = !empty($data['query']) ? explode(',', $data['query']) : [];

        /** @var Collection $collection */
        $collection = $this->grav['pages']->all();

        if (count($flags)) {
            // Filter by state
            $pageStates = [
                'modular',
                'nonmodular',
                'visible',
                'nonvisible',
                'routable',
                'nonroutable',
                'published',
                'nonpublished'
            ];

            if (count(array_intersect($pageStates, $flags)) > 0) {
                if (in_array('modular', $flags, true)) {
                    $collection = $collection->modular();
                }

                if (in_array('nonmodular', $flags, true)) {
                    $collection = $collection->nonModular();
                }

                if (in_array('visible', $flags, true)) {
                    $collection = $collection->visible();
                }

                if (in_array('nonvisible', $flags, true)) {
                    $collection = $collection->nonVisible();
                }

                if (in_array('routable', $flags, true)) {
                    $collection = $collection->routable();
                }

                if (in_array('nonroutable', $flags, true)) {
                    $collection = $collection->nonRoutable();
                }

                if (in_array('published', $flags, true)) {
                    $collection = $collection->published();
                }

                if (in_array('nonpublished', $flags, true)) {
                    $collection = $collection->nonPublished();
                }
            }
            foreach ($pageStates as $pageState) {
                if (($pageState = array_search($pageState, $flags, true)) !== false) {
                    unset($flags[$pageState]);
                }
            }

            // Filter by page type
            if ($flags) {
                $types = [];

                $pageTypes = array_keys(Pages::pageTypes());
                foreach ($pageTypes as $pageType) {
                    if (($pageKey = array_search($pageType, $flags)) !== false) {
                        $types[] = $pageType;
                        unset($flags[$pageKey]);
                    }
                }

                if (count($types)) {
                    $collection = $collection->ofOneOfTheseTypes($types);
                }
            }

            // Filter by page type
            if ($flags) {
                $accessLevels = $flags;
                $collection   = $collection->ofOneOfTheseAccessLevels($accessLevels);
            }
        }

        if (!empty($queries)) {
            foreach ($collection as $page) {
                foreach ($queries as $query) {
                    $query = trim($query);
                    if (stripos($page->getRawContent(), $query) === false && stripos($page->title(),
                            $query) === false && stripos($page->slug(), \Grav\Plugin\Admin\Utils::slug($query)) === false && stripos($page->folder(),
                            $query) === false
                    ) {
                        $collection->remove($page);
                    }
                }
            }
        }

        $results = [];
        foreach ($collection as $path => $page) {
            $results[] = $page->route();
        }

        $this->admin->json_response = [
            'status'  => 'success',
            'message' => $this->admin->translate('PLUGIN_ADMIN.PAGES_FILTERED'),
            'results' => $results
        ];
        $this->admin->collection    = $collection;
    }

    /**
     * Determines the file types allowed to be uploaded
     *
     * @return bool True if the action was performed.
     */
    protected function taskListmedia()
    {
        if (!$this->authorizeTask('list media', ['admin.pages', 'admin.super'])) {
            return false;
        }

        $media = $this->getMedia();
        if (!$media) {
            $this->admin->json_response = [
                'status' => 'error',
                'message' => $this->admin->translate('PLUGIN_ADMIN.NO_PAGE_FOUND')
            ];

            return false;
        }

        $media_list = [];
        /**
         * @var string $name
         * @var Medium $medium
         */
        foreach ($media->all() as $name => $medium) {

            $metadata = [];
            $img_metadata = $medium->metadata();
            if ($img_metadata) {
                $metadata = $img_metadata;
            }

            // Get original name
            $source = $medium->higherQualityAlternative();

            $media_list[$name] = ['url' => $medium->display($medium->get('extension') === 'svg' ? 'source' : 'thumbnail')->cropZoom(400, 300)->url(), 'size' => $medium->get('size'), 'metadata' => $metadata, 'original' => $source->get('filename')];
        }

        $this->admin->json_response = ['status' => 'success', 'results' => $media_list];

        return true;
    }

    /**
     * @return Media
     */
    protected function getMedia()
    {
        $this->uri = $this->uri ?: $this->grav['uri'];
        $uri = $this->uri->post('uri');
        $order = $this->uri->post('order') ?: null;

        if ($uri) {
            /** @var UniformResourceLocator $locator */
            $locator = $this->grav['locator'];

            $media_path = $locator->isStream($uri) ? $uri : null;
        } else {
            $page = $this->admin->page(true);

            $media_path = $page ? $page->path() : null;
        }
        if ($order) {
            $order = array_map('trim', explode(',', $order));
        }

        return $media_path ? new Media($media_path, $order) : null;
    }

    /**
     * Handles adding a media file to a page
     *
     * @return bool True if the action was performed.
     */
    protected function taskAddmedia()
    {
        if (!$this->authorizeTask('add media', ['admin.pages', 'admin.super'])) {
            return false;
        }

        /** @var Config $config */
        $config = $this->grav['config'];

        if (!isset($_FILES['file']['error']) || is_array($_FILES['file']['error'])) {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => $this->admin->translate('PLUGIN_ADMIN.INVALID_PARAMETERS')
            ];

            return false;
        }

        // Check $_FILES['file']['error'] value.
        switch ($_FILES['file']['error']) {
            case UPLOAD_ERR_OK:
                break;
            case UPLOAD_ERR_NO_FILE:
                $this->admin->json_response = [
                    'status'  => 'error',
                    'message' => $this->admin->translate('PLUGIN_ADMIN.NO_FILES_SENT')
                ];

                return false;
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                $this->admin->json_response = [
                    'status'  => 'error',
                    'message' => $this->admin->translate('PLUGIN_ADMIN.EXCEEDED_FILESIZE_LIMIT')
                ];

                return false;
            case UPLOAD_ERR_NO_TMP_DIR:
                $this->admin->json_response = [
                    'status'  => 'error',
                    'message' => $this->admin->translate('PLUGIN_ADMIN.UPLOAD_ERR_NO_TMP_DIR')
                ];

                return false;
            default:
                $this->admin->json_response = [
                    'status'  => 'error',
                    'message' => $this->admin->translate('PLUGIN_ADMIN.UNKNOWN_ERRORS')
                ];

                return false;
        }

        $grav_limit = $config->get('system.media.upload_limit', 0);
        // You should also check filesize here.
        if ($grav_limit > 0 && $_FILES['file']['size'] > $grav_limit) {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => $this->admin->translate('PLUGIN_ADMIN.EXCEEDED_GRAV_FILESIZE_LIMIT')
            ];

            return false;
        }


        // Check extension
        $fileParts = pathinfo($_FILES['file']['name']);

        $fileExt = '';
        if (isset($fileParts['extension'])) {
            $fileExt = strtolower($fileParts['extension']);
        }

        // If not a supported type, return
        if (!$fileExt || !$config->get("media.types.{$fileExt}")) {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => $this->admin->translate('PLUGIN_ADMIN.UNSUPPORTED_FILE_TYPE') . ': ' . $fileExt
            ];

            return false;
        }


        $media = $this->getMedia();
        if (!$media) {
            $this->admin->json_response = [
                'status' => 'error',
                'message' => $this->admin->translate('PLUGIN_ADMIN.NO_PAGE_FOUND')
            ];

            return false;
        }

        /** @var UniformResourceLocator $locator */
        $locator = $this->grav['locator'];
        $path = $media->path();
        if ($locator->isStream($path)) {
            $path = $locator->findResource($path, true, true);
        }

        // Upload it
        if (!move_uploaded_file($_FILES['file']['tmp_name'],
            sprintf('%s/%s', $path, $_FILES['file']['name']))
        ) {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => $this->admin->translate('PLUGIN_ADMIN.FAILED_TO_MOVE_UPLOADED_FILE')
            ];

            return false;
        }

        // Add metadata if needed
        $include_metadata = Grav::instance()['config']->get('system.media.auto_metadata_exif', false);
        $filename = $fileParts['basename'];
        $filename = str_replace(['@3x', '@2x'], '', $filename);

        $metadata = [];

        if ($include_metadata && isset($media[$filename])) {
            $img_metadata = $media[$filename]->metadata();
            if ($img_metadata) {
                $metadata = $img_metadata;
            }
        }

        $page = $this->admin->page(true);
        if ($page) {
            $this->grav->fireEvent('onAdminAfterAddMedia', new Event(['page' => $page]));
        }

        $this->admin->json_response = [
            'status'  => 'success',
            'message' => $this->admin->translate('PLUGIN_ADMIN.FILE_UPLOADED_SUCCESSFULLY'),
            'metadata' => $metadata,
        ];

        return true;
    }

    /**
     * Handles deleting a media file from a page
     *
     * @return bool True if the action was performed.
     */
    protected function taskDelmedia()
    {
        if (!$this->authorizeTask('delete media', ['admin.pages', 'admin.super'])) {
            return false;
        }

        $media = $this->getMedia();
        if (!$media) {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => $this->admin->translate('PLUGIN_ADMIN.NO_PAGE_FOUND')
            ];

            return false;
        }

        $filename = !empty($this->post['filename']) ? $this->post['filename'] : null;

        if (!$filename) {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => $this->admin->translate('PLUGIN_ADMIN.NO_FILE_FOUND')
            ];

            return false;
        }

        /** @var UniformResourceLocator $locator */
        $locator = $this->grav['locator'];

        $targetPath = $media->path() . '/' . $filename;
        if ($locator->isStream($targetPath)) {
            $targetPath = $locator->findResource($targetPath, true, true);
        }
        $fileParts  = pathinfo($filename);

        $found = false;

        if (file_exists($targetPath)) {
            $found  = true;
            $result = unlink($targetPath);

            if (!$result) {
                $this->admin->json_response = [
                    'status'  => 'error',
                    'message' => $this->admin->translate('PLUGIN_ADMIN.FILE_COULD_NOT_BE_DELETED') . ': ' . $filename
                ];

                return false;
            }
        }

        // Remove Extra Files
        foreach (scandir($media->path(), SCANDIR_SORT_NONE) as $file) {
            if (preg_match("/{$fileParts['filename']}@\d+x\.{$fileParts['extension']}(?:\.meta\.yaml)?$|{$filename}\.meta\.yaml$/", $file)) {

                $targetPath = $media->path() . '/' . $file;
                if ($locator->isStream($targetPath)) {
                    $targetPath = $locator->findResource($targetPath, true, true);
                }

                $result = unlink($targetPath);

                if (!$result) {
                    $this->admin->json_response = [
                        'status'  => 'error',
                        'message' => $this->admin->translate('PLUGIN_ADMIN.FILE_COULD_NOT_BE_DELETED') . ': ' . $filename
                    ];

                    return false;
                }

                $found = true;
            }
        }

        if (!$found) {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => $this->admin->translate('PLUGIN_ADMIN.FILE_NOT_FOUND') . ': ' . $filename
            ];

            return false;
        }

        $page = $this->admin->page(true);
        if ($page) {
            $this->grav->fireEvent('onAdminAfterDelMedia', new Event(['page' => $page]));
        }

        $this->admin->json_response = [
            'status'  => 'success',
            'message' => $this->admin->translate('PLUGIN_ADMIN.FILE_DELETED') . ': ' . $filename
        ];

        return true;
    }

    /**
     * Process the page Markdown
     *
     * @return bool True if the action was performed.
     */
    protected function taskProcessMarkdown()
    {
        if (!$this->authorizeTask('process markdown', ['admin.pages', 'admin.super'])) {
            return;
        }

        try {
            $page = $this->admin->page(true);

            if (!$page) {
                $this->admin->json_response = [
                    'status'  => 'error',
                    'message' => $this->admin->translate('PLUGIN_ADMIN.NO_PAGE_FOUND')
                ];

                return false;
            }

            $this->preparePage($page, true);
            $page->header();
            $page->templateFormat('html');

            // Add theme template paths to Twig loader
            $template_paths = $this->grav['locator']->findResources('theme://templates');
            $this->grav['twig']->twig->getLoader()->addLoader(new \Twig_Loader_Filesystem($template_paths));

            $html = $page->content();

            $this->admin->json_response = ['status' => 'success', 'preview' => $html];
        } catch (\Exception $e) {
            $this->admin->json_response = ['status' => 'error', 'message' => $e->getMessage()];

            return false;
        }

        return true;
    }

    /**
     * Prepare a page to be stored: update its folder, name, template, header and content
     *
     * @param \Grav\Common\Page\Page $page
     * @param bool                   $clean_header
     * @param string                 $language
     */
    protected function preparePage(Page $page, $clean_header = false, $language = '')
    {
        $input = (array)$this->data;

        if (isset($input['folder']) && $input['folder'] !== $page->value('folder')) {
            $order    = $page->value('order');
            $ordering = $order ? sprintf('%02d.', $order) : '';
            $page->folder($ordering . $input['folder']);
        }

        if (isset($input['name']) && !empty($input['name'])) {
            $type = strtolower($input['name']);
            $name = preg_replace('|.*/|', '', $type);
            if ($language) {
                $name .= '.' . $language;
            } else {
                $language = $this->grav['language'];
                if ($language->enabled()) {
                    $name .= '.' . $language->getLanguage();
                }
            }
            $name .= '.md';
            $page->name($name);
            $page->template($type);
        }

        // Special case for Expert mode: build the raw, unset content
        if (isset($input['frontmatter'], $input['content'])) {
            $page->raw("---\n" . (string)$input['frontmatter'] . "\n---\n" . (string)$input['content']);
            unset($input['content']);
        // Handle header normally
        } elseif (isset($input['header'])) {
            $header = $input['header'];

            foreach ($header as $key => $value) {
                if ($key === 'metadata' && is_array($header[$key])) {
                    foreach ($header['metadata'] as $key2 => $value2) {
                        if (isset($input['toggleable_header']['metadata'][$key2]) && !$input['toggleable_header']['metadata'][$key2]) {
                            $header['metadata'][$key2] = '';
                        }
                    }
                } elseif ($key === 'taxonomy' && is_array($header[$key])) {
                    foreach ($header[$key] as $taxkey => $taxonomy) {
                        if (is_array($taxonomy) && count($taxonomy) == 1 && trim($taxonomy[0]) == '') {
                            unset($header[$key][$taxkey]);
                        }
                    }
                } else {
                    if (isset($input['toggleable_header'][$key]) && !$input['toggleable_header'][$key]) {
                        $header[$key] = null;
                    }
                }
            }
            if ($clean_header) {
                $header = Utils::arrayFilterRecursive($header, function ($k, $v) {
                    return !(null === $v || $v === '');
                });
            }
            $page->header((object)$header);
            $page->frontmatter(Yaml::dump((array)$page->header()), 20);
        }
        // Fill content last because it also renders the output.
        if (isset($input['content'])) {
            $page->rawMarkdown((string)$input['content']);
        }
    }

    /**
     * Save page as a new copy.
     *
     * @return bool True if the action was performed.
     * @throws \RuntimeException
     */
    protected function taskCopy()
    {
        if (!$this->authorizeTask('copy page', ['admin.pages', 'admin.super'])) {
            return false;
        }

        // Only applies to pages.
        if ($this->view !== 'pages') {
            return false;
        }

        try {
            /** @var Pages $pages */
            $pages = $this->grav['pages'];

            // Get the current page.
            $original_page = $this->admin->page(true);

            // Find new parent page in order to build the path.
            $parent = $original_page->parent() ?: $pages->root();
            // Make a copy of the current page and fill the updated information into it.
            $page = $original_page->copy($parent);

            $order = 0;
            if ($page->order()) {
                $order = $this->getNextOrderInFolder($page->parent()->path());
            }

            // Make sure the header is loaded in case content was set through raw() (expert mode)
            $page->header();

            if ($page->order()) {
                $page->order($order);
            }

            $folder = $this->findFirstAvailable('folder', $page);
            $slug   = $this->findFirstAvailable('slug', $page);

            $page->path($page->parent()->path() . DS . $page->order() . $folder);
            $page->route($page->parent()->route() . '/' . $slug);
            $page->rawRoute($page->parent()->rawRoute() . '/' . $slug);

            // Append progressive number to the copied page title
            $match  = preg_split('/(\d+)(?!.*\d)/', $original_page->title(), 2, PREG_SPLIT_DELIM_CAPTURE);
            $header = $page->header();
            if (!isset($match[1])) {
                $header->title = $match[0] . ' 2';
            } else {
                $header->title = $match[0] . ((int)$match[1] + 1);
            }

            $page->header($header);
            $page->save(false);

            $redirect = $this->view . $page->rawRoute();
            $header   = $page->header();

            if (isset($header->slug)) {
                $match        = preg_split('/-(\d+)$/', $header->slug, 2, PREG_SPLIT_DELIM_CAPTURE);
                $header->slug = $match[0] . '-' . (isset($match[1]) ? (int)$match[1] + 1 : 2);
            }

            $page->header($header);

            $page->save();

            $this->grav->fireEvent('onAdminAfterSave', new Event(['page' => $page]));

            // Enqueue message and redirect to new location.
            $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.SUCCESSFULLY_COPIED'), 'info');
            $this->setRedirect($redirect);

        } catch (\Exception $e) {
            throw new \RuntimeException('Copying page failed on error: ' . $e->getMessage());
        }

        return true;
    }

    /**
     * Find the first available $item ('slug' | 'folder') for a page
     * Used when copying a page, to determine the first available slot
     *
     * @param string $item
     * @param Page   $page
     *
     * @return string The first available slot
     */
    protected function findFirstAvailable($item, $page)
    {
        if (!$page->parent()->children()) {
            return $page->$item();
        }

        $withoutPrefix = function ($string) {
            $match = preg_split('/^[0-9]+\./u', $string, 2, PREG_SPLIT_DELIM_CAPTURE);

            return isset($match[1]) ? $match[1] : $match[0];
        };

        $withoutPostfix = function ($string) {
            $match = preg_split('/-(\d+)$/', $string, 2, PREG_SPLIT_DELIM_CAPTURE);

            return $match[0];
        };

        /* $appendedNumber = function ($string) {
            $match  = preg_split('/-(\d+)$/', $string, 2, PREG_SPLIT_DELIM_CAPTURE);
            $append = (isset($match[1]) ? (int)$match[1] + 1 : 2);

            return $append;
        };*/

        $highest                   = 1;
        $siblings                  = $page->parent()->children();
        $findCorrectAppendedNumber = function ($item, $page_item, $highest) use (
            $siblings,
            &$findCorrectAppendedNumber,
            &$withoutPrefix
        ) {
            foreach ($siblings as $sibling) {
                if ($withoutPrefix($sibling->$item()) == ($highest === 1 ? $page_item : $page_item . '-' . $highest)) {
                    $highest = $findCorrectAppendedNumber($item, $page_item, $highest + 1);

                    return $highest;
                }
            }

            return $highest;
        };

        $base = $withoutPrefix($withoutPostfix($page->$item()));

        $return  = $base;
        $highest = $findCorrectAppendedNumber($item, $base, $highest);

        if ($highest > 1) {
            $return .= '-' . $highest;
        }

        return $return;
    }

    /**
     * Reorder pages.
     *
     * @return bool True if the action was performed.
     */
    protected function taskReorder()
    {
        if (!$this->authorizeTask('reorder pages', ['admin.pages', 'admin.super'])) {
            return false;
        }

        // Only applies to pages.
        if ($this->view !== 'pages') {
            return false;
        }

        $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.REORDERING_WAS_SUCCESSFUL'), 'info');

        return true;
    }

    /**
     * Delete page.
     *
     * @return bool True if the action was performed.
     * @throws \RuntimeException
     */
    protected function taskDelete()
    {
        if (!$this->authorizeTask('delete page', ['admin.pages', 'admin.super'])) {
            return false;
        }

        // Only applies to pages.
        if ($this->view !== 'pages') {
            return false;
        }

        try {
            $page = $this->admin->page();

            if (count($page->translatedLanguages()) > 1) {
                $page->file()->delete();
            } else {
                Folder::delete($page->path());
            }

            $this->grav->fireEvent('onAdminAfterDelete', new Event(['page' => $page]));

            Cache::clearCache('standard');

            // Set redirect to either referrer or pages list.
            $redirect = 'pages';

            $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.SUCCESSFULLY_DELETED'), 'info');
            $this->setRedirect($redirect);

        } catch (\Exception $e) {
            throw new \RuntimeException('Deleting page failed on error: ' . $e->getMessage());
        }

        return true;
    }

    /**
     * Switch the content language. Optionally redirect to a different page.
     *
     */
    protected function taskSwitchlanguage()
    {
        if (!$this->authorizeTask('switch language', ['admin.pages', 'admin.super'])) {
            return false;
        }

        $data = (array)$this->data;

        if (isset($data['lang'])) {
            $language = $data['lang'];
        } else {
            $language = $this->grav['uri']->param('lang');
        }

        if (isset($data['redirect'])) {
            $redirect = 'pages/' . $data['redirect'];
        } else {
            $redirect = 'pages';
        }


        if ($language) {
            $this->grav['session']->admin_lang = $language ?: 'en';
        }

        $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.SUCCESSFULLY_SWITCHED_LANGUAGE'), 'info');

        $admin_route = $this->admin->base;
        $this->setRedirect('/' . $language . $admin_route . '/' . $redirect);
    }

    /**
     * Handle direct install.
     */
    protected function taskDirectInstall()
    {
        if (!$this->authorizeTask('install', ['admin.super'])) {
            return false;
        }

        $file_path = isset($this->data['file_path']) ? $this->data['file_path'] : null ;

        if (isset($_FILES['uploaded_file'])) {

            // Check $_FILES['file']['error'] value.
            switch ($_FILES['uploaded_file']['error']) {
                case UPLOAD_ERR_OK:
                    break;
                case UPLOAD_ERR_NO_FILE:
                    $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.NO_FILES_SENT'), 'error');
                    return false;
                case UPLOAD_ERR_INI_SIZE:
                case UPLOAD_ERR_FORM_SIZE:
                    $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.EXCEEDED_FILESIZE_LIMIT'), 'error');
                    return false;
                case UPLOAD_ERR_NO_TMP_DIR:
                    $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.UPLOAD_ERR_NO_TMP_DIR'), 'error');
                    return false;
                default:
                    $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.UNKNOWN_ERRORS'), 'error');
                    return false;
            }

            $file_path = $_FILES['uploaded_file']['tmp_name'];
        }


        $result = Gpm::directInstall($file_path);

        if ($result === true) {
            $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.INSTALLATION_SUCCESSFUL'), 'info');
        } else {
            $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.INSTALLATION_FAILED') . ': ' . $result,
                'error');
        }

        $this->setRedirect('/tools');

        return true;
    }

    /**
     * Save the current page in a different language. Automatically switches to that language.
     *
     * @return bool True if the action was performed.
     */
    protected function taskSaveas()
    {
        if (!$this->authorizeTask('save', $this->dataPermissions())) {
            return false;
        }

        $data     = (array)$this->data;
        $language = $data['lang'];

        if ($language) {
            $this->grav['session']->admin_lang = $language ?: 'en';
        }

        $uri = $this->grav['uri'];
        $obj = $this->admin->page($uri->route());
        $this->preparePage($obj, false, $language);

        $file = $obj->file();
        if ($file) {
            $filename = $this->determineFilenameIncludingLanguage($obj->name(), $language);

            $path  = $obj->path() . DS . $filename;
            $aFile = File::instance($path);
            $aFile->save();

            $aPage = new Page();
            $aPage->init(new \SplFileInfo($path), $language . '.md');
            $aPage->header($obj->header());
            $aPage->rawMarkdown($obj->rawMarkdown());
            $aPage->template($obj->template());
            $aPage->validate();
            $aPage->filter();
            $aPage->save();

            $this->grav->fireEvent('onAdminAfterSave', new Event(['page' => $obj]));
        }

        $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.SUCCESSFULLY_SWITCHED_LANGUAGE'), 'info');
        $this->setRedirect('/' . $language . $uri->route());

        return true;
    }

    /**
     * The what should be the new filename when saving as a new language
     *
     * @param string $current_filename the current file name, including .md. Example: default.en.md
     * @param string $language         The new language it will be saved as. Example: 'it' or 'en-GB'.
     *
     * @return string The new filename. Example: 'default.it'
     */
    public function determineFilenameIncludingLanguage($current_filename, $language)
    {
        $filename = substr($current_filename, 0, -strlen('.md'));

        if (substr($filename, -3, 1) === '.') {
            $filename = str_replace(substr($filename, -2), $language, $filename);
        } elseif (substr($filename, -6, 1) === '.') {
            $filename = str_replace(substr($filename, -5), $language, $filename);
        } else {
            $filename .= '.' . $language;
        }

        return $filename . '.md';
    }


}
