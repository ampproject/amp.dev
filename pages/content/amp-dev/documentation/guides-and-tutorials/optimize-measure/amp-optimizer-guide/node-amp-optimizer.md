---
$title: Node.js AMP Optimizer Guide
$order: 2
description: 'This guide explains how to setup and use the Node.js version of AMP Optimizer.'
formats:
  - websites
  - stories
author: sebastianbenz
---

This guide explains how to setup and use the Node.js version of AMP Optimizer.

## Setup

Install via NPM using:

```shell
npm install @ampproject/toolbox-optimizer
```

## Usage

The AMP Optimizer API takes an HTML string as input and returns an optimized version of the HTML string. The basic usage looks like this:

```js
const AmpOptimizer = require('@ampproject/toolbox-optimizer');

// create the AMP Optimizer instance
const ampOptimizer = AmpOptimizer.create();

const html = '<h1>Hello World!</h1>';

const optimizedHtml = await ampOptimizer.transformHtml(html);
```

### Creating optimized AMP at Build-Time

For static sites it’s best to optimize AMP pages at build-time when building your site. Here is an example on how you would integrate it into a [Gulp.js](https://gulpjs.com/) based build. This example adds a custom transform that optimizes all HTML files inside the src folder:

```js
const {src, dest} = require('gulp');
const through2 = require('through2');

const AmpOptimizer = require('@ampproject/toolbox-optimizer');
const ampOptimizer = AmpOptimizer.create();

function build(cb) {
  return src('src/*.html')
    .pipe(
      through2.obj(async (file, _, cb) => {
        if (file.isBuffer()) {
          const optimizedHtml = await ampOptimizer.transformHtml(
            file.contents.toString()
          );
          file.contents = Buffer.from(optimizedHtml);
        }
        cb(null, file);
      })
    )
    .pipe(dest('dist/'));
}

exports.default = build;
```

### Render-time

For dynamic pages it’s often necessary to render pages on the server. In this case, you can run AMP Optimizer after rendering your pages. Here is a sample integration into an [Express.js](https://expressjs.com/) server. One way to integrate AMP Optimization into an Express router is to run it in a callback after the templates are [rendered](https://expressjs.com/en/api.html#app.render):

```js
const express = require('express');
const router = express.Router();
const AmpOptimizer = require('@ampproject/toolbox-optimizer');
const ampOptimizer = AmpOptimizer.create();

router.get('/', (req, res) => {
  const locals = {title: 'Express with AMP Optimizer'};
  res.render('index', locals, async (err, html) => {
    const optimizedHtml = await ampOptimizer.transformHtml(html);
    res.send(optimizedHtml);
  });
});

module.exports = router;
```

Important: Make sure to setup caching or a CDN when using AMP Optimizer on the server to avoid render delays.

## Configuration

AMP Optimizer provides a reasonable default configuration that should work well in most of the cases. However, transformations can be customized for specific use cases. You can find a list of all available options [here](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer#options).

A few notable options are:

- `lts: true` for enabling [long-term stable URLs](https://github.com/ampproject/amphtml/blob/main/docs/lts-release.md) for AMP runtime and components.
- `verbose: true` for detailed debugging outputs. Especially good for identifying reasons why the AMP boilerplate could not be removed.
- `imageOptimizer`: enable automated image srcset generation by providing a function for calculating srcset URLs for a given image src. The function should return a URL pointing to a version of the `src` image with the given width. If no image is available, it should return a falsy value. More about this in the next section.

### Image Optimization

AMP Optimizer can generate `srcset` values for a given `amp-img` based on its `layout` definition. For this to work, you need to provide a function that maps the image’s `src` and a `width` to a resized `srcset` source value. The image resizing is not performed by AMP Optimizer and needs to either happen at build time (e.g. for static sites) or via an image hosting service such as [thumbor](https://github.com/thumbor/thumbor).

Here is an example implementation that appends the image width to the `src`:

```js
const ampOptimizer = AmpOptimizer.create({
  // parameters are the amp-img `src` and the `width` of the to be generated srcset source value
  imageOptimizer: (src, width) => {
    // we cannot rename if the image does not have a file extension
    const index = src.lastIndexOf('.');
    if (index === -1) {
      // return null means we won't generate a srcset source value for this width
      return null;
    }
    const prefix = src.substring(0, index);
    const postfix = src.substring(index, src.length);
    return `${prefix}.${width}w${postfix}`;
  };
})
```

Using this implementation, AMP Optimizer will transform the following `amp-img` declarations:

```html
<!-- Injects srcset for responsive layout -->
<amp-img
  src="image1.png"
  width="400"
  height="800"
  layout="responsive"
></amp-img>
<!-- Ignores existing srcset -->
<amp-img
  layout="fill"
  srcset="image-1x.png 1x,
                             image-2x.png 2x"
></amp-img>
```

into:

```html
<!-- Injects srcset for responsive layout -->
<amp-img
  src="image1.png"
  width="400"
  height="800"
  layout="responsive"
  srcset="image1.470w.png 470w, image1.820w.png 820w, image1.1440w.png 1440w"
></amp-img>
<!-- Ignores existing srcset -->
<amp-img
  layout="fill"
  srcset="image-1x.png 1x,
                               image-2x.png 2x"
></amp-img>
```

Tip: When using `layout=responsive` use the `width` and `height` attribute to specify the minimum image dimensions. For example, for a full-bleed hero image on mobile, specify the width as `width=320`.
