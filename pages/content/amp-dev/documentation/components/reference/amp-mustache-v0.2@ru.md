---
$title: amp-mustache
$category@: dynamic-content
teaser:
  text: Компонент, который обеспечивает обработку шаблонов Mustache.js
---



<!--
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



Этот компонент обеспечивает обработку шаблонов [Mustache.js](https://github.com/janl/mustache.js/).

<table>
  <tr>
    <td width="40%"><strong>Скрипт</strong></td>
    <td>
      <div>
      <code>&lt;script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js">&lt;/script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Примеры</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-mustache/">Пример amp-mustache с комментариями</a> на сайте AMP By Example.</td>
  </tr>
</table>


## Примечания к версиям <a name="version-notes"></a>

| Версия | Описание |
|-------|-----|
| 0.2 | Реализована поддержка элементов `<svg>`. Размер пакета уменьшен до 12,2 КБ вместо 20,5 КБ (используется архивация gzip).Инструмент, предназначенный для устранения уязвимостей в коде HTML, теперь использует новую библиотеку (DOMPurify вместо Caja). Поскольку списки допустимых тегов и атрибутов в этих библиотеках отличаются, переход может привести к критическим изменениям. Мы рекомендуем проводить тестирование страниц перед дальнейшей подготовкой к публикации, чтобы узнать, не привело ли автоматическое обновление разметки к проблемам с функционированием различных элементов на странице. |
| 0.1 | Исходная реализация. |

## Синтаксис <a name="syntax"></a>

Mustache представляет собой синтаксис шаблона, не использующий логику. Подробнее читайте в [документации по Mustache.js](https://github.com/janl/mustache.js/). Примеры основных тегов Mustache:

* {% raw %}`{{variable}}`{% endraw %}: тег для переменной, который выводит значение переменной с экранированием для использования в коде HTML.
* {% raw %}`{{#section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: тег для обозначения раздела. Он может запустить проверку на наличие переменной и выполнить перебор, если она представляет собой массив.
* {% raw %}`{{^section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}: тег, который выполняет противоположную операцию – осуществляет проверку на отсутствие переменной.
* {% raw %}`{{{unescaped}}}`{% endraw %}: использование тройной фигурной скобки отменяет экранирование тегов HTML. Эта функция может применяться только к отдельным элементам разметки, перечисленным в разделе "Ограничения" ниже.

## Использование <a name="usage"></a>

Шаблон `amp-mustache` должен определяться и использоваться в соответствии со [спецификациями шаблонов AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-templates.md).

Чтобы объявить и загрузить шаблон `amp-mustache`, нужно использовать следующий код:

```html
<script src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js" async="" custom-template="amp-mustache"></script>
```

Затем шаблоны Mustache нужно объявить в теге script или template, используя следующий код:

[sourcecode:html]
{% raw %}<!-- Using template tag. -->
<template type="amp-mustache">
  Hello {{world}}!
</template>
{% endraw %}[/sourcecode]
ИЛИ

<!-- Using script tag. -->
[sourcecode:html]
{% raw %}<script type="text/plain" template="amp-mustache">
  Hello {{world}}!
</script>
{% endraw %}[/sourcecode]

Мы рекомендуем по возможности применять тег `template`, поскольку это открывает доступ к некоторым полезным функциям при валидации AMP. Тег `script` следует использовать в особых случаях или при возникновении проблем с шаблонами в таблицах. Более подробные сведения приведены в разделе "Таблицы" ниже.

Определение шаблонов, выбор момента для их обработки и получение необходимых данных зависят от типа элемента AMP, к которому применяются эти шаблоны, например [amp-list](amp-list.md) или [amp-form](amp-form.md).

## Ограничения <a name="restrictions"></a>

### Валидация <a name="validation"></a>

Аналогично другим шаблонам APM, шаблоны `amp-mustache` должны представлять собой фрагменты кода DOM с правильным форматированием. Помимо прочего, с помощью кода `amp-mustache` нельзя решать следующие задачи:

* Определять название тега. Например, запрещено использовать синтаксис {% raw %}`<{{tagName}}>`{% endraw %}.
* Определять название атрибута. Например, запрещено использовать синтаксис {% raw %}`<div {{attrName}}=something>`{% endraw %}.

Тройные фигурные скобки можно использовать только со следующими тегами: `a`, `b`, `br`, `caption`, `colgroup`, `code`, `del`, `div`, `em`, `i`, `ins`, `li`, `mark`, `ol`, `p`, `q`, `s`, `small`, `span`, `strong`, `sub`, `sup`, `table`, `tbody`, `time`, `td`, `th`, `thead`, `tfoot`, `tr`, `u`, `ul`.

### Устранение уязвимостей в коде HTML <a name="sanitization"></a>

Код, в котором используется шаблон Mustache, проходит автоматическую проверку на безопасность и соответствие требованиям AMP. В результате этой процедуры некоторые элементы и атрибуты могут быть удалены из кода без предупреждения.

## Особые случаи <a name="pitfalls"></a>

### Вложенные шаблоны <a name="nested-templates"></a>

Как указано в спецификациях AMP, нельзя использовать элементы `<template>`, которые будут дочерними по отношению к другим элементам `<template>`. Соблюдение этого требования проверяется при валидации. Подобная ситуация может иметь место, если вы применяете шаблоны к вложенным компонентам, например `amp-list` и `amp-form`.

Чтобы решить эту проблему, можно создавать ссылки на элементы `<template>` с помощью элемента `id`, применяя атрибут `template` в компоненте. Пример:

[sourcecode:html]
{% raw %}<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}[/sourcecode]

Другой метод:

[sourcecode:html]
{% raw %}<!-- Externalize templates to avoid nesting. -->
<template type="amp-mustache" id="myTemplate">
  <div>{{title}}</div>
</template>

<amp-list id="myList" src="https://foo.com/list.json" template="myTemplate">
</amp-list>
{% endraw %}[/sourcecode]

### Таблицы <a name="tables"></a>

Поскольку относящиеся к шаблонам AMP строки определяются в элементах `<template>`, код может обрабатываться браузером некорректно. В частности, использование элементов `<table>` может привести к [некорректному наследованию](https://www.w3.org/TR/html5/syntax.html#unexpected-markup-in-tables) оформления для текста. Рассмотрим пример:

[sourcecode:html]
{% raw %}<template type="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
    </tr>
  </table>
</template>
{% endraw %}[/sourcecode]

Браузер принудительно применит форматирование к текстовым узлам {% raw %}`{{#foo}}`{% endraw %} и {% raw %}`{{/foo}}`{% endraw %}:

[sourcecode:html]
{% raw %}{{#foo}}
{{/foo}}
<table>
  <tr>
    <td></td>
  </tr>
</table>
{% endraw %}[/sourcecode]


Чтобы избежать подобных проблем, использующие шаблон Mustache элементы можно упаковать в тег HTML, предназначенный для комментариев (пример: {% raw %}`<!-- {{#bar}} -->`{% endraw %}). При этом для определения шаблонов используйте не связанные с таблицами теги, такие как `<div>`, а не `<script type="text/plain">`.

[sourcecode:html]
{% raw %}<script type="text/plain" template="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
    </tr>
  </table>
</script>
{% endraw %}[/sourcecode]

### Экранирование с помощью кавычек <a name="quote-escaping"></a>

Если шаблон `amp-mustache` используется для определения значений атрибутов, проблему можно решить с помощью кавычек. Пример:

[sourcecode:html]
{% raw %}<template type="amp-mustache">
  <!-- A double-quote (") in foo will cause malformed HTML. -->
  <amp-img alt="{{foo}}" src="example.jpg" width=100 height=100></amp-img>

  <!-- A single-quote (') or double-quote (") in bar will cause an AMP runtime parse error. -->
  <button on="tap:AMP.setState({foo: '{{bar}}'})">Click me</button>
</template>
{% endraw %}[/sourcecode]

Для решения проблемы не подойдет метод, при котором переменные {% raw %}`{{foo}}`{% endraw %} или {% raw %}`{{bar}}`{% endraw %} обозначаются с помощью символьного кода HTML, поскольку код Mustache в свою очередь заменяет используемые в таком коде символы `&amp;` на символьный код HTML. В частности, элемент `&quot;` обрабатывается как `&amp;quot;`. В то же время вам может помочь использование факсимильных символов, например ′ (`&prime;`) и ″ (`&Prime;`).

Также существует [решение с открытым исходным кодом](https://github.com/ampproject/amphtml/issues/8395), предназначенное для выполнения необходимой подстановки в коде `amp-mustache`. Если у вас возникнут проблемы при его использовании, сообщите нам о них.

### Объекты HTML <a name="html-entities"></a>

Использование кода Mustache может повлиять на объекты HTML, расположенные внутри элементов `<template>`.

Это может приводить к сбоям, если вы собираетесь обрабатывать на стороне сервера теги `<template>`, внутри которых представлен добавленный пользователями текст. Дело в том, что если ваш посетитель введет символы {% raw %}`{{`, `}}`, `{{{` или `}}}`{% endraw %}, они будут интерпретированы как код шаблона Mustache. Замена символов {% raw %}`{{`{% endraw %} на объекты HTML `&amp;lcub;&amp;lcub;` не позволит решить проблему, поскольку они не экранируются при обработке браузером тегов `<template>`.

Попробуйте заменять элементы {% raw %}`{{`{% endraw %} другими символами или вообще исключать их из пользовательского контента.

## Валидация <a name="validation-1"></a>

С [правилами для компонента amp-mustache](https://github.com/ampproject/amphtml/blob/master/extensions/amp-mustache/validator-amp-mustache.protoascii) можно ознакомиться в спецификации валидатора AMP.
