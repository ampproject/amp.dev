---
"$title": استخدام عارض AMP لعرض رسائل البريد الإلكتروني
"$order": '5'
author: alabiaga
formats:
- email
---

يجب على عملاء البريد الإلكتروني الذين يتطلعون إلى دعم AMP للبريد الإلكتروني استخدام [عارض AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md) لاستضافة رسائل AMP الإلكترونية للمرسل. إذ يقوم العارض الذي تم إنشاؤه باستخدام [مكتبة عارض AMP](https://github.com/ampproject/amphtml/tree/master/extensions/amp-viewer-integration) بتغليف مستند AMP وتمكين [الإمكانات](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/CAPABILITIES.md) التي تسمح بالاتصال ثنائي الاتجاه مع مستند AMP عبر postMessage. وتتضمن هذه الإمكانات منح التحكم في رؤية البريد الإلكتروني، وترحيل مقاييس المستخدم، وتوفير وسائل لضمان سلامة طلبات XHR المقدمة من البريد الإلكتروني.

## اعتراض عارض XHR

تسمح إمكانية `xhrInterceptor` لمكتبة عارض AMP للعارض باعتراض طلبات XHR الصادرة. ,يمكن لعارض AMP فحص الطلب للتأكد من صحته والغرض منه لضمان حماية مستخدميه وخصوصيتهم.

#### طلبات XHR

تتطلب مكونات AMP، مثل [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) و[`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email)، استدعاءات لنقاط النهاية من أجل نشرها أو استرداد البيانات. ويتم تصنيف هذه الاستدعاءات على أنها طلبات XHR.

#### اتصال العارض ومستند AMP

يتم تحقيق البروتوكول المستخدم للاتصال بين العارض ومستند AMP عبر [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). فيما يلي مثال بسيط حول postMessage وعمله في حالة استخدام اعتراض XHR، حيث يتعامل العارض مع xhr postMessage المرسل من مستند AMP ويقوم بإرجاع استجابة مخصصة.

```js
// The viewer iframe that will host the amp doc.
viewerIframe = document.createElement('iframe');
viewerIframe.contentWindow.onMessage = (xhrRequestIntercepted) => {
   const blob = new Blob([JSON.stringify({body: 'hello'}, null, 2)], {type: 'application/json'});
   const response = new Reponse(blob, {status: 200});
   return response;
};
```

### تمكين اعتراض XHR

مكِّن اعتراض xhr عن طريق قبول العارض في إمكانية xhrInterceptor عند التهيئة. ويرجى الاطلاع على مثال العارض حول طريقة القيام بذلك ومثال على اعتراض xhr. كما يجب اختيار قبول مستند AMP للسماح باعتراض XHR. إذ تُقبَل المستندات عن طريق إضافة السمة `allow-xhr-interception` إلى العلامة `<html amp4email>`. ويجب على عميل البريد الإلكتروني تعيين هذه السمة في مستند AMP قبل عرضها لأنها سمة غير صالحة عن قصد وسيتم وضع علامة عليها على هذا النحو أثناء التحقق من صحة مستند AMP.

```html
<!doctype html>
<html ⚡4email allow-xhr-interception>
  ...
</html>
```

## عرض النموذج من جانب خادم العارض

تسمح الإمكانية  `viewerRenderTemplate` للعارض بإدارة عرض النموذجين [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) و[`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email). وعند تمكينها، يُنشئ وقت تشغيل AMP وكيلًا لطلب يحتوي على استدعاء XHR أصلي وبيانات النموذج وأي تفاصيل أخرى مطلوبة لعرض محتويات المكون إلى العارض. ويسمح هذا للعارض بفحص محتوى بيانات نقطة النهاية وإدارة عرض [mustache](https://mustache.github.io/) للنماذج من أجل التحقق من البيانات واستصحاحها. لاحظ أنه إذا تم تمكين هذه الإمكانية مع xhrInterceptor، في مكون amp-form وamp-list، فإن إمكانية `viewerRenderTemplate` التي تُنشئ الطلبات الوكيلة إلى العارض ستتفوق على قدرة xhrInterceptor.

يوضح المثال [viewer.html](https://github.com/ampproject/amphtml/blob/master/examples/viewer.html) طريقة التعامل مع رسالة `viewerRenderTemplate` المرسلة من مستند AMP. في هذا المثال، يلتقط Viewer.prototype.processRequest_ رسالة `viewerRenderTemplate` واستنادًا إلى نوع مكون amp المتوفر في الطلب، يرسل html مرة أخرى ليتم عرضه بتنسيق JSON التالي.

```js
Viewer.prototype.ssrRenderAmpListTemplate_ = (data) => Promise.resolve({
  "html":
    "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'>"
      + "<div class='product' role='listitem'>Apple</div>"
      + "</div>",
  "body" : "",
  "init" : {
    "headers": {
      "Content-Type": "application/json",
    }
  }
});
```

يعد هذا مثالا بسيطًا حيث لا يوجد تبعية مكتبة [mustache](https://mustache.github.io/) أو تصحاح للمحتوى.

ويوضح الرسم البياني أدناه مثالًا أكثر واقعية عن طريقة تعامل مستند AMP في عارض عميل البريد الإلكتروني مع إمكانية `viewerRenderTemplate` على معالجة عرض النموذج [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email).

<amp-img alt="Viewer render template diagram" layout="responsive" width="372" height="279" src="/static/img/docs/viewer_render_template_diagram.png"></amp-img>

فيما سيعمل وقت تشغيل AMP على إنشاء وكيل لطلب إحضار بيانات المكون [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) للعارض، والذي بدوره سيعيد توجيه هذا الطلب إلى خادم عميل بريد إلكتروني. وسيغذي الخادم عنوان URL هذا ونتائج إحضار عنوان URL من خلال خدمات متنوعة؛ من المحتمل فحص صلاحية عنوان URL ومحتويات البيانات التي يتم إرجاعها من عنوان URL هذا وعرض النموذج [mustache](https://mustache.github.io/) بهذه البيانات. كما سيقوم بإرجاع هذا النموذج الذي تم عرضه بعد ذلك وإرساله مرة أخرى إلى العارض بتنسيق استجابة JSON التالي.

```json
{
  "html": "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'> <div class='product' role='listitem'>List item 1</div> <div class='product' role='listitem'>List item 2</div> </div>",
  "body": "",
  "init" : {
    "headers": {
      "Content-Type": "application/json",
    }
  }
}
```

وستكون قيمة html في تحميل JSON الأساسي عبارة عما يتم إدخاله في مستند AMP للعرض.

ويوضح الجدول أدناه الإمكانات والمكونات المتأثرة:

<table>
  <thead>
    <tr>
      <th width="30%">إمكانية العارض</th>
      <th>المكون المتأثر</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>xhrInterceptor</td>
      <td><code>[amp-form](../../../documentation/components/reference/amp-form.md?format=email), [amp-list](../../../documentation/components/reference/amp-list.md?format=email), [amp-state](https://amp.dev/documentation/components/amp-bind?format=email#initializing-state-with-amp-state)</code></td>
    </tr>
     <tr>
       <td>viewerRenderTemplate</td>
       <td><code>[amp-form](../../../documentation/components/reference/amp-form.md?format=email), [amp-list](../../../documentation/components/reference/amp-list.md?format=email)</code></td>
    </tr>
  </tbody>
</table>
