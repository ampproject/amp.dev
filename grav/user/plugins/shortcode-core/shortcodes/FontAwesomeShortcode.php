<?php
namespace Grav\Plugin\Shortcodes;

use Grav\Common\Utils;
use Thunder\Shortcode\Shortcode\ShortcodeInterface;

class FontAwesomeShortcode extends Shortcode
{
    public function init()
    {
        $this->shortcode->getHandlers()->add('fa', function(ShortcodeInterface $sc) {
            // Load assets if required
            if ($this->config->get('plugins.shortcode-core.fontawesome.load', false)) {
                $this->shortcode->addAssets('css', $this->config->get('plugins.shortcode-core.fontawesome.url'));
            }

            // Get shortcode content and parameters
            $str = $sc->getContent();
            $icon = $sc->getParameter('icon', $sc->getParameter('fa', $sc->getBbCode()));

            if (!Utils::startsWith($icon, 'fa-')) {
                $icon = 'fa-'.$icon;
            }

            if ($icon) {
                $extras = explode(',',$sc->getParameter('extras', ''));
                foreach ($extras as $extra) {
                    if (!empty($extra)) {
                        if (!Utils::startsWith($extra, 'fa-')) {
                            $extra = 'fa-'.$extra;
                        }
                        $icon .= ' '.$extra;
                    }
                }

                $output = '<i class="fa '.$icon.'">'.$str.'</i>';

                return $output;
            }

        });
    }
}