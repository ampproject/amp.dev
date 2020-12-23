---
"$title": Initiation au code de démarrage
"$order": '1'
description: "Une page AMP est une page HTML dotée de certaines restrictions pour des performances fiables. Les pages AMP comportent un balisage légèrement spécial qui l'identifie en tant que page AMP."
---

## Modèle AMP

Une page AMP est une page HTML dotée de certaines restrictions pour des performances fiables. Les pages AMP comportent un balisage légèrement spécial qui l'identifie en tant que page AMP.

Une page AMP simple ressemble à ceci:

```html
<!DOCTYPE html>
<html amp>
  <head>
    <meta charset="utf-8" />
    <link rel="canonical" href="hello-world.html" />
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
  </head>
  <body>
    Hello World!
  </body>
</html>
```

[tip] Vous pouvez utiliser le [générateur de modèle](https://amp.dev/boilerplate) pour configurer rapidement un squelette de base pour votre page AMP. Il fournit également des extraits de données structurées, pour créer une PWA et plus encore! [/tip]

## Composants AMP

Le code de démarrage de ce tutoriel, ( [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html)), s'appuie sur une page AMP simple avec son contenu (images, texte, etc.) ainsi que sur quelques composants AMP:

```html
<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
<script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js"></script>
<script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
<script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"></script>
```

Les composants AMP offrent des fonctionnalités supplémentaires et des composants d'interface utilisateur qui ajoutent une interactivité riche aux pages AMP. Le code de démarrage utilise les composants AMP suivants:

- [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md): carrousel d'images qui affiche plusieurs vues du produit.
- [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md): système de modèles pour le rendu des réponses du serveur à partir d'amp-form.
- [`amp-form`](../../../../documentation/components/reference/amp-form.md): ajoute des fonctionnalités spéciales pour les éléments `<form>` nécessaires aux pages AMP.
- [`amp-selector`](../../../../documentation/components/reference/amp-selector.md): offre un moyen sémantique de sélectionner un ou plusieurs éléments d'un groupe d'éléments. Peut être utilisé comme source d'entrée pour amp-form.

## Interactivité de base

Le code de démarrage offre une certaine interactivité de base:

- Le carrousel d'images ([`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)) affiche plusieurs vues du produit.
- Le produit peut être ajouté au panier de l'utilisateur (via [`amp-form`](../../../../documentation/components/reference/amp-form.md)) en appuyant sur le bouton « Ajouter au panier » en bas de la page.

**Essayez** : faites glisser le carrousel d'images et appuyez sur le bouton « Ajouter au panier ».
