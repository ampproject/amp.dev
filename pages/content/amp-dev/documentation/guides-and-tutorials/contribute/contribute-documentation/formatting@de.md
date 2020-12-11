---
"$title": Formatting guides & tutorials
"$order": '3'
description: File formatting requirements for amp.dev
formats:
- websites
- stories
- ads
- email
author: CrystalOnScript
---

Leitfäden und Tutorials werden mit einer zusätzlichen Frontmatter und Shortcode Formatierung in [Markdown](https://www.markdownguide.org/) eingereicht.

## Documentation locations

Content on amp.dev is pulled from two repositories, [amp.dev](https://github.com/ampproject/amp.dev) and [AMPHTML](https://github.com/ampproject/amphtml). All reference documentation under components is pulled from AMPHTML, either from builtins or extensions.

- [Built-in components ](https://github.com/ampproject/amphtml/tree/master/builtins)
- [Components](https://github.com/ampproject/amphtml/tree/master/extensions)
- [Courses](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/courses)
- [Examples](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/examples)
- [Guides & tutorials](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/guides-and-tutorials)

Es gibt mehrere andere Dokumente, die von AMPHTML nach amp.dev importiert werden. Sie sind [in dieser Datei aufgeführt](https://github.com/ampproject/amp.dev/blob/future/platform/config/imports/spec.json). Aktualisiere diese Dokumente nicht im Repository amp.dev, da deine Änderungen sonst in späteren Builds überschrieben werden.

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
   <td>Der Titel deines Dokuments, wie er im Inhaltsverzeichnis erscheint. Schreibe den ersten Buchstaben des ersten Wortes groß. Ausnahmen gelten für "AMP", andere Eigennamen und Nomen. Verwende das Et-Zeichen '&' anstelle des Wortes 'und'.</td>
  </tr>
  <tr>
   <td>
    <code>$order</code>
   </td>
   <td>Lege fest, wo dein Dokument im Inhaltsverzeichnis angezeigt wird. Möglicherweise musst du das Attribut '$order' in anderen Dokumenten bearbeiten, damit es an der richtigen Position erscheint.</td>
  </tr>
  <tr>
   <td>
    <code>formats</code>
   </td>
   <td>List the AMP experiences your document is relevant to. If your document was relevant to AMP websites and AMP stories, but not AMP ads or AMP email, your frontmatter would like the following:     ```yaml         formats:           - websites           - stories     ```      </td>
  </tr>
  <tr>
   <td>
<code>author</code>
   </td>
   <td>The author is you! Use your GitHub username.    </td>
  </tr>
  <tr>
   <td>
<code>contributors</code>
   </td>
   <td>List anyone who contributed to your document. This field is optional.    </td>
  </tr>
  <tr>
   <td>
<code>description</code>
   </td>
   <td>Write a brief description of your guide or tutorial. This helps with search engine optimization, getting your work into the hands of those who need it!    </td>
  </tr>
  <tr>
   <td>
<code>tutorial</code>
   </td>
   <td>Füge 'tutorial: true' zum Frontmatter für die Website hinzu, damit das Tutorial Symbol hinzugefügt wird. Tutorials befinden sich am Ende ihres Abschnitts im Inhaltsverzeichnis.</td>
  </tr>
</table>

# Shortcodes

Eine Liste der Shortcodes und ihrer Verwendung findest du unter [documentation.md auf GitHub](https://github.com/ampproject/amp.dev/blob/future/contributing/documentation.md#shortcodes).

## Images

amp.dev is built with AMP! Therefore our images must match the [`amp-img`](../../../../documentation/components/reference/amp-img.md) criteria. The build process uses the following syntax to convert images to proper `amp-img` format.

<div class="ap-m-code-snippet"><pre>{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/image1.jpg', 500, 369, layout='intrinsic', alt='Image of basic amp script tutorial starter app') }}
</pre></div>

## Filtering sections

Some documents may be relevant for multiple AMP formats, but certain formats may need further explanation or information that is not relevant to the others. You can filter these sections by wrapping them in the following shortcode.

<div class="ap-m-code-snippet"><pre>&lsqb;filter formats="websites"]
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
</pre></div>

## Tips

You can add tips and callouts by wrapping text in the following shortcode:

<div class="ap-m-code-snippet"><pre>&lsqb;tip type="default"]
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
</pre></div>

## Code Snippets

Place code snippets inside sets of three backticks, specify the language at the end of the first set of backticks.

<div class="ap-m-code-snippet"><pre>```html
  // code sample
```

```css
  // code sample
```

```js
  // code sample
```
</pre></div>

Wenn dein Code doppelt geschweifte Klammern enthält – was häufig der Fall ist, wenn du [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md?format=websites) Templates verwendest –, musst du den Codeteil einschließen:

<div class="ap-m-code-snippet"><pre>```html
{% raw	%}
  // code with double curly braces
{% endraw	%}
```
</pre></div>

### Code snippets in lists

Python Markdown besitzt einige Einschränkungen. Verwende die folgende Syntax, wenn du Code Snippets in Listen aufnimmst:

<div class="ap-m-code-snippet"><pre>&lsqb;sourcecode:html]
      <html>
        <p>Indented content.</p>
      </html>
    &lsqb;/sourcecode]</pre></div>

## Preview code samples

Codebeispiele können eine Vorschau und/oder einen Link zu einer [AMP Playground](https://playground.amp.dev/) Version enthalten.

<div class="ap-m-code-snippet">
  <pre>&lsqb;example preview="default: none|inline|top-frame"
          playground="default: true|false"
          imports="<custom-element-1>,<custom-element-2>,..."
          template="<custom-template>"]
  ```html
    // code sample
  ```
  &lsqb;/example]</pre>
</div>

Note: The preview will automatically be transformed to the currently selected format when opening it in the playground 🤯!

Use the `preview` attribute to define how the preview is generated:

- **none**: No preview will be generated

- **inline**: Die Beispielvorschau wird über dem Quellcode angezeigt. Eine Inline Vorschau ist für normale Website Beispiele nur möglich, wenn der Code keine `head` Elemente enthält. Verwende diese Option für kleine Beispiele, die kein Styling oder andere `head` Elemente benötigen (Importe zählen nicht, da sie über das Attribut `imports` angegeben werden).

- **top-frame**: The example preview is displayed above the source code inside an iframe. The orientation can be toggled between `portrait` and `landscape` mode. You can preselect the orientation by specifying the additional attribute:

- **orientation**: `default: landscape|portrait`

Wenn benutzerdefinierte Elemente benötigt werden, gib diese im Attribut `imports` als kommagetrennte Liste mit dem Namen der Komponente an, gefolgt von einem Doppelpunkt und der Version. Wenn dein Code [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md?format=websites) verwendet, gib die Abhängigkeit stattdessen im Attribut `template` an.

Verwende für E-Mail Inhalte mit Ressourcenlinks den Platzhalter <code>{{server_for_email}}</code> in der Quelle.

### Inline Sample

Es folgt eine einfache Einbettung eines Inline Beispiels. CSS kannst du über Inline Styles definieren:

<div class="ap-m-code-snippet"><pre>[example preview="inline" playground="true"]
    ```html
    <div style="background: red; width: 200px; height: 200px;">Hello World</div>
    ```
  [/example]</pre></div>

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

<div class="ap-m-code-snippet"><pre>[example preview="top-frame"
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
  [/example]</pre></div>

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

<div class="ap-m-code-snippet"><pre>[example preview="top-frame"
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
  [/example]</pre></div>

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

Beachte, wie wir <code>{{server_for_email}}</code> verwenden, um die Endpoint URL absolut zu machen, wenn sie in eine AMP E-Mail eingebettet ist.

<div class="ap-m-code-snippet"><pre>[example preview="top-frame" playground="true"]
    ```html
    <div class="resp-img">
      <amp-img alt="flowers"
        src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
        layout="responsive"
        width="640"
        height="427"></amp-img>
    </div>
    ```
  [/example]</pre></div>

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

### Escapezeichen in Mustache Templates

Hier ein `top-frame` Beispiel mit einem Remote Endpoint. Für Mustache Templates müssen in Beispielen die Escapezeichen <code>{% raw %}</code> und <code>{% endraw %}</code> verwendet werden:

<div class="ap-m-code-snippet">
  <pre>[example preview="top-frame"
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

Andere Seiten verlinkst du mit der standardmäßigen Markdown Link Syntax:

```md
 [link](../../../courses/beginning-course/index.md)
```

Bei der Verlinkung einer anderen Seite auf amp.dev ist die Referenz ein relativer Dateipfad zur Zieldatei.

### Anchors

Anker dienen der Verknüpfung mit bestimmten Abschnitten in einem Dokument:

```md
[link to example section](#example-section)
```

Bitte erstelle das Ankerziel mithilfe von `<a name="#anchor-name></a>`, bevor du mit einem Abschnitt verknüpfst, der keinen Anker enthält. Eine gute Position dafür ist das Ende der Abschnittsüberschrift:

```html
## Example section <a name="example-section"></a>

```

You must only use letters, digits, the dash and the underscore in an anchor. Please use short anchor names in english that match the headline or describe the section. Ensure the anchor name is unique inside the document.

Wenn eine Seite übersetzt wird, dürfen die Ankernamen nicht geändert werden und müssen in englischer Sprache bleiben.

When you create an anchor that will be used in a link from another page you should also create the same anchor in all translations.

### AMP format filter

Component documentation, guides and tutorials and examples are filterable by AMP format, such as AMP websites or AMP stories. When linking out to such a page you should explicitly specify a format, which is supported by the target, by appending the format parameter to the link:

```md
 [link](../../learn/amp-actions-and-events.md?format=websites)
```

Only when you are sure the target supports **all** the formats that your page does you can omit the parameter.

### Component references

Ein Link zur Referenzdokumentation einer Komponente verweist automatisch auf die neueste Version, sofern dein Link keine Versionsangabe enthält. Wenn du ausdrücklich auf eine bestimmte Version verweisen möchtest, gib den vollständigen Namen an:

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
   <td>
<strong>Do</strong>
   </td>
   <td>
<strong>Don’t</strong>
   </td>
  </tr>
  <tr>
   <td>hello-world-tutorial.md    </td>
   <td>hello_world_tutorial.md    </td>
  </tr>
  <tr>
   <td>website-fundamentals.md    </td>
   <td>websiteFundamentals.md    </td>
  </tr>
  <tr>
   <td>actions-and-events.md    </td>
   <td>actionsandevents.md    </td>
  </tr>
</table>
