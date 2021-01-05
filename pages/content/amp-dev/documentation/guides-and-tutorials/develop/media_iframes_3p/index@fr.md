---
"$title": Ajouter des images et vidéos
"$order": '8'
description: "Tout comme sur une page HTML normale, AMP vous permet d'intégrer des contenus image, vidéo et audio. Découvrez la différence avec les équivalents AMP et apprenez à ..."
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

tout comme sur une page HTML normale, AMP vous permet d'intégrer des contenus **image**, **vidoé** et **audio**. Découvrez la différence avec les équivalents AMP et apprenez comment les inclure dans vos pages.

## Pourquoi pas `<img>`, `<video>` et `<audio>`?

AMP ne prend pas en charge les équivalents HTML par défaut pour l'affichage des médias, comme `<img>`. Nous fournissons des composants équivalents pour les raisons suivantes:

- Nous devons comprendre la disposition de la page avant le chargement des ressources, ce qui est crucial pour [assurer le préchargement de la première fenêtre](../../../../about/how-amp-works.html#size-all-resources-statically).
- Nous devons contrôler les demandes réseau liées au [chargement différé et hiérarchiser les ressources de manière efficace](../../../../about/how-amp-works.html#prioritize-resource-loading)

Attention: bien que pas pris en charge, ils *seront* lus, mais AMP [ne validera pas vos pages](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) et vous ne bénéficierez pas des avantages d'AMP.

## Images

Ajoutez une image dans votre page en utilisant l'élément [`amp-img`](../../../../documentation/components/reference/amp-img.md), comme suit:

[example preview="inline" playground="true"]
```html
<amp-img alt="A beautiful sunset"
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195">
</amp-img>
```
[/example]

Dans cet exemple très basique, l'image s'affichera avec la hauteur et la largeur fixes spécifiées. Au minimum, une largeur et une hauteur explicites doivent être définies.

#### Comment afficher des images lorsque JavaScript est désactivé

Étant donné que [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) s'appuie sur JavaScript, si l'utilisateur choisit de désactiver les scripts, les images ne s'afficheront pas. Dans ce cas, vous devez fournir une image de secours en utilisant `<img>` et `<noscript>`, comme suit:

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

### Mises en page avancées

AMP permet de créer des images entièrement réactives bien plus facilement qu'avec du CSS/HTML standard. Dans sa forme la plus simple, il vous suffit d'ajouter `layout="responsive"`:

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

[tip type="read-on"] **LIRE –**  Plus de détails sur les [techniques de mise en page avancées](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

### Comportement et caractères de remplacement

Le runtime HTML AMP peut gérer efficacement les ressources image, en choisissant de retarder ou de hiérarchiser le chargement des ressources en fonction de la position de la fenêtre, des ressources système, de la bande passante ou d'autres facteurs.

[tip type="read-on"] **LIRE –**  Découvrez comment [fournir des solutions de secours et des caractères de remplacement pour les images](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

## Images animées

L'élément [`amp-anim`](../../../../documentation/components/reference/amp-anim.md) est très similaire à l'élément [`amp-img`](../../../../documentation/components/reference/amp-img.md) et offre des fonctionnalités supplémentaires pour gérer le chargement et la lecture d'images animées telles que les GIF.

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

[tip type="note"] **REMARQUE –**  Ajoutez `<script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>` dans l'en-tête de votre document pour utiliser ce composant. [/tip]

## Vidéo

Incluez une vidéo dans votre page à l'aide de l'élément [`amp-video`](../../../../documentation/components/reference/amp-video.md).

Utilisez cet élément uniquement pour l'intégration directe de fichiers vidéo HTML5. L'élément assure un chargement différé de la ressource vidéo spécifiée par l'attribut `src`, à un moment déterminé par AMP.

Incluez un caractère de remplacement avant le démarrage de la vidéo et une solution de secours si le navigateur ne prend pas en charge les vidéos HTML5, par exemple:

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

Incluez une ressource audio dans votre page, en utilisant l'élément [`amp-audio`](../../../../documentation/components/reference/amp-audio.md).

Utilisez cet élément uniquement pour l'intégration directe de fichiers audio HTML5. Comme toutes les ressources externes intégrées dans une page AMP, l'élément assure le chargement différé de la ressource audio spécifiée par l'attribut `src`, à un moment déterminé par AMP.

Incluez une solution de secours, si le navigateur ne prend pas en charge l'audio HTML5, par exemple:

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

[tip type="note"] **REMARQUE –**  Ajoutez `<script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>` dans l'en-tête de votre page pour utiliser ce composant. [/tip]
