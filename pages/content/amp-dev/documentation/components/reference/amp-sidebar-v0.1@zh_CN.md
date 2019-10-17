---
$category@: layout
formats:
  - websites
  - email
teaser:
  text: >-
    用于显示旨在供临时访问的元内容，例如导航链接、按钮、菜单。
toc: true
$title: amp-sidebar
---



<!--
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

       Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS-IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
-->



<table>
  <tr>
    <td width="40%"><strong>说明</strong></td>
    <td>
      一个边栏，用于显示旨在供临时访问的元内容（导航链接、按钮、菜单等）。可以通过点按相应按钮显示边栏，同时主要内容仍显示在下方。
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>必需的脚本</strong></td>
    <td><code>&lt;script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">支持的布局</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>示例</strong></td>
    <td>请参阅 AMP By Example 的 <a href="https://ampbyexample.com/components/amp-sidebar/">amp-sidebar 示例</a>。</td>
  </tr>
</table>

## 概述 <a name="overview"></a>

`<amp-sidebar>` 可隐藏旨在供临时访问的元内容（导航链接、按钮、菜单等）。要打开 `<amp-sidebar>`，请点按相应按钮；要将其关闭，请在 amp-sidebar 之外点按。不过，可以使用接受媒体查询的可选属性，以便在网站的其他部分显示元内容。子集 `<nav toolbar="(media query)" toolbar-target="elementID">` 元素允许边栏中的内容显示在主要内容的其他部分。

## 行为 <a name="behavior"></a>

* `<amp-sidebar>` 应该是 `<body>` 的直接子级。
* 边栏只能显示在页面左侧或右侧。
* `<amp-sidebar>` 可以包含任何有效的 HTML 元素（受 AMP 支持）。
* `<amp-sidebar>` 可以包含以下任意 AMP 元素：
    * `<amp-accordion>`
    * `<amp-img>`
    * `<amp-fit-text>`
    * `<amp-list>`
    * `<amp-live-list>`
    * `<amp-social-share>`</li>
* 边栏的最大高度为 100vh；如果高度超过 100vh，则会显示垂直滚动条。默认高度在 CSS 中设为 100vh，并可在 CSS 中替换。
* 可以使用 CSS 设置和调整边栏的宽度（最小宽度为 45 像素）。
* 在 `amp-sidebar` 上，触摸缩放功能处于停用状态。在边栏打开时，此功能会隐藏。

*示例：*

在下面的示例中，我们使用 `amp-sidebar` 来包含导航项。不过，第二个和第四个导航项（Nav Item 2 和 Nav Item 4）分配给了页面上的元素 ID。通过使用 [`on`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-sidebar/../../spec/amp-actions-and-events.md) 属性，我们可以借助元素 ID 和 `scrollTo` 平滑地滚动到相应元素。

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>
</amp-sidebar>
```

### 打开和关闭边栏 <a name="opening-and-closing-the-sidebar"></a>

要在用户点按或点击某个元素时切换、打开或关闭边栏，请为该元素设置 [`on`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-sidebar/../../spec/amp-actions-and-events.md) 操作属性，然后指定以下操作方法之一：

<table>
  <tr>
    <th>操作</th>
    <th>说明</th>
  </tr>
  <tr>
    <td>打开（默认）</td>
    <td>打开边栏</td>
  </tr>
  <tr>
    <td>关闭</td>
    <td>关闭边栏</td>
  </tr>
  <tr>
    <td>切换</td>
    <td>切换边栏状态</td>
  </tr>
</table>

如果用户点按处于部分可见状态的主要内容区域，则会关闭边栏。

或者，按键盘上的 Esc 键也会关闭边栏。

*示例：*

```html
<button class="hamburger" on='tap:sidebar1.toggle'></button>
<button on='tap:sidebar1'>Open</button>
<button on='tap:sidebar1.open'>Open</button>
<button on='tap:sidebar1.close'>x</button>
```

### 工具栏 <a name="toolbar"></a>

您可以创建一个显示在 `<body>` 中的 `toolbar` 元素，方法是使用媒体查询指定 `toolbar` 属性，并使用元素 ID 为某个属于 `<amp-sidebar>` 子级的 `<nav>` 元素指定 `toolbar-target` 属性。`toolbar` 会复制 `<nav>` 元素及其子级，并将该元素附加到 `toolbar-target` 元素。

#### 行为 <a name="behavior-1"></a>

* 通过添加具有 `toolbar` 属性和 `toolbar-target` 属性的 nav 元素，边栏可以实现工具栏。
* nav 元素必须是 `<amp-sidebar>` 的子级，且遵循以下格式：`<nav toolbar="(media-query)" toolbar-target="elementID">`。
    * 例如，`<nav toolbar="(max-width: 1024px)" toolbar-target="target-element">` 便是一种有效的工具栏用法。</li>
* 包含工具栏属性的 nav 必须仅包含单个 `<ul>` 元素（后者包含 `<li>` 元素）。
    * `<li>` 元素可以包含任何有效的 HTML 元素（受 AMP 支持），或 `<amp-sidebar>` 支持的任何 AMP 元素。</li>
* 仅当 `toolbar` 属性媒体查询有效时，才会应用工具栏行为。此外，要应用工具栏，相应页面上必须存在具有 `toolbar-target` 属性 ID 的元素。

*示例：基本工具栏*

在下面的示例中，如果窗口宽度小于或等于 767 像素，则显示 `toolbar`。`toolbar` 包含搜索输入元素。`toolbar` 元素将附加到 `<div id="target-element">` 元素。

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="搜索…"/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

## 对工具栏进行样式设置 <a name="styling-toolbar"></a>

`<amp-sidebar>` 元素内的 `toolbar` 元素将包含应用于该元素的类，具体取决于 `toolbar-target` 元素是处于显示状态还是隐藏状态。这有利于为 `toolbar` 元素和 `toolbar-target` 元素应用不同的样式。具体的类包括 `amp-sidebar-toolbar-target-shown` 和 `amp-sidebar-toolbar-target-hidden`。当 `toolbar-target` 元素处于显示状态时，`amp-sidebar-toolbar-target-shown` 类会应用于 `toolbar` 元素。当 `toolbar-target` 元素处于隐藏状态时，`amp-sidebar-toolbar-target-hidden` 类会应用于 `toolbar` 元素。

*示例：工具栏状态类*

在下面的示例中，如果窗口宽度小于或等于 767 像素，则显示 `toolbar`。`toolbar` 包含搜索输入元素。`toolbar` 元素将附加到 `<div id="target-element">` 元素。不过，我们添加了一些自定义样式，可用于在 `<div id="toolbar-target">` 元素处于显示状态时隐藏 `toolbar` 元素。

```html
<style amp-custom="">

  .amp-sidebar-toolbar-target-shown {
      display: none;
  }

</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <ul>
    <li>Nav item 1</li>
    <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
    <li>Nav item 3</li>
    <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
    <li>Nav item 5</li>
    <li>Nav item 6</li>
  </ul>

  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>
        <input placeholder="搜索…"/>
      </li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

[tip type="ll callout('提示：</b><a class="type_success"]
请参阅 [AMP By Example](https://ampbyexample.com/components/amp-sidebar/) 上的在线演示。
[/tip]

## 故事的边栏 <a name="sidebar-for-stories"></a>

`amp-story` [组件](../../../about/stories.html)支持使用 `amp-sidebar`。

### 行为 <a name="behavior-2"></a>

* `<amp-sidebar>` 必须是 `<amp-story>` 的直接子级。
* 对于常规 AMP 文档，边栏默认显示在“开始”侧：如果使用的是从左到右书写的语言，则显示在右侧；如果使用的是从右到左书写的语言，则显示在左侧。
* `<amp-sidebar>` 的默认背景颜色为白色，并可在 CSS 中替换。
* `<amp-sidebar>` 的最大宽度被强制为 `280px`，在桌面设备上为 `320px`。
* 在故事界面上，将显示用于打开/关闭边栏的“汉堡”样式按钮。

为了在整个故事平台上提供一致的界面体验，我们在允许使用哪些属性和功能方面设置了一些限制。下面是 `amp-story` 中的 `amp-sidebar` 可以使用的属性和功能。

### 可以使用的属性 <a name="allowed-attributes"></a>

* [layout](#layout)
* [data-close-button-aria-label](#data)
* [常见属性](#common)

*示例：故事中的基本边栏*

以下示例可在 `amp-story` 中显示一个简单的 `amp-sidebar`。

```html
...
<body>
  <amp-story standalone>
  <amp-sidebar id="sidebar1" layout="nodisplay">
    <ul>
      <li><a "href=https://www.amp.dev">外部链接</a></li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
    </ul>
  </amp-sidebar>
  <amp-story-page id="cover">
    <amp-story-grid-layer template="fill">
      <h1>Hello World</h1>
      <p>这是此故事的封面页。</p>
    </amp-story-grid-layer>
  </amp-story-page>
  ...
</body>
```

## 属性 <a name="attributes"></a>

##### side <a name="side"></a>

用于指示应从页面的哪一侧（`left` 还是 `right`）打开边栏。如果未指定 `side`，则会从 `body` 标记的 `dir` 属性（`ltr` => `left`，`rtl` => `right`）继承 `side` 的值；如果没有 `dir`，`side` 会默认为 `left`。

##### layout <a name="layout"></a>

用于指定边栏的显示布局，该布局必须是 `nodisplay`。

##### open <a name="open"></a>

当边栏处于打开状态时，此属性存在。

##### data-close-button-aria-label <a name="data"></a>

可选属性，用于为关闭按钮设置 ARIA 标签（为实现无障碍而添加）。

##### toolbar <a name="toolbar-1"></a>

此属性存在于子级 `<nav toolbar="(media-query)" toolbar-target="elementID">` 元素中，可以接受关于何时显示工具栏的媒体查询。如需详细了解如何使用工具栏，请参阅[工具栏](#toolbar-1)部分。

##### toolbar-target <a name="toolbar-target"></a>

此属性存在于子级 `<nav toolbar="(media-query)" toolbar-target="elementID">` 中，可以接受页中元素 ID。`toolbar-target` 属性用于将工具栏放入指定的页中元素 ID，而不使用默认的工具栏样式。如需详细了解如何使用工具栏，请参阅[工具栏](#toolbar-1)部分。

##### 常见属性 <a name="common"></a>

此元素包含扩展到 AMP 组件的[常见属性](../../../documentation/guides-and-tutorials/learn/common_attributes.md)。

## 样式设置 <a name="styling"></a>

可以使用标准 CSS 对 `amp-sidebar` 组件进行样式设置。

* 可以设置 `amp-sidebar` 的 `width`，以调整宽度，宽度值介于预设的最小值（45 像素）和最大值 (80vw) 之间。
* 如果需要，可以设置 `amp-sidebar` 的高度，以调整边栏的高度。如果高度超过 100vw，边栏将显示垂直滚动条。边栏的预设高度为 100vw，可以在 CSS 中替换该值以降低高度。
* 当边栏在页面上处于打开状态时，系统将通过为 `amp-sidebar` 标记设置的 `open` 属性显示边栏的当前状态。

[tip type="ll callout('提示：</b><a class="type_success"]
如需了解您可以在 AMP 网页中使用的自适应、已预设样式的导航菜单，请访问 [AMP Start](https://ampstart.com/components#navigation)。
[/tip]

## 在溢出区域内自动滚动 <a name="auto-scrolling-within-overflowing-areas"></a>

在边栏和工具栏中，`amp-sidebar` 可以将溢出容器自动滚动到第一个带有 `autoscroll` 属性的元素。

如果要处理非常长的导航列表，以及希望边栏在页面加载时滚动到当前导航项，此功能非常有用。

如果使用 `toolbar` 功能，仅当 `<nav toolbar>` 元素设为 `overflow: auto` 或 `overflow: scroll` 时，`autoscroll` 才能发挥作用。

```html
<style amp-custom="">

  nav [toolbar] {
    overflow: auto;
  }

</style>

<amp-sidebar id="sidebar1" layout="nodisplay" side="right">
  <nav toolbar="(max-width: 767px)" toolbar-target="target-element">
    <ul>
      <li>Nav item 1</li>
      <li>Nav item 2</li>
      <li>Nav item 3</li>
      <li autoscroll class="currentPage">Nav item 4</li>
      <li>Nav item 5</li>
      <li>Nav item 6</li>
    </ul>
  </nav>
</amp-sidebar>

<div id="target-element">
</div>

```

如需有效的示例代码，请参阅[此示例文件](https://github.com/ampproject/amphtml/blob/master/examples/amp-sidebar-autoscroll.amp.html)。

## 用户体验注意事项 <a name="ux-considerations"></a>

使用 `<amp-sidebar>` 时，请注意以下事项：用户经常会通过移动设备在 AMP 查看工具中查看您的页面，而该查看工具可能会显示一个位置固定的标题。此外，浏览器通常会在页面顶部显示自己的固定标题。在屏幕顶部添加另一个位置固定的元素会占用大量移动屏幕空间，而且其中的内容不会向用户提供任何新信息。

因此，建议不要将用于打开边栏的界面元素放置在与页面等宽的固定标题中。

## 验证 <a name="validation"></a>

请参阅 AMP 验证工具规范中的 [amp-sidebar 规则](https://github.com/ampproject/amphtml/blob/master/extensions/amp-sidebar/validator-amp-sidebar.protoascii)。
