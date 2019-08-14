# Linking extension

Rewrite pod internal file links to site links.


## Purpose

The best way to link from one file to another is to simply use the paths in the pod, since markdown editors
support those links and can follow them or even refactor them when a file changes.
Unfortunately grow will not even change such links in markdown to make valid site links.

This extension will search for all <a href tags in the result page and check if there are any internal paths
that needs to be rewritten to be valid site links.

Since this extension works with the html result this works for links in markdown as well as links in html code.

The link in the href attribute can be a link relative to the current document as well as a full path inside the pod.

You must point links to the file in the base language and not to translated files.


## Activation

This extension has to be activated in the podspec.yaml

```yaml
ext:
- extensions.internal_links.PodInternalLinkExtension
```
