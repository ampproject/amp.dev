---
$title: Formatting guides & tutorials
$order: 3
description: 'File formatting requirements for amp.dev'
formats:
  - websites
  - stories
  - ads
  - email
author: CrystalOnScript
---

Guides and tutorials are submitted in [Markdown](https://www.markdownguide.org/), with an additional frontmatter and shortcode formatting.

## Documentation locations

Content on amp.dev is pulled from two repositories, [amp.dev](https://github.com/ampproject/amp.dev) and [AMPHTML](https://github.com/ampproject/amphtml). All reference documentation under components is pulled from AMPHTML, either from builtins or extensions.

*   [Built-in components ](https://github.com/ampproject/amphtml/tree/master/builtins)
*   [Components](https://github.com/ampproject/amphtml/tree/master/extensions)
*   [Courses](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/courses)
*   [Examples](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/examples)
*   [Guides & tutorials](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/guides-and-tutorials)

There are several other documents that are imported to amp.dev from AMPHTML. They are [listed in this file](https://github.com/ampproject/amp.dev/blob/future/platform/config/imports/spec.json). Don't update these documents in the amp.dev repository – your changes will get overwritten on subsequent builds!  

## Frontmatter

Frontmatter exists at the top of each guide and tutorial.

Example:

```yaml
$title: Include Custom JavaScript in AMP Pages
$order: 7
formats:
  - websites
author: CrystalOnScript
contributors:
  - fstanis
description: For web experiences requiring a high amount of customization AMP has created amp-script, a component that allows the use of arbitrary JavaScript on your AMP page without affecting the page's overall performance.
```

<table>
  <tr>
   <td>
    <code>$title</code>
   </td>
   <td>The title of your document as it will appear in the table of contents. Capitalize the first letter of the first word, except for “AMP” and other proper nouns. Use the ampersand `&` instead of the word `and`.
   </td>
  </tr>
  <tr>
   <td>
    <code>$order</code>
   </td>
   <td>Define where in the table of contents your document appears. You may need to edit the `$order` in other documents for it to appear in the correct position.
   </td>
  </tr>
  <tr>
   <td>
    <code>formats</code>
   </td>
   <td>List the AMP experiences your document is relevant to. If your document was relevant to AMP websites and AMP stories, but not AMP ads or AMP email, your frontmatter would like the following:
    ```yaml
        formats:
          - websites
          - stories
    ```  
   </td>
  </tr>
  <tr>
   <td>
<code>author</code>
   </td>
   <td>The author is you! Use your GitHub username.
   </td>
  </tr>
  <tr>
   <td>
<code>contributors</code>
   </td>
   <td>List anyone who contributed to your document. This field is optional.
   </td>
  </tr>
  <tr>
   <td>
<code>description</code>
   </td>
   <td>Write a brief description of your guide or tutorial. This helps with search engine optimization, getting your work into the hands of those who need it!
   </td>
  </tr>
  <tr>
   <td>
<code>tutorial</code>
   </td>
   <td>Add `tutorial: true` to the frontmatter for the website to add the tutorial icon next to it. Tutorials are at the bottom of their section in the table of contents.
   </td>
  </tr>
</table>

# Shortcodes

For a list of shortcodes and their uses, please view [documentation.md on GitHub](https://github.com/ampproject/amp.dev/blob/future/contributing/documentation.md#shortcodes).

## Images
amp.dev is built with AMP! Therefore our images must match the [`amp-img`](../../../../documentation/components/reference/amp-img.md) criteria. The build process uses the following syntax to convert images to proper `amp-img` format.

<div class="ap-m-code-snippet">
<pre>
&#123;&#123; image('/static/img/docs/tutorials/custom-javascript-tutorial/image1.jpg', 500, 369, layout='intrinsic', alt='Image of basic amp script tutorial starter app') }}
</pre>
</div>

## Filtering sections
Some documents may be relevant for multiple AMP formats, but certain formats may need further explanation or information that is not relevant to the others. You can filter these sections by wrapping them in the following shortcode.

<div class="ap-m-code-snippet">
<pre>
&lsqb;filter formats="websites"]
This is only visible for [websites](?format=websites).
&lsqb;/filter]

&lsqb;filter formats="websites"]
This is only visible for [websites](?format=websites).
&lsqb;/filter]

&lsqb;filter formats="websites, email"]
This is visible for [websites](?format=websites) & [email](?format=email).
&lsqb;/filter]

&lsqb;filter formats="stories"]
This is visible for [stories](?format=stories).
&lsqb;/filter]
</pre>
</div>

## Tips
You can add tips and callouts by wrapping text in the following shortcode:

<div class="ap-m-code-snippet">
<pre>
&lsqb;tip type="default"]
Default tip
[/tip]

&lsqb;tip type="important"]
Important
[/tip]

&lsqb;tip type="note"]
Note
[/tip]

&lsqb;tip type="read-on"]
Read-on
[/tip]
</pre>
</div>

## Code snippets
Place code snippets inside sets of three backticks, specify the language at the end of the first set of backticks.

<div class="ap-m-code-snippet">
<pre>
&#96;&#96;&#96;html
  // code sample
&#96;&#96;&#96;

&#96;&#96;&#96;css
  // code sample
&#96;&#96;&#96;

&#96;&#96;&#96;js
  // code sample
&#96;&#96;&#96;
</pre>
</div>

If your code contains double curly braces, which often is the case if you use [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md?format=websites) templates, you have to wrap the code part:

<div class="ap-m-code-snippet">
<pre>
&#96;&#96;&#96;html
&#123;&#37; raw	&#37;&#125;
  // code with double curly braces
&#123;&#37; endraw	&#37;&#125;
&#96;&#96;&#96;
</pre>
</div>

### Code snippets in lists
Python-Markdown has some limitations. Use the following syntax when including code snippets in lists:

<div class="ap-m-code-snippet">
<pre>
1. First:
    &lsqb;sourcecode:html]
      &#60;html>
        &#60;p>Indented content.&#60;/p>
      &#60;/html>
    &lsqb;/sourcecode]
  2. Second
  3. Third
</pre>
</div>

## Preview code samples

Code samples can have a preview and/or link to an [AMP Playground](https://playground.amp.dev/) version.

<div class="ap-m-code-snippet">
  <pre>
  &lsqb;example preview="default: none|inline|top-frame"
          playground="default: true|false"
          imports="&lt;custom-element-1&gt;,&lt;custom-element-2&gt;,..."
          template="&lt;custom-template&gt;"]
  ```html
    // code sample
  ```
  &lsqb;/example]
  </pre>
</div>


Note: The preview will automatically be transformed to the currently selected format when opening it in the playground 🤯!

Use the `preview` attribute to define how the preview is generated:

- **none**: No preview will be generated

- **inline**: The example preview is displayed above the source code.
  An inline preview is only possible for normal website examples if the code does not contain any `head` elements.
  Use this option for small examples that do not need any styling or other `head` elements
  (imports do not count, since they are specified via the `imports` attribute).

- **top-frame**: The example preview is displayed above the source code inside an iframe.
  The orientation can be toggled between `portrait` and `landscape` mode.
  You can preselect the orientation by specifying the additional attribute:

- **orientation**: `default: landscape|portrait`

If custom elements are needed, specify them in the `imports` attribute as a comma separated list
with the name of the component followed by a colon and the version.
If your code uses [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md?format=websites)
specify the dependency in the `template` attribute instead.

For email content with resource links use the placeholder <code>&#123;&#123;server_for_email}}</code> in the source.

### Inline Sample

Here is simple inline sample embed. You can define CSS via inline styles:

<div class="ap-m-code-snippet"><pre>
  &#91;example preview="inline" playground="true"]
    ```html
    &lt;div style=&quot;background: red; width: 200px; height: 200px;&quot;&gt;Hello World&lt;/div&gt;
    ```
  &#91;/example]
  [/example]</pre>
</div>

This is what it looks like:

[example preview="inline" playground="true"]
```html
<div style="background: red; width: 200px; height: 200px;">Hello World</div>
```
[/example]

Warning: inline samples are embedded directly into the page. This might lead to conflicts if components are already used on the page (e.g. `amp-consent`).

### Top-Frame Preview

Use top-frame preview whenever you need to specify header elements or define global styles inside `<style amp-custom>`.

Important: Do not add any AMP boilerplate code to the header as this will get added automatically, based on the AMP format. Only add elements to the head that are needed by the sample!

<div class="ap-m-code-snippet"><pre>
  &#91;example preview="top-frame"
         playground="true"]
    ```html
    &lt;head&gt;
      &lt;script async custom-element=&quot;amp-youtube&quot; src=&quot;https://cdn.ampproject.org/v0/amp-youtube-0.1.js&quot;&gt;&lt;/script&gt;
      &lt;style amp-custom&gt;
        body {
          background: red;
        }
      &lt;/style&gt;
    &lt;/head&gt;
    &lt;body&gt;
      &lt;h1&gt;Hello AMP&lt;/h1&gt;
      &lt;amp-youtube width=&quot;480&quot;
        height=&quot;270&quot;
        layout=&quot;responsive&quot;
        data-videoid=&quot;lBTCB7yLs8Y&quot;&gt;
      &lt;/amp-youtube&gt;
    &lt;/body&gt;
    ```
  [/example]</pre>
</div>

This is what it looks like:

[example preview="top-frame"
         playground="true"]
```html
<head>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <style amp-custom>
    body {
      background: red;
    }
  </style>
</head>
<body>
  <h1>Hello AMP</h1>
  <amp-youtube width="480"
    height="270"
    layout="responsive"
    data-videoid="lBTCB7yLs8Y">
  </amp-youtube>
</body>
```
[/example]

### AMP Stories

Use `preview="top-frame"` together with `orientation="portrait"` for previewing AMP Stories.

<div class="ap-m-code-snippet"><pre>
  &#91;example preview="top-frame"
         orientation="portrait"
         playground="true"]
    ```html
    &lt;head&gt;
      &lt;script async custom-element=&quot;amp-story&quot;
          src=&quot;https://cdn.ampproject.org/v0/amp-story-1.0.js&quot;&gt;&lt;/script&gt;
      &lt;style amp-custom&gt;
        body {
          font-family: 'Roboto', sans-serif;
        }
        amp-story-page {
          background: white;
        }
      &lt;/style&gt;
    &lt;/head&gt;
    &lt;body&gt;
      &lt;amp-story standalone&gt;
        &lt;amp-story-page id=&quot;cover&quot;&gt;
          &lt;amp-story-grid-layer template=&quot;vertical&quot;&gt;
            &lt;h1&gt;Hello World&lt;/h1&gt;
            &lt;p&gt;This is the cover page of this story.&lt;/p&gt;
          &lt;/amp-story-grid-layer&gt;
        &lt;/amp-story-page&gt;
        &lt;amp-story-page id=&quot;page-1&quot;&gt;
          &lt;amp-story-grid-layer template=&quot;vertical&quot;&gt;
            &lt;h1&gt;First Page&lt;/h1&gt;
            &lt;p&gt;This is the first page of this story.&lt;/p&gt;
          &lt;/amp-story-grid-layer&gt;
        &lt;/amp-story-page&gt;
      &lt;/amp-story&gt;
    &lt;/body&gt;
    ```
  [/example]</pre>
</div>

This is what it looks like:

[example preview="top-frame"
         orientation="portrait"
         playground="true"]
```html
  <head>
    <script async custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <style amp-custom>
      body {
        font-family: 'Roboto', sans-serif;
      }
      amp-story-page {
        background: white;
      }
    </style>
  </head>
  <body>
    <amp-story standalone>
      <amp-story-page id="cover">
        <amp-story-grid-layer template="vertical">
          <h1>Hello World</h1>
          <p>This is the cover page of this story.</p>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="page-1">
        <amp-story-grid-layer template="vertical">
          <h1>First Page</h1>
          <p>This is the first page of this story.</p>
        </amp-story-grid-layer>
      </amp-story-page>
    </amp-story>
  </body>
```
[/example]
### Absolute URLs for AMP Email

Note how we use <code>&#123;&#123;server_for_email}}</code> for making the endpoint URL absolute if embedded inside an AMP email.

<div class="ap-m-code-snippet"><pre>
  &#91;example preview="top-frame" playground="true"]
    ```html
    &lt;div class=&quot;resp-img&quot;&gt;
      &lt;amp-img alt=&quot;flowers&quot;
        src=&quot;&#123;&#123;server_for_email}}/static/inline-examples/images/flowers.jpg&quot;
        layout=&quot;responsive&quot;
        width=&quot;640&quot;
        height=&quot;427&quot;&gt;&lt;/amp-img&gt;
    &lt;/div&gt;
    ```
  [/example]</pre>
</div>

This is what it looks like:

[example preview="top-frame" playground="true"]
```html
<div class="resp-img">
  <amp-img alt="flowers"
    src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
    layout="responsive"
    width="640"
    height="427"></amp-img>
</div>
```
[/example]

### Escaping mustache tempaltes

Here is a `top-frame` sample using a remote endpoint. Mustache templates need to be escaped in samples using <code>&#123;% raw %&#125;</code> and <code>&#123;% endraw %}</code>:

<div class="ap-m-code-snippet">
  <pre>&#91;example preview=&quot;top-frame&quot;
        playground=&quot;true&quot;
        imports=&quot;amp-list:0.1&quot;
        template=&quot;amp-mustache:0.2&quot;]
    ```html
    &lt;amp-list width=&quot;auto&quot; height=&quot;100&quot; layout=&quot;fixed-height&quot;
      src=&quot;&#123;&#123;server_for_email}}/static/inline-examples/data/amp-list-urls.json&quot;&gt;
      &lt;template type=&quot;amp-mustache&quot;&gt;&#123;% raw %}
        &lt;div class=&quot;url-entry&quot;&gt;
          &lt;a href=&quot;&#123;&#123;url}}&quot;&gt;&#123;&#123;title}}&lt;/a&gt;
        &lt;/div&gt;
      &#123;% endraw %}
      &lt;/template&gt;
    &lt;/amp-list&gt;
    ```
[/example]</pre>
</div>

This is what it looks like:

[example preview="top-frame"
         playground="true"
         imports="amp-list:0.1"
         template="amp-mustache:0.2"]
```html
<amp-list width="auto" height="100" layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json">
  <template type="amp-mustache">{% raw %}
    <div class="url-entry">
      <a href="{{url}}">{{title}}</a>
    </div>
    {% endraw %}
  </template>
</amp-list>
```
[/example]

## Links

You can link to other pages with standard markdown link syntax:
```md
 [link](../../../courses/beginning-course/index.md)
```

When linking to another page on amp.dev the reference will be a relative filepath to the target file.

### Anchors

Link to specific sections in a document using anchors:
```md
[link to example section](#example-section)
```

Please create the anchor target using `<a name="#anchor-name></a>` before linking to a section with no anchor present.
A good place is at the end of the section headline:

```html
## Example section <a name="example-section"></a>
```

You must only use letters, digits, the dash and the underscore in an anchor.
Please use short anchor names in english that match the headline or describe the section.
Ensure the anchor name is unique inside the document.

When a Page is translated the anchor names must not be changed and remain in english.

When you create an anchor that will be used in a link from another page 
you should also create the same anchor in all translations.

### AMP format filter
Component documentation, guides and tutorials and examples are filterable by AMP format,
such as AMP websites or AMP stories.
When linking out to such a page you should explicitly specify a format, which is supported by the target,
by appending the format parameter to the link:

```md
 [link](../../learn/amp-actions-and-events.md?format=websites)
```

Only when you are sure the target supports **all** the formats that your page does you can omit the parameter.


### Component references
A link to a component reference documentation will automatically point to the latest version
if your link omits the version part.
When you explicitly want to point to a version specify the full name:

```md
 [latest version](../../../components/reference/amp-carousel.md?format=websites)
 [explicit version](../../../components/reference/amp-carousel-v0.2.md?format=websites)
```


## Document Structure
### Titles, headings and subheadings
The first letter of the first word in titles, headings and subheadings is capitalized, what follows is lowercase. Expectations include AMP and other proper nouns. No heading is titled `Introduction`, introductions follow the document title.

### Document naming
Name documents with the dash naming convention.

<table>
  <tr>
   <td><strong>Do</strong>
   </td>
   <td><strong>Don’t</strong>
   </td>
  </tr>
  <tr>
   <td>hello-world-tutorial.md
   </td>
   <td>hello_world_tutorial.md
   </td>
  </tr>
  <tr>
   <td>website-fundamentals.md
   </td>
   <td>websiteFundamentals.md
   </td>
  </tr>
  <tr>
   <td>actions-and-events.md
   </td>
   <td>actionsandevents.md
   </td>
  </tr>
</table>
