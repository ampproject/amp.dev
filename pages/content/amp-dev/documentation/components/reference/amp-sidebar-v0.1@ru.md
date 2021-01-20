---
$category@: layout
formats:
  - websites
  - email
teaser:
  text: >-
    Боковая панель делает возможным показ обычно скрытого метаконтента, например ссылок навигации, кнопок и меню.
toc: true
$title: amp-sidebar
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



<table>
  <tr>
    <td width="40%"><strong>Описание</strong></td>
    <td>
      Боковая панель предназначена для показа метаконтента, который не должен быть видимым постоянно (ссылок навигации, кнопок, меню и т. п.). Боковая панель может открываться нажатием кнопки, скрывая основной контент под собой.
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Скрипт</strong></td>
    <td><code>&lt;script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Поддерживаемые макеты</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Примеры</strong></td>
    <td>См. пример <a href="https://ampbyexample.com/components/amp-sidebar/">amp-sidebar</a> на сайте AMP By Example.</td>
  </tr>
</table>

## Обзор <a name="overview"></a>

Компонент `<amp-sidebar>` нужен, чтобы скрывать метаконтент, не предназначенный для постоянного отображения (ссылки навигации, кнопки, меню и т. п.). Открывать и закрывать `<amp-sidebar>` можно нажатием кнопки, а также касанием за пределами боковой панели.
Важно отметить, что дополнительные атрибуты с поддержкой запросов медиа в качестве значений позволяют показывать метаконтент в других частях сайта. При использовании дочерних элементов `<nav toolbar="(media query)" toolbar-target="elementID">` содержание боковой панели может демонстрироваться поверх других частей основного контента.

## Принципы работы <a name="behavior"></a>

* Компонент `<amp-sidebar>` должен быть включен как дочерний непосредственно в раздел `<body>`.
* Боковая панель может появляться только с левой или с правой стороны страницы.
* Компонент `<amp-sidebar>` может содержать любые допустимые элементы HTML (из числа поддерживаемых на AMP-страницах).
* Компонент `<amp-sidebar>` может содержать следующие элементы AMP:
    * `<amp-accordion>`
    * `<amp-img>`
    * `<amp-fit-text>`
    * `<amp-list>`
    * `<amp-live-list>`
    * `<amp-social-share>`</li>
* Максимальная высота боковой панели, заданная по умолчанию при помощи свойства CSS max-height, – 100vh. Если указано большее значение, появляется вертикальная полоса прокрутки. Значение можно переопределить в стилях CSS.
* Ширину боковой панели можно задать и изменить, используя стили CSS (минимальная ширина – 45px).
* Масштабирование жестами отключено для компонента `amp-sidebar` и его маски, когда боковая панель открыта.

*Пример*

В этом примере `amp-sidebar` содержит элементы навигации. При этом второй и четвертый из них, Nav Item 2 и Nav Item 4, связаны с имеющимися на странице идентификаторами элементов. Используя атрибут [`on`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-sidebar/../../spec/amp-actions-and-events.md), мы обеспечиваем прокрутку страницы до нужного элемента, идентификатор которого вместе с методом `scrollTo` указывается в значении атрибута.

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>
</amp-sidebar>
```

### Открытие и закрытие боковой панели <a name="opening-and-closing-the-sidebar"></a>

Чтобы боковая панель открывалась, закрывалась или переключалась из одного состояния в другое при нажатии на какой-либо элемент, добавьте в него атрибут [`on`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-sidebar/../../spec/amp-actions-and-events.md) и укажите один из описанных ниже методов, определяющих действие.

<table>
  <tr>
    <th>Действие</th>
    <th>Описание</th>
  </tr>
  <tr>
    <td>open (по умолчанию)</td>
    <td>Открывает боковую панель.</td>
  </tr>
  <tr>
    <td>close</td>
    <td>Закрывает боковую панель.</td>
  </tr>
  <tr>
    <td>toggle</td>
    <td>Открывает панель, если она была скрыта, и наоборот.</td>
  </tr>
</table>

Если пользователь коснется частично видимой области с основным контентом, боковая панель закроется.

Ещё один способ скрыть панель – нажать клавишу Esc на клавиатуре.

*Пример*

```html
<button class="hamburger" on='tap:sidebar1.toggle'></button>
<button on='tap:sidebar1'>Open</button>
<button on='tap:sidebar1.open'>Open</button>
<button on='tap:sidebar1.close'>x</button>
```

### Панель инструментов <a name="toolbar"></a>

Чтобы создать панель инструментов (`toolbar`) в разделе `<body>`, добавьте в `<amp-sidebar>` дочерний элемент `<nav>`, а в нем укажите атрибут `toolbar` с запросом медиа и атрибут `toolbar-target` с идентификатором какого-либо элемента на странице. Принцип действия `toolbar` заключается в том, что `<nav>` со своими дочерними элементами копируется и прибавляется к элементу, указанному в значении атрибута `toolbar-target`.

#### Принципы работы <a name="behavior-1"></a>

* Из боковой панели получится панель инструментов, если добавить элемент nav с атрибутами `toolbar` и `toolbar-target`.
* Элемент nav должен быть дочерним по отношению к `<amp-sidebar>`. Следует придерживаться такого формата: `<nav toolbar="(media-query)" toolbar-target="elementID">`.
    * Пример правильного использования: `<nav toolbar="(max-width: 1024px)" toolbar-target="target-element">`.</li>
* В контейнере nav с атрибутом toolbar должен содержаться только один элемент `<ul>` с дочерними элементами `<li>`.
    * В элементы `<li>` можно включить любые допустимые элементы HTML (из числа поддерживаемых на AMP-страницах) или элементы AMP, поддерживаемые компонентом `<amp-sidebar>`.</li>
* Панель инструментов работает, только пока действителен запрос медиа в атрибуте `toolbar`. Кроме того, обязательно наличие на странице элемента с идентификатором, указанным в значении атрибута `toolbar-target`.

*Пример простой панели инструментов*

В этом примере приводится панель инструментов (`toolbar`) для показа в окне шириной не более 767 пикселей. Панель инструментов содержит элемент input с текстовой подсказкой для ввода данных. Содержание `toolbar` будет добавлено к элементу `<div id="target-element">`.

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="Найти..."/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

## Оформление панели инструментов с помощью стилей <a name="styling-toolbar"></a>

Классы будут применяться к панели инструментов `toolbar` в элементе `<amp-sidebar>` в зависимости от того, показан или скрыт элемент `toolbar-target`. Такой прием полезен при назначении разных стилей элементам `toolbar` и `toolbar-target`. Используемые классы – `amp-sidebar-toolbar-target-shown` и `amp-sidebar-toolbar-target-hidden`. Класс `amp-sidebar-toolbar-target-shown` применяется к элементу `toolbar`, когда элемент `toolbar-target` отображен. Класс `amp-sidebar-toolbar-target-hidden` применяется к элементу `toolbar`, когда элемент `toolbar-target` скрыт.

*Пример с классами состояния панели инструментов*

В этом примере приводится панель инструментов (`toolbar`) для показа в окне шириной не более 767px. Панель инструментов содержит элемент input с текстовой подсказкой для ввода данных. Содержание `toolbar` будет добавлено к элементу `<div id="target-element">`. Однако теперь мы включили в код специальные стили, чтобы скрывать элемент `toolbar`, когда показывается элемент `<div id="target-element">`.

```html
<style amp-custom="">

  .amp-sidebar-toolbar-target-shown {
      display: none;
  }

</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="Найти..."/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

[tip type="ll callout('Совет.</b><a class="type_success"]
Посмотрите интерактивные примеры на сайте [AMP By Example](https://ampbyexample.com/components/amp-sidebar/).
[/tip]

## Боковая панель для AMP-историй <a name="sidebar-for-stories"></a>

Боковую панель `amp-sidebar` можно использовать в [компоненте](../../../about/stories.html) `amp-story`.

### Принципы работы <a name="behavior-2"></a>

* Элемент `<amp-sidebar>` следует включить непосредственно в `<amp-story>`.
* По умолчанию боковая панель показывается в обычных AMP-документах с правой стороны, если язык страницы предполагает чтение слева направо, и с левой стороны, если язык страницы предполагает чтение справа налево.
* Цвет фона у элемента `<amp-sidebar>` по умолчанию белый. Его можно изменить в стилях CSS.
* Максимальная ширина боковой панели `<amp-sidebar>` не будет превышать `280px`, а на компьютерах – `320px`.
* В интерфейсе истории появляется кнопка в виде трех горизонтальных линий, с помощью которой можно открывать и закрывать боковую панель.

Чтобы в интерфейсе историй не возникало несоответствий, список допустимых атрибутов и функций ограничен. Ниже перечислены атрибуты и функции, которые разрешается применять в элементе `amp-sidebar` внутри `amp-story`.

### Разрешенные атрибуты <a name="allowed-attributes"></a>

* [layout](#layout)
* [data-close-button-aria-label](#data)
* [универсальные атрибуты](#common)

*Пример простой боковой панели в AMP-истории*

В этом примере показан простой компонент `amp-sidebar` в `amp-story`.

```html
...
<body>
  <amp-story standalone>
  <amp-sidebar id="sidebar1" layout="nodisplay">
    <ul>
      <li><a href="https://amp.dev"> External Link </a></li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
    </ul>
  </amp-sidebar>
  <amp-story-page id="cover">
    <amp-story-grid-layer template="fill">
      <h1>Hello World</h1>
      <p>This is the cover page of this story.</p>
    </amp-story-grid-layer>
  </amp-story-page>
  ...
</body>
```

## Атрибуты <a name="attributes"></a>

##### side <a name="side"></a>

Определяет, с какой стороны страницы будет открываться боковая панель: с левой (`left`) или с правой (`right`).  Если не указать сторону, значение атрибута `side` будет унаследовано от атрибута `dir` в теге `body` (`ltr` => `left`, `rtl` => `right`). В случае отсутствия атрибута `dir` атрибуту `side` по умолчанию присваивается значение `left`.

##### layout <a name="layout"></a>

Определяет тип макета при показе боковой панели. У этого атрибута должно быть значение `nodisplay`.

##### open <a name="open"></a>

Этот атрибут присутствует, когда боковая панель открыта.

##### data-close-button-aria-label <a name="data"></a>

Необязательный атрибут, при помощи которого задается текст ярлыка ARIA для кнопки закрытия. Это дополнительный способ указать на ее назначение.

##### toolbar <a name="toolbar-1"></a>

Этот атрибут присутствует в дочернем элементе `<nav toolbar="(media-query)" toolbar-target="elementID">`. Допустимое значение – запрос медиа, определяющий, когда показывать панель инструментов. Более подробная информация об использовании панелей инструментов приведена [выше](#toolbar-1) в соответствующем разделе.

##### toolbar-target <a name="toolbar-target"></a>

Этот атрибут присутствует в дочернем элементе `<nav toolbar="(media-query)" toolbar-target="elementID">` и принимает в качестве значения идентификатор того или иного элемента на странице.  Атрибут `toolbar-target` предназначен для того, чтобы панель инструментов без заданных по умолчанию стилей вставлялась на место указанного идентификатора. Более подробная информация об использовании панелей инструментов приведена [выше](#toolbar-1) в соответствующем разделе.

##### универсальные атрибуты <a name="common"></a>

[Атрибуты](../../../documentation/guides-and-tutorials/learn/common_attributes.md), которые поддерживаются большинством компонентов AMP.

## Поддержка стилей <a name="styling"></a>

Компонент `amp-sidebar` совместим со стандартными стилями CSS.

* Можно настроить автоматическую корректировку ширины (`width`) боковой панели `amp-sidebar` – от 45px (по умолчанию) до 80vw.
* Можно настроить автоматическую корректировку высоты `amp-sidebar`. Если высота окажется больше 100vw, у боковой панели появится вертикальная полоса прокрутки. Высота по умолчанию – 100vw. Ее можно уменьшить в стилях CSS.
* Текущее состояние боковой панели определяется по атрибуту `open`, который появляется в теге `amp-sidebar`, когда она открыта на странице.

[tip type="ll callout('Совет.</b><a class="type_success"]
На сайте [AMP Start](https://ampstart.com/components#navigation) вы найдете уже оформленные меню навигации с адаптивным макетом. Можете добавлять их на свои AMP-страницы.
[/tip]

## Автоматическая прокрутка в контейнерах, содержание которых выходит за границы видимой области <a name="auto-scrolling-within-overflowing-areas"></a>

Компонент `amp-sidebar` в двух своих разновидностях (боковая панель и панель инструментов) поддерживает автоматическую прокрутку контейнера до первого элемента с атрибутом `autoscroll`.

Эта функция полезна, если нужно, чтобы при загрузке страницы панель прокручивалась до активного на текущий момент элемента навигации в длинном списке.

В случае использования панели инструментов `toolbar` атрибут `autoscroll` работает только при условии, что для элемента `<nav toolbar>` задано правило CSS `overflow: auto` или `overflow: scroll`.

```html
<style amp-custom="">

  nav [toolbar] {
    overflow: auto;
  }

</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>Nav item 1</li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
      <li autoscroll class="currentPage">Nav item 4</li>
      <li>Nav item 5</li>
      <li>Nav item 6</li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

В [этом файле](https://github.com/ampproject/amphtml/blob/master/examples/amp-sidebar-autoscroll.amp.html) представлен пример рабочего кода.

## Удобство просмотра <a name="ux-considerations"></a>

Внедряя `<amp-sidebar>`, помните, что пользователи часто будут открывать ваши страницы на мобильных устройствах в средстве просмотра AMP, где может отображаться заголовок с фиксированной позицией. Браузеры нередко добавляют второй подобный заголовок вверху страницы. Ещё один фиксированный элемент там же займет на экране мобильного устройства много места и при этом не будет содержать новой для пользователя информации.

По вышеизложенной причине мы рекомендуем не вставлять код, позволяющий открывать боковую панель, в фиксированный заголовок на полную ширину.

## Валидация <a name="validation"></a>

С [правилами для компонента amp-sidebar](https://github.com/ampproject/amphtml/blob/master/extensions/amp-sidebar/validator-amp-sidebar.protoascii) можно ознакомиться в спецификации валидатора AMP.
