<?php
namespace Thunder\Shortcode\Serializer;

use Symfony\Component\Yaml\Yaml;
use Thunder\Shortcode\Shortcode\Shortcode;
use Thunder\Shortcode\Shortcode\ShortcodeInterface;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class YamlSerializer implements SerializerInterface
{
    public function serialize(ShortcodeInterface $shortcode)
    {
        return Yaml::dump(array(
            'name' => $shortcode->getName(),
            'parameters' => $shortcode->getParameters(),
            'content' => $shortcode->getContent(),
            'bbCode' => $shortcode->getBbCode(),
        ));
    }

    /**
     * @param string $text
     *
     * @return Shortcode
     */
    public function unserialize($text)
    {
        $data = Yaml::parse($text);

        if(!$data || !is_array($data)) {
            throw new \InvalidArgumentException('Invalid YAML, cannot unserialize Shortcode!');
        }
        if (!array_intersect(array_keys($data), array('name', 'parameters', 'content'))) {
            throw new \InvalidArgumentException('Malformed shortcode YAML, expected name, parameters, and content!');
        }

        $name = array_key_exists('name', $data) ? $data['name'] : null;
        $parameters = array_key_exists('parameters', $data) ? $data['parameters'] : array();
        $content = array_key_exists('content', $data) ? $data['content'] : null;
        $bbCode = array_key_exists('bbCode', $data) ? $data['bbCode'] : null;

        if(!is_array($parameters)) {
            throw new \InvalidArgumentException('Parameters must be an array!');
        }

        return new Shortcode($name, $parameters, $content, $bbCode);
    }
}
