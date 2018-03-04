---
$title: Modifier la présentation et la disposition
---

## Modifier la présentation

Les pages AMP sont des pages Web ; toute application de style sur la page et sur ses éléments est réalisée à l'aide de propriétés CSS communes. Vous pouvez appliquer un style aux éléments à l'aide de sélecteurs de classe ou d'élément dans une feuille de style en ligne au sein de l'en-tête (`<head>`), appelée `<style amp-custom>` :

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

Chaque page AMP peut intégrer une seule feuille de style uniquement et l'utilisation de certains sélecteurs n'est pas autorisée. [Tout savoir sur les styles](/fr/docs/guides/responsive/style_pages.html).

## Contrôler la disposition

AMP applique des règles strictes en matière de disposition des éléments sur la page. Sur une page HTML standard, vous utilisez presque exclusivement le style CSS pour disposer les éléments. Mais pour des performances optimales, AMP nécessite de définir dès le départ une taille explicite pour tous les éléments.

Découvrez le rendu et la présentation d'une page AMP et comment vous pouvez modifier la disposition dans [Comment contrôler la disposition](/fr/docs/guides/responsive/control_layout.html).

<div class="prev-next-buttons">
  <a class="button prev-button" href="/fr/docs/tutorials/create/include_image.html"><span class="arrow-prev">Précédent</span></a>
  <a class="button next-button" href="/fr/docs/tutorials/create/preview_and_validate.html"><span class="arrow-next">Prochain</span></a>
</div>
