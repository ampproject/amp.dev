---
$title: 사용 사례
$order: 2
toc: true
---
[TOC]

이 가이드에서는 사용자 참여를 추적하기 위한 일반적인 사용 사례를 확인할 수 있습니다.

{% call callout('참고', type='note') %}
사용 사례를 추가하고 싶으신가요? [Google에 알려 주세요.](https://github.com/ampproject/docs/issues/new) 또는 [기여 방법](https://www.ampproject.org/ko/docs/support/contribute.html) 에서 별도의 사용 사례를 제공하는 방법을 확인할 수 있습니다.
{% endcall %}

## 페이지 조회수 추적하기

`amp-pixel` 및 `amp-analytics` 를 사용하여 페이지 조회수를 추적하는 방법을 알아보세요.

### amp-pixel 사용

다음과 같이 [amp-pixel](/ko/docs/reference/amp-pixel.html) 을 사용하여 페이지뷰 데이터를 지정된 URL 로 전송합니다.

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
[/sourcecode]

### amp-analytics 사용 - 공급업체 없음

다음과 같이 [amp-analytics](/ko/docs/reference/extended/amp-analytics.html) 를 사용하여 페이지뷰 데이터를 지정된 URL 로 전송합니다.

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
    "requests": {
        "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}"
    },
    "vars": {
        "account": "ABC123"
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
[/sourcecode]

### amp-analytics 사용 - googleanalytics

Google 애널리틱스로 페이지뷰 데이터를 전송하세요 ([Google 애널리틱스에서 페이지 추적하기](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking) 참조).

[sourcecode:html]
<amp-analytics type="googleanalytics" id="analytics1">
<script type="application/json">
{
    "vars": {
        "account": "UA-XXXXX-Y"  // Replace with your property ID.
    },
    "triggers": {
        "trackPageview": {  // Trigger names can be any string. trackPageview is not a required name.
            "on": "visible",
            "request": "pageview"
        }
    }
}
</script>
</amp-analytics>
[/sourcecode]

## 페이지 클릭수 추적하기

[amp-analytics](/ko/docs/reference/extended/amp-analytics.html) 를 사용하여 페이지 클릭수를 추적하고 지정된 URL 또는 [Google 애널리틱스](https://developers.google.com/analytics/devguides/collection/amp-analytics/) 로 이벤트 데이터를 전송하는 방법을 알아보세요.

### 지정된 URL 로 데이터 전송하기

다음 예에서는 `selector` 속성을 사용하여 지정된 URL 로 `click` 이벤트를 전송합니다. 이벤트는 사용자가 링크 (`<a href>`) 를 클릭할 때마다 전송됩니다.

[sourcecode:html]
<amp-analytics>

<script type="application/json">
{
    "requests": {
        "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
    },
    "vars": {
        "account": "ABC123"
    },
    "triggers": {
        "trackAnchorClicks": {
            "on": "click",
            "selector": "a",
            "request": "event",
            "vars": {
                "eventId": "42",
                "eventLabel": "clicked on a link"
            }
        }
    }
}
</script>
</amp-analytics>
[/sourcecode]

### Google 애널리틱스로 데이터 전송하기

다음 예에서는 `trigger` 의 `selector` 속성을 사용하여 특정 요소가 클릭될 때 Google 애널리틱스로 `click` 이벤트를 전송합니다 ([Google 애널리틱스에서 AMP 이벤트 추적하기](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking) 참조).

[sourcecode:html]
<amp-analytics type="googleanalytics" id="analytics3">
<script type="application/json">
{
    "vars": {
        "account": "UA-XXXXX-Y"  // Replace with your property ID.
    },
    "triggers": {
        "trackClickOnHeader" : {
            "on": "click",
            "selector": "#header",
            "request": "event",
            "vars": {
                "eventCategory": "ui-components",
                "eventAction": "header-click"
            }
        }
    }
}
</script>
</amp-analytics>
[/sourcecode]

## 스크롤 추적하기

[amp-analytics](/ko/docs/reference/extended/amp-analytics.html) 를 사용하여 페이지 스크롤을 추적합니다. 다음 예에서는 `scrollspec` 속성을 사용하여 페이지가 수직으로 25%, 50%, 90% 스크롤되었을 때 지정된 URL 로 `scroll` 이벤트를 전송합니다. 또한 페이지가 `scroll` 너비의 90% 만큼 수평으로 스크롤되었을 때도 이벤트가 전송됩니다.

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
    "requests": {
        "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
    },
    "vars": {
        "account": "ABC123"
    },
    "triggers": {
        "scrollPings": {
            "on": "scroll",
            "scrollSpec": {
                "verticalBoundaries": [25, 50, 90],
                "horizontalBoundaries": [90]
            }
        }
    }
}
</script>
</amp-analytics>
[/sourcecode]

## 소셜 상호작용 추적하기

[amp-analytics](/ko/docs/reference/extended/amp-analytics.html) 를 사용하여 소셜 상호작용을 추적하고 지정된 URL 또는 [Google 애널리틱스](https://developers.google.com/analytics/devguides/collection/amp-analytics/) 로 이벤트 데이터를 전송하는 방법을 알아보세요.

### 지정된 URL 로 데이터 전송하기

다음 예에서는 `selector` 속성을 사용하여 지정된 URL로 `click` 이벤트를 전송합니다. 이벤트는 사용자가 트윗 (`#tweet-link`) 을 클릭할 때마다 전송됩니다.

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
    "requests": {
        "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
    },
    "vars": {
        "account": "ABC123"
    },
    "triggers": {
        "trackClickOnTwitterLink": {
            "on": "click",
            "selector": "#tweet-link",
            "request": "event",
            "vars": {
                "eventId": "43",
                "eventLabel": "clicked on a tweet link"
            }
        }
    }
}
</script>
</amp-analytics>
[/sourcecode]

### Google 애널리틱스로 데이터 전송하기

다음 예에서는 `trigger` 의 `selector` 속성을 사용하여 특정 소셜 버튼이 클릭될 때 이벤트를 전송합니다 ([Google 애널리틱스에서 AMP 소셜 상호작용 추적하기](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions) 참조).

[sourcecode:html]
<amp-analytics type="googleanalytics" id="analytics4">
<script type="application/json">
{
    "vars": {
        "account": "UA-XXXXX-Y" // Replace with your property ID.
    },
    "triggers": {
        "trackClickOnTwitterLink" : {
            "on": "click",
            "selector": "#tweet-link",
            "request": "social",
            "vars": {
                "socialNetwork": "twitter",
                "socialAction": "tweet",
                "socialTarget": "https://www.examplepetstore.com"
            }
        }
    }
}
</script>
</amp-analytics>
[/sourcecode]
