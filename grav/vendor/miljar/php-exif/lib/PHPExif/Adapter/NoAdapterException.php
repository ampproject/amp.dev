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

use Exception;

/**
 * PHP Exif Reader Adapter
 *
 * Defines the interface for reader adapters
 *
 * @category    PHPExif
 * @package     Reader
 */
class NoAdapterException extends Exception
{
    //empty
}
