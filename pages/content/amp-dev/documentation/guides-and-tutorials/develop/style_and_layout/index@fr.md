---
$title: Créer des pages AMP responsives
---

Dans le cas d'éléments AMP, c'est facile, il suffit de leur ajouter le code `layout=responsive`.

## Créer des images responsives

Toutes les ressources chargées en externe, y compris les images, doivent avoir une taille et un emplacement précis. Ainsi, au fil de leur chargement, la page ne saute pas et est redisposée de manière dynamique.

Créez des images responsives en indiquant leur largeur et leur hauteur, en définissant la mise en page comme responsive et en indiquant, au moyen de [`srcset`](style_pages.md), quelle ressource d'image utiliser en fonction des différentes tailles d'écran :

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

Cet élément [`amp-img`](../../../../documentation/components/reference/amp-img.md) s'adapte automatiquement à la largeur de son élément conteneur, et sa hauteur est définie automatiquement sur le format déterminé par la largeur et la hauteur données :

<amp-img src="/static/img/docs/responsive_amp_img.png" width="500" height="857"></amp-img>

Voir aussi [`amp-img` sur AMP by Example](../../../../documentation/components/reference/amp-img.md).

## Ajouter des styles à une page

Ajoutez tous les styles à l'intérieur de la balise `<style amp-custom>` dans l'en-tête du document.
Par exemple :

[sourcecode:html]

<!doctype html>
  <head>
    <meta charset="utf-8">
    <link rel="canonical" href="hello-world.html">
    <meta name="viewport" content="width=device-width">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
      /* any custom style goes here. */
      body {
        background-color: white;
      }
      amp-img {
        border: 5px solid black;
      }

      amp-img.grey-placeholder {
        background-color: grey;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>

  </head>
[/sourcecode]

**Important** : Assurez-vous de n'avoir qu'une seule balise `<style amp-custom>` sur votre page, car il n'est pas autorisé d'en utiliser davantage dans les pages AMP.

Définissez des styles de composants avec des sélecteurs de classe ou d'élément en utilisant des propriétés CSS courantes. Par exemple :

[sourcecode:html]

<body>
  <p>Hello, Kitty.</p>
  <amp-img
    class="grey-placeholder"
    src="https://placekitten.com/g/500/300"
    srcset="/img/cat.jpg 640w,
           /img/kitten.jpg 320w"
    width="500"
    height="300"
    layout="responsive">
  </amp-img>
</body>
[/sourcecode]

**Important** : Assurez-vous que vos styles sont compatibles avec les pages AMP ; certains ne le sont pas pour des raisons de performance (voir aussi [CSS compatibles](style_pages.md)).

## Éléments de taille et d'emplacement

Les pages AMP dissocient la mise en page du document du chargement des ressources. Ainsi, la mise en page de la page peut être chargée sans avoir à attendre le téléchargement des ressources.

Indiquez la taille et l'emplacement de tous les éléments AMP visibles en fournissant un attribut `width` et un attribut `height`.
Ces attributs définissent le format de l'élément, qui peut être mis à l'échelle du conteneur.

Définissez la mise en page comme responsive.
Cela ajuste la taille de l'élément à la largeur de son élément conteneur, et redimensionne automatiquement sa hauteur au format donné par les attributs de largeur et de hauteur.

Renseignez-vous sur les [mises en page compatibles avec les pages AMP](control_layout.md).

## Valider vos styles et votre mise en page

Utilisez le validateur AMP pour tester les valeurs du CSS et de la mise en page de votre page.

Le validateur confirme que le CSS de votre page n'excède pas la limite de 50 000 octets, vérifie qu'il ne contient pas de styles interdits et s'assure de la compatibilité de la mise en page de votre page ainsi que de son bon formatage.
Consultez aussi la liste complète des [erreurs de style et de mise en page](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validation_errors.md#erreurs-de-style-et-de-mise-en-page).

Exemple d'erreur dans la console pour une page avec un CSS qui dépasse la limite de 50 000 octets :

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

Apprenez-en davantage sur la façon de [valider vos pages AMP](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md), y compris comment détecter les erreurs de style et les corriger.
