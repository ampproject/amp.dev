---
$title: amp-addthis
$category@: social
formats:
  - websites
teaser:
  text: Displays AddThis’ customizable social share buttons.
---

<!--
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->



يعمل المكّوِن على تضمين أدوات [AddThis](https://www.addthis.com) للمواقع الإلكترونية.

<table>
  <tr>
    <td width="40%"><strong>النص البرمجي المطلوب</strong></td>
    <td><code>&lt;script async custom-element="amp-addthis" src="https://cdn.ampproject.org/v0/amp-addthis-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">التنسيقات المعتمدة</a></strong></td>
    <td>fill وfixed وfixed-height وflex-item وnodisplay وresponsive</td>
  </tr>
</table>


## لماذا AddThis؟ <a name="why-addthis"></a>

يوفّر المكوِّن `amp-addthis` أزرارًا جميلة وبسيطة للمشاركة. يمكنك أن تسهِّل على زوار موقعك الإلكتروني مشاركة المحتوى مع أكثر من 200 قناة اجتماعية، منها Messenger وWhatsApp وFacebook وTwitter وPinterest وغيرها الكثير.

يحوذ AddThis على ثقة أكثر من 15 مليون موقع إلكتروني يستخدمها ما يزيد عن 2 مليار مستخدم فريد في مشاركة المحتوى حول العالم وبأكثر من ستين لغة.

## أزرار المشاركة <a name="share-buttons"></a>

### العائمة <a name="floating"></a>

أزرار يمكن وضعها على جوانب الصفحة أو أعلاها أو أسفلها، وتتبع القارئ أثناء تمرير الصفحة. وهي طريقة رائعة لحث المستخدِم على مشاركة المحتوى بدون مضايقته.

مثال:
```html
<!--
  This example uses a placeholder pubId.
  Please replace the pubId value with your own after
  creating an account on https://www.addthis.com/dashboard.
-->
<amp-addthis
  width="320"
  height="92"
  layout="responsive"
  data-pub-id="ra-5c191331410932ff"
  data-widget-id="957l"
  data-widget-type="floating">
</amp-addthis>
```

### المضمّنة <a name="inline"></a>

يمكن دمج أزرار المشاركة في المحتوى للحصول على تجربة مشاركة سلسة.

مثال:
```html
<!--
  This example uses a placeholder pubId.
  Please replace the pubId value with your own after
  creating an account on https://www.addthis.com/dashboard.
-->
<amp-addthis
  width="320"
  height="92"
  data-pub-id="ra-5c191331410932ff"
  data-widget-id="mv93"
  data-widget-type="inline">
</amp-addthis>
```

## السمات <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>data-pub-id</strong></td>
    <td>هذه السمة هي الرقم التعريفي للناشر في AddThis والذي يُوجد في عنوان URL في <a href="https://addthis.com/dashboard">لوحة بيانات AddThis</a> بعد تسجيل الدخول. في عنوان URL هذا مثلاً <code>https://www.addthis.com/dashboard#gallery/pub/ra-5c191331410932ff</code>، الرقم التعريفي للناشر هو <code>ra-5c191331410932ff</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-widget-id</strong></td>
    <td>ويمكن أن تعثر أيضًا في <a href="https://addthis.com/dashboard">لوحات البيانات AddThis</a> على معرّف الأداة التي ستعرضها من أدوات AddThis. يمكن العثور على معرّف أداة معينة من خلال فتح تلك الأداة في لوحة بيانات AddThis ونسخ الجزء الأخير من عنوان URL. في عنوان URL هذا مثلاً  <code>https://www.addthis.com/dashboard#tool-config/pub/ra-5c191331410932ff/widgetId/957l</code>، معرّف الأداة هو <code>957l</code> is the widget Id.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-widget-type</strong></td>
    <td>تصف هذه السمة نوع الأداة.
    <ul>
      <li>عائمة: <code>data-widget-type="floating"</code></li>
      <li>مضمّنة: <code>data-widget-type="inline"</code></li>
    </ul></td>
  </tr>
  <tr>
    <td width="40%"><strong>data-title</strong></td>
    <td>هذه السمة اختيارية. في حال تعيينها، تكون العنوان الذي ستحاول أداة AddThis مشاركته عند حدوث المشاركة. إذا لم يتم تعيينها، سيتم استخدام عنوان المستند الذي يحتوي على العلامة <code>amp-addthis</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-url</strong></td>
    <td>هذه السمة اختيارية. في حال تعيينها، تكون عنوان URL الذي ستحاول أداة AddThis مشاركته عند حدوث المشاركة. إذا لم يتم تعيينها، سيتم استخدام الخاصية <code>location.href</code> للمستند الذي يحتوي على العلامة <code>amp-addthis</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-media</strong></td>
    <td>هذه السمة اختيارية. في حال تعيينها، تكون عنوان URL للوسيط (الصورة أو الفيديو مثلاً) الذي ستحاول أداة AddThis مشاركته عند حدوث المشاركة. إذا لم يتم تعيينها، تُترك غير محددة.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-description</strong></td>
    <td>هذه السمة اختيارية. في حال تعيينها، تكون وصف الصفحة الذي ستحاول أداة AddThis مشاركته عند حدوث المشاركة. إذا لم يتم تعيينها، تُترك غير محددة.</td>
  </tr>
</table>

## وثائق التنفيذ <a name="implementation-documentation"></a>

1. إذا لم يسبق لك إنشاء حساب على AddThis، ستحتاج إلى إنشاء حساب على الموقع [https://www.addthis.com/register](https://www.addthis.com/register). لن تتحمل أي تكلفة مقابل إنشاء الحساب وسيتيح لك الوصول إلى مجموعتنا الكاملة من أدوات المواقع الإلكترونية وأيضًا تقاريرنا التحليلية العميقة للحصول على فهم أفضل للزيارات الواردة إلى موقعك من الشبكات الاجتماعية.
2. انتقِل إلى [لوحة البيانات](https://addthis.com/dashboard) وخصِص "أزرار المشاركة" (لا تتيح صفحات AMP حاليًا إلا عمل "أزرار المشاركة العائمة" و"المضّمنة").
3. خصِص أزرار المشاركة حسبما تريد ثم اضغط على "تنشيط الأداة". سيؤدي هذا إلى إعادة توجيهك إلى صفحة "الحصول على الرمز".
4. أخيرًا وليس آخرًا، انسخ الرمز المضّمن والصقه في القسم الأساسي من صفحتك في المكان المراد ظهور أزرار المشاركة فيه. بالنسبة إلى "أزرار المشاركة العائمة"، يمكنك وضع هذا الرمز في أي مكان من القسم الأساسي وسيظهر تلقائيًا على الجانب الأيسر أو الأيمن من شاشتك، حسب المكان الذي عينته في إعدادات الأداة.

بهذا تكون قد انتهيت. ويفترض أن ترى أزرار المشاركة على صفحتك.

شاهِد [فيديو YouTube](https://www.youtube.com/watch?v=BSkuAB4er2o) لمعرفة التعليمات خطوة بخطوة:
<amp-youtube width="480" height="270" data-videoid="BSkuAB4er2o" layout="responsive"></amp-youtube>

## التحقق <a name="validation"></a>

اطّلِع على [قواعد amp-addthis](https://github.com/ampproject/amphtml/blob/master/extensions/amp-addthis/validator-amp-addthis.protoascii) في مواصفات مدقق AMP.

## الخصوصية <a name="privacy"></a>

[http://www.addthis.com/privacy/privacy-policy/](http://www.addthis.com/privacy/privacy-policy/)

تجمع "أدوات AddThis" و"شريط أدوات AddThis" المعلومات من الجهاز الذي يستعين به المستخدِم للتفاعل مع "مواقع الناشر" أو مع "شريط أدوات AddThis" (المُشار إليها باسم "بيانات AddThis").

قد تتضمن "بيانات AddThis" ما يلي:

* عنوان بروتوكول الإنترنت (IP) ومعرّف إعلانات الأجهزة الجوّالة (MAID) (الذي يسمح لمطوري التطبيقات المتوافقة مع الأجهزة الجوالة بتحديد من يستخدم تطبيقاتهم) ومعرّف التطبيقات المتوافقة مع الأجهزة الجوّالة ونوع المتصفح ولغة المتصفح ونوع نظام التشغيل وتاريخ ووقت زيارة المستخدِم "لموقع الناشر" أو "شريط الأدوات"
* مستخدِم شريط الأدوات
* سلوك المستخدِم على "موقع الناشر"، مثل مدة زيارته للموقع، وسلوك المستخدِم في مشاركة المحتوى على "موقع الناشر" وسلوك تمرير المستخدِم للمحتوى على الموقع
* عنوان URL المرجعي والبحث الويب المستخدَم لتحديد "موقع الناشر" والانتقال إليه
* الكلمات الرئيسية التي تم إدخالها في وظيفة البحث في "شريط أدوات AddThis" وإذا ما كان مستخدِم الشريط قد أقدم على تنزيله أو تثبيته أو إلغاء تثبيته ومتى كان هذا
* معلومات عن عدد مرات استخدام "أدوات AddThis" و"شريط أدوات AddThis" من قِبل المستخدِم
* بيانات الموقع الجغرافي المستمدة من عنوان IP لمستخدِم الأدوات ومستخدِم شريط الأدوات

سيتم التعامل مع "بيانات AddThis" على أنها معلومات شخصية بالقدر التي ينص عليه القانون المعمول به. وفقًا لبنود خدمة AddThis، مطلوب من الناشرين الحصول على جميع موافقات المستخدِم وتفويضاته، وتقديم أي إشعارات مطلوبة لتوفير "بيانات AddThis" التي تم جمعها من المستخدِمين إلى Oracle.

## الدعم <a name="support"></a>

إذا كانت لديك أي أسئلة أو كنت بحاجة إلى أي مساعدة في تنفيذ AddThis على صفحات AMP، يُرجى الاتصال بفريق الدعم الرائع لدينا من خلال إرسال تذكرة [هنا](https://www.addthis.com/support/) أو عن طريق إرسال رسالة إلكترونية إلى [help@addthis.com](mailto%3ahelp@addthis.com).
