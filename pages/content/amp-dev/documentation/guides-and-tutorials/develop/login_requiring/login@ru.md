---
'$title': Вход
$order: 1
description: При первом заходе на страницу вы увидите 2 комментария и кнопку входа. Если поискать кнопку входа в коде страницы, вот что вы обнаружите...
---

При первом заходе на [страницу](../../../../documentation/examples/previews/Comment_Section.html) вы увидите 2 комментария и кнопку входа.

<amp-img src="/static/img/login-button.jpg" alt="Login button" height="290" width="300"></amp-img>

Вот как выглядит код кнопки входа на странице:

[sourcecode:html]
<span amp-access="NOT loggedIn" role="button" tabindex="0" amp-access-hide>

  <h5>Please login to comment</h5>
  <button on="tap:amp-access.login-sign-in" class="button-primary comment-button">Login</button>
</span>
[/sourcecode]

Поведение атрибутов, связанных с компонентом [`amp-access`](../../../../documentation/components/reference/amp-access.md), определяется конфигурацией компонента [`amp-access`](../../../../documentation/components/reference/amp-access.md) в масштабе всей страницы; в нашем случае она такова:

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

Конечная точка авторизации разворачивается в рамках AMPByExample. Предоставлять эту конечную точку должен издатель страницы, однако в нашем примере с целью его упрощения мы реализовали базовую логику, чтобы при получении запроса сервер считывал содержимое cookie-файла под названием `ABE_LOGGED_IN`. Если cookie-файл отсутствует, мы возвращаем ответ в формате JSON с содержимым `loggedIn = false`. Поэтому, когда пользователь в первый раз заходит на страницу, запрос возвращает ответ `loggedIn = false`, в результате чего показывается кнопка входа.

Теперь вернемся к HTML-коду кнопки: при помощи свойства `on="tap:amp-access.login-sign-in"` мы указываем, что, как только пользователь коснется кнопки, необходимо перейти по URL-адресу, указанному в приведенном выше JSON:

[sourcecode:json]
{
"login": {
"sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL"
}
}

[/sourcecode]

[tip type="note"] **ПРИМЕЧАНИЕ.** Обратите внимание, что в объекте login можно определить несколько URL-адресов; сейчас мы определили адрес `sign-in`, а позже определим адрес `sign-out`. [/tip]

Страница входа — это не-AMP страница, которую мы для простоты используем для заполнения значений логина и пароля. Обратите внимание на использование скрытого поля ввода `returnURL`, значение которого заполняется на сервере AMPByExample при помощи серверного шаблона. Сервер считывает это значение из параметра `return`, автоматически добавляемого библиотекой AMP к URL-адресу для входа.

В нижеприведенном примере значение параметра `return` добавляется к запросу после нажатия на кнопку входа. Посмотреть это значение можно при помощи консоли Инструментов разработчика Chrome (вкладка «Сеть»).

<amp-img src="/static/img/return-parameter.jpg" alt="Return parameter" height="150" width="600"></amp-img>

Получив POST-запрос со страницы входа и удостоверившись в правильности логина и пароля, сервер AMPByExample перенаправляет запрос на адрес `returnURL`, о котором говорилось ранее, добавляя к нему параметр `#success=true`. Теперь среда выполнения AMP может авторизовать страницу и наконец разрешить вам добавление комментариев.

Важно понимать, за какие задачи отвечает среда выполнения AMP, а какие должен выполнять сервер, так как реализация сервера является обязанностью издателя страницы.

Итак, резюмируя:

- Среда выполнения AMP автоматически добавляет параметр return к запросу для входа, передаваемому в JSON-объекте login
- Среда выполнения AMP закрывает страницу входа и выполняет перенаправление на страницу, указанную в параметре URL-адреса возврата
- Как только пользователь нажимает на кнопку входа, сервер генерирует ответ

[tip type="tip"] **СОВЕТ.** Более подробное описание этого процесса можно найти в документации к компоненту [`amp-access`](../../../../documentation/components/reference/amp-access.md). [/tip]
