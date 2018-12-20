---
$title: 改进互动性
---

[TOC]

入门代码提供的是一种极简的用户体验。我们可通过下述方法予以改进：

- 添加一个用于展示当前幻灯片和幻灯片总数的指示器。
- 当用户另选了衬衫颜色后，更改图片轮换展示内容，以显示与所选颜色对应的衬衫的图片。

但请注意，如果不先植入 `<amp-bind>` 组件，就无法添加上述功能。因此，在本教程中，我们将亲手安装 `<amp-bind>`，然后再向我们所用示例的代码添加上述新功能！

## 安装 `<amp-bind>` 扩展程序

[`<amp-bind>`](/zh_cn/docs/reference/components/amp-bind.html) 是一款全新的 AMP 组件，可通过数据绑定关系以及与 JS 相似的表达式提供自定义的互动方式。要想使用 `<amp-bind>`，您必须将它安装到网页中。

打开 [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html) 文件，然后将以下脚本添加到网页的 `<head>` 部分中的 AMP 组件列表内：

```html
<script async custom-element="amp-bind"
    src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
```

## 添加幻灯片指示器

`<amp-bind>` 通过将元素属性绑定到自定义表达式来发挥作用。这些表达式可以引用“state”（易变的 JSON 数据）。我们可使用 `<amp-bind>` 中包含的 [`<amp-state>`](/zh_cn/docs/reference/components/amp-bind.html#state) 组件对此状态进行初始化。

### 初始化幻灯片状态

我们来初始化一个状态变量，以便跟踪图片轮换展示内容中当前展示的幻灯片的索引。打开 [`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html)，然后将以下内容添加到网页的 `<body>` 部分的顶部（`<header>` 前面）：

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0
    }
  </script>
</amp-state>
```

您可根据关联的 ID 来访问 `<amp-state>` 元素内的数据。例如，我们可根据下面这段表达式来引用该变量：

```javascript
selected.slide // Evaluates to 0.
```

### 更新幻灯片状态

接下来，为了能够在用户更改轮换展示内容中的幻灯片时更新该变量，我们将为现有 [`<amp-carousel>`](/zh_cn/docs/reference/components/amp-carousel.html) 元素添加以下 `"on"` 操作：

```html
<amp-carousel type="slides" layout="fixed-height" height=250 id="carousel"
    on="slideChange:AMP.setState({selected: {slide: event.index}})">
```

现在，每当 `<amp-carousel>` 中展示的幻灯片更改时，系统便会使用以下参数调用 `AMP.setState` 操作：

```javascript
{
  selected: {
    slide: event.index
  }
}
```

`event.index` 表达式求得的值即是新幻灯片的索引，并且 `AMP.setState()` 操作会将此对象常量合并到当前状态中。这样一来，`selected.slide` 的当前值便会替换为 `event.index` 的值。

提示: `AMP.setState()` 会对嵌套的对象常量执行深度合并。有关详情，请参阅 [`<amp-bind>`](/zh_cn/docs/reference/components/amp-bind.html) 文档。

### 绑定指示器元素

接下来，我们就将这个对当前展示的幻灯片进行跟踪的状态变量付诸使用，并创建一个幻灯片指示器。找到幻灯片指示器元素（查找 `<!-- TODO: "添加一个幻灯片指示器" -->`），然后为其子级添加以下绑定关系：

```html
<!-- TODO: "Add a slide indicator" -->
<p class="dots">
  <!-- The <span> element corresponding to the current displayed slide
       will have the 'current' CSS class. -->
  <span [class]="selected.slide == 0 ? 'current' : ''" class="current"></span>
  <span [class]="selected.slide == 1 ? 'current' : ''"></span>
  <span [class]="selected.slide == 2 ? 'current' : ''"></span>
</p>
```

`[class]` 是一种会更改 `class` 属性的绑定关系，可供您用于为任何元素添加或从任何元素中移除 CSS 类。

**试试看**：刷新网页并更改幻灯片！

更改轮换展示内容中的幻灯片会引发以下连环操作：

1.  触发 `slideChange event`…
2.  调用 `AMP.setState` 操作…
3.  更新状态变量 `selected.slide`…
4.  更新针对指示器 `<span>` 元素的 `[class]` 绑定关系！

好极了！现在，我们便拥有了一个可以正常运行的幻灯片指示器。

[tip type="success"]

您不妨尝试添加相关功能，以便当用户点按幻灯片指示器中的某个点时，系统会使用所选商品更新图片轮换展示内容。提示一下：您可以针对 [`<amp-carousel>`](/zh_cn/docs/reference/components/amp-carousel.html) 使用 `tap` 事件和 `[slide]` 绑定关系。

[/tip]

## 更改轮换展示内容中的图片

如果我们只需更改所选颜色，即可看到不同颜色的衬衫的图片，那就太棒了。借助 amp-bind，我们可通过为 `<amp-carousel>` 内的 `<amp-img>` 元素绑定 `[src]` 来实现这种效果。


### 初始化 SKU 状态

首先，我们需要使用每种颜色的衬衫的图片源网址来初始化状态数据。为此，我们需要使用一个新的 `<amp-state>` 元素：

```html
<!-- Available shirts. Maps unique string identifier to color and image URL string. -->
<amp-state id="shirts">
  <script type="application/json">
    {
      "1001": {
        "color": "black",
        "image": "./shirts/black.jpg"
      },
      "1002": {
        "color": "blue",
        "image": "./shirts/blue.jpg"
      },
      "1010": {
        "color": "brown",
        "image": "./shirts/brown.jpg"
      },
      "1014": {
        "color": "dark green",
        "image": "./shirts/dark-green.jpg"
      },
      "1015": {
        "color": "gray",
        "image": "./shirts/gray.jpg"
      },
      "1016": {
        "color": "light gray",
        "image": "./shirts/light-gray.jpg"
      },
      "1021": {
        "color": "navy",
        "image": "./shirts/navy.jpg"
      },
      "1030": {
        "color": "wine",
        "image": "./shirts/wine.jpg"
      }
    }
  </script>
</amp-state>
```

该 `<amp-state>` 元素包含一个 JSON 对象，此对象可将衬衫标识符字符串（即 SKU）映射到相应衬衫的颜色和图片网址。使用 JSON 数组也可达到同样的效果，但通过使用对象，我们将能够实现一些更强大的功能，您很快便可一睹这些功能的风采了。

现在，我们可以通过衬衫的标识符来访问相应的图片网址。例如，`shirts['10014'].color` 求得的值会是 `"dark green"`，而 `shirts['10030'].image` 则会返回与衬衫颜色 `"wine"` 对应的图片网址。

### 跟踪所选 SKU

如果再添加一个用于跟踪所选 SKU 的状态变量，我们便可为 `<amp-img>` 元素绑定一个表达式，以便在所选 SKU 更改时更新相应的 `src` 属性。为此，我们需要向现有 `amp-state#selected` 元素的 JSON 添加一个新的 `sku` 键：

```html
<amp-state id="selected">
  <script type="application/json">
    {
      "slide": 0,
      "sku": "1001"
    }
  </script>
</amp-state>
```

### 更新 SKU 状态

为 [`<amp-selector>`](/zh_cn/docs/reference/components/amp-selector.html) 添加“on”操作，以便每当用户选择了新的颜色时，系统就会更新 `selected.sku` 变量：

```html
<amp-selector name="color"
    on="select:AMP.setState({selected: {sku: event.targetOption}})">
```

提示: 您也可通过为 `<amp-selector>` 内的每个 `<amp-img>` 子级添加 `on="tap:AMP.setState(...)` 操作来实现这种效果。`<amp-selector>` 的好处之一就是，它会以诸如此类的方式来简化标记。

### 绑定图片元素

然后，为 `<amp-carousel>` 内的 [`<amp-img>`](/zh_cn/docs/reference/components/amp-img.html) 元素添加绑定关系（查找 `<!-- TODO: "更改 amp-carousel 中的图片-->`）：

```html
<!-- Update the `src` of each <amp-img> when the `selected.sku` variable changes. -->
<amp-img width=200 height=250 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
<amp-img width=300 height=375 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
<amp-img width=400 height=500 src="./shirts/black.jpg"
    [src]="shirts[selected.sku].image"></amp-img>
```

注意: 在实践中，轮换展示内容中的每张图片都可能需要具有不同的 `src`。若想实现这一点，只需将单张图片替换为一组图片即可。为简单起见，本教程就以不同的放大程度使用了单张图片。

**试试看**：刷新网页，并另选一种衬衫颜色。当您选完之后，轮换展示内容中的图片便会更新为显示与所选颜色对应的衬衫。


<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/get-familiar.md', locale=doc.locale).url.path}}"><span class="arrow-prev">上一页</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/remote-data.md', locale=doc.locale).url.path}}"><span class="arrow-next">下一页</span></a>
</div>
