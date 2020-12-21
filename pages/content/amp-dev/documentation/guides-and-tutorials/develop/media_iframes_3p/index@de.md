---
"$title": Include images & video
"$order": '8'
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

## Why not <img>, <video> and <audio>?</audio></video>

AMP doesn't support the default HTML counterparts to displaying media, like `<img>`. We provide equivalent components for the following reasons:

- Wir müssen das Layout der Seite verstehen, bevor Ressourcen geladen werden. Das ist wichtig für die [Unterstützung des Preloading für den ersten Viewport](../../../../about/how-amp-works.html#size-all-resources-statically).
- Wir müssen Netzwerkanforderungen steuern, um [Lazy Loading zu ermöglichen und Ressourcen effektiv zu priorisieren](../../../../about/how-amp-works.html#prioritize-resource-loading).

Achtung: Die Elemente werden zwar nicht unterstützt, *werden aber gerendert*. Allerdings [validiert AMP deine Seiten](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) dann nicht und du kannst nicht alle Vorteile von AMP nutzen.

## Images

Include an image in your page using the [`amp-img`](../../../../documentation/components/reference/amp-img.md) element, like so:

[example preview="inline" playground="true"]
```html
<amp-img alt="A beautiful sunset"
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195">
</amp-img>
```
[/example]

In this most basic example, the image will display with the specified fixed height and width. At minimum, an explicit width and height needs to be set.

#### Displaying images when JavaScript is disabled

As [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) relies on JavaScript, if the user chooses to disable scripts, images won't display.  In this case, you should provide a fallback to the image using `<img>` and `<noscript>`, like so:

[example preview="inline" playground="true"]
```html
<amp-img src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195">
  <noscript>
    <img src="{{server_for_email}}/static/inline-examples/images/sunset.jpg" width="264" height="195" />
  </noscript>
</amp-img>
```
[/example]

### Advanced layouts

Im Vergleich zu standardmäßigem CSS/HTML ist es mit AMP wesentlich einfacher, vollständig responsive Bilder zu erstellen. Für das einfachste Ergebnis musst du nur `layout="responsive"` hinzufügen:

[example preview="inline" playground="true"]
```html
<amp-img alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive">
</amp-img>
```
[/example]

[tip type="read-on"] **ERFAHRE MEHR:** Erfahre mehr über [fortgeschrittene Layoutmethoden](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

### Behavior and placeholders

Die AMP HTML Runtime kann Bildressourcen effektiv verwalten. Dazu wird das Laden von Ressourcen verzögert oder priorisiert, wobei die Position des Viewports, die Systemressourcen, die Verbindungsbandbreite und andere Faktoren berücksichtigt werden.

[tip type="read-on"] **ERFAHRE MEHR:** Erfahre, wie du [Fallbacks und Platzhalter für Bilder bereitstellst](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

## Animated images

The [`amp-anim`](../../../../documentation/components/reference/amp-anim.md) element is very similar to the [`amp-img`](../../../../documentation/components/reference/amp-img.md) element, and provides additional functionality to manage loading and playing of animated images such as GIFs.

[example preview="inline" playground="true" imports="amp-anim:0.1"]
```html
<amp-anim width="400"
  height="300"
  src="{{server_for_email}}/static/inline-examples/images/wavepool.gif">
  <amp-img placeholder
    width="400"
    height="300"
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png">
  </amp-img>
</amp-anim>
```
[/example]

[tip type="note"] **HINWEIS:** Binde `<script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>` im Header deiner Seite ein, um diese Komponente zu verwenden. [/tip]

## Video

Include a video in your page using the [`amp-video`](../../../../documentation/components/reference/amp-video.md) element.

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

Include an audio resource in your page, using the [`amp-audio`](../../../../documentation/components/reference/amp-audio.md) element.

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
