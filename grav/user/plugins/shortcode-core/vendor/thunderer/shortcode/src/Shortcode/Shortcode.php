<?php
namespace Thunder\Shortcode\Shortcode;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class Shortcode extends AbstractShortcode implements ShortcodeInterface
{
    public function __construct($name, array $parameters, $content, $bbCode = null)
    {
        if(false === is_string($name) || (is_string($name) && !mb_strlen($name))) {
            throw new \InvalidArgumentException('Shortcode name must be a non-empty string!');
        }

        $isStringOrNull = function($value) { return is_string($value) || is_null($value); };
        if(count(array_filter($parameters, $isStringOrNull)) !== count($parameters)) {
            throw new \InvalidArgumentException('Parameter values must be either string or empty (null)!');
        }

        $this->name = $name;
        $this->parameters = $parameters;
        $this->content = $content;
        $this->bbCode = $bbCode;
    }

    public function withContent($content)
    {
        return new self($this->name, $this->parameters, $content, $this->bbCode);
    }
}
