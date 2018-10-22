<?php

namespace Grav\Plugin\Shortcodes;

use Grav\Common\Grav;
use Thunder\Shortcode\Shortcode\ShortcodeInterface;

class Shortcode
{
    protected $shortcode;
    protected $grav;
    protected $config;
    protected $twig;

    /**
     * set some instance variable states
     */
    public function __construct()
    {
        $this->grav = Grav::instance();
        $this->shortcode = $this->grav['shortcode'];
        $this->config = $this->grav['config'];
        $this->twig = $this->grav['twig'];
    }

    /**
     * do some work
     */
    public function init()
    {
        $this->shortcode->handlers->add('u', function(ShortcodeInterface $shortcode) {
            return $shortcode->getContent();
        });
    }

    /**
     * returns the name of the class if required
     * 
     * @return string the name of the class
     */
    public function getName()
    {
        return get_class($this);
    }

}
