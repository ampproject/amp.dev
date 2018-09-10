<?php
namespace Thunder\Shortcode\EventHandler;

use Thunder\Shortcode\Event\FilterShortcodesEvent;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class FilterRawEventHandler
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

    public function __invoke(FilterShortcodesEvent $event)
    {
        $parent = $event->getParent();
        if($parent && in_array($parent->getName(), $this->names)) {
            $event->setShortcodes(array());

            return;
        }
    }
}
