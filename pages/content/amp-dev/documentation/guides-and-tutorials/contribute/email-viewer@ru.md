---
'$title': Использование AMP Viewer для отображения писем
$order: 5
author: alabiaga
formats:
  - email
---

Почтовые клиенты, которые стремятся реализовать поддержку AMP для писем, должны использовать [средство просмотра AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md) в качестве «оболочки» AMP-писем отправителя. Средство просмотра, созданное с помощью [библиотеки AMP Viewer](https://github.com/ampproject/amphtml/tree/master/extensions/amp-viewer-integration), инкапсулирует документ AMP и обеспечивает [возможности](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/CAPABILITIES.md), позволяющие осуществлять двунаправленную связь с документом AMP через postMessage. В числе этих возможностей управление видимостью письма, ретрансляция пользовательских метрик и обеспечение безопасности запросов XHR, сделанных из письма.

## Перехват XHR-запросов с помощью средства просмотра

Предусмотренная в библиотеке AMP Viewer возможность `xhrInterceptor` позволяет программе просмотра перехватывать исходящие запросы XHR. Средство просмотра AMP может проверять корректность формы запроса, а также его намерения, чтобы гарантировать защиту и конфиденциальность своих пользователей.

#### XHR-запросы

Для отправки или извлечения данных некоторые компоненты AMP, такие как [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) и [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email), обращаются к заданным конечным точкам. Эти вызовы классифицируются как запросы XHR.

#### Коммуникация между средством просмотра и AMP-документом

Протокол, используемый для связи между средством просмотра и документом AMP, реализуется посредством [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). Ниже приводится простейший пример работы postMessage в сценарии перехвата XHR, когда средство просмотра обрабатывает XHR-сообщение postMessage, отправленное из документа AMP, и возвращает индивидуально настроенный ответ.

```js
// The viewer iframe that will host the amp doc.
viewerIframe = document.createElement('iframe');
viewerIframe.contentWindow.onMessage = (xhrRequestIntercepted) => {
  const blob = new Blob([JSON.stringify({body: 'hello'}, null, 2)], {
    type: 'application/json',
  });
  const response = new Reponse(blob, {status: 200});
  return response;
};
```

### Включение перехвата XHR

Чтобы задействовать перехват XHR, активируйте на этапе инициализации программы просмотра возможность xhrInterceptor — см. образец программы просмотра с перехватом XHR. Затем перехват XHR должен быть разрешен в документе AMP. Чтобы сделать это, добавьте атрибут `allow-xhr-interception` в тег `<html amp4email>`. Этот атрибут должен быть установлен почтовым клиентом непосредственно перед рендерингом документа, поскольку он намеренно является недопустимым атрибутом и будет отмечен соответствующим образом во время валидации документа AMP.

```html
<!DOCTYPE html>
<html ⚡4email allow-xhr-interception>
  ...
</html>
```

## Средство просмотра и рендеринг шаблона на стороне сервера

Возможность `viewerRenderTemplate` позволяет средству просмотра управлять рендерингом шаблонов [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) и [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email). Когда она активирована, среда выполнения AMP проксирует в средство просмотра запрос, содержащий оригинальный XHR-вызов, данные шаблона и все прочие данные, необходимые для рендеринга содержимого компонента. Это позволяет средству просмотра анализировать контент конечной точки и управлять тем, как [mustache](https://mustache.github.io/) осуществляет рендеринг шаблонов, чтобы проверять и санитизировать данные. Обратите внимание при совместной активации вместе с xhrInterceptor в компонентах amp-form и amp-list: возможность `viewerRenderTemplate`также проксирует запросы в средство просмотра и будет обладать приоритетом над xhrInterceptor.

В примере [viewer.html](https://github.com/ampproject/amphtml/blob/main/examples/viewer.html) показано, как можно обработать сообщение `viewerRenderTemplate`, отправленное из документа AMP. В рамках данного примера Viewer.prototype.processRequest\_ перехватывает сообщение `viewerRenderTemplate` и, в зависимости от указанного в запросе типа AMP-компонента, возвращает предназначенный для отображения HTML в виде следующего JSON:

```js
Viewer.prototype.ssrRenderAmpListTemplate_ = (data) =>
  Promise.resolve({
    'html':
      "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'>" +
      "<div class='product' role='listitem'>Apple</div>" +
      '</div>',
    'body': '',
    'init': {
      'headers': {
        'Content-Type': 'application/json',
      },
    },
  });
```

Это простейший пример, в котором нет зависимости от библиотеки [mustache](https://mustache.github.io/) или санитизации контента.

В приведенной ниже диаграмме показан более реальный пример того, как документ AMP может управлять рендерингом шаблона [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) во встроенном в почтовый клиент средстве просмотра с возможностью `viewerRenderTemplate`.

<amp-img alt="Viewer render template diagram" layout="responsive" width="372" height="279" src="/static/img/docs/viewer_render_template_diagram.png"></amp-img>

Среда выполнения AMP будет проксировать fetch-запрос данных от компонента [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) в средство просмотра, которое, в свою очередь, перенаправит этот запрос на сервер клиента электронной почты. Сервер обработает этот URL и результаты запроса по данному URL с помощью различных служб, возможно проверяя корректность URL и содержимое данных, получаемых с него, после чего выполнит рендеринг шаблонов [mustache](https://mustache.github.io/), используя эти данные. Затем сервер вернет готовый шаблон в средство просмотра, используя следующий формат JSON:

```json
{
  "html": "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'> <div class='product' role='listitem'>List item 1</div> <div class='product' role='listitem'>List item 2</div> </div>",
  "body": "",
  "init": {
    "headers": {
      "Content-Type": "application/json"
    }
  }
}
```

Значение html в данном JSON будет инжектировано в документ AMP для рендеринга.

В таблице ниже описаны возможности и охваченные ими компоненты:

<table>
  <thead>
    <tr>
      <th width="30%">Возможность средства просмотра</th>
      <th>Компоненты, на которые они распространяются</th>
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
