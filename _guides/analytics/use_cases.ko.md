---
layout: page
title: 사용 사례
order: 2
locale: ko
---

이 가이드에서는 사용자 참여를 추적하기 위한 일반적인 사용 사례를 제공합니다.

{% include toc.html %}

사용 사례를 추가하겠습니까? 
[저희에게 알려주세요.](https://github.com/ampproject/docs/issues/new)

또한 자신만의 사용 사례를 기고할 수도 있습니다.
[기고 방법](https://www.ampproject.org/docs/support/contribute.html) 참조.

## 페이지 뷰 추적

`amp-pixel` 및 `amp-analytics`를 사용하여 페이지 뷰를 추적하는 방법에 대해 알아보세요. 

### amp-pixel 사용

[amp-pixel](/docs/reference/amp-pixel.html)을
사용하여 지정된 URL에 페이지뷰 데이터 보내기:

{% highlight html %}
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
{% endhighlight %}

### amp-analytics 사용 - 공급업체 없음

[amp-analytics](/docs/reference/extended/amp-analytics.html)를
사용하여 지정된 URL에 페이지뷰 데이터 보내기:

{% highlight html %}
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
{% endhighlight %}

### amp-analytics - googleanalytics 사용

Google 애널리틱스에 페이지뷰 데이터 보내기:
(참고 항목 [Google 애널리틱스에서 페이지 추적](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)): 

{% highlight html %}
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
{% endhighlight %}

## 페이지 클릭 추적

[amp-analytics](/docs/reference/extended/amp-analytics.html)를 사용하여 페이지 클릭을 추적하고,
이벤트 데이터를 지정된 URL과
[Google 애널리틱스](https://developers.google.com/analytics/devguides/collection/amp-analytics/)로 보내는
방법에 대해 알아보세요.

### 데이터를 지정된 URL로 보내기

다음 예시에서는 사용자가 링크(`<a href>`)를 클릭할
때마다 `selector` 특성을 사용하여 `click` 이벤트를 지정된 URL로 보냅니다.

{% highlight html %}
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
{% endhighlight %}

### 데이터를 Google 애널리틱스로 보내기

다음 예시에서는 특정 요소를 클릭할 때 `trigger`의
`selector` 특성을 사용하여 `click` 이벤트를 Google 애널리틱스로
보냅니다(참고 항목
[Google 애널리틱스에서 AMP 이벤트 추적](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

{% highlight html %}
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
{% endhighlight %}

## 스크롤 추적

[amp-analytics](/docs/reference/extended/amp-analytics.html)를 사용하여 페이지 스크롤을 추적합니다.
다음 예시에서는 페이지가 수직으로 25%, 50%, 90% 스크롤될
때 `scrollspec` 특성을 사용하여 `scroll` 이벤트를 지정된 URL로 보냅니다.
이 이벤트는 페이지가 `scroll` 너비의 90%까지 수평으로 스크롤될
때도 발생합니다.

{% highlight html %}
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
{% endhighlight %}

## 소셜 상호작용 추적

[amp-analytics](/docs/reference/extended/amp-analytics.html)를 사용하여 소셜 상호작용을 추적하고,
이벤트 데이터를 지정된 URL과
[Google 애널리틱스](https://developers.google.com/analytics/devguides/collection/amp-analytics/)로 보내는
방법에 대해 알아보세요.

### 데이터를 지정된 URL로 보내기

다음 예시에서는 사용자가 트윗(`#tweet-link`)을 클릭할
때마다 `selector` 특성을 사용하여 `click` 이벤트를 지정된 URL로 보냅니다.

{% highlight html %}
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
{% endhighlight %}

### 데이터를 Google 애널리틱스로 보내기

다음 예시에서는 특정 소셜 버튼을 클릭할 때 `trigger`의
`selector` 특성을 사용하여 이벤트를 Google Analytics로 보냅니다.
(참고 항목
[Google 애널리틱스에서 AMP 소셜 상호작용 추적](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

{% highlight html %}
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
{% endhighlight %}
