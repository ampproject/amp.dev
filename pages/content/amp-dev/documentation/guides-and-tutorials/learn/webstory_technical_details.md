---
$title: Web Story technical details
$order: 1
description: 'Web Story technical details'
$category: Develop
formats:
    - stories
author: CrystalOnScript
---
This guide explains all the technical details and best practice you should know to successfully create Web Stories with AMP.

## AMP Valid

A Web Story is technically a single web page built with AMP and adheres to AMP specifications:

*   Start with the `<!doctype html>` doctype.
*   Contain a top-level `<html ⚡>` or `<html amp>` tag.
*   Contain `<head>` and `<body>` tags.
*   Contain a` <meta charset="utf-8">` tag as the first child of the `<head>` tag.
*   Contain a `<script async src="https://cdn.ampproject.org/v0.js"></script>` tag inside their `<head>` tag. As a best practice, you should include the script as early as possible in the `<head>`.
*   Contain a` <link rel="canonical" href="page/url">` tag inside their `<head>` with the href pointing to the Web Story URL. 
*   Contain a `<meta name="viewport" content="width=device-width">` tag inside the `<head>` tag. It's also recommended to include initial-scale=1.
*   Contain the [AMP boilerplate](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) code in the `<head>` tag.

The difference between an AMP webpage and a Web Story built with AMP is the [`amp-story`](https://amp.dev/documentation/components/amp-story/?format=stories) component. It is the only direct child of the document `<body>` and must contain the `standalone` attribute. All Web Story pages, layers, and elements are defined within the `<amp-story>` tags.


```html
<!doctype html>
<html ⚡>
  <head>
    <meta charset="utf-8">
    <title>Joy of Pets</title>
    <link rel="canonical" href="pets.html">
    <meta name="viewport" content="width=device-width">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-video"
        src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>
    <script async custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <style amp-custom>
    ...
    </style>
  </head>
  <body>
    <!-- Cover page -->
    <amp-story standalone
        title="Joy of Pets"
        publisher="AMP tutorials"
        publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
        poster-portrait-src="assets/cover.jpg">
      <amp-story-page id="cover">
        <amp-story-grid-layer template="fill">
          <amp-img src="assets/cover.jpg"
              width="720" height="1280"
              layout="responsive"
              alt="...">
          </amp-img>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="vertical">
          <h1>The Joy of Pets</h1>
          <p>By AMP Tutorials</p>
        </amp-story-grid-layer>
      </amp-story-page>

      <!-- Page 1 -->
      <amp-story-page id="page1">
        <amp-story-grid-layer template="vertical">
          <h1>Cats</h1>
          <amp-img src="assets/cat.jpg"
              width="720" height="1280"
              layout="responsive"
              alt="...">
          </amp-img>
          <q>Dogs come when they're called. Cats take a message and get back to you. --Mary Bly</q>
        </amp-story-grid-layer>
      </amp-story-page>
      ...
    </amp-story>
  </body>
</html>
```
Follow the [Create your first Web Story tutorial](../start/visual_story/?format=stories) and [read the amp-story reference documentation ](../../components/reference/amp-story/?format=stories)to learn more.


## Peak performance and user experience

Users may be viewing Web Stories in areas with low network connection or older devices. Ensure they enjoy their experience by following these best practices.


### Background color

Specify a background color for each Web Story page. Having a background color provides a good fallback if the user’s conditions prevent them from downloading images or video assets. Choose a color that is representative of the dominant color of the page’s intended background asset, or use a consistent color theme for all story pages. For readability, ensure the background color has sufficient color contrast with the foreground text. Ideally, aim for a color contrast ratio of 4.5:1. If this is not possible, consider adding an additional background behind the text itself instead that does result in a sufficient contrast.

Define the background color for pages within the `<style amp-custom>` tags in the head of the Web Story document or inline on the [`<amp-story-page>`](https://amp.dev/documentation/components/amp-story-page/?format=stories) component. 


### Layering elements

The system header contains controls such as the mute and share icons. It appears at a higher z-index than the background image and video. Ensure that no essential information is covered by these icons.


### Aspect ratio

Design Web Story assets at a 9:16 aspect ratio. Because page height and width varies across browsers and devices don’t place essential content close to page edges. 


### Poster images

A poster image is displayed to user’s while a video is downloaded. The poster image should be representative of the video to allow for a smooth transition. Specify a poster image by adding the `poster` attribute to your amp-video element and pointing it to the image location. 

```
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```


## Video

All videos must be added via the [amp-video](https://amp.dev/documentation/components/amp-video/?format=stories) component.

```
<amp-video controls
  width="640"
  height="360"
  layout="responsive"
  poster="/static/inline-examples/images/kitten-playing.png">
  <source src="/static/inline-examples/videos/kitten-playing.webm"
    type="video/webm" />
  <source src="/static/inline-examples/videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```


### Resolution and quality 

Encode videos to adjust quality for the following recommended optimizations:

<table>
  <tr>
   <td>MP4
   </td>
   <td>-crf 23
   </td>
  </tr>
  <tr>
   <td>WEBM
   </td>
   <td>-b:v 1M
   </td>
  </tr>
</table>

Try to keep HLS segments under 10 seconds in duration.


### Format and size

Keep videos smaller than 4MB for optimal performance. Consider splitting large videos up over multiple pages. 

If you can only provide a single video format, provide MP4. When possible, use HLS video and specify MP4 as a fallback for browser compatibility. Use the following video codec:

<table>
  <tr>
   <td>MP4, HLS and DASH
   </td>
   <td>H.264
   </td>
  </tr>
  <tr>
   <td>WEBM
   </td>
   <td>VP9
   </td>
  </tr>
</table>


### Specify <source> vs src

Use `<source>` child elements within the `<amp-video>` component to specify the video source over the `src` attribute. Using the `<source>` element allows you to specify the video type and add backup video sources. You must use the `type` attribute to specify the MIME type. Use `application/x-mpegurl` or `application/vnd.apple.mpegurl` for HLS videos. For all other video types, use the `video/` MIME prefix and follow with the video format, such as `”video/mp4”`.

```html
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">
  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
```


### Auto advancing after videos

The [`auto-advance-after`](https://amp.dev/documentation/components/amp-story-page/?format=stories#auto-advance-after-[optional]) attribute exposed by amp-story-page specifies if and when a story page should advance without the user tapping. To advance after a video, point the attribute to the video id.

```html
<amp-story-page auto-advance-after="myvideo">
```


## Landscape orientation and full bleed desktop experience

The Web Story format supports an optional [landscape orientation and full bleed desktop experience](https://amp.dev/documentation/components/amp-story/?format=stories#landscape-orientation-and-full-bleed-desktop-experience-opt-in). This changes the desktop experience to an immersive full bleed mode, replacing the default three portrait panels experience. On mobile, it allows users to view stories when their device is held horizontally / in landscape mode.

While this is currently opt-in and optional, we strongly recommend making sure that users on mobile devices are able to view stories in whatever orientation best suits their needs - otherwise, they will simply be presented with a "The page is best viewed in portrait mode" message.

Opt-in to landscape orientation and full bleed desktop support by adding the `supports-landscape` attribute to the `<amp-story>` component.

```html
<amp-story standalone
    supports-landscape
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/icon.svg"
    poster-portrait-src="assets/cover.jpg">
</amp-story>
```
