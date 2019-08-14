---
$title: Sobre os elementos de uma história AMP
---

Uma história AMP é uma experiência de narrativa visual em tela cheia que transmite informações com imagens, vídeos, gráficos, áudio e muito mais. Ela é perfeita para usuários que querem um conteúdo de tamanho reduzido, mas com recursos visuais completos.  

Os ingredientes básicos de uma história AMP são **páginas** individuais. Essas páginas são compostas por **camadas** separadas com **elementos** de AMP e HTML básico.

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

Cada ingrediente é traduzido em componentes AMP, em que a história é representada por [`amp-story`](../../../../documentation/components/reference/amp-story.md), a página é representada por `amp-story-page`, e as camadas são representadas por `amp-story-grid-layer`.

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

Para começar a criar nossa história, usaremos o contêiner [`amp-story`](../../../../documentation/components/reference/amp-story.md).
