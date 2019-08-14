---
$title: Partes de las historias de AMP
---

Una historia de AMP es una experiencia narrativa visual a pantalla completa que transmite información con imágenes, vídeos, elementos gráficos, audio y mucho más. Es ideal para los usuarios que quieren contenido breve y visualmente atractivo.  

Los elementos básicos que se necesitan para crear historias de AMP son **páginas** que, a su vez, están formadas por **capas** que contienen **elementos** HTML básicos y AMP.

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

Cada uno de estos elementos tiene asociado un componente AMP concreto: la historia se representa con [`amp-story`](../../../../documentation/components/reference/amp-story.md); las páginas, con `amp-story-page`, y las capas, con `amp-story-grid-layer`.

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

Empecemos a crear nuestra historia con el contenedor [`amp-story`](../../../../documentation/components/reference/amp-story.md).
