---
'$title': إضافة المزيد من الصفحات
$order: 5
description: الآن بعد أن ألِفت إضافة صفحة إلى قصة ويب، فإن إضافة الصفحات التالية في قصة "The Joy of Pets" مماثلة للغاية.
author: bpaduch
---

Now that you are familiar with adding a page to a Web Story, adding the next pages in our "The Joy of Pets" story is very similar. Based on the information provided below, **go ahead and create the remaining pages** by using what you've learned so far. If you get stuck, look at the completed (<a href="https://github.com/ampproject/amp.dev/blob/legacy-master/tutorial_source/amp-pets-story/pets-completed.html">pets-completed.html</a>) code.

[tip type="tip"] **ملحوظة –** تذكر أن كل صفحة تحتاج إلى سمة "معرِّف" فريدة (على سبيل المثال، `id="page1"`). [/tip]

## الصفحة 1: القطط

توضح طريقة عرض صورة ونص في طبقة واحدة.

<table class="noborder pages">
  <tr>
    <td width="60%">
      <ul>
        <li>تحتوي على طبقة واحدة: <ul> <li>تطبِّق النموذج <a href="create_cover_page.md#vertical"><code>vertical</code></a>.</li> <li>تتضمن 3 عناصر: <ul> <li>عنصر <code><h1></code> بالاسم: <em>قطط</em> </li> <li> <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">cat.jpg</code>، 720 x 1280 بكسل) سريعة الاستجابة</li> <li>عنصر <code></code> للاقتباس التالي: <em>تجري الكلاب نحوك عند استدعائها. فيما تتلقى القطط رسالة وتعود إليك. --Mary Bly</em> </li>           </ul>         </li>       </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg1-cats.png', 720, 1280, alt='Page 1 - Cats' ) }}</td>
  </tr>
</table>

## الصفحة 2: الكلاب

توضح طريقة ترتيب النص وعرض صورة ملء الشاشة بطبقتين.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
        <li>تحتوي على طبقتين: <ul> <li> <b>الطبقة 1</b>: تطبِّق النموذج <a href="create_cover_page.md#fill"><code>fill</code></a> وتتضمن <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">dog.jpg</code>, 720 x 1280 بكسل) سريعة الاستجابة.</li> <li> <b>الطبقة 2</b>: تطبِّق النموذج <a href="create_cover_page.md#thirds"><code>thirds</code></a> وتحتوي على عنصرين: <ul> <li>عنصر <code><h1></code> بالاسم: <em>كلاب</em> </li> <li>وعنصر <code><br></code> الذي يحدد <a><code>grid-area</code></a> التي تحتل <a><code>lower-third</code></a> وتتضمن النص التالي: <em>ربما كانت الكلاب هي الحيوانات المروضة الأولى. لقد رافقوا البشر منذ حوالي 10000 عام. ويؤكد بعض العلماء أن جميع الكلاب، المنزلية منها والبرية، تتشارك أسلاف مشتركة من ذئب جنوب آسيا الصغير.</em> </li>           </ul>         </li>       </ul>
</li>
</ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg2-dogs.png', 720, 1280, alt='Page 2 - Dogs' ) }}</td>
  </tr>
</table>

## الصفحة 3: الطيور

توضح طريقة ترتيب النص وعرض صورة ملء الشاشة وتوفير صوت خلفية للصفحة.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>تحتوي على 3 طبقات:       <ul>         <li> <b>الطبقة 1</b>: تطبِّق قالب <a href="create_cover_page.md#fill"><code>fill</code></a> وتتضمن <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> (<code class="filename">bird.jpg</code>, 720 x 1280 بكسل).</li>         <li> <b>الطبقة 2</b>  تطبِّق القالب <a href="create_cover_page.md#vertical"><code>vertical</code></a> وتتضمن:           <ul>             <li>عنصر <code><h1></code> بالاسم: <em>طيور</em> </li>           </ul>         </li>         <li> <b>الطبقة 3</b>:  تطبِّق القالب <a href="create_cover_page.md#vertical"><code>vertical</code></a> وتحتوي على عنصر واحد:           <ul>             <li>عنصر <code><q></code> للاقتباس التالي: <em>يتكون الطائر عبارة عن ثلاثة أشياء: الريش، والطيران، والغناء؛ أقلها الريش.--Marjorie Allen Seiffert</em> </li>             <li>تحدد الطبقة الثالثة هذه <code>class="bottom"</code> لمحاذاة العناصر التابعة في الجزء السفلي من الشاشة.</li>           </ul>         </li>       </ul>
</li>
      <li>تشغِّل ملفًا صوتيًا في الخلفية أثناء عرض الصفحة. ويمكنك تشغيل الصوت في الخلفية للقصة بأكملها أو لصفحة واحدة. لتشغيل ملف صوتي لصفحة، أضف السمة <code>background-audio="assets/bird-singing.mp3"</code> إلى العنصر <code>&lt;amp-story-page></code>.</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg3-birds.png', 720, 1280, alt='Page 3 - Birds' ) }}</td>
  </tr>
</table>

## الصفحة 4: الأرانب

Demonstrates how to arrange text and display a screen-filling video for the page.

<table class="noborder">
  <tr>
    <td width="60%">
      <ul>
      <li>تحتوي على 3 طبقات:       <ul>         <li> <b>الطبقة 1</b>: تطبِّق النموذج <code>fill</code> وتتضمن <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> (<code class="filename">rabbit.mp4</code>) سريع الاستجابة.           <ul>             <li>تذكر إضافة <strong>النص البرمجي المطلوب</strong> لمكون <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a> في قسم <code></code> الخاص بك ليتسنى ظهور الفيديو.</li>             <li>حدد صورة <code>poster</code> (<code class="filename">rabbit.jpg</code>). هذه السمة <strong>مطلوبة</strong> للحصول على قصص AMP صالحة.</li>             <li>قم بتعيين ليعمل تلقائيًا باستخدام السمة <code>autoplay</code>. هذه السمة <strong>مطلوبة</strong> للحصول على قصص AMP صالحة.</li>             <li>قم بتعيين الفيديو ليعمل تلقائيًا مرة أخرى على نحو متواصل باستخدام السمة <code>loop</code>.</li>             <li>قم بتعيين الأبعاد إلى <code>width="720"</code> <code>height="1280"</code> <code>layout="responsive"</code>.</li>           </ul> </li>         <li> <b>الطبقة 2</b>  تطبِّق النموذج <code>vertical</code> وتتضمن:           <ul>             <li>عنصر <code><h1></code> بالاسم: <em>أرانب</em> </li>           </ul>         </li>         <li> <b>الطبقة 3</b>:  تطبِّق النموذج <code>vertical</code> وتتضمن عنصرًا واحدًا:           <ul>             <li>عنصر <code><p></code> يحتوي على النص التالي: <em>يمكن للأرانب أن تتعلم اتباع الأوامر الصوتية البسيطة وأن تجري نحوك عند مناداتها بالاسم وتكون فضولية ومرحة</em>.</li>             <li>طبِّق فئة CSS <code>bottom</code> على الطبقة لمحاذاة العناصر التابعة في الجزء السفلي من الشاشة.</li>           </ul>         </li> </ul>
</li>
      </ul>
    </td>
    <td>{{ image('/static/img/docs/tutorials/amp_story/pg4-rabbits.png', 720, 1280, alt='Page 4 - Rabbits' ) }}</td>
  </tr>
</table>

Our "Joy of Pets" story is nearly complete. We'll use animations in our last page to bring all the pets together.
