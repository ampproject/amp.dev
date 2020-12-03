---
"$title": Общие атрибуты элементов
"$order": '1'
description: AMP предоставляет набор общих атрибутов, поддержка которых добавлена во многие компоненты AMP (и элементы HTML). В данном документе дается описание всех этих атрибутов.
toc: 'true'
---

AMP предоставляет набор общих атрибутов, поддержка которых добавлена во многие компоненты AMP (и элементы HTML). В данном документе дается описание всех этих атрибутов.

## fallback

Указывает на резервный (запасной) способ отображения элемента и используется для того, чтобы показать читателю, что основной элемент не поддерживается браузером или его контент не удалось загрузить. Атрибут `fallback` можно добавить к любому элементу HTML, являющемуся прямым потомком элемента AMP, который поддерживает резервные элементы. Конкретное применение резервного элемента определяется реализацией основного элемента, но обычно резервный элемент показывается вместо основного.

Часто используется с: изображениями, анимациями, видео и аудиоклипами

Пример:

```html
<amp-anim src="animated.gif" width="466" height="355" layout="responsive" >
  <div fallback>Cannot play animated images on this device.</div>
</amp-anim>
```

Для получения дополнительной информации см. [Заполнители и резервные элементы](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## heights

Все элементы AMP, поддерживающие макет `responsive`, также поддерживают атрибут `heights`. В качестве значения этот атрибут принимает набор размеров в формате, основанном на медиа-выражениях, аналогично [атрибуту sizes тега `img`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), но с двумя важными отличиями:

1. Указывается только высота элемента, но не его ширина.
2. Высоту можно указывать в процентах от ширины элемента. Например, значение `80%` указывает, что высота элемента будет равна 80% от его ширины.

Примечание: когда атрибут `heights` задан одновременно с атрибутами `width` и `height`, атрибут `layout` автоматически получает значение `responsive`.

Пример:

```html
<amp-img src="amp.png"
    width="320" height="256"
    heights="(min-width:500px) 200px, 80%">
</amp-img>
```

Для получения дополнительной информации см. [Художественное преобразование при помощи атрибутов srcset, sizes и heights](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

## layout

AMP предоставляет набор [макетов](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute), определяющих поведение компонента AMP внутри макета документа. Для того чтобы выбрать тип макета для компонента, присвойте атрибуту `layout` одно из значений, поддерживаемых элементом компонента (список поддерживаемых элементом значений смотрите в его документации).

Пример:

```html
<amp-img src="/img/amp.jpg"
    width="1080"
    height="610"
    layout="responsive"
    alt="an image">
</amp-img>
```

Для получения дополнительной информации см. статью [Макет и медиа-запросы](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) и описание [спецификации макетов](amp-html-layout/index.md).

## media <a name="media"></a>

Атрибут `media` поддерживается большинством элементов AMP. В качестве значения атрибута `media` указывается медиа-запрос. Если фактические параметры клиента не соответствуют запросу, то рендеринг элемента не происходит, а его ресурсы (и, потенциально, ресурсы дочерних элементов) не загружаются. В случае изменения размеров или ориентации окна браузера медиа-запросы обрабатываются заново, после чего происходит скрытие или отображение элементов в зависимости от результата.

Пример:

```html
<amp-img
    media="(min-width: 650px)"
    src="wide.jpg"
    width="466"
    height="355" layout="responsive"></amp-img>
<amp-img
    media="(max-width: 649px)"
    src="narrow.jpg"
    width="527"
    height="193" layout="responsive"></amp-img>
```

Для получения дополнительной информации см. [Макет и медиа-запросы](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#element-media-queries).

## noloading

Атрибут `noloading` позволяет **выключить** индикатор загрузки элемента. Многие элементы AMP отображают «индикатор загрузки» — простую анимацию, указывающую на то, что элемент еще не полностью загрузился.

Часто используется с: изображениями, анимациями, видео и рекламой

Пример:

```html
<amp-img src="card.jpg"
    noloading
    height="190"
    width="297"
    layout="responsive">
</amp-img>
```

## on

Атрибут `on` используется для установки обработчиков событий на элементы. То, какие события поддерживаются, зависит от элемента.

Часто используется с: лайтбоксами, боковыми панелями, обновляемыми списками и формами

Синтаксис:

```text
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
```

Пример:

```html
<button on="tap:my-lightbox">Open lightbox</button>
<amp-lightbox id="my-lightbox" layout="nodisplay">
  ...
</amp-lightbox>
```

Для получения дополнительной информации см. [Действия и события в AMP](amp-actions-and-events.md).

## placeholder

Атрибут `placeholder` указывает, что отмеченный им элемент выступает по отношению к родительскому элементу AMP в качестве заполнителя. Атрибут можно добавить в любой элемент HTML, являющийся непосредственным дочерним элементом AMP-элемента, поддерживающего заполнители. По умолчанию такой заполнитель отображается немедленно, даже если ресурсы элемента AMP не были загружены или проинициализированы. После завершения загрузки AMP-элемента заполнитель обычно скрывается для отображения реального содержимого. Конкретный способ обработки заполнителя зависит от реализации в элементе.

Часто используется с: изображениями, анимациями, видео и рекламой

Пример:

```html
<amp-anim src="animated.gif" width="466" height="355" layout="responsive">
  <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
```

Для получения дополнительной информации см. [Заполнители и резервные элементы](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## sizes

Все элементы AMP, поддерживающие макет `responsive`, также поддерживают атрибут `sizes`. В качестве значения атрибут `sizes` принимает основанное на медиа-запросах выражение для выбора размеров элемента, наиболее подходящих под текущие размеры окна. <strong>Кроме того, AMP устанавливает для элемента атрибут <code>width</code></strong> при помощи встроенного стиля.

Пример:

```html
<amp-img src="amp.png"
    width="400" height="300"
    layout="responsive"
    sizes="(min-width: 320px) 320px, 100vw">
</amp-img>
```

Сгенерирует следующий вложенный тег `img`:

```html
<img decoding="async"
    src="amp.png"
    sizes="(min-width: 320px) 320px, 100vw"
    class="i-amphtml-fill-content i-amphtml-replaced-content">
```

Для получения дополнительной информации см. [Художественное преобразование при помощи атрибутов srcset, sizes и heights](../../../documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md).

## width и height

При использовании некоторых [макетов](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute) компоненты AMP должны содержать атрибуты `width` и `height`, указывающие число пикселей в виде целых чисел.

Пример:

```html
<amp-anim width="245"
    height="300"
    src="/img/cat.gif"
    alt="cat animation">
</amp-anim>
```

Для получения дополнительной информации см. статью [Макет и медиа-запросы](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md) и описание [спецификации макетов](amp-html-layout/index.md).
