---
$title: 커버 페이지를 작성합니다
---

[TOC]

AMP 스토리의 페이지는 `<amp-story-page>`로 표현합니다. `<amp-story>`
컴포넌트는 하나 이상의 페이지, 즉 `<amp-story-page>` 컴포넌트를 포함합니다.
페이지는 이야기의 한 장면이라고 할 수 있습니다. AMP 스토리는 여러개의 페이지
중에 먼저 작성한 순서대로 사용자에게 페이지를 보여줍니다. 예를 들면, 처음
기술된 페이지가 사용자가 가장 먼저 보는 페이지입니다.

`<amp-story-page>` 요소를 `<amp-story>`의 자식으로 추가하여 페이지를
만들어보겠습니다. 그리고 해당 페이지에 고유한 id를 **부여하세요**. 첫 번째
페이지는 커버가 되는 페이지이므로 `cover`라고 id를 붙여보죠.


```html hl_lines="6 7"
<amp-story standalone
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
   <amp-story-page id="cover">
   </amp-story-page>
</amp-story>
```

커버 페이지의 껍데기가 만들어졌습니다.  하지만 이 정도 가지고는 아직 유효한
스토리가 아닙니다. 페이지안에는 최소한 하나의 레이어(layer)가 들어있어야 합니다.

{{ image('/static/img/docs/tutorials/amp_story/cover_layers.png', 416, 679, alt='cover page has two layers', align='right third' ) }}

## 페이지 안의 레이어

그래픽 저작도구를 다뤄보았다면 이해하기 쉬운데 AMP 스토리에서 레이어는 시각적
효과를 표현하기 위한 개념입니다. 레이어는 말그대로 다른 레이어위에 쌓는 형태로
표현됩니다. 예를 들어, 첫 번째 레이어가 맨 밑의 레이어가 되고 다음 레이어가 그
위에 쌓이는 식으로 말이죠.

지금 작성하게 될 커버 페이지는 두 개의 레이어를 쓸 계획입니다:

* **레이어 1**: 배경이 될 이미지가 들어있는 레이어
* **레이어 2**: 이야기의 제목과 부제가 들어갈 레이어

### 레이어 1 작성하기

커버 페이지에 첫 번째 레이어를 추가하겠습니다. 해당 레이어는 이미지 하나로
화면전체를 채웁니다.

`<amp-story-grid-layer>` 요소를 `<amp-story-page>`안에
추가합니다. 화면전체를 채우는 레이어이기 때문에 `template=”fill”` 속성을
`amp-story-grid-layer`에 기입해야 합니다. 레이어안에 `cover.jpg` 이미지 파일을
`<amp-img>` 요소로 추가하세요. 이미지의 크기는 720 x 1280 픽셀로 하되 해당
amp-img가 반응형(responsive)임을 `layout=”responsive”`속성으로 알려주세요.
여기까지 왔으면 다음과 같은 코드가 나왔을 것입니다:

```html hl_lines="2 3 4 5 6 7"
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-img src="assets/cover.jpg"
        width="720" height="1280" 
        layout="responsive">
    </amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

자, 여기까지 왔으면 지금까지 작성한 이야기가 어떻게 보이는지 확인해 볼
차례입니다. 다음의 페이지를 웹브라우저에서 열어봅니다:
<a href="http://localhost:8000/pets.html">http://localhost:8000/pets.html</a>

아래와 같은 화면이 보이면 성공한 것입니다:

{{ image('/static/img/docs/tutorials/amp_story/pg0_layer1.jpg', 720, 1280, align='center third' ) }}

### 레이어 2 작성하기 

배경은 그럴듯하게 나왔습니다. 이제 두 번째 레이어를 추가하겠습니다. 두 번째
레이어는 제목과 부제가 들어있고 배경 위에 올라갈 것입니다. 첫 번째 레이어를 만든
것과 똑같이 하되 이번에는 `fill` 템플릿 대신 **`vertical`** 템플릿을 사용합니다.
이쯤에서 `<amp-story-grid-layer>`에 들어있는 AMP 또는 HTML 요소를 template을
가지고 배치하는 방법에 대해서 알아보겠습니다. 

#### 템플릿으로 요소 배치하기

`<amp-story-grid-layer>` 요소는 자식 요소를 그리드
([CSS grid](https://www.w3.org/TR/css-grid-1/) 참고)안에 배치합니다. 다음의
레이아웃 템플릿 중 하나를 지정하여 자식 요소를 배치할 수 있습니다:

<table class="noborder">
<tr>
    <td colspan="2"><h5 id="fill">Fill 템플릿</h5></td>
</tr>
<tr> 
    <td width="65%">
    <strong>fill</strong> 템플릿은 레이어안의 첫 번째 요소를 화면에 채웁니다. 그리고 다른 자식 요소는
    화면에 나오지 않습니다.

    <p>fill 템플릿은 대체로 배경에 많이 사용합니다. 배경으로는 이미지나 비디오를 사용할 수 있습니다.</p>

   <code class="nopad"><pre>&lt;amp-story-grid-layer template="fill">
  &lt;amp-img src="dog.png"
      width="720" height="1280"
      layout="responsive">
  &lt;/amp-img>
&lt;/amp-story-grid-layer></pre></code>
    </td>
    <td>
    {{ image('/static/img/docs/tutorials/amp_story/layer-fill.png', 216, 341) }}
    </td>
</tr>
<tr>
    <td colspan="2"><h5 id="vertical">Vertical 템플릿</h5></td>
</tr>
<tr> 
    <td width="65%">
    <strong>vertical</strong> 템플릿은 자식 요소를 세로로 배치합니다. 요소를 상단에서부터
    시작하여 배치하고 가로 화면쪽으로는 길게 채우는 형태가 됩니다.
    <p>vertical 템플릿은 수직으로 요소를 차곡차곡 나열하고 싶을때 사용합니다.</p>

   <code class="nopad"><pre>&lt;amp-story-grid-layer template="vertical">
  &lt;p>element 1&lt;/p>
  &lt;p>element 2&lt;/p>
  &lt;p>element 3&lt;/p>
&lt;/amp-story-grid-layer></pre></code>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/layer-vertical.png', 216, 341) }}
    </td>
</tr>
<tr>
    <td colspan="2"><h5 id="horizontal">Horizontal 템플릿</h5></td>
</tr>
<tr> 
    <td width="65%">
    <strong>horizontal</strong> 템플릿은 자식 요소를 가로축을 기준으로 배치합니다. 왼쪽부터
    시작해서 배치하는데 세로 화면쪽으로 길게 채우는 형태가 됩니다.

    <p>horizontal 템플릿은 수평으로 요소를 차례로 배치하고 싶을때 사용합니다.</p>

    <code class="nopad"><pre>&lt;amp-story-grid-layer template="horizontal">
  &lt;p>element 1&lt;/p>
  &lt;p>element 2&lt;/p>
  &lt;p>element 3&lt;/p>
&lt;/amp-story-grid-layer></pre></code>
    </td>
    <td>
    {{ image('/static/img/docs/tutorials/amp_story/layer-horizontal.png', 216, 341) }}
    </td>
</tr>
<tr>
    <td colspan="2"><h5 id="thirds">Thirds 템플릿</h5></td>
</tr>
<tr> 
<td width="65%">
  <strong>thirds</strong> 템플릿은 화면으로 수직으로 3등분으로 나눈 다음에 콘텐츠를 각
  영역(grid-area)에 배치합니다.

  <p>요소가 3등분 영역중 어느 부분에 나올지는 <code>grid-area</code> 속성으로 지정할 수
  있습니다. 상단은 <code>upper-third</code>, 중앙은 <code>middle-third</code>, 하단은
  <code>lower-third</code>로 지정합니다. <code>grid-area</code>를 명시적으로 지정해주면
  원래 순서대로 배치되지 않고 지정된 <code>grid-area</code>로 배치할 수 있습니다. 예를 들어,
  첫 번째 요소는 상단 (<code>grid-area=”upper-third”</code>)으로 두 번째 요소는 하단
  (<code>grid-area=”lower-third”</code>)으로 지정할 수 있습니다.</p>

<code class="nopad"><pre>&lt;amp-story-grid-layer template="thirds">
  &lt;h1 grid-area="upper-third">element 1&lt;/h1>
  &lt;p grid-area="lower-third">element 2&lt;/p>
&lt;/amp-story-grid-layer>
</pre></code>
</td>
<td>{{ image('/static/img/docs/tutorials/amp_story/layer-thirds.png', 216, 341) }}</td>
</tr>
</table>

### 커버 페이지 마무리하기

자, 레이어 템플릿에 대해서 배웠으니 커버 페이지의 레이어 2를 완성하겠습니다.

레이어 2는 페이지의 위쪽에 제목과 부제만 보여주면 됩니다. 요소를 위에서부터
차례로 배치하면 되므로 `vertical` 템플릿을 쓰면 되겠습니다. 레이어 2는 첫 번째
레이어에 이어서 `amp-story-grid-layer`를 추가하면 됩니다. 다음과 비슷하게
작성하면 맞습니다.

```html hl_lines="4 5 6 7"
<amp-story-grid-layer>
 <!--our first layer -->
</amp-story-grid-layer>
<amp-story-grid-layer template="vertical">
  <h1>The Joy of Pets</h1>
  <p>By AMP Tutorials</p>
</amp-story-grid-layer>
```

커버 페이지의 작성이 끝났습니다. 아까 띄워둔 웹브라우저가 그대로 있으면 새로고침
버튼을 눌러서 커버 페이지가 어떻게 보이는지 확인하세요.

{{ image('/static/img/docs/tutorials/amp_story/pg0_cover.png', 720, 1280, align='center third', alt='Completed cover page' ) }}

<div class="prev-next-buttons">
  <a class="button prev-button" href="/ko/docs/design/visual_story/start_story.html"><span class="arrow-prev">이전</span></a>
  <a class="button next-button" href="/ko/docs/design/visual_story/add_more_pages.html"><span class="arrow-next">다음</span></a>
</div>

