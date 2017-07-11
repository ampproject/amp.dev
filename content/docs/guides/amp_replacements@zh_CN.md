---
$title: 添加图片和视频
$order: 1
$category: Develop

toc: true
---

[TOC]

 像在普通 HTML 网页上一样，您可以在 AMP 上嵌入 **图片**、**视频** 和**音频**
内容。了解 AMP 标记有何不同以及如何将它们添加到您的网页中。

##  为什么不支持 `<img>`、`<video>` 和 `<audio>`？

 AMP 不支持用于显示媒体内容的默认 HTML 组件，如 `<img>`。我们出于以下原因提供了相似的组件：

*  我们需要在素材资源加载之前了解网页布局，这对 [为第一视口预加载提供支持来说至关重要](/zh_cn/learn/about-how/#size-all-resources-statically)
*  我们需要控制网络请求，以 [延迟加载并高效排定资源的优先顺序](/zh_cn/learn/about-how/#prioritize-resource-loading)

{% call callout('注意', type='caution') %}
 尽管默认的 HTML 组件不受支持，但仍*会*  呈现在网页上，不过 AMP 不会 [验证您的网页，](/zh_cn/doc/guides/debug/validate.html) 
如果您的网页上显示了 HTML 组件，您将无法享受 AMP 提供的所有优势。{% endcall %}

## 图片

 使用 [`amp-img`](/zh_cn/doc/reference/components/amp-img.html) 元素向您的网页中添加图片，如下所示：

[sourcecode:html]
<amp-img src="fixed.jpg" width="264" height="96"></amp-img>
[/sourcecode]

在这个最基本的示例中，图片会以指定的固定高度和宽度显示。至少要设置明确的宽度和高度。

#### JavaScript 停用时显示图片

 由于 `<amp-img>` 依赖于 JavaScript，因此如果用户选择停用脚本，图片将不会显示。在这种情况下，您应该使用 `<img>` 和 `<noscript>` 来提供后备图片，如下所示：

[sourcecode:html]
<amp-img src="fixed.jpg" width="264" height="96">
<noscript>
<img src="fixed.jpg" width="264" height="96" />
</noscript>
</amp-img>
[/sourcecode]

### 高级布局

 与使用标准 CSS/HTML 相比，使用 AMP 可以更轻松地创建完全自适应的图片。您只需向其最基本的形式中添加 `layout="responsive"` 即可：

[sourcecode:html]
<amp-img src="responsive.jpg" width="527" height="193" layout="responsive">
</amp-img>
[/sourcecode]

{% call callout('阅读', type='success') %}
详细了解 [高级布局技术](/zh_cn/doc/guides/author-develop/responsive/control_layout.html)
。{% endcall %}

### 行为和占位符

AMP HTML 运行时可有效管理图片资源，从而可使您根据视口位置、系统资源、连接带宽或其他因素，选择延迟资源加载或排定资源加载的优先顺序。

{% call callout('阅读', type='success') %}
了解如何 [提供后备图片和占位符](/zh_cn/doc/guides/author-develop/responsive/placeholders.html)
。{% endcall %}

## 动画图片

 The [`amp-anim`](/zh_cn/doc/reference/components/amp-anim.html) 元素与 `amp-img` 元素非常相似，且前者提供额外功能，可以管理 GIF 等动画图片的加载和播放。

[sourcecode:html]
<amp-anim width="400" height="300" src="my-gif.gif">
<amp-img placeholder width="400" height="300" src="my-gif-screencap.jpg">
</amp-img>
</amp-anim>
[/sourcecode]

{% call callout('注意', type='note') %}
 您需要在网页的标头部分添加 `<script async custom-element="amp-anim"
src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>` 
才能使用此组件。{% endcall %}

## 视频

 使用 [`amp-video`](/zh_cn/doc/reference/components/amp-video.html) 元素向您的网页中添加视频。

 仅针对直接 HTML5 视频文件嵌入使用此元素。此元素能以 AMP 确定的时间延迟加载由
`src` 属性所指定的视频资源。

在视频开始播放前添加占位符，如果浏览器不支持 HTML5 视频，则添加后备视频，例如：

[sourcecode:html]
<amp-video width="400" height="300" src="https://yourhost.com/videos/myvideo.mp4"
poster="myvideo-poster.jpg">

<div fallback>
    <p>您的浏览器不支持 HTML5 视频</p>
  </div>
</amp-video>
[/sourcecode]

## 音频

 使用 [`amp-audio`](/zh_cn/doc/reference/components/amp-audio.html) 元素向您的网页中添加音频资源。

 仅针对直接 HTML5 音频文件嵌入使用此元素。像 AMP 网页中所有嵌入的外部资源一样，此元素能以 AMP 确定的时间延迟加载由
`src` 属性所指定的音频资源。

在音频开始播放前添加占位符，如果浏览器不支持 HTML5 音频，则添加后备音频，例如：

[sourcecode:html]
<amp-audio width="400" height="300" src="https://yourhost.com/audios/myaudio.mp3">

<div fallback>
    <p>您的浏览器不支持 HTML5 音频</p>
  </div>
  <source type="audio/mpeg" src="foo.mp3">
  <source type="audio/ogg" src="foo.ogg">
</amp-audio>
[/sourcecode]

{% call callout('注意', type='note') %}
 您需要在网页的标头部分添加 ` <script async custom-element="amp-audio"
src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>`  
 才能使用此组件。{% endcall %}

