<?php
namespace Grav\Plugin\Form;

use Grav\Common\Data\Data;
use Grav\Common\Data\Blueprint;
use Grav\Common\Data\ValidationException;
use Grav\Common\Filesystem\Folder;
use Grav\Common\Grav;
use Grav\Common\Inflector;
use Grav\Common\Iterator;
use Grav\Common\Page\Page;
use Grav\Common\Utils;
use RocketTheme\Toolbox\Event\Event;

class Form extends Iterator implements \Serializable
{
    const BYTES_TO_MB = 1048576;

    /**
     * @var string
     */
    public $message;

    /**
     * @var int
     */
    public $response_code;

    /**
     * @var string
     */
    public $status = 'success';

    /**
     * @var array
     */
    protected $header_data = [];

    /**
     * @var array
     */
    protected $rules = [];

    /**
     * Data values of the form (values to be stored)
     *
     * @var Data $data
     */
    protected $data;

    /**
     * Form header items
     *
     * @var Data $items
     */
    protected $items = [];

    /**
     * All the form data values, including non-data
     *
     * @var Data $values
     */
    protected $values;

    /**
     * The form page object
     *
     * @var Page $page
     */
    protected $page;


    /**
     * Create form for the given page.
     *
     * @param Page $page
     * @param string|int|null $name
     * @param null $form
     */
    public function __construct(Page $page, $name = null, $form = null)
    {
        parent::__construct();

        $this->page = $page->route();

        $header = $page->header();
        $this->rules = isset($header->rules) ? $header->rules : [];
        $this->header_data = isset($header->data) ? $header->data : [];

        if ($form) {
            // If form is given, use it.
            $this->items = $form;
        } elseif ($name && isset($header->forms[$name])) {
            // If form with that name was found, use that.
             $this->items = $header->forms[$name];
        } elseif (isset($header->form)) {
            // For backwards compatibility.
            $this->items = $header->form;
        } elseif (!empty($header->forms)) {
            // Pick up the first form.
            $form = reset($header->forms);
            $name = key($header->forms);
            $this->items = $form;
        }

        // Add form specific rules.
        if (!empty($this->items['rules']) && is_array($this->items['rules'])) {
            $this->rules += $this->items['rules'];
        }

        // Set form name if not set.
        if ($name && !is_int($name)) {
            $this->items['name'] = $name;
        } elseif (empty($this->items['name'])) {
            $this->items['name'] = $page->slug();
        }

        // Set form id if not set.
        if (empty($this->items['id'])) {
            $inflector = new Inflector();
            $this->items['id'] = $inflector->hyphenize($this->items['name']);
        }

        // Reset and initialize the form
        $this->reset();
    }

    /**
     * Custom serializer for this complex object
     *
     * @return string
     */
    public function serialize()
    {
        $data = [
            'items' => $this->items,
            'message' => $this->message,
            'status' => $this->status,
            'header_data' => $this->header_data,
            'rules' => $this->rules,
            'data' => $this->data->toArray(),
            'values' => $this->values->toArray(),
            'page' => $this->page
        ];
        return serialize($data);
    }

    /**
     * Custom unserializer for this complex object
     *
     * @param string $data
     */
    public function unserialize($data)
    {
        $data = unserialize($data);

        $this->items = $data['items'];
        $this->message = $data['message'];
        $this->status = $data['status'];
        $this->header_data = $data['header_data'];
        $this->rules = $data['rules'];

        $name = $this->items['name'];
        $items = $this->items;
        $rules = $this->rules;

        $blueprint  = function () use ($name, $items, $rules) {
            $blueprint = new Blueprint($name, ['form' => $items, 'rules' => $rules]);
            return $blueprint->load()->init();
        };

        $this->data = new Data($data['data'], $blueprint);
        $this->values = new Data($data['values']);
        $this->page = $data['page'];
    }

    /**
     * Allow overriding of fields.
     *
     * @param array $fields
     */
    public function setFields(array $fields = [])
    {
        // Make sure blueprints are updated, otherwise validation may fail.
        $blueprint = $this->data->blueprints();
        $blueprint->set('form/fields', $fields);
        $blueprint->undef('form/field');

        $this->fields = $fields;
    }

    /**
     * Get the name of this form.
     *
     * @return String
     */
    public function name()
    {
        return $this->items['name'];
    }

    /**
     * Reset data.
     */
    public function reset()
    {
        $name = $this->items['name'];
        $grav = Grav::instance();

        // Fix naming for fields (supports nested fields now!)
        if (isset($this->items['fields'])) {
            $this->items['fields'] = $this->processFields($this->items['fields']);
        }

        $items = $this->items;
        $rules = $this->rules;

        $blueprint = function() use ($name, $items, $rules) {
            $blueprint = new Blueprint($name, ['form' => $items, 'rules' => $rules]);
            return $blueprint->load()->init();
        };

        $this->data = new Data($this->header_data, $blueprint);
        $this->values = new Data();
        $this->fields = $this->fields(true);

        // Fire event
        $grav->fireEvent('onFormInitialized', new Event(['form' => $this]));
    }

    protected function processFields($fields)
    {
        $types = Grav::instance()['plugins']->formFieldTypes;

        $return = array();
        foreach ($fields as $key => $value) {
            // default to text if not set
            if (!isset($value['type'])) {
                $value['type'] = 'text';
            }

            // manually merging the field types
            if ($types !== null && array_key_exists($value['type'], $types)) {
                $value += $types[$value['type']];
            }

            // Fix numeric indexes
            if (is_numeric($key) && isset($value['name'])) {
                $key = $value['name'];
            }
            if (isset($value['fields']) && is_array($value['fields'])) {
                $value['fields'] = $this->processFields($value['fields']);
            }
            $return[$key] = $value;
        }
        return $return;
    }

    public function fields($reset = false)
    {

        if ($reset || null === $this->fields) {
            $blueprint = $this->data->blueprints();

            if (method_exists($blueprint, 'load')) {
                // init the form to process directives
                $blueprint->load()->init();

                // fields set to processed blueprint fields
                $this->fields = $blueprint->fields();
            }
        }

        return $this->fields;
    }

    /**
     * Return page object for the form.
     *
     * @return Page
     */
    public function page()
    {
        return Grav::instance()['pages']->dispatch($this->page);
    }

    /**
     * Get value of given variable (or all values).
     * First look in the $data array, fallback to the $values array
     *
     * @param string $name
     *
     * @return mixed
     */
    public function value($name = null, $fallback = false)
    {
        if (!$name) {
            return $this->data;
        }

        if ($this->data->get($name)) {
            return $this->data->get($name);
        }

        if ($fallback) {
            return $this->values->get($name);
        }

        return null;
    }

    /**
     * Set value of given variable in the values array
     *
     * @param string $name
     */
    public function setValue($name = null, $value = '')
    {
        if (!$name) {
            return;
        }

        $this->values->set($name, $value);
    }

    /**
     * Get a value from the form
     *
     * @param $name
     * @return mixed
     */
    public function getValue($name)
    {
        return $this->values->get($name);
    }

    /**
     * @return Data
     */
    public function getValues()
    {
        return $this->values;
    }

    /**
     * Get all data
     *
     * @return Data
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * Set value of given variable in the data array
     *
     * @param string $name
     * @param string $value
     *
     * @return bool
     */
    public function setData($name = null, $value = '')
    {
        if (!$name) {
            return false;
        }

        $this->data->set($name, $value);

        return true;
    }

    public function setAllData($array)
    {
        $this->data = new Data($array);
    }

    /**
     * Handles ajax upload for files.
     * Stores in a flash object the temporary file and deals with potential file errors.
     *
     * @return mixed True if the action was performed.
     */
    public function uploadFiles()
    {
        $post = $_POST;
        $grav = Grav::instance();
        $uri = $grav['uri']->url;
        $config = $grav['config'];
        $session = $grav['session'];

        $settings = $this->data->blueprints()->schema()->getProperty($post['name']);
        $settings = (object) array_merge(
            ['destination' => $config->get('plugins.form.files.destination', 'self@'),
             'avoid_overwriting' => $config->get('plugins.form.files.avoid_overwriting', false),
             'random_name' => $config->get('plugins.form.files.random_name', false),
             'accept' => $config->get('plugins.form.files.accept', ['image/*']),
             'limit' => $config->get('plugins.form.files.limit', 10),
             'filesize' => $this->getMaxFilesize(),
            ],
            (array) $settings,
            ['name' => $post['name']]
        );
        // Allow plugins to adapt settings for a given post name
        // Useful if schema retrieval is not an option, e.g. dynamically created forms
        $grav->fireEvent('onFormUploadSettings', new Event(['settings' => &$settings, 'post' => $post]));
        
        $upload = $this->normalizeFiles($_FILES['data'], $settings->name);

        // Handle errors and breaks without proceeding further
        if ($upload->file->error != UPLOAD_ERR_OK) {
            // json_response
            return [
                'status' => 'error',
                'message' => sprintf($grav['language']->translate('PLUGIN_FORM.FILEUPLOAD_UNABLE_TO_UPLOAD', null, true), $upload->file->name, $this->upload_errors[$upload->file->error])
            ];
        }

        // Handle bad filenames.
        $filename = $upload->file->name;
        if (strtr($filename, "\t\n\r\0\x0b", '_____') !== $filename || rtrim($filename, ". ") !== $filename || preg_match('|\.php|', $filename)) {
            $this->admin->json_response = [
                'status'  => 'error',
                'message' => sprintf($this->admin->translate('PLUGIN_ADMIN.FILEUPLOAD_UNABLE_TO_UPLOAD', null),
                    $filename, 'Bad filename')
            ];

            return false;
        }

        // Remove the error object to avoid storing it
        unset($upload->file->error);


        // Handle Accepted file types
        // Accept can only be mime types (image/png | image/*) or file extensions (.pdf|.jpg)
        $accepted = false;
        $errors = [];
        foreach ((array) $settings->accept as $type) {
            // Force acceptance of any file when star notation
            if ($type === '*') {
                $accepted = true;
                break;
            }

            $isMime = strstr($type, '/');
            $find = str_replace('*', '.*', $type);

            $match = preg_match('#'. $find .'$#', $isMime ? $upload->file->type : $upload->file->name);
            if (!$match) {
                $message = $isMime ? 'The MIME type "' . $upload->file->type . '"' : 'The File Extension';
                $errors[] = $message . ' for the file "' . $upload->file->name . '" is not an accepted.';
                $accepted |= false;
            } else {
                $accepted |= true;
            }
        }

        if (!$accepted) {
            // json_response
            return [
                'status' => 'error',
                'message' => implode('<br/>', $errors)
            ];
        }


        // Handle file size limits
        $settings->filesize *= self::BYTES_TO_MB; // 1024 * 1024 [MB in Bytes]
        if ($settings->filesize > 0 && $upload->file->size > $settings->filesize) {
            // json_response
            return [
                'status'  => 'error',
                'message' => $grav['language']->translate('PLUGIN_FORM.EXCEEDED_GRAV_FILESIZE_LIMIT')
            ];
        }


        // we need to move the file at this stage or else
        // it won't be available upon save later on
        // since php removes it from the upload location
        $tmp_dir = $grav['locator']->findResource('tmp://', true, true);
        $tmp_file = $upload->file->tmp_name;
        $tmp = $tmp_dir . '/uploaded-files/' . basename($tmp_file);

        Folder::create(dirname($tmp));
        if (!move_uploaded_file($tmp_file, $tmp)) {
            // json_response
            return [
                'status' => 'error',
                'message' => sprintf($grav['language']->translate('PLUGIN_FORM.FILEUPLOAD_UNABLE_TO_MOVE', null, true), '', $tmp)
            ];
        }

        $upload->file->tmp_name = $tmp;

        // Retrieve the current session of the uploaded files for the field
        // and initialize it if it doesn't exist
        $sessionField = base64_encode($uri);
        $flash = $session->getFlashObject('files-upload');
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
        $destination = Folder::getRelativePath(rtrim($settings->destination, '/'));
        $destination = $this->getPagePathFromToken($destination);

        // Create destination if needed
        if (!is_dir($destination)) {
            Folder::mkdir($destination);
        }

        // Generate random name if required
        if ($settings->random_name) {
            $extension = pathinfo($upload->file->name)['extension'];
            $upload->file->name = Utils::generateRandomString(15) . '.' . $extension;
        }

        // Handle conflicting name if needed
        if ($settings->avoid_overwriting) {
            if (file_exists($destination . '/' . $upload->file->name)) {
                $upload->file->name = date('YmdHis') . '-' . $upload->file->name;
            }
        }

        // Prepare object for later save
        $path = $destination . '/' . $upload->file->name;
        $upload->file->path = $path;
        // $upload->file->route = $page ? $path : null;

        // Prepare data to be saved later
        $flash[$sessionField][$upload->field][$path] = (array) $upload->file;

        // Finally store the new uploaded file in the field session
        $session->setFlashObject('files-upload', $flash);


        // json_response
        $json_response = [
            'status' => 'success',
            'session' => \json_encode([
                'sessionField' => base64_encode($uri),
                'path' => $upload->file->path,
                'field' => $settings->name
            ])
        ];

        // Return JSON
        header('Content-Type: application/json');
        echo json_encode($json_response);
        exit;
    }

    /**
     * Removes a file from the flash object session, before it gets saved
     *
     * @return bool True if the action was performed.
     */
    public function filesSessionRemove()
    {
        $grav = Grav::instance();
        $post = $_POST;
        $session = $grav['session'];
        // Retrieve the current session of the uploaded files for the field
        // and initialize it if it doesn't exist
        $sessionField = base64_encode($grav['uri']->url(true));
        $request      = \json_decode($post['session']);

        // Ensure the URI requested matches the current one, otherwise fail
        if ($request->sessionField !== $sessionField) {
            return false;
        }

        // Retrieve the flash object and remove the requested file from it
        $flash    = $session->getFlashObject('files-upload');
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
            $session->setFlashObject('files-upload', $flash);
        }

        // json_response
        $json_response = ['status' => 'success'];

        // Return JSON
        header('Content-Type: application/json');
        echo json_encode($json_response);
        exit;
    }

    /**
     * Handle form processing on POST action.
     */
    public function post()
    {
        $grav = Grav::instance();
        $uri = $grav['uri'];
        $url = $uri->url;
        $session = $grav['session'];

        $post = $uri->post();

        if ($post) {
            $this->values = new Data((array)$post);
            $data = $this->values->get('data');

            // Add post data to form dataset
            if (!$data) {
                $data = $this->values->toArray();
            }


            if (!$this->values->get('form-nonce') || !Utils::verifyNonce($this->values->get('form-nonce'), 'form')) {
                $this->status = 'error';
                $event = new Event(['form' => $this,
                                    'message' => $grav['language']->translate('PLUGIN_FORM.NONCE_NOT_VALIDATED')
                ]);
                $grav->fireEvent('onFormValidationError', $event);

                return;
            }


            $i = 0;
            foreach ($this->items['fields'] as $key => $field) {
                $name = isset($field['name']) ? $field['name'] : $key;
                if (!isset($field['name'])) {
                    if (isset($data[$i])) { //Handle input@ false fields
                        $data[$name] = $data[$i];
                        unset($data[$i]);
                    }
                }
                if ($field['type'] === 'checkbox' || $field['type'] === 'switch') {
                    $data[$name] = isset($data[$name]) ? true : false;
                }
                $i++;
            }

            $this->data->merge($data);
        }

        // Validate and filter data
        try {
            $grav->fireEvent('onFormPrepareValidation', new Event(['form' => $this]));

            $this->data->validate();
            $this->data->filter();

            $grav->fireEvent('onFormValidationProcessed', new Event(['form' => $this]));
        } catch (ValidationException $e) {
            $this->status = 'error';
            $event = new Event(['form' => $this, 'message' => $e->getMessage(), 'messages' => $e->getMessages()]);
            $grav->fireEvent('onFormValidationError', $event);
            if ($event->isPropagationStopped()) {
                return;
            }
        } catch (\RuntimeException $e) {
            $this->status = 'error';
            $event = new Event(['form' => $this, 'message' => $e->getMessage(), 'messages' => []]);
            $grav->fireEvent('onFormValidationError', $event);
            if ($event->isPropagationStopped()) {
                return;
            }
        }

        // Process previously uploaded files for the current URI
        // and finally store them. Everything else will get discarded
        $queue = $session->getFlashObject('files-upload');
        $queue = $queue[base64_encode($url)];
        if (is_array($queue)) {
            // Allow plugins to implement additional / alternative logic
            // Add post to event data
            $grav->fireEvent('onFormStoreUploads', new Event(['queue' => &$queue, 'form' => $this, 'post' => $post]));
            
            foreach ($queue as $key => $files) {
                foreach ($files as $destination => $file) {
                    if (!rename($file['tmp_name'], $destination)) {
                        throw new \RuntimeException(sprintf($grav['language']->translate('PLUGIN_FORM.FILEUPLOAD_UNABLE_TO_MOVE', null, true), '"' . $file['tmp_name'] . '"', $destination));
                    }

                    unset($files[$destination]['tmp_name']);
                }

                $this->data->merge([$key => $files]);
            }
        }

        $process = isset($this->items['process']) ? $this->items['process'] : [];
        if (is_array($process)) {
            $event = null;
            foreach ($process as $action => $data) {
                if (is_numeric($action)) {
                    $action = \key($data);
                    $data = $data[$action];
                }

                $previousEvent = $event;
                $event = new Event(['form' => $this, 'action' => $action, 'params' => $data]);

                if ($previousEvent) {
                    if (!$previousEvent->isPropagationStopped()) {
                        $grav->fireEvent('onFormProcessed', $event);
                    } else {
                        break;
                    }
                } else {
                    $grav->fireEvent('onFormProcessed', $event);
                }
            }
        }
    }

    public function getPagePathFromToken($path)
    {
        return Utils::getPagePathFromToken($path, $this->page());
    }

    /**
     * Internal method to normalize the $_FILES array
     *
     * @param array  $data $_FILES starting point data
     * @param string $key
     * @return object a new Object with a normalized list of files
     */
    protected function normalizeFiles($data, $key = '')
    {
        $files = new \stdClass();
        $files->field = $key;
        $files->file = new \stdClass();

        foreach ($data as $fieldName => $fieldValue) {
            // Since Files Upload are always happening via Ajax
            // we are not interested in handling `multiple="true"`
            // because they are always handled one at a time.
            // For this reason we normalize the value to string,
            // in case it is arriving as an array.
            $value = (array) Utils::getDotNotation($fieldValue, $key);
            $files->file->{$fieldName} = array_shift($value);
        }

        return $files;
    }

    /**
     * Get the nonce for a form
     *
     * @return string
     */
    public static function getNonce()
    {
        $action = 'form-plugin';
        return Utils::getNonce($action);
    }

    /**
     * Get the configured max file size in bytes
     *
     * @param bool $mbytes return size in MB
     * @return int
     */
    public static function getMaxFilesize($mbytes = false)
    {
        $config = Grav::instance()['config'];

        $filesize_mb = (int)($config->get('plugins.form.files.filesize', 0) * static::BYTES_TO_MB);
        $system_filesize = $config->get('system.media.upload_limit', 0);
        if ($filesize_mb > $system_filesize || $filesize_mb === 0) {
            $filesize_mb = $system_filesize;
        }

        if ($mbytes) {
            return $filesize_mb;
        }

        return $filesize_mb  / static::BYTES_TO_MB;
    }

    public function responseCode($code = null)
    {
        if ($code) {
            $this->response_code = $code;
        }
        return $this->response_code;
    }
}
