<?php
/**
 * PHP Exif Reader Adapter Abstract: Common functionality for adapters
 *
 * @link        http://github.com/miljar/PHPExif for the canonical source repository
 * @copyright   Copyright (c) 2013 Tom Van Herreweghe <tom@theanalogguy.be>
 * @license     http://github.com/miljar/PHPExif/blob/master/LICENSE MIT License
 * @category    PHPExif
 * @package     Reader
 */

namespace PHPExif\Adapter;

use PHPExif\Mapper\MapperInterface;
use PHPExif\Hydrator\HydratorInterface;

/**
 * PHP Exif Reader Adapter Abstract
 *
 * Implements common functionality for the reader adapters
 *
 * @category    PHPExif
 * @package     Reader
 */
abstract class AdapterAbstract implements AdapterInterface
{
    /**
     * @var string
     */
    protected $hydratorClass = '\\PHPExif\\Hydrator\\Mutator';

    /**
     * @var \PHPExif\Mapper\MapperInterface
     */
    protected $mapper;

    /**
     * @var \PHPExif\Hydrator\HydratorInterface
     */
    protected $hydrator;

    /**
     * @var string
     */
    protected $mapperClass = '';

    /**
     * Class constructor
     *
     * @param array $options Optional array of data to initialize the object with
     */
    public function __construct(array $options = array())
    {
        if (!empty($options)) {
            $this->setOptions($options);
        }
    }

    /**
     * Mutator for the data mapper
     *
     * @param \PHPExif\Mapper\MapperInterface $mapper
     * @return \PHPExif\Adapter\AdapterInterface
     */
    public function setMapper(MapperInterface $mapper)
    {
        $this->mapper = $mapper;

        return $this;
    }

    /**
     * Accessor for the data mapper
     *
     * @return \PHPExif\Mapper\MapperInterface
     */
    public function getMapper()
    {
        if (null === $this->mapper) {
            // lazy load one
            $mapper = new $this->mapperClass;

            $this->setMapper($mapper);
        }

        return $this->mapper;
    }

    /**
     * Mutator for the hydrator
     *
     * @param \PHPExif\Hydrator\HydratorInterface $hydrator
     * @return \PHPExif\Adapter\AdapterInterface
     */
    public function setHydrator(HydratorInterface $hydrator)
    {
        $this->hydrator = $hydrator;

        return $this;
    }

    /**
     * Accessor for the data hydrator
     *
     * @return \PHPExif\Hydrator\HydratorInterface
     */
    public function getHydrator()
    {
        if (null === $this->hydrator) {
            // lazy load one
            $hydrator = new $this->hydratorClass;

            $this->setHydrator($hydrator);
        }

        return $this->hydrator;
    }

    /**
     * Set array of options in the current object
     *
     * @param array $options
     * @return \PHPExif\Reader\AdapterAbstract
     */
    public function setOptions(array $options)
    {
        $hydrator = $this->getHydrator();
        $hydrator->hydrate($this, $options);

        return $this;
    }
}
