---
'$title': 광고 뷰 추적하기
$order: 2
description: AMPHTML 광고에서 amp-pixel 또는 amp-analytics 컴포넌트를 사용하여 메트릭을 추적할 수 있습니다. 기본 예제에서 페이지뷰 추적 기능을 추가해보겠습니다...
---

AMPHTML 광고에서 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 또는 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 컴포넌트를 사용하여 메트릭을 추적할 수 있습니다. 기본 예제에서 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 컴포넌트를 활용하여 페이지뷰 추적 기능을 추가하고 페이지뷰를 기록하는 URL을 지정하겠습니다(이 경우에는 가짜 URL):

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
  <amp-pixel src="https://www.amp.dev/tracker/foo"></amp-pixel>
</body>
```

다 됐네요, AMPHTML 광고를 제작하셨습니다!

광고를 광고 서버에 업로드하기 전 마지막 단계로 구문의 유효성 확인이 필요합니다.
