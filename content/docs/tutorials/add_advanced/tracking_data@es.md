---
$title: Tracking engagement with analytics
$order: 3
---

Analytics platforms are commonly integrated into websites through inline JavaScript snippets and function calls, which trigger events that are sent back to the analytics system. AMP provides a flexible JSON configuration syntax to replicate this process for several analytics partners.

The following is an example of traditional JavaScript-driven Google Analytics tracking. We'll rewrite this into the [amp-analytics'](/docs/reference/components/amp-analytics.html) JSON format but first, let's look at the traditional approach:

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

It may seem more complicated but it’s actually a very flexible format for describing several different types of events. Additionally, the JSON format does not include the blob of JavaScript code that we saw in the traditional example, which could potentially lead to mistakes if accidentally altered.

In the JSON format, the `triggers` key includes a set of keys that represent all event triggers we want to track. The keys of those triggers are descriptions of the event, for example `"default pageview"`. The `title` key value represents the name of the page being viewed.

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

This trigger is exactly what it sounds like.  By using the `"#header"` DOM selector, we can query for a tag with the `"header"` ID. For the `"click"`event, we send a `“clicked-header”` event action to the analytics platform with the `“examples”` category label.

If you have a custom tracking platform that you want to integrate with, you can still use `amp-analytics` and define your own personalised URL endpoints to send tracking data to. Learn more in the [amp-analytics](/docs/reference/components/amp-analytics.html) component reference documentation.

{% call callout('Nota', type='note') %}
In all of these analytics examples, `“UA-YYYY-Y”` should be replaced with your own website’s Google Analytics tracking code.
{% endcall %}

{% call callout('Tip', type='success') %}
If you are interested in a simpler tracking system, you might want to take a look at [amp-pixel](/docs/reference/components/amp-pixel.html). If you only need to track pageviews, amp-pixel it is a lighter-weight solution than amp-analytics because it only aims to solve the requirements of traditional pixel tracking. Learn more in the [Analytics: the basics guide](/docs/guides/analytics/analytics_basics.html).
{% endcall %}

<div class="prev-next-buttons">
  <a class="button prev-button" href="/es/docs/tutorials/add_advanced/adding_carousels.html"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="/es/docs/tutorials/add_advanced/navigating.html"><span class="arrow-next">Próximo</span></a>
</div>
