<?php
namespace Thunder\Shortcode\Processor;

use Thunder\Shortcode\Shortcode\ShortcodeInterface;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class ProcessorContext
{
    /** @var ShortcodeInterface */
    public $shortcode = null;

    /** @var ShortcodeInterface */
    public $parent = null;

    /** @var ProcessorInterface */
    public $processor = null;

    public $textContent = null;
    public $position = 0;
    public $namePosition = array();
    public $text = '';
    public $shortcodeText = '';
    public $iterationNumber = 0;
    public $recursionLevel = 0;
    public $offset = null;
    public $baseOffset = null;
}
