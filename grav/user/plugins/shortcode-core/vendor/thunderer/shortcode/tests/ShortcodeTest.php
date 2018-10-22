<?php
namespace Thunder\Shortcode\Tests;

use Thunder\Shortcode\HandlerContainer\HandlerContainer;
use Thunder\Shortcode\Parser\RegexParser;
use Thunder\Shortcode\Processor\Processor;
use Thunder\Shortcode\Processor\ProcessorContext;
use Thunder\Shortcode\Serializer\TextSerializer;
use Thunder\Shortcode\Shortcode\ParsedShortcode;
use Thunder\Shortcode\Shortcode\ProcessedShortcode;
use Thunder\Shortcode\Shortcode\Shortcode;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class ShortcodeTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @dataProvider provideShortcodes
     */
    public function testShortcode($expected, $name, array $args, $content)
    {
        $s = new Shortcode($name, $args, $content);
        $textSerializer = new TextSerializer();

        $this->assertSame($name, $s->getName());
        $this->assertSame($args, $s->getParameters());
        $this->assertSame($content, $s->getContent());
        $this->assertSame($expected, $textSerializer->serialize($s));
        $this->assertSame('arg', $s->getParameterAt(0));
        $this->assertTrue($s->hasParameters());
    }

    public function provideShortcodes()
    {
        return array(
            array('[x arg=val /]', 'x', array('arg' => 'val'), null),
            array('[x arg=val][/x]', 'x', array('arg' => 'val'), ''),
            array('[x arg=val]inner[/x]', 'x', array('arg' => 'val'), 'inner'),
            array('[x arg="val val"]inner[/x]', 'x', array('arg' => 'val val'), 'inner'),
        );
    }

    public function testObject()
    {
        $shortcode = new Shortcode('random', array('arg' => 'value', 'none' => null), 'something');

        $this->assertTrue($shortcode->hasParameter('arg'));
        $this->assertFalse($shortcode->hasParameter('invalid'));
        $this->assertSame(null, $shortcode->getParameter('none'));
        $this->assertSame('value', $shortcode->getParameter('arg'));
        $this->assertSame('', $shortcode->getParameter('invalid', ''));
        $this->assertSame(42, $shortcode->getParameter('invalid', 42));

        $this->assertNotSame($shortcode, $shortcode->withContent('x'));
    }

    public function testProcessedShortcode()
    {
        $processor = new Processor(new RegexParser(), new HandlerContainer());

        $context = new ProcessorContext();
        $context->shortcode = new Shortcode('code', array('arg' => 'val'), 'content');
        $context->processor = $processor;
        $context->position = 20;
        $context->namePosition = array('code' => 10);
        $context->text = ' [code] ';
        $context->shortcodeText = '[code]';
        $context->offset = 1;
        $context->iterationNumber = 1;
        $context->recursionLevel = 0;
        $context->parent = null;

        $processed = ProcessedShortcode::createFromContext($context);

        $this->assertSame('code', $processed->getName());
        $this->assertSame(array('arg' => 'val'), $processed->getParameters());
        $this->assertSame('content', $processed->getContent());

        $this->assertSame(20, $processed->getPosition());
        $this->assertSame(10, $processed->getNamePosition());
        $this->assertSame(' [code] ', $processed->getText());
        $this->assertSame(1, $processed->getOffset());
        $this->assertSame('[code]', $processed->getShortcodeText());
        $this->assertSame(1, $processed->getIterationNumber());
        $this->assertSame(0, $processed->getRecursionLevel());
        $this->assertSame(null, $processed->getParent());
        $this->assertSame($processor, $processed->getProcessor());
    }

    public function testProcessedShortcodeParents()
    {
        $context = new ProcessorContext();
        $context->shortcode = new Shortcode('p1', array(), null);
        $context->parent = null;
        $context->namePosition = array('p1' => 0, 'p2' => 0, 'p3' => 0);
        $p1 = ProcessedShortcode::createFromContext($context);
        $context->shortcode = new Shortcode('p2', array(), null);
        $context->parent = $p1;
        $p2 = ProcessedShortcode::createFromContext($context);
        $context->shortcode = new Shortcode('p3', array(), null);
        $context->parent = $p2;
        $p3 = ProcessedShortcode::createFromContext($context);

        $this->assertSame('p3', $p3->getName());
        $this->assertSame('p2', $p3->getParent()->getName());
        $this->assertSame('p1', $p3->getParent()->getParent()->getName());
        $this->assertFalse($p1->hasAncestor('p3'));
        $this->assertFalse($p1->hasAncestor('p1'));
        $this->assertTrue($p2->hasAncestor('p1'));
        $this->assertFalse($p2->hasAncestor('p3'));
        $this->assertTrue($p3->hasAncestor('p1'));
        $this->assertTrue($p3->hasAncestor('p2'));
        $this->assertFalse($p3->hasAncestor('p4'));
    }

    public function testParsedShortcode()
    {
        $shortcode = new ParsedShortcode(new Shortcode('name', array('arg' => 'val'), 'content'), 'text', 12);

        $this->assertSame('name', $shortcode->getName());
        $this->assertSame(array('arg' => 'val'), $shortcode->getParameters());
        $this->assertSame('content', $shortcode->getContent());
        $this->assertSame('text', $shortcode->getText());
        $this->assertSame(12, $shortcode->getOffset());
        $this->assertSame(true, $shortcode->hasContent());

        $this->assertSame(false, $shortcode->withContent(null)->hasContent());
        $this->assertSame('another', $shortcode->withContent('another')->getContent());
    }

    public function testShortcodeEmptyNameException()
    {
        $this->setExpectedException('InvalidArgumentException');
        new Shortcode('', array(), null);
    }
}
