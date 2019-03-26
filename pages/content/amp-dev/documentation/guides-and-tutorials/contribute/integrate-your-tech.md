---
$title: Integrate your technology with AMP
$order: 1
description: 'If you are a technology provider for publishers or advertisers on the web, we invite you to add support to AMP so your customers can continue to leverage your technology and ...'
formats:
  - websites
---

Publishers have created over 1.4B AMP documents that are hosted on over 750K unique domains. Such growth would have been impossible without strong support from over 100 third party tech companies that have already integrated with AMP.

If you are a technology provider for publishers or advertisers on the web, we invite you to add support to AMP so your customers can continue to leverage your technology and achieve our joint vision to build a better web.

There are 4 primary ways you can integrate with AMP:

## 1. Add your support to the `amp-analytics` extension
AMP analytics allows you to send events back to your server based on triggers configured by you. We have written an [analytics integration guide]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.md', locale=doc.locale).url.path}}) to get you started.

If you simply need to add a tracking pixel with dynamic parameters to your tracking URL, check out [`amp-pixel`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-pixel.md', locale=doc.locale).url.path}}). Be sure to document usage on your support pages for developers that may want to use your technology with AMP.

There are 20+ analytics providers who have added support to amp-analytics. Here is a [sample pull request](https://github.com/ampproject/amphtml/pull/1595) from the analytics provider [Parse.ly](https://www.parsely.com/help/integration/google-amp/).

## 2. Using an `amp-ad` extension

The amp-ad extension is reserved for serving display ads on AMP pages. Over 90 ad tech providers have added support to AMP.  To get started, read the [development overview](https://github.com/ampproject/amphtml/tree/master/ads#overview) or jump to [developer instructions](https://github.com/ampproject/amphtml/tree/master/ads#developer-guidelines-for-a-pull-request) for adding your support to the amp-ad extension. Depending on the ad technology your company provides, you might find these [integration instructions]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/contribute/ad-integration-guide.md', locale=doc.locale).url.path}}) useful.

There are 90+ ad providers who have added support for advertising related features like amp-ad. Here is a sample [pull request](https://github.com/ampproject/amphtml/pull/2299) from the ad network [Criteo](https://github.com/ampproject/amphtml/blob/master/ads/criteo.md).

## 3. Use the `amp-call-tracking` extension

If you provide call tracking measurement services, your use case may be supported with the new [`amp-call-tracking`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-call-tracking.md', locale=doc.locale).url.path}}) extension. This extension dynamically replaces a phone number in a hyperlink to enable call tracking, by executing a CORS request to substitute the number.

To learn more about how this extension might work for you, please see an [AMP By Example]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-call-tracking.html', locale=doc.locale).url.path}}) or read about the [documentation]({{g.doc('/content/amp-dev/documentation/components/reference/amp-call-tracking.md', locale=doc.locale).url.path}}).

## 4. Adding a new extension/embed

If your use case cannot be accommodated by using [`amp-analytics`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-analytics.md', locale=doc.locale).url.path}})  [`amp-pixel`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-pixel.md', locale=doc.locale).url.path}}) or [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})  please open a [GitHub issue](https://github.com/ampproject/amphtml/issues/new) to discuss alternate options. We welcome new extensions that can be broadly used by a number of different companies. See the [contributing extended components](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#contributing-extended-components) section for more details.

## 5. Using `amp-iframe`

Hold on – a 5th way?! There is indeed, but only as a last resort. If none of the above suit your needs, you could use the generic [`amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}) tag to allow publishers to embed your content, but this approach comes with a number of downsides, due to a few pitfalls related to performance and user experience that you can read about [here]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}).

## Summary

To get started, please begin by reading our [third party developer guidelines](https://github.com/ampproject/amphtml/blob/master/3p/README.md). The AMP project already supports a wide variety of third party use cases but we know that there are features of the web that are yet to be built.

For example, dynamic call tracking is a use case we don’t support in AMP yet but we are [actively working](https://github.com/ampproject/amphtml/issues/5276) with the community to add that support.

If you have questions or suggestions, please don't hesitate to [file an issue](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#filing-issues) or reach out on one of our [discussion channels](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#discussion-channels).

## Additional resources

- [AMP Project Site](https://www.ampproject.org/)
- [AMP GitHub Project](https://github.com/ampproject/amphtml)
- [AMP Blog](https://blog.amp.dev/)
- [AMP Project Roadmap]({{g.doc('/content/amp-dev/community/roadmap.html', locale=doc.locale).url.path}})
