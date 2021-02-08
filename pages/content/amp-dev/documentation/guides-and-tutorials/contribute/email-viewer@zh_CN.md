---
'$title': 使用 AMP 查看工具呈现电子邮件
$order: 5
author: alabiaga
formats:
  - email
---

希望支持 AMP 电子邮件的电子邮件客户端应使用 [AMP 查看工具](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md)托管他们发件人的 AMP 电子邮件。使用 [AMP Viewer 库](https://github.com/ampproject/amphtml/tree/master/extensions/amp-viewer-integration)构建的查看工具包含一个 AMP 文档，并启用了相应的[功能](https://github.com/ampproject/amphtml/blob/master/extensions/amp-viewer-integration/CAPABILITIES.md)，允许通过 postMessage 与 AMP 文档进行双向通信。这些功能包括授予电子邮件可见性控制权限、中继用户指标，以及提供方法来确保从电子邮件发出的 XHR 请求的安全性。

## 查看工具 XHR 拦截

AMP Viewer 库的 `xhrInterceptor` 功能允许查看工具拦截发出的 XHR 请求。AMP 查看工具可以针对有效性和意图对请求进行内省，以保证对用户的保护和隐私性。

#### XHR 请求

[`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) 和 [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email) 等 AMP 组件需要调用端点来发布或检索数据。这些调用分类为 XHR 请求。

#### 查看工具和 AMP 文档通信

用于查看工具和 AMP 文档之间通信的协议通过 [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) 实现。以下是 postMessage 在 XHR 中拦截用例中的一个简单示例，其中查看工具处理从 AMP 文档发送的 XHR postMessage，并返回一个自定义响应。

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

### 启用 XHR 拦截

初始化时在 xhrInterceptor 功能中选择查看工具来启用 XHR 拦截。请参见查看工具示例，了解如何完成此操作，以及查看 XHR 拦截的示例。之后，AMP 文档必须选择允许 XHR 拦截。通过向 `<html amp4email>` 标记添加 `allow-xhr-interception` 属性，文档可以选择加入。电子邮件客户端必须在呈现 AMP 文档之前设置此属性，因为它故意作为一个无效属性，并且在 AMP 文档验证期间也将如此标记。

```html
<!DOCTYPE html>
<html ⚡4email allow-xhr-interception>
  ...
</html>
```

## 查看工具服务器端模板呈现

`viewerRenderTemplate` 功能允许查看工具管理 [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) 和 [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email) 模板呈现。启用此功能后，AMP 运行时将代理一个请求，请求中包含原始 XHR 调用、模板数据和将组件内容呈现到查看工具所需的任何其他详细信息。这允许查看工具对端点数据内容进行内省，并管理模板的 [mustache](https://mustache.github.io/) 呈现，以验证和清理数据。请注意，如果此功能与 xhrInterceptor 一同启用，那么在 amp-form 和 amp-list 组件中，`viewerRenderTemplate` 功能将胜过 xhrInterceptor 的功能，前者也会将请求代理到查看工具。

[viewer.html](https://github.com/ampproject/amphtml/blob/master/examples/viewer.html) 示例显示了如何处理发送自 AMP 文档的 `viewerRenderTemplate` 消息。在该示例中，Viewer.prototype.processRequest\_ 捕获 `viewerRenderTemplate` 消息，并根据请求中可用的 amp 组件类型，发回使用以下 JSON 格式呈现的 html。

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

这是一个简单的示例，没有 [mustache](https://mustache.github.io/) 库依赖项或内容清理。

下图展示了一个更真实的示例，说明了在具有 `viewerRenderTemplate` 功能的电子邮件客户端查看工具中，AMP 文档如何处理 [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) 模板的呈现。

<amp-img alt="Viewer render template diagram" layout="responsive" width="372" height="279" src="/static/img/docs/viewer_render_template_diagram.png"></amp-img>

AMP 运行时将 [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) 组件数据获取请求代理到查看工具，查看工具又将此请求转发到电子邮件客户端服务器。服务器将此网址和网址获取的结果馈送至各种服务，在此期间可能会检查网址有效性和从该网址返回的数据的内容，并使用该数据呈现 [mustache](https://mustache.github.io/) 模板。然后，它将返回已呈现的模板，并使用以下 JSON 响应格式将其发回查看工具。

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

JSON 负载中的 html 值将注入 AMP 文档中用于呈现。

下表列出了功能和受影响的组件：

<table>
  <thead>
    <tr>
      <th width="30%">查看工具功能</th>
      <th>受影响组件</th>
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
