---
'$title': Integrazione con contenuti  AMP per pubblicare annunci
$order: 5
description: Questa guida si rivolge ai fornitori di reti per inserzionisti, che desiderano integrare contenuti AMP per la pubblicazione di annunci su pagine AMP.
formats:
  - ads
---

Questa guida si rivolge ai fornitori di reti per inserzionisti, che desiderano integrare contenuti AMP per la pubblicazione di annunci su pagine AMP.

## Informazioni generali

In qualità di fornitore di server per annuci, puoi integrare contenuti AMP per pubblicare annunci HTML tradizionali su pagine AMP, ma anche per pubblicare annunci [AMPHTML](../../../documentation/guides-and-tutorials/learn/intro-to-amphtml-ads.md).

##### Vuoi pubblicare annunci HTML tradizionali?

1. [`amp-ad`](../../../documentation/components/reference/amp-ad.md)

##### Vuoi pubblicare annunci AMPHTML?

1. Usa [`amp-ad`](../../../documentation/components/reference/amp-ad.md) (se non ne hai già creato uno per pubblicare annunci HTML tradizionali).
2. [Crea un'integrazione Fast Fetch per pubblicare annunci AMPHTML](#creating-a-fast-fetch-integration).

## Creazione di elementi `amp-ad` <a name="creating-an-amp-ad"></a>

In qualità di fornitore di server per annunci, gli editori da te supportati dispongono di una libreria JavaScript da te fornita e inseriscono vari "frammenti di annunci" che si basano sulla libreria JavaScript per prelevare gli annunci e riprodurli sul sito web dell'editore. Poiché AMP non consente agli editori il libero utilizzo di codice JavaScript qualunque, dovrai contribuire al codice open source AMP per consentire al tag [`amp-ad`](../../../documentation/components/reference/amp-ad.md) di richiedere annunci al tuo server.

[tip type="note"] **NOTA:** puoi utilizzare questa implementazione di [`amp-ad`](../../../documentation/components/reference/amp-ad.md) per visualizzare annunci HTML tradizionali **insieme ad** annunci AMPHTML. [/tip]

Ad esempio, il server Amazon A9 può essere richiamato con la seguente sintassi:

```html
<amp-ad
  width="300"
  height="250"
  type="a9"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

Nel codice precedente, l'attributo `type` indica la rete di annunci, che in questo caso è A9. Gli attributi `data-*` dipendono dai parametri che il server A9 di Amazon si aspetta per fornire un annuncio. Il file [`a9.js`](https://github.com/ampproject/amphtml/blob/main/ads/a9.js) mostra come sono mappati i parametri per effettuare una chiamata JavaScript all'URL del server A9. I parametri corrispondenti passati dal tag [`amp-ad`](../../../documentation/components/reference/amp-ad.md) vengono aggiunti in coda all'URL per restituire l'annuncio.

Per ulteriori istruzioni su come integrare un elemento [`amp-ad`](../../../documentation/components/reference/amp-ad.md), consultare la pagina [Integrazione di reti di annunci in AMP](https://github.com/ampproject/amphtml/blob/main/ads/README.md).

## Creazione di un'integrazione Fast Fetch <a name="creating-a-fast-fetch-integration"></a>

[Fast Fetch](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/) è un meccanismo AMP che separa la richiesta di annuncio dalla risposta dell'annuncio, facendo in modo che le richieste di annunci precedano nel ciclo di vita della pagina il rendering, che avviene solo quando è probabile che gli utenti vorranno visualizzarli. Fast Fetch offre un trattamento preferenziale agli annunci AMPHTML verificati rispetto agli annunci HTML tradizionali. In Fast Fetch, gli annunci non convalidati sono racchiusi in un iframe multi-domino per essere isolati dal resto del documento AMP. Viceversa, gli annunci AMPHTML che sono stati convalidati sono scritti direttamente nella pagina. Fast Fetch gestisce annunci AMP e non; non sono necessarie richieste aggiuntive per gli annunci che non superano la convalida.

{{ image('/static/img/docs/ads/amphtml-ad-flow.svg', 843, 699, alt='Flusso di integrazione Fast Fetch', caption='Flusso di integrazione Fast Fetch' ) }}

Per fornire annunci AMPHTML dal tuo server, devi garantire un'integrazione Fast Fetch che comprenda:

1. Supporto delle comunicazioni di rete SSL.
2. Fornitura di codice JavaScript per creare la richiesta di annuncio (consulta le implementazioni di esempio: [AdSense](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-adsense-impl) e [DoubleClick](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-doubleclick-impl)).
3. Convalida e firma dei contenuti creativi tramite un servizio di convalida. [Cloudflare](https://blog.cloudflare.com/firebolt/) offre un servizio di verifica degli annunci AMP, che consente a qualsiasi fornitore di annunci indipendente di pubblicare annunci più veloci, snelli e coinvolgenti.

Per ulteriori istruzioni sulla creazione di un'integrazione Fast Fetch, si può consultare la [Guida all'implementazione della rete Fast Fetch](https://github.com/ampproject/amphtml/blob/main/ads/google/a4a/docs/Network-Impl-Guide.md).

## Risorse correlate

- [`amp-ad`](../../../documentation/components/reference/amp-ad.md)
- [Elenco di fornitori di annunci supportati](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md)
- [Blog che descrive il lancio di Fast Fetch](https://blog.amp.dev/2017/08/21/even-faster-loading-ads-in-amp/)
