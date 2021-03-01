---
'$title': 操作和事件
$order: 0
formats:
  - 网站
  - 故事
  - 广告
teaser:
  text: '[tip type="note"]'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/amp-actions-and-events.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
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

[tip type="note"] 本文档介绍适用于 AMP 网站、故事和广告的操作和事件。有关 AMP 电子邮件格式，请参阅 [AMP 电子邮件中的操作和事件](https://github.com/ampproject/amphtml/blob/master/spec/amp-email-actions-and-events.md)。[/tip]

`on` 属性用于在元素上安装事件处理脚本。受支持的事件取决于元素。

语法的值是一种简单的域特定语言，形式为：

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]][/sourcecode]

有关语法中各个部分的说明，请参见下表。

<table>
  <tr>
    <th width="30%">语法</th>
    <th width="18%">是否为必需项？</th>
    <th width="42%">说明</th>
  </tr>
  <tr>
    <td><code>eventName</code></td>
    <td>是</td>
    <td>元素公开的事件的名称。</td>
  </tr>
  <tr>
    <td><code>targetId</code></td>
    <td>是</td>
    <td>元素的 DOM ID，或者是为了对事件做出响应而要执行操作的预定义<a href="#special-targets">特殊目标</a>的 DOM ID。在以下示例中，<code>targetId</code> 为 <code>amp-lightbox</code> 目标 <code>photo-slides</code> 的 DOM ID。<pre><amp-lightbox id="photo-slides"></amp-lightbox>
<button on="tap:photo-slides">Show Images</button></pre>
</td>
  </tr>
  <tr>
    <td><code>methodName</code></td>
    <td>否</td>
    <td>适用于具有默认操作的元素。<p>这是由目标元素（<code>targetId</code> 引用）公开并且您要在事件被触发时执行的方法。</p> <p>AMP 提供了元素可以实现的默认操作的概念。因此，如果忽略 <code>methodName</code>，AMP 将执行默认方法。</p>
</td>
  </tr>
  <tr>
    <td><code>arg=value</code></td>
    <td>否</td>
    <td>有些操作（如果已记录）可以接受参数。这些参数的定义方式是使用括号将 <code>key=value</code> 表示法括起来。接受的值包括：<ul>         <li>简单的无引号字符串：<code>simple-value</code> </li>         <li>带引号字符串：<code>"string value"</code> 或 <code>'string value'</code> </li>         <li>布尔值：<code>true</code> 或 <code>false</code> </li>         <li>数值：<code>11</code> 或 <code>1.1</code> </li>         <li>以句点语法形式对事件数据的引用：<code>event.someDataVariableName</code> </li>       </ul>
</td>
  </tr>
</table>

## 处理多个事件 <a name="handling-multiple-events"></a>

使用分号 `;` 将各个事件隔开，可以侦听元素上的多个事件。

示例：`on="submit-success:lightbox1;submit-error:lightbox2"`

## 一个事件的多项操作 <a name="multiple-actions-for-one-event"></a>

使用逗号“,”将各个操作隔开，可以按顺序对同一事件执行多项操作。

示例：`on="tap:target1.actionA,target2.actionB"`

## 全局定义的事件和操作 <a name="globally-defined-events-and-actions"></a>

AMP 定义了全局 `tap` 事件，您可以在任何 HTML 元素（包括 AMP 元素）上侦听该事件。

AMP 还定义了全局 `hide`、`show` 和 `toggleVisibility` 操作，您可以在任何 HTML 元素上触发这些操作。

[tip type="note"]

仅当元素先前是通过 `hide` 或 `toggleVisibility` 操作或者是使用 [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden) 属性进行隐藏的，才能显示该元素。使用 `show` 操作，无法显示通过 CSS `display:none` 或 AMP `layout=nodisplay` 隐藏起来的元素。

例如，可以在 AMP 中编写以下程序：

[sourcecode:html]

<div id="warning-message">Warning...</div>

<button on="tap:warning-message.hide">Cool, thanks!</button>
[/sourcecode]

[/tip]

## 元素特有的事件 <a name="element-specific-events"></a>

### \* - 所有元素 <a name="---all-elements"></a>

<table>
  <tr>
    <th>事件</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>tap</code></td>
    <td>点击/点按元素时触发。</td>
  </tr>
</table>

### 输入元素 <a name="input-elements"></a>

<table>
  <tr>
    <th width="20%">事件</th>
    <th width="30%">说明</th>
    <th width="40%">元素</th>
    <th>数据</th>
  </tr>
  <!-- change -->
  <tr>
    <td rowspan="3"><code>change</code></td>
    <td rowspan="3">更改和提交元素的值时触发。<p> 数据属性会镜像 <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties">HTMLInputElement</a> 和 <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#Properties">HTMLSelectElement</a> 中的相应属性。</p>
</td>
    <td><code>input</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value<br>event.valueAsNumber</pre>
    </td>
  </tr>
  <tr>
    <td> <code>input[type="radio"]</code>,<br><code>input[type="checkbox"]</code>
</td>
    <td>
      <code>event.checked</code>
    </td>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>
      <pre>event.min<br>event.max<br>event.value</pre>
    </td>
  </tr>
  <!-- input-debounced -->
  <tr>
    <td><code>input-debounced</code></td>
    <td>在元素的值发生更改时触发。该事件与标准的 <code>change</code> 事件类似，但它仅在输入值停止更改并且经过 300ms 后才会触发。</td>
    <td>可触发 <code>input</code> 事件的元素。</td>
    <td>与 <code>change</code> 事件数据相同。</td>
  </tr>
    <!-- input-throttled -->
  <tr>
    <td><code>input-throttled</code></td>
    <td>在元素的值发生更改时触发。该事件与标准的 <code>change</code> 事件类似，但仅局限于在输入值发生更改时每 100ms 最多触发一次。</td>
    <td>可触发 <code>input</code> 事件的元素。</td>
    <td>与 <code>change</code> 事件数据相同。</td>
  </tr>
</table>

### amp-accordion > 部分 <a name="amp-accordion"></a>

<table>
  <tr>
    <th width="25%">事件</th>
    <th width="35%">说明</th>
    <th width="40%">数据</th>
  </tr>
  <tr>
    <td><code>expand</code></td>
    <td>在手风琴式组件部分展开时触发。</td>
    <td>无。</td>
  </tr>
  <tr>
    <td><code>collapse</code></td>
    <td>在手风琴式组件部分折叠时触发。</td>
    <td>无。</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides-1"></a>

<table>
  <tr>
    <th width="25%">事件</th>
    <th width="35%">说明</th>
    <th width="40%">数据</th>
  </tr>
  <tr>
    <td><code>slideChange</code></td>
    <td>在轮播的当前幻灯片更改时触发。</td>
    <td><pre>// Slide number.<br>event.index</pre></td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox-1"></a>

<table>
  <tr>
    <th width="25%">事件</th>
    <th width="35%">说明</th>
    <th width="40%">数据</th>
  </tr>
  <tr>
    <td><code>lightboxOpen</code></td>
    <td>在灯箱完全可见时触发。</td>
    <td>无</td>
  </tr>
  <tr>
    <td><code>lightboxClose</code></td>
    <td>在灯箱完全关闭时触发。</td>
    <td>无</td>
  </tr>
</table>

### amp-list <a name="amp-list-1"></a>

<table>
  <tr>
    <th width="25%">事件</th>
    <th width="35%">说明</th>
    <th width="40%">数据</th>
  </tr>
  <tr>
    <td><code>changeToLayoutContainer</code></td>
    <td>将 <code>amp-list</code> 布局更新为 <code>layout="CONTAINTER"</code>，以便<a href="https://github.com/ampproject/amphtml/blob/master/spec/../extensions/amp-list/amp-list.md#dynamic-resizing">重新动态调整大小</a>。</td>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(low-trust)</td>
    <td>提取数据失败时触发。</td>
    <td>无</td>
  </tr>
</table>

### amp-selector <a name="amp-selector-1"></a>

<table>
  <tr>
    <th width="25%">事件</th>
    <th width="35%">说明</th>
    <th width="40%">数据</th>
  </tr>
  <tr>
    <td><code>select</code></td>
    <td>选择或取消选择选项时触发。</td>
    <td><pre>// Target element's "option" attribute value.<br>event.targetOption<br>// Array of "option" attribute values of all selected elements.<br>event.selectedOptions</pre></td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar-1"></a>

<table>
  <tr>
    <th width="25%">事件</th>
    <th width="35%">说明</th>
    <th width="40%">数据</th>
  </tr>
  <tr>
    <td><code>sidebarOpen</code></td>
    <td>过渡结束后边栏完全打开时触发。</td>
    <td>无</td>
  </tr>
  <tr>
    <td><code>sidebarClose</code></td>
    <td>过渡结束后边栏完全关闭时触发。</td>
    <td>无</td>
  </tr>
</table>

### amp-state <a name="amp-state-1"></a>

<table>
  <tr>
    <th width="25%">事件</th>
    <th width="35%">说明</th>
    <th width="40%">数据</th>
  </tr>
  <tr>
    <td> <code>fetch-error</code>(low-trust)</td>
    <td>提取数据失败时触发。</td>
    <td>无</td>
  </tr>
</table>

### amp-video、amp-youtube <a name="amp-video-amp-youtube"></a>

<table>
  <tr>
    <th width="25%">事件</th>
    <th width="35%">说明</th>
    <th width="40%">数据</th>
  </tr>
  <tr>
    <td> <code>firstPlay</code>(low-trust)</td>
    <td>用户首次播放视频时触发。在自动播放视频中，只要用户与视频互动，就会触发该事件。此事件可信度低，意味着它无法触发大部分操作，只能执行可信度低的操作，例如 <code>amp-animation</code> 操作。</td>
    <td></td>
  </tr>
  <tr>
    <td> <code>timeUpdate</code>(low-trust)</td>
    <td>视频的播放位置发生更改时触发。事件发生频率由 AMP 控制，目前的时间间隔设置为 1 秒。此事件可信度低，意味着它无法触发大部分操作，只能执行可信度低的操作，例如 <code>amp-animation</code> 操作。</td>
    <td> <code>{time, percent}</code><code>time</code> 表示当前时间（以秒计），<code>percent</code> 为介于 0 和 1 之间的数值，表示当前所在位置占总时间的百分比。</td>
  </tr>
</table>

### form <a name="form"></a>

<table>
  <tr>
    <th width="25%">事件</th>
    <th width="35%">说明</th>
    <th width="40%">数据</th>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>提交表单时触发。</td>
    <td></td>
  </tr>
  <tr>
    <td><code>submit-success</code></td>
    <td>提交表单成功时触发。</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>submit-error</code></td>
    <td>提交表单出错时触发。</td>
    <td><pre>// Response JSON.<br>event.response</pre></td>
  </tr>
  <tr>
    <td><code>valid</code></td>
    <td>表单有效时触发。</td>
    <td></td>
  </tr>
  <tr>
    <td><code>invalid</code></td>
    <td>表单无效时触发。</td>
    <td></td>
  </tr>
</table>

## 元素特有的操作 <a name="element-specific-actions"></a>

### \*（所有元素） <a name="-all-elements"></a>

<table>
  <tr>
    <th width="40%">操作</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>hide</code></td>
    <td>Hides the target element.</td>
  </tr>
  <tr>
    <td><code>show</code></td>
    <td>显示目标元素。如果 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus"><code>autofocus</code> 元素</a>最终显示，它将获得焦点。</td>
  </tr>
  <tr>
    <td><code>toggleVisibility</code></td>
    <td>切换目标元素的可见性。如果 <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus"><code>autofocus</code> 元素</a>最终显示，它将获得焦点。</td>
  </tr>
  <tr>
    <td><code>toggleClass(class=STRING, force=BOOLEAN)</code></td>
    <td>切换目标元素的类。<code>force</code> 为可选项，如果定义该属性，可确保在该属性设为 <code>true</code> 时仅添加类而不移除类，在该属性设为 <code>false</code> 时仅移除类而不添加类。</td>
  </tr>
  <tr>
    <td><code>scrollTo(duration=INTEGER, position=STRING)</code></td>
    <td>将元素滚动到显示流畅的动画。<br>     <code>duration</code> 为可选项，用于指定动画的时长（以毫秒计）。如果未指定此属性，将使用相对于滚动差值不大于 500 毫秒的量。<br>     <code>position</code> 为可选项，值为 <code>top</code>、<code>center</code>     或 <code>bottom</code> 之一（默认值为 <code>top</code>）。指定元素在滚动后相对于视口的位置。<br>     无障碍功能的最佳做法是，将此属性与 <code>focus()</code> 的调用进行配对，以将焦点置于要滚动到的元素。</td>
  </tr>
  <tr>
    <td><code>focus</code></td>
    <td>使目标元素获得焦点。要取消焦点，可以 <code>focus</code> 其他元素（通常为父元素）。出于无障碍功能考虑，我们强烈建议将焦点置于 <code>body</code>/<code>documentElement</code>，而不要取消焦点。</td>
  </tr>
</table>

### amp-audio <a name="amp-audio"></a>

<table>
  <tr>
    <th width="20%">操作</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>播放音频。如果 <code>&lt;amp-audio></code> 元素是 <code>&lt;amp-story></code> 的子级，则该操作为空操作。</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>暂停音频。如果 <code>&lt;amp-audio></code> 元素是 <code>&lt;amp-story></code> 的子级，则该操作为空操作。</td>
  </tr>
</table>

### amp-bodymovin-animation <a name="amp-bodymovin-animation"></a>

<table>
  <tr>
    <th>操作</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>播放动画。</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>暂停动画。</td>
  </tr>
  <tr>
    <td><code>stop</code></td>
    <td>停止动画。</td>
  </tr>
  <tr>
    <td><code>seekTo(time=INTEGER)</code></td>
    <td>将动画的 currentTime 设为指定的值，并暂停动画。</td>
  </tr>
  <tr>
    <td><code>seekTo(percent=[0,1])</code></td>
    <td>使用给定的百分比值将动画的 currentTime 设为指定的值，并暂停动画。</td>
  </tr>
</table>

### amp-accordion <a name="amp-accordion-1"></a>

<table>
  <tr>
    <th>操作</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>toggle(section=STRING)</code></td>
    <td>将 <code>amp-accordion</code> 部分在 <code>expanded</code> 和 <code>collapsed</code> 状态之间切换。调用该操作时，如果不指定参数，将切换手风琴式组件的所有部分。如果提供部分 ID，则切换特定部分：<code>on="tap:myAccordion.toggle(section='section-id')"</code>。</td>
</tr>
  <tr>
    <td><code>expand(section=STRING)</code></td>
    <td>展开手风琴式组件的各个部分。如果某个部分已展开，则该部分保持展开状态。调用该操作时，如果不指定参数，将展开手风琴式组件的所有部分。如果指定部分 ID，则展开特定部分：<code>on="tap:myAccordion.expand(section='section-id')"</code>。</td>
  </tr>
  <tr>
    <td><code>collapse(section=STRING)</code></td>
    <td>折叠手风琴式组件的各个部分。如果某个部分已折叠，则该部分保持折叠状态。调用该操作时，如果不指定参数，将折叠手风琴式组件的所有部分。如果指定部分 ID，则折叠特定部分：<code>on="tap:myAccordion.collapse(section='section-id')"</code>。</td>
  </tr>
</table>

### amp-carousel[type="slides"] <a name="amp-carouseltypeslides"></a>

<table>
  <tr>
    <th>操作</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>goToSlide(index=INTEGER)</code></td>
    <td>前进到轮播中的指定幻灯片索引。</td>
  </tr>
  <tr>
    <td><code>toggleAutoplay(toggleOn=true|false)</code></td>
    <td>切换轮播的自动播放状态。<code>toggleOn</code> 为可选项。</td>
  </tr>
</table>

### amp-image-lightbox <a name="amp-image-lightbox"></a>

<table>
  <tr>
    <th width="40%">操作</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>打开图片灯箱，其中的源图片为触发该操作的图片。</td>
  </tr>
</table>

### amp-lightbox <a name="amp-lightbox"></a>

<table>
  <tr>
    <th>操作</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>打开灯箱。</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>关闭灯箱。</td>
  </tr>
</table>

### amp-lightbox-gallery <a name="amp-lightbox-gallery"></a>

<table>
  <tr>
    <th>操作</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>open</code></td>
    <td>打开灯箱图库。如果指定图片 ID，则点按其他元素可以触发该操作：`on="tap:amp-lightbox-gallery.open(id='image-id')"`。</td>
  </tr>
</table>

### amp-list <a name="amp-list"></a>

<table>
  <tr>
    <th>操作</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>refresh</code></td>
    <td>刷新 <code>src</code> 中的数据，并重新呈现列表。</td>
  </tr>
</table>

### amp-live-list <a name="amp-live-list"></a>

<table>
  <tr>
    <th>操作</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>update (default)</code></td>
    <td>更新 DOM 项以显示更新后的内容。</td>
  </tr>
</table>

### amp-selector <a name="amp-selector"></a>

<table>
  <tr>
    <th>操作</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>清除已定义 <code>amp-selector</code> 中的所有选择。</td>
  </tr>
  <tr>
    <td><code>selectUp(delta=INTEGER)</code></td>
    <td>将选择上移 `delta` 的值。默认 `delta` 设为 -1。如果未选择任何选项，则选定状态将成为最后一个选项的值。</td>
  </tr>
  <tr>
    <td><code>selectDown(delta=INTEGER)</code></td>
    <td>将选择下移 `delta` 的值。默认 `delta` 设为 1。如果未选择任何选项，则选定状态将成为第一个选项的值。</td>
  </tr>
  <tr>
    <td><code>toggle(index=INTEGER, value=BOOLEAN)</code></td>
    <td>切换 `selected` 的应用。如果缺少 select 属性，此操作将添加该属性。如果 select 属性存在，此操作将移除该属性。在 `value` 参数中添加布尔值，可以强制并保持该属性的添加或移除。值为 `true` 时，将强制添加 `selected` 属性，如果该属性已存在，则不移除它。值为  `false` 时，将移除该属性，如果缺少该属性，则不添加该属性。</td>
  </tr>
</table>

### amp-sidebar <a name="amp-sidebar"></a>

<table>
  <tr>
    <th>操作</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>open (default)</code></td>
    <td>打开边栏。</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>关闭边栏。</td>
  </tr>
  <tr>
    <td><code>toggle</code></td>
    <td>切换边栏的状态。</td>
  </tr>
</table>

### amp-state <a name="amp-state"></a>

<table>
  <tr>
    <th>操作</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>refresh</code></td>
    <td>忽略浏览器缓存时，重新提取 `src` 属性的数据。</td>
  </tr>
</table>

### amp-user-notification <a name="amp-user-notification"></a>

<table>
  <tr>
    <th>操作</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>dismiss (default)</code></td>
    <td>隐藏所引用的用户通知元素。</td>
  </tr>
</table>

### 视频元素 <a name="video-elements"></a>

以下 AMP 视频元素支持下表列出的操作：`amp-video`、`amp-youtube`、`amp-3q-player`、`amp-brid-player`、`amp-dailymotion`、`amp-delight-player`、`amp-ima-video`。

<table>
  <tr>
    <th>操作</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>play</code></td>
    <td>播放视频。</td>
  </tr>
  <tr>
    <td><code>pause</code></td>
    <td>暂停视频。</td>
  </tr>
  <tr>
    <td><code>mute</code></td>
    <td>将视频静音。</td>
  </tr>
  <tr>
    <td><code>unmute</code></td>
    <td>取消视频静音。</td>
  </tr>
  <tr>
    <td><code>fullscreencenter</code></td>
    <td>全屏播放视频。</td>
  </tr>
</table>

### 表单 <a name="form-1"></a>

<table>
  <tr>
    <th>操作</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>clear</code></td>
    <td>清除表单中输入的所有值。</td>
  </tr>
  <tr>
    <td><code>submit</code></td>
    <td>提交表单。</td>
  </tr>
</table>

## 特殊目标 <a name="special-targets"></a>

以下目标由 AMP 系统提供并具有特殊的要求：

### 目标：AMP <a name="target-amp"></a>

`AMP` 目标由 AMP 运行时提供，可实现适用于整个文档的顶级操作。

<table>
  <tr>
    <th width="40%">操作</th>
    <th>说明</th>
  </tr>
  <tr>
    <td><code>navigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>从当前窗口转到给定网址的可选指定目标（如果已给定）（目前仅支持 <code>_top</code> 和 <code>_blank </code>）。<code>opener</code> 参数为可选参数，可以在以下情况下指定：使用 <code>_blank</code> 目标让新打开的页面访问 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/opener"><code>window.opener</code></a>。支持<a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md">标准网址替换</a>。</p>
      <p><strong>注意事项</strong>：建议尽可能使用正常的 <code><a></code> 链接，因为 <code>AMP.navigateTo</code> 无法被网页抓取工具识别。</p>
    </td>
  </tr>
  <tr>
    <td><code>closeOrNavigateTo(url=STRING, target=STRING, opener=BOOLEAN)</code></td>
    <td>
      <p>尝试关闭窗口（如果允许），否则进行浏览，这与 <code>navigateTo</code> 操作类似。适用于以下用例：如果通过前一个页面在新窗口中打开一个窗口，可能需要使用“Back”按钮关闭该窗口；如果未打开窗口，可能需要使用“Back”按钮进行浏览。</p>
      <p><strong>注意事项</strong>：建议尽可能使用正常的 <code><a></code> 链接，因为 <code>AMP.closeOrNavigateTo</code> 无法被网页抓取工具识别。</p>
    </td>
  </tr>
  <tr>
    <td><code>goBack</code></td>
    <td>回溯历史记录。</td>
  </tr>
  <tr>
    <td><code>print</code></td>
    <td>打开“Print”对话框以打印当前页面。</td>
  </tr>
  <tr>
    <td>scrollTo(id=STRING, duration=INTEGER, position=STRING)</td>
    <td>滚动到当前页面上所提供的元素 ID。</td>
  </tr>
  <tr>
    <td>optoutOfCid</td>
    <td>取消针对所有范围生成客户端 ID。</td>
  </tr>
  <tr>
    <td>
<code>setState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p>需要 <a href="https://amp.dev/documentation/components/amp-bind.html#updating-state-with-ampsetstate">amp-bind</a>。</p>
      <p>将对象字面量合并到可绑定状态。</p>
      <p></p>
    </td>
  </tr>
  <tr>
    <td>
<code>pushState({foo: 'bar'})</code><sup>1</sup>
</td>
    <td>
      <p>需要 <a href="https://amp.dev/documentation/components/amp-bind.html#modifying-history-with-amppushstate">amp-bind</a>。</p>
      <p>将对象字面量合并到可绑定状态，并将新条目推送到浏览器历史记录堆栈。如果弹出该条目，变量将恢复先前的值（在本例中为 <code>foo</code>）。</p>
</td>
  </tr>
</table>

<sup>1</sup>与<a href="#multiple-actions-for-one-event">多项操作</a>配合使用时，后续操作将等到 <code>setState()</code> 或 <code>pushState()</code> 完成后再调用。每个事件只允许使用一个 <code>setState()</code> 或 <code>pushState()</code>。

### 目标：amp-access <a name="target-amp-access"></a>

`amp-access` 目标由 [amp-access](https://amp.dev/documentation/components/amp-access.html) 组件提供。

`amp-access` 目标较为特殊，原因如下所述：

1. 您不能为此目标指定任意 ID。该目标始终为 `amp-access`。
2. 根据 [AMP 访问配置](https://amp.dev/documentation/components/amp-access#configuration)的结构，`amp-access` 的操作为动态操作。

有关 `amp-access` 目标的用法，请参阅[详细信息](https://amp.dev/documentation/components/amp-access#login-link)。
