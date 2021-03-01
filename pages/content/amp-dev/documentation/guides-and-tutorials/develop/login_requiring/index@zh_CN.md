---
'$title': Create a login-requiring AMP page
$order: 0
description: 用户与网页的某些互动（如发表评论）可由登录流程加以限制。您可以通过将…
numbered: '1'
'$hidden': 'true'
formats:
  - websites
---

用户与网页的某些互动（如发表评论）可由登录流程加以限制。您可以通过将 [`amp-access`](../../../../documentation/components/reference/amp-access.md) 与 [`amp-form`](../../../../documentation/components/reference/amp-form.md) 组件结合使用来实现 AMP 登录流程。

[tip type="tip"] <strong>提示</strong>：要查看示例实现，请访问 [ampbyexample.com](../../../../documentation/examples/index.html) 上的[“评论部分”示例](../../../../documentation/examples/documentation/Comment_Section.html)。[/tip]

[“评论部分”示例](../../../../documentation/examples/documentation/Comment_Section.html)通过结合使用 [`amp-access`](../../../../documentation/components/reference/amp-access.md) 和 [`amp-form`](../../../../documentation/components/reference/amp-form.md) 创建了一个只有在用户登录后才会启用的评论部分。为了说明此示例的工作原理，我们将依序介绍您在达到该网页后需要执行的一系列操作。
