<?php
namespace RocketTheme\Toolbox\Blueprints;

use RocketTheme\Toolbox\ArrayTraits\Export;
use RocketTheme\Toolbox\ArrayTraits\ExportInterface;
use RocketTheme\Toolbox\ArrayTraits\NestedArrayAccessWithGetters;

/**
 * The Config class contains configuration information.
 *
 * @author RocketTheme
 */
abstract class BlueprintForm implements \ArrayAccess, ExportInterface
{
    use NestedArrayAccessWithGetters, Export;

    /**
     * @var array
     */
    protected $items;

    /**
     * @var string
     */
    protected $filename;

    /**
     * @var string
     */
    protected $context;

    /**
     * @var array
     */
    protected $overrides = [];

    /**
     * @var array
     */
    protected $dynamic = [];

    /**
     * Load file and return its contents.
     *
     * @param string $filename
     * @return string
     */
    abstract protected function loadFile($filename);

    /**
     * Get list of blueprint form files (file and its parents for overrides).
     *
     * @param string|array $path
     * @param string $context
     * @return array
     */
    abstract protected function getFiles($path, $context = null);

    /**
     * Constructor.
     *
     * @param string|array $filename
     * @param array $items
     */
    public function __construct($filename = null, array $items = [])
    {
        $this->nestedSeparator = '/';
        $this->filename = $filename;
        $this->items = $items;
    }

    /**
     * Set filename for the blueprint. Can also be array of files for parent lookup.
     *
     * @param string|array $filename
     * @return $this
     */
    public function setFilename($filename)
    {
        $this->filename = $filename;

        return $this;
    }

    /**
     * Get the filename of the blueprint.
     *
     * @return array|null|string
     */
    public function getFilename()
    {
        return $this->filename;
    }

    /**
     * Set context for import@ and extend@.
     *
     * @param $context
     * @return $this
     */
    public function setContext($context)
    {
        $this->context = $context;

        return $this;
    }

    /**
     * Set custom overrides for import@ and extend@.
     *
     * @param array $overrides
     * @return $this
     */
    public function setOverrides($overrides)
    {
        $this->overrides = $overrides;

        return $this;
    }

    /**
     * Load blueprint.
     *
     * @return $this
     */
    public function load($extends = null)
    {
        // Only load and extend blueprint if it has not yet been loaded.
        if (empty($this->items) && $this->filename) {
            // Get list of files.
            $files = $this->getFiles($this->filename);

            // Load and extend blueprints.
            $data = $this->doLoad($files, $extends);

            $this->items = (array) array_shift($data);

            foreach ($data as $content) {
                $this->extend($content, true);
            }
        }

        // Import blueprints.
        $this->deepInit($this->items);

        return $this;
    }

    /**
     * Initialize blueprints with its dynamic fields.
     *
     * @return $this
     */
    public function init()
    {
        foreach ($this->dynamic as $key => $data) {
            // Locate field.
            $path = explode('/', $key);
            $current = &$this->items;
            foreach ($path as $field) {
                if (is_object($current)) {
                    // Handle objects.
                    if (!isset($current->{$field})) {
                        $current->{$field} = array();
                    }
                    $current = &$current->{$field};
                } else {
                    // Handle arrays and scalars.
                    if (!is_array($current)) {
                        $current = array($field => array());
                    } elseif (!isset($current[$field])) {
                        $current[$field] = array();
                    }
                    $current = &$current[$field];
                }
            }

            // Set dynamic property.
            foreach ($data as $property => $call) {
                $action = 'dynamic' . ucfirst($call['action']);

                if (method_exists($this, $action)) {
                    $this->{$action}($current, $property, $call);
                }
            }
        }

        return $this;
    }


    /**
     * Get form.
     *
     * @return array
     */
    public function form()
    {
        return (array) $this->get('form');
    }

    /**
     * Get form fields.
     *
     * @return array
     */
    public function fields()
    {
        $fields = $this->get('form/fields');
        if ($fields === null) {
            $field = $this->get('form/field');
            $fields = $field !== null ? ['' => (array) $field] : $fields;
        }
        return (array) $fields;
    }

    /**
     * Extend blueprint with another blueprint.
     *
     * @param BlueprintForm|array $extends
     * @param bool $append
     * @return $this
     */
    public function extend($extends, $append = false)
    {
        if ($extends instanceof BlueprintForm) {
            $extends = $extends->toArray();
        }

        if ($append) {
            $a = $this->items;
            $b = $extends;
        } else {
            $a = $extends;
            $b = $this->items;
        }

        $this->items = $this->deepMerge($a, $b);

        return $this;
    }

    /**
     * @param string $name
     * @param mixed $value
     * @param string $separator
     * @param bool $append
     * @return $this
     */
    public function embed($name, $value, $separator = '/', $append = false)
    {
        $oldValue = $this->get($name, null, $separator);

        if (is_array($oldValue) && is_array($value)) {
            if ($append) {
                $a = $oldValue;
                $b = $value;
            } else {
                $a = $value;
                $b = $oldValue;
            }

            $value = $this->deepMerge($a, $b);
        }

        $this->set($name, $value, $separator);

        return $this;
    }

    /**
     * Get blueprints by using slash notation for nested arrays/objects.
     *
     * @example $value = $this->resolve('this/is/my/nested/variable');
     * returns ['this/is/my', 'nested/variable']
     *
     * @param array  $path
     * @param string  $separator
     * @return array
     */
    public function resolve(array $path, $separator = '/')
    {
        $fields = false;
        $parts = [];
        $current = $this['form/fields'];
        $result = [null, null, null];

        while (($field = current($path)) !== null) {
            if (!$fields && isset($current['fields'])) {
                if (!empty($current['array'])) {
                    $result = [$current, $parts, $path ? implode($separator, $path) : null];
                    // Skip item offset.
                    $parts[] = array_shift($path);
                }

                $current = $current['fields'];
                $fields = true;

            } elseif (isset($current[$field])) {
                $parts[] = array_shift($path);
                $current = $current[$field];
                $fields = false;

            } elseif (isset($current[$index = '.' . $field])) {
                $parts[] = array_shift($path);
                $current = $current[$index];
                $fields = false;

            } else {
                break;
            }
        }

        return $result;
    }

    /**
     * Deep merge two arrays together.
     *
     * @param array $a
     * @param array $b
     * @return array
     */
    protected function deepMerge(array $a, array $b)
    {
        $bref_stack = array(&$a);
        $head_stack = array($b);

        do {
            end($bref_stack);
            $bref = &$bref_stack[key($bref_stack)];
            $head = array_pop($head_stack);
            unset($bref_stack[key($bref_stack)]);

            foreach ($head as $key => $value) {
                if (strpos($key, '@') !== false) {
                    // Remove @ from the start and the end. Key syntax `import@2` is supported to allow multiple operations of the same type.
                    $list = explode('-', preg_replace('/^(@*)?([^@]+)(@\d*)?$/', '\2', $key), 2);
                    $action = array_shift($list);
                    $property = array_shift($list);

                    switch ($action) {
                        case 'unset':
                        case 'replace':
                            if (!$property) {
                                $bref = ['unset@' => true];
                            } else {
                                unset($bref[$property]);
                            }
                            continue 2;
                    }
                }
                if (isset($key, $bref[$key]) && is_array($bref[$key]) && is_array($head[$key])) {
                    $bref_stack[] = &$bref[$key];
                    $head_stack[] = $head[$key];
                } else {
                    $bref = array_merge($bref, [$key => $head[$key]]);
                }
            }
        } while (count($head_stack));

        return $a;
    }

    /**
     * @param array $items
     * @param array $path
     * @return string
     */
    protected function deepInit(array &$items, $path = [])
    {
        $ordering = '';
        $order = [];
        $field = end($path) === 'fields';

        foreach ($items as $key => &$item) {
            // Set name for nested field.
            if ($field && isset($item['type'])) {
                $item['name'] = $key;
            }
            // Handle special instructions in the form.
            if (strpos($key, '@') !== false) {
                // Remove @ from the start and the end. Key syntax `import@2` is supported to allow multiple operations of the same type.
                $list = explode('-', preg_replace('/^(@*)?([^@]+)(@\d*)?$/', '\2', $key), 2);
                $action = array_shift($list);
                $property = array_shift($list);

                switch ($action) {
                    case 'unset':
                        unset($items[$key]);
                        if (empty($items)) {
                            return null;
                        }
                        break;
                    case 'import':
                        unset($items[$key]);
                        $this->doImport($item, $path);
                        break;
                    case 'ordering':
                        $ordering = $item;
                        unset($items[$key]);
                        break;
                    default:
                        $this->dynamic[implode('/', $path)][$property] = ['action' => $action, 'params' => $item];
                }

            } elseif (is_array($item)) {
                // Recursively initialize form.
                $newPath = array_merge($path, [$key]);

                $location = $this->deepInit($item, $newPath);
                if ($location) {
                    $order[$key] = $location;
                } elseif ($location === null) {
                    unset($items[$key]);
                }
            }
        }
        unset($item);

        if ($order) {
            // Reorder fields if needed.
            $items = $this->doReorder($items, $order);
        }

        return $ordering;
    }

    /**
     * @param array|string $value
     * @return array|null
     */
    protected function loadImport($value)
    {
        $type = !is_string($value) ? (!isset($value['type']) ? null : $value['type']) : $value;
        $field = 'form';
        if ($type && strpos($type, ':') !== false) {
            list ($type, $field) = explode(':', $type, 2);
        }

        if (!$type && !$field) {
            return null;
        }

        if ($type) {
            $files = $this->getFiles($type, isset($value['context']) ? $value['context'] : null);

            if (!$files) {
                return null;
            }

            /** @var BlueprintForm $blueprint */
            $blueprint = new static($files);
            $blueprint->setContext($this->context)->setOverrides($this->overrides)->load();
        } else {
            $blueprint = $this;
        }

        $import = $blueprint->get($field);

        return is_array($import) ? $import : null;
    }

    /**
     * @param array|string $value
     * @param array $path
     */
    protected function doImport($value, array &$path)
    {
        $imported = $this->loadImport($value);

        if ($imported) {
            $this->deepInit($imported, $path);
            $name = implode('/', $path);
            $this->embed($name, $imported, '/', false);
        }
    }

    /**
     * Internal function that handles loading extended blueprints.
     *
     * @param array $files
     * @param string|array|null $extends
     * @return array
     */
    protected function doLoad(array $files, $extends = null)
    {
        $filename = array_shift($files);
        $content = $this->loadFile($filename);

        $key = null;
        if (isset($content['extends@'])) {
            $key = 'extends@';
        } elseif (isset($content['@extends'])) {
            $key = '@extends';
        } elseif (isset($content['@extends@'])) {
            $key = '@extends@';
        }

        $override = (bool)$extends;
        $extends = (array)($key && !$extends ? $content[$key] : $extends);

        unset($content['extends@'], $content['@extends'], $content['@extends@']);

        $data = $extends ? $this->doExtend($filename, $files, $extends, $override) : [];
        $data[] = $content;

        return $data;
    }

    /**
     * Internal function to recursively load extended blueprints.
     *
     * @param string $filename
     * @param array $parents
     * @param array $extends
     * @return array
     */
    protected function doExtend($filename, array $parents, array $extends, $override = false)
    {
        if (is_string(key($extends))) {
            $extends = [$extends];
        }

        $data = [[]];
        foreach ($extends as $value) {
            // Accept array of type and context or a string.
            $type = !is_string($value) ? (!isset($value['type']) ? null : $value['type']) : $value;

            if (!$type) {
                continue;
            }

            if ($type === '@parent' || $type === 'parent@') {
                if (!$parents) {
                    throw new \RuntimeException("Parent blueprint missing for '{$filename}'");
                }

                $files = $parents;
            } else {
                $files = $this->getFiles($type, isset($value['context']) ? $value['context'] : null);

                if ($override && !$files) {
                    throw new \RuntimeException("Blueprint '{$type}' missing for '{$filename}'");
                }

                // Detect extend loops.
                if ($files && array_intersect($files, $parents)) {
                    // Let's check if user really meant extends@: parent@.
                    $index = array_search($filename, $files);
                    if ($index !== false) {
                        // We want to grab only the parents of the file which is currently being loaded.
                        $files = array_slice($files, $index + 1);
                    }
                    if ($files !== $parents) {
                        throw new \RuntimeException("Loop detected while extending blueprint file '{$filename}'");
                    }
                    if (!$parents) {
                        throw new \RuntimeException("Parent blueprint missing for '{$filename}'");
                    }
                }
            }

            if ($files) {
                $data[] = $this->doLoad($files);
            }
        }

        // TODO: In PHP 5.6+ use array_merge(...$data);
        return call_user_func_array('array_merge', $data);
    }

    /**
     * Internal function to reorder items.
     *
     * @param array $items
     * @param array $keys
     * @return array
     */
    protected function doReorder(array $items, array $keys)
    {
        $reordered = array_keys($items);

        foreach ($keys as $item => $ordering) {
            if ((string)(int) $ordering === (string) $ordering) {
                $location = array_search($item, $reordered, true);
                $rel = array_splice($reordered, $location, 1);
                array_splice($reordered, $ordering, 0, $rel);

            } elseif (isset($items[$ordering])) {
                $location = array_search($item, $reordered, true);
                $rel = array_splice($reordered, $location, 1);
                $location = array_search($ordering, $reordered, true);
                array_splice($reordered, $location + 1, 0, $rel);
            }
        }

        return array_merge(array_flip($reordered), $items);
    }
}
