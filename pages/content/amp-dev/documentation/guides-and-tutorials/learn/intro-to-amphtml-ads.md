---
$title: Intro to AMPHTML ads
$order: 1
description: 'AMPHTML ads are a faster, lighter and more secure way to advertise on the web. Although AMP pages support traditional HTML ads, these ads can be slow to load.'
formats:
  - ads
---

## What's an AMPHTML ad?

AMPHTML ads are a faster, lighter and more secure way to advertise on the web. Although AMP pages support traditional HTML ads, these ads can be slow to load. To make ads themselves as fast as the rest of the AMP page, you can build ads in AMPHTML. AMPHTML ads are only delivered after being validated, ensuring that the ads are secure and performant. Most of all, these ads can be delivered anywhere on the web, _not just on AMP pages_.

AMPHTML ads are written in AMP HTML according to the [AMPHTML ad spec](a4a_spec.md) (a variant of AMP HTML + CSS). This means that ads no longer have the ability to run arbitrary JavaScript, which is traditionally the number one cause of poor ad performance. Therefore, just like core AMP, the core ads JavaScript use-cases are built right into the AMP Open Source project which guarantees good behavior from ads.

### Benefits

Why are AMPHTML ads better than traditional ads?

1.  **Faster**: AMPHTML ads are faster because the ads are requested earlier in the page rendering process, and immediately displayed just before the user is about to view the ad. The reduced file size of AMPHTML ads also increases speed.
1.  **Lighter**: AMPHTML ads combine commonly used ad functionality, which reduces the ad's file size. Once on the page, AMPHTML ads also consume less resources. For example, instead of 10 trackers requesting their own information in regular ads, AMPHTML ads collect all the data once and distribute it to any number of interested trackers.
1.  **Coordinated**: On AMP pages, the [AMP runtime](spec/amphtml.md#amp-runtime) can coordinate a mobile phone's limited resources to the right component at the right time to give the best user experience. For example, AMPHTML ads with animations are paused when the ads are not in the current viewport.
1.  **More Engaging**: Users can't engage with ads they can't see. Faster ads lead to higher viewability and therefore higher click-through rates, which ultimately leads to better ad performance.
1.  **Safe from Malware**: It's impossible to spread malware with AMPHTML ads because the ads are verified before being served. Because of this, advertisers can ensure a safe user experience and positive brand perception.
1.  **More Flexible**: AMPHTML ads are designed to work on both AMP and non-AMP web pages, as well as across any device.

### Formats

AMPHTML ads are flexible and dynamic, allowing for many creative formats like carousel, parallax, and lightbox, to name a few. Get started by leveraging the open-source AMPHTML ad templates on [Examples](../../../documentation/examples/index.html).

<table class="nocolor">
  <tr>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive"
    src="/static/img/docs/ads/amp-ad-01-carousel.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive"
    src="/static/img/docs/ads/amp-ad-02-video-parallax.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive"
    src="/static/img/docs/ads/amp-ad-03-lightbox.gif">
    </amp-anim></td>
  </tr>
  <tr>
    <td>Carousel</td>
    <td>Video Parallax</td>
    <td>Lightbox</td>
  </tr>
</table>

## How AMPHTML ads work

{{ image('/static/img/docs/ads/amphtml-ads-how.svg', 1019, 434, alt='Serving AMPHTML ads to AMP pages', caption='Serving AMPHTML ads to AMP pages', align='' ) }}

1.  Publishers insert an ad slot on their AMP page via the [`amp-ad`](../../../documentation/components/reference/amp-ad.md) tag, specifying the ad network they wish to use.
1.  The AMP Runtime sends an ad request to the specified ad network to retrieve the ad. Ad networks capable of serving AMPHTML ads provide a [Fast Fetch implementation](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md) that validates and signs the creative.
1.  The ad network responds with the AMPHTML ad and the AMP Runtime renders the ad on the AMP page.

[tip type="note"]
No special integration is needed to serve AMPHTML ads to non-AMP pages. Check with your ad network to see if they support AMPHTML ads.
[/tip]

## Serving AMPHTML ads

### Publishers

To serve your direct-sold ad formats in AMPHTML, you must create the ads according to the [AMPHTML ad spec](a4a_spec.md) and deliver them using an ad server that supports AMPHTML ad serving.  Currently, the following ad servers support AMPHTML ads:

*   DoubleClick for Publishers
*   TripleLift
*   Dianomi
*   Adzerk
*   Google AdSense

To deliver AMPHTML ads through your indirect channels (e.g., exchange, SSP, etc.), use a supporting ad network/ad server on the [following list](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md).

### Creative agencies

If you are a creative agency, you must create the ads in accordance with  the [AMPHTML ad spec](a4a_spec.md). For inspiration and examples, see the open-source AMPHTML ad templates on [Examples](../../../documentation/examples/index.html). Alternatively, use one of the following tools to create AMPHTML ads:

*  [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
*  [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
*  Adobe Animate (*coming soon*)

### Ad networks/servers

To deliver AMPHTML ads to AMP pages, you need to create an [`amp-ad`](../../../documentation/components/reference/amp-ad.md) extension for your network (unless you already have one) which uses the [Fast Fetch ad request implementation](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md).  Refer to [Integrating with AMP to serve display ads](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md) for details.  Keep in mind that no special integration is needed to serve AMPHTML to non-AMP pages.

## Creating AMPHTML ads

**From scratch**: AMPHTML ads must follow  the [AMPHTML ad spec](a4a_spec.md).  For demos and examples, see the open-source AMPHTML ad templates on [Examples](../../../documentation/examples/documentation/amp-ad.html).

**Using tools**: You can use any of the following tools to build AMPHTML creatives:

*  [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
*  [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
*  Adobe Animate (*coming soon*)

### Validate AMPHTML ad syntax

After creating your AMPHTML ad, you should make sure that the ad is using the correct AMPHTML syntax. Depending on your development environment, there are a few options for you to validate your AMPHTML ads:

*   Use the [AMP validator NPM](https://www.npmjs.com/package/amphtml-validator) module to integrate validation into your build CI.
*   Use the [AMP validator](https://validator.ampproject.org/) for one-off testing.
*   Partner with [Cloudflare](https://blog.cloudflare.com/amp-validator-api/) and use their public validator end point.

[tip type="note"]
**NOTE –**  To render AMPHTML ads quickly on AMP pages (i.e., using preferential rendering in Fast Fetch), the syntax must be correct.  If the syntax isn't valid, the ad will still render, just not as quickly.
[/tip]

## Supporting AMPHTML ads in RTB

For SSPs and ad exchanges that want to support AMPHTML ads in a Real-Time Bidding (RTB) environment, refer to the [Implementation Guide for RTB Ad Exchanges](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/RTBExchangeGuide.md) for details.

## FAQs

#### Are there any AMPHTML ad samples?

Yes. A number of great looking AMPHTML ad templates can be found on [Examples](../../../documentation/examples/documentation/amp-ad.html). These samples use advanced components in AMP.

#### Do AMPHTML ads support 3rd party verification and viewability detection?

Yes, there is native support for verification and viewability detection using [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) (e.g., Google's ActiveView integrates this way). There are also other vendors like MOAT that are actively implementing support for it.

#### Do AMPHTML ads support timeline-based animation?

Yes. See [`amp-animation`](../../../documentation/components/reference/amp-animation.md).

#### Most ads have tappable targets and configurable ad exits. Do AMPHTML ads have a similar mechanism?

Yes. See [`amp-ad-exit`](../../../documentation/components/reference/amp-ad-exit.md).

#### I can't find what I need, where can I ask questions?

*   [Stack Overflow](http://stackoverflow.com/questions/tagged/amp-html) is our recommended way to find answers to questions about AMP; since members of the AMP Project community regularly monitor Stack Overflow you will probably receive the fastest response to your questions there.
*   Join the [Slack #a4a-discuss](https://docs.google.com/forms/d/e/1FAIpQLSd83J2IZA6cdR6jPwABGsJE8YL4pkypAbKMGgUZZriU7Qu6Tg/viewform?fbzx=4406980310789882877) channel for solutions and answers.
*   If you encounter a bug in AMP or have a feature request for AMP, see [Reporting issues with AMP](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#reporting-issues-with-amp) for information on filing an issue.
