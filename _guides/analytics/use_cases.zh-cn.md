---
layout: page
title: 用例
order: 2
locale: zh-cn
---

本指南提供了一组用于跟踪用户互动的常见用例：

{% include toc.html %}

想要添加用例？ 
[请告诉我们。](https://github.com/ampproject/docs/issues/new)

您也可以贡献自己的用例；请参阅[如何贡献](https://www.ampproject.org/docs/support/contribute.html)。


## 跟踪页面视图

了解如何使用 `amp-pixel` 和 `amp-analytics` 跟踪页面视图。 

### 使用 amp-pixel

使用
[amp-pixel](/docs/reference/amp-pixel.html) 将页面视图数据发送到指定的 URL：

{% highlight html %}
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
{% endhighlight %}

### 使用 amp-analytics - 无供应商

使用
[amp-analytics](/docs/reference/extended/amp-analytics.html) 将页面视图数据发送到指定的 URL：

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

### 使用 amp-analytics - googleanalytics

将页面视图数据发送到 Google Analytics
（另请参阅 [Google Analytics 中的页面跟踪](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)）： 

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

## 跟踪页面点击

了解如何使用
[amp-analytics](/docs/reference/extended/amp-analytics.html) 跟踪页面点击，
将事件数据发送到指定的 URL，并发送到
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)。

### 将数据发送到指定的 URL

以下示例使用 `selector` 属性将 `click` 事件发送到指定的 URL（每次用户点击链接 (`<a href>`)　时发送）：


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

### 将数据发送到 Google Analytics

以下示例使用 `trigger` 的 `selector` 属性在点击特定元素时将 `click` 事件发送到 Google Analytics

（另请参阅
[Google Analytics 中的 AMP 事件跟踪](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)）：

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

## 跟踪滚动

使用 [amp-analytics](/docs/reference/extended/amp-analytics.html) 跟踪页面滚动。
以下示例使用 `scrollspec` 属性在页面垂直滚动达到 25%、50% 和 90% 时将 `scroll` 事件发送到指定的 URL。

当页面水平滚动到
`scroll` 宽度的 90% 时，也会触发该事件：

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

## 跟踪社交互动

了解如何使用
[amp-analytics](/docs/reference/extended/amp-analytics.html) 跟踪社交互动，将事件数据发送到指定的 URL，并发送到
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)。


### 将数据发送到指定的 URL

以下示例使用 `selector` 属性将 `click` 事件发送到指定的 URL（每次用户点击 Twitter 消息 (`#tweet-link`) 时发送）：


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

### 将数据发送到 Google Analytics

以下示例使用 `trigger` 的 `selector` 属性在点击特定社交媒体按钮时发送事件

（另请参阅
[Google Analytics 中的 AMP 社交互动跟踪](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)）：

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
