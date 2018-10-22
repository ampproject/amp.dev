<?php
/**
 * @package    Grav\Plugin\Login
 *
 * @copyright  Copyright (C) 2014 - 2017 RocketTheme, LLC. All rights reserved.
 * @license    MIT License; see LICENSE file for details.
 */
namespace Grav\Plugin\Login\RememberMe;

use Birke\Rememberme\Authenticator;
use Birke\Rememberme\Storage\StorageInterface;

/**
 * RememberMe
 *
 * Handles persistent cookie-storage (Remember Me)
 *
 * @author  Sommerregen <sommerregen@benjamin-regler.de>
 */
class RememberMe extends Authenticator
{
    /**
     * Gets storage interface
     *
     * @return StorageInterface
     */
    public function getStorage()
    {
        return $this->storage;
    }

    /**
     * Set storage interface
     *
     * @param StorageInterface $storage Storage interface
     */
    public function setStorage($storage)
    {
        $this->storage = $storage;
    }
}
