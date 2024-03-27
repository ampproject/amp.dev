---
'$title': 분석을 활용한 참여 추적
$order: 4
description: 일반적으로 애널리틱스 플랫폼은 분석 시스템으로 다시 전송되는 이벤트를 트리거하는 인라인 JavaScript 스니펫과 함수 호출을 통해 웹사이트에 통합됩니다.
---

일반적으로 애널리틱스 플랫폼은 분석 시스템으로 다시 전송되는 이벤트를 트리거하는 인라인 자바스크립트 스니펫과 함수 호출을 통해 웹사이트에 통합됩니다. AMP는 여러 분석 파트너를 대상으로 이 프로세스를 복제할 수 있도록 유연한 JSON 구성 구문을 제공합니다.

다음은 기존의 JavaScript 기반 Google Analytics 추적의 예시입니다. 추후 <a><code>amp-analytics</code></a> JSON 형식으로 다시 작성하겠지만, 우선 기존 접근방식부터 살펴보겠습니다.

```html
<script>
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    (i[r] =
      i[r] ||
      function () {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(
    window,
    document,
    'script',
    '//www.google-analytics.com/analytics.js',
    'ga'
  );

  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('send', 'pageview');
</script>
```

페이지뷰 이벤트를 추적하기 위한 알림을 전송하는 간단한 JavaScript입니다.

AMP에서 이 기능을 복제하려면 먼저 문서의 `<head>`에 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 컴포넌트를 라이브러리를 **포함**해야 합니다.

```html
<script
  async
  custom-element="amp-analytics"
  src="https://ampjs.org/v0/amp-analytics-0.1.js"
></script>
```

다음으로 문서의 `body` 끝부분에 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 컴포넌트를 **추가**합니다.

```html
<amp-analytics type="googleanalytics">
  <script type="application/json">
    {
      "vars": {
        "account": "UA-YYYY-Y"
      },
      "triggers": {
        "default pageview": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "Name of the Article"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

이 페이지 상단의 JavaScript 예시와 마찬가지로 이 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 스니펫은 페이지 조회 알림을 Google Analytics로 전송합니다.

이 기능을 지정하기 위해 `type`은 `googleanalytics`로 설정하고 JSON에 "default pageview"라는 트리거를 생성했습니다. 이 트리거는 페이지가 표시될 때(`"on": "visible"`로 인해) 실행되며, 이때 지정한 `vars`와 함께 `pageview` 분석 요청을 Google Analytics로 전송합니다.

[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 구성 시 사용된 JSON은 전송할 분석 데이터와 전송 시기를 명시하는 매우 유연한 형식입니다. [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)는 형식에 대한 상세한 설명을 제공합니다.

위의 예제와 더불어 `"click on #header trigger"`라는 다른 트리거를 **추가**할 수 있습니다.

```html
<amp-analytics type="googleanalytics">
  <script type="application/json">
    {
      "vars": {
        "account": "UA-YYYY-Y"
      },
      "triggers": {
        "default pageview": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "Name of the Article"
          }
        },
        "click on #header trigger": {
          "on": "click",
          "selector": "#header",
          "request": "event",
          "vars": {
            "eventCategory": "examples",
            "eventAction": "clicked-header"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

새로운 트리거의 이름에서 추측할 수 있듯 ID가 `"header"`인 요소를 클릭하면 트리거가 실행됩니다(`"on": "click"` 및 `"selector": "#header"`로 지정). 트리거가 실행되면 요청에 포함할 몇 가지 변수를 지정하여 분석 제공업체에 `event` 요청을 전송합니다.

통합하려는 사용자 지정 추적 플랫폼이 있는 경우, [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)를 사용하고 추적 데이터를 전송할 맞춤 설정된 URL 엔드포인트를 정의할 수 있습니다. [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 컴포넌트 참조 문서에서 자세히 알아보세요.

[tip type="note"] <strong>참고 –</strong>`“UA-YYYY-Y”`는 Google Analytics 계정의 예시이므로, 사이트에 해당 예시를 사용할 때는 웹사이트의 Google Analytics 추적 코드를 대신 입력해야 합니다. [/tip]

[tip type="tip"] <strong>팁 –</strong> 더 간단한 추적 시스템에 관심이 있다면 <a><code>amp-pixel</code></a>에 대해 자세히 알아보세요. 페이지뷰만 추적하려는 경우 기존의 픽셀 추적 요구 사항 충족을 목표로 하는 <a><code>amp-pixel</code></a>이 <a><code>amp-analytics</code></a>보다 가벼운 솔루션입니다. <a class="" href="https://gitlocalize.com/repo/4863/ko/pages/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md">애널리틱스: 기초 가이드</a>에서 추가 정보를 확인하실 수 있습니다. [/tip]
