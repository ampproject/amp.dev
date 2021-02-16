---
'$title': 添加图片和视频
$order: 8
description: 像在普通 HTML 网页上一样，您可以在 AMP 中嵌入图片、视频和音频内容。了解 AMP 等效项有何不同以及如何…
formats:
  - websites
  - stories
  - email
  - ads
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

像在普通 HTML 网页上一样，您可以在 AMP 上嵌入 **图片**、**视频** 和**音频** 内容。了解 AMP 标记有何不同以及如何将它们添加到您的网页中。

## 为什么不支持 `<img>`、`<video>` 和 `<audio>`？

AMP 不支持用于显示媒体内容的默认 HTML 组件，如 `<img>`。我们出于以下原因提供了相似的组件：

- 我们需要在素材资源加载之前了解网页布局，这对 [为第一视口预加载提供支持来说至关重要](../../../../about/how-amp-works.html#size-all-resources-statically)
- 我们需要控制网络请求，以 [延迟加载并高效排定资源的优先顺序](../../../../about/how-amp-works.html#prioritize-resource-loading)

注意: 尽管默认的 HTML 组件不受支持，但仍*会* 呈现在网页上，不过 AMP 不会 [验证您的网页，](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) 如果您的网页上显示了 HTML 组件，您将无法享受 AMP 提供的所有优势。

## 图片

使用 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 元素向您的网页中添加图片，如下所示：

[example preview="inline" playground="true"]

```html
<amp-img
  alt="A beautiful sunset"
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195"
>
</amp-img>
```

[/example]

在这个最基本的示例中，图片会以指定的固定高度和宽度显示。至少要设置明确的宽度和高度。

#### JavaScript 停用时显示图片

由于 `<amp-img>` 依赖于 JavaScript，因此如果用户选择停用脚本，图片将不会显示。在这种情况下，您应该使用 `<img>` 和 `<noscript>` 来提供后备图片，如下所示：

[example preview="inline" playground="true"]

```html
<amp-img
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195"
>
  <noscript>
    <img
      src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
      width="264"
      height="195"
    />
  </noscript>
</amp-img>
```

[/example]

### 高级布局

与使用标准 CSS/HTML 相比，使用 AMP 可以更轻松地创建完全自适应的图片。您只需向其最基本的形式中添加 `layout="responsive"` 即可：

[example preview="inline" playground="true"]

```html
<amp-img
  alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive"
>
</amp-img>
```

[/example]

阅读: 详细了解 [高级布局技术](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md)。

### 行为和占位符

AMP HTML 运行时可有效管理图片资源，从而可使您根据视口位置、系统资源、连接带宽或其他因素，选择延迟资源加载或排定资源加载的优先顺序。

阅读: 了解如何 [提供后备图片和占位符](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md)。

## 动画图片

The [`amp-anim`](../../../../documentation/components/reference/amp-anim.md) 元素与 [`amp-img`](../../../../documentation/components/reference/amp-img.md) 元素非常相似，且前者提供额外功能，可以管理 GIF 等动画图片的加载和播放。

[example preview="inline" playground="true" imports="amp-anim:0.1"]

```html
<amp-anim
  width="400"
  height="300"
  src="{{server_for_email}}/static/inline-examples/images/wavepool.gif"
>
  <amp-img
    placeholder
    width="400"
    height="300"
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png"
  >
  </amp-img>
</amp-anim>
```

[/example]

注意: 您需要在网页的标头部分添加 <code><script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script></code> 才能使用此组件。

## 视频

使用 [`amp-video`](../../../../documentation/components/reference/amp-video.md) 元素向您的网页中添加视频。

仅针对直接 HTML5 视频文件嵌入使用此元素。此元素能以 AMP 确定的时间延迟加载由 `src` 属性所指定的视频资源。

在视频开始播放前添加占位符，如果浏览器不支持 HTML5 视频，则添加后备视频，例如：

[example preview="inline" playground="true" imports="amp-video:0.1"]

```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```

[/example]

## 音频

使用 [`amp-audio`](../../../../documentation/components/reference/amp-audio.md) 元素向您的网页中添加音频资源。

仅针对直接 HTML5 音频文件嵌入使用此元素。像 AMP 网页中所有嵌入的外部资源一样，此元素能以 AMP 确定的时间延迟加载由 `src` 属性所指定的音频资源。

在音频开始播放前添加占位符，如果浏览器不支持 HTML5 音频，则添加后备音频，例如：

[example preview="inline" playground="true" imports="amp-audio:0.1"]

```html
<amp-audio width="400"
  height="200"
  {% if format == 'stories' %}  layout="nodisplay" autoplay
  {% endif %}
  src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <div fallback>
    <p>Your browser doesn’t support HTML5 audio.</p>
  </div>
  <source type="audio/mpeg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <source type="audio/ogg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.ogg">
</amp-audio>
```

[/example]

注意: 您需要在网页的标头部分添加 <code> <script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script></code> 才能使用此组件。
