---
$title: Поддерживаемые макеты
---

Чтобы сделать свои элементы адаптивными, добавьте атрибут `layout=responsive`.

## Допустимые значения атрибута layout <a name="the-layout-attribute"></a>

По умолчанию следует использовать адаптивные макеты.

Ниже представлен полный список допустимых значений атрибута layout.

<table>
  <thead>
    <tr>
      <th class="col-twenty" data-th="Layout type">Тип макета</th>
      <th class="col-twenty" data-th="Width/height required">Требуется ли указывать ширину и высоту</th>
      <th data-th="Behavior">Функционирование</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>nodisplay</code></td>
      <td class="col-twenty" data-th="Description">Нет</td>
      <td data-th="Behavior">Элемент не показывается, то есть не занимает места на экране, как будто для него не задан стиль. Этот макет можно применять ко всем элементам AMP. Предполагается, что элемент, например <a href="../../../../documentation/components/reference/amp-lightbox.md"><code>amp-lightbox</code></a>, может показываться в случае определенных действий пользователя.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fixed</code></td>
      <td class="col-twenty" data-th="Description">Да</td>
      <td data-th="Behavior">Для элемента задана фиксированная ширина и высота, поэтому он не поддерживает адаптивный дизайн. Исключение составляют только элементы <a href="../../../../documentation/components/reference/amp-pixel.md"><code>amp-pixel</code></a> и <a href="../../../../documentation/components/reference/amp-audio.md"><code>amp-audio</code></a>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>responsive</code></td>
      <td class="col-twenty" data-th="Description">Да</td>
      <td data-th="Behavior">Ширина элемента устанавливается равной ширине контейнера, а его высота автоматически меняется в соответствии с соотношением сторон, заданным атрибутами width и height. Этот макет поддерживается для большинства элементов AMP, в том числе <a href="../../../../documentation/components/reference/amp-img.md"><code>amp-img</code></a> и <a href="../../../../documentation/components/reference/amp-video.md"><code>amp-video</code></a>. Доступное место зависит от родительского элемента и может быть настроено с помощью свойства <code>max-width</code> в CSS.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fixed-height</code></td>
      <td class="col-twenty" data-th="Description">Только высота</td>
      <td data-th="Behavior">Элемент занимает доступное ему пространство, однако его высота не меняется. Этот макет подходит для элементов с горизонтальным содержанием, например <a href="../../../../documentation/components/reference/amp-carousel.md"><code>amp-carousel</code></a>. Атрибут <code>width</code> должен отсутствовать или иметь значение <code>auto</code>.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>fill</code></td>
      <td class="col-twenty" data-th="Description">Нет</td>
      <td data-th="Behavior">Элемент занимает все доступное ему пространство как по ширине, так и по высоте. Другими словами, макет элемента fill соответствует макету родительского элемента.</td>
    </tr>
    <tr>
      <td class="col-twenty" data-th="Layout type"><code>container</code></td>
      <td class="col-twenty" data-th="Description">Нет</td>
      <td data-th="Behavior">Размеры элемента определяют его дочерние элементы, как и в случае HTML-элемента <code>div</code>. Предполагается, что элемент выступает только в качестве контейнера, поскольку ему не назначен ни один из конкретных макетов. Его дочерние элементы обрабатываются сразу.</td>
    </tr>
  </tbody>
</table>

### Что происходит, если ширина и высота не указаны? <a name="what-if-width-and-height-are-undefined"></a>

Если атрибуты `width` и `height` не указаны, то в некоторых случаях среда выполнения AMP может задать им значения по умолчанию согласно следующим правилам:

* [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md): ширина и высота принимают значение, равное 0.
* [`amp-audio`](../../../../documentation/components/reference/amp-audio.md): значения ширины и высоты меняются соответствии с типом браузера.

### Что происходит, если атрибут layout не указан? <a name="what-if-the-layout-attribute-isnt-specified"></a>

Поведение макета определяется следующими правилами:

* Если атрибут `height` используется, а атрибут `width` отсутствует или имеет значение `auto`, то применяется вариант `fixed-height`.
* Если наряду с атрибутом `width` или `height` используется `sizes`, то применяется вариант `responsive`.
* Если используется атрибут `width` или `height`, то применяется вариант `fixed`.
* Если атрибуты `width` и `height` отсутствуют, то применяется вариант `container`.

## Использование атрибутов @media и media

Атрибут [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) используется для управления внешним видом и поведением макета страницы.
При изменении размера или ориентации окна браузера показ элементов зависит от результатов повторной проверки медиазапросов.

Подробнее [об управлении макетом с помощью медиазапросов CSS](https://developers.google.com/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries?hl=en)...

<a name="element-media-queries"></a>

В AMP доступен еще один атрибут для адаптивного дизайна – `media`.
Он может использоваться для всех элементов AMP и работает аналогично медиазапросам в глобальной таблице стилей, однако влияет только на один элемент на странице.

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

## Использование атрибутов srcset и sizes

Атрибут `srcset` используется для управления ресурсами элемента с помощью выражений медиа.
В частности, он применяется ко всем тегам [`amp-img`](../../../../documentation/components/reference/amp-img.md) и указывает, какие изображения нужно применять в зависимости от размеров экрана.

В приведенном ниже примере атрибут `srcset` определяет, какое изображение следует использовать с учетом ширины экрана.
Дескриптор `w` сообщает браузеру ширину всех изображений в списке:

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w >
</amp-img>
[/sourcecode]

**Примечание.** Технология AMP позволяет использовать дескриптор `w` во всех браузерах.

Подробнее [о создании адаптивных изображений с помощью `srcset`](http://alistapart.com/article/using-responsive-images-now)...

Атрибуты `sizes` и `srcset` можно использовать вместе.
Атрибут `sizes` описывает, как рассчитывается размер элемента в зависимости от того или иного выражения медиа.
В соответствии с этим размером агент пользователя выбирает самый подходящий источник, предоставляемый атрибутом `srcset`.

Рассмотрим следующий пример:

[sourcecode:html]
<amp-img
    src="wide.jpg"
    srcset="wide.jpg" 640w,
           "narrow.jpg" 320w
    sizes="(min-width: 650px) 50vw, 100vw" >
</amp-img>
[/sourcecode]

Если ширина области просмотра составляет 650 пикселей или более, то атрибут `sizes` устанавливает ширину элемента, равную половине этого размера.
Например, если ширина области просмотра равна 800 пикселям, то ширина элемента составит 400 пикселей.
Браузер выбирает ресурс `srcset` шириной не более 400 пикселей при условии, что пропорции устройства равны 1. В данном случае таким ресурсом является `narrow.jpg` (320 пикселей).

**Внимание!** Если одновременно задаются атрибуты sizes, width и height, то по умолчанию используется макет `responsive`.

Подробнее о том, [как атрибуты `sizes` и `srcset` сравниваются с медиазапросами](https://ericportis.com/posts/2014/srcset-sizes/)...

## Использование атрибутов placeholder и fallback

### placeholder

Элемент, которому присвоен атрибут `placeholder`, выступает в качестве заполнителя для родительского элемента AMP.
Если элемент `placeholder` задан, он должен быть включен непосредственно в родительский элемент AMP.

[sourcecode:html]
<amp-anim src="animated.gif" width=466 height=355 layout="responsive" >
    <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

По умолчанию заполнитель для родительского элемента AMP показывается, даже если ресурсы этого элемента не были загружены или инициализированы.
Однако после выполнения этих процессов вместо заполнителя показывается содержание элемента AMP.

**Примечание.** В качестве заполнителя может выступать любой элемент HTML, поэтому он не должен быть элементом AMP.

### fallback

Атрибут `fallback` определяет альтернативную модель поведения элемента, который не поддерживается браузером.
К примеру, с помощью элемента `fallback` можно сообщить пользователю, что браузер не поддерживает ту или иную функцию:

[sourcecode:html]
<amp-video width=400 height=300 src="https://yourhost.com/videos/myvideo.mp4"
    poster="myvideo-poster.jpg" >
  <div fallback>
        <p>Your browser doesn’t support HTML5 video.</p>
  </div>
</amp-video>
[/sourcecode]

Атрибут `fallback` может быть назначен всем элементам HTML, а не только элементам AMP.
Если элемент `fallback` задан, он должен быть включен непосредственно в родительский элемент AMP.

### noloading

Многие элементы AMP демонстрируют анимированный индикатор, который указывает, что загрузка осуществилась не до конца.
Чтобы отключить такое поведение элементов, добавьте атрибут `noloading`.
