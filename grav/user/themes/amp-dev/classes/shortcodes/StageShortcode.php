<?php
namespace Grav\Plugin\Shortcodes;

use Grav\Common\Grav;
use Thunder\Shortcode\Shortcode\ShortcodeInterface;

class StageShortcode extends Shortcode {

  const TEMPLATE_PATH = 'partials/shortcodes/stage.html.twig';

  public function init() {
    $this->shortcode->getHandlers()->add('stage', function(ShortcodeInterface $sc) {

      $output = $this->twig->processTemplate(self::TEMPLATE_PATH, [
        'color' => $sc->getParameter('color'),
        'content' => $sc->getContent()
      ]);

      return $output;
    });
  }
}
