<?php
namespace Grav\Plugin\Admin;

use Grav\Common\Config\Config;
use Grav\Common\Data\Data;
use Grav\Common\Filesystem\Folder;
use Grav\Common\Grav;
use Grav\Common\Media\Interfaces\MediaInterface;
use Grav\Common\Page\Media;
use Grav\Common\Utils;
use Grav\Common\Plugin;
use Grav\Common\Theme;
use RocketTheme\Toolbox\Event\Event;
use RocketTheme\Toolbox\File\File;

/**
 * Class AdminController
 *
 * @package Grav\Plugin
 */
class AdminBaseController
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
     * @var \Grav\Common\Uri
     */
    protected $uri;

    /**
     * @var Admin
     */
    protected $admin;

    /**
     * @var string
     */
    protected $redirect;

    /**
     * @var int
     */
    protected $redirectCode;

    protected $upload_errors = [
        0 => 'There is no error, the file uploaded with success',
        1 => 'The uploaded file exceeds the max upload size',
        2 => 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML',
        3 => 'The uploaded file was only partially uploaded',
        4 => 'No file was uploaded',
        6 => 'Missing a temporary folder',
        7 => 'Failed to write file to disk',
        8 => 'A PHP extension stopped the file upload'
    ];

    /** @var array */
    public $blacklist_views = [];

    /**
     * Performs a task.
     *
     * @return bool True if the action was performed successfully.
     */
    public function execute()
    {
        if (in_array($this->view, $this->blacklist_views, true)) {
            return false;
        }

        if (!$this->validateNonce()) {
            return false;
        }

        $method = 'task' . ucfirst($this->task);

        if (method_exists($this, $method)) {
            try {
                $success = $this->{$method}();
            } catch (\RuntimeException $e) {
                $success = true;
                $this->admin->setMessage($e->getMessage(), 'error');
            }
        } else {
            $success = $this->grav->fireEvent('onAdminTaskExecute',
                new Event(['controller' => $this, 'method' => $method]));
        }

        // Grab redirect parameter.
        $redirect = isset($this->post['_redirect']) ? $this->post['_redirect'] : null;
        unset($this->post['_redirect']);

        // Redirect if requested.
        if ($redirect) {
            $this->setRedirect($redirect);
        }

        return $success;
    }

    protected function validateNonce()
    {
        if (strtolower($_SERVER['REQUEST_METHOD']) === 'post') {
            if (isset($this->post['admin-nonce'])) {
                $nonce = $this->post['admin-nonce'];
            } else {
                $nonce = $this->grav['uri']->param('admin-nonce');
            }

            if (!$nonce || !Utils::verifyNonce($nonce, 'admin-form')) {
                if ($this->task === 'addmedia') {

                    $message = sprintf($this->admin->translate('PLUGIN_ADMIN.FILE_TOO_LARGE', null),
                        ini_get('post_max_size'));

                    //In this case it's more likely that the image is too big than POST can handle. Show message
                    $this->admin->json_response = [
                        'status'  => 'error',
                        'message' => $message
                    ];

                    return false;
                }

                $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.INVALID_SECURITY_TOKEN'), 'error');
                $this->admin->json_response = [
                    'status'  => 'error',
                    'message' => $this->admin->translate('PLUGIN_ADMIN.INVALID_SECURITY_TOKEN')
                ];

                return false;
            }
            unset($this->post['admin-nonce']);
        } else {
            if ($this->task === 'logout') {
                $nonce = $this->grav['uri']->param('logout-nonce');
                if (null === $nonce || !Utils::verifyNonce($nonce, 'logout-form')) {
                    $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.INVALID_SECURITY_TOKEN'),
                        'error');
                    $this->admin->json_response = [
                        'status'  => 'error',
                        'message' => $this->admin->translate('PLUGIN_ADMIN.INVALID_SECURITY_TOKEN')
                    ];

                    return false;
                }
            } else {
                $nonce = $this->grav['uri']->param('admin-nonce');
                if (null === $nonce || !Utils::verifyNonce($nonce, 'admin-form')) {
                    $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.INVALID_SECURITY_TOKEN'),
                        'error');
                    $this->admin->json_response = [
                        'status'  => 'error',
                        'message' => $this->admin->translate('PLUGIN_ADMIN.INVALID_SECURITY_TOKEN')
                    ];

                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Sets the page redirect.
     *
     * @param string $path The path to redirect to
     * @param int    $code The HTTP redirect code
     */
    public function setRedirect($path, $code = 303)
    {
        $this->redirect     = $path;
        $this->redirectCode = $code;
    }

    /**
     * Handles ajax upload for files.
     * Stores in a flash object the temporary file and deals with potential file errors.
     *
     * @return bool True if the action was performed.
     */
    public function taskFilesUpload()
    {
        if (null === $_FILES || !$this->authorizeTask('save', $this->dataPermissions())) {
            return false;
        }

        /** @var Config $config */
        $config   = $this->grav['config'];
        $data     = $this->view === 'pages' ? $this->admin->page(true) : $this->prepareData([]);
        $settings = $data->blueprints()->schema()->getProperty($this->post['name']);
        $settings = (object)array_merge([
            'avoid_overwriting' => false,
            'random_name'       => false,
            'accept'            => ['image/*'],
            'limit'             => 10,
            'filesize'          => $config->get('system.media.upload_limit', 5242880) // 5MB
        ], (array)$settings, ['name' => $this->post['name']]);

        $upload = $this->normalizeFiles($_FILES['data'], $settings->name);

        $filename = trim($upload->file->name);

        // Handle bad filenames.
        if (strtr($filename, "\t\n\r\0\x0b", '_____') !== $filename || rtrim($filename, '. ') !== $filename || preg_match('|\.php|', $filename)) {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => sprintf($this->admin->translate('PLUGIN_ADMIN.FILEUPLOAD_UNABLE_TO_UPLOAD', null),
                    $filename, 'Bad filename')
            ];

            return false;
        }

        if (!isset($settings->destination)) {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => $this->admin->translate('PLUGIN_ADMIN.DESTINATION_NOT_SPECIFIED', null)
            ];

            return false;
        }

        // Do not use self@ outside of pages
        if ($this->view !== 'pages' && in_array($settings->destination, ['@self', 'self@'])) {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => sprintf($this->admin->translate('PLUGIN_ADMIN.FILEUPLOAD_PREVENT_SELF', null),
                    $settings->destination)
            ];

            return false;
        }

        // Handle errors and breaks without proceeding further
        if ($upload->file->error !== UPLOAD_ERR_OK) {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => sprintf($this->admin->translate('PLUGIN_ADMIN.FILEUPLOAD_UNABLE_TO_UPLOAD', null),
                    $upload->file->name, $this->upload_errors[$upload->file->error])
            ];

            return false;
        }

        // Handle file size limits
        $settings->filesize *= 1048576; // 2^20 [MB in Bytes]
        if ($settings->filesize > 0 && $upload->file->size > $settings->filesize) {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => $this->admin->translate('PLUGIN_ADMIN.EXCEEDED_GRAV_FILESIZE_LIMIT')
            ];

            return false;
        }

        // Handle Accepted file types
        // Accept can only be mime types (image/png | image/*) or file extensions (.pdf|.jpg)
        $accepted = false;
        $errors   = [];

        foreach ((array)$settings->accept as $type) {
            // Force acceptance of any file when star notation
            if ($type === '*') {
                $accepted = true;
                break;
            }

            $isMime = strstr($type, '/');
            $find   = str_replace('*', '.*', $type);

            $match = preg_match('#' . $find . '$#', $isMime ? $upload->file->type : $upload->file->name);
            if (!$match) {
                $message  = $isMime ? 'The MIME type "' . $upload->file->type . '"' : 'The File Extension';
                $errors[] = $message . ' for the file "' . $upload->file->name . '" is not an accepted.';
                $accepted |= false;
            } else {
                $accepted |= true;
            }
        }

        if (!$accepted) {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => implode('<br />', $errors)
            ];

            return false;
        }

        // Remove the error object to avoid storing it
        unset($upload->file->error);

        // we need to move the file at this stage or else
        // it won't be available upon save later on
        // since php removes it from the upload location
        $tmp_dir  = Admin::getTempDir();
        $tmp_file = $upload->file->tmp_name;
        $tmp      = $tmp_dir . '/uploaded-files/' . basename($tmp_file);

        Folder::create(dirname($tmp));
        if (!move_uploaded_file($tmp_file, $tmp)) {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => sprintf($this->admin->translate('PLUGIN_ADMIN.FILEUPLOAD_UNABLE_TO_MOVE', null), '',
                    $tmp)
            ];

            return false;
        }

        $upload->file->tmp_name = $tmp;

        // Retrieve the current session of the uploaded files for the field
        // and initialize it if it doesn't exist
        $sessionField = base64_encode($this->grav['uri']->url());
        $flash        = $this->admin->session()->getFlashObject('files-upload');
        if (!$flash) {
            $flash = [];
        }
        if (!isset($flash[$sessionField])) {
            $flash[$sessionField] = [];
        }
        if (!isset($flash[$sessionField][$upload->field])) {
            $flash[$sessionField][$upload->field] = [];
        }

        // Set destination
        if ($this->grav['locator']->isStream($settings->destination)) {
            $destination = $this->grav['locator']->findResource($settings->destination, false, true);
        } else {
            $destination = Folder::getRelativePath(rtrim($settings->destination, '/'));
            $destination = $this->admin->getPagePathFromToken($destination);
        }

        // Create destination if needed
        if (!is_dir($destination)) {
            Folder::mkdir($destination);
        }

        // Generate random name if required
        if ($settings->random_name) { // TODO: document
            $extension          = pathinfo($upload->file->name)['extension'];
            $upload->file->name = Utils::generateRandomString(15) . '.' . $extension;
        }

        // Handle conflicting name if needed
        if ($settings->avoid_overwriting) { // TODO: document
            if (file_exists($destination . '/' . $upload->file->name)) {
                $upload->file->name = date('YmdHis') . '-' . $upload->file->name;
            }
        }

        // Prepare object for later save
        $path               = $destination . '/' . $upload->file->name;
        $upload->file->path = $path;
        // $upload->file->route = $page ? $path : null;

        // Prepare data to be saved later
        $flash[$sessionField][$upload->field][$path] = (array)$upload->file;

        // Finally store the new uploaded file in the field session
        $this->admin->session()->setFlashObject('files-upload', $flash);
        $this->admin->json_response = [
            'status'  => 'success',
            'session' => \json_encode([
                'sessionField' => base64_encode($this->grav['uri']->url()),
                'path'         => $upload->file->path,
                'field'        => $settings->name
            ])
        ];

        return true;
    }

    /**
     * Checks if the user is allowed to perform the given task with its associated permissions
     *
     * @param string $task        The task to execute
     * @param array  $permissions The permissions given
     *
     * @return bool True if authorized. False if not.
     */
    public function authorizeTask($task = '', $permissions = [])
    {
        if (!$this->admin->authorize($permissions)) {
            if ($this->grav['uri']->extension() === 'json') {
                $this->admin->json_response = [
                    'status'  => 'unauthorized',
                    'message' => $this->admin->translate('PLUGIN_ADMIN.INSUFFICIENT_PERMISSIONS_FOR_TASK') . ' ' . $task . '.'
                ];
            } else {
                $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.INSUFFICIENT_PERMISSIONS_FOR_TASK') . ' ' . $task . '.',
                    'error');
            }

            return false;
        }

        return true;
    }

    /**
     * Gets the permissions needed to access a given view
     *
     * @return array An array of permissions
     */
    protected function dataPermissions()
    {
        $type        = $this->view;
        $permissions = ['admin.super'];

        switch ($type) {
            case 'configuration':
            case 'config':
            case 'system':
                $permissions[] = 'admin.configuration';
                break;
            case 'settings':
            case 'site':
                $permissions[] = 'admin.settings';
                break;
            case 'plugins':
                $permissions[] = 'admin.plugins';
                break;
            case 'themes':
                $permissions[] = 'admin.themes';
                break;
            case 'users':
                $permissions[] = 'admin.users';
                break;
            case 'user':
                $permissions[] = 'admin.login';
                $permissions[] = 'admin.users';
                break;
            case 'pages':
                $permissions[] = 'admin.pages';
                break;
        }

        return $permissions;
    }

    /**
     * Gets the configuration data for a given view & post
     *
     * @param array $data
     *
     * @return array
     */
    protected function prepareData(array $data)
    {
        return $data;
    }

    /**
     * Internal method to normalize the $_FILES array
     *
     * @param array  $data $_FILES starting point data
     * @param string $key
     *
     * @return object a new Object with a normalized list of files
     */
    protected function normalizeFiles($data, $key = '')
    {
        $files        = new \stdClass();
        $files->field = $key;
        $files->file  = new \stdClass();

        foreach ($data as $fieldName => $fieldValue) {
            // Since Files Upload are always happening via Ajax
            // we are not interested in handling `multiple="true"`
            // because they are always handled one at a time.
            // For this reason we normalize the value to string,
            // in case it is arriving as an array.
            $value                     = (array)Utils::getDotNotation($fieldValue, $key);
            $files->file->{$fieldName} = array_shift($value);
        }

        return $files;
    }

    /**
     * Removes a file from the flash object session, before it gets saved
     *
     * @return bool True if the action was performed.
     */
    public function taskFilesSessionRemove()
    {
        if (!$this->authorizeTask('save', $this->dataPermissions()) || !isset($_FILES)) {
            return false;
        }

        // Retrieve the current session of the uploaded files for the field
        // and initialize it if it doesn't exist
        $sessionField = base64_encode($this->grav['uri']->url());
        $request      = \json_decode($this->post['session']);

        // Ensure the URI requested matches the current one, otherwise fail
        if ($request->sessionField !== $sessionField) {
            return false;
        }

        // Retrieve the flash object and remove the requested file from it
        $flash    = $this->admin->session()->getFlashObject('files-upload');
        $endpoint = $flash[$request->sessionField][$request->field][$request->path];

        if (isset($endpoint)) {
            if (file_exists($endpoint['tmp_name'])) {
                unlink($endpoint['tmp_name']);
            }

            unset($endpoint);
        }

        // Walk backward to cleanup any empty field that's left
        // Field
        if (isset($flash[$request->sessionField][$request->field][$request->path])) {
            unset($flash[$request->sessionField][$request->field][$request->path]);
        }

        // Field
        if (isset($flash[$request->sessionField][$request->field]) && empty($flash[$request->sessionField][$request->field])) {
            unset($flash[$request->sessionField][$request->field]);
        }

        // Session Field
        if (isset($flash[$request->sessionField]) && empty($flash[$request->sessionField])) {
            unset($flash[$request->sessionField]);
        }


        // If there's anything left to restore in the flash object, do so
        if (count($flash)) {
            $this->admin->session()->setFlashObject('files-upload', $flash);
        }

        $this->admin->json_response = ['status' => 'success'];

        return true;
    }

    /**
     * Redirect to the route stored in $this->redirect
     */
    public function redirect()
    {
        if (!$this->redirect) {
            return;
        }

        $base           = $this->admin->base;
        $this->redirect = '/' . ltrim($this->redirect, '/');
        $multilang      = $this->isMultilang();

        $redirect = '';
        if ($multilang) {
            // if base path does not already contain the lang code, add it
            $langPrefix = '/' . $this->grav['session']->admin_lang;
            if (!Utils::startsWith($base, $langPrefix . '/')) {
                $base = $langPrefix . $base;
            }

            // now the first 4 chars of base contain the lang code.
            // if redirect path already contains the lang code, and is != than the base lang code, then use redirect path as-is
            if (Utils::pathPrefixedByLangCode($base) && Utils::pathPrefixedByLangCode($this->redirect)
                && 0 !== strpos($this->redirect, substr($base, 0, 4))
            ) {
                $redirect = $this->redirect;
            } else {
                if (!Utils::startsWith($this->redirect, $base)) {
                    $this->redirect = $base . $this->redirect;
                }
            }

        } else {
            if (!Utils::startsWith($this->redirect, $base)) {
                $this->redirect = $base . $this->redirect;
            }
        }

        if (!$redirect) {
            $redirect = $this->redirect;
        }

        $this->grav->redirect($redirect, $this->redirectCode);
    }

    /**
     * Prepare and return POST data.
     *
     * @param array $post
     *
     * @return array
     */
    protected function getPost($post)
    {
        if (!is_array($post)) {
            return [];
        }

        unset($post['task']);

        // Decode JSON encoded fields and merge them to data.
        if (isset($post['_json'])) {
            $post = array_replace_recursive($post, $this->jsonDecode($post['_json']));
            unset($post['_json']);
        }

        $post = $this->cleanDataKeys($post);

        return $post;
    }

    /**
     * Recursively JSON decode data.
     *
     * @param  array $data
     *
     * @return array
     */
    protected function jsonDecode(array $data)
    {
        foreach ($data as &$value) {
            if (is_array($value)) {
                $value = $this->jsonDecode($value);
            } else {
                $value = json_decode($value, true);
            }
        }

        return $data;
    }

    protected function cleanDataKeys($source = [])
    {
        $out = [];

        if (is_array($source)) {
            foreach ($source as $key => $value) {
                $key = str_replace(['%5B', '%5D'], ['[', ']'], $key);
                if (is_array($value)) {
                    $out[$key] = $this->cleanDataKeys($value);
                } else {
                    $out[$key] = $value;
                }
            }
        }

        return $out;
    }

    /**
     * Return true if multilang is active
     *
     * @return bool True if multilang is active
     */
    protected function isMultilang()
    {
        return count($this->grav['config']->get('system.languages.supported', [])) > 1;
    }

    /**
     * @param \Grav\Common\Page\Page|\Grav\Common\Data\Data $obj
     *
     * @return \Grav\Common\Page\Page|\Grav\Common\Data\Data
     */
    protected function storeFiles($obj)
    {
        // Process previously uploaded files for the current URI
        // and finally store them. Everything else will get discarded
        $queue = $this->admin->session()->getFlashObject('files-upload');
        $queue = $queue[base64_encode($this->grav['uri']->url())];
        if (is_array($queue)) {
            foreach ($queue as $key => $files) {
                foreach ($files as $destination => $file) {
                    if (!rename($file['tmp_name'], $destination)) {
                        throw new \RuntimeException(sprintf($this->admin->translate('PLUGIN_ADMIN.FILEUPLOAD_UNABLE_TO_MOVE',
                            null), '"' . $file['tmp_name'] . '"', $destination));
                    }

                    unset($files[$destination]['tmp_name']);
                }

                if ($this->view === 'pages') {
                    $keys     = explode('.', preg_replace('/^header./', '', $key));
                    $init_key = array_shift($keys);
                    if (count($keys) > 0) {
                        $new_data = isset($obj->header()->{$init_key}) ? $obj->header()->{$init_key} : [];
                        Utils::setDotNotation($new_data, implode('.', $keys), $files, true);
                    } else {
                        $new_data = $files;
                    }
                    if (isset($obj->header()->{$init_key})) {
                        $obj->modifyHeader($init_key,
                            array_replace_recursive([], $obj->header()->{$init_key}, $new_data));
                    } else {
                        $obj->modifyHeader($init_key, $new_data);
                    }
                } else {
                    // TODO: [this is JS handled] if it's single file, remove existing and use set, if it's multiple, use join
                    $obj->join($key, $files); // stores
                }

            }
        }

        return $obj;
    }

    /**
     * Used by the filepicker field to get a list of files in a folder.
     */
    protected function taskGetFilesInFolder()
    {
        if (!$this->authorizeTask('save', $this->dataPermissions())) {
            return false;
        }

        $data = $this->view === 'pages' ? $this->admin->page(true) : $this->prepareData([]);

        if (null === $data) {
            return false;
        }

        if (method_exists($data, 'blueprints')) {
            $settings = $data->blueprints()->schema()->getProperty($this->post['name']);
        } elseif (method_exists($data, 'getBlueprint')) {
            $settings = $data->getBlueprint()->schema()->getProperty($this->post['name']);
        }

        if (isset($settings['folder'])) {
            $folder = $settings['folder'];
        } else {
            $folder = 'self@';
        }

        // Do not use self@ outside of pages
        if ($this->view !== 'pages' && in_array($folder, ['@self', 'self@', '@self@'])) {
            if (!$data instanceof MediaInterface) {
                $this->admin->json_response = [
                    'status'  => 'error',
                    'message' => sprintf($this->admin->translate('PLUGIN_ADMIN.FILEUPLOAD_PREVENT_SELF', null), $folder)
                ];

                return false;
            }

            $media = $data->getMedia();
        } else {
            // Set destination
            $folder = Folder::getRelativePath(rtrim($folder, '/'));
            $folder = $this->admin->getPagePathFromToken($folder);

            $media = new Media($folder);
        }

        $available_files = [];
        $metadata = [];
        $thumbs = [];


        foreach ($media->all() as $name => $medium) {

           $available_files[] = $name;

            if (isset($settings['include_metadata'])) {
                $img_metadata = $medium->metadata();
                if ($img_metadata) {
                    $metadata[$name] = $img_metadata;
                }
            }

        }

        // Peak in the flashObject for optimistic filepicker updates
        $pending_files = [];
        $sessionField  = base64_encode($this->grav['uri']->url());
        $flash         = $this->admin->session()->getFlashObject('files-upload');

        if ($flash && isset($flash[$sessionField])) {
            foreach ($flash[$sessionField] as $field => $data) {
                foreach ($data as $file) {
                    if (dirname($file['path']) === $folder) {
                        $pending_files[] = $file['name'];
                    }
                }
            }
        }

        $this->admin->session()->setFlashObject('files-upload', $flash);

        // Handle Accepted file types
        // Accept can only be file extensions (.pdf|.jpg)
        if (isset($settings['accept'])) {
            $available_files = array_filter($available_files, function ($file) use ($settings) {
                return $this->filterAcceptedFiles($file, $settings);
            });

            $pending_files = array_filter($pending_files, function ($file) use ($settings) {
                return $this->filterAcceptedFiles($file, $settings);
            });
        }

        // Generate thumbs if needed
        if (isset($settings['preview_images']) && $settings['preview_images'] === true) {
            foreach ($available_files as $filename) {
                $thumbs[$filename] = $media[$filename]->zoomCrop(100,100)->url();
            }
        }

        $this->admin->json_response = [
            'status'  => 'success',
            'files'   => array_values($available_files),
            'pending' => array_values($pending_files),
            'folder'  => $folder,
            'metadata' => $metadata,
            'thumbs' => $thumbs
        ];

        return true;
    }

    protected function filterAcceptedFiles($file, $settings)
    {
        $valid = false;

        foreach ((array)$settings['accept'] as $type) {
            $find = str_replace('*', '.*', $type);
            $valid |= preg_match('#' . $find . '$#', $file);
        }

        return $valid;
    }

    /**
     * Handle deleting a file from a blueprint
     *
     * @return bool True if the action was performed.
     */
    protected function taskRemoveFileFromBlueprint()
    {
        $uri       = $this->grav['uri'];
        $blueprint = base64_decode($uri->param('blueprint'));
        $path      = base64_decode($uri->param('path'));
        $proute    = base64_decode($uri->param('proute'));
        $type      = $uri->param('type');
        $field     = $uri->param('field');

        $this->taskRemoveMedia();

        if ($type === 'pages') {
            $page      = $this->admin->page(true, $proute);
            $keys      = explode('.', preg_replace('/^header./', '', $field));
            $header    = (array)$page->header();
            $data_path = implode('.', $keys);
            $data      = Utils::getDotNotation($header, $data_path);

            if (isset($data[$path])) {
                unset($data[$path]);
                Utils::setDotNotation($header, $data_path, $data);
                $page->header($header);
            }

            $page->save();
        } else {
            $blueprint_prefix = $type === 'config' ? '' : $type . '.';
            $blueprint_name   = str_replace(['config/', '/blueprints'], '', $blueprint);
            $blueprint_field  = $blueprint_prefix . $blueprint_name . '.' . $field;
            $files            = $this->grav['config']->get($blueprint_field);

            if ($files) {
                foreach ($files as $key => $value) {
                    if ($key == $path) {
                        unset($files[$key]);
                    }
                }
            }

            $this->grav['config']->set($blueprint_field, $files);

            switch ($type) {
                case 'config':
                    $data   = $this->grav['config']->get($blueprint_name);
                    $config = $this->admin->data($blueprint, $data);
                    $config->save();
                    break;
                case 'themes':
                    Theme::saveConfig($blueprint_name);
                    break;
                case 'plugins':
                    Plugin::saveConfig($blueprint_name);
                    break;
            }
        }

        $this->admin->json_response = [
            'status'  => 'success',
            'message' => $this->admin->translate('PLUGIN_ADMIN.REMOVE_SUCCESSFUL')
        ];

        return true;
    }

    /**
     * Handles removing a media file
     *
     * @return bool True if the action was performed
     */
    public function taskRemoveMedia()
    {
        if (!$this->canEditMedia()) {
            return false;
        }

        $filename = base64_decode($this->grav['uri']->param('route'));
        if (!$filename) {
            $filename = base64_decode($this->route);
        }

        $file                  = File::instance($filename);
        $resultRemoveMedia     = false;

        if ($file->exists()) {
            $resultRemoveMedia = $file->delete();

            $fileParts = pathinfo($filename);

            foreach (scandir($fileParts['dirname']) as $file) {
                $regex_pattern = '/' . preg_quote($fileParts['filename'], '/') . "@\d+x\." . $fileParts['extension'] . "(?:\.meta\.yaml)?$|" . preg_quote($fileParts['basename'], '/') . "\.meta\.yaml$/";
                if (preg_match($regex_pattern, $file)) {
                    $path = $fileParts['dirname'] . '/' . $file;
                    @unlink($path);
                }
            }

        }

        if ($resultRemoveMedia) {
            if ($this->grav['uri']->extension() === 'json') {
                $this->admin->json_response = [
                    'status'  => 'success',
                    'message' => $this->admin->translate('PLUGIN_ADMIN.REMOVE_SUCCESSFUL')
                ];
            } else {
                $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.REMOVE_SUCCESSFUL'), 'info');
                $this->clearMediaCache();
                $this->setRedirect('/media-manager');
            }

            return true;
        }

        if ($this->grav['uri']->extension() === 'json') {
            $this->admin->json_response = [
                'status'  => 'success',
                'message' => $this->admin->translate('PLUGIN_ADMIN.REMOVE_FAILED')
            ];
        } else {
            $this->admin->setMessage($this->admin->translate('PLUGIN_ADMIN.REMOVE_FAILED'), 'error');
        }

        return false;
    }

    /**
     * Handles clearing the media cache
     *
     * @return bool True if the action was performed
     */
    protected function clearMediaCache()
    {
        $key   = 'media-manager-files';
        $cache = $this->grav['cache'];
        $cache->delete(md5($key));

        return true;
    }

    /**
     * Determine if the user can edit media
     *
     * @param string $type
     *
     * @return bool True if the media action is allowed
     */
    protected function canEditMedia($type = 'media')
    {
        if (!$this->authorizeTask('edit media', ['admin.' . $type, 'admin.super'])) {
            return false;
        }

        return true;
    }
}
