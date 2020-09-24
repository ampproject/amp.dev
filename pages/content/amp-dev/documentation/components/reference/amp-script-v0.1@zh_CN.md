---
$category@: dynamic-content
formats:
  - websites
teaser:
  text: 在Web Worker中运行自定义JavaScript。
toc: true
$title: amp-script
---


<!---
Copyright 2020 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

## 用法

`amp-script` 组件允许您运行自定义JavaScript。为了保持AMP的性能保证，您的代码在Web Worker中运行，并且存在某些限制。

`amp-script` 元素可以通过两种方式加载JavaScript:

- 远程, 从一个URL
- 本地, 从页面上的 `<script>` 元素

### 从远程URL加载JavaScript

使用该src属性从URL加载JavaScript：

[sourcecode:html]
<amp-script layout="container" src="https://example.com/hello-world.js">
  <button>Hello amp-script!</button>
</amp-script>
[/sourcecode]

### 从本地元素加载JavaScript

你也可以将你的JavaScript嵌入到一个 `script` 标签中。你必须:

- 设置你的  `amp-script` 的 `script` 属性为本地 `script` 元素的 `id`.
- 在你的 `target="amp-script"` 中包含 `amp-script`。
- 在你的 `script` 中包含 `type="text/plain"` 这样，浏览器就不会执行你的脚本，而允许amp-script来控制它。

[sourcecode:html]
<!-- To use inline JavaScript, you must add a script hash to the document head. -->
<head>
  <meta
    name="amp-script-src"
    content="sha384-YCFs8k-ouELcBTgzKzNAujZFxygwiqimSqKK7JqeKaGNflwDxaC3g2toj7s_kxWG"
  />
</head>

...

<amp-script width="200" height="100" script="hello-world">
  <button>Hello amp-script!</button>
</amp-script>

<!-- Add [target="amp-script"] to the <script> element. -->
<script id="hello-world" type="text/plain" target="amp-script">
  const btn = document.querySelector('button');
  btn.addEventListener('click', () => {
    document.body.textContent = 'Hello World!';
  });
</script>
[/sourcecode]

[tip type="default"]
出于安全原因，带有`script`或跨域`src`属性的`amp-script` 元素需要在 `<meta name="amp-script-src" content="...">` 标签中使用[script hash](#script-hash)。同样， 同源的 `src` 文件必须有 [`Content-Type`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type): `application/javascript` 或 `text/javascript`。
[/tip]

## 它是如何工作的？

`amp-script` 在一个可以访问虚拟DOM的 [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) 中运行你的定制JavaScript。 当你的JavaScript代码修改这个虚拟DOM时， `amp-script` 会将这些修改转发到主线程，并将它们应用到 `amp-script` 元素子树中。

例如，在 `document.body`中添加一个元素：

[sourcecode:js]
// my-script.js
const p = document.createElement('p');
p.textContent = 'I am added to the body!';
document.body.appendChild(p);
[/sourcecode]

Will be reflected on the page as a new child of the `amp-script` element:

[sourcecode:html]
<amp-script src="http://example.com/my-script.js" width="300" height="100">
  <p>I am added to the body!</p>
</amp-script>
[/sourcecode]

在底层， `amp-script` 使用 [@ampproject/worker-dom](https://github.com/ampproject/worker-dom/)。有关设计细节，请参阅 ["Intent to Implement" 问题](https://github.com/ampproject/amphtml/issues/13471).

## 状态操作

`amp-script` 支持通过JavaScript获取和设置 [`amp-state`](https://amp.dev/documentation/components/amp-bind/#initializing-state-with-amp-state) JSON。

这样就可以通过  `amp-bind`[bindings](https://amp.dev/documentation/components/amp-bind/#bindings) 在页面上的 `amp-script` 和其他AMP元素之间进行高级交互。 调用 `AMP.setState()` 从 `amp-script` 可能会导致DOM发生突变，只要它是由用户手势触发的，否则它将只隐式地设置状态 (类似于 [`amp-state` 初始化](https://amp.dev/documentation/examples/components/amp-bind/?referrer=ampbyexample.com#initializing-state)).

[tip type="default"]
`AMP.setState()` 要求 [`amp-bind`](https://amp.dev/documentation/components/amp-bind) 扩展脚本包含在文档头中。
[/tip]

[sourcecode:js]
/**
 * Deep-merges `json` into the current amp-state.
 * @param {!Object} json A JSON object e.g. must not contain circular references.
 */
AMP.setState(json) {}

/**
 * Asynchronously returns amp-state.
 * @param {string=} expr An optional JSON expression string e.g. "foo.bar".
 * @return {!Promise<!Object>}
 */
AMP.getState(expr) {}
[/sourcecode]

### 使用WebSocket和AMP.setState()的例子

[sourcecode:html]
<amp-script width="1" height="1" script="webSocketDemo"> </amp-script>

<!--
  <amp-state> doesn't support WebSocket URLs in its "src" attribute,
  but we can use <amp-script> to work around it. :)
-->
<script type="text/plain" target="amp-script" id="webSocketDemo">
  const socket = new WebSocket('wss://websocket.example');
  socket.onmessage = event => {
    AMP.setState({socketData: event.data});
  };
</script>
[/sourcecode]

## 限制

### 支持的 API

目前，支持大多数DOM元素及其属性。 DOM查询API（例如 `querySelector` ）具有部分支持。 浏览器API（例如 `History`）尚未实现。有关详细信息，请参见 [API compatibility table](https://github.com/ampproject/worker-dom/blob/master/web_compat_table.md) 。

如果您希望看到支持的API，请 [file an issue](https://github.com/ampproject/amphtml/issues/new) 并提到 `@choumx` 和 `@kristoferbaxter`.

### JavaScript代码的大小 <a name="size-of-javascript-code"></a>

`amp-script` 有关于代码大小的标准：

- 通过 `script[type=text/plain][target=amp-script]` 使用本地脚本的每个 `amp-script` 元素最多10,000字节。
- 页面上所有 `amp-script` 元素的最大总数为150,000字节。

### 用户手势 <a name="user-gestures"></a>

在某些情况下， `amp-script` 需要一个用户手势来应用由JavaScript代码触发的变化 (我们称之为“突变”) 到 `amp-script` 的DOM子节点。这有助于避免意外的内容跳跃带来的糟糕用户体验。

突变的规律如下:

1. 对于具有 [non-container layout](https://amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout#supported-values-for-the-layout-attribute)的 `amp-script` 元素，突变总是允许的。
2. 对于具有容器布局的 `amp-script` 元素，允许在用户手势之后的五秒钟内发生变化。如果触发了 `fetch()` 这个5秒的窗口将扩展一次。

### 创建AMP元素

关于AMP元素的动态创建(例如通过 `document.createElement()`)，目前只允许 `amp-img` 和 `amp-layout`。 请对 [&#35;25344](https://github.com/ampproject/amphtml/issues/25344) 和您的用例进行投票或评论。

## 计算脚本哈希 <a name="script-hash"></a>

由于自定义JS运行在 `amp-script` 不受常规的 [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)，你需要添加这个脚本哈希:

- 用于内联JavaScript
- 用于从跨域源加载的JavaScript

在文档头的' `meta[name=amp-script-src]` 元素中包含脚本哈希。以下是构建哈希的几种方法：

- 如果你省略 `<meta>` 标签，AMP将输出一个控制台错误，包含预期的哈希字符串。 你可以复制它来创建合适的 `<meta>` 标签。
- [AMP Optimizer node module](https://www.npmjs.com/package/@ampproject/toolbox-optimizer) 生成这个散列并自动插入' `<meta>` 标签。
- 使用以下步骤自己构建它：

1. 计算脚本内容的SHA384哈希值总和。此总和应以十六进制表示。
2. base64url-encode 结果。
3. 以 `sha384-` 开头。

这是你如何在Node.js中计算哈希值的方法：

[sourcecode:js]
const crypto = require('crypto');
const hash = crypto.createHash('sha384');

function generateCSPHash(script) {
  const data = hash.update(script, 'utf-8');
  return (
    'sha384-' +
    data
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
  );
}
[/sourcecode]

还有一个节点模块可以为您完成这个任务：[@ampproject/toolbox-script-csp](https://www.npmjs.com/package/@ampproject/toolbox-script-csp)。

这个例子展示了如何在HTML中使用脚本哈希:

[sourcecode:html]
<head>
  <!--
    A meta[name="amp-script-src"] element contains all script hashes for
    <amp-script> elements on the page, delimited by spaces.
  -->
  <meta
    name="amp-script-src"
    content="
      sha384-fake_hash_of_remote_js
      sha384-fake_hash_of_local_script
    ">
</head>
<body>
  <!--
    A "src" attribute with a cross-origin URL requires adding a script hash.

    If the hash of remote.js's contents is "fake_hash_of_remote_js",
    we'll add "sha384-fake_hash_of_remote_js" to the <meta> tag above.

-->
<amp-script src="cross.origin/remote.js" layout=container>
</amp-script>

  <!--
    A "script" attribute also requires adding a script hash.

    If the hash of #myScript's text contents is "fake_hash_of_local_script",
    we'll add "sha384-fake_hash_of_local_script" to the <meta> tag above.
  -->
  <amp-script script=myScript layout=container>
  </amp-script>
  <script type=text/plain target=amp-script id=myScript>
    document.body.textContent += 'Hello world!';
  </script>
</body>
[/sourcecode]

[tip type="default"]
在开发过程中，可以通过向 `amp-script` 元素或根html节点添加一个 `data-ampdevmode` 属性来禁用JavaScript大小和脚本哈希要求。将其添加到根html节点将禁止页面上的所有验证错误。将它添加到 `amp-script` 元素将简单地避免关于大小和脚本哈希的错误。
[/tip]

## 属性

**src**

用于执行远程脚本。

将在this上下文中执行的JS文件的URL `<amp-script>` 。URL的协议必须为HTTPS，HTTP响应 `Content-Type` 必须为 `application/javascript` 或 `text/javascript`。

**script**

用于执行本地脚本。

`script[type=text/plain][target=amp-script]` 元素的 `id`，其文本内容包含将在此 `<amp-script>` 上下文中执行的JS。

**sandbox (可选)**

对DOM应用额外的限制，这些限制可能会被此 `<amp-script>`更改。与 `iframe[sandbox]` 属性类似，该属性的值可以为空以应用所有限制，也可以为空格分隔的标记以解除特定限制：

- `allow-forms`: 允许创建和修改 [form elements](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements)。AMP需要特殊处理，以防止来自用户输入的未经授权的状态更改请求。有关更多详细信息，请参见amp-form的 [安全注意事项](https://amp.dev/documentation/components/amp-form#security-considerations)。

**max-age (可选, 但如果指定了`script`，则需要进行签名交换)**

需要 `script` 属性。

`max-age` 属性指定从[[signed exchange (SXG)](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/signed-exchange/) 发布开始允许提供的本地脚本的最大生存期(以秒为单位)。[AMP Packager](https://github.com/ampproject/amppackager) 使用此值来计算SXG `expires` 时间。

 `max-age` 的值应该谨慎选择：

- 更长的 `max-age` 增加了 [SXG downgrade](https://wicg.github.io/webpackage/draft-yasskin-http-origin-signed-responses.html#seccons-downgrades) 的潜在安全影响。

- 较短的 `max-age` 可能会阻止包含在具有最小SXG生存期的AMP缓存中。例如，Google AMP缓存至少需要 [4 天](https://github.com/ampproject/amppackager/blob/releases/docs/cache_requirements.md#google-amp-cache) (345600 秒). 注意，目前没有理由选择超过7天(604800 seconds)的 `max-age` ，因为SXG规范设置了[maximum](https://wicg.github.io/webpackage/draft-yasskin-http-origin-signed-responses.html#name-signature-validity)。

如果您不发布已签名的交换， `max-age` 将不会起任何作用。

**常见属性**

此元素包含扩展到 AMP 组件的 [常见属性](https://amp.dev/documentation/guides-and-tutorials/learn/common_attributes) 。

## 错误

在使用 `amp-script` 时可能会遇到几种类型的运行时错误。

### "Maximum total script size exceeded (...)"

`amp-script` 限制了可能使用的JS源代码的大小。 请参阅上面的[Size of JavaScript code](#size-of-javascript-code) 。

### "Script hash not found."

对于本地脚本和跨源脚本，您需要添加一个[script hash](#script-hash)以保证安全性。

### "amp-script... was terminated due to illegal mutation"

为了避免意外的内容跳跃， `amp-script` 通常需要用户在DOM更改时使用手势。请参阅上面的[User gestures](#user-gestures)。