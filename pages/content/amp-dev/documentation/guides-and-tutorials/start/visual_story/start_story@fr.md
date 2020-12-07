---
"$title": Démarrons notre story
"$order": '3'
description: "Une story Web entière est représentée par le composant amp-story, qui sert de conteneur pour toutes les pages d'une story. Le composant amp-story est également responsable de ..."
author: bpaduch
---

Une story Web entière est représentée par le composant [`amp-story`](../../../../documentation/components/reference/amp-story.md), qui sert de conteneur pour toutes les pages d'une story. Le composant [`amp-story`](../../../../documentation/components/reference/amp-story.md) est également responsable de la création du shell de l'interface utilisateur, y compris la gestion des gestes et de la navigation.

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

Il est important de noter que pour avoir une story AMP valide, l'élément `<body>` ne doit avoir qu'un seul enfant : le composant [`amp-story`](../../../../documentation/components/reference/amp-story.md) ; tous les autres éléments sont contenus dans l'[`amp-story`](../../../../documentation/components/reference/amp-story.md).

## Fournir des méta-informations

Pour que les stories soient visibles sur le Web, certaines métadonnées sont nécessaires pour fournir des mini détails de la story, comme :

- Le titre de la story, représenté par l'attribut `title` (par exemple, "Joie des animaux domestiques").
- Le nom de l'éditeur, représenté par l'attribut `publisher` (par exemple, "Tutoriels AMP").
- Le logo de l'éditeur, représenté par l'attribut `publisher-logo-src`.  Il s'agit d'une URL pour une image de logo, dans un format carré de rapport 1x1.
- Une image d'affiche de la story, représentée par l'attribut `poster-portrait-src`. Il s'agit d'une URL d'affiche et l'image doit être au format portrait avec des proportions de 3x4.

Ajoutons ces attributs à notre balise [`amp-story`](../../../../documentation/components/reference/amp-story.md) :

```html
<amp-story standalone
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
```

En plus de ces attributs obligatoires, vous pouvez appliquer d'autres attributs. Pour en savoir plus, consultez la section sur les [attributs](../../../../documentation/components/reference/amp-story.md#attributes) de la documentation de référence [`amp-story`](../../../../documentation/components/reference/amp-story.md).

[tip type="note"] **REMARQUE -** Ces attributs de métadonnées complètent et ne remplacent aucune donnée structurée (par exemple JSON-LD) sur la page. Pour vous assurer que vos stories Web sont visibles sur toutes les plateformes, vous devez ajouter des [données structurées](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md#integrate-with-third-party-platforms-through-additional-metadata) à toutes vos pages AMP, y compris les stories AMP. [/tip]

À ce stade, nous avons le shell d'une story sans aucun contenu. Créons à présent la page.
