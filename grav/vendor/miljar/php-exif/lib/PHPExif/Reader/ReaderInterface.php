<?php
/**
 * PHP Exif Reader Interface: Defines the interface for
 * the Reader functionality
 *
 * @link        http://github.com/miljar/PHPExif for the canonical source repository
 * @copyright   Copyright (c) 2015 Tom Van Herreweghe <tom@theanalogguy.be>
 * @license     http://github.com/miljar/PHPExif/blob/master/LICENSE MIT License
 * @category    PHPExif
 * @package     Reader
 * @codeCoverageIgnore
 */

namespace PHPExif\Reader;

/**
 * PHP Exif Reader
 *
 * Defines the interface for reader functionality
 *
 * @category    PHPExif
 * @package     Reader
 */
interface ReaderInterface
{
    /**
     * Reads & parses the EXIF data from given file
     *
     * @param string $file
     * @return \PHPExif\Exif Instance of Exif object with data
     */
    public function read($file);
}
