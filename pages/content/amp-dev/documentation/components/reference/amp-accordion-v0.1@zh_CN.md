---
$title: amp-accordion
$category@: layout
teaser:
  text: 提供一种方式，让观看者可以大致了解网页内容并随意跳至想查看的部分。
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



提供一种方式，让观看者可以大致了解网页内容并跳至任意部分。对于甚至连一个部分中的几个句子都需要滚动才能完整显示的移动设备来说，这非常有用。

<table>
  <tr>
    <td class="col-fourty"><strong>必需的脚本</strong></td>
    <td><code>&lt;script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">支持的布局</a></strong></td>
    <td>container</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>示例</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-accordion/">amp-accordion 代码示例（带注释）</a></td>
  </tr>
</table>


## 行为 <a name="behavior"></a>

借助 `amp-accordion` 组件，您能够显示可收起和可展开的内容部分。`amp-accordion` 组件的每个直接子级均被视为可折叠内容中的一个部分。每个节点都必须是 `<section>` 标记。

* `amp-accordion` 可以包含一个或多个 `<section>` 元素作为其直接子级。
* 每个 `<section>` 都必须正好包含两个直接子级。
* 某个部分的第一个子级表示该部分的标题，且必须是标题元素（`h1`、`h2`、…、`h6`、`header` 之一）。
* 某个部分的第二个子级可以是 AMP HTML 中允许的任何标记，表示该部分的内容。
* 点击/点按某个部分的标题即可展开或收起相应部分。
* `amp-accordion` 元素中每个部分的收起/展开状态会保存下来供会话级别使用。要选择不保存此状态，请向 `amp-accordion` 元素添加 `disable-session-states` 属性。

#### 示例：显示可折叠内容 <a name="example-displaying-an-accordion"></a>

在此示例中，我们显示了三个部分，其中第三个部分会在网页加载时展开。此外，我们通过设置 `disable-session-states` 选择不保存收起/展开状态。

[example preview="inline" playground="true" imports="amp-accordion"]
```html
<amp-accordion{% if not format=='email'%} disable-session-states{% endif %}>
  <section>
    <h2>Section 1</h2>
    <p>Content in section 1.</p>
  </section>
  <section>
    <h2>Section 2</h2>
    <div>Content in section 2.</div>
  </section>
  <section expanded>
    <h2>Section 3</h2>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/squirrel.jpg"
      width="320"
      height="256"></amp-img>
  </section>
</amp-accordion>
```
[/example]

[tip type="ll callout('提示：</b><a class="type_success"]
如需查看 `amp-accordion` 的更多演示，请访问 [AMP By Example](https://ampbyexample.com/components/amp-accordion/)。
[/tip]

### 事件 <a name="events"></a>

以下事件会在 `accordion` 的 `section` 上触发。

<table>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>此事件会在从收起状态更改为展开状态的目标 <code>section</code>  上触发。请注意，在已展开的 <code>section</code>  上调用 <code>expand</code> 不会触发此事件。</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>collapse</code></strong></td>
    <td>此事件会在从展开状态更改为收起状态的目标 <code>section</code>  上触发。请注意，在已收起的 <code>section</code>  上调用 <code>collapse</code> 不会触发此事件。</td>
  </tr>
</table>

### 操作 <a name="actions"></a>

<table>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>此事件会在从收起状态更改为展开状态的目标 <code>section</code> 上触发。请注意，在已展开的 <code>section</code> 上调用 <code>expand</code> 不会触发此事件。</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>toggle</code></strong></td>
    <td>此操作会在 <code>amp-accordion</code> 的 <code>expanded</code> 和 <code>collapsed</code> 状态之间切换。如果不使用参数进行调用，此操作会在可折叠内容的所有部分之间切换。可以使用 <code>section</code> 参数指定单个部分，并使用对应 <code>id</code> 作为值。</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expand</code></strong></td>
    <td>此操作可展开 <code>amp-accordion</code>。如果已执行 <code>expanded</code> 操作，相应部分将保持展开状态。如果不使用参数进行调用，此操作会展开可折叠内容的所有部分。可以使用 <code>section</code> 参数指定单个部分，并使用对应 <code>id</code> 作为值。</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>collapse</code></strong></td>
    <td>此操作可收起 <code>amp-accordion</code>。如果已收起，相应部分将保持收起状态。如果不使用参数进行调用，此操作会收起可折叠内容的所有部分。可以使用 <code>section</code> 参数指定单个部分，并使用对应 <code>id</code> 作为值。</td>
  </tr>
</table>

#### 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong><code>animate</code></strong></td>
    <td>在 <code>&lt;amp-accordion&gt;</code> 上设置此属性可以动画形式展开/收起所有可折叠部分。</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>disable-session-states</code></strong></td>
    <td>在 <code>&lt;amp-accordion&gt;</code> 上设置此属性可选择不保存可折叠内容的收起/展开状态。</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expanded</code></strong></td>
    <td>在 <code>&lt;section&gt;</code> 上设置此属性可在网页加载时展开显示相应部分。</td>
  </tr>
  <tr>
    <td width="40%"><strong><code>expand-single-section</code></strong></td>
    <td>在 <code>&lt;amp-accordion&gt;</code> 上设置此属性可一次仅展开一个 <code>&lt;section&gt;</code>。如果用户将焦点放在某个 <code>&lt;section&gt;</code>，那么之前已展开的所有其他 <code>&lt;section&gt;</code> 都将收起。</td>
  </tr>
</table>

## 样式设置 <a name="styling"></a>

* 您可以使用 `amp-accordion` 元素选择器自由设置样式。
* `amp-accordion` 元素始终为 `display: block`。
* `<section>`、标题和内容元素无法浮动。
* 展开某个部分后，该 `<section>` 元素就具有 `expanded` 属性。
* 内容元素通过 `overflow: hidden` 明确固定，因此不能有滚动条。
* `<amp-accordion>`、`<section>`、标题和内容元素的外边距设为 0，这些值可在自定义样式中替换。
* 标头和内容元素都是 `position: relative`。

## 验证 <a name="validation"></a>

请参阅 AMP 验证工具规范中的 [amp-accordion 规则](https://github.com/ampproject/amphtml/blob/master/extensions/amp-accordion/validator-amp-accordion.protoascii)。
