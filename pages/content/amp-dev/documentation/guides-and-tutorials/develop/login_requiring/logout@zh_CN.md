---
$title: 退出
---

与“登录”按钮相似，是否显示“退出”按钮应取决于 `amp-access` 组件的状态：

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

当您点击“退出”按钮后，系统会将您定向到您在 `amp-access` JSON 配置中指定的网址（作为登录对象的一部分）：

[sourcecode:json]
{
"login": {
  "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
  "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
  }
}
[/sourcecode]

与登录相似，当 AMPByExample 服务器收到退出请求后，它会使用由 AMP 库自动添加的返回网址查询参数并会通过附加 `#success=true` 重定向到该网址。到了这个时候，您已经返回到初始页面；而就在此刻，之前为登录页面创建的 AMPByExample Cookie（名为 `ABE_LOGGED_IN`）会被清除。

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/add_comment.md', locale=doc.locale).url.path}}"><span class="arrow-prev">上一页</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/summary.md', locale=doc.locale).url.path}}"><span class="arrow-next">下一页</span></a>
</div>
