---
'$title': Формат AMP для писем
$order: 1
formats:
  - email
teaser:
  text: Необходимая разметка
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

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

AMP — это технология, используемая для разработки сверхбыстрых веб-страниц для мобильных клиентов. AMP представляет собой набор специальных HTML-тегов с реализацией на JavaScript, которые позволяют с легкостью реализовывать нужную функциональность и специально спроектированы с упором на высокую производительность и безопасность. Существуют [компоненты AMP](https://amp.dev/documentation/components/) для самых разных задач: от создания кольцевых галерей и адаптивных элементов форм до получения актуального контента с удаленных конечных точек.

Формат «AMP для писем» содержит [специальный набор компонентов AMP](https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-components.md), предназначенный для сообщений электронной почты. Получатели AMP-писем могут просматривать контент AMP-компонентов и взаимодействовать с ним прямо в письме.

## Обязательная разметка <a name="required-markup"></a>

Ниже представлен минимальный объем разметки, который необходим для создания корректно сформированного AMP-письма:

[sourcecode:html]

<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello, world.
  </body>
</html>
[/sourcecode]

Все AMP-письма ДОЛЖНЫ:

- <a name="dctp"></a> начинаться с элемента `<!doctype html>`. [🔗](#dctp)
- <a name="ampd"></a> содержать тег верхнего уровня `<html ⚡4email>` (также допускается `<html amp4email>`). [🔗](#ampd)
- <a name="crps"></a> содержать теги `<head>` и `<body>` (в HTML они необязательны). [🔗](#crps)
- <a name="chrs"></a> содержать `<meta charset="utf-8">` в качестве первого дочернего элемента тега head. [🔗](#chrs)
- <a name="scrpt"></a> содержать `<script async src="https://cdn.ampproject.org/v0.js"></script>` в теге head. [🔗](#scrpt)
- <a name="boilerplate"></a> содержать шаблон amp4email (`<style amp4email-boilerplate>body{visibility:hidden}</style>`) в своем теге head, чтобы обеспечивать скрытие контента письма до загрузки JavaScript-кода AMP. [🔗](#boilerplate)

Объем всей разметки AMPHTML не должен превышать 102 400 байт.

## Структура и рендеринг <a name="structure-and-rendering"></a>

Формат «AMP для писем» использует стандартный подтип <a>MIME</a> <code>multipart/alternative</code>, определенный в [RFC 1521, раздел 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

_Для получения дополнительной информации см. [Структура и рендеринг AMP-писем](https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-structure.md)._

## Совместимые компоненты AMP <a name="supported-amp-components"></a>

_См. [AMP для писем: совместимые компоненты](https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-components.md)._

## Требования к HTML <a name="html-requirements"></a>

_См. статью [Поддержка HTML в AMP для писем](https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-html.md)._

## Требования к CSS <a name="css-requirements"></a>

### Поддерживаемые CSS-свойства <a name="supported-selectors-and-properties"></a>

_См. статью [Поддержка CSS в AMP для писем](https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-css.md)._

### Использование CSS в документе AMP <a name="specifying-css-in-an-amp-document"></a>

Весь используемый в AMP-документе код CSS должен размещаться в теге `<style amp-custom>` (внутри тега head) или быть добавлен в виде встроенных атрибутов `style`.

[sourcecode:html]
...

<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
  amp-img.grey-placeholder {
    background-color: grey;
  }
</style>

...

</head>
[/sourcecode]

Примечание: общий объем тега `<style>` не может превышать 50 000 байт; это проверяется валидатором.

## Размеры документа <a name="document-dimensions"></a>

- **Оптимальная ширина**: 800 пикселей или меньше (на некоторых клиентах превышающий эту ширину контент может быть обрезан).

- **Высота**: переменная, клиент позволяет пользователю прокручивать содержимое.

## Валидация <a name="validation"></a>

Чтобы обеспечить соответствие ваших писем строгим критериям формата «AMP для писем», вы можете использовать существующие инструменты валидации кода AMP.

Дополнительную информацию см. в статье [Валидация AMP-писем](https://amp.dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails/).

## Конфиденциальность и безопасность <a name="privacy-and-security"></a>

### Отслеживание открытия письма и взаимодействия с ним <a name="tracking-email-opens-and-interaction"></a>

AMPHTML позволяет отслеживать открытие писем с помощью методов пиксельного отслеживания, как и в обычных электронных письмах в формате HTML. Какие-либо инициированные пользователем запросы данных из внешних служб также являются сигналом о том, что пользователь взаимодействует с сообщением. Почтовые клиенты могут предоставлять пользователям возможность отключать загрузку удаленных изображений и другие внешние запросы.

### Аналитика AMP <a name="amp-specific-analytics"></a>

Не поддерживаются следующие аналитические методики AMP:

- [AMP `CLIENT_ID`](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics#user-identification)
- [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics)
- [`amp-pixel`](https://amp.dev/documentation/components/amp-pixel)
- [Подстановка переменных AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/configure-analytics/analytics_basics/#variable-substitution)

### Поведение конкретных компонентов <a name="component-specific-considerations"></a>

Запросы изображений, содержащихся в [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel) или [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion), могут указывать отправителю, что пользователь взаимодействует с сообщением.

Перенаправления в [`<amp-form>`](https://amp.dev/documentation/components/amp-form) запрещены во время выполнения.

## Обратная связь и поддержка <a name="feedback--support"></a>

Обратиться за помощью по теме AMP для писем или поделиться своим мнением можно по каналам [общения постоянных участников](https://github.com/ampproject/amphtml/blob/main/CONTRIBUTING.md#ongoing-participation)
