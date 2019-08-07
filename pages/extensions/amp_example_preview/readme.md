# Example preview generator

Generates previews for inline example code blocks in markdown documents.


## Usage

To generate a preview or a playground link you have to wrap source code block in an `[example]` tag.
It supports the following attributes:
 * **preview**
   * **none** (default)
   * **inline** The preview is integrated in the page above the code. 
     Only possible if the code does not use anything in the head
   * **top-frame** Preview in an iframe above the code (like used for stories in examples)
   * **side-frame** Preview in an iframe on the right of the code (like used for an embedded playground)
 * **orientation** Intended to define the orientation for the selected preview modes. 
   The values are not defined in this extension itself, but rather by the use in the `code-preview.j2` template. 
   At the time of writing the `top-frame` preview supported `landscape`, `portrait` and `responsive`
 * **playground**
   * **true** A link to open the example in the playground will be shown below the example code (default)
   * **false** No playground link will be shown
 * **imports** The comma separated list of required amp custom elements (optional)
   You can add the version of a component separated by a colon after the component name
 * **template** The template syntax to use. Specify the version separated by a colon after the template syntax name


**Example:**

````markdown
[example preview="inline"
         playground="true"
         imports="amp-list:0.2,amp-bind"
         template="amp-mustache:0.2"]

```html
<p>some code
   ...
</p>
```        
[/example]
````


## Functioning

This extension uses a grow preprocessor hook to search in the markdown files for `[example]` tags 
before the source code block is rewritten with code highlight markup.
The codee block is stored inside a comment so that it can later be retrieved.
For each supported format of the page (websites, stories, email, ads) a complete preview html file is generated.
With a grow postprocessor hook the comments are then searched and the preview and playground link injected.


## Templates

Like the normal grow process this extension uses jinja2 templates for code generation.

 * Templates for preview page generation are taken from the folder:
   /frontend/templates/layouts/example-pages/
   * amp-ads-page.j2
   * amp-email-page.j2
   * amp-stories-page.j2
   * amp-websites-page.j2
 * Template for preview and playground link generation:
   /frontend/templates/views/partials/code-preview/code-preview.j2

Unlike the normal grow templates those templates are not reloaded when grow is running
in dev mode and the file changes.
You have to restart grow to see the changes.


## Activation

This extension has to be activated in the podspec.yaml

If the AmpDependencyInjectorExtension is also used, ensure that the AmpExamplePreviewExtension
is listed before the AmpDependencyInjectorExtension

```yaml
ext:
- extensions.amp_dev.AmpExamplePreviewExtension
```
