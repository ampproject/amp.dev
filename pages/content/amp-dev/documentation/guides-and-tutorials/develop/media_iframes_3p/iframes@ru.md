---
'$title': Размещение элементов iframe
$order: 10
description: Узнайте, как отображать на ваших страницах медийный контент и как использовать элементы iframe для отображения сложного контента, выходящего за рамки ограничений AMP.
formats:
  - websites
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

Learn how to display include media content in your pages, and how to use iframes to display advanced content outside of AMP's limitations.

## Основы

Отобразить iframe на странице можно с помощью элемента [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md).

Элементы iframe особенно полезны в AMP для отображения содержимого, которое не поддерживается в контексте основной страницы, например контента, использующего пользовательский код JavaScript.

### Требования к элементам `amp-iframe`

- Должны обладать размером не менее **600px** или **75%** от области видимости, следующей сразу за исходной областью видимости открываемой страницы (за исключением элементов iframe, которые используют атрибут [`placeholder`](#using-placeholders)).
- Могут запрашивать ресурсы только по HTTPS и не должны находиться в том же домене, что и контейнер, если только они не используют режим allow-same-origin.

[tip type="read-on"] **ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ. ** Чтобы узнать больше, обратитесь к [полной спецификации `amp-iframe`](../../../../documentation/components/reference/amp-iframe.md). [/tip]

### Включите скрипт

Чтобы включить [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) на свою страницу, сначала включите в `<head>` следующий скрипт, который загружает дополнительный код расширенного компонента:

[sourcecode:html]

<script async custom-element="amp-iframe"
  src="https://ampjs.org/v0/amp-iframe-0.1.js"></script>

[/sourcecode]

### Напишите разметку

В следующем примере мы создаем адаптивный элемент [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) для Google Карты, которая будет встроена с помощью [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/guide):

```html
<amp-iframe
  width="200"
  height="100"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://www.google.com/maps/embed/v1/place?key={YOUR API KEY}&q=europe"
>
</amp-iframe>
```

## Использование заполнителей<a name="using-placeholders"></a>

[`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) можно отображать в верхней части документа, если [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) содержит элемент с атрибутом `placeholder` (например, элемент [`amp-img`](../../../../documentation/components/reference/amp-img.md)), который будет показан в виде заполнителя, пока iframe не будет готов к отображению.

[tip type="read-on"] **ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ**: больше о заполнителях можно узнать в разделе [iframe с заполнителями](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder). [/tip]

Пример с заполнителем:

```html
<amp-iframe
  width="400"
  height="225"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://giphy.com/embed/OWabwoEn7ezug"
>
  <amp-img
    placeholder
    layout="fill"
    src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"
  ></amp-img>
</amp-iframe>
```

Отображается как:

<amp-iframe width="400" height="225" sandbox="allow-scripts allow-same-origin" layout="responsive" src="https://giphy.com/embed/OWabwoEn7ezug"><amp-img placeholder layout="fill" src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img></amp-iframe>

## {a0}Примеры{/a0}

Более сложные примеры использования [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) можно найти в составе курса [AMP By Example](../../../../documentation/examples/documentation/amp-iframe.html).
