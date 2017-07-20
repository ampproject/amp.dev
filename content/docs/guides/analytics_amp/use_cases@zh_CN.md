---
$title: 使用情形
$order: 2
toc: true
---
[TOC]

本指南提供了一系列跟踪用户互动的常见使用情形：

{% call callout('备注', type='note') %}
想要添加使用情形？[请告诉我们。](https://github.com/ampproject/docs/issues/new) 或者您也可以提供自己的使用情形，请参见[如何贡献自己的力量](https://www.ampproject.org/zh_cn/docs/support/contribute.html)
{% endcall %}

## 跟踪网页浏览量

了解如何使用 `amp-pixel` 和 `amp-analytics` 跟踪网页浏览量。

### 使用 amp-pixel


使用 [amp-pixel 将网页浏览量数据发送到指定网址](/zh_cn/docs/reference/amp-pixel.html)：

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
[/sourcecode]

### 使用 amp-analytics - 无供应商


使用 [amp-analytics 将网页浏览量数据发送到指定网址](/zh_cn/docs/reference/extended/amp-analytics.html)：

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

### 使用 amp-analytics - googleanalytics

将网页浏览量数据发送到 Google Analytics（分析）（另请参见 [Google Analytics（分析）中的网页跟踪](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)）：

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

## 跟踪网页点击次数

了解如何使用 [amp-analytics](/zh_cn/docs/reference/extended/amp-analytics.html)，通过将事件数据发送到指定网址和 [Google Analytics（分析）来跟踪网页点击次数](https://developers.google.com/analytics/devguides/collection/amp-analytics/)。

### 将数据发送到指定网址

下面的示例使用 `selector` 属性，在用户每次点击以下链接时将 `click` 事件发送到指定网址：`<a href>`):

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

### 将数据发送到 Google Analytics（分析）

下面的示例使用 `trigger` 的 `selector` 属性，在用户点击特定元素时将 `click` 事件发送到 Google Analytics（分析）（另请参见 [Google Analytics（分析）中的 AMP 事件跟踪](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)）：

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

## 跟踪滚动操作

使用 [amp-analytics 跟踪网页滚动操作](/zh_cn/docs/reference/extended/amp-analytics.html)。下面的示例使用 `scrollspec` 属性，在网页垂直滚动 25%、50% 和 90% 时将 `scroll` 事件发送到指定网址。 在网页水平滚动达到 `scroll` 宽度的 90% 时，该事件也会被触发：

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

## 跟踪社交互动

了解如何使用 [amp-analytics](/zh_cn/docs/reference/extended/amp-analytics.html)、通过将事件数据发送到指定网址和 [Google Analytics（分析）来跟踪社交互动](https://developers.google.com/analytics/devguides/collection/amp-analytics/)。

### 将数据发送到指定网址

下面的示例使用 `selector` 属性，在用户每次点击以下 Twitter 微博时将 `click` 事件发送到指定网址：`#tweet-link`):

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

### 将数据发送到 Google Analytics（分析）

下面的示例使用 `trigger` 的 `selector` 属性，在用户点击特定社交按钮时发送事件（另请参见 [Google Analytics（分析）中的 AMP 社交互动跟踪](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)）：

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
