<?php
/**
 * PHP Exif Mutator Hydrator: Hydrate an object
 * by manipulating the object with its mutator methods
 *
 * @link        http://github.com/miljar/PHPExif for the canonical source repository
 * @copyright   Copyright (c) 2015 Tom Van Herreweghe <tom@theanalogguy.be>
 * @license     http://github.com/miljar/PHPExif/blob/master/LICENSE MIT License
 * @category    PHPExif
 * @package     Hydrator
 */

namespace PHPExif\Hydrator;

/**
 * PHP Exif Mutator Hydrator
 *
 * Hydrates an object by setting data with
 * the class mutator methods
 *
 * @category    PHPExif
 * @package     Hydrator
 */
class Mutator implements HydratorInterface
{
    /**
     * Hydrates given array of data into the given Exif object
     *
     * @param object $object
     * @param array $data
     * @return void
     */
    public function hydrate($object, array $data)
    {
        foreach ($data as $property => $value) {

            $mutator = $this->determineMutator($property);

            if (method_exists($object, $mutator)) {
                $object->$mutator($value);
            }
        }
    }

    /**
     * Determines the name of the mutator method for given property name
     *
     * @param string $property  The property to determine the mutator for
     * @return string   The name of the mutator method
     */
    protected function determineMutator($property)
    {
        $method = 'set' . ucfirst($property);
        return $method;
    }
}
