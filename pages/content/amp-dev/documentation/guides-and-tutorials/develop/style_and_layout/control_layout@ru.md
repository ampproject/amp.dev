---
"$title": Поддерживаемые макеты
"$order": '1'
description: AMP поддерживает как медиазапросы, так и элементные запросы, а также предлагает мощный встроенный способ управления атрибутом макетом отдельных элементов. Атрибут layout позволяет создавать ...
formats:
- websites
- email
- ads
- stories
author: Meggin
contributors:
- pbakaus
---

AMP поддерживает как <strong>медиазапросы</strong>, так и <strong>элементные запросы</strong>, а также предлагает мощный встроенный способ управления атрибутом <strong>макетом</strong> отдельных элементов. Атрибут <code>layout</code> позволяет создавать полностью адаптивный дизайн и работать с ним гораздо проще, чем при использовании исключительно CSS.

## Размещение адаптивных изображений

Чтобы создавать адаптивные изображения, укажите атрибуты `width` и `height`, установите атрибуту layout значение `responsive` и с помощью [`srcset`](art_direction.md) укажите, какой файл изображения использовать в зависимости от размеров экрана:

[sourcecode:html]
<amp-img
    src="/img/narrow.jpg"
    srcset="/img/wide.jpg 640w,
           /img/narrow.jpg 320w"
    width="1698"
    height="2911"
    layout="responsive"
    alt="an image">
</amp-img>
[/sourcecode]

Данный элемент [`amp-img`](../../../../documentation/components/reference/amp-img.md) автоматически растягивается до ширины своего элемента-контейнера, а его высота автоматически настраивается согласно соотношению сторон, определенному по указанной ширине и высоте. Попробуйте его в деле, меняя размер окна браузера:

<amp-img src="/static/img/background.jpg" width="1920" height="1080" layout="responsive"></amp-img>

[tip type="tip"] **СОВЕТ.** Посмотрите наши сравнительные демонстрации использования [`amp-img`](../../../../documentation/components/reference/amp-img.md): [Live Demos on AMP By Example](../../../../documentation/examples/documentation/amp-img.html?format=websites). [/tip]

## Атрибут layout <a name="the-layout-attribute"></a>

Атрибут `layout` дает возможность с легкостью осуществлять поэлементный контроль над тем, как ваш элемент должен отображаться на экране. Многое из того, что делает этот атрибут, осуществимо при помощи CSS, однако это значительно сложнее и требует применения множества нестандартных приемов, поэтому рекомендуем пользоваться атрибутом `layout`.

### Поддерживаемые значения атрибута `layout`:

Ниже представлен полный список допустимых значений атрибута `layout`.

<table>
  <thead>
    <tr>
      <th data-th="Layout type" class="col-thirty">Тип макета</th>
      <th data-th="Width/height required" class="col-twenty">Требуется ли указывать ширину и высоту</th>
      <th data-th="Behavior">Поведение</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Layout type"><code>nodisplay</code></td>
      <td data-th="Description">Нет</td>
      <td data-th="Behavior">Элемент не показывается и не занимает места на экране, аналогично использованию стиля display: none. Этот макет можно применять ко всем элементам AMP. Предполагается, что элемент может стать видимым в случае определенных действий пользователя (например, <a href="../../../../documentation/components/reference/amp-lightbox.md"><code>amp-lightbox</code></a>).</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed</code></td>
      <td data-th="Description">Да</td>
      <td data-th="Behavior">Элемент имеет фиксированную ширину и высоту и не является адаптивным. Исключение составляют только элементы <a href="../../../../documentation/components/reference/amp-pixel.md"><code>amp-pixel</code></a> и <a href="../../../../documentation/components/reference/amp-audio.md"><code>amp-audio</code></a>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>responsive</code></td>
      <td data-th="Description">Да</td>
      <td data-th="Behavior">Ширина элемента устанавливается равной ширине контейнера, а его высота автоматически меняется в соответствии с соотношением сторон, заданным атрибутами width и height. Этот макет поддерживается для большинства элементов AMP, в том числе <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> и <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a>. Доступное пространство зависит от родительского элемента и может быть настроено с помощью свойства <code>max-width</code> в CSS.<p><strong>Примечание</strong>. Элементы с атрибутом <code>"layout=responsive"</code> не имеют исходного размера. Размер элемента определяется его контейнером. Чтобы гарантировать, что ваш AMP-элемент будет показан, укажите ширину и высоту его контейнера. Не указывайте стиль <code>"display:table"</code> на контейнере, поскольку он переопределяет стиль отображения AMP-элемента, что сделает его невидимым.</p>
</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fixed-height</code></td>
      <td data-th="Description">Только высота</td>
      <td data-th="Behavior">Элемент занимает доступное ему пространство, но сохраняет высоту неизменной. Этот макет хорошо подходит для таких элементов, как <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a>, в которых контент расположен горизонтально. Атрибут <code>height</code> должен присутствовать. Атрибут <code>width</code> не должен быть указан или должен иметь значение <code>auto</code>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>fill</code></td>
      <td data-th="Description">Нет</td>
      <td data-th="Behavior">Элемент занимает все доступное ему пространство как по ширине, так и по высоте. Другими словами, макет элемента fill соответствует макету родительского элемента. Чтобы элемент заполнял родительский контейнер, добавьте контейнеру свойство `position:relative` или `position:absolute`.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>container</code></td>
      <td data-th="Description">Нет</td>
      <td data-th="Behavior">Размеры элемента определяют его дочерние элементы, как и в случае HTML-элемента <code>div</code>. Предполагается, что элемент выступает только в качестве контейнера и не имеет определенного собственного макета. Его дочерние элементы отображаются сразу.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>flex-item</code></td>
      <td data-th="Description">Нет</td>
      <td data-th="Behavior">Элемент и другие дочерние элементы его родителя занимают все свободное пространство родительского контейнера, если родитель является flex-контейнером (т. е. использует <code>display:flex</code>). Размер элемента определяется родительским элементом и количеством других элементов, находящихся внутри родителя, в соответствии с правилами компоновки <code>display:flex</code>.</td>
    </tr>
    <tr>
      <td data-th="Layout type"><code>intrinsic</code></td>
      <td data-th="Description">Да</td>
      <td data-th="Behavior">Элемент занимает доступное ему пространство и меняет высоту автоматически для соответствия соотношению сторон, определенному атрибутами  <code>width</code> и <code>height</code> <em>до тех пор</em>, пока не достигнет естественного размера элемента или ограничения CSS (например, max-width). Атрибуты ширины и высоты должны быть указаны.  Этот макет очень хорошо подходит для большинства AMP-элементов, включая <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a>, <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a> и т. п. Доступное пространство зависит от родительского элемента и также может быть индивидуально настроено при помощи CSS-свойства <code>max-width</code>. Этот макет отличается от макета <code>responsive</code> тем, что имеет стандартную высоту и ширину. Это особенно заметно на примере плавающего элемента, где макет <code>responsive</code> будет иметь размер 0x0, а макет <code>intrinsic</code> расширится до своего естественного размера или ограничения CSS (в зависимости от того, что меньше).</td>
    </tr>
  </tbody>
</table>

[tip type="tip"] **СОВЕТ.** Посетите страницу [Демонстрация макетов AMP](../../../../documentation/guides-and-tutorials/learn/amp-html-layout/layouts_demonstrated.html), чтобы увидеть, как различные макеты реагируют на изменение размера экрана. [/tip]

### Что происходит, если ширина и высота не указаны? <a name="what-if-width-and-height-are-undefined"></a>

Если атрибуты `width` и `height` не указаны, то в некоторых случаях среда выполнения AMP может задать им значения по умолчанию согласно следующим правилам:

- [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md): ширина и высота принимают значение, равное 0.
- [`amp-audio`](../../../../documentation/components/reference/amp-audio.md): значения width и height по умолчанию определяются параметрами браузера.

### Что происходит, если атрибут layout не указан? <a name="what-if-the-layout-attribute-isnt-specified"></a>

Если атрибут <code>layout</code> не указан, AMP попытается угадать подходящее значение:

<table>
  <thead>
    <tr>
      <th data-th="Rule">Правило</th>
      <th data-th="Inferred layout" class="col-thirty">Предполагаемый макет</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Rule">Атрибут <code>height</code> указан, но <code>width</code> отсутствует или имеет значение <code>auto</code>
</td>
      <td data-th="Inferred layout"><code>fixed-height</code></td>
    </tr>
    <tr>
      <td data-th="Rule">Атрибуты <code>width</code> или <code>height</code> указаны вместе с атрибутом <code>sizes</code>
</td>
      <td data-th="Inferred layout"><code>responsive</code></td>
    </tr>
    <tr>
      <td data-th="Rule">Указаны оба атрибута: <code>width</code> и <code>height</code>
</td>
      <td data-th="Inferred layout"><code>fixed</code></td>
    </tr>
    <tr>
      <td data-th="Rule">Атрибуты <code>width</code> и <code>height</code> не указаны</td>
      <td data-th="Inferred layout"><code>container</code></td>
    </tr>
  </tbody>
</table>

## Использование медиазапросов

### Медиазапросы CSS

Атрибут [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) используется для управления внешним видом и поведением макета страницы. При изменении размера или ориентации окна браузера показ элементов зависит от результатов повторной проверки медиазапросов.

[tip type="read-on"] **ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ.** Подробнее узнать об управлении макетом с помощью медиазапросов можно в статье [Использование медиазапросов CSS для адаптивного дизайна](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=en). [/tip]

### Элементные медиазапросы <a name="element-media-queries"></a>

В AMP доступен еще один атрибут для адаптивного дизайна – `media`. Он может использоваться для всех элементов AMP и работает аналогично медиазапросам в глобальной таблице стилей, однако влияет только на один элемент на странице.

Ниже приведены коды двух изображений со взаимоисключающими медиазапросами.

[sourcecode:html]
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width=466
    height=355
    layout="responsive" >
</amp-img>
[/sourcecode]

Показ того или иного изображения зависит от ширины экрана.

[sourcecode:html]
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width=527
    height=193
    layout="responsive" >
</amp-img>
[/sourcecode]
