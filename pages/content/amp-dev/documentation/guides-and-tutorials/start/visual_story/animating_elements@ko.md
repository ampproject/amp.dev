---
'$title': Animating elements
$order: 6
description: 페이지 내부 요소에 애니메이션을 적용하여 AMP 스토리를 더욱 개선할 수 있습니다. 예를 들어 제목을 페이지 왼쪽에서 날아오게 하거나 위쪽에서 떨어지거나 페이드 인하는 ...
components:
  - anim
author: bpaduch
---

페이지 내부 요소에 애니메이션을 적용하여 AMP 스토리를 더욱 개선할 수 있습니다. 예를 들어 제목을 페이지 왼쪽에서 날아오게 하거나 위쪽에서 떨어지거나 페이드 인하는 등의 애니메이션 효과를 줄 수 있습니다. AMP 스토리 프레임워크는 다음과 같은 사전 설정된 애니메이션을 제공합니다.

<table>
<thead><tr>
  <th width="50%">애니메이션 사전 설정</th>
  <th width="25%">기본 실행 시간(ms)</th>
  <th width="25%">기본 지연 시간(ms)</th>
</tr></thead>
<tbody>
<tr>
  <td><code>drop</code></td>
  <td>1600</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fade-in</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-bottom</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>fly-in-top</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pulse</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-left</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>rotate-in-right</code></td>
  <td>700</td>
  <td>0</td>
</tr>
<tr>
  <td><code>twirl-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-left</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>whoosh-in-right</code></td>
  <td>500</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-left</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-right</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-down</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>pan-up</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-in</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
<tr>
  <td><code>zoom-out</code></td>
  <td>1000</td>
  <td>0</td>
</tr>
</tbody>
</table>

페이지 요소에 애니메이션 효과를 적용하려면 애니메이션 사전 설정 값 중 하나를 사용하여 <code>animate-in="<em>&lt;animation preset></em>"</code> 을 지정해야 합니다. 예를 들어 텍스트를 페이지에 떨어뜨리려면 `animate-in="drop"`을 텍스트 요소에 추가합니다.

```html
<amp-story-page id="page3">
  ...
  <amp-story-grid-layer template="vertical">
    <p animate-in="drop">Drop this text into the page</p>
</amp-story-page>
```

스토리 페이지의 요소에 `animate-in="<animation preset>"` 속성을 추가하여 다양한 애니메이션 효과를 살펴보세요.

## 애니메이션 시간

각 애니메이션 사전 설정에는 다음에 대한 기본 시간 값이 지정되어 있습니다.

- **지연 시간**: 애니메이션 시작이 지연되는 시간입니다. 예를 들어 지연 시간이 .3s이면 애니메이션이 0.3초 후에 페이지에서 시작됩니다. 지연 시간이 0s이면 애니메이션이 바로 시작됩니다.
- **실행 시간**: 애니메이션이 재생되는 시간입니다. 예를 들어 페이드 인 애니메이션이 시작되어 끝날 때까지 500ms가 걸립니다.

`animate-in-delay` 및 `animate-in-duration` 속성을 통해 지연 시간 또는 실행 시간을 변경하여 애니메이션 시간을 맞춤설정할 수 있습니다. 다음 예에서는 `my-element`가 0.3초 후에 페이지 왼쪽에서 날아오기 시작하여 0.5초 이내에 애니메이션이 종료됩니다.

```html
<amp-story-page id="my-page">
  ...
  <p class="my-element"
      animate-in="fly-in-left"
      animate-in-delay="0.3s"
      animate-in-duration="0.5s">
    I'm going to fly into the page from the left!
  </div>
</amp-story-page>
```

## 마지막 페이지에 애니메이션 효과 추가

마지막 Web 스토리 페이지는 두 개 레이어로 구성됩니다. 첫 번째 레이어는 동물 이미지의 콜라주이고 두 번째 레이어는 배너 텍스트입니다. 이 페이지를 만들려면 이전 스토리 페이지 바로 뒤에 다음 코드를 **추가**합니다.

```html
<amp-story-page id="page5">
  <amp-story-grid-layer template="vertical" class="noedge">
    <div class="wrapper">
      <amp-img
        src="assets/cat.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
      <amp-img
        src="assets/dog.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
      <amp-img
        src="assets/bird.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
      <amp-img
        src="assets/rabbit.jpg"
        width="720"
        height="1280"
        layout="responsive"
      >
      </amp-img>
    </div>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical" class="center-text">
    <p class="banner-text">Pets can lower your stress levels!</p>
  </amp-story-grid-layer>
</amp-story-page>
```

브라우저에서 AMP 스토리를 새로고침하고 페이지가 올바르게 렌더링되고 다음과 같이 표시되는지 확인합니다.

{{ image('/static/img/docs/tutorials/amp_story/pg5-collage.png', 720, 1280, align='center third', alt='Static page 5' ) }}

제대로 표시되지만 모든 것이 정적입니다. 이제 애니메이션 효과를 넣어보겠습니다.

먼저 배너 텍스트에 애니메이션 효과를 주어 페이지 오른쪽에서 빠르게 표시되도록 하겠습니다. 다음과 같이 'animate-in="whoosh-in-right"`를 '<p>` 요소에 추가합니다.

```html
<p class="banner-text" animate-in="whoosh-in-right">
  Pets can lower your stress levels!
</p>
```

브라우저에서 페이지를 새로고침하고 배너가 빠르게 표시되는지 확인합니다.

이제 모든 이미지를 페이드 인해 보겠습니다. 코드가 다음과 같이 표시되도록 `animate-in="fade-in"`를 각 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 요소에 추가합니다.

```html
<amp-img
  src="assets/cat.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
<amp-img
  src="assets/dog.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
<amp-img
  src="assets/bird.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
<amp-img
  src="assets/rabbit.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
>
</amp-img>
```

페이지를 새로고침하면 각 이미지가 페이드 인됩니다. 하지만, 모든 이미지가 동시에 페이드 인되므로 애니메이션 효과를 제대로 알아차릴 수 없습니다. 각 이미지의 애니메이션 시간을 변경하여 시각 효과를 개선할 수 있습니다.

첫 번째 이미지의 등장을 지연시켜 텍스트 배너가 완전히 등장한 후 0.4초 뒤에 나타나도록 해보겠습니다. 그 뒤에 나머지 이미지 세 개를 0.2초 간격으로 표시되게 할 수 있습니다. 각 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 요소에 `animate-in-delay=""`를 추가하고 적절한 지연 시간 값을 지정합니다. 코드는 다음과 같습니다.

```html
<amp-img
  src="assets/cat.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay="0.4s"
>
</amp-img>
<amp-img
  src="assets/dog.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay="0.6s"
>
</amp-img>
<amp-img
  src="assets/bird.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay=".8s"
>
</amp-img>
<amp-img
  src="assets/rabbit.jpg"
  width="720"
  height="1280"
  layout="responsive"
  animate-in="fade-in"
  animate-in-delay="1s"
>
</amp-img>
```

스토리를 새로고치면 아래와 같은 페이지가 표시됩니다.

{{ anim('/static/img/docs/tutorials/amp_story/pg5-collage-animation.gif', 720, 1280, align='center third', alt='Page 5 collage', poster='/static/img/docs/tutorials/amp_story/pg5-collage.png' ) }}

Web 스토리에 애니메이션 효과를 추가하는 방법은 다양합니다(예: 애니메이션 결합, 애니메이션 연결). 이 가이드에서는 기본적인 내용만 설명합니다. 자세한 애니메이션 관련 내용을 알아보려면 [`amp-story`](../../../../documentation/components/reference/amp-story.md) 참조 문서를 확인하세요.
