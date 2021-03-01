---
'$title': Действия и события в AMP-письмах
$order: 0
formats:
  - email
teaser:
  text: '[tip type="note"]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-email-actions-and-events.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
Copyright 2020 The AMP HTML Authors. All Rights Reserved.

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

[tip type="note"] В этой документации описаны действия и события для формата «AMP-письма». Чтобы узнать о действиях и событиях для AMP-сайтов, историй и рекламы, прочтите [эту статью](https://github.com/ampproject/amphtml/blob/master/spec/amp-actions-and-events.md). [/tip]

Атрибут `on` используется для установки обработчиков событий на элементы. То, какие события поддерживаются, зависит от элемента.

Синтаксис представляет собой простой предметно-ориентированный язык следующего вида:

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]][/sourcecode]

Описание каждой части синтаксиса приведено в таблице ниже.

<table>
  <tr>
    <th width="30%">Синтаксис</th>
    <th width="18%">Обязательно?</th>
    <th width="42%">Описание</th>
  </tr>
  <tr>
    <td><code>eventName</code></td>
    <td>да</td>
    <td>Наименование события, предусмотренного элементом.</td>
  </tr>
  <tr>
    <td><code>targetId</code></td>
    <td>да</td>
    <td>Это DOM-идентификатор элемента или предустановленная <a href="#special-targets">специальная цель</a> , над которой вы бы хотели осуществить действие в ответ на событие. В следующем примере <code>targetId</code> является DOM-идентификатором цели <code>amp-lightbox</code>, <code>photo-slides</code>.     <pre><amp-lightbox id="photo-slides"></amp-lightbox>
<button on="tap:photo-slides">Показать изображения</button></pre>
</td>
  </tr>
  <tr>
    <td><code>methodName</code></td>
    <td>нет</td>
    <td>Предназначено для элементов с действиями по умолчанию. <p>Это метод, доступный в целевом элементе (на который указывает <code>targetId</code>) и который вы хотите выполнить при срабатывании события.</p> <p>В AMP есть концепция «действия по умолчанию»; такое действие могут устанавливать элементы. Поэтому, если <code>methodName</code> опущен, AMP выполнит метод по умолчанию.</p>
</td>
  </tr>
  <tr>
    <td><code>arg=value</code></td>
    <td>нет</td>
    <td>Некоторые действия, если это задокументировано, могут принимать аргументы. Аргументы указываются в скобках в нотации <code>ключ=значение</code>. Допустимые значения: <ul>
<li>простые строки без кавычек: <code>simple-value</code> </li>
<li>строки в кавычках: <code>"string value"</code> или <code>'string value'</code> </li>
<li> логические значения: <code>true</code> или <code>false</code> </li>
<li>числа: <code>11</code> или <code>1.1</code> </li>
<li>ссылка на данные события (синтаксис «через точку»): <code>event.someDataVariableName</code> </li>
</ul>
</td>
  </tr>
</table>

## Обработка нескольких событий <a name="handling-multiple-events"></a>

Чтобы элемент «слушал» несколько событий, разделяйте события точкой с запятой `;`.

Пример: `on="submit-success:lightbox1;submit-error:lightbox2"`

## Несколько действий на одно событие <a name="multiple-actions-for-one-event"></a>

Чтобы в ответ на одно событие последовательно выполнить несколько действий, разделяйте действия запятой ','.

Пример: `on="tap:target1.actionA,target2.actionB"`

## Глобально определенные события и действия <a name="globally-defined-events-and-actions"></a>

AMP определяет событие `tap` глобально, что позволяет вам слушать касание на любом HTML-элементе (включая AMP-элементы).

AMP также определяет глобальные действия `hide`, `show` и `toggleVisibility`, которые можно применять к любому элементу HTML.

[tip type="note"] <strong>Тип: примечание</strong>

Элемент может быть показан («show») только в том случае, если он ранее был скрыт действием `hide` или `toggleVisibility`, или атрибутом [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden). Действие `show` несовместимо с элементами, скрытыми с помощью CSS: `display:none` или AMP: `layout=nodisplay`.

Например, в AMP возможно следующее:

[sourcecode:html]

<div id="warning-message">Warning...</div>

<button on="tap:warning-message.hide">Cool, thanks!</button>
[/sourcecode]

[/tip]

## События конкретных элементов <a name="element-specific-events"></a>

### \* — все элементы <a name="---all-elements"></a>

<table>
  <tr>
    <th>Событие</th>
    <th>Описание</th>
  </tr>
  <tr>
    <td><code>tap</code></td>
    <td>Срабатывает только при нажатии/касании элемента.</td>
  </tr>
</table>

### Элементы input <a name="input-elements"></a>

<table>
  <tr>
    <th width="20%">Событие</th>
    <th width="30%">Описание</th>
    <th width="40%">Элементы</th>
    <th>Данные</th>
  </tr>
  <tr>
    <td rowspan="3"><code>change</code></td>
    <td rowspan="3">Происходит при изменении и фиксации элемента. <p> Свойства данных являются повторением свойств <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties">HTMLInputElement</a> и <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#Properties">HTMLSelectElement</a>.</p>
</td>
    <td><code>input</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value<br>event.valueAsNumber</pre>
    </td>
  </tr>
  <tr>
    <td> <code>input[type="radio"]</code>,<br><code>input[type="checkbox"]</code>
</td>
    <td>
      <code>event.checked</code>
    </td>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>
      <pre>event.min
event.max
event.value</pre>
    </td>
  </tr>
  <tr>
    <td><code>input-debounced</code></td>
    <td>Срабатывает при изменении значения элемента. Похоже на стандартное событие <code>change</code>, но срабатывает только через 300 мс после того, как значение элемента input перестало меняться.</td>
    <td>Элементы, которые инициируют событие <code>input</code>.</td>
    <td>Совпадают с данными события <code>change</code>.</td>
  </tr>
  <tr>
    <td><code>input-throttled</code></td>
    <td>Срабатывает при изменении значения элемента. Похоже на стандартное событие <code>change</code>, но срабатывает не чаще чем раз в 100 мс до тех пор, пока значение элемента input не прекратит меняться.</td>
    <td>Элементы, которые инициируют событие <code>input</code>.</td>
    <td>Совпадают с данными события <code>change</code>.</td>
  </tr>
</table>

### amp-accordion > section <a name="amp-accordion"></a>

<table>
  <tr>
    <th width="25%">Событие</th>
    <th width="35%">Описание</th>
    <th width="40%">Данные</th>
  </tr>
  <tr>
    <td><code>expand</code></td>
    <td>Срабатывает при развороте раздела accordion.</td>
    <td>Нет</td>
  </tr>
  <tr>
    <td><code>collapse</code></td>
    <td>Срабатывает при свертывании раздела accordion.</td>
    <td>Нет</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides"></a>

<table>
  <tr>
    <th width="25%">Событие</th>
    <th width="35%">Описание</th>
    <th width="40%">Данные</th>
  </tr>
  <tr>
    <td><code>slideChange</code></td>
    <td>Срабатывает при смене текущего слайда карусели.</td>
    <td><pre>// Номер слайда.<br>event.index</pre></td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox"></a>

<table>
  <tr>
    <th width="25%">Событие</th>
    <th width="35%">Описание</th>
    <th width="40%">Данные</th>
  </tr>
  <tr>
    <td><code>lightboxOpen</code></td>
    <td>Срабатывает, когда лайтбокс полностью виден.</td>
    <td>Нет</td>
  </tr>
  <tr>
    <td><code>lightboxClose</code></td>
    <td>Срабатывает, когда лайтбокс полностью закрыт.</td>
    <td>Нет</td>
  </tr>
</table>

### amp-list <a name="amp-list"></a>

<table>
  <tr>
    <th width="25%">Событие</th>
    <th width="35%">Описание</th>
    <th width="40%">Данные</th>
  </tr>
  <tr>
    <td>
<code>fetch-error</code> (низкий уровень доверия)</td>
    <td>Срабатывает при сбое загрузки данных.</td>
    <td>Нет</td>
  </tr>
</table>

### amp-selector <a name="amp-selector"></a>

<table>
  <tr>
    <th width="25%">Событие</th>
    <th width="35%">Описание</th>
    <th width="40%">Данные</th>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>Срабатывает при выборе и снятии выбора с одного из вариантов.</td>
    <td><pre>// Значение атрибута "option" целевого элемента.<br>event.targetOption<br>// Массив значений атрибутов "option" всех выбранных элементов.<br>event.selectedOptions</pre></td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar"></a>

<table>
  <tr>
    <th width="25%">Событие</th>
    <th width="35%">Описание</th>
    <th width="40%">Данные</th>
  </tr>
  <tr>
    <td><code>sidebarOpen</code></td>
    <td>Срабатывает, когда боковая панель полностью открыта (после завершения перехода).</td>
    <td>Нет</td>
  </tr>
  <tr>
    <td><code>sidebarClose</code></td>
    <td>Срабатывает, когда боковая панель полностью закрыта (после завершения перехода).</td>
    <td>Нет</td>
  </tr>
</table>

### amp-state <a name="amp-state"></a>

<table>
  <tr>
    <th width="25%">Событие</th>
    <th width="35%">Описание</th>
    <th width="40%">Данные</th>
  </tr>
  <tr>
    <td>
<code>fetch-error</code> (низкий уровень доверия)</td>
    <td>Срабатывает при сбое загрузки данных.</td>
    <td>Нет</td>
  </tr>
</table>

### form <a name="form"></a>

<table>
  <tr>
    <th width="25%">Событие</th>
    <th width="35%">Описание</th>
    <th width="40%">Данные</th>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>Срабатывает при отправке формы.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>submit-success</code></td>
    <td>Срабатывает, когда на отправку формы получен ответ «Успешно».</td>
    <td><pre>// JSON ответа.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>submit-error</code></td>
    <td>Срабатывает, когда на отправку формы получен ответ «Ошибка».</td>
    <td><pre>// JSON ответа.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>valid</code></td>
    <td>Срабатывает, когда форма действительна.</td>
    <td></td>
  </tr>
  <tr>
    <td><code>invalid</code></td>
    <td>Срабатывает, когда форма недействительна.</td>
    <td></td>
  </tr>
</table>

## События конкретных элементов <a name="element-specific-actions"></a>

### \* — все элементы <a name="-all-elements"></a>

<table>
  <tr>
    <th width="40%">Действие</th>
    <th>Описание</th>
  </tr>
  <tr>
    <td><code>hide</code></td>
    <td>Скрывает целевой элемент.</td>
  </tr>
  <tr>
    <td><code>show</code></td>
    <td>Показывает целевой элемент. Если в результате становится видимым <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus">элемент с атрибутом <code>autofocus</code></a>, он приобретает фокус.</td>
  </tr>
  <tr>
    <td><code>toggleVisibility</code></td>
    <td>Переключает видимость целевого элемента. Если в результате становится видимым <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus">элемент с атрибутом <code>autofocus</code></a>, он приобретает фокус.</td>
  </tr>
  <tr>
    <td><code>toggleClass(class=STRING, force=BOOLEAN)</code></td>
    <td>Переключает класс целевого элемента. Атрибут <code>force</code> является необязательным — он позволяет гарантировать, что: класс будет добавлен, но не удален (если задано значение <code>true</code>) или только удален, но не добавлен (если задано значение <code>false</code>).</td>
  </tr>
  <tr>
    <td><code>focus</code></td>
    <td>Передает фокус целевому элементу. Чтобы убрать фокус, выполните <code>focus</code> на другом элементе (обычно родительском элементе). Мы настоятельно рекомендуем не убирать фокус путем назначения фокуса элементу <code>body</code>/<code>documentElement</code> во избежание некорректной работы возможностей универсального доступа.</td>
  </tr>
</table>

### amp-accordion <a name="amp-accordion-1"></a>

<table>
  <tr>
    <th>Действие</th>
    <th>Описание</th>
  </tr>
  <tr>
    <td><code>toggle(section=STRING)</code></td>
    <td>Переключает разделы <code>amp-accordion</code> между состояниями <code>expanded</code> и <code>collapsed</code>. При вызове без аргументов переключает состояние всех разделов accordion. Чтобы применить к определенному разделу, укажите идентификатор раздела <code>on="tap:myAccordion.toggle(section='section-id')"</code>.</td>
</tr>
  <tr>
    <td><code>expand(section=STRING)</code></td>
    <td>Разворачивает разделы accordion. Если раздел уже развернут, он остается развернутым. При вызове без аргументов разворачиваются все разделы accordion. Чтобы применить к определенному разделу, укажите идентификатор раздела: <code>on="tap:myAccordion.expand(section='section-id')"</code>.</td>
  </tr>
  <tr>
    <td><code>collapse(section=STRING)</code></td>
    <td>Сворачивает разделы accordion. Если раздел уже свернут, он остается свернутым. При вызове без аргументов сворачиваются все разделы accordion. Чтобы применить к определенному разделу, укажите идентификатор раздела: <code>on="tap:myAccordion.collapse(section='section-id')"</code>.</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides-1"></a>

<table>
  <tr>
    <th>Действие</th>
    <th>Описание</th>
  </tr>
  <tr>
    <td><code>goToSlide(index=INTEGER)</code></td>
    <td>Прокручивает карусель до слайда с указанной позицией.</td>
  </tr>
</table>

### amp-image-lightbox <a name="amp-image-lightbox"></a>

<table>
  <tr>
    <th width="40%">Действие</th>
    <th>Описание</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Открывает лайтбокс, источником изображения в котором является изображение-инициатор действия.</td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox-1"></a>

<table>
  <tr>
    <th>Действие</th>
    <th>Описание</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Открывает лайтбокс.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Закрывает лайтбокс.</td>
  </tr>
</table>

### amp-list <a name="amp-list-1"></a>

<table>
  <tr>
    <th width="25%">Событие</th>
    <th width="35%">Описание</th>
    <th width="40%">Данные</th>
  </tr>
  <tr>
    <td><code>changeToLayoutContainer</code></td>
    <td>Обновляет макет <code>amp-list</code> до <code>layout="CONTAINTER"</code>, чтобы разрешить <a href="https://github.com/ampproject/amphtml/blob/master/spec/../extensions/amp-list/amp-list.md#dynamic-resizing">динамическое изменение размера</a>.</td>
  </tr>
  <tr>
    <td>
<code>fetch-error</code> (низкий уровень доверия)</td>
    <td>Срабатывает при сбое загрузки данных.</td>
    <td>Нет</td>
  </tr>
</table>

### amp-selector <a name="amp-selector-1"></a>

<table>
  <tr>
    <th>Действие</th>
    <th>Описание</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>Снимает выбор со всех пунктов меню определенного <code>amp-selector</code>.</td>
  </tr>
  <tr>
    <td><code>selectUp(delta=INTEGER)</code></td>
    <td>Перемещает область выбора вверх на значение `delta`. По умолчанию `delta` имеет значение -1. Если не выбран ни один из пунктов меню, выбранным станет значение первого пункта.</td>
  </tr>
  <tr>
    <td><code>selectDown(delta=INTEGER)</code></td>
    <td>Перемещает область выбора вниз на значение `delta`. По умолчанию `delta` имеет значение 1. Если не выбран ни один из пунктов меню, выбранным станет значение первого пункта.</td>
  </tr>
  <tr>
    <td><code>toggle(index=INTEGER, value=BOOLEAN)</code></td>
    <td>Переключает атрибут 'selected'. Если атрибут отсутствует, это действие добавляет его. Если атрибут присутствует, он удаляется. Вы можете форсированно добавить или удалить атрибут, указав логическое значение в аргументе `value`. Значение `true` форсированно добавит атрибут `selected` и не удалит его, если он уже присутствует. Значение `false` удалит атрибут, но не добавит его, если он отсутствует.</td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar-1"></a>

<table>
  <tr>
    <th>Действие</th>
    <th>Описание</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>Открывает боковую панель.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Закрывает боковую панель.</td>
  </tr>
  <tr>
    <td><code>toggle</code></td>
    <td>Переключает состояние боковой панели.</td>
  </tr>
</table>

### form <a name="form-1"></a>

<table>
  <tr>
    <th>Действие</th>
    <th>Описание</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>Удаляет все данные, введенные в форму.</td>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>Отправляет форму.</td>
  </tr>
</table>

## Особые цели <a name="special-targets"></a>

Система AMP предоставляет ряд целей, предъявляющих особые требования:

### Цель: AMP <a name="target-amp"></a>

Цель `AMP` обеспечивается средой выполнения AMP; в ней реализованы действия верхнего уровня, которые применяются ко всему документу.

<table>
  <tr>
    <th width="40%">Действие</th>
    <th>Описание</th>
  </tr>
  <tr>
    <td>
<code>setState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p>Требует <a href="https://amp.dev/documentation/components/amp-bind.html#updating-state-with-ampsetstate">amp-bind</a>.</p>
      <p>Объединяет объектный литерал с привязываемым состоянием.</p>
      <p></p>
    </td>
  </tr>
</table>

<sup>1</sup> При использовании с <a href="#multiple-actions-for-one-event">несколькими действиями</a> последующие действия будут ожидать <code>setState()</code> перед вызовом. Только одно <code>setState()</code> допускается для каждого события.
