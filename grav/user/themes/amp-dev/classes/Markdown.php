<?php
namespace Grav\Theme\AmpDev;

use Highlight\Highlighter;

class Markdown {

  public static function extend($markdown) {
    self::extendFencedCode($markdown);

    return $markdown;
  }

  public static function extendFencedCode($markdown) {
    $markdown->addBlockType('`', 'FencedCodeExtended', true, true, 0);

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

    $markdown->blockFencedCodeExtended = $blockFencedCodeExtended->bindTo($markdown, $markdown);
    $markdown->blockFencedCodeExtendedContinue = $blockFencedCodeExtendedContinue->bindTo($markdown, $markdown);
    $markdown->blockFencedCodeExtendedComplete = $blockFencedCodeExtendedComplete->bindTo($markdown, $markdown);

    echo "extended fenced code";
  }

}

 ?>
