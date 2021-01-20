---
$title: 타사 공격 보안
$order: 7
description: 웹의 보안 취약성으로부터 AMP 페이지 및 사용자를 보호하는 조치를 취합니다
author: CrystalOnScript
---

웹의 보안 취약성으로부터 AMP 페이지 및 사용자를 보호하는 조치를 취합니다. 가장 악성적인 공격 중 하나는 [크로스 사이트 스크립팅](https://www.google.com/about/appsecurity/learning/xss/)(XSS)입니다. 공격자는 보안 버그인 XSS를 활용하여 사용자에게 표시된 HTML 페이지에 악성 코드를 심을 수 있습니다.

<a class="" href="https://csp.withgoogle.com/docs/index.html">콘텐츠 보안 정책(CSP)</a>을 도입하여 이러한 유형의 공격에 대한 보호를 제공하세요. Google AMP 캐시 등의 AMP 캐시를 통해 이미 페이지에 CSP가 추가되었습니다! 하지만 개인적으로 CSP를 추가하지 않을 경우 사용자가 캐시된 버전을 우회하면 페이지에 추가 보호층이 없습니다.

# AMP의 CSP 구현

페이지 헤드에 적절한 메타 태그를 추가하여 CSP를 구현할 수 있습니다. 아래 코드는 AMP의 CSP로, 페이지에 AMP 스크립트 삽입만을 허용합니다.

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src * data: blob:; script-src blob: https://cdn.ampproject.org/v0.js https://cdn.ampproject.org/v0/ https://cdn.ampproject.org/viewer/ https://cdn.ampproject.org/rtv/; object-src 'none'; style-src 'unsafe-inline' https://cdn.ampproject.org/rtv/ https://cdn.materialdesignicons.com https://cloud.typography.com https://fast.fonts.net https://fonts.googleapis.com https://maxcdn.bootstrapcdn.com https://p.typekit.net https://use.fontawesome.com https://use.typekit.net; report-uri https://csp-collector.appspot.com/csp/amp"
/>
```

[여기에서 전체 예시를 확인할 수 있습니다](https://github.com/ampproject/amphtml/blob/master/examples/csp.amp.html).

[tip type="read-on"] [여기에서 보안 취약성 및 CSP 보호에 관한 정보](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)를 자세히 알아보세요. [/tip]
