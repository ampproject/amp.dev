---
'$title': Inclusione di iframe
$order: 10
description: Scopri come visualizzare e includere contenuti multimediali nelle tue pagine e come utilizzare iframe per visualizzare contenuti avanzati superando le limitazioni di AMP.
formats:
  - websites
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

Learn how to display include media content in your pages, and how to use iframes to display advanced content outside of AMP's limitations.

## Elementi di base

Per visualizzare un iframe nelle pagine è possibile utilizzare l'elemento [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md).

Gli iframe sono particolarmente utili in AMP per visualizzare contenuti non supportati nel contesto della pagina principale, ad esempio i contenuti che richiedono JavaScript creato dall'utente.

### Requisiti per l'utilizzo di `amp-iframe`

- Deve essere almeno di **600 pixel** o il **75%** della prima finestra di visualizzazione a partire dalla parte superiore (ad eccezione degli iframe che utilizzano un [`placeholder`](#using-placeholders)).
- Possono richiedere risorse solo tramite HTTPS e non devono essere nella stessa origine del contenitore, a meno che non specifichino l'attributo allow-same-origin.

[tip type="read-on"] **CONTINUA A LEGGERE:** Ulteriori informazioni disponibili nella [specifica completa per `amp-iframe`](../../../../documentation/components/reference/amp-iframe.md). [/tip]

### Inclusione di script

Per includere un elemento [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) in una pagina, occore prima includere il seguente script nella sezione `<head>`, che si occupa di caricare il codice aggiuntivo per il componente esteso:

[sourcecode:html]

<script async custom-element="amp-iframe"
  src="https://ampjs.org/v0/amp-iframe-0.1.js"></script>

[/sourcecode]

### Scrittura dei markup

Nel seguente esempio, abbiamo creato un elemento [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) reattivo per integrare una mappa Google tramite l'[API per incorporare Google Maps](https://developers.google.com/maps/documentation/embed/guide):

```html
<amp-iframe
  width="200"
  height="100"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://www.google.com/maps/embed/v1/place?key={YOUR API KEY}&q=europe"
>
</amp-iframe>
```

## Utilizzo di segnaposti <a name="using-placeholders"></a>

Si può visualizzare un elemento [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) nella parte superiore di un documento, a condizione che [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) contenga un elemento con l'attributo `placeholder`, (ad esempio, un elemento [`amp-img`](../../../../documentation/components/reference/amp-img.md) ) che verrà visualizzato come segnaposto finché l'iframe non è pronto per la visualizzazione.

[tip type="read-on"] **CONTINUA A LEGGERE:** Ulteriori informazioni disponibili nella sezione [Iframe con segnaposto](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder). [/tip]

Esempio con segnaposto:

```html
<amp-iframe
  width="400"
  height="225"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://giphy.com/embed/OWabwoEn7ezug"
>
  <amp-img
    placeholder
    layout="fill"
    src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"
  ></amp-img>
</amp-iframe>
```

Il risultato del rendering sarà:

<amp-iframe width="400" height="225" sandbox="allow-scripts allow-same-origin" layout="responsive" src="https://giphy.com/embed/OWabwoEn7ezug"><amp-img placeholder layout="fill" src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img></amp-iframe>

## Esempi

Esempi di utilizzo più avanzato di [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) si trovano nella sezione [AMP tramite esempi](../../../../documentation/examples/documentation/amp-iframe.html).
