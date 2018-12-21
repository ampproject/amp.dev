---
$title: Tracking engagement with analytics
$order: 4
---

Analytics platforms are commonly integrated into websites through inline JavaScript snippets and function calls, which trigger events that are sent back to the analytics system. AMP provides a flexible JSON configuration syntax to replicate this process for several analytics partners.

The following is an example of traditional JavaScript-driven Google Analytics tracking. We'll rewrite this into the [amp-analytics](/docs/reference/components/amp-analytics.html) JSON format but first, let's look at the traditional approach:

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

To replicate this functionality in AMP, we must first **include** the [amp-analytics](/docs/reference/components/amp-analytics.html) component library in our document’s `<head>`:

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

Then, let's **add** the `amp-analytics` component to the end of the `body` of the document:

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

Just as with the JavaScript example at the top of this page, this `amp-analytics` snippet will send a notification to Google Analytics indicating that a page has been viewed.

To specify this, we've set the `type` to `googleanalytics` and then in the JSON we've created a trigger we've called "default pageview".  This trigger will fire when the page is visible (due to the `"on": "visible"`) and when it fires we'll send a `pageview` analytics request to Google Analytics with the `vars` we have specified.

The JSON used to configure `amp-analytics` is a very flexible format for describing what analytics data to send and when to send it.  The [amp-analytics Specifying configuration data](/docs/reference/components/amp-analytics.html#specifying-configuration-data) has complete details on the format.

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

If you have a custom tracking platform that you want to integrate with, you can still use `amp-analytics` and define your own personalized URL endpoints to send tracking data to. Learn more in the [amp-analytics](/docs/reference/components/amp-analytics.html) component reference documentation.

Note: `“UA-YYYY-Y”` is an example Google Analytics account; it should be replaced with your own website’s Google Analytics tracking code if you are using this example on your site.

Tip: If you are interested in a simpler tracking system, you might want to take a look at [amp-pixel](/docs/reference/components/amp-pixel.html). If you only need to track pageviews, amp-pixel it is a lighter-weight solution than amp-analytics because it only aims to solve the requirements of traditional pixel tracking. Learn more in the [Analytics: the basics guide]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md', locale=doc.locale).url.path}}).

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/adding_carousels.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Prev</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/navigating.md', locale=doc.locale).url.path}}"><span class="arrow-next">Next</span></a>
</div>
