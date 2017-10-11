---
$title: Unterstützte CSS-Stile
---
[TOC]

Wie bei allen Webseiten werden auch bei AMP-Seiten CSS-Stile verwendet, aber abgesehen von [benutzerdefinierten Schriftarten](#die-ausnahme:-benutzerdefinierte-schriftarten) können Sie nicht auf externe Stylesheets verweisen.
Außerdem sind bestimmte Stile wegen der Auswirkungen auf die Leistung unzulässig und auch Inline-Stilattribute sind nicht erlaubt.

Alle Stile müssen im head-Abschnitt des Dokuments angegeben werden (siehe [Seite mit Stilen versehen](/de/docs/guides/debug/validate.html)).
Sie können allerdings CSS-Präprozessoren und Vorlagen verwenden, um statische Seiten für die bessere Verwaltung Ihrer Inhalte zu erstellen.

{% call callout('Note', type='note') %}
Für AMP-Komponenten stehen Standardstile zur Verfügung, um die Erstellung responsiver Seiten zu vereinfachen.
Diese Stile werden in [`amp.css`](https://github.com/ampproject/amphtml/blob/master/css/amp.css) definiert.
{% endcall %}

## CSS-Präprozessoren verwenden

Die von Präprozessoren erzeugte Ausgabe funktioniert in AMP ebenso gut wie auf jeder anderen Webseite.
Die Website [ampproject.org](https://www.ampproject.org/) verwendet z. B. [Sass](http://sass-lang.com/).
Wir verwenden [Grow](http://grow.io/) zum Erstellen der statischen AMP-Seiten, aus denen die Website [ampproject.org](https://www.ampproject.org/) besteht.

Achten Sie bei der Verwendung von Präprozessoren besonders darauf, was Sie einschließen. Laden Sie nur das, was Ihre Seiten auch verwenden.
Zum Beispiel enthält [head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html) das gesamte erforderliche AMP-Markup sowie die Inline-CSS-Stile aus den `*.scss`-Quelldateien.
Unter anderem enthält es auch das Skript für benutzerdefinierte Elemente für [`amp-youtube`](/docs/reference/extended/amp-youtube.html), sodass auf vielen Seiten der Website YouTube-Videos eingebettet werden können.

[sourcecode:html] {% raw %}
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}Accelerated Mobile Pages Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}Accelerated Mobile Pages Project">

  <title>Accelerated Mobile Pages Project</title>
  <link rel="shortcut icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="https://www.ampproject.org{{doc.url.path}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet" type="text/css">
  <style amp-custom>
  {% include "/assets/css/main.min.css" %}
  </style>

  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
  <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
  <script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"></script>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
</head>
{% endraw %} [/sourcecode]

Wenn Sie wissen möchten, wie der obige Code in formatiertem AMP-HTML aussieht, sehen Sie sich den Quellcode einer beliebigen Seite in [ampproject.org](https://www.ampproject.org/) an.
In Chrome klicken Sie dazu mit der rechten Maustaste und wählen `View Page Source` aus.

## Unzulässige Stile

Die folgenden Stile sind auf AMP-Seiten nicht erlaubt:

<table>
  <thead>
    <tr>
      <th data-th="Banned style">Unzulässiger Stil</th>
      <th data-th="Description">Beschreibung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">Inline-Stilattribute</td>
      <td data-th="Description">Alle Stile müssen im <code>&lt;head&gt;</code>-Abschnitt der Seite in einem <code>&lt;style amp-custom&gt;</code>-Tag definiert werden.</td>
    </tr>
    <tr>
      <td data-th="Banned style">Qualifizierer <code>!important</code> </td>
      <td data-th="Description">Darf nicht verwendet werden.
      Andernfalls können die AMP-Regeln zur Festlegung der Elementgröße nicht angewandt werden.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel="stylesheet"&gt;</code></td>
      <td data-th="Description">Unzulässig mit Ausnahme <a href="#die-ausnahme:-benutzerdefinierte-schriftarten">benutzerdefinierter Schriftarten</a></td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>*</code> (Universalselektor)</td>
      <td data-th="Description">Negative Auswirkungen auf die Leistung. Könnte zur Umgehung anderer Selektoreinschränkungen verwendet werden</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>:not()</code></td>
      <td data-th="Description">Könnte zur Simulation des Universalselektors verwendet werden</td>
    </tr>
    <tr>
      <td data-th="Banned style">Pseudoselektoren, Pseudoklassen und Pseudoelemente</td>
      <td data-th="Description">Pseudoselektoren, Pseudoklassen und Pseudoelemente sind nur in Selektoren erlaubt, die Tag-Namen enthalten, die wiederum nicht mit <code>amp-</code> beginnen dürfen.
      Zulässig sind z. B. <code>a:hover, div:last-of-type</code>. Unzulässig sind beispielsweise <code>amp-img:hover, amp-img:last-of-type</code>.</td>
    </tr>
    <tr>
      <td data-th="Banned style">Klassennamen mit <code>-amp-</code> und Tag-Namen mit <code>i-amp-</code></td>
      <td data-th="Description">Klassennamen in Autoren-Stylesheets dürfen nicht mit dem String <code>-amp-</code> beginnen. Solche Stylesheets sind für den internen Gebrauch durch die AMP-Laufzeit vorgesehen. Folglich darf das Stylesheet des Nutzers nicht auf CSS-Selektoren für Klassen mit <code>-amp-</code> und Tags mit <code>i-amp</code> verweisen.</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>behavior</code>, <code>-moz-binding</code></td>
      <td data-th="Description">Diese Eigenschaften sind aus Sicherheitsgründen nicht zulässig.</td>
    </tr>
  </tbody>
</table>

## transition- und animation-Eigenschaften auf der weißen Liste

In AMP sind nur Übergänge und Animationen von Eigenschaften gestattet, die in üblichen Browsern von der GPU beschleunigt werden können.
Im AMP-Projekt befinden sich derzeit `opacity`, `transform` und `-vendorPrefix-transform` auf der weißen Liste.

In den folgenden Beispielen muss `<property>` auf die weiße Liste gesetzt sein:

* `transition <property> (Also -vendorPrefix-transition)`
* @ `@keyframes name { from: {<property>: value} to {<property: value>} } (also @-vendorPrefix-keyframes)`

Die `overflow`-Eigenschaft sowie `overflow-y` und `overflow-x` dürfen nicht als “auto” oder “scroll” definiert werden.
Benutzerdefinierte Elemente in einem AMP-Dokument dürfen keine Bildlaufleiste enthalten.

## Die Ausnahme: benutzerdefinierte Schriftarten

Abgesehen von benutzerdefinierten Schriftarten dürfen AMP-Seiten keine externen Stylesheets enthalten.
Die zwei unterstützten Methoden für den Verweis auf benutzerdefinierte Schriftarten sind link-Tags zur Angabe von Schriftartenanbietern auf der weißen Liste sowie die Verwendung von `@font-face`.

Schriftartenanbieter können nur auf die weiße Liste gesetzt werden, wenn sie CSS-spezifische Integrationen unterstützen und wenn die Bereitstellung über HTTPS erfolgt. Derzeit befinden sich nur die folgenden Quellen auf der weißen Liste und sind zur Bereitstellung von Schriftarten über link-Tags zulässig:

* [https://fast.fonts.net](https://fast.fonts.net)
* [https://fonts.googleapis.com](https://fonts.googleapis.com)

Beispiel für link-Tag, das auf den auf der weißen Liste befindlichen Schriftartenanbieter Google Fonts verweist:

[sourcecode:html]
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

Alternativ kann [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) verwendet werden.
Über `@font-face` angegebene Schriftarten müssen über das HTTP- oder HTTPS-Schema abgerufen werden.
