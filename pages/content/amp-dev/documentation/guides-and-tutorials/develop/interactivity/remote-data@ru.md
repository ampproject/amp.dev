---
"$title": Работа с удаленными данными
"$order": '3'
description: Ваши привязываемые данные слишком велики или сложны для извлечения при загрузке страницы? У каждого варианта товара есть цена, на поиск которой...
toc: 'true'
---

Ваши привязываемые данные слишком велики или сложны для извлечения при загрузке страницы? У каждого варианта товара есть цена, на поиск которой уходит много времени? Поиск цен для разных вариантов непросмотренных товаров — пустая трата времени.

[tip type="success"]

[`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state) поддерживает загрузку удаленных данных через атрибут [`src`](../../../../documentation/components/reference/amp-bind.md#attributes), который загружает JSON из конечной точки CORS. Эта загрузка выполняется один раз при загрузке страницы и полезна для обеспечения актуальности данных (особенно при загрузке из кеша).

Вы также можете привязать атрибут `src` к элементу [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state). Это означает, что действие пользователя может инициировать загрузку удаленных данных JSON в привязываемое состояние страницы.

[/tip]

## Загрузка имеющихся размеров рубашки

Давайте воспользуемся возможностью извлечения удаленных данных, чтобы получить цены вариантов товаров, представленных в нашей выборке. Наш сервер разработки Express.js в `app.js` уже имеет конечную точку `/shirts/sizesAndPrices?shirt=<sku>` которая, учитывая варианты рубашки, возвращает доступные размеры и цену для каждого размера. Он отправляет ответ с искусственной задержкой в одну секунду для имитации задержки в сети.

Запрос | Ответ
--- | ---
`GET /shirts/sizesAndPrices?sku=1001` | `{"1001: {"sizes": {"XS": 8.99, "S" 9.99}}}`

Подобно данным JSON внутри элементов [`<amp-state>`](../../../../documentation/components/reference/amp-bind.md#state), удаленные данные, возвращаемые из этих выборок, объединяются и доступны в атрибуте `id` элемента. Например, к данным, возвращенным из приведенного выше примера ответа, можно получить доступ в выражении:

Выражение | Результат
--- | ---
`shirts['1001'].sizes['XS']` | `8.99`

### Привяжите данные

Теперь давайте применим это в нашем примере интернет-магазина. Сначала давайте извлечем данные рубашки при выборе нового варианта. Добавьте привязку `[src]` к нашему элементу `amp-state#shirts` :

```html
<!-- When `selected.sku` changes, update the `src` attribute and fetch
     JSON at the new URL. Then, merge that data under `id` ("shirts"). -->
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
```

### Укажите отсутствующие размеры

Далее давайте четко пометим отсутствующие размеры как таковые для данного варианта товара. CSS-класс `"unavailable"` перечеркивает элемент диагональной линией — мы можем добавить его в соответствующие отсутствующим размерам элементы, размещенные внутри [`amp-selector`](../../../../documentation/components/reference/amp-selector.md):

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- If 'XS' size is available for selected SKU, return empty string.
           Otherwise, return 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'">
        <div option="M">M</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'">
        <div option="L">L</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'">
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

Теперь перезагрузите страницу и попробуйте ее в работе. Выбор нового варианта товара (цвета рубашки) приведет к вычеркиванию отсутствующих размеров (после небольшой задержки).

### Укажите начальные состояния

Есть небольшая проблема — что делать с рубашкой черного цвета, т. е. цвета, выбранного по умолчанию? Нам нужно будет добавить данные о размерах и цене черной рубашки в `amp-state#shirts`, поскольку [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) запускается только в ответ на явные действия пользователя:

```html
<amp-state id="shirts" [src]="'/shirts/sizesAndPrices?sku=' + selected.sku">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg",
        "sizes": {
          "XS": 8.99,
          "S": 9.99
        }
      },
<!-- ... -->
```

Нам также нужно обновить состояние по умолчанию соответствующих элементов:

```html
<amp-selector name="size">
  <table>
    <tr>
      <!-- If 'XS' size is available for selected SKU, return empty string.
           Otherwise, return 'unavailable'. -->
      <td [class]="shirts[selected.sku].sizes['XS'] ? '' : 'unavailable'">
        <div option="XS">XS</div>
      </td>
      <td [class]="shirts[selected.sku].sizes['S'] ? '' : 'unavailable'">
        <div option="S">S</div>
      </td>
      <!-- Add the 'unavailable' class to the next three <td> elements
           to be consistent with the available sizes of the default SKU. -->
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['M'] ? '' : 'unavailable'">
        <div option="M">M</div>
      </td>
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['L'] ? '' : 'unavailable'">
        <div option="L">L</div>
      </td>
      <td class="unavailable"
          [class]="shirts[selected.sku].sizes['XL'] ? '' : 'unavailable'">
        <div option="XL">XL</div>
      </td>
    </tr>
  </table>
</amp-selector>
```

[tip type="note"] **ПРИМЕЧАНИЕ.** [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) не запускается при загрузке страницы — только в ответ на явные действия пользователя. Это гарантирует, что начальная загрузка будет одинаково быстрой на всех страницах независимо от использования [`amp-bind`](../../../../documentation/components/reference/amp-bind.md). [/tip]

## Переменные цены на рубашки

Теперь, когда мы правильно отображаем доступные размеры, давайте удостоверимся, что отображается правильная цена.

Наш магазин AMPPAREL отличается тем, что цена на рубашку зависит от цвета и размера. Это означает, что нам нужна новая переменная для отслеживания выбранного пользователем размера. Добавьте новое действие к нашему элементу размера [`amp-selector`](../../../../documentation/components/reference/amp-selector.md):

```html
<!-- When an element is selected, set the `selectedSize` variable to the
     value of the "option" attribute of the selected element.  -->
<amp-selector name="size"
    on="select:AMP.setState({selectedSize: event.targetOption})">
```

Обратите внимание, что мы не инициализируем значение `selectedSize` через элемент `amp-state#selected`. Это потому, что мы намеренно не предоставляем выбранный размер по умолчанию и вместо этого хотим заставить пользователя выбирать размер.

[tip type="tip"] **TIP -** `AMP.setState()` может использоваться для определения новых переменных в дополнение к изменению существующих. Выражения оценят неопределенные переменные в `null`. [/tip]

Добавьте новый элемент `<span>` обертывающий ценовую метку, и измените текст по умолчанию на «---», поскольку размер по умолчанию не выбран.

```html
<h6>PRICE :
  <!-- Display the price of the selected shirt in the selected size if available.
       Otherwise, display the placeholder text '---'. -->
  <span [text]="shirts[selected.sku].sizes[selectedSize] || '---'">---</span>
</h6>
```

И у нас правильные цены! Попробуйте это.

## Условно-активная кнопка

Мы почти закончили! Давайте отключим кнопку «Добавить в корзину», когда выбранный размер недоступен:

```html
<!-- Disable the "ADD TO CART" button when:
     1. There is no selected size, OR
     2. The available sizes for the selected SKU haven't been fetched yet
-->
<input type="submit" value="ADD TO CART" disabled
    class="mdl-button mdl-button--raised mdl-button--accent"
    [disabled]="!selectedSize || !shirts[selected.sku].sizes[selectedSize]">
```

**Попробуйте в действии**: если вы выберете недоступный размер, вы не сможете добавить его в корзину.
