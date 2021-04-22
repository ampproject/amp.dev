---
$title: amp-bind
$category@: dynamic-content
teaser:
  text: 사용자 작업 또는 데이터 변경에 따라 데이터 결합 및 JS와 같은 단순한 식을 통해 요소의 변경을 허용합니다.
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


데이터 결합 및 식과 함께 맞춤형 상호작용을 추가합니다.

<table>
  <tr>
    <td class="col-fourty"><strong>필수 스크립트</strong></td>
    <td>
      <div>
          <code>&lt;script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js">&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>예</strong></td>
    <td>
      <ul>
        <li><a href="https://ampbyexample.com/components/amp-bind/">주석이 포함된 소개 코드 예</a></li>
        <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">주석이 포함된 연결된 이미지 캐러셀 예</a></li>
        <li><a href="https://ampbyexample.com/samples_templates/product/">주석이 포함된 전자상거래 제품 페이지 예</a></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>가이드</strong></td>
    <td><a href="../../../documentation/guides-and-tutorials/develop/interactivity/index.md">대화형 AMP 페이지 만들기</a></td>
  </tr>
</table>

# 개요 <a name="overview"></a>

`amp-bind` 구성요소를 사용하면 데이터 결합 및 JS와 유사한 식을 통해 AMP 페이지에 맞춤형 스테이트풀(stateful) 상호작용을 추가할 수 있습니다.

<figure class="alignment-wrapper  margin-">
  <amp-youtube width="480" height="270" data-videoid="xzCFU8b5fCU" layout="responsive"></amp-youtube>
  <figcaption>amp-bind에 대한 소개 동영상입니다.</figcaption></figure>

# 간단한 예 <a name="a-simple-example"></a>

이 예에서는 버튼을 누르면 `<p>` 요소의 텍스트가 'Hello World'에서 'Hello amp-bind'로 바뀝니다.

```html

<p [text]="'Hello ' + foo">Hello World</p>

<button on="tap:AMP.setState({foo: 'amp-bind'})">Say "Hello amp-bind"</button>
```

[tip type="note"]
성능을 위해 그리고 예기치 않은 콘텐츠 건너뛰기 위험을 피하기 위해 `amp-bind`는 페이지 로드 시 식을 평가하지 않습니다. 즉, 시각적 요소에 기본 상태를 제공해야 하며 초기 렌더링에 `amp-bind`를 사용하지 않아야 합니다.
[/tip]

### 기본 원리 <a name="how-does-it-work"></a>

`amp-bind`에는 세 가지 주요 구성요소가 있습니다.

1. [상태](#state): 문서 범위의 변경 가능한 JSON 상태. 위의 예에서, 버튼을 누르기 전에는 상태가 비어 있습니다.  버튼을 누른 후의 상태는 `{foo: 'amp-bind'}`입니다.
2. [식](#expressions): **상태** 를 참조할 수 있는 자바스크립트 같은 식입니다. 위의 예에는 단일 식인 `'Hello ' + foo`가 있는데, 여기에서는 문자열 리터럴 `'Hello '`와 상태 변수 `foo`를 연결합니다.
하나의 식에 사용할 수 있는 피연산자는 100개로 제한됩니다.
3. [결합](#bindings): 요소의 속성을 **식** 에 연결하는 `[property]` 양식의 특수한 속성입니다. 위의 예에는 단일 결합인 `[text]`가 있는데, 이것은 식의 값이 변경될 때마다 `<p>` 요소의 텍스트를 업데이트합니다.

amp-bind는 AMP 페이지에서 속도, 보안 및 성능을 보장하기 위해 특별한 주의를 기울입니다.

### 약간 더 복잡한 예 <a name="a-slightly-more-complex-example"></a>

```html
<!-- 복잡한 중첩 JSON 데이터를 <amp-state> 요소에 저장하세요. -->
<amp-state id="myAnimals">
  <script type="application/json">
    {
      "dog": {
        "imageUrl": "/img/dog.jpg",
        "style": "greenBackground"
      },
      "cat": {
        "imageUrl": "/img/cat.jpg",
        "style": "redBackground"
      }
    }
  </script>
</amp-state>

<p [text]="'This is a ' + currentAnimal + '.'">이것은 개입니다.</p>


<!-- [class]를 사용하여 CSS 클래스를 추가 또는 제거할 수도 있습니다. -->
<p class="greenBackground" [class]="myAnimals[currentAnimal].style">
  각 동물의 배경색이 다릅니다.
</p>

<!-- 또는 [src] 결합으로 이미지의 src를 변경하세요. -->
<amp-img width="300" height="200" src="/img/dog.jpg" [src]="myAnimals[currentAnimal].imageUrl">
</amp-img>

<button on="tap:AMP.setState({currentAnimal: 'cat')">'Cat'으로 설정</button>
```

  버튼을 누르면:

  1. **상태** 는 `'cat'`으로 정의된 `currentAnimal`로 업데이트됩니다.
  1. `currentAnimal`에 의존하는 **식** 이 평가됩니다.

    * `'This is a ' + currentAnimal + '.'` =&gt; `'This is a cat.'`
    * `myAnimals[currentAnimal].style` =&gt; `'redBackground'`
    * `myAnimals[currentAnimal].imageUrl` =&gt;  `/img/cat.jpg`</li>

  1. 변경된 식에 의존하는 **결합** 이 업데이트됩니다.

    * 첫 번째 `<p>` 요소의 텍스트에는 "This is a cat."이 표시됩니다.
    * 두 번째 `<p>` 요소의 `class` 속성은 "redBackground"가 됩니다.
    * `amp-img` 요소는 고양이의 이미지를 보여줍니다.</li>

  [tip type="success"]
코드 주석을 사용하여 이 예의 [**라이브 데모**를 시험해보세요](https://ampbyexample.com/components/amp-bind/)!
[/tip]

# 세부정보 <a name="details"></a>

# 상태 <a name="state"></a>

`amp-bind`를 사용하는 각 AMP 문서에는 문서 범위의 변경 가능한 JSON 데이터 또는 **상태** 가 있습니다.

# `amp-state`로 상태 초기화 <a name="initializing-state-with-amp-state"></a>

`amp-bind`의 상태는 `amp-state` 구성요소로 초기화할 수 있습니다.

```html
<amp-state id="myState">
  <script type="application/json">
    {
      "foo": "bar"
      }
  </script>
</amp-state>
```

[식](#expressions)은 도트 구문을 통해 상태 변수를 참조할 수 있습니다. 이 예에서 `myState.foo`는 `"bar"`로 평가됩니다.

* `<amp-state>` 요소의 하위 JSON은 최대 크기가 100KB입니다.
* `<amp-state>` 요소는 하위 JSON 스크립트 대신 CORS URL을 지정할 수도 있습니다. 자세한 내용은 [부록](#amp-state-specification)을 참조하세요.

# 상태 새로 고침 <a name="refreshing-state"></a>

`refresh` 작업은 이 구성요소에서 지원되며 상태의 내용을 새로 고치는 데 사용할 수 있습니다.

```html
<amp-state id="amp-state" ...></amp-state>
<!-- 버튼을 클릭하면 amp-state의 json에 대한 새로고침 및 다시 가져오기가 수행됩니다. -->
<button on="tap:amp-state.refresh"></button>
```

# `AMP.setState()`로 상태 업데이트 <a name="updating-state-with-ampsetstate"></a>

[`AMP.setState()`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md#target-amp) 작업은 개체 리터럴을 상태로 병합합니다. 예를 들어, 아래의 버튼을 누르면 `AMP.setState()`는 개체 리터럴을 상태와 [심층 병합](#deep-merge-with-ampsetstate)합니다.

```html
<!-- 자바스크립트와 마찬가지로 개체 리터럴
      값에서 기존 변수를 참조할 수 있습니다. -->
 <button on="tap:AMP.setState({foo: 'bar', baz: myAmpState.someVariable})"></button>
```
일반적으로 중첩된 개체는 최대 깊이 10까지 병합됩니다. `amp-state`에 의해 추가된 변수를 포함하여 모든 변수를 재정의할 수 있습니다.

특정 이벤트에 의해 트리거되면 `AMP.setState()`는 `event` 속성에 대한 이벤트 관련 데이터에 액세스할 수 있습니다.

```html
<!-- 이 <input> 요소의 "change" 이벤트는 "event.value"를
      통해 참조할 수 있는 "value" 변수를 포함합니다. -->
<input type="range" on="change:AMP.setState({myRangeValue: event.value})">
  ```

# `AMP.pushState()`로 기록 수정 <a name="modifying-history-with-amppushstate"></a>

브라우저 기록 스택에 새 항목을 푸시한다는 점을 제외하면 [`AMP.pushState()`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md#target-amp) 작업은 `AMP.setState()`와 유사합니다. 이 기록 항목을 표시하면(예: 뒤로 이동) `AMP.pushState()`에 의해 설정된 변수의 이전 값이 복원됩니다.

예:
```html
<button on="tap:AMP.pushState({foo: '123'})">Set 'foo' to 123</button>
```

* 버튼을 누르면 변수 `foo`가 123으로 설정되고 새로운 기록 항목이 푸시됩니다.
* 뒤로 이동하면 `foo`가 이전 값인 'bar'로 복원됩니다(`AMP.setState({foo: 'bar'} 호출과 동일)`.

# 식 <a name="expressions"></a>

식은 자바스크립트와 비슷하지만 몇 가지 중요한 차이점이 있습니다.

# 자바스크립트와의 차이점 <a name="differences-from-javascript"></a>

* 식은 포함 문서의 [상태](#state)에만 액세스할 수 있습니다.
* 식은 `window` 또는 `document`와 같은 전역에 액세스하지 **않습니다**.
* [화이트리스트에 있는 함수](#allow-listed-functions) 및 연산자만 사용할 수 있습니다.
* 맞춤형 함수, 클래스 및 루프는 일반적으로 허용되지 않습니다. 화살표 함수는 매개변수로서 허용됩니다(예: `Array.prototype.map`).
* 정의되지 않은 변수 및 범위를 벗어난 배열-색인은 `undefined` 대신 `null`을 반환하거나 오류를 일으킵니다.
* 성능을 위해 현재 단일 식의 피연산자는 50개로 제한됩니다. 이 개수가 사용 사례로 불충분한 경우 [Google에 문의](https://github.com/ampproject/amphtml/issues/new)하세요.

식 문법과 구현의 전체 내용은 [bind-expr-impl.jison](https://github.com/ampproject/amphtml/blob/main/extensions/amp-bind/0.1/bind-expr-impl.jison) 및 [bind-expression.js](https://github.com/ampproject/amphtml/blob/main/extensions/amp-bind/0.1/bind-expression.js)에서 찾아볼 수 있습니다.

# 예 <a name="examples"></a>

다음은 모두 유효한 식입니다.

```javascript
1 + '1'           // 11
1 + (+'1')        // 2
!0                // true
null || 'default' // 'default'
```

# 화이트리스트에 있는 함수 <a name="allow-listed-functions"></a>

<table>
  <tr>
    <th>개체 유형 </th>
    <th>함수</th>
    <th>예</th>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods"><code>Array</code></a><sup>1</sup></td>
    <td class="col-thirty">
      <code>concat</code><br>
      <code>filter</code><br>
      <code>includes</code><br>
      <code>indexOf</code><br>
      <code>join</code><br>
      <code>lastIndexOf</code><br>
      <code>map</code><br>
      <code>reduce</code><br>
      <code>slice</code><br>
      <code>some</code><br>
      <code>sort</code>(제자리 아님)<br>
      <code>splice</code>(제자리 아님)<br>
    </td>
    <td>
      <pre>// [1, 2, 3] 반환.
          [3, 2, 1].sort()</pre>
        <pre>// [1, 3, 5] 반환.
            [1, 2, 3].map((x, i) =&gt; x + i)</pre>
          <pre>// 6 반환.
              [1, 2, 3].reduce((x, y) =&gt; x + y)</pre>
          </td>
        </tr>
        <tr>
          <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#Methods"><code>Number</code></a></td>
          <td>
            <code>toExponential</code><br>
            <code>toFixed</code><br>
            <code>toPrecision</code><br>
            <code>toString</code>
            <td>
            <pre>// 3 반환.
                (3.14).toFixed()</pre>
              <pre>// '3.14' 반환.
                  (3.14).toString()</pre>
              </td>
            </tr>
            <tr>
              <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Methods"><code>String</code></a></td>
              <td>
                <code>charAt</code><br>
                <code>charCodeAt</code><br>
                <code>concat</code><br>
                <code>indexOf</code><br>
                <code>lastIndexOf</code><br>
                <code>slice</code><br>
                <code>split</code><br>
                <code>substr</code><br>
                <code>substring</code><br>
                <code>toLowerCase</code><br>
                <code>toUpperCase</code></td>
                <td>
                  <pre>// 'abcdef' 반환.
                      abc'.concat('def')</pre>
                  </td>
                </tr>
                <tr>
                  <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math"><code>Math</code></a><sup>2</sup></td>
                  <td>
                    <code>abs</code><br>
                    <code>ceil</code><br>
                    <code>floor</code><br>
                    <code>max</code><br>
                    <code>min</code><br>
                    <code>random</code><br>
                    <code>round</code><br>
                    <code>sign</code></td>
                    <td>
                      <pre>// 1 반환.
                          abs(-1)</pre>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object"><code>Object</code></a><sup>2</sup></td>
                      <td>
                        <code>keys</code><br>
                        <code>values</code>
                        <td>
                        <pre>// ['a', 'b'] 반환.
                            keys({a: 1, b: 2})</pre>
                          <pre>// [1, 2] 반환.
                              values({a: 1, b: 2}</pre>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects"><code>Global</code></a><sup>2</sup>
                          </td>
                          <td>
                            <code>encodeURI</code><br>
                            <code>encodeURIComponent</code>
                          </td>
                          <td>
                            <pre>// 'Hello%20world' 반환.
                                encodeURIComponent('Hello world')</pre>
                            </td>
                          </tr>
                        </table>

<sup>1</sup>단일 매개변수 화살표 함수에는 괄호를 사용할 수 없습니다. 예를 들어 `(x) => x + 1` 대신 `x => x + 1`을 사용하세요. 또한 `sort()` 및 `splice()`는 제자리에서 연산되는 대신 수정된 사본을 반환합니다.

<sup>2</sup>상태 함수에는 네임스페이스가 없습니다. 예를 들어 `Math.abs(-1)` 대신 `abs(-1)`을 사용하세요.

# `amp-bind-macro`로 매크로 정의 <a name="defining-macros-with-amp-bind-macro"></a>

`amp-bind-macro`를 정의하면 `amp-bind` 식의 부분들을 재사용할 수 있습니다. `amp-bind-macro` 요소를 사용하면 0개 이상의 인수를 사용하고 현재 상태를 참조하는 식을 정의할 수 있습니다. 문서의 어디서나 `id` 속성 값을 참조하여 매크로를 함수처럼 호출할 수 있습니다.

```html
<amp-bind-macro id="circleArea" arguments="radius" expression="3.14 * radius * radius"></amp-bind-macro>

<div>
  원의 면적은 <span [text]="circleArea(myCircle.radius)">0</span>입니다.
</div>

```

매크로는 또한 <i>먼저 정의된</i> 다른 매크로를 호출할 수 있습니다. 그러나 자신을 재귀적으로 호출할 수는 없습니다.

# 결합 <a name="bindings"></a>

**결합** 은 요소의 속성을 [식](#expressions)에 연결하는 `[property]` 양식의 특수한 속성입니다. `data-amp-bind-property` 양식의 XML 호환 구문을 대안으로 사용할 수도 있습니다.

**상태** 가 변경되면 식이 재평가되고, 결합된 요소의 속성이 새로운 식의 결과로 업데이트됩니다.

`amp-bind`는 네 가지 유형의 요소 상태에서 데이터 결합을 지원합니다.

<table>
  <tr>
    <th>유형</th>
    <th>속성</th>
    <th>세부정보</th>
  </tr>
  <tr>
    <td class="col-thirty"><a href="https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent"><code>Node.textContent</code></a></td>
    <td class="col-thirty"><code>[text]</code></td>
    <td>대부분의 텍스트 요소에서 지원됩니다.</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class">CSS 클래스</a></td>
    <td><code>[class]</code></td>
    <td>식 결과는 공백으로 구분된 문자열이어야 합니다.</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden"><code>hidden</code> 속성</a></td>
    <td><code>[hidden]</code></td>
    <td>부울 식이어야 합니다.</td>
  </tr>
  <tr>
    <td><a href="../../../documentation/components/index.html">AMP 요소</a>의 크기</td>
    <td><code>[width]</code><br><code>[height]</code></td>
    <td>AMP 요소의 너비 및/또는 높이를 변경합니다.</td>
  </tr>
  <tr>
    <td>요소별 속성</td>
    <td><a href="#element-specific-attributes">다양함</a></td>
    <td></td>
  </tr>
</table>

결합에 대한 참고 사항:

* 보안상의 이유로 `innerHTML`에 대한 결합은 허용되지 않습니다.
* 모든 속성 결합은 안전하지 않은 값(예: `javascript:`)에 대해 보안 확인이 수행됩니다.
* 부울 식 결과는 부울 속성을 전환합니다. 예: `<amp-video [controls]="expr"...>`. `expr`이 `true`로 평가되면 `<amp-video>` 요소는 `controls` 속성을 갖게 됩니다. `expr`이 `false`로 평가되면 `controls` 속성이 제거됩니다.
* 속성 이름의 대괄호 `[` 및 `]`는 XML(예: XHTML, JSX)을 작성하거나 DOM API를 통해 속성을 작성할 때 문제가 될 수 있습니다. 이 경우 `[x]="foo"` 대신 대체 구문 `data-amp-bind-x="foo"`를 사용하세요.

# 요소별 속성 <a name="element-specific-attributes"></a>

다음 구성요소 및 속성에 대한 결합만 허용됩니다.

<table>
  <tr>
    <th>구성요소</th>
    <th>속성</th>
    <th>동작</th>
  </tr>
  <tr>
    <td class="col-thirty"><code>&lt;amp-brightcove&gt;</code></td>
    <td class="col-fourty"><code>[data-account]</code><br><code>[data-embed]</code><br><code>[data-player]</code><br><code>[data-player-id]</code><br><code>[data-playlist-id]</code><br><code>[data-video-id]</code></td>
    <td class="col-thirty">표시된 Brightcove 동영상을 변경합니다.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-carousel type=slides&gt;</code></td>
    <td><code>[slide]</code><sup>*</sup></td>
    <td>현재 표시된 슬라이드 색인을 변경합니다. <a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">예를 참조하세요</a>.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-date-picker&gt;</code></td>
    <td>
      <code>[min]</code><br>
      <code>[max]</code>
    </td>
    <td>
      선택 가능한 가장 빠른 날짜를 설정합니다.<br>
      선택 가능한 가장 최근 날짜를 설정합니다.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-google-document-embed&gt;</code></td>
    <td><code>[src]</code><br><code>[title]</code></td>
    <td>업데이트된 URL에 문서를 표시합니다.<br>문서의 제목을 변경합니다.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-iframe&gt;</code></td>
    <td><code>[src]</code></td>
    <td>iframe의 소스 URL을 변경합니다.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-img&gt;</code></td>
    <td><code>[alt]</code><br><code>[attribution]</code><br><code>[src]</code><br><code>[srcset]</code></td>
    <td><code>[src]</code>에 결합할 때 캐시에서 결합이 작동하도록 하려면 <code>[srcset]</code>에도 결합해야 합니다.<br>해당하는 <a href="amp-img.md#attributes">amp-img 속성</a>을 참조하세요.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-lightbox&gt;</code></td>
    <td><code>[open]</code><sup>*</sup></td>
    <td>
      라이트박스의 표시를 전환합니다. 팁: 라이트박스가 닫힐 때 변수를 업데이트하려면 <code>on="lightboxClose: AMP.setState(...)"</code>를 사용하세요.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-list&gt;</code></td>
    <td><code>[src]</code></td>
    <td>
      식이 문자열이면 문자열 URL에서 JSON을 가져와서 렌더링합니다. 식이 개체 또는 배열이면 식 데이터를 렌더링합니다.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-selector&gt;</code></td>
    <td><code>[selected]</code><sup>*</sup><br><code>[disabled]</code></td>
    <td>현재 선택한 하위 요소(<br><code>option</code> 속성 값으로 식별된)를 변경합니다. 다중 선택을 위해 쉼표로 구분된 값 목록을 지원합니다. <a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">예를 참조하세요</a>.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-state&gt;</code></td>
    <td><code>[src]</code></td>
    <td>JSON을 새 URL에서 가져와서 기존 상태에 병합합니다. <em>다음 업데이트는 사이클을 방지하기 위해 <code>&lt;amp-state&gt;</code> 요소를 무시합니다.</em></td>
  </tr>
  <tr>
    <td><code>&lt;amp-video&gt;</code></td>
    <td><code>[alt]</code><br><code>[attribution]</code><br><code>[controls]</code><br><code>[loop]</code><br><code>[poster]</code><br><code>[preload]</code><br><code>[src]</code></td>
    <td>해당하는 <a href="amp-video.md#attributes">amp-video 속성</a>을 참조하세요.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-youtube&gt;</code></td>
    <td><code>[data-videoid]</code></td>
    <td>표시된 YouTube 동영상을 변경합니다.</td>
  </tr>
  <tr>
    <td><code>&lt;a&gt;</code></td>
    <td><code>[href]</code></td>
    <td>링크를 변경합니다.</td>
  </tr>
  <tr>
    <td><code>&lt;button&gt;</code></td>
    <td><code>[disabled]</code><br><code>[type]</code><br><code>[value]</code></td>
    <td>해당하는 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Attributes">button 속성</a>을 참조하세요.</td>
  </tr>
  <tr>
    <td><code>&lt;details&gt;</code></td>
    <td><code>[open]</code></td>
    <td>해당하는 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#Attributes">details 속성</a>을 참조하세요.</td>
  </tr>
  <tr>
    <td><code>&lt;fieldset&gt;</code></td>
    <td><code>[disabled]</code></td>
    <td>fieldset를 사용하거나 사용하지 않도록 설정합니다.</td>
  </tr>
  <tr>
    <td><code>&lt;image&gt;</code></td>
    <td><code>[xlink:href]</code><br>
      <td> 해당하는 <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image">image 속성</a>을 참조하세요.</td>
    </tr>
    <tr>
      <td><code>&lt;input&gt;</code></td>
      <td><code>[accept]</code><br><code>[accessKey]</code><br><code>[autocomplete]</code><br><code>[checked]</code><br><code>[disabled]</code><br><code>[height]</code><br><code>[inputmode]</code><br><code>[max]</code><br><code>[maxlength]</code><br><code>[min]</code><br><code>[minlength]</code><br><code>[multiple]</code><br><code>[pattern]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[selectiondirection]</code><br><code>[size]</code><br><code>[spellcheck]</code><br><code>[step]</code><br><code>[type]</code><br><code>[value]</code><br><code>[width]</code></td>
      <td>해당하는 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes">input 속성</a>을 참조하세요.</td>
    </tr>
    <tr>
      <td><code>&lt;option&gt;</code></td>
      <td><code>[disabled]</code><br><code>[label]</code><br><code>[selected]</code><br><code>[value]</code></td>
      <td>해당하는 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option#Attributes">option 속성</a>을 참조하세요.</td>
    </tr>
    <tr>
      <td><code>&lt;optgroup&gt;</code></td>
      <td><code>[disabled]</code><br><code>[label]</code></td>
      <td>해당하는 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup#Attributes">optgroup 속성</a>을 참조하세요.</td>
    </tr>
    <tr>
      <td><code>&lt;select&gt;</code></td>
      <td><code>[autofocus]</code><br><code>[disabled]</code><br><code>[multiple]</code><br><code>[required]</code><br><code>[size]</code></td>
      <td>해당하는 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#Attributes">select 속성</a>을 참조하세요.</td>
    </tr>
    <tr>
      <td><code>&lt;source&gt;</code></td>
      <td><code>[src]</code><br><code>[type]</code></td>
      <td>해당하는 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#Attributes">source 속성</a>을 참조하세요.</td>
    </tr>
    <tr>
      <td><code>&lt;track&gt;</code></td>
      <td><code>[label]</code><br><code>[src]</code><br><code>[srclang]</code></td>
      <td>해당하는 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track#Attributes">track 속성</a>을 참조하세요.</td>
    </tr>
    <tr>
      <td><code>&lt;textarea&gt;</code></td>
      <td><code>[autocomplete]</code><br><code>[autofocus]</code><br><code>[cols]</code><br><code>[disabled]</code><br><code>[maxlength]</code><br><code>[minlength]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[rows]</code><br><code>[selectiondirection]</code><br><code>[selectionend]</code><br><code>[selectionstart]</code><br><code>[spellcheck]</code><br><code>[wrap]</code></td>
      <td>해당하는 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#Attributes">textarea 속성</a>을 참조하세요.</td>
    </tr>
  </table>

  <sup>*</sup>결합할 수 없는 대상이 없는 결합 가능한 속성을 나타냅니다.

# 디버깅 <a name="debugging"></a>

개발 중 경고 및 오류를 강조 표시하고 특수 디버깅 기능에 액세스하려면 개발 모드(URL에 `#development=1` 포함)에서 테스트합니다.

# 경고 <a name="warnings"></a>

개발 모드에서, 결합된 속성의 기본값이 해당하는 식의 초기 결과와 일치하지 않으면 `amp-bind`는 경고를 표시합니다. 이는 다른 상태 변수의 변경에 따른 의도하지 않은 변형의 발생을 방지하는 데 도움이 될 수 있습니다. 예:

```html
<!-- 요소의 기본 클래스 값('def')이 [class] ('abc')의 식 결과와 일치하지 않으므로 개발 모드에서 경고가 발생합니다. -->
<p class="def" [class]="'abc'"></p>
```

개발 모드에서, 정의되지 않은 변수 또는 속성을 역참조할 경우에도 `amp-bind`는 경고를 표시합니다. 이것 또한 `null` 식 결과에 따른 의도하지 않은 변형의 발생을 방지하는 데 도움이 될 수 있습니다. 예:

```html
<amp-state id="myAmpState">
  <script type="application/json">
    { "foo": 123 }
</script>
</amp-state></p>

<!-- amp-state#myAmpState에 `bar` 변수가 없으므로 개발 모드에서 경고가 발생합니다. -->
<p [text]="myAmpState.bar">일부 자리표시자 텍스트.</p>
```

# 오류 <a name="errors"></a>

`amp-bind`로 작업할 때 발생할 수 있는 몇 가지 유형의 런타임 오류가 있습니다.

<table>
  <tr>
    <th>유형</th>
    <th>메시지</th>
    <th>제안</th>
  </tr>
  <tr>
    <td class="col-thirty">잘못된 결합</td>
    <td class="col-fourty"><em>&lt;P>의 [someBogusAttribute]에 대한 결합은 허용되지 않습니다</em>.</td>
    <td class="col-thirty"><a href="#element-specific-attributes">화이트리스트에 있는 결합</a>만 사용합니다.</td>
  </tr>
  <tr>
    <td>구문 오류</td>
    <td><em>...에 식 컴파일 오류</em></td>
    <td>식에 오타가 있는지 확인합니다.</td>
  </tr>
  <tr>
    <td>화이트리스트에 없는 기능</td>
    <td><em>경고는 지원되는 기능이 아닙니다.</em></td>
    <td><a href="#allow-listed-functions">화이트리스트에 있는 기능</a>만 사용합니다.</td>
  </tr>
  <tr>
    <td>검사를 거친 결과</td>
    <td><em>'javascript:alert(1)'은 [href]에 대한 유효한 결과가 아닙니다.</em></td>
    <td>AMP 유효성 검사 도구에서 실패할 식 또는 금지된 URL 프로토콜을 사용하지 않습니다.</td>
  </tr>
  <tr>
    <td>CSP 위반</td>
    <td><em>다음과 같은 콘텐츠 보안 정책 지침을 위반했기 때문에 'blob:...'에서 작업자 생성이 거부되었습니다...</em></td>
    <td><code>default-src blob:</code>을 원본의 콘텐츠 보안 정책에 추가합니다. 성능 보장을 위해 <code>amp-bind</code>는 값비싼 작업을 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#Dedicated_workers">전담 웹 작업자</a>에게 위임합니다.</td>
  </tr>
</table>

# 디버깅 상태 <a name="debugging-state"></a>

현재 상태를 콘솔에 인쇄하려면 `AMP.printState()`를 사용합니다.

# 부록 <a name="appendix"></a>

# `<amp-state>` 사양 <a name="amp-state-specification"></a>

`amp-state`에는 하위 `<script>` 요소 **또는** 원격 JSON 엔드포인트에 대한 CORS URL을 포함하는 `src` 속성을 포함할 수 있지만, 둘을 모두 포함할 수는 없습니다.

```html
<amp-state id="myLocalState">
  <script type="application/json">
    {
      "foo": "bar"
      }
  </script>
</amp-state>

<amp-state id="myRemoteState" src="https://data.com/articles.json">
</amp-state>
```

# XHR 배치 <a name="xhr-batching"></a>

AMP는 여러 JSON 엔드포인트에 대해 XMLHttpRequest(XHR)를 배치 처리합니다. 즉, AMP 페이지에서 여러 소비자(예: 여러 `amp-state` 요소)에 대해 데이터 소스로 단일 JSON 데이터 요청을 사용할 수 있습니다.  예를 들어 `amp-state` 요소가 엔드포인트에 대해 XHR을 만드는 경우 XHR이 실행 중인 동안에는 동일한 엔드포인트에 대한 모든 후속 XHR이 트리거되지 않으며 대신 첫 번째 XHR에서 결과가 반환됩니다.

# 속성 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>이 <code>amp-state</code>를 업데이트할 JSON을 반환하는 원격 엔드포인트의 URL. CORS HTTP 서비스여야 합니다.
      <code>src</code> 속성은 모든 표준 URL 변수 대체를 허용합니다. 자세한 정보는 <a href="https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md">대체 가이드</a>를 참조하세요.
          [tip type="important"]
        엔드포인트는 <a href="../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md">AMP의 CORS 요청</a> 사양에 지정된 요구사항을 구현해야 합니다.
        [/tip]</td>
    </tr>
    <tr>
      <td width="40%"><strong>credentials(선택사항)</strong></td>
      <td><a href="https://fetch.spec.whatwg.org/">Fetch API에</a> 지정된 대로 <code>credentials</code> 옵션을 정의합니다.
        <ul>
          <li>지원 값: `omit`, `include`</li>
          <li>기본값: `omit`</li>
        </ul>
        사용자 인증 정보를 보내려면 <code>include</code>의 값을 전달하세요. 이 값이 설정된 경우 응답에서는 <a href="../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp">AMP CORS 보안 지침</a>을 따라야 합니다.</td>
      </tr>
    </table>

# `AMP.setState()`를 이용한 심층 병합 <a name="deep-merge-with-ampsetstate"></a>

`AMP.setState()`가 호출되면 `amp-bind`는 제공된 개체 리터럴을 현재 상태와 심층 병합합니다. 개체 리터럴의 모든 변수는 재귀적으로 병합되는 중첩된 개체를 제외하고 상태에 직접 기록됩니다. 상태의 프리미티브와 배열을 개체 리터럴에 있는 동일한 이름의 변수가 항상 덮어씁니다.

다음 예를 참조하세요.

```javascript
{
  <!-- 상태는 비어 있음 -->
  }
```

```html
<button on="tap:AMP.setState({employee: {name: 'John Smith', age: 47, vehicle: 'Car'}})"...></button>
<button on="tap:AMP.setState({employee: {age: 64}})"...></button>
```

첫 번째 버튼을 누르면 상태가 다음과 같이 변경됩니다.

```javascript
{
  employee: {
    name: 'John Smith',
    age: 47,
    vehicle: 'Car',
    }
  }
```

두 번째 버튼을 누르면 `amp-bind`는 개체 리터럴 인수 `{employee: {age: 64}}`를 기존 상태에 병합합니다.

```javascript
{
  employee: {
    name: 'John Smith',
    age: 64,
    vehicle: 'Car',
    }
  }
```

`employee.age`는 업데이트되었지만 `employee.name` 및 `employee.vehicle` 키는 변경되지 않았습니다.

순환 참조가 포함된 개체 리터럴과 함께 `AMP.setState()`를 호출하면 `amp-bind`에서 오류가 발생합니다.

# 변수 제거 <a name="circular-references"></a>

`AMP.setState()`에서 값을 `null` 로 설정하여 기존 상태 변수를 제거합니다. 이전 예제의 상태에서 시작하여 다음을 누릅니다.

```html
<button on="tap:AMP.setState({employee: {vehicle: null}})"...></button>
```

상태가 다음으로 변경됩니다.

```javascript
{
  employee: {
    name: 'John Smith',
    age: 48,
    }
  }
```

마찬가지로:

```html
<button on="tap:AMP.setState({employee: null})"...></button>
```

상태가 다음으로 변경됩니다.

```javascript
{
  <!-- 상태는 비어 있음 -->
  }
```

# 식 문법 <a name="expression-grammar"></a>

`amp-bind` 식에 대한 BNF와 유사한 문법:

```text
expr:
    operation
  | invocation
  | member_access
  | '(' expr ')'
  | variable
  | literal

operation:
    '!' expr
  | '-' expr
  | '+' expr
  | expr '+' expr
  | expr '-' expr
  | expr '*' expr
  | expr '/' expr
  | expr '%' expr
  | expr '&&' expr
  | expr '||' expr
  | expr '<=' expr
  | expr '<' expr
  | expr '>=' expr
  | expr '>' expr
  | expr '!=' expr
  | expr '==' expr
  | expr '?' expr ':' expr

invocation:
    expr '.' NAME args

args:
    '(' ')'
  | '(' array ')'
  ;

member_access:
    expr member
  ;

member:
    '.' NAME
  | '[' expr ']'

variable:
    NAME
  ;

literal:
    STRING
  | NUMBER
  | TRUE
  | FALSE
  | NULL
  | object_literal
  | array_literal

array_literal:
    '[' ']'
  | '[' array ']'

array:
    expr
  | array ',' expr

object_literal:
    '{' '}'
  | '{' object '}'

object:
    key_value
  | object ',' key_value

key_value:
  expr ':' expr
```
