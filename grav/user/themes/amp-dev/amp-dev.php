<?php
namespace Grav\Theme;

use Grav\Common\Theme;
use Grav\Theme\AmpDev\Assets;
use Grav\Theme\AmpDev\Icons;
use RocketTheme\Toolbox\Event\Event;

class AmpDev extends Theme
{

  /**
   * The themes dediacted asset manager
   * @var [type]
   */
  protected $assets;

  /**
   * The icons utility
   * @var [type]
   */
  protected $icons;

  public static function getSubscribedEvents() {
    require_once(__DIR__.'/classes/Assets.php');
    require_once(__DIR__.'/classes/Icons.php');

    return [
      'onAssetsInitialized' => ['onAssetsInitialized', 0],
      'onTwigSiteVariables' => ['onTwigSiteVariables', 0],
      'onOutputGenerated' => ['onOutputGenerated', 0],
    ];
  }

  public function onAssetsInitialized($event) {
    // Replace native assets manager with the AMP asset manager but only if not
    // in admin as it would discard registered assets
    if (!$this->isAdmin()) {
      $assets = new Assets();

      $this->grav['assets'] = $assets;
      $this->assets = $assets;
    }
  }

  public function onTwigSiteVariables($event) {
    // Register icon utility to easily add icons
    if (!$this->isAdmin()) {
      $icons = new Icons();

      $this->grav['twig']->twig_vars['icons'] = $icons;
      $this->icons = $icons;
    }
  }

  public function onOutputGenerated($event) {
    if (!$this->isAdmin()) {
      $this->grav->output = $this->icons->definitions(false);
      $this->grav->output = $this->assets->ampComponents(false);
    }
  }

}
