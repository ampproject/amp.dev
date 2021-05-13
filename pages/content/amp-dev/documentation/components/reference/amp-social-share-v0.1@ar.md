---
$title: amp-social-share
$category@: ads-analytics
formats:
  - websites
teaser:
  text: The share tracking feature is under development.
---



<!--
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



يعرض هذا المكّوِن زر المشاركة على الشبكات الاجتماعية.

[جدول المحتويات]

<table>
  <tr>
    <td class="col-fourty"><strong>النص البرمجي المطلوب</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-element="amp-social-share" src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"&gt;&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">التنسيقات المعتمدة</a></strong></td>
    <td>container وfill وfixed وfixed-height وflex-item وnodisplay وresponsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>أمثلة</strong></td>
    <td>اطِّلع على <a href="https://ampbyexample.com/components/amp-social-share/">مثال amp-social-share</a> في الموقع "AMP بالمثال".</td>
  </tr>
</table>

## نظرة عامة <a name="overview"></a>

يعرض المكّوِن `amp-social-share` زر المشاركة على العديد من موفري منصات الشبكات الاجتماعية.

## أمثلة <a name="examples"></a>

**مثال: زر المشاركة الأساسي على الشبكات الاجتماعية**

يخمّن زر المشاركة بعض الإعدادات التلقائية نيابة عنك لبعض موفري الخدمات الذين تمت تهيئتهم مسبقًا. ويفترض أن عنوان URL الأساسي للمستند الحالي هو عنوان URL الذي تريد مشاركته وأن عنوان الصفحة هو النص الذي تريد مشاركته.

```html
<amp-social-share type="twitter"></amp-social-share>
```

**مثال: تمرير المعلَمات**

عندما تريد تمرير المعلَمات إلى نقطة نهاية المشاركة، يمكنك تحديد `data-param-<attribute>` التي سيتم إلحاقها بهذه النقطة.
```html
<amp-social-share type="linkedin" width="60" height="44"
  data-param-text="Hello world"
  data-param-url="https://example.com/">
</amp-social-share>
```

Linkedin هو أحد موفري الخدمات الذين تمت تهيئتهم مسبقًا، لذلك لا تحتاج إلى توفير السمة `data-share-endpoint`.

## السمات <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type (مطلوبة)</strong></td>
    <td>تختار هذه السمة نوع موفر الخدمة. وهي مطلوبة لكل من الموفرين الذين تمت تهيئتهم مسبقًا وغيرهم.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-target</strong></td>
    <td>تحدد هذه السمة الهدف الذي سيتم فيه فتح الهدف. وتكون قيمتها التلقائية <code>&#95;blank</code> لجميع الحالات ماعدا البريد الإلكتروني/الرسائل القصيرة على iOS حيث يتم تعيين الهدف في هذه الحالة على <code>&#95;top</code>.
      يرجى ملاحظة أننا ننصح فقط باستخدام هذا الإلغاء للبريد الإلكتروني.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-share-endpoint</strong></td>
    <td>هذه السمة <strong>مطلوبة لموفري الخدمات الذين لم تتم تهيئتهم</strong>.
      <br>
      يملك بعض موفري الخدمات المشهورين نقاط نهاية المشاركة التي تمت تهيئتها مسبقًا. راجِع قسم <a href="#pre-configured-providers">موفرو الخدمات الذين تمت تهيئتهم مسبقًا</a> للحصول على التفاصيل. بالنسبة إلى الموفرين الذين لم تتم تهيئتهم، ستحتاج إلى تحديد نقطة نهاية المشاركة.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-param-*</strong></td>
    <td>يتم تحويل كل السمات المبدوءة بـ <code>data-param-*</code> إلى معلَمات عناوين URL وتمريرها إلى نقطة نهاية المشاركة.</td>
  </tr>
</table>

## موفرو الخدمات الذين تمت تهيئتهم مسبقًا <a name="pre-configured-providers"></a>

يوفر المكوِّن `amp-social-share` [بعض موفري الخدمات الذين تمت تهيئتهم مسبقًا](0.1/amp-social-share-config.js) الذين يعرفون نقاط نهاية المشاركة لديهم وكذلك بعض المعلَمات التلقائية.

<table>
  <tr>
    <th class="col-twenty">موفر الخدمة</th>
    <th class="col-twenty">النوع</th>
    <th>المعلَمات</th>
  </tr>
  <tr>
    <td><a href="https://developers.google.com/web/updates/2016/10/navigator-share">واجهة برمجة تطبيقات المشاركة على الويب</a> (يؤدّي إلى ظهور مربع حوار المشاركة على نظام التشغيل)</td>
    <td><code>system</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code>: معلَمة اختياريّة، ويتم تعيينها تلقائيًا على: "Current page title".</li>
        <li><code>data-mode</code>: معلَمة اختياريّة، وفي حال تعيينها على <code>replace</code>، تتم إزالة جميع خيارات المشاركة الأخرى.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>البريد الإلكتروني</td>
    <td><code>email</code></td>
    <td>
      <ul>
        <li><code>data-param-subject</code>: معلَمة اختياريّة، ويتم تعيينها تلقائيًا على: Current page title.</li>
        <li><code>data-param-body</code>: معلَمة اختياريّة، ويتم تعيينها تلقائيًا على: <code>rel=canonical</code> URL.</li>
        <li><code>data-param-recipient</code>: معلَمة اختياريّة، ويتم تعيينها تلقائيًا على: " (سلسلة فارغة).</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Facebook</td>
    <td><code>facebook</code></td>
    <td>
      <ul>
        <li><code>data-param-app_id</code>: معلَمة <strong>مطلوبة</strong>، ويتم تعيينها تلقائيًا على: none. هذه المعلَمة هي المعرِّف <code>app_id</code> للتطبيق Facebook وهو مطلوب لظهور <a href="https://developers.facebook.com/docs/sharing/reference/share-dialog">مربع حوار المشاركة على Facebook</a>.</li>
        <li><code>data-param-href</code>: معلَمة اختياريّة، ويتم تعيينها تلقائيًا على: <code>rel=canonical</code> URL.</li>
        <li><code>data-param-quote</code>: معلَمة اختياريّة. ويمكن استخدامها لمشاركة اقتباس أو نص.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LinkedIn</td>
    <td><code>linkedin</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: معلَمة اختياريّة، ويتم تعيينها تلقائيًا على: <code>rel=canonical</code> URL.</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>Pinterest</td>
    <td><code>pinterest</code></td>
    <td>
      <ul>
        <li><code>data-param-media</code>: معلَمة اختياريّة (ولكن ننصح بتعيينها بشدة)، ويتم تعيينها تلقائيًا على: none. وهي عنوان URL للوسائط المراد مشاركتها على Pinterest. في حال عدم تعيينها، سيطلب Pinterest من المستخدِم تحميل الوسائط.</li>
        <li><code>data-param-url</code>: معلَمة اختياريّة، ويتم تعيينها تلقائيًا على: <code>rel=canonical</code> URL.</li>
        <li><code>data-param-description</code>: معلَمة اختياريّة، ويتم تعيينها تلقائيًا على: Current page title.</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>G+‎</td>
    <td><code>gplus</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: معلَمة اختياريّة، ويتم تعيينها تلقائيًا على: <code>rel=canonical</code> URL.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Tumblr</td>
    <td><code>tumblr</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: معلَمة اختياريّة، ويتم تعيينها تلقائيًا على: <code>rel=canonical</code> URL.</li>
        <li><code>data-param-text</code>: معلَمة اختياريّة، ويتم تعيينها تلقائيًا على: Current page title.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Twitter</td>
    <td><code>twitter</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: معلَمة اختياريّة، ويتم تعيينها تلقائيًا على: <code>rel=canonical</code> URL.</li>
        <li><code>data-param-text</code>: معلَمة اختياريّة، ويتم تعيينها تلقائيًا على: Current page title.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Whatsapp</td>
    <td><code>whatsapp</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code>: معلَمة اختياريّة، ويتم تعيينها تلقائيًا على: "Current page title - current page URL".</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LINE</td>
    <td><code>line</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: معلَمة اختياريّة، ويتم تعيينها تلقائيًا على: <code>rel=canonical</code> URL.</li>
        <li><code>data-param-text</code>: معلَمة اختياريّة، ويتم تعيينها تلقائيًا على: Current page title.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>الرسائل القصيرة</td>
    <td><code>sms</code></td>
    <td>
      <ul>
        <li><code>data-param-body</code>: معلَمة اختياريّة، ويتم تعيينها تلقائيًا على: <code>rel=title - rel=canonical</code> URL.</li></ul>
    </td>
  </tr>
</table>

## موفرو الخدمات الذين لم تتم تهيئتهم <a name="non-configured-providers"></a>

بالإضافة إلى الموفرين الذين تمت تهيئتهم مسبقًا، يمكنك استخدام الموفرين الذين لم تتم تهيئتهم عن طريق تحديد سمات إضافية في المكّوِن `amp-social-share`.

**مثال: إنشاء زر المشاركة لموفر لم تتم تهيئته**

ينشئ المثال التالي زر المشاركة عبر Facebook Messenger عن طريق تعيين السمة `data-share-endpoint` على نقطة النهاية الصحيحة لبروتوكول Facebook Messenger المخصص.

```html
<amp-social-share type="facebookmessenger"
    data-share-endpoint="fb-messenger://share"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

ولأن هؤلاء الموفرين لم تتم تهيئتهم مسبقًا، فستحتاج إلى إنشاء صورة وتصميم للزر للموفر.

## التصميمات <a name="styles"></a>

### التصميمات التلقائية <a name="default-styles"></a>

يتضمن المكّوِن `amp-social-share` تلقائيًا بعض موفري الخدمات الذين تمت تهيئتهم مسبقًا. يتم تصميم أزرار لهؤلاء الموفرين باللون والشعار الرسمي للموفر. ويبلغ العرض التلقائي للتصميم 60 بكسل والارتفاع التلقائي 44 بكسل.

[tip type="success"]
انتقِل إلى الموقع [AMP Start](https://ampstart.com/components#links-and-sharing) للحصول على روابط مشاركة متجاوبة جاهزة التصميم والتي يمكنك استخدامها في صفحات AMP.
[/tip]

### التصميمات المخصَّصة <a name="custom-styles"></a>

تريد أحيانًا تقديم تصميمك الخاص. يمكنك ببساطة إلغاء التصميمات المتوفرة كما يلي:
```css
amp-social-share[type="twitter"] {
  background: red;
  background-image: url(datauri:svg/myownsvgicon);
}
```

## استبدال المتغيرات <a name="variable-substitution"></a>

يمكنك استخدام [الاستبدال الشامل لمتغيرات AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md) في العنصر `<amp-social-share>`. في المثال أدناه، تم استبدال `TITLE` بعنوان الصفحة واستبدال `CANONICAL_URL` بعنوان URL الأساسي للمستند.

```html
<amp-social-share type="whatsapp"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

## التحقق <a name="validation"></a>

اطِّلع على [قواعد amp-social-share](https://github.com/ampproject/amphtml/blob/main/extensions/amp-social-share/validator-amp-social-share.protoascii) في مواصفات مدقق AMP.
