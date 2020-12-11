---
"$title": Leitfäden & Tutorials formatieren
"$order": '3'
description: Formatierungsanforderungen für Dateien in amp.dev
formats:
- websites
- stories
- ads
- email
author: CrystalOnScript
---

Leitfäden und Tutorials werden mit einer zusätzlichen Frontmatter und Shortcode Formatierung in [Markdown](https://www.markdownguide.org/) eingereicht.

## Speicherorte für Dokumentationen

Inhalte werden auf amp.dev aus zwei Repositorys abgerufen: [amp.dev](https://github.com/ampproject/amp.dev) und [AMPHTML](https://github.com/ampproject/amphtml). Alle Referenzdokumentationen für Komponenten werden aus AMPHTML abgerufen, entweder aus vordefinierten Elementen oder aus Erweiterungen.

- [Integrierte Komponenten ](https://github.com/ampproject/amphtml/tree/master/builtins)
- [Komponenten](https://github.com/ampproject/amphtml/tree/master/extensions)
- [Kurse](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/courses)
- [Beispiele](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/examples)
- [Leitfäden & Tutorials](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/guides-and-tutorials)

Es gibt mehrere andere Dokumente, die von AMPHTML nach amp.dev importiert werden. Sie sind [in dieser Datei aufgeführt](https://github.com/ampproject/amp.dev/blob/future/platform/config/imports/spec.json). Aktualisiere diese Dokumente nicht im Repository amp.dev, da deine Änderungen sonst in späteren Builds überschrieben werden.

## Frontmatter

Frontmatter steht am Anfang jedes Leitfadens und Tutorials.

Beispiel:

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
   <td>Liste die AMP Erfahrungen auf, für die dein Dokument relevant ist. Wenn dein Dokument für AMP Websites und AMP Storys relevant ist, jedoch nicht für AMP Ads oder AMP E-Mail, sieht dein Frontmatter wie folgt aus:     ```yaml         formats:           - websites           - stories     ```</td>
  </tr>
  <tr>
   <td>
<code>author</code>
   </td>
   <td>Der Autor bist du! Verwende deinen GitHub Benutzernamen.</td>
  </tr>
  <tr>
   <td>
<code>contributors</code>
   </td>
   <td>Nenne alle, die zu deinem Dokument beigetragen haben. Dieses Feld ist optional.</td>
  </tr>
  <tr>
   <td>
<code>description</code>
   </td>
   <td>Beschreibe deinen Leitfaden oder dein Tutorial kurz. Dies hilft bei der Suchmaschinenoptimierung und macht deine Arbeit leichter auffindbar!</td>
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

## Bilder

amp.dev wird mit AMP erstellt! Deshalb müssen unsere Bilder den Kriterien von [`amp-img`](../../../../documentation/components/reference/amp-img.md) entsprechen. Zum Erstellen wird die folgende Syntax verwendet, um Bilder in das korrekte Format `amp-img` zu konvertieren.

<div class="ap-m-code-snippet"><pre>{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/image1.jpg', 500, 369, layout='intrinsic', alt='Image of basic amp script tutorial starter app') }}</pre></div>

## Abschnitte filtern

Einige Dokumente sind möglicherweise für mehrere AMP Formate relevant, aber bestimmte Formate können weitere Erklärungen oder Informationen erfordern, die für andere irrelevant sind. Du kannst diese Abschnitte filtern, indem du sie in den folgenden Shortcode einschließt.

<div class="ap-m-code-snippet"><pre>&amp;lsqb;filter formats="websites"]
This is only visible for [websites](?format=websites).
&amp;lsqb;/filter]

&amp;lsqb;filter formats="websites"]
This is only visible for [websites](?format=websites).
&amp;lsqb;/filter]

&amp;lsqb;filter formats="websites, email"]
This is visible for [websites](?format=websites) &amp; [email](?format=email).
&amp;lsqb;/filter]

&amp;lsqb;filter formats="stories"]
This is visible for [stories](?format=stories).
&amp;lsqb;/filter]</pre></div>

## Tipps

Tipps und Beschriftungen kannst du hinzufügen, indem du Text in den folgenden Shortcode einschließt:

<div class="ap-m-code-snippet"><pre>&amp;lsqb;tip type="default"]
Default tip
[/tip]

&amp;lsqb;tip type="important"]
Important
[/tip]

&amp;lsqb;tip type="note"]
Note
[/tip]

&amp;lsqb;tip type="read-on"]
Read-on
[/tip]</pre></div>

## Code Snippets

Platziere Code Snippets innerhalb von jeweils drei Backticks und gib die Sprache am Ende der ersten Backticks Dreiergruppe an.

<div class="ap-m-code-snippet"><pre>```html
  // code sample
```

```css
  // code sample
```

```js
  // code sample
```</pre></div>

Wenn dein Code doppelt geschweifte Klammern enthält – was häufig der Fall ist, wenn du [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md?format=websites) Templates verwendest –, musst du den Codeteil einschließen:

<div class="ap-m-code-snippet"><pre>```html<br>{% raw	%}<br>  // code with double curly braces<br>{% endraw	%}<br>```</pre></div>

### Code Snippets in Listen

Python Markdown besitzt einige Einschränkungen. Verwende die folgende Syntax, wenn du Code Snippets in Listen aufnimmst:

<div class="ap-m-code-snippet"><pre>&lsqb;sourcecode:html]
      <html>
        <p>Indented content.</p>
      </html>
    &lsqb;/sourcecode]</pre></div>

## Vorschau von Codebeispielen

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

Hinweis: Die Vorschau wird automatisch in das momentan ausgewählte Format umgewandelt, wenn sie im Playground geöffnet wird 🤯!

Verwende das Attribut `preview`, um zu definieren, wie die Vorschau generiert werden soll:

- **none**: Es wird keine Vorschau generiert.

- **inline**: Die Beispielvorschau wird über dem Quellcode angezeigt. Eine Inline Vorschau ist für normale Website Beispiele nur möglich, wenn der Code keine `head` Elemente enthält. Verwende diese Option für kleine Beispiele, die kein Styling oder andere `head` Elemente benötigen (Importe zählen nicht, da sie über das Attribut `imports` angegeben werden).

- **top-frame**: Die Beispielvorschau wird über dem Quellcode in einem iframe angezeigt. Die Ausrichtung kann zwischen dem Modus `portrait` und `landscape` umgeschaltet werden. Du kannst die Ausrichtung durch Angabe des zusätzlichen Attributs vorab auswählen:

- **orientation**: `default: landscape|portrait`

Wenn benutzerdefinierte Elemente benötigt werden, gib diese im Attribut `imports` als kommagetrennte Liste mit dem Namen der Komponente an, gefolgt von einem Doppelpunkt und der Version. Wenn dein Code [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md?format=websites) verwendet, gib die Abhängigkeit stattdessen im Attribut `template` an.

Verwende für E-Mail Inhalte mit Ressourcenlinks den Platzhalter <code>{{server_for_email}}</code> in der Quelle.

### Inline Beispiel

Es folgt eine einfache Einbettung eines Inline Beispiels. CSS kannst du über Inline Styles definieren:

<div class="ap-m-code-snippet"><pre>[example preview="inline" playground="true"]
    ```html
    <div style="background: red; width: 200px; height: 200px;">Hello World</div>
    ```
  [/example]</pre></div>

Das sieht so aus:

[example preview="inline" playground="true"]
```html
<div style="background: red; width: 200px; height: 200px;">Hello World</div>
```
[/example]

Warnung: Inline Beispiele werden direkt in die Seite eingebettet. Dies kann zu Konflikten führen, wenn Komponenten bereits auf der Seite verwendet werden (z. B. `amp-consent`).

### Top-Frame Vorschau

Verwende eine Top-Frame Vorschau, wenn du Header Elemente angeben musst, oder definiere globale Stile in `<style amp-custom>`.

Wichtig: Füge dem Header keinen AMP Boilerplate Code hinzu. Dieser wird auf Basis des AMP Formats automatisch hinzugefügt. Füge dem Header nur Elemente hinzu, die vom Beispiel benötigt werden!

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

Das sieht so aus:

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

### AMP Storys

Verwende `preview="top-frame"` zusammen mit `orientation="portrait"` für die Vorschau von AMP Storys.

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

Das sieht so aus:

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

### Absolute URLs für AMP E-Mail

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

Das sieht so aus:

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

Das sieht so aus:

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

### Anker

Anker dienen der Verknüpfung mit bestimmten Abschnitten in einem Dokument:

```md
[link to example section](#example-section)
```

Bitte erstelle das Ankerziel mithilfe von `<a name="#anchor-name></a>`, bevor du mit einem Abschnitt verknüpfst, der keinen Anker enthält. Eine gute Position dafür ist das Ende der Abschnittsüberschrift:

```html
## Example section <a name="example-section"></a>
```

Im Anker sind nur Buchstaben, Ziffern, Bindestrich und Unterstrich zulässig. Bitte verwende kurze Ankernamen in englischer Sprache, die der Überschrift entsprechen oder den Abschnitt beschreiben. Stelle sicher, dass der Ankername im Dokument einmalig ist.

Wenn eine Seite übersetzt wird, dürfen die Ankernamen nicht geändert werden und müssen in englischer Sprache bleiben.

Wenn du einen Anker erstellst, der in einem Link von einer anderen Seite verwendet wird, musst du in allen Übersetzungen den gleichen Anker erstellen.

### AMP Formatfilter

Dokumentationen für Komponenten, Leitfäden, Tutorials und Beispiele können nach dem AMP Format gefiltert werden, z. B. AMP Websites oder AMP Storys. Wenn du zu einer solchen Seite verlinkst, musst du explizit ein Format angeben, das vom Ziel unterstützt wird: Hänge dazu den Formatparameter an den Link an:

```md
 [link](../../learn/amp-actions-and-events.md?format=websites)
```

Nur wenn du sicher bist, dass das Ziel **alle** Formate deiner Seite unterstützt, kannst du den Parameter weglassen.

### Komponentenreferenzen

Ein Link zur Referenzdokumentation einer Komponente verweist automatisch auf die neueste Version, sofern dein Link keine Versionsangabe enthält. Wenn du ausdrücklich auf eine bestimmte Version verweisen möchtest, gib den vollständigen Namen an:

```md
 [latest version](../../../components/reference/amp-carousel.md?format=websites)
 [explicit version](../../../components/reference/amp-carousel-v0.2.md?format=websites)
```

## Dokumentstruktur

### Titel, Überschriften und Unterabschnitte

Der erste Buchstabe des ersten Wortes in Titeln, Überschriften und Unterabschnitten wird groß geschrieben, der Rest in Kleinbuchstaben. Dies gilt auch für AMP und andere Eigennamen. Eine Überschrift darf nicht `Einführung` heißen, Einführungen folgen auf den Dokumenttitel.

### Dokumente benennen

Verwende Bindestriche im Namen des Dokuments.

<table>
  <tr>
   <td>
<strong>Richtig</strong>
   </td>
   <td>
<strong>Falsch</strong>
   </td>
  </tr>
  <tr>
   <td>hello-world-tutorial.md</td>
   <td>hello_world_tutorial.md</td>
  </tr>
  <tr>
   <td>website-fundamentals.md</td>
   <td>websiteFundamentals.md</td>
  </tr>
  <tr>
   <td>actions-and-events.md</td>
   <td>actionsandevents.md</td>
  </tr>
</table>
