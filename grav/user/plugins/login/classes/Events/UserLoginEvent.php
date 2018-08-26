<?php
/**
 * @package    Grav\Plugin\Login
 *
 * @copyright  Copyright (C) 2014 - 2017 RocketTheme, LLC. All rights reserved.
 * @license    MIT License; see LICENSE file for details.
 */
namespace Grav\Plugin\Login\Events;

use Grav\Common\Grav;
use Grav\Common\Session;
use Grav\Common\User\User;
use RocketTheme\Toolbox\Event\Event;

/**
 * Class UserLoginEvent
 * @package Grav\Common\User\Events
 *
 * @property int                $status
 * @property array              $credentials
 * @property string|string[]    $authorize
 * @property array              $options
 * @property Session            $session
 * @property User               $user
 * @property string             $message
 *
 */
class UserLoginEvent extends Event
{
    /**
     * Undefined event state.
     */
    const AUTHENTICATION_UNDEFINED = 0;

    /**
     * onUserAuthenticate success.
     */
    const AUTHENTICATION_SUCCESS = 1;

    /**
     * onUserAuthenticate fails on bad username/password.
     */
    const AUTHENTICATION_FAILURE = 2;

    /**
     * onUserAuthenticate fails on auth cancellation.
     */
    const AUTHENTICATION_CANCELLED = 4;

    /**
     * onUserAuthorizeLogin fails on expired account.
     */
    const AUTHORIZATION_EXPIRED = 8;

    /**
     * onUserAuthorizeLogin is delayed until user has performed extra action(s).
     */
    const AUTHORIZATION_DELAYED = 16;

    /**
     * onUserAuthorizeLogin fails for other reasons.
     */
    const AUTHORIZATION_DENIED = 32;

    /**
     * UserLoginEvent constructor.
     * @param array $items
     */
    public function __construct(array $items = [])
    {
        $items += [
            'credentials' => [],
            'options' => [],
            'authorize' => 'site.login',
            'status' => static::AUTHENTICATION_UNDEFINED,
            'session' => null,
            'user' => null,
            'message' => null,
            'redirect' => null,
            'redirect_code' => 303
        ];
        $items['credentials'] += ['username' => '', 'password' => ''];

        parent::__construct($items);

        if (!$this->offsetExists('session') && isset(Grav::instance()['session'])) {
            $this->offsetSet('session', Grav::instance()['session']);
        }
        if (!$this->offsetExists('user')) {
            $this->offsetSet('user', User::load($this['credentials']['username']));
        }
    }

    public function isSuccess()
    {
        $status = $this->offsetGet('status');
        $failure = static::AUTHENTICATION_FAILURE | static::AUTHENTICATION_CANCELLED | static::AUTHORIZATION_EXPIRED
            | static::AUTHORIZATION_DENIED;

        return ($status & static::AUTHENTICATION_SUCCESS) && !($status & $failure);
    }

    public function isDelayed()
    {
        return $this->isSuccess() && ($this->offsetGet('status') & static::AUTHORIZATION_DELAYED);
    }

    /**
     * @return int
     */
    public function getStatus()
    {
        return (int)$this->offsetGet('status');
    }

    /**
     * @param int $status
     * @return $this
     */
    public function setStatus($status)
    {
        $this->offsetSet('status', $this->offsetGet('status') | (int)$status);

        return $this;
    }

    /**
     * @return array
     */
    public function getCredentials()
    {
        return $this->offsetGet('credentials') + ['username' => '', 'password' => ''];
    }

    /**
     * @param string $name
     * @return mixed
     */
    public function getCredential($name)
    {
        return isset($this->items['credentials'][$name]) ? $this->items['credentials'][$name] : null;
    }

    /**
     * @param string $name
     * @param mixed $value
     * @return $this
     */
    public function setCredential($name, $value)
    {
        $this->items['credentials'][$name] = $value;

        return $this;
    }

    /**
     * @return array
     */
    public function getOptions()
    {
        return $this->offsetGet('options');
    }

    /**
     * @param string $name
     * @return mixed
     */
    public function getOption($name)
    {
        return isset($this->items['options'][$name]) ? $this->items['options'][$name] : null;
    }

    /**
     * @param string $name
     * @param mixed $value
     * @return $this
     */
    public function setOption($name, $value)
    {
        $this->items['options'][$name] = $value;

        return $this;
    }

    /**
     * @return Session|null
     */
    public function getSession()
    {
        return $this->offsetGet('session');
    }

    /**
     * @return User
     */
    public function getUser()
    {
        return $this->offsetGet('user');
    }

    /**
     * @param User $user
     * @return $this
     */
    public function setUser(User $user)
    {
        $this->offsetSet('user', $user);

        return $this;
    }

    /**
     * @return array
     */
    public function getAuthorize()
    {
        return (array)$this->offsetGet('authorize');
    }

    /**
     * @return string|null
     */
    public function getMessage()
    {
        return !empty($this->items['message'][0]) ? (string)$this->items['message'][0] : null;
    }

    /**
     * @return string|null
     */
    public function getMessageType()
    {
        return !empty($this->items['message'][1]) ? (string)$this->items['message'][1] : 'info';
    }

    /**
     * @param string $message
     * @param string|null $type
     * @return $this
     */
    public function setMessage($message, $type = null)
    {
        $this->items['message'] = $message ? [$message, $type] : null;

        return $this;
    }

    /**
     * @param string $message
     * @param string|null $type
     * @return $this
     */
    public function defMessage($message, $type = null)
    {
        if ($message && !isset($this->items['message'])) {
            $this->setMessage($message, $type);
        }

        return $this;
    }

    /**
     * @return string|null
     */
    public function getRedirect()
    {
        return !empty($this->items['redirect']) ? (string)$this->items['redirect'] : null;
    }

    /**
     * @return string|null
     */
    public function getRedirectCode()
    {
        return !empty($this->items['redirect_code']) ? (string)$this->items['redirect_code'] : 303;
    }

    /**
     * @param string $path
     * @param int $code
     * @return $this
     */
    public function setRedirect($path, $code = 303)
    {
        $this->items['redirect'] = $path ?: null;
        $this->items['redirect_code'] = (int)$code;

        return $this;
    }

    /**
     * @param string $path
     * @param int $code
     * @return $this
     */
    public function defRedirect($path, $code = 303)
    {
        if ($path && !isset($this->items['redirect'])) {
            $this->setRedirect($path, $code);
        }

        return $this;
    }

    /**
     * Magic setter method
     *
     * @param mixed $offset Asset name value
     * @param mixed $value  Asset value
     */
    public function __set($offset, $value)
    {
        $this->offsetSet($offset, $value);
    }

    /**
     * Magic getter method
     *
     * @param  mixed $offset Asset name value
     * @return mixed         Asset value
     */
    public function __get($offset)
    {
        return $this->offsetGet($offset);
    }

    /**
     * Magic method to determine if the attribute is set
     *
     * @param  mixed   $offset Asset name value
     * @return boolean         True if the value is set
     */
    public function __isset($offset)
    {
        return $this->offsetExists($offset);
    }

    /**
     * Magic method to unset the attribute
     *
     * @param mixed $offset The name value to unset
     */
    public function __unset($offset)
    {
        $this->offsetUnset($offset);
    }
}
