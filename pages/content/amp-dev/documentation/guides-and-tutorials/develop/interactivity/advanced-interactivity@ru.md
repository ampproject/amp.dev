---
'$title': Улучшение интерактивности
$order: 2
description: 'Стартовый код обеспечивает лишь минималистичный опыт взаимодействия. Есть несколько способов улучшить его: - Добавьте индикатор, который отображает...'
---

Стартовый код обеспечивает лишь минималистичный опыт взаимодействия. Есть несколько способов улучшить его:

- Добавьте индикатор, который отображает номер текущего слайда и общее количество слайдов.
- Когда пользователь выбирает другой цвет рубашки, поменяйте карусель изображений, чтобы показывать изображения рубашек выбранного цвета.

До появления компонента [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) реализовать такую функциональность было невозможно. Давайте получим практический опыт работы с [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) и добавим эти новые функции в наш образец кода.

## Установите компонент `amp-bind`

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) — это AMP-компонент, который позволяет создавать индивидуальные интерактивные возможности, используя JS-подобные выражения и привязки данных. Чтобы использовать [`amp-bind`](../../../../documentation/components/reference/amp-bind.md), следует установить его на странице.

Откройте файл [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) и добавьте в список AMP-компонентов в разделе `<head>` страницы следующий скрипт:

```html
<script
  async
  custom-element="amp-bind"
  src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
></script>
```

## Добавьте индикатор слайдов

[`amp-bind`](../../../../documentation/components/reference/amp-bind.md) работает путем привязки атрибутов элемента к пользовательским выражениям. Эти выражения могут ссылаться на «состояние» (изменяемые данные JSON). Мы можем инициализировать такое состояние через компонент [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state), включенный в [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

### Инициализируйте состояние слайда

Давайте инициализируем переменную состояния, которая будет отслеживать индекс текущего слайда в карусели изображений. Откройте [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) и добавьте в верхнюю часть раздела `<body>` (перед `<header>`) следующий код:

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0
    }
  </script>
</amp-state>
```

Доступ к данным, заключенным в элементы [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state), можно осуществлять с помощью назначенного им идентификатора. Например, мы можем ссылаться на эту переменную с помощью следующего фрагмента выражения:

```javascript
selected.slide; // Evaluates to 0.
```

### Обновите состояние слайда

Далее давайте сделаем так, чтобы эта переменная обновлялась, когда пользователь меняет слайды на карусели. Добавьте в существующий элемент [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) следующее действие `"on"`:

```html
<amp-carousel
  type="slides"
  layout="fixed-height"
  height="250"
  id="carousel"
  on="slideChange:AMP.setState({selected: {slide: event.index}})"
></amp-carousel>
```

Теперь, когда отображаемый слайд [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) изменится, действие `AMP.setState` будет вызвано со следующим аргументом:

```javascript
{
  selected: {
    slide: event.index;
  }
}
```

Выражение `event.index` выдает новый индекс слайда, а действие `AMP.setState()` выполнит слияние этого литерала объекта с текущим состоянием. Эта операция заменяет текущее значение `selected.slide` значением `event.index`.

[tip type="tip"] **СОВЕТ.** `AMP.setState()` осуществляет глубокое слияние многоуровневых литералов объектов. Для получения дополнительной информации см. документацию [`amp-bind`](../../../../documentation/components/reference/amp-bind.md). [/tip]

### Привяжите элементы индикатора

Далее давайте воспользуемся переменной состояния, которая отслеживает отображенный в настоящий момент слайд, и создадим индикатор слайда. Найдите элемент индикатора слайда (ищите `<!-- TODO: "Add a slide indicator" -->`) и добавьте в его дочерние элементы следующие привязки:

```html
<!-- TODO: "Add a slide indicator" -->
<p class="dots">
  <!-- The <span> element corresponding to the current displayed slide
       will have the 'current' CSS class. -->
  <span [class]="selected.slide == 0 ? 'current' : ''" class="current"></span>
  <span [class]="selected.slide == 1 ? 'current' : ''"></span>
  <span [class]="selected.slide == 2 ? 'current' : ''"></span>
</p>
```

`[class]` — это привязка, меняющая атрибут `class`; вы можете использовать ее для добавления или удаления классов CSS из любого элемента.

**Попробуйте в деле**: обновите страницу и смените слайд!

При смене слайда на карусели она:

1. Инициирует событие `slideChange`...
2. Которое вызывает действие `AMP.setState`...
3. Которое обновляет переменную состояния `selected.slide`...
4. Которая обновляет привязку `[class]` на элементах `<span>` в составе индикатора.

Отлично! Теперь у нас есть работающий индикатор слайдов.

[tip type="success"]

Посмотрите, удастся ли вам добавить функциональность, чтобы, когда пользователь нажимает на индикаторную точку слайда, карусель изображений заполнялась выбранным элементом. В качестве подсказки: используйте событие `tap` и привязку `[slide]` на [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[/tip]

## Измените изображения в карусели

Было бы удобно, если при изменении выбранного цвета мы могли бы видеть изображения рубашек соответствующих цветов. С помощью [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) мы можем сделать это, привязав `[src]` к элементам [`amp-img`](../../../../documentation/components/reference/amp-img.md) внутри [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

### Инициализируйте состояние SKU

Для начала нам нужно инициализировать состояние, указав источники (URL-адреса) изображений рубашек каждого цвета. Давайте сделаем это, воспользовавшись новым элементом [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state):

```html
<!-- Available shirts. Maps unique string identifier to color and image URL string. -->
<amp-state id="shirts">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg"
      },
      "1002": {
        "color": "blue",
        "image": "./shirts/blue.jpg"
      },
      "1010": {
        "color": "brown",
        "image": "./shirts/brown.jpg"
      },
      "1014": {
        "color": "dark green",
        "image": "./shirts/dark-green.jpg"
      },
      "1015": {
        "color": "gray",
        "image": "./shirts/gray.jpg"
      },
      "1016": {
        "color": "light gray",
        "image": "./shirts/light-gray.jpg"
      },
      "1021": {
        "color": "navy",
        "image": "./shirts/navy.jpg"
      },
      "1030": {
        "color": "wine",
        "image": "./shirts/wine.jpg"
      }
    }
  </script>
</amp-state>
```

Данный элемент [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) содержит объект JSON, который сопоставляет строку идентификатора рубашки (т. е. артикул) с цветом рубашки и URL-адресом ее изображения. Здесь также можно использовать массив JSON, но применение объекта позволит нам реализовать еще несколько интересных вещей, о которых мы скоро расскажем.

Теперь URL-адрес изображения доступен нам из идентификатора рубашки. Например, `shirts['10014'].color` выдает `"dark green"`, а `shirts['10030'].image` возвращает URL-адрес изображения рубашки цвета `"wine"`.

### Отслеживайте выбранный вариант товара

Если мы добавим еще одну переменную состояния, которая отслеживает выбранный вариант товара, мы можем привязать к элементам [`amp-img`](../../../../documentation/components/reference/amp-img.md) выражение, обновляющее их атрибуты `src` при изменении выбранного варианта товара. Добавьте новый ключ `sku` в JSON существующего элемента `amp-state#selected`:

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0,
      "sku": "1001"
    }
  </script>
</amp-state>
```

### Обновите состояние варианта товара

Добавьте в элемент [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) действие «on», обновляющее переменную `selected.sku` при выборе нового цвета:

```html
<amp-selector
  name="color"
  on="select:AMP.setState({selected: {sku: event.targetOption}})"
></amp-selector>
```

[tip type="tip"] **СОВЕТ.** Эту операцию можно также выполнить путем добавления действий `on="tap:AMP.setState(...)` в каждый дочерний элемент [`amp-img`](../../../../documentation/components/reference/amp-img.md) компонента [`amp-selector`](../../../../documentation/components/reference/amp-selector.md). Одним из важных преимуществ [`amp-selector`](../../../../documentation/components/reference/amp-selector.md) является подобное упрощение разметки. [/tip]

### Привяжите элементы изображений

Далее добавьте привязки в [`amp-img`](../../../../documentation/components/reference/amp-img.md):

```html
<!-- Update the `src` of each <amp-img> when the `selected.sku` variable changes. -->
<amp-img
  width="200"
  height="250"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
<amp-img
  width="300"
  height="375"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
<amp-img
  width="400"
  height="500"
  src="./shirts/black.jpg"
  [src]="shirts[selected.sku].image"
></amp-img>
```

[tip type="note"] **Примечание.** На практике, скорее всего, каждое изображение в карусели будет иметь собственный `src`. Это можно реализовать путем замены одного изображения массивом изображений. В данном уроке для упрощения процесса используется одно изображение с разной степенью увеличения. [/tip]

**Попробуйте в действии**: обновите страницу и выберите другой цвет рубашки. Когда вы сделаете это, в карусели отобразятся изображения с рубашками выбранного цвета.
