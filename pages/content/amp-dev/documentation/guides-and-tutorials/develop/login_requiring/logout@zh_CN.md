---
'$title': Logout
$order: 3
description: 与登录按钮相似，是否显示退出按钮取决于 amp-access 组件的状态…
---

与登录按钮相似，是否显示退出按钮取决于 [`amp-access`](../../../../documentation/components/reference/amp-access.md) 组件的状态：

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

当您点击 Logout 按钮后，系统会将您定向到您在 [`amp-access`](../../../../documentation/components/reference/amp-access.md) JSON 配置中指定的网址（作为登录对象的一部分）：

[sourcecode:json]
{
"login": {
"sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
"sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
}
}
[/sourcecode]

与登录相似，当 AMPByExample 服务器收到退出请求后，它会使用由 AMP 库自动添加的返回网址查询参数并通过附加 `#success=true` 重定向到该网址。此时，您已经返回初始网页；之前为登录页面创建的 AMPByExample Cookie（名为 `ABE_LOGGED_IN`）现在将被清除。
