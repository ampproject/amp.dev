<?php
namespace Thunder\Shortcode\Handler;

use Thunder\Shortcode\Shortcode\ShortcodeInterface;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class PlaceholderHandler
{
    private $delimiter;

    public function __construct($delimiter = '%')
    {
        $this->delimiter = $delimiter;
    }

    /**
     * [placeholder value=18]You age is %value%[/placeholder]
     *
     * @param ShortcodeInterface $shortcode
     *
     * @return mixed
     */
    public function __invoke(ShortcodeInterface $shortcode)
    {
        $args = $shortcode->getParameters();
        $delimiter = $this->delimiter;
        $keys = array_map(function($key) use($delimiter) { return $delimiter.$key.$delimiter; }, array_keys($args));
        $values = array_values($args);

        return str_replace($keys, $values, $shortcode->getContent());
    }
}
