---
"$title": Come funziona un ottimizzatore AMP
"$order": '1'
description: "Un ottimizzatore AMP prende in input un documento AMPHTML valido e lo trasforma in una versione migliorata, applicando ulteriori ottimizzazioni che sarebbero scomode da eseguire manualmente. Questa guida spiega in dettaglio il funzionamento dell'ottimizzatore AMP."
formats:
- websites
- stories
author: sebastianbenz
---

Un ottimizzatore AMP prende in input un documento AMPHTML valido e lo trasforma in una versione migliorata, applicando ulteriori ottimizzazioni che sarebbero scomode da eseguire manualmente. Il risultante codice “**AMP trasformato**” nell'elemento `html` può essere riconosciuto tramite l'attributo `transformed`:

```
<html ⚡ i-amphtml-layout i-amphtml-no-boilerplate transformed="self;v=1">
```

Nota: le cache AMP utilizzano un flag di trasformazione diverso, ad esempio, le cache AMP Google aggiungono l'attributo `transformed=google;v=1`.

Gli ottimizzatori AMP eseguono miglioramenti di vario tipo sui documenti AMP, ad esempio layout con rendering lato server, ottimizzazione delle immagini ecc. Qui è riportato un esempio che mostra le differenze tra una pagina AMP e la sua versione ottimizzata ([fare clic per una versione ingrandita](/static/img/docs/guides/optimized-amp-diff.png)).

<a href="/static/img/docs/guides/optimized-amp-diff.png"><amp-img lightbox layout="responsive" width="2560" height="773" src="/static/img/docs/guides/optimized-amp-diff.png"></amp-img></a>

Nel resto di questa guida, presenteremo queste ottimizzazioni in maggior dettaglio.

### Layout AMP con rendering lato server

I layout AMP con rendering lato server danno le maggiori opportunità di migliorare il caricamento delle pagine AMP. Per evitare spostamenti di contenuti, AMP richiede ai siti web di aggiungere il [codice AMP-boilerplate](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) nell'intestazione. Il codice AMP-boilerplate nasconde il contenuto della pagina impostando l'opacità della sua sezione body a 0. Dopo il caricamento dell'AMP, il sistema è in grado di calcolare il layout della pagina. Successivamente, il sistema AMP imposta l'opacità della sezione body su 1, rendendo visibile il contenuto della pagina. Purtroppo, questo approccio richiede che il framework AMP sia caricato prima di eseguire il rendering della pagina.

Per migliorare questo aspetto, i layout AMP, ad esempio i layout di tipo `responsive` o `fixed-height`, possono eseguire un rendering lato server prima di fornire la pagina all'agente utente. In tal modo è possibile rimuovere il codice boilerplate AMP, evitando comunque il rischio di [spostamento dei contenuti](https://web.dev/cls/) durante il caricamento della pagina.

I rendering lato server eseguono tre operazioni:

⁣ **1. Rimozione del boilerplate AMP: ** per ogni elemento che utilizza un layout AMP, il sistema inserisce il markup specifico del layout.

⁣**2. Inline AMP-internal CSS styles: ** the AMP-boilerplate code is replaced by the <a href="https://cdn.ampproject.org/v0.css">AMP-runtime CSS styles</a>: &lt;style amp-runtime>...&lt;/style>. For non-server-side rendered documents, AMP adds these styles at runtime. However, server-side-rendered AMP pages require these for the AMP layouts to work before AMP has been loaded. To avoid potential version conflicts, at runtime, AMP will check if the version specified in i-amphtml-version="011905222334000" differs from the current AMP version and will update the CSS with the latest version if not.

```
<style amp-runtime i-amphtml-version="011905222334000">html{overflow-x:hidden!important}html.i-amphtml-...</style>
```

⁣ **3. Layout AMP con rendering lato server: ** per ogni elemento che utilizza un layout AMP, il sistema inserisce gli elementi che definiscono le dimensioni specifici del layout.

```
<amp-img src="image.jpg" width="1080" height="610" layout="responsive"
         class="i-amphtml-layout-responsive i-amphtml-layout-size-defined" i-amphtml-layout="responsive">
  <i-amphtml-sizer style="display:block;padding-top:56.4815%;"></i-amphtml-sizer>
</amp-img>
```

Avviso: non sempre è possibile rimuovere il codice boilerplate AMP. La rimozione del boilerplate sarà indicata dalla presenza dell'attributo `i-amphtml-no-boilerplate` nell'elemento `html`. Ad esempio, il componente `amp-experiment` modifica il contenuto della pagina a runtime. Per evitare spostamenti di contenuti, è necessario che il codice AMP-boilerplate sia presente quando `amp-experiment` è utilizzato su una pagina.

### Ottimizzazione immagini hero

Un ottimizzatore AMP può velocizzare il rendering delle immagini nella prima finestra di visualizzazione. Questo è di fondamentale importanza quando si ottimizzano i [tempi LCP](https://web.dev/lcp/) per soddisfare le prestazioni richieste per gli indicatori [Core Web Vitals](https://web.dev/vitals).

In AMP, le immagini hero possono essere dichiarate esplicitamente, aggiungendo a un elemento `amp-img` l'attributo `data-hero`:

```
<amp-img data-hero src="/hero.jpg" layout="responsive" width="640" height="480"></amp-img>
```

Gli ottimizzatori AMP supportano un massimo di due immagini hero su ogni pagina per evitare di sottrarre banda di rete ad altre risorse critiche. Se questo limite non va bene per te, [ce lo puoi segnalare](https://github.com/ampproject/amp-toolbox/issues).

Gli ottimizzatori AMP rilevano automaticamente anche le immagini hero per gli elementi `amp-img`, `amp-iframe`, `amp-video` o `amp-video-iframe` e inseriscono l'attributo `link rel=preload` per l'elemento `src` dell'immagine. Il rilevamento automatico funziona analizzando il markup HTML e i layout delle immagini per individuare quelle di grandi dimensioni nella prima finestra di visualizzazione.

In caso di elementi `amp-img`, gli ottimizzatori AMP effettueranno il rendering lato server anche dei tag `img` all'interno di `amp-img`. Ciò consente al browser di eseguire immediatamente il rendering dell'immagine senza dover attendere il caricamento del sistema di runtime AMP.

### Ottimizzazione immagini

Gli otttimizzatori AMP permettono di fornire immagini reattive ottimizzate, generando attributi  `srcset` specifici dei layout AMP in uso. Ad esempio, la seguente dichiarazione `amp-img`:

```
<amp-img src="image1.png" width="400" height="800" layout="responsive"></amp-img>
```

è migliorata dalla seguente definizione `srcset`:

```
<amp-img src="image1.png" width="400" height="800" layout="responsive" srcset="image1.470w.png 470w, image1.820w.png 820w, image1.1440w.png 1440w"></amp-img>
```

Per il corretto funzionamento di tale codice, l'ambiente di compilazione/ hosting deve supportare il ridimensionamento/ottimizzazione delle immagini. Puoi dare un'occhiata alle guide dei singoli ottimizzatori per integrare al meglio l'ottimizzazione delle immagini.

### AMP Module Build (presto disponibile)

È disponibile una versione più piccola di componenti e sistema Runtime AMP basata sui [moduli JavaScript](https://v8.dev/features/modules#browser), che richiede agli utenti di scaricare meno codice JavaScript durante la visualizzazione di una pagina AMP. Gli ottimizzatori AMP abilitano la creazione del modulo AMP per impostazione predefinita, trasformando il seguente codice:

```
<script async src="https://www.ampproject.org/v0.js"></script>
```

in:

```
<script type="module" async src="https://www.ampproject.org/v0.mjs"></script>
<script nomodule async src="https://www.ampproject.org/v0.js"></script>
```

I browser che comprendono l'attributo `type="module"` ignorano gli script con un attributo `nomodule`. Ciò significa che gli utenti con browser moderni trarranno vantaggio dai pacchetti di runtime più piccoli, mentre gli utenti con browser meno recenti eseguiranno il fallback alla versione del sistema di runtime AMP che non supporta i moduli.

Nota: la funzione AMP Module Build è disponibile solo per codici AMP trasformati poiché richiede che il codice CSS del runtime AMP sia inline.
