---
$title: 创建一个需要登录的 AMP 网页
---
用户与网页的某些互动（如发表评论）可由登录流程加以限制。您可通过将 [`amp-access`](../../../../documentation/components/reference/amp-access.md) 组件结合使用来实现 AMP 登录流程。

提示: 要查看实现示例，请访问 [ampbyexample.com](../../../../documentation/examples/index.html) 上的[“评论部分”示例](../../../../documentation/examples/documentation/Comment_Section.html)。

[“评论部分”示例](../../../../documentation/examples/documentation/Comment_Section.html)通过结合使用 [`amp-access`](../../../../documentation/components/reference/amp-access.md) 和 [`amp-form`](../../../../documentation/components/reference/amp-form.md) 创建了一个仅在用户登录后才被启用的评论部分。为了说明该示例的运作原理，我们将依序介绍您在到达登录页面后需执行的一系列操作。
