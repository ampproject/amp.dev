---
"$title": Create a login-requiring AMP page
"$order": '0'
description: Some user interactions with a page, such as leaving a comment, could be conditioned by a login flow. You can implement a login flow ...
numbered: '1'
"$hidden": 'true'
formats:
- websites
---

Некоторые взаимодействия пользователя со страницей, такие как написание комментария, могут быть доступными только после выполнения входа. Реализовать процесс входа на AMP можно при помощи компонента [`amp-access`](../../../../documentation/components/reference/amp-access.md) в сочетании с компонентом [`amp-form`](../../../../documentation/components/reference/amp-form.md).

[tip type="tip"] **СОВЕТ.** Чтобы увидеть пример реализации, смотрите [пример с разделом комментариев](../../../../documentation/examples/documentation/Comment_Section.html) на сайте [ampbyexample.com](../../../../documentation/examples/index.html). [/tip]

В [примере с разделом комментариев](../../../../documentation/examples/documentation/Comment_Section.html) сочетание компонентов [`amp-access`](../../../../documentation/components/reference/amp-access.md) и [`amp-form`](../../../../documentation/components/reference/amp-form.md) используется для создания раздела комментариев, который становится активным только после того, как пользователь выполнит вход. Чтобы объяснить принцип работы этого примера, давайте рассмотрим последовательность действий, выполняемых после того, как пользователь оказывается на странице.
