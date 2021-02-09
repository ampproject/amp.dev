---
'$title': AMP 이메일의 액션 및 이벤트
$order: 0
formats:
  - email
teaser:
  text: '[tip type="note"]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-email-actions-and-events.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2020 The AMP HTML Authors. All Rights Reserved.

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

[tip type="note"] 이 문서는 AMP 이메일의 액션 및 이벤트를 설명합니다. AMP 웹사이트, 스토리 및 광고에 대한 자세한 내용은 다음 [액션 및 이벤트](https://github.com/ampproject/amphtml/blob/master/spec/amp-actions-and-events.md) 문서를 참조하세요. [/tip]

요소의 이벤트 핸들러 설치 시 `on` 속성이 사용됩니다. 지원되는 이벤트는 요소에 따라 다릅니다.

구문 값은 해당 형식의 단순한 도메인 특화 언어입니다.

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]][/sourcecode]

구문의 각 부분에 대한 설명은 아래 표를 참조하세요.

<table>
  <tr>
    <th width="30%">구문</th>
    <th width="18%">필수 여부</th>
    <th width="42%">설명</th>
  </tr>
  <tr>
    <td><code>eventName</code></td>
    <td>필수</td>
    <td>요소가 표시하는 이벤트의 이름입니다.</td>
  </tr>
  <tr>
    <td><code>targetId</code></td>
    <td>필수</td>
    <td>요소의 DOM ID 또는 이벤트에 대응하여 액션을 실행하고자 하는 사전 정의된 <a href="#special-targets">특정 대상</a>입니다. 다음 예시에서 <code>targetId</code>는 <code>amp-lightbox</code> 대상, <code>photo-slides</code>의 DOM ID입니다.<pre><amp-lightbox id="photo-slides"></amp-lightbox> <button on="tap:photo-slides">이미지 표시</button></pre>
</td>
  </tr>
  <tr>
    <td><code>methodName</code></td>
    <td>선택 사항</td>
    <td>기본 액션이 있는 요소에 사용됩니다.<p>대상 요소(<code>targetId</code>로 참조됨)가 표시하고 이벤트가 트리거될 시 실행하고자 하는 메소드입니다.</p> <p>AMP에는 요소가 구현할 수 있는 기본 액션의 개념이 있습니다. 그러므로 <code>methodName</code>이 누락될 경우 AMP는 기본 메소드를 실행합니다.</p>
</td>
  </tr>
  <tr>
    <td><code>arg=value</code></td>
    <td>선택 사항</td>
    <td>일부 액션에서는 문서화된 경우 인수가 허용될 수 있습니다. <code>key=value</code> 노테이션에서 인수는 괄호 사이에 정의됩니다. 허용 값은 다음과 같습니다: <ul> <li>따옴표가 없는 단순한 문자열: <code>simple-value</code> </li> <li>따옴표가 있는 문자열: <code>"string value"</code> 또는 <code>'string value'</code> </li> <li>불 값: <code>true</code> 또는 <code>false</code> </li> <li>숫자: <code>11</code> 또는<code>1.1</code> </li> <li>이벤트 데이터로 dot-syntax 참조: <code>event.someDataVariableName</code> </li> </ul>
</td>
  </tr>
</table>

## 여러 이벤트 처리<a name="handling-multiple-events"></a>

세미콜론 `;`으로 이벤트를 구분하여 요소의 여러 이벤트를 리스닝할 수 있습니다.

예시: `on="submit-success:lightbox1;submit-error:lightbox2"`

## 단일 이벤트의 여러 액션<a name="multiple-actions-for-one-event"></a>

쉼표 ','로 액션을 구분하여 동일한 이벤트의 여러 액션을 실행할 수 있습니다.

예시: `on="tap:target1.actionA,target2.actionB"`

## 전역으로 정의된 이벤트 및 액션 <a name="globally-defined-events-and-actions"></a>

AMP는 모든 HTML 요소(AMP 요소 포함)에서 리스닝할 수 있는 `tap` 이벤트를 전역으로 정의합니다.

또한 AMP는 모든 HTML 요소에서 트리거할 수 있는 `hide`, `show` 및`toggleVisibility` 액션도 전역으로 정의합니다.

[tip type="note"]

요소는 이전에 `hide` 또는 `toggleVisibility` 액션으로 숨김 처리된 경우 또는 [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden) 속성이 사용된 경우에만 표시할 수 있습니다. `show` 액션은 CSS `display:none` 또는 AMP `layout=nodisplay`로 숨김 처리된 액션을 지원하지 않습니다.

예를 들어 AMP에서 다음과 같이 사용될 수 있습니다.

[sourcecode:html]

<div id="warning-message">Warning...</div>

<button on="tap:warning-message.hide">Cool, thanks!</button>
[/sourcecode]

[/tip]

## 요소별 이벤트 <a name="element-specific-events"></a>

### \* - 모든 요소 <a name="---all-elements"></a>

<table>
  <tr>
    <th>이벤트</th>
    <th>설명</th>
  </tr>
  <tr>
    <td><code>tap</code></td>
    <td>요소를 클릭/탭했을 시 발생합니다.</td>
  </tr>
</table>

### 입력 요소 <a name="input-elements"></a>

<table>
  <tr>
    <th width="20%">이벤트</th>
    <th width="30%">설명</th>
    <th width="40%">요소</th>
    <th>데이터</th>
  </tr>
  <tr>
    <td rowspan="3"><code>change</code></td>
    <td rowspan="3">요소 값이 변경되고 커밋될 시 발생합니다.       <p>       데이터 속성은  <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties">HTMLInputElement</a> 및 <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#Properties">HTMLSelectElement</a>에 해당 항목을 미러링합니다.</p>
</td>
    <td><code>input</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value<br>event.valueAsNumber</pre>
    </td>
  </tr>
  <tr>
    <td> <code>input[type="radio"]</code>,<br><code>input[type="checkbox"]</code>
</td>
    <td>
      <code>event.checked</code>
    </td>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value</pre>
    </td>
  </tr>
  <tr>
    <td><code>input-debounced</code></td>
    <td>요소 값이 변경되었을 시 발생합니다. 표준 <code>change</code> 이벤트와 유사하지만 입력 값의 변경이 중지되고 300ms가 지난 후에만 발생합니다.</td>
    <td>
<code>input</code> 이벤트를 발생시키는 요소.</td>
    <td>
<code>change</code> 이벤트 데이터와 동일.</td>
  </tr>
  <tr>
    <td><code>input-throttled</code></td>
    <td>요소 값이 변경되었을 시 발생합니다. 표준 <code>change</code> 이벤트와 유사하지만 입력 값이 변경되는 동안 최대 100ms마다 1회씩 실행하도록 조절됩니다.</td>
    <td>
<code>input</code> 이벤트를 발생시키는 요소.</td>
    <td>
<code>change</code> 이벤트 데이터와 동일.</td>
  </tr>
</table>

### amp-accordion > 섹션 <a name="amp-accordion"></a>

<table>
  <tr>
    <th width="25%">이벤트</th>
    <th width="35%">설명</th>
    <th width="40%">데이터</th>
  </tr>
  <tr>
    <td><code>expand</code></td>
    <td>아코디언 섹션이 확장할 시 발생합니다.</td>
    <td>없음.</td>
  </tr>
  <tr>
    <td><code>collapse</code></td>
    <td>아코디언 섹션이 축소할 시 발생합니다.</td>
    <td>없음.</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides-1"></a>

<table>
  <tr>
    <th width="25%">이벤트</th>
    <th width="35%">설명</th>
    <th width="40%">데이터</th>
  </tr>
  <tr>
    <td><code>slideChange</code></td>
    <td>캐러셀의 현재 슬라이드가 변경될 시 발생합니다.</td>
    <td><pre>// Slide number.<br>event.index</pre></td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox-1"></a>

<table>
  <tr>
    <th width="25%">이벤트</th>
    <th width="35%">설명</th>
    <th width="40%">데이터</th>
  </tr>
  <tr>
    <td><code>lightboxOpen</code></td>
    <td>라이트박스가 완전히 표시될 시 발생합니다.</td>
    <td>없음</td>
  </tr>
  <tr>
    <td><code>lightboxClose</code></td>
    <td>라이트박스가 완전히 닫혔을 시 발생합니다.</td>
    <td>없음</td>
  </tr>
</table>

### amp-list <a name="amp-list-1"></a>

<table>
  <tr>
    <th width="25%">이벤트</th>
    <th width="35%">설명</th>
    <th width="40%">데이터</th>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(신뢰도 낮음)</td>
    <td>데이터 가져오기 실패 시 발생합니다.</td>
    <td>없음</td>
  </tr>
</table>

### amp-selector <a name="amp-selector-1"></a>

<table>
  <tr>
    <th width="25%">이벤트</th>
    <th width="35%">설명</th>
    <th width="40%">데이터</th>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>옵션이 선택 또는 선택 해제되었을 시 발생합니다.</td>
    <td><pre>// Target element's "option" attribute value.<br>event.targetOption<br>// Array of "option" attribute values of all selected elements.<br>event.selectedOptions</pre></td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar-1"></a>

<table>
  <tr>
    <th width="25%">이벤트</th>
    <th width="35%">설명</th>
    <th width="40%">데이터</th>
  </tr>
  <tr>
    <td><code>sidebarOpen</code></td>
    <td>트랜지션 종료 후 사이드바가 완전히 열렸을 시 발생합니다.</td>
    <td>없음</td>
  </tr>
  <tr>
    <td><code>sidebarClose</code></td>
    <td>트랜지션 종료 후 사이드바가 완전히 닫혔을 시 발생합니다.</td>
    <td>없음</td>
  </tr>
</table>

### amp-state <a name="amp-state"></a>

<table>
  <tr>
    <th width="25%">이벤트</th>
    <th width="35%">설명</th>
    <th width="40%">데이터</th>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(신뢰도 낮음)</td>
    <td>데이터 가져오기 실패 시 발생합니다.</td>
    <td>없음</td>
  </tr>
</table>

### 양식 <a name="form"></a>

<table>
  <tr>
    <th width="25%">이벤트</th>
    <th width="35%">설명</th>
    <th width="40%">데이터</th>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>양식 제출 시 발생합니다.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>submit-success</code></td>
    <td>양식 제출 응답이 성공적으로 완료될 경우 발생합니다.</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>submit-error</code></td>
    <td>양식 제출 응답이 오류일 경우 발생합니다.</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>valid</code></td>
    <td>양식이 유효할 경우 발생합니다.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>invalid</code></td>
    <td>양식이 유효하지 않을 경우 발생합니다.</td>
    <td></td>
  </tr>
</table>

## 요소별 액션 <a name="element-specific-actions"></a>

### \* (모든 요소) <a name="-all-elements"></a>

<table>
  <tr>
    <th width="40%">액션</th>
    <th>설명</th>
  </tr>
  <tr>
    <td><code>hide</code></td>
    <td>대상 요소를 숨깁니다.</td>
  </tr>
  <tr>
    <td><code>show</code></td>
    <td>대상 요소를 표시합니다.     결과적으로 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus"><code>autofocus</code> 요소</a>가 표시되면 포커스를 받습니다.</td>
  </tr>
  <tr>
    <td><code>toggleVisibility</code></td>
    <td>대상 요소의 가시성 옵션을 변경합니다.     결과적으로 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus"><code>autofocus</code> 요소</a>가 표시되면 포커스를 받습니다.</td>
  </tr>
  <tr>
    <td><code>toggleClass(class=STRING, force=BOOLEAN)</code></td>
    <td>대상 요소의 클래스 옵션을 변경합니다. <code>force</code>는 선택 사항이며 정의된 경우 클래스가 <code>true</code>로 설정되었을 시 추가만 가능하며 제거되지는 않도록, <code>false</code>로 설정되었을 시 제거만 가능하며 추가되지는 않도록 합니다.</td>
  </tr>
  <tr>
    <td><code>focus</code></td>
    <td>대상 요소가 포커스를 얻습니다. 포커스를 제거하려면 다른 요소에 <code>focus</code>를 적용합니다(일반적으로 상위 요소). 포커스 제거 시에는 접근성을 고려하여 <code>body</code>/<code>documentElement</code>에 포커스를 적용하는 것이 권장됩니다.</td>
  </tr>
</table>

### amp-accordion <a name="amp-accordion-1"></a>

<table>
  <tr>
    <th>액션</th>
    <th>설명</th>
  </tr>
  <tr>
    <td><code>toggle(section=STRING)</code></td>
    <td>
<code>amp-accordion</code> 섹션의 <code>expanded</code> 및<code>collapsed</code> 상태를 전환합니다. 인수 없이 호출되면 아코디언의 모든 섹션 옵션을 전환합니다. 다음과 같이 섹션 ID를 제공하면 특정 섹션에서 트리거됩니다: <code>on="tap:myAccordion.toggle(section=</code>.</td>
</tr>
  <tr>
    <td><code>expand(section=STRING)</code></td>
    <td>아코디언 섹션을 확장합니다. 섹션이 이미 확장된 경우 그 상태로 유지됩니다. 인수 없이 호출되면 아코디언의 모든 섹션을 확장합니다. 섹션 ID <code>on="tap:myAccordion.expand(section='section-id')"</code>를 제공하면 특정 섹션에서 트리거됩니다.</td>
  </tr>
  <tr>
    <td><code>collapse(section=STRING)</code></td>
    <td>아코디언 섹션을 축소합니다. 섹션이 이미 축소된 경우 그 상태로 유지됩니다. 인수 없이 호출되면 아코디언의 모든 섹션을 축소합니다. 섹션 ID <code>on="tap:myAccordion.collapse(section='section-id')"</code>를 제공하면 특정 섹션에서 트리거됩니다.</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides"></a>

<table>
  <tr>
    <th>액션</th>
    <th>설명</th>
  </tr>
  <tr>
    <td><code>goToSlide(index=INTEGER)</code></td>
    <td>캐러셀이 지정된 슬라이드 색인으로 이동합니다.</td>
  </tr>
</table>

### amp-image-lightbox <a name="amp-image-lightbox"></a>

<table>
  <tr>
    <th width="40%">액션</th>
    <th>설명</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>액션을 트리거한 소스 이미지가 포함된 이미지 라이트박스를 엽니다.</td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox"></a>

<table>
  <tr>
    <th>액션</th>
    <th>설명</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>라이트박스를 엽니다.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>라이트박스를 닫습니다.</td>
  </tr>
</table>

### amp-list <a name="amp-list"></a>

<table>
  <tr>
    <th width="25%">이벤트</th>
    <th width="35%">설명</th>
    <th width="40%">데이터</th>
  </tr>
  <tr>
    <td><code>changeToLayoutContainer</code></td>
    <td>
<code>amp-list</code> 레이아웃을 <code>layout="CONTAINTER"</code>로 업데이트하여 <a href="https://github.com/ampproject/amphtml/blob/master/spec/../extensions/amp-list/amp-list.md#dynamic-resizing">동적 크기 변경</a>을 허용합니다.</td>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(신뢰도 낮음)</td>
    <td>데이터 가져오기 실패 시 발생합니다.</td>
    <td>없음</td>
  </tr>
</table>

### amp-selector <a name="amp-selector"></a>

<table>
  <tr>
    <th>액션</th>
    <th>설명</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>정의된 <code>amp-selector</code>의 모든 선택 항목을 삭제합니다.</td>
  </tr>
  <tr>
    <td><code>selectUp(delta=INTEGER)</code></td>
    <td>모든 선택 항목이 `delta` 값만큼 위로 이동합니다. 기본 `delta` 값은 -1로 설정되어 있습니다. 선택한 옵션이 없으면 선택한 상태가 마지막 옵션의 값이 됩니다.</td>
  </tr>
  <tr>
    <td><code>selectDown(delta=INTEGER)</code></td>
    <td>모든 선택 항목이 `delta` 값만큼 아래로 이동합니다. 기본 `delta` 값은 1로 설정되어 있습니다. 선택한 옵션이 없으면 선택한 상태가 첫 번째 옵션의 값이 됩니다.</td>
  </tr>
  <tr>
    <td><code>toggle(index=INTEGER, value=BOOLEAN)</code></td>
    <td>`selected` 항목의 적용 옵션을 전환합니다. 선택한 속성이 없으면 이 액션이 속성을 추가합니다. 선택한 속성이 있으면 액션이 속성을 제거합니다. `value` 인수에 불 값을 포함하여 추가 또는 제거를 강제하거나 유지할 수 있습니다. `true` 값은 `selected` 속성 추가를 강제하고 이미 해당 속성이 있는 경우 제거하지 않습니다. `false` 값은 속성을 제거하지만 속성이 없는 경우 추가하지 않습니다.</td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar"></a>

<table>
  <tr>
    <th>액션</th>
    <th>설명</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>사이드바를 엽니다.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>사이드바를 닫습니다.</td>
  </tr>
  <tr>
    <td><code>toggle</code></td>
    <td>사이드바 상태를 전환합니다.</td>
  </tr>
</table>

### 양식 <a name="form-1"></a>

<table>
  <tr>
    <th>액션</th>
    <th>설명</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>양식의 입력 필드의 값을 삭제합니다.</td>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>양식을 제출합니다.</td>
  </tr>
</table>

## 특정 대상 <a name="special-targets"></a>

다음은 특정한 요건이 있는 AMP 시스템에서 제공하는 대상입니다.

### 대상: AMP <a name="target-amp"></a>

AMP 런타임이 제공하는 `AMP` 대상은 전체 문서에 적용되는 최상위 액션을 구현합니다.

<table>
  <tr>
    <th width="40%">액션</th>
    <th>설명</th>
  </tr>
  <tr>
    <td>
<code>setState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p><a href="https://amp.dev/documentation/components/amp-bind.html#updating-state-with-ampsetstate">amp-bind</a>가 필요합니다.</p>
      <p>객체 리터럴을 바인딩 가능한 상태로 병합합니다.</p>
      <p></p>
    </td>
  </tr>
</table>

<sup>1</sup><a href="#multiple-actions-for-one-event">여러 액션</a>과 함께 사용되는 경우 후속 액션은 호출 전 <code>setState()</code>가 완료되도록 대기합니다. 이벤트당 하나의 <code>setState()</code>만이 허용됩니다.
