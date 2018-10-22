<?php
namespace Thunder\Shortcode\Handler;

use Thunder\Shortcode\Shortcode\ShortcodeInterface;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class NameHandler
{
    /**
     * [name /]
     * [name]content is ignored[/name]
     *
     * @param ShortcodeInterface $shortcode
     *
     * @return string
     */
    public function __invoke(ShortcodeInterface $shortcode)
    {
        return $shortcode->getName();
    }
}
