---
"$title": أفضل ممارسات AMP للبريد الإلكتروني
"$order": '1'
"$category": Develop
formats:
- email
---

تسمح AMP بأنواع ممتعة جديدة من المحتويات التفاعلية والمستحوذة في البريد الإلكتروني! وعند تصميم رسائل إلكترونية، ضع في اعتبار أفضل الممارسات التالية لضمان تحقيق أفضل أداء وموثوقية عبر كافة المنصات، وضمان أنها تلبي توقعات المستخدمين التابعين لك.

#السرعة

عند استخدام [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email) لجلب المحتوى ديناميكيًا، قم بتضمين عنصر نائب للمحافظة على سلامة بنية المكونات. يجب أن يكون العنصر النائب متشابهًا قدر الإمكان مع مخطط المستند بعد أن يرجع البيانات المطلوبة. وهذا يضمن أن حجم الرسالة لا يغير أو يعدل المخطط بصورة كبيرة.

#قابلية الاستخدام والوصول

- عند استخدام [`amp-carousel`](../../components/reference/amp-carousel-v0.1.md?format=email)، تأكد من أنه تم تعيين سمة `controls`. يتيح هذا الأمر للمستخدم الذي يستعمل أجهزة بشاشة لمس مثل الهواتف الذكية التنقل عبر العرض الدوار.
- عند استخدام [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email)، ضع في اعتبارك أنه لا يتم دعم جميع أنواع الإدخال على نظام iOS. راجع [قيم الإدخال المدعومة في ](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/InputTypes.html) مرجع Safari HTML لمزيد من المعلومات.
- لا يتم دعم جميع قيم [`autocomplete` للسمة](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) عبر التطبيقات والمتصفحات المختلفة. افترض أن الاستكمال التلقائي غير متوفر للمستخدمين وحافظ على جعل النماذج قصيرة.

#النمط

- تأكد أن البريد الإلكتروني الخاص بك يستخدم فقط [CSS المدعوم بـ AMP للبريد الإلكتروني](../learn/email-spec/amp-email-css.md?format=email)
- تجنب استخدام وحدات منفذ العرض (`vw` و `vh` و`vmin` و`vmax`) في أي مكان في CSS وHTML. نظرًا لأن رسائل AMP الإلكترونية تظهر داخل iframe، فإن منفذ عرض البريد الإلكتروني لا يطابق منفذ عرض المتصفح.
- تتضمن المتصفحات المختلفة أنماط CSS افتراضية مختلفة. استخدم إحدى مكتبات CSS التي تعمل على تسوية الأنماط إذا لزم الأمر. لمزيد من المعلومات حول الأنماط الافتراضية، وتسوية النمط وقائمة المكتبات المتوفرة، راجع [إعادة التمهيد وإعادة الضبط والاستنباط](https://css-tricks.com/reboot-resets-reasoning/).
- توخ الحذر بشأن الهامش المتجاوز في CSS: قد لا يتم إظهاره بسبب [قيود المخطط في AMP](https://github.com/ampproject/amphtml/issues/13343#issuecomment-447380241).

##التشغيل على الأجهزة المحمولة

تأكد أن رسالتك تظهر جيدة على كافة أحجام الشاشات باستخدام [استعلامات وسائط CSS](style_and_layout/control_layout.md?format=email) للتعرف على الجهاز. يجب اختبار الرسائل على الأجهزة المحمولة لضمان أن النمط صحيح والمكونات تعمل كما هو متوقع.

#الأمور المخادعة الأخرى

عند التعامل مع AMP للبريد الإلكتروني، ضع في اعتبارك النصائح والحيل التالية:

- ساحة AMP للبريد الإلكتروني لا تفوض XHRs، ولكن بعض موفري خدمة البريد الإلكتروني يفعلون ذلك.
- يجب أن يظهر جزء AMP MIME قبل جزء HTML MIME في بريدك الإلكتروني لضمان أقصى توافق عبر كافة عملاء البريد الإلكتروني.
- لا يمكن تعديل سمة `src` لـ [`amp-list`](../../../documentation/components/reference/amp-list.md?format=email) أو سمة [`action-xhr`](../../../documentation/components/reference/amp-form.md?format=email#action-xhr) لـ [`amp-form`](../../../documentation/components/reference/amp-form.md?format=email)، أو سمة `src` لـ [`amp-img`](../../../documentation/examples/documentation/amp-img.html?format=email) أو سمة href لعلامة `<a>` بواسطة [`amp-bind`](../../../documentation/examples/documentation/amp-bind.html?format=email).
- يجب أن تتضمن رسائلك إصدار HTML ثابت في حالة أخذ المستخدم إلى إصدار HTML للرسالة أو قام المستخدم بإعادة توجيه الرسالة.
