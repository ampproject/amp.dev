---
"$title": Hướng dẫn Bộ tối ưu hoá AMP phiên bản Node.js
"$order": '2'
description: Hướng dẫn này giải thích cách thiết lập và sử dụng phiên bản Node.js của Bộ tối ưu hoá AMP.
formats:
- websites
- stories
author: sebastianbenz
---

Hướng dẫn này giải thích cách thiết lập và sử dụng phiên bản Node.js của Bộ tối ưu hoá AMP.

## Thiết lập

Cài đặt qua NPM bằng:

```shell
npm install @ampproject/toolbox-optimizer
```

## Sử dụng

The AMP Optimizer API takes an HTML string as input and returns an optimized version of the HTML string. The basic usage looks like this:

```js
const AmpOptimizer = require('@ampproject/toolbox-optimizer');

// create the AMP Optimizer instance
const ampOptimizer = AmpOptimizer.create();

const html = '<h1>Hello World!</h1>';

const optimizedHtml = await ampOptimizer.transformHtml(html);
```

### Tạo AMP tối ưu hoá ở thời gian dựng

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

### Thời gian render

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

Quan trọng: Đảm bảo thiết lập tác vụ lưu bộ nhớ đệm hoặc CDN khi sử dụng Bộ tối ưu hóa AMP trên máy chủ để tránh render trễ.

## Cấu hình

AMP Optimizer provides a reasonable default configuration that should work well in most of the cases. However, transformations can be customized for specific use cases. You can find a list of all available options [here](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer#options).

Một vài tuỳ chọn đáng chú ý:

- `lts: true` for enabling [long-term stable URLs](https://github.com/ampproject/amphtml/blob/main/contributing/lts-release.md) for AMP runtime and components.
- `verbose: true` for detailed debugging outputs. Especially good for identifying reasons why the AMP boilerplate could not be removed.
- `imageOptimizer`: enable automated image srcset generation by providing a function for calculating srcset URLs for a given image src. The function should return a URL pointing to a version of the `src` image with the given width. If no image is available, it should return a falsy value. More about this in the next section.

### Tối ưu hoá hình ảnh

Bộ tối ưu hóa AMP có thể tạo các giá trị `srcset` cho một `amp-img` dựa trên định nghĩa `layout` của nó. Để điều này hoạt động, bạn cần cung cấp một hàm ánh xạ `src` và `width` của hình ảnh thành giá trị nguồn `srcset` đã thay đổi kích thước. Việc thay đổi kích thước hình ảnh không được thực hiện bởi Bộ tối ưu hóa AMP và cần phải xảy ra tại thời gian dựng (ví dụ: đối với các website tĩnh) hoặc thông qua dịch vụ lưu trữ hình ảnh như [thumbor](https://github.com/thumbor/thumbor) .

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

thành:

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

Mẹo: Khi dùng `layout=responsive`, hãy dùng thuộc tính `width` và `height` để chỉ định kích thước hình ảnh tối thiểu. Ví dụ như đối với một hình ảnh anh hùng dạng tràn biên màn hình ở trên thiết bị di động, độ rộng là `width=320`.
