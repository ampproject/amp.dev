---
$title: "Analytics: the basics"
$order: 0
toc: true
---

Start here to learn the basics about AMP analytics.

[TOC]

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
including clicks on links and buttons.
And you can measure how far on the page the user scrolled,
whether or not the user engaged with social media, and more.

{% call callout('Learn more', type='read') %}
See [Deep Dive into AMP Analytics](/docs/guides/analytics/deep_dive_analytics.html).
{% endcall %}


As part of integrating with the AMP platform,
providers have offered pre-defined `amp-analytics` configurations
so that it's easy to capture data and push to their tracking tools.
Access vendor documentation from the
[Analytics Vendors](/docs/guides/analytics/analytics-vendors.html) list.

You can use both `amp-pixel` and `amp-analytics` in your pages:
`amp-pixel` for simple page view tracking,
and `amp-analytics` for everything else.
You can also add multiples of each tag.
If you're working with multiple analytics providers,
you will need one tag per solution.
Keep in mind that simpler AMP pages are better for users,
so if you don’t need the extra tags, don’t use them.

## Create a simple analytics configuration

Learn how to create a simple
[amp-pixel](/docs/reference/amp-pixel.html) and
[amp-analytics](/docs/reference/extended/amp-analytics.html) configuration.

### Simple amp-pixel configuration

To create a simple `amp-pixel` configuration,
insert something like the following into the body of your AMP page:

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
[/sourcecode]

In this example,
the page view data gets sent to the defined URL, along with a random number.
The `RANDOM` variable is one of many
[substitution variables in the AMP platform](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md).
Learn more about
[Variable substitution](/docs/guides/analytics/analytics_basics.html#variable-substitution) here.

The [amp-pixel](/docs/reference/amp-pixel.html)
component is built-in,
so you won't need an inclusion declaration like you do
for AMP's extended components, including `amp-analytics`.
But you should place the `amp-pixel` tag as close as possible
to the start of your `<body>`.
The tracking pixel will only fire when the tag comes into view itself.
If `amp-pixel` is positioned near the bottom of the page,
it may not fire.

### Simple amp-analytics configuration

To create a simple
[amp-analytics](/docs/reference/extended/amp-analytics.html) configuration,
you must first include this `custom-element` declaration
in the `<head>` of the AMP document (see also
[Component inclusion declaration](/docs/reference/extended.html#component-inclusion-declaration)):

[sourcecode:html]
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
[/sourcecode]

The following example is similar to the [`amp-pixel` example](/docs/guides/analytics/analytics_basics.html#simple-amp-pixel-configuration).
Everytime a page is visible,
the trigger event fires, and
sends the pageview data to a defined URL along with a random ID:

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM",
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
[/sourcecode]

In the above example, we have defined a request called pageview to be https://foo.com/pixel?RANDOM. As discussed earlier, RANDOM is substituted by a random number, so the request will actually end up looking like https://foo.com/pixel?0.23479283687235653498734.

When the page becomes visible
(as specified by the use of the trigger keyword `visible`),
an event triggers and the `pageview` request is sent.
The triggers attribute determines when the pageview request fires.
Learn more about [requests and triggers](/docs/guides/analytics/deep_dive_analytics.html#requests-triggers--transports).

## Variable substitution

Both the [amp-pixel](/docs/reference/amp-pixel.html) and
[amp-analytics](/docs/reference/extended/amp-analytics.html) components
allow all standard URL variable substitutions (see
[AMP HTML Variable Substitutions](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)).
In the following example,
the page view request is sent to the URL,
along with the current AMP document’s canonical URL, its title, and a
[client ID](/docs/guides/analytics/analytics_basics.html#user-identification):

[sourcecode:html]
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
[/sourcecode]

Due to its simplicity,
the `amp-pixel` tag can only include variables defined by the platform
or that the AMP runtime can parse from the AMP page.
In the above example,
the platform populates the values for both
`canonicalURL` and `clientId(site-user-id)`.
The `amp-analytics` tag can include the same variables as `amp-pixel`,
as well as uniquely defined variables inside the tag configuration.

Use the format `${varName}` in a request string for a page
or platform-defined variable.
The `amp-analytics` tag will replace the template with its actual value
at the time of construction of the analytics request (see also
[Variables supported in amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)).

In the following `amp-analytics` example,
the page view request is sent to the URL,
with additional data extracted from variable substitutions,
some provided by the platform,
some defined inline,
within the `amp-analytics` configuration:

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview":"https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}",
  },
  "vars": {
    "account": "ABC123",
  },
  "triggers": {
    "someEvent": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
      }
    }
  }
}
</script>
</amp-analytics>
[/sourcecode]

In the above example,
the variables, `account` and `title` are defined
in the `amp-analytics` configuration.
The `canonicalUrl` and `clientId` variables aren't defined in the configuration,
so their values get substituted by the platform.

{% call callout('Important', type='caution') %}
Variable substitution is flexible; you can have the same variables defined in different locations, and the AMP runtime will parse the values in this order of precedence (see [Variable substitution ordering](/docs/guides/analytics/deep_dive_analytics.html#variable-substitution-ordering)).
{% endcall %}


## User identification

Websites use cookies to store information specific to a user in the browser.
Cookies can be used to tell that a user has visited a site before.
In AMP,
pages can be served from either a publisher's website or a cache
(like the Google AMP Cache).
The publisher's website and the cache are likely to have different domains.
For security reasons,
browsers can (and often will) limit access to another domain’s cookies
(see also
[Tracking users across origins](https://github.com/ampproject/amphtml/blob/master/spec/amp-managing-user-state.md)).

By default,
AMP will manage the provision of a client ID whether the page is accessed from the publisher's original website or through a cache.
The AMP-generated client ID has a value of `"amp-"`
followed by a random `base64` encoded string and remains the same
for the user if that same user visits again.

AMP manages reading and writing of the client ID in all cases.
This is particularly notable in the case when a page is served
via a cache or otherwise shown outside the viewing context
of the publisher's original site.
In this circumstance, access to the publisher site's cookies is unavailable.

When an AMP page is served from a publisher's site,
the client ID framework that AMP uses can be told about a fallback cookie
to look for and use.
In this case,
the `cid-scope-cookie-fallback-name` argument of the `clientId` variable
is interpreted as a cookie name.
The formatting may appear as either
`CLIENT_ID(cid-scope-cookie-fallback-name)` or
`${clientId(cid-scope-cookie-fallback-name)}`.

For example:

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
[/sourcecode]

If AMP finds that this cookie is set,
then the client ID substitution will return the cookie's value.
If the AMP finds that this cookie is not set,
then AMP will generate a value of the form `amp-` followed
by a random base64 encoded string.

Learn more about client ID substitution,
including how to add an optional user notification ID, in
[Variables supported in AMP analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md).

{% call callout('Learn more', type='read') %}
Continue to learn about analytics with [Deep Dive into AMP Analytics](/docs/guides/analytics/deep_dive_analytics.html) and [Use Cases](/docs/guides/analytics/use_cases.html).
{% endcall %}
