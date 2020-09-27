---
$title: Advertise in Web Stories
$order: 3
description: 'Web Stories are a full-screen tappable experience that immerses readers in the content. Advertising with AMP Story ads allows for seamless and disruption-free ...'
formats:
  - stories
author: CrystalOnScript
---

Web Stories are a full-screen tappable experience that immerses readers in the content. Advertising with AMP Story ads allows for seamless and disruption-free integration into the user’s journey, keeping them engaged and delighted by the platform.

##Ad Placement
Unlike AMP web pages, where the amount and location of ads is designated by the placement of multiple [`amp-ad`](../../../documentation/components/reference/amp-ad.md) components, Web Stories rely on a single  [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) component to dictate ad quantity and placement.

The [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) extension is a wrapper around the [`amp-ad`](../../../documentation/components/reference/amp-ad.md) component that dynamically inserts one or multiple ads while the user consumes the story content. To ensure the best user experience:

1. Ads are pre-rendered by the Web Stories runtime, then inserted. This guarantees that the users will never be shown a blank or unloaded ad.

2. Ad density is optimised with content ratio to prevent oversaturation. The [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) extension decides when and where to insert ads as the user progresses.

The AMP runtime makes the ad call as early as possible and places the first one sometime after the first two pages, and never as the last page.


<amp-anim width=360 height=640 src="/static/img/docs/stampads/stamp_gif_ad.gif">
  <amp-img placeholder width=360 height=640 src="/static/img/docs/stampads/stamp_gif_still.png">
  </amp-img>
</amp-anim>

[tip type="note"]
**NOTE –** A longer AMP Story creates more opportunities for ad placement. The exact placement of the ad algorithm will continue to be optimized over time.
[/tip]

##User Interaction
Users can progress past ads the same way as normal story pages; by tapping the right two thirds of the screen.

{{ image('/static/img/docs/stampads/story_ad_ui.png', 304, 512, layout='intrinsic', alt='Image showing the area users can tap to skip an ad', caption='Users can progress past ads by tapping the right two thirds of the screen.', align='' ) }}

Users can interact directly with the ad by tapping the system rendered [call to action](story_ads_best_practices.md#call-to-action-button-text-enum) button that appears in the bottom third of all AMP Story ads. Tapping on the button could send the user to one of the following locations, configured by the ad creator:

* An AMP web page
* A non-AMP web page
* The App Store or Google Play Store
* [A Sponsored Story](story_ads_best_practices.md#sponsored-story)

{{ image('/static/img/docs/stampads/sponsored_story.png', 1600, 597, layout='intrinsic', alt='Image showing that usersare redirected to an ad landing destination, but can return to the story.', caption='Users are redirected to an ad landing destination, but can return to the story.', align='' ) }}

##Configure
Web Stories cannot support an [`amp-ad`](../../../documentation/components/reference/amp-ad.md) directly on the page. Instead, all ads are fetched and displayed by the [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) extension. The [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) component must be placed as a direct child element of [`amp-story`](../../../documentation/components/reference/amp-story.md).

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

Unlike a normal [`amp-ad`](../../../documentation/components/reference/amp-ad.md), no `<fallback>` or `<placeholder>` is required, as AMP Story ads will only be displayed once fully rendered.

##Integrate Ad Server Support
The easiest way to include ads in your AMP Story is by serving ads from a supported ad server.

Ad servers that currently support AMP Story ads:

* [Google Ad Manager (previously  DoubleClick)](advertise_amp_stories.md#google-ad-manager)

If you are an ad server interested in serving story ads please contact us by filing a [GitHub Issue](https://github.com/ampproject/amphtml/issues/new). The AMP team will happily get in touch!

Publishers can also place custom ads if they set up their own ad server. [The process is detailed here](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/amp-story-ads.md#publisher-placed-ads).

## Google Ad Manager <a name="google-ad-manager"></a>

Ad server information is designated within the [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) component at the start of the AMP story.

You must specify a JSON configuration object within the [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) component that specifies how ads should be fetched and displayed.The following fields are required to serve and ad with Google Ad Manager:

* `"type"`  must be specified as `"doubleclick"`
* `"data-slot"` must be paired with your ad unit

[sourcecode:html]
<amp-story>
  <amp-story-auto-ads>
    <script type="application/json">
      {
        "ad-attributes": {
          "type": "doubleclick",
          "data-slot": "/30497360/a4a/amp_story_dfp_example"
        }
      }
    </script>
  </amp-story-auto-ads>
  <amp-story-page>
  ...
</amp-story>
[/sourcecode]

These key value pairs are copied over to the [`amp-ad`](../../../documentation/components/reference/amp-ad.md) element generated for the Story. Additional information needed for the element can be added in place of `additional_data`, such as `targeting`.

[sourcecode:html]
<amp-story>
  <amp-story-auto-ads>
    <script type="application/json">
     {
       "ad-attributes": {
         "type": "doubleclick",
         "data-slot": "/30497360/a4a/amp_story_dfp_example",
         "additional_data": "additional_data_information"
       }
     }
    </script>
  </amp-story-auto-ads>
  <amp-story-page>
  ...
</amp-story>
[/sourcecode]

[tip type="note"]
Read [Traffic custom creatives in Web Stories](https://support.google.com/admanager/answer/9038178) for information about uploading ads to Google Ad Manager and checkout our guide on [Best practices for creating an AMP Story ad](story_ads_best_practices.md).
[/tip]
