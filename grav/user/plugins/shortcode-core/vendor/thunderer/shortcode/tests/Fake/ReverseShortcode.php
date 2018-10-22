<?php
namespace Thunder\Shortcode\Tests\Fake;

use Thunder\Shortcode\Shortcode\ShortcodeInterface;

final class ReverseShortcode
{
    public function __invoke(ShortcodeInterface $s)
    {
        return strrev($s->getContent());
    }
}
