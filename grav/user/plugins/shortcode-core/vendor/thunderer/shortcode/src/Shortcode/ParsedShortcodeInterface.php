<?php
namespace Thunder\Shortcode\Shortcode;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
interface ParsedShortcodeInterface extends ShortcodeInterface
{
    /**
     * Returns exact shortcode text
     *
     * @return string
     */
    public function getText();

    /**
     * Returns string position in the parent text
     *
     * @return int
     */
    public function getOffset();
}
