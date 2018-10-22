<?php
namespace Thunder\Shortcode\EventContainer;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
interface EventContainerInterface
{
    public function getListeners($event);
}
