---
$title: Preload web fonts
$order: 140
tags:
- lcp
---
Preloading lets you tell the
browser about critical resources that you want to load as soon as possible.
Even before they're discovered in HTML! This is particularly awesome for 
resources used in the first viewport and throughout the page, such as fonts. Do
so by adding the `rel="preload"` attribute to these resources, like in the
following: 
```
<link href="font.woff2" rel="preload">
```
