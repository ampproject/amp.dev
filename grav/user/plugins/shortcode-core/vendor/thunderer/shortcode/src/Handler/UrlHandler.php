<?php
namespace Thunder\Shortcode\Handler;

use Thunder\Shortcode\Shortcode\ShortcodeInterface;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class UrlHandler
{
    /**
     * [url="http://example.org"]Click![/url]
     * [url="http://example.org" /]
     * [url]http://example.org[/url]
     *
     * @param ShortcodeInterface $shortcode
     *
     * @return string
     */
    public function __invoke(ShortcodeInterface $shortcode)
    {
        $url = $shortcode->getBbCode() ?: $shortcode->getContent();

        return '<a href="'.$url.'">'.$shortcode->getContent().'</a>';
    }
}
