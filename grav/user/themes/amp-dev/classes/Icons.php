<?php
namespace Grav\Theme\AmpDev;

use Grav\Common\Grav;
use Grav\Common\Uri;
use Grav\Common\Utils;

/**
 * Simple class to register used icons and print them in a SVG
 */
class Icons {

  const DEFINITIONS_PLACEHOLDER = '{!AmpDev/Icons!}';

  const ICONS_PATH = 'theme://icons/';

  protected $used_icons = [];

  /**
   * Add a icon to the list of used icons
   * @param string $name The name of the icon without file extensions
   * @return string A <svg
   */
  public function useIcon($name) {
    $icon = Grav::instance()['locator']->findResource(self::ICONS_PATH.$name.'.svg');
    if ($icon !== false) {
      if (!isset($this->used_icons[$name])) {
        // Only try to get the SVG code if it has not already been fetched
        $this->used_icons[$name] = file_get_contents($icon);
      }

      return '<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#'.$name.'"></use></svg>';
    }
  }

  /**
   * Generates a <defs> node usable in a SVG wrapper element
   * @return string A <def> node conaining SVG elements
   */
  public function definitions($lazy = true) {
    if ($lazy) {
      return self::DEFINITIONS_PLACEHOLDER;
    } else {
      $output = Grav::instance()->output;
      $defs = '<defs>';
      foreach ($this->used_icons as $icon) {
        $defs .= $icon;
      }
      $defs .= '</defs>';

      return str_replace(self::DEFINITIONS_PLACEHOLDER, $defs, $output);
    }
  }

}
?>
