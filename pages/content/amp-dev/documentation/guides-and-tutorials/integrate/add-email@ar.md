---
"$title": إضافة AMP إلى الرسائل الإلكترونية الموجودة
"$order": '1'
author: CrystalOnScript
formats:
- email
---

يتم تضمين تنسيق AMP للبريد الإلكتروني كجزء MIME جديد. وإذا تم إرسال البريد الإلكتروني الخاص بك إلى موفر خدمة يدعم AMP للبريد الإلكتروني، فسوف يتم عرضه - وإذا كان لا يدعمه، فلا تقلق! سوف يعرض موفر الخدمة رمز HTML الخاص بك أو احتياطي نص عادي. استخدم هذا الدليل لتضمين AMP في الرسائل الإلكترونية الخاصة بك.

# تضمين جزء AMP MIME

يتم بناء البريد الإلكتروني كـ [شجرة MIME](https://en.wikipedia.org/wiki/MIME)، والتي تحتوي على نص رسالة البريد الإلكتروني وأي مرفقات. لتضمين AMP في رسائلك الإلكترونية، سوف تحتاج إلى إضافة جزء MIME بنوع محتوى `text/x-amp-html`.

يجب إدراج جزء AMP MIME part تحت عقدة `multipart/alternative` ويجب أن يتعايش مع أجزاء `text/html` أو `text/plain` الموجودة. وهذا لضمان أن تظهر رسالة البريد الإلكتروني على كافة العملاء.

```html
From:  Person A <persona@example.com>
To: Person B <personb@example.com>
Subject: An AMP email!
Content-Type: multipart/alternative; boundary="001a114634ac3555ae05525685ae"

--001a114634ac3555ae05525685ae
Content-Type: text/plain; charset="UTF-8"; format=flowed; delsp=yes

Hello World in plain text!

--001a114634ac3555ae05525685ae
Content-Type: text/x-amp-html; charset="UTF-8"

<!doctype html>
<html ⚡4email data-css-strict>
<head>
  <meta charset="utf-8">
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
<body>
Hello World in AMP!
</body>
</html>
--001a114634ac3555ae05525685ae--
Content-Type: text/html; charset="UTF-8"

<span>Hello World in HTML!</span>
--001a114634ac3555ae05525685ae
```

[tip type="important"] يعرض بعض عملاء البريد الإلكتروني جزء MIME الأخير فقط. لضمان عرض البريد الإلكتروني، ضع جزء MIME التالي `text/x-amp-html` قبل جزء MIME `text/html`. [/tip]

# ماذا يحدث عندما يقوم مستلمو البريد بإعادة توجيه رسالة AMP الإلكترونية أو الرد عليها؟

عندما يقوم أحد المستخدمين بإعادة توجيه رسالة AMP إلكترونية أو الرد عليها، تتم إزالة جزء `text/x-amp-html` من شجرة MIME. لهذا السبب من المهم توفير محتوى بديل في جزء HTML، حتى في حالة إرسال رسائل AMP الإلكترونية إلى عملاء يدعمون النوع MIME.
