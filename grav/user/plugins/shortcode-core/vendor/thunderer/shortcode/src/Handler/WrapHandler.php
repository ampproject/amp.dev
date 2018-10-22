<?php
namespace Thunder\Shortcode\Handler;

use Thunder\Shortcode\Shortcode\ShortcodeInterface;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class WrapHandler
{
    private $before;
    private $after;

    public function __construct($before, $after)
    {
        $this->before = $before;
        $this->after = $after;
    }

    public static function createBold()
    {
        return new self('<b>', '</b>');
    }

    /**
     * [b]content[b]
     * [strong]content[/strong]
     *
     * @param ShortcodeInterface $shortcode
     *
     * @return string
     */
    public function __invoke(ShortcodeInterface $shortcode)
    {
        return $this->before.$shortcode->getContent().$this->after;
    }
}
