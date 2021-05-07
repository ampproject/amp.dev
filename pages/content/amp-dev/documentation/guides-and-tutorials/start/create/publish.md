---
$title: Keep going
$order: 7
description: "Congratulations, you’ve built your first AMP page! Now that you’ve gotten started with AMP, what’s next?"
author: crystalonscript
---

Congratulations, you’ve built your first AMP page! It should look like the example below:

[example playground="true" preview="top-frame"]
```html
<!DOCTYPE html>
<html ⚡>
  <head>
    <meta charset="utf-8" />
    <title>My AMP Page</title>
    <link rel="canonical" href="self.html" />
    <meta name="viewport" content="width=device-width" />
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-base-carousel" src="https://cdn.ampproject.org/v0/amp-base-carousel-0.1.js"></script>
    <style amp-custom>
      h1 {
        margin: 1rem;
      }
       body {
        background-color: blue;
      }
    </style>
  </head>
  <body>
    <h1 id="hello">Hello AMPHTML World!</h1>
    <amp-base-carousel loop="true"  width="600" height="400" layout="responsive">
        <amp-img src="https://source.unsplash.com/Ji_G7Bu1MoM/600x400" width="600" height="400" layout="responsive"></amp-img>
        <amp-img src="https://source.unsplash.com/4yCXNMLP9g8/600x400" width="600" height="400" layout="responsive"></amp-img>
        <amp-img src="https://source.unsplash.com/QrgRXH81DXk/600x400" width="600" height="400" layout="responsive"></amp-img>
        <amp-img src="https://source.unsplash.com/8QJSi37vhms/600x400" width="600" height="400" layout="responsive"></amp-img>
    </amp-base-carousel>
    <button on="tap:hello.hide">
      Goodbye AMPHTML World!
	</button>
  </body>
</html>
```
[/example]

Now that you’ve gotten started with AMP, what’s next?

## Build a website with AMP and your favorite Framework or CMS

Many frameworks and CMS’ have AMP integrations, such as Eleventy and WordPress. See a [full list here](../../optimize-measure/amp-optimizer-guide/index.md) and get started!

## Integrate AMP with an in-house solution

AMP is a front-end framework and you can integrate it with your backend solution. Use [available tools](../../../../tools/) and [AMP optimizers](../../optimize-measure/amp-optimizer-guide/index.md) to get the most out of AMP!

## Learn web development with AMP

If you’re new to web development, you can start your journey with [AMP’s web development courses](../../../../courses/)! These three free courses are in use in schools and training programs around the world. Now you can take them here, online, on our site. Suitable for beginners and experienced web developers alike, they will take you from zero to AMP!