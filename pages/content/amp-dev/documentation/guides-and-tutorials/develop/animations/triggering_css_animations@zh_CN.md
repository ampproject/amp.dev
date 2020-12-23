---
"$title": 触发 CSS 动画和过渡
"$order": '1'
description: 在网页上触发 CSS 动画取决于类的添加和移除，而类的添加和移除操作通过 JavaScript 来完成。使用 toggleClass 操作可以在 AMP 网页上实现相同的行为…
formats:
- websites
- ads
---

通过 CSS 动画，网络元素可以从一种 CSS 样式配置过渡到另一种。浏览器可以在加载时启动定义的动画，但事件触发的 CSS 动画则[取决于类的添加和移除](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)。AMP 同时支持这两种动画类型。

如果您的动画较小且独立，并且不需要精确计时，可以使用 CSS。

## 定义 CSS 和关键帧

可以按以下方式在 AMP 中定义 CSS：

[filter formats="websites, stories"]

- 在文档 head 的 `<style amp-custom>` 标记内定义。大小不能超过 75,000 字节。
- 内嵌样式。内嵌样式的每个实例不能超过 1,000 字节。内嵌样式的大小将计入 `<style amp-custom>` 标记支持的 75,000 字节限值中。
- 在文档 head 的 `<style amp-keyframes>` 标记内定义。大小不能超过 500,000 字节。仅限关键帧属性。

[/filter]

[filter formats="ads"]

- 在文档 head 的 `<style amp-custom>` 标记内定义。大小不能超过 20,000 字节。
- 内嵌样式。内嵌样式的每个实例不能超过 1,000 字节。内嵌样式的大小将计入 `<style amp-custom>` 标记支持的 20,000 字节限值中。
- 在文档 head 的 `<style amp-keyframes>` 标记内定义。大小不能超过 500,000 字节。仅限关键帧属性。

[/filter]

[tip type="read-on"] 有关在 AMP 中使用 CSS 的信息，请参阅[样式和布局](../style_and_layout/index.md)。[/tip]

[filter formats="websites, stories"] 为了让网页保持快速高效，AMP 在 `<amp style-custom>` 标记内施加了 75,000 字节的 CSS 限值。虽然可以使用此方法来定义动画样式，但要求 `<amp style-keyframes>` 标记内的字节数不超过 500,000，有助于制作更为精细的动画，同时不会占用宝贵的网站样式资源。[/filter]

[filter formats="ads"] 为了让广告保持快速高效，AMP 在 `<amp style-custom>` 标记内施加了 20,000 字节的 CSS 限值。虽然可以使用此方法来定义动画样式，但要求 `<amp style-keyframes>` 标记内的字节数不超过 500,000，有助于制作更为精细的动画，同时不会占用宝贵的网站样式资源。[/filter]

```html
  <style amp-custom>
    div {
      width: 100px;
      height: 100px;
      background: red;
      position: relative;
      animation: mymove 5s infinite;
    }
  </style>
</head>
<body>

<div></div>
  <style amp-keyframes>
   @keyframes mymove {
      0%   {transform: translatey(0px);}
      25%  {transform: translatey(200px);}
      75%  {transform: translatey(50px);}
      100% {transform: translatey(100px);}
    }
  </style>
</body>
```

## 添加、移除和切换类

通过 AMP 操作 `toggleClass`，可以在定义的元素中添加和移除类。

```js
elementName.toggleClass(class="className")
```

您可以在希望用户与之互动的同一元素（例如，添加动画效果的汉堡菜单）上切换类。

```html
 <div id="hamburger" tabindex=1 role=button on="tap:hamburger.toggleClass(class='close')">
```

另外，`toggleClass` 操作也可以应用到其他元素，添加 `force` 属性后，该操作可以在两个类之间切换。

```html
<button on="tap:magicBox.toggleClass(class='invisible', force=true),magicBox.toggleClass(class='visible', force=false)">
  Disappear
</button>
<button on="tap:magicBox.toggleClass(class='visible', force=true),magicBox.toggleClass(class='invisible', force=false)">
  Reappear
</button>
```

如果您需要移除一个类，并且不允许重新应用该类，可以添加 `force` 属性并将值设置为 `false`。如果您需要添加一个类，并且不允许将其移除，可以添加 `force` 属性并将值设置为 `true`。

## 使用 CSS 和状态添加动画效果

使用 [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) 可以添加和移除任意数量的 CSS 类和状态。

[example preview="top-frame" playground="true"]
```html
<head>
  <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
  <style amp-custom>
    div {
      height: 100px;
      width: 100px;
      margin: 1em;
      background-color: green;
      margin-left: 100px;
      transition: 2s;
    }
    .visible {
      opacity: 1;
    }
    .invisible {
      opacity: 0;
    }
    .left {
      transform: translatex(-50px)
    }
    .right {
      transform: translatex(50px)
    }
    button {
      margin-top:  1rem;
      margin-left: 1rem;
    }
  </style>
</head>
<body>
  <amp-state id="magicBox">
    <script type="application/json">
      {
        "visibleBox": {
          "className": "visible"
        },
        "invisibleBox": {
          "className": "invisible"
        },
        "moveLeft": {
          "className": "left"
        },
        "moveRight": {
          "className": "right"
        }
      }
    </script>
  </amp-state>
  <div [class]="magicBox[animateBox].className"> </div>
  <button on="tap:AMP.setState({animateBox: 'invisibleBox'})">
    Disappear
  </button>
  <button on="tap:AMP.setState({animateBox: 'visibleBox'})">
    Reappear
  </button>
  <button on="tap:AMP.setState({animateBox: 'moveLeft'})">
    Move Left
  </button>
  <button on="tap:AMP.setState({animateBox: 'moveRight'})">
    Move Right
  </button>
</body>
```
[/example]

首先，在文档 `head` 的 `<style amp-custom>` 标记中添加一组 CSS 类，借此定义多个类动画：

```css
    .visible {
      opacity: 1;
    }
    .invisible {
      opacity: 0;
    }
    .left {
      transform: translatex(-50px)
    }
    .right {
      transform: translatex(50px)
    }
```

然后，将每个类与一种状态配对：

```html
<amp-state id="magicBox">
  <script type="application/json">
    {
      "visibleBox": {
        "className": "visible"
      },
      "invisibleBox": {
        "className": "invisible"
      },
      "moveLeft": {
        "className": "left"
      },
      "moveRight": {
        "className": "right"
      }
    }
  </script>
</amp-state>
```

接着，将元素与这些类相关联：

```html
  <div [class]="magicBox[animateBox].className"> </div>
```

状态将根据关联的 AMP 操作或事件发生变化。以下示例根据用户互动来更改状态：

```html
<button on="tap:AMP.setState({animateBox: 'invisibleBox'})">
    Disappear
</button>
<button on="tap:AMP.setState({animateBox: 'visibleBox'})">
    Reappear
</button>
<button on="tap:AMP.setState({animateBox: 'moveLeft'})">
    Move Left
</button>
<button on="tap:AMP.setState({animateBox: 'moveRight'})">
  Move Right
</button>
```

按上述方式使用 [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) 会将类明确设置为定义的类。您不必告知它移除其他类。
