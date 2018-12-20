---
$title: 创作 AMP 故事的最佳做法
---

[TOC]

本指南介绍了在创作 [AMP 故事](/zh_cn/docs/reference/components/amp-story.html)时应采取的最佳做法。


## 背景颜色

您应为 AMP 故事网页指定背景颜色。通过指定背景颜色，即使用户因网络状况不佳而无法下载任何图片或视频资源，您也可以为其提供出色的后备体验。

*   背景颜色应能代表网页背景资源上的主色。
*   选择一种使图片或网页本身能够平稳过渡的颜色。您可以做出如下选择：
    *   选择能代表图片/视频的主色。
    *   为故事的所有网页选择一致的主题背景颜色。
*   背景颜色应不同于字体颜色，以便文本内容清晰易读（即使在图片加载之前，也是如此）。

## 文本

### 确保可读性

确保叠加在网页上的文本清晰易读：

* 选择与背景图片和背景颜色形成鲜明对比的字体颜色。
* 在图片和文本之间添加渐变叠加层，使文本与图片之间形成对比效果。

### 文本内应短小精悍

请注意，AMP 故事旨在提供视觉效果更加丰富的体验，因此请确保网页上的文本内容简短精悍（即不超过 1-2 个句子）。如果您认为某个网页上文本内容多点比较好，请认真考虑一下您的目的和实际的阅读体验。

## 视频

### 指定 poster 属性

`poster` 是指视频下载完毕之前显示在界面中的图片。海报图片可以是任何图片，通常会采用视频的第一帧。不过，您应该选择一张能够代表视频且可实现平稳过渡的图片。如果选择第一帧，请确保它不是一个空白的临时帧。

建议的海报图片尺寸为：720p (720w x 1280h)。

示例：指定一张海报图片

```html
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

### 指定 `<source>` 和 `src`

指定 [amp-video](/zh_cn/docs/reference/components/amp-video.html) 的来源时，请使用 `<source>` 子元素（而非 `src` 属性）。借助 `<source>` 元素，您可以指定视频类型并添加更多视频来源。在 `<source>` 元素中，请通过 `"type"` 属性指定 MIME 类型。对于 HLS 视频，您必须指定以下 MIME 类型之一：`application/x-mpegurl` 或 `application/vnd.apple.mpegurl`。对于所有其他视频，请指定 `video/` MIME 前缀及视频格式（例如“`video/mp4`”）。

示例：指定多个来源文件

```html
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">
  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
```

### 视频大小/时长

*  为获得最佳效果，您应提供大小不超过 4MB 的视频。
*   对于较长的视频，请考虑拆分视频并放到多个网页上。
*   对于封面页，请避免使用特别大的视频。

### 视频格式

如果您只能提供一种视频格式，请提供 **MP4** 格式。不过，请尽量使用 **HLS** 视频，并为尚不支持 HLS 视频的浏览器指定 MP4 格式作为后备格式。HLS 可执行自适应串流，使视频画质可以根据用户的网络连接状况做出调整。

[tip type="note"]

桌面版 Chrome 浏览器不支持 HLS 视频格式（即使通过模拟也不行），因此，必须针对访问您网页的任何桌面设备流量指定 MP4 后备格式。要调试 HLS 视频，您需要使用实际移动设备通过 USB 调试功能进行调试。

[/tip]

### 视频分辨率

AMP 故事视频始终是竖直显示的（即纵向视图），要求宽高比为 16:9。请针对视频串流类型使用建议的分辨率：

<table>
  <thead>
    <tr>
     <th>Video streaming type</th>
     <th>Resolution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>Non-adaptive</td>
     <td>720 x 1280 px</td>
    </tr>
    <tr>
     <td>Adaptive</td>
     <td>720 x 1280 px<br>540 x 960 px<br>360 x 480 px</td>
    </tr>
  </tbody>
</table>


[tip type="note"]

对于宽高比不是 16:9 的移动设备，可以水平或垂直剪裁视频，使其适应视口大小。

[/tip]


### 视频编解码器

1.  对于 MP4，请使用 `H.264`。
1.  对于 WEBM，请使用 `VP9`。
1.  对于 HLS 或 DASH，请使用 `H.264`。


### 视频画质

#### 转码优化

您可以使用各种工具对视频进行编码，并在编码过程中调整视频画质。下面只列出了其中的几个工具：

<table>
  <thead>
    <tr>
     <th>Tool</th>
     <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><a href="https://www.ffmpeg.org/about.html">FFmpeg</a>
     </td>
     <td>Recommended optimizations:
      <ul>
        <li>For MP4, use <code>-crf 23</code>.</li>
        <li>For WEBM, use <code>-b:v 1M</code>.</li>
      </ul>
     </td>
    </tr>
    <tr>
     <td><a href="https://libav.org/avconv.html">avconv</a>
     </td>
     <td>Recommended optimizations:
      <ul>
        <li>For MP4, use <code>-crf 23</code>.</li>
        <li>For WEBM, use <code>-b:v 1M</code>.</li>
      </ul>
     </td>
    </tr>
    <tr>
     <td><a href="https://github.com/google/shaka-packager">Shaka Packager</a></td>
     <td>An encoder that can also output the HLS format including the playlist.
     </td>
    </tr>
  </tbody>
</table>

#### HLS 片段大小

确保 HLS 片段时长通常不超过 10 秒。

### 视频播放结束后前进到下一页

如果您希望视频播放结束后自动从一个网页前进到另一个网页，则应将 `<amp-story-page>` 的 `auto-advance-after` 属性值设置为视频 ID，而非视频的预计时长。也就是说，应使用

```html
<amp-story-page auto-advance-after="myvideo">
```

而非

```html
<amp-story-page auto-advance-after="9s">
```

这样做的原因是，视频可能不会恰好在网页显示的同时开始播放，或者指定的时长可能不正确，导致预计时长与实际时长之间存在差异。这种情况可能会导致视频循环播放，进而分散用户的注意力。
 
