---
'$title': إنشاء نهاية قصة
$order: 7
description: الآن بعد أن أضفت جميع صفحاتك، فلنلقِ نظرة على الشاشة الأخيرة من القصة، نهاية القصة. هذه الشاشة الأخيرة تختتم القصة ...
author: bpaduch
---

الآن بعد أن أضفت جميع صفحاتك، فلنلقِ نظرة على الشاشة الأخيرة من القصة، "نهاية القصة". تختتم هذه الشاشة الأخيرة القصة، وتسمح لك بتقديم ميزات المشاركة على وسائل التواصل الاجتماعي وروابط ذات صلة بقصتك، حتى يتمكن المستخدمون من مشاركة قصتك أو التعمق أكثر في محتوى آخر على موقعك.

تأتي المعلومات الموجودة على شاشة لوحة التسجيل من ملف JSON المحدد في العلامة `<amp-story-bookend>`. أما بالنسبة لبرنامجنا التعليمي، لدينا بالفعل ملف JSON ([bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json)) يحتوي على بيانات نهاية القصة.

يجب أن تكون العلامة `<amp-story-bookend>` هي العلامة الأخيرة في [`<amp-story>`](../../../../documentation/components/reference/amp-story.md). لذا، دعنا **نضيف** `<amp-story-bookend></amp-story-bookend>` قبل علامة النهاية [`</amp-story>`](../../../../documentation/components/reference/amp-story.md). وفي العلامة `amp-story-bookend`، أشر إلى السمة `src` للملف `bookend.json` وعيِّن <code>layout="nodisplay"</code>:

```html
  </amp-story-page>
  <amp-story-bookend src="bookend.json" layout="nodisplay"></amp-story-bookend>
</amp-story>
```

إذا قمت بتحديث متصفحك وانتقلت إلى الشاشة الأخيرة، فسترى نهاية القصة التالية:

{{ image('/static/img/docs/tutorials/amp_story/bookend_full.gif', 398, 709, align='center third', alt='Bookend' ) }}

لنلق نظرة على ملف JSON. افتح ملف [bookend.json](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/bookend.json) في محرر النصوص لديك.

تتطلب كل شاشة من شاشات نهاية القصة `bookendVersion`، وهو `v1.0` لهذا البرنامج التعليمي:

```json
"bookendVersion": "v1.0",
```

تسمح أزرار المشاركة على وسائل التواصل الاجتماعي للقراء بمشاركة المحتوى الخاص بك عبر منصات التواصل الاجتماعي، مثل Twitter وFacebook وPinterest وما إلى ذلك. وأنت تحدد موفري المشاركة عبر وسائل التواصل الاجتماعي في كائن shareProviders، وتنشئ مصفوفة تحتوي على [أسماء الأنواع](../../../../documentation/components/reference/amp-social-share.md#pre-configured-providers) لكل منصة من منصات التواصل الاجتماعي.

في هذا البرنامج التعليمي، اخترنا Facebook وTwitter والبريد الإلكتروني لموفري المشاركة لدينا:

```json
"shareProviders": [
  "facebook",
  "twitter",
  "email"
],
```

{{ image('/static/img/docs/tutorials/amp_story/bookend_social_share.png', 720, 240, align='center half', alt='Bookend social share' ) }}

وأما ما تبقى من شاشة نهاية القصة فيكون مخصصًا للمحتوى ذي الصلة. ويتم تضمين جميع المحتويات ذات الصلة في كائن `components`.

هناك العديد من المكونات التي يمكنك استخدامها لعرض المحتوى والروابط ذات الصلة؛ إذ يتم تحديد كل مكون بسمة نوع، لنلقِ نظرة على المكونات المتوفرة:

<table>
<thead><tr>
  <th width="20%">النوع</th>
  <th>الوصف</th>
</tr></thead>
<tbody>
  <tr>
    <td>عنوان</td>
    <td>يسمح لك بتحديد عنوان رئيسي للمقالات المجمعة. <pre class="nopreline">
  {
    "type": "heading",
    "text": "More to read"
  },
  </pre>     <br>     <figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_heading.png" width="720" height="140" layout="responsive" alt="bookend heading"></amp-img>
    </figure></td>
  </tr>
  <tr>
    <td>small</td>
    <td>يسمح لك بربط المقالات ذات الصلة بخيار تضمين صورة صغيرة مقترنة.   <pre class="nopreline">
  {
    "type": "small",
    "title": "Learn about cats",
    "url": "https://wikipedia.org/wiki/Cat",
    "image": "assets/bookend_cats.jpg"
  },
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_small.png" width="720" height="267" layout="responsive" alt="bookend small article"></amp-img>
    </figure></pre>
</td>
  </tr>
  <tr>
    <td>landscape</td>
    <td>يسمح لك بربط المقالات أو محتوى آخر مثل مقاطع الفيديو. أما الصورة المقترنة بهذا النوع فهي أكبر وبتنسيق أفقي.   <pre class="nopreline">
  {
    "type": "landscape",
    "title": "Learn about border collies",
    "url": "https://wikipedia.org/wiki/Border_Collie",
    "image": "assets/bookend_dogs.jpg",
    "category": "Dogs"
  },
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_landscape.png" width="720" height="647" layout="responsive" alt="bookend landscape article"></amp-img>
    </figure></pre>
</td>
  </tr>
  <tr>
    <td>portrait</td>
    <td>يسمح لك بربط القصص أو محتوى آخر. أما الصورة المرتبطة بهذا النوع فهي أكبر وبتنسيق عمودي.   <pre class="nopreline">
  {
    "type": "portrait",
    "title": "Learn about macaws",
    "url": "https://wikipedia.org/wiki/Macaw",
    "image": "assets/bookend_birds.jpg",
    "category": "birds"
  },
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_portrait.png" width="720" height="1018" layout="responsive" alt="bookend portrait article"></amp-img>
    </figure></pre>
</td>
  </tr>
  <tr>
    <td>cta-link</td>
    <td>يسمح لك بتحديد روابط الدعوة إلى اتخاذ إجراء والتي يتم عرضها كأزرار (على سبيل المثال، اقرأ المزيد، اشترك).   <pre class="nopreline">
  {
    "type": "cta-link",
    "links": [
      {
        "text": "Learn more",
        "url": "https://amp.dev/about/stories.html"
      }
    ]
  }
  </pre>     <br>     <pre data-md-type="custom_pre"><figure class="alignment-wrapper half">
      <amp-img src="/static/img/docs/tutorials/amp_story/bookend_cta.png" width="720" height="137" layout="responsive" alt="bookend cta"></amp-img>
    </figure></pre>
</td>
  </tr>
</tbody>
</table>

هناك المزيد للتعرف أكثر على مكون نهاية القصة. للحصول على مزيد من التفاصيل، اطلع على المستندات المرجعية [`amp-story`](../../../../documentation/components/reference/amp-story.md).

قصتنا اكتملت تقريبًا قبل أن نتمكن من نشر المحتوى الخاص بنا، دعنا نتحقق من صلاحية AMP HTML.
