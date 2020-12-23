---
"$title": "Animation d'éléments"
"$order": '6'
description: You can further enhance a Web Story by applying animation entrances to elements inside a page. For example, you can make your title fly in from ...
components:
- anim
author: bpaduch
---

You can further enhance a Web Story by applying animation entrances to elements inside a page. For example, you can make your title fly in from the left, or drop into the page, or fade in, and so on.  The AMP story framework provides the following preset animations to use in a Web Story:

<table>
<thead><tr>
  <th width="50%">Animation prédéfinie</th>
  <th width="25%">Durée par défaut (ms)</th>
  <th width="25%">Délai par défaut (ms)</th>
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

Pour appliquer une entrée d'animation sur un élément, vous devez spécifier <code>animate-in="<em data-md-type="raw_html"><animation data-md-type="raw_html" preset></animation></em>"</code> avec une des valeurs d'animation prédéfinie.  Par exemple, pour lâcher du texte dans une page, ajoutez `animate-in="drop"` à l'élément texte :

```html
<amp-story-page id="page3">
  ...
  <amp-story-grid-layer template="vertical">
    <p animate-in="drop">Drop this text into the page</p>
</amp-story-page>
```

[tip type="note"] Explore the different animation effects by adding the `animate-in="<animation preset>"` attribute to elements on your story pages. [/tip]

## Animation timing

Each animation preset has a built-in default time value for:

- **délai** : il s'agit du temps nécessaire pour retarder le démarrage de l'animation. Par exemple, un délai de 0,3 s signifie que l'animation entrera dans la page après 0,3 seconde. Un délai de 0 s démarre immédiatement l'animation.
- **durée** : il s'agit de la durée pendant laquelle l'animation se produit. Par exemple, l'animation de fondu d'entrée du début à la fin prend 500 ms.

Vous pouvez personnaliser la temporisation d'une animation en modifiant le délai ou la durée via les attributs `animate-in-delay` et `animate-in-duration`. Dans l'exemple suivant, `my-element` survole la page depuis la gauche après 0,3 seconde et s'envole complètement en 0,5 seconde :

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

## Animation de notre dernière page

Our last Web Story page is comprised of two layers: the first layer is a collage of animal images and the second layer displays some banner text.  To create this page, **add** the following code just after your previous story page:

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

Reload the AMP story in your browser, and verify that the page renders correctly and looks like this:

{{ image('/static/img/docs/tutorials/amp_story/pg5-collage.png', 720, 1280, align='center third', alt='Static page 5' ) }}

Ça a l'air génial mais tout est statique ! Animons tout ça !

Nous allons commencer par animer l'entrée du texte de la bannière et la faire apparaître à partir de la droite de la page. Ajoutez `animate-in="whoosh-in-right"` à l'élément `<p>` comme ceci :

```html
<p class="banner-text"
  animate-in="whoosh-in-right">
Pets can lower your stress levels!</p>
```

Reload your story page in your browser, and verify that the banner whooshes in.

Ensuite, faisons apparaître toutes les images en fondu. Ajoutez `animate-in="fade-in"` à chacun des éléments [`amp-img`](../../../../documentation/components/reference/amp-img.md) pour que le code ressemble à ceci :

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
