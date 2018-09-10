<?php
namespace Grav\Theme\AmpDev;

use Highlight\Highlighter;
use Grav\Common\Grav;
use Grav\Common\Page\Medium\MediumFactory;
use Grav\Common\Uri;
use Grav\Common\Utils;

class MarkdownExtender {

  protected $markdown;

  function __construct($markdown) {
      $this->markdown = $markdown;

      $this->addAmpImage();
      $this->addHighlightedFencedCode();
  }

  protected function addAmpImage() {
    $this->markdown->addInlineType('!', 'AmpImage', 0);

    /**
     * Rewrites the default <img> to an <amp-img> while using responsive as
     * default layout
     * @var string $Excerpt
     * @return array An Inline valid for Parsedown::element()
     */
    $inlineAmpImage = function($Excerpt) {
      $Inline = parent::inlineImage($Excerpt);

      $Inline['element']['name'] = 'amp-img';
      $Inline['element']['text'] = '';

      // TODO: Discuss default behaviour (layout, attributes, ...) of image
      $Inline['element']['attributes']['layout'] = 'responsive';
      // In order to have a valid responsive layout we need to get the width
      // and height of the image
      // TODO: Make this a lot more robust instead of just searching for
      // matching media inside the current page. See \Grav\Common\Helpers\Excerpts
      $currentPageMedia = Grav::instance()['page']->media();
      $imageFileName = basename($Inline['element']['attributes']['src']);

      $Inline['element']['attributes']['width'] = $currentPageMedia->get($imageFileName)->get('width');
      $Inline['element']['attributes']['height'] = $currentPageMedia->get($imageFileName)->get('height');

      return $Inline;
    };

    $this->markdown->inlineAmpImage = $inlineAmpImage->bindTo($this->markdown, $this->markdown);
  }

  protected function addHighlightedFencedCode() {
    $this->markdown->addBlockType('`', 'HighlightedFencedCode', true, true, 0);

    $blockHighlightedFencedCode = function($Line) {
      $Block = parent::blockFencedCode($Line);
      return $Block;
    };

    $blockHighlightedFencedCodeContinue = function($Line, array $Block) {
      $Block = parent::blockFencedCodeContinue($Line, $Block);
      return $Block;
    };

    /**
     * Extends the default markup syntax for fenced code in a way that it is
     * statically highlighted by the use of highlight.php to prevent the need
     * for a frontend library
     * @return array A block valid for Parsedown::element()
     */
    $blockHighlightedFencedCodeComplete = function(array $Block) {
      $Block = parent::blockFencedCodeComplete($Block);

      // Check wether parsedown set a class to identify the language and if one
      // is set then highlight code
      if (isset($Block['element']['text']['attributes']['class'])) {
        $language = str_replace('language-', '', $Block['element']['text']['attributes']['class']);
        $code = html_entity_decode($Block['element']['text']['text']);

        $highlighter = new Highlighter();
        $highlightedCode = $highlighter->highlight($language, $code);
        $Block['element']['text']['text'] = $highlightedCode->value;

        // Unset the language class as it is not needed anymore
        $Block['element']['text']['attributes']['class'] = '';
      }

      return $Block;
    };

    $this->markdown->blockHighlightedFencedCode = $blockHighlightedFencedCode->bindTo($this->markdown, $this->markdown);
    $this->markdown->blockHighlightedFencedCodeContinue = $blockHighlightedFencedCodeContinue->bindTo($this->markdown, $this->markdown);
    $this->markdown->blockHighlightedFencedCodeComplete = $blockHighlightedFencedCodeComplete->bindTo($this->markdown, $this->markdown);
  }

}
?>
