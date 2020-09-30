---
formats:
  - stories
$title: Make your Web Stories discoverable
$titles:
  teaser: Make your Web Stories discoverable
$order: 5
description: 'Ensure your Web Stories are reaching your intended audience by including necessary metadata and markup.'
author: CrystalOnScript
---

Ensure your Web Stories are reaching your intended audience by including necessary metadata and markup.


# AMP markup

Web Stories with missing or incorrect AMP markup may not surface in search engines or third party platforms. All Web Stories must include a canonical URL that points to the Web Story itself. 


```html
<link rel="canonical" href="https://www.example.com/url/to/Web/Story.html">
```



## Required &lt;amp-story&gt; attributes

Web Stories must include the following [`<amp-story>`](https://amp.dev/documentation/components/amp-story)attributes. The `<amp-story>` component must be the only child element of `<body>`.

```html
<body>
    <amp-story standalone 
    title="Web Story Title"
    publisher="Web Stor Publisher"
    publisher-logo-src="https://example.com/logo/1x1.png"
    poster-portrait-src="https://example.com/my-story/poster/3x4.jpg">
    ...
    </amp-story-standalone>
</body>
```


### `standalone`

Identifies the AMP document is a Web Story. 

### `title`

The title of the Web Story. 

### `publisher`

The name of the Web Story publisher.


### `publisher-logo-src`

A URL to the Web Story publisher's logo image. The logo image should be larger than or equal to 96px by 96px and maintain a 1:1 aspect ratio.


### `poster-portrait-src`

A URL to an image used as the [Web Story poster](https://amp.dev/documentation/components/amp-story/#poster-guidelines-(for-poster-portrait-src,-poster-landscape-src,-and-poster-square-src)). Used as the cover for the Web Story and should be representative of the story. Do not pre-embed the Web Story title on it. Should be 853px by 640px and maintain a 3:4 aspect ratio.


## Recommended <amp-story> attributes

### `poster-landscape-src`

A URL to an image used as the [Web Story poster](https://amp.dev/documentation/components/amp-story/#poster-guidelines-(for-poster-portrait-src,-poster-landscape-src,-and-poster-square-src)) in landscape format. Used as the cover for the Web Story and should be representative of the story. Do not pre-embed the Web Story title on it. Should be 640 px by 853 px and maintain a 4:3 aspect ratio.

### `poster-square-src`

A URL to an image used as the [Web Story poster](https://amp.dev/documentation/components/amp-story/#poster-guidelines-(for-poster-portrait-src,-poster-landscape-src,-and-poster-square-src)). Used as the cover for the Web Story and should be representative of the story. Do not pre-embed the Web Story title on it. Should be 640 px by 640 px and maintain a 1:1 aspect ratio.


### `supports-landscape`

Allows a Web Story viewing on a mobile device held in a landscape orientation and changes the desktop experience to an immersive full-beed mode. Removes the default three portrait panel experience on desktop. 


# HTML markup

Include the following recommended HTML markup in your Web Stories for the best user experience. 

## favicon

Include a [favicon](https://www.w3.org/2005/10/howto-favicon) to display as the icon in the browser tab.

## Web Story title

Give your Web Story a title by including a <code>[<title>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title)</code> tag.

## Image alt-text

Maximize accessibility and indexability by including [meaningful alt-text for images](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Accessibility_concerns). 


# Metadata

Platforms that surface Web Stories rely on metadata to correctly index and display them. Include the following recommended information to give users a delightful Web Story experience. 

## Schema.org metadata

Including [schema.org](https://schema.org/) structured data vocabulary defines important information about your Web Story that allows third-party platforms, such as search engines, to display and index them.

## OGP metadata

Including [Open Graph protocol](https://ogp.me/) enables Web Stories to become a rich object in a social graph.  

## Twitter card data

Including [Twitter card data](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards) allows you to attach photos, videos and media experiences to a Tweet sharing your Web Story. 

[tip type="read-on"]
Read more about [SEO for Web Stories in the AMP Blog](https://blog.amp.dev/2020/02/12/seo-for-amp-stories/).
[/tip]