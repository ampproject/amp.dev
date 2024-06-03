---
'$title': Szczegóły techniczne relacji internetowych
$order: 1
description: Szczegóły techniczne relacji internetowych
'$category': Develop
formats:
  - stories
author: CrystalOnScript
---

Ten przewodnik wyjaśnia wszystkie szczegóły techniczne i najlepsze praktyki, które należy znać, aby z powodzeniem tworzyć relacje internetowe za pomocą AMP.

## Prawidłowy AMP

Relacja internetowa to pod względem technicznym pojedyncza strona utworzona przy użyciu AMP i zgodna ze specyfikacją AMP:

- Zaczyna się od deklaracji `<!doctype html>`.
- Zawiera znacznik najwyższego poziomu `<html ⚡>` albo `<html amp>`.
- Zawiera znaczniki `<head>` i `<body>`.
- Zawiera znacznik `<meta charset="utf-8>` jako pierwszy element podrzędny znacznika `<head>`.
- Zawiera znacznik `<script async src="https://cdn.ampproject.org/v0.js"></script>` w sekcji `<head>`. Zgodnie z najlepszą praktyką należy dodać skrypt jak najwcześniej w sekcji `<head>`.
- Zawiera znacznik ` <link rel="canonical" href="page/url">` w sekcji `<head>`, z odsyłaczem href wskazującym adres URL relacji internetowej.
- Zawiera znacznik `<meta name="viewport" content="width=device-width">` w sekcji `<head>`. Zalecane jest dodanie również właściwości initial-scale=1.
- Zawiera [kod standardowy AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) w sekcji `<head>`.

Różnica między stroną internetową AMP a relacją internetową utworzoną przy użyciu AMP to składnik [`amp-story`](https://amp.dev/documentation/components/amp-story/?format=stories). Jest jedynym bezpośrednim elementem podrzędnym sekcji `<body>` dokumentu i musi zawierać atrybut `standalone`. Wszystkie strony, warstwy i elementy relacji internetowej są definiowane w znacznikach `<amp-story>`.

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

Więcej informacji zawiera [samouczek tworzenia pierwszej relacji internetowej](../start/visual_story/?format=stories) i dokumentacja składnika [amp-story ](../../components/reference/amp-story/?format=stories).

## Szczytowa wydajność i komfort użytkowania

Użytkownicy mogą wyświetlać relacje internetowe w miejscach o słabym połączeniu sieciowym lub na starszych urządzeniach. Zapewnij im wystarczający komfort, stosując się do tych najlepszych praktyk.

### Kolor tła

Określ kolor tła każdej strony relacji internetowej. Określenie koloru tła zapewni wyświetlenie dobrego zasobu rezerwowego, jeśli warunki użytkownika uniemożliwią pobranie zasobów obrazów lub wideo. Wybierz kolor, który jest reprezentatywny dla dominującego koloru planowanego zasobu tła strony lub użyj spójnego motywu kolorystycznego na wszystkich stronach relacji. Upewnij się, że kolor tła jest inny niż tekst, aby zapewnić czytelność.

Definiuj kolor tła stron w znacznikach `<style amp-custom>` w sekcji nagłówka dokumentu relacji internetowej lub inline w składniku [`<amp-story-page>`](https://amp.dev/documentation/components/amp-story-page/?format=stories).

### Warstwy elementów

W nagłówku systemowym znajdują się elementy sterujące, takie jak ikony wyciszania i udostępniania. Widnieją one w wyższym indeksie porządku osi Z niż obraz tła i wideo. Upewnij się, że ikony te nie zasłaniają żadnych istotnych informacji.

### Współczynnik proporcji

Projektuj zasoby relacji internetowych w proporcji 9:16. Wysokość i szerokość strony różni się w zależności od przeglądarki i urządzenia, więc nie umieszczają istotnych treści w pobliżu krawędzi strony.

### Obrazy plakatów

Obraz plakatu jest wyświetlany użytkownikowi podczas pobierania wideo. Obraz plakatu powinien być reprezentatywny dla wideo, aby umożliwić płynne przejście. Określ obraz plakatu, dodając atrybut `poster` do elementu amp-video i wskazując mu lokalizację obrazu.

```
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

## Wideo

Wszystkie filmy muszą być dodawane za pomocą składnika [amp-video](https://amp.dev/documentation/components/amp-video/?format=stories).

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

### Rozdzielczość i jakość

Koduj wideo, aby dostosować jakość do następujących zalecanych optymalizacji:

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

Staraj się nie przekraczać 10 sekund czasu trwania segmentów HLS.

### Format i rozmiar

Utrzymuj rozmiar filmów wideo mniejszy niż 4 MB, aby uzyskać optymalną wydajność. Zastanów się nad dzieleniem dużych filmów na kilka stron.

Jeśli możesz zapewniać tylko jeden format wideo, użyj MP4. Jeśli to możliwe, należy użyć wideo HLS i określić plik MP4 jako zasób rezerwowy w celu zapewnienia zgodności z przeglądarkami. Użyj następującego kodeka wideo:

<table>
  <tr>
   <td>MP4, HLS i DASH</td>
   <td>H.264</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>VP9</td>
  </tr>
</table>

### Określaj elementy &lt;source&gt;, a nie atrybut src

Aby określić źródło wideo, stosuj elementy podrzędne `<source>` w składniku `<amp-video>`, zamiast atrybutu `src`. Użycie elementu `<source>` pozwala określić typ wideo i dodać zapasowe źródła wideo. Aby określić typ MIME, musisz użyć atrybutu ` type`. W przypadku filmów HLS użyj atrybutu ` application/x-mpegurl` lub `application/vnd.apple.mpegurl`. W przypadku wszystkich innych typów wideo należy użyć prefiksu MIME `video/`, a następnie formatu wideo, na przykład `"video/mp4"`.

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

### Automatyczne przechodzenie dalej po odtworzeniu wideo

Atrybut [`auto-advance-after`](https://amp.dev/documentation/components/amp-story-page/?format=stories#auto-advance-after-%5Boptional%5D) eksponowany przez składnik amp-story-page określa, czy i kiedy strona z relacją ma przejść do dalej bez dotknięcia przez użytkownika. Aby przejść do przodu po wideo, należy wskazać w atrybucie identyfikator wideo.

```html
<amp-story-page auto-advance-after="myvideo"></amp-story-page>
```

## Wyświetlanie w poziomie

Format Web Story zapewnia [opcjonalne wyświetlanie w poziomie](https://github.com/ampproject/amphtml/blob/main/extensions/amp-story/amp-story.md#landscape-orientation-and-full-bleed-desktop-experience-opt-in). Zmienia to tryb wyświetlania, zastępując domyślne wyświetlanie w trzech pionowych okienkach i pozwalając użytkownikom mobilnym na oglądanie relacji na urządzeniu trzymanym poziomo.

Włącz obsługę trybu poziomego poprzez dodanie atrybutu `supports-landscape` do składnika `<amp-story>`.

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
