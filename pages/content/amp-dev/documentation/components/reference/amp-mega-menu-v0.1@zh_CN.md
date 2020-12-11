---
$category@: layout
formats:
  - websites
teaser:
  text: 显示可扩展容器中的顶级导航内容。
---


<!--
Copyright 2020 The AMP HTML Authors. All Rights Reserved.

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



带有菜单项的水平导航栏，可在单击时打开/关闭内容容器。

## 概述

`<amp-mega-menu>` '提供了在AMP页面顶部组织和显示大量导航内容的方法。 该组件主要用于桌面和平板电脑，可以与 [`<amp-sidebar>`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-mega-menu/../amp-sidebar/0.1/amp-sidebar.md) 一起使用，以创建一个响应式菜单。

## 用法

`<amp-mega-menu>` '组件包括一个单一的 `<nav>` 元素，其中包含一个 `<ul>` 或 `<ol>`, 其中每个 `<li>` 元素是一个菜单项。

[tip type="note"]
`<nav>` 元素必须是 `<amp-mega-menu>` 组件或 `<template>` 的父元素，并且它必须有 `<ul>` 或 `<ol>` 作为它的唯一子元素。
[/tip]

每个菜单项可以包含以下任何直接子标签:

- `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`
- `<a>`
- `<button>`
- `<span>`
- `<div>`

### Toggleable dropdowns

一个菜单项应该有一个子菜单项(例如，一个锚链接或具有点击动作的元素)，或者两个，如果该菜单项展开成一个下拉列表容器。在后一种情况下，两个子级必须符合以下规范:

1. 一个 `<button>` 或带有 `role=button` 的元素：该元素用于切换下拉容器(但仅当前者没有注册的点击动作)，并在项目之间导航时接收焦点。
2. 带有 `role=dialog` 的 `<div>`：该元素将被呈现为一个容器，其中包含项下的附加内容，并且它最初是隐藏的。

打开下拉列表时，遮罩将覆盖页面的其余部分。内容（例如标题横幅）可以出现在遮罩上方。在内容上应用背景色，然后将其与元素 `<amp-mega-menu>` 放在 `<header>` 元素内。

每个下拉列表可以包含以下任何AMP元素:

- `<amp-ad>`
- `<amp-carousel>`
- `<amp-form>`
- `<amp-img>`
- `<amp-lightbox>`
- `<amp-list>`
- `<amp-video>`

下面的示例演示了一个具有三个菜单项的 `<amp-mega-menu>` 。前两个是可切换的，第三个是外部链接。

[example playground="true" preview="top-frame" orientation="landscape" imports="amp-mega-menu"]

[sourcecode:html]
<amp-mega-menu height="30" layout="fixed-height">
  <nav>
    <ul>
      <li>
        <span role="button">Image</span>
        <div role="dialog">
          <amp-img
            src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
            width="300"
            height="200"
          ></amp-img>
        </div>
      </li>
      <li>
        <span role="button">List</span>
        <div role="dialog">
          <ol>
            <li>item 1</li>
            <li>item 2</li>
            <li>item 3</li>
          </ol>
        </div>
      </li>
      <li>
        <a href="https://amp.dev/">Link</a>
      </li>
    </ul>
  </nav>
</amp-mega-menu>
[/sourcecode]

[/example]

### 动态内容渲染

`<amp-mega-menu>` 使用 [`<amp-list>`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-mega-menu/../amp-list/amp-list.md) 和 [`<amp-mustache>`](https://github.com/ampproject/amphtml/blob/master/extensions/amp-mega-menu/../amp-mustache/amp-mustache.md) 模板从JSON端点动态获取内容。

以下示例通过嵌套 `<amp-list>` 在内来演示此功能 `<amp-mega-menu>`。

[example playground="true" preview="top-frame" orientation="landscape" imports="amp-mega-menu,amp-list" template="amp-mustache"]

[sourcecode:html]
<amp-mega-menu height="60" layout="fixed-height">
  <amp-list
    height="350"
    layout="fixed-height"
    src="{{server_for_email}}/static/samples/json/product-single-item.json"
    single-item
  >
    <template type="amp-mustache">
      <nav>
        <ul>
          {% raw %}{{#values}}{% endraw %}
          <li>
            <h4 role="button">{% raw %}{{name}}{% endraw %}</h4>
            <div role="dialog">
              <amp-img
                src="{{server_for_email}}{% raw %}{{img}}{% endraw %}"
                width="320"
                height="213"
              ></amp-img>
              <p>Price: $<b>{% raw %}{{price}}{% endraw %}</b></p>
            </div>
          </li>
          {% raw %}{{/values}}{% endraw %}
        </ul>
      </nav>
    </template>
  </amp-list>
</amp-mega-menu>
[/sourcecode]

[/example]

Here is the JSON file used:

[sourcecode:json]
{
  "items": [
    {
      "values": [
        {
          "id": 1,
          "img": "/static/samples/img/product1_640x426.jpg",
          "name": "Apple",
          "price": "1.99"
        },
        {
          "id": 2,
          "img": "/static/samples/img/product2_640x426.jpg",
          "name": "Orange",
          "price": "0.99"
        },
        {
          "id": 3,
          "img": "/static/samples/img/product3_640x426.jpg",
          "name": "Pear",
          "price": "1.50"
        }
      ]
    }
  ]
}
[/sourcecode]

### 响应式设计 `<amp-sidebar>`

某些视口可能太窄，无法 `<amp-mega-menu>` 在一行中显示内容。对于这些用例，请使用媒体查询在`<amp-mega-menu>` 和之间切换 `<amp-sidebar>` 。

`<amp-mega-menu>`当视口宽度小于500px时，下面的示例隐藏。 它 `<amp-mega-menu>` 由打开的按钮代替 `<amp-sidebar>`.

[example playground="true" preview="top-frame"]

[sourcecode:html]
<head>
  <script
    async
    custom-element="amp-mega-menu"
    src="https://cdn.ampproject.org/v0/amp-mega-menu-0.1.js"
  ></script>
  <script
    async
    custom-element="amp-sidebar"
    src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
  ></script>
  <script
    async
    custom-element="amp-accordion"
    src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"
  ></script>
  <style amp-custom>
    .sidebar-open-btn {
      font-size: 2em;
      display: none;
    }
    @media (max-width: 500px) {
      #mega-menu {
        display: none;
      }
      .sidebar-open-btn {
        display: block;
      }
    }
  </style>
</head>
<body>
  <header>
    <amp-mega-menu id="mega-menu" height="50" layout="fixed-height">
      <nav>
        <ul>
          <!-- list of menu items here -->
          <li>
            <h4 role="button">menu item</h4>
            <div role="dialog">more content</div>
          </li>
        </ul>
      </nav>
    </amp-mega-menu>
    <button class="sidebar-open-btn" on="tap:sidebar">=</button>
  </header>
  <amp-sidebar id="sidebar" layout="nodisplay">
    <amp-accordion>
      <!-- list of menu items here -->
      <section>
        <h4>menu item</h4>
        <div>more content</div>
      </section>
    </amp-accordion>
  </amp-sidebar>
</body>
[/sourcecode]

[/example]

## 属性

<table>
  <tr>
    <td width="40%"><strong>data-close-button-aria-label (可选)</strong></td>
    <td>可选属性，用于为可访问性添加的关闭按钮设置ARIA标签。</td>
  </tr>
  <tr>
    <td width="40%"><strong>common attributes</strong></td>
    <td>该元素包含 <a href="https://amp.dev/documentation/guides-and-tutorials/learn/common_attributes">common attributes</a> 扩展到AMP组件。</td>
  </tr>
</table>

## Styling

`<amp-mega-menu>` 组件可以使用标准的CSS样式。

- `<nav>` 元素和下拉菜单元素有一个默认的白色背景。
- 当打开时，下拉容器将填满整个视口宽度。这可以用left和width属性覆盖。
- 在展开菜单项时， 将 `open` 属性应用于 `<amp-mega-menu>` 组件以及展开的 `<li>` 元素。

下面的例子是自定义的:

- 导航栏的背景颜色。
- 打开菜单按钮的外观。
- 下拉容器的位置。

[example playground="true" preview="top-frame" orientation="landscape"]

[sourcecode:html]
<head>
  <script
    async
    custom-element="amp-mega-menu"
    src="https://cdn.ampproject.org/v0/amp-mega-menu-0.1.js"
  ></script>
  <style amp-custom>
    .title {
      background-color: lightblue;
      padding: 0.5em;
      margin: 0;
    }
    amp-mega-menu nav {
      background-color: lightgray;
    }
    amp-mega-menu .menu-item[open] > span {
      background-color: white;
    }
    amp-mega-menu .menu-item[open] > div {
      left: 10px;
      right: 10px;
      width: auto;
    }
  </style>
</head>
<body>
  <header>
    <h1 class="title">styling the amp-mega-menu</h1>
    <amp-mega-menu height="30" layout="fixed-height">
      <nav>
        <ul>
          <li class="menu-item">
            <span role="button">List 1</span>
            <div role="dialog">
              <ol>
                <li>item 1.1</li>
                <li>item 1.2</li>
                <li>item 1.3</li>
              </ol>
            </div>
          </li>
          <li class="menu-item">
            <span role="button">List 2</span>
            <div role="dialog">
              <ol>
                <li>item 2.1</li>
                <li>item 2.2</li>
                <li>item 2.3</li>
              </ol>
            </div>
          </li>
        </ul>
      </nav>
    </amp-mega-menu>
  </header>
</body>
[/sourcecode]

[/example]

## 辅助功能

`<amp-mega-menu>` 在每个可扩展菜单项的子级上分配以下ARIA属性。屏幕阅读器使用这些属性将按钮与可切换容器相关联，并将焦点捕获在打开的容器内。

[sourcecode:html]
<li>
  <button aria-expanded aria-controls="unique_id" aria-haspopup="dialog">
    ...
  </button>
  <div role="dialog" aria-modal id="unique_id">
    ...
  </div>
</li>
[/sourcecode]

此外，为了帮助屏幕阅读器用户，在每个 `role=dialog` 元素的开始和结束处都添加了一个不可见但可选项卡设置的关闭按钮。

组件的键盘支持包括:

- 当聚焦时，左/右箭头键在菜单项之间导航。
- 输入/空格键触发一个活动菜单项按钮。
- Esc键折叠大菜单。

由于用户体验和可访问性的考虑， `<amp-mega-menu>` 目前不支持悬停打开。特别是，我们希望避免以下情况:

- 用户将光标移动到按钮上，切换下拉菜单并点击，它会在打开下拉菜单后立即关闭。
- 用户想点击一个关闭的下拉列表下面的元素，但是不小心在鼠标悬停时打开了它，然后点击了下拉列表里面的元素。

有关此主题的更多资料，请参阅 [可访问性开发者指南](https://www.accessibility-developer-guide.com/examples/widgets/dropdown/).

## 验证

请参阅 AMP 验证工具规范中的 [amp-mega-menu rules](https://github.com/ampproject/amphtml/blob/master/extensions/amp-mega-menu/validator-amp-mega-menu.protoascii) 。