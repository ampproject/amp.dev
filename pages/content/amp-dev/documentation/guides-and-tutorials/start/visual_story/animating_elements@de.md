---
"$title": Elemente animieren
"$order": '6'
description: Du kannst deine Web Story noch weiter verbessern, indem du Eingangsanimationen für Elemente innerhalb einer Seite erstellst. So kannst du z. B. deinen Titel einfliegen lassen …
components:
- anim
author: bpaduch
---

You can further enhance a Web Story by applying animation entrances to elements inside a page. For example, you can make your title fly in from the left, or drop into the page, or fade in, and so on.  The AMP story framework provides the following preset animations to use in a Web Story:

<table>
<thead><tr>
  <th width="50%">Voreingestellte Animation</th>
  <th width="25%">Standarddauer (ms)</th>
  <th width="25%">Standardverzögerung (ms)</th>
</tr></thead>
<tbody>
<tr>
  <td><code>drop</code></td>
  <td>1600</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fade-in</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-bottom</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-top</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pulse</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-left</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-right</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>twirl-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-left</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-right</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-down</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-up</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-out</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
</tbody>
</table>

Um eine Eingangsanimations auf ein Element anzuwenden, musst du <code>animate-in="<em data-md-type="raw_html"><animation data-md-type="raw_html" preset></animation></em>"</code> mit einem der voreingestellten Animationswerte angeben. Wenn du z. B. willst, dass Text von oben in die Seite fällt, füge dem Textelement `animate-in="drop"` hinzu:

```html
<amp-story-page id="page3">
  ...
  <amp-story-grid-layer template="vertical">
    <p animate-in="drop">Drop this text into the page</p>
</amp-story-page>
```

[tip type="note"] Explore the different animation effects by adding the `animate-in="<animation preset>"` attribute to elements on your story pages. [/tip]

## Timing der Animation

Each animation preset has a built-in default time value for:

- **delay** (Verzögerung): Das ist die Zeitspanne, um die der Start der Animation verzögert wird. So bedeutet z. B. eine Verzögerung von .3s, dass die Animation nach 0,3 Sekunden auf die Seite gelangt. Eine Verzögerung von 0s startet die Animation sofort.
- **duration** (Dauer): Das ist die Zeitspanne, in der die Animation ausgeführt wird. So dauert z. B. Einblendanimation "fade-in" 500 ms von Anfang bis Ende.

Du kannst das Timing einer Animation anpassen, indem du die Verzögerung oder Dauer mithilfe der Attribute `animate-in-delay` und `animate-in-duration` änderst. Im folgenden Beispiel fliegt `my-element` nach 0,3 Sekunden von links auf der Seite ein. Innerhalb von 0,5 Sekunden ist die Animation abgeschlossen:

```html
<amp-story-page id="my-page">
  ...
  <p class="my-element"
      animate-in="fly-in-left"
      animate-in-delay="0.3s"
      animate-in-duration="0.5s">
    I'm going to fly into the page from the left!
  </p>
</amp-story-page>
```

## Animieren der letzten Seite

Die letzte Seite unserer Web Story besteht aus zwei Ebenen: Die erste Ebene ist eine Collage aus Tierbildern und die zweite Ebene zeigt Bannertext an. Um diese Seite zu erstellen, musst du den folgenden Code direkt nach deiner vorangehenden Story Seite **einfügen**:

```html
<amp-story-page id="page5">
  <amp-story-grid-layer template="vertical" class="noedge">
    <div class="wrapper">
      <amp-img src="assets/cat.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/dog.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/bird.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
      <amp-img src="assets/rabbit.jpg"
          width="720" height="1280"
          layout="responsive">
      </amp-img>
    </div>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical" class="center-text">
    <p class="banner-text">Pets can lower your stress levels!</p>
  </amp-story-grid-layer>
</amp-story-page>
```

Lade die AMP Story in deinem Browser neu und überzeuge dich davon, dass die Seite korrekt gerendert wird und folgendermaßen aussieht:

{{ image('/static/img/docs/tutorials/amp_story/pg5-collage.png', 720, 1280, align='center third', alt='Static page 5' ) }}

Es sieht toll aus, aber alles ist statisch! Animieren wir die Elemente.

Beginnen wir damit, den Eingang des Bannertextes zu animieren und diesen von rechts auf die Seite hineinzischen zu lassen. Füge dem Element `<p>` das Attribut `animate-in="whoosh-in-right"` hinzu:

```html
<p class="banner-text"
  animate-in="whoosh-in-right">
Pets can lower your stress levels!</p>
```

Reload your story page in your browser, and verify that the banner whooshes in.

Lassen wir als Nächstes alle Bilder einblenden. Füge jedem der Elemente [`amp-img`](../../../../documentation/components/reference/amp-img.md) das Attribut `animate-in="fade-in"` hinzu. So soll der Code aussehen:

```html
<amp-img src="assets/cat.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/dog.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/bird.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/rabbit.jpg"
  width="720" height="1280"
  layout="responsive"
  animate-in="fade-in">
</amp-img>
```

If you refresh and reload the page, each of the images fade in.  That's great but you can barely notice the effect because all the images fade in at the same time! We can improve the visual effect by changing the timing of these animations.

Let's delay the entrance of the first image so that it comes in close to when the text banner finishes entering, say .4s. The remaining three images can come .2s after the previous image's entrance. For each of the [`amp-img`](../../../../documentation/components/reference/amp-img.md) elements, add `animate-in-delay=""` with the appropriate time delay value. Your code should look like this:

```html
<amp-img src="assets/cat.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay="0.4s">
</amp-img>
<amp-img src="assets/dog.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay="0.6s">
</amp-img>
<amp-img src="assets/bird.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay=".8s">
</amp-img>
<amp-img src="assets/rabbit.jpg"
    width="720" height="1280"
    layout="responsive"
    animate-in="fade-in"
    animate-in-delay="1s">
</amp-img>

```

Refresh and reload your story.  Your last page should look like this:

{{ anim('/static/img/docs/tutorials/amp_story/pg5-collage-animation.gif', 720, 1280, align='center third', alt='Page 5 collage', poster='/static/img/docs/tutorials/amp_story/pg5-collage.png' ) }}

There are a lot of possibilities with animations in Web Stories  (e.g., combining animations, chaining animations), and this tutorial scratches only the surface. To learn more about animations, see the [`amp-story`](../../../../documentation/components/reference/amp-story.md) reference documentation.
