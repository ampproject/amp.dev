<?php
namespace Thunder\Shortcode\Utility;

use Thunder\Shortcode\Syntax\SyntaxInterface;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class RegexBuilderUtility
{
    public static function buildNameRegex()
    {
        return '[a-zA-Z0-9-_]+';
    }

    public static function buildShortcodeRegex(SyntaxInterface $syntax)
    {
        return '~('.self::createShortcodeRegexContent($syntax).')~us';
    }

    public static function buildSingleShortcodeRegex(SyntaxInterface $syntax)
    {
        return '~(\A'.self::createShortcodeRegexContent($syntax).'\Z)~us';
    }

    public static function buildParametersRegex(SyntaxInterface $syntax)
    {
        $equals = self::quote($syntax->getParameterValueSeparator());
        $string = self::quote($syntax->getParameterValueDelimiter());

        $space = '\s*';
        // lookahead test for either space or end of string
        $empty = '(?=\s|$)';
        // equals sign and alphanumeric value
        $simple = $space.$equals.$space.'[^\s]+';
        // equals sign and value without unescaped string delimiters enclosed in them
        $complex = $space.$equals.$space.$string.'([^'.$string.'\\\\]*(?:\\\\.[^'.$string.'\\\\]*)*?)'.$string;

        return '~(?:\s*(\w+(?:'.$complex.'|'.$simple.'|'.$empty.')))~us';
    }

    private static function createShortcodeRegexContent(SyntaxInterface $syntax)
    {
        $open = self::quote($syntax->getOpeningTag());
        $slash = self::quote($syntax->getClosingTagMarker());
        $close = self::quote($syntax->getClosingTag());
        $equals = self::quote($syntax->getParameterValueSeparator());
        $string = self::quote($syntax->getParameterValueDelimiter());

        $space = '\s*';

        // parameter and value separator can have any number of spaces around itself
        $equalsSpaced = $space.$equals.$space;
        // lookahead test for space, closing tag, self-closing tag or end of string
        $empty = '(?=\s|'.$close.'|'.$slash.$space.$close.'|$)';
        // equals sign and alphanumeric value
        $simple = '((?:(?!=\s*|'.$close.'|'.$slash.$close.')[^\s])+)';
        // equals sign and value without unescaped string delimiters enclosed in them
        $complex = $string.'(?:[^'.$string.'\\\\]*(?:\\\\.[^'.$string.'\\\\]*)*)'.$string;
        // complete parameters matching regex
        $parameters = '(?<parameters>(?:\s*(?:\w+(?:'.$equalsSpaced.$complex.'|'.$equalsSpaced.$simple.'|'.$empty.')))*)';
        // BBCode is the part after name that makes it behave like a non-empty parameter value
        $bbCode = '(?:'.$equals.$space.'(?<bbCode>'.$complex.'|'.$simple.'))?';

        // alphanumeric characters and dash
        $name = '(?<name>'.static::buildNameRegex().')';
        // non-greedy match for any characters
        $content = '(?<content>.*?)';

        // equal beginning for each variant: open tag, name and parameters
        $common = $open.$space.$name.$space.$bbCode.$space.$parameters.$space;
        // closing tag variants: just closing tag, self closing tag or content
        // and closing block with backreference name validation
        $justClosed = $close;
        $selfClosed = '(?<marker>'.$slash.')'.$space.$close;
        $withContent = $close.$content.$open.$space.'(?<markerContent>'.$slash.')'.$space.'(\k<name>)'.$space.$close;

        return '(?:'.$common.'(?:'.$withContent.'|'.$justClosed.'|'.$selfClosed.'))';
    }

    private static function quote($text)
    {
        return preg_replace('/(.)/us', '\\\\$0', $text);
    }
}
