---
"$title": Understanding the parts of an AMP story
"$order": '2'
description: "A Web Story is a full-screen visual storytelling experience that conveys information with images, videos, graphics, audio, and more. It's perfect for users ..."
author: bpaduch
---

A Web Story is a full-screen visual storytelling experience that conveys information with images, videos, graphics, audio, and more. It's perfect for users who want bite-sized, visually-rich content.

The basic ingredients that go into an Web Story are individual **pages**. These pages, in turn, are composed of individual **layers** that contain basic HTML and AMP **elements**.

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

이러한 각 구성요소는 AMP 구성요소로 변환되며, 여기서 스토리는 [`amp-story`](../../../../documentation/components/reference/amp-story.md)로, 페이지는 `amp-story-page`로, 그리고 레이어는 `amp-story-grid-layer`로 표시됩니다.

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

Let's start creating our Web Story with the [`amp-story`](../../../../documentation/components/reference/amp-story.md) container.
