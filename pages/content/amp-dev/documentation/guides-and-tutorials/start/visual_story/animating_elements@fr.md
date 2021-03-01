---
'$title': "Animation d'éléments"
$order: 6
description: "Vous pouvez encore améliorer une story Web en appliquant des entrées d'animation aux éléments d'une page. Par exemple, vous pouvez faire apparaître votre titre..."
components:
  - anim
author: bpaduch
---

Vous pouvez encore améliorer une story Web en appliquant des entrées d'animation aux éléments d'une page. Par exemple, vous pouvez faire apparaître votre titre depuis la gauche, ou le faire glisser dans la page, ou le faire apparaître en fondu, etc. La structure de la story AMP fournit les animations prédéfinies suivantes à utiliser dans une story Web :

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

Pour appliquer une entrée d'animation sur un élément, vous devez spécifier <code>animate-in="<em data-md-type="raw_html"><animation data-md-type="raw_html" preset></animation></em>"</code> avec une des valeurs d'animation prédéfinie. Par exemple, pour lâcher du texte dans une page, ajoutez `animate-in="drop"` à l'élément texte :

```html
<amp-story-page id="page3">
  ...
  <amp-story-grid-layer template="vertical">
    <p animate-in="drop">Drop this text into the page</p>
</amp-story-page>
```

[tip type="note"] Explore the different animation effects by adding the `animate-in="<animation preset>"` attribute to elements on your story pages. [/tip]

## Définition du temps de l'animation

Each animation preset has a built-in default time value for:

- **délai** : il s'agit du temps nécessaire pour retarder le démarrage de l'animation. Par exemple, un délai de 0,3 s signifie que l'animation entrera dans la page après 0,3 seconde. Un délai de 0 s démarre immédiatement l'animation.
- **durée** : il s'agit de la durée pendant laquelle l'animation se produit. Par exemple, l'animation de fondu d'entrée du début à la fin prend 500 ms.

Vous pouvez personnaliser la temporisation d'une animation en modifiant le délai ou la durée via les attributs `animate-in-delay` et `animate-in-duration`. Dans l'exemple suivant, `my-element` survole la page depuis la gauche après 0,3 seconde et s'envole complètement en 0,5 seconde :

```html
<amp-story-page id="my-page">
  ...
  <p
    class="my-element"
    animate-in="fly-in-left"
    animate-in-delay="0.3s"
    animate-in-duration="0.5s"
  >
    I'm going to fly into the page from the left!
  </p>
</amp-story-page>
```

## Animation de notre dernière page

La dernière page de notre story Web est composée de deux couches : la première couche est un collage d'images d'animaux et la deuxième couche affiche du texte de bannière. Pour créer cette page, **ajoutez** le code suivant juste après la page précédente de votre histoire :

```html
<amp-story-page id="page5">
  <amp-story-grid-layer template="vertical" class="noedge">
    <div class="wrapper">
      <amp-img
        src="assets/cat.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
      <amp-img
        src="assets/dog.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
      <amp-img
        src="assets/bird.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
      <amp-img
        src="assets/rabbit.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
    </div>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical" class="center-text">
    <p class="banner-text">Pets can lower your stress levels!</p>
  </amp-story-grid-layer>
</amp-story-page>
```

Rechargez la story AMP dans votre navigateur et vérifiez que la page s'affiche correctement et ressemble à ceci :

{{ image('/static/img/docs/tutorials/amp_story/pg5-collage.png', 720, 1280, align='center third', alt='Static page 5' ) }}

Ça a l'air génial mais tout est statique ! Animons tout ça !

Nous allons commencer par animer l'entrée du texte de la bannière et la faire apparaître à partir de la droite de la page. Ajoutez `animate-in="whoosh-in-right"` à l'élément `<p>` comme ceci :

```html
<p class="banner-text" animate-in="whoosh-in-right">
  Pets can lower your stress levels!
</p>
```

Rechargez la page de votre story dans votre navigateur et vérifiez que la bannière apparaisse.

Ensuite, faisons apparaître toutes les images en fondu. Ajoutez `animate-in="fade-in"` à chacun des éléments [`amp-img`](../../../../documentation/components/reference/amp-img.md) pour que le code ressemble à ceci :

```html
<amp-img
  src="assets/cat.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
<amp-img
  src="assets/dog.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
<amp-img
  src="assets/bird.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
<amp-img
  src="assets/rabbit.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
```

Si vous actualisez et rechargez la page, chacune des images s'estompe. C'est excellent mais vous pouvez à peine remarquer l'effet car toutes les images s'estompent en même temps ! Nous pouvons améliorer l'effet visuel en modifiant les valeurs temporelles de ces animations.

Retardons l'entrée de la première image pour qu'elle se rapproche du moment où la bannière de texte termine son entrée, disons 0,4 s. Les trois images restantes peuvent venir 0,2 s après l'entrée de l'image précédente. Pour chacun des éléments [`amp-img`](../../../../documentation/components/reference/amp-img.md), ajoutez `animate-in-delay=""` avec la valeur de délai appropriée. Votre code doit ressembler à ceci :

```html
<amp-img
  src="assets/cat.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay="0.4s"
>
</amp-img>
<amp-img
  src="assets/dog.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay="0.6s"
>
</amp-img>
<amp-img
  src="assets/bird.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay=".8s"
>
</amp-img>
<amp-img
  src="assets/rabbit.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay="1s"
>
</amp-img>
```

Refresh and reload your story. Your last page should look like this:

{{ anim('/static/img/docs/tutorials/amp_story/pg5-collage-animation.gif', 720, 1280, align='center third', alt='Page 5 collage', poster='/static/img/docs/tutorials/amp_story/pg5-collage.png' ) }}

Il existe de nombreuses possibilités avec les animations dans les stories Web (par exemple, combiner des animations, enchaîner des animations), et ce tutoriel ne fait que donner un aperçu superficiel. Pour en savoir plus sur les animations, consultez la documentation de référence de [`amp-story`](../../../../documentation/components/reference/amp-story.md).
