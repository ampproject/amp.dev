---
$title: amp-accordion
$category@: layout
teaser:
  text: 조회 사용자가 콘텐츠의 개요를 한눈에 파악하고 원하는 섹션으로 자유롭게 이동할 수 있습니다.
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



조회 사용자가 콘텐츠의 개요를 한눈에 파악하고 원하는 섹션으로 자유롭게 이동할 수 있습니다. 섹션에 몇 문장밖에 없을 때도 스크롤해야 하는 휴대기기에 유용합니다.

<table>
  <tr>
    <td class="col-fourty"><strong>필수 스크립트</strong></td>
    <td><code>&lt;script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">지원되는 레이아웃</a></strong></td>
    <td>container</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>예</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-accordion/">amp-accordion의 주석이 포함된 코드 예</a></td>
  </tr>
</table>


## 동작 <a name="behavior"></a>

`amp-accordion` 구성요소를 사용하면 접거나 쳐지는 콘텐츠 섹션을 표시할 수 있습니다. 각 `amp-accordion` 구성요소의 바로 하위 구성요소는 아코디언의 섹션으로 간주됩니다. 각 노드는 `<section>` 태그여야 합니다.

* `amp-accordion`은 하나 이상의 `<section>` 요소를 직계 하위로 포함할 수 있습니다.
* 각 `<section>`에는 정확히 두 개의 직계 하위가 포함되어야 합니다.
* 섹션의 첫 번째 하위 항목은 섹션의 제목을 나타내며, 제목 요소(`h1`, `h2`, ..., `h6`, `header` 중 하나)여야 합니다.
* 섹션의 두 번째 하위 항목은 AMP HTML에서 허용되는 어떠한 태그든지 될 수 있으며, 섹션의 콘텐츠를 나타냅니다.
* 섹션의 제목을 클릭하거나 탭하면 섹션이 펼쳐지거나 접힙니다.
* `amp-accordion` 요소에서 각 섹션의 접힌 상태와 펼친 상태는 세션 수준 동안 유지됩니다. 이러한 상태를 유지하지 않으려면 `disable-session-states` 속성을 `amp-accordion` 요소에 추가하세요.

#### 예: 아코디언 표시 <a name="example-displaying-an-accordion"></a>

이 예에서는 3개의 섹션을 표시하며, 세 번째 섹션이 페이지 로드 시 펼쳐집니다.  `disable-session-states`를 설정하여 접힌 상태와 펼친 상태를 유지하지 않도록 설정할 수 있습니다.

[example preview="inline" playground="true" imports="amp-accordion"]
```html
<amp-accordion{% if not format=='email'%} disable-session-states{% endif %}>
  <section>
    <h2>Section 1</h2>
    <p>Content in section 1.</p>
  </section>
  <section>
    <h2>Section 2</h2>
    <div>Content in section 2.</div>
  </section>
  <section expanded>
    <h2>Section 3</h2>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/squirrel.jpg"
      width="320"
      height="256"></amp-img>
  </section>
</amp-accordion>
```
[/example]

[tip type="success"]
`amp-accordion` 데모를 더 보려면 [AMP By Example](https://ampbyexample.com/components/amp-accordion/)을 방문하세요.
[/tip]

### 이벤트 <a name="events"></a>

다음 이벤트는 `accordion`의 `section`에서 트리거됩니다.

<table>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>이 이벤트는 접힌 상태에서 펼친 상태로 변경되는 대상 `섹션`에서 트리거됩니다. 이미 펼쳐진 `섹션`에서 <code>expand</code>를 호출하면 이 이벤트가 트리거되지 않습니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>collapse</code></strong></td>
    <td>이 이벤트는 펼친 상태에서 접힌 상태로 변경되는 대상 `섹션`에서 트리거됩니다. 이미 접힌 `섹션`에서 <code>collapse</code>를 호출하면 이 이벤트가 트리거되지 않습니다</td>
  </tr>
</table>

### 작업 <a name="actions"></a>

<table>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>이 이벤트는 접힌 상태에서 펼친 상태로 변경되는 타겟 <code>section</code>에서 트리거됩니다. 이미 펼쳐진  <code>section</code>에서 <code>expand</code>를 호출하면 이 이벤트가 트리거되지 않습니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>toggle</code></strong></td>
    <td><code>amp-accordion</code>의 `펼친` 상태와 `접힌` 상태 간에 전환하는 작업입니다. 인수 없이 호출되면 아코디언의 모든 섹션이 전환됩니다.  <code>section</code> 인수와 해당 <code>id</code>를 값으로 단일 섹션을 지정할 수 있습니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>이 작업은 <code>amp-accordion</code>을 펼칩니다. 이미 `펼쳐진` 경우 그 상태로 유지됩니다. 인수 없이 호출되면 아코디언의 모든 섹션을 펼칩니다.  <code>section</code> 인수와 해당 <code>id</code>를 값으로 단일 섹션을 지정할 수 있습니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>collapse</code></strong></td>
    <td>이 작업은 <code>amp-accordion</code>을 접습니다. 이미 접힌 경우 그 상태로 유지됩니다. 인수 없이 호출되면 아코디언의 모든 섹션을 접습니다.  <code>section</code> 인수와 해당 <code>id</code>를 값으로 단일 섹션을 지정할 수 있습니다.</td>
  </tr>
</table>

#### 속성 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong><code>animate</code></strong></td>
    <td>이 속성을 <code>&lt;amp-accordion&gt;</code>에 설정하면 모든 아코디언 섹션의 펼치기/접기를 애니메이션으로 표시합니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>disable-session-states</code></strong></td>
    <td>이 속성을 <code>&lt;amp-accordion&gt;</code>에 설정하면 아코디언이 접힌 상태와 펼친 상태를 유지하지 않습니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expanded</code></strong></td>
    <td>이 속성을 <code>&lt;section&gt;</code>에 설정하면 페이지 로드 시 섹션을 펼친 상태로 표시합니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expand-single-section</code></strong></td>
    <td>이 속성을 <code>&lt;amp-accordion&gt;</code>에 설정하면 한 번에 하나의 <code>&lt;section&gt;</code>만 펼칠 수 있습니다. 사용자가 하나의 <code>&lt;section&gt;</code>에 초점을 맞추면 이전에 펼친 다른 모든 <code>&lt;section&gt;</code>이 접힙니다.</td>
  </tr>
</table>

## 스타일 지정 <a name="styling"></a>

* `amp-accordion` 요소 선택기를 사용해 자유롭게 스타일을 지정할 수 있습니다.
* `amp-accordion` 요소는 항상 `display: block`입니다.
* `<section>`, 제목, 콘텐츠 요소는 플로팅되도록 설정할 수 없습니다.
* 섹션을 펼치면 `<section>` 요소에 `expanded` 속성이 포함됩니다.
* 콘텐츠 요소는 `overflow: hidden`으로 명확히 고정되므로 스크롤바를 포함할 수 없습니다.
* `<amp-accordion>`, `<section>`, 제목, 콘텐츠 요소의 여백은 0으로 설정되며 맞춤 스타일에서 재정의될 수 있습니다.
* 헤더와 콘텐츠 요소는 모두 `position: relative`입니다.

## 유효성 검사 <a name="validation"></a>

AMP 유효성 검사기 사양의 [amp-accordion 규칙](https://github.com/ampproject/amphtml/blob/main/extensions/amp-accordion/validator-amp-accordion.protoascii)을 참조하세요.
