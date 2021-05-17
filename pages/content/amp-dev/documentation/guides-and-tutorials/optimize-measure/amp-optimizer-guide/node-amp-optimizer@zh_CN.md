---
'$title': Node.js AMP Optimizer 指南
$order: 2
description: 本指南介绍如何设置和使用 Node.js 版本的 AMP Optimizer。
formats:
  - websites
  - stories
author: sebastianbenz
---

本指南介绍如何设置和使用 Node.js 版本的 AMP Optimizer。

## 设置

使用以下命令通过 NPM 安装：

```shell
npm install @ampproject/toolbox-optimizer
```

## 用法

AMP Optimizer API 接受 HTML 字符串形式的输入，并返回优化版本的 HTML 字符串。基本用法如下所示：

```js
const AmpOptimizer = require('@ampproject/toolbox-optimizer');

// create the AMP Optimizer instance
const ampOptimizer = AmpOptimizer.create();

const html = '<h1>Hello World!</h1>';

const optimizedHtml = await ampOptimizer.transformHtml(html);
```

### 在构建时创建优化的 AMP

对于静态网站，最好在构建网站时完成 AMP 网页优化。以下示例展示了如何将其集成到基于 [Gulp.js](https://gulpjs.com/) 的构建中。本例添加了一个自定义转换，可对 src 文件夹内的所有 HTML 文件执行优化：

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

### 呈现时

对于动态网页，通常需要在服务器中呈现网页。在这种情况下，您可以在呈现网页后运行 AMP Optimizer。以下是与 [Express.js](https://expressjs.com/) 服务器进行集成的示例。将 AMP 优化集成到 Express 路由中的一种方法是，当模板[呈现](https://expressjs.com/en/api.html#app.render)后在回调中运行 AMP Optimizer：

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

重要提示：在服务器上使用 AMP Optimizer 时，请确保设置缓存或 CDN 以避免呈现延迟。

## 配置

AMP Optimizer 提供了能够胜任大多数用例的合理默认配置。但是，用户也可以针对特定用例自定义转换。您可以在[此处](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer#options)获取包含所有可用选项的列表。

一些值得注意的选项包括：

- `lts: true`：为 AMP 运行时和组件启用[长期稳定网址](https://github.com/ampproject/amphtml/blob/main/docs/lts-release.md)。
- `verbose: true`：用于详细的调试输出。在确定无法移除 AMP 样板的原因方面尤为实用。
- `imageOptimizer`：通过提供为给定图片 src 计算 srcset 网址的函数，启用自动生成图片 srcset。该函数应返回一个网址，指向具有给定宽度的 `src` 图片版本。如果没有可用的图片，则应返回假值。下一部分中详细介绍了相关内容。

### 图片优化

AMP Optimizer 可以基于给定 `amp-img` 的 `layout` 为其生成 `srcset` 值。为此，您需要提供一个函数，将图片的 `src` 和 `width` 映射到调整的 `srcset` 源值。图片调整不会由 AMP Optimizer 执行，而是需要在构建时执行（例如，对于静态网站）或通过图片托管服务（例如 [thumbor](https://github.com/thumbor/thumbor)）执行。

以下示例展示了将图片宽度附加到 `src` 的实现：

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

使用此实现，AMP Optimizer 将以下 `amp-img` 声明：

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

转换为：

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

提示：使用 `layout=responsive` 时，请使用 `width` 和 `height` 属性指定最小图片尺寸。例如，对于在移动设备上显示的全出血主打图片，将宽度指定为 `width=320`。
