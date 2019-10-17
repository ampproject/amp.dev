---
$title: 使用情形
---

本指南提供了一系列跟踪用户互动的常见使用情形：

备注: 想要添加使用情形？[请告诉我们。](https://github.com/ampproject/docs/issues/new) 或者您也可以提供自己的使用情形，请参见[如何贡献自己的力量](../../../../documentation/guides-and-tutorials/contribute/index.md)

## 跟踪网页浏览量

了解如何使用 [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) 和 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) 跟踪网页浏览量。

### 使用 amp-pixel <a name="使用-amp-pixel"></a>

使用 [`amp-pixel` 将网页浏览量数据发送到指定网址](../../../../documentation/components/reference/amp-pixel.md)：

```html
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
```

### 使用 amp-analytics - 无供应商

使用 [`amp-analytics` 将网页浏览量数据发送到指定网址](../../../../documentation/components/reference/amp-analytics.md)：

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

### 使用 amp-analytics - googleanalytics

将网页浏览量数据发送到 Google Analytics（分析）（另请参见 [Google Analytics（分析）中的网页跟踪](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)）：

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

## 跟踪网页点击次数 <a name="tracking-page-clicks"></a>

了解如何使用 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)，通过将事件数据发送到指定网址和 [Google Analytics（分析）来跟踪网页点击次数](https://developers.google.com/analytics/devguides/collection/amp-analytics/)。

### 将数据发送到指定网址

下面的示例使用 `selector` 属性，在用户每次点击以下链接时将 `click` 事件发送到指定网址：`<a href>`):

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

### 将数据发送到 Google Analytics（分析）

下面的示例使用 `trigger` 的 `selector` 属性，在用户点击特定元素时将 `click` 事件发送到 Google Analytics（分析）（另请参见 [Google Analytics（分析）中的 AMP 事件跟踪](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)）：

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

## 跟踪滚动操作 <a name="tracking-scrolling"></a>

使用 [`amp-analytics` 跟踪网页滚动操作](../../../../documentation/components/reference/amp-analytics.md)。下面的示例使用 `scrollspec` 属性，在网页垂直滚动 25%、50% 和 90% 时将 `scroll` 事件发送到指定网址。 在网页水平滚动达到 `scroll` 宽度的 90% 时，该事件也会被触发：

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

## 跟踪社交互动 <a name="tracking-social-interactions"></a>

了解如何使用 [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)、通过将事件数据发送到指定网址和 [Google Analytics（分析）来跟踪社交互动](https://developers.google.com/analytics/devguides/collection/amp-analytics/)。

### 将数据发送到指定网址

下面的示例使用 `selector` 属性，在用户每次点击以下 Twitter 微博时将 `click` 事件发送到指定网址：`#tweet-link`):

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

### 将数据发送到 Google Analytics（分析）

下面的示例使用 `trigger` 的 `selector` 属性，在用户点击特定社交按钮时发送事件（另请参见 [Google Analytics（分析）中的 AMP 社交互动跟踪](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)）：

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
