---
'$title': 为您的网站添加导航元素
$order: 5
description: 大多数移动网站都有网站导航菜单。这些菜单形式各异。在本教程中，我们将尝试通过以下示例为您…
---

大多数移动网站都有网站导航菜单。这些菜单形式各异。在本教程中，我们将尝试通过以下示例为您演示如何在 AMP 网页中添加导航元素：

- 一个用于返回到首页的链接 - 最简单的导航选项。
- 一个使用 [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) 组件构建的侧边导航栏。

## 返回到首页的链接

若想让用户能够访问您网站的常规导航选项，最简单的方法就是让用户返回到您的首页！

首先，尝试将您的 `<header>` 标记**替换**为以下版本（其中含有一个链接）：

```html
<header class="headerbar">
  <a href="homepage.html">
    <amp-img
      class="home-button"
      src="icons/home.png"
      width="36"
      height="36"
    ></amp-img>
  </a>
  <div class="site-name">News Site</div>
</header>
```

然后，将以下样式规则**添加**到您的内嵌 CSS 中：

```css
.home-button {
  margin-top: 8px;
}
.headerbar {
  height: 50px;
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
}
.site-name {
  margin: auto;
}
article {
  margin-top: 50px;
}
```

现在，**刷新**一下网页。您应该会在网页左上角看到一个指向 `homepage.html` 的链接。如果您点击首页图标，很快就会发现它并未使我们转到任何位置（因为我们没有 `homepage.html` 文件）。

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-home.png', 412, 190, align='center half', caption='首页图标导航') }}

您可以将此链接替换为您网站首页的网址，以便用户能够通过您网站上的现有导航选项转到您网站的其他部分。

若想充分利用您网站上的现有导航选项，这是最简单的方式。接下来，我们将探索一个热门的网站导航选项。

## 使用边栏导航

一种比较常见的导航方法是添加菜单图标，当用户点击该图标时，它即会在网页一侧显示一系列导航链接。在 AMP 网页中，我们可以使用 [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) 组件创建此类导航元素。

首先，我们必须将 [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) 组件的 JavaScript **添加**到 `<head>` 标记中：

```html
<script
  async
  custom-element="amp-sidebar"
  src="https://ampjs.org/v0/amp-sidebar-0.1.js"
></script>
```

接着，我们需要显示菜单图标。当用户点按该图标时，它即会打开边栏。为此，我们需要将 `<header>` **替换**为以下代码，以显示“[汉堡式](https://en.wikipedia.org/wiki/Hamburger_button)”图标（而非首页图标）：

```html
<header class="headerbar">
  <div role="button" on="tap:sidebar1.toggle" tabindex="0" class="hamburger">
    ☰
  </div>
  <div class="site-name">News Site</div>
</header>
```

在上面的代码中，我们通过 [`amp-sidebar`](../../../../documentation/components/reference/amp-sidebar.md) 元素（由 `sidebar1` ID 标识）的 [`on`](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-actions-and-events.md) 操作属性来 `toggle` 边栏。下面我们来添加边栏。

**添加**以下 HTML（使其紧跟在 `</header>` 后面）：

```html
<amp-sidebar id="sidebar1" layout="nodisplay" side="left">
  <div
    role="button"
    aria-label="close sidebar"
    on="tap:sidebar1.toggle"
    tabindex="0"
    class="close-sidebar"
  >
    ✕
  </div>
  <ul class="sidebar">
    <li><a href="#">Example 1</a></li>
    <li><a href="#">Example 2</a></li>
    <li><a href="#">Example 3</a></li>
  </ul>
</amp-sidebar>
```

此边栏将处于隐藏状态，但当用户点按汉堡式图标时，菜单即会从屏幕左侧出现。若想关闭菜单，用户可点按 X 图标。

最后，将以下样式规则**添加**到您的内嵌 CSS 中：

```css
.hamburger {
  padding-left: 10px;
}
.sidebar {
  padding: 10px;
  margin: 0;
}
.sidebar > li {
  list-style: none;
  margin-bottom: 10px;
}
.sidebar a {
  text-decoration: none;
}
.close-sidebar {
  font-size: 1.5em;
  padding-left: 5px;
}
```

好了，我们来看看此边栏的显示效果吧。**刷新**并重新加载您的 AMP 网页。您应该会看到大致如下所示的内容：

{{ image('/static/img/docs/tutorials/tut-advanced-navigate-sidebar.gif', 412, 384, align='center half', caption='边栏菜单导航') }}

我们的网页看起来很不错！下面，我们来执行最后一道工序，即添加自定义字体。
