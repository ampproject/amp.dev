---
'$title': 制作网页故事广告的最佳做法
$order: 16
description: 网页故事是一种可点按的全屏体验，可使读者沉浸在内容中。在网页故事中投放的广告应该具有与网页故事用户体验一致和连贯的设计。
formats:
  - 广告
  - 故事
---

网页故事是一种可点按的全屏体验，可使读者沉浸在内容中。在网页故事中投放的广告应该具有与网页故事用户体验一致和连贯的设计。这样可以防止产生不和谐或中断的用户体验。本指南将演示如何为网页故事制作广告。

## 网页故事广告原则

当前的广告格式，如横幅和方框，并不能很好地与 AMP 故事格式集成。经典广告缓慢、容易造成干扰，并且与故事体验格格不入。

网页故事广告遵循以下原则：

- 有效的 AMPHTML 广告：遵循与经典 [AMPHTML 广告](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/amp-a4a-format.md)相同的技术规范。
- 视觉优先：引人注目、粗体、符合上下文的邀请状态。
- 原生：广告页面与自然故事页面具有相同的尺寸。
- 相同的互动模型：用户可以像阅读自然故事页面那样前进到下一个屏幕。
- 快速：永远不会向用户呈现半加载状态的广告。

为了与这些原则保持一致，网页故事运行时决定广告页面在网页故事中的正确展示位置。有关广告展示位置机制的更多信息，请参阅[在网页故事中投放广告](advertise_amp_stories.md)。

## 网页故事广告示例

网页故事广告是 AMPHTML 广告，但需要元标记数据，满足定义的布局规范和所需的界面元素。一个网页故事广告始终包括一个号召性用语 (CTA) 按钮和一个在页面顶部以文本免责声明形式显示的广告标签。

{{ image('/static/img/docs/stampads/stamp_ad.png', 425, 800, layout='intrinsic', alt='AMP 故事广告示例', caption='AMP 故事广告示例', align='' ) }}

为了保持一致的用户体验，网页故事运行时负责呈现广告标签和 CTA 按钮。

[tip type="important"] **重要提示**：只有 CTA 按钮在网页故事广告中是可点击的，当您开发自己的广告素材时请留意这一点。[/tip]

## 元标记数据

元标记数据可指定广告符合网页故事格式，可设置 CTA 按钮文本枚举，并且可指示该按钮将用户跳转到的位置以及页面类型。

[sourcecode:html]

<html amp4ads>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">

    <!-- Specifies where the user is directed -->
    <meta name="amp-cta-url" content="%%CLICK_URL_UNESC%%%%DEST_URL%%">

    <!-- Specifies the call to action button text enum -->
    <meta name="amp-cta-type" content="EXPLORE">

    <!-- Specifies what type of landing page the user is direct to -->
    <meta name="amp-cta-landing-page-type" content="NONAMP">

    <style amp4ads-boilerplate>body{visibility:hidden}</style>
    <style amp-custom>
     amp-img {height: 100vh}
    </style>
    <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>

  </head>
  <body>
    <amp-img src=%%FILE:JPG1%% layout="responsive" height="1280" width="720"></amp-img>
  </body>
</html>
[/sourcecode]

建议从[可用的 CTA 按钮文本选项](#call-to-action-button-text-enum)中选择 <code>amp-cta-type</code> 标记。在适当的情况下，AMP 将自动本地化预定义选项。

允许使用自定义文本，但您需要自行实现本地化。

## 号召性用语按钮文本枚举<a name="call-to-action-button-text-enum"></a>

可以使用一系列预定义的选项配置号召性用语按钮：

- `APPLY_NOW`："立即申请"
- `BOOK_NOW`："预订"
- `BUY_TICKETS`："购票"
- `DOWNLOAD`："下载"
- `EXPLORE`："立即浏览"
- `GET_NOW`："立即获取"
- `INSTALL`："立即安装"
- `LISTEN`："立即收听"
- `MORE`："更多"
- `OPEN_APP`："打开应用"
- `ORDER_NOW`："立即订购"
- `PLAY`："播放"
- `READ`："立即阅读"
- `SHOP`："立即选购"
- `SHOWTIMES`："上映时间"
- `SIGN_UP`："注册"
- `SUBSCRIBE`："立即订阅"
- `USE_APP`："使用应用"
- `VIEW`："查看"
- `WATCH`："观看"
- `WATCH_EPISODE`："观看剧集"

[tip type="note"] **注**：不支持应用的深层链接，但支持使用 http/https 的 App Store 页面或 Google Play Store 页面链接。CTA 按钮文本枚举在广告响应负载中指定。[/tip]

如果需要支持一个新的 CTA 按钮文本枚举，请提交 [GitHub 问题](https://github.com/ampproject/amphtml/issues/new)。

## 广告着陆页

可为网页故事广告着陆页指定以下三个选项之一。

- `STORY`：着陆页是[赞助内容](story_ads_best_practices.md#sponsored-story)。
- `AMP`：着陆页是有效的 AMP 网页。
- `NONAMP`：任何其他类型的网页。

## 布局

网页故事以水平和全屏格式展示。故事广告需要匹配这种格式，以提供一致的用户体验。

## 叠加层尺寸

广告标签覆盖了一个深色的渐变条，跨越整个广告宽度，从顶部向下延伸 46 像素。

{{ image('/static/img/docs/stampads/ad_overlay.png', 515, 520, layout='intrinsic', alt='广告叠加层演示', caption='广告叠加层位于顶部', align='' ) }}

CTA 位于距离底部 32 像素的位置，水平居中。它的尺寸为 120 像素 x 36 像素。

{{ image('/static/img/docs/stampads/cta_button.png', 515, 520, layout='intrinsic', alt='CTA 按钮演示', caption='CTA 按钮接近底部', align='' ) }}

## 图片和视频

AMP 故事广告中包含的图片和视频应为 4:3 标准全屏格式。包含视频的广告应使用一张[海报](../../../documentation/components/reference/amp-video.md#poster)。推荐的海报图片尺寸为 720p（720 宽 x 1280 高）。

[sourcecode:html]
<amp-video controls
  width="720"
  height="1280"
  layout="responsive"
  poster="images/kitten-playing.png">

  <source src="videos/kitten-playing.webm"
    type="video/webm" />
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
[/sourcecode]

### 图片

背景图片可以调整到全屏大小。以下 CSS 是一种成功的方法，可以裁剪视频和图片并使其居中。

[sourcecode:html]

<style amp-custom>
    amp-img, amp-video {
        height: 100vh;
    }
    amp-video video {
        object-fit: cover;
    }
    amp-img img{
        object-fit: cover;
    }
</style>

[/sourcecode]

### 视频

#### 指定 `<source>` 与 `src`

为 [`amp-video`](../../../documentation/components/reference/amp-video.md) 指定源时

示例：指定多个源文件

[sourcecode:html]
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">

  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
[/sourcecode]

#### 视频大小和长度

为了获得最佳性能，您应该尽量提供不超过 4MB 的视频。文件越小，下载速度越快，因此要尽可能缩小文件。

#### 视频格式

如果只能提供一种视频格式，请提供 **MP4**。但是，在可能的情况下，请使用 **HLS** 视频并指定 MP4 作为后备，用于还不支持 HLS 视频的浏览器。HLS 执行自适应比特率流，使用这种格式时，可以调整视频的质量，使之达到最适合用户网络连接的状态。

[tip type="note"] **注**：桌面版 Chrome 浏览器不支持 HLS 视频格式（即使通过模拟也不支持），因此需要为页面的任何桌面流量指定 MP4 后备。要调试 HLS 视频，您需要通过 USB 调试使用实际的移动设备。[/tip]

#### 视频分辨率

网页故事视频始终是垂直的（即纵向视图），预期纵横比为 16:9。请针对视频流类型使用推荐的分辨率：

<table>
  <thead>
    <tr>
     <th>视频流类型</th>
     <th>分辨率</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>非自适应</td>
     <td>720 x 1280 像素</td>
    </tr>
    <tr>
     <td>自适应</td>
     <td>720 x 1280 像素<br>540 x 960 像素<br>360 x 480 像素</td>
    </tr>
  </tbody>
</table>

[tip type="note"] **注**：对于不使用 16:9 纵横比的移动设备，可以水平或垂直裁剪视频，以适合视口。[/tip]

#### Video codec

1. 对于 MP4，请使用 `H.264`。
2. 对于 WEBM，请使用 `VP9`。
3. 对于 HLS 或 DASH，请使用 `H.264`。

#### 视频质量

##### 转码优化

您可以使用各种工具编码视频，并在编码时调整视频质量。以下是其中一些工具：

<table>
  <thead>
    <tr>
     <th>工具</th>
     <th>注释</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><a href="https://www.ffmpeg.org/about.html">FFmpeg</a></td>
     <td>推荐优化：<ul> <li>对于 MP4，请使用 <code>-crf 23</code>。</li> <li>对于 WEBM，请使用  <code>-b:v 1M</code>。</li> </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://libav.org/avconv.html">avconv</a></td>
     <td>推荐优化：<ul> <li>对于 MP4，请使用 <code>-crf 23</code>。</li> <li>对于 WEBM，请使用 <code>-b:v 1M</code>。</li> </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://github.com/google/shaka-packager">Shaka Packager</a></td>
     <td>一种还可以输出包括播放列表的 HLS 格式的编码器。</td>
    </tr>
  </tbody>
</table>

##### HLS 片段大小

请确保您的 HLS 片段的大小通常不超过 10 秒。

## 动画

故事中的动画有一些注意事项，比如关于“可见内容”的概念。例如，在我们的“3 面板”桌面视图中，您的广告素材可能在页面上可见，但还不是中心焦点。如果您希望得到的效果是在页面成为主焦点时开始播放动画，则可能出现问题。

为了帮助解决这个问题，当您的广告素材正文在所有投放上下文中成为焦点时，AMP 将为其添加一个专用属性 `amp-story-visible`。建议根据此信号触发动画。

示例：当该页面成为焦点时，此动画将开始播放，当用户点击故事中的另一个页面并返回时，动画将重新播放。

[sourcecode:html]

<style amp-custom>
    body[amp-story-visible] .my-animation-class {
      animation: 2s my-animation-name;
    }
</style>

[/sourcecode]

## 赞助内容<a name="sponsored-story"></a>

赞助内容在网络上以网址的形式存在，将用户流量从 AMP 故事广告上的号召性用语按钮转向赞助内容。一个赞助内容就是一个 AMP 故事，但重点在于沉浸式和覆盖面广的广告体验。

{{ image('/static/img/docs/stampads/sponsored_story_full.png', 1600, 900, layout='intrinsic', alt='CTA 按钮定向到赞助内容', caption='CTA 按钮定向到赞助内容', align='' ) }}

在[此处](../start/create_successful_stories.md)阅读关于制作网页故事的详细信息。
