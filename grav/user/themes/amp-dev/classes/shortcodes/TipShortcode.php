<?php
namespace Grav\Plugin\Shortcodes;

use Grav\Common\Grav;
use Thunder\Shortcode\Shortcode\ShortcodeInterface;

class TipShortcode extends Shortcode {

  const TEMPLATE_PATH = 'partials/shortcodes/tip.html.twig';

  public function init() {
    $this->shortcode->getHandlers()->add('tip', function(ShortcodeInterface $sc) {

      $output = $this->twig->processTemplate(self::TEMPLATE_PATH, [
        'type' => $sc->getParameter('type'),
        'content' => $sc->getContent()
      ]);

      return $output;
    });
  }
}
