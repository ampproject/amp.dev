---
$title: amp-list
$category@: dynamic-content
teaser:
  text: 动态下载数据并使用模板创建列表项。
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



从 CORS JSON 端点动态获取内容并使用所提供的模板呈现内容。

<table>
  <tr>
    <td width="40%"><strong>必需的脚本</strong></td>
    <td><code>&lt;script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">支持的布局</a></strong></td>
    <td>fill、fixed、fixed-height、flex-item、nodisplay、responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>示例</strong></td>
    <td>请参阅 AMP By Example 的 <a href="https://ampbyexample.com/components/amp-list/">amp-list 示例</a>。</td>
  </tr>
</table>

## 用法 <a name="usage"></a>

`<amp-list>` 组件可从 CORS JSON 端点获取动态内容。端点的响应包含在指定模板中呈现的数据。

[tip type="important"]
端点必须符合 [AMP 中的 CORS 请求](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)规范中规定的要求。
[/tip]

您可以通过以下两种方式之一指定模板：

* 利用 `template` 属性引用现有 `template` 或 `script` 元素的 ID。
* 在 `amp-list` 元素中直接嵌套 `template` 或 `script` 元素。

如需详细了解模板，请参阅 [AMP HTML 模板](https://github.com/ampproject/amphtml/blob/main/spec/amp-html-templates.md)。

*示例：显示动态列表*

在以下示例中，我们将检索包含网址和标题的 JSON 数据，并在嵌套的 [amp-mustache 模板](amp-mustache.md)中呈现内容。

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="100"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-urls.json">
  <template type="amp-mustache">{% raw %}
    <div class="url-entry">
      <a href="{{url}}">{{title}}</a>
    </div>
  {% endraw %}</template>
</amp-list>
```
[/example]

以下是我们使用的 JSON 文件：

```json
{
 "items": [
   {
     "title": "AMP YouTube Channel",
     "url": "https://www.youtube.com/channel/UCXPBsjgKKG2HqsKBhWA4uQw"
   },
   {
     "title": "AMP.dev",
     "url": "https://amp.dev/"
   },
   {
     "title": "AMP Validator",
     "url": "https://validator.amp.dev/"
   },
   {
     "title": "AMP Playground",
     "url": "https://playground.amp.dev/"
   }
 ]
}
```
以下代码展示了我们如何对获取的内容进行样式设置：

```css
amp-list div[role="list"] {
  display: grid;
  grid-gap: 0.5em;
  }
```

## 行为 <a name="behavior"></a>

即使文档是通过 AMP 缓存提供的，请求也始终通过客户端发出。加载是使用常规 AMP 规则触发的，具体取决于元素与当前视口的距离。

如果 `<amp-list>` 在加载后需要更多空间，它会请求 AMP runtime 使用常规 AMP 流更新其高度。如果 AMP runtime 无法满足更新高度的要求，它会在条件允许时显示 `overflow` 元素。但请注意，通常放置在文档底部的 `<amp-list>` 元素几乎始终能保证 AMP runtime 可以调整它们的大小。

默认情况下，`<amp-list>` 会向 list 元素添加 `list` ARIA 角色，还会向通过模板呈现的 item 元素添加 `listitem` 角色。

### XHR 批处理 <a name="xhr-batching"></a>

AMP 会将 XMLHttpRequest (XHR) 批处理到 JSON 端点，也就是说，您可以在 AMP 网页上将单个 JSON 数据请求用作多个使用方（如多个 `<amp-list>` 元素）的数据源。例如，如果您的 `<amp-list>` 向某个端点发出 XHR，那么在该 XHR 传输期间，向同一端点发送的所有后续 XHR 都不会触发，而只会返回第一个 XHR 的结果。

在 `<amp-list>` 中，您可以使用 [`items`](#items-optional) 属性呈现一部分 JSON 响应，这样便可使多个 `<amp-list>` 元素呈现不同的内容，却共享一个 XHR。

### 指定 overflow <a name="specifying-an-overflow"></a>

`<amp-list>` 元素可以选择性地包含具有 `overflow` 属性的元素。如果 AMP runtime 不能按照请求调整 `<amp-list>` 元素的大小，则此元素会一直显示。

*示例：在列表需要更多空间时显示 overflow*

在下面的示例中，我们显示了一系列图片和标题。由于 `<amp-list>` 内容需要的空间多于可用空间，AMP runtime 将显示 overflow 元素。

[example preview="inline" playground="true" imports="amp-list" template="amp-mustache"]
```html
<amp-list width="auto"
  height="140"
  layout="fixed-height"
  src="{{server_for_email}}/static/inline-examples/data/amp-list-data.json">
  <template type="amp-mustache">{% raw %}
    <div class="image-entry">
      <amp-img src="{{imageUrl}}"
        width="100"
        height="75"></amp-img>
      <span class="image-title">{{title}}</span>
    </div>
  {% endraw %}</template>
  <div overflow
    class="list-overflow">
    See more
  </div>
</amp-list>
```
[/example]

以下是 `overflow` 的 CSS：

```css
.list-overflow[overflow] {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  }
```

### 占位符和后备元素 <a name="placeholder-and-fallback"></a>

`<amp-list>` 可以选择性地支持占位符和/或后备元素。

* 占位符是具有 `placeholder` 属性的子元素。**在 `<amp-list>` 加载成功前，此元素会一直显示。如果还提供了后备元素，则占位符会在 `<amp-list>` 无法加载时隐藏。
* 后备元素是具有 `fallback` 属性的子元素。**此元素会在 `<amp-list>` 无法加载时显示。

如需了解详情，请参阅[占位符和后备行为](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)。请注意，子元素不能既是占位符又是后备元素。

```html
<amp-list src="https://foo.com/list.json">
  <div placeholder>Loading ...</div>
  <div fallback>Failed to load data.</div>
</amp-list>
```

### 刷新数据 <a name="refreshing-data"></a>

`<amp-list>` 元素提供了 `refresh` 操作，可供其他元素在 `on="tap:..."` 属性中引用。

```html
{% raw %}<button on="tap:myList.refresh">Refresh List</button>
<amp-list id="myList" src="https://foo.com/list.json">
  <template type="amp-mustache">
    <div>{{title}}</div>
  </template>
</amp-list>
{% endraw %}
```

### 动态调整大小 <a name="dynamic-resizing"></a>

##### 实验性：amp-list-resizable-children <a name="experiment-amp-list-resizable-children"></a>

在某些情况下，我们可能需要使用 `<amp-list>` 来调整用户互动的大小。例如，当 `<amp-list>` 包含用户可以点按的 amp-accordion 时，当 `<amp-list>` 的内容因绑定的 CSS 类而更改大小时，或者当 `<amp-list>` 内的项目数因绑定的 `[src]` 属性而发生更改时。`changeToLayoutContainer` 操作处理这些情况的方式是：在触发此操作时将 amp list 更改为 `layout="CONTAINER"`。请参见以下示例：

```html
{% raw %}<button on="list.changeToLayoutContainer()">Show Grid</button>
<amp-list id="list"
          width="396" height="80" layout="responsive"
          src="/test/manual/amp-list-data.json?RANDOM">
  <template type="amp-mustache">
    {{title}}
  </template>
</amp-list>
{% endraw %}
```

此操作可在 `amp-list-resizable-children` 下以实验性方式执行。

## 属性 <a name="attributes"></a>

##### src（必需） <a name="src-required"></a>

将返回 JSON（会在此 `<amp-list>` 中呈现）的远程端点的网址。这必须是 CORS HTTP 服务。网址的协议必须为 HTTPS。

[tip type="important"]
端点必须符合 [AMP 中的 CORS 请求](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)规范中规定的要求。
[/tip]

如果 `[src]` 属性存在，则可省略 `src` 属性。使用 [`amp-bind`](amp-bind.md) 时，在依据用户手势（而不是页面加载）呈现内容时，这非常有用。

##### credentials（可选） <a name="credentials-optional"></a>

定义 [Fetch API](https://fetch.spec.whatwg.org/) 指定的 `credentials` 选项。

* 支持的值：`omit`、`include`
* 默认值：`omit`

要发送凭据，请传递 `include` 值。如果设置了此值，则响应必须遵循 [AMP CORS 安全准则](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp)。

以下示例指定在列表中包含凭据，以显示个性化内容：

```html
{% raw %}
<amp-list credentials="include"
          src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)">
  <template type="amp-mustache">
    Your personal offer: ${{price}}
  </template>
</amp-list>
{% endraw %}
```

##### items（可选） <a name="items-optional"></a>

定义表达式以定位要在响应中呈现的数组。这是带点标记的表达式，可通过 JSON 响应的字段进行导航。默认情况下，`<amp-list>` 需要用到数组，`single-item` 属性可用于从对象加载数据。

* 默认值为 `"items"`。预期响应：`{items: [...]}`。
* 如果响应本身为所需的数组，请使用 `"."` 值。预期响应为：`[...]`。
* 允许嵌套导航（例如 `"field1.field2"`）。预期响应为：`{field1: {field2: [...]}}`。

如果指定 `items="items"`（默认），则响应必须是包含名为 `"items"` 的数组属性的 JSON 对象：
```text
{
  "items": [...]
}
```

#### max-items（可选） <a name="max-items-optional"></a>

一个整数值，用于指定要呈现的 items 数组的长度上限。如果返回的值超过 `max-items`，则 `items` 数组将截断为包含 `max-items` 个条目。

#### single-item（可选） <a name="single-item-optional"></a>

使 `<amp-list>` 将返回的结果视为单个元素数组。对象响应将封装在一个数组中，这样一来，`{items: {...}}` 就会像 `{items: [{...}]}` 一样发挥作用。

#### reset-on-refresh（可选） <a name="reset-on-refresh-optional"></a>

通过 `amp-bind` 或 `refresh()` 操作刷新列表的来源时，系统将再次显示加载指示符和占位符。

默认情况下，此操作仅在执行引起网络抓取的刷新时触发。要重置所有刷新，请使用 `reset-on-refresh="always"`。

#### [is-layout-container] （实验性，可选） <a name="binding-optional"></a>

这是一个可绑定的属性，默认情况下应始终为 false。通过 `bind` 设置为 true 后，该属性会将 `<amp-list>` 的布局更改为 `CONTAINER` 布局。此属性对处理 amp-list 的动态大小调整很有用。默认情况下，此属性不能为 true，原因与 `<amp-list>` 不支持 `CONTAINER` 布局的原因相同：可能导致在首次加载时发生内容跳转。此属性可在 `amp-list-resizable-children` 下以实验性方式提供。或者，也可以使用 `changeToLayoutContainer` 操作。

#### binding（可选） <a name="is-layout-container-optional"></a>

对于同时使用 `<amp-list>` 和 `amp-bind` 的网页，该属性用于控制是否在呈现子级中评估绑定（如 `[text]`）时阻止呈现。

我们建议您使用 `binding="no"` 或 `binding="refresh"` 来加快速度。

* `binding="no"`：永不阻止呈现**（最快）**。
* `binding="refresh"`：在初始加载时不阻止呈现**（较快）**。
* `binding="always"`：始终阻止呈现**（慢）**。

如未提供 `binding` 属性，则默认值为 `always`。

## 实验性：加载更多与无限滚动 (amp-list-load-more) <a name="common-attributes"></a>

我们向 `<amp-list>` 引入了 `amp-list-load-more` 实验，旨在实现分页和无限滚动。要启用此功能，您可以在[实验页面](https://cdn.ampproject.org/experiments.html)中开启“amp-list-load-more”实验，然后将 `load-more` 属性添加到 `<amp-list>`。这是当前处于原始试用状态的一项功能，最终 API 可能会发生变化。

#### 用法示例 <a name="load-more-and-infinite-scroll"></a>

```html
<amp-list height="200" src="https://my.rest.endpoint/" width="100" load-more="auto">
  <template type="amp-mustache">
    // ...
  </template>
</amp-list>

```

如需查看有用示例，请访问 [test/manual/amp-list/infinite-scroll-1.amp.html](https://github.com/ampproject/amphtml/blob/main/test/manual/amp-list/infinite-scroll-1.amp.html) 和 [test/manual/amp-list/infinite-scroll-2.amp.html](https://github.com/ampproject/amphtml/blob/main/test/manual/amp-list/infinite-scroll-1.amp.html)。

### 属性 <a name="sample-usage"></a>

#### load-more（必需） <a name="attributes-1"></a>

此属性接受两个值：“auto”或“manual”。如果将此属性的值设置为“manual”，则 `<amp-list>` 末尾会显示“load-more”按钮。如果将此属性的值设置为“auto”，则 `<amp-list>` 会自动向下三个视口加载更多元素，以实现无限滚动效果。

#### load-more-bookmark（可选） <a name="load-more-mandatory"></a>

此属性指定返回数据中的字段名称，这些数据包含要加载的下一个 items 的网址。如未指定此属性，`<amp-list>` 会要求 json 负载包含 `load-more-src` 字段（对应于要加载的下一个网址）。为防止此字段被命名为其他名称，您可以通过 `load-more-bookmark` 字段指定该字段的名称。例如，在下面的示例负载中，我们会指定 `load-more-bookmark="next"`。

```
{ "items": [...], "next": "https://url.to.load" }
```

### 自定义 load-more 元素 <a name="load-more-bookmark-optional"></a>

带有 `load-more` 属性的 `<amp-list>` 包含以下界面元素：load-more 按钮、加载程序、load-failed 元素以及用于标记列表末尾的可选结尾画面。这些元素可进行自定义，方法是使用以下属性将 `<amp-list-load-more>` 元素作为 `<amp-list>` 的子元素提供：

#### load-more-button <a name="customizing-load-more-elements"></a>

这是带有 `load-more-button` 属性的 `<amp-list-load-more>` 元素，如果还有更多元素可以加载，那么该元素会显示在列表末尾（对于 manual load-more）。点击此元素会触发抓取，以便从 `load-more-src` 字段或返回数据的字段（与 `load-more-bookmark` 属性对应）所包含的网址中加载更多元素。此元素可进行自定义，方法是为 `<amp-list>` 提供具有 `load-more-button` 属性的子元素。

##### 示例： <a name="load-more-button"></a>

```html
<amp-list load-more="manual" src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-button>
    <button>See More</button> /* 我的自定义“查看更多”按钮 */
  </amp-list-load-more>
</amp-list>
```
  它可通过 `amp-mustache` 进行模板化。

##### 示例： <a name="example"></a>

```html
{% raw %}<amp-list load-more="auto" width="100" height="500" src="https://www.load.more.example.com/">
  ...
  <amp-list-load-more load-more-button>
    <template type="amp-mustache">
      Showing {{#count}} out of {{#total}} items
      <button>
        Click here to see more!
      </button>
    </template>
  </amp-list-load-more>
</amp-list>
{% endraw %}
```

#### load-more-loading <a name="example-1"></a>

此元素是一个加载程序，会在以下情况显示：用户到达列表末尾且内容仍处于加载状态，或者点击了 `load-more-button` 元素且 `<amp-list>` 的新子元素仍处于加载状态。此元素可进行自定义，方法是为 `<amp-list>` 提供具有 `load-more-loading` 属性的子元素。示例如下：
```html
<amp-list load-more=auto src="https://www.load.more.example.com/" width="400" height="800">
  ...
  <amp-list-load-more load-more-loading>
    <svg>...</svg> /* 我的自定义加载程序 */
  </amp-list-load-more>
</amp-list>
```

#### load-more-failed <a name="load-more-loading"></a>

这是带有 `load-more-failed` 属性的 `<amp-list-load-more>` 元素；该属性包含带有 `load-more-clickable` 属性的按钮，如果加载失败，该按钮会显示在 `<amp-list>` 末尾。点击此元素会触发失败的网址进行重新加载。此元素可进行自定义，方法是为 `<amp-list>` 提供具有 `load-more-failed` 属性的子元素。示例如下：

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <button>Unable to Load More</button>
  </amp-list-load-more>
</amp-list>
```

在上面的示例中，整个 `load-more-failed` 元素都是可点击的。不过，此元素通常会采用如下模式：在一个通常无法点击的“loading failed”元素中添加可点击的“reload”按钮。为了解决此问题，您可以为一个通常无法点击的元素添加包含 `load-more-clickable` 元素的按钮。例如：

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-failed>
    <div>
      Here is some unclickable text saying sorry loading failed.
    </div>
    <button load-more-clickable>Click me to reload!</button>
  </amp-list-load-more>
</amp-list>
```

#### load-more-end <a name="load-more-failed"></a>

默认情况下不提供该元素，但如果带有 `load-more-end` 属性的 `<amp-list-load-more>` 元素作为子元素附加到 `<amp-list>`，则此元素将显示在 `<amp-list>` 的底部（如果没有其他项）。此元素可通过 `amp-mustache` 进行模板化。示例如下：

```html
<amp-list load-more="auto" src="https://www.load.more.example.com/" width="200" height="500">
  ...
  <amp-list-load-more load-more-end>
    Congratulations! You've reached the end. /* 自定义“加载结束”元素 */
  </amp-list-load-more>
</amp-list>
```

##### 常见属性 <a name="load-more-end"></a>

此元素包含扩展到 AMP 组件的[常见属性](../../../documentation/guides-and-tutorials/learn/common_attributes.md)。

## 替换 <a name="substitutions"></a>

`<amp-list>` 支持所有标准网址变量替换。如需了解详情，请参阅[替换指南](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md)。

例如：
```html
<amp-list src="https://foo.com/list.json?RANDOM"></amp-list>
```
可以向 `https://foo.com/list.json?0.8390278471201` 这样的网址（其中的 RANDOM 值在每次展示时随机生成）发出请求。

## 验证 <a name="validation"></a>

请参阅 AMP 验证工具规范中的 [amp-list 规则](https://github.com/ampproject/amphtml/blob/main/extensions/amp-list/validator-amp-list.protoascii)。
,false,true
