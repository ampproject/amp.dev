<?php
namespace Thunder\Shortcode\Handler;

use Thunder\Shortcode\Serializer\SerializerInterface;
use Thunder\Shortcode\Shortcode\ShortcodeInterface;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class SerializerHandler
{
    /** @var SerializerInterface */
    private $serializer;

    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }

    /**
     * [text arg=val /]
     * [text arg=val]content[/text]
     * [json arg=val /]
     * [json arg=val]content[/json]
     * [xml arg=val /]
     * [xml arg=val]content[/xml]
     * [yaml arg=val /]
     * [yaml arg=val]content[/yaml]
     *
     * @param ShortcodeInterface $shortcode
     *
     * @return string
     */
    public function __invoke(ShortcodeInterface $shortcode)
    {
        return $this->serializer->serialize($shortcode);
    }
}
