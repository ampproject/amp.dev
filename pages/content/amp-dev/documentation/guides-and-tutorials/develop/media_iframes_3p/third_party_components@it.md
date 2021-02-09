---
'$title': Inclusione di contenuti di terzi
$order: 9
description: Scopri come includere componenti di terze parti nelle tue pagine ...
formats:
  - websites
components:
  - iframe
  - facebook
author: Meggin
contributors:
  - pbakaus
  - bpaduch
---

Scopri come includere componenti di terze parti nelle tue pagine.

## Incorporare un tweet

Per includere un tweet di Twitter nella pagina utilizzando l'elemento [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md).

Per includere un tweet nella pagina, inserire innanzitutto lo script seguente nella sezione `<head>`:

[sourcecode:html]

<script async custom-element="amp-twitter"
  src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>

[/sourcecode]

Attualmente i tweet vengono ridimensionati automaticamente e proporzionalmente in base alle dimensioni specificate, ma questo comportamento potrebbe portare a una visualizzazione non ottimale. Regolare manualmente la larghezza e l'altezza fornite oppure utilizzare l'attributo media per selezionare le proporzioni in base alla larghezza dello schermo.

[example preview="inline" playground="true" imports="amp-twitter:0.1"]

```html
<amp-twitter
  width="500"
  height="583"
  layout="responsive"
  data-tweetid="638793490521001985"
>
</amp-twitter>
```

[/example]

[tip type="tip"] **SUGGERIMENTO -**Altri esempi di [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) sono disponibili su [AMP By Example](../../../../documentation/examples/documentation/amp-twitter.html). [/tip]

## Incorporare un oggetto Instagram

Per includere un oggetto Instagram nella pagina, è possibile utilizzare l'elemento [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md).

Per incorporare un Instagram, includi prima il seguente script in `<head>` :

[sourcecode:html]

<script async custom-element="amp-instagram"
  src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>

[/sourcecode]

Includere il codice breve dei dati Instagram trovato nell'URL della foto di Instagram. Ad esempio, in `https://instagram.com/p/fBwFP` , `fBwFP` è il codice breve dei dati. Inoltre, Instagram utilizza proporzioni fisse per layout reattivi, quindi il valore per larghezza e altezza dovrebbe essere universale.

[example preview="inline" playground="true" imports="amp-instagram:0.1"]

```html
<amp-instagram
  data-shortcode="fBwFP"
  width="320"
  height="392"
  layout="responsive"
>
</amp-instagram>
```

[/example]

[tip type="tip"] **SUGGERIMENTO:** Vedi altri esempi di [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) su [AMP By Example](../../../../documentation/examples/documentation/amp-instagram.html). [/tip]

## Visualizzare post o video di Facebook

Per visualizzare post o video di Facebook nella pagina, utilizzare l'elemento [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md).

È necessario includere il seguente script nella sezione `<head>`:

[sourcecode:html]

<script async custom-element="amp-facebook"
  src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>

[/sourcecode]

##### Esempio: Inclusione di un post

Sorgente:

```html
<amp-facebook
  width="486"
  height="657"
  layout="responsive"
  data-href="https://www.facebook.com/zuck/posts/10102593740125791"
>
</amp-facebook>
```

Anteprima: {amp-facebook0} {/amp-facebook0}

##### Esempio: Inclusione di un video

Sorgente:

```html
<amp-facebook
  width="476"
  height="316"
  layout="responsive"
  data-embed-as="video"
  data-href="https://www.facebook.com/nasaearth/videos/10155187938052139"
>
</amp-facebook>
```

Anteprima: {amp-facebook0} {/amp-facebook0}

[tip type="tip"] **SUGGERIMENTO:** Altri esempi di [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md) sono disponibili su [AMP By Example](../../../../documentation/examples/documentation/amp-facebook.html). [/tip]

## Includere un video di YouTube

Per includere un video di YouTube nella pagina, utilizzare l'elemento [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md).

È necessario includere il seguente script nella sezione `<head>`:

[sourcecode:html]

<script async custom-element="amp-youtube"
  src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>

[/sourcecode]

L'elemento `data-videoid` di YouTube si trova in ogni URL delle pagine dei video di YouTube. Ad esempio, in `https://www.youtube.com/watch?v=Z1q71gFeRqM`, `Z1q71gFeRqM` è l'id video.

Utilizzare l'attributo `layout="responsive"` per produrre layout corretti per video con proporzioni 16:9:

[example preview="inline" playground="true" imports="amp-youtube:0.1"]

```html
<amp-youtube
  data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315"
>
</amp-youtube>
```

[/example]

[tip type="tip"] **SUGGERIMENTO:** altri esempi di [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) disponibili su [AMP By Example](../../../../documentation/examples/documentation/amp-youtube.html). [/tip]

## Visualizzazione di annunci

Per visualizzare un annuncio nella pagina, utilizzare l'elemento [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). Sono supportati solo gli annunci pubblicati tramite HTTPS.

Nessun codice JavaScript fornito dalla rete di annunci può essere eseguito all'interno del documento AMP. Invece, il sistema di runtime AMP carica un iframe da un'origine diversa (tramite iframe sandbox) ed esegue il codice JS della rete di annunci all'interno di tale iframe sandbox.

È necessario specificare la larghezza e l'altezza dell'annuncio e il tipo di rete pubblicitaria. Il `type` identifica il modello della rete di annunci. Tipi di annunci diversi richiedono attributi `data-*` diversi.

[example preview="inline" playground="true" imports="amp-ad:0.1"]

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5"
>
</amp-ad>
```

[/example]

Se la rete di annunci lo supporta, includere un `placeholder` da visualizzare se non è disponibile alcun annuncio:

[example preview="inline" playground="true" imports="amp-ad:0.1"]

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5"
>
  <div placeholder>Have a great day!</div>
</amp-ad>
```

[/example]

AMP supporta un'ampia gamma di reti per annunci. Consultare l'elemento [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) per l'elenco completo.

[tip type="read-on"] **CONTINUA A LEGGERE:** Ulteriori informazioni sugli annunci sono disponibili nella guida [Fornitura di annunci su AMP](../../../../documentation/guides-and-tutorials/develop/monetization/index.md). [/tip]
