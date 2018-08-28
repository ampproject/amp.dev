<?php
namespace Grav\Theme\AmpDev;

use Grav\Common\Grav;
use Grav\Common\Assets;
use Grav\Common\Uri;
use Grav\Common\Utils;

class AmpAssets extends Assets
{

  const AMP_COMPONENT_PREFIX = 'amp-';

  protected $amp_components = [];

  /**
   * Alternative to the Assets class original css() method that renders an
   * AMP valid <style> node
   *
   * @return string The style tag with all inlined CSS
   */
  public function ampCustomCss() {
    $inline_css = parent::css('head', ['loading' => 'inline']);
    $inline_css = str_replace('<style', '<style amp-custom', $inline_css);

    return $inline_css;
  }

  /**
   * To not abuse the native implementation of addJs() and js() methods as
   * they may unaltered be useful for PWA implementations another way of adding
   * assets - specifically AMP components. It gracefully handles if the same
   * dependency gets added multiple times
   * @param string $component  Either an URL to the required script of a component
   *                           or its name which is then used to assemble a URL
   * @param array  $attributes If only an URL given it must be specified whether
   *                           this is a template or component script
   */
  public function addAmpComponent($name, $version = '0.1') {
    // A component name starting with amp- is considered enough to be a valid
    // component name for now. TODO: Check more strictly
    if(Utils::startsWith($name, self::AMP_COMPONENT_PREFIX)) {
      // Check if the component has already been added
      if (isset($this->amp_components[$name])) {
        if ($this->amp_components[$name]['version'] !== $version) {
          throw new \RuntimeException("$name is already used in version ".$this->amp_components[$name]['version']." which would be overwritten by $name-$version.js.");
        } else {
          return;
        }
      }

      // TODO: Build URLs more carefully
      $url = "https://cdn.ampproject.org/v0/$name-$version.js";

      // TODO: More carefully evaluate type
      $type = $component == 'amp-mustache' ? 'custom-template' : 'custom-element';

      $this->amp_components[$name] = [
        'name' => $name,
        'version' => $version,
        'url' => $url,
        'type' => $type
      ];
    } else {
      throw new \RuntimeException("$name is not a valid component name.");
    }
  }

  /**
   * Similiar to js() though it only takes care of components registered in
   * $this->amp_components and leaves everything in $js untouched.
   * @return string <script> elements for all registered amp components
   */
  public function ampComponents() {
    $output = '';

    foreach ($this->amp_components as $component) {
      $output .= '<script src="'.$component['url'].'" '.$component['type'].'="'.$component['name'].'"></script>';
    }

    return $output;
  }

}
