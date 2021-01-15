---
"$title": Creazione di un annuncio con immagini
"$order": '1'
description: 'Il nostro annuncio è una semplice immagine contenente un collegamento ipertestuale al sito pubblicizzato. Visualizzeremo l''immagine utilizzando il tag amp-img. Ecco il codice: ...'
---

All'interno della sezione `<body>` del documento con l'annuncio AMPHTML, si possono includere tag HTML e AMP; tuttavia, non tutti i tag sono consentiti. Consultare le [specifiche degli annunci AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#allowed-amp-extensions-and-builtins) per un elenco dei tag consentiti.

Il nostro annuncio è una semplice immagine contenente un collegamento ipertestuale al sito pubblicizzato. Visualizzeremo l'immagine utilizzando il tag [`amp-img`](../../../../documentation/components/reference/amp-img.md). Ecco il codice:

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img width="300" height="250"
        alt="Learn amp"
        src="/static/img/docs/ads/amp-300x250.png"></amp-img>
  </a>
</body>
```

Aprendo il file html nel browser, dovremmo vedere la seguente immagine:

{{ image('/static/img/docs/ads/amp-300x250.png', 300, 250, align='center third', alt='learn about AMP ad') }}

Facendo clic sull'annuncio illustrato, saremo condotti al sito pubblicizzato (ad esempio, il sito del progetto AMP).
