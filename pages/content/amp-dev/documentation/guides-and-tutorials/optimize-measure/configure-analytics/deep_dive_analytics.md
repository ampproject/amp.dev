---
$title: Deep dive into AMP analytics
$order: 1
description: 'This guide dives deep into the amp-analytics component, breaking up a sample amp-analytics configuration into these key building blocks.'
formats:
  - websites
  - stories
---

This guide dives deep into the
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) component,
breaking up a sample [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md)configuration into these key building blocks:

The remainder of this guide uses this configuration sample,
which tracks the page views and user clicks on links
and sends the analytics data to the third-party provider,
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/):

```html
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "extraUrlParams": {
    "cd1": "AMP"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    },
    "trackAnchorClicks": {
      "on": "click",
      "selector": "a",
      "request": "event",
      "vars": {
        "eventId": "42",
        "eventLabel": "clicked on a link"
      }
    }
  },
  'transport': {
    'beacon': false,
    'xhrpost': false,
    'image': true
  }
}
</script>
</amp-analytics>
```

The above example code is to help you learn, but it's by no means a realistic sample. If you are working with analytics providers, it's likely that the above sample won't make sense; provider configurations remove complexity. Consult your [analytics provider's documentation](analytics-vendors.md) for sample configurations.

## Where to send analytics data: type attribute

AMP is designed to support two common patterns of data collection:

* Ingestion by a publisher-owned endpoint for in-house analytics systems.
* Ingestion by a vendor-owned endpoint for interoperability with a vendor solution
(for example, [Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/), [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)).

To send analytics data to an analytics provider,
include the `type` attribute in the [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) tag and set its value
to the appropriate vendor, as defind in the
[Analytics Vendors](analytics-vendors.md) list.

For example: `<amp-analytics type="googleanalytics">` sends analytics data
to the third-party analytics provider, Google Analytics.
To send data to a publisher-owned endpoint,
simply don’t include the `type` attribute;
the analytics data is sent to the defined endpoints for each
[request](deep_dive_analytics.md).

Analytics vendor configurations are a quick way
to get started with [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
You should consult your vendor’s documentation and
help resources for further guidance.
As previously mentioned,
the list of vendors who’ve already integrated with AMP, as well as links
to their specific documentation can be found in the
[Analytics Vendors](analytics-vendors.md) list.

If you’re an analytics vendor,
learn more about
[integrating your own analytics configuration into AMP HTML](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/integrating-analytics.md).

## Load remote configuration: config attribute

You don't have to include all of the configuration
for [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) entirely on your AMP page.
Instead, you can can call out to a remote URL
for all or part of the configurations.

This allows you to do things like vary the configuration
based on a specific request.
If you as the publisher have control over the remote file,
you can do any server-side processing necessary
to construct the configuration data.

The first step to loading remote configurations is
to include the config attribute in the [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) tag:

```html
<amp-analytics config="https://example.com/analytics.account.config.json">
```

The next step is to create the JSON content that lives in the remote URL.
In this simple example,
the configuration contained in the JSON object is just the variable value for the analytics account.

Example content in `https://example.com/analytics.account.config.json`:

```js
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
```

The final step is to make sure what’s in the remote file is pulled
into the appropriate place in the the [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) configuration.
In both the `pageview` and `event` requests here,
the `account` variable value is automatically set
to the account value in the remote URL (`"account": "UA-XXXXX-Y"`):

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

[tip type="important"]
**IMPORTANT –** AMP doesn’t validate against multiple uses of the same variable. Values get populated following a variable substitution order of preference, and values in remote URLs are top of that order (see [Variable substitution ordering](deep_dive_analytics.md#variable-substitution-ordering)).
[/tip]

## Requests, triggers & transports <a name="requests-triggers--transports"></a>

The `requests` attribute defines ‘what data gets sent’
(for example, `pageviews`, `events`),
and where that data gets sent (the URLs used to transmit data).

The `triggers` attribute describes when analytics data should be sent,
for example, when a user views a page, when a user clicks on a link.

The `transport` attribute specifies how to send a request,
more specifically, the protocol.

Read on to find out more about these configurations.
(You can also read about these configurations in the
[`amp-analytics` reference](../../../../documentation/components/reference/amp-analytics.md)

### What data gets sent: requests attribute <a name="what-data-gets-sent-requests-attribute"></a>

The `request-name` is used in the trigger configuration to specify
what request should be sent in response to a pariticular event.
The `request-value` is an `https` URL.
These values may include placeholder tokens
that can reference other requests or variables.

```js
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
```

Some analytics providers (including Google Analytics)
have already provided configuration,
which you use via the `type` attribute.
If you are using an analytics provider,
you may not need to include `requests` information.
See your vendor documentation to find out
if `requests` need to be configured, and how.

#### Appending request URL: Extra URL Params

The [extraUrlParams](../../../../documentation/components/reference/amp-analytics.md#extra-url-params)
attribute specifies additional parameters to append to the query string of the request URL via the usual "&foo=baz" convention.

The [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) example adds an additional parameter `cd1`
to the request and sets the parameter value to "AMP":

```js
  "extraUrlParams": {
    "cd1": "AMP"
  }
```

### When data gets sent: triggers attribute

The `triggers` attribute describes when an analytics request should be sent.
It contains a key-value pair of trigger-name and trigger-configuration.
The trigger name can be any string comprised
of alphanumeric characters (a-zA-Z0-9).

For example,
the following [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) element is configured to send a request to
`https://example.com/analytics` when the document is first loaded,
and each time an `a` tag is clicked:

```js
"triggers": {
  "trackPageview": {
    "on": "visible",
    "request": "pageview"
  },
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
```

[tip type="important"]
**IMPORTANT –** The above approach is only recommended for AMP pages and not AMPHTML ads. Since analytics priority is lower compared to content on the page, it's recommended that clicks are tracked using a browser redirect to avoid click loss.
[/tip]

AMP supports the following trigger configurations:

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">Trigger Config</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"><code>on</code> (required)</td>
      <td data-th="Description">The event to listener for. Valid values are <code>click</code>, <code>scroll</code>, <code>timer</code>, and <code>visible</code>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>request</code> (required)</td>
      <td data-th="Description">Name of the request to send (as specified in the <a href="deep_dive_analytics.md#what-data-gets-sent-requests-attribute">requests</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">An object containing key-value pairs used to override <code>vars</code> defined in the top level config, or to specify <code>vars</code> unique to this trigger (see also <a href="deep_dive_analytics.md#variable-substitution-ordering">Variable substitution ordering</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>selector</code> (required when <code>on</code> set to <code>click</code>)</td>
      <td data-th="Description">A CSS selector used to refine which elements should be tracked. Use value <code>*</code> to track all elements. This configuration is used on conjunction with the <code>click</code> trigger. Learn how to use selector to <a href="use_cases.md#tracking-page-clicks">track page clicks</a> and <a href="use_cases.md#tracking-social-interactions">social interactions</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>scrollSpec</code> (required when <code>on</code> set to <code>scroll</code>)</td>
      <td data-th="Description">Controls under which conditions when the page is scrolled the <code>scroll</code> event is fired. This object can contain <code>verticalBoundaries</code> and <code>horizontalBoundaries</code>. At least one of the two properties is required for a <code>scroll</code> event to fire. The values for both of the properties should be arrays of numbers containing the boundaries on which a scroll event is generated. See this example on <a href="use_cases.md#tracking-scrolling">tracking scrolling</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>timerSpec</code> (required when <code>on</code> is set to <code>timer</code>)</td>
      <td data-th="Description">Controls when the <code>timer</code> event is fired. The timer will trigger immediately and then at a specified interval thereafter. This configuration is used on conjunction with the <code>timer</code> trigger.</td>
    </tr>
  </tbody>
</table>

[tip type="important"]
**IMPORTANT –** Triggers from a configuration with lower precedence are overridden by triggers with the same names from a configuration with higher precedence (see [Variable substitution ordering](deep_dive_analytics.md#variable-substitution-ordering)).
[/tip]

### How data gets sent: transport attribute

The `transport` attribute specifies how to send a request.
The following three methods are enabled by default:

<table>
  <thead>
    <tr>
      <th data-th="Transport Method" class="col-thirty">Transport Method</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description">Indicates <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a> can be used to transmit the request. This will send a <code>POST</code> request, with credentials, and an empty body.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">Indicates <code>XMLHttpRequest</code> can be used to transmit the request. This will send a <code>POST</code> request, with credentials, and an empty body.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description">Indicates the request can be sent by generating an <code>Image</code> tag. This will send a <code>GET</code> request.</td>
    </tr>
  </tbody>
</table>

Only one transport method gets used,
and it's the one with the highest precedence
that's enabled, permitted, and available.
The precedence is `beacon` > `xhrpost` > `image`.
If the client's user agent does not support a method,
the next highest precedence method enabled gets used.

Include the `transport` attribute in your configuration
only if you want to limit the transport options,
otherwise, you may stop requests.

In the example below,
`beacon` and `xhrpost` are set to false,
so they will not be used even though they have higher precedence than `image`.
If the client's user agent supports the `image` method,
then it will be used; otherwise, no request gets sent.

```js
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
```

## Variable substitution ordering <a name="variable-substitution-ordering"></a>

AMP populates variables with values in an order of precedence:

1. Remote configurations (via `config`).
2. `vars` nested inside of a trigger within `triggers`.
3. `vars` at the top-level nested within [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
4. Platform-provided values.

In this example, there’s a remote configuration,
variables defined at the top-level, in triggers, and at the platform level:

```html
<amp-analytics config="http://example.com/config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(cid-scope)}",
  },
  "vars": {
    "account": "ABC123",
    "title": "Homepage"
  },
  "triggers": {
    "some-event": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
        "clientId": "my user"
      }
  }
}
</script>
</amp-analytics>
```

When the same `var` is defined in multiple locations,
the variable order of precedence sets its value once.
Thus, if the remote configuration defined `account` as UA-XXXXX-Y in the example above,
the values of various vars will be as follows:

<table>
  <thead>
    <tr>
      <th data-th="var" class="col-thirty"><code>var</code></th>
      <th data-th="Value">Value</th>
      <th data-th="Defined By" class="col-thirty">Defined By</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="var"><code>canonicalUrl</code></td>
      <td data-th="Value"><code>http://example.com/path/to/the/page</code></td>
      <td data-th="Defined By">Platform</td>
    </tr>
    <tr>
      <td data-th="var"><code>title</code></td>
      <td data-th="Value">My homepage</td>
      <td data-th="Defined By">Trigger</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">Remote configuration</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">my user</td>
      <td data-th="Defined By">Trigger</td>
    </tr>
  </tbody>
</table>
