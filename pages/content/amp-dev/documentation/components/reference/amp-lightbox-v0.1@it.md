---
$title: amp-lightbox
$category@: layout
teaser:
  text: Mostra gli elementi in una finestra modale "lightbox" a piena area visibile.
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



<table>
  <tr>
    <td width="40%"><strong>Descrizione</strong></td>
    <td>Mostra gli elementi in una finestra modale "lightbox" a piena area visibile.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Script obbligatorio</strong></td>
    <td><code>&lt;script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layout supportati</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td width="40%"><strong>Esempi</strong></td>
    <td>Vedi l'esempio <a href="https://ampbyexample.com/components/amp-lightbox/">amp-lightbox</a> del sito AMP By Example.</td>
  </tr>
</table>


## Comportamento <a name="behavior"></a>

Il componente `amp-lightbox` definisce gli elementi secondari che vengono visualizzati in una finestra modale/overlay a piena area visibile. Quando l'utente tocca o fa clic su un elemento (ad esempio, un pulsante), l'ID `amp-lightbox` di riferimento nell'attributo `on` dell'elemento selezionato attiva la lightbox in modo che questa occupi l'intera area visibile e vengano visualizzati gli elementi secondari di `amp-lightbox`.

Premendo il tasto Esc sulla tastiera si chiude la lightbox. In alternativa, se imposti l'attributo `on` in uno o più elementi all'interno della lightbox e imposti il metodo su `close`, la lightbox si chiude quando l'utente tocca o fa clic sull'elemento.

```html
<button on="tap:quote-lb">See Quote</button>
<amp-lightbox id="quote-lb" layout="nodisplay">
  <blockquote>"Don't talk to me about JavaScript fatigue" - Horse JS</blockquote>
  <button on="tap:quote-lb.close">Nice!</button>
</amp-lightbox>
```

[tip type="read"]
per mostrare immagini in una lightbox, puoi usare anche il componente [`<amp-image-lightbox>`](amp-image-lightbox.md).
[/tip]

## Attributi <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>animate-in (facoltativo)</strong></td>
    <td>Definisce lo stile di animazione per l'apertura della lightbox. Per impostazione predefinita, è
      <code>fade-in</code>. Valori validi sono <code>fade-in</code>, <code>fly-in-bottom</code> e
        <code>fly-in-top</code>.
          <br><br>
            <strong>Nota</strong>: i preset di animazione <code>fly-in-*</code> modificano la proprietà <code>transform</code> dell'elemento
              <code>amp-lightbox</code>. Non fare affidamento sulla trasformazione diretta dell'elemento
                <code>amp-lightbox</code>. Se devi applicare una trasformazione, impostala invece su un elemento nidificato.</td>
              </tr>
              <tr>
                <td width="40%"><strong>close-button (obbligatorio per gli annunci HTML AMP)</strong></td>
                <td>Mostra l'intestazione di un pulsante di chiusura nella parte superiore della lightbox. Questo attributo è obbligatorio
                    e valido solo per l'uso con gli <a href="#a4a">annunci HTML AMP</a>.</td>
                </tr>
                <tr>
                  <td width="40%"><strong>id (obbligatorio)</strong></td>
                  <td>Un identificatore univoco per la lightbox.</td>
                </tr>
                <tr>
                  <td width="40%"><strong>layout (obbligatorio)</strong></td>
                  <td>Deve essere impostato su <code>nodisplay</code>.</td>
                </tr>
                <tr>
                  <td width="40%"><strong>scrollable (facoltativo)</strong></td>
                  <td>Quando è presente l'attributo <code>scrollable</code>, il contenuto della lightbox può scorrere quando supera l'altezza della lightbox.
                    <br><br>
                      <strong>Nota</strong>: l'attributo <code>scrollable</code> non è consentito se utilizzi <code><amp-lightbox></code> all'interno di un annuncio HTML AMP. Per ulteriori dettagli, consulta la sezione <a href="#a4a">Utilizzare amp-lightbox in annunci HTML AMP</a>.</td>
                    </tr>
                    <tr>
                      <td width="40%"><strong>scrollable (facoltativo)</strong></td>
                      <td></td>
                    </tr>
                  </table>

## Stili <a name="styling"></a>

Puoi modificare lo stile ad `amp-lightbox` con CSS standard.

## Azioni <a name="actions"></a>

`amp-lightbox` ti permette di attivare le seguenti azioni utilizzando [AMP on-syntax per attivare](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md):

<table>
  <tr>
    <th width="20%">Azione</th>
    <th>Descrizione</th>
  </tr>
  <tr>
    <td><code>open</code> (predefinita)</td>
    <td>Apre la lightbox.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Chiude la lightbox.</td>
  </tr>
</table>

## <a id="a4a"></a> Utilizzare `amp-lightbox` in annunci HTML AMP <a name="a4a"></a>

[tip type="note"]
il componente `amp-lightbox` da utilizzare negli annunci HTML AMP è [sperimentale](../../../documentation/guides-and-tutorials/learn/experimental.md) e attualmente in fase di sviluppo. Per utilizzare `amp-lightbox` in annunci HTML AMP, [attiva l'esperimento `amp-lightbox-a4a-proto`](http://cdn.ampproject.org/experiments.html).
[/tip]

Vi sono alcune differenze tra l'uso di `amp-lightbox` in normali documenti AMP e in [annunci scritti in HTML AMP](../../../documentation/guides-and-tutorials/learn/a4a_spec.md):

### Richiede close-button <a name="requires-close-button"></a>

Per gli annunci HTML AMP è necessario l'attributo `close-button`. Questo attributo fa apparire un'intestazione nella parte superiore della lightbox che contiene un pulsante di chiusura e un'etichetta con il testo "Annuncio". Questa intestazione è necessaria per:

* Impostare un'esperienza utente coerente e prevedibile per gli annunci HTML AMP.
* Assicurati che esista sempre un punto di uscita per la lightbox. In caso contrario, la creatività potrebbe compromettere i contenuti del documento host tramite una lightbox.

L'attributo `close-button` è obbligatorio e consentito solo negli annunci HTML AMP. Nei normali documenti AMP, puoi far visualizzare un pulsante di chiusura dove necessario come parte dei contenuti `<amp-lightbox>`.

### Le lightbox scorrevoli non sono consentite <a name="scrollable-lightboxes-are-disallowed"></a>

Le lightbox scorrevoli non sono consentite negli annunci HTML AMP.

### Sfondo trasparente <a name="transparent-background"></a>

Quando utilizzi `<amp-lightbox>` in annunci HTML AMP, lo sfondo dell'elemento `<body>` diventa trasparente in quanto il runtime AMP ridimensiona e riallinea i contenuti della creatività prima che la lightbox venga espansa. Ciò avviene per evitare un "salto" visivo della creatività all'apertura della lightbox. Se ti serve uno sfondo per la creatività, impostalo in un contenitore intermedio (come un `<div>` a grandezza originale) anziché in `<body>`.

Quando l'annuncio HTML AMP viene pubblicato in un ambiente di terze parti, come un documento non AMP, la creatività viene centrata rispetto all'area visibile ed espansa successivamente. Questo perché gli iframe di terze parti devono basarsi su API postMessage per attivare funzioni come il ridimensionamento dei frame, che è asincrono. Centrare prima la creatività permette quindi una transizione fluida senza salti visivi.

### Esempi di transizioni in lightbox per annunci HTML AMP <a name="examples-of-transitions-in-lightbox-for-amphtml-ads"></a>

Negli esempi riportati di seguito, dimostriamo come si presenta la transizione per un annuncio HTML AMP con l'attributo `animate-in="fly-in-bottom"` impostato nell'elemento lightbox per un annuncio HTML AMP in un iframe semplice e un annuncio HTML AMP in un iframe di terze parti.

##### In iframe semplici, ad esempio, provenienti da cache AMP <a name="on-friendly-iframes-eg-coming-from-an-amp-cache"></a>

<amp-img alt="lightbox ad in friendly iframe" width="360" height="480" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/lightbox-ad-fie.gif" layout="fixed">
  <noscript>
    <img alt="lightbox ad in friendly iframe" src="../../spec/img/lightbox-ad-fie.gif">
    </noscript>
  </amp-img>

##### In iframe di terze parti, ad esempio, esterni a cache AMP <a name="on-third-party-iframes-eg-outside-the-amp-cache"></a>

<amp-img alt="lightbox ad in 3p iframe" width="360" height="480" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/lightbox-ad-3p.gif" layout="fixed">
  <noscript>
    <img alt="lightbox ad in 3p iframe" src="../../spec/img/lightbox-ad-3p.gif">
    </noscript>
  </amp-img>

## Convalida <a name="validation"></a>

Consulta le [regole amp-lightbox](https://github.com/ampproject/amphtml/blob/main/extensions/amp-lightbox/validator-amp-lightbox.protoascii) nella specifica dello strumento di convalida AMP.
