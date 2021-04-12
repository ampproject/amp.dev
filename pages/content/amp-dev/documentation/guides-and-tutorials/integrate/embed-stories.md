---
$title: Embed stories in AMP pages
$order: 3
description: 'The AMP Story Player enables you to embed stories that users are able to tap or click through, inside of a web page. Follow this step-by-step guide to learn how.'
formats:
  - websites
  - stories
---

Web Stories are a full-screen immersive content experience that user’s tap or click through at their own pace. They live on the open web with their own URL, making them easily shareable. This guide teaches you how to embed Web Stories in an AMP valid page and surface them to readers. 

# Include the amp-story-player

Web Stories rely on the[ `amp-story-player` component ](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story-player/0.1/amp-story-player.md)to embed and play stories on AMP valid sites. Implement the `amp-story-player` by including the custom script in the head of the document.

`<script async custom-element="amp-story-player" src="https://cdn.ampproject.org/v0/amp-story-player-0.1.js"></script>`

Then placing the `amp-story-player` element HTML in the desired location within your page’s `<body>`.

[example preview="top-frame" playground="true" orientation="portrait"]
```html
<head>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script
    async
    custom-element="amp-story-player"
    src="https://cdn.ampproject.org/v0/amp-story-player-0.1.js"
  ></script>
</head>
<body>
  <amp-story-player layout="fixed" width="360" height="600">
    <a href="https://preview.amp.dev/documentation/examples/introduction/stories_in_amp/">
      <img src="https://amp.dev/static/samples/img/story_dog2_portrait.jpg" width="360" height="600" loading="lazy" data-amp-story-player-poster-img>
      Stories in AMP - Hello World
    </a>
  </amp-story-player>
</body>
```
[/example]

# Display a Web Story 

Link to a Web Story by including an `<a>` tag with the `href` attribute pointed to the desired Web Story URL within the `<amp-story-player>` element. The `href` endpoint may be the URL of a hosted Web Story or a relative path. Place the title of the story within the `<a>` tags.

## Specify multiple Web Stories

Include the desired number of `<a>` tags, with each `href` attribute pointed to the desired Web Story URL, within the `<amp-story-player>` element.

[example preview="top-frame" playground="true" orientation="portrait"]
```html
<head>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script
    async
    custom-element="amp-story-player"
    src="https://cdn.ampproject.org/v0/amp-story-player-0.1.js"
  ></script>
</head>
<body>
  <amp-story-player layout="fixed" width="360" height="600">
    <a href="https://ampfest-story-player-demo.web.app/examples/amp-story/AMPFestPlayerDemo/s1"></a>
    <a href="https://ampfest-story-player-demo.web.app/examples/amp-story/AMPFestPlayerDemo/s2"></a>
    <a href="https://ampfest-story-player-demo.web.app/examples/amp-story/AMPFestPlayerDemo/s3"></a>
  </amp-story-player>
</body>
```
[/example]

### Navigate between stories

Users on mobile devices may use the “swipe” gesture to navigate to the next story. Desktop users must click through an entire Web Story before they are able to view the next.