<?php
namespace Thunder\Shortcode\Handler;

use Thunder\Shortcode\Shortcode\ShortcodeInterface;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class ContentHandler
{
    /**
     * [content]text to display[/content]
     *
     * @param ShortcodeInterface $shortcode
     *
     * @return null|string
     */
    public function __invoke(ShortcodeInterface $shortcode)
    {
        return $shortcode->getContent();
    }
}
