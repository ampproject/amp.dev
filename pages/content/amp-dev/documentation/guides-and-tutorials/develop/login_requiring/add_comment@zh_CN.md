---
$title: 添加评论
---

<amp-img src="/static/img/comment.png" alt="Add comment" height="325" width="300"></amp-img>

此时，用户可以使用 `amp-form` 库添加评论。请注意，相应表单能否被显示出来是有条件的（取决于 `amp-access` 组件的状态）：

[sourcecode:html]
<form amp-access="loggedIn" amp-access-hide method="post" action-xhr="<%host%>/samples_templates/comment_section/submit-comment-xhr" target="_top">
[/sourcecode]

由于 AMP 网页中不允许使用 POST 方法执行任何非 XHR 操作，因此我们指定了一种 POST 方法和一项 XHR 操作。
鉴于这是一次演示，我们不会只介绍评论，所以目前只能添加一条评论；一旦有人添加了评论，AMPByExample 服务器就会用包含所输入文字及一些添加项（如时间戳、用户头像和姓名）的 JSON 响应进行回复。

下面是一个 JSON 响应示例：

[sourcecode:json]
{"Datetime":"09:34:21",
"User":"Charlie",
"Text":"Hello!",
"UserImg":"/img/ic_account_box_black_48dp_1x.png"}
[/sourcecode]

表单组件会通过使用 [amp-mustache](/zh_cn/docs/reference/components/amp-mustache.html) 模板来仅将上述值显示在该网页内：

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

在此示例中，我们只检查评论的值是否不为空；如果评论的值为空，我们就会返回一个错误，而该错误会导致系统执行以下代码

[sourcecode:html]
<div submit-error>
  <template type="amp-mustache">
    Error! Looks like something went wrong with your comment, please try to submit it again.
  </template>
</div>
[/sourcecode]

我们添加了 `required` 属性作为补充，以便在提交评论之前强制显示评论文字：

<amp-img src="/static/img/enforce-comment.png" alt="Enforce comment" height="325" width="300"></amp-img>

[sourcecode:html]
<input type="text" class="data-input" name="text" placeholder="Your comment..." required>
[/sourcecode]

如果您添加评论并点击“提交”按钮，那么您现在应该能看到与以下屏幕截图相似的内容：

<amp-img src="/static/img/logout-button.png" alt="Comment added" height="352" width="300"></amp-img>

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/login.md', locale=doc.locale).url.path}}"><span class="arrow-prev">上一页</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/logout.md', locale=doc.locale).url.path}}"><span class="arrow-next">下一页</span></a>
</div>
