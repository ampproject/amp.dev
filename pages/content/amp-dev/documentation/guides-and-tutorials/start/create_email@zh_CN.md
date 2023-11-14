---
'$title': 撰写您的第一封 AMP 电子邮件
$order: 0
description: 撰写您的第一封电子邮件，了解如何让 AMP 电子邮件与众不同。
tutorial: 'true'
formats:
  - email
author: CrystalOnScript
---

借助 AMP 电子邮件，电子邮件发件人可以在电子邮件中使用 AMP 来支持大量的新功能。使用 AMP 撰写的电子邮件可以包含各种互动元素（例如图片轮播界面或手风琴式菜单）。内容可以在消息中保持最新状态。收件人可以在不退出收件箱的情况下执行操作，例如对表单做出响应。

AMP 电子邮件与现有电子邮件兼容。除了 HTML 和明文外，AMP 版本的消息还会作为新的 MIME 部分嵌入到电子邮件中，以此确保在所有电子邮件客户端中兼容。

提示：有关支持 AMP 电子邮件的电子邮件平台 (ESP)、客户端和提供商，请参阅常见问题解答中的[支持的电子邮件平台](../../../support/faq/email-support.md)。

按照本教程的说明，撰写并发送由 AMP 提供支持的第一封动态电子邮件。您可以在[此处](https://gist.github.com/CrystalOnScript/988c3f0a2eb406da27e9d9bf13a8bf73)查看已完成的代码。

# 从 AMP 电子邮件样板开始

AMP Playground 支持 AMP 电子邮件格式，允许您撰写、测试和验证 AMP 电子邮件。打开 [AMP Playground](https://playground.amp.dev/?runtime=amp4email) 并确保在左上角将格式设为 `AMP for Email`。您应当会看到以下代码：

```html
<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <script async src="https://ampjs.org/v0.js"></script>
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <style amp-custom>
      h1 {
        margin: 1rem;
      }
    </style>
  </head>
  <body>
    <h1>Hello, I am an AMP EMAIL!</h1>
  </body>
</html>
```

上述代码包含一封有效的 AMP 电子邮件所需的全部标记和最少的代码。此外，请注意，在右上角的下拉菜单中，下拉列表中还有许多关于有效电子邮件模板的其他示例。

我们花一些时间来了解 AMP 电子邮件与传统 HTML 电子邮件的一些明显差异：

- AMP 电子邮件必须在 html 标记中加入 `⚡4email` 或 `amp4email`，借此来标识其本身。
- `<head>` 标记还必须包含 `<script>` 标记，用于加载 AMP 运行时。`<script async src="https://ampjs.org/v0.js"></script>`
- CSS 样板，用于在最初隐藏内容，直到加载 AMP。`<style amp4email-boilerplate>body{visibility:hidden}</style>`

如果您以前使用过电子邮件，可能会担心电子邮件中被嵌入脚本！请放心，支持 AMP 电子邮件的电子邮件服务提供商会强制执行严格的安全检查，仅允许通过审查的 AMP 脚本在客户端中运行。因此，动态和互动功能可以直接在收件人邮箱中运行，而不会存在任何安全漏洞！本文介绍了有关 AMP 电子邮件必需标记的详细信息。

[tip type="important"] 在 AMP 电子邮件中只能包含[受支持组件](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md)的 AMP 脚本。[/tip]

# 添加图片

电子邮件中使用的大部分 HTML 标记都可以在 AMP 电子邮件中使用。但是，某些标记将被替换为等效的 AMP 标记，例如 `<img>` 标记被替换为 [`<amp-img>`](/content/amp-dev/documentation/components/reference/amp-img.md)。

`<amp-img>` 标记要求定义图片的宽度和高度，与 `<img>` 不同的是，`<amp-img>` 必须使用 `</amp-img>` 明确闭合。

```html
<amp-img
  src="https://link/to/img.jpg"
  alt="photo description"
  width="100"
  height="100"
>
</amp-img>
```

此外，GIF 文件通过 [`<amp-anim>`](/content/amp-dev/documentation/components/reference/amp-anim.md) 获得支持。

由于电子邮件不在服务器上托管，因此，网址必须在 AMP 电子邮件中使用绝对路径，并且必须为 HTTPS。

[Placekitten](https://placekitten.com/) 网站使用小猫图片作为占位符，因而允许您直接在网址中选择图片的大小！

添加以下代码后，我们可以在第一封电子邮件中加入图片。

```html
<body>
  <amp-img
    src="https://placekitten.com/800/400"
    alt="Welcome"
    width="800"
    height="400"
  >
  </amp-img>
</body>
```

## 实现自适应

收件人会在各种设备和各种屏幕大小上查看电子邮件。AMP 自带布局系统！借助 [`amp-layout`](/content/amp-dev/documentation/components/reference/amp-layout.md) 系统和媒体查询，可以轻松实现自适应电子邮件。要将我们的占位小猫图片调整为适合相应的屏幕，请在 `<amp-image>` 中添加 `layout="responsive"` 属性。

[tip type="read-on"] [详细了解 AMP 如何使用布局和媒体查询](/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md)。[/tip]

```
<amp-img layout="responsive" src="https://placekitten.com/800/400" alt="Welcome" height="400" width="800"></amp-img>
```

放大和缩小浏览器窗口，观看图片调整大小！点击[此处](../../../documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md#layout)查看受支持布局特有的组件列表。

# 修改呈现形式和布局

图片很精美，但如果想要显示更多图片，应该怎么办？AMP 电子邮件支持手风琴式菜单和边栏等布局元素。

<!-- TODO: Set up link -->

<!-- [Read here for full list of supported layout elements](). -->

在本教程中，我们将使用 [`<amp-carousel>`](/content/amp-dev/documentation/components/reference/amp-carousel.md) 来显示可以收养的小猫的照片。

在电子邮件的 head 中添加 `amp-carousel` 脚本。

```html
<script
  async
  custom-element="amp-carousel"
  src="https://ampjs.org/v0/amp-carousel-0.1.js"
></script>
```

然后，将第一个图片封装在 `<amp-carousel>` 标记中。

```html
<amp-carousel layout="responsive" width="800" height="400" type="slides">
  <amp-img
    layout="fill"
    src="https://placekitten.com/800/400"
    alt="Welcome"
    height="400"
    width="800"
  ></amp-img>
</amp-carousel>
```

您可能会发现，一切都未改变，这很好！我们已为轮播指定了 `type=slides` 属性，这意味着它每次显示一张照片。由于我们仅在标记中放入了一张照片，因此，用户看不到滑块箭头。

接下来，在 `<amp-carousel>` 中将占位小猫图片替换为可以收养的 AMP 小猫。

```html
<amp-carousel
  id="carousel-with-preview"
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({currentCat: event.index})"
>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_caleb_woods.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_craig_mclaclan.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_lightscape.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_nick_karvounis.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
</amp-carousel>
```

现在，点击轮播左侧或右侧的浏览箭头，应该可以更改照片！

## 带样式发送

AMP 支持在文档 head 的 `<style amp-custom>` 标记中设置样式。此外，现在也可以使用以前被禁止的 CSS 类和伪类。点击[此处](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md#emails-with-style)查看完整列表。

我们将 `Hello, AMP4EMAIL world` 更新为真实标题。

```html
<body>
  <h1>Adorable Adoptable Animals</h1>
  ...
</body>
```

然后，在 head 中添加一些样式。

```html
<head>
  ...
  <style amp-custom>
    h1 {
      font-family: arial;
      margin: 10px;
    }
    .center {
      text-align: center;
    }
    .carousel-preview {
      margin-top: 10px;
    }
  </style>
</head>
```

# 添加动态功能

传统上，电子邮件仅支持静态内容。借助 AMP，电子邮件开启了一个全新的世界，可以实现各种可能性！现在，用户可以对[表单](/content/amp-dev/documentation/components/reference/amp-form.md)做出响应，获取[动态更新的内容列表](/content/amp-dev/documentation/components/reference/amp-list.md)，以及与内容互动。

在本教程中，我们将使用 [`<amp-bind>`](/content/amp-dev/documentation/components/reference/amp-bind.md) 来显示可被收养的小猫的名字和说明，这些信息会在用户将光标放在小猫的幻灯片上时显示。我们先在电子邮件的 head 中加入 `amp-bind` 脚本。

```html
<script
  async
  custom-element="amp-bind"
  src="https://ampjs.org/v0/amp-bind-0.1.js"
></script>
```

接下来，我们在 [`<amp-state>`](/content/amp-dev/documentation/components/reference/amp-bind.md#state) 标记中将 AMP 绑定变量“myState”声明为 JSON 字符串。由于我们有四张小猫照片，我们将添加所有这四张照片的状态。

```html
<body>
  <amp-state id="myState">
    <script type="application/json">
      {
        "cats": [
          {
            "name": "Aakash",
            "description": "Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug."
          },
          {
            "name": "Filip",
            "description": "Friendly and enjoys pets and head rubs. Is known to sit on keyboards and refuses to touch anything with catnip on it."
          },
          {
            "name": "Julian",
            "description": "Both bold and extremely sweet. Wastes no time in investigating new smells, objects, and places, but enjoys lazing in the sun!"
          },
          {
            "name": "John",
            "description": "This playful and spirited cat would like to be outside his kennel and will be so happy when he gets to his forever home with more room to move."
          }
        ]
      }
    </script>
  </amp-state>
</body>
```

[AMP 操作和事件](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md)会触发不同的状态。在本例中，我们希望在用户点击轮播浏览箭头时更新状态。amp-carousel 触发 [`slideChange`](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md#amp-carouseltypeslides) 事件，在该事件中，我们将使用 `AMP.setState` 更新 `currentCat` 变量。

```html
<h1>Adorable Adoptable Animals</h1>
<amp-carousel
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({ currentCat: event.index} )"
>
  ...
</amp-carousel>
```

上述代码将 `currentCat` 的状态设置为与轮播索引中的小猫照片一致。因此，如果我们将光标放在 `event.index=2` 幻灯片上，状态将映射到数组中索引 2 对应的项。

现在只剩下显示小猫的名字和说明。将以下代码添加到 `amp-carousel` 结束标记下方。

```html
</amp-carousel>
<div class="center">
  <h1>
    <span [text]="myState.cats[currentCat].name">Aakash</span>  is available for adoption!
  </h1>
</div>
```

`amp-bind` 扩展组件使用[表达式](/content/amp-dev/documentation/components/reference/amp-bind.md#expressions)和[绑定](/content/amp-dev/documentation/components/reference/amp-bind.md#bindings)来动态更改内容。上述代码示例使用 `[text]` 绑定，每次在评估 `"myState.cats[currentCat].name"` 表达式时状态发生变化后，该绑定便会更新 `<span>` 标记中的文本。

[tip type="note"] 出于性能考虑，同时为了避免出现意外的内容跳转，amp-bind 不会在加载网页时评估表达式。这意味着，视觉元素应当采用默认状态，初始呈现时不依赖 amp-bind。[/tip]

请记得在 `</div>` 标记后面添加小猫说明！

```html
  </div>
  <p class="center">About <span [text]="myState.cats[currentCat].name"> Aakash</span></p>
  <p class="center" [text]="myState.cats[currentCat].description">Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug.</p>
</body>
```

现在，如果在轮播中更改小猫照片，其名字和说明也应当更新！

# 发送 AMP 电子邮件

要了解如何将电子邮件发送到收件箱，请[参阅有关 AMP 电子邮件测试的详细信息](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md)

<!-- TODO: Add Screen Shot. Emails sent from tool are not currently displaying. Only receiving information on how to enable AMP emails, but then getting blank messages. -->

恭喜！您已发送第一封 AMP 电子邮件！

有关后续步骤，请[参阅有关 AMP 电子邮件基础知识的详细信息](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md)。
