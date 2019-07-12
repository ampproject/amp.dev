---
$category@: layout
formats:
- websites
- email
- ads
teaser:
  text: Показ похожих материалов вдоль горизонтальной оси.
---

<!---
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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

# amp-carousel

Общая карусель, которая предназначена для показа похожих материалов вдоль горизонтальной оси и отличается гибкостью и эффективностью.

<table>
  <tr>
    <td width="40%"><strong>Скрипт</strong></td>
    <td><code>&lt;script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Поддерживаемые макеты</a></strong></td>
    <td>
      <ul>
        <li>Карусель: fixed, fixed-height, nodisplay.</li>
        <li>Слайды: fill, fixed, fixed-height, flex-item, nodisplay, responsive.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>Примеры</strong></td>
    <td>Примеры на AMP-страницах:<ul>
      <li><a href="https://ampbyexample.com/components/amp-carousel/">Пример использования компонента amp-carousel</a></li>
      <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/">Галереи изображений с компонентом amp-carousel</a></li></ul></td>
    </tr>
  </table>

# Принципы работы

Каждый непосредственный дочерний элемент компонента `amp-carousel` представляет собой элемент карусели. У каждого из этих узлов также могут иметь дочерние элементы HTML.

Карусель состоит из определенного числа элементов. Кроме того, при необходимости на нее можно добавлять дополнительные стрелки, позволяющие перейти к предыдущему или следующему элементу.

Переход по карусели выполняется, если пользователь проводит пальцем по экрану, а также нажимает на клавиши со стрелками или на дополнительные стрелки.

<!--embedded example - displays in ampproject.org -->

<div>
  <amp-iframe height="313" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampcarousel.basic.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Ещё" overflow="" tabindex="0" role="button">Показать код полностью</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

# Переход к нужному слайду

Если в качестве метод для атрибута `on` в элементе задать `tap:carousel-id.goToSlide(index=N)`, при нажатии пользователя в карусели с идентификатором carousel-id будет выполнен переход к слайду с порядковым значением index=N (значение первого слайда – index=0, второго – index=1 и т. д.).

В этом примере приводится карусель с тремя изображениями, под которой расположены кнопки предварительного просмотра. При нажатии на одну из кнопок показывается соответствующий элемент карусели.

<!--embedded example - displays in ampproject.org -->

<div>
  <amp-iframe height="878" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampcarousel.advance-slide.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Ещё" overflow="" tabindex="0" role="button">Показать код полностью</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

# Атрибуты

<table>
  <tr>
    <td width="40%"><strong>type</strong></td>
    <td>Тип отображения элементов на карусели. Возможные варианты:
      <ul>
        <li><code>carousel</code> (по умолчанию). Показ и прокрутка слайдов выполняется по горизонтали. В этом типе поддерживаются следующие макеты: <code>fixed</code>, <code>fixed-height</code> и <code>nodisplay</code>.</li>
        <li><code>slides</code>. Выполняется показ по одному слайду. В этом типе поддерживаются только следующие макеты: <code>fill</code>, <code>fixed</code>, <code>fixed-height</code>, <code>flex-item</code>, <code>nodisplay</code> и <code>responsive</code>.</li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>height (обязательно)</strong></td>
      <td>Высота карусели в пикселях.</td>
    </tr>
    <tr>
      <td width="40%"><strong>controls (необязательно)</strong></td>
      <td>Постоянно показывает клавиши со стрелками влево и вправо, с помощью которых пользователи могут переходить от одного элемента карусели к другому на мобильных устройствах.
          По умолчанию такие клавиши на мобильных устройствах исчезают в течение нескольких секунд.
          Показ клавиш со стрелками также можно настроить с помощью стилей. Чтобы эти клавиши появлялись только на экранах с определенной шириной, можно использовать специальный запрос медиа. На компьютерах клавиши со стрелками показываются до тех пор, пока на карусели представлены по меньшей мере два дочерних элемента.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-next-button-aria-label (необязательно)</strong></td>
        <td>Настройка элемента aria-label в атрибуте <code>amp-carousel-button-next</code>. Если значение не задано, то элементу aria-label по умолчанию назначается вариант "Следующий элемент в карусели".</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-prev-button-aria-label (необязательно)</strong></td>
        <td>Настройка элемента aria-label в атрибуте <code>amp-carousel-button-prev</code>. Если значение не задано, то элементу aria-label по умолчанию назначается вариант "Следующий элемент в карусели".</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-button-count-format (необязательно)</strong></td>
        <td>Строка формата, которая имеет вид <code>(%s of %s)</code> и используется в качестве суффикса в элементе aria-label для атрибута <code>amp-carousel-button-next</code>/<code>amp-carousel-button-prev</code>. Это позволяет предоставлять информацию пользователям программ чтения с экрана об их действиях с каруселью. Если не указать значение, будет задан вариант по умолчанию –(%s of %s).</td>
      </tr>
      <tr>
        <td width="40%"><strong>autoplay (необязательно)</strong></td>
        <td>Переход от одного слайда к другому без участия пользователя.<br>
          Если для атрибута не задано значение, то он:
          <ul>
            <li>По умолчанию выполняет переход к следующему слайду с интервалом в 5000 миллисекунд (5 секунд). Изменить эту настройку можно с помощью атрибута <code>delay</code>.</li>
            <li>Добавляет атрибут <code>loop</code> в компонент <code>amp-carousel</code>, если его ещё там нет.</li>
            <li>Выполняется только при наличии по меньшей мере 2 слайдов.</li>
            <li>Подходит только для каруселей с типом <code>type=slides</code>.</li>
          </ul>
          Если для атрибута не задано значение, то он:
          <ul>
            <li>Добавляет атрибут <code>loop</code> в компонент <code>amp-carousel</code>, если его ещё там нет.</li>
            <li>Удаляет атрибут <code>loop</code>после того, как выполнено заданное число повторов.</li>
          </ul></td>
        </tr>
        <tr>
          <td width="40%"><strong>delay (необязательно)</strong></td>
          <td>Указывает интервал перехода к следующему слайду (в миллисекундах), если включен атрибут <code>autoplay</code>. Атрибут <code>delay</code> подходит только для каруселей с типом <code>type=slides</code>.</td>
        </tr>
        <tr>
          <td width="40%"><strong>loop (необязательно)</strong></td>
          <td>Позволяет пользователю миновать первый или последний элемент. Повторы будут выполняться только при наличии хотя бы трех слайдов. Атрибут <code>loop</code> подходит только для каруселей с типом <code>type=slides</code>.
            <em>Пример: показ карусели, содержащей слайды, с элементами управления, повторами и задержкой автовоспроизведения</em>
            <!--embedded example - displays in ampproject.org -->
            <div>
              <amp-iframe height="446" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampcarousel.controls.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
                <div aria-label="Ещё" overflow="" tabindex="0" role="button">Показать код полностью</div>
                <div placeholder=""></div>
              </amp-iframe>
            </div></td>
          </tr>
          <tr>
            <td width="40%"><strong>common attributes</strong></td>
            <td>Этот элемент содержит <a href="https://www.ampproject.org/docs/reference/common_attributes">распространенные атрибуты</a>, которые поддерживаются компонентами AMP.</td>
          </tr>
        </table>

# Поддержка стилей

* Настраивать стиль элемента `amp-carousel` можно с помощью селектора этого элемента.
* Для таргетинга элементов карусели можно использовать селектор класса `.amp-carousel-slide`.
* Если кнопка, связанная с компонентом `amp-carousel`, отключена, ее визуальное состояние скрыто.
* В элементе `.amp-carousel-button` используется специальный встроенный файл SVG по умолчанию, который обеспечивает фоновое изображение кнопок. Вы можете заменить его на собственный файл SVG или изображение (см. пример ниже).

*Пример: встроенный файл SVG с элементом `.amp-carousel-button`, используемый по умолчанию*

```css
.amp-carousel-button-prev {
  left: 16px;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z" fill="#fff" /></svg>');
}
```

*Пример: замена встроенного файла SVG с элементом `.amp-carousel-button`, используемого по умолчанию*

```css
.amp-carousel-button-prev {
  left: 5%;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z" fill="#fff" /></svg>');
}
```

# Валидация

С правилами для компонента amp-carousel можно ознакомиться в [спецификации валидатора AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-carousel/validator-amp-carousel.protoascii).
