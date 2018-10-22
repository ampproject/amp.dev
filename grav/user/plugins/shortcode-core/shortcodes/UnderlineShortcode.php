<?php
namespace Grav\Plugin\Shortcodes;

use Thunder\Shortcode\Shortcode\ShortcodeInterface;

class UnderlineShortcode extends Shortcode
{
    public function init()
    {
        $this->shortcode->getHandlers()->add('u', function(ShortcodeInterface $sc) {
            return '<span style="text-decoration: underline;">'.$sc->getContent().'</span>';
        });
    }
}