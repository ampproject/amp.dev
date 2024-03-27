---
$title: Creare pagine AMP reattive
---

È facilissimo creare elementi reattivi in AMP. È sufficiente inserire `layout=responsive`.

## Creare immagini reattive

Tutte le risorse caricate esternamente, incluse le immagini, devono avere posizione e dimensioni specifiche in modo che, quando vengono caricate, la pagina non salti e non si adatti dinamicamente.

Per creare immagini reattive, specifica la larghezza e l'altezza, imposta il layout reattivo e utilizza [`srcset`](style_pages.md) per indicare quale asset di immagine utilizzare in base alle dimensioni dello schermo:

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

Questo elemento [`amp-img`](../../../../documentation/components/reference/amp-img.md) si adatta automaticamente alla larghezza del relativo elemento contenitore, mentre la sua altezza viene impostata automaticamente in base alle proporzioni stabilite secondo la larghezza e l'altezza indicate:

<amp-img src="/static/img/docs/responsive_amp_img.png" width="500" height="857" layout="responsive"></amp-img>

Visita anche la pagina [`amp-img` del sito AMP by Example](../../../../documentation/components/reference/amp-img.md).

## Aggiungere stili a una pagina

Aggiungi tutti gli stili all'interno del tag `<style amp-custom>` nella sezione head del documento.
Ad esempio:

[sourcecode:html]

<!doctype html>
  <head>
    <meta charset="utf-8">
    <link rel="canonical" href="hello-world.html">
    <meta name="viewport" content="width=device-width">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      /* any custom style goes here. */
      body {
        background-color: white;
      }
      amp-img {
        border: 5px solid black;
      }

      amp-img.grey-placeholder {
        background-color: grey;
      }
    </style>
    <script async src="https://ampjs.org/v0.js"></script>

  </head>
[/sourcecode]

**Importante.** Assicurati che sia presente un solo tag `<style amp-custom>` nella pagina, perché nel formato AMP non sono consentiti più tag di questo tipo.

Definisci gli stili dei componenti con i selettori di classe o di elemento utilizzando le proprietà CSS comuni. Ad esempio:

[sourcecode:html]

<body>
  <p>Hello, Kitty.</p>
  <amp-img
    class="grey-placeholder"
    src="https://placekitten.com/g/500/300"
    srcset="/img/cat.jpg 640w,
           /img/kitten.jpg 320w"
    width="500"
    height="300"
    layout="responsive">
  </amp-img>
</body>
[/sourcecode]

**Importante.** Verifica che gli stili siano supportati nel formato AMP perché alcuni non sono supportati per motivi di rendimento (leggi anche la pagina [Stili CSS supportati](style_pages.md)).

## Specificare le dimensioni e la posizione degli elementi

AMP separa il layout del documento dal caricamento delle risorse in modo da poter caricare il layout della pagina senza dover aspettare che vengano scaricate le risorse.

Specifica le dimensioni e la posizione di tutti gli elementi AMP visibili utilizzando gli attributi `width` e `height`.
Questi attributi connotano le proporzioni dell'elemento, che potrà ridimensionarsi in base al contenitore.

Imposta il layout reattivo.
In questo modo l'elemento si adatta alla larghezza del relativo elemento contenitore, mentre la sua altezza viene ridimensionata automaticamente in base alle proporzioni stabilite dagli attributi di larghezza e altezza.

Leggi ulteriori informazioni sui [layout supportati in AMP](control_layout.md).

## Convalidare stili e layout

Utilizza lo strumento di convalida AMP per testare i valori CSS e di layout della tua pagina.

Lo strumento di convalida verifica che gli elementi CSS della pagina non superino il limite di 50.000 byte, controlla se ci sono stili non consentiti e si assicura che il layout della pagina sia supportato e formattato correttamente.
Consulta anche questo elenco completo di [errori di stile e layout](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validation_errors.md#errori-di-stile-e-layout).

Esempio di errore nella console relativo a una pagina i cui elementi CSS superano il limite di 50.000 byte:

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

Leggi ulteriori informazioni su come [convalidare le tue pagine AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), incluse informazioni su come trovare gli errori di stile e risolverli.
