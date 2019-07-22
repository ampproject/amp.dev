# amp.dev patch for markdown toc generation


## Purpose

HTML code inside the headlines can cause problems when it is included in the TOC
For example anchor tags will break the TOCs own anchor tag!

This extensions hooks into the markdown TOC extension to remove all HTML tags
from the TOC items before the TOC is rendered.


## Activation

This extension has to be activated in the podspec.yaml

```yaml
ext:
  - extensions.markdown_toc_patch.MarkdownTocPatchExtension 
```
