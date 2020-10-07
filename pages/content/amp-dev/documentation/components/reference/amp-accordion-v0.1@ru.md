---
$title: amp-accordion
$category@: layout
teaser:
  text: Аккордеон позволяет зрителям ознакомиться с контентом и перейти к интересующему их разделу.
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



Позволяет зрителям знакомиться с контентом и переходить к нужному разделу. Это удобно на мобильных устройствах, где зачастую даже для просмотра нескольких предложений из раздела требуется прокрутка.

<table>
  <tr>
    <td class="col-fourty"><strong>Скрипт</strong></td>
    <td><code>&lt;script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Поддерживаемые макеты</a></strong></td>
    <td>container</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Примеры</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-accordion/">Аннотированный пример кода для amp-accordion</a></td>
  </tr>
</table>


## Принципы работы <a name="behavior"></a>

Компонент `amp-accordion` позволяет показывать сворачиваемые и разворачиваемые разделы с контентом. Каждый непосредственный дочерний элемент компонента `amp-accordion` представляет собой раздел аккордеона. Каждый из этих узлов должен быть тегом `<section>`.

* Компонент `amp-accordion` может содержать по меньшей мере один элемент `<section>` в качестве своих непосредственных дочерних элементов.
* Каждый элемент `<section>` должен содержать два непосредственных дочерних элемента.
* Поскольку первый дочерний элемент в разделе представляет собой заголовок этого раздела, это должен быть элемент, такой как `h1`, `h2`, `h6`, `header`.
* Вторым дочерним элементом в разделе может быть любой тег, который совместим с AMPHTML и представляет контент этого раздела.
* При нажатии на заголовок разворачивается или сворачивается раздел.
* Если какой-либо раздел, относящийся к элементу `amp-accordion`, свернут или развернут, он останется таким же на уровне сеанса. Чтобы состояние раздела не сохранялось, к компоненту `amp-accordion` нужно добавить атрибут `disable-session-states`.

#### Пример: показ компонента accordion <a name="example-displaying-an-accordion"></a>

В приведенном ниже примере показаны три раздела, последний из которых разворачивается при загрузке страницы.  Чтобы отключить сохранение состояния разделов, установлен атрибут `disable-session-states`.

[example preview="inline" playground="true" imports="amp-accordion"]
```html
<amp-accordion{% if not format=='email'%} disable-session-states{% endif %}>
  <section>
    <h2>Section 1</h2>
    <p>Content in section 1.</p>
  </section>
  <section>
    <h2>Section 2</h2>
    <div>Content in section 2.</div>
  </section>
  <section expanded>
    <h2>Section 3</h2>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/squirrel.jpg"
      width="320"
      height="256"></amp-img>
  </section>
</amp-accordion>
```
[/example]

[tip type="success"]

Дополнительные примеры использования элемента `amp-accordion` приведены на [специальном сайте](https://ampbyexample.com/components/amp-accordion/).

[/tip]

### События <a name="events"></a>

Перечисленные ниже события будут активироваться в элементах `section`, относящихся к `аккордеону`.

<table>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>Это событие активируется в целевом элементе <code>section</code>, который переходит из свернутого состояния в развернутое. Если совершить вызов <code>expand</code> при развернутом состоянии элемента <code>section</code>, событие активировано не будет.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>collapse</code></strong></td>
    <td>Это событие активируется в целевом элементе <code>section</code>, который переходит из развернутого состояния в свернутое. Если совершить вызов <code>collapse</code> при свернутом состоянии элемента <code>section</code>, событие активировано не будет.</td>
  </tr>
</table>

### Действия <a name="actions"></a>

<table>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>Это событие активируется в целевом элементе <code>section</code>, который переходит из свернутого состояния в развернутое. Если совершить вызов <code>expand</code> при развернутом состоянии элемента <code>section</code>, событие активировано не будет.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>toggle</code></strong></td>
    <td>Это действие позволяет переключаться между состояниями <code>expanded</code> и <code>collapsed</code> компонента <code>amp-accordion</code>. При вызове без аргументов будут переключены все разделы аккордеона. Для одного раздела можно указать аргумент <code>section</code>, а в качестве значения задать соответствующий элемент <code>id</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>Это действие позволяет развернуть компонент <code>amp-accordion</code>. Если этот компонент уже развернут, он останется без изменений. При вызове без аргументов будут развернуты все разделы аккордеона. Для одного раздела можно указать аргумент <code>section</code>, а в качестве значения задать соответствующий элемент <code>id</code>.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>collapse</code></strong></td>
    <td>Это действие позволяет свернуть компонент <code>amp-accordion</code>. Если этот компонент уже свернут, он останется без изменений. При вызове без аргументов будут свернуты все разделы аккордеона. Для одного раздела можно указать аргумент <code>section</code>, а в качестве значения задать соответствующий элемент <code>id</code>.</td>
  </tr>
</table>

#### Атрибуты <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong><code>animate</code></strong></td>
    <td>Если настроить этот атрибут в компоненте <code>&lt;amp-accordion&gt;</code>, при развертывании или сворачивании всех разделов, относящихся аккордеону, будет выполняться анимация.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>disable-session-states</code></strong></td>
    <td>Если добавить этот атрибут в компонент <code>&lt;amp-accordion&gt;</code>, можно отключить сохранение состояния разделов аккордеона.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expanded</code></strong></td>
    <td>Если настроить этот атрибут в элементе <code>&lt;section&gt;</code>, при загрузке страницы соответствующий раздел будет показываться в развернутом виде.</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expand-single-section</code></strong></td>
    <td>Если добавить этот атрибут в компонент <code>&lt;amp-accordion&gt;</code>, раскрывать больше одного элемента <code>&lt;section&gt;</code> одновременно будет нельзя. Если пользователь развернул одни элемент <code>&lt;section&gt;</code>, все остальные <code>&lt;section&gt;</code>будут свернуты.</td>
  </tr>
</table>

## Поддержка стилей <a name="styling"></a>

* Настраивать стиль элемента `amp-accordion` можно с помощью селектора этого элемента.
* Для элементов `amp-accordion` всегда устанавливается объект `display: block`.
* Элемент `<section>`, а также элементы заголовка и контента не могут быть плавающими.
* Если раздел развернут, элемент `<section>` содержит атрибут `expanded`.
* Элемент контента закреплен с помощью объекта `overflow: hidden` и поэтому не может включать полосы прокрутки.
* Для полей элементов `<amp-accordion>`, `<section>`, заголовка и контента задано значение 0. В специальных стилях это значение можно переопределить.
* Для элементов заголовка и контента установлен объект `position: relative`.

## Валидация <a name="validation"></a>

О правилах для amp-accordion читайте в [спецификации валидатора AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-accordion/validator-amp-accordion.protoascii).
