---
'$title': 熟悉入门代码
$order: 1
description: AMP 网页是一种为实现可靠性能而设置了某些限制的 HTML 网页。AMP 网页具有一些特殊标记，其作用是将网页标识为 AMP 网页。
---

## AMP 样板

AMP 网页是一种为实现可靠性能而设置了某些限制的 HTML 网页。AMP 网页具有一些特殊标记，其作用是将网页标识为 AMP 网页。

AMP 网页的基本框架如下所示：

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

[tip] 您可以使用[样板生成器](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html)为 AMP 网页快速设置基本框架。它还提供了结构化数据的代码段，用于创建 PWA 等！[/tip]

## AMP 组件

本教程的入门代码 ([`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html)) 基于 AMP 网页的基本框架构建而成，不仅添加了网页内容（图片、文字等），还添加了若干 AMP 组件：

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

AMP 组件可提供额外的功能和界面组件，为 AMP 网页增添丰富的互动方式。入门代码使用了以下 AMP 组件：

- [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)：图片轮播界面，可以展示商品的多个视图。
- [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md)：模板系统，用于呈现来自 amp-form 的服务器响应。
- [`amp-form`](../../../../documentation/components/reference/amp-form.md)：为 AMP 网页所需的 `<form>` 元素添加特殊功能。
- [`amp-selector`](../../../../documentation/components/reference/amp-selector.md)：提供一种语义方式，以从一组元素中选择一个或多个元素。可用作 amp-form 的输入源。

## 基本互动

入门代码可提供一些基本互动：

- 图片轮播界面 ([`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)) 可以展示商品的多个视图。
- 用户只需点按网页底部的“Add to cart”按钮即可将商品添加到购物车中（通过 [`amp-form`](../../../../documentation/components/reference/amp-form.md)）。

**试试看**：滑动图片轮播界面，然后点按“Add to cart”按钮。
