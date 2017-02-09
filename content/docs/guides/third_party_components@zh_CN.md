---
$title: 包含第三方内容
---

了解如何在网页中包含第三方组件。

[TOC]

## 嵌入 Twitter 微博

您可以使用 [`amp-twitter`](/docs/reference/extended/amp-twitter.html) 元素在您的网页中嵌入 Twitter 微博。

要在网页中包含 Twitter 微博，请先在 `<head>` 中添加以下脚本：

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

目前，Twitter 微博可自动按比例调整以适应指定尺寸，不过外观的效果可能不太理想。您可以手动调整指定的宽度和高度，也可以使用媒体属性以根据屏幕宽度选择宽高比。

来自 [twitter.amp 示例](https://github.com/ampproject/amphtml/blob/master/examples/twitter.amp.html)的示例 `amp-twitter`：

[sourcecode:html]
<amp-twitter width=390 height=50
    layout="responsive"
    data-tweetid="638793490521001985">
</amp-twitter>
[/sourcecode]

## 嵌入 Instagram

您可以使用 [`amp-instagram`](/docs/reference/extended/amp-instagram.html) 元素在您的网页中嵌入 Instagram。

要包含 Instagram，请先在 `<head>` 中添加以下脚本：

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

包含 Instagram 照片网址中的 Instagram data-shortcode。例如，在 `https://instagram.com/p/fBwFP` 中，`fBwFP` 是 data-shortcode。此外，Instagram 使用固定宽高比来创建自适应布局，因此宽度和高度值应该是通用的

[sourcecode:html]
<amp-instagram
    data-shortcode="fBwFP"
    width="320"
    height="392"
    layout="responsive">
</amp-instagram>
[/sourcecode]

## 显示 Facebook 帖子或视频

您可以使用 [`amp-facebook`](/docs/reference/extended/amp-facebook.html) 元素在您的网页中显示 Facebook 帖子或视频。

您必须在 `<head>` 中添加以下脚本：

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

示例 - 嵌入帖子：

[sourcecode:html]
<amp-facebook width=486 height=657
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
[/sourcecode]

示例 - 嵌入视频：

[sourcecode:html]
<amp-facebook width=552 height=574
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/zuck/videos/10102509264909801/">
</amp-facebook>
[/sourcecode]

## 包含 YouTube 视频

您可以使用 [`amp-youtube`](/docs/reference/extended/amp-youtube.html) 元素在您的网页中添加 YouTube 视频。

您必须在 `<head>` 中添加以下脚本：

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

每个 Youtube 视频页面网址中均包含 YouTube `data-videoid`。例如，在 https://www.youtube.com/watch?v=Z1q71gFeRqM 中，Z1q71gFeRqM 就是视频 ID。

使用 `layout="responsive"`，使宽高比为 16:9 的视频呈现正确的布局：

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270">
</amp-youtube>
[/sourcecode]

## 显示广告

您可以使用 [`amp-ad`](/docs/reference/amp-ad.html) 元素在您的网页中显示广告。仅支持通过 HTTPS 投放的广告。

AMP 文档中不得运行任何广告网络提供的 JavaScript。AMP 运行时会加载来自其他来源的 iframe（通过 iframe 沙盒），并在该 iframe 沙盒内执行广告网络的 JS。

您必须指定广告的宽度和高度以及广告网络类型。`type` 会标识广告网络的模板。不同的广告类型要求不同的 `data-*` 属性。

[sourcecode:html]
<amp-ad width=300 height=250
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
[/sourcecode]

如果受到广告网络的支持，请添加 `placeholder`，以便在没有广告可用时显示。

[sourcecode:html]
<amp-ad width=300 height=250
    type="example"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
  <div placeholder>Have a great day!</div>
</amp-ad>
[/sourcecode]

AMP 支持众多广告网络。请参阅[完整列表参考](/docs/reference/amp-ad.html#supported-ad-networks)。
