---
$title: AMP 페이지에서 사용자 지정 JavaScript 활용하기
$order: 7
author: CrystalOnScript
contributors:
- fstanis
description: 다양한 사용자 지정 항목이 요구되는 웹 경험을 위해 AMP는 amp-script를 제작했습니다. 이 컴포넌트를 통해 AMP 페이지에서 페이지의 다른 성능에 영향을 미치지 않고도 임의의 JavaScript를 사용할 수 있습니다.
---

AMP는 향상된 기능 및 별도의 설정 없이 바로 지원되는 컴포넌트의 사용을 장려함으로써 웹 전반의 모든 사용자 경험을 지속적으로 개선하기 위해 노력하고 있습니다.

일부 웹 환경에서는 [`amp-bind`](../../../documentation/components/reference/amp-bind.md?format=websites)의 정적 바인딩 기능과 [`amp-list`](../../../documentation/components/reference/amp-list.md?format=websites), [`amp-mustache`](../../../documentation/components/reference/amp-mustache.md?format=websites)의 동적 데이터 검색 및 템플릿 기능을 넘어서는 다양한 사용자 지정 기능이 필요합니다. 이와 같은 일회성 사례를 처리하고자 AMP는 페이지의 전반적 성능에 영향을 미치지 않고도 임의의 JavaScript를 사용할 수 있는 컴포넌트인 [`<amp-script>`](../../../documentation/components/reference/amp-script.md?format=websites)를 제작했습니다.

# 사용자 지정 JavaScript 삽입

AMP 페이지는 `<amp-script>` 컴포넌트를 통해 사용자 지정 JavaScript를 지원하지 않습니다. 아래 예제는 URL로 로드된 JavaScript 파일과 함께 `amp-script` 컴포넌트를 사용하는 방법을 설명합니다.

```html
<!doctype html>
<html ⚡>
<head>
  ...
  <script async custom-element="amp-script" src="https://ampjs.org/v0/amp-script-0.1.js"></script>
<body>
  ...
  <amp-script layout="container" src="https://example.com/myfile.js">
    <p>Initial content that can be modified from JavaScript</p>
  </amp-script>
  ...
</body>
</html>
```

`<amp-script>` 컴포넌트에는 메인 페이지가 아닌 별도의 스레드에서 실행할 수 있는 [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)가 등록됩니다. 다음으로 [Worker DOM](https://github.com/ampproject/worker-dom)의 `amp-script`을 사용하여 Web Worker에 고유한 DOM 사본이 제공됩니다. 따라서 Web Worker는 변경 없이도 [React](https://reactjs.org/), [jQuery](https://jquery.com/)와 같은 JavaScript 라이브러리를 사용할 수 있습니다.

`amp-script` 컴포넌트는 Web Worker 스레드와 메인 스레드 간 메시지를 전송하므로 사용자가 메인 DOM에서 변경한 내용이 Web Worker의 가짜 DOM에 복제됩니다. 따라서 Web Worker는 메인 DOM에 반영된 가짜 DOM을 업데이트할 수 있습니다.

## 사용자 지정 스크립트 캐싱

[AMP 캐시](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md)는 AMP 컴포넌트 스크립트 지원 방식과 동일한 방식으로 `<amp-script>`에 삽입된 사용자 지정 JavaScript 파일도 지원합니다. 따라서 사용자 지정 JavaScript로 인해 AMP 문서의 속도가 저해되지 않습니다.

AMP 캐시는 JavaScript 파일을 프록시한 후 전송합니다. `<amp-script>`가 사용된 페이지에서도 사용자는 해당 컴포넌트가 포함되지 않는 페이지와 동일한 성능 경험을 예상할 수 있습니다.

# `<amp-script>` 사용

AMP 페이지가 지속적으로 빠르게 로드되고 원활한 UI를 제공할 수 있도록 `<amp-script>` 제한 사항이 존재합니다.

## 초기화

Web Worker 내부의 JavaScript는 로드 시 DOM 변경을 최소한으로 허용합니다. 해당 단계에서 허용되는 변경 사항은 다음과 같습니다.

- 이벤트 핸들러 등록.
- 필요한 프레임워크 허용을 위해 하나의 TextNode를 여러 TextNode로 분할.

`<amp-script>` 태그 내부의 DOM은 초기화 전후로 거의 동일해야 합니다.

예를 들어, 아래 코드부터 살펴보세요.

```html
<text> Hello world </text>
```

Worker DOM에서 사소한 구조 변경은 허용되지만 콘텐츠 변경은 허용되지 않습니다.

```html
 <text>Hello </text><text>world</text>
```

## DOM 조작

사용자 경험 및 보안상 사유로 `amp-script`는 DOM 조작 제한 사항을 강제로 적용합니다.

### 사용자 인터랙션

사용자가 `<amp-script>` 컴포넌트 내부에 감싸진 요소와 상호작용할 시 사용자 지정 JavaScript는 필요한 경우 신속하게 DOM 조작을 반환해야 합니다. 기본적으로 DOM 변경 사항은 초기 인터랙션 후 **1초 이내에** 허용됩니다. 단, 코드가 `fetch`를 통해 네트워크에서 데이터를 검색해야 할 경우는 예외입니다. 이런 경우, 응답이 사용자에게 반환된 후 **1초 이내**까지 DOM 변경 사항이 요청될 수 있습니다. 스크립트에서 허용 범위를 초과할 정도로 DOM을 변형할 경우 심각한 오류가 발생할 수 있으며 `<amp-script>` 컴포넌트가 Web Worker를 종료합니다. 종료된 `<amp-script>` 컴포넌트는 다시 실행되지 않습니다.

### 요청하지 않은 변경

`<amp-script>` 컴포넌트의 높이가 고정된 경우 DOM 조작에 사용자 요청되지 않습니다.

## 스크립트 크기

AMP는 각 페이지의 사용자 지정 JavaScript 크기를 150kB로 제한합니다. 이러한 제한은 해당 페이지의 모든 `<amp-script>` 컴포넌트에 동일하게 적용됩니다. 모든 외부 JavaScript 라이브러리는 개별 `<amp-script>` 컴포넌트로 가져와야 합니다.

## 범위

사용자 지정 JavaScript 파일이 상호작용하려는 모든 DOM 요소는 `<amp-script>` 컴포넌트 태그로 감싸져야 합니다. AMP 컴포넌트도 마찬가지입니다. `<amp-script>` 컴포넌트는 `document.body`를 문서의 `<body>` 요소가 아닌 `<amp-script>` 요소로 간주합니다.

다음 문서에서 `<amp-script>` 요소로 가져온 스크립트의 `document.body.appendChild(document.createElement('span'))`를 호출하려는 경우

```html
<body>
  <p>Hello!</p>
  <div>
    <amp-script layout="container" src="customjs.js">
    </amp-script>
  </div>
</body>
```

결과는 다음과 같습니다.

```html
<body>
  <p>Hello!</p>
  <div>
    <amp-script layout="container" src="customjs.js">
      <span></span>
    </amp-script>
  </div>
</body>
```

## 이벤트 트리거

이벤트 트리거는 모두 허용됩니다.

## API 제한<a name="api-restrictions"></a>

`<amp-script>`에서 일부 동기 메소드는 허용되지 않으며 [`Element.getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)와 같은 메소드로 대체됩니다. 그 이유는 Web Worker에서 `Element.getBoundingClientRect()`가 구현될 수 없기 때문이며 동기적 대안으로 `getBoundingClientRectAsync()`가 제공됩니다. `getBoundingClientRectAsync()`는 결과를 직접 반환하는 대신 [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)를 반환합니다.

WorkerDOM 지원 API를 확인하려면 [이 차트](https://github.com/ampproject/worker-dom/blob/main/web_compat_table.md)를 참조하세요.
