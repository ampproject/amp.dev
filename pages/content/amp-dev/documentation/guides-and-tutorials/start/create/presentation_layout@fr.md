---
'$title': Modifier la présentation et la mise en page
$order: 3
description: "Les pages AMP sont des pages Web ; toute application de style sur la page et sur ses éléments est réalisée à l'aide de propriétés CSS communes. Vous pouvez appliquer un style aux éléments à l'aide de sélecteurs de classe ou d'élément ...."
author: pbakaus
contributors:
  - bpaduch
---

## Modifier la présentation

Les pages AMP sont des pages Web ; toute application de style sur la page et sur ses éléments est réalisée à l'aide de propriétés CSS communes. Vous pouvez appliquer un style aux éléments à l'aide de sélecteurs de classe ou d'élément dans une feuille de style intégrée dans `<head>`, appelée `<style amp-custom>`:

[sourcecode:html]

<style amp-custom>
  /* any custom style goes here */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>

[/sourcecode]

Chaque page AMP ne peut avoir qu'une seule feuille de style intégrée et des styles intégrés, et l'utilisation de certains sélecteurs n'est pas autorisée. [Tout savoir sur les styles](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md).

## Contrôler la mise en page

AMP applique des règles strictes en matière de mise en page des éléments sur la page. Sur une page HTML standard, vous utilisez quasi exclusivement le style CSS pour mettre en page les éléments. Mais pour des raisons de performances, AMP nécessite de définir dès le départ une taille explicite pour tous les éléments.

[tip type="read-on"] <strong>LIRE –</strong> Tout savoir sur la façon dont AMP affiche et met en page une page et comment vous pouvez modifier la mise en page dans les <a>requêtes de mise en page et multimédias</a>. [/tip]
