# Changelog

## Version 0.*

* v0.6.2 (25.04.2016)

  * fixed issue with parsing shortcode tokens inside shortcode content.

* v0.6.1 (25.02.2016)

  * fixed bug with not recalculating new text length after applying shortcode replacement which caused the replacements to be applied only up to the length of source text.

* v0.6.0 (13.02.2016)

  * README was completely rewritten to take into account newest additions,
  * introduced `FilterShortcodesEvent` for modifying set of parsed shortcodes before processing them,
  * introduced `ReplaceShortcodesEvent` to alter the way shortcode replacements are applied to source text at each processing level,
  * introduced `EventContainerInterface` with default implementation `EventContainer` to store event handlers,
  * introduced events handling in `Processor` with events above,
  * added `Processor::withEventContainer()` to configure event handlers,
  * added `ProcessedShortcode::hasAncestor()` to detect if shortcode has any parent with given name,
  * introduced `ReplacedShortcode` which represents parsed shortcode data with replacement returned from its handler,
  * introduced ready to use event handlers classes:
    * `FilterRawEventHandler` allows to automatically configure shortcodes that should not have their content processed,
    * `ReplaceJoinEventHandler` discards the parent shortcode content and returns only concatenated replacements,
  * fixed `HandlerContainer::addAlias()` bug that may have silently added aliases for default handler,
  * added possibility to create `WordpressParser` with names from array or `HandlerContainer` to catch only those like WordPress does,
  * fixed differences between parsers and standardized validating allowed characters in their names in `RegexBuilderUtility::buildNameRegex()`
  * introduced several ready to use shortcode handlers described in dedicated section of README,
  * refactored `ShortcodeFacade` for better developer experience.

* v0.5.3 (26.01.2016)
  * massive performance improvements in RegularParser,
  * fixed problem with multibyte characters in parsed texts,
  * fixed matching shortcodes with invalid names.

* v0.5.2 (20.01.2016)
  * fixed bug with subsequent string tokens in RegularParser.

* v0.5.1 (12.11.2015)

  * fixed bug leaving part of shortcode text when it contained multibyte characters.

* v0.5.0 (28.10.2015)

  * fixed bug with parent shortcode not being correctly set when there was more than one shortcode at given recursion level,
  * fixed bug which caused shortcode content to be returned without modification when auto processing was enabled, there was no handler for that shortcode, but there were handlers for inner shortcodes,
  * added example demonstrating how to remove content outside shortcodes,
  * added `ProcessedShortcode::getTextContent()` to allow returning unprocessed content regardless of auto processing setting value,
  * added XML and YAML serializers,
  * AbstractShortcode::getParameter() does not throw exception for missing parameter without default value,
  * removed `create*()` methods from `ShortcodeFacade`, now all dependencies construction is inside the constructor,
  * removed classes and methods deprecated in previous releases,
  * removed `RegexExtractor` and `ExtractorInterface`, its functionality was moved to `Parser` - now it returns instances of `ParsedShortcodeInterface`,
  * removed `Match` and `MatchInterface`,
  * removed `HandlerInterface`, from now on handlers can be only closures and classes with `__invoke()` (`callable` typehint),
  * removed all handler-related methods from `Processor` (extracted to `HandlerContainer`):
    * `addHandler()`,
    * `addHandlerAlias()`,
    * `setDefaultHandler()`.
  * refactored `ShortcodeFacade` to also use `HandlerContainer`, also `SyntaxInterface` parameter is now required,
  * `Processor` is now immutable, options setters were refactored to return reconfigured clones:
    * `setRecursionDepth()` &raquo; `withRecursionDepth()`,
    * `setMaxIterations()` &raquo; `withMaxIterations()`,
    * `setAutoProcessContent()` &raquo; `withAutoProcessContent()`,
  * extracted `HandlerContainerInterface` and its default implementation `HandlerContainer` from `Processor`,
  * `Processor` now requires instance of `HandlerContainer`,
  * introduced `RegularParser` with dedicated parser implementation that correctly handles nested shortcodes,
  * introduced `WordpressParser` with slightly refactored implementation of WordPress' regex-based shortcodes in case anyone would like full compatibility,
  * introduced `ImmutableHandlerContainer` as an alternative implementation,
  * introduced `ProcessorContext` to store internal state when processing text,
  * introduced `AbstractShortcode`, restored `final` on regular `Shortcode`,
  * `ProcessedShortcode` can be now created with static method `createFromContext()` using instance of `ProcessorContext`,
  * introduced `ParsedShortcode` and `ParsedShortcodeInterface` that extends `ShortcodeInterface` with position and exact text match.

* v0.4.0 (15.07.2015)

  * classes and interfaces were moved to their own namespaces, update your `use` clauses and use new names. Backward compatibility was fully maintained, but note that previous class files will be removed in the next release. Old class files contain call to `class_alias()` and empty implementation for IDE autocompletion, interfaces extend those from new locations. All modified elements are listed below:
    * `Extractor` &raquo; `Parser\RegexExtractor`,
    * `ExtractorInterface` &raquo; `Extractor\ExtractorInterface`,
    * `HandlerInterface` &raquo; `Extractor\HandlerInterface`,
    * `Parser` &raquo; `Parser\RegexParser`,
    * `ParserInterface` &raquo; `Parser\ParserInterface`,
    * `Processor` &raquo; `Processor\Processor`,
    * `ProcessorInterface` &raquo; `Processor\ProcessorInterface`,
    * `SerializerInterface` &raquo; `Serializer\SerializerInterface`,
    * `Shortcode` &raquo; `Shortcode\Shortcode`,
    * `Syntax` &raquo; `Syntax\Syntax`,
    * `SyntaxBuilder` &raquo; `Syntax\SyntaxBuilder`,
  * next version of this library will remove all files marked as deprecated (listed above) and will introduce backward incompatible changes to allow finishing refactorings for version 1.0. Sneak peek:
    * `Extractor` abstraction will be removed and its functionality will be merged with `Parser`,
    * processing shortcode content will be moved to its handler,
    * `ProcessedShortcode` will be aware of `ProcessorInterface` instance that is processing it,
    * `HandlerContainer` will be refactored outside `Processor` to remove SRP violation,
    * various methods will lose their ability to accept nullable parameters to enforce visibility of dependencies,
    * `ProcessedShortcode` will not extend `Shortcode` and `Shortcode` will be `final` again,
    * `Match` class will be removed and `ParsedShortcode` will be introduced in its place,
  * introduced `ShortcodeInterface` for reusable shortcode implementation, handlers should typehint it,
  * nearly all classes and interfaces were renamed and moved to their own namespaces, see UPGRADE,
  * introduced `ProcessedShortcode` to provide more runtime information about context in handlers,
  * strict syntax capabilities were removed (will be reimplemented in the future),
  * introduced `CommonSyntax` with default values,
  * introduced `RegexBuilderUtility` to separate regex building from `Syntax` class,
  * improved regular expressions which now offer more flexibility,
  * `HandlerInterface` was deprecated, please use classes with __invoke() method.

* v0.3.0 (08.05.2015)

  * added support for `[self-closing /]`  shortcodes,
  * added library facade for easier usage,
  * `Syntax` regular expressions are now built once in constructor,
  * added support for whitespace between shortcode fragments, ie. `[  code   arg = val ] [  / code ]`,
  * `Syntax` and `SyntaxBuilder` support whitespaced and strict syntaxes.

* v0.2.2 (26.04.2015)

  * fixed support for PHP 5.3.

* v0.2.1 (23.04.2015)

  * fixed matching simple parameter values enclosed by delimiters,
  * fixed missing support for escaping characters inside parameter values.

* v0.2.0 (17.04.2015)

  * added HandlerInterface to enable shortcode handlers with basic validation capabilities,
  * added default handler for processing shortcodes without registered name handlers,
  * added handler aliasing to reuse name handlers without manually registering them,
  * added recursive processing with ability to control recursion depth,
  * added iterative processing with ability to control maximum number of iterations,
  * added configurable syntax to enable different shortcode formats without modifying library code,
  * added syntax builder to ease building `Syntax` object,
  * added dash `-` to allowed characters in shortcode names,
  * deprecated `Processor::setRecursion()`, use `Processor::setRecursionDepth()` instead,
  * removed regular expressions constants from classes.

* v0.1.0 (06.04.2015)

  * first library version.
