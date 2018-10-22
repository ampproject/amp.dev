<?php
namespace Thunder\Shortcode\Syntax;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class SyntaxBuilder
{
    private $openingTag;
    private $closingTag;
    private $closingTagMarker;
    private $parameterValueSeparator;
    private $parameterValueDelimiter;

    public function __construct()
    {
    }

    public function getSyntax()
    {
        return new Syntax(
            $this->openingTag,
            $this->closingTag,
            $this->closingTagMarker,
            $this->parameterValueSeparator,
            $this->parameterValueDelimiter
        );
    }

    public function setOpeningTag($tag)
    {
        $this->openingTag = $tag;

        return $this;
    }

    public function setClosingTag($tag)
    {
        $this->closingTag = $tag;

        return $this;
    }

    public function setClosingTagMarker($marker)
    {
        $this->closingTagMarker = $marker;

        return $this;
    }

    public function setParameterValueSeparator($separator)
    {
        $this->parameterValueSeparator = $separator;

        return $this;
    }

    public function setParameterValueDelimiter($delimiter)
    {
        $this->parameterValueDelimiter = $delimiter;

        return $this;
    }
}
