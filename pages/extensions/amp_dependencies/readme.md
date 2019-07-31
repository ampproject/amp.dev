# amp.dev component dependency injection


## Purpose

This hook inserts the scripts for the used amp component dependencies.

In you template head section call `{{ doc.amp_dependencies.emit() }}` 
at the position where the dependency scripts shall be added.

You need to add the component dependency explicit in the templates or the content with this code: 
`{% do doc.amp_dependencies.add('amp-bind', '0.1') %}`

For template dependencies you have to call:
`{% do doc.amp_dependencies.add('amp-mustache', '0.2', 'template') %}`

When different versions are added for the same component in the context of a page there will be an error.
Otherwise the hook ensures that each component is only imported once.

For the basic components `amp-anim`, `amp-iframe` and `amp-youtube` no explicit dependency declaration is needed
to make writing documentation with videos and animation more easy.
But if you use those components in templates you should still explicitly add the dependency.


## Activation

This extension has to be activated in the podspec.yaml

```yaml
ext:
  - extensions.amp_dependencies.AmpDependenciesExtension
```
