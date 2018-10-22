<?php
namespace Thunder\Shortcode\Shortcode;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class ParsedShortcode extends AbstractShortcode implements ParsedShortcodeInterface
{
    private $text;
    private $offset;

    public function __construct(ShortcodeInterface $shortcode, $text, $offset)
    {
        $this->name = $shortcode->getName();
        $this->parameters = $shortcode->getParameters();
        $this->content = $shortcode->getContent();
        $this->bbCode = $shortcode->getBbCode();
        $this->text = $text;
        $this->offset = $offset;
    }

    public function withContent($content)
    {
        $self = clone $this;
        $self->content = $content;

        return $self;
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
