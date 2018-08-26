<?php
/**
 * @package    Grav\Plugin\Login
 *
 * @copyright  Copyright (C) 2014 - 2017 RocketTheme, LLC. All rights reserved.
 * @license    MIT License; see LICENSE file for details.
 */
namespace Grav\Plugin\Login;

/**
 * Class RateLimiter
 * @package Grav\Plugin\Login\RateLimiter
 */
class RateLimiter
{
    /** @var LoginCache */
    protected $cache;

    /** @var int */
    protected $maxCount;

    /** @var int */
    protected $interval;

    /**
     * RateLimiter constructor.
     * @param string $context
     * @param int $maxCount
     * @param int|null $interval
     */
    public function __construct($context, $maxCount, $interval)
    {
        $this->cache = new LoginCache($context, (int)$interval * 60);
        $this->maxCount = (int) $maxCount;
        $this->interval = (int) $interval;
    }

    /**
     * @return int
     */
    public function getInterval()
    {
        return $this->interval;
    }

    /**
     * Check if user has hit rate limiter. Remember to use registerRateLimitedAction() before doing the check.
     *
     * @param string $key
     * @param string $type
     * @return bool
     */
    public function isRateLimited($key, $type = 'username')
    {
        if (!$key || !$this->interval) {
            return false;
        }

        return $this->maxCount && count($this->getAttempts($key, $type)) > $this->maxCount;
    }

    /**
     *
     *
     * @param string $key
     * @param string $type
     * @return array
     */
    public function getAttempts($key, $type = 'username')
    {
        return (array) $this->cache->get($type . $key, []);
    }

    /**
     * Register rate limited action.
     *
     * @param string $key
     * @param string $type
     * @return $this
     */
    public function registerRateLimitedAction($key, $type = 'username')
    {
        if ($key && $this->interval) {
            $tries = (array)$this->cache->get($type . $key, []);
            $tries[] = time();

            $this->cache->set($type . $key, $tries);
        }

        return $this;
    }

    /**
     * Reset the user rate limit counter.
     *
     * @param string $key
     * @param string $type
     * @return $this
     */
    public function resetRateLimit($key, $type = 'username')
    {
        if ($key) {
            $this->cache->delete($type . $key);
        }

        return $this;
    }
}
