---
layout: page
title: ユースケース
order: 2
locale: ja
---

このガイドでは、ユーザー エンゲージメントをトラッキングするための一般的なユースケースをいくつか紹介します。

{% include toc.html %}

ユースケースの追加要求は 
[こちらからお願いします](https://github.com/ampproject/docs/issues/new)。

自身のユースケースを公開することもできます。詳細は、[AMP プロジェクトに貢献する方法](https://www.ampproject.org/docs/support/contribute.html)をご覧ください。


## ページビューをトラッキングする

`amp-pixel` と `amp-analytics` を使ってページビューをトラッキングする方法を説明します。 

### amp-pixel を使う

以下の例では、指定の URL にページビュー データを送信する際に
[amp-pixel](/docs/reference/amp-pixel.html) を使っています。

{% highlight html %}
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
{% endhighlight %}

### amp-analytics を使う（ベンダーなし）

以下の例では、指定の URL にページビュー データを送信する際に
[amp-analytics](/docs/reference/extended/amp-analytics.html) を使っています。

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

### amp-analytics を使う（googleanalytics）

以下の例は、Google アナリティクスにページビュー データを送信しています
（[Google アナリティクスでページトラッキングをする](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)もご確認ください）。 

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

## ページクリックをトラッキングする

ページクリックを
[amp-analytics](/docs/reference/extended/amp-analytics.html) を使ってトラッキングして、
イベントデータを指定の URL と
[Google アナリティクス](https://developers.google.com/analytics/devguides/collection/amp-analytics/)に送信する方法を説明します。

### 指定の URL にデータを送信する

以下の例では `selector` 属性を使って、指定の URL に `click` イベントを送信します。
送信タイミングはユーザーがリンク（`<a href>`）をクリックするたびです。

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

### Google アナリティクスにデータを送信する

以下の例では `trigger` の `selector` 属性を使って、
特定の要素がクリックされたときに `click` イベントを Google アナリティクスに送信します
（あわせて、
[Google アナリティクスで AMP イベントをトラッキングする](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)もご覧ください）。

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

## スクロールをトラッキングする

ページ スクロールをトラッキングするには、[amp-analytics](/docs/reference/extended/amp-analytics.html) を使います。
以下の例では `scrollspec` 属性を使って、ユーザーがページを垂直方向に 25%、50%、90% スクロールしたときに、指定の URL に `scroll` イベントが送信されるようにしています。

さらに、ページを水平方向に
`scroll` 幅の 90% スクロールしたときもイベントが発生します。

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

## ソーシャル インタラクションをトラッキングする

ソーシャル インタラクションをトラッキングするには、[amp-analytics](/docs/reference/extended/amp-analytics.html) を使って、イベントデータを指定の URL と [Google アナリティクス](https://developers.google.com/analytics/devguides/collection/amp-analytics/)に送信します。




### 指定の URL にデータを送信する

以下の例では `selector` 属性を使って、指定の URL に `click` イベントを送信します。
送信タイミングはユーザーがツイート（`#tweet-link`）をクリックするたびです。

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

### Google アナリティクスにデータを送信する

以下の例では `trigger` の `selector` 属性を使って、
特定のソーシャル ボタンがクリックされたときにイベントを送信します
（あわせて、
[Google アナリティクスで AMP ソーシャル インタラクションをトラッキングする](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)もご覧ください）。

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
