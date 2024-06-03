---
'$title': Знакомство со стартовым кодом
$order: 1
description: AMP-страница — это HTML-страница, имеющая некоторые ограничения для обеспечения надежной работы. AMP-страницы имеют специальную разметку, которая идентифицирует их.
---

## Шаблон AMP

AMP-страница — это HTML-страница, имеющая некоторые ограничения для обеспечения стабильно высокой производительности. AMP-страницы имеют специальную разметку, которая идентифицирует их.

Простейшая AMP-страница выглядит так:

```html
<!DOCTYPE html>
<html amp>
  <head>
    <meta charset="utf-8" />
    <link rel="canonical" href="hello-world.html" />
    <meta name="viewport" content="width=device-width" />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello World!
  </body>
</html>
```

[tip] Вы можете использовать [генератор шаблонов](https://amp.dev/boilerplate) для быстрой настройки базового каркаса вашей AMP-страницы. Генератор также предоставляет фрагменты структурированных данных, полезные для создания PWA и многого другого. [/tip]

## AMP-компоненты

Стартовый код урока ( [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html)) создается на основе базовой AMP-страницы с ее содержимым (изображения, текст и т. д.), а также несколькими AMP-компонентами:

```html
<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>
<script
  async
  custom-template="amp-mustache"
  src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js"
></script>
<script
  async
  custom-element="amp-form"
  src="https://cdn.ampproject.org/v0/amp-form-0.1.js"
></script>
<script
  async
  custom-element="amp-selector"
  src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"
></script>
```

Компоненты AMP предлагают дополнительную функциональность и компоненты пользовательского интерфейса, которые добавляют в AMP-страницы богатую интерактивность. В стартовом коде используются следующие компоненты AMP:

- [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md): карусель изображений, которая отображает разные снимки продукта.
- [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md): система шаблонов для рендеринга ответов сервера на данные, полученные из amp-form.
- [`amp-form`](../../../../documentation/components/reference/amp-form.md): добавляет специальные функции для элементов `<form>`, которые необходимы AMP-страницам.
- [`amp-selector`](../../../../documentation/components/reference/amp-selector.md): предлагает семантический способ выбора одного или нескольких элементов из группы элементов. Может использоваться в качестве источника входных данных для amp-form.

## Базовая интерактивность

Стартовый код предлагает ряд простых возможностей интерактивности:

- Карусель изображений ( [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md) ) отображает разные снимки продукта.
- Товар можно добавить в корзину пользователя (посредством [`amp-form`](../../../../documentation/components/reference/amp-form.md)), нажав кнопку «Добавить в корзину» внизу страницы.

**Попробуйте в действии**: пролистайте карусель пальцем и нажмите кнопку «Добавить в корзину».
