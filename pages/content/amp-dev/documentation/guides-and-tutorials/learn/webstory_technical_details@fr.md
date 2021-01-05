---
"$title": Détails techniques des stories Web
"$order": '1'
description: Détails techniques des stories Web
"$category": Develop
formats:
- stories
author: CrystalOnScript
---

Ce guide explique tous les détails techniques et les bonnes pratiques que vous devez connaître pour réussir à créer des stories Web avec AMP.

## AMP Valid

Techniquement, une story Web est une page Web unique créée avec AMP et conforme aux spécifications AMP:

- Commencer par le type de document `<!doctype html>`.
- Contient une balise de niveau supérieur `<html ⚡>` ou `<html amp>`.
- Contenir les balises `<head>` et `<body>`.
- Contenir une balise ` <meta charset="utf-8">` comme premier enfant de la balise `<head>`.
- Contenir une balise `<script async src="https://cdn.ampproject.org/v0.js"></script>` dans la balise `<head>`. Une bonne pratique est d'inclure ce script le plus tôt possible dans `<head>`.
- Contenir une balise ` <link rel="canonical" href="page/url">` dans `<head>` avec un href qui pointe vers l'URL de la story Web.
- Contenir une balise `<meta name="viewport" content="width=device-width">` dans la balise `<head>`. il est également recommandé d'ajouter initial-scale=1.
- Contenir le code [AMP boilerplate](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) dans la balise `<head>`.

La différence entre une page Web AMP et une story Web créée avec AMP est le composant [`amp-story`](https://amp.dev/documentation/components/amp-story/?format=stories). C'est le seul enfant direct du `<body>` du document et doit contenir l'attribut `standalone`. Toutes les pages, couches et éléments de la story Web sont définis dans les balises `<amp-story>`.

```html
<!doctype html>
<html ⚡>
  <head>
    <meta charset="utf-8">
    <title>Joy of Pets</title>
    <link rel="canonical" href="pets.html">
    <meta name="viewport" content="width=device-width">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-video"
        src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>
    <script async custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <style amp-custom>
    ...
    </style>
  </head>
  <body>
    <!-- Cover page -->
    <amp-story standalone
        title="Joy of Pets"
        publisher="AMP tutorials"
        publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
        poster-portrait-src="assets/cover.jpg">
      <amp-story-page id="cover">
        <amp-story-grid-layer template="fill">
          <amp-img src="assets/cover.jpg"
              width="720" height="1280"
              layout="responsive">
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
          <amp-img src="assets/cat.jpg"
              width="720" height="1280"
              layout="responsive">
          </amp-img>
          <q>Dogs come when they're called. Cats take a message and get back to you. --Mary Bly</q>
        </amp-story-grid-layer>
      </amp-story-page>
      ...
    </amp-story>
  </body>
</html>
```

Suivez le [tutoriel Créer votre première story Web](../start/visual_story/?format=stories) et [lisez la documentation de référence amp-story ](../../components/reference/amp-story/?format=stories)pour en savoir plus.

## Performances et expérience utilisateur de pointe

Les utilisateurs peuvent consulter des stories Web dans des zones avec une faible connexion réseau ou des appareils anciens. Assurez-vous que les stories sont intéressantes en suivant ces bonnes pratiques.

### Couleur d'arrière plan

Spécifiez une couleur d'arrière-plan pour chaque page de story Web. Avoir une couleur d'arrière-plan offre une bonne solution de secours si les conditions de l'utilisateur les empêchent de télécharger des images ou des vidéos. Choisissez une couleur représentative de la couleur dominante de l'élément d'arrière-plan de la page ou utilisez un thème de couleur unique pour toutes les pages de stories. Assurez-vous que la couleur d'arrière-plan est différente du texte pour une meilleure lisibilité.

Définissez la couleur d'arrière-plan des pages dans les balises `<style amp-custom>` dans l'en-tête du document de story Web ou en ligne sur le composant [`<amp-story-page>`](https://amp.dev/documentation/components/amp-story-page/?format=stories).

### Éléments de superposition

L'en-tête système contient des commandes telles que les icônes de mise en sourdine et de partage. Elles apparaissent à un index-z plus élevé que l'image et la vidéo d'arrière-plan. Assurez-vous qu'aucune information essentielle n'est couverte par ces icônes.

### Proportions

Concevez les stories Web au format 9:16. Étant donné que la hauteur et la largeur de la page varient selon les navigateurs et les appareils, ne placez pas du contenu essentiel près des bords de la page.

### Images d'affiche

L'utilisateur voit une image d'affiche pendant le téléchargement d'une vidéo. L'image de l'affiche doit être représentative de la vidéo pour permettre une transition subtile. Spécifiez une image d'affiche en ajoutant l'attribut `poster` à votre élément amp-video et en le pointant vers l'emplacement de l'image.

```
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

## Vidéo

Toutes les vidéos doivent être ajoutées via le composant [amp-video](https://amp.dev/documentation/components/amp-video/?format=stories).

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

### Résolution et qualité

Encodez les vidéos pour ajuster la qualité des optimisations recommandées suivantes:

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

Essayez de garder les segments HLS à moins de 10 secondes.

### Format et taille

Ajoutez des vidéos de moins de 4 Mo pour des performances optimales. N'hésitez pas à diviser les grosses vidéos sur plusieurs pages.

Si vous ne pouvez fournir qu'un seul format vidéo, choisissez MP4. Lorsque cela est possible, utilisez le format HLS et spécifiez MP4 comme solution de secours pour la compatibilité du navigateur. Utilisez le codec vidéo suivant:

<table>
  <tr>
   <td>MP4, HLS et DASH</td>
   <td>H.264</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>VP9</td>
  </tr>
</table>

### Specifier <source> vs src</source>

Utilisez les éléments enfants `<source>` dans le composant `<amp-video>` pour spécifier la source vidéo via l'attribut `src`. L'utilisation de l'élément `<source>` vous permet de spécifier le type de vidéo et d'ajouter des sources vidéo de sauvegarde. Vous devez utiliser l'attribut `type` pour spécifier le type MIME. Utilisez `application/x-mpegurl` ou `application/vnd.apple.mpegurl` pour les vidéos HLS. Pour tous les autres types de vidéo, utilisez le préfixe MIME `video/` suivi du format vidéo, tel que `”video/mp4”`.

```html
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">
  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
```

### Avance automatique après les vidéos

L'attribut [`auto-advance-after`](https://amp.dev/documentation/components/amp-story-page/?format=stories#auto-advance-after-%5Boptional%5D) affiché par amp-story-page spécifie si et quand une page de story doit avancer sans le clic de l'utilisateur. Pour avancer après une vidéo, pointez l'attribut vers l'identifiant de la vidéo.

```html
<amp-story-page auto-advance-after="myvideo">
```

## Sur ordinateur de bureau

Le format de story Web prend en charge une [une version sur ordinateur de bureau en option](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/amp-story.md#landscape-orientation-and-full-bleed-desktop-experience-opt-in). Cela offre un mode immersif à fond perdu sur ordinateur de bureau, remplaçant l'affichage en portrait par défaut à trois panneaux et permet aux utilisateurs mobiles de voir la page même lorsque leur appareil est à l'horizontale.

Activez la prise en charge de la version pour ordinateur de bureau en ajoutant l'attribut `supports-landscape` au composant `<amp-story>`.

```html
<amp-story standalone
    supports-landscape
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/icon.svg"
    poster-portrait-src="assets/cover.jpg">
</amp-story>
```
