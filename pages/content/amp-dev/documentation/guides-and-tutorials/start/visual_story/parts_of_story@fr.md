---
'$title': "Comprendre les parties d'une story AMP"
$order: 2
description: "Une story Web est une expérience de narration visuelle plein écran qui transmet des informations avec des images, des vidéos, des graphiques, du son et plus encore. C'est parfait pour les utilisateurs ..."
author: bpaduch
---

Une story Web est une expérience de narration visuelle plein écran qui transmet des informations avec des images, des vidéos, des graphiques, du son et plus encore. C'est parfait pour les utilisateurs qui souhaitent un contenu de petite taille et visuellement riche.

Les ingrédients de base qui entrent dans une story Web sont des **pages** individuelles. Ces pages, à leur tour, sont composées de **couches** individuelles contenant des **éléments** HTML et AMP de base.

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

Chacun de ces ingrédients est traduit en composants AMP, la story étant représentée par [`amp-story`](../../../../documentation/components/reference/amp-story.md), la page par `amp-story-page` et les couches par `amp-story-grid-layer`.

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

Commençons par créer notre story Web avec le conteneur [`amp-story`](../../../../documentation/components/reference/amp-story.md).
