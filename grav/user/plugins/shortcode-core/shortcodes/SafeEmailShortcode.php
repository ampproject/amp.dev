<?php
namespace Grav\Plugin\Shortcodes;

use Thunder\Shortcode\Shortcode\ShortcodeInterface;

class SafeEmailShortcode extends Shortcode
{
    public function init()
    {
        $this->shortcode->getHandlers()->add('safe-email', function(ShortcodeInterface $sc) {
            // Load assets if required
            if ($this->config->get('plugins.shortcode-core.fontawesome.load', false)) {
                $this->shortcode->addAssets('css', $this->config->get('plugins.shortcode-core.fontawesome.url'));
            }

            // Get shortcode content and parameters
            $str = $sc->getContent();
            $icon = $sc->getParameter('icon', false);
            $autolink = $sc->getParameter('autolink', false);

            // Encode email
            $email = '';
            $str_len = strlen($str);
            for ($i = 0; $i < $str_len; $i++) {
                $email .= "&#" . ord($str[$i]). ";";
            }

            // Handle autolinking
            if ($autolink) {
                $output = '<a href="mailto:'.$email.'">'.$email.'</a>';
            } else {
                $output = $email;
            }

            // Handle icon option
            if ($icon) {
                $output = '<i class="fa fa-'.$icon.'"></i> ' . $output;
            }

            return $output;
        });
    }
}