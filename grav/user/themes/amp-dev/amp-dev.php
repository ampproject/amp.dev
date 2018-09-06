<?php
namespace Grav\Theme;

use Grav\Common\Theme;
use Grav\Theme\AmpDev\Assets;
use Grav\Theme\AmpDev\Icons;
use Grav\Theme\AmpDev\MarkdownExtender;
use RocketTheme\Toolbox\Event\Event;

class AmpDev extends Theme
{

  /**
   * The themes dediacted asset manager
   * @var Grav\Theme\AmpDev\Assets
   */
  protected $assets;

  /**
   * The icons utility
   * @var Grav\Theme\AmpDev\Icons;
   */
  protected $icons;

  public static function getSubscribedEvents() {

    return [
      'onThemeInitialized' => ['onThemeInitialized', 0],
    ];
  }

  /**
   * All of the event hooks only shall take place when we are not in admin
   * as some of the hooks may break admin functionality, like replacing
   * the asset manager for example
   */
  public function onThemeInitialized() {
    if (!$this->isAdmin()) {
      require_once(__DIR__.'/vendor/autoload.php');

      $this->enable([
        'onAssetsInitialized' => ['onAssetsInitialized', 0],
        'onMarkdownInitialized' => ['onMarkdownInitialized', 0],
        'onTwigSiteVariables' => ['onTwigSiteVariables', 0],
        'onOutputGenerated' => ['onOutputGenerated', 0],
      ]);
    }
  }

  public function onAssetsInitialized(Event $event) {
    $this->assets = new Assets();

    // Replace native assets manager with the custom AMP asset manager that
    // offers some helper methods to create valid AMP pages
    $this->grav['assets'] = $this->assets;
  }

  public function onMarkdownInitialized(Event $event) {
    // Extend Parsedown to handle custom BBCodes and class additions to default
    // markdown elements
    $markdown = new MarkdownExtender($event['markdown']);
  }

  public function onTwigSiteVariables(Event $event) {
    // Register icon utility to easily add icons
    $this->icons = new Icons();

    $this->grav['twig']->twig_vars['icons'] = $this->icons;
  }

  public function onOutputGenerated(Event $event) {
    // Lazily evaluate all assets that may have been registered during
    // template rendering and/or plugin execution
    $this->grav->output = $this->icons->definitions(false);
    $this->grav->output = $this->assets->ampComponents(false);
  }

}
