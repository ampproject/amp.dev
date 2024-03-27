---
$title: Specifica per annunci AMP
order: 3
teaser:
  text: _Se desideri proporre modifiche allo standard, inserisci un commento alla [Dichiarazione
toc: true
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

*Se desideri proporre modifiche allo standard, inserisci un commento alla [Dichiarazione di Implementazione](https://github.com/ampproject/amphtml/issues/4264)*.

Gli annunci AMPHTML sono uno strumento che permette il rendering veloce ed efficace delle pagine AMP. Per garantire un rendering rapido e senza problemi dei documenti di annunci AMPHTML (i cosiddetti contenuti "creativi AMP") nel browser senza impatti negativi sull'esperienza di utilizzo, i contenuti creativi AMP devono rispettare una serie di regole di convalida. Analogamente alle [regole del formato AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml), gli annunci AMPHTML possono accedere a un set limitato di tag, funzioni ed estensioni consentiti.

## Regole di formato per gli annunci AMPHTML <a name="amphtml-ad-format-rules"></a>

Salvo diversa indicazione, i contenuti creativi devono obbedire a tutte le norme previste dalle [regole del formato AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml.html), qui riportate per riferimento. Ad esempio, l'annuncio AMPHTML [Boilerplate](#boilerplate) presenta differenze dal formato del codice boilerplate AMP standard.

Inoltre, i contenuti creativi devono rispettare le seguenti regole:

<table>
<thead>
<tr>
  <th>Regola</th>
  <th>Spiegazione</th>
</tr>
</thead>
<tbody>
<tr>
<td>Deve usare <code></code> o <code></code> come tag di chiusura.</td>
<td>Consente agli strumenti di convalida di distinguere se i contenuti creativi sono documenti AMP generali o documenti di annunci AMPHTML limitati, permettendone la corretta visualizzazione.</td>
</tr>
<tr>
<td>Deve includere <code>&lt;script async src="https://ampjs.org/amp4ads-v0.js"></script></code> come script di runtime al posto di <code>https://ampjs.org/v0.js</code>.</td>
<td>Consente comportamenti di runtime personalizzati per gli annunci AMPHTML pubblicati in iframe indipendenti dall'origine.</td>
</tr>
<tr>
<td>Non deve includere un tag <code>&lt;link rel="canonical"></code>.</td>
<td>I contenuti creativi degli annunci non hanno una "versione canonica non AMP" e non verranno indicizzati per le ricerche in modo indipendente, quindi l'autoreferenzialità sarebbe inutile.</td>
</tr>
<tr>
<td>Può includere come identificatori dei tag meta opzionali nell'intestazione HTML, in formato <code>&lt;meta name="amp4ads-id" content="vendor=${vendor},type=${type},id=${id}"></code>. Questi tag meta devono essere collocati prima dello script <code>amp4ads-v0.js</code>. I valori di <code>vendor</code> e <code>id</code> sono stringhe contenenti i soli caratteri [0-9a-zA-Z_-]. Il valore di <code>type</code> può essere <code>creative-id</code> o <code>impression-id</code>.</td>
<td>Questi identificatori personalizzati permettono di individuare gli annunci e i contenuti creativi. Possono essere utili a scopo di segnalazione e debugging.<br><br><p>Esempio:</p> <pre> &lt;meta name="amp4ads-id" content="vendor=adsense,type=creative-id,id=1283474">
&lt;meta name="amp4ads-id" content="vendor=adsense,type=impression-id,id=xIsjdf921S">
</pre>
</td>
</tr>
<tr>
<td>Il tracciamento di visibilità <code>&lt;amp-analytics></code> può individuare il solo selettore di annuncio completo, tramite <code>"visibilitySpec": { "selector": "amp-ad" }</code> come riportato nella <a href="https://github.com/ampproject/amphtml/issues/4018">Segnalazione #4018</a> e in <a href="https://github.com/ampproject/amphtml/pull/4368">PR #4368</a>. In particolare, non permette di individuare selettori di elementi all'interno dei contenuti creativi dell'annuncio.</td>
<td>In alcuni casi, gli annunci AMPHTML possono effettuare il rendering di elementi creativi di annunci in un iframe. In tali casi, gli strumenti di analisi della pagina host potranno individuare solo l'intero iframe e non saranno in grado di accedere a selettori di livello più dettagliato.<br><br> <p>Esempio:</p> <pre><br>{amp-analytics4}   &lt;script type="application/json">&lt;br&gt;  {&lt;br&gt;    "requests": {&lt;br&gt;      "visibility": "https://example.com/nestedAmpAnalytics"&lt;br&gt;    },&lt;br&gt;    "triggers": {&lt;br&gt;      "visibilitySpec": {&lt;br&gt;      "selector": "amp-ad",&lt;br&gt;      "visiblePercentageMin": 50,&lt;br&gt;      "continuousTimeMin": 1000&lt;br&gt;      }&lt;br&gt;    }&lt;br&gt;  }&lt;br&gt;  </script> {/amp-analytics4}</pre><br> <p>Questa configurazione invia una richiesta all'URL <code>https://example.com/nestedAmpAnalytics</code> quando il 50% dell'annuncio che lo racchiude è stato visibile ininterrottamente per 1 secondo sullo schermo.</p></td>
</tr>
</tbody>
</table>

### Boilerplate <a name="boilerplate"></a>

Gli elementi creativi di annunci AMPHTML richiedono una linea di stile boilerplate diversa e notevolmente più semplice rispetto a quella dei [documenti AMP generali](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md):

[sourcecode:html]

<style amp4ads-boilerplate=""><br>  body {<br>    visibility: hidden;<br>  }<br></style>

[/sourcecode]

*Spiegazione:* lo stile `amp-boilerplate` nasconde i contenuti del corpo fino a quando il sistema di runtime AMP non è pronto a visualizzarlo. Se Javascript è disabilitato o il runtime AMP non viene caricato, il boilerplate predefinito garantisce che il contenuto venga visualizzato comunque. Tuttavia se Javascript è completamente disattivato negli annunci AMPHTML, il loro codice non sarà eseguito e nessun annuncio verrà mai mostrato, per cui la sezione `<noscript>` non è necessaria. In assenza del sistema di runtime AMP, la maggior parte dei meccanismi su cui si basano gli annunci AMPHTML (ad esempio, analisi di monitoraggio della visibilità o elementi `amp-img` per la visualizzazione dei contenuti) non saranno disponibili, quindi è preferibile non visualizzare alcun annuncio che rischiare di mostrarne uno che non funziona correttamente.

Infine, il boilerplate degli annunci AMPHTML utilizza l'elemento `amp-a4a-boilerplate` al posto di `amp-boilerplate` in modo che gli strumenti di convalida possano identificarlo facilmente e produrre messaggi di errore più accurati a beneficio degli sviluppatori.

Nota: si applicano le stesse regole sulle variazioni del testo boilerplate applicate agli elementi [boilerplate AMP generali](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md).

### CSS <a name="css"></a>

<table>
<thead>
<tr>
  <th>Regola</th>
  <th>Spiegazione</th>
</tr>
</thead>
<tbody>
  <tr>
    <td>Gli elementi <code>position:fixed</code> e <code>position:sticky</code>non sono ammessi nel codice CSS dei contenuti creativi.</td>
    <td> Gli elementi <code>position:fixed</code> escono dal DOM shadow da cui gli annunci  AMPHTML dipendono. Quindi gli annunci in AMP già non possono usare la posizione fissa.</td>
  </tr>
  <tr>
    <td>L'uso di <code>touch-action</code> non è consentito.</td>
    <td>Gli annunci in grado di manipolare gli elementi <code>touch-action</code> possono interferire con l'opzione dell'utente di scorrere il documento host.</td>
  </tr>
  <tr>
    <td>Il codice CSS dei contenuti creativi è limitato a 20.000 byte.</td>
    <td>Blocchi CSS troppo grandi possono appesantire i contenuti creativi, aumentare la latenza di rete e peggiorare le prestazioni della pagina.</td>
  </tr>
  <tr>
    <td>Transizioni e animazioni sono soggette a restrizioni aggiuntive.</td>
    <td>Il sistema AMP deve essere in grado di controllare tutte le animazioni appartenenti a un annuncio, in modo da poterle interrompere quando l'annuncio non è sullo schermo o se le risorse di sistema sono in esaurimento.</td>
  </tr>
  <tr>
    <td>I prefissi specifici di un fornitore sono considerati alias per lo stesso simbolo senza il prefisso ai fini della convalida. Ciò significa che se un simbolo <code>foo</code> non è ammesso dalle regole di convalida CSS, anche il simbolo <code>-vendor-foo</code> non sarà ammesso.</td>
    <td>Alcune proprietà con prefisso del fornitore forniscono funzionalità equivalenti a proprietà che sono altrimenti vietate o limitate da queste regole. <br><br><p> Esempio: <code>-webkit-transition</code> e <code>-moz-transition</code> sono entrambi considerati alias dell'elemento <code>transition</code>. Saranno consentiti solo in contesti in cui sarebbe consentito l'uso di semplici elementi <code>transition</code> (consultare la successiva sezione <a href="#selectors">Selettori)</a>.</p>
</td>
  </tr>
</tbody>
</table>

#### Animazioni e transizioni CSS <a name="css-animations-and-transitions"></a>

##### Selettori <a name="selectors"></a>

Le proprietà `transition` e `animation` sono consentite solo nei selettori che:

- Contengono solo proprietà `transition`, `animation`, `transform`, `visibility` o `opacity`.

    *Spiegazione:* questo permette al sistema runtime AMP di rimuovere questa classe dal contesto per disattivare le animazioni, se necessario per garantire le migliori prestazioni della pagina.

**Vantaggi**

[sourcecode:css] .box { transform: rotate(180deg); transition: transform 2s; } [/sourcecode]

**Svantaggi**

Proprietà non consentita nella classe CSS.

[sourcecode:css] .box { color: red; // proprietà di animazione non consentita nel selettore di animazione transform: rotate(180deg); transition: transform 2s; } [/sourcecode]

##### Proprietà che consentono animazioni e transizioni <a name="transitionable-and-animatable-properties"></a>

Le uniche proprietà che possono essere sottoposte a transizione sono opacità e trasformazione. ([Spiegazione](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/))

**Vantaggi**

[sourcecode:css] transition: transform 2s; [/sourcecode]

**Svantaggi**

[sourcecode:css] transition: background-color 2s; [/sourcecode]

**Vantaggi**

[sourcecode:css] @keyframes turn { from { transform: rotate(180deg); }

to { transform: rotate(90deg); } } [/sourcecode]

**Svantaggi**

[sourcecode:css] @keyframes slidein { from { margin-left: 100%; width: 300%; }

to { margin-left: 0%; width: 100%; } } [/sourcecode]

### Estensioni ed elementi integrati AMP consentiti <a name="allowed-amp-extensions-and-builtins"></a>

I seguenti sono moduli di estensione e tag integrati AMP *consentiti* nei contenuti creativi di annunci AMPHTML Le estensioni e i tag integrati non elencati esplicitamente non sono ammessi.

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
- amp-mraid, ancora su base sperimentale. Se stai pensando di utilizzare questo elemento, fai una segnalazione su [wg-ads](https://github.com/ampproject/wg-ads/issues/new).
- [amp-mustache](https://amp.dev/documentation/components/amp-mustache)
- [amp-pixel](https://amp.dev/documentation/components/amp-pixel)
- [amp-position-observer](https://amp.dev/documentation/components/amp-position-observer)
- [amp-selector](https://amp.dev/documentation/components/amp-selector)
- [amp-social-share](https://amp.dev/documentation/components/amp-social-share)
- [amp-video](https://amp.dev/documentation/components/amp-video)

La maggior parte delle esclusioni riguardano elementi non inclusi per garantire le migliori prestazioni o per semplificare l'analisi degli annunci AMPHTML.

*Esempio:* l'elemento `<amp-ad>` è escluso da questo elenco. È esplicitamente vietato perché la presenza di elementi `<amp-ad>` all'interno di altri `<amp-ad>` potrebbe causare sequenze potenzialmente illimitate di caricamento in cascata degli annunci, in contrasto con gli obiettivi di elevato rendimento perseguiti dagli annunci AMPHTML.

*Esempio:* l'elemento `<amp-iframe>` è escluso da questo elenco. Non è consentito perché gli annunci potrebbero utilizzarlo per eseguire codice Javascript arbitrario o caricare contenuti arbitrari. Gli annunci che devono utilizzare tali funzionalità devono restituire `false` dal loro attributo [a4aRegistry](https://github.com/ampproject/amphtml/blob/main/ads/_a4a-config.js#L40) e utilizzare il meccanismo di rendering degli annunci "3p iframe" esistente.

*Esempio:* gli elementi `<amp-facebook>`, `<amp-instagram>`, `<amp-twitter>` e `<amp-youtube>` sono tutti esclusi per lo stesso motivo di `<amp-iframe>`: tutti creano iframe che possono potenzialmente consumare risorse illimitate.

*Esempio:* gli elementi `<amp-ad-network-*-impl>` sono omessi da questo elenco. `<amp-ad>` gestisce la delega a questi tag di implementazione; i contenuti creativi non possono includerli direttamente.

*Esempio:* l'elemento `<amp-lightbox>` non è ancora incluso perché anche alcuni contenuti creativi di annunci AMPHTML possono essere visualizzati in un iframe e attualmente non esiste alcun meccanismo per l'espansione di annunci oltre un iframe. In futuro, in caso se ne dimostri la necessità, il sistema potrà aggiungere il supporto di tale elemento.

### Tag HTML <a name="html-tags"></a>

I seguenti tag sono *consentiti* nei contenuti creativi degli annunci AMPHTML. I tag non esplicitamente indicati non sono consentiti. Questo elenco è un sottoinsieme della [lista di tag AMP aggiuntivi consentiti](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/../../spec/amp-tag-addendum.md). Anche questo elenco è coerente con le specifiche HTML5 riportate nella sezione 4 [Elementi di HTML](http://www.w3.org/TR/html5/single-page.html#html-elements).

La maggior parte delle esclusioni riguardano elementi che compromettono le prestazioni o tag che non sono standard HTML5. Ad esempio, `<noscript>` viene escluso perché gli annunci AMPHTML dipendono dall'attivazione di JavaScript, quindi un blocco `<noscript>` non verrà mai eseguito e, di conseguenza, aumenterà solo la dimensione dei contenuti creativi, oltre ai consumi di banda e ai tempi di latenza. Analogamente, gli elementi `<acronym>`, `<big>` e altri non sono consentiti perché incompatibili con HTML5.

#### 4.1 Elemento radice <a name="41-the-root-element"></a>

4.1.1 `<html>`

- Deve utilizzare i tipi `<html ⚡4ads>` o `<html amp4ads>`

#### 4.2 Metadati del documento <a name="42-document-metadata"></a>

4.2.1 `<head>`

4.2.2 `<title>`

4.2.4 `<link>`

- i tag `<link rel=...>` non sono consentiti, ad eccezione di `<link rel=stylesheet>`.

- **Nota:** a differenza dell'AMP generale, i tag `<link rel="canonical">` non sono ammessi.

    4.2.5 `<style>` 4.2.6 `<meta>`

#### 4.3 Sezioni <a name="43-sections"></a>

4.3.1 `<body>` 4.3.2 `<article>` 4.3.3 `<section>` 4.3.4 `<nav>` 4.3.5 `<aside>` 4.3.6 `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>` e `<h6>` 4.3.7 `<header>` 4.3.8 `<footer>` 4.3.9 `<address>`

#### 4.4 Raggruppamento di contenuti <a name="44-grouping-content"></a>

4.4.1 `<p>` 4.4.2 `<hr>` 4.4.3 `<pre>` 4.4.4 `<blockquote>` 4.4.5 `<ol>` 4.4.6 `<ul>` 4.4.7 `<li>` 4.4.8 `<dl>` 4.4.9 `<dt>` 4.4.10 `<dd>` 4.4.11 `<figure>` 4.4.12 `<figcaption>` 4.4.13 `<div>` 4.4.14 `<main>`

#### 4.5 Semantica a livello di testo <a name="45-text-level-semantics"></a>

4.5.1 `<a>` 4.5.2 `<em>` 4.5.3 `<strong>` 4.5.4 `<small>` 4.5.5 `<s>` 4.5.6 `<cite>` 4.5.7 `<q>` 4.5.8 `<dfn>` 4.5.9 `<abbr>` 4.5.10 `<data>` 4.5.11 `<time>` 4.5.12 `<code>` 4.5.13 `<var>` 4.5.14 `<samp>` 4.5.15 `<kbd >` 4.5.16 `<sub>` e `<sup>` 4.5.17 `<i>` 4.5.18 `<b>` 4.5.19 `<u>` 4.5.20 `<mark>` 4.5.21 `<ruby>` 4.5.22 `<rb>` 4.5.23 `<rt>` 4.5.24 `<rtc>` 4.5.25 `<rp>` 4.5.26 `<bdi>` 4.5.27 `<bdo>` 4.5.28 `<span>` 4.5.29 `<br>` 4.5.30 `<wbr>`

#### 4.6 Modifiche <a name="46-edits"></a>

4.6.1 `<ins>` 4.6.2 `<del>`

#### 4.7 Contenuti incorporati<a name="47-embedded-content"></a>

- I contenuti incorporati sono supportati solo tramite tag AMP, quali `<amp-img>` e `<amp-video>`.

#### 4.7.4 `<source>` <a name="474-source"></a>

#### 4.7.18 SVG <a name="4718-svg"></a>

I tag SVG non si trovano nello spazio dei nomi HTML5. Sono elencati di seguito senza id di sezione.

`<svg>`
`<g>`
`<percorso>`
`<glifo>`
`<glyphref>`
`<marker>`
`<view>`
`<circolo>`
`<line>`
`<poligono>`
`<polyline>`
`<rect>`
`<testo>`
`<textpath>`
`<tref>`
`<tspan>`
`<clippath>`
`<filter>`
`<lineargradient>`
`<radialgradient>`
`<mask>`
`<modello>`
`<vkern>`
`<hkern>`
`<defs>`
`<use>`
`<simbolo>`
`<desc>`
`<title>`

#### 4.9 Dati tabulari <a name="49-tabular-data"></a>

4.9.1 `<table>` 4.9.2 `<caption>` 4.9.3 `<colgroup>` 4.9.4 `<col>` 4.9.5 `<tbody>` 4.9.6 `<thead>` 4.9.7 `<tfoot>` 4.9.8 `<tr>` 4.9.9 `<td>` 4.9.10 `<th>`

#### 4.10 Moduli <a name="410-forms"></a>

4.10.8 `<button>`

#### 4.11 Script <a name="411-scripting"></a>

- Come nel caso di documenti AMP generali, il tag `<head>` dei contenuti creativi deve contenere un tag `<script async src="https://ampjs.org/amp4ads-v0.js"></script>`.
- A differenza dei documenti AMP generali, l'uso di `<noscript>` non è consentito.
    - *Spiegazione:* poiché gli annunci AMPHTML richiedono che Javascript sia abilitato per funzionare, i blocchi `<noscript>` non hanno alcuno scopo negli annunci AMPHTML e causano solo maggiori consumi di risorse di rete.
- A differenza dei documenti AMP generali, l'uso di `<script type="application/ld+json">` non è consentito.
    - *Spiegazione:* I blocchi JSON LD sono utilizzati per il markup dei dati strutturati sulle pagine host, ma gli elementi creativi degli annunci non sono documenti autonomi e non contengono dati strutturati. I blocchi JSON LD al loro interno causerebbero solo maggiori consumi di risorse di rete.
- Tutte le altre regole ed esclusioni relative agli script sono quelle applicate nei documenti AMP generali.
