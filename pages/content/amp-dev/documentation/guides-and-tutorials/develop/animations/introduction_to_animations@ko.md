---
"$title": 복잡한 애니메이션 입문
"$order": '2'
description: 클래스 추가 및 제거로는 구동할 수 없는 애니메이션을 위해 AMP는 여러 애니메이션 전용 컴포넌트를 제공합니다. 이러한 컴포넌트는 AMP의 원리를 애니메이션에 적용하여...
formats:
- websites
- ads
author: CrystalOnScript
---

[클래스 추가 및 제거](triggering_css_animations.md)로는 구동할 수 없는 애니메이션을 위해 AMP는 여러 애니메이션 전용 컴포넌트를 제공합니다. 이러한 컴포넌트는 AMP의 원리를 애니메이션에 적용하여 빠르고 효율적이며 사용자 중심의 애니메이션을 지원합니다. AMP는 키 프레임 내에서 허용되는 CSS 속성을 제한하지만 세밀한 제어, 끊김 없는 애니메이션, 추가 작업이 필요 없는 크로스 브라우저 호환성 등의 장점이 있습니다.

재생 환경을 엄격하게 제어해야 하거나 동시에 여러 요소에 애니메이션을 적용하는 정확한 타이밍이 필요하다면 amp-animation을 사용해 보세요.

## 기본 AMP 애니메이션 제작

[`amp-animation`](../../../../documentation/components/reference/amp-animation.md) 컴포넌트를 통해 AMP에서 [웹 애니메이션 API](https://www.w3.org/TR/web-animations/)를 사용할 수 있습니다.

기본[`amp-animation`](../../../../documentation/components/reference/amp-animation.md)은 다음과 같은 주요 부분으로 구성된 JSON 객체입니다.

- 컴포넌트가 애니메이션을 적용하는 요소 또는 `selector`.
- [타이밍 속성](../../../../documentation/components/reference/amp-animation.md#timing-properties)
- [키 프레임](../../../../documentation/components/reference/amp-animation.md#keyframes)
- [트리거](../../../../documentation/components/reference/amp-animation.md#triggering-animation)

```
<amp-animation layout="nodisplay" id="exampleAnimation">
<script type="application/json">
{
 "selector": "#elementID", //select the element to animate
 "duration": "1s", //timing property
 "iterations": 2, //timing property
 "fill": "both", //timing property
 "keyframes": {"opacity": 0, "transform": "scale(2)"} //keyframes
}
</script>
</amp-animation>
<!-- trigger -->
<button on="tap:exampleAnimation.start">
```

### 선택자

CSS와 마찬가지로 [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) 컴포넌트는 `"selector"` 필드에서 요소의 태그 이름, 클래스 또는 ID를 선언하여 애니메이션 속성을 요소에 연결합니다. 컴포넌트는 선언된 태그 유형 또는 클래스 이름을 활용해 각 요소에 애니메이션을 적용합니다. 단일 요소에 애니메이션을 적용하려면 ID를 사용하세요.

### 타이밍 속성

[타이밍 속성](../../../../documentation/components/reference/amp-animation.md#timing-properties)은 애니메이션 소요 시간, 재생 시간 및 키 프레임 실행 방향을 제어합니다.

필수적인 타이밍 속성은 없지만 `duration` 및 `fill`처럼 시간이나 표시와 관련된 속성이 누락된 경우 애니메이션이 실행되지 않을 수 있습니다.

### 키 프레임

CSS를 사용하면 트랜지션을 통해 어떤 상태에서 다른 상태로 모핑할 수 있지만 [`amp-animation`](../../../../documentation/components/reference/amp-animation.md)을 구현하려면 애니메이션 속성을 키 프레임으로 선언해야 합니다([CSS 애니메이션](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)과 유사). 원활한 재생 및 크로스 브라우저 호환성을 보장하기 위해 [`amp-animation`](../../../../documentation/components/reference/amp-animation.md)은 레이아웃을 재실행하지 않고 [컴포지터 스레드](https://dev.chromium.org/developers/design-documents/compositor-thread-architecture)에서 애니메이션을 적용할 수 있는 GPU 가속 속성에 사용 가능한 [키 프레임 속성을 제한](../../../../documentation/components/reference/amp-animation.md#allow-listed-properties-for-keyframes)합니다. 이에 따라 애니메이션은 AMP 및 브라우저의 [렌더링 프로세스](https://developers.google.com/web/updates/2018/09/inside-browser-part3#javascript_can_block_the_parsing)를 방해하지 않습니다.

[tip type="note"] 키 프레임은 속성 제한 사항이 준수되는 한 [`amp-animation`](../../../../documentation/components/reference/amp-animation.md)에서 바로 정의되거나 [`<amp style-keyframe>`](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#keyframes-stylesheet)에서 참조됩니다. 자세한 내용은 [`amp-animation`의 키 프레임 설명](../../../../documentation/components/reference/amp-animation.md#keyframes)을 참조하세요. [/tip]

### 트리거

트리거는 애니메이션 시퀀스를 시작합니다. [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) 확장자는 `<body>`가 페이지에 표시되거나 [AMP 액션 또는 이벤트](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)에 연결되었을 시 시작됩니다.

`<body>` 가시성 트리거는 애니메이션이 "페이지 상단" 또는 페이지의 첫 번째 뷰포트에 표시되므로 페이지 로드 직후 애니메이션이 실행되어야 할 시 유용합니다. 애니메이션은 컴포넌트에 속성으로 `trigger="visibility"` 가시성을 트리거합니다.

```
<amp-animation layout="nodisplay"
    trigger="visibility">
  ...
</amp-animation>
```

[`amp-animation`](../../../../documentation/components/reference/amp-animation.md) 컴포넌트에 `id`를 할당하고 해당 `id`를 원하는 이벤트 트리거(예: 버튼 탭)에 연결하는 방식으로 애니메이션을 액션 또는 이벤트에 연결할 수 있습니다.

```
<amp-animation layout="nodisplay" id="exampleAnimation">
  ...
</amp-animation>

<button on="tap:exampleAnimation.start">
```

## 복잡한 애니메이션 제작

[`amp-animation`](../../../../documentation/components/reference/amp-animation.md)으로 애니메이션을 제작하면 애니메이션 시작 및 중지 기능 이상의 세밀한 제어가 가능합니다. 일시 중지, 역방향 재생 및 특정 지점으로 이동 등의 기능도 지원됩니다. 또한 여러 애니메이션을 연결하여 하나의 시퀀스로 요소에 애니메이션을 적용할 수 있습니다.

### 하위 대상

동일한 태그 또는 클래스의 요소는 지정된 타이밍 속성을 가질 수 있으며 최상위 애니메이션에 정의된 변수 값을 재정의할 수 있습니다.

[example preview="top-frame" playground="true" imports="amp-animation"]
```html
<body>
  <h1>Hello World!</h1>
  <h1>Hello World!</h1>
  <h1 id="helloMe">Hello World!</h1>
  <h1>Hello World!</h1>
  <amp-animation layout="nodisplay" id="animateThis">
    <script type="application/json">
      {
        "selector": "h1",
        "duration": "3s",
        "fill": "both",
        "keyframes": [{"transform": "translateX(0px)"}, {"transform": "translateX(50%)"}],
        "subtargets": [
          {
            "index": 1,
            "duration": "1s"
          },
          {
            "selector": "#helloMe",
            "direction": "reverse",
            "duration": "5s"
          }
        ]
      }
    </script>
  </amp-animation>
  <button on="tap:animateThis.start">
   start
  </button>
</body>
```
[/example]

### 연결된 애니메이션

여러 애니메이션을 연결하면 큰 시퀀스를 구성할 수 있습니다. [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) 컴포넌트의 `animations` 배열에서 애니메이션을 작성하여 동영상 오버레이와 같은 시간 제한 효과를 생성할 수 있습니다.

```
<amp-animation id="overlaysAnim" layout="nodisplay">
  <script type="application/json">
    {
      "duration": "3s",
      "fill": "both",
      "animations": [{
          "selector": ".one",
          "keyframes": [{
              "opacity": "1",
              "offset": 0
            },
            {
              "opacity": "1",
              "offset": 0.04
            },
            {
              "opacity": "0",
              "offset": 0.0401
            },
            {
              "opacity": "0",
              "offset": 1
            }
          ]
        },
      ]
    }
  </script>
</amp-animation>
```

이 설정은 시퀀스의 각 애니메이션을 3초간 재생합니다.

더 큰 애니메이션의 경우 `animations` 배열의 애니메이션이 다른 [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) 컴포넌트를 참조할 수 있습니다.

```
<amp-animation id="addEnergy" layout="nodisplay">
  <script type="application/json">
  {
    "duration": "0.3s",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": "#energy",
        "keyframes": [
          {"transform": "scaleX(calc(num(width('#energy'))/10))"},
          {"transform": "scaleX(calc(num(width('#energy'))/10 + 3))"}
        ]
      },
      {
        "animation": "atomExcite"
      }
    ]
  }
  </script>
</amp-animation>


<amp-animation id="atomExcite" layout="nodisplay" trigger="visibility">
<script type="application/json">
  {
    "duration": "0.3s",
    "iterations": "2",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": ".atom",
        "keyframes": {
          "transform": "translate(20vw)"
        }
      }
    ]
  }
  </script>
</amp-animation>
```

### 요소 개수를 알 수 없는 애니메이션

[`var()`, `calc()` 표현식](../../../../documentation/components/reference/amp-animation.md)을  [CSS 확장자](../../../../documentation/components/reference/amp-animation.md#css-extensions)와 함께 사용하면 여러 요소로 작동하는 복잡하고 시간 제한이 있는 애니메이션을 작성할 수 있습니다. 이러한 방식은 동적인 사용자 생성 데이터에 애니메이션을 간편하고 유연하게 적용할 수 있도록 지원합니다.

[example preview="top-frame" playground="true"]
```html
<head>
  <script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></script>
  <style amp-custom>
    .parent {
      perspective: 1000px;
      transform-style: preserve-3d;
      position: relative;
      margin: 10px;
      width: 239px;
      height: 335px;
    }
    .card {
      transform-origin: left;
      height: 50%;
      width: 50%;
    }
  </style>
</head>
<body>
  <amp-animation layout="nodisplay" id="cardAdmin">
    <script type="application/json">
      {
        "selector": ".card",
        "--duration": "2s",
        "duration": "var(--duration)",
        "delay": "calc((length() - index() - 1) * var(--duration))",
        "easing": "ease-in",
        "iterations": "1",
        "fill": "both",
        "keyframes": [
            {"transform": "translate3d(0px, 0px, 0px)"},
            {"transform": "translate3d(50%, 0px, 100px)"},
            {"transform": "translate3d(110%, 0px, 0px) rotateY(-20deg)"},
            {"transform": "translate3d(50%, 0px, -100px)"},
            {"transform": "translate3d(0px, 0px, -1px)"}
        ]
      }
    </script>
  </amp-animation>
  <div class="parent" on="tap:cardAdmin.start" tabindex=none role="animation">
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/7/70/3C.svg" layout="fill"></amp-img>
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/3/3a/3H.svg" layout="fill"></amp-img>
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/e/e1/KC.svg" layout="fill"></amp-img>
  </div>
</body>
```
[/example]

- 변수 및 `--duration` 선언 후 값을 2초로 지정.
- 변수의 `--duration` 값에 `duration` 설정.
- 선택자 `.card`가 사용된 각 요소에 적용된 지연 계산.
    1. [`length()` 확장자](../../../../documentation/components/reference/amp-animation.md#css-length()-extension)는 선택한 `.card` 요소 개수를 계산.
    2. 길이에서 각 `.card`의 [index()](../../../../documentation/components/reference/amp-animation.md#css-index()-extension) 빼기.
    3. 결과 값에 변수 `--duration` 곱하기.
    4. 최종 합은 해당 요소의 지연에 초 단위로 적용.
- 애니메이션은 각 요소에 개별적으로 적용되므로 카드는 동시에 모두 섞이는 대신 하나씩 차례대로 섞입니다.

이 동작을 검사하려면 AMP Playground에서 애니메이션을 열어 더 많은 [`amp-img`](../../../../documentation/components/reference/amp-img) 요소를 추가해 보세요.

### 어디서든 적절하게 표시

애니메이션에 [`conditions`](../../../../documentation/components/reference/amp-animation.md#conditions)를 포함하여 사용자 지정 효과를 적용할 수 있습니다. [`media` 조건](../../../../documentation/components/reference/amp-animation.md#media-query)을 통해 모든 화면 크기에 맞춰 애니메이션을 조정하고 [`switch` 문](../../../../documentation/components/reference/amp-animation.md#animation-switch-statement)의 [`supports` 조건](../../../../documentation/components/reference/amp-animation.md#supports-condition)을 활용하여 역방향 브라우저 호환성을 지원합니다.

[example preview="top-frame" playground="true"]
```html
<head>
 <style amp-custom>
    .drop {
      width: 20px;
      height: 20px;
      background: blue;
      margin-top: 1em;
      border-radius: 50%;
    }
    .right {
      position: absolute;
      right: 0;
      background: red;
    }
  </style>
  <script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></script>
</head>
<body>
<amp-animation id="mediaAnimation" layout="nodisplay">
  <script type="application/json">
    {
      "duration": "1s",
      "iterations": "4",
      "fill": "both",
      "direction": "alternate",
      "animations": [
        {
          "media": "(min-width: 300px)",
          "selector": ".drop",
          "keyframes": {
            "transform": "translate(100vw)"
          }
        },
        {
          "media": "(max-width: 300px)",
          "selector": ".drop",
          "keyframes": {
            "transform": "translate(50vw)"
          }
        },
        {
          "media": "(min-width: 300px)",
          "selector": ".right",
          "keyframes": {
            "transform": "translate(-100vw)"
          }
        },
        {
          "media": "(max-width: 300px)",
          "selector": ".right",
          "keyframes": {
            "transform": "translate(-50vw)"
          }
        }
      ]
    }
  </script>
</amp-animation>
    
  <div class="rain">
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
  </div>
  <button on="tap:mediaAnimation.start">Start</button>
</body>
```
[/example]
