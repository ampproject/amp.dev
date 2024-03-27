---
'$title': التنقل في موقعك
$order: 5
description: تحتوي معظم مواقع الويب عبر المحمول على قائمة للتنقل في الموقع. يمكن أن تأخذ هذه القوائم العديد من الأشكال المختلفة. في هذا البرنامج التعليمي سوف نجرب الأمثلة التالية عن ...
---

تحتوي معظم مواقع الويب عبر المحمول على قائمة للتنقل في الموقع. يمكن أن تأخذ هذه القوائم العديد من الأشكال المختلفة. في هذا البرنامج التعليمي سوف نجرب الأمثلة التالية عن تقديم التنقل في صفحات AMP:

- رابط الرجوع إلى صفحتك الرئيسية - الخيار الأبسط.
- شريط تنقل جانبي باستخدام المكون [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md).

## رابط الرجوع إلى الصفحة الرئيسية

أبسط طريقة لتمكين المستخدمين من الوصول إلى خيارات التنقل العادية لموقع الويب هو توجيههم للرجوع إلى الصفحة الرئيسية الخاصة بك!

جرب **استبدال** علامة `<header>` الخاصة بك بهذا الإصدار الذي يشتمل على ارتباط:

```html
<header class="headerbar">
  <a href="homepage.html">
    <amp-img
      class="home-button"
      src="icons/home.png"
      width="36"
      height="36"
    ></amp-img>
  </a>
  <div class="site-name">News Site</div>
</header>
```

ثم **أضف** قواعد النمط هذه إلى CSS المدمج لديك:

```css
.home-button {
  margin-top: 8px;
}
.headerbar {
  height: 50px;
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
}
.site-name {
  margin: auto;
}
article {
  margin-top: 50px;
}
```

الآن قم **بتحديث** الصفحة. يجب أن تشاهد ارتباطًا في الزاوية العلوية اليسرى للصفحة تشير إلى `homepage.html`. إذا قمت بالنقر فوق رمز الصفحة الرئيسية، سوف تكتشف سريعًا أنه لا يؤدي إلى أي مكان (نظرًا لأنه ليس لدينا ملف `homepage.html`).

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-home.png', 412, 190, align='center half', caption='التنقل برمز الصفحة الرئيسية') }}

يمكن استبدال هذا الارتباط بعنوان URL للصفحة الرئيسية لموقعك للسماح للمستخدمين بالتنقل إلى الأجزاء الأخرى من موقعك باستخدام التنقل الموجود لموقعك.

هذا هو النهج الأبسط للاستفادة من التنقل الموجود بموقعك. بعد ذلك، سوف نكتشف خيارًا مشهورًا للتنقل في الموقع.

## التنقل بشريط جانبي

من الأساليب الشائعة للتنقل إضافة رمز قائمة والذي يكشف عند النقر فوقه مجموعة من ارتباطات التنقل (من جانب الصفحة). في AMP، يمكننا إنشاء مثل هذا التنقل باستخدام المكون [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md).

أولا، يجب علينا أن **نضيف** JavaScript الخاص بالمكون [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) إلى العلامة `<head>` tag:

```html
<script
  async
  custom-element="amp-sidebar"
  src="https://ampjs.org/v0/amp-sidebar-0.1.js"
></script>
```

بعد ذلك، نريد أن نعرض رمز القائمة. عند الضغط على الرمز، سوف يفتح الشريط الجانبي. **استبدل** العلامة `<header>` بالرمز التالي لعرض رمز ["هامبورجر"](https://en.wikipedia.org/wiki/Hamburger_button) بدلا من رمز الصفحة الرئيسية:

```html
<header class="headerbar">
  <div role="button" on="tap:sidebar1.toggle" tabindex="0" class="hamburger">
    ☰
  </div>
  <div class="site-name">News Site</div>
</header>
```

في الرمز السابق، قمنا بتبديل `toggle` الشريط الجانبي عن طريق سمة الإجراء [`on`](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) في العنصر [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md)، والذي يتم تحديده بواسطة المعرف `sidebar1`. هيا نضيف الشريط الجانبي.

**أضف** رمز HTML التالي مباشرة بعد `</header>`:

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="left">
  <div
    role="button"
    aria-label="close sidebar"
    on="tap:sidebar1.toggle"
    tabindex="0"
    class="close-sidebar"
  >
    ✕
  </div>
  <ul class="sidebar">
    <li><a href="#">Example 1</a></li>
    <li><a href="#">Example 2</a></li>
    <li><a href="#">Example 3</a></li>
  </ul>
</amp-sidebar>
```

سوف يكون الشريط الجانبي الخاص بنا مخفيًا، ولكن عندما يضغط المستخدم في رمز الهامبورجر، سوف تظهر النافذة من جانب الشاشة. لإغلاق القائمة، يمكن للمستخدم الضغط على رمز X.

في النهاية، **أضف** قواعد الأنماط هذه إلى CSS المدمج لديك:

```css
.hamburger {
  padding-left: 10px;
}
.sidebar {
  padding: 10px;
  margin: 0;
}
.sidebar > li {
  list-style: none;
  margin-bottom: 10px;
}
.sidebar a {
  text-decoration: none;
}
.close-sidebar {
  font-size: 1.5em;
  padding-left: 5px;
}
```

حسنا، هيا نشاهد الشريط الجانبي. قم **بتحديث** وإعادة تحميل صفحة AMP الخاصة بك. يجب أن تشاهد شيئًا كالتالي:

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-sidebar.gif', 412, 384, align='center half', caption='التنقل بقائمة شريط جانبي') }}

الصفحة الخاصة بنا تبدو رائعة! هيا نضيف لمسة —خط مخصص.
