---
"$title": Include iframes
"$order": '10'
description: 페이지에 미디어 콘텐츠를 표시하고 iframe을 사용하여 AMP의 제약을 넘어서는 고급 콘텐츠를 표시하는 방법을 자세히 알아보세요.
formats:
- websites
components:
- iframe
author: pbakaus
contributors:
- Meggin
- bpaduch
---

Learn how to display include media content in your pages, and how to use iframes to display advanced content outside of AMP's limitations.

## 기본사항

[`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) 요소를 사용하여 페이지에 iframe을 표시할 수 있습니다.

iframe은 사용자가 허용한 JavaScript를 필요로 하는 콘텐츠와 같이 AMP의 메인 페이지 컨텍스트에서 지원되지 않는 콘텐츠를 표시할 때 특히 유용합니다.

### `amp-iframe` 요구사항

- 첫 번째 표시 영역은 상단에서부터 최소 **600px** 또는 **75%** 떨어져 있어야 합니다(<a><code>placeholder</code></a>가 사용된 iframes 제외).
- HTTPS를 통해서만 리소스를 요청할 수 있으며, allow-same-origin을 지정하지 않는 한 컨테이너와 동일한 출처에 있을 수 없습니다.

[tip type="read-on"] <strong>읽어보기 –</strong> <br> [`amp-iframe` 전체 사양](../../../../documentation/components/reference/amp-iframe.md)에서 자세한 내용을 알아보세요. [/tip]

### 스크립트 추가

페이지에 [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md)을 포함하려면 우선 다음 스크립트를 `<head>`에 추가합니다. 이 작업을 통해 확장 컴포넌트에 다음과 같은 추가 코드가 로드됩니다.

[sourcecode:html]
<script async custom-element="amp-iframe"
  src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
[/sourcecode]

### 마크업 작성

다음 예시에서 <a class="" href="https://developers.google.com/maps/documentation/embed/get-started">Google Maps Embed API</a>를 통해 Google Map을 삽입하기 위한 반응형 [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md)이 생성되었습니다.

```html
<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    src="https://www.google.com/maps/embed/v1/place?key={YOUR API KEY}&q=europe">
</amp-iframe>
```

## 플레이스홀더 사용하기 <a name="using-placeholders"></a>

<code>placeholder</code> 속성이 포함된 [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) 요소(예: [`amp-img`](../../../../documentation/components/reference/amp-img.md) 요소)가 있을 경우 문서 상단에 [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md)을 표시할 수 있습니다. 이러한 요소는 iframe을 표시할 준비가 될 때까지 플레이스홀더로 렌더링됩니다.

[tip type="read-on"] <strong>읽어보기 –</strong> [플레이스홀더가 포함된 iframe](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder) 문서를 통해 플레이스홀더에 대해 자세히 알아보세요. [/tip]

플레이스홀더 사용 예시:

```html
<amp-iframe width="400" height="225"
sandbox="allow-scripts allow-same-origin"
layout="responsive"
src="https://giphy.com/embed/OWabwoEn7ezug">
<amp-img placeholder layout="fill"
src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img>
</amp-iframe>
```

다음과 같이 렌더링됩니다:

<amp-iframe width="400" height="225" sandbox="allow-scripts allow-same-origin" layout="responsive" src="https://giphy.com/embed/OWabwoEn7ezug"><amp-img placeholder layout="fill" src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img></amp-iframe>

## 예시

<a class="" href="https://gitlocalize.com/repo/4863/ko/pages/content/amp-dev/documentation/examples/documentation/amp-iframe.html">AMP by Example</a> 페이지에서 더 복잡한 <a><code>amp-iframe</code></a> 예시를 확인할 수 있습니다.
