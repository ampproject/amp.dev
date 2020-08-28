---
$title: Serve images in next-gen formats
tags:
- lcp
---
Image formats like JPEG 2000, JPEG
XR, and WebP often provide better compression than PNG or JPEG. This means
images [served in next-gen formats](https://web.dev/uses-webp-images/) download
faster and consume less data!

Consider displaying all your [`<amp-img>`](https://amp.dev/documentation/components/amp-img/?format=websites)
components in WebP formats while specifying an [appropriate
fallback for other browsers](https://amp.dev/documentation/components/amp-img/#example:-specifying-a-fallback-image'). 
