---
$title: amp-selector
$category@: dynamic-content
teaser:
  text: 表示一种控件，可显示选项菜单并让用户从中选择。
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



表示一种控件，可显示选项菜单并让用户从中选择。

<table>
  <tr>
    <td class="col-fourty" width="40%"><strong>必需的脚本</strong></td>
    <td><code>&lt;script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">支持的布局</a></strong></td>
    <td>所有</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>示例</strong></td>
    <td>请参阅 AMP By Example 的 <a href="https://ampbyexample.com/components/amp-selector/">amp-selector 示例</a>。</td>
  </tr>
</table>


## 行为 <a name="behavior"></a>

AMP 选择器是一种控件，可显示一系列选项并让用户从中选择一个或多个选项；选项内容不只局限于文本。

* `amp-selector` 可以包含任意 HTML 元素或 AMP 组件（如 `amp-carousel`、`amp-img` 等）。
* `amp-selector` 不能包含任何嵌套 `amp-selector` 控件。
* 可通过向元素添加 `option` 属性并为该属性分配值，来设置可供选择的选项（如 `<li option='value'></li>`）。
* 可通过向元素添加 `disabled` 属性，来设置处于停用状态的选项（如 `<li option='d' disabled></li>`）。
* 可通过向元素添加 `selected` 属性，来设置预先选中的选项（如 `<li option='b' selected></li>`）。
* 要支持选择多个选项，请向 `amp-selector` 元素添加 `multiple` 属性。默认情况下，`amp-selector` 允许一次选择一个选项。
* 要停用整个 `amp-selector`，请向 `amp-selector` 元素添加 `disabled` 属性。
* 当 `amp-selector` 包含 `name` 属性且 `amp-selector` 位于 `form` 标记内时，如果表单上发生提交事件，则 `amp-selector` 的行为与单选按钮/复选框组类似，并会根据 `amp-selector` 的名称提交所选值（即分配给相应选项的值）。

示例：

```html

<form id="form1" action="/" method="get" target="_blank">
  <amp-selector name="single_image_select" layout="container">
    <ul>
      <li><amp-img src="/img1.png" width="50" height="50" option="1"></amp-img></li>
      <li><amp-img src="/img2.png" width="50" height="50" option="2"></amp-img></li>
      <li option="na" selected="">None of the Above</li>
    </ul>
  </amp-selector>
  <amp-selector name="multi_image_select" layout="container" multiple="">
    <amp-img src="/img1.png" width="50" height="50" option="1"></amp-img>
    <amp-img src="/img2.png" width="50" height="50" option="2"></amp-img>
    <amp-img src="/img3.png" width="50" height="50" option="3"></amp-img>
  </amp-selector>
  <amp-selector name="multi_image_select_1" layout="container" multiple="">
    <amp-carousel id="carousel-1" width="200" height="60" controls="">
      <amp-img src="/img1.png" width="80" height="60" option="a"></amp-img>
      <amp-img src="/img2.png" width="80" height="60" option="b" selected=""></amp-img>
      <amp-img src="/img3.png" width="80" height="60" option="c"></amp-img>
      <amp-img src="/img4.png" width="80" height="60" option="d" disabled=""></amp-img>
    </amp-carousel>
  </amp-selector>
</form>

<p><amp-selector name="multi_image_select_2" layout="container" multiple="" form="form1">
  <amp-carousel height="300" id="carousel-1" type="slides" width="400" controls="">
    <amp-img height="60" src="/img1.png" width="80" option="a"></amp-img>
    <amp-img height="60" src="/img2.png" width="80" option="b" selected=""></amp-img>
    <amp-img height="60" src="/img3.png" width="80" option="c"></amp-img>
    <amp-img height="60" src="/img4.png" width="80" option="d"></amp-img>
  </amp-carousel>
</amp-selector>
```

## 清除所选内容 <a name="clearing-selections"></a>

要在用户点按或点击某个元素后清除所有所选内容，请在相应元素上设置 [`on`](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) 操作属性，然后使用 `clear` 操作方法指定 AMP 选择器 `id`。

示例：

```html
<button on="tap:mySelector.clear">Clear Selection</button>
<amp-selector id="mySelector" layout="container" multiple>
  <div option>Option One</div>
  <div option>Option Two</div>
  <div option>Option Three</div>
</amp-selector>
```

[tip type="success"]
[AMP By Example](https://ampbyexample.com/components/amp-selector/) 上的在线演示。
[/tip]

## 属性 <a name="attributes"></a>

### `<amp-selector>` 上的属性 <a name="attributes-on-"></a>

<table>
  <tr>
    <td width="40%"><strong>disabled、form、multiple、name</strong></td>
    <td>上述属性的行为方式与在标准 HTML 元素上的行为方式相同 <code>select</code> [](https://developer.mozilla.org/en/docs/Web/HTML/Element/select).</td>
  </tr>
  <tr>
    <td width="40%"><strong>keyboard-select-mode</strong></td>
    <td>`<code>keyboard-select-mode</code> 属性用于指定 <code>amp-selector</code> 内的选项的键盘导航行为。

    <ul><li><code>none</code>（默认值）：可使用 Tab 键在 <code>amp-selector</code> 内的各项内容之间切换焦点。用户必须按 Enter 键或空格键，才能更改所选内容。箭头键处于停用状态。</li>
    <li><code>focus</code>：按 Tab 键可将焦点放在 <code>amp-selector</code>。用户可以使用箭头键在各项内容之间切换。必须按空格键或 Enter 键，才能更改所选内容。</li>
    <li><code>select</code>：按 Tab 键可将焦点放在 <code>amp-selector</code>。用户使用箭头键切换选项时，所选内容会发生变化。</li></ul></td>
    </tr>
  </table>

### `<amp-selector>` 选项的属性 <a name="attributes-on--options"></a>

<table>
  <tr>
    <td width="40%"><strong>option</strong></td>
    <td>指定选项可供选择。如果已指定值，则该值的内容会随表单一起提交。</td>
  </tr>
  <tr>
    <td width="40%"><strong>disabled、selected</strong></td>
    <td>上述属性的行为方式与在标准 HTML 元素上的行为方式相同 [<code>option</code>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option).</td>
  </tr>
</table>

## 事件 <a name="events"></a>

事件可以使用 `on` 属性触发其他 AMP 组件上的操作。例如，`on="select: my-tab.show"`

详细了解 [AMP 操作和事件](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)。

<table>
  <tr>
    <td width="40%"><strong>select</strong></td>
    <td><code>amp-selector</code> 会在用户选择某个选项时触发 <code>select</code> 事件。多选择器和单选择器会在用户选择或取消选择选项时触发此事件。点按处于停用状态的选项不会触发 <code>select</code> 事件。
      <ul>
        <li>
          <code>event.targetOption</code> 包含所选元素的 <code>option</code> 属性值。</li>
          <li>
            <code>event.selectedOptions</code> 包含所有所选元素的 <code>option</code> 属性值的数组。
          </li>
        </ul></td>
      </tr>

    </table>

## 验证 <a name="validation"></a>

请参阅 AMP 验证工具规范中的 [amp-selector 规则](https://github.com/ampproject/amphtml/blob/master/extensions/amp-selector/validator-amp-selector.protoascii)。
