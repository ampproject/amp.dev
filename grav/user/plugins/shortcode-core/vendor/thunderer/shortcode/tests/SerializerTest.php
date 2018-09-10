<?php
namespace Thunder\Shortcode\Tests;

use Thunder\Shortcode\Serializer\JsonSerializer;
use Thunder\Shortcode\Serializer\SerializerInterface;
use Thunder\Shortcode\Serializer\TextSerializer;
use Thunder\Shortcode\Serializer\XmlSerializer;
use Thunder\Shortcode\Serializer\YamlSerializer;
use Thunder\Shortcode\Shortcode\ParsedShortcode;
use Thunder\Shortcode\Shortcode\Shortcode;
use Thunder\Shortcode\Shortcode\ShortcodeInterface;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class SerializerTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @dataProvider provideShortcodes
     */
    public function testSerializer(SerializerInterface $serializer, ShortcodeInterface $test)
    {
        $result = $serializer->serialize($test);
        $tested = $serializer->unserialize($result);

        $this->assertSame($test->getName(), $tested->getName(), 'name: '.$result);
        $this->assertSame($test->getParameters(), $tested->getParameters(), 'parameters: '.$result);
        $this->assertSame($test->getContent(), $tested->getContent(), 'content: '.$result);
        $this->assertSame($test->getBbCode(), $tested->getBbCode(), 'bbCode: '.$result);
    }

    public function provideShortcodes()
    {
        $shortcodes = array(
            new Shortcode('x', array(), null),
            new Shortcode('x', array('arg' => 'val'), null),
            new Shortcode('x', array('arg' => null), null),
            new Shortcode('x', array('arg' => ''), null),
            new Shortcode('x', array('arg' => 'val'), 'cnt'),
            new ParsedShortcode(new Shortcode('self-closed', array(), null), '[self-closed /]', 0),
            new Shortcode('self-closed', array(), null, 'bb code'."\n".' value'),
        );

        $serializers = array(
            new TextSerializer(),
            new JsonSerializer(),
            new XmlSerializer(),
            new YamlSerializer(),
        );

        $tests = array();
        foreach($shortcodes as $shortcode) {
            foreach($serializers as $serializer) {
                $tests[] = array($serializer, $shortcode);
            }
        }

        return $tests;
    }

    /**
     * @dataProvider provideUnserialized
     */
    public function testUnserialize(SerializerInterface $serializer, ShortcodeInterface $test, $text)
    {
        $tested = $serializer->unserialize($text);

        $this->assertSame($test->getName(), $tested->getName(), 'name: '.$text);
        $this->assertSame($test->getParameters(), $tested->getParameters(), 'parameters: '.$text);
        $this->assertSame($test->getContent(), $tested->getContent(), 'content: '.$text);
        $this->assertSame($test->getBbCode(), $tested->getBbCode(), 'bbCode: '.$text);
    }

    public function provideUnserialized()
    {
        return array(
            array(new JsonSerializer(), new Shortcode('x', array(), null), '{"name":"x"}'),
            array(new JsonSerializer(), new Shortcode('x', array('arg' => 'val'), null), '{"name":"x","parameters":{"arg":"val"}}'),
            array(new JsonSerializer(), new Shortcode('x', array(), 'cnt'), '{"name":"x","content":"cnt"}'),
            array(new YamlSerializer(), new Shortcode('x', array(), null), 'name: x'),
            array(new YamlSerializer(), new Shortcode('x', array('arg' => 'val'), null), 'name: x'."\n".'parameters:'."\n".'  arg: val'),
            array(new YamlSerializer(), new Shortcode('x', array(), 'cnt'), 'name: x'."\n".'content: cnt'),
            array(new XmlSerializer(), new Shortcode('x', array(), null), '<shortcode name="x"></shortcode>'),
            array(new XmlSerializer(), new Shortcode('x', array('arg' => 'val'), null), '<shortcode name="x"><parameters><parameter name="arg">val</parameter></parameters></shortcode>'),
            array(new XmlSerializer(), new Shortcode('x', array(), 'cnt'), '<shortcode name="x"><content>cnt</content></shortcode>'),
        );
    }

    /**
     * @dataProvider provideExceptions
     */
    public function testSerializerExceptions(SerializerInterface $serializer, $value, $exceptionClass)
    {
        $this->setExpectedException($exceptionClass);
        $serializer->unserialize($value);
    }

    public function provideExceptions()
    {
        $xml = new XmlSerializer();
        $yaml = new YamlSerializer();
        $text = new TextSerializer();
        $json = new JsonSerializer();

        return array(
            array($text, '[sc /] c [xx]', 'InvalidArgumentException'),
            array($text, '[/sc]', 'InvalidArgumentException'),
            array($json, '{}', 'InvalidArgumentException'),
            array($json, '', 'InvalidArgumentException'),
            array($json, '{"name":"x","parameters":null}', 'InvalidArgumentException'),
            array($json, '{"name":"x","parameters":{"key":[]}}', 'InvalidArgumentException'),
            array($yaml, 'shortcode: ', 'InvalidArgumentException'),
            array($yaml, '', 'InvalidArgumentException'),
            array($yaml, 'name: x'."\n".'parameters: string', 'InvalidArgumentException'),
            array($xml, '<shortcode />', 'InvalidArgumentException'),
            array($xml, '<shortcode name=""><content>sss</content></shortcode>', 'InvalidArgumentException'),
            array($xml, '<shortcode name="x"><parameters><parameter>xx</parameter></parameters><content>sss</content></shortcode>', 'InvalidArgumentException'),
            array($xml, '<shortcode name="x"><parameters><parameter name="">xx</parameter></parameters><content>sss</content></shortcode>', 'InvalidArgumentException'),
            array($xml, '<shortcode name="x"><parameters><parameter name=>xx</parameter></parameters><content>sss</content></shortcode>', 'InvalidArgumentException'),
            array($xml, '<invalid />', 'InvalidArgumentException'),
            array($xml, '', 'InvalidArgumentException'),
        );
    }
}
