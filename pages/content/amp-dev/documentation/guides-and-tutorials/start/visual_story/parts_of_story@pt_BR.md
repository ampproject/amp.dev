---
"$title": Understanding the parts of an AMP story
"$order": '2'
description: "A Web Story is a full-screen visual storytelling experience that conveys information with images, videos, graphics, audio, and more. It's perfect for users ..."
author: bpaduch
---

A Web Story is a full-screen visual storytelling experience that conveys information with images, videos, graphics, audio, and more. It's perfect for users who want bite-sized, visually-rich content.

The basic ingredients that go into an Web Story are individual **pages**. These pages, in turn, are composed of individual **layers** that contain basic HTML and AMP **elements**.

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

Cada ingrediente é traduzido em componentes AMP, em que a história é representada por [`amp-story`](../../../../documentation/components/reference/amp-story.md), a página é representada por `amp-story-page`, e as camadas são representadas por `amp-story-grid-layer`.

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

Let's start creating our Web Story with the [`amp-story`](../../../../documentation/components/reference/amp-story.md) container.
