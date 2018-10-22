<?php
namespace Thunder\Shortcode\Tests;

use Thunder\Shortcode\HandlerContainer\HandlerContainer;
use Thunder\Shortcode\HandlerContainer\ImmutableHandlerContainer;
use Thunder\Shortcode\Shortcode\ShortcodeInterface;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class HandlerContainerTest extends \PHPUnit_Framework_TestCase
{
    public function testExceptionOnDuplicateHandler()
    {
        $handlers = new HandlerContainer();
        $handlers->add('name', function () {});
        $this->setExpectedException('RuntimeException');
        $handlers->add('name', function () {});
    }

    public function testRemove()
    {
        $handlers = new HandlerContainer();
        $this->assertFalse($handlers->has('code'));
        $handlers->add('code', function(ShortcodeInterface $s) {});
        $this->assertTrue($handlers->has('code'));
        $handlers->remove('code');
        $this->assertFalse($handlers->has('code'));
    }

    public function testRemoveException()
    {
        $handlers = new HandlerContainer();
        $this->setExpectedException('RuntimeException');
        $handlers->remove('code');
    }

    public function testNames()
    {
        $handlers = new HandlerContainer();
        $this->assertEmpty($handlers->getNames());
        $handlers->add('code', function(ShortcodeInterface $s) {});
        $this->assertSame(array('code'), $handlers->getNames());
        $handlers->addAlias('c', 'code');
        $this->assertSame(array('code', 'c'), $handlers->getNames());
    }

    public function testHandlerContainer()
    {
        $x = function () {};

        $handler = new HandlerContainer();
        $handler->add('x', $x);
        $handler->addAlias('y', 'x');

        $this->assertSame($x, $handler->get('x'));
    }

    public function testInvalidHandler()
    {
        $handlers = new HandlerContainer();
        $this->setExpectedException('RuntimeException');
        $handlers->add('invalid', new \stdClass());
    }

    public function testDefaultHandler()
    {
        $handlers = new HandlerContainer();
        $this->assertNull($handlers->get('missing'));

        $handlers->setDefault(function () {});
        $this->assertNotNull($handlers->get('missing'));
    }

    public function testExceptionIfAliasingNonExistentHandler()
    {
        $handlers = new HandlerContainer();
        $this->setExpectedException('RuntimeException');
        $handlers->addAlias('m', 'missing');
    }

    public function testImmutableHandlerContainer()
    {
        $handlers = new HandlerContainer();
        $handlers->add('code', function () {});
        $handlers->addAlias('c', 'code');
        $imHandlers = new ImmutableHandlerContainer($handlers);
        $handlers->add('not', function() {});

        $this->assertNull($imHandlers->get('missing'));
        $this->assertNotNull($imHandlers->get('code'));
        $this->assertNotNull($imHandlers->get('c'));
        $this->assertNull($imHandlers->get('not'));

        $defaultHandlers = new HandlerContainer();
        $defaultHandlers->setDefault(function () {});
        $imDefaultHandlers = new ImmutableHandlerContainer($defaultHandlers);
        $this->assertNotNull($imDefaultHandlers->get('missing'));
    }
}
