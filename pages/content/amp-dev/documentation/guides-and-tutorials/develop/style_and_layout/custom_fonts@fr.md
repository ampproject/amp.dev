---
'$title': Comment ajouter des polices personnalisées
$order: 6
description: "Les pages AMP ne peuvent pas inclure de feuilles de style externes, à l'exception des polices personnalisées. Vous pouvez intégrer des polices personnalisées dans votre page de deux manières ..."
formats:
  - websites
  - ads
  - stories
author: pbakaus
---

Les pages AMP ne peuvent pas inclure de feuilles de style externes, à l'exception des polices personnalisées. Vous pouvez intégrer des polices personnalisées dans votre page de deux manières:

1. Via une balise `<link>` (fournisseurs de polices autorisés uniquement)
2. Via `@font-face` (aucune restriction, toutes les polices sont autorisées)

### 1. Avec `<link>`

Utilisez une balise `<link>` (généralement dans l'en-tête de votre page), comme ceci:

[sourcecode:html]

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

Les origines suivantes sont répertoriées et autorisées pour la diffusion de polices via des balises de lien:

- Typography.com: **https://cloud.typography.com**
- Fonts.com: **https://fast.fonts.net**
- Google Fonts: **https://fonts.googleapis.com**
- Typekit: **https://use.typekit.net**
- Font Awesome: **https://maxcdn.bootstrapcdn.com**, **https://use.fontawesome.com**

### 2. Avec `@font-face`

Vous pouvez également utiliser [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) dans votre feuille de style AMP:

[sourcecode:html]

<style amp-custom>
  @font-face {
    font-family: "Bitstream Vera Serif Bold";
    src: url("https://somedomain.org/VeraSeBd.ttf");
  }

  body {
    font-family: "Bitstream Vera Serif Bold", serif;
  }
</style>

[/sourcecode]

[tip type="note"] **REMARQUE –** les polices ajoutées via `@font-face` doivent être récupérées via HTTP ou HTTPS. [/tip]
