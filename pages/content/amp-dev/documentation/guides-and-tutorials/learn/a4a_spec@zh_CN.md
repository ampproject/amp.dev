---
'$title': AMP 广告规范
$order: 3
formats:
  - 广告
teaser:
  text: _如果您想对标准提出更改建议，请在 [Intent
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/amp-a4a-format.md.
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

_如果您想对标准提出更改建议，请在 [Intent to Implement](https://github.com/ampproject/amphtml/issues/4264) 下添加评论_。

AMPHTML 广告是一种在 AMP 网页上快速高效渲染广告的机制。为了确保在浏览器中快速流畅地渲染 AMPHTML 广告文档（“AMP 广告素材”），并且不会降低用户体验，AMP 广告素材必须遵守一组验证规则。AMPHTML 广告在本质上与 [AMP 格式规则](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml)类似，只能访问一组有限的受支持的标记、功能和扩展项。

## AMPHTML 广告格式规则 <a name="amphtml-ad-format-rules"></a>

除非下文另有说明，否则，广告素材必须遵守 [AMP 格式规则](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml.html)指定的所有规则，此处仅供参考。例如，AMPHTML 广告[样板](#boilerplate)偏离 AMP 标准样板。

此外，广告素材还必须遵守以下规则：

<table>
<thead><tr>
  <th>规则</th>
  <th>理由</th>
</tr></thead>
<tbody>
<tr>
<td>必须使用 <code>&lt;html ⚡4ads></code> 或 <code>&lt;html amp4ads></code> 作为封闭标记。</td>
<td>允许验证工具将广告素材文档识别为常规 AMP 文档或受限的 AMPHTML 广告文档并进行相应分发。</td>
</tr>
<tr>
<td>必须包含 <code>&lt;script async src="https://ampjs.org/amp4ads-v0.js">&lt;/script></code> 而不是 <code>https://ampjs.org/v0.js</code> 作为运行时脚本。</td>
<td>允许在跨源 iframe 中投放的 AMPHTML 广告存在量身定制的运行时行为。</td>
</tr>
<tr>
<td>不得包含 <code>&lt;link rel="canonical"></code> 标记。</td>
<td>广告素材没有“非 AMP 规范版本”，不会独立编制搜索索引，因此，自引用没有任何用处。</td>
</tr>
<tr>
<td>可以在 HTML head 中包含可选的元标记，作为标识符，格式为：<code>&lt;meta name="amp4ads-id" content="vendor=${vendor},type=${type},id=${id}"></code>。这些元标记必须放在 <code>amp4ads-v0.js</code>  脚本前面。<code>vendor</code> 和 <code>id</code> 的值是仅包含 [0-9a-zA-Z_-] 的字符串。<code>type</code> 的值为 <code>creative-id</code> 或 <code>impression-id</code>。</td>
<td>这些自定义标识符可用于标识展示或广告素材，并且有助于报告和调试。<br><br><p>示例：</p>
<pre>
&lt;meta name="amp4ads-id"
  content="vendor=adsense,type=creative-id,id=1283474">
&lt;meta name="amp4ads-id"
  content="vendor=adsense,type=impression-id,id=xIsjdf921S"></pre>
</td>
</tr>
<tr>
<td>
<code>&lt;amp-analytics></code> 可见度跟踪只能通过 <a href="https://github.com/ampproject/amphtml/issues/4018">问题 #4018</a> 和 <a href="https://github.com/ampproject/amphtml/pull/4368">PR #4368</a> 中定义的 <code>"visibilitySpec": { "selector": "amp-ad" }</code> 来定位完整广告选择器。特别需要说明的是，它无法定位广告素材中元素的任何选择器。</td>
<td>在某些情况下，AMPHTML 广告可能选择在 iframe 中渲染广告素材。这种情况下，托管页面分析只能定位整个 iframe，而无法访问任何细粒度更高的选择器。<br><br> <p>示例：</p> <pre>
&lt;amp-analytics id="nestedAnalytics">
  &lt;script type="application/json">
  {
    "requests": {
      "visibility": "https://example.com/nestedAmpAnalytics"
    },
    "triggers": {
      "visibilitySpec": {
      "selector": "amp-ad",
      "visiblePercentageMin": 50,
      "continuousTimeMin": 1000
      }
    }
  }
  &lt;/script>
&lt;/amp-analytics>
</pre> <p>如果所属广告的一半已在屏幕上持续显示 1 秒，则此配置会将请求发送到网址 <code>https://example.com/nestedAmpAnalytics</code>。</p>
</td>
</tr>
</tbody>
</table>

### 样板 <a name="boilerplate"></a>

AMPHTML 广告素材需要与[常规 AMP 文档](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md)不同且更为简单的样板样式行。

[sourcecode:html]

<style amp4ads-boilerplate>
  body {
    visibility: hidden;
  }
</style>

[/sourcecode]

<em>理由</em>：<code>amp-boilerplate</code> 样式会一直隐藏主体内容，直到 AMP 运行时准备就绪并且可以将其取消隐藏。如果 Javascript 已停用，或者 AMP 运行时无法加载，则无论如何默认样板都会确保内容完全显示。但是，在 AMPHTML 广告中，如果 Javascript 已完全停用，AMPHTML 广告将不会运行，并且不会显示任何广告，因此，不需要 <code><noscript></code> 版块。如果缺少 AMP 运行时，AMPHTML 广告所依赖的大部分机制（例如，用于跟踪可见度的分析，或者用于显示内容的 <code>amp-img</code>）将不可用，因此，与出现故障相比，不显示任何广告要更好。

最后，AMPHTML 广告样板使用 `amp-a4a-boilerplate`，而不是 `amp-boilerplate`，因此，验证工具可以轻松识别它，并且可以生成更准确的错误消息，以便为开发者提供帮助。

请注意，有关样板文本变化的规则同样也适用于[常规 AMP 样板](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md)。

### CSS <a name="css"></a>

<table>
<thead><tr>
  <th>规则</th>
  <th>理由</th>
</tr></thead>
<tbody>
  <tr>
    <td>广告素材 CSS 中不允许使用 <code>position:fixed</code> 和 <code>position:sticky</code>。</td>
    <td>
<code>position:fixed</code> 超出了 AMPHTML 广告所依赖的影子 DOM 的范围。目前还不允许 AMP 中的本地共享对象广告使用固定位置。</td>
  </tr>
  <tr>
    <td>不允许使用 <code>touch-action</code>。</td>
    <td>如果广告可以操作 <code>touch-action</code>，则该广告会干扰用户滚动托管文档。</td>
  </tr>
  <tr>
    <td>广告素材 CSS 最多可以包含 20,000 字节。</td>
    <td>大型 CSS 块会使广告素材膨胀，增加网络延迟，以及降低页面性能。</td>
  </tr>
  <tr>
    <td>过渡和动画受其他限制影响。</td>
    <td>AMP 必须能够对属于广告的所有动画进行控制，这样才能在广告未显示在屏幕上或者系统资源运行速度缓慢时将动画停止。</td>
  </tr>
  <tr>
    <td>供应商特有的前缀被视为用于进行验证且无前缀的相同符号的别名。这意味着，如果 CSS 验证规则不允许使用符号 <code>foo</code>，则也不允许使用 <code>-vendor-foo</code> 符号。</td>
    <td>有些以供应商为前缀的属性具有的功能与这些规则所禁用或限制的属性相同。<br><br><p>示例：<code>-webkit-transition</code> 和 <code>-moz-transition</code> 均被视为 <code>transition</code> 的别名。它们只能在允许使用 <code>transition</code> 的语境下使用（请参阅下文的<a href="#selectors">选择器</a>部分）。</p>
</td>
  </tr>
</tbody>
</table>

#### CSS 动画和过渡 <a name="css-animations-and-transitions"></a>

##### 选择器 <a name="selectors"></a>

`transition` 和 `animation` 属性只能在以下选择器中使用：

- 仅包含 `transition`、`animation`、`transform`、`visibility` 或 `opacity` 属性。

  _理由_：这将支持 AMP 运行时从语境中移除此类，以便在必要时停用动画，从而提高页面性能。

**效果良好**

[sourcecode:css]
.box {
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

**效果欠佳**

不允许在 CSS 类中使用属性。

[sourcecode:css]
.box {
color: red; // non-animation property not allowed in animation selector
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

##### 可过渡和可添加动画效果的属性 <a name="transitionable-and-animatable-properties"></a>

只有 opacity 和 transform 属性可以进行过渡。（[理由](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)）

**效果良好**

[sourcecode:css]
transition: transform 2s;
[/sourcecode]

**效果欠佳**

[sourcecode:css]
transition: background-color 2s;
[/sourcecode]

**效果良好**

[sourcecode:css]
@keyframes turn {
from {
transform: rotate(180deg);
}

to {
transform: rotate(90deg);
}
}
[/sourcecode]

**效果欠佳**

[sourcecode:css]
@keyframes slidein {
from {
margin-left: 100%;
width: 300%;
}

to {
margin-left: 0%;
width: 100%;
}
}
[/sourcecode]

### 允许使用的 AMP 扩展项和内置标记 <a name="allowed-amp-extensions-and-builtins"></a>

*允许*在 AMPHTML 广告素材中使用以下 AMP 扩展模块和 AMP 内置标记。只能使用明确列出的扩展项或内置标记。

- [amp-accordion](https://amp.dev/documentation/components/amp-accordion)
- [amp-ad-exit](https://amp.dev/documentation/components/amp-ad-exit)
- [amp-analytics](https://amp.dev/documentation/components/amp-analytics)
- [amp-anim](https://amp.dev/documentation/components/amp-anim)
- [amp-animation](https://amp.dev/documentation/components/amp-animation)
- [amp-audio](https://amp.dev/documentation/components/amp-audio)
- [amp-bind](https://amp.dev/documentation/components/amp-bind)
- [amp-carousel](https://amp.dev/documentation/components/amp-carousel)
- [amp-fit-text](https://amp.dev/documentation/components/amp-fit-text)
- [amp-font](https://amp.dev/documentation/components/amp-font)
- [amp-form](https://amp.dev/documentation/components/amp-form)
- [amp-img](https://amp.dev/documentation/components/amp-img)
- [amp-layout](https://amp.dev/documentation/components/amp-layout)
- [amp-lightbox](https://amp.dev/documentation/components/amp-lightbox)
- amp-mraid（实验性）。如果您考虑使用此标记，请在 [wg-monetization](https://github.com/ampproject/wg-monetization/issues/new) 上提问。
- [amp-mustache](https://amp.dev/documentation/components/amp-mustache)
- [amp-pixel](https://amp.dev/documentation/components/amp-pixel)
- [amp-position-observer](https://amp.dev/documentation/components/amp-position-observer)
- [amp-selector](https://amp.dev/documentation/components/amp-selector)
- [amp-social-share](https://amp.dev/documentation/components/amp-social-share)
- [amp-video](https://amp.dev/documentation/components/amp-video)

忽略的大部分标记是出于性能考虑或者是为了简化 AMPHTML 广告的分析。

_示例_：上述列表中未列出 `<amp-ad>`。明确禁止的原因在于，如果允许在 `<amp-ad>` 内放入 `<amp-ad>`，可能会导致生成不受控制的广告加载瀑布流，从而无法满足 AMPHTML 广告的性能目标。

_示例_：上述列表中未列出 `<amp-iframe>`。禁止的原因在于，广告可以使用该标记执行任意 Javascript 并加载任意内容。如果广告想使用此类功能，它们应当在 [a4aRegistry](https://github.com/ampproject/amphtml/blob/main/ads/_a4a-config.js#L40) 条目中返回 <code>false</code>，并使用现有的“3p iframe”广告渲染机制。

_示例_：上述列表中未列出 `<amp-facebook>`、`<amp-instagram>`、`<amp-twitter>` 和 `<amp-youtube>`，原因与 `<amp-iframe>` 相同：这些标记全部都会创建 iframe，并且可能会在 iframe 中占用无限多的资源。

_示例_：上述列表中未列出 `<amp-ad-network-*-impl>`。`<amp-ad>` 标记会处理对这些实现标记的委托；广告素材不应当尝试直接包含这些实现标记。

_示例_：尚未包括 `<amp-lightbox>` 的原因在于，有些 AMPHTML 广告素材甚至可能会在 iframe 中进行渲染，目前还没有机制可以支持广告扩展到 iframe 范围外。以后可能会增加这方面的支持，前提是存在相应的需求。

### HTML 标记 <a name="html-tags"></a>

*允许*在 AMPHTML 广告素材中使用以下标记。只能使用明确允许的标记。以下列表是常规 [AMP 标记附录许可名单](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/../../spec/amp-tag-addendum.md)的一部分。与许可名单一样，以下列表按照 HTML5 规范中的第 4 节 [HTML 的元素](http://www.w3.org/TR/html5/single-page.html#html-elements)排序。

出于性能考虑或者是因为标记不符合 HTML5 标准，大部分标记均未列出。例如，未列出 `<noscript>` 的原因在于，AMPHTML 广告依赖于启用的 JavaScript，因此，`<noscript>` 块从不执行，只会使广告素材膨胀，占用带宽并增加延迟。同样地，也不允许使用 `<acronym>`、`<big>` 等标记，因为它们与 HTML5 标准不兼容。

#### 4.1 根元素 <a name="41-the-root-element"></a>

4.1.1 `<html>`

- 必须使用 `<html ⚡4ads>` 或 `<html amp4ads>` 类型

#### 4.2 文档元数据 <a name="42-document-metadata"></a>

4.2.1 `<head>`

4.2.2 `<title>`

4.2.4 `<link>`

- 不允许使用 `<link rel=...>` 标记，但 `<link rel=stylesheet>` 除外。

- **注**：与常规 AMP 不同的是，不允许使用 `<link rel="canonical">` 标记。

  4.2.5 `<style>` 4.2.6 `<meta>`

#### 4.3 版块 <a name="43-sections"></a>

4.3.1 `<body>` 4.3.2 `<article>` 4.3.3 `<section>` 4.3.4 `<nav>` 4.3.5 `<aside>` 4.3.6 `<h1>`、`<h2>`、`<h3>`、`<h4>`、`<h5>` 和 `<h6>` 4.3.7 `<header>` 4.3.8 `<footer>` 4.3.9 `<address>`

#### 4.4 内容分组 <a name="44-grouping-content"></a>

4.4.1 `<p>` 4.4.2 `<hr>` 4.4.3 `<pre>` 4.4.4 `<blockquote>` 4.4.5 `<ol>` 4.4.6 `<ul>` 4.4.7 `<li>` 4.4.8 `<dl>` 4.4.9 `<dt>` 4.4.10 `<dd>` 4.4.11 `<figure>` 4.4.12 `<figcaption>` 4.4.13 `<div>` 4.4.14 `<main>`

#### 4.5 文本级语义 <a name="45-text-level-semantics"></a>

4.5.1 `<a>` 4.5.2 `<em>` 4.5.3 `<strong>` 4.5.4 `<small>` 4.5.5 `<s>` 4.5.6 `<cite>` 4.5.7 `<q>` 4.5.8 `<dfn>` 4.5.9 `<abbr>` 4.5.10 `<data>` 4.5.11 `<time>` 4.5.12 `<code>` 4.5.13 `<var>` 4.5.14 `<samp>` 4.5.15 `<kbd >` 4.5.16 `<sub>` and `<sup>` 4.5.17 `<i>` 4.5.18 `<b>` 4.5.19 `<u>` 4.5.20 `<mark>` 4.5.21 `<ruby>` 4.5.22 `<rb>` 4.5.23 `<rt>` 4.5.24 `<rtc>` 4.5.25 `<rp>` 4.5.26 `<bdi>` 4.5.27 `<bdo>` 4.5.28 `<span>` 4.5.29 `<br>` 4.5.30 `<wbr>` <a></a>

#### 4.6 编辑 <a name="46-edits"></a>

4.6.1 `<ins>` 4.6.2 `<del>`

#### 4.7 嵌入式内容 <a name="47-embedded-content"></a>

- 只能使用 `<amp-img>` 或 `<amp-video>` 等 AMP 标记支持嵌入式内容。

#### 4.7.4 `<source>` <a name="474-source"></a>

#### 4.7.18 SVG <a name="4718-svg"></a>

SVG 标记不属于 HTML5 命名空间。以下列出的 SVG 标记没有板块 ID。

` <svg>``<g>``<path>``<glyph>``<glyphref>``<marker>``<view>``<circle>``<line>``<polygon>``<polyline>``<rect>``<text>``<textpath>``<tref>``<tspan>``<clippath>``<filter>``<lineargradient>``<radialgradient>``<mask>``<pattern>``<vkern>``<hkern>``<defs>``<use>``<symbol>``<desc>``<title> `

#### 4.9 表格数据 <a name="49-tabular-data"></a>

4.9.1 `<table>` 4.9.2 `<caption>` 4.9.3 `<colgroup>` 4.9.4 `<col>` 4.9.5 `<tbody>` 4.9.6 `<thead>` 4.9.7 `<tfoot>` 4.9.8 `<tr>` 4.9.9 `<td>` 4.9.10 `<th>`

#### 4.10 表单 <a name="410-forms"></a>

4.10.8 `<button>`

#### 4.11 脚本 <a name="411-scripting"></a>

- 与常规 AMP 文档一样，广告素材的 `<head>` 标记必须包含 `<script async src="https://ampjs.org/amp4ads-v0.js"></script>` 标记。
- 与常规 AMP 不同，不允许使用 `<noscript>`。
  - _理由_：由于 AMPHTML 广告需要启用 Javascript 才能工作，`<noscript>` 块在 AMPHTML 广告中不起任何作用，只会占用网络带宽。
- 与常规 AMP 不同，不允许使用 `<script type="application/ld+json">`。
  - _理由_：JSON LD 用于托管页面上的结构化数据标记，但广告素材不是独立的文档，并且不包含结构化数据。JSON LD 块本身只会占用网络带宽。
- 所有其他脚本规则和排除对象与常规 AMP 相同。
