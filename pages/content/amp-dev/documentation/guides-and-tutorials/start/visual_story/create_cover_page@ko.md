---
$title: 커버 페이지 만들기
---

AMP 스토리 내의 페이지는 `<amp-story-page>` 구성요소로 표현됩니다. [`amp-story`](../../../../documentation/components/reference/amp-story.md) 내에 스토리의 각 화면을 담고 있는 `<amp-story-page>` 구성요소를 하나 이상 둘 수 있습니다. 문서 순서에서 가장 먼저 지정하는 페이지가 스토리에서 표시되는 첫 번째 페이지입니다.

페이지를 만들려면 `<amp-story-page>` 요소를 [`amp-story`](../../../../documentation/components/reference/amp-story.md)의 하위 요소로 **추가**합니다. 페이지에 고유 ID를 **할당**합니다. 첫 번째 페이지인 커버 페이지에는 다음과 같이 `cover`라는 고유 ID를 할당해 보겠습니다.

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

이제 커버 페이지를 위한 셸이 생겼습니다. 하지만 아직도 스토리가 유효하지 않습니다.  페이지 내에서 **레이어**를 하나 이상 지정해야 합니다.
{{ image('/static/img/docs/tutorials/amp_story/cover_layers.png', 416, 679, alt='cover page has two layers', align='right third' ) }}

## 페이지의 레이어

그래픽 분야에서처럼 AMP 스토리 페이지에서도 레이어를 사용해 시각적 효과를 낼 수 있습니다. 레이어는 서로 겹쳐지므로 첫 번째 레이어가 바닥 레이어가 되고 그다음 레이어부터 그 위에 쌓인다고 생각하면 됩니다.

우리가 만들 커버 페이지는 다음과 같은 두 개의 레이어로 구성됩니다.

* **레이어 1**: 배경화면 역할을 하는 이미지
* **레이어 2**: 스토리의 제목 및 바이라인

### 레이어 1 만들기

커버 페이지에 첫 번째 레이어를 추가하겠습니다. 이 레이어에는 화면을 채우는 이미지가 들어 있습니다.

`<amp-story-grid-layer>` 요소를 `<amp-story-page>`의 하위 요소로 추가하여 레이어를 만듭니다. 이미지가 화면을 채워야 하니 `amp-story-grid-layer`에 `template="fill"` 속성을 지정합니다. 레이어 안에서 `cover.jpg` 파일에 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 요소를 추가하고 이미지 크기가 720x1280px인 반응형(즉, `layout="responsive"`)인지 확인합니다.  다음은 만들어진 레이어의 모습입니다.

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

페이지가 어떻게 표시되는지 보겠습니다.  브라우저에서 페이지를 열어봅니다. <a href="http://localhost:8000/pets.html">http://localhost:8000/pets.html</a>.

다음과 같이 표시될 것입니다.

{{ image('/static/img/docs/tutorials/amp_story/pg0_layer1.jpg', 720, 1280, align='center third' ) }}

### 레이어 2 만들기

이제 배경화면이 생겼지만, 배경화면 위에 제목과 바이라인을 포함하는 두 번째 레이어가 필요합니다.  두 번째 레이어를 추가하기 위해 레이어 1에서 했던 것과 같은 작업을 반복하되, 이번에는 `fill` 템플릿 대신 **`vertical`** 템플릿을 사용합니다. 더 진행하기 전에 우선 템플릿이 무엇인지 알아보고 `<amp-story-grid-layer>`에서 AMP 및 HTML 요소를 정리하는 방법을 알아봅시다.

#### 템플릿으로 요소 레이아웃하기

`<amp-story-grid-layer>` 요소를 사용하면 하위 요소가 그리드에 배치됩니다([CSS 그리드] 기반(https://www.w3.org/TR/css-grid-1/)).  하위 요소 배치 방식을 지시하려면 다음 레이아웃 템플릿 중 하나를 지정해야 합니다.

<table class="noborder">
<tr>
    <td colspan="2"><h5 id="fill">Template: Fill</h5></td>
</tr>
<tr>
    <td width="65%"><strong>채우기</strong> 템플릿을 사용하면 레이어의 첫 번째 하위 요소가 화면을 채웁니다. 이 레이어의 다른 하위 요소는 표시되지 않습니다.

    <p>채우기 템플릿은 이미지와 동영상을 포함한 배경에 효과적입니다.</p>
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
    <td colspan="2"><h5 id="vertical">Template: Vertical</h5></td>
</tr>
<tr>
    <td width="65%"><strong>세로</strong> 템플릿을 사용하면 하위 요소가 Y축을 따라 배치됩니다. 요소가 화면 상단에 정렬되고 X축을 따라 전체 화면을 차지합니다.

    <p>수직 템플릿은 요소를 수직으로 바로 쌓아 올릴 때 적합합니다.</p>

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
    <td colspan="2"><h5 id="horizontal">Template: Horizontal</h5></td>
</tr>
<tr>
    <td width="65%"><strong>가로</strong> 템플릿을 사용하면 하위 요소가 X축을 따라 배치됩니다.  요소가 화면 시작 부분에 정렬되고 Y축을 따라 전체 화면을 차지합니다.

    <p>가로 템플릿은 요소를 수평으로 바로 연결할 때 적합합니다.</p>

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
    <td colspan="2"><h5 id="thirds">Template: Thirds</h5></td>
</tr>
<tr>
<td width="65%">
<strong>3등분</strong> 템플릿을 사용하면 화면을 가로로 3등분하여 각 영역에 콘텐츠를 배치할 수 있습니다.

<p>이름이 있는 <code>grid-area</code>를 지정하여 콘텐츠를 <code>upper-third</code>, <code>middle-third</code>, <code>lower-third</code> 중 어디에 배치할지 지정할 수 있습니다. 이름이 있는 격자 영역은 요소가 나타나는 위치의 기본 동작을 바꿀 때 유용합니다.  예를 들어 레이어에 요소가 2개 있다면 첫 번째 요소를 <code>grid-area="upper-third"</code>에 배치하고 두 번째 요소는 <code>grid-area="lower-third"</code>에 배치할 수 있습니다.</p>

<code class="nopad"><pre>&lt;amp-story-grid-layer template="thirds">
  &lt;h1 grid-area="upper-third">element 1&lt;/h1>
  &lt;p grid-area="lower-third">element 2&lt;/p>
&lt;/amp-story-grid-layer>
</pre></code>
</td>
<td>{{ image('/static/img/docs/tutorials/amp_story/layer-thirds.png', 216, 341) }}</td>
</tr>
</table>

### 커버 페이지 완성하기

이제 레이어 템플릿을 이해했으니 커버 페이지의 두 번째 레이어를 완성해 봅시다.

레이어 2의 경우 제목과 바이라인이 위에 위치하고 그 아래에 다른 요소가 이어져야 하므로 `세로` 템플릿을 지정합니다. 두 번째 `amp-story-grid-layer`도 첫 번째와 같습니다.

```html hl_lines="4 5 6 7"
<amp-story-grid-layer>
 <!--our first layer -->
</amp-story-grid-layer>
<amp-story-grid-layer template="vertical">
  <h1>The Joy of Pets</h1>
  <p>By AMP Tutorials</p>
</amp-story-grid-layer>
```

브라우저를 새로고침하고 작업 결과를 확인하세요.  커버 페이지가 완성되었습니다.

{{ image('/static/img/docs/tutorials/amp_story/pg0_cover.png', 720, 1280, align='center third', alt='Completed cover page' ) }}
