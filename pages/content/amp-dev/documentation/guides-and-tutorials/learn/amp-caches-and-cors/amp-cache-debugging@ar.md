---
'$title': تصحيح أخطاء مشكلات ذاكرة AMP للتخزين المؤقت
$order: 8
formats:
  - websites
  - stories
  - ads
teaser:
  text: ' لماذا يتعطل مستندي في ذاكرة AMP للتخزين المؤقت؟'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-debugging.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## لماذا يتعطل مستندي في ذاكرة AMP للتخزين المؤقت؟ <a name="why-is-my-doc-broken-on-an-amp-cache"></a>

في العادة تظهر مستندات AMP ويكون سلوكها على ذاكرات AMP للتخزين المؤقت متماثلا كما تفعل في الأصل. مع ذلك، قد تكون هناك مشكلات في بعض المكونات وتكوينات الخادم.

في حالة ظهور مستند معين وأدائه السلوك المتوقع على الأصل الخاص بك، ولكنه لا يفعل نفس الشيء عند عرضه عن طريق ذاكرة تخزين مؤقت ([كيف تعين عناوين URL الأصل بذاكرة AMP للتخزين المؤقت من Google](https://developers.google.com/amp/cache/overview#amp-cache-url-format))، فجرب ما يلي:

1. افتح وحدة تحكم أدوات المطور/الأخطاء في المتصفح، وقم بحل أي أخطاء أو تحذيرات قد تظهر.
2. قم بتشغيل المستند عن طريق [AMPBench](https://search.google.com/test/amp) وقم بحل أي أخطاء أو تحذيرات غير متوقعة.

إذا كان ما يزال لديك مشكلة بعد هذه الخطوات، فتحقق من الجدول التالي.

<table>
<table>
  <thead>
    <tr>
      <th width="30%">العرّض</th>
      <th width="30%">المشكلة</th>
      <th width="40%">الحل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>عدم ظهور خطوط الويب (يتم استخدام الخطوط الاحتياطية)</td>
      <td>ذاكرة AMP للتخزين المؤقت ليست مدرجة ضمن القائمة البيضاء من جانب موفر الخطوط.</td>
      <td>اتصل بموفر الخطوط واطلب منهم إدراج <a href="amp-cors-requests.md#cors-security-in-amp">جميع ذاكرات التخزين المؤقت</a>.</td>
    </tr>
    <tr>
      <td>الأصول (مثل الخطوط والصور) لا تظهر (<strong>تظهر أصول HTTP فقط</strong>)</td>
      <td>المستند يستخدم عناوين URL متعلقة بالبروتوكول.</td>
      <td>قم بالتبديل إلى عناوين URL القديمة (أي، <code>http://www.site.com/doc/amp</code>، وليس <code>//www.site.com/doc/amp</code>).</td>
    </tr>
    <tr>
      <td rowspan="2">الأصول (مثل الخطوط والصور) لا تظهر</td>
      <td>يجري عرض الأصول بنوع MIME غير صحيح.</td>
      <td>حدد <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-cache-guidelines.md#guidelines-accepted-mime-types">نوع MIME مقبول</a>.</td>
    </tr>
    <tr>
      <td>لا يمكن لذاكرة AMP للتخزين المؤقت الوصول إلى الأصول.</td>
      <td>تأكد من أن ذاكرة AMP للتخزين المؤقت يمكنها الوصول إلى أصولك وأنها ليست محظورة بواسطة أي عنوان IP أو وكيل مستخدم أو غيره. (<a href="https://support.google.com/webmasters/answer/1061943?hl=en">قائمة وكلاء المستخدمين الذين يستخدم متتبعو ملفات الإنترنت من Google</a>).</td>
    </tr>
    <tr>
      <td>العناصر الديناميكية مثل <code><amp-form></amp-form></code> و <code><amp-list></amp-list></code>، لا تتصرف بالسلوك المتوقع.</td>
      <td>رؤوس CORS مكسورة أو مفقودة.</td>
      <td>تنشئ هذه المكونات طلبات عبر الأصول من ذاكرة AMP للتخزين المؤقت إلى الأصل الخاص بك. فيما تحظر المتصفحات هذه الطلبات بشكل افتراضي. للسماح بهذه الطلبات، قم بإصدار <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">رؤوس CORS</a> تسمح <a href="amp-cors-requests.md">بجميع ذاكرات التخزين المؤقت</a>.</td>
    </tr>
    <tr>
      <td>يجري تقديم محتوى ينبغي إزالته بسبب إشعار إنهاء قانوني.</td>
      <td>لم تلتقط ذاكرة AMP للتخزين المؤقت بعد الإزالة</td>
      <td>اتبع الإرشادات لكل ذاكرة AMP للتخزين المؤقت لتحديث المحتوى. مع ذاكرة Google AMP للتخزين المؤقت، راجع <a href="https://developers.google.com/amp/cache/update-cache">تحديث محتوى AMP</a>.</td>
    </tr>
</tbody>
</table>

</table>
