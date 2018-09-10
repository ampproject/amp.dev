<?php
namespace Grav\Plugin\Shortcodes;

use Thunder\Shortcode\EventHandler\FilterRawEventHandler;
use Thunder\Shortcode\Events;
use Thunder\Shortcode\Shortcode\ShortcodeInterface;

class RawShortcode extends Shortcode
{
    public function init()
    {
        $this->shortcode->getHandlers()->add('raw', function(ShortcodeInterface $sc) {
            return trim($sc->getContent());
        });

        $this->shortcode->getEvents()->addListener(Events::FILTER_SHORTCODES, new FilterRawEventHandler(array('raw')));
    }

}