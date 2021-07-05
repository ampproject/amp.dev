---
'$title': Include images & video
$order: 8
description: Mit AMP kannst du wie auf einer normalen HTML Seite Bild-, Video- und Audioinhalte einbetten. Erfahre, wie sich die entsprechenden AMP Elemente unterscheiden …
formats:
  - websites
  - stories
  - email
  - ads
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

Mit AMP kannst du wie auf einer normalen HTML Seite **Bild-**, **Video-** und **Audioinhalte** einbetten. Erfahre, wie sich die entsprechenden AMP Elemente unterscheiden und wie du sie in deine Seiten aufnehmen kannst.

## Warum nicht <code>&lt;img></code>, <code>&lt;video></code> und <code>&lt;audio></code>?

AMP unterstützt nicht die standardmäßigen HTML Entsprechungen zum Anzeigen von Medien wie beispielsweise `<img>`. Wir bieten aus folgenden Gründen äquivalente Komponenten an:

- Wir müssen das Layout der Seite verstehen, bevor Ressourcen geladen werden. Das ist wichtig für die [Unterstützung des Preloading für den ersten Viewport](../../../../about/how-amp-works.html#size-all-resources-statically).
- Wir müssen Netzwerkanforderungen steuern, um [Lazy Loading zu ermöglichen und Ressourcen effektiv zu priorisieren](../../../../about/how-amp-works.html#prioritize-resource-loading).

Achtung: Die Elemente werden zwar nicht unterstützt, _werden aber gerendert_. Allerdings [validiert AMP deine Seiten](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) dann nicht und du kannst nicht alle Vorteile von AMP nutzen.

## Bilder

Füge mit dem Element [`amp-img`](../../../../documentation/components/reference/amp-img.md) ein Bild in deine Seite ein:

[example preview="inline" playground="true"]

```html
<amp-img
  alt="A beautiful sunset"
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195"
>
</amp-img>
```

[/example]

In diesem einfachen Beispiel wird das Bild mit der vorgegebenen festen Höhe und Breite angezeigt. Es muss mindestens eine explizite Breite und Höhe festgelegt werden.

#### Bilder anzeigen, wenn JavaScript deaktiviert ist

Da [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) auf JavaScript basiert, werden Bilder nicht angezeigt, wenn der Benutzer die Skripte deaktiviert. In diesem Fall solltest du mit `<img>` und `<noscript>` wie folgt ein Fallback für das Bild bereitstellen:

[example preview="inline" playground="true"]

```html
<amp-img
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195"
>
  <noscript>
    <img
      src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
      width="264"
      height="195"
    />
  </noscript>
</amp-img>
```

[/example]

### Erweiterte Layouts

Im Vergleich zu standardmäßigem CSS/HTML ist es mit AMP wesentlich einfacher, vollständig responsive Bilder zu erstellen. Für das einfachste Ergebnis musst du nur `layout="responsive"` hinzufügen:

[example preview="inline" playground="true"]

```html
<amp-img
  alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive"
>
</amp-img>
```

[/example]

[tip type="read-on"] **ERFAHRE MEHR:** Erfahre mehr über [fortgeschrittene Layoutmethoden](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

### Verhalten und Platzhalter

Die AMP HTML Runtime kann Bildressourcen effektiv verwalten. Dazu wird das Laden von Ressourcen verzögert oder priorisiert, wobei die Position des Viewports, die Systemressourcen, die Verbindungsbandbreite und andere Faktoren berücksichtigt werden.

[tip type="read-on"] **ERFAHRE MEHR:** Erfahre, wie du [Fallbacks und Platzhalter für Bilder bereitstellst](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

## Animierte Bilder

Das Element [`amp-anim`](../../../../documentation/components/reference/amp-anim.md) ist dem Element [`amp-img`](../../../../documentation/components/reference/amp-img.md) sehr ähnlich und bietet zusätzliche Funktionen, um das Laden und Abspielen von animierten Bildern wie GIFs zu verwalten.

[example preview="inline" playground="true" imports="amp-anim:0.1"]

```html
<amp-anim
  width="400"
  height="300"
  src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
>
  <amp-img
    placeholder
    width="400"
    height="300"
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
  >
  </amp-img>
</amp-anim>
```

[/example]

[tip type="note"] **HINWEIS:** Binde `<script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>` im Header deiner Seite ein, um diese Komponente zu verwenden. [/tip]

## Video

Füge mit dem Element [`amp-video`](../../../../documentation/components/reference/amp-video.md) ein Video zu deiner Seite hinzu.

Verwende dieses Element nur zum direkten Einbetten einer HTML5 Videodatei. Das Element nutzt Lazy Loading für die durch das Attribut `src` angegebene Videoressource und lädt sie zu einem von AMP festgelegten Zeitpunkt.

Stelle für den Fall, dass der Browser HTML5 Video nicht unterstützt, einen Platzhalter vor dem Start des Videos sowie ein Fallback bereit. Beispiel:

[example preview="inline" playground="true" imports="amp-video:0.1"]

```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```

[/example]

## Audio

Füge mit dem Element [`amp-audio`](../../../../documentation/components/reference/amp-audio.md) eine Audioressource zu deiner Seite hinzu.

Verwende dieses Element nur zum direkten Einbetten einer HTML5 Audiodatei. Der Vorgang ist für alle in eine AMP Seite eingebetteten externen Ressourcen gleich: Das Element nutzt Lazy Loading für die durch das Attribut `src` angegebene Audioressource und lädt sie zu einem von AMP festgelegten Zeitpunkt.

Include a fallback, if the browser doesn't support HTML5 audio, for example:

[example preview="inline" playground="true" imports="amp-audio:0.1"]

```html
<amp-audio width="400"
  height="200"
  {% if format == 'stories' %}  layout="nodisplay" autoplay
  {% endif %}
  src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <div fallback>
    <p>Your browser doesn’t support HTML5 audio.</p>
  </div>
  <source type="audio/mpeg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <source type="audio/ogg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.ogg">
</amp-audio>
```

[/example]

[tip type="note"] **HINWEIS:** Binde `<script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>` im Header deiner Seite ein, um diese Komponente zu verwenden. [/tip]
