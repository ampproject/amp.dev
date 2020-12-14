---
"$title": Trường hợp sử dụng
"$order": '2'
description: 'Hướng dẫn này cung cấp một tập hợp các trường hợp sử dụng phổ biến để theo dõi mức độ tương tác của người dùng: LƯU Ý - Bạn muốn thêm một trường hợp sử dụng? Hãy cho chúng tôi biết.'
formats:
- websites
---

Hướng dẫn này cung cấp một tập hợp các trường hợp sử dụng phổ biến để theo dõi mức độ tương tác của người dùng:

[tip type = "note"] **LƯU Ý -** Bạn muốn thêm một ca sử dụng? [Hãy cho chúng tôi biết.](https://github.com/ampproject/docs/issues/new) Hoặc bạn cũng có thể đóng góp các trường hợp sử dụng của riêng mình, hãy xem [Cách đóng góp](../../../../documentation/guides-and-tutorials/contribute/index.md) . [/tiền boa]

## Theo dõi lượt xem trang

Tìm hiểu cách để theo dõi các lượt xem trang sử dụng [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) và [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

### Sử dụng `amp-pixel`

Gửi dữ liệu lượt xem trang đến một URL được quy định sử dụng [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md):

```html
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
```

### Sử dụng amp-analytics - không có nhà cung cấp

Gửi dữ liệu lượt xem trang đến một URL được quy định sử dụng [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

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

### Sử dụng amp-analytics - googleanalytics

Gửi dữ liệu lượt xem trang đến Google Analytics (xem thêm [Theo dõi lượt xem trang trong Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)):

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

## Theo dõi lượt nhấp trang <a name="tracking-page-clicks"></a>

Tìm hiểu cách để theo dõi các lượt nhấp trang sử dụng [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), gửi dữ liệu sự kiện đến một URL được quy định, và đến [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Gửi dữ liệu đến một URL được quy định

Ví dụ sau sử dụng thuộc tính `selector` (bộ chọn) để gửi một sự kiện `click` (nhấp) đến URL được quy định mỗi khi người dùng nhấn vào một liên kết (`<a href>`):

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

### Gửi dữ liệu đến Google Analytics

Ví dụ sau sử dụng thuộc tính `selector` (bộ chọn) của `trigger` (yếu tố kích hoạt) để gửi một sự kiện `click` (nhấp) đến Google Analytics khi một yếu tố cụ thể được nhấn (xem thêm [theo dõi sự kiện AMP trong Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

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

## Theo dõi cuộn <a name="tracking-scrolling"></a>

Theo dõi cuộn trang sử dụng [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Ví dụ sau đây sử dụng thuộc tính `scrollspec` để gửi một sự kiện `scroll` (cuộn) đến URL được quy định khi trang được cuộn dọc 25%, 50% và 90%. Sự kiện này cũng được kích hoạt khi trang được cuộn ngang đến 90% chiều rộng `scroll` (cuộn):

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

## Theo dõi tương tác xã hội <a name="tracking-social-interactions"></a>

Tìm hiểu cách để theo dõi tương tác xã hội sử dụng [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), gửi dữ liệu sự kiện đến một URL được quy định, và đến [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Gửi dữ liệu đến một URL được quy định

Ví dụ sau sử dụng thuộc tính `selector` (bộ chọn) để gửi một sự kiện `click` (nhấp) đến URL được quy định mỗi khi người dùng nhấn vào một tweet (`#tweet-link`):

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

### Gửi dữ liệu đến Google Analytics

Ví dụ sau sử dụng thuộc tính `selector` (bộ chọn) của `trigger` (yếu tố kích hoạt) để gửi một sự kiện khi một nút xã hội cụ thể được nhấn (xem thêm [theo dõi tương tác xã hội AMP trong Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

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
