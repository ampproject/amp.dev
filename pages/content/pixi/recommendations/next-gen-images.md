---
$title: Serve images in next-gen formats
tags:
- lcp
---
Image formats like JPEG 2000, JPEG
XR, and WebP often provide better compression than PNG or JPEG. This means
images [served in next-gen formats](https://web.dev/uses-webp-images/) download
faster and consume less data!, which means faster downloads and less data
consumption. [Learn more](https://web.dev/uses-webp-images/).

Consider displaying all your `[&lt;amp-img&gt;](https://amp.dev/documentation/components/amp-img/?format=websites)`
components in WebP formats while specifying an [appropriate
fallback for other browsers](https://amp.dev/documentation/components/amp-img/#example:-specifying-a-fallback-image'). 
