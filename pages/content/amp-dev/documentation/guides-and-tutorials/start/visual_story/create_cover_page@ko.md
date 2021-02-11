---
'$title': 커버 페이지 제작
$order: 4
description: 페이지를 제작하려면 <amp-story-page> 요소를 amp-story의 하위 요소로 추가하고, 페이지에 고유 ID를 할당합니다. 첫 번째 페이지인 커버 페이지에는 다음과 같이 고유 ID를 할당...
author: bpaduch
---

웹 스토리의 페이지는 `<amp-story-page>` 컴포넌트로 표현합니다. [`amp-story`](../../../../documentation/components/reference/amp-story.md) 내에 스토리의 독자적인 각 화면을 포함하는 하나 이상의 `<amp-story-page>` 컴포넌트를 사용할 수 있습니다. 문서 순서에서 첫 페이지로 지정된 페이지가 웹 스토리에 처음으로 표시됩니다.

페이지를 제작하려면 `<amp-story-page>` 요소를 [`amp-story`](../../../../documentation/components/reference/amp-story.md)의 하위 요소로 **추가**하고, 페이지에 고유 ID를 **할당**합니다. 첫 번째 페이지인 커버 페이지에는 다음과 같이 `cover`라는 고유 ID를 할당하겠습니다.

```html
<amp-story
  standalone
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
  poster-portrait-src="assets/cover.jpg"
>
  <amp-story-page id="cover"> </amp-story-page>
</amp-story>
```

이제 커버 페이지를 위한 셸이 생겼습니다. 하지만 아직도 스토리가 유효하지 않습니다. 페이지 내에서 **레이어**를 하나 이상 지정해야 합니다. {{ image('/static/img/docs/tutorials/amp_story/cover_layers.png', 416, 679, alt='cover page has two layers', align='right third' ) }}

## 페이지의 레이어

그래픽 분야와 마찬가지로 AMP 스토리 페이지에서도 레이어를 사용해 시각적 효과를 낼 수 있습니다. 레이어는 서로 겹쳐지므로 첫 번째 레이어가 바닥 레이어가 되고 그다음 레이어부터 그 위에 쌓인다고 생각하면 됩니다.

지금부터 제작할 커버 페이지는 다음과 같은 두 개의 레이어로 구성됩니다.

- **레이어 1**: 배경화면 역할을 하는 이미지
- **레이어 2**: 스토리의 제목 및 바이라인

### 레이어 1 생성

커버 페이지에 첫 번째 레이어를 추가하겠습니다. 이 레이어에는 화면을 채우는 이미지가 들어 있습니다.

`<amp-story-grid-layer>` 요소를 `<amp-story-page>`의 하위 요소로 추가하여 레이어를 생성합니다. 이미지가 화면을 채우도록 `amp-story-grid-layer`에 `template="fill"` 속성을 지정합니다. 레이어 안에서 `cover.jpg` 파일에 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 요소를 추가하고 이미지가 크기 720x1280 픽셀의 반응형(즉, `layout="responsive"`) 이미지인지 확인합니다. 이 레이어는 다음과 같이 표시됩니다.

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-img
      src="assets/cover.jpg"
      width="720"
      height="1280"
      layout="responsive"
    >
    </amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

페이지가 어떻게 표시되는지 확인하겠습니다. 브라우저에서 다음 페이지를 열어봅니다. <a href="http://localhost:8000/pets.html">http://localhost:8000/pets.html</a>.

다음과 같이 표시될 것입니다.

{{ image('/static/img/docs/tutorials/amp_story/pg0_layer1.jpg', 720, 1280, align='center third' ) }}

### 레이어 2 생성

이제 배경화면이 생겼지만, 배경화면 위에 제목과 바이라인을 포함하는 두 번째 레이어가 필요합니다. 두 번째 레이어를 추가하기 위해 레이어 1에서 했던 것과 같은 작업을 반복하되, 이번에는 `fill` 템플릿 대신 **`vertical`** 템플릿을 사용합니다. 더 진행하기 앞서 우선 템플릿의 개념과 `<amp-story-grid-layer>`에서 AMP 및 HTML 요소를 정렬하는 방법을 알아봅시다.

#### 템플릿으로 요소 레이아웃 지정

`<amp-story-grid-layer>` 요소를 사용하면 하위 요소가 그리드에 배치됩니다([CSS 그리드](https://www.w3.org/TR/css-grid-1/) 기반). 하위 요소의 배치 방식을 지시하려면 다음 레이아웃 템플릿 중 하나를 지정해야 합니다.

<table class="noborder">
<tr>
    <td colspan="2"><h5 id="fill">템플릿: Fill</h5></td>
</tr>
<tr>
    <td width="65%">
<strong>Fill</strong> 템플릿을 사용하면 레이어의 첫 번째 하위 요소가 화면을 채웁니다. 이 레이어의 다른 하위 요소는 표시되지 않습니다. Fill 템플릿은 이미지와 동영상을 포함한 배경에 사용하면 효과적입니다. <code class="nopad"><pre><amp-story-grid-layer template="fill">   <amp-img src="dog.png" width="720" height="1280" layout="responsive">   </amp-img> </amp-story-grid-layer></pre></code>
</td>
    <td>     {{ image('/static/img/docs/tutorials/amp_story/layer-fill.png', 216, 341) }}     </td>
</tr>
<tr>
    <td colspan="2"><h5 id="vertical">템플릿: Vertical</h5></td>
</tr>
<tr>
    <td width="65%">
<strong>vertical</strong> 템플릿을 사용하면 하위 요소가 Y축을 따라 배치됩니다. 요소는 화면 상단에 정렬되며 x축을 따라 전체 화면을 차지합니다.  Vertical 템플릿은 각 요소를 수직으로 하나씩 이어서 배치하려는 경우 효과적입니다. <code class="nopad"><pre><amp-story-grid-layer template="vertical">   <p>element 1</p>   <p>element 2</p>   <p>element 3</p> </amp-story-grid-layer></pre></code>
</td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/layer-vertical.png', 216, 341) }}     </td>
</tr>
<tr>
    <td colspan="2"><h5 id="horizontal">템플릿: Horizontal</h5></td>
</tr>
<tr>
    <td width="65%"> <strong>Horizontal</strong> 템플릿을 사용하면 하위 요소가 X축을 따라 배치됩니다. 요소가 화면 시작 부분에 정렬되고 Y축을 따라 전체 화면을 차지합니다. Horizontal 템플릿은 각 요소를 수평으로 하나씩 이어서 배치하려는 경우 적합합니다.     <code class="nopad"><pre><amp-story-grid-layer template="horizontal">   <p>element 1</p>   <p>element 2</p>   <p>element 3</p> </amp-story-grid-layer></pre></code>
</td>
    <td>     {{ image('/static/img/docs/tutorials/amp_story/layer-horizontal.png', 216, 341) }}     </td>
</tr>
<tr>
    <td colspan="2"><h5 id="thirds">템플릿: Thirds</h5></td>
</tr>
<tr>
<td width="65%">
<strong>thirds</strong> 템플릿을 사용하면 화면이 동일한 크기의 3가지 열로 분할되며 각 영역에 콘텐츠를 삽입할 수 있습니다. 또한 <code>grid-area</code>의 이름을 지정하여 <code>upper-third</code>, <code>middle-third</code> 또는 <code>lower-third</code>와 같은 세 영역 중 콘텐츠를 삽입하려는 위치를 설정할 수 있습니다. 이름이 지정된 그리드 영역은 요소가 표시될 기본 동작을 변경할 때 유용합니다. 예를 들어 레이어의 요소가 2개일 경우 첫 번째 요소를 <code>grid-area="upper-third"</code>로, 두 번째 요소를 <code>grid-area="lower-third"</code>로 지정할 수 있습니다. <code class="nopad"><pre><amp-story-grid-layer template="thirds">   <h1 grid-area="upper-third">element 1</h1>   <p grid-area="lower-third">element 2</p> </amp-story-grid-layer> </pre></code>
</td>
<td>{{ image('/static/img/docs/tutorials/amp_story/layer-thirds.png', 216, 341) }}</td>
</tr>
</table>

### 커버 페이지 완성

이제 레이어 템플릿을 이해했으니 커버 페이지의 두 번째 레이어를 완성해 봅시다.

레이어 2의 경우 제목과 바이라인이 상단에 위치하고 그 아래에 다른 요소가 이어져야 하므로 `vertical` 템플릿을 지정합니다. 두 번째 `amp-story-grid-layer`도 첫 번째와 같습니다.

```html
<amp-story-grid-layer>
  <!--our first layer -->
</amp-story-grid-layer>
<amp-story-grid-layer template="vertical">
  <h1>The Joy of Pets</h1>
  <p>By AMP Tutorials</p>
</amp-story-grid-layer>
```

브라우저를 새로고침하고 작업 결과를 확인하세요. 커버 페이지가 완성되었습니다.

{{ image('/static/img/docs/tutorials/amp_story/pg0_cover.png', 720, 1280, align='center third', alt='Completed cover page' ) }}
