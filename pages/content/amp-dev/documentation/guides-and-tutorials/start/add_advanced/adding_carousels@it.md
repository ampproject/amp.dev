---
'$title': Aggiunta di sequenze
$order: 3
description: "Un'altra funzione comunemente utilizzata nelle pagine per dispositivi mobili sono le sequenze. Possono essere facilmente aggiunte alle pagine AMP utilizzando il componente amp-carousel."
---

Un'altra funzione comunemente utilizzata nelle pagine per dispositivi mobili sono le sequenze. Possono essere facilmente aggiunte alle pagine AMP utilizzando il componente [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md). Cominciamo con un semplice esempio, come una sequenza di immagini.

## Sequenza semplice di immagini

Occorre includere la libreria del componente [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md), **aggiungendo** la seguente richiesta JavaScript al tag `<head>` del documento:

```html
<script
  async
  custom-element="amp-carousel"
  src="https://ampjs.org/v0/amp-carousel-0.1.js"
></script>
```

Successivamente, incorporiamo una semplice sequenza di immagini con un layout reattivo e una larghezza e un'altezza predefinite. **Aggiungiano** il seguente codice alla pagina:

```html
<amp-carousel layout="fixed-height" height="168" type="carousel">
  <amp-img src="mountains-1.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168"></amp-img>
</amp-carousel>
```

**Aggiornando** la pagina, la sequenza dovrebbe essere visibile:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-simple.png', 412, 403, align='center half', caption='Simple images carousel') }}

Il componente [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) può essere configurato in vari modi. Proviamo a cambiare l'interfaccia utente per mostrare una singola immagine alla volta e rendiamo reattivo il layout del carosello.

A questo scopo, occorre prima **cambiare** il `type` dell'elemento [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) da `carousel` a `slides`, quindi **cambiare ** il `layout` in `responsive` e **impostare** il parametro `width` al valore 300 (assicurandosi di aver definito gli attributi `height` e `width` dell'elemento). Quindi **aggiungere** l'attributo `"layout=responsive"` agli elementi [`amp-img`](../../../../documentation/components/reference/amp-img.md) figli di [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

**Ricaricare** la pagina. Ora, invece di vedere un elenco di elementi che scorrono, si potrà vedere un elemento alla volta. Provare a **scorrere** orizzontalmente per spostarsi tra gli elementi. Scorrendo fino al terzo elemento, non sarà più possibile andare oltre.

Quindi, **aggiungere** l'attributo `loop`. **Aggiornando** la pagina e provando a scorrere a sinistra, la sequenza è riprodotta ciclicamente senza interruzioni.

Infine, facciamo riprodurre la sequenza automaticamente a una frequenza di 2 secondi per immagine. **Aggiungere** l'attributo `autoplay` e l'attributo `delay` con un valore di `2000` (ad esempio, `delay="2000"`) ad [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

Il risultato finale dovrebbe essere simile al seguente:

```html
<amp-carousel
  layout="responsive"
  width="300"
  height="168"
  type="slides"
  autoplay
  delay="2000"
  loop
>
  <amp-img
    src="mountains-1.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-2.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-3.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
</amp-carousel>
```

**Aggiorniamo** la pagina e proviamola!

[tip type="note"] **NOTA:** Avrai notato che quando [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) è di tipo `carousel` abbiamo utilizzato il tipo di layout ad `fixed-height`. I tipi di layout supportati per il tipo `carousel` sono limitati; ad esempio il tipo `carousel` non supporta il layout `responsive`. Come suggerisce il nome, gli elementi ad altezza fissa occupano lo spazio disponibile, ma mantengono l'altezza invariata. Per gli elementi ad altezza fissa, è necessario definire l'attributo `height`, mentre l'attributo `width` deve essere `auto` oppure non impostato. [/tip]

## Sequenze dai contenuti misti

Le sequenze di immagini sono fantastiche, ma è possibile visualizzare contenuti più complessi? Proviamo a mescolare un po' le cose inserendo un annuncio, del testo e un'immagine, il tutto in un'unica sequenza. L'elemento [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) è in grado di gestire un tale mix di contenuti? La risposta è sì!

Dapprima, **aggiungiamo** questo stile all'elemento `<style amp-custom>` per assicurarci che i componenti [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) e [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) funzionino correttamente insieme:

```css
amp-fit-text {
  white-space: normal;
}
```

Poi, **sostituiamo** la sequenza semplice con quella mixata:

```html
<amp-carousel layout="fixed-height" height="250" type="carousel">
  <amp-img src="blocky-mountains-1.jpg" width="300" height="250"></amp-img>

  <amp-ad
    width="300"
    height="250"
    type="doubleclick"
    data-slot="/35096353/amptesting/image/static"
  >
    <div placeholder>This ad is still loading.</div>
  </amp-ad>

  <amp-fit-text width="300" height="250" layout="fixed">
    Big, bold article quote goes here.
  </amp-fit-text>
</amp-carousel>
```

**Aggiornando** la pagina, dovrebbe apparire qualcosa del genere:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-complex.gif', 412, 403, align='center half', caption='A carousel of mixed content') }}

Per ulteriori informazioni, consultare la documentazione di riferimento del componente [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[tip type="note"] **NOTA:** Nel nostro ultimo esempio, il componente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) comprendeva un elemento figlio `div` con l'attributo `placeholder`. Prima, nell'esercitazione, abbiamo trovato uno scenario simile, con [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) che usava l'attributo `fallback`. Qual è la differenza tra segnaposto e fallback? Gli elementi `Fallback` appaiono quando il loro elemento padre non può essere caricato, ad esempio se non ci sono annunci disponibili. Gli elementi `placeholder` appaiono al posto dell'elemento padre durante il caricamento. In un certo senso, questi elementi gestiscono la fase di caricamento dell'elemento padre. Ulteriori informazioni sono disponibili nella guida [Segnaposto e fallback](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]
