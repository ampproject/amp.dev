<?php
namespace Thunder\Shortcode\EventHandler;

use Thunder\Shortcode\Event\ReplaceShortcodesEvent;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class ReplaceJoinEventHandler
{
    /** @var string[] */
    private $names = array();

    public function __construct(array $names)
    {
        foreach($names as $name) {
            if(false === is_string($name)) {
                throw new \InvalidArgumentException('Expected array of strings!');
            }

            $this->names[] = $name;
        }
    }

    public function __invoke(ReplaceShortcodesEvent $event)
    {
        if($event->getShortcode() && in_array($event->getShortcode()->getName(), $this->names)) {
            $replaces = array();
            foreach($event->getReplacements() as $r) {
                $replaces[] = $r->getReplacement();
            }

            $event->setResult(implode('', $replaces));
        }
    }
}
