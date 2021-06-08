---
$title: amp-youtube
$category@: media
formats:
  - websites
  - ads
teaser:
  text: Displays a YouTube video.
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


يعرض المكّوِن فيديو [YouTube](https://www.youtube.com/).

<table>
  <tr>
    <td width="40%"><strong>النص البرمجي المطلوب</strong></td>
    <td><code>&lt;script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">التنسيقات المعتمدة</a></strong></td>
    <td>fill وfixed وfixed-height وflex-item وnodisplay وresponsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>أمثلة</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-youtube/">مثال توضيحي لترميز amp-youtube</a></td>
  </tr>
</table>


[جدول المحتويات]

## مثال <a name="example"></a>

باستخدام التنسيق المتجاوب، يجب أن يوفر العرض والارتفاع الواردين في المثال تنسيقات مناسبة للفيديوهات التي تبلغ نسبة العرض إلى الارتفاع لها 9:16:

```html
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270"></amp-youtube>
```

```html
<amp-youtube
    id="myLiveChannel"
    data-live-channelid="UCB8Kb4pxYzsDsHxzBfnid4Q"
    width="358"
    height="204"
    layout="responsive">
  <amp-img
    src="https://i.ytimg.com/vi/Wm1fWz-7nLQ/hqdefault_live.jpg"
    placeholder
    layout="fill"
    />
</amp-youtube>
```

## السمات <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>autoplay</strong></td>
    <td>في حالة توفّر هذه السمة، وإتاحة المتصفح التشغيل التلقائي:
      <ul>
        <li>يتم كتم صوت الفيديو تلقائيًا قبل بدء التشغيل التلقائي.
        </li>
        <li>عند تمرير الفيديو بعيدًا عن منطقة المشاهدة، يتم إيقاف الفيديو مؤقتًا.
        </li>
        <li>عند تمرير الفيديو إلى منطقة المشاهدة، يستأنف الفيديو التشغيل.
        </li>
        <li>عند نقر المستخدم على الفيديو، تتم إعادة صوت الفيديو.
        </li>
        <li>إذا تفاعل المستخدِم مع الفيديو (مثل كتم صوته/إعادة صوته أو إيقافه مؤقتًا/استئنافه وغير ذلك)، وتم تمرير الفيديو إلى منطقة المشاهدة أو بعيدًا عنها، تظل حالة الفيديو كما تركها المستخدِم. إذا أوقف مثلاً المستخدِم الفيديو مؤقتًا ثم مرره بعيدًا عن منطقة المشاهدة ثم عاد إلى الفيديو، سيجده قيد الإيقاف المؤقت.
        </li>
      </ul></td>
  </tr>
  <tr>
    <td width="40%"><strong>data-videoid</strong></td>
    <td>هذه السمة هي معرّف فيديو YouTube الذي يوجد في عنوان URL لصفحة كل فيديو من فيديوهات YouTube.
      في عنوان URL هذا مثلاً: https://www.youtube.com/watch?v=Z1q71gFeRqM، معرّف الفيديو هو <code>Z1q71gFeRqM</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-live-channelid</strong></td>
    <td>هذه السمة هي معرّف قناة YouTube الذي يوفر عنوان URL مستقرًا للبث المباشر. في عنوان URL هذا مثلا: https://www.youtube.com/embed/live_stream?channel=UCB8Kb4pxYzsDsHxzBfnid4Q، معرّف القناة هو <code>UCB8Kb4pxYzsDsHxzBfnid4Q</code>. يمكن توفير <code>data-live-channelid</code> بدلاً من السمة <code>data-videoid</code> لتضمين عنوان URL مستقر للبث المباشر بدلاً من الفيديو. ولا تكون للقناة عناصر نائبة تلقائية بل يمكنك إضافتها إلى الفيديو كما في المثال 2 أعلاه.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-param-*</strong></td>
    <td>ستتم إضافة جميع السمات <code>data-param-*</code> كمعامِل طلب بحث إلى السمة src لإطار iframe في YouTube. يمكن استخدام هذا لتمرير قيم مخصصة إلى مكونات YouTube الإضافية، مثل إظهار عناصر التحكم من عدمه.
      سيتم ترميز معرّف الموارد المنتظم للمفاتيح والقيم. وستتم كتابة المفاتيح بطريقة camelCase.
      <ul>
        <li><code>data-param-controls=1</code> تصبح <code>&amp;controls=1</code></li>
      </ul>
      يمكنك الاطّلاع على <a href="https://developers.google.com/youtube/player_parameters">معلَمات مُشغِلات YouTube المضمَّنة</a> لمعرفة المزيد من خيارات المعلَمات لبرنامج YouTube.
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>dock</strong></td>
    <td><strong>تتطلب هذه السمة الإضافة <code>amp-video-docking</code>.</strong> في حال توفّر هذه السمة وتشغيل الفيديو يدويًا، سيتم "تصغير" الفيديو وتثبيته في زاوية أو عنصر عند تمرير المستخدم إلى خارج المنطقة المرئية لمكّوِن الفيديو.
      لمزيد من التفاصيل، راجع <a href="amp-video-docking.md">المستندات المتعلقة بإضافة الإرساء نفسها</a>.</td>
  </tr>
  <tr>
    <td width="40%"><strong>credentials (اختيارية)</strong></td>
    <td>تعرِّف هذه السمة خيار <code>credentials</code> بالشكل الذي تحدده <a href="https://fetch.spec.whatwg.org/">واجهة برمجة التطبيقات للجلب</a>.
      <ul>
        <li>القيم المعتمدة: <code>omit</code> و<code>include</code></li>
        <li>القيمة التلقائية: <code>include</code></li>
      </ul>
      إذا أردت استخدام <a href="http://www.google.com/support/youtube/bin/answer.py?answer=141046">مشغل YouTube في وضع تحسين الخصوصية</a>، اختَر القيمة <code>omit</code>.
      عادةً ما يعمل YouTube على تعيين ملفات تعريف الارتباط له عند تحميل المُشغِل. في وضع تحسين الخصوصية، يتم تعيين ملفات تعريف الارتباط عندما ينقر المستخدِم على المُشغِل.</td>
  </tr>
  <tr>
    <td width="40%"><strong>السمات المشتركة</strong></td>
    <td>يتضمن هذا العنصر <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">السمات المشتركة</a> التي تشمل مكونات AMP.</td>
  </tr>
</table>



## التحقق <a name="validation"></a>

اطّلِع على [قواعد amp-youtube](https://github.com/ampproject/amphtml/blob/main/extensions/amp-youtube/validator-amp-youtube.protoascii) في مواصفات مدقق AMP.
