<?php
/**
 * @package    Grav\Plugin\Login
 *
 * @copyright  Copyright (C) 2014 - 2017 RocketTheme, LLC. All rights reserved.
 * @license    MIT License; see LICENSE file for details.
 */
namespace Grav\Plugin\Login\RememberMe;

use Grav\Common\Cache;
use Grav\Common\Grav;
use Doctrine\Common\Cache\CacheProvider;
use Doctrine\Common\Cache\FilesystemCache;
use Birke\Rememberme\Storage\StorageInterface;

/**
 * Storage wrapper for Doctrine cache
 *
 * Used for storing the credential/token/persistentToken triplets.
 *
 * @author  Sommerregen <sommerregen@benjamin-regler.de>
 */
class TokenStorage implements StorageInterface
{
    /**
     * @var CacheProvider
     */
    protected $driver;

    /**
     * @var string
     */
    protected $cache_dir;

    /**
     * Constructor
     *
     * @param string    $path   Path to storage directory
     * @throws \InvalidArgumentException
     */
    public function __construct($path = 'cache://rememberme')
    {
        /** @var Cache $cache */
        $cache = Grav::instance()['cache'];

        $this->cache_dir = Grav::instance()['locator']->findResource($path, true, true);

        // Setup cache
        $this->driver = $cache->getCacheDriver();
        if ($this->driver instanceof FilesystemCache) {
            $this->driver = new FilesystemCache($this->cache_dir);
        }

        // Set the cache namespace to our unique key
        $this->driver->setNamespace($cache->getKey());
    }

    /**
     * Return Tri-state value constant
     *
     * @param mixed     $credential         Unique credential (user id,
     *                                      email address, user name)
     * @param string    $token              One-Time Token
     * @param string    $persistentToken    Persistent Token
     *
     * @return int
     */
    public function findTriplet($credential, $token, $persistentToken)
    {

        // Hash the tokens, because they can contain a salt and can be
        // accessed in the file system
        $persistentToken = sha1(trim($persistentToken));
        $token = sha1(trim($token));

        $id = $this->getId($credential);
        if (!$this->driver->contains($id)) {
            return self::TRIPLET_NOT_FOUND;
        }

        list($expire, $tokens) = $this->driver->fetch($id);
        if (isset($tokens[$persistentToken]) && $tokens[$persistentToken] === $token) {
            return self::TRIPLET_FOUND;
        }

        return self::TRIPLET_INVALID;
    }

    /**
     * Store the new token for the credential and the persistent token.
     * Create a new storage entry, if the combination of credential and
     * persistent token does not exist.
     *
     * @param mixed     $credential
     * @param string    $token
     * @param string    $persistentToken
     * @param int       $expire             Timestamp when this triplet
     *                                      will expire (0 = no expiry)
     */
    public function storeTriplet($credential, $token, $persistentToken, $expire = null)
    {
        // Hash the tokens, because they can contain a salt and can be
        // accessed in the file system
        $persistentToken = sha1(trim($persistentToken));
        $token = sha1(trim($token));

        $e = null;
        $tokens = [];
        $id = $this->getId($credential);
        if ($this->driver->contains($id)) {
            list($e, $tokens) = $this->driver->fetch($id);
        }

        // Get cache lifetime for tokens
        if ($expire === null && $e === null) {
            /** @var Cache $cache */
            $cache = Grav::instance()['cache'];
            $expire = $cache->getLifetime();
        } elseif ($expire === null) {
            $expire = $e;
        }

        // Update tokens
        $tokens[$persistentToken] = $token;
        $this->driver->save($id, [$expire, $tokens], $expire);

        return $this;
    }

    /**
     * Replace current token after successful authentication
     *
     * @param mixed     $credential
     * @param string    $token
     * @param string    $persistentToken
     * @param int       $expire
     */
    public function replaceTriplet($credential, $token, $persistentToken, $expire = null)
    {
        $this->cleanTriplet($credential, $persistentToken);
        $this->storeTriplet($credential, $token, $persistentToken, $expire);
    }

    /**
     * Remove one triplet of the user from the store
     *
     * @param mixed     $credential
     * @param string    $persistentToken
     */
    public function cleanTriplet($credential, $persistentToken)
    {
        // Hash the tokens, because they can contain a salt and can be
        // accessed in the file system
        $persistentToken = sha1(trim($persistentToken));

        // Delete token from storage
        $id = $this->getId($credential);
        if ($this->driver->contains($id)) {
            list($expire, $tokens) = $this->driver->fetch($id);
            unset($tokens[$persistentToken]);
            $this->driver->save($id, [$expire, $tokens], $expire);
        }
    }

    /**
     * Remove all triplets of a user, effectively logging him out on all
     * machines
     *
     * @param  mixed   $credential
     */
    public function cleanAllTriplets($credential)
    {
        $id = $this->getId($credential);
        $this->driver->delete($id);
    }

    /**
     * Helper method to clear RememberMe cache
     */
    public function clearCache()
    {
        $this->driver->flushAll();
    }

    /**
     * Get the cache id
     *
     * @param  string $key A key to compute the cache id for
     * @return string      The cache id
     */
    protected function getId($key)
    {
        /** @var Cache $cache */
        $cache = Grav::instance()['cache'];

        return 'login' . md5(trim($key) . $cache->getKey());
    }
}
