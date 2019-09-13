# amp.dev optimized code highlighting extension


## Purpose

This grow extension improves the grow code highlighting to help with included jinja2 code blocks.

We need jinja2 expressions in code examples to create links and to wrap example parts not relevant for every amp format in conditions.

This extension does the following:
 * Jinja2 expressions in html and javascript blocks are treated as text blocks by the lexer.
   This prevents generation of div tags around parts of the expression
 * Jinja2 expressions are unescaped in the code highlight block 
   (Needed if the expression contains quotes or angle brackets)

Additionally the custom html lexer defined with this extension also supports the amp-bind attributes in square brackets.


## Activation

This extension has to be activated in the podspec.yaml

```yaml
ext:
  - extensions.jinja2_optimized_codehilite.Jinja2OptimizedCodehiliteExtension 
```
