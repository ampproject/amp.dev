<?php
namespace Thunder\Shortcode\Tests;

use Thunder\Shortcode\Event\ReplaceShortcodesEvent;
use Thunder\Shortcode\EventContainer\EventContainer;
use Thunder\Shortcode\EventHandler\FilterRawEventHandler;
use Thunder\Shortcode\EventHandler\ReplaceJoinEventHandler;
use Thunder\Shortcode\Events;
use Thunder\Shortcode\HandlerContainer\HandlerContainer;
use Thunder\Shortcode\Parser\RegularParser;
use Thunder\Shortcode\Processor\Processor;
use Thunder\Shortcode\Shortcode\ReplacedShortcode;
use Thunder\Shortcode\Shortcode\ProcessedShortcode;
use Thunder\Shortcode\Shortcode\ShortcodeInterface;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class EventsTest extends \PHPUnit_Framework_TestCase
{
    public function testRaw()
    {
        $times = 0;
        $handlers = new HandlerContainer();
        $handlers->add('raw', function(ShortcodeInterface $s) { return $s->getContent(); });
        $handlers->add('n', function(ShortcodeInterface $s) use(&$times) { ++$times; return $s->getName(); });
        $handlers->add('c', function(ShortcodeInterface $s) use(&$times) { ++$times; return $s->getContent(); });

        $events = new EventContainer();
        $events->addListener(Events::FILTER_SHORTCODES, new FilterRawEventHandler(array('raw')));

        $processor = new Processor(new RegularParser(), $handlers);
        $processor = $processor->withEventContainer($events);

        $this->assertSame(' [n] [c]cnt[/c] [/n] ', $processor->process('[raw] [n] [c]cnt[/c] [/n] [/raw]'));
        $this->assertSame('x un [n] [c]cnt[/c] [/n]  y', $processor->process('x [c]u[n][/c][raw] [n] [c]cnt[/c] [/n] [/raw] y'));
        $this->assertEquals(2, $times);
    }

    public function testStripContentOutsideShortcodes()
    {
        $handlers = new HandlerContainer();
        $handlers->add('name', function(ShortcodeInterface $s) { return $s->getName(); });
        $handlers->add('content', function(ShortcodeInterface $s) { return $s->getContent(); });
        $handlers->add('root', function(ProcessedShortcode $s) { return 'root['.$s->getContent().']'; });

        $events = new EventContainer();
        $events->addListener(Events::REPLACE_SHORTCODES, new ReplaceJoinEventHandler(array('root')));

        $processor = new Processor(new RegularParser(), $handlers);
        $processor = $processor->withEventContainer($events);

        $this->assertSame('a root[name name name] b', $processor->process('a [root]x [name] c[content] [name /] [/content] y[name/][/root] b'));
    }

    public function testDefaultApplier()
    {
        $handlers = new HandlerContainer();
        $handlers->add('name', function(ShortcodeInterface $s) { return $s->getName(); });
        $handlers->add('content', function(ShortcodeInterface $s) { return $s->getContent(); });
        $handlers->add('root', function(ProcessedShortcode $s) { return 'root['.$s->getContent().']'; });

        $events = new EventContainer();
        $events->addListener(Events::REPLACE_SHORTCODES, function(ReplaceShortcodesEvent $event) {
            $event->setResult(array_reduce(array_reverse($event->getReplacements()), function($state, ReplacedShortcode $r) {
                $offset = $r->getOffset();
                $length = mb_strlen($r->getText());

                return mb_substr($state, 0, $offset).$r->getReplacement().mb_substr($state, $offset + $length);
            }, $event->getText()));
        });

        $processor = new Processor(new RegularParser(), $handlers);
        $processor = $processor->withEventContainer($events);

        $this->assertSame('a root[x name c name  y] b', $processor->process('a [root]x [name] c[content] [name /] [/content] y[/root] b'));
    }

    public function testExceptionOnHandlerForUnknownEvent()
    {
        $events = new EventContainer();
        $this->setExpectedException('InvalidArgumentException');
        $events->addListener('invalid', function() {});
    }

    public function testInvalidFilterRawShortcodesNames()
    {
        $this->setExpectedException('InvalidArgumentException');
        new FilterRawEventHandler(array(new \stdClass()));
    }

    public function testInvalidReplaceJoinNames()
    {
        $this->setExpectedException('InvalidArgumentException');
        new ReplaceJoinEventHandler(array(new \stdClass()));
    }
}
