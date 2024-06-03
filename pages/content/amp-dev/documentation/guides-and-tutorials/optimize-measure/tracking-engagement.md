---
$title: How to configure basic analytics for your AMP pages
$order: 100
description: 'Analytics platforms are commonly integrated into websites through inline JavaScript snippets and function calls, which trigger events that are sent back to the analytics system.'
tutorial: true
formats:
    - websites
    - stories
    - ads
---

Analytics platforms are commonly integrated into websites through inline JavaScript snippets and function calls, which trigger events that are sent back to the analytics system. AMP provides a flexible JSON configuration syntax to replicate this process for several analytics partners.

[tip]
**TIP –** If you're using Google Analytics as your analytics provider, learn [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md).
[/tip]

## Google Analytics 4 and AMP

For information on how to set up Google Analytics 4 with amp-analytics see [amp-analytics dev guide](https://developers.google.com/analytics/devguides/collection/amp-analytics) and [Tag setup for AMP](https://developers.google.com/tag-platform/gtagjs/amp?technology=gtagjs) documentation.

**The rest of this document mostly talks about Universal Analytics which is [superseded](https://support.google.com/analytics/answer/11583528?sjid=14304562669355559826-NA) by Google Analytics 4**.

## For context: Analytics on non-AMP pages

The following is an example of traditional JavaScript-driven Google Analytics tracking. We'll rewrite this into the [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) JSON format but first, let's look at the traditional approach:

```html
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
```

This JavaScript is quite simple; it sends a notification to track the pageview event.

## Step 1: Include `amp-analytics` script

To replicate this functionality in AMP, we must first **include** the [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) component library in our document’s `<head>`:

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

## Step 2: Add configuration code

Then, let's **add** the [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) component to the end of the `body` of the document:

```html
<amp-analytics type="googleanalytics">
<script type="application/json">
{
  "vars": {
    "account": "UA-YYYY-Y"
  },
  "triggers": {
    "default pageview": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "Name of the Article"
      }
    }
  }
}
</script>
</amp-analytics>
```

Just as with the JavaScript example at the top of this page, this [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) snippet will send a notification to Google Analytics indicating that a page has been viewed.

To specify this, we've set the `type` to `googleanalytics` and then in the JSON we've created a trigger we've called "default pageview".  This trigger will fire when the page is visible (due to the `"on": "visible"`) and when it fires we'll send a `pageview` analytics request to Google Analytics with the `vars` we have specified.

The JSON used to configure [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) is a very flexible format for describing what analytics data to send and when to send it.  The [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) has complete details on the format.

## Step 3: Adding more triggers

Building on the above example, we can **add** another trigger named `"click on #header trigger"`:

```html
<amp-analytics type="googleanalytics">
<script type="application/json">
{
  "vars": {
    "account": "UA-YYYY-Y"
  },
  "triggers": {
    "default pageview": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "Name of the Article"
      }
    },
    "click on #header trigger": {
      "on": "click",
      "selector": "#header",
      "request": "event",
      "vars": {
        "eventCategory": "examples",
        "eventAction": "clicked-header"
      }
    }
  }
}
</script>
</amp-analytics>
```

As you can guess from the name of this new trigger it will fire when the element with the ID `"header"` is clicked (specified by `"on": "click"` and `"selector": "#header"`).  When this trigger fires, we'll send the `event` request to our analytics provider, specifying a couple of variables to include in the request.

If you have a custom tracking platform that you want to integrate with, you can still use [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) and define your own personalized URL endpoints to send tracking data to. Learn more in the [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) component reference documentation.

[tip type="note"]
**NOTE –**  `“UA-YYYY-Y”` is an example Google Analytics account; it should be replaced with your own website’s Google Analytics tracking code if you are using this example on your site.
[/tip]

[tip type="tip"]
**TIP –** If you are interested in a simpler tracking system, you might want to take a look at [`amp-pixel`](../../../documentation/components/reference/amp-pixel.md). If you only need to track pageviews, [`amp-pixel`](../../../documentation/components/reference/amp-pixel.md) it is a lighter-weight solution than [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) because it only aims to solve the requirements of traditional pixel tracking. Learn more in the [Analytics: the basics guide](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md).
[/tip]
