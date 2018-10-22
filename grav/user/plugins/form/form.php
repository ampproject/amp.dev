<?php
namespace Grav\Plugin;

use Composer\Autoload\ClassLoader;
use Grav\Common\Data\ValidationException;
use Grav\Common\Filesystem\Folder;
use Grav\Common\Page\Page;
use Grav\Common\Page\Pages;
use Grav\Common\Page\Types;
use Grav\Common\Plugin;
use Grav\Common\Twig\Twig;
use Grav\Common\Utils;
use Grav\Common\Uri;
use Grav\Common\Yaml;
use Grav\Plugin\Form\Form;
use RocketTheme\Toolbox\File\JsonFile;
use RocketTheme\Toolbox\File\YamlFile;
use RocketTheme\Toolbox\File\File;
use RocketTheme\Toolbox\Event\Event;

/**
 * Class FormPlugin
 * @package Grav\Plugin
 */
class FormPlugin extends Plugin
{
    /** @var array */
    public $features = [
        'blueprints' => 1000
    ];

    /** @var Form */
    protected $form;

    /** @var array */
    protected $forms = [];

    /** @var array */
    protected $flat_forms = [];

    /** @var array */
    protected $json_response = [];

    /** @var bool */
    protected $recache_forms = false;


    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            'onPluginsInitialized' => [
                ['autoload', 100000],
                ['onPluginsInitialized', 0]
            ],
            'onTwigTemplatePaths' => ['onTwigTemplatePaths', 0]
        ];
    }

    /**
     * [onPluginsInitialized:100000] Composer autoload.
     *
     * @return ClassLoader
     */
    public function autoload()
    {
        return require __DIR__ . '/vendor/autoload.php';
    }

    /**
     * Initialize forms from cache if possible
     */
    public function onPluginsInitialized()
    {
        // Backwards compatibility for plugins that use forms.
        class_alias(Form::class, 'Grav\Plugin\Form');

        if ($this->isAdmin()) {
            $this->enable([
                'onPageInitialized' => ['onPageInitialized', 0],
                'onGetPageTemplates' => ['onGetPageTemplates', 0],
            ]);
            return;
        }

        $this->enable([
            'onPageProcessed' => ['onPageProcessed', 0],
            'onPagesInitialized' => ['onPagesInitialized', 0],
            'onPageInitialized' => ['onPageInitialized', 0],
            'onTwigInitialized' => ['onTwigInitialized', 0],
            'onTwigPageVariables' => ['onTwigVariables', 0],
            'onTwigSiteVariables' => ['onTwigVariables', 0],
            'onFormValidationProcessed' => ['onFormValidationProcessed', 0],
        ]);

        // Mini Keep-Alive Logic
        $task = $this->grav['uri']->param('task');
        if ($task && $task === 'keep-alive') {
            exit;
        }
    }

    public function onGetPageTemplates(Event $event)
    {
        /** @var Types $types */
        $types = $event->types;
        $types->register('form');
    }

    /**
     * Process forms after page header processing, but before caching
     *
     * @param Event $e
     */
    public function onPageProcessed(Event $e)
    {
        /** @var Page $page */
        $page = $e['page'];
        $page_route = $page->route();

        if ($page->home()) {
            $page_route = '/';
        }

        $header = $page->header();

        // Call event to allow filling the page header form dynamically (e.g. use case: Comments plugin)
        $this->grav->fireEvent('onFormPageHeaderProcessed', new Event(['page' => $page, 'header' => $header]));

        if ((isset($header->forms) && is_array($header->forms)) ||
            (isset($header->form) && is_array($header->form))) {
            $page_forms = [];

            // Force never_cache_twig if modular form
            if ($page->modular()) {
                $header->never_cache_twig = true;
            }

            // Get the forms from the page headers
            if (isset($header->forms)) {
                $page_forms = $header->forms;
            } elseif (isset($header->form)) {
                $page_forms[] = $header->form;
            }

            // Store the page forms in the forms instance
            foreach ($page_forms as $name => $page_form) {
                $form = new Form($page, $name, $page_form);
                $this->addForm($page_route, $form);
            }
        }
    }

    /**
     * Initialize all the forms
     */
    public function onPagesInitialized()
    {
        $this->loadCachedForms();
    }

    /**
     * Catches form processing if user posts the form.
     */
    public function onPageInitialized()
    {
        $submitted = false;
        $this->json_response = [];

        // Save cached forms.
        if ($this->recache_forms) {
            $this->saveCachedForms();
        }

        // Force rebuild form when form has not been built and form cache expired.
        // This happens when form cache expires before the page cache
        // and then does not trigger 'onPageProcessed' event.
        if (!$this->forms) {
            $this->onPageProcessed(new Event(['page' => $this->grav['page']]));
        }

        // Enable form events if there's a POST
        if ($this->shouldProcessForm()) {
            $this->enable([
                'onFormProcessed'       => ['onFormProcessed', 0],
                'onFormValidationError' => ['onFormValidationError', 0],
                'onFormFieldTypes'      => ['onFormFieldTypes', 0],
            ]);

            $uri = $this->grav['uri'];

            // Post the form
            if ($this->form) {
                if ($uri->post('__form-file-uploader__') && $uri->extension() === 'json') {
                    $this->json_response = $this->form->uploadFiles();
                } else if ($this->form && isset($_POST['__form-file-remover__']) && $this->grav['uri']->extension() === 'json') {
                    $this->json_response = $this->form->filesSessionRemove();
                } else {
                    $this->form->post();
                    $submitted = true;
                }
            }

            // Clear flash objects for previously uploaded files
            // whenever the user switches page / reloads
            // ignoring any JSON / extension call
            if (!$submitted && null === $uri->extension()) {
                // Discard any previously uploaded files session.
                // and if there were any uploaded file, remove them from the filesystem
                if ($flash = $this->grav['session']->getFlashObject('files-upload')) {
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
    }

    /**
     * Add simple `forms()` Twig function
     */
    public function onTwigInitialized()
    {
        $this->grav['twig']->twig()->addFunction(
            new \Twig_SimpleFunction('forms', [$this, 'getForm'])
        );

        $this->grav['twig']->twig()->getExtension('Twig_Extension_Core')->setEscaper('yaml', function($twig, $string, $charset) {
            return Yaml::dump($string);
            }
        );

    }

    /**
     * Add current directory to twig lookup paths.
     */
    public function onTwigTemplatePaths()
    {
        $this->grav['twig']->twig_paths[] = __DIR__ . '/templates';
    }

    /**
     * Make form accessible from twig.
     *
     * @param Event $event
     */
    public function onTwigVariables(Event $event = null)
    {
        if ($event !== null && isset($event['page'])) {
            $page = $event['page'];
        } else {
            $page = $this->grav['page'];
        }

        $twig = $this->grav['twig'];

        if (!isset($twig->twig_vars['form'])) {
            $twig->twig_vars['form'] = $this->form($page);
        }

        if ($this->config->get('plugins.form.built_in_css')) {
            $this->grav['assets']->addCss('plugin://form/assets/form-styles.css');
        }
        $twig->twig_vars['form_max_filesize'] = Form::getMaxFilesize();
        $twig->twig_vars['form_json_response'] = $this->json_response;
    }

    /**
     * Handle form processing instructions.
     *
     * @param Event $event
     * @throws \Exception
     */
    public function onFormProcessed(Event $event)
    {
        /** @var Form $form */
        $form = $event['form'];
        $action = $event['action'];
        $params = $event['params'];

        $this->process($form);

        switch ($action) {
            case 'captcha':
                if (isset($params['recaptcha_secret'])) {
                    $recaptchaSecret = $params['recaptcha_secret'];
                } elseif (isset($params['recatpcha_secret'])) {
                    // Included for backwards compatibility with typo (issue #51)
                    $recaptchaSecret = $params['recatpcha_secret'];
                } else {
                    $recaptchaSecret = $this->config->get('plugins.form.recaptcha.secret_key');
                }

                // Validate the captcha
                $query = http_build_query([
                    'secret'   => $recaptchaSecret,
                    'response' => $form->value('g-recaptcha-response', true)
                ]);

                $url = 'https://www.google.com/recaptcha/api/siteverify';
                if (ini_get('allow_url_fopen')) {
                    $response = json_decode(file_get_contents($url . '?' . $query), true);
                } else {
                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL, $url);
                    curl_setopt($ch, CURLOPT_POST, true);
                    curl_setopt($ch, CURLOPT_POSTFIELDS, $query);
                    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                    $response = json_decode(curl_exec($ch), true);
                }

                if (!isset($response['success']) || $response['success'] !== true) {
                    $this->grav->fireEvent('onFormValidationError', new Event([
                        'form'    => $form,
                        'message' => $this->grav['language']->translate('PLUGIN_FORM.ERROR_VALIDATING_CAPTCHA')
                    ]));
                    $event->stopPropagation();

                    return;
                }
                break;
            case 'timestamp':
                $label = isset($params['label']) ? $params['label'] : 'Timestamp';
                $format = isset($params['format']) ? $params['format'] : 'Y-m-d H:i:s';
                $blueprint = $form->value()->blueprints();
                $blueprint->set('form/fields/timestamp', ['name'=>'timestamp', 'label'=> $label]);
                $now = new \DateTime('now');
                $date_string = $now->format($format);
                $form->setFields($blueprint->fields());
                $form->setData('timestamp',$date_string);
                break;
            case 'ip':
                $label = isset($params['label']) ? $params['label'] : 'User IP';
                $blueprint = $form->value()->blueprints();
                $blueprint->set('form/fields/ip', ['name'=>'ip', 'label'=> $label]);
                $form->setFields($blueprint->fields());
                $form->setData('ip', Uri::ip());
                break;
            case 'message':
                $translated_string = $this->grav['language']->translate($params);
                $vars = array(
                    'form' => $form
                );

                /** @var Twig $twig */
                $twig = $this->grav['twig'];
                $processed_string = $twig->processString($translated_string, $vars);

                $form->message = $processed_string;
                break;
            case 'redirect':
                $this->grav['session']->setFlashObject('form', $form);
                $url = ((string)$params);
                $vars = array(
                    'form' => $form
                );
                /** @var Twig $twig */
                $twig = $this->grav['twig'];
                $url = $twig->processString($url, $vars);
                $this->grav->redirect($url);
                break;
            case 'reset':
                if (Utils::isPositive($params)) {
                    $form->reset();
                }
                break;
            case 'display':
                $route = (string)$params;
                if (!$route || $route[0] !== '/') {
                    /** @var Uri $uri */
                    $uri = $this->grav['uri'];
                    $route = rtrim($uri->route(), '/'). '/' . ($route ?: '');
                }

                /** @var Twig $twig */
                $twig = $this->grav['twig'];
                $twig->twig_vars['form'] = $form;

                /** @var Pages $pages */
                $pages = $this->grav['pages'];
                $page = $pages->dispatch($route, true);

                if (!$page) {
                    throw new \RuntimeException('Display page not found. Please check the page exists.', 400);
                }

                unset($this->grav['page']);
                $this->grav['page'] = $page;
                break;
            case 'remember':
                foreach ($params as $remember_field) {
                    $field_cookie = 'forms-'.$form['name'].'-'.$remember_field;
                    setcookie($field_cookie, $form->value($remember_field), time()+60*60*24*60);
                }
                break;
            case 'save':
                $prefix = !empty($params['fileprefix']) ? $params['fileprefix'] : '';
                $format = !empty($params['dateformat']) ? $params['dateformat'] : 'Ymd-His-u';
                $raw_format = !empty($params['dateraw']) ? (bool) $params['dateraw'] : false;
                $postfix = !empty($params['filepostfix']) ? $params['filepostfix'] : '';
                $ext = !empty($params['extension']) ? '.' . trim($params['extension'], '.') : '.txt';
                $filename = !empty($params['filename']) ? $params['filename'] : '';
                $operation = !empty($params['operation']) ? $params['operation'] : 'create';

                if (!$filename) {
                    $filename = $prefix . $this->udate($format, $raw_format) . $postfix. $ext;
                }

                /** @var Twig $twig */
                $twig = $this->grav['twig'];
                $vars = [
                    'form' => $form
                ];

                // Process with Twig
                $filename = $twig->processString($filename, $vars);

                $locator = $this->grav['locator'];
                $path = $locator->findResource('user://data', true);
                $dir = $path . DS . $form->name();
                $fullFileName = $dir. DS . $filename;

                if (!empty($params['raw']) || !empty($params['template'])) {
                    // Save data as it comes from the form.
                    if ($operation === 'add') {
                        throw new \RuntimeException('Form save: \'operation: add\' is not supported for raw files');
                    }
                    switch ($ext) {
                        case '.yaml':
                            $file = YamlFile::instance($fullFileName);
                            break;
                        case '.json':
                            $file = JsonFile::instance($fullFileName);
                            break;
                        default:
                            throw new \RuntimeException('Form save: Unsupported RAW file format, please use either yaml or json');
                    }

                    $data = [
                        '_data_type' => 'form',
                        'template' => !empty($params['template']) ? $params['template'] : null,
                        'name' => $form->name(),
                        'timestamp' => date('Y-m-d H:i:s'),
                        'content' => $form->getData()->toArray()
                    ];

                    $file->save(array_filter($data));
                    break;
                }

                $file = File::instance($fullFileName);

                if ($operation === 'create') {
                    $body = $twig->processString(!empty($params['body']) ? $params['body'] : '{% include "forms/data.txt.twig" %}',
                        $vars);
                    $file->save($body);
                } elseif ($operation === 'add') {
                    if (!empty($params['body'])) {
                        // use body similar to 'create' action and append to file as a log
                        $body = $twig->processString($params['body'], $vars);

                        // create folder if it doesn't exist
                        if (!file_exists($dir)) {
                            Folder::create($dir);
                        }

                        // append data to existing file
                        file_put_contents($fullFileName, $body, FILE_APPEND | LOCK_EX);
                    } else {
                        // serialize YAML out to file for easier parsing as data sets
                        $vars = $vars['form']->value()->toArray();

                        foreach ($form->fields as $field) {
                            if (!empty($field['process']['ignore'])) {
                                unset($vars[$field['name']]);
                            }
                        }

                        if (file_exists($fullFileName)) {
                            $data = Yaml::parse($file->content());
                            if (count($data) > 0) {
                                array_unshift($data, $vars);
                            } else {
                                $data[] = $vars;
                            }
                        } else {
                            $data[] = $vars;
                        }

                        $file->save(Yaml::dump($data));
                    }
                }
                break;
            case 'call':
                $callable = $params;

                if (is_array($callable) && !method_exists($callable[0], $callable[1])) {
                    throw new \RuntimeException('Form cannot be processed (method does not exist)');
                }
                if (is_string($callable) && !function_exists($callable)) {
                    throw new \RuntimeException('Form cannot be processed (function does not exist)');
                }

                call_user_func($callable, $form);
                break;
        }
    }

    /**
     * Custom field logic can go in here
     *
     * @param Event $event
     */
    public function onFormValidationProcessed(Event $event)
    {
        // special check for honeypot field
        foreach ($event['form']->fields() as $field) {
            if ($field['type'] === 'honeypot' && !empty($event['form']->value($field['name']))) {
                throw new ValidationException('Are you a bot?');
            }
        }
    }

    /**
     * Handle form validation error
     *
     * @param  Event $event An event object
     * @throws \Exception
     */
    public function onFormValidationError(Event $event)
    {
        $form = $event['form'];
        if (isset($event['message'])) {
            $form->status = 'error';
            $form->message = $event['message'];
            $form->messages = $event['messages'];
        }

        $uri = $this->grav['uri'];
        $route = $uri->route();

        /** @var Twig $twig */
        $twig = $this->grav['twig'];
        $twig->twig_vars['form'] = $form;

        /** @var Pages $pages */
        $pages = $this->grav['pages'];
        $page = $pages->dispatch($route, true);

        if ($page) {
            unset($this->grav['page']);
            $this->grav['page'] = $page;
        }

        $event->stopPropagation();
    }

    /**
     * Add a form to the forms plugin
     *
     * @param $page_route
     * @param $form
     */
    public function addForm($page_route, $form)
    {

        $form_array = [$form['name'] => $form];
        if (array_key_exists($page_route, $this->forms)) {
            if (!isset($this->form[$page_route][$form['name']])) {
                $this->forms[$page_route] = array_merge($this->forms[$page_route], $form_array);
            }
        } else {
            $this->forms[$page_route] = $form_array;

        }

        $this->flattenForms();
        $this->recache_forms = true;
    }

    /**
     * function to get a specific form
     *
     * @param null|array|string $data optional form `name`
     *
     * @return null|Form
     */
    public function getForm($data = null)
    {
        $page_route = null;
        $form_name = null;

        if (is_array($data)) {
            if (isset($data['name'])) {
                $form_name = $data['name'];
            }
            if (isset($data['route'])) {
                $page_route = $data['route'];
            }
        } elseif (is_string($data)) {
            $form_name = $data;
        }

        // if no form name, use the first form found in the page
        if (!$form_name) {
            // If page route not provided, use the current page
            if (!$page_route) {
                // Get page route
                $page_route = $this->grav['page']->route();

                // fallback using current URI if page not initialized yet
                if (!$page_route) {
                    $page_route = $this->getCurrentPageRoute();
                }
            }

            if (isset($this->forms[$page_route])) {
                $forms = $this->forms[$page_route];
                $first_form = array_shift($forms);
                $form_name = $first_form['name'];
            } else {
                //No form on this route. Try looking up in the current page first
                return new Form($this->grav['page']);
            }
        }

        // return the form you are looking for if available
        return $this->getFormByName($form_name);
    }

    /**
     * Get list of form field types specified in this plugin. Only special types needs to be listed.
     *
     * @return array
     */
    public function getFormFieldTypes()
    {
        return [
            'column' => [
                'input@' => false
            ],
            'columns' => [
                'input@' => false
            ],
            'fieldset' => [
                'input@' => false
            ],
            'conditional' => [
                'input@' => false
            ],
            'display' => [
                'input@' => false
            ],
            'spacer' => [
                'input@' => false
            ],
            'captcha' => [
                'input@' => false
            ]
        ];
    }

    /**
     * Process a form
     *
     * Currently available processing tasks:
     *
     * - fillWithCurrentDateTime
     *
     * @param Form $form
     */
    protected function process($form)
    {
        foreach ($form->fields as $field) {
            if (!empty($field['process']['fillWithCurrentDateTime'])) {
                $form->setData($field['name'], gmdate('D, d M Y H:i:s', time()));
            }
        }
    }

    /**
     * Get current page's route
     *
     * @return mixed
     */
    protected function getCurrentPageRoute()
    {
        $path = $this->grav['uri']->route();
        $path = $path ?: '/';
        return $path;
    }

    /**
     * Retrieve a form based on the form name
     *
     * @param $form_name
     * @return mixed
     */
    protected function getFormByName($form_name)
    {
        if (array_key_exists($form_name, $this->flat_forms)) {
            return $this->flat_forms[$form_name];
        }
        return null;
    }

    /**
     * Determine if the page has a form submission that should be processed
     *
     * @return bool
     */
    protected function shouldProcessForm()
    {
        $uri = $this->grav['uri'];
        $nonce = $uri->post('form-nonce');
        $status = $nonce ? true : false; // php72 quirk?
        $refresh_prevention = null;

        if ($status && $this->form()) {
            // Set page template if passed by form
            if (isset($this->form->template)) {
                $this->grav['page']->template($this->form->template);
            }

            if (isset($this->form->refresh_prevention)) {
                $refresh_prevention = (bool) $this->form->refresh_prevention;
            } else {
                $refresh_prevention = $this->config->get('plugins.form.refresh_prevention', false);
            }

            $unique_form_id = $uri->post('__unique_form_id__', FILTER_SANITIZE_STRING);

            if ($refresh_prevention && $unique_form_id) {
                if ($this->grav['session']->unique_form_id !== $unique_form_id) {
                    $this->grav['session']->unique_form_id = $unique_form_id;
                } else {
                    $status = false;
                    $this->form->message = $this->grav['language']->translate('PLUGIN_FORM.FORM_ALREADY_SUBMITTED');
                    $this->form->status = 'error';
                }
            }
        }

        return $status;
    }

    /**
     * Flatten the forms array into something that can be more easily searched
     */
    protected function flattenForms()
    {
        $this->flat_forms = Utils::arrayFlatten($this->forms);
    }

    /**
     * Get the current form, should already be processed but can get it directly from the page if necessary
     *
     * @param Page|null $page
     * @return Form|mixed
     */
    protected function form($page = null)
    {
        // Regenerate list of flat_forms if not already populated
        if (empty($this->flat_forms)) {
            $this->flattenForms();
        }

        if (null === $this->form) {
            // try to get the page if possible
            if (null === $page) {
                $page = $this->grav['page'];
            }

            $form_name = $this->grav['uri']->post('__form-name__', FILTER_SANITIZE_STRING);

            if (!$form_name) {
                $form_name = $page ? $page->slug() : null;
            }

            $this->form = $this->getFormByName($form_name);

            // last attempt using current page's form
            if (null === $this->form && $page) {
                $header = $page->header();

                if (isset($header->form)) {
                    $this->form = new Form($page);
                }
            }
        }

        return $this->form;
    }

    /**
     * Load cached forms and merge with any currently found forms
     */
    protected function loadCachedForms()
    {
        // Get and set the cache of forms if it exists
        list($forms, $flat_forms) = $this->grav['cache']->fetch($this->getFormCacheId());

        // Only store the forms if they are an array
        if (is_array($forms)) {
            $this->forms = array_merge($this->forms, $forms);
        }

        // Only store the flat_forms if they are an array
        if (is_array($flat_forms)) {
            $this->flat_forms = array_merge($this->flat_forms, $flat_forms);
        }
    }

    /**
     * Save the current state of the forms
     */
    protected function saveCachedForms()
    {
        // Save the current state of the forms to cache
        if ($this->recache_forms) {
            $this->recache_forms = false;
            $this->grav['cache']->save($this->getFormCacheId(), [$this->forms, $this->flat_forms]);
        }
    }

    /**
     * Get the current page cache based id for the forms cache
     *
     * @return string
     */
    protected function getFormCacheId()
    {
        return $this->grav['pages']->getPagesCacheId() . '-form-plugin';
    }

    /**
     * Create unix timestamp for storing the data into the filesystem.
     *
     * @param string $format
     * @param bool   $raw
     *
     * @return string
     */
    protected function udate($format = 'u', $raw = false)
    {

        $utimestamp = microtime(true);

        if ($raw) {
            return date($format);
        }

        $timestamp = floor($utimestamp);
        $milliseconds = round(($utimestamp - $timestamp) * 1000000);

        return date(preg_replace('`(?<!\\\\)u`', \sprintf('%06d', $milliseconds), $format), $timestamp);
    }

}
