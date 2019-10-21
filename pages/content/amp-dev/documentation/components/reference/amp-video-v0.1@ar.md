---
$title: amp-video
$category@: media
formats:
  - websites
  - ads
  - stories
teaser:
  text: Replaces the HTML5 video tag.
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



[جدول المحتويات]

بديل لعلامة `video` للغة HTML5، ولا يُستخدم هذا المكوِّن إلا للتضمينات المباشرة لملفات الفيديو HTML5.

<table>
  <tr>
    <td width="40%"><strong>النص البرمجي المطلوب</strong></td>
    <td><code>&lt;script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td width="40%"><strong>أمثلة</strong></td>
    <td>من موقع "AMP بالمثال":<ul>
      <li><a href="https://ampbyexample.com/components/amp-video/">مثال amp-video</a></li>
      <li><a href="https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/">تراكب النقر للتشغيل للمكون amp-video</a></li></ul></td>
    </tr>
    <tr>
      <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">التنسيقات المعتمدة</a></strong></td>
      <td>fill وfixed وfixed-height وflex-item وnodisplay وresponsive</td>
    </tr>
  </table>

## السلوك <a name="behavior"></a>

يعمل المكوِّن `amp-video` على تحميل مورد الفيديو الذي تحدده سمته `src` ببطء في الوقت الذي يحدده وقت التشغيل. يمكنك التحكم في المكوِّن `amp-video` بنفس طريقة التحكم في العلامة `<video>` للغة HTML5 القياسية.

يقبل المكوِّن `amp-video` ما يصل إلى أربعة أنواع فريدة من عُقد HTML كعناصر ثانوية له:

* العلامات `source`: كما هو الحال مع العلامة `<video>` الخاصة باللغة HTML، يمكنك إضافة العناصر الثانوية للعلامة `<source>` لتحديد ملفات وسائط مصدر مختلفة لتشغيلها.
* العلامات `track` لتمكين الترجمة في الفيديو. إذا تمت استضافة المقطع الصوتي على أصل مختلف غير المستند، تجب إضافة السمة `crossorigin` إلى العلامة `<amp-video>`.
* عنصر نائب قبل بدء الفيديو
* عنصر احتياطي في حال عدم عمل فيديو HTML5 على المتصفح: يمكن أن تتضمن أحد عقد العناصر الثانوية المباشرة السمة `fallback` أو لا يتضمن أي منها هذا. عند توفّر السمة، تظهر هذه العقدة وعناصرها الثانوية من المحتوى الذي يتم عرضه إذا كان متصفح المستخدم لا يتيح عمل الفيديو HTML5.

#### مثال <a name="example"></a>

[example preview="inline" playground="true" imports="amp-video"]
```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  layout="responsive"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <source src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.webm"
    type="video/webm" />
  <source src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```
[/example]

## التحليلات <a name="analytics"></a>

يوفر المكوِّن `amp-video` التحليلات بطريقة مبتكرة. ويمكنك الاطّلاع على [تحليلات الفيديو](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-video-analytics.md) للحصول على مزيد من المعلومات.

## السمات <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>هذه السمة مطلوبة في حال توفر عناصر <code>&lt;source&gt;</code> الثانوية. وتجب أن تكون HTTPS.</td>
  </tr>
  <tr>
    <td width="40%"><strong>poster</strong></td>
    <td>يتم عرض صورة للإطار قبل بدء تشغيل الفيديو. ويتم عرض الإطار الأول تلقائيًا.
      <br>
      أو يمكنك تقديم تراكب النقر للتشغيل بدلاً من هذا. للحصول على التفاصيل، راجع قسم <a href="#click-to-play-overlay">تراكب النقر للتشغيل</a> أدناه.</td>
  </tr>
  <tr>
    <td width="40%"><strong>autoplay</strong></td>
    <td>في حال توفّر هذه السمة، وإتاحة المتصفح عمل التشغيل التلقائي، سيتم تشغيل الفيديو تلقائيًا بعد ظهوره. هناك بعض الشروط التي يحتاج إليها المكوِّن ليتم تشغيله <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-video-interface.md#autoplay">وهي موضحة في مواصفات الفيديو في AMP.</a></td>
  </tr>
  <tr>
    <td width="40%"><strong>controls</strong></td>
    <td>هذه السمة شبيهة بالسمة <code>controls</code> في <code>video</code> للغة HTML5. في حالة توفّر هذه السمة، يقدّم المتصفح للمستخدِم عناصر للتحكم في تشغيل الفيديو.</td>
  </tr>
  <tr>
    <td width="40%"><strong>controlsList</strong></td>
    <td>هذه السمة هي نفس السمة <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList">controlsList</a> لعنصر الفيديو HTML5. ولا تتيحها إلا متصفحات معينة. يُرجى الاطّلاع على <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList">https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList</a> للحصول على مزيد من التفاصيل.</td>
  </tr>
  <tr>
    <td width="40%"><strong>dock</strong></td>
    <td><strong>تتطلب هذه السمة الإضافة <code>amp-video-docking</code>.</strong> في حال توفّر هذه السمة وتشغيل الفيديو يدويًا، سيتم "تصغير" الفيديو وتثبيته في زاوية أو عنصر عند تمرير المستخدم إلى خارج المنطقة المرئية لمكّوِن الفيديو.
      لمزيد من التفاصيل، راجع <a href="amp-video-docking.md">المستندات المتعلقة بإضافة الإرساء نفسها</a>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>loop</strong></td>
    <td>في حال توفّر السمة، سيتم تكرار تشغيل الفيديو من بدايته كلما وصل إلى النهاية.</td>
  </tr>
  <tr>
    <td width="40%"><strong>crossorigin</strong></td>
    <td>هذه السمة مطلوبة إذا تمت استضافة مورد <code>track</code> على أصل مختلف عن المستند.</td>
  </tr>
  <tr>
    <td width="40%"><strong>disableremoteplayback</strong></td>
    <td>تحدد هذه السمة إذا ما كان عنصر الوسائط مسموح بأن يكون له واجهة مستخدم للتشغيل عن بُعد، مثل Chromecast أو AirPlay.</td>
  </tr>
  <tr>
    <td width="40%"><strong>muted (deprecated)</strong></td>
    <td>يتم إيقاف السمة <code>muted</code> ولن يعد لها أي تأثير. تتحكم السمة <code>autoplay</code> تلقائيًا في سلوك كتم الصوت.</td>
  </tr>
  <tr>
    <td width="40%"><strong>noaudio</strong></td>
    <td>توضح السمة أن الفيديو ليس له صوت. فهي تؤدي إلى إخفاء رمز معادلة الأصوات الذي يتم عرضه إذا كان للفيديو إمكانية التشغيل التلقائي.</td>
  </tr>
  <tr>
    <td width="40%"><strong>rotate-to-fullscreen</strong></td>
    <td>إذا كان الفيديو مرئيًا، سيتم عرض الفيديو بملء الشاشة بعد تدوير المستخدم جهازه إلى الوضع الأفقي. لمزيد من التفاصيل، <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-video-interface.md#rotate-to-fullscreen">راجع مواصفات الفيديو في AMP</a>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>السمات المشتركة</strong></td>
    <td>يتضمن هذا العنصر <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">السمات المشتركة</a> التي تشمل مكونات AMP.</td>
  </tr>
</table>


## سمات واجهة برمجة التطبيقات لجلسات الوسائط <a name="media-session-api-attributes"></a>

ينفذ المكوِّن `amp-video` [واجهة برمجة التطبيقات لجلسات الوسائط](https://developers.google.com/web/updates/2017/02/media-session)، التي تمكّن مطوّري البرامج من تحديد المزيد من المعلومات عن ملف الفيديو. وتظهر المعلومات الإضافية عن الفيديو في مركز الإشعارات على جهاز المستخدِم (مع عناصر التحكم في التشغيل/الإيقاف المؤقت).

<table>
  <tr>
    <td width="40%"><strong>artwork</strong></td>
    <td>تحدد هذه السمة عنوان URL للصورة PNG/JPG/ICO المعروضة على أنها العمل الفني للفيديو. في حال غياب <code>artwork</code>، يستخدم مساعد "واجهة برمجة التطبيقات لجلسات الوسائط" الحقل <code>image</code> في تعريف <code>schema.org</code>، وهو <code>og:image</code> أو يستخدم <code>favicon</code> للموقع الإلكتروني.</td>
  </tr>
  <tr>
    <td width="40%"><strong>artist</strong></td>
    <td>تشير السمة إلى مؤلف ملف الفيديو، ويتم تحديدها على شكل سلسلة.</td>
  </tr>
  <tr>
    <td width="40%"><strong>album</strong></td>
    <td>تشير السمة إلى الألبوم/المجموعة التي تم أخذ الفيديو منها، ويتم تحديدها على شكل سلسلة.</td>
  </tr>
  <tr>
    <td width="40%"><strong>title</strong></td>
    <td>تشير السمة إلى اسم/عنوان الفيديو، ويتم تحديدها على شكل سلسلة. إذا لم تتوفر السمة، يستخدم مساعد "واجهة برمجة التطبيقات لجلسات الوسائط" السمة <code>aria-label</code> أو يعود إلى عرض عنوان الصفحة.</td>
  </tr>
</table>


مثال:

يحتوي هذا المثال على سمتَي `poster` و`artwork`. تعمل السمة `poster` بمثابة صورة العنصر النائب التي تُعرض قبل تشغيل الفيديو بينما تكون السمة `artwork` الصورة التي تعرضها "واجهة برمجة التطبيقات لجلسات الوسائط" في الإشعار.

```html
<amp-video width="720" height="305" layout="responsive"
  src="https://yourhost.com/videos/myvideo.mp4"
  poster="https://yourhost.com/posters/poster.png"
  artwork="https://yourhost.com/artworks/artwork.png"
  title="Awesome video" artist="Awesome artist"
  album="Amazing album">
</amp-video>
```

## تراكب النقر للتشغيل <a name="click-to-play-overlay"></a>

إن توفير تراكب النقر للتشغيل ميزة شائعة في تجربة المستخدم بالنسبة إلى مشغلات الفيديو على الويب.  يمكنك مثلاً عرض رمز مخصص للتشغيل يمكن للمستخدِم النقر عليه، ويمكنك أيضًا تضمين عنوان الفيديو وصور الملصقات ذات الأحجام المختلفة وغير هذا.  يمكنك بسهولة تنفيذ النقر للتشغيل لأن المكوِّن `amp-video` يتيح عمل الإجراء `play` القياسي في AMP.

للحصول على مثال مُفصّل، يمكنك الانتقال إلى [تراكب النقر للتشغيل للمكّوِن amp-video](https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/) في موقع "AMP بالمثال".

## التحقق <a name="validation"></a>

اطّلع على [قواعد amp-video](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) في مواصفات مدقق AMP.
