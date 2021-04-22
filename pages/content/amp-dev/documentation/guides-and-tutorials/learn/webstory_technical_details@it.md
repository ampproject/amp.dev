---
'$title': Dettagli tecnici delle storie web
$order: 1
description: Dettagli tecnici delle storie web
'$category': Develop
formats:
  - stories
author: CrystalOnScript
---

Questa guida spiega tutti i dettagli tecnici e le procedure consigliate per creare con successo storie web tramite AMP.

## Validità AMP

Una Storia web dal punto di vista tecnico è una singola pagina web realizzata tramite AMP e conforme alle specifiche AMP. Essa deve:

- Iniziare con il doctype `<!doctype html>`.
- Contenere un tag di primo livello `<html ⚡>` (`<html amp>` è ugualmente accettato).
- Contenere i tag `<head>` e `<body>` (questi sono opzionali in HTML).
- Contenere un tag `<meta charset="utf-8">` come primo elemento figlio del tag `<head>`.
- Contenere un tag `<script async src="https://cdn.ampproject.org/v0.js"></script>` all'interno del proprio tag `<head>`. Le procedure consigliate suggeriscono l'inclusione dello script il prima possibile nella sezione `<head>`.
- Contenere un tag `<link rel="canonical" href="page/url">` all'interno della propria sezione `<head>` con l'elemento href che punta all'URL della Storia web.
- Contenere un tag `<meta name="viewport" content="width=device-width">` all'interno del tag `<head>`. Si consiglia inoltre di includere l'attributo initial-scale=1.
- Contenere il codice [boilerplate AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) nel tag `<head>`.

La differenza tra una semplice pagina web AMP e una storia web realizzata con AMP è il componente [`amp-story`](https://amp.dev/documentation/components/amp-story/?format=stories) È l'unico elemento figlio diretto della sezione `<body>` del documento e deve contenere l'attributo `standalone`. Tutte le pagine, i livelli e gli elementi della Storia web sono definiti all'interno dei tag `<amp-story>`.

```html
<!DOCTYPE html>
<html ⚡>
  <head>
    <meta charset="utf-8" />
    <title>Joy of Pets</title>
    <link rel="canonical" href="pets.html" />
    <meta name="viewport" content="width=device-width" />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script
      async
      custom-element="amp-video"
      src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
    ></script>
    <script
      async
      custom-element="amp-story"
      src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
    ></script>
    <style amp-custom>
      ...;
    </style>
  </head>
  <body>
    <!-- Cover page -->
    <amp-story
      standalone
      title="Joy of Pets"
      publisher="AMP tutorials"
      publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
      poster-portrait-src="assets/cover.jpg"
    >
      <amp-story-page id="cover">
        <amp-story-grid-layer template="fill">
          <amp-img
            src="assets/cover.jpg"
            width="720"
            height="1280"
            layout="responsive"
          >
          </amp-img>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="vertical">
          <h1>The Joy of Pets</h1>
          <p>By AMP Tutorials</p>
        </amp-story-grid-layer>
      </amp-story-page>

      <!-- Page 1 -->
      <amp-story-page id="page1">
        <amp-story-grid-layer template="vertical">
          <h1>Cats</h1>
          <amp-img
            src="assets/cat.jpg"
            width="720"
            height="1280"
            layout="responsive"
          >
          </amp-img>
          <q
            >Dogs come when they're called. Cats take a message and get back to
            you. --Mary Bly</q
          >
        </amp-story-grid-layer>
      </amp-story-page>
      ...
    </amp-story>
  </body>
</html>
```

Per ulteriori informazioni, è possibile seguire l'[esercitazione Crea la tua prima Storia Web](../start/visual_story/?format=stories) e [leggere la documentazione di riferimento di amp-story](../../components/reference/amp-story/?format=stories).

## Prestazioni nei momenti di punta ed esperienza utente

Gli utenti potrebbero visualizzare le storie web in aree con connessione di rete scadente o su dispositivi obsoleti. Per garantire sempre la migliore esperienza possibile, si suggerisce di applicare le seguenti procedure consigliate.

### Colore dello sfondo

Occorre indicare un colore dello sfondo per ogni pagina di una Storia web. Definire un colore dello sfondo fornisce un buon fallback se le condizioni dell'utente gli impediscono di scaricare immagini o risorse video. Si consiglia di scegliere un colore rappresentativo del colore dominante della risorsa di sfondo prevista per la pagina oppure di utilizzare un tema cromatico coerente per tutte le pagine della storia. Per assicurare la leggibilità inoltre utilizzare un colore di fondo diverso da quello del testo.

Definire il colore dello sfondo per le pagine all'interno dei tag `<style amp-custom>` nell'intestazione del documento della Storia web o inline nel componente [`<amp-story-page>`](https://amp.dev/documentation/components/amp-story-page/?format=stories).

### Stratificazione degli elementi

L'intestazione di sistema contiene controlli come le icone di disattivazione audio e di condivisione. Essa appare a un valore dell'indice z più alto rispetto all'immagine di sfondo e ai video. Verificare che nessuna informazione essenziale sia coperta da queste icone.

### Proporzioni

Le risorse delle Storie web vanno definite con proporzioni 9:16. Poiché l'altezza e la larghezza della pagina variano a seconda dei browser e dei dispositivi, mai collocare i contenuti essenziali vicino ai bordi della pagina.

### Immagini dei poster

Le immagini di un poster sono visualizzate agli utenti durante il download dei video. L'immagine del poster dovrebbe essere rappresentativa del video per consentire una transizione graduale. Per indicare l'immagine di un poster aggiungere l'attributo `poster` al relativo elemento amp-video e farlo puntare alla posizione dell'immagine.

```
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

## Video

Tutti i video devono essere aggiunti tramite il componente [amp-video](https://amp.dev/documentation/components/amp-video/?format=stories).

```
<amp-video controls
  width="640"
  height="360"
  layout="responsive"
  poster="/static/inline-examples/images/kitten-playing.png">
  <source src="/static/inline-examples/videos/kitten-playing.webm"
    type="video/webm" />
  <source src="/static/inline-examples/videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```

### Risoluzione e qualità

Codificare i video per adattare la qualità alle seguenti ottimizzazioni consigliate:

<table>
  <tr>
   <td>MP4</td>
   <td>-crf 23</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>-b:v 1M</td>
  </tr>
</table>

Mantenere la durata dei segmenti HLS inferiore ai 10 secondi.

### Formato e dimensioni

Mantenere la dimensione dei video al di sotto dei 4 MB per garantire prestazioni ottimali. Considerare anche l'idea di suddividere i video di grandi dimensioni su più pagine.

Se è possibile fornire un solo formato video, scegliere MP4. Se possibile, utilizzare video HLS e indicare MP4 come opzione di fallback per garantire la compatibilità del browser. Utilizzare il seguente codec video:

<table>
  <tr>
   <td>MP4, HLS e DASH</td>
   <td>H.264</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>VP9</td>
  </tr>
</table>

### Uso di <source> vs src</source>

Utilizzare più elementi figli `<source>` all'interno del componente `<amp-video>` per specificare la sorgente video sull'attributo `src`. L'utilizzo dell'elemento `<source>` consente di specificare il tipo di video e di aggiungere sorgenti video di backup. È necessario utilizzare l'attributo `type` per specificare il tipo MIME. Usare `application/x-mpegurl` o `application/vnd.apple.mpegurl` per i video HLS. Per tutti gli altri tipi di video, usare il prefisso MIME `video/` seguito dal formato video, ad esempio `”video/mp4”`.

```html
<amp-video
  id="video-page1"
  autoplay
  loop
  layout="fill"
  poster="https://example.com/media/poster.jpg"
>
  <source
    src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl"
  />
  <source src="https://amp-example.com/media/movie.mp4" type="video/mp4" />
</amp-video>
```

### Avanzamento automatico dopo i video

L'attributo [`auto-advance-after`](https://amp.dev/documentation/components/amp-story-page/?format=stories#auto-advance-after-%5Boptional%5D) aggiunto al componente amp-story-page indica se e quando inserire un avanzamento di pagina di una storia senza tocchi da parte dell'utente. Per l'avanzamento automatico dopo un video, far puntare l'attributo all'ID video.

```html
<amp-story-page auto-advance-after="myvideo"></amp-story-page>
```

## Esperienza desktop

Il formato delle Storie web supporta un'[esperienza desktop opzionale](https://github.com/ampproject/amphtml/blob/main/extensions/amp-story/amp-story.md#landscape-orientation-and-full-bleed-desktop-experience-opt-in). Questo permette di rendere l'esperienza desktop una modalità coinvolgente a tutto schermo, sostituendo il formato predefinito con tre pannelli verticali e permette agli utenti di dispositivi mobili di visualizzare la pagina anche quando il dispositivo è tenuto in orizzontale.

Attivare il supporto del formato desktop aggiungendo l'attributo `supports-landscape` al componente `<amp-story>`.

```html
<amp-story
  standalone
  supports-landscape
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/icon.svg"
  poster-portrait-src="assets/cover.jpg"
>
</amp-story>
```
