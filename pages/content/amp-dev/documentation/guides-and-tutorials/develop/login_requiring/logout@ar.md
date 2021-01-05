---
"$title": تسجيل الخروج
"$order": '3'
description: على نحو مشابه لزر تسجيل الدخول، يعتمد وجود زر تسجيل الخروج بشكل مشروط على حالة المكون amp-access ...
---

على نحو مشابه لتسجيل الدخول، يعتمد وجود زر تسجيل الخروج بشكل مشروط على حالة المكون [`amp-access`](../../../../documentation/components/reference/amp-access.md):

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

عندما تنقر فوق زر تسجيل الخروج، يتم إعادة توجيهك إلى عنوان URL الذي قمت بتحديده في تكوين JSON [`amp-access`](../../../../documentation/components/reference/amp-access.md) كجزء من كائن تسجيل الدخول:

[sourcecode:json]
{
"login": {
  "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
  "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
  }
}
[/sourcecode]

ومثل تسجيل الدخول، عند تلقي خادم the AMPByExample طلب تسجيل خروج، فإنه يستخدم معلمة استعلام عنوان URL للإرجاع التي تمت إضافتها تلقائيًا بواسطة مكتبة AMP وإعادة التوجيه إليها، مع إضافة `#success=true`. وبحلول ذلك الوقت، ستعود إلى الصفحة الأولى؛ وسيتم مسح ملف تعريف الارتباط AMPByExample الذي تم إنشاؤه مسبقًا لصفحة تسجيل الدخول (يسمى `ABE_LOGGED_IN`) في هذه المرحلة.
