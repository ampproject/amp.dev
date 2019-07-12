---
$category@: ads-analytics
formats:
  - websites
  - ads
  - stories
teaser:
  text: A tracking pixel to count page views.
---



<!---
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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

# <a name="amp-pixel"></a> `amp-pixel`

[جدول المحتويات]

<table>
  <tr>
    <td class="col-fourty"><strong>الوصف</strong></td>
    <td>مكوِّن يمكن استخدامه كبكسل تتبع نموذجي لحساب مرات مشاهدة الصفحة.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">التنسيقات المعتمدة</a></strong></td>
    <td>fixed وnodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>أمثلة</strong></td>
    <td>يمكن الاطّلاع على <a href="https://ampbyexample.com/components/amp-pixel/">مثال amp-pixel</a> في الموقع "AMP بالمثال".</td>
  </tr>
</table>

## السلوك

يتصرف مكوِّن `amp-pixel` كبكسل تتبع بسيط `img`. يأخذ عنوان URL واحدًا لكنه يوفر متغيرات يمكن استبدالها بالمكوِّن في سلسلة عنوان URL عند إرسال الطلب. راجع قسم [الاستبدالات](#substitutions) لمعرفة مزيد من التفاصيل.

في هذا المثال الأساسي، يصدر `amp-pixel` طلب GET بسيطًا إلى عنوان URL المحدد ويتجاهل النتيجة.

```html
<amp-pixel src="https://foo.com/tracker/foo"
    layout="nodisplay"></amp-pixel>
```

[tip type="note"]
عند معالجة عناوين AMP URL في الرأس المُحيل لطلبات التحليلات، أزِل المعلَمة `usqp` أو تجاهلها. يستخدم Google هذه المعلَمة لتشغيل تجارب "لذاكرة التخزين المؤقت لصفحات AMP من Google".
[/tip]

## السمات

##### src (مطلوبة)

هي عنوان URL بسيط لنقطة نهاية بعيدة والتي يجب أن تتبع البروتوكول `https`.

##### referrerpolicy (اختياريّة)

تشبه هذه السمة سمة `referrerpolicy` على `<img>` إلا أن `no-referrer` هي القيمة الوحيدة المقبولة. في حال تحديد `referrerpolicy=no-referrer`، تتم إزالة الرأس `referrer` من الطلب HTTP.

```html
<amp-pixel src="https://foo.com/tracker/foo"
    layout="nodisplay"
    referrerpolicy="no-referrer"></amp-pixel>
```

##### allow-ssr-img (اختياريّة)

تشير هذه السمة المستخدَمة في تصميمات إعلانات AMP4ADS إلى أنه في إطار التحويل ما بعد مرحلة التحقق، يمكن وضع عنصر img مباشرة داخل العنصر amp-pixel، ما يسمح بإرسال فحص الاتصال بالتوازي مع جلب/تنفيذ وقت تشغيل AMP.
وهو ما يعني عدم توسيع أي وحدات ماكرو داخل عنوان URL لذا استخدَم السمة فقط إذا لم تكن متوفرة في src.

##### السمات المشتركة

يتضمن هذا العنصر [السمات المشتركة](https://www.ampproject.org/docs/reference/common_attributes) التي تشمل مكونات AMP.

## الاستبدالات

يسمح `amp-pixel` بجميع استبدالات متغيرات عناوين URL القياسية.
اطّلِع على [دليل الاستبدالات](../spec/amp-var-substitutions.md) للحصول على المزيد من المعلومات.

في المثال التالي، قد يتم إرسال طلب لصفحة مثل `https://foo.com/pixel?0.8390278471201` حيث يتم إنشاء قيمة RANDOM بشكل عشوائي عند كل ظهور.

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"
    layout="nodisplay"></amp-pixel>
```

## التصميم

يجب ألا يكون للمكوِّن `amp-pixel` تصميم.

## التحقق

اطِّلع على [قواعد amp-pixel](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) في مواصفات مدقق AMP.
