---
$title: amp-list
$category@: dynamic-content
teaser:
  text: Использование шаблонов для динамической загрузки данных и создания элементов списков
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



Динамически извлекает контент из конечной точки CORS JSON и отображает его в соответствии с указанным шаблоном.

<table>
  <tr>
    <td width="40%"><strong>Скрипт</strong></td>
    <td><code>&lt;script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Поддерживаемые шаблоны</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay, responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Примеры</strong></td>
    <td>Пример использования компонента amp-list можно найти <a href="https://ampbyexample.com/components/amp-list/">на сайте AMP By Example</a>.</td>
  </tr>
</table>

## Использование <a name="usage"></a>

Компонент `<amp-list>` динамически извлекает контент из конечной точки CORS JSON. Ответ, полученный от конечной точки, содержит данные, которые отображаются в указанном шаблоне.

[tip type="important"]
Конечная точка должна соответствовать требованиям, перечисленным в спецификации для [запросов CORS в AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md).
[/tip]

Указать шаблон можно одним из двух способов:

* Добавить атрибут `template`, который ссылается на идентификатор существующего элемента `template` или `script`.
* Добавить вложенный элемент `template` или `script` непосредственно в элемент `amp-list`.

Более подробные сведения о шаблонах приведены в разделе [Шаблоны AMPHTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-templates.md).

*Пример динамического списка*

В примере ниже мы извлекаем данные JSON с URL и заголовками, а затем отображаем этот контент во вложенном [шаблоне amp-mustache](amp-mustache.md).

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="100"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json">
  <template type="amp-mustache">{% raw %}
    <div class="url-entry">
      <a href="{{url}}">{{title}}</a>
    </div>
  {% endraw %}</template>
</amp-list>
```
[/example]

Вот файл JSON, который мы использовали:

```json
{
 "items": [
   {
     "title": "AMP YouTube Channel",
     "url": "https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw"
   },
   {
     "title": "AMP.dev",
     "url": "https://amp.dev/"
   },
   {
     "title": "AMP Validator",
     "url": "https://validator.amp.dev/"
   },
   {
     "title": "AMP Playground",
     "url": "https://playground.amp.dev/"
   }
 ]
}
```
Вот как стилизован извлеченный контент:

```css
amp-list div[role="list"] {
  display: grid;
  grid-gap: 0.5em;
  }
```

## Действия <a name="behavior"></a>

Запрос всегда выполняется со стороны клиента, даже если документ отправляется из Google AMP Cache. Загрузка активируется с использованием обычных правил AMP. Учитывается также то, насколько далеко от текущей области просмотра находится элемент.

Если элемент `<amp-list>` требует больше пространства после загрузки, он отправляет в библиотеку AMP запрос на изменение высоты, используя обычный процесс AMP. Если библиотека AMP не может удовлетворить запрос, но элемент `overflow` доступен, отображается именно он. Как правило, при расположении элемента `<amp-list>` в нижней части документа библиотека AMP практически всегда может изменить его размер.

По умолчанию элемент `<amp-list>` добавляет роль ARIA `list` для элемента-списка и роль `listitem` для объектов в нем, которые обрабатываются по шаблону.

### Пакетная обработка запросов XHR <a name="xhr-batching"></a>

Технология AMP поддерживает пакетную обработку запросов XMLHttpRequest (XHR), отправленных к конечным точкам JSON. Один запрос JSON можно использовать как источник данных для нескольких пользователей на AMP-странице (например, как множество элементов `<amp-list>`).  Допустим, элемент `<amp-list>` отправляет запрос XHR в конечную точку. Во время его передачи все последующие запросы XHR для той же конечной точки не будут срабатывать. Вместо этого будут передаваться те же результаты, что и для первого запроса.

В элементе `<amp-list>`, можно использовать атрибут [`items`](#items-optional) для обработки подраздела ответа JSON response. Это позволяет создать несколько элементов `<amp-list>` для обработки разного контента в рамках единого запроса XHR.

### Добавление атрибута overflow <a name="specifying-an-overflow"></a>

При необходимости в элемент `<amp-list>` можно добавить элемент с атрибутом `overflow`. Он показывается в тех случаях, когда библиотека AMP не может изменить размер элемента `<amp-list>` в соответствии с запросом.

*Пример отображения атрибута overflow, когда списку требуется больше пространства*

В примере ниже показывается список изображений с подписями. Поскольку контент элемента `<amp-list>` требует больше пространства, чем доступно, библиотека AMP отображает атрибут overflow.

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="140"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-data.json">
  <template type="amp-mustache">{% raw %}
    <div class="image-entry">
      <amp-img src="{{imageUrl}}"
        width="100"
        height="75"></amp-img>
      <span class="image-title">{{title}}</span>
    </div>
  {% endraw %}</template>
  <div overflow
    class="list-overflow">
    See more
  </div>
</amp-list>
```
[/example]

Вот код CSS для `overflow`:

```css
.list-overflow[overflow] {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  }
```

### Заполнитель и резервный атрибут <a name="placeholder-and-fallback"></a>

При желании в `<amp-list>` можно добавить как заполнитель, так и резервный атрибут.

* *Заполнитель* – это дочерний элемент с атрибутом `placeholder`. Он показывается до тех пор, пока `<amp-list>` не будет успешно загружен. Если предоставлен также резервный атрибут, заполнитель скрывается, когда при загрузке `<amp-list>` возникает ошибка.
* *Резервный атрибут* – это дочерний элемент с атрибутом `fallback`. Он показывается, если при загрузке `<amp-list>` возникает ошибка.

Подробные сведения о заполнителях и резервных атрибутах можно найти в [этой статье](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). Учтите, что дочерний элемент не может одновременно быть и заполнителем, и резервным атрибутом.

```html
<amp-list src="https://foo.com/list.json">
  <div placeholder>Loading ...</div>
  <div fallback>Failed to load data.</div>
</amp-list>
```

### Обновление данных <a name="refreshing-data"></a>

Элемент `<amp-list>` предоставляет действие `refresh`, на которое другие элементы могут ссылаться в атрибутах `on="tap:..."`.

```html
{% raw %}<button on="tap:myList.refresh">Refresh List</button>
<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}
```

### Динамическое изменение размера <a name="dynamic-resizing"></a>

##### Экспериментальное решение: amp-list-resizable-children <a name="experiment-amp-list-resizable-children"></a>

В некоторых случаях необходимо, чтобы элемент `<amp-list>` менял размер, когда с ним взаимодействует пользователь. Например, если в `<amp-list>` есть элемент amp-accordion на который пользователь может нажать, а также когда `<amp-list>` меняет размер из-за привязанных классов CSS или когда количество элементов внутри `<amp-list>` меняется из-за привязанного атрибута `[src]`. Действие `changeToLayoutContainer` при активации меняет amp-list на `layout="CONTAINER"`. Вот пример:

```html
{% raw %}<button on="list.changeToLayoutContainer()">Show Grid</button>
<amp-list id="list"
          width="396" height="80" layout="responsive"
          src="/test/manual/amp-list-data.json?RANDOM">
  <template type="amp-mustache">
    {{title}}
  </template>
</amp-list>
{% endraw %}
```

В настоящее время это экспериментальное решение можно реализовать с помощью `amp-list-resizable-children`.

## Атрибуты <a name="attributes"></a>

##### src (обязательно) <a name="src-required"></a>

URL удаленной конечной точки, которая возвращает код JSON для показа в данном элементе `<amp-list>`. Это должна быть служба CORS HTTP. Для URL следует использовать протокол HTTPS.

[tip type="important"]
Конечная точка должна соответствовать требованиям, перечисленным в спецификации для [запросов CORS в AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md).
[/tip]

Атрибут `src` можно не указывать, если уже есть `[src]`. Это полезно, когда контент отображается по пользовательскому жесту и через [`amp-bind`](amp-bind.md), а не сразу при загрузке страницы.

##### credentials (необязательно) <a name="credentials-optional"></a>

Определяет параметр `credentials` в соответствии с [Fetch API](https://fetch.spec.whatwg.org/).

* Допустимые значения: `omit`, `include`.
* Значение по умолчанию: `omit`.

Чтобы отправить учетные данные, передайте значение `include`. Если это значение установлено, ответ будет соответствовать [требованиям по безопасности CORS для AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).

Вот пример включения учетных данных для показа персонализированного контента в списке:

```html
{% raw %}
<amp-list credentials="include"
          src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)">
  <template type="amp-mustache">
    Your personal offer: ${{price}}
  </template>
</amp-list>
{% endraw %}
```

##### items (необязательно) <a name="items-optional"></a>

Определяет выражение для поиска массива, который будет отображаться в ответе. Это выражение, представленное в точечной нотации, которое перемещается по полям ответа JSON.
По умолчанию элемент `<amp-list>` ожидает массива. Атрибут `single-item` может использоваться для загрузки данных из объекта.

* Значение по умолчанию: `"items"`. Ожидаемый ответ: `{items: [...]}`.
* Если сам ответ является желаемым массивом, используйте значение `"."`. Ожидаемый ответ: `[...]`.
* Допускается вложенная навигация (например `"field1.field2"`). Ожидаемый ответ: `{field1: {field2: [...]}}`.

Если задан вариант `items="items"` (по умолчанию) ответ должен представлять собой объект JSON, содержащий массив с названием `"items"`:
```text
{
  "items": [...]
}
```

#### max-items (необязательно) <a name="max-items-optional"></a>

Целочисленное значение, указывающее максимальную длину массива элементов для отображения.
Массив `items` будет усечен до `max-items`, если возвращаемое значение превышает `max-items`.

#### single-item (необязательно) <a name="single-item-optional"></a>

Заставляет элемент `<amp-list>` воспринимать полученный результат как массив из одного элемента. Ответ объекта будет помещен в массив, поэтому поведение `{items: {...}}` будет таким же, как у `{items: [{...}]}`.

#### reset-on-refresh (необязательно) <a name="reset-on-refresh-optional"></a>

Снова отображает индикатор загрузки и заполнитель, если источник списка обновляется с помощью действия `amp-bind` или `refresh()`.

По умолчанию это срабатывает только при обновлениях, которые вызывают получение данных из сети. Чтобы сбросить все обновления, используйте `reset-on-refresh="always"`.

#### [is-layout-container] (экспериментальный атрибут, необязательно) <a name="binding-optional"></a>

Это привязываемый атрибут, его значение по умолчанию – false. Если для `bind` задано значение true, шаблон `<amp-list>` меняется на шаблон `CONTAINER`. Этот атрибут полезен, если нужно динамически изменить размер элемента amp-list. Значение true не используется по умолчанию, а `<amp-list>` не поддерживает шаблон `CONTAINER`, поскольку это может спровоцировать скачок контента при первой загрузке. В настоящее время это экспериментальное решение можно реализовать с помощью `amp-list-resizable-children`. Его альтернатива – действие `changeToLayoutContainer`.

#### binding (необязательно) <a name="is-layout-container-optional"></a>

Для страниц, где используются элементы `<amp-list>` и `amp-bind`, вы можете указать, нужно ли блокировать обработку при оценке привязок (например, `[text]`) в дочерних элементах.

Рекомендуем использовать `binding="no"` или `binding="refresh"` для повышения эффективности.

* `binding="no"`: никогда не блокировать обработку **(самый быстрый вариант)**.
* `binding="refresh"`: не блокировать обработку при первоначальной загрузке **(быстрый вариант)**.
* `binding="always"`: всегда блокировать обработку **(медленный вариант)**.

Если атрибут `binding` отсутствует, по умолчанию используется значение `always`.

## Экспериментальное решение: загрузка дополнительного контента и бесконечная прокрутка (amp-list-load-more) <a name="common-attributes"></a>

Мы создали экспериментальное решение `amp-list-load-more`, чтобы в элементе `<amp-list>` можно было реализовать разбивку на страницы и бесконечную прокрутку. Чтобы воспользоваться этой функцией, включите эксперимент amp-list-load-more на [этой странице](https://cdn.ampproject.org/experiments.html) и добавьте атрибут `load-more` в элемент `<amp-list>`. В настоящее время доступна только ознакомительная версия, окончательные API могут измениться.

#### Пример использования <a name="load-more-and-infinite-scroll"></a>

```html
<amp-list height="200" src="https://my.rest.endpoint/" width="100" load-more="auto">
  <template type="amp-mustache">
    // ...
  </template>
</amp-list>

```

Рабочие примеры можно найти по ссылкам: [test/manual/amp-list/infinite-scroll-1.amp.html](https://github.com/ampproject/amphtml/blob/master/test/manual/amp-list/infinite-scroll-1.amp.html) и [test/manual/amp-list/infinite-scroll-2.amp.html](https://github.com/ampproject/amphtml/blob/master/test/manual/amp-list/infinite-scroll-1.amp.html).

### Атрибуты <a name="sample-usage"></a>

#### load-more (обязательно) <a name="attributes-1"></a>

У этого атрибута может быть два значения: "auto" и "manual". При выборе "manual" в конце элемента `<amp-list>` будет показана кнопка "load-more". При выборе варианта "auto" элемент `<amp-list>` будет автоматически загружать контент на три области просмотра вниз, чтобы создать эффект бесконечной прокрутки.

#### load-more-bookmark (необязательно) <a name="load-more-mandatory"></a>

Этот атрибут определяет имя поля в возвращаемых данных, где указан URL следующих элементов для загрузки. Если атрибут отсутствует, `<amp-list>` ожидает, что в полезной нагрузке JSON будет поле `load-more-src` с URL для продолжения загрузки. Если имя поля отличается от стандартного, вы можете задать его в поле `load-more-bookmark`. В примере ниже указано значение `load-more-bookmark="next"`.

```
{ "items": [...], "next": "https://url.to.load" }
```

### Настройка элементов load-more <a name="load-more-bookmark-optional"></a>

Элемент `<amp-list>` с атрибутом `load-more` содержит следующие элементы интерфейса: кнопку load-more, загрузчик, элемент load-fail и, при необходимости, элемент, обозначающий конец списка. Чтобы настроить все это, вы можете добавить элементы `<amp-list-load-more>` как дочерние для `<amp-list>`. При этом используйте следующие атрибуты:

#### load-more-button <a name="customizing-load-more-elements"></a>

Элемент `<amp-list-load-more>` с атрибутом `load-more-button` отображается в конце списка, если для load-more задано значение manual и загружены ещё не все элементы. При нажатии будет отправлен запрос на загрузку дополнительных элементов. URL для них указывается в поле `load-more-src` или в поле данных, которые возвращаются с учетом атрибута `load-more-bookmark`. Чтобы задать собственные настройки, добавьте `<amp-list>` с дочерним элементом, в который добавлен атрибут `load-more-button`.

##### Пример: <a name="load-more-button"></a>

```html
<amp-list load-more="manual" src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-button>
    <button>See More</button> /* My custom see more button */
  </amp-list-load-more>
</amp-list>
```
  It can be templated via `amp-mustache`.

##### Пример: <a name="example"></a>

```html
{% raw %}<amp-list load-more="auto" width="100" height="500" src="https://www.load.more.example.com/">
  ...
  <amp-list-load-more load-more-button>
    <template type="amp-mustache">
      Showing {{#count}} out of {{#total}} items
      <button>
        Click here to see more!
      </button>
    </template>
  </amp-list-load-more>
</amp-list>
{% endraw %}
```

#### load-more-loading <a name="example-1"></a>

Это загрузчик, который отображается, если пользователь дошел до конца списка, но контент ещё загружается, или если он нажал на элемент`load-more-button`, а новые дочерние элементы `<amp-list>` ещё загружаются. Чтобы задать собственные настройки, добавьте `<amp-list>` с дочерним элементом, в который добавлен атрибут `load-more-loading`. Вот пример:
```html
<amp-list load-more=auto src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-loading>
    <svg>...</svg> /* My custom loader */
  </amp-list-load-more>
</amp-list>
```

#### load-more-failed <a name="load-more-loading"></a>

Элемент `<amp-list-load-more>` содержит атрибут `load-more-failed` с кнопкой. В нем в свою очередь содержится атрибут `load-more-clickable`, который отображается в конце списка `<amp-list>`, если загрузка не удалась. При нажатии на этот элемент начнется повторная загрузка URL. Чтобы задать собственные настройки, добавьте `<amp-list>` с дочерним элементом, в который добавлен атрибут `load-more-failed`. Пример:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <button>Unable to Load More</button>
  </amp-list-load-more>
</amp-list>
```

В примере выше весь элемент `load-more-failed` поддерживает нажатие. Однако распространен вариант с элементом "Загрузка не удалась", где активна только кнопка "Повторить". В таком случае необходимо добавить атрибут без возможности нажатия с кнопкой, куда добавлен элемент `load-more-clickable` element. Пример:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <div>
      Here is some unclickable text saying sorry loading failed.
    </div>
    <button load-more-clickable>Click me to reload!</button>
  </amp-list-load-more>
</amp-list>
```

#### load-more-end <a name="load-more-failed"></a>

Этот элемент отсутствует по умолчанию. Однако если в элемент `<amp-list>` добавлен дочерний элемент `<amp-list-load-more>` с атрибутом `load-more-end`, он будет показываться в конце списка `<amp-list>`, когда контент загружен полностью.  Шаблон для этого элемента можно задать с помощью `amp-mustache`. Пример:

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-end>
    Congratulations! You've reached the end. /* Custom load-end element */
  </amp-list-load-more>
</amp-list>
```

##### common attributes <a name="load-more-end"></a>

Этот элемент содержит [распространенные атрибуты](../../../documentation/guides-and-tutorials/learn/common_attributes.md), расширенные до компонентов AMP.

## Замены <a name="substitutions"></a>

Элемент `<amp-list>` поддерживает все стандартные варианты замены переменных URL.
Подробная информация приведена в [этом руководстве](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md).

Пример:
```html
<amp-list src="https://foo.com/list.json?RANDOM"></amp-list>
```
запрашивает что-то вроде `https://foo.com/list.json?0.8390278471201`. Значение RANDOM генерируется случайным образом при каждом показе.

## Валидация <a name="validation"></a>

Ознакомьтесь с [правилами для amp-list](https://github.com/ampproject/amphtml/blob/master/extensions/amp-list/validator-amp-list.protoascii) в спецификации Валидатора AMP.
