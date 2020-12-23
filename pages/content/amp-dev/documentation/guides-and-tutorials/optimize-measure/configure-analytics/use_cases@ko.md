---
"$title": 활용 사례
"$order": '2'
description: 이 가이드에서 사용자 참여도 추적의 일반적인 활용 사례를 확인할 수 있습니다. 참고 – 활용 사례를 추가하고 싶으신가요? AMP 팀에 알려주세요.
formats:
- websites
---

이 가이드에서 사용자 참여도 추적의 일반적인 활용 사례를 확인할 수 있습니다.

[tip type="note"] <strong>참고 –</strong> 활용 사례를 추가하고 싶으신가요? [AMP 팀에 알려주세요.](https://github.com/ampproject/docs/issues/new) 또는 [기여 방법](../../../../documentation/guides-and-tutorials/contribute/index.md)을 읽고 직접 활용 사례를 제공하는 방법을 알아보세요. [/tip]

## 페이지 조회수 추적

[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 및 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 를 사용하여 페이지 조회수를 추적하는 방법을 알아보세요.

### amp-pixel 사용

다음과 같이 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md)을 사용하여 조회수 데이터를 지정된 URL로 전송합니다.

```html
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
```

### amp-analytics 사용 - 공급업체 없음

다음과 같이 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)를 사용하여 조회수 데이터를 지정된 URL로 전송합니다.

```html
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
```

### amp-analytics 사용 - googleanalytics

Google Analytics로 조회수 데이터를 전송하세요([Google Analytics에서 페이지 추적](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking) 참조).

```html
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
```

## 페이지 클릭수 추적 <a name="tracking-page-clicks"></a>

[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 를 사용하여 페이지 클릭수를 추적하고 지정된 URL 또는 [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)로 이벤트 데이터를 전송하는 방법을 알아보세요.

### 지정된 URL로 데이터 전송

다음 예시에서는 `selector` 속성을 사용하여 지정된 URL로 `click` 이벤트를 전송합니다. 이벤트는 사용자가 링크 (`<a href>`) 를 클릭할 때마다 전송됩니다.

```html
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
```

### Google Analytics로 데이터 전송

다음 예시에서는 `trigger`의 `selector` 속성을 사용하여 특정 요소가 클릭될 때 Google Analytics로 `click` 이벤트를 전송합니다([Google Analytics에서 AMP 이벤트 추적](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking) 참조).

```html
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
```

## 스크롤 추적 <a name="tracking-scrolling"></a>

[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)를 사용하여 페이지 스크롤을 추적합니다. 다음 예시에서는 `scrollspec` 속성을 통해 페이지가 수직으로 25%, 50%, 90% 스크롤되었을 경우 지정된 URL에 `scroll` 이벤트를 전송합니다. 또한 페이지가 `scroll` 너비의 90%만큼 수평으로 스크롤되었을 경우에도 이벤트가 전송됩니다.

```html
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
```

## 소셜 상호작용 추적 <a name="tracking-social-interactions"></a>

[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)를 사용하여 소셜 상호작용을 추적하고 지정된 URL 또는 [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)로 이벤트 데이터를 전송하는 방법을 알아보세요.

### 지정된 URL로 데이터 전송

다음 예시에서는 `selector` 속성을 사용하여 지정된 URL로 `click` 이벤트를 전송합니다. 이벤트는 사용자가 트윗(`#tweet-link`)을 클릭할 때마다 전송됩니다.

```html
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
```

### Google Analytics로 데이터 전송

다음 예시에서는 `trigger`의 `selector` 속성을 사용하여 특정 소셜 버튼이 클릭될 때 이벤트를 전송합니다([Google Analytics에서 AMP 소셜 상호작용 추적](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions) 참조).

```html
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
```
