<?php
namespace Thunder\Shortcode\Serializer;

use Thunder\Shortcode\Shortcode\Shortcode;
use Thunder\Shortcode\Shortcode\ShortcodeInterface;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class XmlSerializer implements SerializerInterface
{
    /**
     * <shortcode name="NAME">
     *   <bbCode>BBCODE</bbCode>
     *   <parameters>
     *     <parameter name="KEY">VALUE</parameter>
     *     <parameter name="KEY">VALUE</parameter>
     *   </parameters>
     *   <content>CONTENT></content>
     * </shortcode>
     *
     * @param ShortcodeInterface $shortcode
     *
     * @return string
     */
    public function serialize(ShortcodeInterface $shortcode)
    {
        $doc = new \DOMDocument('1.0', 'UTF-8');
        $doc->preserveWhiteSpace = false;
        $doc->formatOutput = true;

        $code = $doc->createElement('shortcode');
        $code->setAttribute('name', $shortcode->getName());
        $xml = $doc->appendChild($code);
        $xml->appendChild($this->createCDataNode($doc, 'bbCode', $shortcode->getBbCode()));

        $parameters = $xml->appendChild($doc->createElement('parameters'));
        foreach($shortcode->getParameters() as $key => $value) {
            $parameter = $doc->createElement('parameter');
            $parameter->setAttribute('name', $key);
            if(null !== $value) {
                $parameter->appendChild($doc->createCDATASection($value));
            }

            $parameters->appendChild($parameter);
        }

        $xml->appendChild($this->createCDataNode($doc, 'content', $shortcode->getContent()));

        return $doc->saveXML();
    }

    private function createCDataNode(\DOMDocument $doc, $name, $content)
    {
        $node = $doc->createElement($name);

        if(null !== $content) {
            $node->appendChild($doc->createCDATASection($content));
        }

        return $node;
    }

    /**
     * @param string $text
     *
     * @return Shortcode
     */
    public function unserialize($text)
    {
        $xml = new \DOMDocument();
        $internalErrors = libxml_use_internal_errors(true);
        if(!$text || ($text && !$xml->loadXML($text))) {
            libxml_use_internal_errors($internalErrors);
            throw new \InvalidArgumentException('Failed to parse provided XML!');
        }
        libxml_use_internal_errors($internalErrors);

        $xpath = new \DOMXPath($xml);
        $shortcode = $xpath->query('/shortcode');
        if($shortcode->length !== 1) {
            throw new \InvalidArgumentException('Invalid shortcode XML!');
        }
        $name = $this->getAttribute($shortcode->item(0), 'name');

        $bbCode = $this->getValue($xpath->query('/shortcode/bbCode'));
        $content = $this->getValue($xpath->query('/shortcode/content'));

        $parameters = array();
        $elements = $xpath->query('/shortcode/parameters/parameter');
        for($i = 0; $i < $elements->length; $i++) {
            $node = $elements->item($i);

            $parameters[$this->getAttribute($node, 'name')] = $node->hasChildNodes() ? $node->nodeValue : null;
        }

        return new Shortcode($name, $parameters, $content, $bbCode);
    }

    private function getValue(\DOMNodeList $node)
    {
        return $node->length === 1 && $node->item(0)->hasChildNodes()
            ? $node->item(0)->nodeValue
            : null;
    }

    private function getAttribute(\DOMNode $node, $name)
    {
        $attribute = $node->attributes->getNamedItem($name);

        if(!$attribute || ($attribute && !$attribute->nodeValue)) {
            throw new \InvalidArgumentException('Invalid shortcode XML!');
        }

        return $attribute->nodeValue;
    }
}
