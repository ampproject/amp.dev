---
$title: amp-selector
$category@: dynamic-content
formats:
  - websites
  - email
teaser:
  text: "사용자가 선택할 수 있는 옵션 메뉴를 표시하는 컨트롤을 나타냅니다."
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



사용자가 선택할 수 있는 옵션 메뉴를 표시하는 컨트롤을 나타냅니다.

<table>
  <tr>
    <td class="col-fourty" width="40%"><strong>필수 스크립트</strong></td>
      <td><code>&lt;script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">지원되는 레이아웃</a></strong></td>
    <td>전체</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>예</strong></td>
    <td>AMP By Example의 <a href="https://ampbyexample.com/components/amp-selector/">amp-selector 예</a>를 참조하세요.</td>
  </tr>
</table>


## 동작 <a name="behavior"></a>

AMP 선택기는 사용자가 하나 이상 선택할 수 있는 옵션 목록을 표시하는 컨트롤입니다. 옵션의 콘텐츠는 텍스트에 국한되지 않습니다.

* `amp-selector`에 임의의 HTML 요소 또는 AMP 구성요소(예: `amp-carousel`, `amp-img` 등)가 포함될 수 있습니다.
* `amp-selector`에는 중첩된 `amp-selector` 컨트롤을 포함할 수 없습니다.
* 선택 가능한 옵션은 요소에 `option` 속성을 추가하고 속성에 값을 할당하여 설정할 수 있습니다(예: `<li option='value'></li>`).
* 사용하지 않는 옵션은 요소에 `disabled` 속성을 추가하여 설정할 수 있습니다(예: `<li option='d' disabled></li>`).
* 사전 선택된 옵션은 요소에 `selected` 속성을 추가하여 설정할 수 있습니다(예: `<li option='b' selected></li>`).
* 여러 항목을 선택할 수 있도록 `multiple` 속성을 `amp-selector` 요소에 추가합니다.  기본적으로 `amp-selector`를 사용하면 한 번에 하나만 선택할 수 있습니다.
* 전체 `amp-selector`를 사용하지 않으려면 `disabled` 속성을 `amp-selector` 요소에 추가합니다.
* `amp-selector`에 `name` 속성이 포함되어 있고 `amp-selector`가 `form` 태그 안에 있는 경우 양식에서 제출 이벤트가 발생하면 `amp-selector`가 라디오 버튼/체크박스 그룹과 같이 동작하고 `amp-selector` 이름과 비교하여 선택한 값(옵션에 할당된 값)을 제출합니다.

예:

```html

<form id="form1" action="/" method="get" target="_blank">
  <amp-selector name="single_image_select" layout="container">
    <ul>
      <li><amp-img src="/img1.png" width="50" height="50" option="1"></amp-img></li>
      <li><amp-img src="/img2.png" width="50" height="50" option="2"></amp-img></li>
      <li option="na" selected="">해당 사항 없음</li>
    </ul>
  </amp-selector>
  <amp-selector name="multi_image_select" layout="container" multiple="">
    <amp-img src="/img1.png" width="50" height="50" option="1"></amp-img>
    <amp-img src="/img2.png" width="50" height="50" option="2"></amp-img>
    <amp-img src="/img3.png" width="50" height="50" option="3"></amp-img>
  </amp-selector>
  <amp-selector name="multi_image_select_1" layout="container" multiple="">
    <amp-carousel id="carousel-1" width="200" height="60" controls="">
      <amp-img src="/img1.png" width="80" height="60" option="a"></amp-img>
      <amp-img src="/img2.png" width="80" height="60" option="b" selected=""></amp-img>
      <amp-img src="/img3.png" width="80" height="60" option="c"></amp-img>
      <amp-img src="/img4.png" width="80" height="60" option="d" disabled=""></amp-img>
    </amp-carousel>
  </amp-selector>
</form>

<p><amp-selector name="multi_image_select_2" layout="container" multiple="" form="form1">
  <amp-carousel height="300" id="carousel-1" type="slides" width="400" controls="">
    <amp-img height="60" src="/img1.png" width="80" option="a"></amp-img>
    <amp-img height="60" src="/img2.png" width="80" option="b" selected=""></amp-img>
    <amp-img height="60" src="/img3.png" width="80" option="c"></amp-img>
    <amp-img height="60" src="/img4.png" width="80" option="d"></amp-img>
  </amp-carousel>
</amp-selector>
```

## 선택 항목 지우기 <a name="clearing-selections"></a>

요소를 탭하거나 클릭할 때 선택 항목을 모두 지우려면 요소에서 [`on`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) 작업 속성을 설정하고 `clear` 작업 방법으로 AMP 선택기 `id`를 지정합니다.

예:

```html
<button on="tap:mySelector.clear">Clear Selection</button>
<amp-selector id="mySelector" layout="container" multiple>
  <div option>Option One</div>
  <div option>Option Two</div>
  <div option>Option Three</div>
</amp-selector>
```

[tip type="success"]
[AMP By Example](https://ampbyexample.com/components/amp-selector/)에서 라이브 데모를 참조하세요.
[/tip]

## 속성 <a name="attributes"></a>

### `<amp-selector>`의 속성 <a name="attributes-on-"></a>

<table>
  <tr>
    <td width="40%"><strong>disabled, form, multiple, name</strong></td>
    <td>위의 속성은 표준 HTML에서와 동일하게 동작합니다. <code>select</code> [](https://developer.mozilla.org/en/docs/Web/HTML/Element/select).</td>
  </tr>
  <tr>
    <td width="40%"><strong>keyboard-select-mode</strong></td>
    <td><code>keyboard-select-mode</code> 속성을 통해서는 <code>amp-selector</code> 내부에 있는 옵션의 키보드 탐색 동작을 지시합니다.

    <ul><li><code>none</code>(기본값): 이 탭 키는 <code>amp-selector</code> 의 항목 간에 기준을 변경합니다. 선택 사항을 변경하려면 Enter나 Space 키를 눌러야 합니다. 화살표 키는 사용되지 않습니다. </li><li>
    <code>focus</code>: 탭 키를 누르면 <code>amp-selector</code> 에 기준이 맞춰집니다. 화살표 키를 사용하여 항목 간에 이동합니다. 선택 사항을 변경하려면 Space나 Enter를 눌러야 합니다.</li><li>
    <code>select</code>: 탭 키를 누르면 <code>amp-selector</code> 에 기준이 맞춰집니다. 사용자가 화살표 키로 옵션을 이동함에 따라 선택사항이 변경됩니다. </li></ul></td>
      </tr>
    </table>

### `<amp-selector>` 옵션의 속성 <a name="attributes-on--options"></a>

<table>
  <tr>
    <td width="40%"><strong>option</strong></td>
    <td>옵션이 선택 가능함을 나타냅니다.  값이 지정된 경우 양식과 함께 값의 콘텐츠가 제출됩니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong>disabled, selected</strong></td>
    <td>위의 속성은 표준 HTML에서와 동일하게 동작합니다. [<code>option</code>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option).</td>
  </tr>
</table>

## 이벤트 <a name="events"></a>

이벤트에서 `on` 속성을 사용하여 다른 AMP 구성요소에서 작업을 트리거할 수 있습니다.
예: `on="select: my-tab.show"`

[AMP 작업 및 이벤트](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)에 관해 자세히 읽어보세요.

<table>
  <tr>
    <td width="40%"><strong>select</strong></td>
    <td>사용자가 옵션을 선택하면 <code>amp-selector</code> 에서 <code>select</code> 이벤트를 트리거합니다.
        옵션을 선택하거나 선택 해제하면 다중 선택기 및 단일 선택기에서 이 이벤트를 실행합니다.
        사용하지 않는 옵션을 탭하면 <code>select</code> 이벤트가 트리거되지 않습니다.
        <ul>
        <li>
          <code>event.targetOption</code> 에는 선택한 요소의 <code>option</code>속성 값이 포함되어 있습니다.</li>
          <li>
            <code>event.selectedOptions</code> 에는 선택한 모든 요소의 <code>option</code> 속성 값 배열이 포함되어 있습니다.
          </li>
        </ul></td>
      </tr>

    </table>

## 유효성 검사 <a name="validation"></a>

AMP 유효성 검사기 사양에서 [amp-selector 규칙](https://github.com/ampproject/amphtml/blob/main/extensions/amp-selector/validator-amp-selector.protoascii)을 참조하세요.
