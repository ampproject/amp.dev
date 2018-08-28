<?php
namespace Grav\Theme;

use Grav\Common\Theme;
use Grav\Common\Assets;
use Grav\Theme\AmpDev\AmpAssets;
use RocketTheme\Toolbox\Event\Event;

class AmpDev extends Theme
{

  public static function getSubscribedEvents() {
    require_once(__DIR__.'/classes/AmpAssets.php');

    return [
      'onAssetsInitialized' => ['onAssetsInitialized', 0],
    ];
  }

  public function onAssetsInitialized($event) {
    // Replace native assets manager with the AMP asset manager
    $this->grav['assets'] = new AmpAssets();
  }

}
