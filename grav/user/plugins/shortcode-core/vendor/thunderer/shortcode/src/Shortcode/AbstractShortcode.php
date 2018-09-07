<?php
namespace Thunder\Shortcode\Shortcode;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
abstract class AbstractShortcode
{
    protected $name;
    protected $parameters = array();
    protected $content;
    protected $bbCode;

    public function hasContent()
    {
        return $this->content !== null;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getParameters()
    {
        return $this->parameters;
    }

    public function hasParameter($name)
    {
        return array_key_exists($name, $this->parameters);
    }

    public function hasParameters()
    {
        return (bool)$this->parameters;
    }

    public function getParameter($name, $default = null)
    {
        return $this->hasParameter($name) ? $this->parameters[$name] : $default;
    }

    public function getParameterAt($index)
    {
        $keys = array_keys($this->parameters);

        return array_key_exists($index, $keys) ? $keys[$index] : null;
    }

    public function getContent()
    {
        return $this->content;
    }

    public function getBbCode()
    {
        return $this->bbCode;
    }
}
