---
"$title": AMP for Ads specification
order: '3'
formats:
- ads
teaser:
  text: |2-

 "_If you'd like to propose changes to the standard, please comment on the"
    [Intent
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/amp-a4a-format.md.
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

*إذا كنت ترغب في اقتراح إجراء تغييرات على المقياس، فيرجى التعليق على [اعتزام التنفيذ](https://github.com/ampproject/amphtml/issues/4264)*.

إن إعلانات AMPHTML عبارة عن آلية لعرض الإعلانات بسرعة وآداء عالٍ في صفحات AMP. ولضمان إمكانية عرض مستندات إعلان AMPHTML ("تصميمات AMP") على نحو سريع وسلسل في المتصفح ولا تعيق تجربة المستخدم، يجب على تصميمات AMP الاستجابة لمجموعة من قواعد التحقق من الصحة. وعلى نحو مماثل لروح [قواعد تنسيق AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml)، تحتوي إعلانات AMPHTML على صلاحية وصول لمجموعة محدودة من العلامات والإمكانات والملحقات المسموح بها.

## قواعد التنسيق لإعلان AMPHTML <a name="amphtml-ad-format-rules"></a>

مل لم يحدد خلاف ذلك أدناه، يجب على التصميم الاستجابة لكل القواعد المنصوص عليها في [قواعد تنسيق AMP](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml.html)، ومضمنة هنا كمرجع، على سبيل المثال إعلان AMPHTML [Boilerplate](#boilerplate) الخروج عن القوالب القياسية لـ AMP.

بالإضافة إلى ذلك، يجب على التصميمات الاستجابة للقواعد التالية:

<table>
<thead><tr>
  <th>Rule</th>
  <th>Rationale</th>
</tr></thead>
<tbody>
<tr>
<td>يجب استخدام نوع <code>&lt;html ⚡4ads></code> أو <code>&lt;html amp4ads></code>
</td>
<td>Allows validators to identify a creative document as either a general AMP doc or a restricted AMPHTML ad doc and to dispatch appropriately.</td>
</tr>
<tr>
<td>يجب تضمين <code>&lt;script async src="https://cdn.ampproject.org/amp4ads-v0.js">&lt;/script></code> كنص برمجي لوقت التشغيل بدلًا عن <code>https://cdn.ampproject.org/v0.js</code>.</td>
<td>Allows tailored runtime behaviors for AMPHTML ads served in cross-origin iframes.</td>
</tr>
<tr>
<td>يجب تضمين العلامة <code>&lt;link rel="canonical"></code>.</td>
<td>Ad creatives don't have a "non-AMP canonical version" and won't be independently search-indexed, so self-referencing would be useless.</td>
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

تتطلب تصميمات إعلانات AMPHTML خط نمط نموذجيًا مختلفًا وأبسط كثيرًا مما تتطلبه [مستندات AMP العامة](https://github.com/ampproject/amphtml/blob/master/spec/amp-boilerplate.md):

[sourcecode:html]
<style amp4ads-boilerplate>
  body {
    visibility: hidden;
  }
</style>
[/sourcecode]

*السبب:* يخفي نمط `amp-boilerplate` المحتوى الأساسي حتى يصبح وقت تشغيل AMP جاهزًا ويمكن إظهاره. ففي حالة تعطيل Javascript أو فشل تحميل وقت تشغيل AMP، يضمن النص النموذجي الافتراضي عرض المحتوى في نهاية المطاف بصرف النظر عن ذلك.في إعلانات AMPHTML، وعلى الرغم من ذلك، يتم تعطيل Javascript تمامًا، ولن تعمل إعلانات AMPHTML ولن يتم عرض أي إعلان، لذا لا حاجة لقسم`<noscript>`. وفي غياب وقت تشغيل AMP، لن تتوفر معظم الآليات التي تعتمد عليها إعلانات AMPHTML (على سبيل المثال، تحليلات تتبع الرؤية أو `amp-img` لعرض المحتوى)، لذا من الأفضل عدم عرض أي إعلان بدلًا عن عرض إعلان معطل.

في النهاية، يستخدم النص النموذجي لإعلان AMPHTML `amp-a4a-boilerplate` بدلًا عن `amp-boilerplate`حتى يتمكن مسؤولو التحقق من الصحة من التعرف عليه بسهولة وإنتاج رسائل خطأ أكثر دقة لمساعدة المطورين.

لاحظ أن القواعد نفسها المتعلقة بالطفرات في النص النموذجي مطبقة كما في النص[ النموذجي العام لـ AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-boilerplate.md).

### CSS <a name="css"></a>

<table>
<thead><tr>
  <th>Rule</th>
  <th>Rationale</th>
</tr></thead>
<tbody>
  <tr>
    <td>
<code>position:fixed</code> and <code>position:sticky</code> are prohibited in creative CSS.</td>
    <td>
<code>position:fixed</code> breaks out of shadow DOM, which AMPHTML ads depend on. lso, ads in AMP are already not allowed to use fixed position.</td>
  </tr>
  <tr>
    <td>
<code>touch-action</code> is prohibited.</td>
    <td>An ad that can manipulate <code>touch-action</code> can interfere with    the user's ability to scroll the host document.</td>
  </tr>
  <tr>
    <td>Creative CSS is limited to 20,000 bytes.</td>
    <td>Large CSS blocks bloat the creative, increase network    latency, and degrade page performance. </td>
  </tr>
  <tr>
    <td>Transition and animation are subject to additional restrictions.</td>
    <td>AMP must be able to control all animations belonging to an    ad, so that it can stop them when the ad is not on screen or system resources are very low.</td>
  </tr>
  <tr>
    <td>Vendor-specific prefixes are considered aliases for the same symbol    without the prefix for the purposes of validation.  This means that if    a symbol <code>foo</code> is prohibited by CSS validation rules, then the symbol <code>-vendor-foo</code> will also be prohibited.</td>
    <td>Some vendor-prefixed properties provide equivalent functionality to properties that are otherwise prohibited or constrained under these rules.<br><br><p>Example: <code>-webkit-transition</code> and <code>-moz-transition</code> are both considered aliases for <code>transition</code>.  They will only be allowed in contexts where bare <code>transition</code> would be allowed (see <a href="#selectors">Selectors</a> section below).</p>
</td>
  </tr>
</tbody>
</table>

#### رسوم CSS المتحركة وانتقالاتها <a name="css-animations-and-transitions"></a>

##### المحددات <a name="selectors"></a>

في النهاية، يستخدم النص النموذجي لإعلان AMPHTML `amp-a4a-boilerplate` بدلًا عن `amp-boilerplate` حتى يتمكن مسؤولو التحقق من الصحة من التعرف عليه بسهولة وإنتاج رسائل خطأ أكثر دقة لمساعدة المطورين.

- Contain only `transition`, `animation`, `transform`, `visibility`, or `opacity` properties.

    *Rationale:* This allows the AMP runtime to remove this class from context to deactivate animations, when necessary for page performance.

**Good**

[sourcecode:css]
.box {
  transform: rotate(180deg);
  transition: transform 2s;
}
[/sourcecode]

**Bad**

Property not allowed in CSS class.

[sourcecode:css]
.box {
  color: red; // non-animation property not allowed in animation selector
  transform: rotate(180deg);
  transition: transform 2s;
}
[/sourcecode]

##### Transitionable and animatable properties <a name="transitionable-and-animatable-properties"></a>

The only properties that may be transitioned are opacity and transform. ([Rationale](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/))

**Good**

[sourcecode:css]
transition: transform 2s;
[/sourcecode]

**Bad**

[sourcecode:css]
transition: background-color 2s;
[/sourcecode]

**Good**

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

**Bad**

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

### Allowed AMP extensions and builtins <a name="allowed-amp-extensions-and-builtins"></a>

The following are *allowed* AMP extension modules and AMP built-in tags in an AMPHTML ad creative. Extensions or builtin tags not explicitly listed are prohibited.

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
- amp-mraid, on an experimental basis. If you're considering using this, please open an issue at [wg-monetization](https://github.com/ampproject/wg-monetization/issues/new).
- [amp-mustache](https://amp.dev/documentation/components/amp-mustache)
- [amp-pixel](https://amp.dev/documentation/components/amp-pixel)
- [amp-position-observer](https://amp.dev/documentation/components/amp-position-observer)
- [amp-selector](https://amp.dev/documentation/components/amp-selector)
- [amp-social-share](https://amp.dev/documentation/components/amp-social-share)
- [amp-video](https://amp.dev/documentation/components/amp-video)

Most of the omissions are either for performance or to make AMPHTML ads simpler to analyze.

*Example:* `<amp-ad>` is omitted from this list. It is explicitly disallowed because allowing an `<amp-ad>` inside an `<amp-ad>` could potentially lead to unbounded waterfalls of ad loading, which does not meet AMPHTML ads performance goals.

*Example:* `<amp-iframe>` is omitted from this list. It is disallowed because ads could use it to execute arbitrary Javascript and load arbitrary content. Ads wanting to use such capabilities should return `false` from their [a4aRegistry](https://github.com/ampproject/amphtml/blob/master/ads/_a4a-config.js#L40) entry and use the existing '3p iframe' ad rendering mechanism.

*Example:* `<amp-facebook>`, `<amp-instagram>`, `<amp-twitter>`, and `<amp-youtube>` are all omitted for the same reason as `<amp-iframe>`: They all create iframes and can potentially consume unbounded resources in them.

*Example:* `<amp-ad-network-*-impl>` are omitted from this list. The `<amp-ad>` tag handles delegation to these implementation tags; creatives should not attempt to include them directly.

*Example:* `<amp-lightbox>` is not yet included because even some AMPHTML ads creatives may be rendered in an iframe and there is currently no mechanism for an ad to expand beyond an iframe. Support may be added for this in the future, if there is demonstrated desire for it.

### HTML tags <a name="html-tags"></a>

The following are *allowed* tags in an AMPHTML ads creative. Tags not explicitly allowed are prohibited. This list is a subset of the general [AMP tag addendum allowlist](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/../../spec/amp-tag-addendum.md). Like that list, it is ordered consistent with HTML5 spec in section 4 [The Elements of HTML](http://www.w3.org/TR/html5/single-page.html#html-elements).

Most of the omissions are either for performance or because the tags are not HTML5 standard. For example, `<noscript>` is omitted because AMPHTML ads depends on JavaScript being enabled, so a `<noscript>` block will never execute and, therefore, will only bloat the creative and cost bandwidth and latency. Similarly, `<acronym>`, `<big>`, et al. are prohibited because they are not HTML5 compatible.

#### 4.1 The root element <a name="41-the-root-element"></a>

4.1.1 `<html>`

- Must use types `<html ⚡4ads>` or `<html amp4ads>`

#### 4.2 Document metadata <a name="42-document-metadata"></a>

4.2.1 `<head>`

4.2.2 `<title>`

4.2.4 `<link>`

- `<link rel=...>` tags are disallowed, except for `<link rel=stylesheet>`.

- **Note:** Unlike in general AMP, `<link rel="canonical">` tags are prohibited.

    4.2.5 `<style>` 4.2.6 `<meta>`

#### 4.3 Sections <a name="43-sections"></a>

4.3.1 `<body>` 4.3.2 `<article>` 4.3.3 `<section>` 4.3.4 `<nav>` 4.3.5 `<aside>` 4.3.6 `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, and `<h6>` 4.3.7 `<header>` 4.3.8 `<footer>` 4.3.9 `<address>`

#### 4.4 Grouping Content <a name="44-grouping-content"></a>

4.4.1 `<p>` 4.4.2 `<hr>` 4.4.3 `<pre>` 4.4.4 `<blockquote>` 4.4.5 `<ol>` 4.4.6 `<ul>` 4.4.7 `<li>` 4.4.8 `<dl>` 4.4.9 `<dt>` 4.4.10 `<dd>` 4.4.11 `<figure>` 4.4.12 `<figcaption>` 4.4.13 `<div>` 4.4.14 `<main>`

#### 4.5 Text-level semantics <a name="45-text-level-semantics"></a>

4.5.1 `<a>` 4.5.2 `<em>` 4.5.3 `<strong>` 4.5.4 `<small>` 4.5.5 `<s>` 4.5.6 `<cite>` 4.5.7 `<q>` 4.5.8 `<dfn>` 4.5.9 `<abbr>` 4.5.10 `<data>` 4.5.11 `<time>` 4.5.12 `<code>` 4.5.13 `<var>` 4.5.14 `<samp>` 4.5.15 `<kbd >` 4.5.16 `<sub>` and `<sup>` 4.5.17 `<i>` 4.5.18 `<b>` 4.5.19 `<u>` 4.5.20 `<mark>` 4.5.21 `<ruby>` 4.5.22 `<rb>` 4.5.23 `<rt>` 4.5.24 `<rtc>` 4.5.25 `<rp>` 4.5.26 `<bdi>` 4.5.27 `<bdo>` 4.5.28 `<span>` 4.5.29 `<br>` 4.5.30 `<wbr>`

#### 4.6 Edits <a name="46-edits"></a>

4.6.1 `<ins>` 4.6.2 `<del>`

#### 4.7 Embedded Content <a name="47-embedded-content"></a>

- Embedded content is supported only via AMP tags, such as `<amp-img>` or `<amp-video>`.

#### 4.7.4 `<source>` <a name="474-source"></a>

#### 4.7.18 SVG <a name="4718-svg"></a>

SVG tags are not in the HTML5 namespace. They are listed below without section ids.

`<svg>``<g>``<path>``<glyph>``<glyphref>``<marker>``<view>``<circle>``<line>``<polygon>``<polyline>``<rect>``<text>``<textpath>``<tref>``<tspan>``<clippath>``<filter>``<lineargradient>``<radialgradient>``<mask>``<pattern>``<vkern>``<hkern>``<defs>``<use>``<symbol>``<desc>``<title>`

#### 4.9 Tabular data <a name="49-tabular-data"></a>

4.9.1 `<table>` 4.9.2 `<caption>` 4.9.3 `<colgroup>` 4.9.4 `<col>` 4.9.5 `<tbody>` 4.9.6 `<thead>` 4.9.7 `<tfoot>` 4.9.8 `<tr>` 4.9.9 `<td>` 4.9.10 `<th>`

#### 4.10 Forms <a name="410-forms"></a>

4.10.8 `<button>`

#### 4.11 Scripting <a name="411-scripting"></a>

- Like a general AMP document, the creative's `<head>` tag must contain a `<script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>` tag.
- Unlike general AMP, `<noscript>` is prohibited.
    - *Rationale:* Since AMPHTML ads requires Javascript to be enabled to function at all, `<noscript>` blocks serve no purpose in AMPHTML ads and only cost network bandwidth.
- Unlike general AMP, `<script type="application/ld+json">` is prohibited.
    - *Rationale:* JSON LD is used for structured data markup on host pages, but ad creatives are not standalone documents and don't contain structured data. JSON LD blocks in them would just cost network bandwidth.
- All other scripting rules and exclusions are carried over from general AMP.
