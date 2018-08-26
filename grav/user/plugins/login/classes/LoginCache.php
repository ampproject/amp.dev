<?php
/**
 * @package    Grav\Plugin\Login
 *
 * @copyright  Copyright (C) 2014 - 2017 RocketTheme, LLC. All rights reserved.
 * @license    MIT License; see LICENSE file for details.
 */
namespace Grav\Plugin\Login;

use Doctrine\Common\Cache\FilesystemCache;
use Grav\Common\Grav;

/**
 * PSR-16 forward compatible cache.
 * @package Grav\Plugin\Login
 */
class LoginCache
{
    /**
     * @var FilesystemCache
     */
    protected $driver;

    protected $lifetime;

    /**
     * @param string $namespace
     * @param null|int $defaultLifetime
     * @throws \InvalidArgumentException
     */
    public function __construct($namespace, $defaultLifetime = null)
    {
        // Setup cache
        $this->lifetime = (int)$defaultLifetime;
        $this->driver = new FilesystemCache(Grav::instance()['locator']->findResource('cache://login/' . $namespace, true, true));
    }

    /**
     * Fetches a value from the cache.
     *
     * @param string $key     The unique key of this item in the cache.
     * @param mixed  $default Default value to return if the key does not exist.
     *
     * @return mixed The value of the item from the cache, or $default in case of cache miss.
     */
    public function get($key, $default = null)
    {
        $value = $this->driver->fetch($key);

        // Doctrine cache does not differentiate between no result and cached 'false'. Make sure that we do.
        return $value !== false || $this->driver->contains($key) ? $value : $default;
    }

    /**
     * Persists data in the cache, uniquely referenced by a key with an optional expiration TTL time.
     *
     * @param string                $key   The key of the item to store.
     * @param mixed                 $value The value of the item to store, must be serializable.
     * @param null|int              $ttl   Optional. The TTL value of this item.
     *
     * @return bool True on success and false on failure.
     */
    public function set($key, $value, $ttl = null)
    {
        $ttl = $ttl !== null ? (int)$ttl : $this->lifetime;

        return $this->driver->save($key, $value, $ttl);
    }

    /**
     * Determines whether an item is present in the cache.
     *
     * @param string $key The cache item key.
     *
     * @return bool
     */
    public function has($key)
    {
        return $this->driver->contains($key);
    }

    /**
     * Delete an item from the cache by its unique key.
     *
     * @param string $key The unique cache key of the item to delete.
     *
     * @return bool True if the item was successfully removed. False if there was an error.
     */
    public function delete($key)
    {
        return $this->driver->delete($key);
    }

    /**
     * Wipes clean the entire cache's keys.
     *
     * @return bool True on success and false on failure.
     */
    public function clear()
    {
        return $this->driver->flushAll();
    }
}
