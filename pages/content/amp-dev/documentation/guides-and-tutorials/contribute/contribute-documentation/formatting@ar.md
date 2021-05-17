---
'$title': أدلة التنسيق والبرامج التعليمية
$order: 3
description: متطلبات تنسيق الملفات لـ amp.dev
formats:
  - websites
  - stories
  - ads
  - email
author: CrystalOnScript
---

يجري تقديم الأدلة والبرامج التعليمية بلغة [ترميز](https://www.markdownguide.org/)، مع تنسيق إضافي للمقدمة والرموز المختصرة.

## مواقع المستندات

يؤخذ المحتوى الموجود على amp.dev من مستودعين، [amp.dev](https://github.com/ampproject/amp.dev) و [AMPHTML](https://github.com/ampproject/amphtml). ويتم أخذ جميع المستندات المرجعية تحت المكونات من AMPHTML إما من الوحدات المدمجة أو من الملحقات.

- [المكونات المدمجة ](https://github.com/ampproject/amphtml/tree/main/builtins)
- [المكونات](https://github.com/ampproject/amphtml/tree/main/extensions)
- [الدورات](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/courses)
- [الأمثلة](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/examples)
- [الأدلة والبرامج التعليمية](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/guides-and-tutorials)

ثمة العديد من المستندات الأخرى التي يجري استيرادها إلى amp.dev منAMPHTML. وهي [مدرجة في هذا الملف](https://github.com/ampproject/amp.dev/blob/future/platform/config/imports/spec.json). لا تقم بتحديث هذه المستندات في مستودع amp.dev – سوف تتم الكتابة فوق تغييراتك في عمليات البناء التالية!

## المقدمة

توجد المقدمة في أعلى كل دليل وبرنامج تعليمي.

مثال:

```yaml
$title: Include Custom JavaScript in AMP Pages
$order: 7
formats:
  - websites
author: CrystalOnScript
contributors:
  - fstanis
description: For web experiences requiring a high amount of customization AMP has created amp-script, a component that allows the use of arbitrary JavaScript on your AMP page without affecting the page's overall performance.
```

<table>
  <tr>
   <td>
    <code>$title</code>
   </td>
   <td>عنوان المستند الخاص بك كما يظهر في جدول المحتويات. اكتب الحرف الأول من الكلمة بحرف كبير، باستثناء “AMP” والأسماء الصحيحة الأخرى. واستخدم علامة الضم `&` بدلا من كلمة `و`.</td>
  </tr>
  <tr>
   <td>
    <code>$order</code>
   </td>
   <td>حدد أين سيظهر جدول المحتويات للمستند الخاص بك. قد تحتاج إلى تحرير  `$order` في المستندات الأخرى لكي يظهر في الموضع الصحيح.</td>
  </tr>
  <tr>
   <td>
    <code>formats</code>
   </td>
   <td>اسرد خبرات AMP التي يتعلق بها المستند الخاص بك. إذا كان المستند يتعلق بمواقع ويب AMP وقصص AMP، ولكنه لا يتعلق بإعلانات AMP أو رسائل AMP الإلكترونية، فإن المقدمة ستكون كالتالي:     ``تنسيقات`yaml         :           - مواقع الويب           - القصص     ```</td>
  </tr>
  <tr>
   <td>
<code>author</code>
   </td>
   <td>أنت المؤلف! استخدم اسم مستخدم GitHub الخاص بك.</td>
  </tr>
  <tr>
   <td>
<code>contributors</code>
   </td>
   <td>اسرد أي شخص ساهم في كتابة مستندك. هذا الحقل اختياري.</td>
  </tr>
  <tr>
   <td>
<code>description</code>
   </td>
   <td>اكتب وصفًا مختصرًا للدليل أو البرنامج التعليمي. يساعد هذا الأمر في تحسين محرك البحث، ما يسهم في إيصال عملك إلى الأشخاص الذين يحتاجون إليه!</td>
  </tr>
  <tr>
   <td>
<code>tutorial</code>
   </td>
   <td>أضف `tutorial: true` إلى مقدمة موقع الويب لإضافة رمز البرنامج التعليمي بجواره. توجد البرامج التعليمية في أسفل القسم الخاص به في جدول المحتويات.</td>
  </tr>
</table>

# الرموز المختصرة

للاطلاع على قائمة بالرموز المختصرة واستخداماتها، يرجى عرض [documentation.md على GitHub](https://github.com/ampproject/amp.dev/blob/future/contributing/documentation.md#shortcodes).

## الصور

يتم دمج amp.dev مع AMP! بالتالي يجب أن تطابق الصور الخاصة بنا معايير [`amp-img`](../../../../documentation/components/reference/amp-img.md). تستخدم عملية الإنشاء البنية التالية لتحويل الصور إلى تنسيق `amp-img` صحيح.

<div class="ap-m-code-snippet"><pre>{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/image1.jpg', 500, 369, layout='intrinsic', alt='Image of basic amp script tutorial starter app') }}</pre></div>

## تصفية الأقسام

قد تكون بعض المستندات متعلقة بعدة تنسيقات AMP، ولكن قد تحتاج تنسيقات معينة إلى شرح أو معلومات إضافية لا تمت بصلة مع التنسيقات الأخرى. يمكنك تصفية هذه الأقسام من خلال طيها في الرمز المختصر التالي.

<div class="ap-m-code-snippet"><pre>&amp;lsqb;filter formats="websites"]
This is only visible for [websites](?format=websites).
&amp;lsqb;/filter]

&amp;lsqb;filter formats="websites"]
This is only visible for [websites](?format=websites).
&amp;lsqb;/filter]

&amp;lsqb;filter formats="websites, email"]
This is visible for [websites](?format=websites) &amp; [email](?format=email).
&amp;lsqb;/filter]

&amp;lsqb;filter formats="stories"]
This is visible for [stories](?format=stories).
&amp;lsqb;/filter]</pre></div>

## تلميحات

يمكنك إضافة تلميحات واستدعاءات من خلال طي النص في الرمز المختصر التالي:

<div class="ap-m-code-snippet"><pre>&amp;lsqb;tip type="default"]
Default tip
[/tip]

&amp;lsqb;tip type="important"]
Important
[/tip]

&amp;lsqb;tip type="note"]
Note
[/tip]

&amp;lsqb;tip type="read-on"]
Read-on
[/tip]</pre></div>

## قصاصات الرموز البرمجية

ضع قصاصات الرموز البرمجية داخل مجموعات من ثلاث علامات اقتباس، وحدد اللغة في نهاية المجموعة الأولى من علامات الاقتباس.

<div class="ap-m-code-snippet"><pre>```html
  // code sample
```

```css
// code sample
```

````js
  // code sample
```</pre></div>

إذا كان الرمز الخاص بك يحتوي على أقواس مزدوجة منحنية، وعادة ما يكون الأمر كذلك إذا كنت تستخدم قوالب [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md?format=websites)، فيجب عليك طي جزء الرمز:

<div class="ap-m-code-snippet"><pre>```html<br>{% raw	%}<br>  // code with double curly braces<br>{% endraw	%}<br>```</pre></div>

### قصاصات الرموز البرمجية في القوائم

تفرض لغة ترميز Python بعض القيود. استخدم البنية التالية عند تضمين قصاصات الرموز البرمجية في القوائم:

<div class="ap-m-code-snippet"><pre>&lsqb;sourcecode:html]
      <html>
        <p>Indented content.</p>
      </html>
    &lsqb;/sourcecode]</pre></div>

## معاينة أمثلة الرموز

يمكن أن تتضمن بعض أمثلة الرموز معاينة و/أو ارتباط إلى إصدار [ساحة AMP](https://playground.amp.dev/).

<div class="ap-m-code-snippet">
  <pre>&lsqb;example preview="default: none|inline|top-frame"
          playground="default: true|false"
          imports="<custom-element-1>,<custom-element-2>,..."
          template="<custom-template>"]
  ```html
    // code sample
````

&lsqb;/example]</pre>

</div>

ملاحظة: سيتم تحويل المعاينة تلقائيًا إلى التنسيق المحدد حاليًا عند فتحها في الساحة 🤯!

استخدم سمة `preview` لتحديد كيف سيتم إنشاء المعاينة:

- **none**: لن يتم إنشاء أي معاينة

- **inline**: سيتم عرض معاينة المثال فوق الرمز المصدر. تكون المعاينة المدمجة ممكنة فقط مع أمثلة مواقع الويب العادية إذا كان الرمز لا يحتوي على أي عناصر `head`. استخدم هذا الخيار مع الأمثلة الصغيرة التي لا تحتاج إلى أي أنماط أو عناصر `head` أخرى (لا يتم حساب عمليات الاستيراد، نظرًا لأنها محددة عن طريق سمة `imports`).

- **top-frame**: يتم عرض معاينة المثال فوق رمز المصدر داخل iframe. يمكن تبديل الاتجاه بين الوضع `portrait` و `landscape`. يمكنك تعيين الاتجاه مسبقًا من خلال تحديد السمة الإضافية:

- **orientation**: `default: landscape|portrait`

إذا كان من اللازم استعمال عناصر مخصصة، فحددها في سمة `imports` كقائمة مفصولة بفاصلة مع اسم المكون متبوعًا بعلامة النقطتين والإصدار. إذا كان الرمز الخاص بك يستخدم [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md?format=websites) فحدد التبعية في سمة `template` بدلا من ذلك.

مع محتوى البريد الإلكتروني الذي يتضمن ارتباطات إلى الموارد استخدم العنصر النائب <code>{{server_for_email}}</code> في المصدر.

### المثال المضمّن

فيما يلي مثال مضمّن بسيط تم إدراجه. يمكنك تحديد CSS عن طريق الأنماط المضمنة:

<div class="ap-m-code-snippet"><pre>[example preview="inline" playground="true"]
    ```html
    <div style="background: red; width: 200px; height: 200px;">Hello World</div>
    ```
  [/example]</pre></div>

فيما يلي الصورة التي سيكون عليها:

[example preview="inline" playground="true"]

```html
<div style="background: red; width: 200px; height: 200px;">Hello World</div>
```

[/example]

تحذير: يتم إدراج الأمثلة المضمنة مباشرة في الصفحة. قد يؤدي ذلك إلى تعارضات إذا كانت المكونات مستعملة بالفعلة في الصفحة (على سبيل المثال `amp-consent`).

### معاينة الإطار العلوي

استخدم معاينة الإطار العلوي متى احتجت إلى تحدي عناصر الرأس أو تحديد أنماط عمومية داخل `<style amp-custom>`.

هام: لا تضيف أي رمز نص AMP أساسي إلى العنوان نظرًا لأنه تتم إضافته تلقائيًا، استنادًا إلى تنسيق AMP. أضف فقط العناصر إلى الرأس والتي تكون مطلوبة من المثال فقط!

<div class="ap-m-code-snippet"><pre>[example preview="top-frame"
         playground="true"]
    ```html
    <head>
      <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
      <style amp-custom>
        body {
          background: red;
        }
      </style>
    </head>
    <body>
      <h1>Hello AMP</h1>
      <amp-youtube width="480"
        height="270"
        layout="responsive"
        data-videoid="lBTCB7yLs8Y">
      </amp-youtube>
    </body>
    ```
  [/example]</pre></div>

فيما يلي الصورة التي سيكون عليها:

[example preview="top-frame"
playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-youtube"
    src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
  ></script>
  <style amp-custom>
    body {
      background: red;
    }
  </style>
</head>
<body>
  <h1>Hello AMP</h1>
  <amp-youtube
    width="480"
    height="270"
    layout="responsive"
    data-videoid="lBTCB7yLs8Y"
  >
  </amp-youtube>
</body>
```

[/example]

### قصص AMP

استخدم `preview="top-frame"` مع `orientation="portrait"` لمعاينة قصص AMP.

<div class="ap-m-code-snippet"><pre>[example preview="top-frame"
         orientation="portrait"
         playground="true"]
    ```html
    <head>
      <script async custom-element="amp-story"
          src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
      <style amp-custom>
        body {
          font-family: 'Roboto', sans-serif;
        }
        amp-story-page {
          background: white;
        }
      </style>
    </head>
    <body>
      <amp-story standalone>
        <amp-story-page id="cover">
          <amp-story-grid-layer template="vertical">
            <h1>Hello World</h1>
            <p>This is the cover page of this story.</p>
          </amp-story-grid-layer>
        </amp-story-page>
        <amp-story-page id="page-1">
          <amp-story-grid-layer template="vertical">
            <h1>First Page</h1>
            <p>This is the first page of this story.</p>
          </amp-story-grid-layer>
        </amp-story-page>
      </amp-story>
    </body>
    ```
  [/example]</pre></div>

فيما يلي الصورة التي سيكون عليها:

[example preview="top-frame"
orientation="portrait"
playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-story"
    src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
  ></script>
  <style amp-custom>
    body {
      font-family: 'Roboto', sans-serif;
    }
    amp-story-page {
      background: white;
    }
  </style>
</head>
<body>
  <amp-story standalone>
    <amp-story-page id="cover">
      <amp-story-grid-layer template="vertical">
        <h1>Hello World</h1>
        <p>This is the cover page of this story.</p>
      </amp-story-grid-layer>
    </amp-story-page>
    <amp-story-page id="page-1">
      <amp-story-grid-layer template="vertical">
        <h1>First Page</h1>
        <p>This is the first page of this story.</p>
      </amp-story-grid-layer>
    </amp-story-page>
  </amp-story>
</body>
```

[/example]

### عناوين URL المطلقة لرسائل AMP الإلكترونية

لاحظ كيف نستخدم <code>{{server_for_email}}</code> لإنشاء عنوان URL مطلق لنقطة النهاية في حالة تضمينه داخل رسالة AMP إلكترونية.

<div class="ap-m-code-snippet"><pre>[example preview="top-frame" playground="true"]
    ```html
    <div class="resp-img">
      <amp-img alt="flowers"
        src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
        layout="responsive"
        width="640"
        height="427"></amp-img>
    </div>
    ```
  [/example]</pre></div>

فيما يلي الصورة التي سيكون عليها:

[example preview="top-frame" playground="true"]

```html
<div class="resp-img">
  <amp-img
    alt="flowers"
    src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
    layout="responsive"
    width="640"
    height="427"
  ></amp-img>
</div>
```

[/example]

### الخروج من قوالب الشارب

فيما يلي مثال لـ `top-frame` يستخدم نقطة نهاية بعيدة. ويلزم الخروج من قوالب الشارب في الأمثلة باستخدام <code>{% raw %}</code> و<code>{% endraw %}</code>:

<div class="ap-m-code-snippet">
  <pre>[example preview="top-frame"
        playground="true"
        imports="amp-list:0.1"
        template="amp-mustache:0.2"]
    ```html
    <amp-list width="auto" height="100" layout="fixed-height"
      src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json">
      <template type="amp-mustache">{% raw %}
        <div class="url-entry">
          <a href="{{url}}">{{title}}</a>
        </div>
      {% endraw %}
      </template>
    </amp-list>
    ```
[/example]</pre>
</div>

فيما يلي الصورة التي سيكون عليها:

[example preview="top-frame"
playground="true"
imports="amp-list:0.1"
template="amp-mustache:0.2"]

```html
<amp-list
  width="auto"
  height="100"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json"
>
  <template type="amp-mustache"
    >{% raw %}
    <div class="url-entry">
      <a href="{{url}}">{{title}}</a>
    </div>
    {% endraw %}
  </template>
</amp-list>
```

[/example]

## الارتباطات

يمكنك عمل ارتباط بصفحات أخرى باستخدام بنية ارتباط برنامج الترميز القياسي:

```md
[link](../../../courses/beginning-course/index.md)
```

عند الارتباط بصفحة أخرى على amp.dev سيكون المرجع هو مسار ملف نسبي إلى الملف الهدف.

### وحدات الإرساء

يمكن الارتباط بأقسام معينة في مستند باستخدام وحدات الإرساء:

```md
[link to example section](#example-section)
```

الرجاء إنشاء هدف إرساء باستخدام `<a name="#anchor-name></a>` قبل الارتباط بقسم بدون وجود إرساء. والمكان الجيد لوضعه في نهاية عنوان القسم:

```html
## Example section <a name="example-section"></a>
```

يجب فقط استخدام الأحرف والأرقام والشرطة والشرطة السفلية في الإرساء. ويرجى استخدام أسماء إرساء قصيرة باللغة الإنجليزية تطابق العنوان أو تصف القسم. تأكد من أن اسم الإرساء فريد داخل المستند.

عند ترجمة صفحة يجب عدم تغيير أسماء الإرساء ويجب أن تبقي باللغة الإنجليزية.

عند إنشاء إرساء ليتم استخدامه في ارتباط من صفحة أخرى، يجب أن تقوم أيضًا بإنشاء نفس الإرساء في جميع الترجمات.

### عامل تصفية تنسيق AMP

تتميز المستندات والأدلة والبرامج التعليمية والأمثلة الخاصة بالمكون بأنها قابلة للتصفية حسب تنسيق AMP، مثل مواقع ويب AMP أو قصص AMP. وعند عمل ارتباط إلى مثل هذه الصفحات فيجب أن تحدد بوضوح التنسيق، المدعوم بالهدف، من خلال إلحاق معلمة التنسيق بالارتباط:

```md
[link](../../learn/amp-actions-and-events.md?format=websites)
```

عندما تكون متأكدًا فقط من أن الهدف يدعم **كافة** التنسيقات التي تدعمها الصفحة الخاصة بك فإنه يمكنك حذف المعلمة.

### مراجع المكون

سوف يشير ارتباط لمستند مرجع المكون تلقائيًا إلى أحدث إصدار إذا كان الارتباط الخاص بك يحذف جزء الإصدار. وعندما تريد صراحة الإشارة إلى إصدار ما فحدد الاسم الكامل:

```md
[latest version](../../../components/reference/amp-carousel.md?format=websites)
[explicit version](../../../components/reference/amp-carousel-v0.2.md?format=websites)
```

## بنية المستند

### العناوين والرؤوس والعناوين الفرعية

يجب كتابة الحرف الأول في الكلمة الأولى بالعناوين والعناوين الفرعية بحرف كبير، متبوعًا بحرف صغير. تشمل الاستثناءات كلمة AMP والأسماء الصحيحة. لا يوجد عنوان بالمسمى `Introduction`، تتبع التعليمات عنوان المستند.

### تسمية المستند

قم بتسمية المستندات باستخدام التسمية بالشرطة.

<table>
  <tr>
   <td>
<strong>افعل</strong>
   </td>
   <td>
<strong>لا تفعل</strong>
   </td>
  </tr>
  <tr>
   <td>hello-world-tutorial.md</td>
   <td>hello_world_tutorial.md</td>
  </tr>
  <tr>
   <td>website-fundamentals.md</td>
   <td>websiteFundamentals.md</td>
  </tr>
  <tr>
   <td>actions-and-events.md</td>
   <td>actionsandevents.md</td>
  </tr>
</table>
