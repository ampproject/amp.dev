<?php
/**
 * PHP Exif Mapper Interface: Defines the interface for data mappers
 *
 * @link        http://github.com/miljar/PHPExif for the canonical source repository
 * @copyright   Copyright (c) 2015 Tom Van Herreweghe <tom@theanalogguy.be>
 * @license     http://github.com/miljar/PHPExif/blob/master/LICENSE MIT License
 * @category    PHPExif
 * @package     Mapper
 * @codeCoverageIgnore
 */

namespace PHPExif\Mapper;

/**
 * PHP Exif Mapper
 *
 * Defines the interface for data mappers
 *
 * @category    PHPExif
 * @package     Mapper
 */
interface MapperInterface
{
    /**
     * Maps the array of raw source data to the correct
     * fields for the \PHPExif\Exif class
     *
     * @param array $data
     * @return array
     */
    public function mapRawData(array $data);
}
