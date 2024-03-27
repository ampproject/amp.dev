---
"$title": Supported CSS
description: Wie alle Webseiten werden auch AMP Seiten mit CSS gestaltet. Du kannst jedoch nicht auf externe Stylesheets verweisen (mit Ausnahme von benutzerdefinierten Schriftarten …
formats:
- websites
- email
- ads
- stories
author: Meggin
contributors:
- pbakaus
- CrystalOnScript
- bpaduch
- choumx
---

[filter formats="email"] Hinweis: AMP für E-Mail wendet zusätzliche CSS Einschränkungen an, die unter [AMP für E-Mail: Unterstütztes CSS](../../../../documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md) beschrieben sind. [/filter]

Like all web pages, AMP pages are styled with CSS, but you can’t reference external stylesheets (with the exception of [custom fonts](#the-custom-fonts-exception)). Also certain styles are disallowed due to performance implications.

Styles können entweder im Header des Dokuments oder inline als `style` Attribute angegeben werden (siehe [Füge Styles zu einer Seite hinzu](index.md#add-styles-to-a-page)). Du kannst jedoch CSS Präprozessoren und Vorlagen verwenden, um statische Seiten zu erstellen und deine Inhalte besser zu verwalten.

[tip type="note"] **HINWEIS:** AMP Komponenten werden mit Standardstyles bereitgestellt, um das Erstellen responsiver Seiten relativ einfach zu gestalten. Diese Styles werden  in [`amp.css`](https://github.com/ampproject/amphtml/blob/main/css/amp.css) definiert. [/tip]

## Unzulässige Styles

The following styles aren’t allowed in AMP pages:

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">Verbotener Style</th>
      <th data-th="Description">Beschreibung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">
<code>!important</code> qualifier </td>
      <td data-th="Description">Die Verwendung und das Verweisen auf <code>!important</code> sind nicht zulässig.       Dies ist eine notwendige Voraussetzung, damit AMP eigene Regeln für die Elementgröße durchsetzen kann.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel=”stylesheet”></code></td>
      <td data-th="Description">Mit Ausnahme von <a href="#the-custom-fonts-exception">benutzerdefinierten Schriftarten</a> nicht zulässig.</td>
    </tr>
    <tr>
      <td data-th="Banned style"> <code>i-amphtml-</code> Klasse und <code>i-amphtml-</code> Tagnamen.</td>
      <td data-th="Description">Der Validator verbietet Namen von Klassen und Tags mit dem folgenden regulären Ausdruck regex `(^|\W)i-amphtml-`. Diese sind für den internen Gebrauch durch das AMP Framework reserviert. Daraus folgt, dass das Stylesheet des Benutzers möglicherweise nicht auf CSS Selektoren für <code>i-amphtml-</code> Klassen und Tags verweist.</td>
    </tr>
  </tbody>
</table>

## Empfehlungen zur Leistung

Diese zulässigen Styles sollten die Werte wie folgt beschränken, um die Leistung zu optimieren:

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">Eingeschränkter Style</th>
      <th data-th="Description">Beschreibung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Restricted style"> <code>transition</code> Eigenschaft</td>
      <td data-th="Description">Nur GPU-beschleunigte Eigenschaften (derzeit <code>opacity</code>, <code>transform</code> und <code>-vendorPrefix-transform</code>).</td>
    </tr>
    <tr>
      <td data-th="Restricted style"><code>@keyframes {...}</code></td>
      <td data-th="Description">Nur GPU-beschleunigte Eigenschaften (derzeit <code>opacity</code>, <code>transform</code> und <code>-vendorPrefix-transform</code>).</td>
    </tr>
  </tbody>
</table>

## Ausnahme für benutzerdefinierte Schriftarten <a name="the-custom-fonts-exception"></a>

AMP Seiten dürfen keine externen Stylesheets enthalten, mit Ausnahme von benutzerdefinierten Schriftarten.

[tip type="read-on"] **READ ON –** Learn more about [custom fonts in AMP](custom_fonts.md). [/tip]

## Verwenden von CSS Präprozessoren <a name="using-css-preprocessors"></a>

Die generierte Ausgabe von Präprozessoren funktioniert in AMP genauso gut wie auf jeder anderen Webseite. Die [amp.dev](https://amp.dev/) Website verwendet beispielsweise [Sass](http://sass-lang.com/). (Wir verwenden [Grow](http://grow.io/), um die statischen AMP Seiten zu erstellen, aus denen die [amp.dev](https://amp.dev/) Website besteht.)

When using preprocessors, pay special attention to what you include; load only what your pages use. For example, the [head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html) includes all required AMP mark-up and the inlined CSS from the `*.scss` source files. It also includes the custom element script for [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md), among others, so that many pages across the site can include embedded youtube videos.

[sourcecode:html]{% raw %}

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">

  <title>AMP Project</title>
  <link rel="icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="{{doc.url}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet">
  <style amp-custom>
  {% include "/assets/css/main.min.css" %}
  </style>

  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://ampjs.org/v0.js"></script>
  <script async custom-element="amp-carousel" src="https://ampjs.org/v0/amp-carousel-0.1.js"></script>
  <script async custom-element="amp-analytics" src="https://ampjs.org/v0/amp-analytics-0.1.js"></script>
  <script async custom-element="amp-lightbox" src="https://ampjs.org/v0/amp-lightbox-0.1.js"></script>
  <script async custom-element="amp-youtube" src="https://ampjs.org/v0/amp-youtube-0.1.js"></script>
  <script async custom-element="amp-sidebar" src="https://ampjs.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-element="amp-iframe" src="https://ampjs.org/v0/amp-iframe-0.1.js"></script>
</head>
{% endraw %}[/sourcecode]

To see how the above translates into formatted AMP HTML, view the source for any page in [amp.dev](https://amp.dev/). (In Chrome, right-click and `View Page Source`.)
