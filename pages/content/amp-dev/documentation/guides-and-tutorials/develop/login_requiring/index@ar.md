---
'$title': إنشاء صفحة AMP تتطلب تسجيل الدخول
$order: 0
description: قد تكون بعض تفاعلات المستخدم مع الصفحة، مثل ترك تعليق، مشروطة بتدفق تسجيل الدخول. يمكنك تنفيذ تدفق تسجيل الدخول ...
numbered: '1'
'$hidden': 'true'
formats:
  - websites
---

قد تكون بعض تفاعلات المستخدم مع الصفحة، مثل ترك تعليق، مشروطة بتدفق تسجيل الدخول. يمكنك تنفيذ تدفق تسجيل الدخول مع AMP عن طريق استخدام المكون [`amp-access`](../../../../documentation/components/reference/amp-access.md) جنبًا إلى جنب مع المكون [`amp-form`](../../../../documentation/components/reference/amp-form.md).

[tip type="tip"] **تلميح–** لرؤية نموذج التنفيذ، زر [نموذج قسم التعليق](../../../../documentation/examples/documentation/Comment_Section.html) في [ampbyexample.com](../../../../documentation/examples/index.html). [/tip]

يجمع [نموذج قسم التعليق](../../../../documentation/examples/documentation/Comment_Section.html) بين [`amp-access`](../../../../documentation/components/reference/amp-access.md) و[`amp-form`](../../../../documentation/components/reference/amp-form.md) لإنشاء قسم تعليق يتم تمكينه فقط عندما يقوم المستخدم بتسجيل الدخول. من أجل شرح طريقة عمل هذا النموذج، دعنا نتبع مجموعة الإجراءات التي سيتم تنفيذها بمجرد وصولك إلى الصفحة.
