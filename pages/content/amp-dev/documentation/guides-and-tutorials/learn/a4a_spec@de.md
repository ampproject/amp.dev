---
'$title': Spezifikation für AMP für Ads
$order: 3
formats:
  - ads
teaser:
  text: _Wenn du Änderungen am Standard vorschlagen möchtest, hinterlasse bitte einen Kommentar bei [Intent
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/amp-a4a-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

_Wenn du Änderungen am Standard vorschlagen möchtest, hinterlasse bitte einen Kommentar bei [Intent to Implement](https://github.com/ampproject/amphtml/issues/4264)_.

AMPHTML Ads sind ein Mechanismus zum Rendern schneller, leistungsfähiger Ads auf AMP Seiten. Um sicherzustellen, dass AMPHTML Ad Dokumente ("AMP Creatives") schnell und reibungslos im Browser gerendert werden können und die Benutzererfahrung nicht beeinträchtigen, müssen AMP Creatives gewisse Validierungsregeln erfüllen. Ähnlich wie bei den [Regeln für das AMP Format](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml) erlauben AMPHTML Ads nur eine begrenzte Anzahl von Tags, Funktionen und Erweiterungen.

## Regeln für das Format von AMPHTML Ads <a name="amphtml-ad-format-rules"></a>

Sofern nachstehend nicht anders angegeben, muss das Creative alle Regeln erfüllen, die im Dokument [Regeln für das AMP Format](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml.html) angeführt sind und auf die hier Bezug genommen wird. Beispielsweise weicht die [Boilerplate](#boilerplate) für AMPHTML Ads von der standardmäßigen AMP Boilerplate ab.

Zusätzlich dazu müssen Creatives die folgenden Regeln befolgen:

<table>
<thead><tr>
  <th>Regel</th>
  <th>Begründung</th>
</tr></thead>
<tbody>
<tr>
<td>Sie müssen von den Tags <code>&lt;html ⚡4ads></code> oder <code>&lt;html amp4ads></code> eingeschlossen sein.</td>
<td>Ermöglicht Validierungstools, ein Creative Dokument entweder als allgemeines AMP Dokument oder als eingeschränktes AMPHTML Ad Dokument zu identifizieren und entsprechend abzufertigen.</td>
</tr>
<tr>
<td>Als Runtime Skript muss <code>&lt;script async src="https://ampjs.org/amp4ads-v0.js">&lt;/script></code> anstelle von <code>https://ampjs.org/v0.js</code> eingebunden sein.</td>
<td>Das ermöglicht maßgeschneidertes Runtime Verhalten für AMPHTML Ads, die in Cross-Origin iframes bereitgestellt werden.</td>
</tr>
<tr>
<td>Das Tag <code>&lt;link rel="canonical"></code> darf nicht verwendet werden.</td>
<td>Ad Creatives haben keine "kanonische Nicht-AMP Version" und werden nicht unabhängig für die Suche indexiert, was eine Selbstreferenzierung unnötig macht.</td>
</tr>
<tr>
<td>Optionale Meta Tags können im HTML Kopf als Kennung im Format <code>&lt;meta name="amp4ads-id" content="vendor=${vendor},type=${type},id=${id}"></code> verwendet werden. Solche Meta Tags müssen vor dem Skript <code>amp4ads-v0.js</code> platziert werden. Die Werte von <code>vendor</code> und <code>id</code> sind Strings, die nur die Zeichen [0-9a-zA-Z_-] enthalten. Der Wert von <code>type</code> ist entweder <code>creative-id</code> oder <code>impression-id</code>.</td>
<td>Mit diesen benutzerdefinierten Kennungen können Impressionen und Creatives identifiziert werden. Das kann bei der Berichterstellung und Fehlersuche hilfreich sein.<br><br><p>Beispiel:</p>
<pre>
&lt;meta name="amp4ads-id"
  content="vendor=adsense,type=creative-id,id=1283474">
&lt;meta name="amp4ads-id"
  content="vendor=adsense,type=impression-id,id=xIsjdf921S"></pre>
</td>
</tr>
<tr>
<td>Das Nachverfolgen der Sichtbarkeit mit <code>&lt;amp-analytics></code> darf nur den Selektor full-ad via <code>"visibilitySpec": { "selector": "amp-ad" }</code> zum Ziel haben (siehe dazu <a href="https://github.com/ampproject/amphtml/issues/4018">Issue #4018</a> und <a href="https://github.com/ampproject/amphtml/pull/4368">PR #4368</a>). Insbesondere darf die Komponente keine Selektoren zum Ziel haben, um auf Elemente innerhalb des Ad Creative zuzugreifen.</td>
<td>In manchen Fällen werden AMPHTML Ads ein Ad Creative in einem iframe rendern. In solchen Fällen kann das Analysetool der Hostseite trotzdem nur das gesamte iframe zum Ziel haben und erhält keinen Zugriff auf Selektoren unterer Ebenen.<br><br> <p>Beispiel:</p> <pre>
&lt;amp-analytics id="nestedAnalytics">
  &lt;script type="application/json">
  {
    "requests": {
      "visibility": "https://example.com/nestedAmpAnalytics"
    },
    "triggers": {
      "visibilitySpec": {
      "selector": "amp-ad",
      "visiblePercentageMin": 50,
      "continuousTimeMin": 1000
      }
    }
  }
  &lt;/script>
&lt;/amp-analytics>
</pre> <p>Diese Konfiguration sendet eine Anfrage an die URL <code>https://example.com/nestedAmpAnalytics</code>, wenn 50 % der umschließenden Ad 1 Sekunde lang ununterbrochen auf dem Bildschirm sichtbar waren.</p>
</td>
</tr>
</tbody>
</table>

### Boilerplate <a name="boilerplate"></a>

AMPHTML Ad Creatives erfordern eine andere, wesentlich einfachere Zeile für Boilerplate Stil als die [allgemeinen AMP Dokumente](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md):

[sourcecode:html]

<style amp4ads-boilerplate>
  body {
    visibility: hidden;
  }
</style>

[/sourcecode]

_Begründung:_ Der Stil `amp-boilerplate` blendet den Inhalt des Hauptteils aus, bis die AMP Runtime bereit ist und ihn wieder einblenden kann. Wenn JavaScript deaktiviert ist oder die AMP Runtime nicht geladen werden kann, stellt die standardmäßige Boilerplate sicher, dass der Inhalt letztendlich trotzdem angezeigt wird. Für AMPHTML Ads gilt jedoch: Wenn JavaScript vollständig deaktiviert ist, werden AMPHTML Ads nicht ausgeführt und die Ad wird niemals eingeblendet. Das macht die Sektion `<noscript>` in diesem Fall überflüssig. Ohne die AMP Runtime sind die meisten Mechaniken, auf die AMPHTML Ads angewiesen sind (z. B. Analysetools zur Sichtbarkeitsverfolgung oder `amp-img` für die Inhaltsanzeige), nicht verfügbar. Somit ist es besser, auf die Anzeige der Ad gänzlich zu verzichten, als eine fehlerhafte Ad anzuzeigen.

Und zu guter Letzt verwendet die AMPHTML Ad Boilerplate `amp-a4a-boilerplate` anstelle von `amp-boilerplate`, damit Validationstools sie einfacher identifizieren und präzisere Fehlermeldungen erstellen können, die Entwicklern weiterhelfen.

Beachte, dass für Mutationen im Text der Boilerplate die gleichen Regeln gelten wie für Mutationen in der [allgemeinen AMP Boilerplate](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md).

### CSS <a name="css"></a>

<table>
<thead><tr>
  <th>Regel</th>
  <th>Begründung</th>
</tr></thead>
<tbody>
  <tr>
    <td>
<code>position:fixed</code> und <code>position:sticky</code> sind im CSS von Creatives nicht zulässig.</td>
    <td>Mit <code>position:fixed</code> wird das Shadow DOM, vom dem AMPHTML Ads abhängig sind, verlassen. Außerdem dürfen Ads in AMP keine feste Position haben.</td>
  </tr>
  <tr>
    <td>
<code>touch-action</code> ist nicht zulässig.</td>
    <td>Eine Ad, die <code>touch-action</code> manipulieren kann, kann die Fähigkeit der Benutzer beeinträchtigen, durch das Hostdokument zu scrollen.</td>
  </tr>
  <tr>
    <td>Das CSS des Creatives ist auf 20.000 Byte begrenzt.</td>
    <td>Große CSS Blöcke blähen das Creative unnötig auf, erhöhen die Netzwerklatenz und beeinträchtigen die Leistung der Seite.</td>
  </tr>
  <tr>
    <td>Übergänge und Animationen unterliegen zusätzlichen Einschränkungen.</td>
    <td>AMP muss in der Lage sein, alle zu einer Ad gehörenden Animationen zu kontrollieren, damit sie angehalten werden können, wenn die Ad nicht mehr auf dem Bildschirm angezeigt wird oder die Systemressourcen sehr niedrig sind.</td>
  </tr>
  <tr>
    <td>Anbieterspezifische Präfixe werden zum Zweck der Validierung als Aliase für dasselbe Symbol ohne Präfix gehandhabt. Das bedeutet: Wenn das Symbol <code>foo</code> von CSS Validierungsregeln verboten ist, dann ist das Symbol <code>-vendor-foo</code> ebenfalls verboten.</td>
    <td>Einige Eigenschaften mit Anbieterpräfix bieten äquivalente Funktionen zu Eigenschaften, die gemäß diesen Regeln verboten oder eingeschränkt sind. <br><br><p>Beispiel: <code>-webkit-transition</code> und <code>-moz-transition</code> werden beide als Aliase für <code>transition</code> gehandhabt. Sie sind nur in Kontexten zulässig, in denen auch <code>transition</code> zulässig wäre (siehe Abschnitt <a href="#selectors">Selektoren</a> weiter unten). </p>
</td>
  </tr>
</tbody>
</table>

#### CSS Animationen und Übergänge <a name="css-animations-and-transitions"></a>

##### Selektoren <a name="selectors"></a>

Die Eigenschaften `transition` und `animation` sind nur für Selektoren zulässig, die:

- nur die Eigenschaften `transition`, `animation`, `transform`, `visibility` oder `opacity` enthalten.

  _Begründung:_ Auf diese Weise kann die AMP Runtime diese Klasse aus dem Kontext entfernen, um Animationen zu deaktivieren, wenn dies für die Seitenleistung erforderlich ist.

**Gut**

[sourcecode:css]
.box {
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

**Schlecht**

Die Eigenschaft ist nicht in der CSS Klasse zulässig.

[sourcecode:css]
.box {
color: red; // non-animation property not allowed in animation selector
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

##### Eigenschaften für Übergänge und Animationen <a name="transitionable-and-animatable-properties"></a>

Die einzigen Eigenschaften, die einen Übergang haben können, sind "opacity" und "transform". ([Begründung](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/))

**Gut**

[sourcecode:css]
transition: transform 2s;
[/sourcecode]

**Schlecht**

[sourcecode:css]
transition: background-color 2s;
[/sourcecode]

**Gut**

[sourcecode:css]
@keyframes turn {
from {
transform: rotate(180deg);
}

to {
transform: rotate(90deg);
}
}
[/sourcecode]

**Schlecht**

[sourcecode:css]
@keyframes slidein {
from {
margin-left: 100%;
width: 300%;
}

to {
margin-left: 0%;
width: 100%;
}
}
[/sourcecode]

### Zulässige AMP Erweiterungen und Builtins <a name="allowed-amp-extensions-and-builtins"></a>

Die folgenden AMP Erweiterungsmodule und integrierten AMP Tags sind in einem AMPHTML Ad Creative _zulässig_. Erweiterungen und integrierte Tags, die nicht explizit aufgeführt sind, sind verboten.

- [amp-accordion](https://amp.dev/documentation/components/amp-accordion)
- [amp-ad-exit](https://amp.dev/documentation/components/amp-ad-exit)
- [amp-analytics](https://amp.dev/documentation/components/amp-analytics)
- [amp-anim](https://amp.dev/documentation/components/amp-anim)
- [amp-animation](https://amp.dev/documentation/components/amp-animation)
- [amp-audio](https://amp.dev/documentation/components/amp-audio)
- [amp-bind](https://amp.dev/documentation/components/amp-bind)
- [amp-carousel](https://amp.dev/documentation/components/amp-carousel)
- [amp-fit-text](https://amp.dev/documentation/components/amp-fit-text)
- [amp-font](https://amp.dev/documentation/components/amp-font)
- [amp-form](https://amp.dev/documentation/components/amp-form)
- [amp-img](https://amp.dev/documentation/components/amp-img)
- [amp-layout](https://amp.dev/documentation/components/amp-layout)
- [amp-lightbox](https://amp.dev/documentation/components/amp-lightbox)
- amp-mraid, auf experimenteller Basis. Wenn du dieses Tag verwenden möchtest, erstelle bitte ein Issue unter [wg-monetization](https://github.com/ampproject/wg-monetization/issues/new).
- [amp-mustache](https://amp.dev/documentation/components/amp-mustache)
- [amp-pixel](https://amp.dev/documentation/components/amp-pixel)
- [amp-position-observer](https://amp.dev/documentation/components/amp-position-observer)
- [amp-selector](https://amp.dev/documentation/components/amp-selector)
- [amp-social-share](https://amp.dev/documentation/components/amp-social-share)
- [amp-video](https://amp.dev/documentation/components/amp-video)

Den meisten Auslassungen liegt entweder der Gedanke der Leistungssteigerung oder der Vereinfachung der Analyse von AMPHTML Ads zugrunde.

_Beispiel:_ `<amp-ad>` ist in dieser Liste nicht aufgeführt. Das Tag ist ausdrücklich verboten, da die Verwendung von `<amp-ad>` innerhalb von `<amp-ad>` zu einer unbegrenzten Kaskade von geladenen Ads führen kann, was den Leistungszielen von AMPHTML Ads widerspricht.

_Beispiel:_ `<amp-iframe>` ist in dieser Liste nicht aufgeführt. Das Tag ist verboten, weil Ads damit beliebiges JavaScript ausführen und externe Inhalte laden könnten. Wenn Ads solche Funktionen nutzen möchten, dann sollte der Eintrag <a>a4aRegistry</a> den Wert <code>false</code> zurückgeben und sie sollten den bereits vorhandenen Mechanismus '3p iframe' zum Rendern von Ads verwenden.

_Beispiel:_ `<amp-facebook>`, `<amp-instagram>`, `<amp-twitter>` und `<amp-youtube>` sind aus demselben Grund wie `<amp-iframe>` nicht aufgeführt: Sie alle erstellen iframes und können darin potenziell unbegrenzte Ressourcen verbrauchen.

_Beispiel:_ Die Tags `<amp-ad-network-*-impl>` sind in dieser Liste nicht aufgeführt. Das Tag `<amp-ad>` übernimmt die Delegation an diese Implementierungstags. Creatives sollten nicht versuchen, sie direkt einzubinden.

_Beispiel:_ `<amp-lightbox>` ist noch nicht in der Liste aufgeführt, da auch einige AMPHTML Ad Creatives in einem iframe gerendert werden könnten und es derzeit keinen Mechanismus gibt, mit dem eine Ad über einen iframe hinaus erweitert werden kann. Die Unterstützung dafür könnte in Zukunft implementiert werden, falls Bedarf besteht.

### HTML Tags <a name="html-tags"></a>

Die folgenden Tags sind in einem AMPHTML Ad Creative _zulässig_. Tags, die nicht ausdrücklich erlaubt sind, sind verboten. Diese Liste ist eine Teilmenge der allgemeinen [ergänzenden Zulassungsliste für AMP Tags](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/../../spec/amp-tag-addendum.md). Genau wie die Zulassungsliste orientiert sich auch diese Liste in ihrer Anordnung an der HTML5 Spezifikation im Abschnitt 4 von [The Elements of HTML](http://www.w3.org/TR/html5/single-page.html#html-elements).

Den meisten Auslassungen liegt entweder der Gedanke der Leistungssteigerung oder die Tatsache zugrunde, dass die Tags nicht dem HTML5 Standard entsprechen. Zum Beispiel wurde `<noscript>` weggelassen, weil AMPHTML Ads aktiviertes JavaScript voraussetzen. Der Block `<noscript>` würde also niemals ausgeführt werden und bläht das Creative auf Kosten von Bandbreite und Latenz nur unnötig auf. Ähnlich dazu sind auch `<acronym>`, `<big>` und andere verboten, da sie nicht HTML5 kompatibel sind.

#### 4.1 Das Stammelement <a name="41-the-root-element"></a>

4.1.1 `<html>`

- Muss die Typen `<html ⚡4ads>` oder `<html amp4ads>` verwenden

#### 4.2 Metadaten des Dokuments <a name="42-document-metadata"></a>

4.2.1 `<head>`

4.2.2 `<title>`

4.2.4 `<link>`

- Die Tags `<link rel=...>` sind nicht zulässig, mit Ausnahme von `<link rel=stylesheet>`.

- **Hinweis:** Anders als bei allgemeinem AMP sind die Tags `<link rel="canonical">` verboten.

  4.2.5 `<style>` 4.2.6 `<meta>`

#### 4.3 Sektionen <a name="43-sections"></a>

4.3.1 `<body>` 4.3.2 `<article>` 4.3.3 `<section>` 4.3.4 `<nav>` 4.3.5 `<aside>` 4.3.6 `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, and `<h6>` 4.3.7 `<header>` 4.3.8 `<footer>` 4.3.9 `<address>`

#### 4.4 Gruppieren von Inhalten <a name="44-grouping-content"></a>

4.4.1 `<p>` 4.4.2 `<hr>` 4.4.3 `<pre>` 4.4.4 `<blockquote>` 4.4.5 `<ol>` 4.4.6 `<ul>` 4.4.7 `<li>` 4.4.8 `<dl>` 4.4.9 `<dt>` 4.4.10 `<dd>` 4.4.11 `<figure>` 4.4.12 `<figcaption>` 4.4.13 `<div>` 4.4.14 `<main>`

#### 4.5 Semantische Tags für Text <a name="45-text-level-semantics"></a>

4.5.1 `<a>` 4.5.2 `<em>` 4.5.3 `<strong>` 4.5.4 `<small>` 4.5.5 `<s>` 4.5.6 `<cite>` 4.5.7 `<q>` 4.5.8 `<dfn>` 4.5.9 `<abbr>` 4.5.10 `<data>` 4.5.11 `<time>` 4.5.12 `<code>` 4.5.13 `<var>` 4.5.14 `<samp>` 4.5.15 `<kbd >` 4.5.16 `<sub>` and `<sup>` 4.5.17 `<i>` 4.5.18 `<b>` 4.5.19 `<u>` 4.5.20 `<mark>` 4.5.21 `<ruby>` 4.5.22 `<rb>` 4.5.23 `<rt>` 4.5.24 `<rtc>` 4.5.25 `<rp>` 4.5.26 `<bdi>` 4.5.27 `<bdo>` 4.5.28 `<span>` 4.5.29 `<br>` 4.5.30 `<wbr>`

#### 4.6 Bearbeitung <a name="46-edits"></a>

4.6.1 `<ins>` 4.6.2 `<del>`

#### 4.7 Eingebettete Inhalte <a name="47-embedded-content"></a>

- Eingebettete Inhalte werden nur über AMP Tags wie `<amp-img>` oder `<amp-video>` unterstützt.

#### 4.7.4 `<source>` <a name="474-source"></a>

#### 4.7.18 SVG <a name="4718-svg"></a>

SVG Tags befinden sich nicht im HTML5 Namespace. Sie sind unten ohne Sektions-IDs aufgeführt.

` <svg>``<g>``<path>``<glyph>``<glyphref>``<marker>``<view>``<circle>``<line>``<polygon>``<polyline>``<rect>``<text>``<textpath>``<tref>``<tspan>``<clippath>``<filter>``<lineargradient>``<radialgradient>``<mask>``<pattern>``<vkern>``<hkern>``<defs>``<use>``<symbol>``<desc>``<title> `

#### 4.9 Tabellendaten <a name="49-tabular-data"></a>

4.9.1 `<table>` 4.9.2 `<caption>` 4.9.3 `<colgroup>` 4.9.4 `<col>` 4.9.5 `<tbody>` 4.9.6 `<thead>` 4.9.7 `<tfoot>` 4.9.8 `<tr>` 4.9.9 `<td>` 4.9.10 `<th>`

#### 4.10 Formen <a name="410-forms"></a>

4.10.8 `<button>`

#### 4.11 Skripte <a name="411-scripting"></a>

- Genau wie in einem allgemeinen AMP Dokument muss das Tag `<head>` des Creatives das Tag `<script async src="https://ampjs.org/amp4ads-v0.js"></script>` enthalten.
- Im Gegensatz zu allgemeinem AMP ist `<noscript>` verboten.
  - _Begründung:_ Da JavaScript für die Funktion von AMPHTML Ads aktiviert sein muss, erfüllt der Block `<noscript>` in einer AMPHTML Ad keinen Zweck und verbraucht nur unnötig Bandbreite.
- Im Gegensatz zu allgemeinem AMP ist `<script type="application/ld+json">` verboten.
  - _Begründung:_ JSON LD wird für das Markup strukturierter Daten auf Hostseiten verwendet. Ad Creatives sind jedoch keine eigenständigen Dokumente und enthalten keine strukturierten Daten. Darin enthaltene JSON LD Blöcke würden nur unnötig Bandbreite verbrauchen.
- Alle anderen Skriptregeln und Ausnahmen werden von allgemeinem AMP übernommen.
