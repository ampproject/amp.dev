---
"$title": "{code0}co{/code0}: تعليق"
"$order": '2'
description: يمكن للمستخدم في هذه المرحلة إضافة تعليق باستخدام amp-form، المكتبة. لاحظ كيف أن وجود النموذج مشروط، وذلك اعتمادًا على حالة المكون amp-access ...
---

<amp-img src="/static/img/comment.png" alt="Add comment" height="325" width="300"></amp-img>

يمكن للمستخدم في هذه المرحلة إضافة تعليق باستخدام المكتبة [`amp-form`](../../../../documentation/components/reference/amp-form.md). لاحظ كيف أن وجود النموذج مشروط، وذلك اعتمادًا على حالة المكون [`amp-access`](../../../../documentation/components/reference/amp-access.md):

[sourcecode:html]
<form amp-access="loggedIn" amp-access-hide method="post" action-xhr="<%host%>/samples_templates/comment_section/submit-comment-xhr" target="_top">
[/sourcecode]

إننا نحدد طريقة POST وإجراء XHR، لأنه لا يتم السماح بإجراءات غير XHR مع طرق POST في AMP. ونظرًا لأن هذا عرض توضيحي، فنحن لا نواصل التعليقات، لذلك من الممكن فقط إضافة تعليق واحد في ذلك الوقت؛ كلما تمت إضافة تعليق، يرد خادم AMPByExample باستجابة JSON تحتوي على النص المُدخل مع بعض الإضافات، مثل الطابع الزمني والصورة الرمزية واسم للمستخدم.

إليك مثال على استجابة JSON:

[sourcecode:json]
{"Datetime":"09:34:21",
"User":"Charlie",
"Text":"Hello!",
"UserImg":"/img/ic_account_box_black_48dp_1x.png"}
[/sourcecode]

سيعرض مكون النموذج هذه القيم داخل الصفحة ببساطة باستخدام قالب [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md):

[sourcecode:html]
<div submit-success>
  <template type="amp-mustache">
    <div class="comment-user">
      <amp-img width="44" class="user-avatar" height="44" alt="user" src="{{UserImg}}"></amp-img>
      <div class="card comment">
        <p><span class="user">{% raw %}{{User}}{% endraw %}</span><span class="date">{% raw %}{{Datetime}}{% endraw %}</span></p>
        <p>{% raw %}{{Text}}{% endraw %}</p>
      </div>
    </div>
  </template>
</div>
[/sourcecode]

في هذا المثال، نتحقق فقط من أن قيمة التعليق ليست فارغة؛ وإذا كانت القيمة فارغة، فإننا نقوم بإرجاع خطأ من شأنه أن يؤدي إلى تنفيذ الرمز التالي

[sourcecode:html]
<div submit-error>
  <template type="amp-mustache">
    Error! Looks like something went wrong with your comment, please try to submit it again.
  </template>
</div>
[/sourcecode]

وكلمسة إضافية، فإننا نضيف السمة `required` لفرض وجود نص التعليق قبل إرسال التعليق:

<amp-img src="/static/img/enforce-comment.png" alt="Enforce comment" height="325" width="300"></amp-img>

[sourcecode:html]
<input type="text" class="data-input" name="text" placeholder="Your comment..." required>
[/sourcecode]

عندما تضيف تعليقًا وتنقر فوق زر الإرسال، يجب أن ترى الآن شيئًا مشابهًا للقطة الشاشة التالية:

<amp-img src="/static/img/logout-button.png" alt="Comment added" height="352" width="300"></amp-img>
