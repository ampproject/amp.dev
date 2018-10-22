# v1.4.2
## 08/08/2018

1. [](#new)
    * Added `UniformResourceLocator::clearCache()` to allow resource cache to be cleared
    * Added `$extends` parameter to `BlueprintForm::load()` to override `extends@`
1. [](#improved)
    * Improved messages in `Stream` exceptions
1. [](#bugfix)
    * Fixed bugs when using `mkdir()`, `rmdir()`, `rename()` or creating new files with URIs

# v1.4.1
## 06/20/2018

1. [](#bugfix)
    * Fixed a bug in blueprint extend and embed

# v1.4.0
## 06/13/2018

1. [](#new)
    * `BlueprintForm`: Implemented support for multiple `import@`s and partial `import@`s (#17)
1. [](#improved)
    * `YamlFile`: Added support for `@data` without quoting it (fixes issues with Symfony 3.4 if `compat=true`)
    * `YamlFile`: Added compatibility mode which falls back to Symfony YAML 2.8.38 if parsing with newer version fails
    * `YamlFile`: Make `compat` and `native` settings global, enable `native` setting by default
    * General code cleanup, some optimizations
1. [](#bugfix)
    * `Session`: Removed broken request counter

# v1.3.9
## 10/08/2017

1. [](#improved)
    * Modified `MarkdownFile::encode()` to dump header with 20 levels of indention (was 5)

# v1.3.8
## 09/23/2017

1. [](#bugfix)
    * Fixed bad PHP docblock that was breaking API generation

# v1.3.7
## 08/28/2017

1. [](#bugfix)
    * Fixed `Event` backwards compatibility by removing getters support

# v1.3.6
## 08/16/2017

1. [](#improved)
    * Improved Event class to support getters and export

# v1.3.5
## 05/22/2017

1. [](#improved)
    * Improved exception message in `File::content()` class when failing to load the data
1. [](#bugfix)
    * Fixed `Blueprintform::resolve()` to use slash notation by default instead of dot notation
    * Fixed warning if badly formatted `$path` parameter is given to `UniformResourceLocator::addPath()`
    * Fixed `Blueprintform::fields()` returning bad value if there were no fields

# v1.3.4
## 05/15/2017

1. [](#new)
    * Blueprint: Add support for a single array field in forms
1. [](#bugfix)
    * Fixed `IniFile::content()` should not fail if file doesn't exist
    * Session: Protection against invalid session cookie name throwing exception
    * Session: Do not destroy session on CLI
    * BlueprintSchema: Fixed warning when field list is not what was expected

# v1.3.3
## 10/06/2016

1. [](#improved)
    * Allow calls without parameter in `UniformResourceLocator::getPaths()`
    * Add support for `BlueprintSchema::getPropertyName()` and `getProperty()`
    * Add domain parameter to Session constructor
    * Add support for `FilesystemIterator::FOLLOW_SYMLINKS` in RecursiveUniformResourceIterator class

# v1.3.2
## 05/24/2016

1. [](#new)
    * Added a new function BlueprintForm::getFilename()
1. [](#bugfix)
    * BlueprintsForm: Detect if user really meant to extend parent blueprint, not another one

# v1.3.1
## 04/25/2016

1. [](#new)
    * Add new function File::rename()
    * Add new function UniformResourceLocator::fillCache()
1. [](#bugfix)
    * Fix collections support in BluprintSchema::extra()
    * Fix exception in stream wrapper when scheme is not defined in locator
    * Prevent UniformResourceLocator from resolving paths outside of defined scheme paths (#8)
    * Fix breaking YAML files which start with three dashes (#5)

# v1.3.0
## 03/07/2016

1. [](#new)
    * Add new function UniformResourceLocator::isStream()
    * Add new class BlueprintForm
    * Renamed Blueprints class into BlueprintSchema
    * Add new function BlueprintSchema::extra() to return data fields which haven't been defined in blueprints
    * Add support to unset and replace blueprint fields and properties
    * Allow arbitrary dynamic fields in Blueprints (property@)
    * Add default properties support for form field types
    * Remove dependency on ircmaxell/password-compat
    * Add support for Symfony 3
    * Add a few unit tests
1. [](#improved)
    * UniformResourceLocator::addPath(): Add option to add path after existing one (falls back to be last if path is not found)
1. [](#bugfix)
    * Fix blueprint without a form
    * Fix merging data with empty blueprint

# v1.2.0
## 10/24/2015

1. [](#new)
    * **Backwards compatibility break**: Blueprints class needs to be initialized with `init()` if blueprints contain `@data-*` fields
    * Renamed NestedArrayAccess::remove() into NestedArrayAccess::undef() to avoid name clashes

# v1.1.4
## 10/15/2015

1. [](#new)
    * Add support for native YAML parsing option to Markdown and YAML file classes

# v1.1.3
## 09/14/2015

1. [](#bugfix)
    * Fix regression: Default values for collections were broken
    * Fix Argument 1 passed to `RocketTheme\Toolbox\Blueprints\Blueprints::mergeArrays()` must be of the type array
    * Add exception on Blueprint collection merging; only overridden value should be used
    * File locking truncates contents of the file
    * Stop duplicate Messages getting added to the queue

# v1.1.2
## 08/27/2015

1. [](#new)
    * Creation of Changelog
