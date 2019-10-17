---
$title: Includere contenuti di terze parti
---

Scopri come includere componenti di terze parti nelle tue pagine.

## Incorporare un tweet

Incorpora un tweet di Twitter nella pagina utilizzando l'elemento [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md).

Per includere un tweet nella pagina, inserisci innanzitutto lo script seguente nella sezione `<head>`:

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

Attualmente i tweet vengono ridimensionati automaticamente e proporzionalmente in base alle dimensioni specificate, ma questo comportamento potrebbe portare a un aspetto non ottimale.
Regola manualmente la larghezza e l'altezza fornite oppure utilizza l'attributo media per selezionare le proporzioni in base alla larghezza dello schermo.

[example preview="inline" playground="true" imports="amp-twitter:0.1"]
```html
<amp-twitter width="500"
  height="583"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```
[/example]

## Incorporare una foto di Instagram

Incorpora una foto di Instagram nella pagina utilizzando l'elemento [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md).

Per includere una foto di Instagram, inserisci innanzitutto lo script seguente nella sezione `<head>`:

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

Includi l'elemento data-shortcode di Instagram indicato nell'URL della foto del servizio. Ad esempio, nell'URL `https://instagram.com/p/fBwFP` l'elemento data-shortcode è `fBwFP`.
Inoltre, Instagram utilizza proporzioni fisse per i layout reattivi, quindi il valore di larghezza e altezza dovrebbe essere universale.

[example preview="inline" playground="true" imports="amp-instagram:0.1"]
```html
<amp-instagram data-shortcode="fBwFP"
  width="320"
  height="392"
  layout="responsive">
</amp-instagram>
```
[/example]

## Mostrare post o video di Facebook

Mostra un post o un video di Facebook nella pagina utilizzando l'elemento [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md).

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

Includi un video di YouTube nella pagina utilizzando l'elemento [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md).

Devi includere lo script seguente nella sezione `<head>`:

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

Puoi trovare l'elemento `data-videoid` di YouTube nell'URL di ogni pagina video di YouTube.
Ad esempio, nell'URL `https://www.youtube.com/watch?v=Z1q71gFeRqM`, l'ID video è `Z1q71gFeRqM`.

Utilizza `layout="responsive"` per ottenere i layout corretti per video con proporzioni 16:9:

[example preview="inline" playground="true" imports="amp-youtube:0.1"]
```html
<amp-youtube data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315">
</amp-youtube>
```
[/example]

## Mostrare un annuncio

Mostra un annuncio nella pagina utilizzando l'elemento [`amp-ad`](../../../../documentation/components/reference/amp-ad.md).
Sono supportati soltanto gli annunci pubblicati tramite HTTPS.

All'interno del documento AMP non è possibile eseguire codice JavaScript fornito da reti pubblicitarie.
Il runtime AMP carica un iframe da un'origine diversa (tramite la sandbox iframe) ed esegue il codice JavaScript della rete pubblicitaria all'interno della sandbox iframe.

Devi specificare la larghezza e l'altezza dell'annuncio, oltre al tipo di rete pubblicitaria.
L'attributo `type` identifica il modello della rete pubblicitaria.
Tipi di annunci diversi richiedono attributi `data-*` differenti.

[example preview="inline" playground="true" imports="amp-ad:0.1"]
```html
<amp-ad width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5">
</amp-ad>
```
[/example]

Includi un attributo `placeholder` (se supportato dalla rete pubblicitaria) da mostrare se non ci sono annunci disponibili:

[example preview="inline" playground="true" imports="amp-ad:0.1"]
```html
<amp-ad width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5">
  <div placeholder>Have a great day!</div>
</amp-ad>
```
[/example]

AMP supporta una vasta gamma di reti pubblicitarie. Consulta [un elenco completo](../../../../documentation/components/reference/amp-ad.md#supported-ad-networks).
