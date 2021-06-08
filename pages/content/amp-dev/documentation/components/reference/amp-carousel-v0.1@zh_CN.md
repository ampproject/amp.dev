---
$title: amp-carousel
$category@: layout
teaser:
  text: 沿着一条横轴显示多个相似的内容片段。
---


<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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



用于沿着一条横轴显示多个相似的内容片段的通用轮播界面；具有高度灵活性和高性能。

<table>
  <tr>
    <td width="40%"><strong>必需的脚本</strong></td>
    <td><code>&lt;script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">支持的布局</a></strong></td>
    <td>
      <ul>
        <li>轮播界面：fixed、fixed-height 和 nodisplay。</li>
        <li>幻灯片：fill、fixed、fixed-height、flex-item、nodisplay 和 responsive。</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="40%"><strong>示例</strong></td>
    <td>AMP By Example 的：<ul>
      <li><a href="https://ampbyexample.com/components/amp-carousel/">amp-carousel 示例</a></li>
      <li><a href="https://ampbyexample.com/advanced/image_galleries_with_amp-carousel/">图库（具有 amp-carousel）</a></li></ul></td>
    </tr>
  </table>

# 行为 <a name="behavior"></a>

每个 `amp-carousel` 组件的直接子级在轮播界面中均视为一个项。每个节点还可能包含任意 HTML 子级。

轮播界面包含任意数量的项，以及用于前往或返回单个项的可选导航箭头。

如果用户滑动、使用箭头键或点击可选导航箭头，则轮播界面会在两个项之间前进。

[example preview="inline" playground="true" imports="amp-carousel"]
```html
<amp-carousel width="450"
  height="300">
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
    width="450"
    height="300"></amp-img>
</amp-carousel>
```
[/example]

# 前往某张特定幻灯片 <a name="advancing-to-a-specific-slide"></a>

如果在某元素上将 `on` 属性的某个方法设为 `tap:carousel-id.goToSlide(index=N)`，则会在用户点按或点击时从具有 "carousel-id" ID 的轮播界面前往 index=N 位置的幻灯片（第一张幻灯片的位置为 index=0，第二张幻灯片的位置为 index=1，以此类推）。

在以下示例中，我们提供了一个包含三张图片的轮播界面，轮播界面下方是预览按钮。当用户点击其中一个按钮时，系统会显示相应的轮播项。

[example preview="inline" playground="true" imports="amp-carousel"]
```html
<amp-carousel id="carousel-with-preview"
    width="450"
    height="300"
    layout="responsive"
    type="slides">
    <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="apples"></amp-img>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="lemons"></amp-img>
    <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
      width="450"
      height="300"
      layout="responsive"
      alt="blueberries"></amp-img>
  </amp-carousel>
  <div class="carousel-preview">
    <button on="tap:carousel-with-preview.goToSlide(index=0)">
      <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
        width="60"
        height="40"
        alt="apples"></amp-img>
    </button>
    <button on="tap:carousel-with-preview.goToSlide(index=1)">
      <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
        width="60"
        height="40"
        alt="lemons"></amp-img>
    </button>
    <button on="tap:carousel-with-preview.goToSlide(index=2)">
      <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
        width="60"
        height="40"
        alt="blueberries"></amp-img>
    </button>
  </div>
```
[/example]

# 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type</strong></td>
    <td>指定轮播项的显示类型，可以是如下类型：<ul>
      <li><code>carousel</code>（默认）：显示所有幻灯片，并且可以水平滚动。此类型仅支持以下布局：<code>fixed</code>, <code>fixed-height</code> 和 <code>nodisplay</code>。</li>
      <li><code>slides</code>：每次显示一张幻灯片。此类型支持以下布局：<code>fill</code>, <code>fixed</code>, <code>fixed-height</code>, <code>flex-item</code>, <code>nodisplay</code> 以及 <code>responsive</code>。</li>
    </ul></td>
  </tr>
  <tr>
    <td width="40%"><strong>height（必需）</strong></td>
    <td>指定轮播界面的高度（以像素为单位）。</td>
  </tr>
  <tr>
    <td width="40%"><strong>controls（可选）</strong></td>
    <td>永久显示左箭头和右箭头，以便用户在移动设备上浏览轮播项。默认情况下，移动设备上的导航箭头会在几秒种后消失。箭头的可见性还可以通过样式设置来控制，媒体查询只能用于在特定宽度的屏幕上显示箭头。在桌面设备上，除非只存在一个子级，否则将始终显示箭头。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-next-button-aria-label（可选）</strong></td>
    <td>设置 <code>amp-carousel-button-next</code> 的 aria-label。如果未给出值，则 aria-label 默认为 'Next item in carousel'。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-prev-button-aria-label（可选）</strong></td>
    <td>设置 <code>amp-carousel-button-prev</code> 的 aria-label。如果未给出值，则 aria-label 默认为 'Previous item in carousel'。</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-button-count-format（可选）</strong></td>
    <td>类似于 <code>(%s of %s)</code> 的格式字符串，用作 <code>amp-carousel-button-next</code>/<code>amp-carousel-button-prev</code> 的 aria-label 的后缀。该属性向使用屏幕阅读器的用户提供关于他们在轮播界面上的进度的信息。如果未给出值，则此属性默认为 '(%s of %s)'。</td>
  </tr>
  <tr>
    <td width="40%"><strong>autoplay（可选）</strong></td>
    <td>从当前幻灯片前往下一张幻灯片，无需用户互动。<br>
      如果有该属性，但没有值：
      <ul>
        <li>默认情况下，将以 5000 毫秒（5 秒）的间隔播放幻灯片；这可被 <code>delay</code> 属性替换。</li>
        <li>向 <code>amp-carousel</code> 附加 <code>loop</code> 属性（如果该属性尚不存在）。</li>
        <li>至少需要两张幻灯片才能自动播放。</li>
        <li>仅适用于具有 <code>type=slides</code> 属性的轮播界面。</li>
      </ul>
      如果有该属性，且有值：
      <ul>
        <li>向 <code>amp-carousel</code> 附加 <code>loop</code> 属性（如果该属性尚不存在）。</li>
        <li>在完成必要的循环次数之后移除 <code>loop</code> 属性。</li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>delay（可选）</strong></td>
      <td>指定时长（以毫秒为单位），以便在启用 <code>autoplay</code> 后延迟前往下一张幻灯片。<code>delay</code> 属性仅适用于具有 <code>type=slides</code> 属性的轮播界面。</td>
    </tr>
    <tr>
      <td width="40%"><strong>loop（可选）</strong></td>
      <td>允许用户跳过第一个项或最后一个项。必须至少有 3 张幻灯片才能循环播放。<code>loop</code> 属性仅适用于具有 <code>type=slides</code> 属性的轮播界面。
        <em>示例：显示带有控制、循环播放和延迟自动播放功能的幻灯片轮播界面。</em>

[example preview="inline" playground="true" imports="amp-carousel"]
```html
<amp-carousel type="slides"
  width="450"
  height="300"
  controls
  loop
  {% if not format=='email'%}  autoplay
  delay="3000"{% endif %}
  data-next-button-aria-label="Go to next slide"
  data-previous-button-aria-label="Go to previous slide">
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image1.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image2.jpg"
    width="450"
    height="300"></amp-img>
  <amp-img src="{{server_for_email}}/static/inline-examples/images/image3.jpg"
    width="450"
    height="300"></amp-img>
</amp-carousel>
```
[/example]</td>
      </tr>
      <tr>
        <td width="40%"><strong>常见属性</strong></td>
        <td>此元素包含扩展到 AMP 组件的<a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">常见属性</a>。</td>
      </tr>
    </table>

# 样式设置 <a name="styling"></a>

* 您可以使用 `amp-carousel` 元素选择器随意设置样式。
* 您可以使用 `.amp-carousel-slide` 类别选择器定位轮播项。
* 停用样式设置时，`amp-carousel` 按钮的可视状态将隐藏。
* 默认情况下，`.amp-carousel-button` 将内嵌 SVG 用作按钮的背景图片。您可以使用自己的 SVG 或图片替换按钮，如下面的示例所示。

*示例：默认 `.amp-carousel-button` 内嵌 SVG*

```css
.amp-carousel-button-prev {
  left: 16px;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z" fill="#fff" /></svg>');
}
```

*示例：替换默认 `.amp-carousel-button` 内嵌 SVG*

```css
.amp-carousel-button-prev {
  left: 5%;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z" fill="#fff" /></svg>');
}
```

# 验证 <a name="validation"></a>

请参阅 AMP 验证工具规范中的 [amp-carousel 规则](https://github.com/ampproject/amphtml/blob/main/extensions/amp-carousel/validator-amp-carousel.protoascii)。
