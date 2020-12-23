---
"$title": CSS 애니메이션 및 트랜지션 트리거
"$order": '1'
description: 페이지의 CSS 애니메이션 트리거는 JavaScript로 지원되는 클래스 추가 및 제거에 의존합니다. toggleClass 액션을 사용하여 AMP 페이지의 동일한 동작을 수행할 수도 있습니다...
formats:
- websites
- ads
---

CSS 애니메이션은 웹 요소가 하나의 CSS 스타일 구성에서 다른 구성으로 전환하는 트랜지션을 지원합니다. 브라우저는 로드 시 정의된 애니메이션을 시작할 수 있지만 CSS 애니메이션을 트리거한 이벤트는 [클래스 추가 및 제거에 의존합니다](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations). AMP는 두 가지 애니메이션 유형을 모두 지원합니다.

정확한 시간 지정이 필요하지 않으며 크기가 작고 제한된 애니메이션에는 CSS를 사용하세요.

## CSS 및 키 프레임 정의

다음과 같은 방식으로 AMP에서 CSS를 정의할 수 있습니다.

[filter formats="websites, stories"]

- 문서 헤드의 `<style amp-custom>` 태그에서. 75,000 바이트 제한.
- 인라인 스타일. 인라인 스타일의 각 인스턴스는 1,000 바이트 제한이 있으며 인라인 스타일은 75,000 바이트 `<style amp-custom>` 제한에 포함.
- 문서 헤드의 `<style amp-keyframes>` 태그에서. 500,000 바이트 제한. 키 프레임 속성으로 한정.

[/filter]

[filter formats="ads"]

- 문서 헤드의 `<style amp-custom>` 태그. 20,000 바이트 제한.
- 인라인 스타일. 인라인 스타일의 각 인스턴스는 1,000 바이트 제한이 있으며 인라인 스타일은 20,000 바이트 `<style amp-custom>` 제한에 포함.
- 문서 헤드의 `<style amp-keyframes>` 태그에서. 500,000 바이트 제한. 키 프레임 속성에 한정됨.

[/filter]

[tip type="read-on"]AMP의 CSS 사용과 관련한 자세한 내용은 [스타일 및 레이아웃](../style_and_layout/index.md)을 참조하세요. [/tip]

[filter formats="websites, stories"] 페이지를 간결하고 빠르게 유지하기 위해 AMP는 `<amp style-custom>` 태그에서 CSS 크기를 75,000 바이트로 제한했습니다. 이를 사용하여 애니메이션 스타일을 정의할 수 있지만 `<amp style-keyframes>` 태그의 500,000 바이트 제한은 귀중한 사이트 스타일 리소스를 소모하지 않는 정교한 애니메이션을 허용합니다.[/filter]

[filter formats="ads"] 광고를 간결하고 빠르게 유지하기 위해 AMP는 `<amp style-custom>` 태그에서 CSS 크기를 20,000 바이트로 제한했습니다. 이를 사용하여 애니메이션 스타일을 정의할 수 있지만 `<amp style-keyframes>` 태그의 500,000 바이트 제한은 귀중한 사이트 스타일 리소스를 소모하지 않는 정교한 애니메이션을 허용합니다.[/filter]

```html
  <style amp-custom>
    div {
      width: 100px;
      height: 100px;
      background: red;
      position: relative;
      animation: mymove 5s infinite;
    }
  </style>
</head>
<body>

<div></div>
  <style amp-keyframes>
   @keyframes mymove {
      0%   {transform: translatey(0px);}
      25%  {transform: translatey(200px);}
      75%  {transform: translatey(50px);}
      100% {transform: translatey(100px);}
    }
  </style>
</body>
```

## 클래스 추가, 제거 및 전환

AMP 액션 `toggleClass`를 활용하면 정의된 요소에 클래스를 추가하거나 제거할 수 있습니다.

```js
elementName.toggleClass(class="className")
```

애니메이션 햄버거 메뉴와 같이 사용자 인터랙션을 허용할 동일한 요소에서 클래스를 전환할 수 있습니다.

```html
 <div id="hamburger" tabindex=1 role=button on="tap:hamburger.toggleClass(class='close')">
```

`force` 속성을 추가하면 `toggleClass` 액션이 다른 요소에 적용되거나 두 클래스 간 전환이 가능합니다.

```html
<button on="tap:magicBox.toggleClass(class='invisible', force=true),magicBox.toggleClass(class='visible', force=false)">
  Disappear
</button>
<button on="tap:magicBox.toggleClass(class='visible', force=true),magicBox.toggleClass(class='invisible', force=false)">
  Reappear
</button>
```

클래스를 제거하고 재적용을 허용하지 않으려는 경우 `false` 값의 `force` 속성을 추가합니다. 클래스를 추가하고 제거를 허용하지 않으려는 경우 `true` 값의 `force` 속성을 추가합니다.

## CSS 및 상태

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md)를 사용하여 상태가 지정된 CSS 클래스를 개수에 상관없이 추가 또는 제거할 수 있습니다.

[example preview="top-frame" playground="true"]
```html
<head>
  <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
  <style amp-custom>
    div {
      height: 100px;
      width: 100px;
      margin: 1em;
      background-color: green;
      margin-left: 100px;
      transition: 2s;
    }
    .visible {
      opacity: 1;
    }
    .invisible {
      opacity: 0;
    }
    .left {
      transform: translatex(-50px)
    }
    .right {
      transform: translatex(50px)
    }
    button {
      margin-top:  1rem;
      margin-left: 1rem;
    }
  </style>
</head>
<body>
  <amp-state id="magicBox">
    <script type="application/json">
      {
        "visibleBox": {
          "className": "visible"
        },
        "invisibleBox": {
          "className": "invisible"
        },
        "moveLeft": {
          "className": "left"
        },
        "moveRight": {
          "className": "right"
        }
      }
    </script>
  </amp-state>
  <div [class]="magicBox[animateBox].className"> </div>
  <button on="tap:AMP.setState({animateBox: 'invisibleBox'})">
    Disappear
  </button>
  <button on="tap:AMP.setState({animateBox: 'visibleBox'})">
    Reappear
  </button>
  <button on="tap:AMP.setState({animateBox: 'moveLeft'})">
    Move Left
  </button>
  <button on="tap:AMP.setState({animateBox: 'moveRight'})">
    Move Right
  </button>
</body>
```
[/example]

우선 문서 `head`의 `<style amp-custom>` 태그에 CSS 클래스 목록을 추가하여 여러 클래스 애니메이션을 정의합니다.

```css
    .visible {
      opacity: 1;
    }
    .invisible {
      opacity: 0;
    }
    .left {
      transform: translatex(-50px)
    }
    .right {
      transform: translatex(50px)
    }
```

다음으로 클래스와 상태의 페어를 설정합니다.

```html
<amp-state id="magicBox">
  <script type="application/json">
    {
      "visibleBox": {
        "className": "visible"
      },
      "invisibleBox": {
        "className": "invisible"
      },
      "moveLeft": {
        "className": "left"
      },
      "moveRight": {
        "className": "right"
      }
    }
  </script>
</amp-state>
```

요소와 클래스를 연결합니다.

```html
  <div [class]="magicBox[animateBox].className"> </div>
```

연결된 AMP 액션 또는 이벤트에서 상태가 변경됩니다. 다음 예시는 사용자 인터랙션의 상태를 변경합니다.

```html
<button on="tap:AMP.setState({animateBox: 'invisibleBox'})">
    Disappear
</button>
<button on="tap:AMP.setState({animateBox: 'visibleBox'})">
    Reappear
</button>
<button on="tap:AMP.setState({animateBox: 'moveLeft'})">
    Move Left
</button>
<button on="tap:AMP.setState({animateBox: 'moveRight'})">
  Move Right
</button>
```

이러한 방식으로 [`amp-bind`](../../../../documentation/components/reference/amp-bind.md)를 사용하면 정의된 클래스에 클래스를 명시적으로 설정합니다. 따라서 다른 클래스 제거 시 다시 명시할 필요가 없습니다.
