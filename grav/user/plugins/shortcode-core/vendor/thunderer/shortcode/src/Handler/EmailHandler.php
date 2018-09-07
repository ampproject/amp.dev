<?php
namespace Thunder\Shortcode\Handler;

use Thunder\Shortcode\Shortcode\ShortcodeInterface;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class EmailHandler
{
    /**
     * [email="example@example.org"]Contact me![/email]
     * [email="example@example.org" /]
     * [email]example@example.org[/email]
     *
     * @param ShortcodeInterface $shortcode
     *
     * @return string
     */
    public function __invoke(ShortcodeInterface $shortcode)
    {
        $email = $shortcode->getBbCode() ?: $shortcode->getContent();
        $content = $shortcode->getContent() === null ? $email : $shortcode->getContent();

        return '<a href="mailto:'.$email.'">'.$content.'</a>';
    }
}
