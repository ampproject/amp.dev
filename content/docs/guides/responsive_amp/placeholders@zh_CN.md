---
$title: 占位符和备用行为
$order: 3
toc: true
components:
- iframe
---
[TOC]

使用 AMP 时，为了显著提升效果并充分利用渐进增强的优势，最好尽可能提供占位符和备用行为。

如果这样做，一些元素甚至会通过放宽限制来给您带来意想不到的惊喜，例如，如果您为 [`<amp-iframe>`](/zh_cn/docs/reference/components/amp-iframe.html#iframe-with-placeholder) 提供占位符，便可在网页顶部附近使用该功能（如果不提供占位符，则无法使用）。

## 占位符

标记有 `placeholder` 属性的元素充当父级 AMP 元素的占位符。如果指定的话，则 `placeholder` 元素必须是 AMP 元素的直接子级。标记为 `placeholder` 的元素将始终 `fill` 父级 AMP 元素。

<!--embedded amp-anim responsive example -->
<div>
<amp-iframe height="253"
layout="fixed-height"
sandbox="allow-scripts allow-forms allow-same-origin"
resizable
src="https://ampproject-b5f4c.firebaseapp.com/examples/ampanim.responsive.embed.html">
<div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
<div placeholder></div> 
</amp-iframe>
</div>

默认情况下，即使 AMP 元素的资源尚未下载或初始化，与该 AMP 元素对应的占位符也会立即显示。准备就绪后，AMP 元素通常会隐藏其占位符并显示相应内容。

{% call callout('注意', type='note') %}
占位符不一定非得是 AMP 元素；任何 HTML 元素都可充当占位符。
{% endcall %}

## 备用行为

您可以使用 `fallback` 属性指明浏览器不支持的任何元素的备用行为。例如，您可以使用 `fallback` 属性告知用户，浏览器不支持特定功能：

<!--embedded video example  -->
<div>
<amp-iframe height="234"
layout="fixed-height"
sandbox="allow-scripts allow-forms allow-same-origin"
resizable
src="https://ampproject-b5f4c.firebaseapp.com/examples/ampvideo.fallback.embed.html">
<div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
<div placeholder></div> 
</amp-iframe>
</div>

`fallback` 属性可在任何 HTML 元素上设置，而不仅仅是 AMP 元素。如果指定的话，则 `fallback` 元素必须是 AMP 元素的直接子级。

## 占位符和后备元素的互动

对于依赖动态内容的 AMP 组件（例如 `amp-twitter`、`amp-list`），后备元素和占位符的互动按如下方式进行：

<ol>
  <li>在内容加载过程中展示占位符。</li>
  <li>如果内容成功加载，则隐藏占位符并展示内容。</li>
  <li>如果内容加载失败：
    <ol>
      <li>如果有后备元素，则展示后备元素。</li>
      <li>否则，继续展示占位符。</li>
    </ol>
  </li>
</ol>

## 隐藏 "正在加载指示器"

很多 AMP 元素已列入白名单，会显示 "正在加载指示器"，这是一个基本动画，用于表明元素尚未完全加载。只需添加 `noloading` 属性，元素即不会再出现这种行为。

