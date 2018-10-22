<?php
namespace Grav\Plugin\Shortcodes;

use Thunder\Shortcode\Shortcode\ShortcodeInterface;

class DivShortcode extends Shortcode
{
    public function init()
    {
        $this->shortcode->getHandlers()->add('div', function(ShortcodeInterface $sc) {
            $id = $sc->getParameter('id');
            $class = $sc->getParameter('class');

            $id_output = $id ? 'id="' . $id . '" ': '';
            $class_output = $class ? 'class="' . $class . '"' : '';
            return '<div ' . $id_output . ' ' . $class_output . '>'.$sc->getContent().'</div>';
        });
    }
}