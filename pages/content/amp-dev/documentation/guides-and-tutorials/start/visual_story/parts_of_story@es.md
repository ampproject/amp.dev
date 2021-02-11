---
'$title': Comprender las partes de una historia de AMP
$order: 2
description: Una Web Story es una experiencia de narración visual en pantalla completa que transmite información mediante imágenes, videos, gráficas, audio y más. Es perfecta para los usuarios...
author: bpaduch
---

Una Web Story es una experiencia de narración visual en pantalla completa que transmite información mediante imágenes, videos, gráficas, audio y más. Es perfecta para los usuarios que desean un contenido visualmente enriquecido.

Los ingredientes básicos que se incluyen en una Web Story son **páginas** individuales. Estas páginas, a su vez, están compuestas por **capas** individuales que contienen **elementos** básicos de HTML y AMP.

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

Cada uno de estos elementos se traducen en componentes AMP, donde la historia se representa con [`amp-story`](../../../../documentation/components/reference/amp-story.md), la página con `amp-story-page` y las capas con `amp-story-grid-layer`.

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

Empecemos a crear nuestra historia con el contenedor [`amp-story`](../../../../documentation/components/reference/amp-story.md).
