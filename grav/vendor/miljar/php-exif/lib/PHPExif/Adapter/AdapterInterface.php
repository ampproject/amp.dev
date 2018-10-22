<?php
/**
 * PHP Exif Reader Adapter Interface: Defines the interface for reader adapters
 *
 * @link        http://github.com/miljar/PHPExif for the canonical source repository
 * @copyright   Copyright (c) 2013 Tom Van Herreweghe <tom@theanalogguy.be>
 * @license     http://github.com/miljar/PHPExif/blob/master/LICENSE MIT License
 * @category    PHPExif
 * @package     Reader
 * @codeCoverageIgnore
 */

namespace PHPExif\Adapter;

/**
 * PHP Exif Reader Adapter
 *
 * Defines the interface for reader adapters
 *
 * @category    PHPExif
 * @package     Reader
 */
interface AdapterInterface
{
    /**
     * Reads & parses the EXIF data from given file
     *
     * @param string $file
     * @return \PHPExif\Exif Instance of Exif object with data
     * @throws \RuntimeException If the EXIF data could not be read
     */
    public function getExifFromFile($file);
}
