<?php
namespace Thunder\Shortcode\Parser;

use Thunder\Shortcode\Shortcode\ParsedShortcode;
use Thunder\Shortcode\Shortcode\Shortcode;
use Thunder\Shortcode\Syntax\CommonSyntax;
use Thunder\Shortcode\Syntax\SyntaxInterface;
use Thunder\Shortcode\Utility\RegexBuilderUtility;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class RegularParser implements ParserInterface
{
    private $lexerRegex;
    private $tokens;
    private $tokensCount;
    private $position;
    private $backtracks;

    const TOKEN_OPEN = 1;
    const TOKEN_CLOSE = 2;
    const TOKEN_MARKER = 3;
    const TOKEN_SEPARATOR = 4;
    const TOKEN_DELIMITER = 5;
    const TOKEN_STRING = 6;
    const TOKEN_WS = 7;

    public function __construct(SyntaxInterface $syntax = null)
    {
        $this->lexerRegex = $this->getTokenizerRegex($syntax ?: new CommonSyntax());
    }

    /**
     * @param string $text
     *
     * @return ParsedShortcode[]
     */
    public function parse($text)
    {
        $this->tokens = $this->tokenize($text);
        $this->backtracks = array();
        $this->position = 0;
        $this->tokensCount = count($this->tokens);

        $shortcodes = array();
        while($this->position < $this->tokensCount) {
            while($this->position < $this->tokensCount && !$this->lookahead(self::TOKEN_OPEN)) {
                $this->position++;
            }
            $names = array();
            $this->beginBacktrack();
            $matches = $this->shortcode($names);
            if(is_array($matches)) {
                foreach($matches as $shortcode) {
                    $shortcodes[] = $shortcode;
                }
            }
        }

        return $shortcodes;
    }

    private function getObject($name, $parameters, $bbCode, $offset, $content, $text)
    {
        return new ParsedShortcode(new Shortcode($name, $parameters, $content, $bbCode), $text, $offset);
    }

    /* --- RULES ----------------------------------------------------------- */

    private function shortcode(array &$names)
    {
        $name = null;
        $offset = null;

        $setName = function(array $token) use(&$name) { $name = $token[1]; };
        $setOffset = function(array $token) use(&$offset) { $offset = $token[2]; };

        if(!$this->match(self::TOKEN_OPEN, $setOffset, true)) { return false; }
        if(!$this->match(self::TOKEN_STRING, $setName, false)) { return false; }
        if($this->lookahead(self::TOKEN_STRING, null)) { return false; }
        if(!preg_match_all('~^'.RegexBuilderUtility::buildNameRegex().'$~us', $name, $matches)) { return false; }
        $this->match(self::TOKEN_WS);
        if(false === ($bbCode = $this->bbCode())) { return false; }
        if(false === ($parameters = $this->parameters())) { return false; }

        // self-closing
        if($this->match(self::TOKEN_MARKER, null, true)) {
            if(!$this->match(self::TOKEN_CLOSE)) { return false; }

            return array($this->getObject($name, $parameters, $bbCode, $offset, null, $this->getBacktrack()));
        }

        // just-closed or with-content
        if(!$this->match(self::TOKEN_CLOSE)) { return false; }
        $this->beginBacktrack();
        $names[] = $name;
        list($content, $shortcodes, $closingName) = $this->content($names);
        if(null !== $closingName && $closingName !== $name) {
            array_pop($names);
            array_pop($this->backtracks);
            array_pop($this->backtracks);

            return $closingName;
        }
        if(false === $content || $closingName !== $name) {
            $this->backtrack(false);
            $text = $this->backtrack(false);

            return array_merge(array($this->getObject($name, $parameters, $bbCode, $offset, null, $text)), $shortcodes);
        }
        $content = $this->getBacktrack();
        if(!$this->close($names)) { return false; }

        return array($this->getObject($name, $parameters, $bbCode, $offset, $content, $this->getBacktrack()));
    }

    private function content(array &$names)
    {
        $content = null;
        $shortcodes = array();
        $closingName = null;
        $appendContent = function(array $token) use(&$content) { $content .= $token[1]; };

        while($this->position < $this->tokensCount) {
            while($this->position < $this->tokensCount && false === $this->lookahead(self::TOKEN_OPEN)) {
                $this->match(null, $appendContent);
                continue;
            }

            $this->beginBacktrack();
            $matchedShortcodes = $this->shortcode($names);
            if(is_string($matchedShortcodes)) {
                $closingName = $matchedShortcodes;
                break;
            }
            if(false !== $matchedShortcodes) {
                $shortcodes = array_merge($shortcodes, $matchedShortcodes);
                continue;
            }
            $this->backtrack();

            $this->beginBacktrack();
            if(false !== ($closingName = $this->close($names))) {
                if(null === $content) { $content = ''; }
                $this->backtrack();
                $shortcodes = array();
                break;
            }
            $closingName = null;
            $this->backtrack();
            if($this->position < $this->tokensCount) {
                $shortcodes = array();
                break;
            }

            $this->match(null, $appendContent);
        }

        return array($this->position < $this->tokensCount ? $content : false, $shortcodes, $closingName);
    }

    private function close(array &$names)
    {
        $closingName = null;
        $setName = function(array $token) use(&$closingName) { $closingName = $token[1]; };

        if(!$this->match(self::TOKEN_OPEN, null, true)) { return false; }
        if(!$this->match(self::TOKEN_MARKER, null, true)) { return false; }
        if(!$this->match(self::TOKEN_STRING, $setName, true)) { return false; }
        if(!$this->match(self::TOKEN_CLOSE)) { return false; }

        return in_array($closingName, $names) ? $closingName : false;
    }

    private function bbCode()
    {
        return $this->match(self::TOKEN_SEPARATOR, null, true) ? $this->value() : null;
    }

    private function parameters()
    {
        $parameters = array();
        $setName = function(array $token) use(&$name) { $name = $token[1]; };

        while(true) {
            $name = null;

            $this->match(self::TOKEN_WS);
            if($this->lookahead(array(self::TOKEN_MARKER, self::TOKEN_CLOSE))) { break; }
            if(!$this->match(self::TOKEN_STRING, $setName, true)) { return false; }
            if(!$this->match(self::TOKEN_SEPARATOR, null, true)) { $parameters[$name] = null; continue; }
            if(false === ($value = $this->value())) { return false; }
            $this->match(self::TOKEN_WS);

            $parameters[$name] = $value;
        }

        return $parameters;
    }

    private function value()
    {
        $value = '';
        $appendValue = function(array $token) use(&$value) { $value .= $token[1]; };

        if($this->match(self::TOKEN_DELIMITER)) {
            while($this->position < $this->tokensCount && !$this->lookahead(self::TOKEN_DELIMITER)) {
                $this->match(null, $appendValue);
            }

            return $this->match(self::TOKEN_DELIMITER) ? $value : false;
        }

        if($this->match(self::TOKEN_STRING, $appendValue)) {
            while($this->match(self::TOKEN_STRING, $appendValue)) {
                continue;
            }

            return $value;
        }

        return false;
    }

    /* --- PARSER ---------------------------------------------------------- */

    private function beginBacktrack()
    {
        $this->backtracks[] = array();
    }

    private function getBacktrack()
    {
        // switch from array_map() to array_column() when dropping support for PHP <5.5
        return implode('', array_map(function(array $token) { return $token[1]; }, array_pop($this->backtracks)));
    }

    private function backtrack($modifyPosition = true)
    {
        $tokens = array_pop($this->backtracks);
        $count = count($tokens);
        if($modifyPosition) {
            $this->position -= $count;
        }

        foreach($this->backtracks as &$backtrack) {
            // array_pop() in loop is much faster than array_slice() because
            // it operates directly on the passed array
            for($i = 0; $i < $count; $i++) {
                array_pop($backtrack);
            }
        }

        return implode('', array_map(function(array $token) { return $token[1]; }, $tokens));
    }

    private function lookahead($type, $callback = null)
    {
        if($this->position >= $this->tokensCount) {
            return false;
        }

        $type = (array)$type;
        $token = $this->tokens[$this->position];
        if(!empty($type) && !in_array($token[0], $type)) {
            return false;
        }

        /** @var $callback callable */
        $callback && $callback($token);

        return true;
    }

    private function match($type, $callbacks = null, $ws = false)
    {
        if($this->position >= $this->tokensCount) {
            return false;
        }

        $type = (array)$type;
        $token = $this->tokens[$this->position];
        if(!empty($type) && !in_array($token[0], $type)) {
            return false;
        }
        foreach($this->backtracks as &$backtrack) {
            $backtrack[] = $token;
        }

        $this->position++;
        foreach((array)$callbacks as $callback) {
            $callback($token);
        }

        $ws && $this->match(self::TOKEN_WS);

        return true;
    }

    /* --- LEXER ----------------------------------------------------------- */

    private function tokenize($text)
    {
        preg_match_all($this->lexerRegex, $text, $matches, PREG_SET_ORDER | PREG_OFFSET_CAPTURE);
        $tokens = array();
        $position = 0;

        foreach($matches as $match) {
            switch(true) {
                case -1 !== $match['open'][1]: { $token = $match['open'][0]; $type = self::TOKEN_OPEN; break; }
                case -1 !== $match['close'][1]: { $token = $match['close'][0]; $type = self::TOKEN_CLOSE; break; }
                case -1 !== $match['marker'][1]: { $token = $match['marker'][0]; $type = self::TOKEN_MARKER; break; }
                case -1 !== $match['separator'][1]: { $token = $match['separator'][0]; $type = self::TOKEN_SEPARATOR; break; }
                case -1 !== $match['delimiter'][1]: { $token = $match['delimiter'][0]; $type = self::TOKEN_DELIMITER; break; }
                case -1 !== $match['ws'][1]: { $token = $match['ws'][0]; $type = self::TOKEN_WS; break; }
                default: { $token = $match['string'][0]; $type = self::TOKEN_STRING; }
            }
            $tokens[] = array($type, $token, $position);
            $position += mb_strlen($token, 'utf-8');
        }

        return $tokens;
    }

    private function getTokenizerRegex(SyntaxInterface $syntax)
    {
        $quote = function($text, $group) {
            return '(?<'.$group.'>'.preg_replace('/(.)/us', '\\\\$0', $text).')';
        };

        $rules = array(
            $quote($syntax->getOpeningTag(), 'open'),
            $quote($syntax->getClosingTag(), 'close'),
            $quote($syntax->getClosingTagMarker(), 'marker'),
            $quote($syntax->getParameterValueSeparator(), 'separator'),
            $quote($syntax->getParameterValueDelimiter(), 'delimiter'),
            '(?<ws>\s+)',
            '(?<string>[\w-]+|\\\\.|.)',
        );

        return '~('.implode('|', $rules).')~us';
    }
}
