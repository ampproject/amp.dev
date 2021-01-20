---
"$title": 'AMP для писем: совместимые компоненты'
order: '3'
formats:
- email
teaser:
  text: 'Ниже приводится список компонентов AMP, которые на данный момент поддерживаются в AMP-письмах. Компоненты сгруппированы по следующим категориям:'
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-components.md.
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

Ниже приводится список [компонентов AMP](https://amp.dev/documentation/components/?format=email), которые на данный момент поддерживаются в AMP-письмах. Компоненты сгруппированы по следующим категориям:

- [Динамический контент](#dynamic-content)
- [Макет](#layout)
- [Мультимедиа](#media)

## Динамический контент <a name="dynamic-content"></a>

Элемент | Описание
--- | ---
[`<amp-form>`](https://amp.dev/documentation/components/amp-form) | Элемент формы. Вместо обычного атрибута действия должен использоваться атрибут action-xhr. Может использоваться вместе с `<template type="amp-mustache">` для отображения ответа. <br><br>**Примечание.** [Перенаправление после отправки формы](https://amp.dev/documentation/components/amp-form/#redirecting-after-a-submission) не допускается.
[`<amp-selector>`](https://amp.dev/documentation/components/amp-selector) | Виджет-селектор для форм, допускающий выбор нескольких вариантов.
[`amp-bind`](https://amp.dev/documentation/components/amp-bind) и [`<amp-bind-macro>`](https://amp.dev/documentation/components/amp-bind#defining-macros-with-amp-bind-macro) | Простой язык сценариев в AMP, который позволяет управлять конечным автоматом для взаимодействия между элементами. Может также использоваться, чтобы добавлять определенное поведение в ответ на определенные события.<br><br>**Примечание.** Не допускается привязка к `[href]` или `[src]`. Также нельзя использовать действия `AMP.print`, `AMP.navigateTo` и `AMP.goBack`.
[`<amp-state>`](https://amp.dev/documentation/components/amp-bind#%3Camp-state%3E-specification) | `<amp-state>` используется для определения начального состояния, используемого компонентом `amp-bind`. <br><br>**Примечание.** Атрибут `src` в настоящее время не поддерживается.
[`<amp-list>`](https://amp.dev/documentation/components/amp-list) | Выполняет загрузку удаленных данных JSON, которые будут отображаться с помощью [`<amp-mustache>`](https://amp.dev/documentation/components/amp-mustache).<br><br>**Примечание.** Привязка к атрибуту `[src]` не допускается. Также не разрешается добавлять учетные данные пользователя с помощью `credentials="include"`.
[`<template type="amp-mustache">`](https://amp.dev/documentation/components/amp-mustache) | Разметка шаблона Mustache для отображения результатов вызова `amp-list`.

## Макет <a name="layout"></a>

Элемент | Описание
--- | ---
[атрибуты макета](https://amp.dev/documentation/guides-and-tutorials/learn/amp-html-layout/#layout-attributes) | Атрибуты макета определяют его поведение.
[`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion) | Элемент пользовательского интерфейса, упрощающий отображение или скрытие различных разделов.
[`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel) | Компонент для создания кольцевой галереи.
[`<amp-fit-text>`](https://amp.dev/documentation/components/amp-fit-text) | Вспомогательный компонент для адаптивного размещения текста в определенной области.
[`<amp-layout>`](https://amp.dev/documentation/components/amp-layout) | Контейнер для адаптивных макетов,  использующих фиксированное соотношение сторон.
[`<amp-sidebar>`](https://amp.dev/documentation/components/amp-sidebar) | Боковая панель для функций навигации.
[`<amp-timeago>`](https://amp.dev/documentation/components/amp-timeago) | Предоставляет удобный способ отображения меток времени.

## Мультимедиа <a name="media"></a>

Элемент | Описание
--- | ---
[`<amp-img>`](https://amp.dev/documentation/components/amp-img) | AMP-компонент, заменяющий `<img>`. <br><br>**Примечание.** Привязка к `[src]` не допускается.
[`<amp-anim>`](https://amp.dev/documentation/components/amp-anim) | Встраивает файлы GIF. <br><br>**Примечание.** Привязка к `[src]` не допускается.
