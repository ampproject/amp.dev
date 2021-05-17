---
$title: amp-iframe
$category@: layout
teaser:
  text: iframe을 표시합니다.
---

<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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



iframe을 표시합니다.


<table>
  <tr>
    <td width="40%"><strong>필수 스크립트</strong></td>
    <td><code>&lt;script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">지원되는 레이아웃</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>예</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-iframe/">amp-iframe의 주석이 포함된 코드 예</a></td>
  </tr>
</table>

# 동작 <a name="behavior"></a>

`amp-iframe`에는 보안을 강화하고 단일 iframe에서 좌우하는 AMP 파일을 방지하도록 디자인된 vanilla iframe과 다른 중요한 여러 차이점이 있습니다.

* `amp-iframe`은 문서의 상단 근처에 표시되지 않을 수 있습니다([아래](#iframe-with-placeholder) 설명된 대로 `placeholder`를 사용하는 iframe 제외). iframe은 상단에서 600픽셀 떨어져 있거나 상단으로 스크롤할 때 표시 영역의 처음 75% 안에 포함되지 않아야 하며, 둘 중 더 작은 값으로 지정됩니다.
* 기본적으로 amp-iframe은 샌드박스 처리됩니다([세부정보](#sandbox) 참조).
* `amp-iframe`은 HTTPS, data-URI 또는 `srcdoc` 속성을 통해서만 리소스를 요청해야 합니다.
* `sandbox` 속성에서 `allow-same-origin`을 허용하지 않는 경우를 제외하고 `amp-iframe`은 컨테이너와 같은 원본에 없어야 합니다. iframe에 허용되는 원본에 관한 자세한 정보는 ['Iframe 원본 정책'](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-iframe-origin-policy.md) 문서를 참조하세요.

*예: amp-iframe에서 Google 지도 삽입*

```html
<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    frameborder="0"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=iceland">
  </amp-iframe>
```

렌더링 방식:

<amp-iframe width="200" height="100" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&amp;q=iceland" sandbox="allow-scripts allow-same-origin" layout="responsive" frameborder="0">
</amp-iframe>

[tip type="success"]
`amp-iframe`의 더 많은 데모를 보려면 [AMP By Example](https://ampbyexample.com/components/amp-iframe/)을 참조하세요.
[/tip]

# 광고에 amp-iframe 사용 <a name="usage-of-amp-iframe-for-advertising"></a>

`amp-iframe`을 광고 표시의 주용도로 사용해서는 **안 됩니다**. 일부가 광고인 동영상을 표시하는 용도로 `amp-iframe`을 사용하는 것은 괜찮습니다. 이 AMP 정책은 각 iframe을 렌더링하지 않아도 적용될 수 있습니다.

광고 사용 사례에서는 대신 [`amp-ad`](amp-ad.md)를 사용해야 합니다.

이 정책의 이유는 다음과 같습니다.

* `amp-iframe`에서는 샌드박스를 시행하고, 샌드박스는 하위 iframe에도 적용됩니다. 즉, 광고 자체는 작동하는 것으로 보여도 방문 페이지가 손상되었을 수 있습니다.
* `amp-iframe`에서는 iframe에 구성을 전달하는 메커니즘을 제공하지 않습니다.
* `amp-iframe`에는 iframe에서 완전히 제어하는 크기 조정 메커니즘이 없습니다.
* 조회가능성 정보는 `amp-iframe`에 사용하지 못할 수 있습니다.

# 속성 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td><code>src</code> 속성은 주로 표준 iframe에서와 같이 작동합니다. 단, 한 가지 예외가 있습니다. 소스 문서가 AMP 컨텍스트에 삽입되어 있음을 알 수 있도록 URL에 <code>#amp=1</code> 단편이 추가됩니다. 이 단편은 <code>src</code>로 지정된 URL에 아직 단편이 없는 경우에만 추가됩니다.</td>
  </tr>
  <tr>
    <td width="40%"><strong>srcdoc, frameborder, allowfullscreen, allowpaymentrequest, allowtransparency, referrerpolicy</strong></td>
    <td>이 속성은 모두 표준 iframe에서와 같이 동작해야 합니다.
      <br>
        <code>frameborder</code>가 지정되지 않은 경우 기본적으로 <code>0</code>으로 설정됩니다.</td>
      </tr>
      <tr>
        <td width="40%"><strong>sandbox</strong><a name="sandbox"></a></td>
        <td><code>amp-iframe</code>을 통해 만든 iframe에는 항상 <code>sandbox</code> 속성이 정의되어 있어야 합니다. 기본적으로 값은 비어 있습니다. 즉, '최대 샌드박스 처리'됩니다. <code>sandbox</code> 값을 설정하여 iframe을 적게 샌드박스 처리하도록 선택할 수 있습니다. 브라우저에서 지원하는 모든 값이 허용됩니다. 예를 들어 <code>sandbox="allow-scripts"</code>를 설정하면 iframe에서 JavaScript를 실행할 수 있습니다. 또는 <code>sandbox="allow-scripts allow-same-origin"</code>을 설정하면 iframe에서 JavaScript를 실행할 수 있으므로 비CORS XHR을 작성하고 쿠키를 읽고 쓸 수 있습니다.
          <br><br>
            특별히 샌드박스를 염두에 두 않고 만든 문서를 iframe으로 작성하는 경우 <code>allow-scripts allow-same-origin</code>을 <code>sandbox</code> 속성에 추가해야 할 가능성이 크며 추가 기능을 허용해야 할 수도 있습니다.
            <br><br>
              또한 샌드박스 처리된 iframe에서 열린 모든 창에 샌드박스가 적용된다는 점을 참고하세요. 여기에는 <code>target=_blank</code>를 사용하는 링크로 만든 새 창이 포함됩니다(이 작업을 허용하도록 <code>allow-popups</code> 추가). <code>allow-popups-to-escape-sandbox</code>를 <code>sandbox</code> 속성에 추가하면 해당 새 창이 샌드박스 처리되지 않은 새 창처럼 동작합니다. 대부분의 경우 이와 같이 동작해야 합니다. 현재 이 문서를 작성하는 시점에는 Chrome에서 <code>allow-popups-to-escape-sandbox</code>만 지원합니다.
              <br><br>
                샌드박스 속성에 관한 자세한 정보는 <a href="https://developer.mozilla.org/ko-KR/docs/Web/HTML/Element/iframe#attr-sandbox">MDN 문서</a>를 참조하세요.</td>
              </tr>
              <tr>
                <td width="40%"><strong>공통 속성</strong></td>
                <td>이 요소에는 AMP 구성요소로 확장된 <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">공통 속성</a>이 포함됩니다.</td>
              </tr>
            </table>

# 자리표시자가 있는 iframe <a name="iframe-with-placeholder"></a>

아래 예에 표시된 대로 `amp-iframe`에 `placeholder` 요소가 있으면 `amp-iframe`이 문서의 상단에 표시될 수 있습니다.

* `amp-iframe`에는 iframe을 표시할 준비가 될 때까지 자리표시자로 렌더링되는 `placeholder` 속성이 있는 요소(예: `amp-img` 요소)를 포함해야 합니다.
* Iframe 준비 여부는 iframe 문서에서 보내는 iframe의 `onload` 또는 `embed-ready` `postMessage` 중 먼저 수신되는 속성을 통해 알 수 있습니다.

*예: 자리표시자가 있는 Iframe*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow-same-origin"
    src="https://foo.com/iframe">
    <amp-img layout="fill" src="https://foo.com/foo.png" placeholder></amp-img>
</amp-iframe>
```

*예: Iframe 삽입 준비 요청*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-ready'
  }, '*');
```

# iframe 크기 조정 <a name="iframe-resizing"></a>

`amp-iframe`에는 다른 모든 AMP 요소와 마찬가지로 정적 레이아웃이 정의되어 있어야 합니다. 그러나
런타임 시 `amp-iframe`의 크기를 조정할 수 있습니다. 방법은 다음과 같습니다.

1. `amp-iframe`은 `resizable` 속성으로 정의해야 합니다.
1. `amp-iframe`에는 `overflow` 하위 요소가 있어야 합니다.
1. `amp-iframe`은 `allow-same-origin` 샌드박스 속성을 설정해야 합니다.
1. iframe 문서에서 `embed-size` 요청을 창 메시지로 보내야 합니다.
1. 요청 높이가 특정 임계값(100픽셀) 미만이면 `embed-size` 요청이 거부됩니다.

`resizable`이 `scrolling`의 값을 `no`로 재정의한다는 점에 유의하세요.

*예: `overflow` 요소가 있는 `amp-iframe`*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow-same-origin"
    resizable
    src="https://foo.com/iframe">
    <div overflow tabindex=0 role=button aria-label="Read more">Read more!</div>
</amp-iframe>
```

*예: iframe 크기 조정 요청*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-size',
  height: document.body.scrollHeight
  }, '*');
```

이 메시지가 수신되면 AMP 런타임에서 가능한 한 빨리 요청을 수용하려고 하지만, 판독기가 현재 읽고 있는 위치, 스크롤링이 현재 진행 중인지 여부 및 기타 UX 또는 성능 요인을 고려합니다. 런타임에서 크기 조정 요청을 처리할 수 없으면,
`amp-iframe`에서 `overflow` 요소를 표시합니다. `overflow` 요소를 클릭하면 사용자 작업에서 트리거되므로 즉시 `amp-iframe`의 크기를 조정합니다.

다음은 크기 조정이 실행되는 속도에 영향을 미치는 몇 가지 요인입니다.

* 사용자 작업에서 크기 조정을 트리거하는지 여부
* 현재 활성 상태인 iframe의 크기 조정이 요청되었는지 여부
* 표시 영역 아래 또는 표시 영역 위의 iframe에 대한 크기 조정이 요청되었는지 여부

# iframe 조회가능성 <a name="iframe-viewability"></a>

iframe에서는 상위 표시 영역과 교차하는 iframe의 IntersectionObserver 스타일 [변경 레코드](https://developer.mozilla.org/ko-KR/docs/Web/API/IntersectionObserverEntry)를 수신하기 위해 상위 요소에 `send-intersections` 메시지를 보낼 수 있습니다.

*참고: 다음 예에서 스크립트는 생성된 iframe에 있다고 가정합니다. 여기서 `window.parent`가 상단 창입니다. 스크립트가 중첩된 iframe에 있으면 `window.parent`를 상단 AMP 창으로 변경합니다.*

*예: iframe `send-intersections` 요청*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'send-intersections'
  }, '*');
```

iframe에서는 교차 데이터를 수신하기 위해 상위 창에서 `intersection` 메시지에 대기합니다.

*예: iframe `send-intersections` 요청*

```javascript
window.addEventListener('message', function(event) {
  if (event.source != window.parent ||
  event.origin == window.location.origin ||
  !event.data ||
  event.data.sentinel != 'amp' ||
  event.data.type != 'intersection') {
    return;
    }
  event.data.changes.forEach(function (change) {
    console.log(change);
  });
});
```

교차 메시지는 iframe이 표시 영역 내외부로 이동(또는 부분적으로 공개)하거나 iframe이 스크롤링되거나 크기 조정될 때 상위 요소에서 iframe으로 보냅니다.

# 추적/분석 iframe <a name="trackinganalytics-iframes"></a>

분석 용도로는 [`amp-analytics`](amp-analytics.md)를 사용하는 것이 가장 좋습니다. 다양한 분석 공급업체에 맞게 구성할 수 있는 훨씬 더 강력하고 완전하며 효율적인 솔루션이기 때문입니다.

AMP에서는 페이지당 분석 및 추적 용도로 사용하는 단일 iframe만 허용합니다. 리소스를 절약하기 위해 iframe은 로드한 후 5초 후에 DOM에서 삭제되며, 이 시간은 필요한 모든 작업을 완료하는 데 충분해야 합니다.

iframe이 사용자 숨기기 또는 작게 표시와 같이 직접적으로 사용자에게 도움을 주지 않는 것으로 보이면 추적/분석 iframe으로 식별됩니다.

# 지침: amp-iframe을 통해 기존 AMP 구성요소 사용 <a name="guideline-use-existing-amp-components-over-amp-iframe"></a>

AMP의 다른 방법으로 필수 사용자 환경을 사용할 수 없는 경우, 즉 사용 사례에 맞는 기존 [AMP 구성요소](../../../documentation/components/index.html)가 아직 없다면 `amp-iframe` 구성요소를 대체로 고려해야 합니다. 다음과 같이 특정 사용 사례에 맞게 조정된 AMP 구성요소를 사용하면 많은 이점이기 때문입니다.

* 리소스 관리 및 성능 향상
* 경우에 따라 맞춤 구성요소에서 기본 제공 자리표시자 이미지를 제공할 수 있습니다. 즉, 동영상을 로드하기 전에 올바른 동영상 미리보기 이미지를 가져오고 수동으로 자리표시자를 추가하는 코딩 작업을 줄여줍니다.
* 크기 조정을 기본 제공합니다. 크기를 예측할 수 없는 iframe 콘텐츠가 스크롤 가능 프레임에 표시되지 않고 페이지에 고유한 것처럼 사용자에게 더 자주 표시될 수 있습니다.
* 기타 추가 기능을 기본 제공할 수 있습니다(예: 동영상 플레이어를 위한 자동 재생).

# 유효성 검사 <a name="validation"></a>

AMP 유효성 검사기 사양에서 [amp-iframe 규칙](https://github.com/ampproject/amphtml/blob/main/extensions/amp-iframe/validator-amp-iframe.protoascii)을 참조하세요.
