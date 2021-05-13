---
'$title': 格式指南和教程
$order: 3
description: amp.dev 的文件格式要求
formats:
  - websites
  - stories
  - ads
  - email
author: CrystalOnScript
---

指南和教程以 [Markdown](https://www.markdownguide.org/) 形式提交，附带前页和短代码格式。

## 文档位置

可从 [amp.dev](https://github.com/ampproject/amp.dev) 和 [AMPHTML](https://github.com/ampproject/amphtml) 这两个仓库中提取关于 amp.dev 的内容。组件下的所有参考文档均从 AMPHTML 的内置组件或扩展组件中提取。

- [内置组件](https://github.com/ampproject/amphtml/tree/main/builtins)
- [组件](https://github.com/ampproject/amphtml/tree/main/extensions)
- [课程](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/courses)
- [示例](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/examples)
- [指南和教程](https://github.com/ampproject/amp.dev/tree/future/pages/content/amp-dev/documentation/guides-and-tutorials)

此外，还有一些从 AMPHTML 导入到 amp.dev 中的其他文档。[此文件](https://github.com/ampproject/amp.dev/blob/future/platform/config/imports/spec.json)中列出了这些文档。不要在 amp.dev 仓库中更新这些文档——您的变更将在后续构建中被覆盖！

## 前页

前页位于每个指南和教程的顶部。

示例：

```yaml
$title: Include Custom JavaScript in AMP Pages
$order: 7
formats:
  - websites
author: CrystalOnScript
contributors:
  - fstanis
description: For web experiences requiring a high amount of customization AMP has created amp-script, a component that allows the use of arbitrary JavaScript on your AMP page without affecting the page's overall performance.
```

<table>
  <tr>
   <td>
    <code>$title</code>
   </td>
   <td>将显示在目录中的文档标题。除“AMP”和其他专有名词外，将第一个单词的首字母大写。使用与号 `&` 代替单词 `and`。</td>
  </tr>
  <tr>
   <td>
    <code>$order</code>
   </td>
   <td>定义文档在目录中的显示位置。您可能需要编辑其他文档中的 `$order` 才能使其显示在正确的位置。</td>
  </tr>
  <tr>
   <td>
    <code>formats</code>
   </td>
   <td>列出与文档相关的 AMP 体验。如果您的文档与 AMP 网站和 AMP 故事有关，但与 AMP 广告和 AMP 电子邮件无关，则您的前页将如下所示：```yaml formats: - websites - stories ```</td>
  </tr>
  <tr>
   <td>
<code>author</code>
   </td>
   <td>作者是您！使用您的 GitHub 用户名。</td>
  </tr>
  <tr>
   <td>
<code>contributors</code>
   </td>
   <td>列出为您的文档做出贡献的任何人。这是一个可选字段。</td>
  </tr>
  <tr>
   <td>
<code>description</code>
   </td>
   <td>撰写您的指南或教程的简短说明。这有助于搜索引擎优化，让您的工作成果惠及有需要的人！</td>
  </tr>
  <tr>
   <td>
<code>tutorial</code>
   </td>
   <td>向网站的前页中添加 `tutorial: true`，以便在它旁边添加教程图标。教程位于目录中相应部分的底部。</td>
  </tr>
</table>

# 短代码

有关短代码及其用法的列表，请查看 [GitHub 上的 documentation.md](https://github.com/ampproject/amp.dev/blob/future/contributing/documentation.md#shortcodes)。

## 图片

amp.dev 是使用 AMP 构建的！因此，我们的图片必须符合 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 标准。构建过程使用以下语法将图像转换为正确的 `amp-img` 格式。

<div class="ap-m-code-snippet"><pre>{{ image('/static/img/docs/tutorials/custom-javascript-tutorial/image1.jpg', 500, 369, layout='intrinsic', alt='Image of basic amp script tutorial starter app') }}</pre></div>

## 筛选部分

有些文档可能与多种 AMP 格式相关，但某些格式可能需要进一步说明或与其他格式不相关的信息。您可以通过将它们封装到以下短代码中来筛选这些部分。

<div class="ap-m-code-snippet"><pre>&amp;lsqb;filter formats="websites"]
This is only visible for [websites](?format=websites).
&amp;lsqb;/filter]

&amp;lsqb;filter formats="websites"]
This is only visible for [websites](?format=websites).
&amp;lsqb;/filter]

&amp;lsqb;filter formats="websites, email"]
This is visible for [websites](?format=websites) &amp; [email](?format=email).
&amp;lsqb;/filter]

&amp;lsqb;filter formats="stories"]
This is visible for [stories](?format=stories).
&amp;lsqb;/filter]</pre></div>

## 提示

您可以通过将文本封装到以下短代码中来添加提示和标注：

<div class="ap-m-code-snippet"><pre>&amp;lsqb;tip type="default"]
Default tip
[/tip]

&amp;lsqb;tip type="important"]
Important
[/tip]

&amp;lsqb;tip type="note"]
Note
[/tip]

&amp;lsqb;tip type="read-on"]
Read-on
[/tip]</pre></div>

## 代码段

将代码段放置在三个反引号组中，在第一组反引号末尾指定语言。

<div class="ap-m-code-snippet"><pre>```html
  // code sample
```

```css
// code sample
```

````js
  // code sample
```</pre></div>

如果您的代码包含双大括号（在使用 [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md?format=websites) 模板时经常出现这种情况），则必须封装代码部分：

<div class="ap-m-code-snippet"><pre>```html<br>{% raw	%}<br>  // code with double curly braces<br>{% endraw	%}<br>```</pre></div>

### 列表中的代码段

Python-Markdown 存在一些限制。在列表中添加代码段时，请使用以下语法：

<div class="ap-m-code-snippet"><pre>&lsqb;sourcecode:html]
      <html>
        <p>Indented content.</p>
      </html>
    &lsqb;/sourcecode]</pre></div>

## 预览代码示例

代码示例可以提供 [AMP Playground](https://playground.amp.dev/) 版本的预览和/链接。

<div class="ap-m-code-snippet">
  <pre>&lsqb;example preview="default: none|inline|top-frame"
          playground="default: true|false"
          imports="<custom-element-1>,<custom-element-2>,..."
          template="<custom-template>"]
  ```html
    // code sample
````

&lsqb;/example]</pre>

</div>

注：在 Playground 中打开预览时，预览将自动转换为当前选定的格式 🤯！

使用 `preview` 属性定义预览的生成方式：

- **none**：不生成预览

- **inline**：示例预览显示在源代码上方。如果代码不包含任何 `head` 元素，则只有普通网站示例才能实现内嵌预览。对于不需要任何样式或其他 `head` 元素的小型示例，请使用此选项（由于导入是通过 `imports` 属性指定的，因此不计算在内）。

- **top-frame**：示例预览显示在 iframe 内的源代码上方。可以在 `portrait` 和 `landscape` 模式之间切换方向。您可以通过指定附加属性来预先选择方向：

- **orientation**：`default: landscape|portrait`

如果需要自定义元素，则在 `imports` 属性中将它们指定为以逗号分隔的列表，格式为组件名称、冒号和版本。如果您的代码使用 [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md?format=websites)，则在 `template` 属性中指定依赖关系。

对于包含资源链接的电子邮件内容，请在源代码中使用占位符 <code>{{server_for_email}}</code>。

### 内嵌示例

下面是简单的内嵌示例嵌入。您可以通过内嵌样式定义 CSS：

<div class="ap-m-code-snippet"><pre>[example preview="inline" playground="true"]
    ```html
    <div style="background: red; width: 200px; height: 200px;">Hello World</div>
    ```
  [/example]</pre></div>

实际效果如下：

[example preview="inline" playground="true"]

```html
<div style="background: red; width: 200px; height: 200px;">Hello World</div>
```

[/example]

警告：内嵌示例直接嵌入到网页中。如果网页上已经使用了组件（例如 `amp-consent`），则可能导致冲突。

### Top-Frame 预览

每当需要在 `<style amp-custom>` 中指定 head 元素或定义全局样式时，都需要使用 top-frame 预览。

重要提示：请勿向 head 添加任何 AMP 样板代码，因为它将根据 AMP 格式自动添加。仅将示例所需的元素添加到 head！

<div class="ap-m-code-snippet"><pre>[example preview="top-frame"
         playground="true"]
    ```html
    <head>
      <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
      <style amp-custom>
        body {
          background: red;
        }
      </style>
    </head>
    <body>
      <h1>Hello AMP</h1>
      <amp-youtube width="480"
        height="270"
        layout="responsive"
        data-videoid="lBTCB7yLs8Y">
      </amp-youtube>
    </body>
    ```
  [/example]</pre></div>

实际效果如下：

[example preview="top-frame"
playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-youtube"
    src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
  ></script>
  <style amp-custom>
    body {
      background: red;
    }
  </style>
</head>
<body>
  <h1>Hello AMP</h1>
  <amp-youtube
    width="480"
    height="270"
    layout="responsive"
    data-videoid="lBTCB7yLs8Y"
  >
  </amp-youtube>
</body>
```

[/example]

### AMP 故事

将 `preview="top-frame"` 与 `orientation="portrait"` 一起使用来预览 AMP 故事。

<div class="ap-m-code-snippet"><pre>[example preview="top-frame"
         orientation="portrait"
         playground="true"]
    ```html
    <head>
      <script async custom-element="amp-story"
          src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
      <style amp-custom>
        body {
          font-family: 'Roboto', sans-serif;
        }
        amp-story-page {
          background: white;
        }
      </style>
    </head>
    <body>
      <amp-story standalone>
        <amp-story-page id="cover">
          <amp-story-grid-layer template="vertical">
            <h1>Hello World</h1>
            <p>This is the cover page of this story.</p>
          </amp-story-grid-layer>
        </amp-story-page>
        <amp-story-page id="page-1">
          <amp-story-grid-layer template="vertical">
            <h1>First Page</h1>
            <p>This is the first page of this story.</p>
          </amp-story-grid-layer>
        </amp-story-page>
      </amp-story>
    </body>
    ```
  [/example]</pre></div>

实际效果如下：

[example preview="top-frame"
orientation="portrait"
playground="true"]

```html
<head>
  <script
    async
    custom-element="amp-story"
    src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
  ></script>
  <style amp-custom>
    body {
      font-family: 'Roboto', sans-serif;
    }
    amp-story-page {
      background: white;
    }
  </style>
</head>
<body>
  <amp-story standalone>
    <amp-story-page id="cover">
      <amp-story-grid-layer template="vertical">
        <h1>Hello World</h1>
        <p>This is the cover page of this story.</p>
      </amp-story-grid-layer>
    </amp-story-page>
    <amp-story-page id="page-1">
      <amp-story-grid-layer template="vertical">
        <h1>First Page</h1>
        <p>This is the first page of this story.</p>
      </amp-story-grid-layer>
    </amp-story-page>
  </amp-story>
</body>
```

[/example]

### AMP 电子邮件的绝对网址

注意我们如何在嵌入到 AMP 电子邮件中时使用 <code>{{server_for_email}}</code> 来使端点网址绝对化。

<div class="ap-m-code-snippet"><pre>[example preview="top-frame" playground="true"]
    ```html
    <div class="resp-img">
      <amp-img alt="flowers"
        src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
        layout="responsive"
        width="640"
        height="427"></amp-img>
    </div>
    ```
  [/example]</pre></div>

实际效果如下：

[example preview="top-frame" playground="true"]

```html
<div class="resp-img">
  <amp-img
    alt="flowers"
    src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
    layout="responsive"
    width="640"
    height="427"
  ></amp-img>
</div>
```

[/example]

### 转义 mustache 模板

下面是一个使用远程端点的 `top-frame` 示例。需要使用 <code>{% raw %}</code> 和 <code>{% endraw %}</code> 在示例中转义 mustache 模板：

<div class="ap-m-code-snippet">
  <pre>[example preview="top-frame"
        playground="true"
        imports="amp-list:0.1"
        template="amp-mustache:0.2"]
    ```html
    <amp-list width="auto" height="100" layout="fixed-height"
      src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json">
      <template type="amp-mustache">{% raw %}
        <div class="url-entry">
          <a href="{{url}}">{{title}}</a>
        </div>
      {% endraw %}
      </template>
    </amp-list>
    ```
[/example]</pre>
</div>

实际效果如下：

[example preview="top-frame"
playground="true"
imports="amp-list:0.1"
template="amp-mustache:0.2"]

```html
<amp-list
  width="auto"
  height="100"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json"
>
  <template type="amp-mustache"
    >{% raw %}
    <div class="url-entry">
      <a href="{{url}}">{{title}}</a>
    </div>
    {% endraw %}
  </template>
</amp-list>
```

[/example]

## 链接

您可以使用标准的 markdown 链接语法链接到其他网页：

```md
[link](../../../courses/beginning-course/index.md)
```

链接到 amp.dev 上的另一个网页时，引用将是目标文件的相对文件路径。

### 锚点

使用锚点链接到文档中的特定部分：

```md
[link to example section](#example-section)
```

在链接到不存在锚点的部分之前，请使用 `<a name="#anchor-name></a>` 创建锚点目标。该部分标题的末尾是一个合适的位置：

```html
## Example section <a name="example-section"></a>
```

您只能在锚点中使用字母、数字、短划线和下划线。请使用与标题相匹配或描述该部分的英语短锚点名称。确保锚点名称在文档中唯一。

翻译网页时，锚点名称不得更改且必须保持英语状态。

当您创建将在另一个网页的链接中使用的锚点时，也应在所有翻译中创建相同的锚点。

### AMP 格式筛选器

可以按 AMP 格式（例如 AMP 网站或 AMP 故事）筛选组件文档、指南、教程和示例。链接到此类网页时，应通过将格式参数附加到链接来显式指定目标支持的格式：

```md
[link](../../learn/amp-actions-and-events.md?format=websites)
```

只有确定目标支持网页支持的**所有**格式时，您才能省略该参数。

### 组件引用

如果您的链接省略了版本部分，则组件引用文档的链接将自动指向最新版本。当您希望明确指向某个版本时，请指定全名：

```md
[latest version](../../../components/reference/amp-carousel.md?format=websites)
[explicit version](../../../components/reference/amp-carousel-v0.2.md?format=websites)
```

## 文档结构

### 文档标题、章节标题和副标题

文档标题、章节标题和副标题中第一个单词的首字母大写，后面的字母小写。例外包括 AMP 和其他专有名词。章节标题不能为 `Introduction`，简介跟在文档标题后面。

### 文档命名

使用短划线命名约定为文档命名。

<table>
  <tr>
   <td>
<strong>正确做法</strong>
   </td>
   <td>
<strong>错误做法</strong>
   </td>
  </tr>
  <tr>
   <td>hello-world-tutorial.md</td>
   <td>hello_world_tutorial.md</td>
  </tr>
  <tr>
   <td>website-fundamentals.md</td>
   <td>websiteFundamentals.md</td>
  </tr>
  <tr>
   <td>actions-and-events.md</td>
   <td>actionsandevents.md</td>
  </tr>
</table>
