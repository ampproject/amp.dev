<?php
namespace Thunder\Shortcode\Handler;

use Thunder\Shortcode\Shortcode\ProcessedShortcode;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class RawHandler
{
    public function __construct()
    {
    }

    /**
     * [raw]any content [with] or [without /] shortcodes[/raw]
     *
     * @param ProcessedShortcode $shortcode
     *
     * @return string
     */
    public function __invoke(ProcessedShortcode $shortcode)
    {
        return $shortcode->getTextContent();
    }
}
