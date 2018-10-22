<?php
/**
 * PHP Exif Hydrator Interface: Defines the interface for a hydrator
 *
 * @link        http://github.com/miljar/PHPExif for the canonical source repository
 * @copyright   Copyright (c) 2015 Tom Van Herreweghe <tom@theanalogguy.be>
 * @license     http://github.com/miljar/PHPExif/blob/master/LICENSE MIT License
 * @category    PHPExif
 * @package     Hydrator
 * @codeCoverageIgnore
 */

namespace PHPExif\Hydrator;

/**
 * PHP Exif Hydrator
 *
 * Defines the interface for a hydrator
 *
 * @category    PHPExif
 * @package     Hydrator
 */
interface HydratorInterface
{
    /**
     * Hydrates given array of data into the given Exif object
     *
     * @param object $object
     * @param array $data
     * @return void
     */
    public function hydrate($object, array $data);
}
