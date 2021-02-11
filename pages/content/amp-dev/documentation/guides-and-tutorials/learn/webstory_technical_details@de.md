---
'$title': Technische Besonderheiten von Web Storys
$order: 1
description: Technische Besonderheiten von Web Storys
'$category': Develop
formats:
  - stories
author: CrystalOnScript
---

Diese Anleitung geht auf alle technischen Besonderheiten und Best Practices ein, die du für eine erfolgreiche Erstellung von Web Storys mit AMP benötigst.

## Gültiges AMP

Eine Web Story ist technisch gesehen eine einzelne Webseite, die mit AMP erstellt wurde und den AMP Spezifikationen entspricht:

- Sie beginnt mit dem Doctype `<!doctype html>`.
- Se enthält das Tag `<html ⚡>` oder `<html amp>` der obersten Ebene.
- Sie enthält die Tags `<head>` und `<body>`.
- Sie enthält das Tag ` <meta charset="utf-8">` als untergeordnetes Element des Tags `<head>`.
- Sie enthält das Tag `<script async src="https://cdn.ampproject.org/v0.js"></script>` in ihrem Tag `<head>`. Als Best Practice solltest du das Skript so früh wie möglich in `<head>` platzieren.
- Sie enthält das Tag `<link rel="canonical" href="page/url">` in ihrem Tag `<head>`, wobei href auf die URL der Web Story verweist.
- Sie enthält das Tag `<meta name="viewport" content="width=device-width">` innerhalb des Tags `<head>`. Es wird auch empfohlen, 'initial-scale=1' anzugeben.
- Sie enthält den Code der [AMP Boilerplate](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) im Tag `<head>`.

Der Unterschied zwischen einer AMP Webseite und einer mit AMP erstellten Web Story liegt in der Komponente [`amp-story`](https://amp.dev/documentation/components/amp-story/?format=stories). Das ist das einzige direkt untergeordnete Element des Elements `<body>` des Dokuments und muss das Attribut `standalone` enthalten. Alle Seiten, Ebenen und Elemente der Web Story werden innerhalb der Tags `<amp-story>` definiert.

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

Sieh dir das [Tutorial zum Erstellen deiner ersten Webstory](../start/visual_story/?format=stories) an und [lies die Referenzdokumentation zu amp-story](../../components/reference/amp-story/?format=stories), um mehr zu erfahren.

## Spitzenleistung und bestmögliche Benutzererfahrung

Benutzer sehen sich die Web Storys möglicherweise in Gebieten mit schlechter Internetverbindung oder auf älteren Geräten an. Die folgenden Best Practices sorgen für die bestmögliche Benutzererfahrung.

### Hintergrundfarbe

Gib für jede Seite der Web Story eine Hintergrundfarbe an. Eine Hintergrundfarbe bietet ein gutes Fallback für den Fall, dass die Benutzer keine Bilder oder Video Assets herunterladen können. Wähle eine Farbe, die der dominanten Farbe des eigentlichen Hintergrundobjekts der Seite entspricht, oder verwende eine einheitliche Farbpalette für alle Seiten der Story. Stelle sicher, dass sich die Hintergrundfarbe für gute Lesbarkeit von der Textfarbe unterscheidet.

Lege die Hintergrundfarbe für die Seiten innerhalb der Tags `<style amp-custom>` im Kopf des Web Story Dokuments oder inline in der Komponente [`<amp-story-page>`](https://amp.dev/documentation/components/amp-story-page/?format=stories) fest.

### Überlagerung von Elementen

Der Systemheader enthält Steuerelemente wie die Symbole zum Stummschalten und Teilen. Er besitzt einen höheren z-Index als das Bild oder Video im Hintergrund. Stelle sicher, dass diese Symbole keine wichtigen Informationen verdecken.

### Seitenverhältnis

Gestalte deine Web Story Assets in einem Seitenverhältnis von 9:16. Da die Höhe und Breite der Seiten von Browser zu Browser unterschiedlich ist, solltest du keine wichtigen Informationen in der Nähe der Seitenränder platzieren.

### Standbilder

Während des Downloads von Videos wird dem Benutzer ein Standbild angezeigt. Das Standbild sollte für das Video repräsentativ sein, um einen reibungslosen Übergang zu ermöglichen. Gib ein Standbild an, indem du das Attribut `poster` zu deinem amp-video Element hinzufügst und den Speicherort des Bildes referenzierst.

```
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

## Video

Alle Videos müssen über die Komponente [amp-video](https://amp.dev/documentation/components/amp-video/?format=stories) hinzugefügt werden.

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

### Auflösung und Qualität

Passe beim Kodieren deiner Videos die Qualität für die folgenden empfohlenen Optimierungen an:

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

Versuche, HLS Segmenten eine Dauer von höchstens 10 Sekunden zu geben.

### Format und Größe

Für eine optimale Leistung sollten deine Videos kleiner sein als 4 MB. Teile große Videos eventuell auf mehrere Seiten auf.

Wenn du nur ein einziges Videoformat bereitstellen kannst, sollte es MP4 sein. Verwende nach Möglichkeit HLS Video und gibt MP4 als Fallback zwecks Browserkompatibilität an. Verwende den folgenden Video Codec:

<table>
  <tr>
   <td>MP4, HLS und DASH</td>
   <td>H.264</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>VP9</td>
  </tr>
</table>

### Angabe von <source> vs src</source>

Verwende untergeordnete `<source>` Elemente in der Komponente `<amp-video>`, um die Videoquelle mit dem Attribut `src` anzugeben. Mit dem Element `<source>` kannst du den Videotyp angeben und Videoquellen als Backup hinzufügen. Du musst das Attribut `type` verwenden, um den MIME Typ anzugeben. Verwende `application/x-mpegurl` oder `application/vnd.apple.mpegurl` für HLS Videos. Verwende für alle anderen Videotypen das MIME Präfix `video/` gefolgt vom Videoformat, z. B. `”video/mp4”`.

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

### Automatisches Vorrücken nach dem Video

Das Attribut [`auto-advance-after`](https://amp.dev/documentation/components/amp-story-page/?format=stories#auto-advance-after-%5Boptional%5D), das amp-story-page verfügbar macht, gibt an, ob und wann eine Story Seite vorrücken soll, ohne dass Benutzer darauf tippen. Referenziere im Attribut die Video ID, um nach einem Video in der Story vorzurücken.

```html
<amp-story-page auto-advance-after="myvideo"></amp-story-page>
```

## Desktopdarstellung

Das Web Story Format unterstützt eine [optionale Desktopdarstellung](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/amp-story.md#landscape-orientation-and-full-bleed-desktop-experience-opt-in). Das ermöglicht die Darstellung in einem immersiven Randlosmodus, der die Standardanzeige mit drei Bereichen im Hochformat ersetzt und mobilen Benutzern ermöglicht, die Story auf horizontal gehaltenen Geräten anzusehen.

Aktiviere die Unterstützung für das Desktopformat, indem du der Komponente `<amp-story>` das Attribut `supports-landscape` hinzufügst.

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
