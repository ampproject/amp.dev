---
layout: page
title: Analytics&#58; 기본사항
order: 0
locale: ko
---

AMP Analytics에 대한 기본사항을 배우려면 여기에서 시작하세요.

{% include toc.html %}

## amp-pixel 또는 amp-analytics 사용?

AMP는 여러분의 분석 및 측정 요구를 충족시키기 위해
[amp-pixel](/docs/reference/amp-pixel.html) 및
[amp-analytics](/docs/reference/extended/amp-analytics.html)의 두 가지 구성 요소를 제공합니다.
두 옵션은 분석 데이터를 정의된 엔드포인트로 보냅니다.

단순
[추적 픽셀](https://en.wikipedia.org/wiki/Web_beacon#Implementation)과 같은 동작을 찾는 경우,
`amp-pixel` 구성 요소는 기본 페이지 뷰 추적을 제공하며, 페이지 뷰 데이터가 정의된
URL로 보내집니다.
특정 공급업체와의 통합에 있어서도 이 구성 요소가
필요할 수 있습니다. 이 경우에는 정확한 URL 엔드포인트를 지정합니다.

대부분의 분석 솔루션에서는 `amp-analytics`를 사용합니다.
페이지 뷰 추적은 `amp-analytics`에서도 작동합니다.
그러나 링크 및 버튼 클릭을 비롯한 모든 유형의 페이지
콘텐츠에서 사용자 참여를 추적할 수도 있습니다.
또한 사용자가 소셜 미디어 등에 참여했는지 여부에 상관없이
이 사용자가 페이지에서 얼마나 많이 스크롤했는지
측정할 수 있습니다(
[AMP Analytics에 대한 상세 정보](/docs/guides/analytics/deep_dive_analytics.html) 참조).

AMP 플랫폼과의 통합의 일환으로,
제공자가 사전 정의된 `amp-analytics` 구성을 제공해왔기 때문에,
쉽게 데이터를 캡처하고 이 데이터를 추적 도구로 푸시할 수 있습니다.
[amp-analytics 사양](/docs/reference/extended/amp-analytics.html)에서
공급업체 문서에 액세스하세요.

페이지에서 `amp-pixel` 및 `amp-analytics`를 모두 사용할 수 있습니다.
`amp-pixel`은 단순 페이지 뷰 추적에 사용되고,
`amp-analytics`는 그밖의 모든 것에 사용됩니다.
또한 각 태그를 여러 개 추가할 수도 있습니다.
여러 분석 제공자와 작업 중인 경우,
솔루션당 하나의 태그가 필요합니다.
기억할 점은, AMP 페이지가 단순할수록 사용자에게 더
좋기 때문에, 추가적인 태그가 필요 없다면 사용하지 마세요.

## 단순 분석 구성 만들기

단순
[amp-pixel](/docs/reference/amp-pixel.html) 및
[amp-analytics](/docs/reference/extended/amp-analytics.html) 구성을 만드는 방법에 대해 알아보세요.

### 단순 amp-pixel 구성

단순 `amp-pixel` 구성을 만들려면,
다음 코드를 AMP 페이지 본문에 삽입합니다.

{% highlight html %}
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
{% endhighlight %}

이 예시에서는 무작위
숫자와 함께 페이지 뷰 데이터가 정의된 URL로 보내집니다.
`RANDOM` 변수는
[AMP 플랫폼의 대체 변수](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)의 여러 변수 중 하나입니다.
여기서
[변수 대체](/docs/guides/analytics/analytics_basics.html#variable-substitution)에 대해 자세히 알아보세요.

[amp-pixel](/docs/reference/amp-pixel.html)
구성 요소는 내장형이므로,
`amp-analytics`를 비롯한 AMP 확장 구성 요소에서와
같은 포함 선언이 필요 없습니다.
그러나 `amp-pixel` 태그를
`<body>` 시작부에 최대한 가깝게 배치해야 합니다.
태그가 뷰 자체에 들어갈 경우에만 추적 픽셀이 실행됩니다.
`amp-pixel`이 페이지 하단 근처에 배치된 경우에는,
추적 픽셀이 실행되지 않을 수도 있습니다.

### 단순 amp-analytics 구성

단순
[amp-analytics](/docs/reference/extended/amp-analytics.html) 구성을 만들려면,
먼저 이 `custom-element` 선언을
AMP 문서의 `<head>`에 포함시켜야 합니다(참고 항목
[구성 요소 포함 선언](/docs/reference/extended.html#component-inclusion-declaration)):

{% highlight html %}
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
{% endhighlight %}

다음 예시는 [`amp-pixel` 예시](/docs/guides/analytics/analytics_basics.html#simple-amp-pixel-configuration)와 유사합니다.
페이지가 표시될 때마다
트리거 이벤트가 실행되고,
무작위 ID와 함께 페이지뷰 데이터를 정의된 URL로 보냅니다. 

{% highlight html %}
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM",
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
{% endhighlight %}

위의 예시에서는 페이지뷰라는 요청을 https://foo.com/pixel?RANDOM으로 정의했습니다. 앞서 설명한 것처럼, RANDOM은 무작위 숫자로 대체되므로, 실제로 이 요청은 https://foo.com/pixel?0.23479283687235653498734처럼 나타날 것입니다.

(트리거 키워드 `visible`를
 사용하여 지정된 대로) 페이지가 표시되면,
이벤트가 트리거되고 `pageview` 요청이 보내집니다.
트리거 특성은 페이지뷰 요청이 실행되는 시간을 결정합니다.
[요청 및 트리거](/docs/guides/analytics/deep_dive_analytics.html#requests-triggers--transports)에 대해 자세히 알아보세요.

## 변수 대체

[amp-pixel](/docs/reference/amp-pixel.html) 및
[amp-analytics](/docs/reference/extended/amp-analytics.html) 구성 요소에서는
모든 표준 URL 변수 대체를 허용합니다(
[AMP HTML 변수 대체](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md) 참조).
다음 예시에서는 페이지 뷰 요청이
 URL로 보내지며,
현재 AMP 문서의 정식 URL, 제목 및
[클라이언트 ID](/docs/guides/analytics/analytics_basics.html#user-identification)도 함께 보내집니다.

{% highlight html %}
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
{% endhighlight %}

이러한 단순성 때문에,
`amp-pixel` 태그에는 플랫폼에 의해 정의된 변수나, AMP 페이지에서
AMP 런타임이 구문 분석할 수 있는 변수만 포함될 수 있습니다.
위의 예제에서
플랫폼은
`canonicalURL` 및 `clientId(site-user-id)`의 값을 모두 채웁니다.
`amp-analytics` 태그에는 `amp-pixel`과 동일한 변수가 포함될 수 있으며,
태그 구성 내에 고유하게 정의된 변수도 포함될 수 있습니다.

페이지 또는 플랫폼 정의 변수에 대한
요청 문자열에는 `${varName}` 형식을 사용합니다.
`amp-analytics` 태그는 분석 요청을 생성할 때
해당 템플릿을 실제 값으로 바꿉니다(참고 항목
[amp-analytics에서 지원되는 변수](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)).

다음 `amp-analytics` 예시에서는
페이지 뷰 요청이 변수 대체에서 추출된
추가 데이터와 함께 URL로 보내지고,
일부는 플랫폼에 의해 제공되고, 일부는
`amp-analytics` 구성 내에서 인라인으로
정의됩니다.

{% highlight html %}
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview":"https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}",
  },
  "vars": {
    "account": "ABC123",
  },
  "triggers": {
    "someEvent": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
      }
    }
  }  
}
</script>
</amp-analytics>
{% endhighlight %}

위의 예제에서
변수 `account` 및 `title`은
`amp-analytics` 구성에서 정의됩니다.
`canonicalUrl` 및 `clientId` 변수는 구성에서 정의되지 않으므로,
해당 값이 플랫폼에 의해 대체됩니다.

**중요:** 변수 대체는 유연합니다.
동일 변수를 다른 위치에 정의할 수 있으며,
AMP 런타임은 이 우선순위 순서대로 값을
구문 분석합니다([변수 대체 순서](/docs/guides/analytics/deep_dive_analytics.html#variable-substitution-ordering) 참조).

## 사용자 식별

웹사이트에서는 브라우저의 특정 사용자에 대한 정보를 저장하기 위해 쿠키를 사용합니다.
쿠키를 사용하면 어떤 사용자가 이전에 어떤 사이트를 방문했는지 알 수 있습니다.
AMP에서는
게시자의 웹사이트나 캐시(예: Google AMP Cache)에서
페이지를 제공할 수 있습니다.
게시자의 웹사이트와 캐시는 도메인이 다를 수 있습니다.
보안상의 이유로,
브라우저는 다른 도메인의 쿠키에 대한 액세스를
제한할 수 있으며 종종 제한합니다(참고 항목
[출발점에서 사용자 추적](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/cross-origin-tracking.md)).

기본적으로,
페이지를 게시자의 원래 웹사이트에서 액세스하든지 캐시를 통해 액세스하든지 간에, AMP는 클라이언트 ID의 프로비전을 관리합니다.
AMP가 생성한 클라이언트 ID는 `"amp-"`
값 뒤에 무작위 `base64` 인코딩 문자열이 추가되며,
동일한 사용자가 다시 방문하는 경우에는 이 사용자에 대해 동일하게 유지됩니다.

모든 경우에 AMP는 클라이언트 ID의 읽기 및 쓰기를 관리합니다.
페이지가 캐시를 통해
제공되는 경우나 페이지가 게시자의 원래 사이트의 뷰 컨텍스트를 벗어나서
표시되는 경우에 특히 두드러집니다.
이러한 상황에서는, 게시자 사이트의 쿠키에 액세스할 수 없습니다.

게시자의 사이트에서 AMP 페이지가 제공되는 경우,
AMP가 사용하는 클라이언트 ID 프레임워크에게
검색 및 사용할 폴백 쿠키에 대해 알려줄 수 있습니다.
이 경우,
`clientId` 변수의
`cid-scope-cookie-fallback-name` 인수는 쿠키 이름으로 해석됩니다.
형식은
`CLIENT_ID(cid-scope-cookie-fallback-name)` 또는
`${clientId(cid-scope-cookie-fallback-name)}`으로 나타날 수 있습니다.

예:

{% highlight html %}
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
{% endhighlight %}

이 쿠키가 설정되었음을 AMP가 발견한 경우,
클라이언트 ID 대체는 이 쿠키 값을 반환합니다.
이 쿠키가 설정되지 않았음을 AMP가 발견한 경우,
AMP는 `amp-` 뒤에 무작위 base64 인코딩
문자열을 추가한 값을 생성합니다.

[AMP Analytics에서 지원되는 변수](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)에서
선택 항목인 사용자 알림 ID를 추가하는 방법을 비롯하여, 클라이언트 ID 대체에 대해
자세히 알아보세요.
