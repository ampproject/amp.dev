---
'$title': Use AMP as a data source for your PWA
$order: 1
description: AMP에 시간과 노력을 투자했지만 아직 프로그레시브 웹 앱을 만들지 않으셨나요? AMP 페이지를 통해 프로그레시브 웹 앱의 개발 과정을 크게 간소화할 수 있습니다.
formats:
  - websites
author: pbakaus
---

AMP에 시간과 노력을 투자했지만 아직 프로그레시브 웹 앱을 만들지 않으셨나요? AMP 페이지를 통해 프로그레시브 웹 앱의 개발 과정을 크게 간소화할 수 있습니다. 이 가이드에서는 프로그레시브 웹 앱 내에서 AMP를 사용하고, 기존 AMP 페이지를 데이터 소스로 사용하는 방법을 알아봅니다.

## JSON에서 AMP로

프로그레시브 웹 앱은 Ajax를 통해 JSON API에 연결되는 단일 페이지 애플리케이션인 경우가 가장 많습니다. 이 JSON API는 탐색을 구현하기 위한 데이터 세트 및 자료를 렌더링하기 위한 실제 콘텐츠를 반환합니다.

그런 다음 원시 콘텐츠를 사용 가능한 형태의 HTML로 변환하여 클라이언트에서 렌더링합니다. 그러나 이 과정은 비용이 많이 들 뿐 아니라 유지하기 어려운 경우가 많습니다. 대신 기존의 AMP 페이지를 콘텐츠 소스로 재사용할 수 있습니다. 무엇보다도 AMP를 사용하면 코드 몇 줄로 이 과정을 간단히 처리할 수 있습니다.

## 프로그레시브 웹 앱에 "그림자 AMP" 포함하기

첫 번째 단계는 프로그레시브 웹 앱에 "그림자 AMP"라는 특별한 버전의 AMP를 포함하는 것입니다. AMP 라이브러리는 최상위 페이지에서 로드되지만, 실제로 최상위 콘텐츠를 제어하지는 않습니다. AMP 라이브러리는 여러분이 지정한 페이지의 일부를 "AMP로 만들" 뿐입니다.

페이지 헤드에 그림자 AMP를 포함하는 방법은 다음과 같습니다.

[sourcecode:html]

<!-- Asynchronously load the AMP-with-Shadow-DOM runtime library. -->
<script async src="https://cdn.ampproject.org/shadow-v0.js"></script>

[/sourcecode]

### 그림자 AMP API를 사용할 준비가 되었는지 어떻게 알 수 있나요?

`async` 속성을 사용하여 그림자 AMP 라이브러리를 로드하는 것이 좋습니다. 이 경우 언제 라이브러리가 완전히 로드되고 사용할 준비가 되는지 이해하기 위해 특별한 접근방식을 사용해야 합니다.

전역 `AMP` 변수를 사용할 수 있는지, 그림자 AMP에서 이 변수 사용에 도움을 줄 수 있는 '[비동기 함수 로드 접근방식](http://mrcoles.com/blog/google-analytics-asynchronous-tracking-how-it-work/)'을 사용하는지 확인해야 합니다. 다음 코드를 살펴보세요.

[sourcecode:javascript]
(window.AMP = window.AMP || []).push(function(AMP) {
// AMP is now available.
});
[/sourcecode]

이 코드는 제대로 작동합니다. 또한 이 방식으로 추가된 콜백은 몇 개가 됐든지 AMP를 사용할 준비가 될 경우 제대로 실행될 것입니다. 그 이유는 무엇일까요?

이 코드의 의미는 다음과 같습니다.

1. "window.AMP가 존재하지 않는 경우, 그 위치에 들어갈 빈 배열을 만듭니다."
2. "다음으로 배열에 콜백 함수를 푸시합니다. 콜백 함수는 AMP를 사용할 준비가 되면 실행되어야 합니다."

이 코드가 작동하는 이유는 그림자 AMP 라이브러리가 실제로 로드될 때 `window.AMP`에 콜백 배열이 있다는 것을 인식하고 전체 대기열을 처리하기 때문입니다. 나중에 동일한 함수를 다시 실행해 보면 여전히 제대로 작동할 것입니다. 그림자 AMP와 콜백을 바로 실행하는 사용자 지정 <code>push</code> 메소드가 `window.AMP`를 대체하기 때문입니다.

[tip type="tip"] <strong>도움말 –</strong> 위의 코드 샘플을 실제로 사용할 수 있게 만들려면, 코드를 Promise에 넣고 AMP API 사용 전 항상 Promise를 사용하는 것이 좋습니다. [React 데모 코드](https://github.com/ampproject/amp-publisher-sample/blob/master/amp-pwa/src/components/amp-document/amp-document.js#L20)에서 예시를 확인하세요. [/tip]

## 프로그레시브 웹 앱의 탐색 처리하기

이 단계는 수동으로 구현해야 합니다. 탐색 컨셉에서 콘텐츠의 링크를 어떻게 제시할지는 여러분이 결정할 문제입니다. 여러 개의 목록으로, 아니면 여러 장의 카드로 제시해야 할까요?

일부 메타데이터와 함께 순서가 지정된 URL을 반환하는 JSON을 가져오는 경우가 가장 많습니다. 결국 사용자가 링크 중 하나를 클릭하면 실행되는 함수 콜백을 사용하고, 이 콜백에는 요청된 AMP 페이지의 URL이 포함되어 있어야 합니다. 이 작업이 완료되었다면 마지막 단계로 나아갈 준비가 끝난 것입니다.

## 그림자 AMP API를 사용해 인라인으로 페이지 렌더링하기

마지막으로 사용자가 어떤 작업을 완료한 후 콘텐츠를 표시하고 싶다면 관련 AMP 문서를 가져와 그림자 AMP가 페이지를 처리하도록 하는 것이 좋습니다. 우선 다음과 같이 페이지를 가져올 함수를 구현합니다.

[sourcecode:javascript]
function fetchDocument(url) {

// unfortunately fetch() does not support retrieving documents,
// so we have to resort to good old XMLHttpRequest.
var xhr = new XMLHttpRequest();

return new Promise(function(resolve, reject) {
xhr.open('GET', url, true);
xhr.responseType = 'document';
xhr.setRequestHeader('Accept', 'text/html');
xhr.onload = function() {
// .responseXML contains a ready-to-use Document object
resolve(xhr.responseXML);
};
xhr.send();
});
}
[/sourcecode]

[tip type="important"] <strong>중요 –</strong> 위의 코드 예제에서는 코드를 간소화하기 위해 오류 처리 과정을 건너뛰었습니다. 하지만 항상 오류를 찾아내고 적절히 처리해야 합니다. [/tip]

이제 사용할 준비가 끝난 `Document` 객체가 생겼으므로 AMP가 이를 넘겨받아 렌더링할 차례입니다. AMP 문서의 컨테이너 역할을 하는 DOM 요소를 참조한 후 다음과 같이 `AMP.attachShadowDoc()`을 호출합니다.

[sourcecode:javascript]
// This can be any DOM element
var container = document.getElementById('container');

// The AMP page you want to display
var url = "https://my-domain/amp/an-article.html";

// Use our fetchDocument method to get the doc
fetchDocument(url).then(function(doc) {
// Let AMP take over and render the page
var ampedDoc = AMP.attachShadowDoc(container, doc, url);
});
[/sourcecode]

[tip type="tip"] <strong>도움말 –</strong> 문서를 실제로 AMP에 넘기기 전에 헤더 및 푸터와 같이 AMP 페이지가 단독으로 표시될 때는 있어야 하지만 삽입 모드에서는 의미가 없는 페이지 요소를 삭제하는 것이 좋습니다. [/tip]

이제 끝났습니다. AMP 페이지가 전체 프로그레시브 웹 앱의 하위 항목으로 렌더링됩니다.

## 마무리하기

사용자는 프로그레시브 웹 앱 내에서 AMP 사이를 이동할 가능성이 높습니다. 따라서 이전에 렌더링한 AMP 페이지를 삭제할 때는 항상 다음과 같이 AMP에 해당 내용을 알려주세요.

[sourcecode:javascript]
// ampedDoc is the reference returned from AMP.attachShadowDoc
ampedDoc.close();
[/sourcecode]

이를 통해 이 문서를 더 이상 사용하지 않을 것이라고 AMP에 알리면 메모리 및 CPU의 오버헤드를 줄일 수 있습니다.

## 실제 작동 모습 확인하기

[video src="/static/img/docs/pwamp_react_demo.mp4" width="620" height="1100" loop="true", controls="true"]

Google에서 제작한 [React 샘플](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa)에서 "PWA에 삽입된 AMP"가 실제로 작동되는 모습을 확인할 수 있습니다. 이 샘플을 보면 탐색 중 전환이 부드럽게 이루어지는 것을 확인할 수 있으며, 위에서 설명한 단계가 포함된 간단한 React 컴포넌트도 함께 제공됩니다. 프로그레시브 웹 앱의 유연한 사용자 지정 JavaScript와 콘텐츠를 신속하게 로드하기 위한 AMP가 같이 사용되어 두 가지의 장점을 모두 활용할 수 있습니다.

- 소스 코드 받기: [https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa)
- npm을 통해 단독으로 React 컴포넌트 사용하기: [https://www.npmjs.com/package/react-amp-document](https://www.npmjs.com/package/react-amp-document)
- 실제 작동 모습 확인하기: [https://choumx.github.io/amp-pwa/](https://choumx.github.io/amp-pwa/)(휴대폰 또는 모바일 에뮬레이션에 가장 적합)

또한 Polymer 프레임워크를 사용한 PWA 및 AMP 샘플도 확인할 수 있습니다. 이 샘플에서는 [amp-viewer](https://github.com/PolymerLabs/amp-viewer/)를 사용하여 AMP 페이지를 삽입합니다.

- 코드 받기: [https://github.com/Polymer/news/tree/amp](https://github.com/Polymer/news/tree/amp)
- 실제 작동 모습 확인하기: [https://polymer-news-amp.appspot.com/](https://polymer-news-amp.appspot.com/)
