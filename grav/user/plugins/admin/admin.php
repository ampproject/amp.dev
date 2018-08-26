<?php
namespace Grav\Plugin;

use Grav\Common\File\CompiledYamlFile;
use Grav\Common\Grav;
use Grav\Common\Inflector;
use Grav\Common\Language\Language;
use Grav\Common\Page\Page;
use Grav\Common\Page\Pages;
use Grav\Common\Plugin;
use Grav\Common\Uri;
use Grav\Common\Utils;
use Grav\Common\User\User;
use Grav\Plugin\Admin\Admin;
use Grav\Plugin\Admin\Popularity;
use Grav\Plugin\Admin\Themes;
use Grav\Plugin\Admin\AdminController;
use Grav\Plugin\Admin\Twig\AdminTwigExtension;
use Grav\Plugin\Form\Form;
use Grav\Plugin\Login\Login;
use RocketTheme\Toolbox\Event\Event;
use RocketTheme\Toolbox\Session\Session;

class AdminPlugin extends Plugin
{
    public $features = [
        'blueprints' => 1000,
    ];

    /**
     * @var bool
     */
    protected $active = false;

    /**
     * @var string
     */
    protected $template;

    /**
     * @var  string
     */
    protected $theme;

    /**
     * @var string
     */
    protected $route;

    /**
     * @var string
     */
    protected $admin_route;

    /**
     * @var Uri
     */
    protected $uri;

    /**
     * @var Admin
     */
    protected $admin;

    /**
     * @var Session
     */
    protected $session;

    /**
     * @var Popularity
     */
    protected $popularity;

    /**
     * @var string
     */
    protected $base;

    protected $version;

    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {

        return [
            'onPluginsInitialized' => [
                                        ['setup', 100000],
                                        ['onPluginsInitialized', 1001]
                                      ],
            'onPageInitialized'    => ['onPageInitialized', 0],
            'onShutdown'           => ['onShutdown', 1000],
            'onFormProcessed'      => ['onFormProcessed', 0],
            'onAdminDashboard'     => ['onAdminDashboard', 0],
            'onAdminTools'         => ['onAdminTools', 0],
        ];

    }

    public function onPageInitialized()
    {
        $page = $this->grav['page'];

        $template = $this->grav['uri']->param('tmpl');

        if ($template) {
            $page->template($template);
        }
    }

    /**
     * If the admin path matches, initialize the Login plugin configuration and set the admin
     * as active.
     */
    public function setup()
    {
        // Autoloader
        spl_autoload_register(function ($class) {
            if (Utils::startsWith($class, 'Grav\Plugin\Admin')) {
                require_once __DIR__ .'/classes/' . strtolower(basename(str_replace("\\", '/', $class))) . '.php';
            }
        });

        $route = $this->config->get('plugins.admin.route');
        if (!$route) {
            return;
        }

        $this->base = '/' . trim($route, '/');
        $this->admin_route = rtrim($this->grav['pages']->base(), '/') . $this->base;
        $this->uri = $this->grav['uri'];

        $users_exist = Admin::doAnyUsersExist();

        // If no users found, go to register
        if (!$users_exist) {
            if (!$this->isAdminPath()) {
                $this->grav->redirect($this->admin_route);
            }
            $this->template = 'register';
        }

        // Only activate admin if we're inside the admin path.
        if ($this->isAdminPath()) {
            $this->grav['session']->init();
            $this->active = true;

            // Set cache based on admin_cache option
            if (method_exists($this->grav['cache'], 'setEnabled')) {
                $this->grav['cache']->setEnabled($this->config->get('plugins.admin.cache_enabled'));
            }
        }
    }

    /**
     * Validate a value. Currently validates
     *
     * - 'user' for username format and username availability.
     * - 'password1' for password format
     * - 'password2' for equality to password1
     *
     * @param string $type  The field type
     * @param string $value The field value
     * @param string $extra Any extra value required
     *
     * @return bool
     */
    protected function validate($type, $value, $extra = '')
    {
        /** @var Login $login */
        $login = $this->grav['login'];

        return $login->validateField($type, $value, $extra);
    }

    /**
     * Process the admin registration form.
     *
     * @param Event $event
     */
    public function onFormProcessed(Event $event)
    {
        $form = $event['form'];
        $action = $event['action'];

        switch ($action) {
            case 'register_admin_user':

                if (Admin::doAnyUsersExist()) {
                    throw new \RuntimeException('A user account already exists, please create an admin account manually.');
                }

                if (!$this->config->get('plugins.login.enabled')) {
                    throw new \RuntimeException($this->grav['language']->translate('PLUGIN_LOGIN.PLUGIN_LOGIN_DISABLED'));
                }

                $data = [];
                $username = $form->value('username');

                if ($form->value('password1') !== $form->value('password2')) {
                    $this->grav->fireEvent('onFormValidationError', new Event([
                            'form'    => $form,
                            'message' => $this->grav['language']->translate('PLUGIN_LOGIN.PASSWORDS_DO_NOT_MATCH')
                        ]));
                    $event->stopPropagation();

                    return;
                }

                $data['password'] = $form->value('password1');

                $fields = [
                    'email',
                    'fullname',
                    'title'
                ];

                foreach ($fields as $field) {
                    // Process value of field if set in the page process.register_user
                    if (!isset($data[$field]) && $form->value($field)) {
                        $data[$field] = $form->value($field);
                    }
                }

                // Don't store plain text password or username (part of the filename).
                unset($data['password1'], $data['password2'], $data['username']);

                // Extra lowercase to ensure file is saved lowercase
                $username = strtolower($username);

                $inflector = new Inflector();

                $data['fullname'] = isset($data['fullname']) ? $data['fullname'] : $inflector->titleize($username);
                $data['title'] = isset($data['title']) ? $data['title'] : 'Administrator';
                $data['state'] = 'enabled';
                $data['access'] = ['admin' => ['login' => true, 'super' => true], 'site' => ['login' => true]];

                // Create user object and save it
                $user = new User($data);
                $file = CompiledYamlFile::instance($this->grav['locator']->findResource('user://accounts/' . $username . YAML_EXT,
                    true, true));
                $user->file($file);
                $user->save();
                $user = User::load($username);

                //Login user
                $this->grav['session']->user = $user;
                unset($this->grav['user']);
                $this->grav['user'] = $user;
                $user->authenticated = true;
                $user->authorized = $user->authorize('admin.login');

                $messages = $this->grav['messages'];
                $messages->add($this->grav['language']->translate('PLUGIN_ADMIN.LOGIN_LOGGED_IN'), 'info');
                $this->grav->redirect($this->admin_route);

                break;
        }
    }

    /**
     * If the admin plugin is set as active, initialize the admin
     */
    public function onPluginsInitialized()
    {
        // Only activate admin if we're inside the admin path.
        if ($this->active) {
            // Store this version.
            $this->version = $this->getBlueprint()->version;

            // Have a unique Admin-only Cache key
            if (method_exists($this->grav['cache'], 'setKey')) {
                $cache = $this->grav['cache'];
                $cache_key = $cache->getKey();
                $cache->setKey($cache_key . '$');
            }

            // Turn on Twig autoescaping
            if (method_exists($this->grav['twig'], 'setAutoescape') && $this->grav['uri']->param('task') !== 'processmarkdown') {
                $this->grav['twig']->setAutoescape(true);
            }

            $this->grav['debugger']->addMessage("Admin Basic");
            $this->initializeAdmin();

            // Disable Asset pipelining (old method - remove this after Grav is updated)
            if (!method_exists($this->grav['assets'], 'setJsPipeline')) {
                $this->config->set('system.assets.css_pipeline', false);
                $this->config->set('system.assets.js_pipeline', false);
            }

            // Replace themes service with admin.
            $this->grav['themes'] = function () {
                return new Themes($this->grav);
            };
        }

        // We need popularity no matter what
        $this->popularity = new Popularity();

        // Fire even to register permissions from other plugins
        $this->grav->fireEvent('onAdminRegisterPermissions', new Event(['admin' => $this->admin]));
    }

    protected function initializeController($task, $post)
    {
        $controller = new AdminController();
        $controller->initialize($this->grav, $this->template, $task, $this->route, $post);
        $controller->execute();
        $controller->redirect();
    }

    /**
     * Sets longer path to the home page allowing us to have list of pages when we enter to pages section.
     */
    public function onPagesInitialized()
    {
        $config = $this->config;

        // Force SSL with redirect if required
        if ($config->get('system.force_ssl')) {
            if (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] !== 'on') {
                $url = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
                $this->grav->redirect($url);
            }
        }

        $this->session = $this->grav['session'];

        // Set original route for the home page.
        $home = '/' . trim($this->config->get('system.home.alias'), '/');

        // set the default if not set before
        $this->session->expert = $this->session->expert ?: false;

        // set session variable if it's passed via the url
        if ($this->uri->param('mode') === 'expert') {
            $this->session->expert = true;
        } elseif ($this->uri->param('mode') === 'normal') {
            $this->session->expert = false;
        }

        /** @var Pages $pages */
        $pages = $this->grav['pages'];

        $this->grav['admin']->routes = $pages->routes();

        // Remove default route from routes.
        if (isset($this->grav['admin']->routes['/'])) {
            unset($this->grav['admin']->routes['/']);
        }

        $page = $pages->dispatch('/', true);

        // If page is null, the default page does not exist, and we cannot route to it
        if ($page) {
            $page->route($home);
        }

        // Make local copy of POST.
        $post = !empty($_POST) ? $_POST : [];

        // Handle tasks.
        $this->admin->task = $task = !empty($post['task']) ? $post['task'] : $this->uri->param('task');
        if ($task) {
            $this->initializeController($task, $post);
        } elseif ($this->template === 'logs' && $this->route) {
            // Display RAW error message.
            echo $this->admin->logEntry();
            exit();
        }

        $self = $this;

        // make sure page is not frozen!
        unset($this->grav['page']);

        $this->admin->pagesCount();

        // Replace page service with admin.
        $this->grav['page'] = function () use ($self) {
            $page = new Page;
            $page->expires(0);

            // First look in the pages provided by the Admin plugin itself
            if (file_exists(__DIR__ . "/pages/admin/{$self->template}.md")) {
                $page->init(new \SplFileInfo(__DIR__ . "/pages/admin/{$self->template}.md"));
                $page->slug(basename($self->template));
                return $page;
            }

            // If not provided by Admin, lookup pages added by other plugins
            $plugins = $this->grav['plugins'];
            $locator = $this->grav['locator'];

            foreach ($plugins as $plugin) {
                if ($this->config->get("plugins.{$plugin->name}.enabled") !== true) {
                    continue;
                }

                $path = $locator->findResource("user://plugins/{$plugin->name}/admin/pages/{$self->template}.md");

                if ($path) {
                    $page->init(new \SplFileInfo($path));
                    $page->slug(basename($self->template));

                    return $page;
                }
            }

            return null;
        };

        if (empty($this->grav['page'])) {
            if ($this->grav['user']->authenticated) {
                $event = $this->grav->fireEvent('onPageNotFound');

                if (isset($event->page)) {
                    unset($this->grav['page']);
                    $this->grav['page'] = $event->page;
                } else {
                    throw new \RuntimeException('Page Not Found', 404);
                }
            } else {
                $this->grav->redirect($this->admin_route);
            }
        }

        // Explicitly set a timestamp on assets
        $this->grav['assets']->setTimestamp(substr(md5(GRAV_VERSION . $this->grav['config']->checksum()), 0, 10));
    }

    /**
     * Handles initializing the assets
     */
    public function onAssetsInitialized()
    {
        // Disable Asset pipelining
        $assets = $this->grav['assets'];
        $assets->setJsPipeline(false);
        $assets->setCssPipeline(false);
    }

    /**
     * Add twig paths to plugin templates.
     */
    public function onTwigTemplatePaths()
    {
        $twig_paths = [];
        $this->grav->fireEvent('onAdminTwigTemplatePaths', new Event(['paths' => &$twig_paths]));

        $twig_paths[] = __DIR__ . '/themes/' . $this->theme . '/templates';

        $this->grav['twig']->twig_paths = $twig_paths;
    }

    /**
     * Set all twig variables for generating output.
     */
    public function onTwigSiteVariables()
    {
        $twig = $this->grav['twig'];
        $page = $this->grav['page'];

        $twig->twig_vars['location'] = $this->template;
        $twig->twig_vars['base_url_relative_frontend'] = $twig->twig_vars['base_url_relative'] ?: '/';
        $twig->twig_vars['admin_route'] = trim($this->admin_route, '/');
        $twig->twig_vars['current_route'] = '/' . $twig->twig_vars['admin_route'] . '/' . $this->template . '/' . $this->route;
        $twig->twig_vars['base_url_relative'] = $twig->twig_vars['base_url_simple'] . '/' . $twig->twig_vars['admin_route'];
        $twig->twig_vars['current_url'] = rtrim($twig->twig_vars['base_url_relative'] . '/' . $this->template . '/' . $this->route, '/');
        $theme_url = '/' . ltrim($this->grav['locator']->findResource('plugin://admin/themes/' . $this->theme,
            false), '/');
        $twig->twig_vars['theme_url'] = $theme_url;
        $twig->twig_vars['base_url'] = $twig->twig_vars['base_url_relative'];
        $twig->twig_vars['base_path'] = GRAV_ROOT;
        $twig->twig_vars['admin'] = $this->admin;
        $twig->twig_vars['admin_version'] = $this->version;

        $fa_icons_file = CompiledYamlFile::instance($this->grav['locator']->findResource('plugin://admin/themes/grav/templates/forms/fields/iconpicker/icons' . YAML_EXT));
        $fa_icons = $fa_icons_file->content();
        $fa_icons = array_map(function ($icon) {
            //only pick used values
            return ['id' => $icon['id'], 'unicode' => $icon['unicode']];
        }, $fa_icons['icons']);

        $twig->twig_vars['fa_icons'] = $fa_icons;

        // add form if it exists in the page
        $header = $page->header();

        $forms = [];
        if (isset($header->forms)) foreach ($header->forms as $key => $form) {
            $forms[$key] = new Form($page, null, $form);
        }
        $twig->twig_vars['forms'] = $forms;

        // preserve form validation
        if (!isset($twig->twig_vars['form'])) {
            if (isset($header->form)) {
                $twig->twig_vars['form'] = new Form($page);
            } elseif (isset($header->forms)) {
                $twig->twig_vars['form'] = new Form($page, null, reset($header->forms));
            }
        }

        // Gather Plugin-hooked nav items
        $this->grav->fireEvent('onAdminMenu');

        switch ($this->template) {
            case 'dashboard':
                $twig->twig_vars['popularity'] = $this->popularity;

                // Gather Plugin-hooked dashboard items
                $this->grav->fireEvent('onAdminDashboard');

                break;
        }

        $flashData = $this->grav['session']->getFlashCookieObject(Admin::TMP_COOKIE_NAME);

        if (isset($flashData->message)) {
            $this->grav['messages']->add($flashData->message, $flashData->status);
        }
    }

    /**
     * Handles the shutdown
     */
    public function onShutdown()
    {
        if ($this->active) {
            //only activate when Admin is active
            if ($this->admin->shouldLoadAdditionalFilesInBackground()) {
                $this->admin->loadAdditionalFilesInBackground();
            }
        } else {
            //if popularity is enabled, track non-admin hits
            if ($this->config->get('plugins.admin.popularity.enabled')) {
                $this->popularity->trackHit();
            }
        }
    }

    /**
     * Get list of form field types specified in this plugin. Only special types needs to be listed.
     *
     * @return array
     */
    public function getFormFieldTypes()
    {
        return [
            'column'   => [
                'input@' => false
            ],
            'columns'  => [
                'input@' => false
            ],
            'fieldset' => [
                'input@' => false
            ],
            'section'  => [
                'input@' => false
            ],
            'tab'      => [
                'input@' => false
            ],
            'tabs'     => [
                'input@' => false
            ],
            'key'      => [
                'input@' => false
            ],
            'list'     => [
                'array' => true
            ],
            'file'     => [
                'array' => true
            ]
        ];
    }

    /**
     * Initialize the admin.
     *
     * @throws \RuntimeException
     */
    protected function initializeAdmin()
    {
        $this->enable([
            'onTwigExtensions'           => ['onTwigExtensions', 1000],
            'onPagesInitialized'         => ['onPagesInitialized', 1000],
            'onTwigTemplatePaths'        => ['onTwigTemplatePaths', 1000],
            'onTwigSiteVariables'        => ['onTwigSiteVariables', 1000],
            'onAssetsInitialized'        => ['onAssetsInitialized', 1000],
            'onAdminRegisterPermissions' => ['onAdminRegisterPermissions', 0],
            'onOutputGenerated'          => ['onOutputGenerated', 0],
            'onAdminAfterSave'           => ['onAdminAfterSave', 0],
        ]);

        // Autoload classes
        require_once __DIR__ . '/vendor/autoload.php';


        // Check for required plugins
        if (!$this->grav['config']->get('plugins.login.enabled') || !$this->grav['config']->get('plugins.form.enabled') || !$this->grav['config']->get('plugins.email.enabled')) {
            throw new \RuntimeException('One of the required plugins is missing or not enabled');
        }

        // Initialize Admin Language if needed
        /** @var Language $language */
        $language = $this->grav['language'];
        if ($language->enabled() && empty($this->grav['session']->admin_lang)) {
            $this->grav['session']->admin_lang = $language->getLanguage();
        }

        // Decide admin template and route.
        $path = trim(substr($this->uri->route(), strlen($this->base)), '/');

        if (empty($this->template)) {
            $this->template = 'dashboard';
        }

        // Can't access path directly...
        if ($path && $path !== 'register') {
            $array = explode('/', $path, 2);
            $this->template = array_shift($array);
            $this->route = array_shift($array);
        }

        // Initialize admin class.
        $this->admin = new Admin($this->grav, $this->admin_route, $this->template, $this->route);


        // And store the class into DI container.
        $this->grav['admin'] = $this->admin;

        // Double check we have system.yaml, site.yaml etc
        $config_path = $this->grav['locator']->findResource('user://config');
        foreach ($this->admin->configurations() as $config_file) {
            $config_file = "{$config_path}/{$config_file}.yaml";
            if (!file_exists($config_file)) {
                touch($config_file);
            }
        }

        // Get theme for admin
        $this->theme = $this->config->get('plugins.admin.theme', 'grav');

        $assets = $this->grav['assets'];
        $translations = 'this.GravAdmin = this.GravAdmin || {}; if (!this.GravAdmin.translations) this.GravAdmin.translations = {}; ' . PHP_EOL . 'this.GravAdmin.translations.PLUGIN_ADMIN = {';

        // Enable language translations
        $translations_actual_state = $this->config->get('system.languages.translations');
        $this->config->set('system.languages.translations', true);

        $strings = [
            'EVERYTHING_UP_TO_DATE',
            'UPDATES_ARE_AVAILABLE',
            'IS_AVAILABLE_FOR_UPDATE',
            'AND',
            'IS_NOW_AVAILABLE',
            'CURRENT',
            'UPDATE_GRAV_NOW',
            'TASK_COMPLETED',
            'UPDATE',
            'UPDATING_PLEASE_WAIT',
            'GRAV_SYMBOLICALLY_LINKED',
            'OF_YOUR',
            'OF_THIS',
            'HAVE_AN_UPDATE_AVAILABLE',
            'UPDATE_AVAILABLE',
            'UPDATES_AVAILABLE',
            'FULLY_UPDATED',
            'DAYS',
            'PAGE_MODES',
            'PAGE_TYPES',
            'ACCESS_LEVELS',
            'NOTHING_TO_SAVE',
            'FILE_UNSUPPORTED',
            'FILE_ERROR_ADD',
            'FILE_ERROR_UPLOAD',
            'DROP_FILES_HERE_TO_UPLOAD',
            'DELETE',
            'UNSET',
            'INSERT',
            'METADATA',
            'VIEW',
            'UNDO',
            'REDO',
            'HEADERS',
            'BOLD',
            'ITALIC',
            'STRIKETHROUGH',
            'SUMMARY_DELIMITER',
            'LINK',
            'IMAGE',
            'BLOCKQUOTE',
            'UNORDERED_LIST',
            'ORDERED_LIST',
            'EDITOR',
            'PREVIEW',
            'FULLSCREEN',
            'MODULAR',
            'NON_MODULAR',
            'VISIBLE',
            'NON_VISIBLE',
            'ROUTABLE',
            'NON_ROUTABLE',
            'PUBLISHED',
            'NON_PUBLISHED',
            'PLUGINS',
            'THEMES',
            'ALL',
            'FROM',
            'TO',
            'DROPZONE_CANCEL_UPLOAD',
            'DROPZONE_CANCEL_UPLOAD_CONFIRMATION',
            'DROPZONE_DEFAULT_MESSAGE',
            'DROPZONE_FALLBACK_MESSAGE',
            'DROPZONE_FALLBACK_TEXT',
            'DROPZONE_FILE_TOO_BIG',
            'DROPZONE_INVALID_FILE_TYPE',
            'DROPZONE_MAX_FILES_EXCEEDED',
            'DROPZONE_REMOVE_FILE',
            'DROPZONE_RESPONSE_ERROR'
        ];

        foreach ($strings as $string) {
            $separator = (end($strings) === $string) ? '' : ',';
            $translations .= '"' . $string . '": "' . htmlspecialchars($this->admin->translate('PLUGIN_ADMIN.' . $string)) . '"' . $separator;
        }

        $translations .= '};';

        $translations .= 'this.GravAdmin.translations.PLUGIN_FORM = {';
        $strings = ['RESOLUTION_MIN', 'RESOLUTION_MAX'];
        foreach ($strings as $string) {
            $separator = (end($strings) === $string) ? '' : ',';
            $translations .= '"' . $string . '": "' . $this->admin->translate('PLUGIN_FORM.' . $string) . '"' . $separator;
        }

        $translations .= '};';

        // set the actual translations state back
        $this->config->set('system.languages.translations', $translations_actual_state);

        $assets->addInlineJs($translations);
    }

    /**
     * Add the Admin Twig Extensions
     */
    public function onTwigExtensions()
    {
        require_once __DIR__ . '/classes/Twig/AdminTwigExtension.php';

        $this->grav['twig']->twig->addExtension(new AdminTwigExtension);
    }

    /**
     * Check if the current route is under the admin path
     *
     * @return bool
     */
    public function isAdminPath()
    {
        $route = $this->uri->route();

        return $route === $this->base || 0 === strpos($route, $this->base . '/');
    }

    public function onAdminAfterSave(Event $event)
    {
        // Special case to redirect after changing the admin route to avoid 'breaking'
        $obj = $event['object'];

        if (null !== $obj && method_exists($obj, 'blueprints')) {
            $blueprint = $obj->blueprints()->getFilename();

            if ($blueprint === 'admin/blueprints' && isset($obj->route) && $this->admin_route !== $obj->route) {
                $redirect = preg_replace('/^' . str_replace('/','\/',$this->admin_route) . '/',$obj->route,$this->uri->path());
                $this->grav->redirect($redirect);
            }
        }
    }

    /**
     * Provide the tools for the Tools page, currently only direct install
     *
     * @return Event
     */
    public function onAdminTools(Event $event)
    {
        $event['tools'] = array_merge($event['tools'], [$this->grav['language']->translate('PLUGIN_ADMIN.DIRECT_INSTALL')]);
        return $event;
    }

    public function onAdminDashboard()
    {
        $this->grav['twig']->plugins_hooked_dashboard_widgets_top[] = ['template' => 'dashboard-maintenance'];
        $this->grav['twig']->plugins_hooked_dashboard_widgets_top[] = ['template' => 'dashboard-statistics'];
        $this->grav['twig']->plugins_hooked_dashboard_widgets_top[] = ['template' => 'dashboard-notifications'];
        $this->grav['twig']->plugins_hooked_dashboard_widgets_top[] = ['template' => 'dashboard-feed'];
        $this->grav['twig']->plugins_hooked_dashboard_widgets_main[] = ['template' => 'dashboard-pages'];
    }

    public function onOutputGenerated()
    {
        // Clear flash objects for previously uploaded files
        // whenever the user switches page / reloads
        // ignoring any JSON / extension call
        if ($this->admin->task !== 'save' && empty($this->uri->extension())) {
            // Discard any previously uploaded files session.
            // and if there were any uploaded file, remove them from the filesystem
            if ($flash = $this->session->getFlashObject('files-upload')) {
                $flash = new \RecursiveIteratorIterator(new \RecursiveArrayIterator($flash));
                foreach ($flash as $key => $value) {
                    if ($key !== 'tmp_name') {
                        continue;
                    }
                    @unlink($value);
                }
            }
        }
    }

    /**
     * Initial stab at registering permissions (WIP)
     *
     * @param Event $e
     */
    public function onAdminRegisterPermissions(Event $e)
    {
        $admin = $e['admin'];
        $permissions = [
            'admin.super'         => 'boolean',
            'admin.login'         => 'boolean',
            'admin.cache'         => 'boolean',
            'admin.configuration' => 'boolean',
            'admin.configuration_system' => 'boolean',
            'admin.configuration_site' => 'boolean',
            'admin.configuration_media' => 'boolean',
            'admin.configuration_info' => 'boolean',
            'admin.settings'      => 'boolean',
            'admin.pages'         => 'boolean',
            'admin.maintenance'   => 'boolean',
            'admin.statistics'    => 'boolean',
            'admin.plugins'       => 'boolean',
            'admin.themes'        => 'boolean',
            'admin.users'         => 'boolean',
        ];
        $admin->addPermissions($permissions);
    }

    /**
     * Helper function to replace Pages::Types()
     * and to provide an event to manipulate the data
     *
     * Dispatches 'onAdminPageTypes' event
     * with 'types' data member which is a
     * reference to the data
     */
    public static function pagesTypes()
    {
        $types = Pages::types();

        // First filter by configuration
        $hideTypes = Grav::instance()['config']->get('plugins.admin.hide_page_types', []);
        foreach ((array) $hideTypes as $type) {
            unset($types[$type]);
        }

        // Allow manipulating of the data by event
        $e = new Event(['types' => &$types]);
        Grav::instance()->fireEvent('onAdminPageTypes', $e);

        return $types;
    }

    /**
     * Helper function to replace Pages::modularTypes()
     * and to provide an event to manipulate the data
     *
     * Dispatches 'onAdminModularPageTypes' event
     * with 'types' data member which is a
     * reference to the data
     */
    public static function pagesModularTypes()
    {
        $types = Pages::modularTypes();

        // First filter by configuration
        $hideTypes = (array) Grav::instance()['config']->get('plugins.admin.hide_modular_page_types', []);
        foreach ($hideTypes as $type) {
            unset($types[$type]);
        }

        // Allow manipulating of the data by event
        $e = new Event(['types' => &$types]);
        Grav::instance()->fireEvent('onAdminModularPageTypes', $e);

        return $types;
    }
}
