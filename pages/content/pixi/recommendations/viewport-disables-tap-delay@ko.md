---
'$title': 탭 지연 비활성화
$order: 50
tags:
  - fid
---

터치 지연 비활성화를 위해 뷰포트 너비를 기기 너비에 맞춰 설정할 경우 FID가 증가할 수 있습니다. 300-350ms의 탭 지연을 제거하려면 페이지의 `<head>`에 포함된 뷰포트 선언을 다음으로 변경합니다.

```
<meta name="viewport" content="width=device-width">
```

이를 통해 뷰포트 너비를 기기와 동일하게 설정할 수 있으며, 이 방식이 모바일에 최적화된 사이트에 가장 적합한 방식입니다. [web.dev에서 탭 지연 비활성화에 관한 자세한 내용을 알아보세요](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away).
