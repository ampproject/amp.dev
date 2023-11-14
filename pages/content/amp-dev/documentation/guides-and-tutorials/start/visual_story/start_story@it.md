---
'$title': Iniziamo la nostra storia
$order: 3
description: Una storia web completa è rappresentata dal componente amp-story, che funge da contenitore per tutte le pagine della storia. Il componente amp-story è anche responsabile di ...
author: bpaduch
---

Una storia web completa è rappresentata dal componente [`amp-story`](../../../../documentation/components/reference/amp-story.md), che funge da contenitore per tutte le pagine della storia. Il componente [`amp-story`](../../../../documentation/components/reference/amp-story.md) è anche responsabile della creazione della shell dell'interfaccia utente, inclusa la gestione dei gesti e della navigazione.

[`amp-story`](../../../../documentation/components/reference/amp-story.md) è un componente AMP personalizzato e, come per tutti i componenti personalizzati, occorre aggiungere lo script associato al componente al documento AMP.

**Aprire** il file `pets.html` nell'editor di testo preferito e nella sezione `<head>` **aggiungere** il seguente script:

```html
<head>
  <script
    async
    custom-element="amp-story"
    src="https://ampjs.org/v0/amp-story-1.0.js"
  ></script>
</head>
```

**Aggiungere** l'elemento `<amp-story>` alla sezione `<body>` del documento e specificare l'attributo `standalone` obbligatorio, in questo modo:

```html
<body>
  <amp-story standalone> </amp-story>
</body>
```

È importante sapere che per avere una storia AMP valida, l'elemento `<body>` deve avere un solo figlio: il componente [`amp-story`](../../../../documentation/components/reference/amp-story.md); tutti gli altri elementi sono contenuti in [`amp-story`](../../../../documentation/components/reference/amp-story.md).

## Indicazione di meta-informazioni

Per rendere le storie individuabili su web, sono necessari alcuni metadati per fornire informazioni di dettaglio della storia, come:

- Il titolo della storia, rappresentato dall'attributo `title` (es. "Joy of Pets").
- Il nome dell'editore, rappresentato dall'attributo `publisher` (ad es. "AMP tutorials").
- Il logo dell'editore, rappresentato dall'attributo `publisher-logo-src`. Questo è un URL che punta all'immagine del logo, di forma quadrata con proporzioni 1x1.
- Un poster con l'immagine della storia, rappresentata dall'attributo `poster-portrait-src`. Questo è un URL che punta al poster e l'immagine deve essere in formato verticale con proporzioni 3x4.

Aggiungiamo questi attributi al nostro tag [`amp-story`](../../../../documentation/components/reference/amp-story.md):

```html
<amp-story
  standalone
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
  poster-portrait-src="assets/cover.jpg"
></amp-story>
```

Oltre a questi attributi obbligatori, ci sono altri attributi applicabili. Per saperne di più, consultare la sezione [attributi](../../../../documentation/components/reference/amp-story.md#attributes) della documentazione di riferimento di [`amp-story`](../../../../documentation/components/reference/amp-story.md).

[tip type="note"] **NOTA:** Questi attributi dei metadati integrano e non sostituiscono i dati strutturati (ad es. JSON-LD) nella pagina. Per assicurarsi che le storie web vengano individuate su tutte le piattaforme, occorre aggiungere i [dati strutturati](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md#integrate-with-third-party-platforms-through-additional-metadata) a tutte le pagine AMP, comprese le storie AMP. [/tip]

A questo punto, abbiamo un contenitore di una storia senza alcun contenuto. Creiamo questa pagina.
