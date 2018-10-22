<?php
namespace Thunder\Shortcode\Syntax;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class CommonSyntax implements SyntaxInterface
{
    public function getOpeningTag()
    {
        return '[';
    }

    public function getClosingTag()
    {
        return ']';
    }

    public function getClosingTagMarker()
    {
        return '/';
    }

    public function getParameterValueSeparator()
    {
        return '=';
    }

    public function getParameterValueDelimiter()
    {
        return '"';
    }
}
