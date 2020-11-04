---
$title: Advertise in Web Stories
$order: 3
description: 'Web Stories are a full-screen tappable experience that immerses readers in the content. Advertising with AMP Story ads allows for seamless and disruption-free ...'
formats:
  - stories
author: CrystalOnScript
---

Web Stories are a full-screen tappable experience that immerses readers in the content. Advertising with Web Story ads allows for seamless and disruption-free integration into the user’s journey, keeping them engaged and delighted by the platform.

## Ad Placement
Web Stories use a single  [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) component to dictate ad quantity and placement.

[`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) is a wrapper around the [`amp-ad`](../../../documentation/components/reference/amp-ad.md) component. It dynamically inserts one or multiple ads while the user consumes the story content. To ensure the best user experience:

1. Ads are pre-rendered by the Web Stories runtime, then inserted. This guarantees that the users will never be shown a blank or unloaded ad.

2. Ad density is optimised with content ratio to prevent oversaturation. The [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) component decides when and where to insert ads as the user progresses.

A Web Story places the first ad sometime after the first two pages with the aim of optimizing monetization revenue and user experience.

<amp-anim width=360 height=640 src="/static/img/docs/stampads/stamp_gif_ad.gif">
  <amp-img placeholder width=360 height=640 src="/static/img/docs/stampads/stamp_gif_still.png">
  </amp-img>
</amp-anim>

[tip type="note"]
**NOTE –** A longer Web Story will typically create more opportunities for ad placement. The exact placement of the ad algorithm will continue to be optimized over time.
[/tip]

## User Interaction
Users can progress past ads the same way as normal story pages; by tapping the right two thirds of the screen.

{{ image('/static/img/docs/stampads/story_ad_ui.png', 304, 512, layout='intrinsic', alt='Image showing the area users can tap to skip an ad', caption='Users can progress past ads by tapping the right two thirds of the screen.', align='' ) }}

Users interact directly with the ad by tapping the system rendered [call to action](story_ads_best_practices.md#call-to-action-button-text-enum) button that appears in the bottom third of all Web Story ads.  The button can be configured to send the user to an arbitrary URL (or to the relevant app store).

{{ image('/static/img/docs/stampads/sponsored_story.png', 1600, 597, layout='intrinsic', alt='Image showing that usersare redirected to an ad landing destination, but can return to the story.', caption='Users are redirected to an ad landing destination, but can return to the story.', align='' ) }}

## Configure a Web Story for ads
Web Stories cannot support an [`amp-ad`](../../../documentation/components/reference/amp-ad.md) directly on the page. Instead, all ads are fetched and displayed by the [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) component. The [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) component must be placed as a direct child element of [`amp-story`](../../../documentation/components/reference/amp-story.md).

[sourcecode:html]
<amp-story>
  <amp-story-auto-ads>
    <script type="application/json">
      {
        "ad-attributes": {
          // ad server configuration
        }
      }
    </script>
  </amp-story-auto-ads>
  <amp-story-page>
  ...
</amp-story>
[/sourcecode]

Unlike a normal [`amp-ad`](../../../documentation/components/reference/amp-ad.md), no `<fallback>` or `<placeholder>` is required, as Web Story ads are only displayed once fully rendered.

## Getting started with Story Ads
The easiest way to include ads in your Web Story is by serving ads from a supported ad server.

Ad platforms that currently support Web Story ads:

* Google Ad Manager
    * [Direct sold ads](https://support.google.com/admanager/answer/9038178)
    * [Programmatic ads](https://support.google.com/admanager/answer/9416436)
* Google AdSense coming soon
* Other ad platforms can integrate (contact us for [details via Github](https://github.com/ampproject/amphtml/issues/30769))


If you are an advertiser interested in running your ads inside Web Stories please [reach out](mailto:story-ads-wg@google.com) for more information.

Publishers can also place custom ads if they set up their own ad server. [The process is detailed here](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/amp-story-ads.md#publisher-placed-ads).

[tip type="note"]
Read [Traffic custom creatives in Web Stories](https://support.google.com/admanager/answer/9038178) for information about uploading ads to Google Ad Manager and checkout our guide on [Best practices for creating an AMP Story ad](story_ads_best_practices.md).
[/tip]
