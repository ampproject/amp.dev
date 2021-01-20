---
"$title": Адаптивные изображения с набором параметров, размерами и высотой
"$order": '4'
description: Используйте атрибут srcset для управления ассетами элемента на основании различных медиа-выражений. В частности, используйте его для всех тегов amp-img, чтобы указывать, какие...
formats:
- websites
- email
- ads
- stories
components:
- iframe
author: pbakaus
contributors:
- bpaduch
---

## srcset

Используйте атрибут `srcset` для управления ресурсами элемента на основании различных медиа-выражений. В частности, используйте его во всех тегах [`amp-img`](../../../../documentation/components/reference/amp-img.md), чтобы указывать, какие графические ресурсы должны использоваться в зависимости от размеров экрана. AMP автоматически сгенерирует атрибут `sizes`, <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img" data-md-type="link">соответствующий определению `sizes` в HTML5</a>, для всех используемых в `<amp-img>` тегов `<img>`, если для `<amp-img>` указан атрибут `srcset`, но не указан `sizes`.

В этом простом примере `srcset` указывает, какое изображение использовать в зависимости от ширины экрана. Дескриптор `w` сообщает браузеру ширину каждого изображения в списке:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  layout="responsive"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w">
</amp-img>
```
[/example]

[tip type="note"] **ПРИМЕЧАНИЕ.** AMP поддерживает srcset с дескриптором `w` во всех браузерах. [/tip]

Подробнее о создании адаптивных изображений с применением `srcset` можно узнать в статье [Using Responsive Images (Now)](http://alistapart.com/article/using-responsive-images-now).

## sizes

Вместе с `srcset` вы также можете использовать необязательный AMP-атрибут `sizes`. Атрибут `sizes` описывает, как рассчитывать размер элемента, используя медиа-выражения. <strong data-md-type="raw_html">Указание `sizes` для любого элемента AMP приведет к тому, что AMP установит встроенный стиль ширины этого элемента в соответствии с совпавшим медиа-запросом.</strong> На основании вычисленного размера элемента пользовательский агент выбирает наиболее подходящий источник из предоставленных атрибутом `srcset`.

Рассмотрим следующий пример:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="Hummingbird"
  src="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg"
  width="640"
  height="457"
  srcset="{{server_for_email}}/static/inline-examples/images/hummingbird-wide.jpg 640w,
            {{server_for_email}}/static/inline-examples/images/hummingbird-narrow.jpg 320w"
  sizes="(min-width: 650px) 50vw, 100vw">
</amp-img>
```
[/example]

Атрибут `sizes` указывает, что ширина элемента должна быть 50% от размера области просмотра, когда размер области просмотра составляет 650 пикселей или больше. Например, если размер области просмотра составляет 800 пикселей, ширина элемента становится равной 400 пикселям. Затем браузер выбирает из `srcset` ресурс, соответствующий 400 пикселям (предполагая, что DPR равно 1), которым в данном случае является `hummingbird-narrow.jpg` (320 пикселей).

[tip type="important"] **ВАЖНО!** Eсли атрибут sizes указан вместе с шириной и высотой, макет по умолчанию получает значение `responsive`. [/tip]

Подробнее об [AMP-атрибуте `sizes` см. здесь](../../../../documentation/guides-and-tutorials/learn/common_attributes.md).

## heights

Все специальные AMP-элементы, которые поддерживают макет `responsive`, также поддерживают атрибут `heights`. Значение этого атрибута представляет собой основанное на медиа-выражениях выражение, схожее со значением [атрибута sizes в img](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), но с двумя ключевыми отличиями:

1. Оно относится к высоте, а не ширине элемента.
2. В нем допускаются процентные значения, например `86%`. Если используется процентное значение, оно указывает процентную долю ширины элемента.

Когда атрибут `heights` указывается вместе с `width` и `height`, то `layout` по умолчанию получает значение `responsive`.

Пример:

[example preview="top-frame" playground="true"]
```html
<amp-img alt="AMP"
  src="{{server_for_email}}/static/inline-examples/images/amp.jpg"
  width="320"
  height="256"
  heights="(min-width:500px) 200px, 80%">
</amp-img>
```
[/example]

В данном примере высота элемента по умолчанию будет составлять 80% от ширины, но в областях просмотра шире `500px` она будет ограничена значением `200px`.
