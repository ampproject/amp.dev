---
"$title": Incorporare storie nelle pagine web
"$order": '3'
description: AMP Story Player
formats:
- websites
- stories
---

Le storie sono coinvolgenti esperienze a schermo intero in cui gli utenti possono immergersi. Sono ospitate sul web aperto con il loro URL, per cui sono facilmente condivisibili. Ma come fare se si desidera integrare le storie nel proprio sito, ad esempio all'interno di un blog, una descrizione di prodotto o in un articolo di notizie?

AMP Story Player permette di incorporare nelle pagine web delle storie che gli utenti potranno sfogliare, toccando o cliccando le loro pagine. Questa procedura guidata insegna come fare.

# Visualizzazione di storie in pagine non AMP

Le storie AMP possono essere incorporate  anche in pagine non AMP e gli utenti potranno sfogliare la storia toccando o cliccando su di essa, senza dover lasciare il documento che la ospita!

[example preview="top-frame" playground="false"]
```html
<!doctype html>
    <head>
      <script
          async
          src="https://cdn.ampproject.org/amp-story-player-v0.js"
      ></script>
      <link
          href="https://cdn.ampproject.org/amp-story-player-v0.css"
          rel="stylesheet"
          type="text/css"
      />
      <style>
          header {
            height: 8vh;
            color: #545454;
            background-color: #DDB556;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          amp-story-player {
            margin: 1rem auto;
          }
      </style>
    </head>
    <body>
      <header>
          <h1>
            Page Header
          </h1>
      </header>
      <h1>
          Article Title
      </h1>
      <p>
          Doggo ipsum smol wow very biscit length boy, doing me a frighten.  Borking doggo doggo heckin dat tungg tho, heckin good boys. Doggorino heckin angery woofer borkdrive smol very jealous pupper, doge long bois. Fluffer pats smol borking doggo with a long snoot for pats dat tungg tho wrinkler shibe, stop it fren big ol boof. Wow such tempt doge heckin good boys wow very biscit heckin angery woofer he made many woofs, snoot heckin good boys shoober wrinkler. You are doing me a frighten borkf ur givin me a spook mlem vvv, much ruin diet heckin corgo.
      </p>
        <amp-story-player style="width: 360px; height: 600px;">
          <a
          href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/"
          >
            Stories in AMP - Hello World
          </a>
      </amp-story-player>
      <p>
          Such treat big ol pupper. Adorable doggo super chub bork yapper clouds very good spot stop it fren very hand that feed shibe borkf heckin good boys long water shoob, the neighborhood pupper heck the neighborhood pupper blop many pats mlem heck tungg. noodle horse. Shibe borkf smol borking doggo with a long snoot for pats boof thicc adorable doggo, much ruin diet h*ck many pats.
      </p>
    </body>
</html>
```
[/example]

## Incorporare AMP story player

La visualizzazione di una storia AMP in una pagina non AMP richiede l'uso dell'elemento [`amp-story-player`](https://github.com/ampproject/amphtml/blob/master/spec/amp-story-player.md).

### Importazione di script

Includere i due script richiesti nell'intestazione del documento:

```html
<script async src="https://cdn.ampproject.org/amp-story-player-v0.js"></script>
<link href="https://cdn.ampproject.org/amp-story-player-v0.css" rel="stylesheet" type="text/css">
```

Il primo script contiene la logica per il player e il secondo imposta lo stile predefinito.

### Definizione di una storia

Includere l'elemento `<amp-story-player>` all'interno della struttura `body` del documento. Quindi specificare la storia desiderata inserendo un tag `<a>` all'interno dell'elemento `<amp-story-player>`. Inserire un elemento `href` che punta alla posizione della storia. L'elemento `href` può puntare all'URL di una storia ospitata o al suo percorso relativo. Inserire il titolo della storia tra i tag `<a>`.

```html
 <amp-story-player style="width: 360px; height: 600px;">
    <a
      href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/">
      Storie in AMP - Ciao mondo
    </a>
  </amp-story-player>
```

### Dimensione del lettore

Si possono definire i componenti `width` o `height` e altri elementi di stile del lettore di storie inline o come si farebbe con gli attributi di stile di ogni altro elemento.

```html
<body>
...
  <amp-story-player style="width: 360px; height: 600px;">
...
  </amp-story-player>
...
</body>
```

We recommend maintaining a 3:5 aspect ratio for the best user experience, but you may define any width and height.

#### Dimensionamento dinamico

La reattività del lettore di storie funziona come in qualsiasi altro elemento a blocchi. Utilizzare CSS per mantenere i rapporti di larghezza e altezza, come nell'esempio seguente:

```html
<amp-story-player style="width: 50vw; height: 83.35vw;">
  ...
</amp-story-player>
```

### Uso di segnaposti

Includere un'immagine rappresentativa del poster aggiungendo un tag `<img>` come elemento figlio del tag `<a>` della storia con la seguente configurazione.  Il lettore di storie AMP visualizza questa immagine durante il caricamento dell'intera storia.

```html
<amp-story-player style="width: 50vw; height: 83.35vw;">
  <a href="https://www.example.com/story.html">
    <img src="https://www.example.com/assets/cover1.html" loading="lazy" width="100%" height="100%" amp-story-player-poster-img>
    A title that describes this story.
  </a>
</amp-story-player>
```

Per garantire la migliore esperienza di utilizzo, consigliamo di includere un'immagine del poster. Se non si include un'immagine del poster, il lettore di storie mostrerà una casella di selezione del caricatore su uno sfondo grigio.

## Integrazione di più storie

You may add multiple stories in the same `<amp-story-player>` element by defining multiple `<a>` tags. The player presents the second story’s cover page after user’s tap through the first.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img src="https://www.example.com/assets/cover1.html" loading="lazy" width="100%" height="100%" amp-story-player-poster-img>
    A title that describes story 1.
  </a>
  <a href="https://www.example.com/story2.html">
    <img src="https://www.example.com/assets/cover2.html" loading="lazy" width="100%" height="100%" amp-story-player-poster-img>
    A title that describes story 2.
  </a>
</amp-story-player>
```

È possibile incorporare tutte le istanze di `<amp-story-player>` che occorrono. Tali istanze saranno mostrate come singoli visualizzatori.

```html
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story1.html">
    <img src="https://www.example.com/assets/cover1.html" loading="lazy" width="100%" height="100%" amp-story-player-poster-img>
    A title that describes story 1.
  </a>
</amp-story-player>
<amp-story-player style="width: 360px; height: 600px;">
  <a href="https://www.example.com/story2.html">
    <img src="https://www.example.com/assets/cover2.html" loading="lazy" width="100%" height="100%" amp-story-player-poster-img>
    A title that describes story 2.
  </a>
</amp-story-player>
```

# Visualizzazione di storie in pagine AMP

Per l'utilizzo del componente `<amp-story-player>` nelle pagine AMP, leggere la documentazione della [versione AMP di amp-story-player](https://amp.dev/documentation/components/amp-story-player/?format=stories).
