---
$title: 包含第三方内容
---

了解如何在网页中包含第三方组件。

## 嵌入 Twitter 微博

您可以使用 [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) 元素在您的网页中嵌入 Twitter 微博。

要在网页中包含 Twitter 微博，请先在 `<head>` 中添加以下脚本：

[sourcecode:html]
<script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
[/sourcecode]

目前，Twitter 微博可自动按比例调整以适应指定尺寸，不过外观的效果可能不太理想。您可以手动调整指定的宽度和高度，也可以使用媒体属性以根据屏幕宽度选择宽高比。

[example preview="inline" playground="true" imports="amp-twitter:0.1"]
```html
<amp-twitter width="500"
  height="583"
  layout="responsive"
  data-tweetid="638793490521001985">
</amp-twitter>
```
[/example]

提示: 要查看更多 [`amp-twitter`](../../../../documentation/components/reference/amp-twitter.md) 的示例，请访问 [AMP By Example](../../../../documentation/examples/documentation/amp-twitter.html)。

## 嵌入 Instagram

您可以使用 [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) 元素在您的网页中嵌入 Instagram。

要包含 Instagram，请先在 `<head>` 中添加以下脚本：

[sourcecode:html]
<script async custom-element="amp-instagram" src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"></script>
[/sourcecode]

包含 Instagram 照片网址中的 Instagram data-shortcode。例如，在 `https://instagram.com/p/fBwFP` 中，`fBwFP` 是 data-shortcode。此外，Instagram 使用固定宽高比来创建自适应布局，因此宽度和高度值应该是通用的

[example preview="inline" playground="true" imports="amp-instagram:0.1"]
```html
<amp-instagram data-shortcode="fBwFP"
  width="320"
  height="392"
  layout="responsive">
</amp-instagram>
```
[/example]

提示: 要查看更多 [`amp-instagram`](../../../../documentation/components/reference/amp-instagram.md) 的示例，请访问 [AMP By Example](../../../../documentation/examples/documentation/amp-instagram.html)。

## 显示 Facebook 帖子或视频

您可以使用 [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md) 元素在您的网页中显示 Facebook 帖子或视频。

您必须在 `<head>` 中添加以下脚本：

[sourcecode:html]
<script async custom-element="amp-facebook" src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"></script>
[/sourcecode]

##### 示例 - 嵌入帖子

Source:
```html
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>
```
Preview:
<amp-facebook width="486" height="657"
    layout="responsive"
    data-href="https://www.facebook.com/zuck/posts/10102593740125791">
</amp-facebook>

##### 示例 - 嵌入视频

Source:
```html
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>
```
Preview:
<amp-facebook width="476" height="316"
    layout="responsive"
    data-embed-as="video"
    data-href="https://www.facebook.com/nasaearth/videos/10155187938052139">
</amp-facebook>

提示: 要查看更多 [`amp-facebook`](../../../../documentation/components/reference/amp-facebook.md) 的示例，请访问 [AMP By Example](../../../../documentation/examples/documentation/amp-facebook.html)。

## 包含 YouTube 视频

您可以使用 [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) 元素在您的网页中添加 YouTube 视频。

您必须在 `<head>` 中添加以下脚本：

[sourcecode:html]
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
[/sourcecode]

每个 Youtube 视频页面网址中均包含 YouTube `data-videoid`。例如，在 https://www.youtube.com/watch?v=Z1q71gFeRqM 中，Z1q71gFeRqM 就是视频 ID。

使用 `layout="responsive"`，使宽高比为 16:9 的视频呈现正确的布局：

[example preview="inline" playground="true" imports="amp-youtube:0.1"]
```html
<amp-youtube data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315">
</amp-youtube>
```
[/example]

提示: 要查看更多 [`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) 的示例，请访问 [AMP By Example](../../../../documentation/examples/documentation/amp-youtube.html)。

## 显示广告

您可以使用 [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) 元素在您的网页中显示广告。仅支持通过 HTTPS 投放的广告。

AMP 文档中不得运行任何广告网络提供的 JavaScript。AMP 运行时会加载来自其他来源的 iframe（通过 iframe 沙盒），并在该 iframe 沙盒内执行广告网络的 JS。

您必须指定广告的宽度和高度以及广告网络类型。`type` 会标识广告网络的模板。不同的广告类型要求不同的 `data-*` 属性。

[example preview="inline" playground="true" imports="amp-ad:0.1"]
```html
<amp-ad width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5">
</amp-ad>
```
[/example]

如果受到广告网络的支持，请添加 `placeholder`，以便在没有广告可用时显示。

[example preview="inline" playground="true" imports="amp-ad:0.1"]
```html
<amp-ad width="300"
  height="250"
  type="a9"
  data-amzn_assoc_ad_mode="auto"
  data-divid="amzn-assoc-ad-fe746097-f142-4f8d-8dfb-45ec747632e5"
  data-recomtype="async"
  data-adinstanceid="fe746097-f142-4f8d-8dfb-45ec747632e5">
  <div placeholder>Have a great day!</div>
</amp-ad>
```
[/example]

AMP 支持众多广告网络。请参阅[完整列表参考](../../../../documentation/components/reference/amp-ad.md#supported-ad-networks)。

阅读: 要详细了解广告，请参阅[在 AMP 网页上投放广告](../../../../documentation/guides-and-tutorials/develop/monetization/index.md)指南。
