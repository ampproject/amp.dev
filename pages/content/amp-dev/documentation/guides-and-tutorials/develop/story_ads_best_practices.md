---
$title: Best practices for creating a Web Story ad
$order: 16
description: 'Web Stories are a full-screen tappable experience that immerses readers in the content. Ads that appears in Web Stories should have a consistent and cohesive design with the Web Stories UX.'

formats:
  - ads
  - stories
---

Web Stories are a full-screen tappable experience that immerses readers in the content. Ads that appears in Web Stories should have a consistent and cohesive design with the Web Stories UX. This prevents a jarring or interruptive user experience. This guide demonstrates how to build an ad for Web Stories.

## Web Story ad principles
Current ad formats, such as banners and boxes, do not integrate well with the AMP Story format. Classic ads are slow, interruptive, and feel out of place within the Story experience.

Web Story ads conform to the following principles:

- Valid AMPHTML Ad: follow the same technical specification as a classic [AMPHTML ad](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/amp-a4a-format.md).
- Visual first: Inviting, bold, context-driven invitation state.
- Native: The ad page has the same dimensions as an organic story page.
- Same interaction model: User can continue to the next screen just like they would with an organic story page.
- Fast: The ad never appears to a user in a half-loaded state.

To be consistent with these principles, the Web Story runtime determines the right placement of an ad page amidst the Web Story. Read more about ad placement mechanics in [Advertise in Web Stories](advertise_amp_stories.md).

## Sample Web Story ad
Web Story ads are AMPHTML ads, but have required meta tag data, meet defined layout specifications and required UI elements. A Web Story ad will always include a call to action(CTA) button and an ad label displayed as a text disclaimer at the top of the page.

{{ image('/static/img/docs/stampads/stamp_ad.png', 425, 800, layout='intrinsic', alt='Example of an AMP Story ad', caption='Example of an AMP Story ad', align='' ) }}

To keep the user experience consistent, the Web Story runtime is responsible for rendering the ad label and the CTA button.

[tip type="important"]
**IMPORTANT –** Only the CTA button is clickable in an Web Story ad, so keep this in mind when developing your creative.
[/tip]

## Meta tag data

Meta tag data specifies that the ad meets the Web Story format, sets the CTA button text enum, directs where the button will send the user and what type of page it is.

[sourcecode:html]

<html amp4ads>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">

    <!-- Specifies where the user is directed -->
    <meta name="amp-cta-url" content="%%CLICK_URL_UNESC%%%%DEST_URL%%">

    <!-- Specifies the call to action button text enum -->
    <meta name="amp-cta-type" content="EXPLORE">

    <!-- Specifies what type of landing page the user is direct to -->
    <meta name="amp-cta-landing-page-type" content="NONAMP">

    <style amp4ads-boilerplate>body{visibility:hidden}</style>
    <style amp-custom>
     amp-img {height: 100vh}
    </style>
    <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>

  </head>
  <body>
    <amp-img src=%%FILE:JPG1%% layout="responsive" height="1280" width="720"></amp-img>
  </body>
</html>
[/sourcecode]

Choosing the `amp-cta-type tag` from the [available CTA Button text options](#call-to-action-button-text-enum) is recommended. AMP will automatically localize predefined options when appropriate.

Custom text is allowed, but you will need to implement your own localization.

## Call to action button text enum <a name="call-to-action-button-text-enum"></a>

The call to action button can be configured from a predefined set of choices:

- `APPLY_NOW`: "Apply Now"
- `BOOK_NOW`: "Book"
- `BUY_TICKETS`: "Buy Tickets"
- `DOWNLOAD`: "Download"
- `EXPLORE`: "Explore Now"
- `GET_NOW`: "Get Now"
- `INSTALL`: "Install Now"
- `LISTEN`: "Listen Now"
- `MORE`: "More"
- `OPEN_APP`: "Open App"
- `ORDER_NOW`: "Order Now"
- `PLAY`: "Play"
- `READ`: "Read Now"
- `SHOP`: "Shop Now"
- `SHOWTIMES`: "Showtimes"
- `SIGN_UP`: "Sign Up"
- `SUBSCRIBE`: "Subscribe Now"
- `USE_APP`: "Use App"
- `VIEW`: "View"
- `WATCH`: "Watch"
- `WATCH_EPISODE`: "Watch Episode"

[tip type="note"]
**NOTE –** Deep links to apps are not supported, but links to the App Store page or the Google Play Store page are supported using http/https.
The CTA button text enum is specified in the ad response payload.
[/tip]

If support is needed for a new CTA button text enum, please open a [GitHub issue](https://github.com/ampproject/amphtml/issues/new).

## Ad landing page
You can specify one of three options for an Web Story ad landing page.

- `STORY`: Landing page is a [sponsored story](story_ads_best_practices.md#sponsored-story).
- `AMP`: Landing page is a valid AMP Page.
- `NONAMP`: Any other type of webpage.

## Layout
AMP Stories are horizontal and full-screen. Story ads are required to match this format to provide a consistent user experience.

## Overlay dimensions
The ad label overlays a dark gradient bar across the entire width of the ad and will stretch from the top to 46px down.

{{ image('/static/img/docs/stampads/ad_overlay.png', 515, 520, layout='intrinsic', alt='Demonstration of ad overlay', caption='The ad overlay sits at the top', align='' ) }}

The CTA sits 32px from the bottom and is centered horizontally. It is 120px by 36px.

{{ image('/static/img/docs/stampads/cta_button.png', 515, 520, layout='intrinsic', alt='Demonstration of the CTA Button', caption='The CTA Button sits near the bottom', align='' ) }}

## Images and video
Images and video included in an AMP Story ad should be 4:3 standard full-screen. Ads that include video should use a [poster](../../../documentation/components/reference/amp-video.md#poster) The recommended dimensions for a poster image are 720p (720w x 1280h) .

[sourcecode:html]
<amp-video controls
  width="720"
  height="1280"
  layout="responsive"
  poster="images/kitten-playing.png">

  <source src="videos/kitten-playing.webm"
    type="video/webm" />
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
[/sourcecode]

### Images
Background images can be scaled to full screen. The following CSS is a successful way to crop and center videos and images.

[sourcecode:html]

<style amp-custom>
    amp-img, amp-video {
        height: 100vh;
    }
    amp-video video {
        object-fit: cover;
    }
    amp-img img{
        object-fit: cover;
    }
</style>

[/sourcecode]

### Video

#### Specify `<source>` vs `src`
When specifying the source for an [`amp-video`](../../../documentation/components/reference/amp-video.md)

Example: Specifying multiple source files

[sourcecode:html]
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">

  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
[/sourcecode]

#### Size & length of video
For optimal performance, you should aim to provide videos that are no larger than 4 MB. Smaller file sizes allow for faster downloading, so keep things as small as possible.

#### Video formats
If you can only provide a single video format, provide **MP4**. However, where possible, use **HLS** video and specify MP4 as a fallback for browsers that do not yet support HLS video. HLS performs adaptive bitrate streaming, where the quality of the video can be altered to best suit the user's network connection.

[tip type="note"]
**NOTE –** The HLS video format is not supported in the Chrome for Desktop browser (not even via emulation), so specifying an MP4 fallback is required for any desktop traffic to your page. To debug HLS videos, you'll need to use an actual mobile device via USB-debugging.
[/tip]

####Video resolution

Web Story videos are always vertical (i.e., portrait view), with an expected aspect ratio of 16:9. Use the recommended resolution for the video streaming type:

<table>
  <thead>
    <tr>
     <th>Video streaming type</th>
     <th>Resolution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>Non-adaptive</td>
     <td>720 x 1280 px</td>
    </tr>
    <tr>
     <td>Adaptive</td>
     <td>720 x 1280 px<br>540 x 960 px<br>360 x 480 px</td>
    </tr>
  </tbody>
</table>

[tip type="note"]
**NOTE –** For mobile devices that differ from the 16:9 aspect ratio, the video might be cropped horizontally or vertically to fit the viewport.
[/tip]

#### Video codec

1.  For MP4, use `H.264`.
1.  For WEBM, use `VP9`.
1.  For HLS or DASH, use `H.264`.

#### Video quality

##### Transcoding optimizations

There are various tools you can use to encode videos and adjust the quality of the video during encoding. Here are just a few:

<table>
  <thead>
    <tr>
     <th>Tool</th>
     <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><a href="https://www.ffmpeg.org/about.html">FFmpeg</a>
     </td>
     <td>Recommended optimizations:
      <ul>
        <li>For MP4, use <code>-crf 23</code>.</li>
        <li>For WEBM, use <code>-b:v 1M</code>.</li>
      </ul>
     </td>
    </tr>
    <tr>
     <td><a href="https://libav.org/avconv.html">avconv</a>
     </td>
     <td>Recommended optimizations:
      <ul>
        <li>For MP4, use <code>-crf 23</code>.</li>
        <li>For WEBM, use <code>-b:v 1M</code>.</li>
      </ul>
     </td>
    </tr>
    <tr>
     <td><a href="https://github.com/google/shaka-packager">Shaka Packager</a></td>
     <td>An encoder that can also output the HLS format including the playlist.
     </td>
    </tr>
  </tbody>
</table>

##### HLS segment size

Ensure the size of your HLS segments are typically no more than 10 seconds in duration.

## Animation

Animations have a few caveats in stories, such as the concept of what is "visible".
For instance, in our "3 panel" desktop view your creative may be visible on the page but not yet the center focus. This can be problematic if the desired effect is to start animations when a page becomes the main focal point.

To help with this, AMP will add a special attribute `amp-story-visible` to your creative's body when it is the focal point in all serving contexts. It is recommended to fire you animations based on this signal.

Example: this animation will fire when the page comes into focus, and restart if a user clicks to another page in the story and returns.

[sourcecode:html]

<style amp-custom>
    body[amp-story-visible] .my-animation-class {
      animation: 2s my-animation-name;
    }
</style>

[/sourcecode]

## Sponsored Story <a name="sponsored-story"></a>

A Sponsored Story exists as a URL on the web, enabling the drive of user traffic to a Sponsored Story from the call to action button on an AMP Story ad. A Sponsored Story is an AMP Story, but with focus on an immersive and expansive ad experience.

{{ image('/static/img/docs/stampads/sponsored_story_full.png', 1600, 900, layout='intrinsic', alt='CTA button directs to a Sponsored Story', caption='CTA button directs to a Sponsored Story', align='' ) }}

Read more about creating an [Web Story here](../start/create_successful_stories.md).
