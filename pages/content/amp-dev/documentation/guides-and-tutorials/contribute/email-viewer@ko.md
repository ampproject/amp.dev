---
"$title": AMP 뷰어를 활용한 이메일 렌더링
"$order": '5'
author: alabiaga
formats:
- email
---

이메일용 AMP 지원을 고려하는 이메일 클라이언트라면 발신자의 AMP 이메일 호스팅에 [AMP 뷰어](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md)를 사용하는 것이 좋습니다. [AMP 뷰어 라이브러리](https://github.com/ampproject/amphtml/tree/master/extensions/amp-viewer-integration)로 빌드된 뷰어는 AMP 문서를 캡슐화하며 postMessage를 통해 AMP 문서와 양방향 통신을 지원하는 [기능](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/CAPABILITIES.md)을 제공합니다. 이러한 기능에는 이메일 가시성 제어 권한 부여, 사용자 메트릭 중계 및 이메일의 XHR 요청 안전성을 보장하는 수단 제공 등이 포함됩니다.

## 뷰어 XHR 인터셉션

AMP 뷰어 라이브러리의 `xhrInterceptor` 기능을 사용하면 뷰어에서 송신 XHR 요청을 인터셉트할 수 있습니다. AMP 뷰어는 유효성 및 목적에 대한 요청을 내부적으로 검사하여 사용자의 개인 정보를 안전하게 보호합니다.

#### XHR 요청

[`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) alc [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email) 등의 AMP 컴포넌트는 데이터 기록 및 검색을 위해 엔드포인트로 호출을 요청합니다. 이러한 호출은 XHR 요청으로 분류됩니다.

#### 뷰어 및 AMP 문서 통신

뷰어와 AMP 문서 간 통신에 사용된 프로토콜은 [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)를 통해 기록됩니다. 다음 코드는 XHR 인터셉션 사례에서 postMessage가 작동하는 간단한 예시입니다. 이때 뷰어는 AMP 문서에서 전송된 XHR postMessage를 처리하고 사용자 지정 응답을 반환합니다.

```js
// The viewer iframe that will host the amp doc.
viewerIframe = document.createElement('iframe');
viewerIframe.contentWindow.onMessage = (xhrRequestIntercepted) => {
   const blob = new Blob([JSON.stringify({body: 'hello'}, null, 2)], {type: 'application/json'});
   const response = new Reponse(blob, {status: 200});
   return response;
};
```

### XHR 인터셉션 허용

초기화 시 뷰어의 xhrInterceptor 옵션을 사용 설정하면 XHR 인터셉션이 허용됩니다. 작동 방식 및 XHR 인터셉션 사례를 확인하려면 뷰어 예제를 참조하세요. AMP 문서는 XHR 인터셉션 허용으로 설정되어야 합니다. `allow-xhr-interception` 속성을 `<html amp4email>` 태그에 추가하여 문서 허용을 설정할 수 있습니다. 이는 의도적으로 잘못된 속성이며 AMP 문서 유효성 검사 시 그렇게 표시될 것이므로 이메일 클라이언트는 렌더링 전 AMP 문서에 해당 속성을 설정해야 합니다.

```html
<!doctype html>
<html ⚡4email allow-xhr-interception>
  ...
</html>
```

## 뷰어 서버 측 템플릿 렌더링

`viewerRenderTemplate` 기능을 사용하면 뷰어에서 [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) 및[`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email) 템플릿 렌더링을 관리할 수 있습니다. 이 기능을 사용하도록 설정하면 AMP 런타임은 기존 XHR 호출, 템플릿 데이터 및 뷰어에 컴포넌트 콘텐츠를 렌더링하는 데 필요한 기타 세부 사항을 포함한 요청을 프록시합니다. 따라서 데이터를 확인하고 무결 처리하기 위해 뷰어는 엔드포인트 데이터 콘텐츠를 내부적으로 검사하고 [mustache](https://mustache.github.io/) 템플릿 렌더링을 관리합니다. amp-form 및 amp-list 컴포넌트에서 이 기능이 xhrInterceptor와 함께 사용될 경우, 뷰어에 요청을 프록시하는 `viewerRenderTemplate` 기능이 xhrInterceptor의 요청을 재정의한다는 점을 유념하세요.

[viewer.html](https://github.com/ampproject/amphtml/blob/master/examples/viewer.html) 예제는 AMP 문서에서 전송된 `viewerRenderTemplate` 메시지 처리 방법을 보여줍니다. 해당 예제에서 Viewer.prototype.processRequest_를 통해 `viewerRenderTemplate` 메시지가 포착되며 요청에서 지원되는 컴포넌트 유형에 따라 렌더링할 html을 다음 JSON 형식으로 되돌립니다.

```js
Viewer.prototype.ssrRenderAmpListTemplate_ = (data) => Promise.resolve({
  "html":
    "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'>"
      + "<div class='product' role='listitem'>Apple</div>"
      + "</div>",
  "body" : "",
  "init" : {
    "headers": {
      "Content-Type": "application/json",
    }
  }
});
```

이 예제는 [mustache](https://mustache.github.io/) 라이브러리 종속 요소 또는 콘텐츠 무결 처리가 포함되지 않은 간단한 예제입니다.

`viewerRenderTemplate` 기능이 지원되는 이메일 클라이언트 뷰어의 AMP 문서가 어떤 방식으로 [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) 템플릿을 렌더링하는지 보여주는 실전 예제는 아래 다이어그램에서 확인하실 수 있습니다.

<amp-img alt="Viewer render template diagram" layout="responsive" width="372" height="279" src="/static/img/docs/viewer_render_template_diagram.png"></amp-img>

AMP 런타임은 뷰어로 [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) 컴포넌트 데이터 가져오기 요청을 프록시하며 이후 이메일 클라이언트 서버로 요청이 전송됩니다. 서버는 URL 및 다양한 서비스를 통한 URL 가져오기 결과를 공급하여, URL 유효성과 해당 URL에서 반환된 데이터 콘텐츠를 검사할 수 있습니다. 또한 해당 데이터로 [mustache](https://mustache.github.io/) 템플릿을 렌더링합니다. 다음으로 렌더링된 템플릿을 반환하고 다음 JSON 응답 형식의 뷰어로 돌려보냅니다.

```json
{
  "html": "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'> <div class='product' role='listitem'>List item 1</div> <div class='product' role='listitem'>List item 2</div> </div>",
  "body": "",
  "init" : {
    "headers": {
      "Content-Type": "application/json",
    }
  }
}
```

JSON 페이로드의 html 값은 렌더링 시 AMP 문서에 삽입된 값입니다.

아래 표에서 기능 및 영향받는 컴포넌트의 간략한 정보를 확인하실 수 있습니다.

<table>
  <thead>
    <tr>
      <th width="30%">뷰어 기능</th>
      <th>영향받는 컴포넌트</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>xhrInterceptor</td>
      <td><code>[amp-form](../../../documentation/components/reference/amp-form.md?format=email), [amp-list](../../../documentation/components/reference/amp-list.md?format=email), [amp-state](https://amp.dev/documentation/components/amp-bind?format=email#initializing-state-with-amp-state)</code></td>
    </tr>
     <tr>
       <td>viewerRenderTemplate</td>
       <td><code>[amp-form](../../../documentation/components/reference/amp-form.md?format=email), [amp-list](../../../documentation/components/reference/amp-list.md?format=email)</code></td>
    </tr>
  </tbody>
</table>
