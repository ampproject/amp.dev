---
$title: amp-iframe
$category@: layout
teaser:
  text: Mostra un iframe.
---


<!--
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



Mostra un iframe.


<table>
  <tr>
    <td width="40%"><strong>Script obbligatorio</strong></td>
    <td><code>&lt;script async custom-element="amp-iframe" src="https://ampjs.org/v0/amp-iframe-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Layout supportati</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Esempi</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-iframe/">Esempio di codice annotato per amp-iframe</a></td>
  </tr>
</table>

# Comportamento <a name="behavior"></a>

`amp-iframe` presenta varie differenze importanti dagli iframe Vanilla progettati per una maggiore sicurezza e per evitare che i file AMP siano dominati da un solo iframe:

* Un `amp-iframe` potrebbe non comparire vicino alla parte superiore del documento, eccetto per gli iframe che utilizzano `placeholder`, come descritto [più avanti](#iframe-with-placeholder). L'iframe deve essere distante 600 px dalla parte superiore o comunque non trovarsi nel primo 75% dell'area visibile quando si scorre verso l'alto, a seconda di quale delle due opzioni è più piccola.
* Per impostazione predefinita, un amp-iframe è limitato tramite sandbox (vedi i [dettagli](#sandbox)).
* Un `amp-iframe` deve richiedere risorse solo tramite HTTPS, da un URI dati o tramite l'attributo `srcdoc`.
* Un `amp-iframe` non deve trovarsi nella stessa origine del contenitore, a meno che `allow-same-origin` non sia consentito nell'attributo `sandbox`. Vedi il documento sulle [norme relative alle origini di iframe](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-iframe-origin-policy.md) doc per ulteriori dettagli sulle origini consentite per gli iframe.

*Esempio: incorporamento di una mappa Google in un amp-iframe*

```html
<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    frameborder="0"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=iceland">
  </amp-iframe>
```

Viene visualizzata come:

<amp-iframe width="200" height="100" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&amp;q=iceland" sandbox="allow-scripts allow-same-origin" layout="responsive" frameborder="0">
</amp-iframe>

[tip type="success"]
Per vedere altre demo relative ad `amp-iframe`, visita il sito [AMP By Example](https://ampbyexample.com/components/amp-iframe/).
[/tip]

# Utilizzo di amp-iframe per gli annunci <a name="usage-of-amp-iframe-for-advertising"></a>

`amp-iframe` **non deve** essere usato principalmente per pubblicare annunci. `amp-iframe` può essere utilizzato per mostrare video all'interno dei quali compaiono degli annunci. Questa norma AMP può essere applicata non visualizzando i rispettivi iframe.

I casi d'uso pubblicitari dovrebbero invece utilizzare [`amp-ad`](amp-ad.md).

I motivi di questa norma sono i seguenti:

* `amp-iframe` applica la limitazione tramite sandbox e la sandbox viene applicata anche agli iframe secondari. Ciò significa che le pagine di destinazione potrebbero non funzionare anche nel caso in cui l'annuncio sembri a posto.
* `amp-iframe` non fornisce alcun modo per trasmettere la configurazione all'iframe.
* `amp-iframe` non possiede un meccanismo di ridimensionamento controllato completamente dall'iframe.
* Le informazioni sulla visibilità potrebbero non essere disponibili per `amp-iframe`.

# Attributi <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>L'attributo <code>src</code> si comporta principalmente come un iframe standard, con un'eccezione: all'URL viene aggiunto il frammento <code>#amp=1</code> per far sì che
        i documenti di origine sappiano di essere incorporati in un contesto AMP. Questo frammento viene aggiunto solo se l'URL specificato da <code>src</code>
      non ha già un frammento.</td>
    </tr>
    <tr>
      <td width="40%"><strong>srcdoc, frameborder, allowfullscreen, allowpaymentrequest, allowtransparency, referrerpolicy</strong></td>
      <td>Questi attributi si comportano come sugli iframe standard.
        <br>
          Se <code>frameborder</code> non è specificato, per impostazione predefinita, sarà <code>0</code>.</td>
        </tr>
        <tr>
          <td width="40%"><strong>sandbox</strong><a name="sandbox"></a></td>
          <td>Gli iframe creati da <code>amp-iframe</code> hanno sempre l'attributo <code>sandbox</code>. Per impostazione predefinita, il valore è vuoto, il che significa che sono "limitati al massimo dalla sandbox". Se imposti i valori <code>sandbox</code>, puoi ridurre la limitazione tramite sandbox dell'iframe. Tutti i valori supportati dai browser sono consentiti. Ad esempio, l'impostazione <code>sandbox="allow-scripts"</code> permette all'iframe di eseguire JavaScript oppure <code>sandbox="allow-scripts allow-same-origin"</code> consente all'iframe di eseguire JavaScript, creare XHR non-CORS e leggere/scrivere cookie.
            <br><br>
              Se esegui utilizzi iframe per un documento che non è stato creato appositamente per la limitazione tramite sandbox, probabilmente dovrai aggiungere <code>allow-scripts allow-same-origin</code> all'attributo <code>sandbox</code> e consentire funzionalità aggiuntive.
              <br><br>
                Tieni anche presente che la sandbox si applica a tutte le finestre aperte da un iframe limitato tramite sandbox. Ciò include le nuove finestre create da un link con <code>target=_ blank</code> (aggiungi <code>allow-popups</code> perché ciò avvenga). Aggiungendo <code>allow-popups-to-escape-sandbox</code> all'attributo <code>sandbox</code>, queste nuove finestre si comporteranno come se non fossero limitate tramite sandbox. In genere è ciò di cui avrai bisogno la maggior parte delle volte. Purtroppo, al momento della stesura di questo articolo, <code>allow-popups-to-escape-sandbox</code> è supportato solo da Chrome.
                <br><br>
                  Vedi i <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox">documenti disponibili su MDN</a> per ulteriori informazioni sull'attributo sandbox.</td>
                </tr>
                <tr>
                  <td width="40%"><strong>common attributes</strong></td>
                  <td>Questo elemento include <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">attributi comuni</a> estesi ai componenti AMP.</td>
                </tr>
              </table>

# Iframe con segnaposto <a name="iframe-with-placeholder"></a>

È possibile far comparire un `amp-iframe` nella parte superiore di un documento quando `amp-iframe` ha un elemento `placeholder`, come mostrato nell'esempio seguente.

* `amp-iframe` deve contenere un elemento con l'attributo `placeholder`, ad esempio un elemento `amp-img`, che verrebbe mostrato come segnaposto fino a che l'iframe non è pronto a essere visualizzato.
* Puoi l'idoneità a iframe ascoltando l'`onload` dell'iframe o un `embed-ready` `postMessage` inviato dal documento iframe, a seconda di quale dei arriva per primo.

*Esempio: iframe con un segnaposto*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow-same-origin"
    src="https://foo.com/iframe">
    <amp-img layout="fill" src="https://foo.com/foo.png" placeholder></amp-img>
</amp-iframe>
```

*Esempio: richiesta iframe embed-ready*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-ready'
  }, '*');
```

# Ridimensionamento iframe <a name="iframe-resizing"></a>

Un `amp-iframe` deve avere un layout statico definito, come tutti gli altri elementi AMP. Tuttavia,
è possibile ridimensionare un `amp-iframe` durante al momento dell'esecuzione. Per farlo:

1. `amp-iframe` deve essere definito con l'attributo `resizable`.
1. `amp-iframe` deve avere un elemento secondario `overflow`.
1. `amp-iframe` deve impostare l'attributo sandbox `allow-same-origin`.
1. Il documento iframe deve inviare una richiesta `embed-size` come messaggio all'interno di una finestra.
1. La richiesta `embed-size` verrà negata se l'altezza della richiesta è inferiore a un determinata soglia (100 px).

Tieni presente che `resizable` sovrascrive il valore `scrolling` su `no`.

*Esempio: `amp-iframe` con elemento `overflow`*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow-same-origin"
    resizable
    src="https://foo.com/iframe">
    <div overflow tabindex=0 role=button aria-label="Read more">Read more!</div>
</amp-iframe>
```

*Esempio: richiesta di ridimensionamento iframe*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-size',
  height: document.body.scrollHeight
  }, '*');
```

Una volta ricevuto questo messaggio, il runtime AMP cerca di soddisfare la richiesta al più presto, ma tiene conto di dove sta leggendo l'utente, se sta scorrendo la pagina o di altri fattori relativi all'UX o alle prestazioni. Se il runtime non è in grado di soddisfare la richiesta di ridimensionamento,
`amp-iframe` mostrerà un elemento `overflow`. Se fai clic sull'elemento `overflow`, `amp-iframe` verrà immediatamente ridimensionato, dato che viene attivato da un'azione dell'utente.

La velocità di ridimensionamento può variare:

* Se il ridimensionamento viene attivato dall'azione dell'utente.
* Se il ridimensionamento è richiesto per un iframe attualmente attivo.
* Se il ridimensionamento è richiesto per un iframe sotto o sopra l'area visibile.

# Visibilità iframe <a name="iframe-viewability"></a>

Gli iframe possono inviare un messaggio `send-intersections` ai loro elementi principali per iniziare a ricevere i [registri delle modifiche](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) di stile IntersectionObserver dell'intersezione dell'iframe con l'aria visibile principale.

*Nota: negli esempi di seguito, presupponiamo che lo script sia all'interno dell'iframe creato, dove `window.parent` è la finestra in alto. Se lo script si trova in un iframe nidificato, cambia `window.parent` nella finestra AMP principale.*

*Esempio: richiesta `send-intersections` iframe*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'send-intersections'
  }, '*');
```

L'iframe può ascoltare un messaggio `intersection` proveniente dalla finestra principale per ricevere i dati dell'intersezione.

*Esempio: richiesta `send-intersections` iframe*

```javascript
window.addEventListener('message', function(event) {
  if (event.source != window.parent ||
  event.origin == window.location.origin ||
  !event.data ||
  event.data.sentinel != 'amp' ||
  event.data.type != 'intersection') {
    return;
    }
  event.data.changes.forEach(function (change) {
    console.log(change);
  });
});
```

Il messaggio di intersezione verrà inviato dall'elemento principale all'iframe quando questo entra o esce dell'area visibile (o è parzialmente visibile) e quando l'iframe viene fatto scorrere o ridimensionato.

# Iframe di monitoraggio/analisi <a name="trackinganalytics-iframes"></a>

Consigliamo vivamente di utilizzare [`amp-analytics`](amp-analytics.md) a scopo di analisi. Si tratta infatti di una soluzione molto più solida, completa ed efficiente che puoi configurare per una vasta gamma di fornitori di dati analitici.

AMP consente di utilizzare un solo iframe per pagina a scopi di analisi e monitoraggio. Per risparmiare risorse, questi iframe saranno rimossi dal DOM 5 secondi dopo il loro caricamento, tempo che dovrebbe essere sufficiente al completamento di qualsiasi operazione.

Gli iframe sono identificati come iframe di monitoraggio/analisi se non sembrano servire ad alcuno scopo diretto dell'utente, ad esempio se sono invisibili o hanno dimensioni ridotte.

# Linee guida: utilizzare i componenti AMP esistenti anziché amp-iframe <a name="guideline-use-existing-amp-components-over-amp-iframe"></a>

Puoi utilizzare il componente `amp-iframe` come metodo alternativo, nel caso in cui l'esperienza utente richiesta non sia possibile in altri modi in AMP, ossia se non è già presente un [componente AMP](../../../documentation/components/index.html) adatto al caso d'uso. Questo perché l'utilizzo di un componente AMP progettato per uno specifico caso d'uso offre numerosi vantaggi, ad esempio:

* Migliore gestione e prestazioni delle risorse.
* In alcuni casi, i componenti personalizzati possono fornire immagini segnaposto integrate. Ciò significa, ad esempio, ottenere la miniatura video corretta prima del caricamento di un video e ridurre lo sviluppo di ulteriore codice per aggiungere manualmente un segnaposto.
* Ridimensionamento integrato. Ciò significa che i contenuti iframe con dimensioni non prevedibili possono essere visualizzati più spesso dall'utente come se fossero nativi della pagina anziché in un frame scorrevole.
* È possibile integrare altre funzioni aggiuntive, come la riproduzione automatica dei video player.

# Convalida <a name="validation"></a>

Consulta le [regole amp-iframe](https://github.com/ampproject/amphtml/blob/main/extensions/amp-iframe/validator-amp-iframe.protoascii) nella specifica dello strumento di convalida AMP.
