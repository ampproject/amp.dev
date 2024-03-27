---
'$title': Comment inclure les iframes
$order: 10
description: "Découvrez comment afficher vos pages avec du contenu multimédia et comment utiliser les iframes pour afficher du contenu avancé en dehors des limites d'AMP."
formats:
  - websites
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

Learn how to display include media content in your pages, and how to use iframes to display advanced content outside of AMP's limitations.

## Fondamentaux

Vous pouvez afficher une iframe sur votre page en utilisant l'élément [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md).

Les iframes sont particulièrement utiles dans AMP pour afficher du contenu non pris en charge dans le contexte de la page principale, tel que le contenu nécessitant du JavaScript créé par l'utilisateur.

### Exigences pour `amp-iframe`

- Doit être à au moins **600 px** ou **75%** du haut de la première fenêtre d'affichage (sauf pour les iframes qui utilisent un [`placeholder`](#using-placeholders)).
- Ne peut demander des ressources que via HTTPS et celles-ci ne doivent pas avoir la même origine que le conteneur, sauf si elles ne spécifient pas allow-same-origin.

[tip type="read-on"] **LIRE –** Plus de détails dans les [spécifications complètes pour `amp-iframe`](../../../../documentation/components/reference/amp-iframe.md). [/tip]

### Comment inclure le script

Pour inclure une balise [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) dans votre page, commencez par inclure le script suivant dans la section `<head>` afin e charger le code supplémentaire pour le composant étendu:

[sourcecode:html]

<script async custom-element="amp-iframe"
  src="https://ampjs.org/v0/amp-iframe-0.1.js"></script>

[/sourcecode]

### Comment écrire le balisage

Dans l'exemple suivant, nous avons créé une balise [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) réactive pour intégrer une carte Google Map via [l'API d'intégration de Google Maps](https://developers.google.com/maps/documentation/embed/guide):

```html
<amp-iframe
  width="200"
  height="100"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://www.google.com/maps/embed/v1/place?key={YOUR API KEY}&q=europe"
>
</amp-iframe>
```

## Utilisation des caractères de remplacement <a name="using-placeholders"></a>

Vous pouvez afficher une [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) en haut d'un document, à condition que cette [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) contienne un élément avec l'attribut `placeholder` (par exemple, un élément [`amp-img`](../../../../documentation/components/reference/amp-img.md)) qui sera affiché comme caractère de remplacement jusqu'à ce que l'iframe soit prête à être affichée.

[tip type="read-on"] **LIRE –**: Plus de détails sur les caractères de remplacement dans la section [Iframe avec caractère de remplacement](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder). [/tip]

Exemple avec caractère de remplacement:

```html
<amp-iframe
  width="400"
  height="225"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://giphy.com/embed/OWabwoEn7ezug"
>
  <amp-img
    placeholder
    layout="fill"
    src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"
  ></amp-img>
</amp-iframe>
```

Rendu:

<amp-iframe width="400" height="225" sandbox="allow-scripts allow-same-origin" layout="responsive" src="https://giphy.com/embed/OWabwoEn7ezug"><amp-img placeholder layout="fill" src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img></amp-iframe>

## Exemples

Vous trouverez des exemples [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) plus élaborés dans [AMP par l'exemple](../../../../documentation/examples/documentation/amp-iframe.html).
