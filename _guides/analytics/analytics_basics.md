---
layout: page
title: Analytics&#58; the Basics
order: 0
---

Start here to learn the basics about AMP analytics.

{% include toc.html %}

## Use amp-pixel or amp-analytics?

AMP provides two components to meet your analytics and measurement needs:
[amp-pixel](/docs/reference/amp-pixel.html) and
[amp-analytics](/docs/reference/extended/amp-analytics.html).
Both options send analytics data to a defined endpoint.

If you are looking for behavior like a simple
[tracking pixel](https://en.wikipedia.org/wiki/Web_beacon#Implementation),
the `amp-pixel` component provides basic page view tracking;
page view data gets sent to a defined URL.
Some integrations with a vendor may call for this component,
in which case they will specify the exact URL endpoint. 

For most analytics solutions, use `amp-analytics`.
Page view tracking works in `amp-analytics` too.
But you can also track user engagement with any type of page content,
including clicks on links, buttons, videos.
And you can measure how far on the page the user scrolled,
whether or not the user engaged with social media, and more.
[Deep Dive into Amp Analytics](/docs/guides/analytics/deep_dive_analytics.html).

As part of integrating with the AMP platform,
many analytics providers have simplified `amp-analytics` configurations
so that's it's easy to capture data and push to their tracking tools.
Access vendor documentation from the
[amp-analytics specification](/docs/reference/extended/amp-analytics.html).

**Note:** You can use both `amp-pixel` and `amp-analytics` in your pages:
`amp-pixel` for simple page view tracking,
and `amp-analytics` for everything else.
Keep in mind that simpler AMP pages are better for users,
so if you don’t need the extra tags, don’t use them.

## Create a simple analytics configuration

Learn how to create a simple
[amp-pixel](/docs/reference/amp-pixel.html) and
[amp-analytics](/docs/reference/extended/amp-analytics.html) configuration.

### Simple amp-pixel configuration

To create a simple `amp-pixel` configuration,
insert something like the following into the body of your AMP page:

{% highlight html linenos %}
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
{% endhighlight %}

In this example,
the page view data gets sent to the defined URL, along with a random number.
The `RANDOM` variable is one of many
[supported variables in the AMP platform](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md).
Learn more about
[Variable substitution](/docs/guides/analytics/analytics_basics.html#variable-substitution) here.

The [amp-pixel](/docs/reference/amp-pixel.html)
component is built-in,
so you won’t need an inclusion declaration.
But you should place the `amp-pixel` tag as close as possible
to the start of your body.
The tracking pixel will only fire when the tag comes into view itself.
If `amp-pixel` is positioned near the bottom of the page,
it may not fire.

### Simple amp-analytics configuration

To create a simple
[amp-analytics](/docs/reference/extended/amp-analytics.html) configuration,
you must first include this `custom-element` declaration
in the head of the AMP document:

{% highlight html linenos %}
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
{% endhighlight %}

Similar to the [amp-pixel example](/docs/guides/analytics/analytics_basics.html#simple-amp-pixel-configuration),
the following `amp-analytics` sample tracks page views and
sends the data to a defined URL along with a random ID: 

{% highlight html linenos %}
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM",
  },
  "triggers": {
    "pixel emulation": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
{% endhighlight %}

The `requests` attribute defines what data gets sent to where.
In this example, the data is the `pageview`, and it’s sent
to the specified URL, `https://foo.com/pixel?`, along with a random ID.

The `triggers` attribute defines when the data gets sent.
When the page is `visible`,
an event triggers and the `pageview` request is sent.
Learn more about [requests and triggers](/docs/guides/analytics/deep_dive_analytics.html#requests-triggers--transports).

## Variable substitution

Both the [amp-pixel](/docs/reference/amp-pixel.html) and
[amp-analytics](/docs/reference/extended/amp-analytics.html) components
allow all standard URL variable substitutions (see also
[AMP HTML Variable Substitutions](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)).
In the following example,
the page view request is sent to the URL,
along with the current AMP document’s canonical URL, it’s title, and a
[client ID](/docs/guides/analytics/analytics_basics.html#user-identification):

{% highlight html linenos %}
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(cid-scope)}"></amp-pixel>
{% endhighlight %}

Due to it’s simplicity,
the `amp-pixel` tag can only include variables defined by the platform
or that the AMP runtime can parse from the AMP page.
The `amp-analytics` tag can include the same variables as `amp-pixel`,
as well as uniquely defined variables inside the tag configuration. 

Use the format `${varName}` in a request string for a page
or platform-defined variable.
The `amp-analytics` tag will replace the template with its actual value
at the time of construction of the analytics request (see also
[Variables supported in amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)).

In the following example, the page view request is sent to the URL,
with additional data extracted from variable substitutions,
some provided by the platform,
some within the `amp-analytics` configuration itself:

{% highlight html linenos %}
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview":"https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(cid-scope)}",
  },
  "vars": {
    "account": "ABC123",
  },
  "triggers": {
    "some-event": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
        "clientId": "user12345"
      }
    }
  }  
}
</script>
</amp-analytics>
{% endhighlight %}

In the above example,
the variables, `account`, `title`, and `clientID` are defined
in the `amp-analytics` configuration.
The `canonicalUrl` variable isn’t defined in the configuration,
so it's value gets substituted by the platform.

**Important:** Variable substitution is flexible;
you can have the same variables defined in different locations,
and the AMP runtime will parse the values in this order of precedence
(see [Variable substitution ordering](/docs/guides/analytics/deep_dive_analytics.html#variable-substitution-ordering)).

## User identification

Websites use cookies to track a user’s browsing history;
cookies tell the browser that a user visited a web page.
In AMP,
pages can be served from either a publisher's website or the AMP Cache.
The publisher’s website and the AMP Cache have different domains.
For security reasons,
browsers can (and often will) limit access to another domain’s cookies
(see also
[Tracking users across origins](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/cross-origin-tracking.md)).

By default,
AMP automatically creates a client ID to identify
that a user has accessed an AMP page,
regardless if that page is accessed from the publisher’s website
or the AMP Cache.
The AMP-generated client ID has a value of `"amp-"`
followed by a random `base64` encoded string and remains the same
for the same user if they visit again within one year.

The client ID is always created by AMP
anytime the user accesses an AMP page directly from the AMP Cache.
But in the case when the AMP page is accessed directly
from the publisher’s side,
the publisher can override the client ID value
via a cookie read from the first-party context.

To override the AMP-generated client ID,
use the special string `CLIENT_ID` to add a per document-source-origin
(the origin of the website where you publish your AMP doc).
You must include the `cid-scope`,
the name of the fallback cookie when the document isn’t served
by the AMP Cache.

For example:

{% highlight html linenos %}
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(cid-scope-cookie-fallback-name)"></amp-pixel>
{% endhighlight %}

Learn more about client ID substitution,
including how to add an optional user notification ID, in
[Variables supported in AMP analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md).