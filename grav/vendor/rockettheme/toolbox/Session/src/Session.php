<?php
namespace RocketTheme\Toolbox\Session;

/**
 * Implements Session handling.
 *
 * @package RocketTheme\Toolbox\Session
 * @author RocketTheme
 * @license MIT
 */
class Session implements \IteratorAggregate
{
    /**
     * @var bool
     */
    protected $started = false;

    /**
     * @var Session
     */
    protected static $instance;


    /**
     * @param int    $lifetime Defaults to 1800 seconds.
     * @param string $path     Cookie path.
     * @param string $domain   Optional, domain for the session
     * @throws \RuntimeException
     */
    public function __construct($lifetime, $path, $domain = null)
    {
        // Session is a singleton.
        if (isset(self::$instance)) {
            throw new \RuntimeException('Session has already been initialized.', 500);
        }

        // Destroy any existing sessions started with session.auto_start
        if ($this->isSessionStarted()) {
            session_unset();
            session_destroy();
        }

        // Disable transparent sid support
        ini_set('session.use_trans_sid', 0);

        // Only allow cookies
        ini_set('session.use_cookies', 1);

        session_name('msF9kJcW');
        session_set_cookie_params($lifetime, $path, $domain);
        register_shutdown_function([$this, 'close']);
        session_cache_limiter('nocache');

        self::$instance = $this;
    }

    /**
     * Get current session instance.
     *
     * @return Session
     * @throws \RuntimeException
     */
    public function instance()
    {
        if (null === self::$instance) {
            throw new \RuntimeException("Session hasn't been initialized.", 500);
        }

        return self::$instance;
    }

    /**
     * Starts the session storage
     *
     * @return $this
     * @throws \RuntimeException
     */
    public function start()
    {
        // Protection against invalid session cookie names throwing exception: http://php.net/manual/en/function.session-id.php#116836
        if (isset($_COOKIE[session_name()]) && !preg_match('/^[-,a-zA-Z0-9]{1,128}$/', $_COOKIE[session_name()])) {
            unset($_COOKIE[session_name()]);
        }

        if (!session_start()) {
            throw new \RuntimeException('Failed to start session.', 500);
        }

        $this->started = true;

        return $this;
    }

    /**
     * Get session ID
     *
     * @return string|null Session ID
     */
    public function getId()
    {
        return session_id();
    }

    /**
     * Set session Id
     *
     * @param string $id Session ID
     *
     * @return $this
     */
    public function setId($id)
    {
        session_id($id);

        return $this;
    }


    /**
     * Get session name
     *
     * @return string|null
     */
    public function getName()
    {
        return session_name();
    }

    /**
     * Set session name
     *
     * @param string $name
     *
     * @return $this
     */
    public function setName($name)
    {
        session_name($name);

        return $this;
    }

    /**
     * Invalidates the current session.
     *
     * @return $this
     */
    public function invalidate()
    {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params['path'], $params['domain'],
            $params['secure'], $params['httponly']
        );

        session_unset();
        session_destroy();

        $this->started = false;

        return $this;
    }

    /**
     * Force the session to be saved and closed
     *
     * @return $this
     */
    public function close()
    {
        if ($this->started) {
            session_write_close();
        }

        $this->started = false;

        return $this;
    }

    /**
     * Checks if an attribute is defined.
     *
     * @param string $name The attribute name
     *
     * @return bool True if the attribute is defined, false otherwise
     */
    public function __isset($name)
    {
        return isset($_SESSION[$name]);
    }

    /**
     * Returns an attribute.
     *
     * @param string $name    The attribute name
     *
     * @return mixed
     */
    public function __get($name)
    {
        return isset($_SESSION[$name]) ? $_SESSION[$name] : null;
    }

    /**
     * Sets an attribute.
     *
     * @param string $name
     * @param mixed  $value
     */
    public function __set($name, $value)
    {
        $_SESSION[$name] = $value;
    }

    /**
     * Removes an attribute.
     *
     * @param string $name
     */
    public function __unset($name)
    {
        unset($_SESSION[$name]);
    }

    /**
     * Returns attributes.
     *
     * @return array Attributes
     */
    public function all()
    {
        return $_SESSION;
    }


    /**
     * Retrieve an external iterator
     *
     * @return \ArrayIterator Return an ArrayIterator of $_SESSION
     */
    public function getIterator()
    {
        return new \ArrayIterator($_SESSION);
    }

    /**
     * Checks if the session was started.
     *
     * @return Boolean
     */
    public function started()
    {
        return $this->started;
    }

    /**
     * http://php.net/manual/en/function.session-status.php#113468
     * Check if session is started nicely.
     * @return bool
     */
    protected function isSessionStarted()
    {
        return php_sapi_name() !== 'cli' ? session_id() !== '' : false;
    }
}
