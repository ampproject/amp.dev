---
$title: Use cases
$order: 2
description: 'This guide provides a set of common use cases for tracking user engagement: NOTE – Want to add a use case? Let us know.'
formats:
  - websites
---

This guide provides a set of common use cases for tracking user engagement:

[tip type="note"]
**NOTE –**  Want to add a use case? [Let us know.](https://github.com/ampproject/docs/issues/new) Or you can also contribute your own use cases, see [How to Contribute](../../../../documentation/guides-and-tutorials/contribute/index.md).
[/tip]

## Tracking page views

Learn how to track page views using [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) and [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

### Using `amp-pixel`

Send pageview data to a specified URL using
[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md):

```html
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
```

### Using amp-analytics - no vendor

Send pageview data to a specified URL using
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

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

### Using amp-analytics - googleanalytics

Send pageview data to Google Analytics
(see also [Page tracking in Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)):

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

## Tracking page clicks <a name="tracking-page-clicks"></a>

Learn how to track page clicks using
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md),
sending event data to a specified URL, and to
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Sending data to specified URL

The following example uses the `selector` attribute to send a `click` event
to the specified URL everytime a user clicks on a link (`<a href>`):

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

### Sending data to Google Analytics

The following example uses the `selector` attribute of the `trigger`
to send a `click` event to Google Analytics when a particular element is clicked
(see also
[AMP event tracking in Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

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

## Tracking scrolling <a name="tracking-scrolling"></a>

Track page scrolling using [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
The following example uses the `scrollspec` attribute to send a `scroll` event
to the specified URL when page is scrolled vertically by 25%, 50% and 90%.
The event also fires when the page is horizontally scrolled
to 90% of `scroll` width:

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

## Tracking social interactions <a name="tracking-social-interactions"></a>

Learn how to track social interactions using
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md),
sending event data to a specified URL, and to
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Sending data to specified URL

The following example uses the `selector` attribute to send a `click` event
to the specified URL everytime a user clicks on a tweet (`#tweet-link`):

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

### Sending data to Google Analytics

The following example uses the `selector` attribute of the `trigger`
to send an event when a particular social button is clicked
(see also
[AMP social interactions tracking in Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

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
