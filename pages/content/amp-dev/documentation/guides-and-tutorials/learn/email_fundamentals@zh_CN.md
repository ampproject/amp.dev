---
'$title': AMP 电子邮件基础知识
$order: 1
description: 开始编写有效的 AMP 电子邮件所需的一切知识。
author: CrystalOnScript
formats:
  - email
---

如果您熟悉 AMP，这再好不过了！AMP 电子邮件只是 AMP HTML 库的一部分。如果您不熟悉 AMP，也是一件好事！本指南将向您介绍在开始编写有效的 AMP 电子邮件时需要知道的所有知识！

## 所需标记

AMP 电子邮件与传统 HTML 电子邮件看起来很像，但存在几点区别。以下列出了在让电子邮件成为有效的 AMP 电子邮件时所需的最少量标记。

```html
<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
  </head>
  <body>
    Hello, AMP4EMAIL world.
  </body>
</html>
```

支持 AMP 电子邮件的电子邮件服务提供商已设置安全检查，旨在确保用户获得安全愉悦的体验。使用 AMP 构建电子邮件必须满足以下所有要求：

- 以 `<!doctype html>` 文档类型开头。这也是 HTML 的标准。
- 包含顶级 `<html amp4email>` 标记或 `<html ⚡4email>` 标记（如果电子邮件格外酷）。这可以将文档标识为 AMP 电子邮件，从而以相应方式对待该文档。
- 定义 `<head>` 和 `<body>` 标记。这一点在 HTML 中为可选项，但 AMP 保留了原始做法！
- 包括 `<meta charset="utf-8>` 标记，作为 `<head>` 标记的第一个子级。这样可以标识网页的编码。
- 利用放在 `<head>` 中的 `<script async src="https://cdn.ampproject.org/v0.js"></script>` 标记导入 AMP 库。只有包括此标记，才能让通过 AMP 获得的炫酷动态功能起作用！最佳做法是，应该尽早在 `<head>` 中添加此标记，直接放在 `<meta charset="utf-8">` 标记下方。
- 最初隐藏电子邮件内容，直到在 `<head>` 中放置 AMP 电子邮件样板来加载 AMP 库。

```html
<head>
  ...
  <style amp4email-boilerplate>
    body {
      visibility: hidden;
    }
  </style>
</head>
```

### AMP 特有的标记替换

由于 AMP 电子邮件库是 AMP HTML 库的一部分，许多相同的规则均适用；AMP 特有的标记会替换占用较多资源的 HTML 标记，并且需要定义的宽度和高度。这样，AMP 样板便可隐藏内容，直到它知道自己在用户设备上的显示情况。

#### 图片

为了有效绘制网页，所有 `<img>` 标记均会替换为 [`<amp-img>`](../../../documentation/components/reference/amp-img.md)。`<amp-img>` 标记需要定义的宽度和高度，并且支持 [AMP 的布局系统](amp-html-layout/index.md)。

```
<amp-img src="https://link/to/img.jpg"
    width="100"
    height="100"
    layout="responsive">
</amp-img>
```

`<amp-img>` 标记本身可以强有力地控制自适应设计并设置后退。

[tip type="note"] 详细了解 AMP [布局和媒体查询](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md?format=email)的使用以及如何设置[图片后备](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)。[/tip]

#### GIF

AMP 为 GIF 图片创建了一个特殊标记 [`<amp-anim>`](../../../documentation/components/reference/amp-anim.md?format=email)，如果动画离屏，该标记允许 AMP 运行时降低 CPU 占用率。与 `<amp-img>` 类似，该标记的宽度和高度已定义，该元素必须包括结束标记。

```
<amp-anim
    width="400"
    height="300"
    src="my-gif.gif">
</amp-anim>
```

此外，该标记还支持在加载 `src` 文件时显示可选的 `placeholder` 子级，并且支持 AMP 布局系统。

```
<amp-anim width=400 height=300 src="my-gif.gif" layout="responsive">
  <amp-img placeholder width=400 height=300 src="my-gif-screencap.jpg">
  </amp-img>
</amp-anim>
```

## 具有样式的电子邮件 <a name="emails-with-style"></a>

与所有电子邮件客户端一样，AMP 支持内嵌 `style` 属性，此外，也支持将 CSS 放在电子邮件 head 的 `<style amp-custom>` 标记中。

```html
...
<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
</style>
...
</head>
```

与 HTML 电子邮件一样，AMP 电子邮件支持一组有限的 CSS 选择器和属性。

有关支持 AMP 且允许在所有电子邮件客户端上使用的完整 CSS 列表，请参阅 [AMP 电子邮件支持的 CSS](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md)。

[tip type="important"] AMP 要求样式的最大大小为 75,000 字节。[/tip]

## 允许使用的 AMP 组件

AMP 组件的动态性、生动性和互动性是 AMP 电子邮件对未来电子邮件的展望。

[AMP 电子邮件中支持的完整组件列表](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md)作为 AMP 电子邮件规范的一部分提供 。

## 身份验证请求

动态的个性化电子邮件内容通常要求对用户进行身份验证。但是，为了保护用户数据，在 AMP 电子邮件中发出的所有 HTTP 请求均可进行代理并移除 Cookie。

为了对 AMP 电子邮件发出的请求进行身份验证，可以使用访问令牌。

### 访问令牌

您可以使用访问令牌来验证用户身份。访问令牌由电子邮件发件人提供和检查。发件人使用令牌来确保只有有权访问 AMP 电子邮件的用户才能发出该电子邮件中包含的请求。访问令牌必须受密码保护，并且使用时间和范围受限。这些令牌包括在请求网址中。

以下示例阐述了使用 `<amp-list>` 来显示经过身份验证的数据：

```html
<amp-list
  src="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  height="300"
>
  <template type="amp-mustache"> ... </template>
</amp-list>
```

同样，在使用 `<amp-form>` 时，需要将访问令牌放在 `action-xhr` 网址中。

```html
<form
  action-xhr="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  method="post"
>
  <input type="text" name="data" />
  <input type="submit" value="Send" />
</form>
```

#### 示例

以下示例假设有一项假想的记事服务，用于让登录用户在其帐户中添加备注并在以后查看这些备注。该服务想要向用户 `jane@example.com` 发送电子邮件，其中包括她以前添加的备注列表。当前用户的备注列表可以在端点 `https://example.com/personal-notes` 上以 JSON 格式提供。

在发送电子邮件之前，该服务为 `jane@example.com: A3a4roX9x` 生成一个受密码保护且使用受限的访问令牌。该访问令牌位于网址查询的字段名 `exampletoken` 中：

```html
<amp-list
  src="https://example.com/personal-notes?exampletoken=A3a4roX9x"
  height="300"
>
  <template type="amp-mustache">
    <p>{{note}}</p>
  </template>
</amp-list>
```

端点 `https://example.com/personal-notes` 负责验证 exampletoken 参数并查找与令牌关联的用户。

### 使用受限的访问令牌

借助使用受限的访问令牌，可以防止请求仿冒和[重放攻击](https://en.wikipedia.org/wiki/Replay_attack)，确保操作是由收到邮件的用户执行的。此保护的实现方式是，将唯一的令牌参数添加到请求参数，并在调用操作时对该令牌参数进行验证。

令牌参数应当作为密钥生成，该密钥只能用于特定操作和特定用户。在执行所请求的操作之前，您应当检查以确认该令牌有效并与您为用户生成的令牌一致。如果令牌一致，则可执行操作并且该令牌不适用于以后的请求。

访问令牌应当放在 HttpActionHandler 的网址属性中发送给用户。例如，如果您的应用在 `http://www.example.com/approve?requestId=123` 上处理审批请求，您应当考虑在其中另外添加 `accessToken` 参数，并侦听发送到 `http://www.example.com/approve?requestId=123&accessToken=xyz` 的请求。

您必须提前生成 `requestId=123` 和 `accessToken=xyz` 的组合，确保无法从 `requestId` 推导出 `accessToken`。只要审批请求具有 `requestId=123`，但没有 `accessToken` 或者 `accessToken` 不等于 `xyz`，都应该遭到拒绝。此请求通过后，以后具有相同 ID 和访问令牌的请求也应该遭到拒绝。

## 在不同的电子邮件客户端上进行测试

支持 AMP 电子邮件的电子邮件客户端本身会提供文档和测试工具，帮助您进行集成。

有关详细信息以及电子邮件客户端特定的文档链接，请参阅[测试 AMP 电子邮件](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md)。
