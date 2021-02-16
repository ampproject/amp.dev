---
'$title': Understanding the parts of an AMP story
$order: 2
description: 웹 스토리는 전체 화면에서 이미지, 동영상, 그래픽, 오디오 등으로 정보를 전달하는 시각적 스토리텔링 도구로...
author: bpaduch
---

웹 스토리는 전체 화면에서 이미지, 동영상, 그래픽, 오디오 등으로 정보를 전달하는 시각적 스토리텔링 도구로, 읽기 간편하고 시각적으로 풍부한 콘텐츠를 원하는 사용자에게 이상적입니다.

웹 스토리의 기본 구성요소는 개별 **페이지**입니다. 이러한 페이지는 기본 HTML 및 AMP **요소**가 포함된 개별 **레이어**로 구성됩니다.

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

이러한 각 구성요소는 AMP 구성요소로 변환되며, 여기서 스토리는 [`amp-story`](../../../../documentation/components/reference/amp-story.md)로, 페이지는 `amp-story-page`로, 그리고 레이어는 `amp-story-grid-layer`로 표시됩니다.

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

그럼 [`amp-story`](../../../../documentation/components/reference/amp-story.md) 컨테이너를 사용하여 스토리 제작을 시작하겠습니다.
