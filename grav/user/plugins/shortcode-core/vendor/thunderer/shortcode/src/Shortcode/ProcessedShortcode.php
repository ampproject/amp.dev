<?php
namespace Thunder\Shortcode\Shortcode;

use Thunder\Shortcode\Processor\ProcessorContext;
use Thunder\Shortcode\Processor\ProcessorInterface;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class ProcessedShortcode extends AbstractShortcode implements ParsedShortcodeInterface
{
    /** @var ShortcodeInterface */
    private $parent;
    private $position;
    private $namePosition;
    private $text;
    private $textContent;
    private $offset;
    private $baseOffset;
    private $shortcodeText;
    private $iterationNumber;
    private $recursionLevel;
    /** @var ProcessorInterface */
    private $processor;

    private function __construct()
    {
    }

    public static function createFromContext(ProcessorContext $context)
    {
        $self = new self();

        // basic properties
        $self->name = $context->shortcode->getName();
        $self->parameters = $context->shortcode->getParameters();
        $self->content = $context->shortcode->getContent();
        $self->bbCode = $context->shortcode->getBbCode();
        $self->textContent = $context->textContent;

        // runtime context
        $self->parent = $context->parent;
        $self->position = $context->position;
        $self->namePosition = $context->namePosition[$self->name];
        $self->text = $context->text;
        $self->shortcodeText = $context->shortcodeText;

        // processor state
        $self->iterationNumber = $context->iterationNumber;
        $self->recursionLevel = $context->recursionLevel;
        $self->processor = $context->processor;

        // text context
        $self->offset = $context->offset;
        $self->baseOffset = $context->baseOffset;

        return $self;
    }

    public function withContent($content)
    {
        $self = clone $this;
        $self->content = $content;

        return $self;
    }

    public function hasAncestor($name)
    {
        $self = $this;

        while($self = $self->getParent()) {
            if($self->getName() === $name) {
                return true;
            }
        }

        return false;
    }

    public function getParent()
    {
        return $this->parent;
    }

    public function getTextContent()
    {
        return $this->textContent;
    }

    public function getPosition()
    {
        return $this->position;
    }

    public function getNamePosition()
    {
        return $this->namePosition;
    }

    public function getText()
    {
        return $this->text;
    }

    public function getShortcodeText()
    {
        return $this->shortcodeText;
    }

    public function getOffset()
    {
        return $this->offset;
    }

    public function getBaseOffset()
    {
        return $this->baseOffset;
    }

    public function getIterationNumber()
    {
        return $this->iterationNumber;
    }

    public function getRecursionLevel()
    {
        return $this->recursionLevel;
    }

    public function getProcessor()
    {
        return $this->processor;
    }
}
