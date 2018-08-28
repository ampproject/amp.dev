<?php
namespace Grav\Theme\AmpDev;

use Grav\Common\Grav;
use Grav\Common\Assets;

class AmpAssets extends Assets
{

  /**
   * Overloading original css() implementation with the difference
   * that it inlines all registered styles into a AMP valid style node
   *
   * @return String The style tag with all inlined CSS
   */
  public function css() {
    if (Grav::instance()) {
        uasort($this->css, array($this, 'sortAssetsByPriorityThenOrder'));
        uasort($this->inline_css, array($this, 'sortAssetsByPriorityThenOrder'));
    }

    $inline_css = '';
    foreach ($this->css as $file) {
      $inline_css .= $this->gatherLinks([$file], CSS_ASSET) . "\n";
    }

    return "<style amp-custom>$inline_css</style>";
  }


}
