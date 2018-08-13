---
$title: AMP 스토리 내부구조 이해하기
---

AMP 스토리는 화면을 꽉채우는 시각효과를 통해 이야기를 전달합니다. 이미지,
비디오, 그래픽, 오디오 등의 정보와 함께 이야기를 전달하는데요. 읽기 간편하고
시각적으로 풍부한 콘텐츠를 좋아하는 사용자에게 안성맞춤입니다.

AMP 스토리를 구성하는 기본 부품은 **페이지(page)**입니다. 여러개의 페이지가 모여서
하나의 AMP 스토리가 되는데 또 페이지는 여러 **레이어(layer)**들이 모인것이고
레이어안에는 HTML 또는 AMP **요소(element)**들이 들어있습니다.

{{ image('/static/img/docs/tutorials/amp_story/story_parts.png', 1047, 452, align='center ninety') }}

AMP 스토리를 구성하는 부품을 기술용어로는 AMP 컴포넌트라고 표현하는데 AMP
스토리는 `amp-story`, 페이지는 `amp-story-page`, 그리고 레이어는
`amp-story-grid-layer` 컴포넌트로 표현합니다.

{{ image('/static/img/docs/amp-story-tag-hierarchy.png', 557, 355, align='center seventyfive' ) }}

자, 그럼 `amp-story` 컨테이너를 가지고 본격적으로 이야기를 시작해보겠습니다.

<div class="prev-next-buttons">
  <a class="button prev-button" href="/docs/design/visual_story/setting_up.html"><span class="arrow-prev">이전</span></a>
  <a class="button next-button" href="/docs/design/visual_story/start_story.html"><span class="arrow-next">다음</span></a>
</div>
