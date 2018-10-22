<?php
namespace Thunder\Shortcode\Handler;

use Thunder\Shortcode\HandlerContainer\HandlerContainer;
use Thunder\Shortcode\Shortcode\ShortcodeInterface;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class DeclareHandler
{
    /** @var HandlerContainer */
    private $handlers;
    private $delimiter;

    public function __construct(HandlerContainer $container, $delimiter = '%')
    {
        $this->handlers = $container;
        $this->delimiter = $delimiter;
    }

    /**
     * [declare name]Your name is %value%[/declare]
     * [name value="Thomas" /]
     *
     * @param ShortcodeInterface $shortcode
     */
    public function __invoke(ShortcodeInterface $shortcode)
    {
        $args = $shortcode->getParameters();
        if(empty($args)) {
            return;
        }
        $keys = array_keys($args);
        $name = array_shift($keys);
        $content = $shortcode->getContent();
        $delimiter = $this->delimiter;

        $this->handlers->add($name, function(ShortcodeInterface $shortcode) use($content, $delimiter) {
            $args = $shortcode->getParameters();
            $keys = array_map(function($key) use($delimiter) { return $delimiter.$key.$delimiter; }, array_keys($args));
            $values = array_values($args);

            return str_replace($keys, $values, $content);
        });
    }
}
