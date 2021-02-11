---
'$title': 이미지 광고 제작하기
$order: 1
description: AMP 광고는 광고 사이트로 연결되는 하이퍼링크가 추가된 간단한 이미지입니다. amp-img 태그를 사용하여 이미지를 표시합니다. 코드는 다음과 같습니다...
---

AMPHTML 광고 문서의 `<body>` 내부에 HTML 및 AMP 태그를 포함할 수 있습니다. 하지만 전부 허용되는 것은 아니므로 [AMPHTML 광고 사양](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#allowed-amp-extensions-and-builtins)에서 허용 태그의 목록을 참조하세요.

AMP 광고는 광고 사이트로 연결되는 하이퍼링크가 추가된 간단한 이미지입니다. [`amp-img`](../../../../documentation/components/reference/amp-img.md) 태그를 사용하여 이미지를 표시합니다. 코드는 다음과 같습니다.

```html
<body>
  <a target="_blank" href="https://www.amp.dev">
    <amp-img
      width="300"
      height="250"
      alt="Learn amp"
      src="/static/img/docs/ads/amp-300x250.png"
    ></amp-img>
  </a>
</body>
```

브라우저에서 html 파일을 열면 다음 이미지가 표시됩니다.

{{ image('/static/img/docs/ads/amp-300x250.png', 300, 250, align='center third', alt='learn about AMP ad') }}

이미지 광고를 클릭하면 광고가 있는 사이트로 연결됩니다(즉, AMP Project 사이트)
