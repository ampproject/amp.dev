---
$title: amp-accordion
$category@: layout
teaser:
  text: Permette ai visualizzatori di dare un'occhiata alla struttura dei contenuti e passare a una sezione a loro scelta.
---


<!--
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



Permette ai visualizzatori di dare un'occhiata alla struttura dei contenuti e passare a qualsiasi sezione. Questa funzione è utile per i dispositivi mobili dove anche solo un paio di frasi rendono indispensabile lo scorrimento per raggiungere una sezione.

<table>
  <tr>
    <td class="col-fourty"><strong>Script obbligatorio</strong></td>
    <td><code>&lt;script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layout supportati</a></strong></td>
    <td>container</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Esempi</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-accordion/">Esempio di codice annotato per amp-accordion</a></td>
  </tr>
</table>


## Comportamento <a name="behavior"></a>

Il componente `amp-accordion` ti permette di mostrare sezioni di contenuti comprimibili ed espandibili. Ciascuno degli elementi secondari immediati del componente `amp-accordion` viene considerato una sezione di accordion. Ognuno di questi nodi deve essere un tag `<section>`.

* Un componente `amp-accordion` può contenere uno o più elementi `<section>` come elementi secondari diretti.
* Ciascun elemento `<section>` deve contenere esattamente due elementi secondari diretti.
* Il primo elemento secondario della sezione deve essere un elemento di intestazione (un `header` `h1`, `h2`, ..., `h6`) e rappresenta l'intestazione della sezione.
* Il secondo elemento secondario della sezione può essere un qualsiasi tag consentito in HTML AMP e rappresenta i contenuti della sezione.
* Facendo clic o toccando l'intestazione di una sezione, questa si espande o si comprime.
* Lo stato compresso/espanso di ogni sezione nell'elemento `amp-accordion` viene mantenuto al livello di sessione. Per disattivare la conservazione di questo stato, aggiungi l'attributo `disable-session-states` all'elemento `amp-accordion`.

#### Esempio: visualizzazione di un accordion <a name="example-displaying-an-accordion"></a>

In questo esempio vengono visualizzate tre sezioni, in cui la terza viene espansa al caricamento della pagina.  Inoltre, abbiamo disattivato la conservazione dello stato compresso/espanso impostando `disable-session-states`.

[example preview="inline" playground="true" imports="amp-accordion"]
```html
<amp-accordion{% if not format=='email'%} disable-session-states{% endif %}>
  <section>
    <h2>Section 1</h2>
    <p>Content in section 1.</p>
  </section>
  <section>
    <h2>Section 2</h2>
    <div>Content in section 2.</div>
  </section>
  <section expanded>
    <h2>Section 3</h2>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/squirrel.jpg"
      width="320"
      height="256"></amp-img>
  </section>
</amp-accordion>
```
[/example]

[tip type="success"]
Per vedere altre demo relative ad `amp-accordion`, visita il sito [AMP By Example](https://ampbyexample.com/components/amp-accordion/).
[/tip]

### Eventi <a name="events"></a>

The events below will be triggered on `section`s of `accordion`.

<table>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>Questo evento viene attivato nella <code>section</code> target che passa dallo stato compresso a quello espanso. Tieni presente che questo evento non si attiva chiamando <code>expand</code> in una <code>section</code> già espansa.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>collapse</code></strong></td>
    <td>Questo evento viene attivato nella <code>section</code> target che passa dallo stato espanso a quello compresso. Tieni presente che questo evento non si attiva chiamando <code>collapse</code> in una <code>section</code> già compressa.</td>
  </tr>
</table>

### Azioni <a name="actions"></a>

<table>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>Questo evento viene attivato nella <code>section</code> target che passa dallo stato compresso a quello espanso. Tieni presente che questo evento non si attiva chiamando <code>expand</code> in una <code>section</code> già espansa.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>toggle</code></strong></td>
    <td>Questa azione attiva o disattiva gli stati <code>expanded</code> e <code>collapsed</code> di <code>amp-accordion</code>. Quando viene chiamata senza argomenti, attiva o disattiva tutte le sezioni dell'accordion. Puoi specificare una singola sezione con l'argomento <code>section</code> e l' <code>id</code> corrispondente come valore.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>Questa azione espande un <code>amp-accordion</code>. Se è già <code>expanded</code>, resterà tale. Quando viene chiamata senza argomenti, espande tutte le sezioni dell'accordion. Puoi specificare una singola sezione con l'argomento <code>section</code> e l' <code>id</code> corrispondente come valore.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>collapse</code></strong></td>
    <td>Questa azione comprime un <code>amp-accordion</code>. Se è già compresso, resterà tale. Quando viene chiamato senza argomenti, comprime tutte le sezioni dell'accordion. Puoi specificare una singola sezione con l'argomento <code>section</code> e l' <code>id</code> corrispondente come valore.</td>
  </tr>
</table>

#### Attributi <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong><code>animate</code></strong></td>
    <td>Imposta questo attributo nell'<code>&lt;amp-accordion&gt;</code> per aggiungere un'animazione all'espansione/compressione di tutte le sezioni dell'accordion.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>disable-session-states</code></strong></td>
    <td>Imposta questo attributo nell'<code>&lt;amp-accordion&gt;</code> per disattivare la conservazione dello stato compresso/espanso dell'accordion.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expanded</code></strong></td>
    <td>Imposta questo attributo in una <code>&lt;section&gt;</code> per mostrarla in stato espanso al caricamento della pagina.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expand-single-section</code></strong></td>
    <td>Imposta questo attributo nell'<code>&lt;amp-accordion&gt;</code> per consentire solo una <code>&lt;section&gt;</code> espansa alla volta. Se l'utente si concentra su una <code>&lt;section&gt;</code>, tutte le <code>&lt;section&gt;</code> precedentemente espanse verranno compresse.</td>
  </tr>
</table>

## Stili <a name="styling"></a>

* Puoi utilizzare il selettore di elementi `amp-accordion` per modificare lo stile come preferisci.
* Gli elementi `amp-accordion` sono sempre `display: block`.
* Gli elementi `<section>`, dell'intestazione e dei contenuti non consentono il floating.
* Quando la sezione è espansa, l'elemento `<section>` ha un attributo `expanded`.
* L'elemento dei contenuti è fissato in modo chiaro con `overflow: hidden`, quindi non può presentare barre di scorrimento.
* I margini degli elementi `<amp-accordion>`, `<section>`, dell'intestazione e dei contenuti sono impostati su 0 e possono essere sovrascritti in stili personalizzati.
* Gli elementi dell'intestazione e dei contenuti sono `position: relative`.

## Convalida <a name="validation"></a>

Consulta le [regole amp-accordion](https://github.com/ampproject/amphtml/blob/master/extensions/amp-accordion/validator-amp-accordion.protoascii) nella specifica dello strumento di convalida AMP.
