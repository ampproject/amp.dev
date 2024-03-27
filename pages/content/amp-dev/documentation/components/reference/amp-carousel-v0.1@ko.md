---
$title: amp-carousel
$category@: layout
teaser:
  text: 가로축을 따라 여러 개의 유사한 콘텐츠를 표시합니다.
---


<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->



유연성과 성능을 높이도록 가로축을 따라 여러 개의 유사한 콘텐츠를 표시하기 위한 일반 캐러셀입니다.

<table>
  <tr>
    <td width="40%"><strong>필수 스크립트</strong></td>
    <td><code>&lt;script async custom-element="amp-carousel" src="https://ampjs.org/v0/amp-carousel-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">지원되는 레이아웃</a></strong></td>
    <td>
      <ul>
        <li>캐러셀: fixed, fixed-height, nodisplay</li>
        <li>슬라이드: fill, fixed, fixed-height, flex-item, nodisplay, responsive</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>예</strong></td>
    <td>AMP By Example의 예<ul>
      <li><a href="https://ampbyexample.com/components/amp-carousel/">amp-carousel 예</a></li>
      <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/">amp-carousel이 있는 이미지 갤러리</a></li></ul></td>
    </tr>
  </table>

# 동작 <a name="behavior"></a>

각 `amp-carousel` 구성요소의 직계 하위 구성요소는 캐러셀의 항목으로 간주됩니다. 각 노드에는 임의의 HTML 하위 노드가 있을 수 있습니다.

캐러셀은 임의 개수의 항목 및 단일 항목 앞뒤로 이동하는 선택적인 탐색 화살표로 구성됩니다.

사용자가 스와이프하거나 화살표 키를 사용하거나 선택적인 탐색 화살표를 클릭하는 경우 캐러셀이 항목 간에 이동합니다.

[example preview="inline" playground="true" imports="amp-carousel"]
```html
<amp-carousel width="450"
  height="300">
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
    width="450"
    height="300"></amp-img>
</amp-carousel>
```
[/example]

# 특정 슬라이드로 이동 <a name="advancing-to-a-specific-slide"></a>

요소에 `on` 속성의 메서드를 `tap:carousel-id.goToSlide(index=N)`으로 설정하는 경우 사용자가 탭하거나 클릭하면 'carousel-id' ID가 있는 캐러셀을 index=N(첫 번째 슬라이드는 index=0에, 두 번째 슬라이드는 index=1 등에 있음)인 슬라이드로 이동합니다.

다음 예에는 캐러셀 아래 미리보기 버튼이 있는 3개의 이미지 캐러셀이 있습니다. 사용자가 버튼 중 하나를 클릭하면 해당 캐러셀 항목이 표시됩니다.

[example preview="inline" playground="true" imports="amp-carousel"]
```html
<amp-carousel id="carousel-with-preview"
    width="450"
    height="300"
    layout="responsive"
    type="slides">
    <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="apples"></amp-img>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="lemons"></amp-img>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="blueberries"></amp-img>
  </amp-carousel>
  <div class="carousel-preview">
    <button on="tap:carousel-with-preview.goToSlide(index=0)">
      <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
        width="60"
        height="40"
        alt="apples"></amp-img>
    </button>
    <button on="tap:carousel-with-preview.goToSlide(index=1)">
      <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
        width="60"
        height="40"
        alt="lemons"></amp-img>
    </button>
    <button on="tap:carousel-with-preview.goToSlide(index=2)">
      <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
        width="60"
        height="40"
        alt="blueberries"></amp-img>
    </button>
  </div>
```
[/example]

# 속성 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type</strong></td>
    <td>캐러셀 항목의 표시 유형을 지정하며, 다음과 같을 수 있습니다.
      <ul>
        <li><code>carousel</code>(기본값): 모든 슬라이드가 표시되고 가로로 스크롤할 수 있습니다. 이 유형은 <code>fixed</code>, <code>fixed-height</code>, <code>nodisplay</code> 레이아웃만 지원합니다.</li>
        <li><code>slides</code>: 한 번에 슬라이드 한 개만 표시합니다. 이 유형은 <code>fill</code>, <code>fixed</code>, <code>fixed-height</code>, <code>flex-item</code>, <code>nodisplay</code>, <code>responsive</code> 레이아웃을 지원합니다.</li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>height(필수)</strong></td>
      <td>캐러셀의 높이를 픽셀 단위로 표시합니다.</td>
    </tr>
    <tr>
      <td width="40%"><strong>controls(선택사항)</strong></td>
      <td>사용자가 휴대기기에서 캐러셀 항목을 탐색할 수 있는 왼쪽 및 오른쪽 화살표를 영구적으로 표시합니다.
          기본적으로 탐색 화살표는 모바일에서 몇 초 후 사라집니다.
          화살표 공개 상태는 스타일을 지정하여 제어할 수도 있으며, 미디어 쿼리를 사용하면 특정 화면 너비에만 화살표를 표시할 수 있습니다. 데스크톱에서는 하위 항목이 2개 이상 있는 경우 화살표가 항상 표시됩니다.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-next-button-aria-label(선택사항)</strong></td>
        <td><code>amp-carousel-button-next</code>에 aria-label을 설정합니다. 값을 지정하지 않는 경우 aria-label 기본값은 '캐러셀의 다음 항목'입니다.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-prev-button-aria-label(선택사항)</strong></td>
        <td><code>amp-carousel-button-prev</code>에 aria-label을 설정합니다. 값을 지정하지 않는 경우 aria-label의 기본값은 '캐러셀의 이전 항목'입니다.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-button-count-format(선택사항)</strong></td>
        <td><code>(%s of %s)</code>와 같은 형식 문자열로, <code>amp-carousel-button-next</code>/<code>amp-carousel-button-prev</code>의 aria-label에 대한 접미사로 사용되며, 스크린 리더를 사용하는 사용자에게 캐러셀 진행 상황 정보를 제공합니다. 값을 지정하지 않는 경우 기본값은 '(%s of %s)'입니다.</td>
      </tr>
      <tr>
        <td width="40%"><strong>autoplay(선택사항)</strong></td>
        <td>사용자가 상호작용하지 않아도 슬라이드가 다음 슬라이드로 진행합니다.<br>
          값 없이 있는 경우
          <ul>
            <li>기본적으로 슬라이드를 5000밀리초(5초) 간격으로 진행하며, <code>delay</code> 속성으로 재정의될 수 있습니다.</li>
            <li><code>loop</code> 속성을 <code>amp-carousel</code>에 연결합니다(<code>loop</code>  속성이 없는 경우).</li>
            <li>자동재생이 실행되려면 슬라이드가 2개 이상이어야 합니다.</li>
            <li><code>type=slides</code>가 있는 캐러셀에만 적용됩니다.</li>
          </ul>
          값과 함께 있는 경우
          <ul>
            <li><code>loop</code> 속성을 <code>amp-carousel</code>에 연결합니다(<code>loop</code> 속성이 없는 경우).</li>
            <li>필요한 횟수로 연속 재생한 후 <code>loop</code> 속성을 삭제합니다.</li>
          </ul></td>
        </tr>
        <tr>
          <td width="40%"><strong>delay(선택사항)</strong></td>
          <td><code>autoplay</code>가 사용 설정된 경우 다음 슬라이드로 진행하는 데 걸리는 시간(밀리초)을 지정합니다. <code>delay</code> 속성은 <code>type=slides</code>가 있는 캐러셀에만 적용할 수 있습니다.</td>
        </tr>
        <tr>
          <td width="40%"><strong>loop(선택사항)</strong></td>
          <td>사용자가 첫 번째 항목이나 마지막 항목을 지나 진행할 수 있게 합니다. 연속 재생하려면 슬라이드가 3개 이상이어야 합니다. <code>loop</code> 속성은 <code>type=slides</code>가 있는 캐러셀에만 적용할 수 있습니다.
            <em>예: 컨트롤, 연속 재생, 지연 자동재생으로 슬라이드 캐러셀 표시</em>

[example preview="inline" playground="true" imports="amp-carousel"]
```html
<amp-carousel type="slides"
  width="450"
  height="300"
  controls
  loop
  {% if not format=='email'%}  autoplay
  delay="3000"{% endif %}
  data-next-button-aria-label="Go to next slide"
  data-previous-button-aria-label="Go to previous slide">
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
    width="450"
    height="300"></amp-img>
</amp-carousel>
```
[/example]</td>
          </tr>
          <tr>
            <td width="40%"><strong>공통 속성</strong></td>
            <td>이 요소에는 AMP 구성요소로 확장된 <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">공통 속성</a>이 포함됩니다.</td>
          </tr>
        </table>

# 스타일 지정 <a name="styling"></a>

* `amp-carousel` 요소 선택기를 사용해 자유롭게 스타일을 지정할 수 있습니다.
* `.amp-carousel-slide` 클래스 선택기를 사용해 캐러셀 항목을 타겟팅할 수 있습니다.
* `amp-carousel` 버튼이 사용 중지되면 이 버튼의 시각적 상태가 숨겨집니다.
* 기본적으로 `.amp-carousel-button`은 인라인 SVG를 버튼의 배경 이미지로 사용합니다. 아래 예에서와 같이 나만의 SVG 또는 이미지로 이를 재정의할 수 있습니다.

*예: 기본 `.amp-carousel-button` 인라인 SVG*

```css
.amp-carousel-button-prev {
  left: 16px;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z" fill="#fff" /></svg>');
}
```

*예: 기본 `.amp-carousel-button` 인라인 SVG 재정의*

```css
.amp-carousel-button-prev {
  left: 5%;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z" fill="#fff" /></svg>');
}
```

# 유효성 검사 <a name="validation"></a>

AMP 유효성 검사기 사양의 [amp-carousel 규칙](https://github.com/ampproject/amphtml/blob/main/extensions/amp-carousel/validator-amp-carousel.protoascii)을 참조하세요.
