---
"$title": Starting our story
"$order": '3'
description: An entire Web Story is represented by the amp-story component, which serves as a container for all the pages in a story. The amp-story component is also responsible for ...
author: bpaduch
---

An entire Web Story is represented by the [`amp-story`](../../../../documentation/components/reference/amp-story.md) component, which serves as a container for all the pages in a story.  The [`amp-story`](../../../../documentation/components/reference/amp-story.md) component is also responsible for creating the UI shell, including handling gestures and navigation.

Le composant [`amp-story`](../../../../documentation/components/reference/amp-story.md) est un composant AMP personnalisé et, comme tous les composants personnalisés, vous devez ajouter le script associé pour le composant au document AMP.

**Ouvrez** le fichier `pets.html` dans votre éditeur de texte et dans la section `<head>`, **ajoutez** le script suivant :

```html
<head>
<script async custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
</head>
```

**Ajoutez** l'élément `<amp-story>` au `<body>` de votre document, et spécifiez l'attribut `standalone` obligatoire, comme ceci :

```html
<body>
  <amp-story standalone>
  </amp-story>
</body>
```

It's important to note that to have a valid AMP story, the `<body>` element must have only one child—the [`amp-story`](../../../../documentation/components/reference/amp-story.md) component; all other elements are contained in the [`amp-story`](../../../../documentation/components/reference/amp-story.md).

## Fournir des méta-informations

For stories to be discovered on the web, certain metadata is required to provide mini details of the story, like:

- The title of the story, represented by the `title` attribute (e.g., "Joy of Pets").
- The name of the publisher, represented by the `publisher` attribute (e.g., "AMP tutorials").
- Le logo de l'éditeur, représenté par l'attribut `publisher-logo-src`.  Il s'agit d'une URL pour une image de logo, dans un format carré de rapport 1x1.
- A poster image of the story, represented by the `poster-portrait-src` attribute. This is a URL for the poster, and the image must be in portrait format with a 3x4 aspect ratio.

Ajoutons ces attributs à notre balise [`amp-story`](../../../../documentation/components/reference/amp-story.md) :

```html
<amp-story standalone
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
```

En plus de ces attributs obligatoires, vous pouvez appliquer d'autres attributs. Pour en savoir plus, consultez la section sur les [attributs](../../../../documentation/components/reference/amp-story.md#attributes) de la documentation de référence [`amp-story`](../../../../documentation/components/reference/amp-story.md).

[tip type="note"] **NOTE –**  These metadata attributes supplement and do not replace any Structured Data (e.g. JSON-LD) on the page. To ensure your Web Stories are discovered across all platforms, you should add [Structured Data](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md#integrate-with-third-party-platforms-through-additional-metadata) to all your AMP pages, including AMP stories. [/tip]

At this point, we have a shell of a story without any content. Let's create that page.
