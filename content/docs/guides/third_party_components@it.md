---
$title: Includere contenuti di terze parti
---

Scopri come includere componenti di terze parti nelle tue pagine.

[TOC]

## Incorporare un tweet

Incorpora un tweet di Twitter nella pagina utilizzando l'elemento [`amp-twitter`](/docs/reference/components/amp-twitter.html).

Per includere un tweet nella pagina, inserisci innanzitutto lo script seguente nella sezione `<head>`:

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

Attualmente i tweet vengono ridimensionati automaticamente e proporzionalmente in base alle dimensioni specificate, ma questo comportamento potrebbe portare a un aspetto non ottimale.
Regola manualmente la larghezza e l'altezza fornite oppure utilizza l'attributo media per selezionare le proporzioni in base alla larghezza dello schermo.

<!-- embedded twitter example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.twitter.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>


## Incorporare una foto di Instagram

Incorpora una foto di Instagram nella pagina utilizzando l'elemento [`amp-instagram`](/docs/reference/components/amp-instagram.html).

Per includere una foto di Instagram, inserisci innanzitutto lo script seguente nella sezione `<head>`:

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Includi l'elemento data-shortcode di Instagram indicato nell'URL della foto del servizio. Ad esempio, nell'URL `https://instagram.com/p/fBwFP` l'elemento data-shortcode è `fBwFP`.
Inoltre, Instagram utilizza proporzioni fisse per i layout reattivi, quindi il valore di larghezza e altezza dovrebbe essere universale.

<!-- embedded Instagram example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.instagram.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## Mostrare post o video di Facebook

Mostra un post o un video di Facebook nella pagina utilizzando l'elemento [`amp-facebook`](/docs/reference/components/amp-facebook.html).

Devi includere lo script seguente nella sezione `<head>`:

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

##### Esempio: Incorporamento di un post

Source: 
```html
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
```
Preview: 
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>

##### Esempio: Incorporamento di un video

Source: 
```html
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>
```
Preview: 
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>


## Includere un video di YouTube

Includi un video di YouTube nella pagina utilizzando l'elemento [`amp-youtube`](/docs/reference/components/amp-youtube.html).

Devi includere lo script seguente nella sezione `<head>`:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

Puoi trovare l'elemento `data-videoid` di YouTube nell'URL di ogni pagina video di YouTube.
Ad esempio, nell'URL `https://www.youtube.com/watch?v=Z1q71gFeRqM`, l'ID video è `Z1q71gFeRqM`.

Utilizza `layout="responsive"` per ottenere i layout corretti per video con proporzioni 16:9:

<!-- embedded youtube example -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.youtube.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## Mostrare un annuncio

Mostra un annuncio nella pagina utilizzando l'elemento [`amp-ad`](/docs/reference/components/amp-ad.html).
Sono supportati soltanto gli annunci pubblicati tramite HTTPS.

All'interno del documento AMP non è possibile eseguire codice JavaScript fornito da reti pubblicitarie.
Il runtime AMP carica un iframe da un'origine diversa (tramite la sandbox iframe) ed esegue il codice JavaScript della rete pubblicitaria all'interno della sandbox iframe.

Devi specificare la larghezza e l'altezza dell'annuncio, oltre al tipo di rete pubblicitaria.
L'attributo `type` identifica il modello della rete pubblicitaria.
Tipi di annunci diversi richiedono attributi `data-*` differenti.

<!-- embedded ad example -->
<div>
<amp-iframe height="212"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.ad-basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

Includi un attributo `placeholder` (se supportato dalla rete pubblicitaria) da mostrare se non ci sono annunci disponibili:

<!-- embedded ad example -->
<div>
<amp-iframe height="232"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/thirdparty.ad-placeholder.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

AMP supporta una vasta gamma di reti pubblicitarie. Consulta [un elenco completo](/docs/reference/components/amp-ad.html#supported-ad-networks).
