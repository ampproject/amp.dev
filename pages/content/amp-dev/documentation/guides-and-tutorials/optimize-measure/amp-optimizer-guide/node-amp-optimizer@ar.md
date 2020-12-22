---
"$title": دليل أداة AMP Optimizer في Node.js
"$order": '2'
description: يشرح هذا الدليل كيفية إعداد Node.js واستخدام إصدار من "أداة AMP Optimizer".
formats:
- websites
- stories
author: sebastianbenz
---

يشرح هذا الدليل كيفية إعداد Node.js واستخدام إصدار من "أداة AMP Optimizer".

## Setup

Install via NPM using:

```shell
npm install @ampproject/toolbox-optimizer
```

## Usage

تتخذ واجهة برمجة تطبيقات "أداة AMP Optimizer" سلسلة HTML كإدخال وتعرض نسخة محسّنة من سلسلة HTML. يبدو الاستخدام الأساسي كما يلي:

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

بالنسبة للصفحات الديناميكية، غالبًا ما يكون من الضروري عرض الصفحات على الخادم. في هذه الحالة، يمكنك تشغيل "أداة AMP Optimizer" بعد عرض صفحاتك. فيما يلي نموذج للتكامل في خادم [Express.js](https://expressjs.com/). تتمثل إحدى طرق تكامل "تحسين AMP" مع موجّه Express في تشغيله في استرداد بعد [عرضها](https://expressjs.com/en/api.html#app.render):

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

هام: تأكد من إعداد التخزين المؤقت أو نظام إدارة المحتوى (CDN) عند استخدام أداة AMP Optimizer على الخادم لتجنب تأخيرات العرض.

## Configuration

تقدّم "أداة AMP Optimizer" تكوينًا افتراضيًا معقولاً من المفترض أن يعمل جيدًا في معظم الحالات. ومع ذلك، يمكن تخصيص عمليات التحويل لحالات استخدام محددة. يمكنك العثور على قائمة بجميع الخيارات المتاحة [هنا](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer#options).

A few notable options are:

- `lts: true` for enabling [long-term stable URLs](https://github.com/ampproject/amphtml/blob/main/contributing/lts-release.md) for AMP runtime and components.
- `verbose: true` for detailed debugging outputs. Especially good for identifying reasons why the AMP boilerplate could not be removed.
- `imageOptimizer`: enable automated image srcset generation by providing a function for calculating srcset URLs for a given image src. The function should return a URL pointing to a version of the `src` image with the given width. If no image is available, it should return a falsy value. More about this in the next section.

### Image Optimization

يمكن "لأداة AMP Optimizer" إنشاء قيم `srcset` لصالح `amp-img` بناءً على تعريف `layout` الخاص. من أجل أن يجري الأمر على ما يرام، تحتاج إلى توفير وظيفة تقوم بتعيين `src` و`width` خاص بالصورة إلى قيمة مصدر `srcset` تم تغيير حجمها. لا يتم تنفيذ تغيير حجم الصورة بواسطة "أداة AMP Optimizer" ويجب أن يحدث إما في وقت الإنشاء (على سبيل المثال للمواقع الثابتة) أو عبر خدمة استضافة الصور مثل [thumbor](https://github.com/thumbor/thumbor).

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

باستخدام هذا التنفيذ، ستعمل "أداة AMP Optimizer" على تحويل إقرارات `amp-img`:

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

نصيحة: عند استخدام `layout=responsive` استخدم السمة `width` و`height` لتحديد الحد الأدنى لأبعاد الصورة. على سبيل المثال، بالنسبة للصورة الرئيسية ذات الهوامش الكاملة على الهاتف المحمول، حدّد العرض على النحو التالي `width=320`.
