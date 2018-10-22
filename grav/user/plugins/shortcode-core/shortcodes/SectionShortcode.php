<?php
namespace Grav\Plugin\Shortcodes;

use Thunder\Shortcode\Shortcode\ShortcodeInterface;

class SectionShortcode extends Shortcode
{
    public function init()
    {
        $this->shortcode->getHandlers()->add('section', function(ShortcodeInterface $sc) {
            $name = $sc->getParameter('name');
            $object = new ShortcodeObject($name, $sc->getContent());
            $this->shortcode->addObject($sc->getName(), $object);
        });
    }
}