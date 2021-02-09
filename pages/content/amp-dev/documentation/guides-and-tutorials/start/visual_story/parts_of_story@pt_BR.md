---
'$title': Understanding the parts of an AMP story
$order: 2
description: Uma História Web é uma experiência de narrativa visual em tela inteira que transmite informações com imagens, vídeos, gráficos, áudio e muito mais. É perfeita para usuários ...
author: bpaduch
---

Uma História Web é uma experiência de narrativa visual em tela inteira que transmite informações com imagens, vídeos, gráficos, áudio e muito mais. É perfeita para usuários que desejam conteúdo pequeno e visualmente rico.

Os componentes básicos de uma História Web são **páginas individuais**. Essas páginas, por sua vez, são compostas de **camadas** individuais que contêm HTML básico e **elementos** AMP.

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

Cada ingrediente é traduzido em componentes AMP, em que a história é representada por [`amp-story`](../../../../documentation/components/reference/amp-story.md), a página é representada por `amp-story-page`, e as camadas são representadas por `amp-story-grid-layer`.

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

Vamos começar a criar nossa História Web com o container [`amp-story`](../../../../documentation/components/reference/amp-story.md).
