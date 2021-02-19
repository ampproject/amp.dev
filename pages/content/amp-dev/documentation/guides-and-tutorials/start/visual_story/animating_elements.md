---
$title: Animating elements
$order: 6
description: 'You can further enhance a Web Story by applying animation entrances to elements inside a page. For example, you can make your title fly in from ...'
components:
    - anim
author: bpaduch
---

You can further enhance a Web Story by applying animation entrances to elements inside a page. For example, you can make your title fly in from the left, or drop into the page, or fade in, and so on.  The AMP story framework provides the following preset animations to use in a Web Story:

<table>
<thead>
<tr>
  <th width="50%">Animation preset</th>
  <th width="25%">Default duration (ms)</th>
  <th width="25%">Default delay (ms)</th>
</tr>
</thead>
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

To apply an animation entrance to an element, you must specify the <code>animate-in="<em>&lt;animation preset></em>"</code> with one of the animation presets values.  For example, to drop some text into a page, add `animate-in="drop"` to the text element:

```html
<amp-story-page id="page3">
  ...
  <amp-story-grid-layer template="vertical">
    <p animate-in="drop">Drop this text into the page</p>
</amp-story-page>
```

[tip type="note"]
Explore the different animation effects by adding the `animate-in="<animation preset>"` attribute to elements on your story pages.
[/tip]

[tip type="note"]
Animations can help make your Web Story more visually exciting and engaging, but use them sparingly. Some users may find long, continuous animations distracting. Other users may have motion sensitivity and be adversely affected by excessive use of motion and parallax effects.
[/tip]

## Animation timing

Each animation preset has a built-in default time value for:

* **delay**: This is the amount of time to delay starting the animation.  For example, a delay of .3s means the animation enters the page after .3 seconds. A delay of 0s starts the animation right away.
* **duration**: This is the amount of time in which the animation occurs.  For example, the fade-in animation from start to finish takes 500ms.

You can customize the timing of an animation by changing the delay or duration through the `animate-in-delay` and `animate-in-duration` attributes. In the following example, `my-element` flys in from the left of the page after .3 seconds, and completely flies in within .5 seconds:

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

## Animating our last page

Our last Web Story page is comprised of two layers: the first layer is a collage of animal images and the second layer displays some banner text.  To create this page, **add** the following code just after your previous story page:

```html
<amp-story-page id="page5">
  <amp-story-grid-layer template="vertical" class="noedge">
    <div class="wrapper">
      <amp-img src="assets/cat.jpg"
          width="720" height="1280"
          layout="responsive"
          alt="...">
      </amp-img>
      <amp-img src="assets/dog.jpg"
          width="720" height="1280"
          layout="responsive"
          alt="...">
      </amp-img>
      <amp-img src="assets/bird.jpg"
          width="720" height="1280"
          layout="responsive"
          alt="...">
      </amp-img>
      <amp-img src="assets/rabbit.jpg"
          width="720" height="1280"
          layout="responsive"
          alt="...">
      </amp-img>
    </div>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical" class="center-text">
    <p class="banner-text">Pets can lower your stress levels!</p>
  </amp-story-grid-layer>
</amp-story-page>
```
Reload the AMP story in your browser, and verify that the page renders correctly and looks like this:

{{ image('/static/img/docs/tutorials/amp_story/pg5-collage.png', 720, 1280, align='center third', alt='Static page 5' ) }}

It looks great but everything is static! Let's animate!

We'll start by animating the entrance of the banner text and have it "whoosh in" from the right of the page. Add `animate-in="whoosh-in-right"` to the `<p>` element like so:

```html hl_lines="2"
<p class="banner-text"
  animate-in="whoosh-in-right">
Pets can lower your stress levels!</p>
```

Reload your story page in your browser, and verify that the banner whooshes in.

Next, let's make all the images fade in. Add `animate-in="fade-in"` to each of the [`amp-img`](../../../../documentation/components/reference/amp-img.md) elements so the code looks like this:

```html hl_lines="4 9 14 19"
<amp-img src="assets/cat.jpg"
  width="720" height="1280"
  layout="responsive"
  alt="..."
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/dog.jpg"
  width="720" height="1280"
  layout="responsive"
  alt="..."
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/bird.jpg"
  width="720" height="1280"
  layout="responsive"
  alt="..."
  animate-in="fade-in">
</amp-img>
<amp-img src="assets/rabbit.jpg"
  width="720" height="1280"
  layout="responsive"
  alt="..."
  animate-in="fade-in">
</amp-img>
```

If you refresh and reload the page, each of the images fade in.  That's great but you can barely notice the effect because all the images fade in at the same time! We can improve the visual effect by changing the timing of these animations.

Let's delay the entrance of the first image so that it comes in close to when the text banner finishes entering, say .4s. The remaining three images can come .2s after the previous image's entrance. For each of the [`amp-img`](../../../../documentation/components/reference/amp-img.md) elements, add `animate-in-delay=""` with the appropriate time delay value. Your code should look like this:

```html hl_lines="5 11 17 23"
<amp-img src="assets/cat.jpg"
    width="720" height="1280"
    layout="responsive"
    alt="..."
    animate-in="fade-in"
    animate-in-delay="0.4s">
</amp-img>
<amp-img src="assets/dog.jpg"
    width="720" height="1280"
    layout="responsive"
    alt="..."
    animate-in="fade-in"
    animate-in-delay="0.6s">
</amp-img>
<amp-img src="assets/bird.jpg"
    width="720" height="1280"
    layout="responsive"
    alt="..."
    animate-in="fade-in"
    animate-in-delay=".8s">
</amp-img>
<amp-img src="assets/rabbit.jpg"
    width="720" height="1280"
    layout="responsive"
    alt="..."
    animate-in="fade-in"
    animate-in-delay="1s">
</amp-img>

```

Refresh and reload your story.  Your last page should look like this:

{{ anim('/static/img/docs/tutorials/amp_story/pg5-collage-animation.gif', 720, 1280, align='center third', alt='Page 5 collage', poster='/static/img/docs/tutorials/amp_story/pg5-collage.png' ) }}

There are a lot of possibilities with animations in Web Stories  (e.g., combining animations, chaining animations), and this tutorial scratches only the surface. To learn more about animations, see the [`amp-story`](../../../../documentation/components/reference/amp-story.md) reference documentation.
