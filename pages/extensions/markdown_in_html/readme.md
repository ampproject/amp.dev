# Support markdown in html content

## Purpose

Python markdown supports markdown inside html block elements only when the extra extension is activated
and the attribute "markdown" is set.
https://python-markdown.github.io/extensions/extra/

This extension automatically sets the attribute markdown="span" to all `table` tags
when no markdown attribute is present. 

Unfortunately the extra extension automatically activates quite a few other extensions.
So this grow extension can set the list of automatically activated extension to an empty list
when the option `prevent_markdown_extra_auto_loading_other` is set to true.
There is an issue for python markdown: https://github.com/Python-Markdown/markdown/issues/849
If this issue is resolved and we use a grow version that uses the new python markdown version 
this logic can be removed. 


## Activation

First you have to enable python markdown extra extension in the podspec.yaml

```yaml
markdown:
  extensions:
  - kind: markdown.extensions.extra
```

The extension itself also has to be activated in the podspec.yaml.
The following example configures this plugin to prevent the auto loading of the other extensions
by the markdown extra extension

```yaml
ext:
  - extensions.markdown_in_html.MarkdownInHtmlExtension:
      prevent_markdown_extra_auto_loading_other: true
```


