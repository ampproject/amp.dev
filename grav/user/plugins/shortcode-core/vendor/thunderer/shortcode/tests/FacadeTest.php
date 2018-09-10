<?php
namespace Thunder\Shortcode\Tests;

use Thunder\Shortcode\EventHandler\FilterRawEventHandler;
use Thunder\Shortcode\Events;
use Thunder\Shortcode\HandlerContainer\HandlerContainer;
use Thunder\Shortcode\Parser\RegexParser;
use Thunder\Shortcode\Shortcode\Shortcode;
use Thunder\Shortcode\Shortcode\ShortcodeInterface;
use Thunder\Shortcode\ShortcodeFacade;
use Thunder\Shortcode\Syntax\CommonSyntax;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class FacadeTest extends \PHPUnit_Framework_TestCase
{
    public function testFacade()
    {
        $handlers = new HandlerContainer();
        $handlers
            ->add('name', function (ShortcodeInterface $s) { return $s->getName(); })
            ->addAlias('n', 'name');

        $facade = ShortcodeFacade::create($handlers, new CommonSyntax());
        $facade->addHandler('content', function (ShortcodeInterface $s) { return $s->getContent(); });
        $facade->addHandlerAlias('c', 'content');
        $facade->setParser(new RegexParser());

        $this->assertSame('n', $facade->process('[n]'));
        $this->assertSame('c', $facade->process('[c]c[/c]'));

        $shortcodes = $facade->parse('[b]');
        $this->assertInstanceOf('Thunder\\Shortcode\\Shortcode\\ParsedShortcodeInterface', $shortcodes[0]);
    }

    public function testFacadeEvents()
    {
        $facade = new ShortcodeFacade();
        $facade->addHandler('n', function (ShortcodeInterface $s) { return $s->getName(); });
        $facade->addEventHandler(Events::FILTER_SHORTCODES, new FilterRawEventHandler(array('raw')));

        $this->assertSame('[raw] [n] [/raw]', $facade->process('[raw] [n] [/raw]'));
    }

    public function testSerialization()
    {
        $facade = new ShortcodeFacade();

        $s = new Shortcode('c', array(), null);
        $this->assertSame('[c /]', $facade->serializeToText($s));
        $this->assertSame('c', $facade->unserializeFromText('[c]')->getName());
        $this->assertSame('[c /]', $facade->serialize($s, 'text'));
        $this->assertSame('c', $facade->unserialize('[c]', 'text')->getName());

        $json = '{"name":"c","parameters":[],"content":null,"bbCode":null}';
        $this->assertSame($json, $facade->serializeToJson($s));
        $this->assertSame('c', $facade->unserializeFromJson($json)->getName());
        $this->assertSame($json, $facade->serialize($s, 'json'));
        $this->assertSame('c', $facade->unserialize($json, 'json')->getName());

        $yaml = <<<EOF
name: c
parameters: {  }
content: null
bbCode: null

EOF;
        $this->assertSame($yaml, $facade->serialize($s, 'yaml'));
        $this->assertSame('c', $facade->unserialize($yaml, 'yaml')->getName());

        $xml = <<<EOF
<?xml version="1.0" encoding="UTF-8"?>
<shortcode name="c">
  <bbCode/>
  <parameters/>
  <content/>
</shortcode>

EOF;
        $this->assertSame($xml, $facade->serialize($s, 'xml'));
        $this->assertSame('c', $facade->unserialize($xml, 'xml')->getName());
    }

    public function testInvalidSerializationFormatException()
    {
        $this->setExpectedException('InvalidArgumentException');
        $facade = new ShortcodeFacade();
        $facade->serialize(new Shortcode('name', array(), null), 'invalid');
    }

    public function testInvalidUnserializationFormatException()
    {
        $this->setExpectedException('InvalidArgumentException');
        $facade = new ShortcodeFacade();
        $facade->unserialize('[c]', 'invalid');
    }
}
