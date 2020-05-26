---
$title: Analytics vendors
$order: 3
description: 'This document lists analytics vendors that have built-in configurations for use with the amp-analytics component. To send analytics data to a third-party vendor.'
formats:
  - websites
  - stories
---

This document lists analytics vendors that have built-in configurations for use with the [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) component.

To send analytics data to a third-party vendor:

1. In the [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) tag, add the `type` attribute and set its value to the specified vendor as described in the [*Vendors*](#vendors) section below.
2. Determine what data you want to capture and track, and specify those details in the configuration data. See the vendor's documentation for instructions on how to capture analytics data.

In the following example, we send pageview data to [Google Analytics](#google-analytics), a third-party analytics provider with a built-in configuration for [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)

```html
<amp-analytics type="googleanalytics" id="analytics1">
<script type="application/json">
{
  "vars": {
    "account": "UA-XXXXX-Y"
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

[tip type="tip"]
**TIP –** If you're comfortable digging through code, you can explore the raw configurations in the [`vendors.js`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/0.1/vendors.js) file.
[/tip]

[tip type="note"]
**NOTE –**  Vendors that wish to integrate their service with [`<amp-analytics>`](../../../../documentation/components/reference/amp-analytics.md) should refer to the details in [Integrate your analytics tools with AMP](../../../../documentation/guides-and-tutorials/contribute/integrate-your-analytics-tools.md).
[/tip]

<hr>

## Vendors <a name="vendors"></a>

{% set analytics_vendors = g.doc('shared/data/analytics-vendors.md') %}
{{ analytics_vendors.format.formatted|safe }}
