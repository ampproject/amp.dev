# amp.dev extract highlights info extension

## Purpose

This extension is used to provide the page url and translated title and description for a list of links. 
The input is a structure with links grouped by a category below a locale node.
You can specify the locale node `default` that will be used for all locales with no matching entry.  

**Example input:**

```json
{
	"default": {
		"category": [
			"/content/folder/file.md"
		],
		"another_category": [
			"/content/other/folder/file.md"
		]
	},
	"en": {
		"category": [
			"/content/folder/file.md"
		],
		"another_category": [
			"/content/other/folder/specific_file.md"
		]
	}
}
```

For every locale configured in the grow podspec an output file is generated in the specified output folder
with the name of the locale and the extension `.json`.
The structure of the output is the same as the input, but instead of simple links each page is an object
with multiple properties:

```json
{
    "title": "The locale specific title",
    "description": "The locale specific description",
    "url": "/url/path/to/page.html"
}
```


## Activation

This extension has to be activated in the podspec.yaml.
The `input_file` and `output_folder` have to be specified:

```yaml
ext:
  - extensions.extract_highlights_info.ExtractHighlightsInfoExtension:
      input_file: /path/in/project/to/input.json
      output_folder: /dist/path/output_folder
```
