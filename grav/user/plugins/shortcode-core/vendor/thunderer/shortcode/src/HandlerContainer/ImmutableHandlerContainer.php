<?php
namespace Thunder\Shortcode\HandlerContainer;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class ImmutableHandlerContainer implements HandlerContainerInterface
{
    private $handlers;

    public function __construct(HandlerContainer $handlers)
    {
        $this->handlers = clone $handlers;
    }

    public function get($name)
    {
        return $this->handlers->get($name);
    }
}
