---
'$title': إنشاء صفحة الغلاف
$order: 4
description: 'لإنشاء صفحة، أضف عنصر <amp-story-page> بوصفه عنصرًا تابعًا لـ amp-story. وعيِّن معرِّفًا فريدًا للصفحة. وبالنسبة لصفحتنا الأولى، وهي صفحة الغلاف، فلنقم بتعيين معرِّف فريد للغلاف: ...'
author: bpaduch
---

يتم تمثيل الصفحة داخل قصة ويب بمكوِّن `<amp-story-page>`. وداخل [`amp-story`](../../../../documentation/components/reference/amp-story.md)، يمكنك الحصول على أحد مكونات `<amp-story-page>` أو أكثر، التي تحتوي على كل شاشة من الشاشات الفردية للقصة. وتكون الصفحة الأولى التي تحددها بترتيب المستند هي الصفحة الأولى التي يتم عرضها في قصة الويب.

لإنشاء صفحة، **أضف** عنصر `<amp-story-page>` بوصفه عنصرًا تابعًا لـ [`amp-story`](../../../../documentation/components/reference/amp-story.md). **وعيِّن** معرِّفًا فريدًا للصفحة. وبالنسبة لصفحتنا الأولى، وهي صفحة الغلاف، فلنقم بتعيين معرِّف فريد لـ `cover`

```html
<amp-story
  standalone
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
  poster-portrait-src="assets/cover.jpg"
>
  <amp-story-page id="cover"> </amp-story-page>
</amp-story>
```

والآن لدينا الغلاف لصفحة الغلاف الخاصة بنا. ومع ذلك، لا تزال قصتنا غير صالحة. داخل صفحتنا، نحتاج إلى تحديد **طبقة** واحدة على الأقل. {{ image('/static/img/docs/tutorials/amp_story/cover_layers.png', 416, 679, alt='cover page has two layers', align='right third' ) }}

## الطبقات في الصفحة

مثل الطبقات في الرسومات، يمكنك استخدام الطبقات في صفحات قصة AMP لإنشاء تأثيرات بصرية. فيما تتراكم الطبقات فوق بعضها البعض، لذا فإن الطبقة الأولى هي الطبقة السفلية والطبقة التالية فوقها، وهكذا.

تتكون صفحة الغلاف الخاصة بنا بالفعل من طبقتين:

- **الطبقة 1**: صورة تعمل كخلفية خاصة بنا
- **الصورة 2**: العنوان واسم الكاتب للقصة

### إنشاء الطبقة 1

دعنا نضيف الطبقة الأولى إلى صفحة الغلاف الخاصة بنا. إذ تحتوي الطبقة على صورة بملء الشاشة.

أنشئ الطبقة بإضافة العنصر `<amp-story-grid-layer>` بوصفه عنصرًا تابعًا لـ `<amp-story-page>`. ونظرًا لأننا نريد أن تكون الصورة بملء الشاشة، حدد السمة `template="fill"` لـ `amp-story-grid-layer`. وداخل الطبقة، أضف عنصر [`amp-img`](../../../../documentation/components/reference/amp-img.md) إلى ملف `cover.jpg`، وتأكد من أنه سريع الاستجابة (على سبيل المثال، `layout="responsive"`) بأبعاد 720 × 1280 بكسل. وإليك ما ستبدو عليه طبقتنا:

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-img
      src="assets/cover.jpg"
      width="720"
      height="1280"
      layout="responsive"
    >
    </amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

دعونا نرى كيف يتم عرض الصفحة.؛ افتحها في متصفحك: <a href="http://localhost:8000/pets.html">http://localhost:8000/pets.html</a>.

إليك ماهيتها التي يجب أن تظهر بها:

{{ image('/static/img/docs/tutorials/amp_story/pg0_layer1.jpg', 720, 1280, align='center third' ) }}

### إنشاء الطبقة 2

إذن لدينا الخلفية الخاصة بنا ولكننا الآن نحتاج إلى الطبقة الثانية، التي توجد أعلى الخلفية وتحتوي على العنوان واسم كاتب الموضوع. لإضافة الطبقة الثانية، دعنا نكمل المهام نفسها التي أجريناها للطبقة 1، ولكن بدلاً من استخدام النموذج `fill`، سنستخدم **`vertical`**. على الرغم من ذلك، قبل أن نتقدم أكثر، لنتعرف على النماذج وكيف يمكننا ترتيب عناصر AMP وHTML في `<amp-story-grid-layer>`.

#### تخطيط العناصر بنموذج

يحدد العنصر `<amp-story-grid-layer>` العناصر التابعة في خطوط الشبكة (استنادًا إلى [خطوط شبكة CSS](https://www.w3.org/TR/css-grid-1/)). وللإشارة إلى الطريقة التي تريد ترتيب العناصر التابعة بها، تحتاج إلى تحديد أحد نماذج التخطيط التالية:

<table class="noborder">
<tr>
    <td colspan="2"><h5 id="fill">النموذج: Fill</h5></td>
</tr>
<tr>
    <td width="65%">يملأ النموذج <strong>fill</strong> الشاشة بالعنصر التابع الأول في الطبقة. ولا يتم عرض أي عناصر تابعة أخرى في هذه الطبقة. فيما يعمل النموذج Fill جيدًا مع الخلفيات، بما في ذلك الصور ومقاطع الفيديو     <code class="nopad"><br>       <br></code>
</td>
    <td>     {{ image('/static/img/docs/tutorials/amp_story/layer-fill.png', 216, 341) }}</td>
</tr>
<tr>
    <td colspan="2"><h5 id="vertical">النموذج: Vertical</h5></td>
</tr>
<tr>
    <td width="65%">يضع النموذج <strong>vertical</strong> العناصر التابعة على طول المحور ص. وتتم محاذاة العناصر مع الجزء العلوي من الشاشة، وتحتل الشاشة بأكملها على طول المحور س. فيما يعمل النموذج Vertical جيدًا عندما تريد تكديس العناصر رأسياً واحدة تلو الأخرى.    <code class="nopad"><pre><amp-story-grid-layer template="vertical">   <p>element 1</p>   <p>element 2</p>   <p>element 3</p> </amp-story-grid-layer></pre></code>
</td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/layer-vertical.png', 216, 341) }}</td>
</tr>
<tr>
    <td colspan="2"><h5 id="horizontal">النموذج: Horizontal</h5></td>
</tr>
<tr>
    <td width="65%">يضع النموذج <strong>horizontal</strong> العناصر التابعة على طول المحور س. وتتم محاذاة العناصر مع بداية الشاشة، وتحتل الشاشة بأكملها على طول المحور ص. ويعمل النموذج Horizontal جيدًا عندما تريد تكديس العناصر أفقيًا واحدًا تلو الآخر.     <code class="nopad"><pre><amp-story-grid-layer template="horizontal">   <p>element 1</p>   <p>element 2</p>   <p>element 3</p> </amp-story-grid-layer></pre></code>
</td>
    <td>     {{ image('/static/img/docs/tutorials/amp_story/layer-horizontal.png', 216, 341) }}</td>
</tr>
<tr>
    <td colspan="2"><h5 id="thirds">النموذج: Thirds</h5></td>
</tr>
<tr>
<td width="65%"> يقسم النموذج <strong>thirds</strong> الشاشة إلى ثلاثة صفوف متساوية الحجم، ويسمح لك بفتح المحتوى في كل منطقة. ويمكنك أيضًا تحديد <code>grid-area</code> للإشارة إلى الثلث الذي تريد أن يكون المحتوى الخاص بك فيه — <code>upper-third</code>، <code>middle-third</code>، أو <code>lower-third</code>. وتكون خطوط الشبكة المسماة مفيدة لتغيير السلوك الافتراضي لمكان ظهور العناصر. على سبيل المثال، إذا كان لديك عنصران في الطبقة، فيمكنك تحديد العنصر الأول ليكون في <code>grid-area="upper-third"</code> <code>grid-area="lower-third"</code>. <code class="nopad"><pre><amp-story-grid-layer template="thirds">   <h1 grid-area="upper-third">element 1</h1>   <p grid-area="lower-third">element 2</p> </amp-story-grid-layer> </pre></code>
</td>
<td>{{ image('/static/img/docs/tutorials/amp_story/layer-thirds.png', 216, 341) }}</td>
</tr>
</table>

### إكمال صفحة الغلاف الخاصة بنا

الآن بعد أن فهمت نماذج الطبقة، دعنا نكمل الطبقة الثانية لصفحة الغلاف.

بالنسبة للطبقة 2، نريد أن يكون العنوان واسم كاتب الموضوع في الأعلى، ونريد أن تتبع العناصر واحدة تلو الأخرى، لذلك سنحدد النموذج `vertical`. ويتبع `amp-story-grid-layer` الأول، على النحو التالي:

```html
<amp-story-grid-layer>
  <!--our first layer -->
</amp-story-grid-layer>
<amp-story-grid-layer template="vertical">
  <h1>The Joy of Pets</h1>
  <p>By AMP Tutorials</p>
</amp-story-grid-layer>
```

قم بتحديث متصفحك وراجع عملك، فقد اكتملت صفحة الغلاف الخاصة بنا.

{{ image('/static/img/docs/tutorials/amp_story/pg0_cover.png', 720, 1280, align='center third', alt='Completed cover page' ) }}
