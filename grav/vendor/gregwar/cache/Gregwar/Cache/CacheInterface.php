<?php namespace Gregwar\Cache;

interface CacheInterface {

    /**
     * Sets the cache directory
     *
     * @param string $cacheDirectory the cache directory
     * @return self
     */
    public function setCacheDirectory($cacheDirectory);

    /**
     * Gets the cache directory
     *
     * @return string the cache directory
     */
    public function getCacheDirectory();

    /**
     * Sets the actual cache directory
     *
     * @param string $actualCacheDirectory the actual cache directory
     * @return self
     */
    public function setActualCacheDirectory($actualCacheDirectory = null);

    /**
     * Returns the actual cache directory
     */
    public function getActualCacheDirectory();

    /**
     * Change the prefix size
     *
     * @param int $prefixSize the size of the prefix directories
     * @return self
     */
    public function setPrefixSize($prefixSize);

    /**
     * Change the directory mode
     *
     * @param int $directoryMode the directory mode to use
     * @return self
     */
    public function setDirectoryMode($directoryMode);

    /**
     * Gets the cache file name
     *
     * @param string $filename the name of the cache file
     * @param bool $actual get the actual file or the public file
     * @param bool $mkdir a boolean to enable/disable the construction of the
     *        cache file directory
     * @return string
     */
    public function getCacheFile($filename, $actual = false, $mkdir = false);

    /**
     * Checks if the target filename exists in the cache and if the conditions
     * are respected
     *
     * @param string $filename the filename
     * @param array $conditions the conditions to respect
     * @return bool
     */
    public function exists($filename, array $conditions = array());

    /**
     * Alias for exists
     *
     * @param string $filename the filename
     * @param array $conditions the conditions to respect
     * @return bool
     */
    public function check($filename, array $conditions = array());

    /**
     * Write data in the cache
     *
     * @param string $filename the name of the cache file
     * @param string $contents the contents to store
     * @return self
     */
    public function set($filename, $contents = '');

    /**
     * Alias for set()
     *
     * @param string $filename the name of the cache file
     * @param string $contents the contents to store
     * @return self
     */
    public function write($filename, $contents = '');

    /**
     * Get data from the cache
     *
     * @param string $filename the cache file name
     * @param array $conditions
     * @return null|string
     */
    public function get($filename, array $conditions = array());

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
    public function getOrCreate($filename, array $conditions = array(), $function, $file = false, $actual = false);

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
    public function getOrCreateFile($filename, array $conditions = array(), $function, $actual = false);

}