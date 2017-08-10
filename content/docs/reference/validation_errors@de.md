---
$title: AMP-Validierungsfehler
---

<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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

Gültige AMP-Dokumente dürfen keine Validierungsfehler enthalten.
Ziel dieses Dokuments ist es, Ihnen ein besseres Verständnis für Validierungsfehler zu vermitteln, die beim [Validieren von AMP-Seiten](/de/docs/guides/validate.html) auftreten können, und zu erläutern, wie diese behoben werden.
Eine komplette Übersicht aller Validierungsfehler finden Sie in der [Spezifikation des AMP-Validierungstools](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

[TOC]

## Fehler bei AMP-HTML-Tags und -Attributen

### Erforderliches Tag fehlt

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_TAG_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The mandatory tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Erforderliches HTML-Tag hinzufügen oder korrigieren</td>
  </tr>
</table>

Die folgenden Tags müssen in allen AMP-Dokumenten vorhanden sein:

* <a name="doctype"></a>`<!doctype html>`
* <a name="html"></a>`<html amp> or <html ⚡>`
* <a name="head"></a>`<head>`
* <a name="canonical"></a>`<link rel="canonical" href="$SOME_URL">`
* <a name="utf"></a>`<meta charset="utf-8">`
* <a name="viewport"></a>`<meta name="viewport" content="...">`
* <a name="boilerplate"></a>`<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* <a name="ampscript"></a>`<script async src="https://cdn.ampproject.org/v0.js"></script>`
* <a name="body"></a>`<body>`

Diese erforderlichen Tags enthalten das Feld `mandatory: true` in der [Spezifikation des AMP-Validierungstools](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii). Auf sie wird auch in der [AMP-Spezifikation](/docs/reference/spec.html) verwiesen.

### Für ein anderes Tag erforderliches Tag fehlt

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>TAG_REQUIRED_BY_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The '%1' tag is missing or incorrect, but required by '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Entsprechendes HTML-Tag hinzufügen oder korrigieren</td>
  </tr>
</table>

Das Validierungstool gibt den Fehler `TAG_REQUIRED_BY_MISSING` zurück, wenn eine 
erweiterte Komponente im AMP-Dokument ermittelt, das entsprechende `<script>` jedoch nicht gefunden wird.

[Erweiterte Komponenten](/docs/reference/components.html) müssen explizit als benutzerdefinierte Elemente in das AMP-Dokument aufgenommen werden.
Um diese Fehler zu beheben, rufen Sie die Referenzseite der erweiterten Komponente auf, kopieren Sie das erforderliche Skript und fügen es im `<head>` des AMP-Dokuments ein.

### Unzulässiges Tag

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DISALLOWED_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Unzulässiges Tag entfernen</td>
  </tr>
</table>

Da Tags auf die weiße Liste gesetzt werden, gibt es keine definitive Auflistung unzulässiger Tags. In der [AMP-Spezifikation](/docs/reference/spec.html) werden unzulässige Tags jedoch allgemein definiert.

### Erforderliches Attribut fehlt

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_ATTR_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The mandatory attribute '%1' is missing in tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Erforderliches Attribut in Tag einfügen</td>
  </tr>
</table>

Die erforderlichen Attribute für AMP-Tags werden in der [Spezifikation des AMP-Validierungstools](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) definiert.
Suchen Sie einfach nach dem Tag, sehen Sie sich die aufgeführten Attribute an und achten Sie auf `mandatory: true`.
Die erforderlichen Attribute der einzelnen AMP-Tags finden Sie außerdem in der Spezifikation des entsprechenden Tags.

### Ungültiger Attributwert

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>INVALID_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to the invalid value '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Gültigen Attributwert eingeben</td>
  </tr>
</table>

Dieser Fehler bedeutet, dass ein HTML-Tag über ein Attribut mit einem zulässigen Namen, aber unzulässigen Wert verfügt.
Häufige Auslöser dieses Fehlers sind beispielsweise ungültige Werte für URLs. Sämtliche URL-Werte (in `href`- und `src`-Attributen) müssen einem [dieser möglichen Attributwerte](http://www.w3schools.com/tags/att_a_href.asp) entsprechen.

<strong>WICHTIG:</strong> Für viele URL-Werte in AMP ist HTTPS erforderlich. Wenn unklar ist, warum dieser Fehler zurückgegeben wird, sehen Sie in der Spezifikation des entsprechenden AMP-Tags nach, ob HTTPS für das Attribut erforderlich ist.

### Unzulässiges Attribut

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DISALLOWED_ATTR</td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' may not appear in tag '%2'."</td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Attribut aus dem HTML-Tag entfernen</td>
  </tr>
</table>

Da Attribute auf die weiße Liste gesetzt werden, gibt es keine definitive Auflistung unzulässiger Attribute.
Die unterstützten Attribute für die einzelnen Tags finden Sie in der [Spezifikation des AMP-Validierungstools](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii). Suchen Sie dazu nach "HTML tag" und dann `attrs`.

Zusätzlich zur weißen Liste spezifischer Attribute für das betreffende Tag können für AMP-Tags auch alle Attribute verwendet werden, die unter `$GLOBAL_ATTRS` auf die weiße Liste gesetzt wurden. Sämtliche Attribute mit dem Präfix `"data-"` befinden sich ebenfalls auf der weißen Liste.

### Erforderlicher Text fehlt oder ist falsch

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_CDATA_MISSING_OR_INCORRECT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The mandatory text (CDATA) inside tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Erforderlichen Text in Tag einfügen oder korrigieren</td>
  </tr>
</table>

CDATA-Werte sind die Contentdaten zwischen einem HTML-Start- und -End-Tag. Sie werden derzeit sowohl mit schwarzen als auch weißen Listen ausgewertet.
Tags mit erforderlichen CDATA-Werten sind:

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

und

[sourcecode:html]
<style amp-custom>
[/sourcecode]

Dafür werden unter Umständen die folgenden detaillierten Benachrichtigungen angezeigt:

* "Mandatory style boilerplate (js enabled)"
* "Mandatory style boilerplate (noscript)"
* "Disallowed -amp- CSS class name prefix"
* "Disallowed !important attribute in CSS"
* "Disallowed @charset in CSS"
* "Disallowed @import in CSS"
* "Disallowed @namespace in CSS"
* "Disallowed @supports in CSS"
* "Disallowed @document in CSS"
* "Disallowed @page in CSS"
* "Disallowed @viewport in CSS"

### Unzulässiger Text in Tag

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>CDATA_VIOLATES_BLACKLIST</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The text (CDATA) inside tag '%1' matches '%2', which is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Unzulässigen Text entfernen</td>
  </tr>
</table>

Bestimmte CSS-Daten wurden für die Validierung wichtiger CSS-AMP-Regeln auf die schwarze Liste gesetzt.

Nachstehend sind die CSS-Daten aufgelistet, die auf die schwarze Liste gesetzt wurden (weitere Informationen finden Sie in der [Spezifikation des AMP-Validierungstools](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) unter `blacklisted_cdata_regex`):

* `"\\.i?-amp-"` ("CSS -amp- class name prefix")
* `"!important"`
* `"charset"`
* `"@import"`
* `"@namespace"`
* `"@document"`
* `"@page"`
* `"@viewport"`

### Unzulässige Property in einem Attribut im Tag

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DISALLOWED_PROPERTY_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The property '%1' in attribute '%2' in tag '%3' is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Unzulässige Property aus dem entsprechenden Attribut entfernen</td>
  </tr>
</table>

Dieser Fehler wird zurückgegeben, wenn der Property-Name in einem Attribut nicht zulässig ist.
In diesem Kontext handelt es sich bei "Property" um die strukturierten Schlüssel-/Wertdaten in einem Attribut.
In `<meta name="viewport content="width=device-width;minimum-scale=1">` sind `width` und `minimum-scale` beispielsweise Property-Namen.

Für das folgende Beispiel wird der Fehler DISALLOWED_PROPERTY_IN_ATTR_VALUE zurückgegeben:

`<meta name="viewport content="width=device-width;invalidfoo=1">`

Auch dieses Beispiel würde einen Fehler auslösen:

`<meta http-equiv="X-UA-Compatible" content="invalidfoo=edge">`

Richtig ist `<meta http-equiv="X-UA-Compatible" content="ie=edge">`.

### Ungültiger Property-Wert

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>INVALID_PROPERTY_VALUE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The property '%1' in attribute '%2' in tag '%3' is set to '%4', which is invalid."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Ungültigen Property-Wert korrigieren</td>
  </tr>
</table>

Dieser Fehler tritt auf, wenn der Property-Wert in einem Attribut ungültig ist.
In diesem Kontext handelt es sich bei "Property" um die strukturierten Schlüssel-/Wertdaten in einem Attribut.
In `<meta name="viewport content="width=device-width;minimum-scale=1">` sind `device-width` und `1` beispielsweise Property-Werte.

Für das folgende Beispiel wird der Fehler INVALID_PROPERTY_VALUE_IN_ATTR_VALUE zurückgegeben:

`<meta name=viewport content="width=device-width;minimum-scale=invalidfoo">`

Auch dieses Beispiel würde einen Fehler auslösen:

`<meta http-equiv="X-UA-Compatible" content="ie=invalidfoo">`

Richtig ist: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`.

### URL fehlt

<table>
  <tr>
    <td class="col-thirty"><strong>Code</strong></td>
    <td>MISSING_URL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>"Missing URL for attribute '%1' in tag '%2'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Korrektur</strong></td>
    <td>Gültige URL hinzufügen</td>
  </tr>
</table>

Dieser Fehler tritt auf, wenn eine URL für das Attribut erforderlich ist, aber nicht angegeben wurde, etwa ein leeres `href`- oder `src`-Attribut.

### Ungültige URL

<table>
  <tr>
    <td class="col-thirty"><strong>Code</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>"Malformed URL '%3' for attribute '%1' in tag '%2'"</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Korrektur</strong></td>
    <td>Fehlerhafte URL korrigieren</td>
  </tr>
</table>

Dieser Fehler tritt auf, wenn ein Attribut eine ungültige URL enthält.

### Ungültiges URL-Protokoll

<table>
  <tr>
    <td class="col-thirty"><strong>Code</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>Invalid URL protocol '%3:' for attribute '%1' in tag '%2'.</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Korrektur</strong></td>
    <td>In ein gültiges Protokoll ändern, etwa `https` anstelle von `http`</td>
  </tr>
</table>

Dieser Fehler tritt bei Tags mit `href`- oder `src`-Attributen auf, für die ein bestimmtes Protokoll festgelegt sein muss.
Für viele Tags ist beispielsweise `https` erforderlich.

### Erforderliche Property nicht in Attribut vorhanden

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The property '%1' is missing from attribute '%2' in tag '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Fehlende Property hinzufügen</td>
  </tr>
</table>

Derzeit tritt dieser Fehler auf, wenn die folgenden erforderlichen Properties fehlen:

* `content="...ie=..."`
* `content="...width=..."`
* `content="...minimum-scale=..."`

Sie verweisen auf die erwarteten Tags:

* `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
* `<meta name=viewport content="width=device-width;minimum-scale=1">`

### Sich gegenseitig ausschließende Attribute

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MUTUALLY_EXCLUSIVE_ATTRS</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Mutually exclusive attributes encountered in tag '%1' - pick one of %2."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Eins der sich gegenseitig ausschließenden Attribute entfernen</td>
  </tr>
</table>

Dieser Fehler tritt auf, wenn beide sich gegenseitig ausschließende Attribute in einem Tag enthalten sind.
Beispielsweise ist in den folgenden Tags nur jeweils eines der Attribute zulässig:

* [amp-twitter](/docs/reference/components/amp-twitter.html): `data-tweetid` oder `src`
* [amp-instagram](/docs/reference/components/amp-instagram.html): `data-shortcode` oder `src`
* [amp-iframe](/docs/reference/components/amp-iframe.html): `src` oder `srcdoc`
* [amp-youtube](/docs/reference/components/amp-youtube.html ): `src` oder `data-videoid`

### Erforderliches Attribut fehlt auf Liste

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_ONEOF_ATTR_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' is missing a mandatory attribute - pick one of %2." </td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Erforderliches Attribut aus den verfügbaren Attributen auswählen und einfügen</td>
  </tr>
</table>

Dieser Fehler tritt auf, wenn ein erforderliches Attribut aus mehreren Möglichkeiten in einem Tag fehlt.
Beispielsweise ist für die folgenden Tags jeweils eines der beiden anschließend genannten Attribute erforderlich:

* [amp-twitter](/docs/reference/components/amp-twitter.html): `data-tweetid` oder `src`
* [amp-instagram](/docs/reference/components/amp-instagram.html): `data-shortcode` oder `src`
* [amp-iframe](/docs/reference/components/amp-iframe.html): `src` oder `srcdoc`
* [amp-youtube](/docs/reference/components/amp-youtube.html ): `src` oder `data-videoid`

### Falsches übergeordnetes Tag

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>WRONG_PARENT_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The parent tag of tag '%1' is '%2', but it can only be '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Tag dem erforderlichen übergeordneten Tag direkt unterordnen</td>
  </tr>
</table>

Für manche Tags sind direkt übergeordnete Tags erforderlich.
Nachstehend sehen Sie die erforderlichen übergeordneten Tags für bestimmte Tags (Tag, übergeordnetes Tag):

* Für `!doctype` ist das übergeordnete Tag `root` erforderlich.
* Für `html` ist das übergeordnete Tag `!doctype` erforderlich.
* Für `head` ist das übergeordnete Tag `html` erforderlich.
* Für `body` ist das übergeordnete Tag `html` erforderlich.
* Für `link` ist das übergeordnete Tag `head` erforderlich.
* Für `meta` ist das übergeordnete Tag `head` erforderlich.
* Für `style amp-custom` ist das übergeordnete Tag `head` erforderlich.
* Für `style` ist das übergeordnete Tag `boilerplate (noscript)` erforderlich.
* Für `noscript` ist das übergeordnete Tag `head` erforderlich.
* Für `script` ist das übergeordnete Tag `head` erforderlich.
* Für `source` ist ein Medien-Tag erforderlich, etwa `amp-audio` oder `amp-video`.

### Unzulässiges Vorgängertag

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DISALLOWED_TAG_ANCESTOR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' may not appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Unzulässiges verschachteltes Tag entfernen oder verschieben</td>
  </tr>
</table>

Dieser Fehler tritt auf, wenn ein Tag ein Nachfolger eines anderen Tags ist, das nicht validiert werden kann.
Derzeit wären hier als einziges Beispiel `template`-Tags zu nennen, die anderen `template`-Tags nicht untergeordnet werden dürfen.

### Erforderliches Vorgängertag

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_TAG_ANCESTOR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' may only appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Tag entfernen oder zum Nachfolger des entsprechenden Tags machen</td>
  </tr>
</table>

Erforderliche Nachfolger werden in der [Spezifikation des AMP-Validierungstools](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) als `mandatory_ancestor` definiert.

Dieser Fehler tritt auf, wenn bei den folgenden Tags der `mandatory_ancestor` fehlt (Tag, Vorgängertag):

* `img` muss ein Nachfolger von `noscript` sein.
* `video` muss ein Nachfolger von `noscript` sein.
* `audio` muss ein Nachfolger von `noscript` sein.
* `noscript` muss ein Nachfolger von `body` sein.

### Erforderliches Vorgängertag mit hint-Tag

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>MANDATORY_TAG_ANCESTOR_WITH_HINT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' may only appear as a descendant of tag '%2'. Did you mean '%3'?"</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Tag entfernen, zum Nachfolger des entsprechenden Tags machen oder durch das hint-Tag ersetzen</td>
  </tr>
</table>

Dieser Fehler tritt auf, wenn eines der folgenden Tags im AMP-Dokument ermittelt wird, aber dem erforderlichen übergeordneten Tag nicht richtig untergeordnet wurde:

* `img` wurde dem übergeordneten Tag `noscript` nicht untergeordnet.
* `video` wurde dem übergeordneten Tag `noscript` nicht untergeordnet.
* `audio` wurde dem übergeordneten Tag `noscript` nicht untergeordnet.
* `noscript` wurde dem übergeordneten Tag `body` nicht untergeordnet.

### Doppeltes eindeutiges Tag

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DUPLICATE_UNIQUE_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The tag '%1' appears more than once in the document."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Eines der doppelten Tags aus dem AMP-Dokument entfernen</td>
  </tr>
</table>

Dieser Fehler tritt auf, wenn genau eine Instanz des Tags zulässig ist, aber ein Duplikat ermittelt wurde.

Vollständige Liste der eindeutigen Tags:

* `<doctype html>`
* `<html amp>`
* `<head>`
* `<link rel=canonical href=...>`
* `<link rel=amphtml href=...>`
* `<meta charset="utf-8">`
* `<meta viewport>`
* `<style amp-custom>`
* `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* `<body>`
* `<script src="https://cdn.ampproject.org/v0.js">`

## Stil- und Layoutfehler

Bevor wir uns mit Stil- und Layoutfehlern befassen, sollten Sie wissen, wie [Stile](/de/docs/guides/responsive/style_pages.html) und [Layout](/de/docs/guides/responsive/control_layout.html ) in AMP funktionieren. Da es sich bei AMP-Seiten um HTML-Seiten handelt, sind die Stile praktisch dieselben wie bei anderen HTML-Seiten.
Allerdings gibt es einige Einschränkungen, die sicher stellen sollen, dass Seiten schnell laden. Das AMP-Validierungstool setzt diese Einschränkungen durch.

Für das Layout von AMP-Seiten gibt es feste Regeln.
Für alle Tags, die auf der Seite angezeigt werden, sind eine vordefinierte Höhe und Breite erforderlich. Dadurch werden Verzögerungen und Störungen beim Rendern und Scrollen deutlich reduziert.
Das bedeutet jedoch nicht, dass Sie diese Attribute manuell einfügen müssen.
Bei bestimmten Layouttypen gibt das AMP-Validierungstool keine Fehler zurück, da von Standardwerten ausgegangen wird.

Für jedes AMP-Tag gibt es eine Liste mit `supported_layouts`, die in der [Spezifikation des AMP-Validierungstools](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) definiert sind.
Das Validierungstool gibt Fehler für nicht unterstützte Layouts zurück und prüft die Validierungsregeln für das vordefinierte Layout.

### Stylesheet zu lang

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>STYLESHEET_TOO_LONG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The author stylesheet specified in tag 'style' is too long - we saw %1 bytes whereas the limit is %2 bytes."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Größe des Stylesheets auf unter 50.000 Byte reduzieren.</td>
  </tr>
</table>

Das AMP-Validierungstool gibt diesen Fehler zurück, wenn es feststellt, dass die Größe des Stilinhalts in `<style amp-custom>` 50.000 Byte überschreitet.

### CSS-Syntaxfehler

<table>
   <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>CSS_SYNTAX</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"CSS syntax error in tag '%1' - %2."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>CSS-Syntaxfehler beheben</td>
  </tr>
</table>

Dieser Fehler tritt auf, wenn das entsprechende Tag CSS-Syntaxfehler aufweist.
Wenn Sie nicht wissen, warum der Fehler auftritt, prüfen Sie das CSS mit einem Onlinetool für die CSS-Validierung wie [csslint](http://csslint.net/).

### CSS-Syntaxfehler bei bestimmter Regel

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>CSS_SYNTAX_INVALID_AT_RULE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"CSS syntax error in tag '%1' - saw invalid at rule '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>CSS-Syntaxfehler beheben</td>
  </tr>
</table>

Dieser Fehler bezieht sich auf die @-Regeln in CSS, für die AMP nur einige wenige Regeln zulässt.
Weitere Informationen finden Sie in der [AMP-Spezifikation](/docs/reference/spec.html).
Beispielsweise ist `@import` nicht zulässig.
Dem Validierungsfehler können Sie entnehmen, welche Regel ungültig ist. So können Sie diese leichter korrigieren.

### Impliziertes Layout nicht vom AMP-Tag unterstützt

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>IMPLIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The implied layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Gültiges Layoutattribut für das Tag angeben</td>
  </tr>
</table>

Dieser Fehler tritt auf, wenn Sie kein Layout für das AMP-Tag angeben und das implizierte Layout (hinsichtlich Breite, Höhe und Größen) nicht unterstützt wird.
Überprüfen Sie die `supported_layout`-Werte für das Tag in der [Spezifikation des AMP-Validierungstools](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

Das tatsächliche Layoutverhalten richtet sich nach dem Attribut `layout`.
Weitere Informationen zur Funktionsweise von Layouts finden Sie [im Artikel zu den unterstützten Layouts](/de/docs/guides/responsive/control_layout.html) und in der [Spezifikation des AMP-HTML-Layoutsystems](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md).

**Hinweis:** Wenn Sie kein Layout und keine Werte für `width` und `height` festlegen, wird standardmäßig CONTAINER als Layout verwendet. Das Validierungstool gibt in diesem Fall einen Fehler zurück, da CONTAINER nicht in AMP-Tags zulässig ist.
Geben Sie ein anderes Layout als CONTAINER an oder fügen Sie einen Wert für `width` und/oder `height` hinzu, um den Fehler zu beheben.

### Attribute nicht für impliziertes Layout zulässig

<table>
  <tr>
    <td class="col-thirty"><strong>Code</strong></td>
    <td>ATTR_DISALLOWED_BY_IMPLIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Korrektur</strong></td>
    <td>Unzulässiges Attribut aus dem Tag entfernen oder ein Layout auswählen, das dieses Attribut unterstützt</td>
  </tr>
</table>

Dieser Fehler tritt auf, wenn Sie kein Layout für das AMP-Tag angeben und das implizierte Layout ein unzulässiges Attribut enthält.
Die unzulässigen Attribute für Layouttypen werden in der [Spezifikation des AMP-HTML-Layoutsystems](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md) beschrieben.

### Festgelegtes Layout nicht vom AMP-Tag unterstützt

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>SPECIFIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The specified layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Layout festlegen, das vom Tag unterstützt wird</td>
  </tr>
</table>

Dieser Fehler tritt auf, wenn das Layout, das für das Tag festgelegt wurde, nicht unterstützt wird.
Überprüfen Sie die `supported_layout`-Werte für das Tag in der [Spezifikation des AMP-Validierungstools](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).

Das tatsächliche Layoutverhalten richtet sich nach dem Attribut `layout`.
Weitere Informationen zur Funktionsweise von Layouts finden Sie [im Artikel zu den unterstützten Layouts](/de/docs/guides/responsive/control_layout.html) und in der [Spezifikation des AMP-HTML-Layoutsystems](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md).

### Attribute nicht für festgelegtes Layout zulässig

<table>
  <tr>
    <td class="col-thirty"><strong>Code</strong></td>
    <td>ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Format</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Korrektur</strong></td>
    <td>Unzulässiges Attribut aus dem Tag entfernen oder ein Layout auswählen, das dieses Attribut unterstützt</td>
  </tr>
</table>

Dieser Fehler tritt auf, wenn Sie ein Layout für das AMP-Tag festlegen und das Layout ein unzulässiges Attribut enthält.
Die unzulässigen Attribute für Layouttypen werden in der [Spezifikation des AMP-HTML-Layoutsystems](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md) beschrieben.

### Ungültiger Wert eines für das Layout erforderlichen Attributs

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>ATTR_VALUE_REQUIRED_BY_LAYOUT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Invalid value '%1' for attribute '%2' in tag '%3' - for layout '%4', set the attribute '%2' to value '%5'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Attribut auf den festgelegten Wert setzen</td>
  </tr>
</table>

Dieser Fehler tritt auf, wenn der Attributwert nicht für das festgelegte Layout gültig ist.
Um zu verstehen, wodurch dieser Fehler ausgelöst wird, müssen Sie sich mit dem [unterschiedlichen Verhalten von Layouts](/de/docs/guides/responsive/control_layout.html) vertraut machen.

Angenommen, Sie legen `fixed-height` für das Layout fest und geben numerische Werte für `height` und `width` an.
Für das Layout `fixed-height` wird ein `height`-Wert übernommen.
Das Attribut `width` darf nicht vorhanden sein oder muss auf `auto` gesetzt werden.
Das Validierungstool gibt den Fehler ATTR_VALUE_REQUIRED_BY_LAYOUT zurück.

### Abweichende Einheiten für Breite und Höhe

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Inconsistent units for width and height in tag '%1' - width is specified in '%2' whereas height is specified in '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Einheitliche Einheiten für Breite und Höhe angeben</td>
  </tr>
</table>

Mit Ausnahme von `layout=fixed` müssen Attribute für Breite und Höhe in derselben Einheit angegeben werden.
Anderenfalls wird dieser Fehler zurückgegeben.

Beispielsweise wird für `<amp-img src="" layout="responsive" width="42px" height="42rem">` die folgende Fehlermeldung zurückgegeben:

"Im Tag 'amp-img' wurden abweichende Einheiten für Breite und Höhe festgestellt. Die Breite ist in 'px' angegeben, während für Höhe 'rem' verwendet wurde."

## Vorlagenfehler

AMP-Seiten dürfen Vorlagensyntax nur in AMP-Tags enthalten, die spezifisch für Vorlagen ausgelegt sind, etwa [amp-mustache](/docs/reference/components/amp-mustache.html).

Sie können Vorlagen in Ihre Quelldateien einfügen, solange die generierte Ausgabe keine Vorlagen mehr enthält. Weitere Informationen finden Sie unter [CSS-Präprozessoren verwenden](/de/docs/guides/responsive/style_pages.html).

### Attribut enthält Vorlagensyntax

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>TEMPLATE_IN_ATTR_NAME</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"Mustache template syntax in attribute name '%1' in tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Mustache-Vorlagensyntax aus dem Attribut entfernen</td>
  </tr>
</table>

Dieser Fehler tritt immer dann auf, wenn das Validierungstool [Mustache-Vorlagensyntax](https://mustache.github.io/mustache.5.html) in einem Attributwert ermittelt.

### Attribut enthält nicht korrekt codierte Vorlagensyntax

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>UNESCAPED_TEMPLATE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to '%3', which contains unescaped Mustache template syntax."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Mustache-Vorlage richtig codieren</td>
  </tr>
</table>

Dieser Fehler tritt immer dann auf, wenn das Validierungstool [nicht korrekt codierte Mustache-Vorlagensyntax](https://mustache.github.io/mustache.5.html) in einem Attributwert ermittelt.

### Attribut enthält einen Teil einer Mustache-Vorlage

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>TEMPLATE_PARTIAL_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to '%3', which contains a Mustache template partial."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Teil der Mustache-Vorlage entfernen</td>
  </tr>
</table>

Dieser Fehler tritt immer dann auf, wenn das Validierungstool [einen Teil einer Mustache-Vorlage](https://mustache.github.io/mustache.5.html) in einem Attributwert ermittelt.

## Einstellungsfehler

### Eingestellte Tags

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DEPRECATED_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>No error message defined as yet (no deprecated tags).</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Eingestelltes Tag entfernen</td>
  </tr>
</table>

Diese Warnung wird angezeigt, wenn ein zuvor gültiges AMP-Tag im AMP-Dokument ermittelt wird.
Dabei handelt es sich nur um eine Warnung. AMP-Dokumente mit Warnungen sind weiterhin gültig.
Derzeit gibt es keine veralteten Tags. Die Warnung soll künftig verwendet werden, wenn Tags eingestellt werden.

### Eingestelltes Attribut

<table>
  <tr>
  	<td class="col-thirty"><strong>Code</strong></td>
  	<td>DEPRECATED_ATTR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Format</strong></td>
  	<td>"The attribute '%1' in tag '%2' is deprecated - use '%3' instead."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Korrektur</strong></td>
  	<td>Eingestelltes Attribut am besten entfernen</td>
  </tr>
</table>

Diese Warnung wird angezeigt, wenn ein zuvor gültiges AMP-Attribut im AMP-Dokument ermittelt wird.
Dabei handelt es sich nur um eine Warnung. AMP-Dokumente mit Warnungen sind weiterhin gültig.

Die eingestellten Attribute für die einzelnen AMP-Tags finden Sie, indem Sie in der [Spezifikation des AMP-Validierungstools](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) nach `deprecation` suchen.
