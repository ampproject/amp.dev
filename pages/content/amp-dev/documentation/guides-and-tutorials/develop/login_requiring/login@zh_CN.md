---
"$title": Login
"$order": '1'
description: 首次到达该网页时，您会看到 2 条评论和一个登录按钮。如果在代码中查找登录按钮，您会找到以下内容…
---

首次到达该[网页](../../../../documentation/examples/previews/Comment_Section.html)时，您会看到 2 条评论和一个登录按钮。

<amp-img src="/static/img/login-button.jpg" alt="Login button" height="290" width="300"></amp-img>

如果在代码中查找登录按钮，您会找到以下内容：

[sourcecode:html]
<span amp-access="NOT loggedIn" role="button" tabindex="0" amp-access-hide>
  <h5>Please login to comment</h5>
  <button on="tap:amp-access.login-sign-in" class="button-primary comment-button">Login</button>
</span>
[/sourcecode]

[`amp-access`](../../../../documentation/components/reference/amp-access.md) 相关属性的行为取决于 [`amp-access`](../../../../documentation/components/reference/amp-access.md) 的网页级配置，在此示例中如下所示：

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

授权端点会被作为 AMPByExample 的一部分进行部署。网页发布商负责提供此端点。在此示例中，为简单起见，我们只实现了基本逻辑，以便服务器在收到此请求后读取名为 `ABE_LOGGED_IN` 的 Cookie 的值。如果该 Cookie 不存在，我们会返回包含 `loggedIn = false` 的 JSON 响应。因此，当用户首次到达该网页时，此请求会返回 `loggedIn = false`，并且网页上会显示登录按钮。

再看一下按钮的 HTML 代码。我们使用 `on="tap:amp-access.login-sign-in"` 指定：一旦用户点按该按钮，系统便应当使用上述 JSON 中指定的网址：

[sourcecode:json]
{
	"login": {
    "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL"
  }
}

[/sourcecode]

[tip type="note"] <strong>注</strong>：请注意，您可以在登录节点内定义不同的网址。在此示例中，我们定义的是 `sign-in`，稍后我们将定义 `sign-out`。[/tip]

登录页面是一个非 AMP 网页，为方便起见，我们会在该页面上填充登录名值和密码值。请注意，我们使用了 `returnURL` 隐藏输入类型，该类型是由 AMPByExample 服务器通过服务器端模板进行填充的。该服务器会从名为 `return` 的参数（由 AMP 库自动添加到登录网址）中读取此值。

在下方示例中，一旦您点击了登录按钮，系统就会将 `return` 参数的值添加到请求中。您可以通过使用 Chrome DevTools 控制台并转到 Network 标签来查看此值。

<amp-img src="/static/img/return-parameter.jpg" alt="Return parameter" height="150" width="600"></amp-img>

当 AMPByExample 服务器收到来自登录页面的 POST 请求并确认相应的登录名值和密码值正确无误后，它会将该请求重定向到我们在上文中提及的 `returnURL`，并附加 `#success=true` 参数。现在，AMP 运行时便可授权该页面，并最终允许您添加评论。

请务必了解 AMP 运行时会执行哪些操作以及服务器应执行哪些操作，因为服务器实现是网页发布商的职责。

快速回顾：

- AMP 运行时会自动将返回参数添加到登录 JSON 对象中指定的登录请求
- AMP 运行时会关闭登录页面，并重定向到由返回网址参数指定的网页
- 一旦用户点击登录按钮，服务器即应当编排响应

[tip type="tip"] <strong>提示</strong>：您可以在 [`amp-access`](../../../../documentation/components/reference/amp-access.md) 中找到有关此流程的更详细说明。[/tip]
