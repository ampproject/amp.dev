<?php
namespace Grav\Plugin\Shortcodes;

use Grav\Common\Grav;
use Masterminds\HTML5;
use Thunder\Shortcode\Shortcode\ShortcodeInterface;

class FloatImageShortcode extends Shortcode {

  const TEMPLATE_PATH = 'partials/shortcodes/float-image.html.twig';

  public function init() {
    $this->shortcode->getHandlers()->add('float-image', function(ShortcodeInterface $sc) {

      $parser = new HTML5();
      $output = $parser->loadHTML($sc->getContent());

      $images = [];
      foreach ($output->getElementsByTagName('amp-img') as $index => $ampImg) {
        // There are a maximum of two images in a float image - therefore
        // stop if someone has plucked in more
        if ($index > 1) {
          break;
        }

        array_push($images, [
          'src' => $ampImg->getAttribute('src'),
          'width' => $ampImg->getAttribute('width'),
          'height' => $ampImg->getAttribute('height'),
        ]);
      }

      // Load compiled content until now into a DOM tree to quickly get
      // data that is needed for the template to render
      $output = $this->twig->processTemplate(self::TEMPLATE_PATH, [
        'images' => $images
      ]);

      return $output;
    });
  }
}
