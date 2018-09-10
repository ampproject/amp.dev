<?php
namespace Thunder\Shortcode\Processor;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
interface ProcessorInterface
{
    /**
     * Process text using registered shortcode handlers
     *
     * @param string $text Text containing shortcodes
     *
     * @return string Text with replaced shortcodes
     */
    public function process($text);
}
