---
$title: 熟悉入门代码
---

## AMP 样板

AMP 网页是一种为实现可靠性能而设置了某些限制条件的 HTML 网页。AMP 网页具有一些特殊的标记，其作用是将网页标识为 AMP 网页。

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

## AMP 组件

本教程的入门代码 ([`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html)) 是基于 AMP 网页的基本框架构建而成的，不仅添加了网页内容（图片、文字等），还添加了若干 AMP 组件（如下所示）：

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

- [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)：用于实现图片轮换展示内容，以展示相应商品的多个视图。
- [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md)：用于实现模板化系统，以呈现来自 [`amp-form`](../../../../documentation/components/reference/amp-form.md) 的服务器响应。
- [`amp-form`](../../../../documentation/components/reference/amp-form.md)：用于为 AMP 网页所需的 `<form>` 元素添加特殊功能。
- [`amp-selector`](../../../../documentation/components/reference/amp-selector.md)：用于提供一种语义方式，以从一组元素中选择一个或多个元素。可用作 [`amp-form`](../../../../documentation/components/reference/amp-form.md) 的输入源。

## 基本的互动方式

入门代码可提供一些基本的互动方式：

- 图片轮换展示内容 ([`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)) 可展示相应商品的多个视图。
- 相应商品可被添加到用户的购物车中（通过 [`amp-form`](../../../../documentation/components/reference/amp-form.md)）- 用户只需点按网页底部的“加入购物车”按钮即可完成此操作。

**试试看**：滑动图片轮换展示内容，然后点按“加入购物车”按钮。
