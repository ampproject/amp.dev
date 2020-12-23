---
"$title": Logout
"$order": '3'
description: 与登录按钮相似，是否显示退出按钮取决于 amp-access 组件的状态…
---

与登录按钮相似，是否显示退出按钮取决于 [`amp-access`](../../../../documentation/components/reference/amp-access.md) 组件的状态：

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

[sourcecode:html] <button amp-access="loggedIn" amp-access-hide="" tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button> [/sourcecode]

[sourcecode:json]
{
"login": {
  "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
  "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
  }
}
[/sourcecode]

当您点击“退出”按钮后，系统会将您定向到您在 [`amp-access`](../../../../documentation/components/reference/amp-access.md) JSON 配置中指定的网址（作为登录对象的一部分）：
