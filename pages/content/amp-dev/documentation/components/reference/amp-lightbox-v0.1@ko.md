---
$title: amp-lightbox
$category@: layout
teaser:
  text: 전체 표시 영역 '라이트박스' 모달에 요소를 표시합니다.
---



<!--
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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



<table>
  <tr>
    <td width="40%"><strong>설명</strong></td>
    <td>전체 표시 영역 '라이트박스' 모달에 요소를 표시합니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong>필수 스크립트</strong></td>
    <td><code>&lt;script async custom-element="amp-lightbox" src="https://ampjs.org/v0/amp-lightbox-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">지원되는 레이아웃</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td width="40%"><strong>예</strong></td>
    <td>AMP By Example의 <a href="https://ampbyexample.com/components/amp-lightbox/">amp-lightbox</a> 샘플을 참조하세요.</td>
  </tr>
</table>


## 동작 <a name="behavior"></a>

`amp-lightbox` 구성요소는 전체 표시 영역 오버레이/모달에 표시되는 하위 요소를 정의합니다. 사용자가 요소(예: 버튼)를 탭하거나 클릭하면 클릭한 요소의 `on` 속성에서 참조하는 `amp-lightbox` ID가 전체 표시 영역을 사용하도록 라이트박스를 트리거하고 `amp-lightbox`의 하위 요소를 표시합니다.

키보드에서 Esc 키를 누르면 라이트박스가 닫힙니다. 또는 라이트박스에 있는 하나 이상의 요소에서 `on` 속성을 설정하고 해당 메소드를 `close`로 설정하면 요소를 탭하거나 클릭할 때 라이트박스가 닫힙니다.

```html
<button on="tap:quote-lb">See Quote</button>
<amp-lightbox id="quote-lb" layout="nodisplay">
  <blockquote>"Don't talk to me about JavaScript fatigue" - Horse JS</blockquote>
  <button on="tap:quote-lb.close">Nice!</button>
</amp-lightbox>
```

[tip type="read"]
라이트박스에 이미지를 표시하는 데 [`<amp-image-lightbox>`](amp-image-lightbox.md) 구성요소도 사용할 수 있습니다.
[/tip]

## 속성 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>animate-in(선택사항)</strong></td>
    <td>라이트박스를 여는 데 사용할 애니메이션 스타일을 정의합니다. 기본적으로 이 값은
      <code>fade-in</code>으로 설정됩니다. 유효한 값은 <code>fade-in</code>, <code>fly-in-bottom</code> 및
        <code>fly-in-top</code>입니다.
          <br><br>
            <strong>메모</strong>: <code>fly-in-*</code> 애니메이션 사전 설정에서 <code>amp-lightbox</code> 요소의 <code>transform</code> 속성을
                수정합니다. <code>amp-lightbox</code> 요소를 직접 변환하지
                마세요. 변환을 적용하려면 중첩된 요소에 대신 설정합니다.</td>
            </tr>
            <tr>
              <td width="40%"><strong>close-button(AMPHTML 광고에 필수)</strong></td>
              <td>라이트박스 상단에 있는 닫기 버튼 헤더를 렌더링합니다. 이 속성은 <a href="#a4a">AMPHTML 광고</a>와 함께 사용할 때만
                  필요하고 유효합니다.</td>
              </tr>
              <tr>
                <td width="40%"><strong>id(필수)</strong></td>
                <td>라이트박스의 고유한 식별자입니다.</td>
              </tr>
              <tr>
                <td width="40%"><strong>layout(필수)</strong></td>
                <td><code>nodisplay</code>로 설정해야 합니다.</td>
              </tr>
              <tr>
                <td width="40%"><strong>scrollable(선택사항)</strong></td>
                <td><code>scrollable</code> 속성이 있는 경우 라이트박스의 높이를 넘어가면 라이트박스의 콘텐츠를 스크롤할 수 있습니다.
                  <br><br>
                    <strong>참고</strong>: <code>scrollable</code> 속성은 AMPHTML 광고에서 <code>&lt;amp-lightbox&gt;</code> 사용 시 허용되지 않습니다. 세부정보는 <a href="#a4a">AMPHTML 광고에서 amp-lightbox 사용</a> 섹션을 읽어보세요.</td>
                  </tr>
                  <tr>
                    <td width="40%"><strong>scrollable(선택사항)</strong></td>
                    <td></td>
                  </tr>
                </table>

## 스타일 지정 <a name="styling"></a>

표준 CSS로 `amp-lightbox`의 스타일을 지정할 수 있습니다.

## 작업 <a name="actions"></a>

`amp-lightbox`에서는 [AMP on-syntax를 사용하여 트리거](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)할 수 있는 다음 작업을 공개합니다.

<table>
  <tr>
    <th width="20%">작업</th>
    <th>설명</th>
  </tr>
  <tr>
    <td><code>open</code>(기본값)</td>
    <td>라이트박스를 엽니다.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>라이트박스를 닫습니다.</td>
  </tr>
</table>

## <a id="a4a"></a> AMPHTML 광고에서 `amp-lightbox` 사용 <a name="a4a"></a>

[tip type="note"]
AMPHTML 광고에서 사용할 `amp-lightbox` 구성요소는 [실험적](../../../documentation/guides-and-tutorials/learn/experimental.md)이며 현재 개발 중입니다. AMPHTML 광고에서 `amp-lightbox`를 사용하려면 [`amp-lightbox-a4a-proto` 실험을 사용 설정](http://cdn.ampproject.org/experiments.html)하세요.
[/tip]

일반 AMP 문서에서 `amp-lightbox` 사용과 [AMPHTML로 작성된 광고](../../../documentation/guides-and-tutorials/learn/a4a_spec.md)를 사용하는 데는 몇 가지 차이점이 있습니다.

### close-button 필요 <a name="requires-close-button"></a>

AMPHTML 광고의 경우 `close-button` 속성이 필요합니다. 이 속성을 사용하면 라이트박스 상단의 헤더가 렌더링됩니다. 헤더에는 닫기 버튼과 '광고'라는 레이블이 포함되어 있습니다. 이 헤더의 요구사항은 다음과 같습니다.

* AMPHTML 광고의 일관되고 예측 가능한 사용자 환경을 설정합니다.
* 라이트박스의 이탈 지점이 항상 존재하는지 확인하세요. 그러지 않으면 광고 소재에서 라이트박스를 통해 호스트 문서 콘텐츠를 쉽게 도용할 수 있습니다.

`close-button` 속성은 필수이며 AMPHTML 광고에서만 허용됩니다. 일반 AMP 문서에서 `<amp-lightbox>` 콘텐츠의 일부로 필요할 때마다 닫기 버튼을 렌더링할 수 있습니다.

### 스크롤 가능한 라이트박스는 허용되지 않음 <a name="scrollable-lightboxes-are-disallowed"></a>

AMPHTML 광고의 경우 스크롤이 가능한 라이트박스는 허용되지 않습니다.

### 투명 배경 <a name="transparent-background"></a>

AMPHTML 광고에서 `<amp-lightbox>`를 사용하면 라이트박스가 확장되기 전에 AMP 런타임에서 광고 소재 콘텐츠의 크기를 조정하고 재정렬하기 때문에 `<body>` 요소의 배경이 투명하게 됩니다. 이 작업은 라이트박스가 열린 상태에서 광고 소재의 시각적 '점프'를 방지하기 위해 시행됩니다. 광고 소재에 배경이 필요하면 `<body>`가 아닌 중간 컨테이너(예: 전체 크기 `<div>`)에서 설정하세요.

AMPHTML 광고가 제3자 환경에서 실행 중인 경우(예: 비AMP 문서) 광고 소재는 표시 영역에서 상대적으로 중앙에 배치된 다음 확장됩니다. 제3자 iframe에서는 비동기적인 프레임 크기 조정과 같은 기능을 사용 설정하는 데 postMessage API를 사용해야 하므로, 광고 소재를 먼저 중앙에 두면 시각적 점프 없이 원활하게 전환할 수 있습니다.

### 라이트박스에서 AMPHTML 광고 전환 예 <a name="examples-of-transitions-in-lightbox-for-amphtml-ads"></a>

아래 예는 전환을 통해 호환 iframe에서 AMPHTML 광고의 라이트박스 요소에 `animate-in="fly-in-bottom"` 속성이 설정된 AMPHTML 광고와 제3자 iframe의 AMPHTML 광고를 찾는 방법을 설명합니다.

##### 호환 iframe(예: AMP 캐시에서 가져옴) <a name="on-friendly-iframes-eg-coming-from-an-amp-cache"></a>

<amp-img alt="호환 iframe의 라이트박스 광고" width="360" height="480" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/lightbox-ad-fie.gif" layout="fixed">
  <noscript>
    <img alt="호환 iframe의 라이트박스 광고" src="../../spec/img/lightbox-ad-fie.gif">
    </noscript>
  </amp-img>

##### 제3자 iframe(예: AMP 캐시 외부에서 가져옴) <a name="on-third-party-iframes-eg-outside-the-amp-cache"></a>

<amp-img alt="제3자 iframe의 라이트박스 광고" width="360" height="480" src="https://github.com/ampproject/amphtml/raw/main/docs/spec/img/lightbox-ad-3p.gif" layout="fixed">
  <noscript>
    <img alt="제3자 iframe의 라이트박스 광고" src="../../spec/img/lightbox-ad-3p.gif">
    </noscript>
  </amp-img>

## 유효성 검사 <a name="validation"></a>

AMP 유효성 검사기 사양에서 [amp-lightbox 규칙](https://github.com/ampproject/amphtml/blob/main/extensions/amp-lightbox/validator-amp-lightbox.protoascii)을 참조하세요.
