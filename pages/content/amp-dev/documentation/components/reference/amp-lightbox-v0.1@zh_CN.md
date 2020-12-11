---
$title: amp-lightbox
$category@: layout
teaser:
  text: 以完整视口“灯箱”模式显示元素。
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



<table>
  <tr>
    <td width="40%"><strong>说明</strong></td>
    <td>以完整视口“灯箱”模式显示元素。</td>
  </tr>
  <tr>
    <td width="40%"><strong>必需的脚本</strong></td>
    <td><code>&lt;script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">支持的布局</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td width="40%"><strong>示例</strong></td>
    <td>请参阅 AMP By Example 的 <a href="https://ampbyexample.com/components/amp-lightbox/">amp-lightbox</a> 示例。</td>
  </tr>
</table>


## 行为 <a name="behavior"></a>

`amp-lightbox` 组件可定义以完整视口叠加层/模式显示的子元素。当用户点按或点击某个元素（例如按钮）时，所点击元素的 `on` 属性中引用的 `amp-lightbox` ID 会触发灯箱占据整个视口并显示 `amp-lightbox` 的子元素。

按键盘上的 Esc 键可关闭灯箱。或者，在灯箱中的一个或多个元素上设置 `on` 属性并将其方法设为 `close`，即可在用户点按或点击元素后关闭灯箱。

```html
<button on="tap:quote-lb">See Quote</button>
<amp-lightbox id="quote-lb" layout="nodisplay">
  <blockquote>"Don't talk to me about JavaScript fatigue" - Horse JS</blockquote>
  <button on="tap:quote-lb.close">Nice!</button>
</amp-lightbox>
```

[tip type="ll callout('继续阅读：</b><a class="type_read"]
要在灯箱中显示图片，还可使用 [`<amp-image-lightbox>`](amp-image-lightbox.md) 组件。
[/tip]

## 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>animate-in（可选）</strong></td>
    <td>定义打开灯箱的动画样式。默认情况下，该属性将设为 <code>fade-in</code>。有效值为 <code>fade-in</code>、<code>fly-in-bottom</code> 和 <code>fly-in-top</code>。
      <br><br>
        <strong>注意</strong>：<code>fly-in-*</code> 动画预设会修改 <code>amp-lightbox</code> 元素的 <code>transform</code> 属性。切勿依赖于直接转换 <code>amp-lightbox</code> 元素。如果您需要应用转换，请改为在嵌套元素上进行设置。</td>
      </tr>
      <tr>
        <td width="40%"><strong>close-button（在 AMPHTML 广告中，为必需属性）</strong></td>
        <td>在灯箱顶部呈现关闭按钮标头。只有对于 <a href="#a4a">AMPHTML 广告</a>，才需要使用此属性，并且此属性仅适用于此类广告。</td>
      </tr>
      <tr>
        <td width="40%"><strong>id（必需）</strong></td>
        <td>灯箱的专属标识符。</td>
      </tr>
      <tr>
        <td width="40%"><strong>layout（必需）</strong></td>
        <td>必须设为 <code>nodisplay</code>。</td>
      </tr>
      <tr>
        <td width="40%"><strong>scrollable（可选）</strong></td>
        <td>当 <code>scrollable</code> 属性存在时，灯箱内容可在溢出灯箱高度时滚动。
          <br><br>
            <strong>注意</strong>：在 AMPHTML 广告中使用 <code>&lt;amp-lightbox&gt;</code> 时，不允许使用 <code>scrollable</code> 属性。如需了解详情，请参阅<a href="#a4a">在 AMPHTML 广告中使用 amp-lightbox</a> 部分。</td>
          </tr>
          <tr>
            <td width="40%"><strong>scrollable（可选）</strong></td>
            <td></td>
          </tr>
        </table>

## 样式设置 <a name="styling"></a>

可以使用标准 CSS 对 `amp-lightbox` 进行样式设置。

## 操作 <a name="actions"></a>

`amp-lightbox` 提供以下操作，它们可以使用 [AMP on 语法触发](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)：

<table>
  <tr>
    <th width="20%">操作</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>open</code>（默认）</td>
    <td>打开灯箱。</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>关闭灯箱。</td>
  </tr>
</table>

## <a id="a4a"></a>在 AMPHTML 广告中使用 `amp-lightbox` <a name="a4a"></a>

[tip type="ll callout('注意：</b><a class="type_note"]
用于 AMPHTML 广告的 `amp-lightbox` 组件是[实验性组件](../../../documentation/guides-and-tutorials/learn/experimental.md)，仍处于积极开发阶段。要在 AMPHTML 广告中使用 `amp-lightbox`，请[启用 `amp-lightbox-a4a-proto` 实验](http://cdn.ampproject.org/experiments.html)。
[/tip]

在常规 AMP 文档与在[用 AMPHTML 编写的广告](../../../documentation/guides-and-tutorials/learn/a4a_spec.md)中使用 `amp-lightbox` 存在一些差异：

### 需要使用 close-button <a name="requires-close-button"></a>

对于 AMPHTML 广告，`close-button` 为必需的属性。此属性会导致标头呈现在灯箱顶部。标头包含关闭按钮和显示“Ad”的标签。需要使用此标头才能执行以下操作：

* 为 AMPHTML 广告打造一致且可预测的用户体验。
* 确保灯箱的退出点始终存在，否则广告素材可能会通过灯箱高效拦截主文档内容。

对于 AMPHTML 广告，`close-button` 为必需的属性，且此属性只能在 AMPHTML 广告中使用。在常规 AMP 文档中，您可以在任意需要的位置呈现关闭按钮（作为 `<amp-lightbox>` 内容的一部分）。

### 不允许使用可滚动的灯箱 <a name="scrollable-lightboxes-are-disallowed"></a>

AMPHTML 广告不允许使用可滚动的灯箱。

### 透明背景 <a name="transparent-background"></a>

在 AMPHTML 广告中使用 `<amp-lightbox>` 时，`<body>` 元素的背景将变为透明，这是因为 AMP runtime 会在灯箱展开之前调整广告素材内容的大小和对齐方式。这样做是为了防止广告素材在灯箱打开时发生视觉“跳转”。如果您的广告素材需要背景，请在中间容器（例如完整尺寸的 `<div>`）而非 `<body>` 上进行设置。

当 AMPHTML 广告在第三方环境（例如，非 AMP 文档）中运行时，广告素材相对于视口居中，然后展开。这是因为第三方 iframe 需要依赖 postMessage API 来启用帧大小调整（异步调整）等功能，因此，先使广告素材居中可在不发生视觉跳转的情况下平稳转换。

### AMPHTML 广告的灯箱转换示例 <a name="examples-of-transitions-in-lightbox-for-amphtml-ads"></a>

在下面的示例中，我们展示了灯箱元素上设置了 `animate-in="fly-in-bottom"` 属性的 AMPHTML 广告在友好型 iframe 以及在第三方 iframe 中的转换效果。

##### 在友好型 iframe 中（例如来自 AMP 缓存） <a name="on-friendly-iframes-eg-coming-from-an-amp-cache"></a>

<amp-img alt="友好型 iframe 中的灯箱广告" width="360" height="480" src="https://github.com/ampproject/amphtml/raw/master/spec/img/lightbox-ad-fie.gif" layout="fixed">
  <noscript>
    <img alt="友好型 iframe 中的灯箱广告" src="../../spec/img/lightbox-ad-fie.gif">
    </noscript>
  </amp-img>

##### 在第三方 iframe 中（例如在 AMP 缓存之外） <a name="on-third-party-iframes-eg-outside-the-amp-cache"></a>

<amp-img alt="第三方 iframe 中的灯箱广告" width="360" height="480" src="https://github.com/ampproject/amphtml/raw/master/spec/img/lightbox-ad-3p.gif" layout="fixed">
  <noscript>
    <img alt="第三方 iframe 中的灯箱广告" src="../../spec/img/lightbox-ad-3p.gif">
    </noscript>
  </amp-img>

## 验证 <a name="validation"></a>

请参阅 AMP 验证工具规范中的 [amp-lightbox 规则](https://github.com/ampproject/amphtml/blob/master/extensions/amp-lightbox/validator-amp-lightbox.protoascii)。
