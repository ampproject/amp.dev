---
'$title': Добавление кольцевых галерей
$order: 3
description: Кольцевая галерея — одна из распространенных функций мобильных страниц. Вы можете легко добавлять кольцевые галереи на AMP-страницы с помощью компонента amp-carousel.
---

Кольцевая галерея — одна из распространенных функций мобильных страниц. Вы можете легко добавлять кольцевые галереи на AMP-страницы с помощью компонента [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md). Начнем с простого примера, такого как кольцевая галерея изображений.

## Простая кольцевая галерея с изображениями

Не забудьте включить библиотеку компонента [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md), **добавив** следующий запрос JavaScript в `<head>` своего документа:

```html
<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>
```

Затем давайте встроим простую кольцевую галерею изображений с адаптивным макетом и заданными по умолчанию шириной и высотой. **Добавьте** на свою страницу следующий код:

```html
<amp-carousel layout="fixed-height" height="168" type="carousel">
  <amp-img src="mountains-1.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-2.jpg" width="300" height="168"></amp-img>
  <amp-img src="mountains-3.jpg" width="300" height="168"></amp-img>
</amp-carousel>
```

**Обновите** страницу, и вы увидите кольцевую галерею:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-simple.png', 412, 403, align='center half', caption='Simple images carousel') }}

Есть ряд способов настройки компонента [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md). Давайте изменим его так, чтобы отображалось только одно изображение за раз, и сделаем макет карусели адаптивным.

Чтобы сделать это, сначала **измените** `type` компонента [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) с `carousel` на `slides`, **измените** атрибут `layout` на `responsive` и **установите** атрибуту `width` значение 300 (убедитесь, что установлены оба атрибута: `height` и `width`). **Добавьте** атрибут `"layout=responsive"` в дочерние для [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) элементы [`amp-img`](../../../../documentation/components/reference/amp-img.md).

**Обновите** свою страницу. Теперь вместо прокручиваемого списка элементов вы будете видеть по одному элементу за раз. Попробуйте **проводить пальцем** по горизонтали, чтобы перемещаться между элементами. Дойдя до третьего элемента, вы не сможете прокручивать галерею дальше.

Затем **добавьте** атрибут `loop`. **Обновите** страницу и попробуйте сразу же прокрутить галерею влево. Кольцевая галерея будет прокручиваться по кругу.

Наконец, давайте включим в данной кольцевой галерее автоматическую прокрутку каждые 2 секунды. **Добавьте** в [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) атрибуты `autoplay` и `delay` со значением `2000` (например, `delay="2000"`).

Окончательный код должен выглядеть примерно так:

```html
<amp-carousel
  layout="responsive"
  width="300"
  height="168"
  type="slides"
  autoplay
  delay="2000"
  loop
>
  <amp-img
    src="mountains-1.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-2.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
  <amp-img
    src="mountains-3.jpg"
    width="300"
    height="168"
    layout="responsive"
  ></amp-img>
</amp-carousel>
```

**Обновите** страницу и посмотрите, что получилось.

[tip type="note"] **ПРИМЕЧАНИЕ.** Возможно, вы заметили, что когда у [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) был тип `carousel`, мы использовали тип макета `fixed-height`. Тип `carousel` совместим с ограниченным количеством типов макета; например, `carousel` не поддерживает макет `responsive`. Как следует из названия, элементы с фиксированной высотой занимают все доступное им пространство, но сохраняют высоту неизменной. Для элементов с фиксированной высотой необходимо определить атрибут `height`, а атрибут `width` должен быть либо не установлен, либо иметь значение `auto`. [/tip]

## Галерея со смешанным контентом

Кольцевая галерея изображений — это здорово, но что, если мы хотим, чтобы в нашей галерее отображался более сложный контент? Давайте попробуем сделать «микс», разместив в одной кольцевой галерее рекламу, текст и изображение. Сможет ли [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) справиться с такой подборкой? Несомненно!

Во-первых, чтобы обеспечить безопасную совместную работу компонентов [`amp-fit-text`](../../../../documentation/components/reference/amp-fit-text.md) и [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md), давайте **добавим** в ваш `<style amp-custom>` следующий стиль:

```css
amp-fit-text {
  white-space: normal;
}
```

Теперь **замените** простую кольцевую галерею следующим кодом:

```html
<amp-carousel layout="fixed-height" height="250" type="carousel">
  <amp-img src="blocky-mountains-1.jpg" width="300" height="250"></amp-img>

  <amp-ad
    width="300"
    height="250"
    type="doubleclick"
    data-slot="/35096353/amptesting/image/static"
  >
    <div placeholder>This ad is still loading.</div>
  </amp-ad>

  <amp-fit-text width="300" height="250" layout="fixed">
    Big, bold article quote goes here.
  </amp-fit-text>
</amp-carousel>
```

**Обновите** страницу, и вы должны увидеть что-то вроде этого:

{{ image('/static/img/docs/tutorials/tut-advanced-carousel-complex.gif', 412, 403, align='center half', caption='A carousel of mixed content') }}

Дополнительные сведения см. в справочной документации по компоненту [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md).

[tip type="note"] **ПРИМЕЧАНИЕ.** В нашем последнем примере вы могли заметить, что компонент [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) содержит дочерний элемент `div` с атрибутом `placeholder` (заполнитель). Ранее в этом уроке мы столкнулись с аналогичным сценарием, когда [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) использовал элемент `fallback` (резервный элемент). В чем разница между заполнителем и резервным элементом? Резервные элементы (`fallback`) отображаются, когда родительский элемент не удается загрузить, например, если не удалось найти подходящую рекламу. Элементы-заполнители (`placeholder`) отображаются на месте родительского элемента во время его загрузки. В определенном смысле оба этих элемента страхуют процесс загрузки родительского элемента. Дополнительную информацию можно получить в руководстве по [заполнителям и резервным элементам](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]
