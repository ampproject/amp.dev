<?php
namespace Thunder\Shortcode\Event;

use Thunder\Shortcode\Shortcode\ReplacedShortcode;
use Thunder\Shortcode\Shortcode\ShortcodeInterface;

/**
 * This event is called just before returning processed text result at each
 * processing level to alter the way shortcodes are replaced with their handlers
 * results in the source text.
 *
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
class ReplaceShortcodesEvent
{
    private $shortcode;
    private $text;
    /** @var ReplacedShortcode[] */
    private $replacements;
    private $result;

    public function __construct($text, array $replacements, ShortcodeInterface $shortcode = null)
    {
        $this->shortcode = $shortcode;
        $this->text = $text;
        $this->result = null;

        $this->setReplacements($replacements);
    }

    private function setReplacements(array $replacements)
    {
        foreach($replacements as $replacement) {
            $this->addReplacement($replacement);
        }
    }

    private function addReplacement(ReplacedShortcode $replacement)
    {
        $this->replacements[] = $replacement;
    }

    public function getText()
    {
        return $this->text;
    }

    public function getReplacements()
    {
        return $this->replacements;
    }

    public function getShortcode()
    {
        return $this->shortcode;
    }

    public function setResult($result)
    {
        $this->result = $result;
    }

    public function getResult()
    {
        return $this->result;
    }

    public function hasResult()
    {
        return null !== $this->result;
    }
}
