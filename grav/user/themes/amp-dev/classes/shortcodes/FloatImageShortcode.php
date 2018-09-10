<?php
namespace Grav\Plugin\Shortcodes;

use Thunder\Shortcode\Shortcode\ShortcodeInterface;

class FloatImageShortcode extends Shortcode {

    public function init() {
        $this->shortcode->getHandlers()->add('float-image', function(ShortcodeInterface $sc) {
            $output = '';
            return $output;
        });
    }
}
