<?php
namespace RocketTheme\Toolbox\StreamWrapper;

use RocketTheme\Toolbox\ResourceLocator\ResourceLocatorInterface;

/**
 * Implements Read Only Streams.
 *
 * @package RocketTheme\Toolbox\StreamWrapper
 * @author RocketTheme
 * @license MIT
 */
class ReadOnlyStream extends Stream implements StreamInterface
{
    /**
     * @var ResourceLocatorInterface
     */
    protected static $locator;

    public function stream_open($uri, $mode, $options, &$opened_url)
    {
        if (!in_array($mode, ['r', 'rb', 'rt'])) {
            if ($options & STREAM_REPORT_ERRORS) {
                trigger_error(sprintf('stream_open() write modes not supported for %s', $uri), E_USER_WARNING);
            }

            return false;
        }

        $path = $this->getPath($uri);

        if (!$path) {
            if ($options & STREAM_REPORT_ERRORS) {
                trigger_error(sprintf('stream_open(): path for %s does not exist', $uri), E_USER_WARNING);
            }

            return false;
        }

        $this->uri = $uri;
        $this->handle = ($options & STREAM_REPORT_ERRORS) ? fopen($path, $mode) : @fopen($path, $mode);

        return (bool) $this->handle;
    }

    public function stream_lock($operation)
    {
        // Disallow exclusive lock or non-blocking lock requests
        if (!in_array($operation, [LOCK_SH, LOCK_UN, LOCK_SH | LOCK_NB], true)) {
            trigger_error(
                sprintf('stream_lock() exclusive lock operations not supported for %s', $this->uri),
                E_USER_WARNING
            );

            return false;
        }

        return flock($this->handle, $operation);
    }

    public function stream_metadata($uri, $option, $value)
    {
        if ($option !== STREAM_META_TOUCH) {
            throw new \BadMethodCallException(sprintf('stream_metadata() not supported for %s', $uri));
        }

        return parent::stream_metadata($uri, $option, $value);
    }

    public function stream_write($data)
    {
        throw new \BadMethodCallException(sprintf('stream_write() not supported for %s', $this->uri));
    }

    public function unlink($uri)
    {
        throw new \BadMethodCallException(sprintf('unlink() not supported for %s', $uri));
    }

    public function rename($from_uri, $to_uri)
    {
        throw new \BadMethodCallException(sprintf('rename() not supported for %s', $from_uri));
    }

    public function mkdir($uri, $mode, $options)
    {
        throw new \BadMethodCallException(sprintf('mkdir() not supported for %s', $uri));
    }

    public function rmdir($uri, $options)
    {
        throw new \BadMethodCallException(sprintf('rmdir() not supported for %s', $uri));
    }
}
