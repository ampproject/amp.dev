---
'$title': دليل أداة AMP Optimizer في Node.js
$order: 2
description: يشرح هذا الدليل كيفية إعداد Node.js واستخدام إصدار من "أداة AMP Optimizer".
formats:
  - websites
  - stories
author: sebastianbenz
---

يشرح هذا الدليل كيفية إعداد Node.js واستخدام إصدار من "أداة AMP Optimizer".

## الإعداد

التثبيت عبر NPM باستخدام:

```shell
npm install @ampproject/toolbox-optimizer
```

## الاستخدام

تتخذ واجهة برمجة تطبيقات "أداة AMP Optimizer" سلسلة HTML كإدخال وتعرض نسخة محسّنة من سلسلة HTML. يبدو الاستخدام الأساسي كما يلي:

```js
const AmpOptimizer = require('@ampproject/toolbox-optimizer');

// create the AMP Optimizer instance
const ampOptimizer = AmpOptimizer.create();

const html = '<h1>Hello World!</h1>';

const optimizedHtml = await ampOptimizer.transformHtml(html);
```

### إنشاء AMP محسّن في وقت الإنشاء

بالنسبة إلى المواقع الثابتة، من الأفضل تحسين صفحات AMP في وقت الإنشاء عند إنشاء موقعك. فيما يلي مثال على كيفية دمجها في إنشاء يستند إلى [Gulp.js](https://gulpjs.com/). يضيف هذا المثال تحويلاً مخصصًا يعمل على تحسين جميع ملفات HTML داخل مجلد src:

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

### وقت العرض

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

## التكوين

تقدّم "أداة AMP Optimizer" تكوينًا افتراضيًا معقولاً من المفترض أن يعمل جيدًا في معظم الحالات. ومع ذلك، يمكن تخصيص عمليات التحويل لحالات استخدام محددة. يمكنك العثور على قائمة بجميع الخيارات المتاحة [هنا](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer#options).

بعض الخيارات الملحوظة هي:

- `lts: true` لتمكين [عناوين URL الثابتة طويلة المدى](https://github.com/ampproject/amphtml/blob/main/docs/lts-release.md) for لوقت تشغيل AMP ومكوناته.
- `verbose: true` لمخرجات تصحيح الأخطاء التفصيلي. جيد بشكل خاص لتحديد أسباب عدم إمكانية إزالة نموذج AMP المعياري.
- `iأداة تحسين الصور`: تمكين إنشاء srcset للصور تلقائيًا من خلال توفير وظيفة لحساب عناوين URL لدى srcset لصورة معينة src. يجب أن تعرض الوظيفة عنوان URL يشير إلى نسخة من صورة `src` بالعرض المحدد. في حالة عدم توفّر أي صورة، فيجب أن تعرض قيمة خاطئة. يتوفر المزيد حول هذا في القسم التالي.

### تحسين الصورة

يمكن "لأداة AMP Optimizer" إنشاء قيم `srcset` لصالح `amp-img` بناءً على تعريف `layout` الخاص. من أجل أن يجري الأمر على ما يرام، تحتاج إلى توفير وظيفة تقوم بتعيين `src` و`width` خاص بالصورة إلى قيمة مصدر `srcset` تم تغيير حجمها. لا يتم تنفيذ تغيير حجم الصورة بواسطة "أداة AMP Optimizer" ويجب أن يحدث إما في وقت الإنشاء (على سبيل المثال للمواقع الثابتة) أو عبر خدمة استضافة الصور مثل [thumbor](https://github.com/thumbor/thumbor).

في ما يلي مثال للتنفيذ الذي يُلحق عرض الصورة بـ `src`:

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

في:

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
