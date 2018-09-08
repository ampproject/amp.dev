<?php
namespace Grav\Theme\AmpDev;

use Highlight\Highlighter;

class MarkdownExtender {

  protected $markdown;

  function __construct($markdown) {
      $this->markdown = $markdown;

      $this->extendFencedCode();
  }

  /**
   * Extends the default markup syntax for fenced code in a way that it is
   * statically highlighted by the use of highlight.php
   * @return array A block valid for Parsedown::element()
   */
  protected function extendFencedCode() {
    $this->markdown->addBlockType('`', 'FencedCodeExtended', true, true, 0);

    $blockFencedCodeExtended = function($Line) {
      $Block = parent::blockFencedCode($Line);
      return $Block;
    };

    $blockFencedCodeExtendedContinue = function($Line, array $Block) {
      $Block = parent::blockFencedCodeContinue($Line, $Block);
      return $Block;
    };

    $blockFencedCodeExtendedComplete = function(array $Block) {
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

    $this->markdown->blockFencedCodeExtended = $blockFencedCodeExtended->bindTo($this->markdown, $this->markdown);
    $this->markdown->blockFencedCodeExtendedContinue = $blockFencedCodeExtendedContinue->bindTo($this->markdown, $this->markdown);
    $this->markdown->blockFencedCodeExtendedComplete = $blockFencedCodeExtendedComplete->bindTo($this->markdown, $this->markdown);
  }

}
?>
