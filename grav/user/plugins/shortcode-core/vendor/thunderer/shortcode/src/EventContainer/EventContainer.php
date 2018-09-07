<?php
namespace Thunder\Shortcode\EventContainer;

use Thunder\Shortcode\Events;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class EventContainer implements EventContainerInterface
{
    private $listeners = array();

    public function __construct()
    {
    }

    public function addListener($event, $handler)
    {
        if(!in_array($event, Events::getEvents())) {
            throw new \InvalidArgumentException(sprintf('Unsupported event %s!', $event));
        }

        if(!array_key_exists($event, $this->listeners)) {
            $this->listeners[$event] = array();
        }

        $this->listeners[$event][] = $handler;
    }

    public function getListeners($event)
    {
        return $this->hasEvent($event) ? $this->listeners[$event] : array();
    }

    private function hasEvent($name)
    {
        return array_key_exists($name, $this->listeners);
    }
}
