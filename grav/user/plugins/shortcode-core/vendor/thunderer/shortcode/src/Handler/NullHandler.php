<?php
namespace Thunder\Shortcode\Handler;

use Thunder\Shortcode\Shortcode\ShortcodeInterface;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class NullHandler
{
    /**
     * Special shortcode to discard any input and return empty text
     *
     * @param ShortcodeInterface $shortcode
     *
     * @return null
     */
    public function __invoke(ShortcodeInterface $shortcode)
    {
        return null;
    }
}
