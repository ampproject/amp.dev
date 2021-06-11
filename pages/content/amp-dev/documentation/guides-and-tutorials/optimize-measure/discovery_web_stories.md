---
$title: Make your Web Stories discoverable
$order: 5
description: 'Ensure your Web Stories are reaching your intended audience by including necessary metadata and markup.'

formats:
  - stories
author: CrystalOnScript
---

Ensure your Web Stories are reaching your intended audience by including necessary metadata and markup.


# AMP-specific metadata

Web Stories with missing or incorrect AMP-specific metadata may not surface in search engines or third party platforms.

## Required &lt;amp-story&gt; attributes

Web Stories must include the following [`<amp-story>`](https://amp.dev/documentation/components/amp-story) attributes.

```html
<body>
    <amp-story standalone 
    title="Web Story Title"
    publisher="Web Story Publisher"
    publisher-logo-src="https://example.com/logo/1x1.png"
    poster-portrait-src="https://example.com/my-story/poster/3x4.jpg">
    ...
    </amp-story-standalone>
</body>
```

### `title`

The title of the Web Story. 

### `publisher`

The name of the Web Story publisher.


### `publisher-logo-src`

A URL to the Web Story publisher's logo image. The logo image should be larger than or equal to 96x96px and maintain a 1:1 aspect ratio. This logo appears in the right corner on the top of the poster image on platforms currently (October 2020) supporting Web Stories.

### `poster-portrait-src`

A URL to an image used as the [Web Story poster](https://amp.dev/documentation/components/amp-story/#poster-guidelines-(for-poster-portrait-src,-poster-landscape-src,-and-poster-square-src)). Used as the cover for the Web Story and should be representative of the story. Do not embed or burn-in the Web Story title on it. Should be at least 640x853px and maintain a 3:4 aspect ratio.


## Recommended <amp-story> attributes

### `poster-landscape-src`

A URL to an image used as the [Web Story poster](https://amp.dev/documentation/components/amp-story/#poster-guidelines-(for-poster-portrait-src,-poster-landscape-src,-and-poster-square-src)) in landscape format. Used as the cover for the Web Story and should be representative of the story. Do not embed or burn-in the Web Story title on it. Should be at least 853x640px and maintain a 4:3 aspect ratio.

### `poster-square-src`

A URL to an image used as the [Web Story poster](https://amp.dev/documentation/components/amp-story/#poster-guidelines-(for-poster-portrait-src,-poster-landscape-src,-and-poster-square-src)). Used as the cover for the Web Story and should be representative of the story. Do not embed or burn-in the Web Story title on it. Should be at least 640x640px and maintain a 1:1 aspect ratio.

# Metadata

Platforms that surface Web Stories rely on metadata to correctly index and display them. Include the following recommended information to give users a delightful Web Story experience.

Include the following recommended HTML markup in your Web Stories for the best user experience. 

## Canonical link

All Web Stories must include a canonical URL that points to the Web Story itself. 

```html
<link rel="canonical" href="https://www.example.com/url/to/Web/Story.html">
```

## favicon

Include a [favicon](https://www.w3.org/2005/10/howto-favicon) to display as the icon in the browser tab.

## Document title

Give your Web Story document a title by including a <code>[<title>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title)</code> tag.

## Image alt-text

Maximize accessibility and indexability by including [meaningful alt-text for images](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Accessibility_concerns).

## Video subtitles and captions

Maximize accessibility and indexability by including [video subtitles and/or captions](https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video).

## Page attachments
Use [page attachments](https://amp.dev/documentation/components/amp-story-page-attachment/) to present additional information in “classic article form” alongside your Web Story. This can be useful to provide extra detail, deep dives, or onward journeys for the content presented in your Story.

## Schema.org metadata

Including [schema.org](https://schema.org/) structured data vocabulary defines important information about your Web Story that allows third-party platforms, such as search engines, to display and index them.

[tip type="default"]
Validate your schema.org data using Google's [AMP Test](https://search.google.com/test/amp).
[/tip]

## OGP Facebook metadata

Including [Open Graph protocol](https://ogp.me/) enables Web Stories sharing on Facebook.

## Twitter card data

Including [Twitter card data](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards) allows you to attach photos, videos and media experiences to a Tweet sharing your Web Story. 

[tip type="read-on"]
Read more about [SEO for Web Stories in the AMP Blog](https://blog.amp.dev/2020/02/12/seo-for-amp-stories/).
[/tip]