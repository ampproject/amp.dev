---
'$title': AMP لمواصفات الإعلانات
$order: 3
formats:
  - ads
teaser:
  text: "\n_إذا كنت ترغب في اقتراح إجراء تغييرات على المقياس، فيرجى التعليق على "
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/amp-a4a-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

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

_إذا كنت ترغب في اقتراح إجراء تغييرات على المقياس، فيرجى التعليق على [اعتزام التنفيذ](https://github.com/ampproject/amphtml/issues/4264)_.

إن إعلانات AMPHTML عبارة عن آلية لعرض الإعلانات بسرعة وآداء عالٍ في صفحات AMP. ولضمان إمكانية عرض مستندات إعلان AMPHTML ("تصميمات AMP") على نحو سريع وسلسل في المتصفح ولا تعيق تجربة المستخدم، يجب على تصميمات AMP الاستجابة لمجموعة من قواعد التحقق من الصحة. وعلى نحو مماثل لروح [قواعد تنسيق AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml)، تحتوي إعلانات AMPHTML على صلاحية وصول لمجموعة محدودة من العلامات والإمكانات والملحقات المسموح بها.

## قواعد التنسيق لإعلان AMPHTML <a name="amphtml-ad-format-rules"></a>

مل لم يحدد خلاف ذلك أدناه، يجب على التصميم الاستجابة لكل القواعد المنصوص عليها في [قواعد تنسيق AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml.html)، ومضمنة هنا كمرجع، على سبيل المثال إعلان AMPHTML [Boilerplate](#boilerplate) الخروج عن القوالب القياسية لـ AMP.

بالإضافة إلى ذلك، يجب على التصميمات الاستجابة للقواعد التالية:

<table>
<thead><tr>
  <th>القاعدة</th>
  <th>السبب</th>
</tr></thead>
<tbody>
<tr>
<td>يجب استخدام نوع <code>&lt;html ⚡4ads></code> أو <code>&lt;html amp4ads></code>
</td>
<td>السماح لمسؤلي التحقق من الصحة بتحديد مستند تصميم الإعلان إما كمستند AMP عام أو مستند مخصص لـ AMPHTML مقيد وكذا إرساله على نحو مناسب.</td>
</tr>
<tr>
<td>يجب تضمين <code>&lt;script async src="https://cdn.ampproject.org/amp4ads-v0.js">&lt;/script></code> كنص برمجي لوقت التشغيل بدلًا عن <code>https://cdn.ampproject.org/v0.js</code>.</td>
<td>السماح بسلوكيات وقت تشغيل مخصصة لإعلانات AMPHTML التي يتم عرضها في iframe مشتركة الأصل.</td>
</tr>
<tr>
<td>يجب تضمين العلامة <code>&lt;link rel="canonical"></code>.</td>
<td>لا تحتوب تصميمات الإعلانات على "إصدار نموذجي بغير AMP" ولن يتم فهرستها بشكل مستقل في البحث، لذا فإن الإحالة الذاتية لن تكون مجدية.</td>
</tr>
<tr>
<td>يمكن تضمين علامات تعريف اختيارية في رأس HTML كمعرِّفات، وذلك بتنسيق <code>&lt;meta name="amp4ads-id" content="vendor=${vendor},type=${type},id=${id}"></code>. ويجب أن تكون علامات التعريف تلك موضوعة قبل النص البرمجي <code>amp4ads-v0.js</code>. إذ إن قيمة <code>vendor</code> و<code>id</code> عبارة عن سلاسل تحتوي على [0-9a-zA-Z_-] فقط. وقيمة <code>type</code> is إما <code>creative-id</code> أو <code>impression-id</code>.</td>
<td>يمكن استخدام هذه المعرَِفات المخصصة لتحديد الانطباع أو الإبداع. ويمكن أن تكون مفيدة في إعداد التقارير وتصحيح الأخطاء.على سبيل المثال:<br><pre>
&lt;meta name="amp4ads-id"
  content="vendor=adsense,type=creative-id,id=1283474">
&lt;meta name="amp4ads-id"
  content="vendor=adsense,type=impression-id,id=xIsjdf921S"></pre>
</td>
</tr>
<tr>
<td>قد يستهدف تتبع إمكانية المعاينة لـ <code>&lt;amp-analytics></amp-analytics></code> محدد كامل الإعلانات فقط، وذلك عبر  <code>"visibilitySpec": { "selector": "amp-ad" }</code> على النحو المحدد في <a href="https://github.com/ampproject/amphtml/issues/4018">المشكلة#4018</a> و<a href="https://github.com/ampproject/amphtml/pull/4368">PR #4368</a>. على وجه الخصوص، لا يجوز له استهداف أي محددات للعناصر داخل تصميم الإعلان.</td>
<td>في بعض الحالات، قد تختار إعلانات AMPHTML عرض تصميم إعلاني باستخدام iframe. وفي تلك الحالات، يمكن لتحليلات الصفحة المضيفة أن تستهدف فقط iframe بأكمله على أي حال، ولن تتمكن من الوصول إلى أي محددات دقيقة . على سبيل المثال: <pre>
&lt;amp-analytics id="nestedAnalytics">
  &lt;script type="application/json">
  {
    "requests": {
      "visibility": "https://example.com/nestedAmpAnalytics"
    },
    "triggers": {
      "visibilitySpec": {
      "selector": "amp-ad",
      "visiblePercentageMin": 50,
      "continuousTimeMin": 1000
      }
    }
  }
  &lt;/script>
&lt;/amp-analytics>
</pre> <p> يرسل هذا التكوين طلبًا إلى عنوان URL <code>https://example.com/nestedAmpAnalytics</code> عندما يكون 50٪ من الإعلان المرفق مرئيًا بشكل مستمر على الشاشة لمدة ثانية واحدة.</p>
</td>
</tr>
</tbody>
</table>

### النص النموذجي<a name="boilerplate"></a>

تتطلب تصميمات إعلانات AMPHTML خط نمط نموذجيًا مختلفًا وأبسط كثيرًا مما تتطلبه [مستندات AMP العامة](https://github.com/ampproject/amphtml/blob/main/spec/amp-boilerplate.md):

[sourcecode:html]

<style amp4ads-boilerplate>
  body {
    visibility: hidden;
  }
</style>

[/sourcecode]

_السبب:_ يخفي نمط `amp-boilerplate` المحتوى الأساسي حتى يصبح وقت تشغيل AMP جاهزًا ويمكن إظهاره. ففي حالة تعطيل Javascript أو فشل تحميل وقت تشغيل AMP، يضمن النص النموذجي الافتراضي عرض المحتوى في نهاية المطاف بصرف النظر عن ذلك.في إعلانات AMPHTML، وعلى الرغم من ذلك، يتم تعطيل Javascript تمامًا، ولن تعمل إعلانات AMPHTML ولن يتم عرض أي إعلان، لذا لا حاجة لقسم`<noscript>`. وفي غياب وقت تشغيل AMP، لن تتوفر معظم الآليات التي تعتمد عليها إعلانات AMPHTML (على سبيل المثال، تحليلات تتبع الرؤية أو `amp-img` لعرض المحتوى)، لذا من الأفضل عدم عرض أي إعلان بدلًا عن عرض إعلان معطل.

في النهاية، يستخدم النص النموذجي لإعلان AMPHTML `amp-a4a-boilerplate` بدلًا عن `amp-boilerplate`حتى يتمكن مسؤولو التحقق من الصحة من التعرف عليه بسهولة وإنتاج رسائل خطأ أكثر دقة لمساعدة المطورين.

لاحظ أن القواعد نفسها المتعلقة بالطفرات في النص النموذجي مطبقة كما في النص[ النموذجي العام لـ AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-boilerplate.md).

### CSS <a name="css"></a>

<table>
<thead><tr>
  <th>القاعدة</th>
  <th>السبب</th>
</tr></thead>
<tbody>
  <tr>
    <td> <code>position:fixed</code> و<code>position:sticky</code> محظوران في CSS الإبداعي.</td>
    <td>يخرج  <code>position:fixed</code> من DOM الظل، حيثما تعتمد إعلانات AMPHTML عليها. ولا يسمح أيضًا للإعلانات في AMP باستخدام الموضع الثابت.</td>
  </tr>
  <tr>
    <td> <code>touch-action</code> محظور.</td>
    <td>إعلان يمكنه معالجة <code>touch-action</code> ويمكنه التداخل مع قدرة المستخدم على تمرير المستند المضيف.</td>
  </tr>
  <tr>
    <td>CSS الإبداعي محدود على 20000 بايت.</td>
    <td>تعمل كتل CSS الكبيرة على زيادة حجم التصميم وزيادة زمن انتقال الشبكة وتقليل أداء الصفحة.</td>
  </tr>
  <tr>
    <td>خضوع الانتقال والرسوم المتحركة إلى قيود إضافية.</td>
    <td>يجب أن تكون صفحات AMP قادرة على التحكم في جميع الرسوم المتحركة الخاصة بالإعلان، بحيث يمكن إيقافها عند عدم عرض الإعلان على الشاشة أو عندما تكون موارد النظام منخفضة جدًا.</td>
  </tr>
  <tr>
    <td>تُعد البادئات الخاصة بالمورد أسماء مستعارة للرمز نفسه بدون البادئة لأغراض التحقق من الصحة. وهذا يعني إذا كان الرمز <code>foo</code> محظورًا بموجب قواعد التحقق من الصحة من CSS، فإن الرمز <code>-vendor-foo</code> سيكون محظورًا أيضًا.</td>
    <td>توفر بعض الخصائص التي يسبقها المورد وظائف مكافئة للخصائص المحظورة أو المقيدة بموجب هذه القواعد.<br><br><p>على سبيل المثال: <code>-webkit-transition</code> و<code>-moz-transition</code> كلاهما عبارة عن أسمين مستعارين لـ <code>transition</code>.  وسيكون مسموح بهما فقط في سياقات حيثما يكون مسموح بـ <code>transition</code> المعطل (راجع قسم <a href="#selectors">المحددات</a> أدناه).</p>
</td>
  </tr>
</tbody>
</table>

#### رسوم CSS المتحركة وانتقالاتها <a name="css-animations-and-transitions"></a>

##### المحددات <a name="selectors"></a>

في النهاية، يستخدم النص النموذجي لإعلان AMPHTML `amp-a4a-boilerplate` بدلًا عن `amp-boilerplate` حتى يتمكن مسؤولو التحقق من الصحة من التعرف عليه بسهولة وإنتاج رسائل خطأ أكثر دقة لمساعدة المطورين.

- تحتوي على الخصائص `transition`، أو `animation`، أو `transform`, `visibility`، أو `opacity` فقط.

  _السبب:_ يسمح هذا الأمر لوقت تشغيل AMP بإزالة هذه الفئة من السياق لإلغاء تنشيط الرسوم المتحركة، وذلك عندما يكون ضروريًا لأداء الصفحة.

**جيد**

[sourcecode:css]
.box {
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

**سئ**

الخاصية غير مسموح بها في فئة CSS.

[sourcecode:css]
.box {
color: red; // non-animation property not allowed in animation selector
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

##### الخصائص القابلة للنقل والتحريك <a name="transitionable-and-animatable-properties"></a>

الخصائص الوحيدة التي يمكن نقلها هي معدل الشفافية والتحويل. ([السبب](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/))

**جيد**

[sourcecode:css]
transition: transform 2s;
[/sourcecode]

**سئ**

[sourcecode:css]
transition: background-color 2s;
[/sourcecode]

**جيد**

[sourcecode:css]
@keyframes turn {
from {
transform: rotate(180deg);
}

to {
transform: rotate(90deg);
}
}
[/sourcecode]

**سئ**

[sourcecode:css]
@keyframes slidein {
from {
margin-left: 100%;
width: 300%;
}

to {
margin-left: 0%;
width: 100%;
}
}
[/sourcecode]

### ملحقات AMP وعلاماتها المضمنة المسموح بها <a name="allowed-amp-extensions-and-builtins"></a>

فميا يلي وحدات AMP وعلامات AMP المدمجة _المسموح بها_ في تصميم إعلان AMPHTML. إذ إن الملحقات أو العلامات المضمنة غير المدرجة بشكل صريح محظورة.

- [amp-accordion](https://amp.dev/documentation/components/amp-accordion)
- [amp-ad-exit](https://amp.dev/documentation/components/amp-ad-exit)
- [amp-analytics](https://amp.dev/documentation/components/amp-analytics)
- [amp-anim](https://amp.dev/documentation/components/amp-anim)
- [amp-animation](https://amp.dev/documentation/components/amp-animation)
- [amp-audio](https://amp.dev/documentation/components/amp-audio)
- [amp-bind](https://amp.dev/documentation/components/amp-bind)
- [amp-carousel](https://amp.dev/documentation/components/amp-carousel)
- [amp-fit-text](https://amp.dev/documentation/components/amp-fit-text)
- [amp-font](https://amp.dev/documentation/components/amp-font)
- [amp-form](https://amp.dev/documentation/components/amp-form)
- [amp-img](https://amp.dev/documentation/components/amp-img)
- [amp-layout](https://amp.dev/documentation/components/amp-layout)
- [amp-lightbox](https://amp.dev/documentation/components/amp-lightbox)
- amp-mraid، على أساس تجريبي. إذا كنت تفكر في استخدامه، فيرجى فتح مشكلة في [wg-monetization](https://github.com/ampproject/wg-monetization/issues/new).
- [amp-mustache](https://amp.dev/documentation/components/amp-mustache)
- [amp-pixel](https://amp.dev/documentation/components/amp-pixel)
- [amp-position-observer](https://amp.dev/documentation/components/amp-position-observer)
- [amp-selector](https://amp.dev/documentation/components/amp-selector)
- [amp-social-share](https://amp.dev/documentation/components/amp-social-share)
- [amp-video](https://amp.dev/documentation/components/amp-video)

تكون معظم عمليات الحذف إما من أجل الأداء أو تسهيل تحليل إعلانات AMPHTML.

_مثال:_ `<amp-ad>` محذوف من القائمة. إذ إنه غير مسموح به صراحةً لأنه يسمح `<amp-ad>` داخل `<amp-ad>` من شأنه أن يؤدي إلى حدوث تطور شلالي غير محدودة لتحميل الإعلان، وهو ما لا يلبي أهداف أداء إعلانات AMPHTML.

_مثال:_ `<amp-iframe>` محذوف من القائمة. فهو غير مسموح به لأن الإعلانات يمكن أن تستخدمه لتنفيذ JavaScript عشوائي وتحميل محتوى غير محدد مسبقًا. ويجب أن تقوم الإعلانات التي ترغب في استخدام مثل هذه الإمكانيات `false` من إدخال [a4aRegistry](https://github.com/ampproject/amphtml/blob/main/ads/_a4a-config.js#L40) الخاص بها، واستخدم آلية عرض الإعلان "3p iframe" الحالية.

_مثال:_ `<amp-facebook>`، و`<amp-instagram>`، و`<amp-twitter>`، و`<amp-youtube>` محذوفة للسبب نفسه مثل `<amp-iframe>`: جميعها تنشئ iframes مضمنة ويمكن أن تستهلك موارد غير محدودة فيهم.

_مثال:_ `<amp-ad-network-*-impl>` محذوفة من القائمة. إذ إن العلامة `<amp-ad>` تتعامل مع التفويض إلى علامات التنفيذ هذه؛ حيث يجب ألا تحاول التصميمات تضمينها مباشرةً.

_مثال:_ لم يتم تضمين `<amp-lightbox>` إلى الأن لأنه حتى بعض تصميمات إعلانات AMPHTML قد يتم عرضها في iframes ولا توجد حاليًا آلية لتوسيع الإعلان خارج iframes. ويمكن إضافة الدعم لها في المستقبل، إذا كانت هناك رغبة واضحة في ذلك.

### علامات HTML <a name="html-tags"></a>

ما يلي عبارة عن علامات _allowed_ في تصميم إعلانات AMPHTML. وهي علامات مسموح بها صراحةً وغير محظورة. وهذه القائمة عبارة عن مجموعة فرعية من [السماح العامة لملحق علامة AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/../../spec/amp-tag-addendum.md) العامة. ويتم ترتيب مثل هذه القائمة وفقًا لمواصفات HTML5 في القسم 4 [عناصر HTML](http://www.w3.org/TR/html5/single-page.html#html-elements).

وتكون معظم عمليات الحذف إما من أجل لأداء أو لأن العلامات ليست معيار HTML5. على سبيل المثال: `<noscript>` محذوفة لأن إعلانات AMPHTML تعتمد على تمكين JavaScript، لذا لن يتم تنفيذ كتلة `<noscript>` أبدًا، وبالتالي ستؤدي إلى تضخيم النطاق الترددي والتكلفة ووقت الاستجابة لتصميم الإعلان فقط.. وعلى نحو مشابه، `<acronym>`، `<big>` وأخرى غيرهما محظورة لأنها غير متوافقة مع HTML5.

#### 4.1 العنصر الجذر<a name="41-the-root-element"></a>

4.1.1 `<html>`

- يجب استخدام نوع `<html ⚡4ads>` أو `<html amp4ads>`

#### 4.2 بيانات تعريف المستند <a name="42-document-metadata"></a>

4.2.1 `<head>`

4.2.2 `<title>`

4.2.4 `<link>`

- العلامات `<link rel=...>` غير مسموح بها، باستثناء `<link rel=stylesheet>`.

- **ملحوظة:** على العكس في AMP العامة، فإن علامات `<link rel="canonical">` محظورة.

  4.2.5 `<style>` 4.2.6 `<meta>`

#### 4.3 الأقسام<a name="43-sections"></a>

4.3.1 `<body>` 4.3.2 `<article>` 4.3.3 `<section>` 4.3.4 `<nav>` 4.3.5 `<aside>` 4.3.6 `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, and `<h6>` 4.3.7 `<header>` 4.3.8 `<footer>` 4.3.9 `<address>`

#### 4.4 المحتوى المجمَّع <a name="44-grouping-content"></a>

4.4.1 `<p>` 4.4.2 `<hr>` 4.4.3 `<pre>` 4.4.4 `<blockquote>` 4.4.5 `<ol>` 4.4.6 `<ul>` 4.4.7 `<li>` 4.4.8 `<dl>` 4.4.9 `<dt>` 4.4.10 `<dd>` 4.4.11 `<figure>` 4.4.12 `<figcaption>` 4.4.13 `<div>` 4.4.14 `<main>`

#### 4.5 دلالات على مستوى النص <a name="45-text-level-semantics"></a>

4.5.1 `<a>` 4.5.2 `<em>` 4.5.3 `<strong>` 4.5.4 `<small>` 4.5.5 `<s>` 4.5.6 `<cite>` 4.5.7 `<q>` 4.5.8 `<dfn>` 4.5.9 `<abbr>` 4.5.10 `<data>` 4.5.11 `<time>` 4.5.12 `<code>` 4.5.13 `<var>` 4.5.14 `<samp>` 4.5.15 `<kbd >` 4.5.16 `<sub>` and `<sup>` 4.5.17 `<i>` 4.5.18 `<b>` 4.5.19 `<u>` 4.5.20 `<mark>` 4.5.21 `<ruby>` 4.5.22 `<rb>` 4.5.23 `<rt>` 4.5.24 `<rtc>` 4.5.25 `<rp>` 4.5.26 `<bdi>` 4.5.27 `<bdo>` 4.5.28 `<span>` 4.5.29 `<br>` 4.5.30 `<wbr>`

#### 4.6 عمليات التحرير <a name="46-edits"></a>

4.6.1 `<ins>` 4.6.2 `<del>`

#### 4.7 المحتوى المضمن<a name="47-embedded-content"></a>

- يتم دعم المحتوى المضمن عبر علامات AMP فقط، مثل `<amp-img>` أو `<amp-video>`.

#### 4.7.4 `<source>` <a name="474-source"></a>

#### 4.7.18 SVG <a name="4718-svg"></a>

لا تقع علامات SVG في مساحة اسم HTML5. إذ تم إدراجها في أدناه من دون معرِّفات القسم.

` <svg>``<g>``<path>``<glyph>``<glyphref>``<marker>``<view>``<circle>``<line>``<polygon>``<polyline>``<rect>``<text>``<textpath>``<tref>``<tspan>``<clippath>``<filter>``<lineargradient>``<radialgradient>``<mask>``<pattern>``<vkern>``<hkern>``<defs>``<use>``<symbol>``<desc>``<svg> <g> <path> <glyph> <glyphref> <marker> <view> <circle> <line> <polygon> <polyline> <rect> <text> <textpath> <tref> <tspan> <clippath> <filter> <lineargradient> <radialgradient> <mask> <pattern> <vkern> <hkern> <defs> <use> <symbol> <desc> <title> `

#### 4.9 البيانات المجدولة <a name="49-tabular-data"></a>

4.9.1 `<table>` 4.9.2 `<caption>` 4.9.3 `<colgroup>` 4.9.4 `<col>` 4.9.5 `<tbody>` 4.9.6 `<thead>` 4.9.7 `<tfoot>` 4.9.8 `<tr>` 4.9.9 `<td>` 4.9.10 `<th>`

#### 4.10 النماذج<a name="410-forms"></a>

4.10.8 `<button>`

#### 4.11 البرمجة النصية<a name="411-scripting"></a>

- مثل مستند AMP عام، يجب أن تحتوي علامة `<head>` الخاصة بالتصميم على علامة `<script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>`.
- على عكس AMP العام، `<noscript>` محظور.
  - _السبب:_ نظرًا لأن إعلانات AMPHTML تتطلب تمكين عمل Javascript مطلقًا، فإن كتل `<noscript>` لا تخدم أي غرض في إعلانات AMPHTML ولا تكلف سوى النطاق الترددي للشبكة.
- على عكس AMP العام، `<script type="application/ld+json">` محظور.
  - _السبب:_ يتم استخدام JSON LD للغة ترميز البيانات المهيكلة في صفحات المضيف، لكن تصميمات الإعلانات ليست عبارة عن مستندات قائمة بذاتها ولا تحتوي على بيانات منظمة. فيما تكلف كتل JSON LD فيها عرض النطاق الترددي للشبكة.
- ويتم ترحيل كل قواعد البرمجة النصية والاستثناءات الأخرى من AMP العام.
