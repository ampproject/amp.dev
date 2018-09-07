<?php
namespace Thunder\Shortcode\Tests;

use Thunder\Shortcode\Syntax\Syntax;
use Thunder\Shortcode\Syntax\CommonSyntax;
use Thunder\Shortcode\Syntax\SyntaxBuilder;
use Thunder\Shortcode\Syntax\SyntaxInterface;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class SyntaxTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @dataProvider provideSyntaxes
     */
    public function testSyntax(SyntaxInterface $syntax, $open, $close, $slash, $parameter, $value)
    {
        $this->assertSame($open, $syntax->getOpeningTag());
        $this->assertSame($close, $syntax->getClosingTag());
        $this->assertSame($slash, $syntax->getClosingTagMarker());
        $this->assertSame($parameter, $syntax->getParameterValueSeparator());
        $this->assertSame($value, $syntax->getParameterValueDelimiter());
    }

    public function provideSyntaxes()
    {
        return array(
            array(new Syntax(), '[', ']', '/', '=', '"'),
            array(new Syntax('[[', ']]', '//', '==', '""'), '[[', ']]', '//', '==', '""'),
            array(new CommonSyntax(), '[', ']', '/', '=', '"'),
            );
    }

    /**
     * Note: do not merge this test with data provider above, code coverage
     * does not understand this and marks builder class as untested.
     */
    public function testBuilder()
    {
        $builder = new SyntaxBuilder();
        $this->testSyntax($builder->getSyntax(), '[', ']', '/', '=', '"');

        $builder = new SyntaxBuilder();
        $doubleBuiltSyntax = $builder
            ->setOpeningTag('[[')
            ->setClosingTag(']]')
            ->setClosingTagMarker('//')
            ->setParameterValueSeparator('==')
            ->setParameterValueDelimiter('""')
            ->getSyntax();
        $this->testSyntax($doubleBuiltSyntax, '[[', ']]', '//', '==', '""');
    }
}
