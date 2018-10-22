<?php
namespace Thunder\Shortcode\Serializer;

use Thunder\Shortcode\Shortcode\Shortcode;
use Thunder\Shortcode\Shortcode\ShortcodeInterface;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class JsonSerializer implements SerializerInterface
{
    public function serialize(ShortcodeInterface $shortcode)
    {
        return json_encode(array(
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
        $data = json_decode($text, true);

        if (!is_array($data)) {
            throw new \InvalidArgumentException('Invalid JSON, cannot unserialize Shortcode!');
        }
        if (!array_diff_key($data, array('name', 'parameters', 'content'))) {
            throw new \InvalidArgumentException('Malformed Shortcode JSON, expected name, parameters, and content!');
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
