---
'$title': Выход
$order: 3
description: Как и в случае с кнопкой входа, присутствие кнопки выхода определяется состоянием компонента amp-access...
---

Как и в случае с кнопкой входа, присутствие кнопки выхода определяется состоянием компонента [`amp-access`](../../../../documentation/components/reference/amp-access.md):

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

При нажатии на кнопку «Logout» происходит переход по URL-адресу, который был задан в JSON-конфигурации компонента [`amp-access`](../../../../documentation/components/reference/amp-access.md) (объект login):

[sourcecode:json]
{
"login": {
"sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
"sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
}
}
[/sourcecode]

Как и при входе, когда сервер AMPByExample получает запрос на выход, он считывает URL-адрес возврата из соответствующего параметра запроса, автоматически добавленного библиотекой AMP, и выполняет перенаправление на этот адрес, добавляя в конец `#success=true`. В результате вы вновь оказываетесь на начальной странице; cookie-файл AMPByExample (под названием `ABE_LOGGED_IN`), созданный ранее для страницы входа, к этому моменту уже удален.
