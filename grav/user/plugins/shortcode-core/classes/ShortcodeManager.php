<?php
namespace Grav\Plugin;

use Grav\Common\Data\Data;
use Grav\Common\Grav;
use Grav\Common\Page\Page;
use Guzzle\Common\Exception\UnexpectedValueException;
use Thunder\Shortcode\EventContainer\EventContainer;
use Thunder\Shortcode\HandlerContainer\HandlerContainer;
use Thunder\Shortcode\Processor\Processor;
use Thunder\Shortcode\Shortcode\ShortcodeInterface;
use Thunder\Shortcode\Syntax\CommonSyntax;

class ShortcodeManager
{

    /** @var Grav $grav */
    protected $grav;

    /** @var Page $page */
    protected $page;

    /** @var  HandlerContainer $handlers */
    protected $handlers;

    /** @var  EventContainer $events */
    protected $events;

    protected $assets;

    protected $states;

    protected $objects;

    /**
     * initialize some internal instance variables
     * @param Page $page
     */
    public function __construct()
    {
        $this->grav = Grav::instance();
        $this->config = $this->grav['config'];
        $this->handlers = new HandlerContainer();
        $this->events = new EventContainer();
        $this->states = [];
        $this->assets = [];
        $this->objects = [];
    }

    /**
     * add CSS and JS assets to the Manager so that they can be saved to cache
     * for subsequent cached pages
     *
     * @param mixed $action the type of asset, JS or CSS, or an array of stuff
     * @param string $asset the asset path in question
     */
    public function addAssets($action, $asset)
    {
        if (is_array($action)) {
            $this->assets['add'] [] = $action;
        } else {
            if (isset($this->assets[$action])) {
                if (in_array($asset, $this->assets[$action])) {
                    return;
                }
            }
            $this->assets[$action] [] = $asset;
        }
    }

    /**
     * return a multi-dimensional array of all the assets
     *
     * @return array the assets array
     */
    public function getAssets()
    {
        return $this->assets;
    }

    /**
     * reset the assets
     */
    public function resetAssets()
    {
        $this->assets = [];
    }

    /**
     * adds ad object
     * @param $key the key to look up the object
     * @param $object the object to store
     */
    public function addObject($key, $object)
    {
        $new = [$object->name() => $object];
        if (array_key_exists($key, $this->objects)) {
            $current = (array)$this->objects[$key];
            $this->objects[$key] = $current + $new;
        } else {
            $this->objects[$key] = $new;
        }

    }

    /**
     * sets all the objects
     * @param $object the objects array
     */
    public function setObjects($objects)
    {
        $this->objects = $objects;
    }

    /**
     * return all the objects
     * @return array the objects array
     */
    public function getObjects() {
        return $this->objects;
    }

    /**
     * reset the objects
     */
    public function resetObjects()
    {
        $this->objects = [];
    }

    /**
     * returns the current handler container object
     * 
     * @return HandlerContainer
     */
    public function getHandlers()
    {
        return $this->handlers;
    }

    /**
     * returns the current event container object
     *         
     * @return EventContainer
     */
    public function getEvents()
    {
        return $this->events;
    }

    /**
     * register an individual shortcode with the manager so it can be
     * operated on by the Shortcode library
     * 
     * @param  string $name      the name of the shortcode (should match the classname)
     * @param  string $directory directory where the shortcode is located
      */
    public function registerShortcode($name, $directory)
    {
        $path = rtrim($directory, '/').'/'.$name;
        require_once($path);

        $name = "Grav\\Plugin\\Shortcodes\\" . basename($name, '.php');

        if (class_exists($name)) {
            $shortcode = new $name();
            $shortcode->init();
        }
    }

    /**
     * register all files as shortcodes in a particular directory
     * @param  string $directory directory where the shortcodes are located
     */
    public function registerAllShortcodes($directory)
    {
        try {
            foreach (new \DirectoryIterator($directory) as $file) {
                if ($file->isDot()) {
                    continue;
                }
                $this->registerShortcode($file->getFilename(), $directory);
            }
        } catch (\UnexpectedValueException $e) {
            Grav::instance()['log']->error('ShortcodeCore Plugin: Directory not found => ' . $directory);
        }
    }

    /**
     * setup the markdown parser to handle shortcodes properly
     * 
     * @param  mixed $markdown the markdown parser object
     */
    public function setupMarkdown($markdown)
    {
        $markdown->addBlockType('[', 'ShortCodes', true, false);

        $markdown->blockShortCodes = function($Line) {
            $valid_shortcodes = implode('|', $this->handlers->getNames());
            $regex = '/^\[\/?(?:'.$valid_shortcodes.')[^\]]*\]$/';

            if (preg_match($regex, $Line['body'], $matches)) {
                $Block = array(
                    'markup' => $Line['body'],
                );
                return $Block;
            }
        };
    }

    /**
     * process the content by running over all the known shortcodes with the
     * chosen parser
     * 
     * @param  Page   $page   the page to work on
     * @param  Data   $config configuration merged with the page config
     */
    public function processContent(Page $page, Data $config)
    {
        $parser = $this->getParser($config->get('parser'));

        if ($page && $config->get('enabled')) {
            $this->page = $page;
            $content = $page->getRawContent();
            $processor = new Processor(new $parser(new CommonSyntax()), $this->handlers);
            $processor = $processor->withEventContainer($this->events);
            $processed_content = $processor->process($content);

            return $processed_content;
        }
    }

    /**
     * Allow the processing of shortcodes directly on a string
     * For example when used by Twig directly
     *
     * @param $str
     * @return string
     */
    public function processShortcodes($str)
    {
        $parser = $this->getParser($this->config->get('parser'));
        $processor = new Processor(new $parser(new CommonSyntax()), $this->handlers);
        $processed_string = $processor->process($str);

        return $processed_string;
    }

    /**
     * set a state of a particular shortcode with a hash for retrieval later
     * 
     * @param string             $hash      a unique hash code
     * @param ShortcodeInterface $shortcode the shortcode to store
     */
    public function setStates($hash, ShortcodeInterface $shortcode)
    {
        $this->states[$hash][] = $shortcode;
    }

    /**
     * returns the shortcode of a specific hash
     * 
     * @param  string $hash       unique id of state
     * @return ShortcodeInterface shortcode stored for this hash
     */
    public function getStates($hash)
    {
        if (array_key_exists($hash, $this->states)) {
            return $this->states[$hash];
        }
    }

    /**
     * helper method to create a unique shortcode based on the content
     * 
     * @param  ShortcodeInterface $shortcode
     * @return string             
     */
    public function getId(ShortcodeInterface $shortcode)
    {
        return substr(md5($shortcode->getShortcodeText()), -10);
    }

    /**
     * Sets the current page context
     *
     * @param Page $page
     */
    public function setPage(Page $page)
    {
        $this->page = $page;
    }

    /** gets the current page context if set */
    public function getPage()
    {
        return $this->page;
    }

    /**
     * Get the appropriate parser object
     *
     * @param $parser
     * @return string
     */
    protected function getParser($parser)
    {
        switch($parser)
        {
            case 'regular':
                $parser = 'Thunder\Shortcode\Parser\RegularParser';
                break;
            case 'wordpress':
                $parser = 'Thunder\Shortcode\Parser\WordpressParser';
                break;
            default:
                $parser = 'Thunder\Shortcode\Parser\RegexParser';
                break;
        }

        return $parser;
    }
}
