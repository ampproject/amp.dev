---
$title: amp-bind
$category@: dynamic-content
teaser:
  text: позволяет менять элементы в зависимости от действий пользователя или поступающих данных, поддерживает привязку данных и простые выражения, похожие на JavaScript
---



Привязка данных и поддержка выражений позволяют добавить интерактивности.

<!--© Авторы AMPHTML, 2016. Все права защищены.
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
    <td class="col-fourty"><strong>Скрипт</strong></td>
    <td>
      <div>
          <code>&lt;script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js">&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Примеры</strong></td>
    <td>
      <ul>
        <li><a href="https://ampbyexample.com/components/amp-bind/">Вводный пример кода с аннотациями</a></li>
        <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">Пример карусели со связанным изображением и аннотациями</a></li>
        <li><a href="https://ampbyexample.com/samples_templates/product/">Пример страницы товара для электронной торговли с аннотациями</a></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Руководства</strong></td>
    <td><a href="../../../documentation/guides-and-tutorials/develop/interactivity/index.md">Как создавать интерактивные AMP-страницы</a></td>
  </tr>
</table>

# Обзор <a name="overview"></a>

Компонент `amp-bind` позволяет добавлять на AMP-страницы настраиваемые интерактивные функции. Для этого используется привязка данных и простые выражения, похожие на JavaScript.

<figure class="alignment-wrapper  margin-">
  <amp-youtube width="480" height="270" data-videoid="xzCFU8b5fCU" layout="responsive"></amp-youtube>
  <figcaption>Чтобы получить общие сведения о компоненте amp-bind, посмотрите видео.</figcaption></figure>

# Простой пример <a name="a-simple-example"></a>

В примере ниже текст элемента `<p>` меняется с Hello World на Hello amp-bind.

```html

<p [text]="'Hello ' + foo">Hello World</p>

<button on="tap:AMP.setState({foo: 'amp-bind'})">Say "Hello amp-bind"</button>
```

[tip type="ll callout('Примечание</b><a class="type_note"]
Чтобы повысить эффективность и избавиться от неожиданных скачков контента, amp-bind не оценивает выражения при загрузке страницы. Поэтому для визуальных элементов должно быть задано состояние по умолчанию.
[/tip]

### Как это работает? <a name="how-does-it-work"></a>

У `amp-bind` есть три основных компонента:

1. [Состояние](#state): изменяемое состояние JSON для всего документа. В примере выше состояние пусто, пока не будет нажата кнопка.  После нажатия оно меняется на `{foo: 'amp-bind'}`.
2. [Выражения](#expressions): похожие на JavaScript выражения, которые могут ссылаться на **состояние**. В примере выше использовано одно выражение: `'Hello ' + foo`. Оно объединяет постоянную строку `'Hello '` и переменную состояния `foo`.
В выражении можно использовать не более 100 операндов.
3. [Привязки](#bindings): это специальные атрибуты вида `[property]`, которые связывают свойство элемента с **выражением**. В примере выше есть одна привязка, `[text]`, которая обновляет текст элемента `<p>` каждый раз, когда меняется значение выражения.

При использовании `amp-bind` особое внимание уделяется скорости, безопасности и эффективности AMP-страниц.

### Чуть более сложный пример <a name="a-slightly-more-complex-example"></a>

```html
<!-- Сложные вложенные данные JSON размещены в <amp-state>элементах.-->
<amp-state id="myAnimals">
  <script type="application/json">
    {
      "dog": {
        "imageUrl": "/img/dog.jpg",
        "style": "greenBackground"
      },
      "cat": {
        "imageUrl": "/img/cat.jpg",
        "style": "redBackground"
      }
    }
  </script>
</amp-state>

<p [text]="'This is a ' + currentAnimal + '.'">This is a dog.</p>

<!-- Классы CSS также можно добавлять и удалять с помощью [class]. -->
<p class="greenBackground" [class]="myAnimals[currentAnimal].style">
  Для каждого животного задан свой цвет фона.
</p>

<!-- Вы также можете изменить источник изображения с помощью привязки [src]. -->
<amp-img width="300" height="200" src="/img/dog.jpg" [src]="myAnimals[currentAnimal].imageUrl">
</amp-img>

<button on="tap:AMP.setState({currentAnimal: 'cat'})">Set to Cat</button>
```

  При нажатии кнопки происходит следующее:

  1. **Состояние обновляется**, для `currentAnimal` указывается значение `'cat'`.
  1. **Выражения**, которые зависят от значения `currentAnimal`, оцениваются:

    * `'Это ' + currentAnimal + '.'` =&gt; `'Это кошка.'`
    * `myAnimals[currentAnimal].style` =&gt; `'redBackground'`
    * `myAnimals[currentAnimal].imageUrl` =&gt;  `/img/cat.jpg`</li>

  1. **Привязки**, которые зависят от измененных выражений, обновляются:

    * Текст первого элемента `<p>` выглядит как "Это кошка.".
    * Во втором элементе `<p>` для атрибута `class` задается значение "redBackground".
    * Элемент `amp-img` выводит изображение кошки.</li>

  [tip type="ll callout('Совет</b><a class="type_success"]
[Воспользуйтесь **демо-версией**](https://ampbyexample.com/components/amp-bind/) этого примера с аннотациями к коду.
[/tip]

# Описание <a name="details"></a>

# Состояние <a name="state"></a>

У каждого AMP-документа, в котором используется `amp-bind`, есть общее изменяемое **состояние** JSON.

# Инициализация состояния с помощью `amp-state` <a name="initializing-state-with-amp-state"></a>

Состояние `amp-bind` может быть инициализировано с помощью компонента `amp-state`:

```html
<amp-state id="myState">
  <script type="application/json">
    {
      "foo": "bar"
      }
  </script>
</amp-state>
```

[Выражения](#expressions) могут ссылаться на переменные состояния через точечный синтаксис. В этом примере `myState.foo` оценивается как `"bar"`.

* Максимальный размер дочернего скрипта JSON для элемента `<amp-state>` составляет 100 КБ.
* Элемент `<amp-state>` также может указывать URL CORS вместо дочернего скрипта JSON. Более подробные сведения см. в [Приложении](#amp-state-specification).

# Обновление состояния <a name="refreshing-state"></a>

Этот компонент поддерживает действие `refresh` для обновления контента в состоянии.

```html
<amp-state id="amp-state" ...></amp-state>
<!-- Clicking the button will refresh and refetch the json in amp-state. -->
<button on="tap:amp-state.refresh"></button>
```

# Обновление состояния с помощью `AMP.setState()` <a name="updating-state-with-ampsetstate"></a>

Действие [`AMP.setState()`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md#target-amp) объединяет объектный литерал с состоянием. Например, при нажатии кнопки ниже `AMP.setState()` выполняется [глубокое слияние](#deep-merge-with-ampsetstate) объектного литерала и состояния.

```html
<!-- Like JavaScript, you can reference existing
      variables in the values of the object literal. -->
<button on="tap:AMP.setState({foo: 'bar', baz: myAmpState.someVariable})"></button>
```

Как правило, вложенные объекты объединяются до максимальной глубины 10. Все переменные, в том числе добавленные `amp-state`, могут быть переопределены.

Если действие `AMP.setState()` вызывается определенными событиями, то оно также может получить доступ к данным, связанным с событием, в свойстве `event`.

```html
<!-- The "change" event of this <input> element contains
      a "value" variable that can be referenced via "event.value". -->
<input type="range" on="change:AMP.setState({myRangeValue: event.value})">
```

# Изменение истории с помощью `AMP.pushState()` <a name="modifying-history-with-amppushstate"></a>

Действие [`AMP.pushState()`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md#target-amp) аналогично `AMP.setState()`, но оно также передает новую запись в стек истории браузера. При извлечении этой записи (например, при переходе назад) восстанавливаются предыдущие значения переменных, установленные `AMP.pushState()`.

Пример:
```html
<button on="tap:AMP.pushState({foo: '123'})">Set 'foo' to 123</button>
```

* При нажатии кнопки для переменной `foo` задается значение 123, а также создается новая запись в истории.
* При переходе назад восстанавливается прежнее значение переменной `foo`, "bar" (аналогично вызову `AMP.setState({foo: 'bar'})`.

# Выражения <a name="expressions"></a>

Выражения похожи на JavaScript, однако есть ряд важных отличий.

# Отличия от JavaScript <a name="differences-from-javascript"></a>

* Выражения могут получать только [состояние](#state) всего документа.
* У выражений **нет** доступа к глобальным переменным, таким как `window` и `document`.
* Можно использовать только функции и операторы [из белого списка](#allow-listed-functions).
* Запрещены пользовательские функции, классы и циклы. Стрелочные функции разрешены как параметры, например `Array.prototype.map`.
* Неопределенные переменные и индекс, который выходит за границы массива, возвращают значение `null` вместо `undefined` или ошибок.
* Для повышения эффективности в настоящее время каждое выражение поддерживает не более 50 операндов. Если вам требуется больше, [свяжитесь с нами](https://github.com/ampproject/amphtml/issues/new).

Грамматика и реализация полного выражения представлены в [bind-expr-impl.jison](https://github.com/ampproject/amphtml/blob/master/extensions/amp-bind/0.1/bind-expr-impl.jison) и [bind-expression.js](https://github.com/ampproject/amphtml/blob/master/extensions/amp-bind/0.1/bind-expression.js).

# Примеры <a name="examples"></a>

Ниже приведены все допустимые выражения:

```javascript
1 + '1'           // 11
1 + (+'1')        // 2
!0                // true
null || 'default' // 'default'
```

# Функции в белом списке <a name="allow-listed-functions"></a>

<table>
  <tr>
    <th>Тип объекта </th>
    <th>Функции</th>
    <th>Пример</th>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Methods"><code>Array</code></a><sup>1</sup></td>
    <td class="col-thirty">
      <code>concat</code><br>
      <code>filter</code><br>
      <code>includes</code><br>
      <code>indexOf</code><br>
      <code>join</code><br>
      <code>lastIndexOf</code><br>
      <code>map</code><br>
      <code>reduce</code><br>
      <code>slice</code><br>
      <code>some</code><br>
      <code>sort</code> (не по месту)<br>
      <code>splice</code> (не по месту)<br>
    </td>
    <td>
      <pre>// Returns [1, 2, 3].
          [3, 2, 1].sort()</pre>
        <pre>// Returns [1, 3, 5].
            [1, 2, 3].map((x, i) =&gt; x + i)</pre>
          <pre>// Returns 6.
              [1, 2, 3].reduce((x, y) =&gt; x + y)</pre>
          </td>
        </tr>
        <tr>
          <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#Methods"><code>Number</code></a></td>
          <td>
            <code>toExponential</code><br>
            <code>toFixed</code><br>
            <code>toPrecision</code><br>
            <code>toString</code>
            <td>
            <pre>// Returns 3.
                (3.14).toFixed()</pre>
              <pre>// Returns '3.14'.
                  (3.14).toString()</pre>
              </td>
            </tr>
            <tr>
              <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Methods"><code>String</code></a></td>
              <td>
                <code>charAt</code><br>
                <code>charCodeAt</code><br>
                <code>concat</code><br>
                <code>indexOf</code><br>
                <code>lastIndexOf</code><br>
                <code>slice</code><br>
                <code>split</code><br>
                <code>substr</code><br>
                <code>substring</code><br>
                <code>toLowerCase</code><br>
                <code>toUpperCase</code></td>
                <td>
                  <pre>// Returns 'abcdef'.
                      abc'.concat('def')</pre>
                  </td>
                </tr>
                <tr>
                  <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math"><code>Math</code></a><sup>2</sup></td>
                  <td>
                    <code>abs</code><br>
                    <code>ceil</code><br>
                    <code>floor</code><br>
                    <code>max</code><br>
                    <code>min</code><br>
                    <code>random</code><br>
                    <code>round</code><br>
                    <code>sign</code></td>
                    <td>
                      <pre>// Returns 1.
                          abs(-1)</pre>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object"><code>Object</code></a><sup>2</sup></td>
                      <td>
                        <code>keys</code><br>
                        <code>values</code>
                        <td>
                        <pre>// Returns ['a', 'b'].
                            keys({a: 1, b: 2})</pre>
                          <pre>// Returns [1, 2].
                              values({a: 1, b: 2}</pre>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects"><code>Global</code></a><sup>2</sup>
                          </td>
                          <td>
                            <code>encodeURI</code><br>
                            <code>encodeURIComponent</code>
                          </td>
                          <td>
                            <pre>// Returns 'Hello%20world'.
                                encodeURIComponent('Hello world')</pre>
                            </td>
                          </tr>
                        </table>

<sup>1</sup>В стрелочных функциях с одним параметром не должно быть скобок. Используйте `x => x + 1` вместо `(x) => x + 1`. Функции `sort()` и `splice()` не работают по месту расположения, а возвращают измененные копии.

<sup>2</sup>У статических функций нет пространства имен. Используйте `abs(-1)` вместо `Math.abs(-1)`.

# Определение макросов с помощью `amp-bind-macro` <a name="defining-macros-with-amp-bind-macro"></a>

Фрагменты выражения `amp-bind` можно использовать повторно. Для этого потребуется определить `amp-bind-macro`. Элемент `amp-bind-macro` позволяет определить выражение, которое принимает 0 или более аргументов и ссылается на текущее состояние. Макрос можно вызвать как функцию, если сослаться на значение атрибута `id` из любой части документа.

```html
<amp-bind-macro id="circleArea" arguments="radius" expression="3.14 * radius * radius"></amp-bind-macro>

<div>
  Площадь круга равна <span [text]="circleArea(myCircle.radius)">0</span>.
</div>

```

Макрос также может вызывать другие макросы, <i>определенные перед ним</i>. Рекурсивный вызов одного и того же макроса не допускается.

# Привязки <a name="bindings"></a>

**Привязка** – это специальный атрибут вида `[property]`, который связывает свойство элемента с [выражением](#expressions). Можно также использовать альтернативный синтаксис, совместимый с XML, в виде `data-amp-bind-property`.

При изменении **состояния** выражения повторно оцениваются, а свойства связанных элементов обновляются с учетом результатов нового выражения.

Элемент `amp-bind` поддерживает привязку данных к четырем типам состояния.

<table>
  <tr>
    <th>Тип</th>
    <th>Атрибуты</th>
    <th>Описание</th>
  </tr>
  <tr>
    <td class="col-thirty"><a href="https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent"><code>Node.textContent</code></a></td>
    <td class="col-thirty"><code>[text]</code></td>
    <td>Поддерживается большинством текстовых элементов.</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class">Классы CSS</a></td>
    <td><code>[class]</code></td>
    <td>Результатом выражения должна быть строка, разделенная пробелами.</td>
  </tr>
  <tr>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden">Атрибут <code>hidden</code></a></td>
    <td><code>[hidden]</code></td>
    <td>Это должно быть логическое выражение.</td>
  </tr>
  <tr>
    <td>Размер <a href="../../../documentation/components/index.html">элементов AMP</a></td>
    <td><code>[width]</code><br><code>[height]</code></td>
    <td>Меняет ширину и/или высоту AMP-элемента.</td>
  </tr>
  <tr>
    <td>Атрибуты для конкретных элементов</td>
    <td><a href="#element-specific-attributes">Разные атрибуты</a></td>
    <td></td>
  </tr>
</table>

Примечания о привязках:

* Привязка к `innerHTML` запрещена в целях безопасности.
* Все привязки атрибутов очищаются от небезопасных значений (например, `javascript:`).
* Результаты логического выражения меняют логические атрибуты. Пример: `<amp-video [controls]="expr"...>`. Если `expr` имеет значение `true`, в элементе `<amp-video>` есть атрибут `controls`. Если `expr` имеет значение `false`, атрибут `controls` удаляется.
* Квадратные скобки `[` и `]` в названиях атрибутов могут вызывать проблемы при записи XML (XHTML, JSX) или при записи атрибутов с помощью DOM API. В таких случаях используйте альтернативный синтаксис: `data-amp-bind-x="foo"` вместо `[x]="foo"`.

# Атрибуты для конкретных элементов <a name="element-specific-attributes"></a>

Ниже перечислены все компоненты и атрибуты, к которым разрешена привязка.

<table>
  <tr>
    <th>Компонент</th>
    <th>Атрибуты</th>
    <th>Действия</th>
  </tr>
  <tr>
    <td class="col-thirty"><code>&lt;amp-brightcove&gt;</code></td>
    <td class="col-fourty"><code>[data-account]</code><br><code>[data-embed]</code><br><code>[data-player]</code><br><code>[data-player-id]</code><br><code>[data-playlist-id]</code><br><code>[data-video-id]</code></td>
    <td class="col-thirty">Меняет отображаемое видео Brightcove.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-carousel type=slides&gt;</code></td>
    <td><code>[slide]</code><sup>*</sup></td>
    <td>Меняет текущий отображаемый индекс слайдов. См. <a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">пример</a>.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-date-picker&gt;</code></td>
    <td>
      <code>[min]</code><br>
      <code>[max]</code>
    </td>
    <td>
      Устанавливает самую раннюю дату для выбора.<br>
      Устанавливает самую позднюю дату для выбора.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-google-document-embed&gt;</code></td>
    <td><code>[src]</code><br><code>[title]</code></td>
    <td>Отображает документ по обновленному URL.<br>Меняет заголовок документа.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-iframe&gt;</code></td>
    <td><code>[src]</code></td>
    <td>Меняет исходный URL окна iframe.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-img&gt;</code></td>
    <td><code>[alt]</code><br><code>[attribution]</code><br><code>[src]</code><br><code>[srcset]</code></td>
    <td>При связывании с <code>[src]</code> убедитесь, что выполняется также привязка к <code>[srcset]</code>. Это необходимо для поддержки кеша.<br>См. соответствующие <a href="amp-img.md#attributes">атрибуты amp-img</a>.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-lightbox&gt;</code></td>
    <td><code>[open]</code><sup>*</sup></td>
    <td>
      Переключает отображение окна просмотра. Совет: используйте <code>on="lightboxClose: AMP.setState(...)"</code> для обновления переменных, когда окно просмотра закрыто.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-list&gt;</code></td>
    <td><code>[src]</code></td>
    <td>
      Для строковых выражений извлекает и отображает JSON из URL строки. Для объектов и массивов отображает данные выражения.
    </td>
  </tr>
  <tr>
    <td><code>&lt;amp-selector&gt;</code></td>
    <td><code>[selected]</code><sup>*</sup><br><code>[disabled]</code></td>
    <td>Изменяет выбранные в данный момент дочерние элементы,<br>определяя их по значению атрибута <code>option</code>. Поддерживает список значений, разделенный запятыми, для множественного выбора. См. <a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/#linking-carousels-with-amp-bind">пример</a>.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-state&gt;</code></td>
    <td><code>[src]</code></td>
    <td>Извлекает JSON из нового URL и объединяет его с существующим состоянием. <em>Учтите, что в следующем обновлении элементы <code>&lt;amp-state&gt;</code> будут игнорироваться для предотвращения циклов.</em></td>
  </tr>
  <tr>
    <td><code>&lt;amp-video&gt;</code></td>
    <td><code>[alt]</code><br><code>[attribution]</code><br><code>[controls]</code><br><code>[loop]</code><br><code>[poster]</code><br><code>[preload]</code><br><code>[src]</code></td>
    <td>См. соответствующие <a href="amp-video.md#attributes">атрибуты amp-video</a>.</td>
  </tr>
  <tr>
    <td><code>&lt;amp-youtube&gt;</code></td>
    <td><code>[data-videoid]</code></td>
    <td>Меняет отображаемое видео YouTube.</td>
  </tr>
  <tr>
    <td><code>&lt;a&gt;</code></td>
    <td><code>[href]</code></td>
    <td>Меняет ссылку.</td>
  </tr>
  <tr>
    <td><code>&lt;button&gt;</code></td>
    <td><code>[disabled]</code><br><code>[type]</code><br><code>[value]</code></td>
    <td>См. соответствующие <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Attributes">атрибуты button</a>.</td>
  </tr>
  <tr>
    <td><code>&lt;details&gt;</code></td>
    <td><code>[open]</code></td>
    <td>См. соответствующие <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#Attributes">атрибуты details</a>.</td>
  </tr>
  <tr>
    <td><code>&lt;fieldset&gt;</code></td>
    <td><code>[disabled]</code></td>
    <td>Включает или отключает набор полей.</td>
  </tr>
  <tr>
    <td><code>&lt;image&gt;</code></td>
    <td><code>[xlink:href]</code><br>
      <td> См. соответствующие <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image">атрибуты image</a>.</td>
    </tr>
    <tr>
      <td><code>&lt;input&gt;</code></td>
      <td><code>[accept]</code><br><code>[accessKey]</code><br><code>[autocomplete]</code><br><code>[checked]</code><br><code>[disabled]</code><br><code>[height]</code><br><code>[inputmode]</code><br><code>[max]</code><br><code>[maxlength]</code><br><code>[min]</code><br><code>[minlength]</code><br><code>[multiple]</code><br><code>[pattern]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[selectiondirection]</code><br><code>[size]</code><br><code>[spellcheck]</code><br><code>[step]</code><br><code>[type]</code><br><code>[value]</code><br><code>[width]</code></td>
      <td>См. соответствующие <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes">атрибуты input</a>.</td>
    </tr>
    <tr>
      <td><code>&lt;option&gt;</code></td>
      <td><code>[disabled]</code><br><code>[label]</code><br><code>[selected]</code><br><code>[value]</code></td>
      <td>См. соответствующие <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option#Attributes">атрибуты option</a>.</td>
    </tr>
    <tr>
      <td><code>&lt;optgroup&gt;</code></td>
      <td><code>[disabled]</code><br><code>[label]</code></td>
      <td>См. соответствующие <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup#Attributes">атрибуты optgroup</a>.</td>
    </tr>
    <tr>
      <td><code>&lt;select&gt;</code></td>
      <td><code>[autofocus]</code><br><code>[disabled]</code><br><code>[multiple]</code><br><code>[required]</code><br><code>[size]</code></td>
      <td>См. соответствующие <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#Attributes">атрибуты select</a>.</td>
    </tr>
    <tr>
      <td><code>&lt;source&gt;</code></td>
      <td><code>[src]</code><br><code>[type]</code></td>
      <td>См. соответствующие <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#Attributes">атрибуты source</a>.</td>
    </tr>
    <tr>
      <td><code>&lt;track&gt;</code></td>
      <td><code>[label]</code><br><code>[src]</code><br><code>[srclang]</code></td>
      <td>См. соответствующие <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track#Attributes">атрибуты track</a>.</td>
    </tr>
    <tr>
      <td><code>&lt;textarea&gt;</code></td>
      <td><code>[autocomplete]</code><br><code>[autofocus]</code><br><code>[cols]</code><br><code>[disabled]</code><br><code>[maxlength]</code><br><code>[minlength]</code><br><code>[placeholder]</code><br><code>[readonly]</code><br><code>[required]</code><br><code>[rows]</code><br><code>[selectiondirection]</code><br><code>[selectionend]</code><br><code>[selectionstart]</code><br><code>[spellcheck]</code><br><code>[wrap]</code></td>
      <td>См. соответствующие <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#Attributes">атрибуты textarea</a>.</td>
    </tr>
  </table>

  <sup>*</sup>Привязываемые атрибуты, у которых нет аналогов без привязок.

# Отладка <a name="debugging"></a>

Выполните тест в режиме разработчика (с фрагментом URL `#development=1`). Вы увидите предупреждения и ошибки, а также сможете воспользоваться специальными функциями отладки.

# Предупреждения <a name="warnings"></a>

В режиме разработчика `amp-bind` выдает предупреждение, если значение по умолчанию для связанного атрибута не соответствует начальному результату соответствующего выражения. Это помогает предотвратить непреднамеренные мутации, вызванные изменениями в других переменных состояния. Пример:

```html
<!-- The element's default class value ('def') doesn't match the expression result for [class] ('abc'),
so a warning will be issued in development mode. -->

<p class="def" [class]="'abc'"></p>

```

В режиме разработчика `amp-bind` также выдает предупреждение при разыменовании неопределенных переменных или свойств. Это также помогает предотвратить непреднамеренные мутации из-за результатов выражения `null`. Пример:

```html
<amp-state id="myAmpState">
  <script type="application/json">
    { "foo": 123 }
</script>
</amp-state></p>

<!-- The amp-state#myAmpState does not have a `bar` variable, so a warning
  will be issued in development mode. -->
<p [text]="myAmpState.bar">Текст в теге.</p>
```

# Ошибки <a name="errors"></a>

При работе с `amp-bind` в среде выполнения возникает несколько типов ошибок.

<table>
  <tr>
    <th>Тип</th>
    <th>Сообщение</th>
    <th>Подсказка</th>
  </tr>
  <tr>
    <td class="col-thirty">Неверная привязка</td>
    <td class="col-fourty"><em>Привязка к атрибуту [НазваниеАтрибута] в теге &lt;P> не допускается</em>.</td>
    <td class="col-thirty">Используйте только <a href="#element-specific-attributes">привязки из белого списка</a>.</td>
  </tr>
  <tr>
    <td>Синтаксическая ошибка</td>
    <td><em>Ошибка компиляции выражения: …</em></td>
    <td>Убедитесь, что в выражении нет опечаток.</td>
  </tr>
  <tr>
    <td>Функции, не входящие в белый список</td>
    <td><em>Функция оповещения не поддерживается.</em></td>
    <td>Используйте только <a href="#allow-listed-functions">функции из белого списка</a>.</td>
  </tr>
  <tr>
    <td>Недопустимый результат</td>
    <td><em>Результат "javascript:alert(1)" недопустим для [href].</em></td>
    <td>Избегайте запрещенных URL-протоколов или выражений, которые не поддерживаются валидатором AMP.</td>
  </tr>
  <tr>
    <td>Нарушение CSP</td>
    <td><em>Нельзя создать рабочий процесс для 'blob:...', поскольку это нарушает следующую директиву Политики безопасности контента:…</em></td>
    <td>Добавьте <code>default-src blob:</code> в свою Политику безопасности контента. Чтобы обеспечить высокую эффективность, компонент <code>amp-bind</code> передает дорогостоящую работу <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#Dedicated_workers">специальному процессу Web Worker</a>.</td>
  </tr>
</table>

# Состояние отладки <a name="debugging-state"></a>

Чтобы вывести текущее состояние на консоль, воспользуйтесь `AMP.printState()`.

# Приложение <a name="appendix"></a>

# Спецификация `<amp-state>` <a name="amp-state-specification"></a>

Элемент `amp-state` может содержать дочерний элемент `<script>` **ИЛИ** атрибут `src` с URL CORS для удаленной конечной точки JSON. Сочетать эти функции нельзя.

```html
<amp-state id="myLocalState">
  <script type="application/json">
    {
      "foo": "bar"
      }
  </script>
</amp-state>

<amp-state id="myRemoteState" src="https://data.com/articles.json">
</amp-state>
```

# Пакетная обработка запросов XHR <a name="xhr-batching"></a>

AMP объединяет запросы XHR для конечных точек JSON. Поэтому ы можете использовать один запрос данных JSON как источник для нескольких покупателей (то есть нескольких элементов `amp-state`) на AMP-странице.  Например, если элемент `amp-state` отправляет запрос XHR to an в конечную точку, в процессе отправки все последующие запросы XHR к этой же конечной точке не будут отправляться. Результаты придут в ответе на первый запрос.

# Атрибуты <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>URL удаленной конечной точки, которая будет возвращать JSON для обновления состояния <code>amp-state</code>. Это должна быть служба CORS HTTP.
        Атрибут <code>src</code> поддерживает все стандартные замены переменных URL. Подробная информация приведена в <a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md">этом руководстве</a>.
        [tip type="important"]
      Конечная точка должна соответствовать требованиям, указанным в <a href="../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md">Спецификации CORS для запросов на AMP-страницах</a>.
      [/tip]</td>
  </tr>
  <tr>
    <td width="40%"><strong>credentials (необязательно)</strong></td>
    <td>Определяет параметр <code>credentials</code> в соответствии с <a href="https://fetch.spec.whatwg.org/">Fetch API</a>.
      <ul>
        <li>Поддерживаемые значения: `omit`, `include`.</li>
        <li>Значение по умолчанию: `omit`.</li>
      </ul>
      Чтобы отправить учетные данные, передайте значение <code>include</code>. Если это значение установлено, ответ будет соответствовать <a href="../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp">требованиям по безопасности CORS для AMP</a>.</td>
    </tr>
  </table>

# Глубокое слияние с применением `AMP.setState()` <a name="deep-merge-with-ampsetstate"></a>

При вызове `AMP.setState()` компонент `amp-bind` выполняет глубокое слияние объектного литерала с текущим состоянием. Все переменные из литерала записываются непосредственно в состояние, кроме вложенных объектов, которые рекурсивно объединяются. Примитивы и массивы в состоянии всегда переопределяются переменными с теми же именами из объектного литерала.

Пример:

```javascript
{
  <!-- State is empty -->
  }
```

```html
<button on="tap:AMP.setState({employee: {name: 'John Smith', age: 47, vehicle: 'Car'}})"...></button>
<button on="tap:AMP.setState({employee: {age: 64}})"...></button>
```

При нажатии первой кнопки состояние меняется:

```javascript
{
  employee: {
    name: 'John Smith',
    age: 47,
    vehicle: 'Car',
    }
  }
```

При нажатии второй кнопки `amp-bind` выполняет рекурсивное слияние аргумента объектного литерала (`{employee: {age: 64}}`) с текущим состоянием.

```javascript
{
  employee: {
    name: 'John Smith',
    age: 64,
    vehicle: 'Car',
    }
  }
```

Значение `employee.age` удалось обновить, но `employee.name` и `employee.vehicle` не изменились.

Учтите, что `amp-bind` выдаст ошибку, если вы обратитесь к `AMP.setState()` с объектным литералом, в котором есть циклические ссылки.

# Удаление переменной <a name="circular-references"></a>

Чтобы удалить существующую переменную состояния, задайте для нее значение `null` в `AMP.setState()`. Рассмотрим состояние из предыдущего примера. При нажатии кнопки:

```html
<button on="tap:AMP.setState({employee: {vehicle: null}})"...></button>
```

Состояние меняется на следующее:

```javascript
{
  employee: {
    name: 'John Smith',
    age: 48,
    }
  }
```

Аналогично при использовании такого кода:

```html
<button on="tap:AMP.setState({employee: null})"...></button>
```

Состояние меняется на следующее:

```javascript
{
  <!-- State is empty -->
  }
```

# Грамматика выражения <a name="expression-grammar"></a>

Грамматика выражений `amp-bind` похожа на BNF:

```text
expr:
    operation
  | invocation
  | member_access
  | '(' expr ')'
  | variable
  | literal

operation:
    '!' expr
  | '-' expr
  | '+' expr
  | expr '+' expr
  | expr '-' expr
  | expr '*' expr
  | expr '/' expr
  | expr '%' expr
  | expr '&&' expr
  | expr '||' expr
  | expr '<=' expr
  | expr '<' expr
  | expr '>=' expr
  | expr '>' expr
  | expr '!=' expr
  | expr '==' expr
  | expr '?' expr ':' expr

invocation:
    expr '.' NAME args

args:
    '(' ')'
  | '(' array ')'
  ;

member_access:
    expr member
  ;

member:
    '.' NAME
  | '[' expr ']'

variable:
    NAME
  ;

literal:
    STRING
  | NUMBER
  | TRUE
  | FALSE
  | NULL
  | object_literal
  | array_literal

array_literal:
    '[' ']'
  | '[' array ']'

array:
    expr
  | array ',' expr

object_literal:
    '{' '}'
  | '{' object '}'

object:
    key_value
  | object ',' key_value

key_value:
  expr ':' expr
```
