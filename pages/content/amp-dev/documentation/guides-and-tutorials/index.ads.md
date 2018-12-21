---
$title: Introduction to advertising on AMP
$path: /documentation/guides-and-tutorials.ads.html
$localization:
  path: /{locale}/documentation/guides-and-tutorials.ads.html
$order: 0
---

The AMP Project's goals are to do what's best for the user by helping to deliver fast web pages. Advertising on AMP embraces those same goals by supporting ads that are fast, safe, compelling and effective for users. How does that get done?

Delivering ads to AMP pages is not much different than serving traditional ads on HTML pages:

{{ image('/static/img/docs/ads/ads_in_amp.svg', 647, 263, alt='delivering ads to AMP pages', align='' ) }}

1.  Starting with an AMP page, publishers creates a slot on the page to display ads. Traditionally, this is done by inserting a snippet of JavaScript, but in AMP, publishers add an [`<amp-ad>`](/docs/reference/components/amp-ad.html) tag to their AMP page for a particular ad network. To learn the details, see the [Monetizing your AMP page with ads]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/monetization.md', locale=doc.locale).url.path}}) guide.

2.  When the user loads an AMP page, the `<amp-ad>` tag sends an ad request to the ad network. To return an ad to the AMP page, ad networks build an `amp-ad` implementation. To learn the details, see the [Integrating ad networks into AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md) guide.

3.  Ad networks supply creatives built by advertisers. Advertisers can build creatives using traditional HTML, or in the new format, [AMPHTML]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/index.md', locale=doc.locale).url.path}}).

## Supported ad networks

AMP supports a large number of [ad servers and networks]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/monetization/ads_vendors.md', locale=doc.locale).url.path}}).

Note: Looking to integrate your ad technology with AMP? See these [guidelines]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/integration-guide.md', locale=doc.locale).url.path}}).

## Supported ads

AMP supports both traditional ads, and the faster, more secure AMPHTML ads.  Regardless of how they are built, ads on AMP pages are like any external resource and must play within the same [constraints placed on all resources in AMP](/learn/about-how/).   To learn more about ad requirements in AMP, see [this guide](https://github.com/ampproject/amphtml/blob/master/ads/README.md#constraints).

### Faster ads with AMPHTML ads

AMPHTML ads are a faster, lighter and more secure way to advertise on the web. Although AMP pages support traditional HTML ads, these ads can be slow to load. To make ads themselves as fast as the rest of the AMP page, you can build ads in AMPHTML. AMPHTML ads are only delivered after being validated, ensuring that the ads are free of malware. Most of all, these ads can be delivered anywhere on the web, not just on AMP pages.

Learn more about AMPHTML ads in the [AMPHTML ads]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/index.md', locale=doc.locale).url.path}}) guide.


## Get started

Visit these resources to get started with ads in AMP:

* [Monetizing your AMP page with ads]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/monetization.md', locale=doc.locale).url.path}})
* [Integrating with AMP to serve display ads]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/adnetwork_integration.md', locale=doc.locale).url.path}})
* [AMPHTML ads]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/index.md', locale=doc.locale).url.path}})
