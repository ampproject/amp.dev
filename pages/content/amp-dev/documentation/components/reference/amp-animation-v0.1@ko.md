---
$title: amp-animation
$category@: presentation
teaser:
  text: 애니메이션을 정의하고 표시합니다.
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



애니메이션을 정의하고 실행합니다.

<table>
  <tr>
    <td width="40%"><strong>필수 스크립트</strong></td>
    <td><code>&lt;script async custom-element="amp-animation" src="https://ampjs.org/v0/amp-animation-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">지원되는 레이아웃</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>예</strong></td>
    <td><a href="https://github.com/ampproject/amphtml/blob/main/examples/animations.amp.html">animations.amp.html</a></td>
  </tr>
</table>


## 개요 <a name="overview"></a>

AMP 애니메이션은 [Web Animations API](https://www.w3.org/TR/web-animations/)를 사용하여 AMP 문서에서 애니메이션을 정의하고 실행합니다.

## 형식 <a name="format"></a>

`amp-animation` 요소는 이러한 애니메이션을 JSON 구조로 정의합니다.

### 최상위 애니메이션 사양 <a name="top-level-animation-specification"></a>

최상위 개체는 `animations` 배열로 정의된 임의의 수의 애니메이션 구성요소로 이루어진 전체 애니메이션 프로세스를 정의합니다.
`````html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  // Timing properties
  ...
  "animations": [
    {
      // Animation 1
    },
    ...
    {
      // Animation N
    }
  ]
}
</script>
</amp-animation>
```

### DOM에 배치 <a name="placement-in-dom"></a>

`<amp-animation>`은 `trigger="visibility"`인 경우 `<body>` 요소의 직접 하위 요소로서만 배치할 수 있습니다. `trigger`가 지정되어 있지 않고 애니메이션의 재생이 액션을 통해 프로그래밍 방식으로 제어되는 경우에는 DOM의 아무 곳에나 배치할 수 있습니다.

### 애니메이션 구성요소 <a name="animation-component"></a>

각 애니메이션 구성요소는 [키프레임 효과](https://www.w3.org/TR/web-animations/#dom-keyframeeffect-keyframeeffect)이며 다음으로 이루어져 있습니다.

- 선택기에서 참조하는 타겟 요소
- 조건: 미디어 쿼리 및 지원 조건
- 타이밍 속성
- 키프레임

```text
{
  "selector": "#target-id",
  // Conditions
  // Variables
  // Timing properties
  // Subtargets
  ...
  "keyframes": []
}
```

### 조건 <a name="conditions"></a>

조건은 이 애니메이션 구성요소가 최종 애니메이션에 포함되는지 여부를 지정할 수 있습니다.

#### 미디어 쿼리 <a name="media-query"></a>

미디어 쿼리는 `media` 속성을 사용하여 지정할 수 있습니다. 이 속성은 [Window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API에 대해 허용되는 식을 포함할 수 있으며, `@media` CSS 규칙에 대응합니다.

애니메이션 구성요소에 대해 값이 지정된 경우, 미디어 쿼리가 현재 환경과 일치하는 경우에만 애니메이션 구성요소가 포함됩니다.

#### 지원 조건 <a name="supports-condition"></a>

`supports` 속성을 사용해 지원 조건을 지정할 수 있습니다. 이 속성은 [CSS.supports](https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports) API에 대해 허용되는 표현식을 포함할 수 있으며, `@supports` CSS 규칙에 대응합니다.

애니메이션 구성요소에 대해 값이 지정된 경우, 지원 조건이 현재 환경과 일치하는 경우에만 애니메이션 구성요소가 포함됩니다.

### 애니메이션 `switch` 문 <a name="animation-switch-statement"></a>

때로는 선택적 기본값이 있는 여러 [조건부 애니메이션](#conditions)을 단일 애니메이션으로 결합하는 것이 편리한 경우가 있습니다. 이렇게 하려면 다음 형식으로 `switch` 애니메이션 문을 사용하면 됩니다.

```
{
  // Optional selector, vars, timing
  ...
  "switch": [
    {
      "media": "(min-width: 320px)",
      "keyframes": {...},
    },
    {
      "supports": "offset-distance: 0",
      "keyframes": {...},
    },
    {
      // Optional default: no conditionals
    }
  ]
}
```

`switch` 애니메이션에서는 정의된 순서로 후보가 평가되며 [조건문](#conditions)과 일치하는 첫 번째 애니메이션이 실행되고 나머지는 무시됩니다.

예를 들어 다음 애니메이션은 지원되는 경우 모션 경로 애니메이션을 실행하고 전환을 위해 폴백합니다
```
{
  "selector": "#target1",
  "duration": "1s",
  "switch": [
    {
      "supports": "offset-distance: 0",
      "keyframes": {
        "offsetDistance": [0, '300px']
      }
    },
    {
      "keyframes": {
        "transform": [0, '300px']
      }
    }
  ]
}
```

### 변수 <a name="variables"></a>

애니메이션 구성요소는 `var()` 식을 통해 타이밍 및 키프레임 값에 사용될 CSS 변수를 선언할 수 있습니다. `var()` 표현식은 현재 타겟 컨텍스트를 사용하여 평가됩니다. 애니메이션 구성요소에 지정된 CSS 변수는 중첩된 애니메이션으로 전파되어 애니메이션 타겟에 적용되므로 최종 애니메이션에 사용되는 CSS 변수를 재정의합니다.

예:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  "--delay": "0.5s",
  "--x": "100px",
  "animations": [
    {
      "selector": "#target1",
      "delay": "var(--delay)",
      "--x": "150px",
      "keyframes": {"transform": "translate(var(--x), var(--y, 0px)"}
    },
    ...
  ]
}
</script>
</amp-animation>
```

이 샘플에서:

- `--delay`는 중첩된 애니메이션으로 전파되어 `#target1` 애니메이션의 지연으로 사용됩니다.
- `--x`는 중첩된 애니메이션으로 전파되지만 `#target1` 애니메이션에 의해 재정의되고 나중에 `transform` 속성에 사용됩니다.
- `--y`는 `<amp-animation>`에서 지정되지 않으므로 `#target1` 요소에서 쿼리됩니다. CSS에서도 정의되지 않은 경우 기본값은 `0px`입니다.

`var()`에 대한 자세한 내용은 [`var()` 및 `calc()` 섹션](#var-and-calc-expressions)을 참조하세요.

### 타이밍 속성 <a name="timing-properties"></a>

최상위 애니메이션 및 애니메이션 구성요소에는 타이밍 속성이 포함될 수 있습니다. 이러한 속성은 웹 애니메이션 사양의 [AnimationEffectTimingProperties](https://www.w3.org/TR/web-animations/#dictdef-animationeffecttimingproperties)에 자세히 정의되어 있습니다. 여기에서 허용되는 속성의 집합에는 다음이 포함됩니다.

<table>
  <tr>
    <th class="col-twenty">속성</th>
    <th class="col-twenty">유형</th>
    <th class="col-twenty">기본값</th>
    <th>설명</th>
  </tr>
  <tr>
    <td><code>duration</code></td>
    <td>시간</td>
    <td>0</td>
    <td>애니메이션 재생 기간. 밀리초 단위의 숫자 값 또는 '2s'와 같은 CSS 시간 값입니다.</td>
  </tr>
  <tr>
    <td><code>delay</code></td>
    <td>시간</td>
    <td>0</td>
    <td>애니메이션 실행이 시작되기 전 지연 시간. 밀리초 단위의 숫자 값 또는 '2s'와 같은 CSS 시간 값입니다.</td>
  </tr>
  <tr>
    <td><code>endDelay</code></td>
    <td>시간</td>
    <td>0</td>
    <td>애니메이션이 완료된 후 실제로 완료된 것으로 간주되기 전 지연 시간. 밀리초 단위의 숫자 값 또는 '2s'와 같은 CSS 시간 값입니다.</td>
  </tr>
  <tr>
    <td><code>iterations</code></td>
    <td>숫자 또는<br>'Infinity' 또는<br>'infinite'</td>
    <td>1</td>
    <td>애니메이션 효과가 반복되는 횟수.</td>
  </tr>
  <tr>
    <td><code>iterationStart</code></td>
    <td>숫자/CSS</td>
    <td>0</td>
    <td>효과가 애니메이션을 시작하는 시간 오프셋.</td>
  </tr>
  <tr>
    <td><code>easing</code></td>
    <td>문자열</td>
    <td>'linear'</td>
    <td>이징 효과를 위한 시간 조정에 사용되는 <a href="https://www.w3.org/TR/web-animations/#timing-function">타이밍 함수</a>.</td>
  </tr>
  <tr>
    <td><code>direction</code></td>
    <td>문자열</td>
    <td>'normal' </td>
    <td>'normal', 'reverse', 'alternate' 또는 'alternate-reverse' 중 하나.</td>
  </tr>
  <tr>
    <td><code>fill</code></td>
    <td>문자열</td>
    <td>'none'</td>
    <td>'none', 'forwards', 'backwards', 'both', 'auto' 중 하나.</td>
  </tr>
</table>

모든 타이밍 속성은 직접 숫자/문자열 값 또는 CSS 값을 허용합니다. 예를 들어, 'duration'은 `1000` 또는 `1s` 또는 `1000ms`로 지정할 수 있습니다. 또한 `calc()`, `var()` 및 기타 CSS 식도 사용할 수 있습니다.

JSON에 사용된 타이밍 속성의 예:
```text
{
  ...
  "duration": "1s",
  "delay": 100,
  "endDelay": "var(--end-delay, 10ms)",
  "easing": "ease-in",
  "fill": "both"
  ...
}
```

애니메이션 구성요소는 최상위 애니메이션에 지정된 타이밍 속성을 상속합니다.

### 하위 타겟 <a name="subtargets"></a>

`selector`를 지정할 수 있는 곳이면 어디나 `subtargets: []`도 지정할 수 있습니다. 하위 타겟은 색인 또는 CSS 선택기를 통해 표시된 특정 하위 타겟에 대해 애니메이션에 정의된 타이밍 속성 또는 변수를 재정의할 수 있습니다.

예:
```text
{
  "selector": ".target",
  "delay": 100,
  "--y": "100px",
  "subtargets": [
    {
      "index": 0,
      "delay": 200,
    },
    {
      "selector": ":nth-child(2n+1)",
      "--y": "200px"
    }
  ]
}
```

이 예에서는 기본적으로 '.target'과 일치하는 모든 타겟이 100ms 지연되며 '--y'는 100px입니다. 그러나 첫 번째 타겟(`index: 0`)은 200ms 지연되도록 재정의되며, 홀수 타겟은 200px의 '--y'가 되도록 재정의됩니다.

여러 하위 타겟이 하나의 타겟 요소와 일치할 수 있습니다.

### 키프레임 <a name="keyframes"></a>

키프레임은 웹 애니메이션 사양의 [키프레임 섹션](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument)에 설명된 여러 가지 방법으로 지정할 수 있으며, CSS에서 `@keyframes` 이름을 참조하는 문자열로서 지정할 수도 있습니다.

키프레임 정의의 몇 가지 일반적인 예는 다음과 같습니다.

약식 개체 양식인 'to' 형식은 100%에서 최종 상태를 지정합니다.
```text
{
  "keyframes": {"opacity": 0, "transform": "scale(2)"}
}
```

약식 개체 양식인 'from-to' 형식은 0과 100%에서 시작과 최종 상태를 지정합니다.
```text
{
  "keyframes": {
    "opacity": [1, 0],
  "transform": ["scale(1)", "scale(2)"]
}
}
```

약식 개체 양식인 'value-array' 형식은 시작, 최종 상태 및 여러(등간격) 오프셋에 대해 여러 값을 지정합니다.
```text
{
  "keyframes": {
    "opacity": [1, 0.1, 0],
  "transform": ["scale(1)", "scale(1.1)", "scale(2)"]
}
}
```

배열 양식은 키프레임을 지정합니다. 오프셋은 0, 100%에서 자동으로 할당되고, 그 사이에서는 균일한 간격을 갖게 됩니다.
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
  {"opacity": 0, "transform": "scale(2)"}
]
}
```

또한 배열 양식은 명시적으로 '오프셋'을 포함할 수 있습니다.
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
  {"offset": 0.1, "opacity": 0.1, "transform": "scale(2)"},
{"opacity": 0, "transform": "scale(3)"}
]
}
```

배열 양식은 'easing'도 포함할 수 있습니다.
```text
{
  "keyframes": [
    {"easing": "ease-out", "opacity": 1, "transform": "scale(1)"},
  {"opacity": 0, "transform": "scale(2)"}
]
}
```

추가 키프레임 형식은 [웹 애니메이션 사양](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument)을 참조하세요.

속성 값에는 `calc()`, `var()` 및 기타 CSS 식을 포함한 유효한 CSS 값을 사용할 수 있습니다.

#### CSS의 키프레임 <a name="keyframes-from-css"></a>

키프레임을 지정하는 또 다른 방법은 문서의 스타일시트(`&lt;style>` tag) 에서 `@keyframes` CSS 규칙으로 지정하는 것입니다. 예:
```html
<style amp-custom>
  @keyframes keyframes1 {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

<amp-animation layout="nodisplay">
<script type="application/json">
{
  "duration": "1s",
  "keyframes": "keyframes1"
}
</script>
</amp-animation>
```

CSS `@keyframes`는 [웹 애니메이션 사양](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument)에서 JSON에 나오는 인라인 키프레임 정의와 거의 동일합니다. 그러나 다음과 같이 몇 가지 작은 차이가 있습니다.

- 광역 플랫폼 지원의 경우 공급업체 접두어(예: `@-ms-keyframes {}` 또는 `-moz-transform`)가 필요할 수 있습니다. JSON 형식에서는 공급업체 접두어가 필요하지 않고 허용되지도 않지만, CSS에서는 필요할 수 있습니다.
- CSS에 키프레임이 지정되어 있는 경우 `calc()` 및 `var()`을 지원하지 않는 플랫폼은 `amp-animation` 폴리필을 활용하지 못할 수 있습니다. 따라서 CSS에 항상 대체 값을 포함하는 것이 좋습니다.
- [`width()`, `height()`, `num()`, `rand()`, `index()`, `length()`](#css-extensions) 등의 CSS 확장은 CSS에서 사용할 수 없습니다.

#### 키프레임에 대한 화이트리스트 속성 <a name="allow-listed-properties-for-keyframes"></a>

모든 CSS 속성을 키프레임에 사용할 수 있는 것은 아닙니다. 최신 브라우저가 신속하게 최적화 및 애니메이션할 수 있는 CSS 속성만 화이트리스트에 포함됩니다. 더 많은 속성이 우수한 성능을 제공하는 것으로 확인되면 이 목록도 커지게 될 것입니다. 현재 목록에 포함된 항목은 다음과 같습니다.
- [`opacity`](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity)
- [`transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
- [`visibility`](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility)
- [`offset-distance`](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-distance)

공급업체 접두사가 있는 CSS 속성의 사용은 필요하지 않거나 허용되지 않습니다.

### 애니메이션 구성의 간단한 양식 <a name="abbreviated-forms-of-animation-configuration"></a>

애니메이션에 단일 요소만 있고 단일 키프레임 효과로 충분하다면, 구성을 이 애니메이션 구성요소 하나만으로 줄일 수 있습니다. 예:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  "selector": "#target-id",
  "duration": "1s",
  "keyframes": {"opacity": 1}
}
</script>
</amp-animation>
```

애니메이션이 구성요소 목록으로 구성되어 있지만 최상위 애니메이션이 없는 경우, 구성을 구성요소의 배열로 줄일 수 있습니다. 예:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
[
  {
    "selector": ".target-class",
    "duration": 1000,
    "keyframes": {"opacity": 1}
  },
  {
    "selector": ".target-class",
    "duration": 600,
    "delay": 400,
    "keyframes": {"transform": "scale(2)"}
  }
]
</script>
</amp-animation>
```

### 애니메이션 구성 <a name="animation-composition"></a>

애니메이션은 다른 애니메이션을 참조하여 여러 `amp-animation` 선언을 하나의 최종 애니메이션으로 결합할 수 있습니다. 다른 애니메이션에서 애니메이션을 참조하는 것은 중첩과 거의 같습니다. 애니메이션을 여러 요소로 나누고자 하는 이유는 여러 장소에서 같은 애니메이션을 재사용하거나 단순히 각 애니메이션 선언을 좀 더 작고 관리하기 쉽게 만들기 위한 것입니다.

예:
```html
<amp-animation id="anim1" layout="nodisplay">
<script type="application/json">
{
  "animation": "anim2",
  "duration": 1000,
  "--scale": 2
}
</script>
</amp-animation>

<amp-animation id="anim2" layout="nodisplay">
<script type="application/json">
{
  "selector": ".target-class",
  "keyframes": {"transform": "scale(var(--scale))"}
}
</script>
</amp-animation>
```

이 샘플 애니메이션은 'anim2' 애니메이션을 'anim1'의 일부로 결합합니다. 'anim2'는 타겟(`selector`) 없이 포함됩니다. 이 경우 포함된 애니메이션은 자체 타겟을 참조할 것으로 예상됩니다.

또 다른 양식에서는 애니메이션을 포함하여 해당 타겟 또는 여러 타겟을 제공할 수 있습니다. 이 경우 포함된 애니메이션이 일치하는 각 타겟에 대해 실행됩니다. 예:
```html
<amp-animation id="anim1" layout="nodisplay">
<script type="application/json">
{
  "selector": ".target-class",
  "animation": "anim2",
  "duration": 1000,
  "--scale": 2
}
</script>
</amp-animation>

<amp-animation id="anim2" layout="nodisplay">
<script type="application/json">
{
  "keyframes": {"transform": "scale(var(--scale))"}
}
</script>
</amp-animation>
```

여기서 '.target-class'가 한 요소와 일치하든 여러 요소와 일치하든 또는 일치하는 요소가 없든, 'anim2'는 일치하는 각 타겟에 대해 실행됩니다.

호출자 애니메이션에 지정된 변수 및 타이밍 속성이 포함된 애니메이션으로 전달됩니다.

### `var()` 및 `calc()` 식 <a name="var-and-calc-expressions"></a>

`amp-animation`에서는 타이밍 및 키프레임 값에 `var()` 및 `calc()` 식을 사용할 수 있습니다.

예:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
[
  {
    "selector": ".target-class",
    "duration": "4s",
    "delay": "var(--delay)",
    "--y": "var(--other-y, 100px)",
    "keyframes": {"transform": "translate(calc(100vh + 20px), var(--y))"}
  }
]
</script>
</amp-animation>
```

`var()` 및 `calc()` 모두 이 둘을 직접 지원하지 않는 플랫폼에서 폴리필됩니다. `var()` 속성은 해당 타겟 요소에서 추출됩니다. 그러나 아쉽게도 `var()`을 완전히 폴리필하는 것은 불가능합니다. 따라서 호환성이 중요한 경우 `var()` 식에 기본값을 포함하는 것이 좋습니다. 예:
```html
  <amp-animation layout="nodisplay">
  <script type="application/json">
  [
    {
      "selector": ".target-class",
      "duration": "4s",
      "delay": "var(--delay, 100ms)",
    }
  ]
  </script>
  </amp-animation>
```

애니메이션 구성요소는 자체 변수를 `--var-name` 입력란으로 지정할 수 있습니다. 이러한 변수는 중첩된 애니메이션으로 전파되며 스타일시트(`&lt;style>` 태그)를 통해 지정된 타겟 요소의 변수를 재정의합니다. `var()` 식은 먼저 애니메이션에 지정된 변수 값을 확인한 다음 대상 스타일을 쿼리하여 확인을 시도합니다.

### CSS 확장 <a name="css-extensions"></a>

`amp-animation`은 `rand()`, `num()`, `width()`, `height()` 등 일반적인 애니메이션 요구에 맞게 몇 가지 CSS 확장을 제공합니다. 이러한 함수는 타이밍 및 키프레임 값을 포함하여 `amp-animation` 내에서 CSS 값을 사용할 수 있는 모든 곳에서 사용할 수 있습니다.

#### CSS `index()` 확장 <a name="css-index-extension"></a>

`index()` 함수는 애니메이션 효과에서 현재 타겟 요소의 색인을 반환합니다. 이 함수는 여러 타겟이 `selector` 속성을 사용하여 동일한 효과로 애니메이션될 때 가장 관련성이 있습니다. 선택기와 일치하는 첫 번째 타겟의 색인은 `0`, 두 번째의 색인은 `1`과 같은 방식으로 지정됩니다.

무엇보다 이 속성은 `calc()` 식과 결합하여 시차 효과를 만드는 데 사용할 수 있습니다. 예:
```
{
  "selector": ".class-x",
  "delay": "calc(200ms * index())"
  }
```

#### CSS `length()` 확장 <a name="css-length-extension"></a>

`length()` 함수는 애니메이션 효과에서 타겟 요소의 수를 반환합니다. `index()`와 결합할 때 가장 관련성이 있습니다.

```
{
  "selector": ".class-x",
  "delay": "calc(200ms * (length() - index()))"
  }
```

#### CSS `rand()` 확장 <a name="css-rand-extension"></a>

`rand()` 함수는 임의의 CSS 값을 반환합니다. 두 가지 양식이 있습니다.

인수가 없는 양식은 단순히 0과 1 사이의 임의의 숫자를 반환합니다.
```
{
  "delay": "calc(10s * rand())"
  }
```

두 번째 양식은 두 개의 인수를 가지고 있으며 이 두 인수 사이의 임의의 숫자를 반환합니다.
```
{
  "delay": "rand(5s, 10s)"
  }
```

#### CSS `width()` 및 `height()` 확장 <a name="css-width-and-height-extensions"></a>

`width()` 및 `height()` 확장은 애니메이션 요소 또는 선택기에서 지정한 요소의 너비/높이를 반환합니다. 반환된 값은 픽셀 단위입니다(예: `100px`).

다음과 같은 양식이 지원됩니다.

- `width()` 및 `height()` - 애니메이션 요소의 너비/높이.
- `width('.selector')` 및 `height('.selector')` - 선택기가 지정한 요소의 너비/높이. 어떤 CSS 선택기든 사용할 수 있습니다. 예: `width('#container &gt; li')`.
- `width(closest('.selector'))` 및 `height(closest('.selector'))` - 가장 가까운 선택기가 지정한 요소의 너비/높이.

`width()` 및 `height()`는 특히 변환에 유용합니다. `left`, `top`, 그리고 컨테이너 크기에 비례하여 애니메이션을 표현하기 위해 `%` 값을 사용할 수 있는 유사한 CSS 속성도 있습니다. 그러나 `transform` 속성은 `%` 값을 달리 해석합니다. 즉, 선택한 요소의 백분율로 해석합니다. 따라서 `width()` 및 `height()`는 컨테이너 요소 및 유사 요소와 관련하여 변환 애니메이션을 표현하는 데 사용할 수 있습니다.

이러한 함수는 `calc()`, `var()` 및 기타 CSS 식과 결합할 수 있습니다. 예:
```
{
  "transform": "translateX(calc(width('#container') + 10px))"
  }
```

#### CSS `num()` 확장 <a name="css-num-extension"></a>

`num()` 함수는 CSS 값을 숫자로 표현하여 반환합니다. 예:

- `num(11px)` yields `11`;
- `num(110ms)` yields `110`;
- etc.

예를 들어, 다음 식은 요소의 너비에 비례하여 초 단위로 지연을 계산합니다.
```
{
  "delay": "calc(1s * num(width()) / 100)"
  }
```

### SVG 애니메이션 <a name="svg-animations"></a>

SVG는 매우 멋진 형식이므로 애니메이션에 사용할 것을 권장합니다.

SVG 애니메이션은 [키프레임에 대한 화이트리스트 속성](#allow-listed-properties-for-keyframes)에서 설명한 것과 동일한 CSS 속성을 통해 지원되며, 다음과 같은 몇 가지 작은 차이가 있습니다.

* IE/Edge SVG 요소는 [CSS `transform` 속성을 지원하지 않습니다](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/1173754/). `transform` 애니메이션 자체는 폴리필됩니다. 그러나 스타일시트에 정의된 초기 상태는 적용되지 않습니다. 초기의 변환된 상태가 IE/Edge에 중요한 경우 [SVG `transform` 속성](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform)을 통해 복제하는 것이 좋습니다.
* `transform` CSS는 IE/Edge에 대해 폴리필되지만, 아쉽게도 `transform-origin`은 폴리필할 수 없습니다. 따라서 IE/Edge와의 호환성이 필요한 경우 기본 `transform-origin`만 사용하는 것이 좋습니다.
* 대부분의 브라우저는 현재 `transform-origin` CSS를 올바르게 해석하는 데 문제가 있습니다. [Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=740300), [Safari](https://bugs.webkit.org/show_bug.cgi?id=174285) 및 [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1379340)에 대한 문제를 참조하십시오. [CSS `transform-box`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-box)가 구현되면 이러한 혼란이 대부분 해결됩니다. `transform-origin`이 중요한 경우 향후 호환성을 위해 원하는 `transform-box` CSS를 포함하는 것이 좋습니다.

## 애니메이션 트리거 <a name="triggering-animation"></a>

애니메이션은 `trigger` 속성 또는 `on` 작업을 통해 트리거할 수 있습니다.

### `trigger` 속성 <a name="trigger-attribute"></a>

현재 `trigger` 속성에 대해 유일하게 사용 가능한 값은 `visibility`입니다. `visibility`는 기본 문서 또는 삽입 요소가 표시 영역에 나타날 때 트리거됩니다.

예:
```html
<amp-animation id="anim1" layout="nodisplay"
    trigger="visibility">
    ...
  </amp-animation>
```

### `on` 작업을 통해 트리거 <a name="triggering-via-on-action"></a>

예:

```html
<amp-animation id="anim1" layout="nodisplay">
  ...
</amp-animation>
<button on="tap:anim1.start">애니메이션</button>
```

## `on` 작업 <a name="on-actions"></a>

`amp-animation` 요소는 다음 작업을 내보냅니다.

* `start` - 아직 실행되고 있지 않은 경우 애니메이션을 시작합니다. 타이밍 속성 및 변수를 작업 인수로 지정할 수 있습니다. 예: `anim1.start(delay=-100, --scale=2)`.
* `restart` - 애니메이션을 시작하거나 현재 실행 중인 애니메이션을 다시 시작합니다. 타이밍 속성 및 변수를 작업 인수로 지정할 수 있습니다. 예: `anim1.start(delay=-100, --scale=2)`.
* `pause` - 현재 실행 중인 애니메이션을 일시중지합니다.
* `resume` - 현재 실행 중인 애니메이션을 다시 시작합니다.
* `togglePause` - 일시중지/다시 시작 작업을 전환합니다.
* `seekTo` - 애니메이션을 일시중지하고 `time` 인수에 지정된 시점(밀리초 단위) 또는 `percent` 인수에 지정된 시점(타임라인의 백분율)을 찾습니다.
* `reverse` - 애니메이션을 되돌립니다.
* `finish` - 애니메이션을 완료합니다.
* `cancel` - 애니메이션을 취소합니다.
