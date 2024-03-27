---
'$title': 网页故事技术细节
$order: 1
description: 网页故事技术细节
'$category': Develop
formats:
  - stories
author: CrystalOnScript
---

本指南介绍使用 AMP 成功创建网页故事所应了解的所有技术细节和最佳做法。

## AMP 验证

从技术上讲，网页故事是使用 AMP 构建的单个网页，并且符合 AMP 规范：

- 以 `<!doctype html>` 文档类型开头。
- 包含顶级 `<html ⚡>` 或 `<html amp>` 标记。
- 包含 `<head>` 和 `<body>` 标记。
- 包含 `<meta charset="utf-8">` 标记，作为 `<head>` 标记的第一个子项。
- 在 `<head>` 标记内包含 `<script async src="https://ampjs.org/v0.js"></script>` 标记。最佳做法是，应尽早在 `<head>` 中包含该脚本。
- 在 `<head>` 内包含 ` <link rel="canonical" href="page/url">` 标记，其中 href 指向网页故事网址。
- 在 `<head>` 标记内包含 `<meta name="viewport" content="width=device-width">` 标记。另外，还建议包含 initial-scale=1。
- 在 `<head>` 标记内包含 [AMP 样板](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites)代码。

使用 AMP 构建的 AMP 网页与网页故事之间的区别在于 [`amp-story`](https://amp.dev/documentation/components/amp-story/?format=stories) 组件。它是文档 `<body>` 的唯一直接子项，且必须包含 `standalone` 特性。所有网页故事页面、层和元素都在 `<amp-story>` 标记内定义。

```html
<!DOCTYPE html>
<html ⚡>
  <head>
    <meta charset="utf-8" />
    <title>Joy of Pets</title>
    <link rel="canonical" href="pets.html" />
    <meta name="viewport" content="width=device-width" />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://ampjs.org/v0.js"></script>
    <script
      async
      custom-element="amp-video"
      src="https://ampjs.org/v0/amp-video-0.1.js"
    ></script>
    <script
      async
      custom-element="amp-story"
      src="https://ampjs.org/v0/amp-story-1.0.js"
    ></script>
    <style amp-custom>
      ...;
    </style>
  </head>
  <body>
    <!-- Cover page -->
    <amp-story
      standalone
      title="Joy of Pets"
      publisher="AMP tutorials"
      publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
      poster-portrait-src="assets/cover.jpg"
    >
      <amp-story-page id="cover">
        <amp-story-grid-layer template="fill">
          <amp-img
            src="assets/cover.jpg"
            width="720"
            height="1280"
            layout="responsive"
          >
          </amp-img>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="vertical">
          <h1>The Joy of Pets</h1>
          <p>By AMP Tutorials</p>
        </amp-story-grid-layer>
      </amp-story-page>

      <!-- Page 1 -->
      <amp-story-page id="page1">
        <amp-story-grid-layer template="vertical">
          <h1>Cats</h1>
          <amp-img
            src="assets/cat.jpg"
            width="720"
            height="1280"
            layout="responsive"
          >
          </amp-img>
          <q
            >Dogs come when they're called. Cats take a message and get back to
            you. --Mary Bly</q
          >
        </amp-story-grid-layer>
      </amp-story-page>
      ...
    </amp-story>
  </body>
</html>
```

请遵循[创作您的第一个网页故事](../start/visual_story/?format=stories)教程并[阅读 amp-story 参考文档](../../components/reference/amp-story/?format=stories)了解更多信息。

## 最佳性能和用户体验

用户可能会在网络连接状况不佳的情况下或在老旧设备上观看网页故事。请遵循以下最佳做法，确保他们获得优质的用户体验。

### 背景颜色

为每个网页故事页面指定背景颜色。当用户不具备下载图像或视频素材资源的条件时，使用背景颜色可以提供很好的后备。选择一种能够表现页面要呈现的背景素材资源主色调的颜色，或者为所有故事页面使用一致的颜色主题。请确保背景颜色与文本不同以提高可读性。

在网页故事文档 head 的 `<style amp-custom>` 标记内或 [`<amp-story-page>`](https://amp.dev/documentation/components/amp-story-page/?format=stories) 组件上内嵌定义页面的背景颜色。

### 分层元素

系统标题包含诸如“静音”和“分享”图标之类的控件。其 z-index 高于背景图片和视频。请确保这些图标没有覆盖任何重要信息。

### 宽高比

以 9:16 的宽高比设计网页故事素材资源。由于页面的高度和宽度会因浏览器和设备而异，因此请勿将重要内容放在页面边缘附近。

### 海报图片

下载视频时，将向用户显示海报图片。海报图片应表现视频内容以实现平滑过渡。指定海报图片的方法是向 amp-video 元素添加 `poster` 特性并将其指向图片位置。

```
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

## 视频

所有视频都必须通过 [amp-video](https://amp.dev/documentation/components/amp-video/?format=stories) 组件进行添加。

```
<amp-video controls
  width="640"
  height="360"
  layout="responsive"
  poster="/static/inline-examples/images/kitten-playing.png">
  <source src="/static/inline-examples/videos/kitten-playing.webm"
    type="video/webm" />
  <source src="/static/inline-examples/videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```

### 分辨率和质量

针对以下建议优化对视频进行编码以调整质量：

<table>
  <tr>
   <td>MP4</td>
   <td>-crf 23</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>-b:v 1M</td>
  </tr>
</table>

尝试将 HLS 片段的时长控制在 10 秒以内。

### 格式和大小

将视频大小控制在 4MB 以内以获得最佳性能。可以考虑将大型视频拆分到多个页面中。

如果只能提供一种视频格式，请提供 MP4。如果可行，请使用 HLS 视频并指定 MP4 作为后备以确保浏览器兼容性。请使用以下视频编解码器：

<table>
  <tr>
   <td>MP4、HLS 和 DASH</td>
   <td>H.264</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>VP9</td>
  </tr>
</table>

### 指定&lt;source&gt;与 src

在 `<amp-video>` 组件内使用 `<source>` 子元素，以通过 `src` 特性指定视频源。使用 `<source>` 元素可指定视频类型并添加备用视频源。您必须使用 `type` 特性指定 MIME 类型。对 HLS 视频使用 `application/x-mpegurl` 或 `application/vnd.apple.mpegurl`。对于所有其他视频类型，请使用 `video/` MIME 前缀并后接视频格式，例如 `”video/mp4”`。

```html
<amp-video
  id="video-page1"
  autoplay
  loop
  layout="fill"
  poster="https://example.com/media/poster.jpg"
>
  <source
    src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl"
  />
  <source src="https://amp-example.com/media/movie.mp4" type="video/mp4" />
</amp-video>
```

### 视频播放完成后自动前进

由 amp-story-page 公开的 [`auto-advance-after`](https://amp.dev/documentation/components/amp-story-page/?format=stories#auto-advance-after-%5Boptional%5D) 特性可指定故事页面是否以及何时在无需用户点按的情况下前进。要在视频播放完成后前进，请将该特性指向视频 ID。

```html
<amp-story-page auto-advance-after="myvideo"></amp-story-page>
```

## 桌面体验

网页故事格式支持[可选桌面体验](https://github.com/ampproject/amphtml/blob/main/extensions/amp-story/amp-story.md#landscape-orientation-and-full-bleed-desktop-experience-opt-in)。这会将桌面体验变为沉浸式全出血模式，取代默认的三幅竖排面板体验，并使移动用户能够在水平握持设备时获得出色的观看体验。

在 `<amp-story>` 组件中添加 `supports-landscape` 特性即可加入桌面支持。

```html
<amp-story
  standalone
  supports-landscape
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/icon.svg"
  poster-portrait-src="assets/cover.jpg"
>
</amp-story>
```
