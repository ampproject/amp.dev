---
$category@: media
formats:
- websites
- email
- ads
- stories
teaser:
  text: заменяет HTML5-тег img
---

<!---
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

# amp-img

<table>
  <tr>
    <td class="col-fourty"><strong>Описание</strong></td>
    <td>Замена для HTML-тега <code>img</code>. Можно управлять в среде выполнения.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Поддерживаемые макеты</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay, responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Примеры</strong></td>
    <td>См. пример <a href="https://ampbyexample.com/components/amp-img/">amp-img</a> на сайте AMP By Example.</td>
  </tr>
</table>


# Действия

Среда выполнения может задерживать загрузку ресурсов или повышать ее приоритет в зависимости от системных ресурсов, пропускной способности, положения области просмотра и других факторов. Компоненты `amp-img` позволяют среде выполнения эффективно управлять графическими ресурсами.

Для компонентов `amp-img`, как и для всех получаемых извне ресурсов AMP, должен быть задан конкретный размер (например `width`/`height`). Это необходимо, чтобы соотношение сторон можно было узнать, не извлекая изображение. Поведение макета определяется атрибутом `layout`.

[tip type="read-on"]
Более подробную информацию можно найти в спецификации [системы макетов AMPHTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md) и в списке [поддерживаемых макетов](https://www.ampproject.org/docs/guides/responsive/control_layout.html#the-layout-attribute).
[/tip]

# Пример: показ адаптивного изображения

В примере ниже показывается изображение, которое реагирует на размер области просмотра благодаря настройке `layout=responsive`.  Оно растягивается и сжимается в соответствии с соотношением сторон, заданным с помощью свойств `width` и `height`.

<div>
  <amp-iframe height="193" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.basic.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Ещё" overflow="" tabindex="0" role="button">Показать код полностью</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

[tip type="read-on"]
Ознакомьтесь с [руководством по созданию адаптивных AMP-страниц](https://www.ampproject.org/docs/guides/responsive/responsive_design.html).
[/tip]

Если ресурс, запрошенный компонентом `amp-img` не загружается, а дочерний элемент [`fallback`](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md#fallback) отсутствует, пространство будет пустым. Резервное изображение показывается только в исходном макете. При последующих изменениях src, например с помощью resize + srcset, оно не используется. Это позволяет повысить эффективность.

# Пример: показ резервного изображения

В этом примере, если браузер не поддерживает WebP, показывается резервное изображение JPG:

<div>
  <amp-iframe height="271" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.fallback.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Ещё" overflow="" tabindex="0" role="button">Показать код полностью</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

Цвет фона и другие графические элементы для резервного изображения можно задать с помощью селектора CSS и стиля самого элемента.

Дополнительные функции, такие как подписи, можно реализовать с помощью стандартного HTML (например, `figure` и `figcaption`).

[tip type="read-on"]
Ознакомьтесь со статьями об использовании `amp-img`:

* [Заполнители и резервные изображения](https://www.ampproject.org/docs/design/responsive/placeholders)
* [Добавление изображений и видео](https://www.ampproject.org/docs/media/amp_replacements)
[/tip]

# Атрибуты

**src**

Этот атрибут похож на `src` в теге `img`. Значение должно быть URL, указывающим на общедоступный кешируемый файл изображения. Поставщики кеша могут переписывать эти URL при приеме AMP-файлов, чтобы добавить указание на кешированную версию изображения.

**srcset**

Аналог атрибута `srcset` в теге `img`. Для браузеров, которые не поддерживают `srcset`, `<amp-img>` будет по умолчанию использовать `src`. Если есть только `srcset`, а `src` отсутствует, будет выбран первый URL в `srcset`.

**sizes**

Аналог атрибута `sizes` в теге `img`.

[tip type="read-on"]
Подробные сведения об использовании `sizes` и `srcset` можно найти в [этой статье](https://www.ampproject.org/docs/design/responsive/art_direction).
[/tip]

**alt**

Строка альтернативного текста, похожая на атрибут `alt` в `img`.

**attribution**

Строка, которая указывает на атрибуцию изображения. Пример: `attribution="CC courtesy of Cats on Flicker"`.

**height** и **width**

Конкретные размеры, по которым среда выполнения AMP определяет соотношение сторон без извлечения изображения.

**common attributes**

Этот элемент содержит [распространенные атрибуты](https://www.ampproject.org/docs/reference/common_attributes), расширенные до компонентов AMP.

# Поддержка стилей

Стиль `amp-img` можно задать непосредственно через свойства CSS. Вот пример для серого фона:

```css
amp-img {
  background-color: grey;
  }
```

# Справочный центр

# Масштабирование изображения до максимальной ширины

Если вы хотите, чтобы ваше изображение масштабировалось с учетом размера окна, но до максимальной ширины и не далее, выполните следующие действия:

1. Задайте `layout=responsive` для `<amp-img>`.
1. В контейнере изображения укажите CSS-атрибут `max-width:<max width to display image>`.  Почему в контейнере?  Элемент `amp-img` со свойством `layout=responsive` является *блочным*, тогда как `<img>` – *встроенный*. В качестве альтернативы вы можете добавить атрибут `display: inline-block` в CSS для элемента amp-img.

# Различия между адаптивным и встроенным макетами

Макеты `responsive` (адаптивный) и `intrinsic` (встроенный) создают изображение, которое масштабируется автоматически.  Однако `intrinsic` использует изображение SVG в качестве элемента масштабирования.  Поэтому поведение не отличается от стандартного HTML-изображения, а браузер при этом получает данные о размере в исходном макете. Макет `intrinsic` имеет собственный размер и увеличивает плавающий элемент `div`, пока не будет достигнут естественный размер изображения или ограничение в CSS (например, `max-width`). Макет `responsive` будет отображать 0 x 0 в плавающем `div`, поскольку изображение наследует размер от родительского элемента, а у него в плавающем виде размер отсутствует.

# Установка изображения фиксированного размера

Чтобы изображение показывалось в фиксированном размере, выполните следующие действия:

1. Задайте `layout=fixed` для `<amp-img>`.
1. Укажите значения для `width` и `height`.

[tip type="read-on"]
Узнайте, [какие шаблоны выводятся](https://www.ampproject.org/docs/design/responsive/control_layout#what-if-the-layout-attribute-isn%E2%80%99t-specified?), если атрибут `layout` не задан.
[/tip]

# Установка соотношения сторон

Для адаптивных изображений значения `width` и `height` не обязательно должны в точности совпадать с шириной и высотой `amp-img`. Достаточно соблюдать то же соотношение сторон.

Например, вместо `width="900"` и `height="675"` можно задать `width="1.33"` and `height="1"`.

<div>
  <amp-iframe height="193" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.aspectratio.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Ещё" overflow="" tabindex="0" role="button">Показать код полностью</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

# Настройка нескольких исходных файлов для разных разрешений экрана

Чтобы добавить варианты изображения с разным разрешением но одним и тем же соотношением сторон, используйте атрибут [`srcset`](#attributes). Браузер будет автоматически выбирать наиболее подходящий файл из списка `srcset`, учитывая разрешение и размер пользовательского экрана.

Атрибут [`media`](https://www.ampproject.org/docs/reference/common_attributes#media) наоборот показывает или скрывает компоненты AMP. Его следует применять при создании адаптивных макетов. Чтобы добавить изображения с разным соотношением сторон, используйте несколько компонентов `<amp-img>`. В каждый из них необходимо добавить атрибут `media`, соответствующий ширине экрана для показа экземпляра.

Ознакомьтесь с [руководством по созданию адаптивных AMP-страниц](https://www.ampproject.org/docs/design/responsive/responsive_design#displaying-responsive-images).

# Сохранение соотношения сторон для изображений с неизвестными размерами

Системе макетов AMP необходимо знать соотношение сторон изображения до его извлечения. Однако в некоторых случаях размеры недоступны. Чтобы показать такие изображения и сохранить соотношение сторон, используйте AMP-шаблон [`fill`](https://www.ampproject.org/docs/design/responsive/control_layout#the-layout-attribute) вместе со свойством CSS [`object-fit`](https://css-tricks.com/almanac/properties/o/object-fit/)/ Ознакомьтесь со статьей о том, [как обеспечить поддержку изображений с неизвестными размерами](https://ampbyexample.com/advanced/how_to_support_images_with_unknown_dimensions) на сайте AMP By Example.

# Валидация

О правилах для amp-img читайте в [спецификации валидатора AMP](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii).
