<?php
namespace Thunder\Shortcode\Shortcode;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class ReplacedShortcode extends AbstractShortcode
{
    private $replacement;
    private $text;
    private $offset;

    public function __construct(ParsedShortcodeInterface $shortcode, $replacement)
    {
        $this->name = $shortcode->getName();
        $this->parameters = $shortcode->getParameters();
        $this->content = $shortcode->getContent();
        $this->bbCode = $shortcode->getBbCode();
        $this->text = $shortcode->getText();
        $this->offset = $shortcode->getOffset();

        $this->replacement = $replacement;
    }

    public function getReplacement()
    {
        return $this->replacement;
    }

    public function getText()
    {
        return $this->text;
    }

    public function getOffset()
    {
        return $this->offset;
    }
}
