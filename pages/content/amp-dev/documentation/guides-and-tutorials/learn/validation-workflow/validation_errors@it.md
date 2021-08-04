---
$title: Errori di convalida AMP
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

I documenti AMP validi non devono contenere errori di convalida.
Questo documento ha lo scopo di aiutarti a comprendere meglio e a correggere gli eventuali errori riscontrati durante la [convalida delle tue pagine AMP](validate_amp.md).
Per una panoramica completa degli errori di convalida, leggi la [specifica dello strumento di convalida AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

## Errori negli attributi e nei tag HTML AMP

### Tag obbligatorio mancante

<table>
   <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>MANDATORY_TAG_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The mandatory tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Aggiungi (o correggi) il tag HTML obbligatorio.</td>
  </tr>
</table>

I tag che seguono devono essere presenti in tutti i documenti AMP:

* <a name="doctype"></a>`<!doctype html>`
* <a name="html"></a>`<html amp> or <html ⚡>`
* <a name="head"></a>`<head>`
* <a name="canonical"></a>`<link rel="canonical" href="$SOME_URL">`
* <a name="utf"></a>`<meta charset="utf-8">`
* <a name="viewport"></a>`<meta name="viewport" content="...">`
* <a name="boilerplate"></a>`<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* <a name="ampscript"></a>`<script async src="https://cdn.ampproject.org/v0.js"></script>`
* <a name="body"></a>`<body>`

Questi tag obbligatori includono un campo `mandatory: true` nella [specifica dello strumento di convalida AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii); vengono inoltre citati nella [specifica AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md).

### Tag richiesto da un altro tag mancante

<table>
   <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>TAG_REQUIRED_BY_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The '%1' tag is missing or incorrect, but required by '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Aggiungi (o correggi) il tag HTML richiesto.</td>
  </tr>
</table>

Lo strumento di convalida genera l'errore `TAG_REQUIRED_BY_MISSING` quando trova un componente esteso nel documento AMP, ma non trova il relativo equivalente `<script>`.

I [componenti estesi](../../../../documentation/components/index.html) devono essere inclusi esplicitamente nel documento AMP sotto forma di elementi personalizzati.
Per correggere questi errori visita la pagina di riferimento del componente esteso, copia lo script obbligatorio e incollalo nell'elemento `<head>` del documento AMP.

### Tag non consentito

<table>
   <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>DISALLOWED_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The tag '%1' is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Rimuovi il tag non consentito.</td>
  </tr>
</table>

Esiste una allowlist dei tag, ma non esiste un elenco definitivo di tutti i tag non consentiti; tuttavia, la [specifica AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md) definisce un insieme approssimativo dei tag non consentiti.

### Attributo obbligatorio mancante

<table>
   <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>MANDATORY_ATTR_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The mandatory attribute '%1' is missing in tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Aggiungi l'attributo obbligatorio al tag.</td>
  </tr>
</table>

Gli attributi obbligatori dei tag AMP sono definiti all'interno della [specifica dello strumento di convalida AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).
Cerca il tag, visualizza gli attributi elencati e controlla se è presente `mandatory: true`.
Gli attributi obbligatori di ogni tag AMP sono elencati anche nella specifica del tag.

### Valore dell'attributo non valido

<table>
   <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>INVALID_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to the invalid value '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Correggi il valore dell'attributo inpostandone uno valido.</td>
  </tr>
</table>

Questo errore indica che un tag HTML ha un attributo con un nome consentito, ma non un valore consentito.
Ad esempio, spesso questo errore viene generato se vengono rilevati valori non validi negli URL. Tutti i valori degli URL (negli attributi `href` e `src`) devono corrispondere a uno di questi [valori possibili degli attributi](http://www.w3schools.com/tags/att_a_href.asp).

<strong>IMPORTANTE.</strong> Molti valori degli URL nello standard AMP richiedono il protocollo HTTPS. Se ricevi questo errore, ma non sai esattamente perché, controlla la specifica del tag AMP pertinente per verificare se l'attributo richiede HTTPS.

### Attributo non consentito

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>DISALLOWED_ATTR</td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The attribute '%1' may not appear in tag '%2'."</td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Rimuovi l'attributo dal tag HTML.</td>
  </tr>
</table>

Esiste una allowlist degli attributi, ma non esiste un elenco definitivo di tutti gli attributi non consentiti.
Per controllare gli attributi supportati per ogni tag specifico, cerca il tag HTML, quindi il valore `attrs` nella [specifica dello strumento di convalida AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

Oltre agli attributi specifici di ogni tag presenti in una allowlist, tutti i tag AMP possono utilizzare qualsiasi attributo presente nella allowlist `$GLOBAL_ATTRS`; è possibile utilizzare anche tutti gli attributi con il prefisso `"data-"`.

### Testo obbligatorio mancante o errato

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>MANDATORY_CDATA_MISSING_OR_INCORRECT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The mandatory text (CDATA) inside tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Aggiungi o correggi il testo obbligatorio all'interno del tag.</td>
  </tr>
</table>

Gli elementi CDATA sono i dati sui contenuti racchiusi tra tag HTML di inizio e di fine; attualmente vengono valutati utilizzando sia allowlist sia denylist.
I tag con elementi CDATA obbligatori includono:

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

E:

[sourcecode:html]
<style amp-custom>
[/sourcecode]

I messaggi dettagliati relativi a questo errore possono essere i seguenti:

* "Boilerplate stili obbligatorio (js attivo)"
* "Boilerplate stili obbligatorio (noscript)"
* "Prefisso nome classe CSS -amp- non consentito"
* "Attributo !important non consentito in CSS"
* "Regola @charset non consentita in CSS"
* "Regola @import non consentita in CSS"
* "Regola @namespace non consentita in CSS"
* "Regola @supports non consentita in CSS"
* "Regola @document non consentita in CSS"
* "Regola @page non consentita in CSS"
* "Regola @viewport non consentita in CSS"

### Testo non consentito all'interno del tag

<table>
   <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>CDATA_VIOLATES_DENYLIST</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The text (CDATA) inside tag '%1' matches '%2', which is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Rimuovi il testo non consentito.</td>
  </tr>
</table>

Alcuni dati CSS specifici sono stati inseriti in una denylist per convalidare le regole AMP CSS essenziali.

Di seguito è riportato l'elenco di dati CSS inseriti nella denylist (vedi anche <a href="https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii">`disallowed_cdata_regex` nella specifica dello strumento di convalida AMP</a>):

* `"\\.i?-amp-"` ("prefisso nome classe CSS -amp-")
* `"!important"`
* `"charset"`
* `"@import"`
* `"@namespace"`
* `"@document"`
* `"@page"`
* `"@viewport"`

### Proprietà non consentita all'interno dell'attributo del tag

<table>
   <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>DISALLOWED_PROPERTY_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The property '%1' in attribute '%2' in tag '%3' is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Rimuovi la proprietà non consentita dall'attributo specificato.</td>
  </tr>
</table>

Questo errore si verifica quando il nome della proprietà all'interno di un attributo non è consentito.
In questo contesto, con il termine proprietà si indicano i dati strutturati chiave/valore all'interno di un attributo.
Ad esempio, in `<meta name="viewport content="width=device-width;minimum-scale=1">`, `width` e `minimum-scale` sono nomi di proprietà.

Il codice seguente genera un errore DISALLOWED_PROPERTY_IN_ATTR_VALUE:

`<meta name="viewport content="width=device-width;invalidfoo=1">`

Ecco un altro esempio di codice che genererebbe un errore:

`<meta http-equiv="X-UA-Compatible" content="invalidfoo=edge">`

Dovrebbe essere: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`.

### Valore della proprietà non valido

<table>
   <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>INVALID_PROPERTY_VALUE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The property '%1' in attribute '%2' in tag '%3' is set to '%4', which is invalid."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Correggi il valore non valido della proprietà.</td>
  </tr>
</table>

Questo errore si verifica quando il valore della proprietà all'interno di un attributo non è valido.
In questo contesto, con il termine proprietà si indicano i dati strutturati chiave/valore all'interno di un attributo.
Ad esempio, in `<meta name="viewport content="width=device-width;minimum-scale=1">`, `device-width` e `1` sono valori di proprietà.

Il codice seguente genera un errore INVALID_PROPERTY_VALUE_IN_ATTR_VALUE:

`<meta name=viewport content="width=device-width;minimum-scale=invalidfoo">`

Ecco un altro esempio di codice che genererebbe un errore:

`<meta http-equiv="X-UA-Compatible" content="ie=invalidfoo">`

Dovrebbe essere: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`

### URL mancante

<table>
  <tr>
    <td class="col-thirty"><strong>Codice</strong></td>
    <td>MISSING_URL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Formato</strong></td>
    <td>"Missing URL for attribute '%1' in tag '%2'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Correzione</strong></td>
    <td>Aggiungi l'URL valido.</td>
  </tr>
</table>

Questo errore si verifica quando manca un URL in un attributo che lo richiede, ad esempio se viene rilevato un attributo `href` o `src` vuoto.

### URL non valido

<table>
  <tr>
    <td class="col-thirty"><strong>Codice</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Formato</strong></td>
    <td>"Malformed URL '%3' for attribute '%1' in tag '%2'"</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Correzione</strong></td>
    <td>Correggi l'URL inaccessibile.</td>
  </tr>
</table>

Questo errore si verifica quando un attributo contiene un URL non valido.

### Protocollo dell'URL non valido

<table>
  <tr>
    <td class="col-thirty"><strong>Codice</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Formato</strong></td>
    <td>Invalid URL protocol '%3:' for attribute '%1' in tag '%2'.</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Correzione</strong></td>
    <td>Sostituiscilo con un protocollo valido, ad esempio `http` potrebbe dover essere `https`.</td>
  </tr>
</table>

Questo errore si verifica quando i tag con attributi `href` o `src` devono essere impostati con determinati protocolli.
Ad esempio, molti tag richiedono `https`.

### Proprietà obbligatoria mancante nell'attributo

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The property '%1' is missing from attribute '%2' in tag '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Aggiungi la proprietà mancante.</td>
  </tr>
</table>

Attualmente questo errore si verifica se mancano le seguenti proprietà obbligatorie:

* `content="...ie=..."`
* `content="...width=..."`
* `content="...minimum-scale=..."`

Si riferiscono ai tag previsti:

* `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
* `<meta name=viewport content="width=device-width;minimum-scale=1">`

### Attributi che si escludono a vicenda

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>MUTUALLY_EXCLUSIVE_ATTRS</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"Mutually exclusive attributes encountered in tag '%1' - pick one of %2."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Rimuovi uno degli attributi che si escludono a vicenda.</td>
  </tr>
</table>

Questo errore si verifica quando un tag ha entrambi gli attributi che si escludono a vicenda.
Ad esempio, è consentito un solo tag tra i seguenti:

* [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md): `data-tweetid` o `src`
* [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md): `data-shortcode` o `src`
* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md): `src` o `srcdoc`
* [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md): `src` o `data-videoid`

### Attributo obbligatorio mancante tra quelli dell'elenco

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>MANDATORY_ONEOF_ATTR_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The tag '%1' is missing a mandatory attribute - pick one of %2." </td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Aggiungi l'attributo obbligatorio mancante scelto dalla serie di attributi forniti.</td>
  </tr>
</table>

Questo errore si verifica quando in un tag manca un attributo obbligatorio a scelta tra quelli forniti.
Ad esempio, i seguenti tag richiedono uno dei due attributi possibili:

* [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md): `data-tweetid` o `src`
* [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md): `data-shortcode` o `src`
* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md): `src` o `srcdoc`
* [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md): `src` o `data-videoid`

### Tag principale errato

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>WRONG_PARENT_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The parent tag of tag '%1' is '%2', but it can only be '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Imposta il tag come tag secondario diretto del tag principale obbligatorio.</td>
  </tr>
</table>

Alcuni tag specifici richiedono un tag principale diretto (anziché un lontano predecessore).
Di seguito è elencato il tag principale richiesto per tag specifici (tag, principale):

* `!doctype` richiede il tag principale `root`.
* `html` richiede il tag principale `!doctype`.
* `head` richiede il tag principale `html`.
* `body` richiede il tag principale `html`.
* `link` richiede il tag principale `head`.
* `meta` richiede il tag principale `head`.
* `style amp-custom` richiede il tag principale `head`.
* `style` richiede il tag principale `boilerplate (noscript)`.
* `noscript` richiede il tag principale `head`.
* `script` richiede il tag principale `head`.
* `source` richiede un tag multimediale ([`amp-audio`](../../../../documentation/components/reference/amp-audio.md), [`amp-video`](../../../../documentation/components/reference/amp-video.md) e così via).

### Predecessore del tag non consentito

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>DISALLOWED_TAG_ANCESTOR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The tag '%1' may not appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Rimuovi (o sposta) il tag nidificato non consentito.</td>
  </tr>
</table>

Questo errore si verifica quando un tag è un discendente di un altro tag che non viene convalidato.
Attualmente l'unico esempio è il tag `template`, che non può essere nidificato in un altro tag `template`.

### Predecessore del tag obbligatorio

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>MANDATORY_TAG_ANCESTOR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The tag '%1' may only appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Rimuovi il tag o impostalo come discendente del tag specifico.</td>
  </tr>
</table>

I discendenti obbligatori sono definiti come `mandatory_ancestor` nella [specifica dello strumento di convalida AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

Questo errore si verifica quando manca `mandatory_ancestor` (tag, predecessore) nei seguenti tag:

* `img` deve essere un discendente di `noscript`.
* `video` deve essere un discendente di `noscript`.
* `audio` deve essere un discendente di `noscript`.
* `noscript` deve essere un discendente di `body`.

### Predecessore del tag obbligatorio con suggerimento

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>MANDATORY_TAG_ANCESTOR_WITH_HINT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The tag '%1' may only appear as a descendant of tag '%2'. Did you mean '%3'?"</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Rimuovi il tag, impostalo come discendente del tag specifico o sostituisci il tag con il tag suggerito.</td>
  </tr>
</table>

Questo errore si verifica quando nel documento AMP viene trovato uno dei seguenti tag non nidificato correttamente nel relativo tag principale obbligatorio:

* `img` non si trova all'interno del tag principale `noscript`.
* `video` non si trova all'interno del tag principale `noscript`.
* `audio` non si trova all'interno del tag principale `noscript`.
* `noscript` non si trova all'interno del tag principale `body`.

### Tag univoco duplicato

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>DUPLICATE_UNIQUE_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The tag '%1' appears more than once in the document."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Rimuovi uno dei tag duplicati dal documento AMP.</td>
  </tr>
</table>

Questo errore si verifica quando è consentita una sola istanza del tag e viene trovato un duplicato.

L'elenco completo di tag univoci è noto ed è riportato di seguito:

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

## Errori di stile e layout <a name="errori-di-stile-e-layout"></a>

Prima di approfondire gli errori di stile e layout, è opportuno capire come funzionano [l'applicazione di stili](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md) e il [layout](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) in AMP. Poiché le pagine AMP sono pagine HTML, l'applicazione di stili è molto simile a quella delle pagine HTML.
Esistono però alcune limitazioni per garantire il rapido caricamento delle pagine; tali limitazioni vengono applicate dallo strumento di convalida AMP.

Il layout è più contenuto nelle pagine AMP.
Ogni tag che viene visualizzato nella pagina richiede altezza e larghezza predefinite, riducendo notevolmente blocchi del rendering e dello scorrimento.
Questo non significa che tu debba includere manualmente questi attributi.
Per alcuni tipi di layout, lo strumento di convalida AMP non genera errori perché i valori predefiniti vengono dedotti.

Ogni tag AMP ha un elenco di attributi `supported_layouts`, come definito nella [specifica dello strumento di convalida AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).
Lo strumento di convalida genera errori per i layout non supportati e cerca il layout predefinito nelle regole di convalida.

### Foglio di stile troppo lungo

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>STYLESHEET_TOO_LONG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The author stylesheet specified in tag 'style' is too long - we saw %1 bytes whereas the limit is %2 bytes."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Riduci le dimensioni del foglio di stile in modo che siano inferiori a 50.000 byte.</td>
  </tr>
</table>

Lo strumento di convalida AMP genera questo errore quando stabilisce che le dimensioni dei contenuti degli stili all'interno di `<style amp-custom>` superano il limite di 50.000 byte.

### Errore di sintassi CSS

<table>
   <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>CSS_SYNTAX</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"CSS syntax error in tag '%1' - %2."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Correggi l'errore di sintassi CSS.</td>
  </tr>
</table>

Questo errore si verifica quando sono presenti errori di sintassi CSS nel tag specificato.
Se hai dubbi in merito alla causa dell'errore, prova a eseguire CSS tramite uno strumento di convalida CSS online, ad esempio [csslint](http://csslint.net/).

### Errore di sintassi CSS nella regola specifica

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>CSS_SYNTAX_INVALID_AT_RULE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"CSS syntax error in tag '%1' - saw invalid at rule '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Correggi l'errore di sintassi CSS specificato.</td>
  </tr>
</table>

Questo errore si riferisce alle regole at-rule in CSS, per cui AMP consente soltanto alcune regole (vedi anche la [specifica AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)).
Ad esempio, la regola `@import` non è consentita.
L'errore di convalida ti indica la regola esatta non valida, facilitandoti così la correzione.

### Layout implicito non supportato dal tag AMP

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>IMPLIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The implied layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Specifica un attributo layout valido per il tag.</td>
  </tr>
</table>

Questo errore si verifica quando non specifichi un layout per il tag AMP e il layout implicito (basato su larghezza, altezza e dimensioni) non è supportato.
Controlla i valori `supported_layout` del tag nella [specifica dello strumento di convalida AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

L'effettivo comportamento del layout viene stabilito dall'attributo `layout`.
Per ulteriori informazioni sul funzionamento del layout, leggi la pagina relativa a [come controllare il layout](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) e la [specifica relativa al sistema di layout HTML AMP](../../../../documentation/components/reference/amp-layout.md).

**Nota.** Se non specifichi il layout e non includi i valori `width` e `height`, il valore predefinito per il layout sarà CONTAINER. Lo strumento di convalida genera un errore perché il layout CONTAINER non è supportato nei tag AMP.
Specifica un layout diverso da CONTAINER oppure aggiungi un valore `width` e/o `height` per eliminare l'errore.

### Attributo non consentito per il layout implicito

<table>
  <tr>
    <td class="col-thirty"><strong>Codice</strong></td>
    <td>ATTR_DISALLOWED_BY_IMPLIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Formato</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Correzione</strong></td>
    <td>Rimuovi l'attributo non consentito dal tag oppure specifica un layout in cui tale attributo sia consentito.</td>
  </tr>
</table>

Questo errore si verifica quando non specifichi un layout per il tag AMP e il layout implicito contiene un attributo non consentito.
Gli attributi non consentiti per i tipi di layout sono descritti nella [specifica relativa al sistema di layout HTML AMP](../../../../documentation/components/reference/amp-layout.md).

### Layout specificato non supportato dal tag AMP

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>SPECIFIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The specified layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Specifica un layout che sia supportato dal tag.</td>
  </tr>
</table>

Questo errore si verifica quando il layout specificato per il tag non è supportato.
Controlla i valori `supported_layout` del tag nella [specifica dello strumento di convalida AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

L'effettivo comportamento del layout viene stabilito dall'attributo `layout`.
Per ulteriori informazioni sul funzionamento del layout, leggi la pagina relativa a [come controllare il layout](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) e la [specifica relativa al sistema di layout HTML AMP](../../../../documentation/components/reference/amp-layout.md).

### Attributo non consentito per il layout specificato

<table>
  <tr>
    <td class="col-thirty"><strong>Codice</strong></td>
    <td>ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Formato</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>Correzione</strong></td>
    <td>Rimuovi l'attributo non consentito dal tag oppure specifica un layout in cui tale attributo sia consentito.</td>
  </tr>
</table>

Questo errore si verifica quando specifichi per il tag AMP un layout contenente un attributo non consentito.
Gli attributi non consentiti per i tipi di layout sono descritti nella [specifica relativa al sistema di layout HTML AMP](../../../../documentation/components/reference/amp-layout.md).

### Valore non valido per l'attributo richiesto dal layout

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>ATTR_VALUE_REQUIRED_BY_LAYOUT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"Invalid value '%1' for attribute '%2' in tag '%3' - for layout '%4', set the attribute '%2' to value '%5'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Imposta il valore specificato per l'attributo.</td>
  </tr>
</table>

Questo errore si verifica quando il valore dell'attributo non è valido per il layout specificato.
Per comprendere la causa di questo errore, è necessario comprendere bene i [diversi comportamenti dei layout](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md).

Supponi di impostare il layout `fixed-height` e di includere valori numerici per entrambi gli attributi `height` e `width`.
Il valore del layout `fixed-height` è `height`.
L'attributo `width` non deve essere presente o deve essere impostato su `auto`.
Lo strumento di convalida genera l'errore ATTR_VALUE_REQUIRED_BY_LAYOUT.

### Unità di misura relative alla larghezza e all'altezza disomogenee

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"Inconsistent units for width and height in tag '%1' - width is specified in '%2' whereas height is specified in '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Specifica larghezze e altezze con la stessa unità di misura.</td>
  </tr>
</table>

Ad eccezione di `layout=fixed`, gli attributi relativi a larghezza e altezza devono essere espressi nella stessa unità di misura.
In caso contrario viene generato questo errore.

Ad esempio, `<amp-img src="" layout="responsive" width="42px" height="42rem">` genera il seguente messaggio di errore:

"Le unità di misura relative alla larghezza e all'altezza sono disomogenee nel tag '[`amp-img`](../../../../documentation/components/reference/amp-img.md) . La larghezza è indicata in 'px' mentre l'altezza è indicata in 'rem'."

## Errori relativi ai modelli

Le pagine AMP non possono includere sintassi dei modelli, a meno che la sintassi sia all'interno di un tag AMP ideato appositamente per includere i modelli, ad esempio [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md).

È possibile includere modelli nei file di origine, purché l'output generato da tali file non contenga i modelli (leggi anche la pagina relativa all'[utilizzo dei preprocessori CSS](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md)).

### L'attributo contiene la sintassi di un modello

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>TEMPLATE_IN_ATTR_NAME</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"Mustache template syntax in attribute name '%1' in tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Rimuovi la sintassi del modello Mustache dall'attributo.</td>
  </tr>
</table>

Questo errore si verifica ogni volta che lo strumento di convalida trova la [sintassi del modello Mustache](https://mustache.github.io/mustache.5.html) nel valore di un attributo.

### L'attributo contiene la sintassi di un modello senza escape

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>UNESCAPED_TEMPLATE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to '%3', which contains unescaped Mustache template syntax."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Aggiungi valori di escape al modello Mustache.</td>
  </tr>
</table>

Questo errore si verifica ogni volta che lo strumento di convalida trova la [sintassi del modello Mustache senza escape](https://mustache.github.io/mustache.5.html) nel valore di un attributo.

### L'attributo contiene una porzione di modello

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>TEMPLATE_PARTIAL_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to '%3', which contains a Mustache template partial."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Rimuovi la porzione di modello Mustache.</td>
  </tr>
</table>

Questo errore si verifica ogni volta che lo strumento di convalida trova una [porzione di modello Mustache](https://mustache.github.io/mustache.5.html) nel valore di un attributo.

## Errori relativi a elementi obsoleti

### Tag obsoleto

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>DEPRECATED_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>No error message defined as yet (no deprecated tags).</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>Rimuovi il tag obsoleto.</td>
  </tr>
</table>

Questo avviso viene visualizzato quando nel documento AMP viene trovato un tag AMP che era valido in passato.
Si tratta solo di un avviso; i documenti AMP con avvisi sono comunque validi.
Attualmente non esistono tag obsoleti; l'avviso è destinato a futuri ritiri.

### Attributo obsoleto

<table>
  <tr>
  	<td class="col-thirty"><strong>Codice</strong></td>
  	<td>DEPRECATED_ATTR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Formato</strong></td>
  	<td>"The attribute '%1' in tag '%2' is deprecated - use '%3' instead."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>Correzione</strong></td>
  	<td>È buona norma rimuovere l'attributo obsoleto.</td>
  </tr>
</table>

Questo avviso viene visualizzato quando nel documento AMP viene trovato un attributo AMP che era valido in passato.
Si tratta solo di un avviso; i documenti AMP con avvisi sono comunque validi.

Identifica gli attributi obsoleti di ogni tag AMP cercando `deprecation` nella [specifica dello strumento di convalida AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).
