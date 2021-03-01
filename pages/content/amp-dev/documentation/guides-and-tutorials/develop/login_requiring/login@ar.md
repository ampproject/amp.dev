---
'$title': تسجيل الدخول
$order: 1
description: في المرة الأولى التي تنتقل فيها إلى الصفحة، يمكنك مشاهدة تعليقين وزر تسجيل الدخول. إذا كنت تبحث عن زر تسجيل الدخول في الرمز، فستجد ...
---

في المرة الأولى التي تنتقل فيها إلى [الصفحة](../../../../documentation/examples/previews/Comment_Section.html)، يمكنك مشاهدة تعليقين وزر تسجيل الدخول.

<amp-img src="/static/img/login-button.jpg" alt="Login button" height="290" width="300"></amp-img>

إذا كنت تبحث عن زر تسجيل الدخول في الرمز، فستجد:

[sourcecode:html]
<span amp-access="NOT loggedIn" role="button" tabindex="0" amp-access-hide>

  <h5>Please login to comment</h5>
  <button on="tap:amp-access.login-sign-in" class="button-primary comment-button">Login</button>
</span>
[/sourcecode]

يعتمد سلوك السمات ذات الصلة بـ [`amp-access`](../../../../documentation/components/reference/amp-access.md) على التكوين على مستوى الصفحة لـ [`amp-access`](../../../../documentation/components/reference/amp-access.md)، وفي حالتنا، يكون:

[sourcecode:html]

<script id="amp-access" type="application/json">
  {
    "authorization": "https://ampbyexample.com/samples_templates/comment_section/authorization?rid=READER_ID&url=CANONICAL_URL&ref=DOCUMENT_REFERRER&_=RANDOM",
    "noPingback": "true",
    "login": {
      "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
      "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
    },
    "authorizationFallbackResponse": {
      "error": true,
      "loggedIn": false
    }
  }
</script>

[/sourcecode]

يتم نشر نقطة نهاية التفويض كجزء من AMPByExample. إذ تقع مسؤولية توفير نقطة النهاية هذه على عاتق ناشر الصفحة. في نموذج الحالة هذا، ومن أجل التبسيط؛ قمنا بتنفيذ المنطق الأساسي بحيث يقرأ الخادم عند تلقي هذا الطلب قيمة ملف تعريف الارتباط المسمى `ABE_LOGGED_IN`. وإذا لم يكن ملف تعريف الارتباط موجودًا، فسنقوم بإرجاع استجابة JSON تتضمن `loggedIn = false`. وكنتيجة لذلك، في المرة الأولى التي يهبط فيها المستخدم إلى الصفحة، سيقوم هذا الطلب بإرجاع `loggedIn = false` وسيتم إظهار زر تسجيل الدخول.

بالنظر مرة أخرى لرمز HTML الخاص بالزر، يمكننا عن طريق استخدام `on="tap:amp-access.login-sign-in"` تحديد أنه بمجرد نقر المستخدم فوق الزر، يجب استخدام عنوان URL المحدد في JSON أعلاه:

[sourcecode:json]
{
"login": {
"sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL"
}
}

[/sourcecode]

[tip type="note"] **ملحوظة–** لاحظ أنه من الممكن تحديد عناوين URL مختلفة داخل عقدة تسجيل الدخول، ونقوم في هذه الحالة بتعريف `sign-in`، وفيما بعد نعرِّف `sign-out`. [/tip]

إن صفحة تسجيل الدخول عبارة عن صفحة مطوَّرة بغير AMP نملأ فيها قيم تسجيل الدخول وكلمة المرور تبسيطًا للأمور. لاحظ استخدام نوع الإدخال المخفي `returnURL`، الذي يتم ملؤه عن طريق خادم AMPByExample عبر قوالب من جانب الخادم. ويقرأ الخادم هذه القيمة من معلمة تسمى `return`، فتتم إضافتها تلقائيًا بواسطة مكتبة AMP إلى عنوان URL لتسجيل الدخول.

وفي المثال أدناه، يتم إضافة قيمة المعلمة `return` إلى الطلب بمجرد النقر فوق زر تسجيل الدخول. يمكنك استكشاف هذه القيمة باستخدام وحدة تحكم Chrome DevTools والانتقال إلى علامة تبويب الشبكة.

<amp-img src="/static/img/return-parameter.jpg" alt="Return parameter" height="150" width="600"></amp-img>

وبمجرد أن يتلقى خادم AMPByExample طلب POST من صفحة تسجيل الدخول ويكون كل من اسم المستخدم وكلمة المرور صحيحان، فإنه يعيد توجيه الطلب إلى `returnURL` الذي ذكرناه أعلاه، ويلحق المعلمة `#success=true`. والآن يمكن لوقت تشغيل AMP تفويض الصفحة والسماح لك أخيرًا بإضافة تعليق.

من المهم فهم ما يقوم به وقت تشغيل AMP وما يجب أن يقوم به الخادم، حيث تقع مسؤولية تنفيذ الخادم على عاتق ناشر الصفحة.

تلخيص سريع:

- يضيف وقت تشغيل AMP تلقائيًا معلمة الإرجاع إلى طلب تسجيل الدخول المحدد داخل كائن JSON لتسجيل الدخول
- يغلق وقت تشغيل AMP صفحة تسجيل الدخول ويعيد التوجيه إلى الصفحة المحددة بواسطة معلمة عنوان URL للإرجاع
- يجب أن ينسق الخادم الاستجابة بمجرد نقر المستخدم فوق زر تسجيل الدخول

[tip type="tip"] **تلميح–** يمكن أيضًا العثور على شرح أكثر تفصيلًا حول هذا التدفق في [`amp-access`](../../../../documentation/components/reference/amp-access.md). [/tip]
