---
$title: amp-img
$category@: media
teaser:
  text: заменяет HTML5-тег img
---

<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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
    <td class="col-fourty"><strong>Описание</strong></td>
    <td>Замена для HTML-тега <code>img</code>. Можно управлять в среде выполнения.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Поддерживаемые макеты</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Примеры</strong></td>
    <td>См. пример <a href="https://ampbyexample.com/components/amp-img/">amp-img</a> на сайте AMP By Example.</td>
  </tr>
</table>


# Действия <a name="behavior"></a>

Среда выполнения может задерживать загрузку ресурсов или повышать ее приоритет в зависимости от системных ресурсов, пропускной способности, положения области просмотра и других факторов. Компоненты `amp-img` позволяют среде выполнения эффективно управлять графическими ресурсами.

Для компонентов `amp-img`, как и для всех получаемых извне ресурсов AMP, должен быть задан конкретный размер (например `width`/`height`). Это необходимо, чтобы соотношение сторон можно было узнать, не извлекая изображение. Поведение макета определяется атрибутом `layout`.

[tip type="read-on"]
Более подробную информацию можно найти в спецификации [системы макетов AMPHTML](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md) и в списке [поддерживаемых макетов](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute).
[/tip]

# Пример: показ адаптивного изображения <a name="example-displaying-a-responsive-image"></a>

В примере ниже показывается изображение, которое реагирует на размер области просмотра благодаря настройке `layout=responsive`.  Оно растягивается и сжимается в соответствии с соотношением сторон, заданным с помощью свойств `width` и `height`.

[example preview="inline" playground="true"]
```html
<amp-img alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive">
</amp-img>
```
[/example]

[tip type="read-on"]
Ознакомьтесь с [руководством по созданию адаптивных AMP-страниц](../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md).
[/tip]

Если ресурс, запрошенный компонентом `amp-img` не загружается, а дочерний элемент [`fallback`](../../../documentation/guides-and-tutorials/learn/amp-html-layout/index.md#fallback) отсутствует, пространство будет пустым. Резервное изображение показывается только в исходном макете. При последующих изменениях src, например с помощью resize + srcset, оно не используется. Это позволяет повысить эффективность.

# Пример: показ резервного изображения <a name="example-specifying-a-fallback-image"></a>

В этом примере, если браузер не поддерживает WebP, показывается резервное изображение JPG:

[example preview="inline" playground="true"]
```html
<amp-img alt="Mountains"
  width="550"
  height="368"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp">
  <amp-img alt="Mountains"
    fallback
    width="550"
    height="368"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"></amp-img>
</amp-img>
```
[/example]

Цвет фона и другие графические элементы для резервного изображения можно задать с помощью селектора CSS и стиля самого элемента.

Дополнительные функции, такие как подписи, можно реализовать с помощью стандартного HTML (например, `figure` и `figcaption`).

[tip type="read-on"]
Ознакомьтесь со статьями об использовании `amp-img`:

* [Заполнители и резервные изображения](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)
* [Добавление изображений и видео](../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md)
[/tip]

# Атрибуты <a name="attributes"></a>

**src**

Этот атрибут похож на `src` в теге `img`. Значение должно быть URL, указывающим на общедоступный кешируемый файл изображения. Поставщики кеша могут переписывать эти URL при приеме AMP-файлов, чтобы добавить указание на кешированную версию изображения.

**srcset**

Аналог атрибута `srcset` в теге `img`. Для браузеров, которые не поддерживают `srcset`, `<amp-img>` будет по умолчанию использовать `src`. Если есть только `srcset`, а `src` отсутствует, будет выбран первый URL в `srcset`.

**sizes**

Аналог атрибута `sizes` в теге `img`.

[tip type="read-on"]
Подробные сведения об использовании `sizes` и `srcset` можно найти в [этой статье](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).
[/tip]

**alt**

Строка альтернативного текста, похожая на атрибут `alt` в `img`.

**attribution**

Строка, которая указывает на атрибуцию изображения. Пример: `attribution="CC courtesy of Cats on Flicker"`.

**height** и **width**

Конкретные размеры, по которым среда выполнения AMP определяет соотношение сторон без извлечения изображения.

**common attributes**

Этот элемент содержит [распространенные атрибуты](../../../documentation/guides-and-tutorials/learn/common_attributes.md), расширенные до компонентов AMP.

# Поддержка стилей <a name="styling"></a>

Стиль `amp-img` можно задать непосредственно через свойства CSS. Вот пример для серого фона:

```css
amp-img {
  background-color: grey;
  }
```

# Справочный центр <a name="tips--tricks"></a>

# Масштабирование изображения до максимальной ширины <a name="scaling-an-image-up-to-a-maximum-width"></a>

Если вы хотите, чтобы ваше изображение масштабировалось с учетом размера окна, но до максимальной ширины и не далее, выполните следующие действия:

1. Задайте `layout=responsive` для `<amp-img>`.
1. В контейнере изображения укажите CSS-атрибут `max-width:<max width to display image>`.  Почему в контейнере?  Элемент `amp-img` со свойством `layout=responsive` является *блочным*, тогда как `<img>` – *встроенный*. В качестве альтернативы вы можете добавить атрибут `display: inline-block` в CSS для элемента amp-img.

# Различия между адаптивным и встроенным макетами <a name="the-difference-between-responsive-and-intrinsic-layout"></a>

Макеты `responsive` (адаптивный) и `intrinsic` (встроенный) создают изображение, которое масштабируется автоматически.  Однако `intrinsic` использует изображение SVG в качестве элемента масштабирования.  Поэтому поведение не отличается от стандартного HTML-изображения, а браузер при этом получает данные о размере в исходном макете. Макет `intrinsic` имеет собственный размер и увеличивает плавающий элемент `div`, пока не будет достигнут естественный размер изображения или ограничение в CSS (например, `max-width`). Макет `responsive` будет отображать 0 x 0 в плавающем `div`, поскольку изображение наследует размер от родительского элемента, а у него в плавающем виде размер отсутствует.

# Установка изображения фиксированного размера <a name="setting-a-fixed-sized-image"></a>

Чтобы изображение показывалось в фиксированном размере, выполните следующие действия:

1. Задайте `layout=fixed` для `<amp-img>`.
1. Укажите значения для `width` и `height`.

[tip type="read-on"]
Узнайте, [какие шаблоны выводятся](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#what-if-the-layout-attribute-isnt-specified), если атрибут `layout` не задан.
[/tip]

# Установка соотношения сторон <a name="setting-the-aspect-ratio"></a>

Для адаптивных изображений значения `width` и `height` не обязательно должны в точности совпадать с шириной и высотой `amp-img`. Достаточно соблюдать то же соотношение сторон.

Например, вместо `width="900"` и `height="675"` можно задать `width="1.33"` and `height="1"`.

[example preview="inline" playground="true"]
```html
<amp-img alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="1.33"
  height="1"
  layout="responsive">
</amp-img>
```
[/example]

# Настройка нескольких исходных файлов для разных разрешений экрана <a name="setting-multiple-source-files-for-different-screen-resolutions"></a>

Чтобы добавить варианты изображения с разным разрешением но одним и тем же соотношением сторон, используйте атрибут [`srcset`](#attributes). Браузер будет автоматически выбирать наиболее подходящий файл из списка `srcset`, учитывая разрешение и размер пользовательского экрана.

Атрибут [`media`](../../../documentation/guides-and-tutorials/learn/common_attributes.md#media) наоборот показывает или скрывает компоненты AMP. Его следует применять при создании адаптивных макетов. Чтобы добавить изображения с разным соотношением сторон, используйте несколько компонентов `<amp-img>`. В каждый из них необходимо добавить атрибут `media`, соответствующий ширине экрана для показа экземпляра.

Ознакомьтесь с [руководством по созданию адаптивных AMP-страниц](../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md#displaying-responsive-images).

# Сохранение соотношения сторон для изображений с неизвестными размерами <a name="maintaining-the-aspect-ratio-for-images-with-unknown-dimensions"></a>

Системе макетов AMP необходимо знать соотношение сторон изображения до его извлечения. Однако в некоторых случаях размеры недоступны. Чтобы показать такие изображения и сохранить соотношение сторон, используйте AMP-шаблон [`fill`](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) вместе со свойством CSS [`object-fit`](https://css-tricks.com/almanac/properties/o/object-fit/)/ Ознакомьтесь со статьей о том, [как обеспечить поддержку изображений с неизвестными размерами](https://ampbyexample.com/advanced/how_to_support_images_with_unknown_dimensions) на сайте AMP By Example.

# Валидация <a name="validation"></a>

О правилах для amp-img читайте в [спецификации валидатора AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).
