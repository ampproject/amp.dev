---
$title: amp-mustache
$category@: dynamic-content
teaser:
  text: 允许呈现 Mustache.js 模板。
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



允许呈现 [Mustache.js](https://github.com/janl/mustache.js/)。

<table>
  <tr>
    <td width="40%"><strong>必需的脚本</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js">&lt;/script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>示例</strong></td>
    <td>请参阅 AMP By Example 的 <a href="https://ampbyexample.com/components/amp-mustache/">amp-mustache </a>示例（带注释）。</td>
  </tr>
</table>


## 版本说明 <a name="version-notes"></a>

| 版本 | 说明 |
|-------|-----|
| 0.2 | 新增了对 `<svg>` 元素的支持，同时缩小了软件包大小（从 20.5KB 缩写到了 12.2KB，经过了 Gzip 压缩）。迁移到更新型的 HTML 排错程序库（从 Caja 迁移到 DOMPurify）。由于标记和属性白名单之间的差异，这可能会导致轻微的破坏性更改。我们建议您先测试网页，然后再推送到生产环境，以确保对生成的标记造成的更改不会影响功能。 |
| 0.1 | 初始实现版本。 |

## 语法 <a name="syntax"></a>

Mustache 是一种无逻辑模板语法。如需了解详情，请参阅 [Mustache.js 文档](https://github.com/janl/mustache.js/)。下面是一些核心的 Mustache 标记：

* {% raw %}`{{variable}}`{% endraw %}：变量标记。输出变量的 HTML 转义值。
*  {% raw %}`{{#section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}：版块标记。可以测试变量是否存在，如果变量为数组，则对其进行迭代。
* {% raw %}`{{^section}}`{% endraw %}{% raw %}`{{/section}}`{% endraw %}：反向标记。可以测试变量是否不存在。
* {% raw %}`{{{unescaped}}}`{% endraw %}：非转义 HTML。可能输出的标记受到限制（请参阅下面的“限制”）。

## 用法 <a name="usage"></a>

`amp-mustache` 模板的定义和使用必须符合 [AMP 模板规范](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-html-templates.md)。

首先，必须按如下所示声明/加载 `amp-mustache`：

```html
<script src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js" async="" custom-template="amp-mustache"></script>
```

然后，可以在 `script` 或 `template` 标记中定义 Mustache 模板，如下所示：

[sourcecode:html]
{% raw %}<!-- 使用 template 标记。 -->
<template type="amp-mustache">
  Hello {{world}}!
</template>
{% endraw %}[/sourcecode]
或

<!-- 使用 script 标记。 -->
[sourcecode:html]
{% raw %}<script type="text/plain" template="amp-mustache">
  Hello {{world}}!
</script>
{% endraw %}[/sourcecode]

请尽可能使用 `template` 标记，因为 AMP 验证可提供实用的 dev-x 提示。可以使用 `script` 模板在表格上下文中处理极端情况以及模板问题。请参阅下面的“表格”部分，了解更多详情。

如何发现模板、何时呈现模板、如何提供数据，这些都取决于使用此模板呈现其内容的目标 AMP 元素（例如 [amp-list](amp-list.md)、[amp-form](amp-form.md) 等）。

## 限制 <a name="restrictions"></a>

### 验证 <a name="validation"></a>

与所有 AMP 模板一样，`amp-mustache` 模板必须是格式正确的 DOM 片段。这意味着您无法使用 `amp-mustache` 执行一些操作，其中包括：

* 计算标记名称。例如，不允许使用 {% raw %}`<{{tagName}}>`{% endraw %}。
* 计算属性名称。例如，不允许使用 {% raw %}`<div {{attrName}}=something>`{% endraw %}。

系统会对“triple-mustache”的输出进行排错处理，以便仅允许以下标记：`a`、`b`、`br`、`caption`、`colgroup`、`code`、`del`、`div`、`em`、`i`、`ins`、`li`、`mark`、`ol`、`p`、`q`、`s`、`small`、`span`、`strong`、`sub`、`sup`、`table`、`tbody`、`time`、`td`、`th`、`thead`、`tfoot`、`tr`、`u`、`ul`。

### 排错 <a name="sanitization"></a>

为了确保安全性并维持 AMP 有效性，系统会对 Mustache 输出进行排错处理。这可能会导致某些元素和属性被静默移除。

## 问题 <a name="pitfalls"></a>

### 嵌套模板 <a name="nested-templates"></a>

根据 AMP 验证，`<template>` 元素不得是其他 `<template>` 元素的子级。嵌套两个使用模板的组件（例如 `amp-list` 和 `amp-form`）时会出现这种情况。

为了解决这个问题，`<template>` 元素也可以通过组件的 `template` 属性由 `id` 引用。例如：

[sourcecode:html]
{% raw %}<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}[/sourcecode]


也可以表示为：

[sourcecode:html]
{% raw %}<!-- 外化模板以避免嵌套。 -->
<template type="amp-mustache" id="myTemplate">
  <div>{{title}}</div>
</template>

<amp-list id="myList" src="https://foo.com/list.json" template="myTemplate">
</amp-list>
{% endraw %}[/sourcecode]

### 表格 <a name="tables"></a>

由于必须在 `<template>` 元素中指定 AMP 模板字符串，因此这可能会因浏览器解析而导致发生意外行为。例如，`<table>` 元素可能导致为文本[建立父级](https://www.w3.org/TR/html5/syntax.html#unexpected-markup-in-tables)。在以下示例中：

[sourcecode:html]
{% raw %}<template type="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
    </tr>
  </table>
</template>
{% endraw %}[/sourcecode]

浏览器将为文本节点 {% raw %}`{{#foo}}`{% endraw %} 和 {% raw %}`{{/foo}}`{% endraw %} 建立父级：

[sourcecode:html]
{% raw %}{{#foo}}
{{/foo}}
<table>
  <tr>
    <td></td>
  </tr>
</table>
{% endraw %}[/sourcecode]

解决办法包括将 Mustache 部分包含在 HTML 注释中（例如 {% raw %}`<!-- {{#bar}} -->`{% endraw %}）、改用像 `<div>` 这样的非表格元素，或者使用 `<script type="text/plain">` 标记定义您的模板。

[sourcecode:html]
{% raw %}<script type="text/plain" template="amp-mustache">
  <table>
    <tr>
      {{#foo}}<td></td>{{/foo}}
    </tr>
  </table>
</script>
{% endraw %}[/sourcecode]

### 英文引号转义 <a name="quote-escaping"></a>

使用 `amp-mustache` 计算属性值时，英文引号转义可能是一个问题。例如：

[sourcecode:html]
{% raw %}<template type="amp-mustache">
<!-- 在 foo 中使用英文双引号 (") 将导致 HTML 格式不正确。 -->
<amp-img alt="{{foo}}" src="example.jpg" width="100" height="100"></amp-img>

<!-- 在 bar 中使用英文单引号 (') 或英文双引号 (") 将导致 AMP runtime 解析错误。 -->
<button on="tap:AMP.setState({foo: '{{bar}}'})">Click me</button>
</template>
{% endraw %}[/sourcecode]

在 {% raw %}`{{foo}}`{% endraw %} 或 {% raw %}`{{bar}}`{% endraw %} 变量中使用 HTML 字符代码将不起作用，这是因为 Mustache 将对 `&amp;` 字符进行 HTML 转义（例如 `&quot;` -&gt; `&amp;quot;`）。一种解决办法是使用传真字符，例如 ′ (`&prime;`) 和 ″ (`&Prime;`)。

有一个[开放的提议](https://github.com/ampproject/amphtml/issues/8395)就是，改为在 `amp-mustache` 中执行这种替换。如果您想协助我们解决此问题，请提供评论。

### HTML 实体 <a name="html-entities"></a>

HTML 实体不会保留在 `<template>` 元素中。

如果您希望在服务器端呈现包含用户生成的文本的 `<template>`，则可能会出现问题，这是因为用户生成的包含 {% raw %}`{{`、`}}`、`{{{`、`}}}`{% endraw %} 的文本会被视为 Mustache 部分。例如，将 {% raw %}`{{`{% endraw %} 替换为 HTML 实体 `&lcub;&lcub;` 将不起作用，这是因为浏览器解析 `<template>` 时不会保留这些实体。

解决办法包括将 {% raw %}`{{`{% endraw %} 等字符串替换为其他字符，或者直接从用户生成的内容中删除它们。

## 验证 <a name="validation-1"></a>

请参阅 AMP 验证工具规范中的 [amp-mustache 规则](https://github.com/ampproject/amphtml/blob/main/extensions/amp-mustache/validator-amp-mustache.protoascii)。
