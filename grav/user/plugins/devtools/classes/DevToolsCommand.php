<?php
namespace Grav\Plugin\Console;

use Grav\Common\Grav;
use Grav\Common\Data;
use Grav\Common\Theme;
use Grav\Common\Filesystem\Folder;
use Grav\Common\GPM\GPM;
use Grav\Common\Inflector;
use Grav\Common\Twig\Twig;
use Grav\Common\Utils;
use RocketTheme\Toolbox\File\File;
use Grav\Console\ConsoleCommand;

/**
 * Class DevToolsCommand
 * @package Grav\Console\Cli\
 */
class DevToolsCommand extends ConsoleCommand
{

    /**
     * @var array
     */
    protected $component = [];

    /**
     * @var Inflector
     */
    protected $inflector;

    /**
     * @var Locator
     */
    protected $locator;

    /**
     * @var Twig
     */
    protected $twig;

    protected $data;

    /**
     * @var gpm
     */
    protected $gpm;

    /**
     * @var array
     */
    protected $reserved_keywords = array('__halt_compiler', 'abstract', 'and', 'array', 'as', 'break', 'callable', 'case', 'catch', 'class', 'clone', 'const', 'continue', 'declare', 'default', 'die', 'do', 'echo', 'else', 'elseif', 'empty', 'enddeclare', 'endfor', 'endforeach', 'endif', 'endswitch', 'endwhile', 'eval', 'exit', 'extends', 'final', 'for', 'foreach', 'function', 'global', 'goto', 'if', 'implements', 'include', 'include_once', 'instanceof', 'insteadof', 'interface', 'isset', 'list', 'namespace', 'new', 'or', 'print', 'private', 'protected', 'public', 'require', 'require_once', 'return', 'static', 'switch', 'throw', 'trait', 'try', 'unset', 'use', 'var', 'while', 'xor');


    /**
     * Initializes the basic requirements for the developer tools
     */
    protected function init()
    {
        if (!function_exists('curl_version')) {
            exit('FATAL: DEVTOOLS requires PHP Curl module to be installed');
        }

        $grav = Grav::instance();
        $grav['config']->init();
        $grav['uri']->init();

        $this->inflector    = $grav['inflector'];
        $this->locator      = $grav['locator'];
        $this->twig         = $grav['twig'];
        $this->gpm          = new GPM();

        //Add `theme://` to prevent fail
        $this->locator->addPath('theme', '', []);
        $this->locator->addPath('plugin', '', []);
        $this->locator->addPath('blueprint', '', []);
        // $this->config->set('theme', $config->get('themes.' . $name));
        
        
    }

    /**
     * Copies the component type and renames accordingly
     */
    protected function createComponent()
    {
        $name = $this->component['name'];
        $folder_name = strtolower($this->inflector->hyphenize($name));
        $new_theme = $folder_name;
        $type = $this->component['type'];
        $grav = Grav::instance();
        $config = $grav['config'];
        $current_theme = $config->get('system.pages.theme');
        $template = $this->component['template'];
        $source_theme = null;

        if (isset($this->component['copy'])) {
            $current_theme = $this->component['copy'];
            $source_theme = $this->locator->findResource('themes://' . $current_theme);
            $template_folder = $source_theme;
        } else {
            $template_folder = __DIR__ . '/../components/' . $type . DS . $template;
        }

        if ($type == 'blueprint') {
            $component_folder = $this->locator->findResource('themes://' . $current_theme) . '/blueprints';
        } else {
            $component_folder = $this->locator->findResource($type . 's://') . DS . $folder_name;
        }



        if (isset($source_theme)) {
            /**
             * Copy existing theme and regex-replace old stuff with new
             */

            // Get source if a symlink
            if (is_link($template_folder)) {
                $template_folder = readlink($template_folder);
            }

            //Copy All files to component folder
            try {
                Folder::copy($template_folder, $component_folder, '/.git|node_modules/');
            } catch (\Exception $e) {
                $this->output->writeln("<red>" . $e->getMessage() . "</red>");
                return false;
            }

            // Do some filename renaming
            $base_old_filename = $component_folder . '/' . $current_theme;
            $base_new_filename = $component_folder . '/' . $new_theme;
            @rename( $base_old_filename . '.php', $base_new_filename . '.php');
            @rename( $base_old_filename . '.yaml', $base_new_filename . '.yaml');

            $regex_array = [
                $new_theme . '.php' => [
                    ['/class ' . $this->inflector->camelize($current_theme) . ' extends/i'],
                    ['class ' . $this->inflector->camelize($name) . ' extends']
                ],
                'blueprints.yaml' => [
                     ['/'.$this->inflector->camelize($current_theme).'/', '/'.$this->inflector->hyphenize($current_theme).'/', '/'.$this->inflector->titleize($current_theme).'/', '/'.$this->inflector->underscorize($current_theme).'/'],
                     [$this->inflector->camelize($name), $this->inflector->hyphenize($name),$this->inflector->titleize($name), $this->inflector->underscorize($name)]
                ],
                'README.md' => [
                     ['/'.$this->inflector->camelize($current_theme).'/', '/'.$this->inflector->hyphenize($current_theme).'/', '/'.$this->inflector->titleize($current_theme).'/', '/'.$this->inflector->underscorize($current_theme).'/'],
                     [$this->inflector->camelize($name), $this->inflector->hyphenize($name),$this->inflector->titleize($name), $this->inflector->underscorize($name)]
                ]

            ];

            foreach ($regex_array as $filename => $data) {
                $filename = $component_folder . '/' . $filename;
                if (!file_exists($filename)) {
                    continue;
                }
                $file = file_get_contents($filename);
                if ($file) {
                    $file = preg_replace($data[0], $data[1], $file);
                }
                file_put_contents($filename, $file);
            }

            echo $source_theme;

        } else {
            /**
             * Use components folder and twig processing
             */
            //Copy All files to component folder
            try {
                Folder::copy($template_folder, $component_folder);
            } catch (\Exception $e) {
                $this->output->writeln("<red>" . $e->getMessage() . "</red>");
                return false;
            }

            //Add Twig vars and templates then initialize
            $this->twig->twig_vars['component'] = $this->component;
            $this->twig->twig_paths[] = $template_folder;
            $this->twig->init();

            //Get all templates of component then process each with twig and save
            $templates = Folder::all($component_folder);

            try {
                foreach($templates as $templateFile) {
                    if (Utils::endsWith($templateFile, '.twig') && !Utils::endsWith($templateFile, '.html.twig')) {
                        $content = $this->twig->processTemplate($templateFile);
                        $file = File::instance($component_folder . DS . str_replace('.twig', '', $templateFile));
                        $file->content($content);
                        $file->save();

                        //Delete twig template
                        $file = File::instance($component_folder . DS . $templateFile);
                        $file->delete();
                    }
                }
            } catch (\Exception $e) {
                $this->output->writeln("<red>" . $e->getMessage() . "</red>");
                $this->output->writeln("Rolling back...");
                Folder::delete($component_folder);
                $this->output->writeln($type . "creation failed!");
                return false;
            }
            if ($type != 'blueprint') {
                rename($component_folder . DS . $type . '.php', $component_folder . DS . $folder_name . '.php');
                rename($component_folder . DS . $type . '.yaml', $component_folder . DS . $folder_name . '.yaml');
            } else {
                $bpname = $this->inflector->hyphenize($this->component['bpname']);
                rename($component_folder . DS . $type . '.yaml', $component_folder . DS . $bpname . '.yaml');
            }
        }



        $this->output->writeln('');
        $this->output->writeln('<green>SUCCESS</green> ' . $type . ' <magenta>' . $name . '</magenta> -> Created Successfully');
        $this->output->writeln('');
        $this->output->writeln('Path: <cyan>' . $component_folder . '</cyan>');
        $this->output->writeln('');
    }

    /**
     * Iterate through all options and validate
     */
    protected function validateOptions()
    {
        foreach (array_filter($this->options) as $type => $value) {
            $this->validate($type, $value);
        }
    }

    /**
     * @param        $type
     * @param        $value
     * @param string $extra
     *
     * @return mixed
     */
    protected function validate($type, $value, $extra = '')
    {
        switch ($type) {
            case 'name':
                //Check If name
                if ($value === null || trim($value) === '') {
                    throw new \RuntimeException('Name cannot be empty');
                }
                if (false !== $this->gpm->findPackage($value)) {
                    throw new \RuntimeException('Package name exists in GPM');
                }

                // Check if it's reserved
                if ($this->isReservedWord(strtolower($value))) {
                    throw new \RuntimeException("\"" . $value . "\" is a reserved word and cannot be used as the name");
                }

                break;

            case 'description':
                if($value === null || trim($value) === '') {
                    throw new \RuntimeException('Description cannot be empty');
                }

                break;
            case 'themename':
                if($value === null || trim($value) === '') {
                    throw new \RuntimeException('Theme Name cannot be empty');
                }

                break;
            case 'developer':
                if ($value === null || trim($value) === '') {
                    throw new \RuntimeException('Developer\'s Name cannot be empty');
                }

                break;

            case 'githubid':
                // GitHubID can be blank, so nothing here
                break;

            case 'email':
                if (!preg_match('/^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/iD', $value)) {
                    throw new \RuntimeException('Not a valid email address');
                }

                break;
        }

        return $value;
    }

    public function isReservedWord($word)
    {
        if (in_array($word, $this->reserved_keywords)) {
            return true;
        }
        return false;
    }
}
