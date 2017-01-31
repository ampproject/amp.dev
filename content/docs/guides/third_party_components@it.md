---
$title: Includere contenuti di terze parti
---

Scopri come includere componenti di terze parti nelle tue pagine.

[TOC]

## Incorporare un tweet

Incorpora un tweet di Twitter nella pagina utilizzando l'elemento [`amp-twitter`](/docs/reference/extended/amp-twitter.html).

Per includere un tweet nella pagina, inserisci innanzitutto lo script seguente nella sezione `<head>`:

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

Attualmente i tweet vengono ridimensionati automaticamente e proporzionalmente in base alle dimensioni specificate, ma questo comportamento potrebbe portare a un aspetto non ottimale.
Regola manualmente la larghezza e l'altezza fornite oppure utilizza l'attributo media per selezionare le proporzioni in base alla larghezza dello schermo.

`amp-twitter` di esempio tratto dall'[esempio di twitter.amp](https://github.com/ampproject/amphtml/blob/master/examples/twitter.amp.html):

[sourcecode:html]
<amp-twitter width=390 height=50
    layout="responsive"
    data-tweetid="638793490521001985">
</amp-twitter>
[/sourcecode]

## Incorporare una foto di Instagram

Incorpora una foto di Instagram nella pagina utilizzando l'elemento [`amp-instagram`](/docs/reference/extended/amp-instagram.html).

Per includere una foto di Instagram, inserisci innanzitutto lo script seguente nella sezione `<head>`:

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Includi l'elemento data-shortcode di Instagram indicato nell'URL della foto del servizio. Ad esempio, nell'URL `https://instagram.com/p/fBwFP` l'elemento data-shortcode è `fBwFP`.
Inoltre, Instagram utilizza proporzioni fisse per i layout reattivi, quindi il valore di larghezza e altezza dovrebbe essere universale.

[sourcecode:html]
<amp-instagram
    data-shortcode="fBwFP"
    width="320"
    height="392"
    layout="responsive">
</amp-instagram>
[/sourcecode]

## Mostrare post o video di Facebook

Mostra un post o un video di Facebook nella pagina utilizzando l'elemento [`amp-facebook`](/docs/reference/extended/amp-facebook.html).

Devi includere lo script seguente nella sezione `<head>`:

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

Esempio - Incorporamento di un post:

[sourcecode:html]
<amp-facebook width=486 height=657
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
[/sourcecode]

Esempio - Incorporamento di un video:

[sourcecode:html]
<amp-facebook width=552 height=574
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/zuck/videos/10102509264909801/">
</amp-facebook>
[/sourcecode]

## Includere un video di YouTube

Includi un video di YouTube nella pagina utilizzando l'elemento [`amp-youtube`](/docs/reference/extended/amp-youtube.html).

Devi includere lo script seguente nella sezione `<head>`:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

Puoi trovare l'elemento `data-videoid` di YouTube nell'URL di ogni pagina video di YouTube.
Ad esempio, nell'URL https://www.youtube.com/watch?v=Z1q71gFeRqM, l'ID video è Z1q71gFeRqM.

Utilizza `layout="responsive"` per ottenere i layout corretti per video con proporzioni 16:9:

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270">
</amp-youtube>
[/sourcecode]

## Mostrare un annuncio

Mostra un annuncio nella pagina utilizzando l'elemento [`amp-ad`](/docs/reference/amp-ad.html).
Sono supportati soltanto gli annunci pubblicati tramite HTTPS.

All'interno del documento AMP non è possibile eseguire codice JavaScript fornito da reti pubblicitarie.
Il runtime AMP carica un iframe da un'origine diversa (tramite la sandbox iframe) ed esegue il codice JavaScript della rete pubblicitaria all'interno della sandbox iframe.

Devi specificare la larghezza e l'altezza dell'annuncio, oltre al tipo di rete pubblicitaria.
L'attributo `type` identifica il modello della rete pubblicitaria.
Tipi di annunci diversi richiedono attributi `data-*` differenti.

[sourcecode:html]
<amp-ad width=300 height=250
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
[/sourcecode]

Includi un attributo `placeholder` (se supportato dalla rete pubblicitaria) da mostrare se non ci sono annunci disponibili:

[sourcecode:html]
<amp-ad width=300 height=250
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  <div placeholder>Have a great day!</div>
</amp-ad>
[/sourcecode]

AMP supporta una vasta gamma di reti pubblicitarie. Consulta [un elenco completo](/docs/reference/amp-ad.html#supported-ad-networks).
