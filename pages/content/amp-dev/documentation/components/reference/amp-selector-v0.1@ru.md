---
$title: amp-selector
$category@: dynamic-content
teaser:
  text: Элемент управления, который представляет пользователю меню с вариантами для выбора.
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



Элемент управления, который представляет пользователю меню с вариантами для выбора.

<table>
  <tr>
    <td class="col-fourty" width="40%"><strong>Скрипт</strong></td>
    <td><code>&lt;script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Поддерживаемые макеты</a></strong></td>
    <td>Все</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Примеры</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-selector/">Пример amp-selector</a> на сайте AMP By Example.</td>
  </tr>
</table>


## Поведение <a name="behavior"></a>

Селектор AMP – это элемент управления, который представляет список вариантов, предоставляемых на выбор пользователю; содержание этих вариантов не ограничивается текстом.

* Элемент `amp-selector` может содержать любые элементы HTML или компоненты AMP (например, `amp-carousel`, `amp-img` и т. п.).
* Элемент `amp-selector` не может содержать вложенные элементы `amp-selector`.
* Доступные для выбора варианты определяются добавлением в элемент атрибута `option` и присвоением ему некоторого значения, например `<li option='value'></li>`.
* Недоступные варианты определяются добавлением в элемент атрибута `disabled`, например `<li option='d' disabled></li>`.
* Выбранные по умолчанию варианты определяются добавлением в элемент атрибута `selected`, например `<li option='b' selected></li>`.
* Чтобы разрешить множественный выбор, добавьте в элемент `amp-selector` атрибут `multiple`.  По умолчанию в элементе `amp-selector` можно выбрать только один вариант.
* Чтобы отключить весь элемент `amp-selector`, добавьте в него атрибут `disabled`.
* Если элемент `amp-selector` в теге `form` содержит атрибут `name` и если пользователь отправляет форму (т. е. происходит событие submit), то элемент `amp-selector` ведет себя, как группа переключателей или флажков и отправляет значения, выбранные для варианта.

Пример:

```html

<form id="form1" action="/" method="get" target="_blank">
  <amp-selector name="single_image_select" layout="container">
    <ul>
      <li><amp-img src="/img1.png" width="50" height="50" option="1"></amp-img></li>
      <li><amp-img src="/img2.png" width="50" height="50" option="2"></amp-img></li>
      <li option="na" selected="">Ничего из перечисленного</li>
    </ul>
  </amp-selector>
  <amp-selector name="multi_image_select" layout="container" multiple="">
    <amp-img src="/img1.png" width="50" height="50" option="1"></amp-img>
    <amp-img src="/img2.png" width="50" height="50" option="2"></amp-img>
    <amp-img src="/img3.png" width="50" height="50" option="3"></amp-img>
  </amp-selector>
  <amp-selector name="multi_image_select_1" layout="container" multiple="">
    <amp-carousel id="carousel-1" width="200" height="60" controls="">
      <amp-img src="/img1.png" width="80" height="60" option="a"></amp-img>
      <amp-img src="/img2.png" width="80" height="60" option="b" selected=""></amp-img>
      <amp-img src="/img3.png" width="80" height="60" option="c"></amp-img>
      <amp-img src="/img4.png" width="80" height="60" option="d" disabled=""></amp-img>
    </amp-carousel>
  </amp-selector>
</form>

<p><amp-selector name="multi_image_select_2" layout="container" multiple="" form="form1">
  <amp-carousel height="300" id="carousel-1" type="slides" width="400" controls="">
    <amp-img height="60" src="/img1.png" width="80" option="a"></amp-img>
    <amp-img height="60" src="/img2.png" width="80" option="b" selected=""></amp-img>
    <amp-img height="60" src="/img3.png" width="80" option="c"></amp-img>
    <amp-img height="60" src="/img4.png" width="80" option="d"></amp-img>
  </amp-carousel>
</amp-selector>
```

## Отмена выделения <a name="clearing-selections"></a>

Чтобы отменить все выделения при нажатии на элемент, используйте атрибут действия [`on`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) в элементе и укажите идентификатор `id` селектора AMP с методом `clear`.

Пример:

```html
<button on="tap:mySelector.clear">Clear Selection</button>
<amp-selector id="mySelector" layout="container" multiple>
  <div option>Option One</div>
  <div option>Option Two</div>
  <div option>Option Three</div>
</amp-selector>
```

[tip type="success"] [AMP By Example](https://ampbyexample.com/components/amp-selector/).
[/tip]

## Атрибуты <a name="attributes"></a>

### Атрибуты элемента `<amp-selector>` <a name="attributes-on-"></a>

<table>
  <tr>
    <td width="40%"><strong>disabled, form, multiple, name</strong></td>
    <td>Эти атрибуты работают так же, как в стандартных элементах HTML <code>select</code>[](https://developer.mozilla.org/en/docs/Web/HTML/Element/select).</td>
  </tr>
  <tr>
    <td width="40%"><strong>keyboard-select-mode</strong></td>
    <td>Атрибут <code>keyboard-select-mode</code> определяет поведение клавиатуры для вариантов внутри <code>amp-selector</code>.

    <ul><li>Значение <code>none</code> (по умолчанию): клавиша Tab переключает фокус между элементами в <code>amp-selector</code>. Пользователь должен нажать Ввод или Пробел, чтобы изменить выбор. Клавиши со стрелками не работают. </li><li>
    Значение <code>focus</code>: клавиша Tab переключает фокус на <code>amp-selector</code>. Для перемещения между элементами используются клавиши со стрелками. Чтобы изменить выбор, нужно нажать Пробел или Ввод.</li><li>
    Значение <code>select</code>: клавиша Tab переключается фокус на <code>amp-selector</code>. Выбранные элементы меняются, когда пользователь переходит между ними с помощью клавиш со стрелками. </li></ul></td>
      </tr>
    </table>

### Атрибуты вариантов элемента `<amp-selector>` <a name="attributes-on--options"></a>

<table>
  <tr>
    <td width="40%"><strong>option</strong></td>
    <td>Означает, что вариант доступен для выбора.  Если указано значение, оно передается вместе с формой.</td>
  </tr>
  <tr>
    <td width="40%"><strong>disabled, selected</strong></td>
    <td>Эти атрибуты работают так же, как в стандартных элементах HTML [<code>option</code>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option).</td>
  </tr>
</table>

## События <a name="events"></a>

События могут активировать действия для компонентов AMP с помощью атрибута `on`,
например `on="select: my-tab.show"`.

Подробнее [о действиях и событиях AMP](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)…

<table>
  <tr>
    <td width="40%"><strong>select</strong></td>
    <td>Элемент <code>amp-selector</code> активирует событие <code>select</code>, когда пользователь выбирает какой-то вариант.
      Селекторы множественного и одиночного выбора активируют его при выборе или отмене выбора того или иного варианта.
      При нажатии на варианты, недоступные для выбора, событие <code>select</code> не происходит.
      <ul>
      <li>
        Параметр <code>event.targetOption</code> содержит значение атрибута <code>option</code>  выбранного элемента.</li>
      <li>
        Параметр <code>event.selectedOptions</code> содержит массив со значениями атрибута <code>option</code>  выбранных элементов.
      </li>
        </ul></td>
      </tr>

    </table>

## Валидация <a name="validation"></a>

С правилами для компонента amp-selector можно ознакомиться в [спецификации валидатора AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-selector/validator-amp-selector.protoascii).
