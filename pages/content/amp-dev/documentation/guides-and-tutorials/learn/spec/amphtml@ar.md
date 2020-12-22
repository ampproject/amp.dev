---
"$title": AMP HTML Specification
order: '8'
formats:
- مواقع الويب
teaser:
  text: |2-

    AMP HTML is a subset of HTML for authoring content pages such as news
    articles in a way that guarantees certain baseline performance
    characteristics.
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md.
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

تُعد AMP HTML مجموعة فرعية من HTML لتصميم صفحات المحتوى مثل المقالات الإخبارية بطريقة تضمن خصائص أداء أساسية معينة.

ونظرًا لكونها مجموعة فرعية من HTML، فإنها تضع بعض القيود على المجموعة الكاملة من العلامات والوظائف المتاحة من خلال HTML، ولكنها لا تتطلب تطوير محركات عرض جديدة: يمكن لوكلاء المستخدم الحاليين عرض AMP HTML تمامًا مثل كل HTML الأخرى.

[tip type="read-on"] إذا كنت مهتمًا اهتمامًا أساسيًا بما هو مسموح به في AMP وما هو غير مسموح به، فيمكنك مشاهدة [الفيديو التمهيدي حول قيود AMP](https://www.youtube.com/watch?v=Gv8A4CktajQ). [/tip]

إلى جانب إمكانية تحميل مستندات AMP HTML إلى خادم ويب وعرضها تمامًا مثل أي مستند HTML آخر؛ لا يلزم تكوين خاص للخادم. ومع ذلك، فقد تم تصميمها أيضًا ليتم عرضها اختياريًا من خلال أنظمة عرض AMP المتخصصة التي تعد وكيلًا لمستندات AMP. إذ تعمل هذه المستندات على عرضها من الأصل الخاص بها كما يُسمَح لها بتطبيق عمليات التحويل على المستند الذي يوفر مزايا أداء إضافية. وإليك قائمة غير كاملة من التحسينات التي قد يقوم بها نظام العرض:

- Replace image references with images sized to the viewer’s viewport.
- تضمين الصور التي تظهر في جزء الطي من الصفحة.
- Inline CSS variables.
- Preload extended components.
- Minify HTML and CSS.

تستخدم AMP HTML مجموعة من العناصر المخصصة التي تمت المساهمة بها ولكن تتم إدارتها واستضافتها مركزيًا لتنفيذ وظيفية متقدمة مثل معارض الصور التي يمكن العثور عليها في مستند AMP HTML. وعلى الرغم من أنه يسمح بتصميم المستند باستخدام CSS مخصص، فإنه لا يسمح لـ JavaScript المكتوبة بواسطة المؤلف بخلاف ما يتم توفيره من خلال العناصر المخصصة للوصول إلى أهداف الأداء الخاصة به.

By using the AMP format, content producers are making the content in AMP files available to be crawled (subject to robots.txt restrictions), cached, and displayed by third parties.

## Performance <a name="performance"></a>

الأداء المتوقع هو أحد أهداف التصميم الرئيسية لصفحات AMP HTML. وإننا نهدف في المقام الأول إلى تقليل الوقت حتى يتمكن المستخدم من استهلاك/استخدام محتوى الصفحة. وهذا يعني على نحو ملموس أنه:

- يجب تصغير طلبات HTTP اللازمة لعرض المستند وتخطيطه بالكامل.
- يجب تنزيل الموارد مثل الصور أو الإعلانات فقط إذا كان من المحتمل أن يراها المستخدم.
- يجب أن تكون المتصفحات قادرة على حساب المساحة التي يحتاجها كل مورد على الصفحة دون إحضاره.

## The AMP HTML format <a name="the-amp-html-format"></a>

### نموذج مستند<a name="sample-document"></a>

[sourcecode:html]
<!DOCTYPE html>
<html ⚡>
  <head>
    <meta charset="utf-8" />
    <title>Sample document</title>
    <link rel="canonical" href="./regular-html-version.html" />
    <meta
      name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1"
    />
    <style amp-custom>
      h1 {
        color: red;
      }
    </style>
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Article headline",
        "image": ["thumbnail1.jpg"],
        "datePublished": "2015-02-05T08:00:00+08:00"
      }
    </script>
    <script
      async
      custom-element="amp-carousel"
      src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
    ></script>
    <script
      async
      custom-element="amp-ad"
      src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
    ></script>
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Sample document</h1>
    <p>
      Some text
      <amp-img src="sample.jpg" width="300" height="300"></amp-img>
    </p>
    <amp-ad
      width="300"
      height="250"
      type="a9"
      data-aax_size="300x250"
      data-aax_pubname="test123"
      data-aax_src="302"
    >
    </amp-ad>
  </body>
</html>
[/sourcecode]

### Required markup <a name="required-markup"></a>

AMP HTML documents MUST

- <a name="dctp"></a>start with the doctype `<!doctype html>`. [🔗](#dctp)
- <a name="ampd"></a>contain a top-level `<html ⚡>` tag (`<html amp>` is accepted as well). [🔗](#ampd)
- <a name="crps"></a>contain `<head>` and `<body>` tags (They are optional in HTML). [🔗](#crps)
- <a name="canon"></a>contain a `<link rel="canonical" href="$SOME_URL">` tag inside their head that points to the regular HTML version of the AMP HTML document or to itself if no such HTML version exists. [🔗](#canon)
- <a name="chrs"></a>contain a `<meta charset="utf-8">` tag as the first child of their head tag. [🔗](#chrs)
- <a name="vprt"></a>contain a `<meta name="viewport" content="width=device-width">` tag inside their head tag. It's also recommended to include `minimum-scale=1` and `initial-scale=1`. [🔗](#vprt)
- <a name="scrpt"></a>contain a `<script async src="https://cdn.ampproject.org/v0.js"></script>` tag inside their head tag. [🔗](#scrpt)
- <a name="boilerplate"></a>contain the [AMP boilerplate code](https://github.com/ampproject/amphtml/blob/master/spec/amp-boilerplate.md) (`head > style[amp-boilerplate]` and `noscript > style[amp-boilerplate]`) in their head tag. [🔗](#boilerplate)

### بيانات التعريف<a name="metadata"></a>

It is encouraged that AMP HTML documents are annotated with standardized metadata: [Open Graph Protocol](http://ogp.me/), [Twitter Cards](https://dev.twitter.com/cards/overview), etc.

We also recommend that AMP HTML documents are marked up with [schema.org/CreativeWork](https://schema.org/CreativeWork) or any of its more specific types such as [schema.org/NewsArticle](https://schema.org/NewsArticle) or [schema.org/BlogPosting](https://schema.org/BlogPosting).

### علامات HTML <a name="html-tags"></a>

HTML tags can be used unchanged in AMP HTML. Certain tags have equivalent custom tags (such as `<img>` and `<amp-img>`) and other tags are outright prohibited:

<table>
  <tr>
    <th width="30%">العلامة</th>
    <th>الحالة في AMP HTML</th>
  </tr>
  <tr>
    <td width="30%">script</td>
    <td>محظورة ما لم يكن النوع عبارة عن <code>application/ld+json</code>، أو  <code>application/json</code>، أو  <code>text/plain</code>، (يمكن إضافة قيم أخرى غير قابلة للتنفيذ حسب الحاجة). أما الاستثناء عبارة عن علامة النص البرمجي الإلزامي لتحميل وقت تشغيل AMP وعلامات النص البرمجي لتحميل المكونات الموسعة.</td>
  </tr>
  <tr>
    <td width="30%">noscript</td>
    <td>Allowed. Can be used anywhere in the document. If specified, the content inside the <code><noscript></code> element displays if JavaScript is disabled by the user.</td>
  </tr>
  <tr>
    <td width="30%">base</td>
    <td>محظورة.</td>
  </tr>
  <tr>
    <td width="30%">img</td>
    <td>Replaced with <code>amp-img</code>.<br>         Please note: <code><img></code> is a <a href="https://www.w3.org/TR/html5/syntax.html#void-elements">Void Element according to HTML5</a>, so it does not have an end tag. However, <code><amp-img></code> does have an end tag <code></amp-img></code>.</td>
  </tr>
    <tr>
    <td width="30%">picture</td>
    <td>Prohibited. Serve different image formats by using the <a href="https://amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders?format=websites">fallback</a> attribute or provide multiple <a href="https://amp.dev/documentation/components/amp-img#attributes"><code>srcset</code> on <code><amp-img></code></a>.</td>
  </tr>
  <tr>
    <td width="30%">video</td>
    <td>استبدلت بـ <code>amp-video</code>.</td>
  </tr>
  <tr>
    <td width="30%">audio</td>
    <td>استبدلت بـ <code>amp-audio</code>.</td>
  </tr>
  <tr>
    <td width="30%">استبدلت بـ <code>amp-iframe</code>.</td>
    <td>Replaced with <code>amp-iframe</code>.</td>
  </tr>
    <tr>
    <td width="30%">frame</td>
    <td>محظورة.</td>
  </tr>
  <tr>
    <td width="30%">frameset</td>
    <td>محظورة.</td>
  </tr>
  <tr>
    <td width="30%">object</td>
    <td>محظورة.</td>
  </tr>
  <tr>
    <td width="30%">param</td>
    <td>محظورة.</td>
  </tr>
  <tr>
    <td width="30%">applet</td>
    <td>محظورة.</td>
  </tr>
  <tr>
    <td width="30%">embed</td>
    <td>محظورة.</td>
  </tr>
  <tr>
    <td width="30%">form</td>
    <td>مسموح بها، تتطلب تضمين الملحق <a href="https://amp.dev/documentation/components/amp-form">amp-form</a>.</td>
  </tr>
  <tr>
    <td width="30%">عناصر الإدخال</td>
    <td>Mostly allowed with <a href="https://amp.dev/documentation/components/amp-form#inputs-and-fields">exception of some input types</a>, namely, <code><input type=button></code>, <code><button type=image></code> are invalid. Related tags are also allowed: <code><fieldset></code>, <code><label></code>
</td>
  </tr>
  <tr>
    <td width="30%">button</td>
    <td>مسموح بها.</td>
  </tr>
  <tr>
    <td width="30%"><code><a name="cust"></a>style</code></td>
    <td>
<a href="#boilerplate">تتطلب علامة نمط لـ amp-boilerplate</a>. إذ يُسمح بعلامة نمط إضافية واحدة في علامة الرأس لغرض التصميم المخصص. ويجب أن تحتوي علامة النمط هذه على السمة <code>amp-custom</code>. <a href="#cust">🔗</a>
</td>
  </tr>
  <tr>
    <td width="30%">link</td>
    <td>
<code>rel</code> values registered on <a href="http://microformats.org/wiki/existing-rel-values">microformats.org</a> are allowed. If a <code>rel</code> value is missing from our allowlist, <a href="https://github.com/ampproject/amphtml/issues/new">please submit an issue</a>. <code>stylesheet</code> and other values like <code>preconnect</code>, <code>prerender</code> and <code>prefetch</code> that have side effects in the browser are disallowed. There is a special case for fetching stylesheets from allowlisted font providers.</td>
  </tr>
  <tr>
    <td width="30%">meta</td>
    <td>يمكن استخدام السمة <code>http-equiv</code> لقيم معينة مسموح بها؛ راجع <a href="https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii">مواصفات مسؤول التحقق من صحة AMP</a> للحصول على التفاصيل.</td>
  </tr>
  <tr>
    <td width="30%"><code><a name="ancr"></a>a</code></td>
    <td>يجب ألا تبدأ قيمة السمة <code>href</code> بـ <code>javascript:</code>. وفي حالة التعيين، يجب أن تكون قيمة السمة<code>target</code> عبارة عن <code>_blank</code>. وخلاف ذلك مسموح به. <a href="#ancr">🔗</a>
</td>
  </tr>
  <tr>
    <td width="30%">svg</td>
    <td>أغلب عناصر SVG مسموح بها.</td>
  </tr>
</table>

Validator implementations should use an allowlist based on the HTML5 specification with the above tags removed. See [AMP Tag Addendum](https://github.com/ampproject/amphtml/blob/master/spec/amp-tag-addendum.md).

### التعليقات<a name="comments"></a>

Conditional HTML comments are not allowed.

### سمات HTML <a name="html-attributes"></a>

Attribute names starting with `on` (such as `onclick` or `onmouseover`) are disallowed in AMP HTML. The attribute with the literal name `on` (no suffix) is allowed.

XML-related attributes, such as xmlns, xml:lang, xml:base, and xml:space are disallowed in AMP HTML.

Internal AMP attributes prefixed with `i-amp-` are disallowed in AMP HTML.

### الفئات<a name="classes"></a>

Internal AMP class names prefixed with `-amp-` and `i-amp-` are disallowed in AMP HTML.

Consult [AMP documentation](https://github.com/ampproject/amphtml/blob/master/spec/amp-css-classes.md) for meaning of class names prefixed with `amp-`. The use of these classes is allowed and meant to allow customization of some features of AMP runtime and extensions.

All other authored class names are allowed in AMP HTML markup.

### المعرِّفات <a name="ids"></a>

Certain ID names are disallowed in AMP HTML, such as IDs prefixed with `-amp-` and `i-amp-` that may conflict with internal AMP IDs.

Consult the AMP documentation for specific extensions before using `amp-` and `AMP` IDs to avoid conflict with the features provided by these extensions, such as `amp-access`.

View the full list of disallowed ID names by searching for `mandatory-id-attr` [here](https://github.com/ampproject/amphtml/blob/master/spec/../validator/validator-main.protoascii).

### الروابط<a name="links"></a>

The `javascript:` schema is disallowed.

### صفحات الأنماط<a name="stylesheets"></a>

Major semantic tags and the AMP custom elements come with default styles to make authoring a responsive document reasonably easy. An option to opt out of default styles may be added in the future.

#### @-قواعد <a name="-rules"></a>

The following @-rules are allowed in stylesheets:

`@font-face`, `@keyframes`, `@media`, `@page`, `@supports`.

`@import` will not be allowed. Others may be added in the future.

#### صفحات أنماط المؤلف <a name="author-stylesheets"></a>

Authors may add custom styles to a document using a single `<style amp-custom>` tag in the head of the document or inline styles.

`@keyframes` rules are allowed in the `<style amp-custom>`. However, if they are too many of them, it's recommended to place them in the additional `<style amp-keyframes>` tag, which must be located at the end of the AMP document. For details, see the [Keyframes stylesheet](#keyframes-stylesheet) section of this document.

#### المحددات<a name="selectors"></a>

The following restrictions apply to selectors in author style sheets:

##### أسماء العلامات والفئات <a name="class-and-tag-names"></a>

Class names, IDs, tag names and attributes, in author stylesheets, may not start with the string `-amp-` and `i-amp-`. These are reserved for internal use by the AMP runtime. It follows, that the user's stylesheet may not reference CSS selectors for `-amp-` classes, `i-amp-` IDs and `i-amp-` tags and attributes. These classes, IDs and tag/attribute names are not meant to be customized by authors. Authors, however, can override styles of `amp-` classes and tags for any CSS properties not explicitly forbidden by these components' spec.

To prevent usage of attribute selectors to circumvent class name limitations it is generally not allowed for CSS selectors to contain tokens and strings starting with `-amp-` and `i-amp-`.

#### مهم <a name="important"></a>

Usage of the `!important` qualifier is not allowed. This is a necessary requirement to enable AMP to enforce its element sizing invariants.

#### الخصائص <a name="properties"></a>

AMP only allows transitions and animations of properties that can be GPU accelerated in common browsers. We currently allow: `opacity`, `transform` (also `-vendorPrefix-transform`).

In the following examples `<property>` needs to be in the allowed list above.

- `transition <property>` (also -vendorPrefix-transition)
- `@keyframes name { from: {<property>: value} to {<property: value>} }` (also `@-vendorPrefix-keyframes`)

#### الحد الأقصى للحجم <a name="maximum-size"></a>

It is a validation error if the author stylesheet or inline styles together are larger than 75,000 bytes.

### صفحة أنماط الإطارات الأساسية <a name="keyframes-stylesheet"></a>

In addition to the `<style amp-custom>`, authors may also add the `<style amp-keyframes>` tag, which is allowed specifically for keyframes animations.

The following restrictions apply to the `<style amp-keyframes>` tag:

1. May only be placed as the last child of the document's `<body>` element.
2. May only contain `@keyframes`, `@media`, `@supports` rules and their combination.
3. May not be larger than 500,000 bytes.

The reason the `<style amp-keyframes>` tag exists is because keyframes rules are often bulky even for moderately complicated animations, which leads to slow CSS parsing and first contentful paint. But such rules often exceed the size limit imposed on `<style amp-custom>`. Putting such keyframes declarations at the bottom of the document in the `<style amp-keyframes>` allows them to exceed size limitations. And since keyframes are not render-blocking, it also avoids blocking first contentful paint to parse them.

Example:

[sourcecode:html]
<style amp-keyframes>
@keyframes anim1 {}

@media (min-width: 600px) {
  @keyframes anim1 {}
}
</style>
</body>
[/sourcecode]

### الخطوط المخصصة <a name="custom-fonts"></a>

Authors may include stylesheets for custom fonts. The 2 supported methods are link tags pointing to allowlisted font providers and `@font-face` inclusion.

Example:

[sourcecode:html]
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Tangerine"
/>
[/sourcecode]

Font providers can be allowlisted if they support CSS-only integrations and serve over HTTPS. The following origins are currently allowed for font serving via link tags:

- Fonts.com: `https://fast.fonts.net`
- Google Fonts: `https://fonts.googleapis.com`
- Font Awesome: `https://maxcdn.bootstrapcdn.com, https://use.fontawesome.com`
- [Typekit](https://helpx.adobe.com/typekit/using/google-amp.html): `https://use.typekit.net/kitId.css` (replace `kitId` accordingly)

IMPLEMENTERS NOTE: Adding to this list requires a change to the AMP Cache CSP rule.

Authors are free to include all custom fonts via an `@font-face` CSS instruction via their custom CSS. Fonts included via `@font-face` must be fetched via the HTTP or HTTPS scheme.

## وقت تشغيل AMP <a name="amp-runtime"></a>

يمكن إدراج مزودي الخطوط في القائمة البيضاء إذا كانوا يدعمون عمليات تكامل CSS فقط ويعملون عبر HTTPS. ويُسمح حاليًا للأصول التالية بعرض الخطوط عبر علامات الارتباط:

The AMP runtime is loaded via the mandatory <code><script src="https://cdn.ampproject.org/v0.js"></script></code> tag in the AMP document <code></code>.

The AMP runtime can be placed into a development mode for any page. Development mode will trigger AMP validation on the embedded page, which will emit the validation status and any errors to the JavaScript developer console. Development mode may be triggered by appending `#development=1` to the URL of the page.

## الموارد <a name="resources"></a>

Resources such as images, videos, audio files or ads must be included into an AMP HTML file through custom elements such as `<amp-img>`. We call them "managed resources" because whether and when they will be loaded and displayed to the user is decided by the AMP runtime.

There are no particular guarantees as to the loading behavior of the AMP runtime, but it should generally strive to load resources quickly enough, so that they are loaded by the time the user would like to see them if possible. The runtime should prioritize resources currently in the viewport and attempt to predict changes to the viewport and preload resources accordingly.

The AMP runtime may at any time decide to unload resources that are not currently in viewport or reuse the resource containers such as iframes to reduce overall RAM consumption.

## مكونات AMP <a name="amp-components"></a>

AMP HTML uses custom elements called "AMP components" to substitute built-in resource-loading tags such as `<img>` and `<video>` and to implement features with complex interactions such as image lightboxes or carousels.

See the [AMP component spec](https://github.com/ampproject/amphtml/blob/master/spec/./amp-html-components.md) for details about supported components.

There are 2 types of supported AMP components:

1. Built-in
2. Extended

Built-in components are always available in an AMP document and have a dedicated custom element such as `<amp-img>`. Extended components must be explicitly included into the document.

### السمات المشتركة <a name="common-attributes"></a>

#### `layout`, `width`, `height`, `media`, `placeholder`, `fallback` <a name="layout-width-height-media-placeholder-fallback"></a>

These attributes define the layout of an element. The key goal here is to ensure that the element can be displayed and its space can be properly reserved before any of the JavaScript or remote resources have been downloaded.

See the [AMP Layout System](https://github.com/ampproject/amphtml/blob/master/spec/./amp-html-layout.md) for details about the layout system.

#### `on` <a name="on"></a>

The `on` attribute is used to install event handlers on elements. The events that are supported depend on the element.

The value for the syntax is a simple domain specific language of the form:

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
[/sourcecode]

Example: `on="tap:fooId.showLightbox"`

If `methodName` is omitted the default method is executed if defined for the element. Example: `on="tap:fooId"`

Some actions, if documented, may accept arguments. The arguments are defined between parentheses in `key=value` notation. The accepted values are:

- simple unquoted strings: `simple-value`;
- quoted strings: `"string value"` or `'string value'`;
- boolean values: `true` or `false`;
- numbers: `11` or `1.1`.

You can listen to multiple events on an element by separating the two events with a semicolon `;`.

Example: `on="submit-success:lightbox1;submit-error:lightbox2"`

Read more about [AMP Actions and Events](https://github.com/ampproject/amphtml/blob/master/spec/./amp-actions-and-events.md).

### مكونات موسَّعة <a name="extended-components"></a>

Extended components are components that do not necessarily ship with the AMP runtime. Instead they must be explicitly included into the document.

Extended components are loaded by including a `<script>` tag in the head of the document like this:

[sourcecode:html]
<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>
[/sourcecode]

The `<script>` tag must have an `async` attribute and must have a `custom-element` attribute referencing the name of the element.

Runtime implementations may use the name to render placeholders for these elements.

The script URL must start with `https://cdn.ampproject.org` and must follow a very strict pattern of `/v\d+/[a-z-]+-(latest|\d+|\d+\.\d+)\.js`.

##### عنوان URL <a name="url"></a>

The URL for extended components is of the form:

[sourcecode:http]
https://cdn.ampproject.org/$RUNTIME_VERSION/$ELEMENT_NAME-$ELEMENT_VERSION.js
[/sourcecode]

##### تعيين الإصدار <a name="versioning"></a>

See the [AMP versioning policy](https://github.com/ampproject/amphtml/blob/master/spec/amp-versioning-policy.md).

### القوالب <a name="templates"></a>

Templates render HTML content based on the language-specific template and provided JSON data.

راجع [مواصفات قوالب AMP](https://github.com/ampproject/amphtml/blob/master/spec/./amp-html-templates.md) للحصول على مزيد من التفاصيل حول القوالب المدعومة.

لا يتم نقل النماذج مع وقت تشغيل AMP ويجب تنزيلها تمامًا كما هو الحال مع العناصر الموسَّعة. إذ يتم تحميل المكونات الموسَّعة بتضمين علامة `<script>` في رأس المستند مثل ما يلي:

[sourcecode:html]
<script
  async
  custom-template="amp-mustache"
  src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"
></script>
[/sourcecode]

ويجب أن تتضمن العلامة `<script>` السمة `async` كما يجب أن تتضمن السمة `custom-template` التي تشير إلى نوع القالب. فيما يجب أن يبدأ عنوان URL للبرنامج النصي بـ `https://cdn.ampproject.org` ويجب أن يتبع نمطًا صارمًا مؤلفًا من `/v\d+/[a-z-]+-(latest|\d+|\d+\.\d+)\.js`.

ويتم الإعلان عن القوالب في المستند على النحو التالي:

[sourcecode:html]
<template type="amp-mustache" id="template1">
  Hello {% raw %}{{you}}{% endraw %}!
</template>
[/sourcecode]

فيما تكون السمة `type` مطلوبة ويجب أن تشير إلى برنامج نصي `custom-template` معلن.

وتكون السمة `id` اختيارية. إذ تكتشف عناصر AMP القوالب الخاصة بها. وتتضمن السيناريوهات النموذجية عنصر AMP الذي يبحث عن `<template>` إما بين العناصر الفرعية أو المشار إليه بواسطة المعرِّف.

ويعتمد بناء الجملة داخل عنصر القالب على لغة القالب المحددة. على الرغم من ذلك، يمكن تقييد لغة القالب داخل AMP. على سبيل المثال، وفقًا لعنصر "القالب"، يجب أن تكون كل عمليات الإنتاج عبارة عن نموذج كائن مستند صالح جيد التشكيل. إذ تخضع كل مخرجات القالب أيضًا إلى التصحاح لضمان إخراج AMP صالح.

ومن أجل التعرف على بناء الجملة والقيود الخاصة بقالب ما، يرجى زيارة [وثائق القوالب](https://github.com/ampproject/amphtml/blob/master/spec/./amp-html-templates.md#templates).

##### عنوان URL <a name="url-1"></a>

يتخذ عنوان URL للمكونات الموسعة الشكل:

[sourcecode:http]
https://cdn.ampproject.org/$RUNTIME_VERSION/$TEMPLATE_TYPE-$TEMPLATE_VERSION.js
[/sourcecode]

##### تعيين الإصدار <a name="versioning-1"></a>

راجع تعيين إصدارات العناصر المخصصة لمزيد من التفاصيل.

## الأمان <a name="security"></a>

يجب ألا تتسبب مستندات AMP HTML في حدوث أخطاء عند عرضها مع سياسة أمان المحتوى التي لا تتضمن الكلمتين الرئيسيتين `unsafe-inline` و`unsafe-eval`.

وقد تم تصميم تنسيق AMP HTML بحيث تكون هذه ماهية الأمر دائمًا.

يجب أن تخضع جميع عناصر قالب AMP لمراجعة أمان AMP قبل إرسالها إلى مستودع AMP.

## SVG <a name="svg"></a>

عناصر SVG التالية هي المسموح بها في الوقت الحالي:

- basics: "g", "glyph", "glyphRef", "image", "marker", "metadata", "path", "solidcolor", "svg", "switch", "view"
- shapes: "circle", "ellipse", "line", "polygon", "polyline", "rect"
- text: "text", "textPath", "tref", "tspan"
- rendering: "clipPath", "filter", "hkern", "linearGradient", "mask", "pattern", "radialGradient", "vkern"
- special: "defs" (all children above are allowed here), "symbol", "use"
- filter: "feColorMatrix", "feComposite", "feGaussianBlur", "feMerge", "feMergeNode", "feOffset", "foreignObject"
- ARIA: "desc", "title"

إلى جانب السمات التالية:

- "xlink:href": only URIs starting with "#" are allowed
- "style"

## اكتشاف مستند AMP <a name="amp-document-discovery"></a>

The mechanism described below provides a standardized way for software to discover whether an AMP version exists for a canonical document.

If an AMP document exists that is an alternative representation of a canonical document, then the canonical document should point to the AMP document via a `link` tag with the [relation "amphtml"](http://microformats.org/wiki/existing-rel-values#HTML5_link_type_extensions).

Example:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html" />
[/sourcecode]

The AMP document itself is expected to point back to its canonical document via a `link` tag with the relation "canonical".

Example:

[sourcecode:html]
<link
  rel="canonical"
  href="https://www.example.com/url/to/canonical/document.html"
/>
[/sourcecode]

(If a single resource is simultaneously the AMP *and* the canonical document, the canonical relation should point to itself--no "amphtml" relation is required.)

Note that for widest compatibility with AMP-consuming systems, it should be possible to read the "amphtml" relation without executing JavaScript. (That is, the tag should be present in the raw HTML, and not injected via JavaScript.)
