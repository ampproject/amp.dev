---
'$title': CORS в AMP
$order: 12
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: Многие компоненты и расширения AMP используют удаленные конечные точки с помощью запросов Cross-Origin Resource Sharing...
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cors-requests.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2016 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

Многие компоненты и расширения AMP используют удаленные конечные точки с помощью запросов Cross-Origin Resource Sharing («совместное использование ресурсов между разными источниками», CORS). В этом документе описываются ключевые аспекты применения CORS в AMP. Чтобы подробнее узнать о самом механизме CORS, обратитесь к [спецификации CORS на сайте W3](https://www.w3.org/TR/cors/).

<div class="noshowtoc"></div>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered">Зачем применять CORS в пределах моего собственного источника? <a href="#why-do-i-need-cors-for-my-own-origin" data-md-type="link"></a>
</li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#utilizing-cookies-for-cors-requests" data-md-type="link">Использование файлов cookie в CORS-запросах</a></li>
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#cors-security-in-amp" data-md-type="link">Безопасность CORS в AMP</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#verify-cors-requests" data-md-type="link">Проверка  CORS-запросов</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered">1) Разрешайте запросы с определенных источников CORS <a href="#1-allow-requests-for-specific-cors-origins" data-md-type="link"></a>
</li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#2-allow-same-origin-requests" data-md-type="link">2) Разрешайте запросы в пределах одного источника</a></li>
</ul>
</li></ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#send-cors-response-headers" data-md-type="link">Отправка заголовков CORS-ответа</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered"><a href="#access-control-allow-origin-origin" data-md-type="link">Access-Control-Allow-Origin: </a></li></ul>
</li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#processing-state-changing-requests" data-md-type="link">Обработка запросов, меняющих состояние</a></li>
</ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#example-walkthrough-handing-cors-requests-and-responses" data-md-type="link">Примеры обработки CORS-запросов и CORS-ответов</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#testing-cors-in-amp" data-md-type="link">Тестирование CORS в AMP</a></li>
</ul>
</li>
</ul>
<div data-md-type="block_html"></div>

## Зачем применять CORS в пределах моего собственного источника? <a id="why-do-i-need-cors-for-my-own-origin"></a>

Вам может быть непонятно, зачем использовать CORS в запросах к вашему собственному источнику. Давайте рассмотрим это подробнее.

Компоненты AMP, которые получают динамические данные (например, amp-form, amp-list и т. п.), отправляют запросы CORS к удаленным конечным точкам для получения данных. Если ваша AMP-страница содержит такие компоненты, вам необходимо предусмотреть обработку CORS, чтобы эти запросы не завершались ошибкой.

Проиллюстрируем это на примере.

Допустим, у вас есть AMP-страница, на которой перечислены продукты с ценами. Чтобы обновить цены на странице, пользователь нажимает кнопку, которая извлекает актуальные цены из конечной точки JSON (с помощью компонента amp-list). JSON-данные находятся в вашем домене.

Ну вот, страница находится _в моем домене_, а JSON — тоже _в моем домене_. Не вижу проблем!

Да, но как пользователь попал на вашу AMP-страницу? Что, если он имеет дело с кешированной страницей? Вполне вероятно, что пользователь не открыл вашу AMP-страницу напрямую, а нашел ее через другую платформу. Например, Поиск Google использует Google AMP Cache для быстрого рендеринга AMP-страниц; кешированные страницы, которые выдаются из Google AMP Cache, загружаются со _стороннего_ домена. Когда пользователь нажимает кнопку, чтобы обновить цены на вашей странице, кешированная AMP-страница отправляет запрос на ваш исходный домен для получения цен, что является несоответствием между источниками (кеш -> исходный домен). Чтобы сделать возможными подобные запросы, вам необходимо предусмотреть обработку CORS; в противном случае запрос не будет выполнен.

<amp-img alt="CORS and Cache" layout="responsive" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png" width="809" height="391">
  <noscript><img alt="CORS и кэш" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png"></noscript></amp-img>

**Хорошо, что мне делать?**

1. Для AMP-страниц, загружающих динамические данные, — убедитесь, что вы протестировали кешированную версию страницы; _не ограничивайтесь тестированием на своем собственном домене_ (см. раздел [Тестирование CORS в AMP](#testing-cors-in-amp) ниже).
2. Следуйте приведенным в данном документе инструкциям по обработке CORS-запросов и CORS-ответов.

## <a id="utilizing-cookies-for-cors-requests">Использование файлов cookie в CORS-запросах</a>

Большинство компонентов AMP, которые используют CORS-запросы, либо автоматически устанавливают [режим учетных данных,](https://fetch.spec.whatwg.org/#concept-request-credentials-mode) либо позволяют автору при желании включить его. Например, компонент [`amp-list`](https://amp.dev/documentation/components/amp-list) получает динамическое содержимое из конечной точки CORS JSON и позволяет автору устанавливать режим учетных данных с помощью атрибута `credentials`.

_Пример: включение персонализированного контента в amp-list с помощью файлов cookie_

[sourcecode:html]
<amp-list
credentials="include"
src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)"

>   <template type="amp-mustache">

    Your personal offer: ${% raw %}{{price}}{% endraw %}

  </template>
</amp-list>
[/sourcecode]

Указывая режим учетных данных, источник может включать cookie в CORS-запрос и также устанавливать cookie в ответе (с учетом [ограничений для сторонних файлов cookie](#third-party-cookie-restrictions)).

### Ограничения для сторонних файлов cookie <a name="third-party-cookie-restrictions"></a>

Ограничения сторонних файлов cookie, указанные в браузере, также применяются к CORS-запросам с учетными данными в AMP. Эти ограничения зависят от браузера и платформы, но в некоторых браузерах источник может устанавливать файлы cookie только в том случае, если пользователь ранее посещал источник в основном (верхнем) окне. Или, другими словами, только после того, как пользователь напрямую посетил сам исходный сайт. Исходя из этого, сервис, доступ к которому осуществляется через CORS, не может рассчитывать на возможность устанавливать файлы cookie по умолчанию.

## Безопасность CORS в AMP <a name="cors-security-in-amp"></a>

Чтобы обеспечить корректность и безопасность запросов с ваших AMP-страниц и ответов на них, вы должны:

1. [Проверять запросы](#verify-cors-requests).
2. [Отправлять соответствующие заголовки в ответах](#send-cors-response-headers).

Если вы используете в своем бэкенде Node, вы можете использовать [промежуточное ПО AMP CORS](https://www.npmjs.com/package/amp-toolbox-cors), которое является частью [AMP Toolbox](https://github.com/ampproject/amp-toolbox).

### <a id="verify-cors-requests">Проверка CORS-запросов</a>

Когда ваша конечная точка получает CORS-запрос:

1. [Убедитесь, что заголовок CORS-запроса <code>Origin</code> указывает на разрешенный источник (домен издателя + AMP-кеши)](#verify-cors-header).
2. [Если заголовок Origin отсутствует, убедитесь, что источник запроса не отличается от домена его получения (с помощью `AMP-Same-Origin`)](#allow-same-origin-requests).

#### 1) Разрешайте запросы с определенных источников CORS <a name="1-allow-requests-for-specific-cors-origins"></a>

<span id="verify-cors-header"></span>

Конечные точки CORS получают источник запроса посредством HTTP-заголовка `Origin`. Конечные точки должны разрешать запросы только от: (1) собственного источника издателя; и (2) всех источников `cacheDomain`, указанных в файле [https://cdn.ampproject.org/caches.json](https://cdn.ampproject.org/caches.json).

Например, конечные точки должны разрешать запросы от:

- Поддомена Google AMP Cache: `https://<домен издателя>.cdn.ampproject.org` <br> (например, `https://nytimes-com.cdn.ampproject.org`)

[tip type="read-on"] Сведения о форматах URL AMP-кешей можно получить по следующим ссылкам:

- [Обзор Google AMP Cache](https://developers.google.com/amp/cache/overview) [/tip]

#### <a id="2-allow-same-origin-requests">2) Разрешайте запросы в пределах одного источника</a>

<span id="allow-same-origin-requests"></span>

Если в запросах в рамках одного источника отсутствует заголовок `Origin`, AMP устанавливает специальный заголовок:

[sourcecode:text]
AMP-Same-Origin: true
[/sourcecode]

Этот специальный заголовок отправляется средой выполнения AMP, когда запрос XHR не выходит за рамки одного источника (то есть если он выполняется из некешированного документа). Запросы, в которых есть заголовок `AMP-Same-Origin:true`, следует разрешать.

### <a id="send-cors-response-headers">Отправка заголовков CORS-ответа</a>

Отправляемый после проверки CORS-запроса HTTP-ответ должен содержать следующие заголовки:

##### Access-Control-Allow-Origin: <origin> </origin><a name="access-control-allow-origin-origin"></a>

Этот заголовок является требованием <a href="https://www.w3.org/TR/cors/">спецификации CORS от W3</a>, где <code>origin</code> обозначает источник запроса, который был разрешен через заголовок CORS-запроса <code>Origin</code> (например, <code>"https://<publisher's subdomain>.cdn.ampproject.org"</code>).

Хотя спецификация CORS от W3 позволяет возвращать в ответе значение <code>\*</code>, для повышения безопасности следует выполнять следующее:

- Если заголовок `Origin` присутствует, проверьте корректность значения заголовка <code>Origin</code>, после чего продублируйте его в ответе.

### <a id="processing-state-changing-requests">Обработка запросов, меняющих состояние</a>

[tip type="important"] Выполните эти проверки _перед_ обработкой запроса. Данная процедура помогает обеспечить защиту от атак CSRF и позволяет избежать обработки запросов из ненадежных источников. [/tip]

Перед обработкой запросов, которые могут изменить состояние вашей системы (например, когда пользователь подписывается на список рассылки или отписывается от него), проверьте следующее:

**Если установлен заголовок `Origin`**:

1. Остановитесь и верните ответ с ошибкой, если источник не соответствует одному из следующих значений:

   - `<publisher's domain>.cdn.ampproject.org`
   - источник издателя («ваш источник»)

   где `*` обозначает совпадение с подстановочным знаком, а не сам символ звездочки (\*).

2. В противном случае обработайте запрос.

**Если заголовок `Origin` НЕ установлен**:

1. Убедитесь, что запрос содержит заголовок `AMP-Same-Origin: true`. Если запрос не содержит этого заголовка, остановитесь и верните ответ с ошибкой.
2. В противном случае обработайте запрос.

## Примеры обработки CORS-запросов и CORS-ответов <a name="example-walkthrough-handing-cors-requests-and-responses"></a>

Есть два сценария поступления CORS-запросов к вашей конечной точке:

1. Протестируйте запрос из того же источника <a></a>
2. Запрос из кешированного источника (из AMP-кеша).

Давайте рассмотрим эти сценарии на примере. В нашем примере мы управляем сайтом `example.com`, на котором размещена AMP-страница под названием `article-amp.html.` AMP-страница содержит список `amp-list` для извлечения динамических данных из файла `data.json`, который также размещен на `example.com`. Мы хотим обрабатывать запросы к нашему файлу `data.json`, поступающие с нашей AMP-страницы. Эти запросы могут поступать с AMP-страницы из того же источника (без кеширования) или с AMP-страницы из другого источника (из кеша).

<amp-img alt="CORS example" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png" width="629" height="433">
  <noscript><img alt="Пример CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png"></noscript></amp-img>

### Разрешенные источники <a name="allowed-origins"></a>

Основываясь на том, что мы знаем о CORS и AMP (из раздела [Проверка CORS-запросов](#verify-cors-requests) выше), в нашем примере мы разрешим запросы из следующих доменов:

- `example.com` --- домен издателя
- `example-com.cdn.ampproject.org` --- поддомен Google AMP Cache

### Заголовки ответов на разрешенные запросы <a name="response-headers-for-allowed-requests"></a>

Наш ответ на запросы из разрешенных источников будет содержать следующие заголовки:

[sourcecode:text]
Access-Control-Allow-Origin: <origin>
[/sourcecode]

Вот дополнительные заголовки ответа, которые мы можем включить в наш CORS-ответ:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Content-Type: application/json
Access-Control-Max-Age: <delta-seconds>
Cache-Control: private, no-cache
[/sourcecode]

### Псевдологика для работы с CORS <a name="pseudo-cors-logic"></a>

Наша логика обработки CORS-запросов и CORS-ответов может быть упрощена до следующего псевдокода:

[sourcecode:text]
IF CORS header present
IF origin IN allowed-origins
allow request & send response
ELSE
deny request
ELSE
IF "AMP-Same-Origin: true"
allow request & send response
ELSE
deny request
[/sourcecode]

#### Пример кода CORS <a name="cors-sample-code"></a>

Ниже представлен пример функции JavaScript, которую мы могли бы использовать для обработки CORS-запросов и CORS-ответов:

[sourcecode:javascript]
function assertCors(req, res, opt_validMethods, opt_exposeHeaders) {
var unauthorized = 'Unauthorized Request';
var origin;
var allowedOrigins = [
'https://example.com',
'https://example-com.cdn.ampproject.org',
'https://cdn.ampproject.org',
];
var allowedSourceOrigin = 'https://example.com'; //publisher's origin
// If same origin
if (req.headers['amp-same-origin'] == 'true') {
origin = sourceOrigin;
// If allowed CORS origin & allowed source origin
} else if (
allowedOrigins.indexOf(req.headers.origin) != -1 &&
sourceOrigin == allowedSourceOrigin
) {
origin = req.headers.origin;
} else {
res.statusCode = 403;
res.end(JSON.stringify({message: unauthorized}));
throw unauthorized;
}

res.setHeader('Access-Control-Allow-Credentials', 'true');
res.setHeader('Access-Control-Allow-Origin', origin);
}
[/sourcecode]

**Примечание**. Образец рабочего кода можно увидеть в файле [amp-cors.js](https://github.com/ampproject/amphtml/blob/main/build-system/server/amp-cors.js).

### Сценарий 1. GET-запрос с AMP-страницы из того же источника <a name="scenario-1-get-request-from-amp-page-on-same-origin"></a>

В следующем сценарии страница `article-amp.html` запрашивает файл `data.json`; источники не отличаются.

<amp-img alt="CORS example - scenario 1" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png" width="657" height="155">
  <noscript><img alt="Пример CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png"></noscript></amp-img>

Если мы изучим запрос, то обнаружим следующее:

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
AMP-Same-Origin: true
[/sourcecode]

Поскольку этот запрос исходит из того же источника, заголовок `Origin` отсутствует, но присутствует специальный заголовок запроса `AMP-Same-Origin: true`. Мы можем разрешить этот запрос, поскольку он получен из того же источника ( `https://example.com`).

Заголовки нашего ответа будут такими:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example.com
[/sourcecode]

### Сценарий 2: GET-запрос с кешированной AMP-страницы <a name="scenario-2-get-request-from-cached-amp-page"></a>

В следующем сценарии страница `article-amp.html`, кешированная в Google AMP Cache, запрашивает файл `data.json`; источники различаются.

<amp-img alt="CORS example - scenario 2" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png" width="657" height="155">
  <noscript><img alt="Пример CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png"></noscript></amp-img>

Изучив этот запрос, мы обнаружим следующее:

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

Поскольку этот запрос содержит заголовок `Origin`, мы можем удостовериться, что он поступил из разрешенного источника, и, следовательно, разрешить его.

Заголовки нашего ответа будут такими:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

## Работа с кешированными шрифтами <a name="working-with-cached-fonts"></a>

Google AMP Cache кеширует документы AMP HTML, изображения и шрифты для оптимизации скорости AMP-страницы. Хотя это желаемый результат, нам также следует предпринимать меры по обеспечению безопасности кешированных ресурсов. Мы вносим изменения в механизм выдачи кешированных ресурсов из AMP-кеша (как правило, это шрифты), так чтобы он использовал полученное из источника значение `Access-Control-Allow-Origin`.

### Предыдущее поведение (до октября 2019 г.) <a name="past-behavior-before-october-2019"></a>

Когда AMP-страница загружала `https://example.com/some/font.ttf` из атрибута `@font-face src`, AMP-кеш кешировал файл шрифта и выдавал его, как показано ниже (заголовок `Access-Control-Allow-Origin` имеет значение символа подстановки).

- URL `https://example-com.cdn.ampproject.org/r/s/example.com/some/font.tff`
- Access-Control-Allow-Origin: \*

### Новое поведение (октябрь 2019 г. и позже) <a name="new-behavior-october-2019-and-after"></a>

Предыдущая реализация являлась пермиссивной, что могло приводить к непредвиденному использованию шрифтов со сторонних источников. Благодаря внесенным изменениям AMP-кеш теперь отвечает тем же значением `Access-Control-Allow-Origin`, что и исходный сервер. Чтобы правильно загружать шрифты из кешированного документа AMP, вам нужно принимать AMP-кеш в качестве одного из допустимых источников в заголовке.

Пример реализации:

[sourcecode:javascript]
function assertFontCors(req, res, opt_validMethods, opt_exposeHeaders) {
var unauthorized = 'Unauthorized Request';
var allowedOrigins = [
'https://example.com',
'https://example-com.cdn.ampproject.org',
];
// If allowed CORS origin
if (allowedOrigins.indexOf(req.headers.origin) != -1) {
res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
} else {
res.statusCode = 403;
res.end(JSON.stringify({message: unauthorized}));
throw unauthorized;
}
}
[/sourcecode]

Например, если вы хотите загрузить /some/font.ttf в `https://example.com/amp.html`, ответ исходного сервера должен содержать заголовок Access-Control-Allow-Origin, как показано ниже.

<amp-img alt="CORS font example" layout="responsive" src="https://amp.dev/static/img/docs/cors-font.jpg" width="2268" height="1594">
  <noscript><img alt="Пример шрифта CORS" src="https://amp.dev/static/img/docs/cors-font.jpg"></noscript></amp-img>

[tip type="note"] Если вы не против, чтобы файл вашего шрифта был доступен из любого источника, вы можете отвечать с подстановочным значением заголовка `Access-Control-Allow-Origin`; AMP-кеш продублирует это значение — то есть будет отвечать с заголовком `Access-Control-Allow-Origin: *`. Если вы уже используете этот параметр, ничего менять не нужно. [/tip]

Мы планируем внести это изменение примерно в середине октября 2019 года. Предлагаем всем издателям AMP-контента, хранящим шрифты на собственном сервере, проверить, не повлияло ли на них данное обновление.

#### План внедрения <a name="roll-out-plan"></a>

- 2019-09-30: более точный контроль над списком доменов, к которым будет применяться это изменение. Данная сборка должна выйти в течение этой недели.
- 2019-10-07: возможность использования тестовых доменов для ручного тестирования.
- 2019-10-14: общее внедрение функциональности (возможны изменения в зависимости от результатов тестирования).

Следите за соответствующей [задачей здесь.](https://github.com/ampproject/amphtml/issues/24834)

## Тестирование CORS в AMP <a name="testing-cors-in-amp"></a>

Когда вы тестируете свои AMP-страницы, не забывайте также тестировать их кешированные версии.

### Проверяйте страницу через URL-адрес кеша <a name="verify-the-page-via-the-cache-url"></a>

Чтобы обеспечить правильное отображение и работу кэшированной AMP-страницы:

1. В браузере откройте URL-адрес, который будет использовать AMP-кеш для доступа к вашей AMP-странице. Формат URL-адреса кеша можно определить с помощью этого [инструмента из курса AMP By Example](https://amp.dev/documentation/examples/guides/using_the_google_amp_cache/).

   Например:

   - URL: `https://amp.dev/documentation/guides-and-tutorials/start/create/`
   - Формат URL AMP-кеша: `https://www-ampproject-org.cdn.ampproject.org/c/s/www.ampproject.org/docs/tutorials/create.html`

2. Откройте инструменты разработчика в браузере и убедитесь, что ошибок нет и все ресурсы загружены корректно.

### Проверяйте заголовки ответа сервера <a name="verify-your-server-response-headers"></a>

Вы можете использовать команду `curl`, чтобы убедиться, что ваш сервер отправляет правильные заголовки HTTP-ответа. В команде `curl` укажите URL запроса и все специальные заголовки, которые хотите добавить.

**Синтаксис**: `curl <request-url> -H <custom-header> - I`

#### Протестируйте запрос из того же источника <a name="test-request-from-same-origin"></a>

К запросам из того же источника система AMP добавляет специальный заголовок `AMP-Same-Origin:true`.

Вот наша команда curl для тестирования запроса из `https://ampbyexample.com` к файлу `examples.json` (в том же домене):

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'AMP-Same-Origin: true' -I
[/sourcecode]

Результаты выполнения команды содержат правильные заголовки ответа (примечание: ненужная информация убрана):

[sourcecode:http]
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample.com
access-control-allow-methods: POST, GET, OPTIONS
[/sourcecode]

#### Протестируйте запрос с кешированной AMP-страницы <a name="test-request-from-cached-amp-page"></a>

В CORS-запросах с отличающегося домена (т. е. из кеша) заголовок `origin` является частью запроса.

Вот наша команда curl для тестирования запроса с кешированной в Google AMP Cache AMP-страницы к файлу `examples.json`:

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'origin: https://ampbyexample-com.cdn.ampproject.org' -I
[/sourcecode]

Результаты выполнения команды содержат правильные заголовки ответа:

```http
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample-com.cdn.ampproject.org
access-control-allow-methods: POST, GET, OPTIONS
```
