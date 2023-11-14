---
$title: amp-iframe
$category@: layout
teaser:
  text: 显示 iframe。
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



显示 iframe。


<table>
  <tr>
    <td width="40%"><strong>必需的脚本</strong></td>
    <td><code>&lt;script async custom-element="amp-iframe" src="https://ampjs.org/v0/amp-iframe-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">支持的布局</a></strong></td>
    <td>fill、fixed、fixed-height、flex-item、intrinsic、nodisplay、responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>示例</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-iframe/">amp-iframe 代码示例（带注释）</a></td>
  </tr>
</table>

# 行为 <a name="behavior"></a>

`amp-iframe` 与 vanilla iframe 之间存在一些重大差异，后者旨在提高安全性并避免生成由单个 iframe 主导的 AMP 文件：

* `amp-iframe` 不能靠近文档顶部（使用 `placeholder` 的 iframe 除外，如[下](#iframe-with-placeholder)所述）。iframe 必须与文档顶部相距 600 像素，或者滚动到顶部时不在视口的前 75% 范围内，以较小距离为准。
* 默认情况下，amp-iframe 已经过沙盒化（查看[详细信息](#sandbox)）。
* `amp-iframe` 只能通过 HTTPS、数据-URI 或 `srcdoc` 属性请求资源。
* `amp-iframe` 与容器不得同源，除非两者在 `sandbox` 属性中均不支持 `allow-same-origin`。如需详细了解 iframe 支持的来源，请参阅[“iframe 来源政策”](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-iframe-origin-policy.md)文档。

*示例：在 amp-iframe 中嵌入 Google 地图*

```html
<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    frameborder="0"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=iceland">
  </amp-iframe>
```

呈现形式：

<amp-iframe width="200" height="100" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=iceland" sandbox="allow-scripts allow-same-origin" layout="responsive" frameborder="0">
</amp-iframe>

[tip type="ll callout('提示：</b><a class="type_success"]
如需查看 `amp-iframe` 的更多演示，请访问 [AMP By Example](https://ampbyexample.com/components/amp-iframe/)。
[/tip]

# 将 amp-iframe 用于广告 <a name="usage-of-amp-iframe-for-advertising"></a>

`amp-iframe` **不得** 用于以展示广告为主要目的的用途。您可以将 `amp-iframe` 用于展示其中部分内容是广告的视频。系统可能会强制实施此 AMP 政策：不呈现相应 iframe。

用于广告时应改用 [`amp-ad`](amp-ad.md)。

实施此政策的原因如下：

* `amp-iframe` 可强制执行沙盒化，且沙盒也会应用于子 iframe。这意味着，着陆页可能会损坏，即使广告本身看起来正常。
* `amp-iframe` 不提供将配置传递到 iframe 的任何机制。
* `amp-iframe` 没有完全由 iframe 控制的大小调整机制。
* `amp-iframe` 可能无法使用可见度信息。

# 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td><code>src</code> 属性的行为基本上与在标准 iframe 上的表现类似，但以下情况例外：网址中添加了 <code>#amp=1</code> 片段，以告知来源文档它们已嵌入 AMP 场景中。只有当 <code>src</code> 指定的网址尚未包含片段时，才会添加此片段。</td>
  </tr>
  <tr>
    <td width="40%"><strong>srcdoc、frameborder、allowfullscreen、allowpaymentrequest、allowtransparency、referrerpolicy</strong></td>
    <td>这些属性的行为都应与其在标准 iframe 上的表现类似。
      <br>如果未指定 <code>frameborder</code>，系统会默认将其设置为 <code>0</code>。</td>
      </tr>
      <tr>
        <td width="40%"><strong>sandbox</strong><a name="sandbox"></a></td>
        <td><code>amp-iframe</code> 创建的 iframe 始终指定有 <code>sandbox</code> 属性。默认情况下，该属性的值为空，这意味着 iframe 已经“最大程度地沙盒化”。您可以通过设置 <code>sandbox</code> 值来选择降低 iframe 的沙盒化程度。允许浏览器支持的所有值。例如，您可以设置 <code>sandbox="allow-scripts"</code>，以支持 iframe 运行 JavaScript，也可以设置 <code>sandbox="allow-scripts allow-same-origin"</code>，以支持 iframe 运行 JavaScript、创建非 CORS XHR，以及读/写 Cookie。
          <br><br>如果您要对某个在创建时未特别考虑沙盒化的文档执行 iframe 处理，很可能需要将 <code>allow-scripts allow-same-origin</code> 添加到 <code>sandbox</code> 属性中，并且可能需要允许其他功能。
            <br><br>另请注意，沙盒适用于通过沙盒化 iframe 打开的所有窗口。这包括使用带 <code>target=_blank</code> 的链接创建的新窗口（添加 <code>allow-popups</code> 以允许此操作）。将 <code>allow-popups-to-escape-sandbox</code> 添加到 <code>sandbox</code> 属性中，确保这些新窗口的行为与未进行沙盒化的新窗口的行为类似。在大多数情况下，这可能是您所希望和期望的结果。遗憾的是，截至撰写此文时，仅 Chrome 支持 <code>allow-popups-to-escape-sandbox</code>。
              <br><br>如需详细了解沙盒属性，请参阅<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox">关于 MDN 的文档</a>。</td>
              </tr>
              <tr>
                <td width="40%"><strong>常见属性</strong></td>
                <td>此元素包含扩展到 AMP 组件的<a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">常见属性</a>。</td>
              </tr>
            </table>

# 具有 placeholder 的 iframe <a name="iframe-with-placeholder"></a>

如果 `amp-iframe` 包含 `placeholder` 元素，则 `amp-iframe` 可以显示在文档顶部，如下例所示。

* `amp-iframe` 必须包含具有 `placeholder` 属性的元素（如 `amp-img` 元素），后者在 iframe 准备好显示之前会以占位符形式呈现。
* iframe 就绪状况可通过监听 iframe 的 `onload` 或可通过 iframe 文档发送的 `embed-ready` `postMessage`（以先到者为准）确定。

*示例：具有 placeholder 的 iframe*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow-same-origin"
    src="https://foo.com/iframe">
    <amp-img layout="fill" src="https://foo.com/foo.png" placeholder></amp-img>
</amp-iframe>
```

*示例：iframe embed-ready 请求*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-ready'
  }, '*');
```

# iframe 大小调整 <a name="iframe-resizing"></a>

`amp-iframe` 必须指定静态布局，与任何其他 AMP 元素一样。不过，您可以在运行时调整 `amp-iframe` 的大小。为此，请按下列步骤操作：

1. `amp-iframe` 必须使用 `resizable` 属性进行定义。
1. `amp-iframe` 必须包含 `overflow` 子元素。
1. `amp-iframe` 必须设置 `allow-same-origin` 沙盒属性。
1. iframe 文档必须以窗口消息的形式发送 `embed-size` 请求。
1. 如果 `embed-size` 请求的高度小于特定阈值（100 像素），则该请求会遭到拒绝。

请注意，`resizable` 会将 `scrolling` 的值替换为 `no`。

*示例：具有 `overflow` 元素的 `amp-iframe`*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow-same-origin"
    resizable
    src="https://foo.com/iframe">
    <div overflow tabindex=0 role=button aria-label="Read more">Read more!</div>
</amp-iframe>
```

*示例：iframe 大小调整请求*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-size',
  height: document.body.scrollHeight
  }, '*');
```

收到此消息后，AMP 运行时会尝试尽快处理该请求，但会考虑以下因素：读取设备目前读取的位置、滚动操作是否仍在进行，以及任何其他用户体验或性能因素。如果运行时无法满足大小调整请求，`amp-iframe` 会显示 `overflow` 元素。点击 `overflow` 元素即可立即调整 `amp-iframe` 大小，因为该操作是由用户操作触发的。

以下是影响大小调整执行速度的部分因素：

* 调整大小操作是否由用户操作触发。
* 调整大小是否为当前处于活动状态的 iframe 请求的。
* 调整大小是否为位于视口下方或上方的 iframe 请求的。

# iframe 可见度 <a name="iframe-viewability"></a>

iframe 可以将 `send-intersections` 消息发送至其父级，以开始接收 iframe 与父视口相交部分的 IntersectionObserver 样式[更改记录](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)。

*注意：在以下示例中，我们假设脚本在创建的 iframe 内，其中 `window.parent` 表示顶部窗口。如果脚本位于嵌套 iframe 内，请将 `window.parent` 更改为顶部 AMP 窗口。*

*示例：iframe `send-intersections` 请求*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'send-intersections'
  }, '*');
```

iframe 可以通过监听来自父窗口的 `intersection` 消息来接收相交数据。

*示例：iframe `send-intersections` 请求*

```javascript
window.addEventListener('message', function(event) {
  if (event.source != window.parent ||
  event.origin == window.location.origin ||
  !event.data ||
  event.data.sentinel != 'amp' ||
  event.data.type != 'intersection') {
    return;
    }
  event.data.changes.forEach(function (change) {
    console.log(change);
  });
});
```

在 iframe 移入或移出视口（或部分可见）时，或者在滚动 iframe 或调整其大小时，iframe 父级会将相交消息发送给 iframe。

# 跟踪/分析 iframe <a name="trackinganalytics-iframes"></a>

我们强烈建议将 [`amp-analytics`](amp-analytics.md) 用于分析，因为该解决方案显然更加强大、全面和高效，可为各种分析服务供应商进行配置。

AMP 仅允许每个页面使用一个 iframe 进行分析和跟踪。为了节约资源，这些 iframe 会在加载 5 秒后从 DOM 中移除，这一时间应该足以完成任何需要完成的工作。

如果 iframe 的直接目的看起来不是为用户提供服务（例如，不可见或很小），则标识为跟踪/分析 iframe。

# 准则：使用现有 AMP 组件而非 amp-iframe <a name="guideline-use-existing-amp-components-over-amp-iframe"></a>

如果在 AMP 中无法通过其他方法获取所需的用户体验，则应将 `amp-iframe` 组件视为备用方法，也就是说，对于这种用例，现在还没有相应的 [AMP 组件](../../../documentation/components/index.html)。这是因为针对特定用例使用 AMP 组件有诸多益处，例如：

* 更好地进行资源管理和提升性能
* 在某些情况下，自定义组件可提供内置占位符图片。这意味着，比如说，在视频加载之前获取正确的视频缩略图，还可减少手动添加占位符所需的编码工作。
* 内置大小调整功能。这意味着，大小无法预测的 iframe 内容能够更频繁向用户展示，这些内容就好像与页面内容浑然一体，而不是在可滚动的框架中。
* 还可以内置其他功能（例如，视频播放器自动播放功能）

# 验证 <a name="validation"></a>

请参阅 AMP 验证工具规范中的 [amp-iframe 规则](https://github.com/ampproject/amphtml/blob/main/extensions/amp-iframe/validator-amp-iframe.protoascii)。
