---
$title: أخطاء التحقق من صحة AMP
---

<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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

يجب ألا تتضمن مستندات AMP الصالحة أي أخطاء تتعلق بالتحقق من الصحة.
والغرض من هذا المستند هو مساعدتك في فهم أفضل
لأي أخطاء تتعلق بالتحقق من الصحة قد تصادفها عند
[التحقق من صحة صفحات AMP](validate_amp.md) وإصلاح هذه الأخطاء.
للحصول على نظرة عامة حول أخطاء التحقق من الصحة،
راجع [مواصفات أداة التحقق من صحة صفحات AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

## أخطاء علامات وسمات HTML لصفحات AMP

### العلامة الإلزامية غير موجودة

<table>
   <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>MANDATORY_TAG_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The mandatory tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إضافة (أو تصحيح) علامة HTML الإلزامية.</td>
  </tr>
</table>

يجب أن تكون العلامات التالية موجودة في جميع مستندات AMP:

* <a name="doctype"></a>`<!doctype html>`
* <a name="html"></a>`<html amp> or <html ⚡>`
* <a name="head"></a>`<head>`
* <a name="canonical"></a>`<link rel="canonical" href="$SOME_URL">`
* <a name="utf"></a>`<meta charset="utf-8">`
* <a name="viewport"></a>`<meta name="viewport" content="...">`
* <a name="boilerplate"></a>`<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* <a name="ampscript"></a>`<script async src="https://ampjs.org/v0.js"></script>`
* <a name="body"></a>`<body>`

تشتمل هذه العلامات الإلزامية على حقل `mandatory: true` في [مواصفات أداة التحقق من صفحة صفحات AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)؛
كما تتم الإشارة إليها أيضًا في [مواصفات صفحات AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md).

### العلامة المطلوبة من قبل علامة أخرى غير موجودة

<table>
   <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>TAG_REQUIRED_BY_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The '%1' tag is missing or incorrect, but required by '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إضافة (أو تصحيح) علامة HTML المطلوبة.</td>
  </tr>
</table>

تعرض أداة التحقق من الصحة الخطأ `TAG_REQUIRED_BY_MISSING`
عند عثورها على مكوّن موسّع في مستند AMP،
وعدم عثورها على المكوّن `<script>` المكافئ له.

يجب تضمين [المكوّنات الموسّعة](../../../../documentation/components/index.html)
بشكل صريح في مستند AMP باعتبارها عناصر مخصصة.
ولإصلاح هذه الأخطاء، انتقل إلى الصفحة المرجعية للمكوّن الموسّع،
وانسخ النص البرمجي المطلوب بها، ثم الصقه في مستند AMP `<head>`.

### العلامة غير مسموح بها

<table>
   <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>DISALLOWED_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The tag '%1' is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إزالة العلامة الغير مسموح بها.</td>
  </tr>
</table>

العلامات مدرجة في القائمة البيضاء، وبالتالي ليست هناك قائمة محددة تضم جميع العلامات الغير مسموح بها؛
ومع ذلك فإن [مواصفات صفحة AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)
تحدد مجموعة من العلامات الغير مسموح بها على نطاق واسع.

### السمة الإلزامية غير موجودة

<table>
   <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>MANDATORY_ATTR_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The mandatory attribute '%1' is missing in tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إضافة السمة الإلزامية إلى العلامة.</td>
  </tr>
</table>

السمات الإلزامية لعلامات AMP محددة ضمن
[مواصفات أداة التحقق من صحة صفحات AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).
ابحث فحسب عن العلامة،
واعرض السمات المدرجة، ثم راجع `mandatory: true`.
يتم أيضًا إدراج السمات الإلزامية لكل علامة من علامات AMP
ضمن مواصفات العلامة.

### قيمة سمة غير صالحة

<table>
   <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>INVALID_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to the invalid value '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إصلاح قيمة السمة لتصبح في صيغة سليمة.</td>
  </tr>
</table>

يشير هذا الخطأ إلى أن إحدى علامات HTML لها سمة ذات اسم مسموح به،
وليست قيمة مسموحًا بها.
فمثلاً، من العوامل الشائعة التي تؤدي لهذا الخطأ وجود قيم غير صالحة لعناوين URL.
ويجب أن تكون كل قيم عناوين URL (في السمتين `href` و`src`) مطابقة لواحدة من
[قيم السمات المحتملة](http://www.w3schools.com/tags/att_a_href.asp) هذه.

<strong>مهم:</strong> تتطلب العديد من قيم عناوين URL في صفحات AMP توفّر HTTPS.
فإذا ظهر لك هذا الخطأ، ولم تكن متأكدًا من السبب،
فعليك بمراجعة مواصفات علامة AMP ذات الصلة
لمعرفة ما إذا كانت السمة تتطلب HTTPS.

### السمة غير مسموح بها

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>DISALLOWED_ATTR</td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The attribute '%1' may not appear in tag '%2'."</td>
  </tr>
  <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إزالة السمة من علامة HTML.</td>
  </tr>
</table>

السمات مدرجة في القائمة البيضاء، وبالتالي ليست هناك قائمة محددة تضم جميع السمات الغير مسموح بها.
لمراجعة السمات المتوافقة لكل علامة محددة،
ابحث عن علامة HTML، ثم `attrs`
في [مواصفات أداة التحقق من صحة صفحات AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

بالإضافة إلى قائمة بيضاء بالسمات المحددة لكل علامة،
يمكن لجميع علامات AMP استخدام أي من السمات المدرجة بالقائمة البيضاء ضمن `$GLOBAL_ATTRS`؛
كما يتم أيضًا إدراج جميع السمات ذات البادئة `"data-"` في القائمة البيضاء.

### النص الإلزامي غير موجود أو غير صحيح

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>MANDATORY_CDATA_MISSING_OR_INCORRECT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The mandatory text (CDATA) inside tag '%1' is missing or incorrect."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إضافة النص الإلزامي أو تصحيحه داخل العلامة.</td>
  </tr>
</table>

يمثل النص CDATA بيانات المحتوى الواقعة بين علامة HTML للبداية وعلامة HTML للنهاية
ويتم تقييمه حاليًا من خلال القوائم البيضاء والقوائم السوداء معًا.
وتتضمن العلامات ذات النص الإلزامي CDATA ما يلي:

[sourcecode:html]
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
[/sourcecode]

و:

[sourcecode:html]
<style amp-custom>
[/sourcecode]

يمكن أن تظهر الرسائل التفصيلية لذلك بإحدى الصيغ التالية:

* "Mandatory style boilerplate (js enabled‎)"
* "Mandatory style boilerplate (noscript‎)"
* "Disallowed -amp- CSS class name prefix"
* ‎"Disallowed !‎important attribute in CSS"‎
* "Disallowed @charset in CSS"
* "Disallowed @import in CSS"
* "Disallowed @namespace in CSS"
* "Disallowed @supports in CSS"
* "Disallowed @document in CSS"
* "Disallowed @page in CSS"
* "Disallowed @viewport in CSS"

### النص غير مسموح به داخل العلامة

<table>
   <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>CDATA_VIOLATES_DENYLIST</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The text (CDATA) inside tag '%1' matches '%2', which is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إزالة النص الغير مسموح به.</td>
  </tr>
</table>

تم وضع بيانات CSS محددة في القائمة السوداء
للتحقق من صحة قواعد CSS AMP الأساسية.

في ما يلي قائمة بيانات CSS المدرجة بالقائمة السوداء
(راجع أيضًا <a href="https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii">`disallowed_cdata_regex` في مواصفات أداة التحقق من صحة صفحات AMP</a>):

* ‎`"\\.i?-amp-"` ("CSS -amp- class name prefix"‎)‎
* `"!important"`
* `"charset"`
* `"@import"`
* `"@namespace"`
* `"@document"`
* `"@page"`
* `"@viewport"`

### الموقع غير مسموح به داخل السمة في العلامة

<table>
   <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>DISALLOWED_PROPERTY_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The property '%1' in attribute '%2' in tag '%3' is disallowed."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إزالة الخاصية الغير مسموح بها في السمة المحددة.</td>
  </tr>
</table>

يحدث هذا الخطأ عند عدم السماح باسم الخاصية داخل إحدى السمات.
ويعني مصطلح "الخاصية" في هذا السياق بيانات المفتاح/القيمة المنظمة داخل إحدى السمات.
فمثلاً، في
`<meta name="viewport content="width=device-width;minimum-scale=1">`، تكون
`width` و`minimum-scale` اسمين من أسماء الخصائص.

يؤدي ما يلي إلى خطأ DISALLOWED_PROPERTY_IN_ATTR_VALUE:

`<meta name="viewport content="width=device-width;invalidfoo=1">`

وكمثال آخر،
يؤدي ما يلي إلى وقوع خطأ:

`<meta http-equiv="X-UA-Compatible" content="invalidfoo=edge">`

فيجب أن يكون على النحو: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`.

### قيمة الخاصية غير صالحة

<table>
   <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>INVALID_PROPERTY_VALUE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The property '%1' in attribute '%2' in tag '%3' is set to '%4', which is invalid."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>تصحيح قيمة الخاصية الغير صالحة.</td>
  </tr>
</table>

يحدث هذا الخطأ عندما تكون قيمة الخاصية داخل إحدى السمات غير صالحة.
ويعني مصطلح "الخاصية" في هذا السياق بيانات المفتاح/القيمة المنظمة داخل إحدى السمات.
فمثلاً، في
`<meta name="viewport content="width=device-width;minimum-scale=1">`، تكون
`device-width` و`1` قيمتين من قيم الخصائص.

يؤدي ما يلي إلى خطأ INVALID_PROPERTY_VALUE_IN_ATTR_VALUE:

`<meta name=viewport content="width=device-width;minimum-scale=invalidfoo">`

وكمثال آخر،
يؤدي ما يلي إلى وقوع خطأ:

`<meta http-equiv="X-UA-Compatible" content="ie=invalidfoo">`

فيجب أن يكون على النحو: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`

### عنوان URL غير موجود

<table>
  <tr>
    <td class="col-thirty"><strong>الشفرة</strong></td>
    <td>MISSING_URL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>التنسيق</strong></td>
    <td>"Missing URL for attribute '%1' in tag '%2'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>الإصلاح</strong></td>
    <td>إضافة عنوان URL صالح.</td>
  </tr>
</table>

يحدث هذا الخطأ عندما تكون إحدى السمات التي تتطلب عنوان URL غير محتوية عليه،
مثل سمة `href` أو `src` فارغة.

### عنوان URL غير صالح

<table>
  <tr>
    <td class="col-thirty"><strong>الشفرة</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>التنسيق</strong></td>
    <td>"Malformed URL '%3' for attribute '%1' in tag '%2'"</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>الإصلاح</strong></td>
    <td>إصلاح عنوان URL الغير صالح.</td>
  </tr>
</table>

يحدث هذا الخطأ عندما تحتوي إحدى السمات على عنوان URL غير صالح.

### بروتوكول غير صالح لعنوان URL

<table>
  <tr>
    <td class="col-thirty"><strong>الشفرة</strong></td>
    <td>INVALID_URL_PROTOCOL</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>التنسيق</strong></td>
    <td>Invalid URL protocol '%3:' for attribute '%1' in tag '%2'.</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>الإصلاح</strong></td>
    <td>التغيير إلى بروتوكول صالح، على سبيل المثال، قد يلزم تغيير `http` ليصبح `https`.</td>
  </tr>
</table>

يحدث هذا الخطأ مع العلامات التي بها `href` أو `src` يجب تعيينه إلى بروتوكولات معينة.
فعلى سبيل المثال، تتطلب العديد من العلامات `https`.

### الخاصية الإلزامية غير موجودة في السمة

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>MANDATORY_PROPERTY_MISSING_FROM_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The property '%1' is missing from attribute '%2' in tag '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إضافة الخاصية المفقودة.</td>
  </tr>
</table>

حاليًا، يحدث هذا الخطأ في حالة عدم وجود هذه الخصائص الإلزامية:

* `content="...ie=..."`
* `content="...width=..."`
* `content="...minimum-scale=..."`

وهي تشير إلى العلامات المتوقعة:

* `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
* `<meta name=viewport content="width=device-width;minimum-scale=1">`

### هناك سمات حصرية يمكن استخدامها بشكل تبادلي

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>MUTUALLY_EXCLUSIVE_ATTRS</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"Mutually exclusive attributes encountered in tag '%1' - pick one of %2."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إزالة إحدى السمات الحصرية التي يمكن استخدامها بشكل تبادلي</td>
  </tr>
</table>

يحدث هذا الخطأ عندما يكون لإحدى العلامات كلتا السمتين الحصريتين اللتين يمكن استخدامهما بشكل تبادلي.
على سبيل المثال، يُسمح بسمة واحدة فقط للعلامات التالية:

* ‏[`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md):‏ `data-tweetid` أو `src`
* [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md):‏ `data-shortcode` أو `src`
* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md):‏ `src` أو `srcdoc`
* [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md):‏ `src` أو `data-videoid`

### السمة الإلزامية غير موجودة في القائمة

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>MANDATORY_ONEOF_ATTR_MISSING</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The tag '%1' is missing a mandatory attribute - pick one of %2." </td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إضافة السمة الإلزامية الغير موجودة من خيار السمات المتاحة.</td>
  </tr>
</table>

يحدث هذا الخطأ عندما تفتقد إحدى العلامات سمة مطلوبة
من الخيارات المتعددة.
على سبيل المثال، تتطلب هذه العلامات سمة واحدة من خيارين محتملين:

* ‏[`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md):‏ `data-tweetid` أو `src`
* [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md):‏ `data-shortcode` أو `src`
* [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md):‏ `src` أو `srcdoc`
* [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md):‏ `src` أو `data-videoid`

### علامة أصل خاطئة

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>WRONG_PARENT_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The parent tag of tag '%1' is '%2', but it can only be '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>جعل العلامة تابعًا مباشرًا للأصل المطلوب.</td>
  </tr>
</table>

تتطلب علامات محددة أصلاً مباشرًا (مقارنة بالأصل البعيد).
وفي ما يلي قائمة بالأصل المطلوب لعلامات محددة
(العلامة، الأصل):

* تتطلب `!doctype` علامة الأصل `root`.
* تتطلب `html` علامة الأصل `!doctype`.
* تتطلب `head` علامة الأصل `html`.
* تتطلب `body` علامة الأصل `html`.
* تتطلب `link` علامة الأصل `head`.
* تتطلب `meta` علامة الأصل `head`.
* تتطلب `style amp-custom` علامة الأصل `head`.
* تتطلب `style` علامة الأًصل `boilerplate (noscript)`.
* تتطلب `noscript` علامة الأصل `head`.
* تتطلب `script` علامة الأصل `head`.
* تتطلب `source` علامة وسائط ([`amp-audio`](../../../../documentation/components/reference/amp-audio.md)، [`amp-video`](../../../../documentation/components/reference/amp-video.md)، وغيرها).

### علامة الأصل غير مسموح بها

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>DISALLOWED_TAG_ANCESTOR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The tag '%1' may not appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إزالة (أو نقل) العلامة المضمّنة الغير مسموح بها.</td>
  </tr>
</table>

يحدث هذا الخطأ عندما تكون إحدى العلامات تابعة لعلامة أخرى
لا تجتاز التحقق من الصحة.
المثال الوحيد المتوفر حاليًا هو علامة `template`،
والتي لا يمكن تضمينها تحت علامة `template` أخرى.

### علامة الأصل الإلزامية

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>MANDATORY_TAG_ANCESTOR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The tag '%1' may only appear as a descendant of tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إزالة العلامة أو جعلها تابعة للعلامة المحددة.</td>
  </tr>
</table>

يتم تحديد التوابع الإلزامية في
[مواصفات أداة التحقق من صفحات AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)
على النحو `mandatory_ancestor`.

يحدث الخطأ عندما تفتقد العلامات التالية
إلى `mandatory_ancestor` (العلامة، الأصل):

* يجب أن تكون العلامة `img` تابعة لـ `noscript`.
* يجب أن تكون العلامة `video` تابعة لـ `noscript`.
* يجب أن تكون العلامة `audio` تابعة لـ `noscript`.
* يجب أن تكون العلامة `noscript` تابعة لـ `body`.

### علامة الأصل الإلزامية مع تلميح

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>MANDATORY_TAG_ANCESTOR_WITH_HINT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The tag '%1' may only appear as a descendant of tag '%2'. Did you mean '%3'?"</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إزالة العلامة، وجعلها تابعة للعلامة المحددة، أو استبدال العلامة بالعلامة المشار إليها.</td>
  </tr>
</table>

يحدث الخطأ عند العثور على إحدى العلامات التالية في مستند AMP،
وعدم تضمينها بشكل صحيح في علامة الأصل الإلزامية الخاصة بها:

* `img` ليست ضمن الأصل `noscript`.
* `video` ليست ضمن الأصل `noscript`.
* `audio` ليست ضمن الأصل `noscript`.
* `noscript` ليست ضمن الأصل `body`.

### تكرار علامة فريدة

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>DUPLICATE_UNIQUE_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The tag '%1' appears more than once in the document."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إزالة إحدى العلامات المكررة من مستند AMP.</td>
  </tr>
</table>

يحدث هذا الخطأ عندما يُسمح بمثال واحد للعلامة على وجه التحديد،
ويتم العثور على نسخة طبق الأصل.

القائمة الكاملة للعلامات الفريدة معروفة:

* `<doctype html>`
* `<html amp>`
* `<head>`
* `<link rel=canonical href=...>`
* `<link rel=amphtml href=...>`
* `<meta charset="utf-8">`
* `<meta viewport>`
* `<style amp-custom>`
* `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
* `<body>`
* `<script src="https://ampjs.org/v0.js">`

## أخطاء الأنماط والتنسيقات

قبل مراجعة أخطاء الأنماط والتنسيقات،
يجدر بنا التعرف على كيفية عمل
[الأنماط](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md) و
[التنسيقات](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) في AMP.
ونظرًا لأن صفحات AMP هي صفحات HTML، فإن الأنماط تشبه كثيرًا أي صفحات HTML.
ولكن هناك بعض القيود لضمان سرعة تحميل الصفحات،
وتعمل أداة التحقق من صحة صفحات AMP على تفعيل هذه القيود.

يتم التحكم في التنسيق بدرجة أكبر في صفحات AMP.
وأي علامة يتم عرضها على الصفحة
تتطلب ارتفاعًا وعرضًا مسبق التحديد،
وذلك للتقليل بشكل كبير من البيانات غير المحتملة للعرض والتمرير.
ولا يعني هذا أن عليك تضمين هذه السمات يدويًا.
وبالنسبة إلى بعض أنواع التنسيقات،
لن تعرض أداة التحقق من صحة صفحات AMP الأخطاء
بينما يتم تقدير القيم الافتراضية.

لكل علامة من علامات AMP قائمة من `supported_layouts`،
كما هو محدد في
[مواصفات أداة التحقق من صحة صفحات AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).
وستعرض أداة التحقق من الصحة الأخطاء المتعلقة بالتنسيقات غير المتوافقة،
كما ستراجع قواعد التحقق من الصحة المرتبطة بالتنسيق مسبق التحديد.

### ورقة الأنماط طويلة جدًا

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>STYLESHEET_TOO_LONG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The author stylesheet specified in tag 'style' is too long - we saw %1 bytes whereas the limit is %2 bytes."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>تقليل حجم ورقة الأنماط لتكون أقل من 75000 بايت.</td>
  </tr>
</table>

تعرض أداة التحقق من صحة صفحات AMP هذا الخطأ
عند قياسها لحجم محتوى الأنماط
ضمن `<style amp-custom>` وتجاوزه لحد 75000 بايت.

### خطأ في بنية CSS

<table>
   <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>CSS_SYNTAX</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"CSS syntax error in tag '%1' - %2."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إصلاح خطأ بنية CSS.</td>
  </tr>
</table>

يحدث هذا الخطأ عند وجود أخطاء في بنية CSS ضمن العلامة المحددة.
إذا لم تكن متأكدًا من سبب الخطأ،
فجرّب تشغيل CSS
من خلال أداة للتحقق من صحة CSS عبر الإنترنت، مثل،
[csslint](http://csslint.net/).

### خطأ في بنية CSS في قاعدة محددة

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>CSS_SYNTAX_INVALID_AT_RULE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"CSS syntax error in tag '%1' - saw invalid at rule '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إصلاح خطأ بنية CSS المحدد.</td>
  </tr>
</table>

يشير هذا الخطأ إلى قواعد @ داخل CSS،
والتي تسمح لها AMP بمجموعة من القواعد فقط.
(راجع أيضًا [مواصفات AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)).
على سبيل المثال، لا يُسمح بالقاعدة `@import`.
ويوضح خطأ التحقق من الصحة القاعدة غير الصالحة
على وجه التحديد،
مما يجعل إصلاح تلك القاعدة أكثر سهولة.

### التنسيق الضمني غير متوافق مع علامة AMP

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>IMPLIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The implied layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>تقديم سمة تنسيق صالحة للعلامة.</td>
  </tr>
</table>

يحدث هذا الخطأ عند عدم تحديد تنسيق لعلامة AMP،
وعندما لا يكون التنسيق الضمني متوافقًا (بناءً على العرض والارتفاع والأحجام).
راجع قيم `supported_layout` للعلامة
في [مواصفات أداة التحقق من صحة صفحات AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

يتم تحديد سلوك التنسيق الفعلي عن طريق السمة `layout`.
لمزيد من المعلومات حول طريقة عمل التنسيق،
راجع [كيفية التحكم في التنسيق](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) و
[مواصفات نظام تنسيق AMP HTML](../../../../documentation/components/reference/amp-layout.md).

**ملاحظة:** إذا لم تحدد التنسيق،
ولم تضمّن القيمتين `width` و`height`،
فسيتم تعيين التنسيق بشكل افتراضي إلى CONTAINER.
وتعرض أداة التحقق من الصحة خطأ
حيث لا يكون CONTAINER متوافقًا في أي علامة من علامات AMP.
حدّد تنسيقًا بخلاف CONTAINER،
أو أضف قيمة `width` و/أو `height` وسيختفي الخطأ.

### السمة غير مسموح بها من تنسيق ضمني

<table>
  <tr>
    <td class="col-thirty"><strong>الشفرة</strong></td>
    <td>ATTR_DISALLOWED_BY_IMPLIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>التنسيق</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>الإصلاح</strong></td>
    <td>إزالة السمة الغير مسموح بها من العلامة،
      أو تحديد تنسيق آخر يسمح بها.</td>
  </tr>
</table>

يحدث هذا الخطأ عند عدم تحديد تنسيق لعلامة AMP،
واحتواء التنسيق الضمني على سمة غير مسموح بها.
يتم وصف السمات الغير مسموح بها لأنواع التنسيق في
[مواصفات نظام تنسيق AMP HTML](../../../../documentation/components/reference/amp-layout.md).

### التنسيق المحدد غير متوافق مع علامة AMP

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>SPECIFIED_LAYOUT_INVALID</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The specified layout '%1' is not supported by tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>تحديد تنسيق متوافق مع العلامة.</td>
  </tr>
</table>

يحدث هذا الخطأ عندما لا يكون التنسيق المحدد
للعلامة متوافقًا.
راجع قيم `supported_layout` للعلامة
في [مواصفات أداة التحقق من صحة صفحات AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).

يتم تحديد سلوك التنسيق الفعلي عن طريق السمة `layout`.
لمزيد من المعلومات حول طريقة عمل التنسيق،
راجع [كيفية التحكم في التنسيق](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) و
[مواصفات نظام تنسيق AMP HTML](../../../../documentation/components/reference/amp-layout.md).

### السمة غير مسموح بها من تنسيق محدد

<table>
  <tr>
    <td class="col-thirty"><strong>الشفرة</strong></td>
    <td>ATTR_DISALLOWED_BY_SPECIFIED_LAYOUT</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>التنسيق</strong></td>
    <td>"The attribute '%1' in tag '%2' is disallowed by implied layout '%3'."</td>
  </tr>
   <tr>
    <td class="col-thirty"><strong>الإصلاح</strong></td>
    <td>إزالة السمة الغير مسموح بها من العلامة،
      أو تحديد تنسيق آخر يسمح بها.</td>
  </tr>
</table>

يحدث هذا الخطأ عند تحديد تنسيق لعلامة AMP،
واحتواء التنسيق على سمة غير مسموح بها.
يتم وصف السمات الغير مسموح بها لأنواع التنسيق في
[مواصفات نظام تنسيق AMP HTML](../../../../documentation/components/reference/amp-layout.md).

### قيمة غير صالحة للسمة التي يتطلبها التنسيق

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>ATTR_VALUE_REQUIRED_BY_LAYOUT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"Invalid value '%1' for attribute '%2' in tag '%3' - for layout '%4', set the attribute '%2' to value '%5'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>تعيين السمة إلى القيمة المحددة.</td>
  </tr>
</table>

يحدث هذا الخطأ عندما تكون قيمة السمة غير صالحة للتنسيق المحدد.
لاستيعاب سبب ظهور هذا الخطأ،
ينبغي التعرّف على
[السلوكيات المختلفة للتنسيقات](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md).

لنفرض أنك عيّنت التنسيق ليكون `fixed-height` و
وضمّنت القيم الرقمية لكل من `height` و`width`.
سيتخذ التنسيق `fixed-height` قيمة `height`.
ويجب ألا تكون السمة `width` موجودة أو معيّنة إلى `auto`.
ستعرض أداة التحقق من الصحة الخطأ ATTR_VALUE_REQUIRED_BY_LAYOUT.

### وحدات غير متناسقة للعرض والارتفاع

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>INCONSISTENT_UNITS_FOR_WIDTH_AND_HEIGHT</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"Inconsistent units for width and height in tag '%1' - width is specified in '%2' whereas height is specified in '%3'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>تقديم قيم عرض وارتفاع متناسقة للوحدات.</td>
  </tr>
</table>

باستثناء `layout=fixed`،
ينبغي التعبير عن سمات العرض والارتفاع في نفس الوحدات.
وإذا لم تكن كذلك، يتم تشغيل هذا الخطأ.

على سبيل المثال، ينتج عن `<amp-img src="" layout="responsive" width="42px" height="42rem">`
رسالة الخطأ هذه:

"وحدات غير متناسقة للعرض والارتفاع في العلامة '[`amp-img`](../../../../documentation/components/reference/amp-img.md)  - العرض محدد في 'px' بينما الارتفاع محدد في 'rem'."

## أخطاء النماذج

لا يمكن أن تشمل صفحات AMP بنية نماذج،
ما لم تكن البنية في نطاق علامة AMP المصممة
خصيصًا لتضمين النماذج، مثل،
[`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md).

يمكن تضمين النماذج في ملفات المصدر،
طالما أن الناتج الناشئ عن هذه الملفات لا يحتوي على النماذج
(راجع أيضًا
[استخدام معالجات CSS التمهيدية](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md)).

### تحتوي السمة على بنية نموذج

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>TEMPLATE_IN_ATTR_NAME</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"Mustache template syntax in attribute name '%1' in tag '%2'."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إزالة بنية نموذج Mustache من السمة.</td>
  </tr>
</table>

يحدث هذا الخطأ كلما عثرت أداة التحقق من الصحة على
[بنية نموذج Mustache](https://mustache.github.io/mustache.5.html)
في إحدى قيم السمة.

### تحتوي السمة على بنية نموذج لم يتم تجاوزها

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>UNESCAPED_TEMPLATE_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to '%3', which contains unescaped Mustache template syntax."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>تجاوز نموذج mustache.</td>
  </tr>
</table>

يحدث هذا الخطأ كلما عثرت أداة التحقق من الصحة على
[بنية نموذج Mustache لم يتم تجاوزها](https://mustache.github.io/mustache.5.html)
في إحدى قيم السمة.

### تحتوي السمة على نموذج جزئي

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>TEMPLATE_PARTIAL_IN_ATTR_VALUE</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The attribute '%1' in tag '%2' is set to '%3', which contains a Mustache template partial."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إزالة نموذج mustache الجزئي.</td>
  </tr>
</table>

يحدث هذا الخطأ كلما عثرت أداة التحقق من الصحة على
[نموذج Mustache جزئي](https://mustache.github.io/mustache.5.html)
في إحدى قيم السمة.

## أخطاء الإيقاف

### العلامة موقوفة

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>DEPRECATED_TAG</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>No error message defined as yet (no deprecated tags).</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إزالة العلامة الموقوفة.</td>
  </tr>
</table>

يحدث هذا التحذير عند العثور على علامة AMP صالحة مسبقًا في مستند AMP.
وهو مجرد تحذير فحسب؛ فمستندات AMP ذات التحذيرات تظل صالحة.
ولا توجد حاليًا علامات موقوفة؛ فهذا التحذير محفوظ لعمليات الإيقاف المستقبلية.

### السمة موقوفة

<table>
  <tr>
  	<td class="col-thirty"><strong>الشفرة</strong></td>
  	<td>DEPRECATED_ATTR</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>التنسيق</strong></td>
  	<td>"The attribute '%1' in tag '%2' is deprecated - use '%3' instead."</td>
  </tr>
   <tr>
  	<td class="col-thirty"><strong>الإصلاح</strong></td>
  	<td>إزالة السمة الموقوفة، كإحدى الممارسات الجيدة.</td>
  </tr>
</table>

يحدث هذا التحذير عند العثور على مستند AMP صالحة مسبقًا في مستند AMP.
وهو مجرد تحذير فحسب؛ فمستندات AMP ذات التحذيرات تظل صالحة.

حدّد السمات الموقوفة لكل علامة من علامات AMP
من  خلال البحث عن `deprecation` في
[مواصفات أداة التحقق من صحة صفحات AMP](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii).