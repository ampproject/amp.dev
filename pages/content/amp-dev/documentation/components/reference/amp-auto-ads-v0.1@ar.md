---
$title: amp-auto-ads
$category@: ads-analytics
formats:
  - websites
teaser:
  text: >-
    Dynamically injects ads into an AMP page by using a remotely-served
    configuration file.
---


<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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



يعمل هذا المكّوِن ديناميكيًا على إدخال الإعلانات في صفحة AMP باستخدام ملف تهيئة يتم عرضه عن بُعد.

<table>
  <tr>
    <td class="col-fourty"><strong>مدى التوفر</strong></td>
    <td>تجريبي</td>
  </tr>
  <tr>
    <td width="40%"><strong>النص البرمجي المطلوب</strong></td>
    <td>
      <code>
        &lt;script async custom-element="amp-auto-ads"
        src="https://ampjs.org/v0/amp-auto-ads-0.1.js"&gt;&lt;/script&gt;
      </code>
  </td>
  </tr>
  <tr>
    <td class="col-fourty">
    <strong>
      <a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">
      التنسيقات المعتمدة
      </a>
    </strong>
    </td>
    <td>غير متاح</td>
  </tr>
</table>

[جدول المحتويات]

## السلوك

يحاول المكوِّن `amp-auto-ads` إدراج إعلانات إضافية مع الالتزام بمجموعة من القيود التي تحددها شبكة الإعلانات، وذلك مع أخذ عدد المواضع الصالحة (المتوفرة في التهيئة) بالحسبان. تعمل هذه القيود على ما يلي:

* وضع حد لإجمالي عدد الإعلانات التي يمكن إدراجها
* وضع الحد الأدنى للمسافة الواجبة بين أي إعلانات متجاورة

بالإضافة إلى ذلك، لا يتم إدراج الإعلانات في الصفحة إلا في الأماكن التي لا تؤدي إلى إعادة تدفق غير مقبولة (كما هو محدد في tryChangeSize).

يجب وضع العلامة `<amp-auto-ads>` كأول عنصر ثانوي في `<body>`.

يجب تحديد نوع شبكة الإعلانات وأي معلومات إضافية (تطلبها شبكة الإعلانات) في العلامة.
```html
<amp-auto-ads
    type="adsense"
    data-ad-client="ca-pub-5439573510495356">
</amp-auto-ads>
```

## شبكات الإعلانات المتوافقة <a name="supported-ad-networks"></a>

* [AdSense](https://github.com/ampproject/amphtml/blob/main/ads/google/adsense.md)
* [DoubleClick (تجريبية)](https://github.com/ampproject/amphtml/blob/main/ads/google/doubleclick.md)

## السمات

<table>
  <tr>
    <td width="40%"><strong>type (مطلوبة)</strong></td>
    <td>تمثل هذه السمة معرّف شبكة الإعلانات.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-foo-bar</strong></td>
    <td>تتطلب معظم شبكات الإعلانات تهيئة إضافية، والتي يمكن تمريرها إلى الشبكة باستخدام سمات <code>data-</code> باللغة HTML. تخضع أسماء المعلَمات إلى تحويل الشرطات إلى الحالة camelCase الخاصة بسمات البيانات القياسية. يتم مثلاً إرسال "data-foo-bar" إلى الإعلان لتهيئته ليكون "fooBar". يمكنك مراجعة وثائق <a href="#supported-ad-networks">شبكة الإعلانات</a> لمعرفة السمات التي يمكن استخدامها.</td>
  </tr>
  <tr>
    <td width="40%"><strong>السمات المشتركة</strong></td>
    <td>يتضمن هذا العنصر <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">السمات المشتركة</a> التي تشمل مكونات AMP.</td>
  </tr>
</table>

## مواصفات التهيئة

تحدد التهيئة المكان الذي يمكن للمكّوِن `<amp-auto-ads>` وضع الإعلانات فيه على الصفحة. ويتم جلب التهيئة من شبكة إعلانات خارجية على عنوان URL المحدد في `ad-network-config.js`. يجب أن تكون التهيئة كائن JSON متسلسل يطابق تعريف [`ConfigObj`](#configobj) الموضح أدناه.

### مثال على التهيئة

يحدد المثال التالي وجوب وضع الإعلان مباشرة بعد جميع عناصر `<P class='paragraph'>` الواقعة في الخاصية `<DIV id='domId'>` الثالثة من الصفحة. يجب أن يكون الإعلان الذي يتم وضعه في أي من هذه المواضع من النوع BANNER وأن يكون له هامش علوي قدره 4 بكسل وهامش سفلي قدره 10 بكسل.

```json
{
  "placements": [
    {
      "anchor": {
        "selector": "DIV#domId",
        "index": 2,
        "sub": {
          "selector": "P.paragraph",
          "all": true,
        },
      },
      "pos": 4,
      "type": 1,
      "style": {
        "top_m": 5,
        "bot_m": 10,
      },
    },
  ]
}
```

### تعريف الكائنات

#### ConfigObj <a name="configobj"></a>

الحقول المراد تحديدها في كائن التهيئة:

<table>
  <tr>
    <th class="col-thirty">اسم الحقل</th>
    <th class="col-thirty">النوع</th>
    <th class="col-fourty">الوصف</th>
  </tr>
  <tr>
    <td><code>placements</code></td>
    <td>Array&lt;!PlacementObj&gt;</td>
    <td>حقل <strong>مطلوب</strong> يبين الأماكن المحتملة التي يمكن إدراج الإعلانات فيها على الصفحة.</td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>Object&lt;string, string&gt;</td>
    <td>حقل <em>اختياري</em> يحدد تعيينًا من اسم الخاصية لقيمها لتطبيقه على كل العناصر <code>&lt;amp-ad&gt;</code> التي تم إدراجها باستخدام هذه التهيئة. يُسمح فقط بأسماء السمات التالية:
      <ul>
        <li>type</li>
        <li>layout</li>
        <li>data-* (أي سمة بيانات)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>adConstraints</code></td>
    <td>AdConstraintsObj</td>
    <td>
    حقل <em>اختياري</em> يحدد القيود الواجب استخدامها عند وضع الإعلانات على الصفحة. إذا لم يتم تحديد الحقل، سيحاول <code>amp-auto-ads</code> استخدام القيود التلقائية المحددة في [ad-network-config.js](0.1/ad-network-config.js).
    </td>
  </tr>
</table>

#### PlacementObj

الحقول المراد تحديدها في كائن التهيئة `placements`:

<table>
  <tr>
    <th class="col-thirty">اسم الحقل</th>
    <th class="col-thirty">النوع</th>
    <th class="col-fourty">الوصف</th>
  </tr>
  <tr>
    <td><code>anchor</code></td>
    <td><a href="#anchorobj">AnchorObj</a></td>
    <td>حقل <strong>مطلوب</strong> يوفر المعلومات المستخدَمة للبحث عن العناصر المرتبط بها موضع الإعلان في الصفحة.
    </td>
  </tr>
  <tr>
    <td><code>pos</code></td>
    <td><a href="#relativepositionenum">RelativePositionEnum</a></td>
    <td>حقل <strong>مطلوب</strong> يبين موضع الإعلان نسبة إلى عنصر الارتساء.</td>
  </tr>
  <tr>
    <td><code>type</code></td>
    <td><a href="#placementtypeenum">PlacementTypeEnum</a></td>
    <td>حقل <strong>مطلوب</strong> يشير إلى نوع موضع الإعلان.</td>
  </tr>
  <tr>
    <td><code>style</code></td>
    <td><a href="#placementstyleobj">PlacementStyleObj</a></td>
    <td>حقل <em>اختياري</em> يشير إلى التصميم الواجب تطبيقه على الإعلان المدرج في هذا الموضع.
    </td>
  </tr>
  <tr>
    <td><code>attributes</code></td>
    <td>Object&lt;string, string&gt;</td>
    <td>حقل <em>اختياري</em> يحدد تعيينًا من اسم الخاصية لقيمها لتطبيقه على جميع عناصر <code>&lt;amp-ad&gt;</code> المدرجة باستخدام هذا الموضع. تلغي السمة المحددة هنا أي سمة تحمل الاسم نفسه ومحددة أيضًا على العنصر الرئيسي <code>ConfigObj</code>. يُسمح فقط بأسماء السمات التالية:
      <ul>
        <li>type</li>
        <li>layout</li>
        <li>data-* (أي سمة بيانات)</li>
      </ul>
    </td>
  </tr>
</table>

#### AnchorObj <a name="anchorobj"></a>

الحقول المراد تحديدها في كائن التهيئة `anchor`:

<table>
  <tr>
    <th class="col-thirty">اسم الحقل</th>
    <th class="col-thirty">النوع</th>
    <th class="col-fourty">الوصف</th>
  </tr>
  <tr>
    <td><code>selector</code></td>
    <td>string</td>
    <td>حقل <strong>مطلوب</strong> يبين محدِد CSS لاختيار العناصر في هذا المستوى من تعريف الارتساء.
    </td>
  </tr>
  <tr>
    <td><code>index</code></td>
    <td>number</td>
    <td>حقل <em>اختياري</em> يحدد فهرس العناصر المختارة من قِبل المحدِد الذي يجب أن يقتصر عليها هذا المستوى من تعريف الارتساء. تلقائيًا، يتم تعيين القيمة على 0 (إذا كان الحقل <code>all</code> false).</td>
  </tr>
  <tr>
    <td><code>all</code></td>
    <td>boolean</td>
    <td>يتم تجاهله في حال تحديد الحقل <code>index</code>. إذا عيّنته على <code>true</code>، يشير إلى وجوب تضمين جميع العناصر المُختَارة من قبِل المحدِد، وإلا فعينّه على <code>false</code>.
    </td>
  </tr>
  <tr>
    <td><code>min_c</code></td>
    <td>number</td>
    <td>حقل <em>اختياري</em> يبين الحد الأدنى لطول الخاصية textContent لعنصر ليتم تضمينه. القيمة التلقائية هي 0.</td>
  </tr>
  <tr>
    <td><code>sub</code></td>
    <td>AnchorObj</td>
    <td>حقل <em>اختياري</em> يحدد <code>AnchorObj</code> متكرر والذي سيختار عناصر داخل أي عناصر محددة في هذا المستوى من تعريف الارتساء.
    </td>
  </tr>
</table>


#### PlacementStyleObj <a name="placementstyleobj"></a>

الحقول المراد تحديدها في كائن التهيئة `style`:

<table>
  <tr>
    <th class="col-twenty">اسم الحقل</th>
    <th class="col-twenty">النوع</th>
    <th class="col-fourty">الوصف</th>
  </tr>
  <tr>
    <td><code>top_m</code></td>
    <td>number</td>
    <td>حقل <em>اختياري</em> يبين الهامش العلوي بالبكسل الذي يجب أن يحتوي عليه الإعلان المُدرَج في هذا الموضع. القيمة التلقائية: 0.
    </td>
  </tr>
  <tr>
    <td><code>bot_m</code></td>
    <td>number</td>
    <td>حقل <em>اختياري</em> يبين الهامش السفلي الذي يجب أن يحتوي عليه الإعلان المُدرَج في هذا الموضع. القيمة التلقائية: 0.
    </td>
  </tr>
</table>


#### RelativePositionEnum <a name="relativepositionenum"></a>

قيم ENUM للحقل `pos` في كائن التهيئة `placements`:

<table>
  <tr>
    <th class="col-fourty">الاسم</th>
    <th class="col-twenty">القيمة</th>
    <th class="col-fourty">الوصف</th>
  </tr>
  <tr>
    <td>BEFORE</td>
    <td>1</td>
    <td>إعلان يجب إدراجه كعنصر تابع قبل الارتساء مباشرة.</td>
  </tr>
  <tr>
    <td>FIRST_CHILD</td>
    <td>2</td>
    <td>إعلان يجب إدراجه كعنصر ثانوي أول للارتساء.</td>
  </tr>
  <tr>
    <td>LAST_CHILD</td>
    <td>3</td>
    <td>إعلان يجب إدراجه كعنصر ثانوي أخير للارتساء.</td>
  </tr>
  <tr>
    <td>AFTER</td>
    <td>4</td>
    <td>إعلان يجب إدراجه كعنصر تابع بعد الارتساء مباشرة.</td>
  </tr>
</table>


#### PlacementTypeEnum <a name="placementtypeenum"></a>

قيم ENUM للحقل `type` في كائن التهيئة `placements`:

<table>
  <tr>
    <th class="col-fourty">الاسم</th>
    <th class="col-twenty">القيمة</th>
    <th class="col-fourty">الوصف</th>
  </tr>
  <tr>
    <td>BANNER</td>
    <td>1</td>
    <td>موضع يصف متوسط موضع الإعلان البانر.</td>
  </tr>
</table>


#### AdConstraintsObj

الحقول المراد تحديدها في كائن التهيئة `adConstraints`:

<table>
  <tr>
    <th class="col-twenty">اسم الحقل</th>
    <th class="col-twenty">النوع</th>
    <th class="col-fourty">الوصف</th>
  </tr>
  <tr>
    <td><code>initialMinSpacing</code></td>
    <td>string</td>
    <td>
    حقل <strong>مطلوب</strong> يبين الحد الأدنى للمسافة الواجبة بين الإعلان وأي إعلانات حالية على الصفحة (تم وضعها يدويًا أو وضعها amp-auto-ads قبلاً) في وقت الإدراج.
    يتم التعبير عن القيم كرقم مع بادئة الوحدة. على سبيل المثال، "10px" تعني 10 بكسل أو "0.5vp" تعني نصف ارتفاع إطار العرض. هذا ولا تصلح القيم السلبية. الوحدات المقبولة هي:
      <ul>
        <li>px - بكسل</li>
        <li>vp - مضاعف ارتفاع إطار العرض</li>
      </ul>
    تنطبق هذه القيمة فقط عندما يكون عدد الإعلانات الحالي في الصفحة أقل من أي مطابقة لـ <code>adCount</code> المحددة في الحقل subsequentMinSpacing.
    </td>
  </tr>
  <tr>
    <td><code>subsequentMinSpacing</code></td>
    <td>Array&lt;!SubsequentMinSpacingObj&gt;</td>
    <td>
    حقل <em>اختياري</em> يحدد المساحات الإعلانية الواجب تطبيقها بناءً على عدد الإعلانات الحالي في الصفحة وقت الإدراج.
    </td>
  </tr>
  <tr>
    <td><code>maxAdCount</code></td>
    <td>number</td>
    <td>
    حقل <strong>مطلوب</strong> يبين الحد الأقصى لعدد الإعلانات التي يمكن أن يدرجها <code>amp-auto-ads</code> في الصفحة. يتم احتساب كل من الإعلانات الموضوعة يدويًا والمدرجة بالمكّوِن <code>amp-auto-ads</code> من هذا الإجمالي.
    إذا تم مثلاً تعيين هذا الحقل على 5 وكان هناك 3 إعلانات موضوعة يدويًا في الصفحة، سيضع <code>amp-auto-ads</code> إعلانين إضافيين بحد أقصى.
    </td>
  </tr>
</table>

#### SubsequentMinSpacingObj

الحقول المراد تحديدها في كائن التهيئة `subsequentMinSpacing`. يمكن استخدام إدخالات `subsequentMinSpacing` لتغيير المساحات المطلوبة بين الإعلانات الإضافية بناء على عدد الإعلانات الحالي في الصفحة. فكِّر في السيناريو التالي كمثال:

* إعلانان حاليان في الصفحة
* حقل subsequentMinSpacing هو:
```
[
  {adCount: 3, spacing: "500px"},
  {adCount: 5, spacing: "1000px"},
]
```

في البداية، يوجد إعلانان حاليان في الصفحة، لذلك لا مطابقة للتعيين.
يأخذ الحد الأدنى للمساحة القيمة التلقائية لـ initialMinSpacing في الكائن `AdConstraints`.
سيحاول `amp-auto-ads` بشكل متكرر وضع الإعلانات إلى أن تنفد المواضع التي يمكن استخدامها بدون تخطي `adContraints`.
بعد أن وضع `amp-auto-ads` أول إعلان له، أصبح هناك الآن 3 إعلانات على الصفحة، وبما أن هناك تعيين لثلاثة (أو أكثر) من الإعلانات في `subsequentMinSpacing`، يصبح الحد الأدنى للمساحة الآن 500 بكسل.
ينطبق هذا الأمر إلى أن يصبح هناك 5 إعلانات على الصفحة، بسبب قاعدة الإعلانات الخمسة. يتطلب عندئذٍ إدراج الإعلان السادس مساحة فارغة من الإعلانات قدرها 1000 بكسل على الأقل.

<table>
  <tr>
    <th class="col-twenty">اسم الحقل</th>
    <th class="col-twenty">النوع</th>
    <th class="col-fourty">الوصف</th>
  </tr>
  <tr>
    <td><code>adCount</code></td>
    <td>number</td>
    <td>
      حقل <strong>مطلوب</strong>.
      وهو الحد الأدنى لعدد الإعلانات الحالية على الصفحة والتي تتسبب في تطبيق هذه القاعدة (بفرض عدم توفر قاعدة أخرى بتطابق أفضل). انظر الوصف أعلاه للحصول على شرح أكثر تفصيلاً.
    </td>
  </tr>
  <tr>
    <td><code>spacing</code></td>
    <td>string</td>
    <td>
      حقل <strong>مطلوب</strong> يبين الحد الأدنى للمساحة الإعلانية الذي ينطبق عند مطابقة هذه القاعدة استنادًا إلى <code>adCount</code>.
      يتم التعبير عن القيم كرقم مع بادئة الوحدة. على سبيل المثال، "10px" تعني 10 بكسل أو "0.5vp" تعني نصف ارتفاع إطار العرض. هذا ولا تصلح القيم السلبية. الوحدات المقبولة هي:
      <ul>
        <li>px - بكسل</li>
        <li>vp - مضاعف ارتفاع إطار العرض</li>
      </ul>
    </td>
  </tr>
</table>

## التحقق

اطِّلع على [قواعد amp-auto-ads](https://github.com/ampproject/amphtml/blob/main/extensions/amp-auto-ads/validator-amp-auto-ads.protoascii) في مواصفات مدقق AMP.
