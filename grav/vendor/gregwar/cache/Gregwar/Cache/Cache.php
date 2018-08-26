<?php

namespace Gregwar\Cache;

/**
 * A cache system based on files
 *
 * @author Gregwar <g.passault@gmail.com>
 */
class Cache implements CacheInterface
{
    /**
     * Cache directory
     */
    protected $cacheDirectory;

    /**
     * Use a different directory as actual cache
     * @var string
     */
    protected $actualCacheDirectory = null;

    /**
     * Prefix directories size
     *
     * For instance, if the file is helloworld.txt and the prefix size is
     * 5, the cache file will be: h/e/l/l/o/helloworld.txt
     *
     * This is useful to avoid reaching a too large number of files into the
     * cache system directories
     * @var int
     */
    protected $prefixSize = 5;

    /**
     * Directory mode
     *
     * Allows setting of the access mode for the directories created.
     * @var int
     */
    protected $directoryMode = 0755;

    /**
     * Constructs the cache system
     *
     * @param string $cacheDirectory the cache directory
     */
    public function __construct($cacheDirectory = 'cache')
    {
        $this->cacheDirectory = $cacheDirectory;
    }

    /**
     * Sets the cache directory
     *
     * @param string $cacheDirectory the cache directory
     * @return self
     */
    public function setCacheDirectory($cacheDirectory)
    {
        $this->cacheDirectory = $cacheDirectory;

        return $this;
    }

    /**
     * Gets the cache directory
     *
     * @return string the cache directory
     */
    public function getCacheDirectory()
    {
        return $this->cacheDirectory;
    }

    /**
     * Sets the actual cache directory
     *
     * @param string $actualCacheDirectory the actual cache directory
     * @return self
     */
    public function setActualCacheDirectory($actualCacheDirectory = null)
    {
        $this->actualCacheDirectory = $actualCacheDirectory;

        return $this;
    }

    /**
     * Returns the actual cache directory
     */
    public function getActualCacheDirectory()
    {
        return $this->actualCacheDirectory ?: $this->cacheDirectory;
    }

    /**
     * Change the prefix size
     *
     * @param int $prefixSize the size of the prefix directories
     * @return self
     */
    public function setPrefixSize($prefixSize)
    {
        $this->prefixSize = $prefixSize;

        return $this;
    }

    /**
     * Change the directory mode
     *
     * @param int $directoryMode the directory mode to use
     * @return self
     */
    public function setDirectoryMode($directoryMode)
    {
        if (!$directoryMode) {
            $directoryMode = 0755;
        }
        $this->directoryMode = $directoryMode;

        return $this;
    }

    /**
     * Creates a directory
     *
     * @param string $directory the target directory
     */
    protected function mkdir($directory)
    {
        if (!is_dir($directory)) {
            @mkdir($directory, $this->directoryMode, true);
        }
    }

    /**
     * Gets the cache file name
     *
     * @param string $filename the name of the cache file
     * @param bool $actual get the actual file or the public file
     * @param bool $mkdir a boolean to enable/disable the construction of the
     *        cache file directory
     * @return string
     */
    public function getCacheFile($filename, $actual = false, $mkdir = false)
    {
        $path = array();

        // Getting the length of the filename before the extension
        $parts = explode('.', $filename);
        $len = strlen($parts[0]);

        for ($i=0; $i<min($len, $this->prefixSize); $i++) {
            $path[] = $filename[$i];

        }
        $path = implode('/', $path);

        if ($mkdir) {
            $actualDir = $this->getActualCacheDirectory() . '/' . $path;
            $this->mkdir($actualDir);
        }

        $path .= '/' . $filename;

        if ($actual) {
            return $this->getActualCacheDirectory() . '/' . $path;
        } else {
            return $this->getCacheDirectory() . '/' . $path;
        }
    }

    /**
     * Checks that the cache conditions are respected
     *
     * @param string $cacheFile the cache file
     * @param array $conditions an array of conditions to check
     * @return bool
     * @throws \Exception
     */
    protected function checkConditions($cacheFile, array $conditions = array())
    {
        // Implicit condition: the cache file should exist
        if (!file_exists($cacheFile)) {
            return false;
        }

        foreach ($conditions as $type => $value) {
            switch ($type) {
            case 'maxage':
            case 'max-age':
                // Return false if the file is older than $value
                $age = time() - filemtime($cacheFile);
                if ($age > $value) {
                    return false;
                }
                break;
            case 'younger-than':
            case 'youngerthan':
                // Return false if the file is older than the file $value, or the files $value
                $check = function($filename) use ($cacheFile) {
                    return !file_exists($filename) || filemtime($cacheFile) < filemtime($filename);
                };

                if (!is_array($value)) {
                    if (!$this->isRemote($value) && $check($value)) {
                        return false;
                    }
                } else {
                    foreach ($value as $file) {
                        if (!$this->isRemote($file) && $check($file)) {
                            return false;
                        }
                    }
                }
                break;
            default:
                throw new \Exception('Cache condition '.$type.' not supported');
            }
        }

        return true;
    }

    /**
     * Checks if the target filename exists in the cache and if the conditions
     * are respected
     *
     * @param string $filename the filename
     * @param array $conditions the conditions to respect
     * @return bool
     */
    public function exists($filename, array $conditions = array())
    {
        $cacheFile = $this->getCacheFile($filename, true);

        return $this->checkConditions($cacheFile, $conditions);
    }

    /**
     * Alias for exists
     *
     * @param string $filename the filename
     * @param array $conditions the conditions to respect
     * @return bool
     */
    public function check($filename, array $conditions = array())
    {
        return $this->exists($filename, $conditions);
    }

    /**
     * Write data in the cache
     *
     * @param string $filename the name of the cache file
     * @param string $contents the contents to store
     * @return self
     */
    public function set($filename, $contents = '')
    {
        $cacheFile = $this->getCacheFile($filename, true, true);

        file_put_contents($cacheFile, $contents, \LOCK_EX);

        return $this;
    }

    /**
     * Alias for set()
     *
     * @param string $filename the name of the cache file
     * @param string $contents the contents to store
     * @return self
     */
    public function write($filename, $contents = '')
    {
        return $this->set($filename, $contents);
    }

    /**
     * Get data from the cache
     *
     * @param string $filename the cache file name
     * @param array $conditions
     * @return null|string
     */
    public function get($filename, array $conditions = array())
    {
        if ($this->exists($filename, $conditions)) {
            return file_get_contents($this->getCacheFile($filename, true));
        } else {
            return null;
        }
    }

    /**
     * Is this URL remote?
     *
     * @param string $file
     * @return bool
     */
    protected function isRemote($file)
    {
        if (preg_match('/^([a-z]+):\/\//', $file, $match)) {
            return ($match[1] != 'file');
        }

        return false;
    }

    /**
     * Get or create the cache entry
     *
     * @param string $filename the cache file name
     * @param array $conditions an array of conditions about expiration
     * @param \Closure $function the closure to call if the file does not exist
     * @param bool $file returns the cache file or the file contents
     * @param bool $actual returns the actual cache file
     * @return string
     * @throws \InvalidArgumentException
     */
    public function getOrCreate($filename, array $conditions = array(), $function, $file = false, $actual = false)
    {
        if (!is_callable($function)) {
            throw new \InvalidArgumentException('The argument $function should be callable');
        }

        $cacheFile = $this->getCacheFile($filename, true, true);
        $data = null;

        if (!$this->check($filename, $conditions)) {
            if(file_exists($cacheFile)) {
                unlink($cacheFile);
            }

            $data = call_user_func($function, $cacheFile);

            // Test if the closure wrote the file or if it returned the data
            if (!file_exists($cacheFile)) {
                $this->set($filename, $data);
            } else {
                $data = file_get_contents($cacheFile);
            }
        }

        return $file ? $this->getCacheFile($filename, $actual) : file_get_contents($cacheFile);
    }

    /**
     * Alias to getOrCreate with $file = true
     *
     * @param string $filename the cache file name
     * @param array $conditions an array of conditions about expiration
     * @param \Closure $function the closure to call if the file does not exist
     * @param bool $actual returns the actual cache file
     * @return string
     * @throws \InvalidArgumentException
     */
    public function getOrCreateFile($filename, array $conditions = array(), $function, $actual = false)
    {
        return $this->getOrCreate($filename, $conditions, $function, true, $actual);
    }
}
