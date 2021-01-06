---
"$title": Easy offline access and improved performance
"$order": '11'
description: عامل الخدمة هو وكيل من جانب العميل يقع بين صفحتك وخادمك، ويتم استخدامه لخلق تجارب رائعة في وضع عدم الاتصال، وإجراء تحميل سريع ...
formats:
- websites
author: CrystalOnScript
contributors:
- pbakaus
---

يتيح [عمال الخدمة](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) تجارب ثرية في وضع عدم الاتصال وتجارب مستخدم متسقة عبر نقاط قوة مختلفة للشبكة. من خلال تخزين الموارد مؤقتًا داخل المستعرض، يصبح تطبيق الويب قادرًا على توفير البيانات والأصول والصفحات غير المتصلة بالإنترنت للمستخدم لإبقائهم مشاركين وعلى اطّلاع.

تذكّر: لن يتمكّن "عامل الخدمة" من التفاعل مع إصدار AMP المُخزن مؤقتًا لصفحتك. استخدمه في الرحلات القادمة إلى أصلك.

## تثبيت "عامل خدمة"

عامل الخدمة هو وكيل من جانب العميل يقع بين صفحتك وخادمك، ويتم استخدامه لخلق تجارب رائعة في وضع عدم الاتصال وسيناريوهات واجهة التطبيق سريعة التحميل وإرسال إعلامات الدفع.

[tip type="note"] **NOTE –** If the concept of Service Workers is new to you, read the [introduction at WebFundamentals](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers). [/tip]

يحتاج عامل الخدمة الخاص بك إلى التسجيل في صفحة معينة، وإلا فلن يعثر عليها المستعرض أو يقوم بتشغيلها. بشكل افتراضي، يتم ذلك بمساعدة [القليل من JavaScript](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration). على صفحات AMP، يمكنك استخدام المكوّن [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) لتحقيق الشيء نفسه.

لذلك، قم أولاً بتضمين المكوّن [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) عبر النص البرمجي الخاص به في `<head>` صفحتك:

[sourcecode:html]

<script async custom-element="amp-install-serviceworker"
  src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>

[/sourcecode]

ثم أضف ما يلي في مكان ما داخل `<body>` الخاص بك (قم بالتعديل للإشارة إلى عامل الخدمة الفعلي لك):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

إذا انتقل المستخدم إلى صفحات AMP الخاصة بك على أصلك (على عكس النقرة الأولى، والتي يتم تقديمها عادةً من ذاكرة التخزين المؤقت لصفحات AMP)، سيتولى عامل الخدمة المسؤولية ويمكنه القيام [بعدد لا يُحصى من الأمور الرائعة](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux).

## عامل خدمة AMP

إذا كنت هنا، فأنت تنشئ صفحات باستخدام AMP. يهتم فريق AMP بشكل كبير بوضع المستخدم في المقام الأول ومنحه تجربة ويب عالمية المستوى. للحفاظ على اتساق هذه التجارب، أنشأ فريق AMP عامل خدمة خصيصًا لـ AMP!

[tip type="default"] **تلميح –** اتّبع برنامجنا التعليمي لمعرفة كيفية استخدام [عامل خدمة AMP في (PWA) تطبيق الويب التقدمي](/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/amp_to_pwa.md). [/tip]

### Installing the AMP Service Worker

قم بتثبيت عامل خدمة AMP بأقل عدد من الخطوات:

- [sourcecode:js]  importScripts('https://cdn.ampproject.org/sw/amp-sw.js');  [/sourcecode]

- [sourcecode:js]
      AMP_SW.init();
      [/sourcecode]

- تم.

### التخزين المؤقت الآلي

يقوم عامل خدمة AMP تلقائيًا بتخزين ملفات البرامج النصية لـ AMP ومستندات AMP مؤقتًا. من خلال التخزين المؤقت لملفات البرامج النصية لصفحات AMP، فإنها تتوفر على الفور لمستعرض المستخدمين مما يتيح وظائف غير متصلة بالإنترنت وصفحات أسرع على الشبكات غير المستقرة.

إذا كان تطبيقك يتطلب أنواعًا معينة من التخزين المؤقت للمستندات، فإن عامل خدمة AMP يتيح التخصيص. مثل إضافة قائمة رفض للمستندات التي يجب طلبها دائمًا من الشبكة. في المثال التالي، استبدل `Array<RegExp>` بمصفوفة من التعبيرات العادية التي تمثل المستندات التي تريد تجنب التخزين المؤقت لها.

[sourcecode:js]
AMP_SW.init(
documentCachingOptions: {
denyList?: Array<RegExp>;
}
);
[/sourcecode]

اقرأ المزيد حول [تخصيص التخزين المؤقت للمستند هنا](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching).

### Optimizing the AMP Service Worker

لاستخدام "عامل خدمة AMP" بإمكانياته الكاملة، يجب تكوين الحقول الاختيارية لتخزين الأصول الضرورية وروابط الجلب المُسبق مؤقتًا.

يجب تخزين الأصول التي تدفع المستخدم لزيارة الصفحة، مثل مقطع فيديو أو صور مهمة أو ملف PDF قابل للتنزيل مؤقتًا حتى يمكن الوصول إليها مرة أخرى إذا كان المستخدم غير متصل بالإنترنت.

[sourcecode:js]
AMP_SW.init(
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
);
[/sourcecode]

يمكنك تخصيص استراتيجية التخزين المؤقت وتحديد قائمة رفض.

يمكن جلب روابط الصفحات التي قد يحتاج المستخدمون إلى زيارتها مُسبقًا، مما يتيح الوصول إليها أثناء عدم الاتصال بالإنترنت. يتم ذلك من خلال إضافة سمة `الجلب المُسبق للبيانات` إلى علامة الرابط.

sourcecode:html]
<a href='....' data-rel='prefetch' />
[/sourcecode]

### التجربة دون اتصال

أخبر المستخدم بأنه قد توقف عن الاتصال بالإنترنت، ويجب أن يحاول إعادة تحميل الموقع عند الاتصال بالإنترنت مرة أخرى، من خلال تضمين صفحة غير متصلة بالإنترنت. يمكن لعامل خدمة AMP تخزين الصفحة وأصولها في ذاكرة التخزين المؤقت.

[sourcecode:js]
AMP_SW.init({
offlinePageOptions: {
url: '/offline.html';
assets: ['/images/offline-header.jpg'];
}
})
[/sourcecode]

تبدو الصفحة الناجحة غير المتصلة بالإنترنت وكأنها جزء من موقعك من خلال وجود واجهة مستخدم متسقة مع بقية التطبيق.

### فرض التحديث

يعمل الفريق على تنفيذ ميزة "فرض تحديث/إزالة" إذا احتاج عامل خدمة AMP إلى التعطيل أو التغيير إذا حدث خطأ في النشر للمستخدمين.

لإدارة عامل الخادم بشكل فعّال، يجب استيعاب كيفية [تأثير التخزين المؤقت HTTP القياسي في الطريقة التي يتم بها تحديث JavaScript لعامل الخدمة لديك](https://developers.google.com/web/updates/2018/06/fresher-sw). يمكن للعاملين في الخدمة الذين يتم تزويدهم بتوجيهات التخزين المؤقت المناسبة لـ HTTP حل إصلاحات الأخطاء الصغيرة من خلال إجراء التغييرات المناسبة وإعادة نشر عامل الخدمة الخاص بك إلى بيئة الاستضافة الخاصة بك. إذا كنت بحاجة إلى إزالة عامل خدمة، فمن الأفضل الاحتفاظ بملف عامل خدمة بسيط، [‏‏لم يتم إجراء أية عملية](https://en.wikipedia.org/wiki/NOP) في متناول اليد، مثل ما يلي:

```js
self.addEventListener('install', () => {
  // Skip over the "waiting" lifecycle state, to ensure that our
  // new service worker is activated immediately, even if there's
  // another tab open controlled by our older service worker code.
  self.skipWaiting();
});
```

[tip type="read-on"] [اقرأ المزيد](https://stackoverflow.com/questions/33986976/how-can-i-remove-a-buggy-service-worker-or-implement-a-kill-switch/38980776#38980776) حول إدارة عمال الخدمة المنتشرين. [/tip]

## كتابة عامل خدمة مخصص

يمكنك استخدام الأسلوب أعلاه لتمكين الوصول في وضع عدم الاتصال إلى موقع AMP الإلكتروني الخاص بك، بالإضافة إلى توسيع صفحاتك **بمجرد عرضها من الأصل**. ذلك لأنه يمكنك تعديل الاستجابة عبر حدث `جلب` عامل الخدمة، وإرجاع أي استجابة تريدها:

[sourcecode:js]
self.addEventListener('fetch', function(event) {
event.respondWith(
caches.open('mysite').then(function(cache) {
return cache.match(event.request).then(function(response) {
var fetchPromise = fetch(event.request).then(function(networkResponse) {
cache.put(event.request, networkResponse.clone());
return networkResponse;
})

        // Modify the response here before it goes out..
        ...

        return response || fetchPromise;
      })
    })

);
});
[/sourcecode]

باستخدام هذا الأسلوب، يمكنك تعديل صفحة AMP التي ستحتوي على جميع أنواع الوظائف الإضافية التي كانت ستفشل بخلاف تلك الموجودة في [التحقق من صحة AMP](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)، على سبيل المثال:<br>:

- Dynamic features that require custom JS.
- المكونات المخصصة/ذات الصلة فقط بموقعك.
