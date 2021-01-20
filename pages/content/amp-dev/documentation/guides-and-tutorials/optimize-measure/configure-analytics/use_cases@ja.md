---
"$title": Use cases
"$order": '2'
description: このガイドでは、ユーザーエンゲージメントをトラッキングするための一般的な使用事例をご紹介します。注意 – 使用事例の追加を希望される場合はお知らせください。
formats:
- websites
---

このガイドでは、ユーザーエンゲージメントをトラッキングするための一般的な使用事例をご紹介します。

[tip type="note"]  <strong>注意 –</strong> 使用事例の追加を希望される場合は[お知らせください。](../../../../documentation/guides-and-tutorials/contribute/index.md)ご自分の使用事例を公開することもできます。詳しくは、<a>公開方法</a>をご覧ください。[/tip]

## ページビューのトラッキング

[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) と [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) を使用してページビューをトラッキングする方法について説明します。

### <code>amp-pixel</code> を使用する

[ ` amp-pixel {/ code1} {/ a0}を使用して、指定されたURLにページビューデータを送信します。`](../../../../documentation/components/reference/amp-pixel.md)

```html
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
```

### amp-analytics を使用する（ベンダーなし）

以下の例では、指定の URL にページビュー データを送信する際に [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) を使用しています。

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

### amp-analytics を使用する（googleanalytics）

以下の例では、Google アナリティクスにページビュー データを送信しています（[Google アナリティクスのページトラッキング](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)もご覧ください）。

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

## ページクリックのトラッキング <a name="tracking-page-clicks"></a>

ソーシャルインタラクションをトラッキングするには、[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) を使用して、イベントデータを指定の URL と [Google アナリティクス](https://developers.google.com/analytics/devguides/collection/amp-analytics/)に送信します。

### 指定の URL にデータを送信する

以下の例では、`selector` 属性を使用して指定の URL に `click` イベントを送信します。イベントはユーザーがリンク（`<a href>`）をクリックするたびに送信されます。

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

### Google アナリティクスにデータを送信する

以下の例では、`trigger` の `selector` 属性を使用して、特定の要素がクリックされたときに `click` イベントを Google アナリティクスに送信します（[Google アナリティクスの AMP イベントトラッキング](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)もご覧ください）。

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

## スクロールのトラッキング <a name="tracking-scrolling"></a>

ページスクロールをトラッキングするには [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) を使用します。以下の例では、`scrollspec` 属性を使用して、ユーザーがページを垂直方向に 25%、50%、90% スクロールしたときに、指定の URL に `scroll` イベントが送信されるようにしています。また、ページを水平方向に `scroll` 幅の 90% スクロールしたときにもイベントが発生します。

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

## ソーシャルインタラクションのトラッキング <a name="tracking-social-interactions"></a>

ソーシャルインタラクションをトラッキングするには、[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) を使用して、イベントデータを指定の URL と [Google アナリティクス](https://developers.google.com/analytics/devguides/collection/amp-analytics/)に送信します。

### 指定の URL にデータを送信する

以下の例では、`selector` 属性を使用して、指定の URL に `click` イベントを送信します。イベントはユーザーがツイート（`#tweet-link`）をクリックするたびに送信されます。

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

### Google アナリティクスにデータを送信する

以下の例では、`trigger` の `selector` 属性を使用して、特定のソーシャルボタンがクリックされたときにイベントを送信します（[Google アナリティクスの AMP ソーシャルインタラクションのトラッキング](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)もご覧ください）。

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
