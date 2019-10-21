---
$category@: dynamic-content
formats:
  - websites
  - email
  - ads
teaser:
  text: Allows you to create forms to submit input fields in an AMP document.
toc: true
$title: amp-form
---
<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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



<table>
  <tr>
    <td width="40%"><strong>Описание</strong></td>
    <td>Позволяет создавать теги <code>form</code> и <code>input</code>.</td>
  </tr>
  <tr>
    <td><strong>Скрипт</strong></td>
      <td><code>&lt;script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute">Поддерживаемые макеты</a></strong></td>
    <td>–</td>
  </tr>
  <tr>
    <td><strong>Примеры</strong></td>
    <td>Пример использования компонента amp-form можно найти <a href="https://ampbyexample.com/components/amp-form/">на сайте AMP By Example</a>.</td>
  </tr>
</table>


# Действия <a name="behavior"></a>

Расширение `amp-form` позволяет создавать формы (`<form>`) с полями для ввода данных и передачи их в AMP-документ. Расширение `amp-form` также поддерживает [полизаполнение](#polyfills) для некоторых действий, которые недоступны в браузерах.

[tip type="important"]
Если вы отправляете данные через форму, конечная точка сервера должна соответствовать [требованиям безопасности CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).
[/tip]

Перед созданием объекта `<form>` необходимо добавить скрипт для расширения `<amp-form>`. В противном случае документ будет недействительным. Если вы используете теги `input` не только для передачи значений (например, за пределами тега `<form>`), загружать расширение `amp-form` не требуется.

Вот пример базовой формы:

[example preview="inline" playground="true" imports="amp-form" template="amp-mustache"]
```html
<form method="post"
    action-xhr="https://example.com/subscribe"{% if not format=='email'%}  
    target="_top"{% endif %}>
    <fieldset>
      <label>
        <span>Name:</span>
        <input type="text"
          name="name"
          required>
      </label>
      <br>
      <label>
        <span>Email:</span>
        <input type="email"
          name="email"
          required>
      </label>
      <br>
      <input type="submit"
        value="Subscribe">
    </fieldset>
    <div submit-success>
      <template type="amp-mustache">
        Subscription successful!
      </template>
    </div>
    <div submit-error>
      <template type="amp-mustache">
        Subscription failed!
      </template>
    </div>
  </form>
```
[/example]

# Атрибуты <a name="attributes"></a>

# target <a name="target"></a>

Указывает, где отображать ответ формы после ее отправки. Варианты значений: `_blank` или `_top`.

# action <a name="action"></a>

Определяет конечную точку сервера для обработки данных, введенных в форму. В качестве значения необходимо указать абсолютный или относительный URL `https`. Ссылки на СДК не поддерживаются.

* Для варианта `method=GET` используйте этот атрибут или [`action-xhr`](#action-xhr).
* Для варианта `method=POST` используйте атрибут [`action-xhr`](#action-xhr).

[tip type="note"]
Атрибуты `target` и `action` поддерживаются только для запросов GET без XHR. Библиотека AMP будет использовать `action-xhr`, чтобы выполнить запрос, игнорируя атрибуты `action` и `target`. Если атрибут `action-xhr` отсутствует, AMP отправляет запрос GET request в конечную точку `action` и применяет `target`, чтобы открыть новое окно (при значении `_blank`). Кроме того, атрибуты `action` и `target` используются, когда расширение `amp-form` не удается загрузить.
[/tip]

# action-xhr <a name="action-xhr"></a>

Определяет конечную точку сервера для обработки данных, введенных в форму, и передает форму через XMLHttpRequest (XHR-запрос). В случае с XHR-запросом, он же AJAX-запрос, браузер не выполняет полную загрузку страницы и не открывает новую страницу. Запрос отправляется в фоновом режиме, с помощью [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) или же [XMLHttpRequest API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) (для более старых браузеров).

[tip type="important"]
Конечная точка должна соответствовать требованиям, перечисленным в спецификации для [запросов CORS в AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).
[/tip]

Для `method=POST` этот атрибут обязателен, а для `method=GET` –нет.

Значение для `action-xhr` – конечная точка. Оно может быть таким же, как и для `action`. Необходимо соблюдать перечисленные выше требования для `action`.

О перенаправлении пользователя после успешной отправки формы читайте в разделе [Перенаправление после отправки](#redirecting-after-a-submission) ниже.

# Другие атрибуты <a name="other-form-attributes"></a>

Все остальные [атрибуты формы](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) использовать не обязательно.

# custom-validation-reporting <a name="custom-validation-reporting"></a>

Это необязательный атрибут, который включает и выбирает пользовательскую стратегию создания отчетов о валидации. Допустимые значения: `show-first-on-submit`, `show-all-on-submit` или `as-you-go`.

Подробную информацию можно найти в разделе [Пользовательская валидация](#custom-validations) ниже.

# Поля и ввод данных <a name="inputs-and-fields"></a>

**Разрешено**:

* Прочие атрибуты, связанные с формами: `<textarea>`, `<select>`, `<option>`, `<fieldset>`, `<label>`, `<input type=text>`, `<input type=submit>` и т. п.
* Атрибуты `<input type=password>` и `<input type=file>` в рамках `<form method=POST action-xhr>`.
* [`amp-selector`](amp-selector.md)

**Запрещено**:

* `<input type=button>`, `<input type=image>`.
* Большинство связанных с формами атрибутов для ввода данных: `form`, `formaction`, `formtarget`, `formmethod` и пр.

В будущем мы можем сделать некоторые из этих правил менее строгими. Если это необходимо, [сообщите нам](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#suggestions-and-feature-requests) и предоставьте примеры.

Ознакомьтесь с [правилами для amp-form](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) в спецификации валидатора AMP.

# Действия <a name="actions"></a>

Элемент `amp-form` позволяет выполнять следующие действия:

| Действие | Описание |
|--------|-------------|
| `submit` | Инициирует отправку формы для определенного действия. Это может быть, например, нажатие на ссылку или [отправка формы с изменением событий ввода](#input-events). |
| `clear` | Очищает все значения в форме. Благодаря этому пользователи могут быстро заполнять формы во второй раз. |

[tip type="read-on"]
[Действия и события в AMP](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)
[/tip]

# События <a name="events"></a>

Элемент `amp-form` поддерживает следующие события:

| Событие | Условия активации |
|-------|-------------|
| `submit` | Форма отправлена, но процесс не завершен. |
| `submit-success` | Форма отправлена, ответ успешно получен. |
| `submit-error` | Форма отправлена, при получении ответа произошла ошибка. |
| `verify` | Инициирована асинхронная верификация. |
| `verify-error` | Асинхронная верификация завершена, при получении ответа произошла ошибка. |
| `valid` | Статус валидации формы меняется на valid (в соответствии со [стратегией создания отчетов](#reporting-strategies)). |
| `invalid` | Статус валидации формы меняется на invalid (в соответствии со [стратегией создания отчетов](#reporting-strategies)). |

Эти события могут использоваться в [атрибуте `on`](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#on).

Пример кода ниже прослушивает события `submit-success` и `submit-error` и в зависимости от полученных данных показывает разные окна просмотра.

```html

<form ...="" on="submit-success:success-lightbox;submit-error:error-lightbox">
</form>

```

Полный пример можно найти [здесь](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html).

# События ввода <a name="input-events"></a>

AMP поддерживает события `change` и `input-debounced` в дочерних элементах `<input>`. Благодаря этому вы можете использовать [атрибут `on`](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#on), чтобы выполнять действия с любым элементом при изменении входного значения.

Распространенный вариант – отправка формы об изменении входного значения (выбор переключателя для ответа на вопрос, выбор языка в поле `select` для перевода страницы и т. п.).

[example preview="inline" playground="true" imports="amp-form"]
```html
<form id="myform"
    method="post"
    action-xhr="https://example.com/myform"{% if not format=='email'%}  
    target="_blank"{% endif %}>
    <fieldset>
      <label>
        <input name="answer1"
          value="Value 1"
          type="radio"
          on="change:myform.submit">Value 1
      </label>
      <label>
        <input name="answer1"
          value="Value 2"
          type="radio"
          on="change:myform.submit">Value 2
      </label>
    </fieldset>
  </form>
```
[/example]

Полный пример можно найти [здесь](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html).

# Триггеры Аналитики <a name="analytics-triggers"></a>

Расширение `amp-form` запускает ряд событий, которые можно отслеживать с помощью конфигурации [amp-analytics](amp-analytics.md).

| Событие                     | Условия активации                        |
|---------------------------|-----------------------------------|
| `amp-form-submit`         | Запрос формы инициирован.      |
| `amp-form-submit-success` | Ответ успешно получен (например, когда ответ имеет статус `2XX`). |
| `amp-form-submit-error`   | При получении ответа произошла ошибка (например, когда ответ не имеет статуса `2XX`). |

Вы можете настроить аналитику для отправки событий. Пример:

```html
<amp-analytics>
  <script type="application/json">
    {
      "requests": {
        "event": "https://www.example.com/analytics/event?eid=${eventId}",
        "searchEvent": "https://www.example.com/analytics/search?formId=${formId}&query=${formFields[query]}"
      },
      "triggers": {
        "formSubmit": {
          "on": "amp-form-submit",
          "request": "searchEvent"
        },
        "formSubmitSuccess": {
          "on": "amp-form-submit-success",
          "request": "event",
          "vars": {
            "eventId": "form-submit-success"
          }
        },
        "formSubmitError": {
          "on": "amp-form-submit-error",
          "request": "event",
          "vars": {
            "eventId": "form-submit-error"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Все три события генерируют набор переменных, которые соответствуют определенной форме и ее полям. Эти переменные можно использовать для аналитики.

Пример формы с одним полем:

```html

<form id="submit_form" action-xhr="/comment" method="POST">
  <input type="text" name="comment">
    <input type="submit" value="Обсудить">
    </form>

```

При активации события `amp-form-submit`, `amp-form-submit-success` или `amp-form-submit-error` генерируются следующие переменные со значениями, указанными в форме:

  * `formId`
  * `formFields[comment]`

# Обработка успешных и ошибочных ответов <a name="successerror-response-rendering"></a>

Обрабатывать успешные ответы и ошибки в форме вы можете с помощью [расширенных шаблонов](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#templates), таких как [amp-mustache](amp-mustache.md). Успешные ответы также поддерживают привязку данных [amp-bind](amp-bind.md) и ряд атрибутов, описанных ниже.

| Атрибут ответа | Описание |
|-----------|---------------------|
| `submit-success` | Можно использовать для показа сообщения об успешном выполнении (например, когда ответ имеет статус `2XX`). |
| `submit-error` | Можно использовать для показа сообщения об ошибке (например, когда ответ имеет статус `2XX`).  |
| `submitting` | Можно использовать для показа сообщения во время отправки формы. Шаблон для этого атрибута имеет доступ к полям ввода в форме и может получать данные для отображения в любых целях. Ознакомьтесь с [примером формы](#example-submitting) ниже, чтобы узнать, как применяется атрибут `submitting`. |

# Как работать с шаблонами для обработки ответов <a name="to-render-responses-with-templating"></a>

* Примените атрибут ответа для *любого прямого дочернего элемента* в рамках `<form>`.
* Обработайте ответ в дочернем элементе, добавив туда тег `<template></template>` или `<script type="text/plain"></script>`. Можно также сослаться на шаблон с помощью атрибута `template="id_of_other_template"`.
* Предоставьте действительный объект JSON для ответов на `submit-success` и `submit-error`. Ответ в любом случае должен иметь заголовок `Content-Type: application/json`.

<a id="example-submitting"></a>

# Пример: форма с сообщениями об успешном выполнении, ошибке и процессе отправки <a name="example-form-displays-success-error-and-submitting-messages"></a>

В следующем примере ответы отображаются в виде встроенного шаблона внутри формы.

```html
{% raw %}<form ...="">
  <fieldset>
    <input type="text" name="firstName">
      ...
    </fieldset>
    <div verify-error="">
      <template type="amp-mustache">
        В форме обнаружена ошибка!
        {{#verifyErrors}}{{message}}{{/verifyErrors}}
    </template>
  </div>
  <div submitting="">
    <template type="amp-mustache">
      Идет отправка. {{name}}, подождите ещё немного.
    </template>
  </div>
  <div submit-success="">
    <template type="amp-mustache">
      Готово! {{name}}, благодарим за оформление подписки! Вы получите подтверждение на адрес {{email}}. После этого мы каждую неделю будем присылать Вам статьи на следующую тему: {{#interests}}<b>{{name}}</b> {{/interests}}.
    </template>
  </div>
  <div submit-error="">
    <template type="amp-mustache">
      Произошла ошибка! {{name}}, {{message}}.
    </template>
  </div>
</form>
{% endraw %}
```

Конечная точка издателя `action-xhr` возвращает описанные ниже ответы JSON.

При успешной регистрации:

```json
{
  "name": "Jane Miller",
  "interests": [{"name": "Basketball"}, {"name": "Swimming"}, {"name": "Reading"}],
  "email": "email@example.com"
}
```

При ошибке:
```json
{
  "name": "Jane Miller",
  "message": "The email (email@example.com) you used is already subscribed."
}
```

Вы можете обрабатывать ответы с помощью ссылки на шаблон, описанной выше. Это атрибут `template`, с идентификатором шаблона, который задается для элементов с атрибутами `submit-success` и `submit-error`.

```html
{% raw %}<template id="submit_success_template" type="amp-mustache">
  Готово! {{name}}, благодарим за оформление подписки! Вы получите подтверждение на адрес {{email}}. После этого мы каждую неделю будем присылать Вам статьи на следующую тему: {{#interests}}<b>{{name}}</b> {{/interests}}.
</template>
<template id="submit_error_template" type="amp-mustache">
  Произошла ошибка!{{name}}, {{message}}.
</template></p>

<form ...="">
  <fieldset>
    ...
  </fieldset>
  <div submit-success="" template="submit_success_template"></div>
  <div submit-error="" template="submit_error_template"></div>
</form>
{% endraw %}
```

Полный пример можно найти [здесь](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html).

# Как обработать успешный ответ с помощью привязки данных <a name="to-render-a-successful-response-with-data-binding"></a>

* Используйте [атрибут on](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md), чтобы связать атрибут *submit-success* в форме с [`AMP.setState()`](amp-bind.md#updating-state-with-amp.setstate%28%29).
* Используйте свойство `event`, чтобы получить данные ответа.
* Добавьте в нужный элемент атрибут состояния, чтобы привязать ответ формы.

В примере ниже показан ответ `submit-success` с [`amp-bind`](amp-bind.md):
```html
<p [text]="'Thanks, ' + subscribe +'! You have successfully subscribed.'">Subscribe to our newsletter</p>
<form method="post"
      action-xhr="/components/amp-form/submit-form-input-text-xhr"
      target="_ top"
      on="submit-success: AMP.setState({'subscribe': event.response.name})">
  <div>
    <input type="text"
        name="name"
        placeholder="Name..."
        required>
    <input type="email"
      name="email"
      placeholder="Email..."
      required>
  </div>
  <input type="submit" value="Subscribe">
</form>
```

Если форма отправлена успешно, она вернет ответ JSON. Пример:

```json
{
  "name": "Jane Miller",
  "email": "email@example.com"
}
```
Затем `amp-bind` обновит текст элемента `<p>`, чтобы он соответствовал статусу `subscibe`:

```html
  ...
  <p [text]="'Thanks, ' + subscribe +'! You have successfully subscribed.'">Thanks Jane Miller! You have successfully subscribed.</p>
  ...
```

# Перенаправление после отправки <a name="redirecting-after-a-submission"></a>

После успешной отправки формы вы можете перенаправить пользователей на новую страницу. Для этого задайте в ответе заголовок `AMP-Redirect-To` с URL для переадресации. Необходимо использовать протокол HTTPS, иначе система AMP выдаст ошибку и перенаправление не сработает.  Заголовки HTTP-ответа настраиваются через ваш сервер.

Обязательно обновите заголовок ответа `Access-Control-Expose-Headers`, добавив `AMP-Redirect-To` в список допустимых вариантов.  Подробные сведения о заголовках можно найти в статье [Безопасность CORS для AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).

*Пример ответа с заголовком:*

```text
AMP-Redirect-To: https://example.com/forms/thank-you
Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin, AMP-Redirect-To
```

[tip type="ll callout('Совет</b><a class="type_success"]
Ознакомьтесь со статьями [Отправка формы с обновлением](https://ampbyexample.com/components/amp-form/#form-submission-with-page-update) и [Страница товара](https://ampbyexample.com/samples_templates/product_page/#product-page) на сайте AMP By Example. Там есть пример перенаправления после отправки формы.
[/tip]

# Пользовательская валидация <a name="custom-validations"></a>

Расширение `amp-form` позволяет создать собственный интерфейс валидации. Для этого применяется атрибут `custom-validation-reporting` в сочетании с одной из следующих стратегий: `show-first-on-submit`, `show-all-on-submit` или `as-you-go`.

Чтобы настроить пользовательскую валидацию для своей формы, выполните следующие действия:

1. Задайте атрибут `custom-validation-reporting` для элемента `form` и выберите [одну из доступных стратегий](#reporting-strategies).
1. Предоставьте свой собственный интерфейс, размеченный с помощью специальных атрибутов. AMP распознает их и будет выдавать сообщения в нужное время (в зависимости от выбранной стратегии).

Пример:

[example preview="inline" playground="true" imports="amp-form"]
```html
<form method="post"
    action-xhr="https://example.com/subscribe"
    custom-validation-reporting="show-all-on-submit"{% if not format=='email'%}  
    target="_blank"{% endif %}>
    <fieldset>
      <label>
        <span>Name:</span>
        <input type="text"
          name="name"
          id="name5"
          required
          pattern="\w+\s\w+">
        <span visible-when-invalid="valueMissing"
          validation-for="name5"></span>
        <span visible-when-invalid="patternMismatch"
          validation-for="name5">
          Please enter your first and last name separated by a space (e.g. Jane Miller)
        </span>
      </label>
      <br>
      <label>
        <span>Email:</span>
        <input type="email"
          name="email"
          id="email5"
          required>
        <span visible-when-invalid="valueMissing"
          validation-for="email5"></span>
        <span visible-when-invalid="typeMismatch"
          validation-for="email5"></span>
      </label>
      <br>
      <input type="submit"
        value="Subscribe">
    </fieldset>
  </form>
```
[/example]

Другие примеры можно найти на странице [examples/forms.amp.html](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html).

Правило для сообщений о валидации: если в элементе нет текстового контента, AMP будет использовать сообщение по умолчанию из браузера. В примере выше, где данные `name5` отсутствуют, но попытка валидации выполняется (то есть пользователь пытается отправить форму), AMP заполняет элемент `<span visible-when-invalid="valueMissing" validation-for="name5"></span>` сообщением из браузера и показывает этот `span` пользователю.

[tip type="important"]
Предоставьте собственный интерфейс валидации для каждого возможного статуса ошибки. При отсутствии этих данных, пользователь не увидит значения `custom-validation-reporting` для отсутствующего статуса. Все варианты описаны в [официальной документации об отчетах W3C HTML](https://www.w3.org/TR/html50/forms.html#validitystate).
[/tip]

# Стратегии создания отчетов <a name="reporting-strategies"></a>

Для атрибута `custom-validation-reporting` необходимо указать одну из перечисленных ниже стратегий отчетности.

# Показывать первую ошибку при отправке <a name="show-first-on-submit"></a>

Стратегия `show-first-on-submit` имитирует поведение браузера по умолчанию, когда начинается валидация. Показывается первая найденная ошибка, остальные игнорируются.

# Показывать все ошибки при отправке <a name="show-all-on-submit"></a>

Стратегия `show-all-on-submit` показывает все ошибки валидации при отправке формы. Это полезно, если вы хотите показывать сводку по валидациям.

# Показывать сообщения в реальном времени <a name="as-you-go"></a>

Стратегия `as-you-go` позволяет показывать пользователю сообщения по ходу его действий. Например, если пользователь введет неверный адрес электронной почты, он сразу увидит ошибку.  Как только она будет исправлена, сообщение исчезнет.

# Показывать сообщения при взаимодействии и отправке <a name="interact-and-submit"></a>

Стратегия `interact-and-submit` сочетает варианты `show-all-on-submit` и `as-you-go`. В некоторых полях ошибки показываются сразу же, а при отправке формы выдается список ошибок в целом.

# Валидация <a name="verification"></a>

Валидация HTML5 выдает обратную связь только с учетом информации на странице (например, если значение соответствует определенному шаблону). Благодаря `amp-form` вы можете предоставить пользователю больше ценных сведений: например, сообщить о том, что указанный адрес электронной почты уже зарегистрирован. Ещё один вариант: проверка соответствия указанного города и почтового индекса.

Пример:
```html
{% raw %}<h4>Пример верификации</h4>
<form method="post" action-xhr="/form/verify-json/post" verify-xhr="/form/verify-json/post"{% if not format=='email'%}   target="_blank"{% endif %}>
  <fieldset>
    <label>
      <span>Электронная почта</span>
      <input type="text" name="email" required="">
      </label>
      <label>
        <span>Почтовый индекс</span>
        <input type="tel" name="zip" required="" pattern="[0-9]{5}(-[0-9]{4})?">
        </label>
        <label>
          <span>Город</span>
          <input type="text" name="city" required="">
          </label>
          <label>
            <span>Документ</span>
            <input type="file" name="document" no-verify="">
            </label>
            <div class="spinner"></div>
            <input type="submit" value="Отправить">
            </fieldset>
            <div submit-success="">
              <template type="amp-mustache">
                <p>Готово. Вы зарегистрировались как {{email}}.</p>
              </template>
            </div>
            <div submit-error="">
              <template type="amp-mustache">
                {{#verifyErrors}}
              <p>{{message}}</p>
              {{/verifyErrors}}
            {{^verifyErrors}}
          <p>Произошла ошибка. Повторите попытку позже.</p>
          {{/verifyErrors}}
      </template>
    </div>
  </form>
{% endraw %}
```

Форма отправляет поле `__amp_form_verify` вместе со всеми прочими данными, чтобы сообщить серверу, что это запрос валидации, а не просто обычная отправка данных.
При этом сервер не сохраняет такой запрос, если одна и та же конечная точка применяется и для валидации, и для отправки данных.

Вот как выглядит ответ с ошибкой при проверке:
```json
  {
    "verifyErrors": [
      {"name": "email", "message": "That email is already taken."},
    {"name": "zip", "message": "The city and zip do not match."}
  ]
}
```

Чтобы удалить поле из запроса `verify-xhr`, добавьте атрибут `no-verify` в элемент ввода.

Другие примеры можно найти на странице [examples/forms.amp.html](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html).

# Замены переменных <a name="variable-substitutions"></a>

Расширение `amp-form` поддерживает [замены переменных платформы](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md) для скрытых полей ввода с атрибутом `data-amp-replace`. При каждой отправке формы `amp-form` находит все вхождения `input[type=hidden][data-amp-replace]` в ней и заменяет переменные в атрибуте `value` на нужный результат.

Необходимо предоставить переменные для каждой замены и каждого поля в виде строки, разделенной пробелами и добавленной в `data-amp-replace` (см. пример ниже). AMP не заменяет переменные, которые не указаны явным образом.

Вот пример кода до и после замены. Учтите, что использовать необходимо синтаксис платформы для подстановок, а не аналитических данных.
```html
<!-- Initial Load -->
<form ...>
  <input name="canonicalUrl" type="hidden"
        value="The canonical URL is: CANONICAL_URL - RANDOM - CANONICAL_HOSTNAME"
        data-amp-replace="CANONICAL_URL RANDOM">
  <input name="clientId" type="hidden"
        value="CLIENT_ID(myid)"
        data-amp-replace="CLIENT_ID">
  ...
</form>
```

При отправке формы AMP пытается проанализировать переменные и соответственно заменить атрибут `value` для всех полей. В случае запроса с XHR все переменные, скорее всего, будут заменены. Однако в случае с запросами GET без XHR те значения, которые требуют асинхронной обработки, могут быть недоступны, поскольку они не были преобразованы ранее. Например, значение `CLIENT_ID` останется прежним, если ранее оно не было сохранено в кеше.

```html
<!-- Пользователь отправляет форму. Значения переменных преобразуются в значения полей. -->
<form ...>
  <input name="canonicalUrl" type="hidden"
        value="The canonical URL is: https://example.com/hello - 0.242513759125 - CANONICAL_HOSTNAME"
        data-amp-replace="CANONICAL_URL RANDOM">
  <input name="clientId" type="hidden"
        value="amp:asqar893yfaiufhbas9g879ab9cha0cja0sga87scgas9ocnas0ch"
        data-amp-replace="CLIENT_ID">
    ...
</form>
```

Обратите внимание, что значение `CANONICAL_HOSTNAME` в примере выше не было заменено, поскольку оно отсутствовало в белом списке атрибута `data-amp-replace` в первом поле.

Замены будут происходить при каждой последующей отправке. Ознакомьтесь со статьей о [замене переменных AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md).

# Полизаполнения <a name="polyfills"></a>

Расширение `amp-form` поддерживает полизаполнения для поведений и функций, которые отсутствуют в некоторых браузерах или доступны только в более поздней версии CSS.

# Блокировка форм с ошибками и отправка подсказок для пользователей <a name="invalid-submit-blocking-and-validation-message-bubble"></a>

Браузеры с движками на основе Webkit не поддерживают формы с ошибками (по данным на август 2016 года). Это, например, Safari для любых платформ и все браузеры iOS. Расширение `amp-form` в таких случаях применяет полизаполнение, чтобы блокировать все формы с ошибками и показывать пользователям сообщения.

# Псевдоклассы для взаимодействия с пользователем <a name="user-interaction-pseudo-classes"></a>

Псевдоклассы `:user-invalid` и `:user-valid` относятся к [новой спецификации CSS Selectors 4](https://drafts.csswg.org/selectors-4/#user-pseudos). Они оптимизируют способы привязки для определения стиля верных и неверных полей с учетом ряда критериев.

Одно из основных отличий `:invalid` и `:user-invalid` – время применения к элементу. Псевдокласс `:user-invalid` применяется после того, как пользователь явным образом провзаимодействовал с полем (например, ввел туда текст или перешел к следующему пункту).

Расширение `amp-form` предоставляет [классы](#classes-and-css-hooks) для заполнения этих псевдоклассов, а также `` распространяет их на родительские элементы `fieldset` и `form`.

# Валидация `<textarea>` <a name="-validation"></a>

Сопоставление регулярных выражений – это распространенная функция валидации. Она естественным образом поддерживается для большинства элементов ввода кроме `<textarea>`. Мы поддерживаем полизаполнение этой функции, а также атрибут `pattern` для элементов `<textarea>`.

Форма AMP поддерживает атрибут `autoexpand` для элементов `<textarea>`. Благодаря этому текстовая область может увеличиваться и уменьшаться с учетом текста, введенного пользователем, вплоть до максимального размера. Если пользователь изменяет размер поля вручную, автоматическое расширение отключается.

```html
<textarea autoexpand></textarea>
```

# Стилизация <a name="styling"></a>

# Классы и привязки CSS <a name="classes-and-css-hooks"></a>

Расширение `amp-form` поддерживает классы и привязки CSS, чтобы издатели могли настраивать стиль форм и полей.

Классы для указания статуса формы:

* `.amp-form-initial`
* `.amp-form-verify`
* `.amp-form-verify-error`
* `.amp-form-submitting`
* `.amp-form-submit-success`
* `.amp-form-submit-error`

Классы для [полизаполнения псевдоклассов взаимодействия с пользователем](#user-interaction-pseudo-classes):

* `.user-valid`
* `.user-invalid`

С помощью этих классов издатели могут задавать стиль полей и целых наборов. Например, можно сделать так, чтобы поле с ошибкой выделялось красной рамкой, когда пользователь переходит к следующему пункту.

Подробный пример можно найти [здесь](https://github.com/ampproject/amphtml/blob/master/examples/forms.amp.html).

[tip type="ll callout('Совет</b><a class="type_success"]
На сайте [AMP Start](https://ampstart.com/components#form-elements) вы можете найти уже стилизованные элементы для форм, чтобы добавить их на свои AMP-страницы.
[/tip]

# Безопасность <a name="security-considerations"></a>

# Защита от XSRF-атак <a name="protecting-against-xsrf"></a>

Помимо [спецификации AMP CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md) настоятельно рекомендуем ознакомиться со статьей [об обработке запросов на изменение состояния](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)#processing-state-changing-requests). Это необходимо для защиты от [XSRF-атак](https://en.wikipedia.org/wiki/Cross-site_request_forgery), когда злоумышленники выполняют неавторизованные команды в текущем сеансе пользователя без его ведома.

Вот основные правила:

* Для запросов на изменение статуса используйте только запросы POST.
* Применяйте запросы GET без XHR только в целях навигации (например, для поиска).
    * Запросы GET без XHR не будут получать точные источники и заголовки. При использовании этого механизма серверный код не сможет обеспечить защиту от XSRF-атак.
    * В целом мы рекомендуем использовать запросы GET как с XHR, так и без XHR, только для получения навигационных или информационных данных.</li>
* Запросы POST без XHR не поддерживаются в AMP-документах, поскольку заголовок `Origin` устанавливается для них по-разному в зависимости от браузера. Связанные с этим сложности могут помешать защите от XSRF-атак. Возможно, в будущем мы изменим это правило. Сообщите о проблеме, если вы считаете, что это необходимо.
