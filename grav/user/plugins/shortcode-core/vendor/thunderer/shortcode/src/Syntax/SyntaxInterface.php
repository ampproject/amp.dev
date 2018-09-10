<?php
namespace Thunder\Shortcode\Syntax;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
interface SyntaxInterface
{
    public function getOpeningTag();

    public function getClosingTag();

    public function getClosingTagMarker();

    public function getParameterValueSeparator();

    public function getParameterValueDelimiter();
}
