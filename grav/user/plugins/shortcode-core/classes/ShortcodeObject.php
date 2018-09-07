<?php

namespace Grav\Plugin\Shortcodes;

class ShortCodeObject
{
    protected $obj_name;
    protected $obj_object;

    public function __construct($name, $object)
    {
        $this->obj_name = $name;
        $this->obj_object = $object;
    }

    public function __toString()
    {
        return $this->obj_object;
    }

    public function name()
    {
        return $this->obj_name;
    }

    public function object()
    {
        return $this->obj_object;
    }



}