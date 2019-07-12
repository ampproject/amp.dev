---
$category@: presentation
formats:
- websites
teaser:
  text: 一种丰富而直观的叙事格式。
---



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

# amp-story

<table>
  <tr>
    <td width="40%"><strong>说明</strong></td>
    <td>一种丰富而直观的叙事格式。</td>
  </tr>
  <tr>
    <td width="40%"><strong>提供方式</strong></td>
    <td><div><a href="https://www.ampproject.org/docs/reference/experimental.html">实验性组件</a></div></td>
  </tr>
  <tr>
    <td width="40%"><strong>必需的脚本</strong></td>
    <td><code>&lt;script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">支持的布局</a></strong></td>
    <td>无</td>
  </tr>
  <tr>
    <td width="40%"><strong>示例</strong></td>
    <td><ul>
      <li>请参阅 AMP By Example 的 <a href="https://ampbyexample.com/stories/introduction/amp_story_hello_world/">Hello World</a> 示例。</li>
      <li>学习<a href="https://www.ampproject.org/docs/tutorials/visual_story">创建一个视觉效果丰富的 AMP 故事</a>教程。</li>
    </ul></td>
  </tr>
</table>

[tip type="ll callout('重要提示：</b><a class="type_caution"]
此组件是实验性组件，仍处于积极开发阶段。如有任何问题，请[提交 GitHub 问题](https://github.com/ampproject/amphtml/issues/new)。
[/tip]


## 版本说明

| 版本 | 说明                                                            |
|-------|----------------------------------------------------------------------|
| 1.0     | 当前版本，自 2018 年 7 月 16 日至今。                                     |
| 0.1     | 初始实现版本。已弃用，将于 2019 年 3 月 19 日移除 |

## 从 0.1 迁移到 1.0

从 2018 年 7 月 16 日开始，版本 0.1 就被视为已弃用，将于 2019 年 3 月 19 日移除。这可能会导致轻微的破坏性更改，因为您的故事将自动升级为使用 1.0 版。我们建议您在此日期之前手动将网页迁移至 1.0 版，以确保功能正常且设计恰当。

### 新的 bookend 功能

我们为 AMP 故事 bookend 增加了新功能，实现了更丰富的组件支持和视觉布局。部分变更包括：

* 分享服务提供商根据 JSON 配置进行排序。
* 新的 bookend 组件：
    * 号召性用语链接
    * 文本框
    * 纵向和横向卡片</li>

要使用这些新功能，请将 `<amp-story-bookend>` 标记添加为 `<amp-story>` 的最后一个子级，并且其中包含如下必需属性：

```html
<amp-story standalone>
  <amp-story-page id="cover">
    ...
  </amp-story-page>
  <!-- `src` 和 `layout=nodisplay` 是必需属性。-->
  <amp-story-bookend src="bookendv1.json" layout="nodisplay">
  </amp-story-bookend>
<amp-story>
```

如需详细了解这些新组件以及如何在 JSON 配置中指定它们，请参阅 [amp-story-bookend](#bookend-amp-story-bookend) 部分。

### 新的元数据要求

我们向 `<amp-story>` 元素中添加了新的元数据属性。这些元数据属性将用于在整个 AMP 故事生态系统中显示故事预览。例如，这些属性可用于在相关故事的 bookend 中呈现具有吸引力的预览链接。此外，提供这些属性还有助于确保您的故事满足未来需求，在 AMP 故事层面实现丰富的嵌入式体验。

```html
<!--</code>title<code>、</code>publisher<code>、</code>publisher-logo-src<code> 和 </code>poster-portrait-src` 即将成为必需的属性。-->
 <amp-story title="我的故事" standalone="" publisher="The AMP Team" publisher-logo-src="https://example.com/logo/1x1.png" poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"></amp-story></p>

<!-- <code>poster-square-src</code> 和 <code>poster-landscape-src</code> 是可选属性，但我们强烈建议使用这些属性。-->
<amp-story title="我的故事" standalone="" publisher="The AMP Team" publisher-logo-src="https://example.com/logo/1x1.png" poster-portrait-src="https://example.com/my-story/poster/3x4.jpg" poster-square-src="https://example.com/my-story/poster/1x1.jpg" poster-landscape-src="https://example.com/my-story/poster/4x3.jpg">
```

请注意，这些元数据属性是对网页上所有结构化数据（例如 JSON-LD）的补充，并不会替换此类数据。我们仍然建议您将[结构化数据](https://developers.google.com/search/docs/data-types/article#amp-sd)添加到您所有的 AMP 网页，包括 AMP 故事。

这些新属性如下所示：

| 属性 | 说明 |
|--|--|
| `title` [必需] | 故事的标题。 |
| `publisher` [必需] | 故事发布商的名字。 |
| `publisher-logo-src` [必需] | 发布商的徽标（采用方形格式，宽高比为 1x1）。 |
| `poster-portrait-src` [必需] | 故事的海报（采用纵向格式，宽高比为 3x4）。 |
| `poster-square-src` | 故事的海报（采用方形格式，宽高比为 1x1）。 |
| `poster-landscape-src` | 故事的海报（采用横向格式，宽高比为 4x3）。 |

#### `publisher-logo-src` 指南

发布商徽标的图片应遵循以下指南：

* 该文件应为光栅文件，例如 `.jpg`、`.png` 或 `.gif`。避免使用 `.svg` 或 `.eps` 等矢量文件。
* 避免使用动画图片，例如 GIF 动画。
* 徽标的图形部分应在背景颜色上清晰可辨。

<table>
  <tr>
    <td>
      <amp-img alt="白底蓝字徽标" width="107" height="112" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-1.png" layout="fixed">
        <noscript>
          <img alt="白底蓝字徽标" src="img/publisher-logo-1.png">
        </noscript>
      </amp-img>
      推荐
    </td>
    <td>
      <amp-img alt="蓝底白字徽标" width="107" height="101" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-2.png" layout="fixed">
        <noscript>
          <img alt="蓝底白字徽标" src="img/publisher-logo-2.png">
        </noscript>
      </amp-img>
      推荐
    </td>
    <td>
      <amp-img alt="蓝底蓝字徽标" width="103" height="102" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-3.png" layout="fixed">
        <noscript>
          <img alt="蓝底蓝字徽标" src="img/publisher-logo-3.png">
        </noscript>
      </amp-img>
      避免
    </td>
  </tr>
</table>

* 徽标形状应为方形，不能为矩形。
* 背景颜色不得为透明。
* 每个品牌使用一个徽标，且该徽标应在 AMP 故事之间保持一致。
* 徽标应至少为 96x96 像素。

#### 海报指南（适用于 `poster-portrait-src`、`poster-landscape-src` 和 `poster-square-src`）

故事海报的图片应遵循以下指南：

* 海报图片应当反映整个 AMP 故事。
* 当用户开始浏览 AMP 故事时，应当可以看到海报图片。不过，元数据中使用的图片文件网址不一定要与故事第一页上使用的网址完全一致。元数据中使用的网址可以包括大小调整、剪裁或细微样式更改，以供预览之用。
* 海报图片应为光栅文件，例如 `.jpg`、`.png` 或 `.gif`。避免使用 `.svg` 或 `.eps` 等矢量文件。
* 纵向海报图片的宽高比应为 3x4，横向为 4x3，方形为 1x1。
* 如果海报图片来自视频中的某一帧，则缩略图应当代表整个视频。例如，视频中的第一帧通常不具有代表性。
* 每张海报图片应符合建议的最小尺寸：
    * 纵向：696 x 928 像素
    * 横向：928 x 696 像素
    * 方形：928 x 928 像素</li>

## 概述

`amp-story` 扩展组件提供了一种新的视觉内容显示格式，可供您整合到叙事体验中。利用 AMP 故事，您可以为用户提供短小且视觉效果丰富的信息和内容。

<figure class="centered-fig">
  <amp-anim width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
    <noscript>
      <img alt="AMP 故事示例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
    </noscript>
  </amp-anim>
</figure>

## AMP 故事格式

[AMP 故事](#story%3a-amp-story)是由[网页](#pages%3a-amp-story-page)组成的完整 AMP HTML 文档，网页内是各种[图层](#layers%3a-amp-story-grid-layer)，而图层内则是 AMP 和 HTML 元素，如 media、analytics、text 等。

<amp-img alt="AMP 故事标记层次结构" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="AMP 故事标记层次结构" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png">
  </noscript>
</amp-img>

### 样板

以下标记可充当不错的着手点或样板。请复制此标记并将其保存到扩展名为 `.html` 的文件中。

```html
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <title>Hello, amp-story</title>
    <link rel="canonical" href="http://example.ampproject.org/my-story.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal
    both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes
    -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes
    -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript>
      <style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none
        }
      </style>
    </noscript>
  </head>
  <body>
    <amp-story standalone>
      <amp-story-page id="my-first-page">
        <amp-story-grid-layer template="fill">
          <amp-img src="https://example.ampproject.org/helloworld/bg1.jpg" width="900" height="1600"></amp-img> </amp-story-grid-layer> <amp-story-grid-layer template="vertical">
            <h1>Hello, amp-story!</h1>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="my-second-page">
        <amp-story-grid-layer template="fill">
          <amp-img src="https://example.ampproject.org/helloworld/bg2.gif" width="900" height="1600"></amp-img> </amp-story-grid-layer> <amp-story-grid-layer template="vertical">
            <h1>The End</h1>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-bookend src="bookendv1.json" layout="nodisplay">
      </amp-story-bookend>
    </amp-story>
  </body>
</html>
```

body 中的内容创建了一个包含两个网页的故事。每个网页都包含一张全宽背景图片，上面有一串简单的文本。

### amp-story 的必需标记

AMP 故事 HTML 格式遵循[与有效 AMP HTML 文档相同的标记要求](https://www.ampproject.org/docs/reference/spec#required-markup)，以及下面这些附加要求：

| 规则 | 说明 |
|----|---|
| `<amp-story standalone>` 元素是 `<body>` 的唯一子元素。 | 标识相应文档是一个 AMP 故事。 |
| 包含 `<script async src="https://cdn.ampproject.org/v0/amp-story-1.0.js" custom-element="amp-story"></script>` 标记，以此作为 `<head>` 标记的第三个子级。 | 包含并加载 amp-story JS 库。 |
| 在 `<head>` 内包含 `<link rel="canonical" href="$STORY_URL">` 标记。 | 该链接指向故事本身，将故事标识为规范文档。 |

## 故事：`amp-story`

`amp-story` 组件代表整个故事。该组件本身会实现界面 Shell，包括处理手势和导航，以及插入应用 Shell 界面（控件、进度条等）。

<figure class="centered-fig">
  <amp-anim alt="amp-story 示例" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
    <noscript>
      <img alt="amp-story 示例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
      </noscript>
    </amp-anim>
  </figure>

### 示例

```html
<amp-story
    standalone
    title="我的故事"
    publisher="AMP 团队"
    publisher-logo-src="https://example.com/logo/1x1.png"
    poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"
    poster-square-src="https://example.com/my-story/poster/1x1.jpg"
    poster-landscape-src="https://example.com/my-story/poster/4x3.jpg"
    background-audio="my.mp3">
    <amp-story-page>[...]</amp-story-page>
  <amp-story-page>[...]</amp-story-page>
  <amp-story-page>[...]</amp-story-page>
  <amp-story-bookend src="./related.json"></amp-story-bookend>
</amp-story>
```

### 属性

##### standalone [必需]

标识相应 AMP 文档是一个故事。

##### title [必需]

故事的标题。

##### publisher [必需]

故事发布商的名字。

##### publisher-logo-src [必需]

指向故事发布商徽标（采用方形格式，宽高比为 1x1）的网址。例如，`publisher-logo-src="https://example.com/logo/1x1.png"`，其中 1x1.png 是一个 36x36 像素的徽标。

##### poster-portrait-src [必需]

指向[故事海报](#posters)（采用纵向格式，宽高比为 3x4）的网址。

##### supports-landscape [可选]

在移动设备上启用横向支持，并在桌面设备上提供全宽横向体验。

##### background-audio [可选]

指向在整个故事中播放的音频文件的网址。

##### poster-square-src [可选]

指向[故事海报](#posters)（采用方形格式，宽高比为 1x1）的网址。

##### poster-landscape-src [可选]

指向[故事海报](#posters)（采用横向格式，宽高比为 4x3）的网址。

### 海报

“海报”是指故事加载完毕之前显示在界面中的图片。海报图片可以是代表故事的任何图片，通常会采用故事的首屏画面。

### (amp-story) 的子级

`<amp-story>` 组件包含一个或多个 [`<amp-story-page>`](#pages%3a-amp-story-page) 组件，用于呈现故事的各个画面。按文档顺序指定的第一页即是故事中显示的第一页。

### 选择启用横向模式和全宽桌面版体验

如果在 `<amp-story>` 元素上指定了 `supports-landscape`，则它将执行以下操作：

* 当移动设备处于横向模式时，让用户可以看到故事。
* 将桌面版体验更改为沉浸式全宽模式，取代默认的三种纵向面板体验。

用途：`<amp-story ... supports-landscape>...</amp-story>`

<figure class="centered-fig">
  <span class="special-char">之前</span>：
  <amp-anim alt="桌面版三面板体验" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif" width="400" layout="flex-item">
    <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif"></noscript>
  </amp-anim>
  <span class="special-char">之后</span>：
  <amp-anim alt="桌面版全宽体验" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif" width="400" layout="flex-item">
    <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif"></noscript>
  </amp-anim>
</figure>

## 网页：`amp-story-page`

`<amp-story-page>` 组件表示要在故事的单个网页上显示的内容。

<figure class="centered-fig">
  <amp-anim alt="第 1 页示例" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif" layout="fixed">
    <noscript>
      <img alt="第 1 页示例" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif">
      </noscript>
    </amp-anim>
</figure>
<figure class="centered-fig">
  <amp-anim alt="第 2 页示例" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif" layout="fixed">
    <noscript>
      <img alt="第 2 页示例" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif">
    </noscript>
  </amp-anim>
</figure>

### 示例

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-video layout="fill" src="background.mp4" poster="background.png" muted autoplay></amp-video>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical">
    <h1>这些是世界排名前 5 的…</h1>
    <p>张三</p>
    <p>5 月 18 日</p>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="thirds">
    <amp-img grid-area="bottom-third" src="a-logo.svg" width="64" height="64"></amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

### 属性

##### id [必需]

网页的唯一标识符，可用于在 CSS 中设置网页及其子孙级的样式，还可用于在网址片段中唯一标识网页。

##### auto-advance-after [可选]

指定何时自动跳转到下一页。如果省略，则网页不会自动跳转。`auto-advance-after` 的值必须是以下任一项：

* 在自动跳转到下一页之前需要等待的[时间](https://developer.mozilla.org/en-US/docs/Web/CSS/time)（正数）
* [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) 或 video-interface 视频的 ID，该视频播放完成后将触发自动跳转

例如：

```html
<amp-story-page id="tokyo" auto-advance-after="1s">
```

##### background-audio [可选]

指向在此网页显示时播放的音频文件的 URI。

例如：

```html
<amp-story-page id="zurich" background-audio="./media/switzerland.mp3">
```

### (amp-story-page) 的子级

`<amp-story-page>` 组件包含一个或多个[图层](#layers)。图层自下而上堆叠（DOM 中指定的第一层位于底部；DOM 中指定的最后一层位于顶部）。

## 图层

图层相互堆叠在一起，以产生所需的视觉效果。

### `amp-story-grid-layer`

`<amp-story-grid-layer>` 组件会将其子级摆放在网格中。该组件的实现基于 [CSS 网格规范](https://www.w3.org/TR/css-grid-1/)。

<div class="flex-images">
  <amp-img alt="第 1 层" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif" width="200" height="355" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif"></noscript>
  </amp-img>
  <span class="special-char">+</span>
  <amp-img alt="第 2 层" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg"></noscript></amp-img>
  <span class="special-char">+</span>
  <amp-img alt="第 3 层" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg"></noscript></amp-img>
  <span class="special-char">=</span>
  <amp-img alt="所有图层" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif"></noscript></amp-img>
</div>

#### 属性

##### template [必需]

`template` 属性用于确定网格图层的布局。下面的[模板](#templates)部分介绍了可用模板。

##### grid-area [可选]

此属性是在 `<amp-story-grid-layer>` 的子级上指定的。`grid-area` 指定应在其中显示包含此属性的元素的命名区域（通过使用定义它们的 `template`）。

示例：

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">元素 1</p>
  <p grid-area="lower-third">元素 2</p>
  <p grid-area="upper-third">元素 3</p>
</amp-story-grid-layer>
```

#### 模板

下面介绍了用于指定网格图层布局的可用模板。

[tip type="ll callout('提示：</b><a class="type_success"]
如需查看正在使用的布局模板，请查看 [AMP By Example 上的布局演示](https://ampbyexample.com/stories/features/layouts/)。
[/tip]

##### fill

`fill` 模板会显示第一个子级全宽图片。其他所有子级均未显示。

命名区域：（无）

示例：

<amp-img alt="Fill 模板示例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Horizontal 模板示例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png">
  </noscript>
</amp-img>

```html
<amp-story-grid-layer template="fill">
  <amp-img src="cat.jpg"></amp-img>
</amp-story-grid-layer>
```

##### vertical

`vertical` 模板会沿着 y 轴放置其元素。默认情况下，该模板的元素会与屏幕顶部对齐，并会沿着 x 轴占据整个屏幕。

命名区域：（无）

<amp-img alt="Vertical 模板示例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Horizontal 模板示例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="vertical">
  <p>元素 1</p>
  <p>元素 2</p>
  <p>元素 3</p>
</amp-story-grid-layer>
```

##### horizontal

`horizontal` 模板会沿着 x 轴放置其元素。默认情况下，该模板的元素会与线条起始位置对齐，并会沿着 y 轴占据整个屏幕。

命名区域：（无）

<amp-img alt="Horizontal 模板示例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Horizontal 模板示例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png">
  </noscript>
</amp-img>

```html
<amp-story-grid-layer template="horizontal">
  <p>元素 1</p>
  <p>元素 2</p>
  <p>元素 3</p>
</amp-story-grid-layer>
```

##### thirds

`thirds` 模板会将屏幕均分为 3 行，以便您在各个区域中放置相应内容。

命名区域：

* `upper-third`
* `middle-third`
* `lower-third`

<amp-img alt="Horizontal 模板示例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Thirds 模板示例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png">
  </noscript>
</amp-img>

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">元素 1</p>
  <p grid-area="lower-third">元素 2</p>
  <p grid-area="upper-third">元素 3</p>
</amp-story-grid-layer>
```

#### 子级

`amp-story-grid-layer` 可以包含以下任意元素：

**注意**：此列表将随着时间的推移而逐渐扩展。

<table>
  <tr>
    <th width="40%">区域
    </th><th>允许使用的标记</th>
  </tr>
  <tr>
    <td>媒体</td>
    <td>
      <ul>
        <li><code>&lt;amp-audio></code></li>
        <li><code>&lt;amp-gfycat></code></li>
        <li><code>&lt;amp-google-vrview-image></code></li>
        <li><code>&lt;amp-img></code></li>
        <li><code>&lt;amp-video></code></li>
        <li><code>&lt;source></code></li>
        <li><code>&lt;track></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>分析与衡量</td>
    <td>
      <ul>
        <li><code>&lt;amp-analytics></code></li>
        <li><code>&lt;amp-experiment></code></li>
        <li><code>&lt;amp-pixel></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>分段</td>
    <td>
      <ul>
        <li><code>&lt;address></code></li>
        <li><code>&lt;article></code></li>
        <li><code>&lt;aside></code></li>
        <li><code>&lt;footer></code></li>
        <li><code>&lt;h1>-&lt;h6></code></li>
        <li><code>&lt;header></code></li>
        <li><code>&lt;hgroup></code></li>
        <li><code>&lt;nav></code></li>
        <li><code>&lt;section></code></li>
        <li><code>&lt;amp-story-cta-layer></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>文字</td>
    <td>
      <ul>
        <li><code>&lt;abbr></code></li>
        <li><code>&lt;amp-fit-text></code></li>
        <li><code>&lt;amp-font></code></li>
        <li><code>&lt;amp-gist></code></li>
        <li><code>&lt;b></code></li>
        <li><code>&lt;bdi></code></li>
        <li><code>&lt;bdo></code></li>
        <li><code>&lt;blockquote></code></li>
        <li><code>&lt;br></code></li>
        <li><code>&lt;cite></code></li>
        <li><code>&lt;code></code></li>
        <li><code>&lt;data></code></li>
        <li><code>&lt;del></code></li>
        <li><code>&lt;dfn></code></li>
        <li><code>&lt;div></code></li>
        <li><code>&lt;em></code></li>
        <li><code>&lt;figcaption></code></li>
        <li><code>&lt;figure></code></li>
        <li><code>&lt;hr></code></li>
        <li><code>&lt;i></code></li>
        <li><code>&lt;ins></code></li>
        <li><code>&lt;kbd></code></li>
        <li><code>&lt;main></code></li>
        <li><code>&lt;mark></code></li>
        <li><code>&lt;p></code></li>
        <li><code>&lt;pre></code></li>
        <li><code>&lt;q></code></li>
        <li><code>&lt;rp></code></li>
        <li><code>&lt;rt></code></li>
        <li><code>&lt;rtc></code></li>
        <li><code>&lt;ruby></code></li>
        <li><code>&lt;s></code></li>
        <li><code>&lt;samp></code></li>
        <li><code>&lt;small></code></li>
        <li><code>&lt;span></code></li>
        <li><code>&lt;strong></code></li>
        <li><code>&lt;sub></code></li>
        <li><code>&lt;sup></code></li>
        <li><code>&lt;time></code></li>
        <li><code>&lt;u></code></li>
        <li><code>&lt;var></code></li>
        <li><code>&lt;wbr></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>列表</td>
    <td>
      <ul>
        <li><code>&lt;amp-list></code></li>
        <li><code>&lt;amp-live-list></code></li>
        <li><code>&lt;dd></code></li>
        <li><code>&lt;dl></code></li>
        <li><code>&lt;dt></code></li>
        <li><code>&lt;li></code></li>
        <li><code>&lt;ol></code></li>
        <li><code>&lt;ul></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>表格</td>
    <td>
      <ul>
        <li><code>&lt;caption></code></li>
        <li><code>&lt;col></code></li>
        <li><code>&lt;colgroup></code></li>
        <li><code>&lt;table></code></li>
        <li><code>&lt;tbody></code></li>
        <li><code>&lt;td></code></li>
        <li><code>&lt;tfoot></code></li>
        <li><code>&lt;th></code></li>
        <li><code>&lt;thead></code></li>
        <li><code>&lt;tr></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>其他</td>
    <td>
      <ul>
        <li><code>&lt;amp-install-serviceworker></code></li>
        <li><code>&lt;noscript></code></li>
      </ul>
    </td>
  </tr>
</table>

### `amp-story-cta-layer`

`<amp-story-cta-layer>` 组件允许在 `<amp-story-page>` 中使用 `<a>` 和 `<button>` 元素。

#### 限制条件

* 如果指定，则 `<amp-story-cta-layer>` 元素必须是 `<amp-story-page>` 内的最后一层。因此，实际上每个 `<amp-story-page>` 都可以正好包含 `<amp-story-cta-layer>` 元素的一个或零个子级。
* 无法控制此图层的位置和大小。它始终占据网页 100% 的宽度和 20% 的高度，并且与网页底部对齐。

#### 示例

```html
<amp-story-page id="vertical-template-thirds">
  <amp-story-grid-layer template="thirds">
    <div class="content" grid-area="upper-third">第 1 段</div>
    <div class="content" grid-area="middle-third">第 2 段</div>
    <div class="content" grid-area="lower-third">第 3 段</div>
  </amp-story-grid-layer>
  <amp-story-cta-layer>
    <a href="https://www.ampproject.org" class="button">在此处放置出链！</a>
  </amp-story-cta-layer>
</amp-story-page>
```

<amp-img alt="CTA 层" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png" width="404" height="678" layout="fixed">
  <noscript>
    <img width="404" height="678" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png">
  </noscript>
</amp-img>

[在示例目录中查看完整示例](https://github.com/ampproject/amphtml/blob/master/examples/amp-story/cta-layer-outlink.html)

#### 子级

`amp-story-cta-layer` 允许使用与 `amp-story-grid-layer` 大致相同的子孙级，另外还允许使用 `<a>` 和 `<button>` 标记。

如需受支持子级的更新列表，请务必查看验证规则中的 [amp-story-cta-layer-allowed-descendants](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii) 字段。

## 网页附件

### `amp-story-page-attachment`

<amp-img alt="AMP 故事页附件" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif" width="240" height="480" layout="fixed">
  <noscript>
    <img alt="AMP 故事页附件" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif">
  </noscript>
</amp-img>

将其他内容附加到故事页！

借助故事页附件，您可以向特定网页提供其他 AMPHTML 内容。用户可以通过“向上滑动”手势或点按号召性用语元素来显示此类内容。系统会自动在每个配置了附件的网页底部添加打开附件的界面提示。

`<amp-story-page-attachment>` 元素必须是 `<amp-story-page>` 的最后一个子级，且必须具有 `layout="nodisplay"` 属性。附件 AMPHTML 内容应该在您的 AMP 故事中内嵌提供，位于此 `<amp-story-page-attachment>` 标记中。

### 允许使用的内容和组件

故事页附件允许使用与 AMP 故事相同的 HTML 元素以及下面列出的其他组件，例如第三方视频播放器或社交媒体嵌入内容。也就是说，您可以在 AMP 故事页中添加比较长或不允许使用的其他内容。

<details>
  <summary>网页附件中允许使用的 AMP 组件列表</summary>

  * `<amp-3d-gltf>`
  * `<amp-3q-player>`
  * `<amp-accordion>`
  * `<amp-audio>`
  * `<amp-beopinion>`
  * `<amp-bodymovin-animation>`
  * `<amp-brid-player>`
  * `<amp-brightcove>`
  * `<amp-byside-content>`
  * `<amp-call-tracking>`
  * `<amp-carousel>`
  * `<amp-dailymotion>`
  * `<amp-date-countdown>`
  * `<amp-embedly-card>`
  * `<amp-facebook>`
  * `<amp-facebook-comments>`
  * `<amp-facebook-like>`
  * `<amp-facebook-page>`
  * `<amp-fit-text>`
  * `<amp-fx-collection>`
  * `<amp-fx-flying-carpet>`
  * `<amp-gfycat>`
  * `<amp-gfycat>`
  * `<amp-gist>`
  * `<amp-gist>`
  * `<amp-google-document-embed>`
  * `<amp-google-vrview-image>`
  * `<amp-google-vrview-image>`
  * `<amp-hulu>`
  * `<amp-ima-video>`
  * `<amp-image-slider>`
  * `<amp-img>`
  * `<amp-imgur>`
  * `<amp-instagram>`
  * `<amp-izlesene>`
  * `<amp-jwplayer>`
  * `<amp-kaltura-player>`
  * `<amp-list>`
  * `<amp-list>`
  * `<amp-live-list>`
  * `<amp-live-list>`
  * `<amp-mathml>`
  * `<amp-mowplayer>`
  * `<amp-nexxtv-player>`
  * `<amp-o2-player>`
  * `<amp-ooyala-player>`
  * `<amp-pan-zoom>`
  * `<amp-pinterest>`
  * `<amp-playbuzz>`
  * `<amp-powr-player>`
  * `<amp-reach-player>`
  * `<amp-reddit>`
  * `<amp-riddle-quiz>`
  * `<amp-soundcloud>`
  * `<amp-springboard-player>`
  * `<amp-timeago>`
  * `<amp-twitter>`
  * `<amp-video>`
  * `<amp-video-iframe>`
  * `<amp-vimeo>`
  * `<amp-vine>`
  * `<amp-viqeo-player>`
  * `<amp-vk>`
  * `<amp-wistia-player>`
  * `<amp-yotpo>`
  * `<amp-youtube>`

</details>

### 示例

```html
<amp-story-page id="foo">
  <amp-story-grid-layer template="fill">
    <amp-img src="https://example.ampproject.org/helloworld/bg1.jpg" width="900" height="1600">
    </amp-story-grid-layer>
    <amp-story-page-attachment layout="nodisplay">
      <h1>我的标题</h1>
      <p>很多有趣的文字与<a href="https://example.ampproject.org">链接</a>！</p>
      <p>更多文字和一个 YouTube 视频！</p>
      <amp-youtube
          data-videoid="b4Vhdr8jtx0"
          layout="responsive"
          width="480" height="270">
      </amp-youtube>
      <p>还有一条 Twitter 微博！</p>
      <amp-twitter
          data-tweetid="885634330868850689"
          layout="responsive"
          width="480" height="270">
      </amp-twitter>
  </amp-story-page-attachment>
</amp-story-page>
```

## 动画

`<amp-story-page>` 中的每个元素都可以有一个进入动画。

您可以通过在元素上指定一组[动画属性](#animation-attributes)来配置动画；无需额外的 AMP 扩展组件或配置。

### 动画效果

以下动画效果可用作 AMP 故事的预设：

| 预设名称       | 默认持续时长（毫秒） | 默认延迟时间（毫秒） |
|-----------------|---------------------| ------------------ |
| `drop`            | 1600                  | 0 |
| `fade-in`         | 500                   | 0 |
| `fly-in-bottom`   | 500                   | 0 |
| `fly-in-left`     | 500                   | 0 |
| `fly-in-right`    | 500                   | 0 |
| `fly-in-top`      | 500                   | 0 |
| `pulse`           | 500                   | 0 |
| `rotate-in-left`  | 700                   | 0 |
| `rotate-in-right` | 700                   | 0 |
| `twirl-in`        | 1000                  | 0 |
| `whoosh-in-left`  | 500                   | 0 |
| `whoosh-in-right` | 500                   | 0 |
| `pan-left`        | 1000                  | 0 |
| `pan-right`       | 1000                  | 0 |
| `pan-down`        | 1000                  | 0 |
| `pan-up`          | 1000                  | 0 |
| `zoom-in`         | 1000                  | 0 |
| `zoom-out`        | 1000                  | 0 |

[tip type="ll callout('提示：</b><a class="type_success"]
可在 AMP By Example 上查看[所有 AMP 故事动画的在线演示](https://ampbyexample.com/stories/features/animations/)。
[/tip]

### 动画属性

##### animate-in [必需]

使用此属性可指定进入[动画预设](#animation-effects)的名称。

**示例：标题从网页左侧飞入。

```html

<h2 animate-in="fly-in-left">
  从左侧飞入！
</h2>

```

##### animate-in-duration [可选]

使用此属性可指定进入动画的持续时长，以秒或毫秒为单位（例如，0.2 秒或 200 毫秒）。默认持续时长取决于您指定的动画预设。

**示例：标题从网页左侧飞入，动画在半秒内结束。

```html

<h2 animate-in="fly-in-left" animate-in-duration="0.5s">
  从左侧飞入！
</h2>

```

##### animate-in-delay [可选]

使用此属性可指定开始播放动画之前的延迟时间。该值必须大于或等于 0，以秒或毫秒为单位（例如，0.2 秒或 200 毫秒）。默认延迟时间取决于您指定的动画预设。

**示例：0.4 秒后，标题从网页左侧飞入，并在 0.5 秒内完成进入动画。

```html

<h2 animate-in="fly-in-left" animate-in-duration="0.5s" animate-in-delay="0.4s">
  从左侧飞入！
</h2>

```

[tip type="ll callout('注意：</b><a class="type_note"]
动画延迟时间无法保证精确无误。扫描完第一个动画元素后，在后台加载 `amp-animation` 扩展组件可能会导致额外的延迟。该属性合约定义为“延迟此动画至少 N 毫秒”。**这适用于所有元素，包括延迟时间为 0 秒的元素。
[/tip]

##### animate-in-after [可选]

使用此属性可对动画进行关联或排序（例如，animation2 在 animation1 完成后开始播放）。指定此元素的动画将遵循的动画元素的 ID。该元素必须位于同一 `<amp-story-page>` 中。延迟是在前一个元素的动画结束后应用的。如需了解更多详情，请参阅下面的[对动画进行排序](#sequencing-animations)部分。

例如，在下面的代码中，`object2` 会在 `object1` 完成进入动画之后播放动画：

```html
<amp-story-page id="page1">
  <amp-story-grid-layer template="vertical">
    <div id="object1"
        animate-in="rotate-in-left">
        1
      </div>
    <div id="object2"
        animate-in="fly-in-right"
        animate-in-after="object1">
      2. <!-- 将在 object1 完成后开始播放 -->
    </div>
  </amp-story-grid-layer>
</amp-story-page>
```

##### scale-start、scale-end [可选，仅适用于 `zoom-in` 和 `zoom-out` 动画]

使用这两个属性可进一步指定放大和缩小动画的参数。这些属性值必须大于或等于 0，且允许使用小数。表示放大的默认值为 scale-start: 1 和 scale-start: 3，而缩小正好相反。

**示例：图片在 4 秒内从 2 倍放大到 5 倍。

```html
<amp-img animate-in="zoom-in" scale-start="2" scale-end="5" animate-in-duration="4s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-x [可选，仅适用于 `pan-left` 和 `pan-right` 动画]

使用此属性可指定图片在向左平移/向右平移动画中的水平平移距离。该值必须大于或等于 0（以像素为单位）。如果采用默认值，则平移指定图片的整个宽度。

**示例：图片在 10 秒内向左平移 200 像素。

```html
<amp-img animate-in="pan-left" translate-x="200px" animate-in-duration="10s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-y [可选，仅适用于 `pan-up` 和 `pan-down` 动画]

使用此属性可指定图片在向上平移/向下平移动画中的垂直平移距离。该值必须大于或等于 0（以像素为单位）。如果采用默认值，则平移指定图片的整个高度。

**示例：图片在 15 秒内向下平移 50 像素。

```html
<amp-img animate-in="pan-down" translate-y="50px" animate-in-duration="15s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

### 对动画进行排序

要按顺序关联动画，请使用 `animate-in-after` 属性。指定链中的所有元素必须位于同一 `<amp-story-page>` 中。没有 `animate-in-after` 属性的元素不属于序列链，将在网页进入动画上单独开始播放。

```html
<amp-story-page id="my-sequencing-page">
  <amp-story-grid-layer template="vertical">
    <div class="circle"
        animate-in="drop-in"
        animate-in-duration="1.8s">
        1. <!-- 将单独开始播放 -->
    </div>
    <div id="rotate-in-left-obj"
        class="square"
        animate-in="rotate-in-left"
        animate-in-after="fade-in-obj"
        animate-in-delay="0.2s">
        2. <!-- 将在 fade-in-obj 完成后开始播放 -->
    </div>
    <div class="square"
        animate-in-after="rotate-in-left-obj"
        animate-in="whoosh-in-right"
        animate-in-delay="0.2s">
        3. <!-- 将在 rotate-in-left-obj 完成后开始播放 -->
    </div>
    <div id="fade-in-obj"
        class="circle"
        animate-in="fade-in"
        animate-in-duration="2.2s">
        1. <!-- 将单独开始播放 -->
    </div>
  </amp-story-grid-layer>
</amp-story-page>
```

### 组合多个动画

您可以在一个元素上应用多个进入动画（例如，元素在飞入网页的同时淡入）。无法为单个元素分配多个动画预设；不过，具有不同进入动画的元素可以嵌套在一起，组合成一个元素。

```html

<div animate-in="fly-in-left">
  <div animate-in="fade-in">
    我会飞入并淡入！
  </div>
</div>

```

[tip type="ll callout('注意：</b><a class="type_note"]
如果某个组合动画应在单独元素的动画结束之后开始播放，请确保构成该动画的所有嵌套元素的 `animate-in-after` 属性都设置为同一 `id`。
[/tip]

## Bookend：`amp-story-bookend`

`amp-story-bookend` 是故事的最后一个屏幕。它包含相关链接、分享选项、号召性用语链接等。

<figure class="centered-fig">
  <amp-anim alt="相关文章示例" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif" layout="fixed">
    <noscript>
      <img alt="相关文章示例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif">
    </noscript>
  </amp-anim>
</figure>

要使用此标记，请将 `<amp-story-bookend>` 标记添加为 `<amp-story>` 的子级，并且其中包含必需属性 `layout=nodisplay`。然后，您可以在单独的文件中指定 JSON 配置并通过 `src` 属性导入，也可以内嵌该配置。

通过 `src` 属性导入 JSON 配置：

```html
  <amp-story standalone>
    <amp-story-page id="cover">
      ...
    </amp-story-page>
    <!-- `layout=nodisplay` 是必需属性。-->
    <amp-story-bookend src="bookendv1.json" layout=nodisplay>
  </amp-story-bookend>
</amp-story>
```

如果您不想从服务器获取 bookend 配置，也可以内嵌指定该配置：

```html
<amp-story standalone>
  ...
  <amp-story-bookend layout=nodisplay>
    <script type="application/json">
      {
        bookendVersion: "v1.0",
        shareProviders: [ ... ],
        components: [ ... ]
      }
    </script>
  </amp-story-bookend>
</amp-story>
```

接下来，您必须填写 JSON 配置。您可以在此处自定义该 bookend。配置的整体结构如下所示：

```text
{
  bookendVersion: "v1.0",
  shareProviders: [
    ...
  ],
  components: [
    ...
  ]
}
```

必须通过添加第一行来指定您使用的是 v1.0 版本。

#### Bookend 组件

bookend 由各种组件构成。这些组件可以是文章、号召性用语链接、文本等。

它们在已配置 JSON 的 `components` 字段中指定。如需查看相关示例，请参阅下面的 [JSON 响应示例](#example-json-response)部分。

##### heading

<code>heading</code> 组件有一个 ```text</code> 字段，可用于向一组文章附加标题。

```json
{
  type: "heading",
  text: "阅读更多内容"
}
```

<amp-img alt="Bookend heading 组件" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-heading.png" width="386" height="123" layout="fixed">
<noscript>
  <img alt="Bookend heading 组件" src="img/amp-story-bookend-component-heading.png">
  </noscript>
</amp-img>

##### small

`small` 组件可用于链接到相关文章。此组件需要以下字段：`title`、`url` 以及 `image`（可选）。

```json
{
  type: "small",
  title: "这是印度最值得去的地方",
  url: "http://example.com/article.html",
  image: "http://placehold.it/256x128"
}
```

<amp-img alt="Bookend small 组件" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-small.png" width="379" height="192" layout="fixed">
  <noscript>
    <img alt="Bookend small 组件" src="img/amp-story-bookend-component-small.png">
  </noscript>
</amp-img>

##### landscape

`landscape` 组件可用于其他格式的内容，如视频。此组件需要以下字段：`title`、`url` 和 `image`。（可选）您还可以添加 `category` 字段，该字段在标题上方显示一个子标题。

```json
{
  type: "landscape",
  title: "TRAPPIST-1 行星可能仍然足够湿润，适合生命生存",
  url: "http://example.com/article.html",
  category: "天文学",
  image: "http://placehold.it/256x128"
}
```

<amp-img alt="Bookend landscape 组件" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-landscape.png" width="388" height="410" layout="fixed">
  <noscript>
    <img alt="Bookend landscape 组件" src="img/amp-story-bookend-component-landscape.png">
  </noscript>
</amp-img>

##### portrait

`portrait` 组件可用于链接到其他故事。此组件需要以下字段：`title`、`url` 和 `image`。（可选）您还可以添加 `category` 字段，该字段在标题上方显示一个子标题。

```json
{
  type: "portrait",
  category: "科学",
  title: "发现新事物",
  url: "http://example.com/article.html",
  image: "http://placehold.it/312x416"
}
```

<amp-img alt="Bookend portrait 组件" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-portrait.png" width="382" height="522" layout="fixed">
  <noscript>
    <img alt="Bookend portrait 组件" src="img/amp-story-bookend-component-portrait.png">
  </noscript>
</amp-img>

##### cta-link

利用 <code>cta-link</code> 组件，您可以指定号召性用语（例如 <code>Read More</code> 或 <code>Subscribe</code>）的链接。此组件有一个 <code>links</code> 键，用于指定一系列链接。每个链接都是一个包含 ```text</code> 和 <code>url</code> 值的对象。

```json
{
  type: "cta-link",
  links: [
    {
      text: "注册",
      url: "example.com/signup"
    },
  {
    text: "订阅",
    url: "example.com/subscribe"
    }
  ]
}
```

<amp-img alt="Bookend cta-links 组件" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-cta-links.png" width="381" height="81" layout="fixed">
  <noscript>
    <img alt="Bookend cta-links 组件" src="img/amp-story-bookend-component-cta-links.png">
    </noscript>
  </amp-img>

##### textbox

利用 ```textbox</code> 组件，您可以指定 bookend 内的文本（例如，照片来源信息）。此组件需要一个 <code>text</code> 数组，其中数组的每个元素都是一行文本。

```json
{
  type: "textbox",
  text: [
    出品：王一；
    编舞：王二；
    编剧：王三；
    导演：王四
  ]
}
```

<amp-img alt="Bookend textbox 组件" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-textbox.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="Bookend textbox 组件" src="img/amp-story-bookend-component-textbox.png">
  </noscript>
</amp-img>

  **AMP 到 AMP 链接**

  对于在 AMP 查看工具中显示的文档，链接通常会转到 `_top` 或在新窗口中打开。不过，指向 AMP 网页的链接可以继续显示在查看工具中。要启用此行为，请将 `"amphtml": true` 添加到支持链接的组件中。例如：

```json
...
{
  type: "small",
  title: "这是印度最值得去的地方",
  url: "http://example.com/my-amp-document.html",
  image: "http://placehold.it/256x128",
  amphtml: true
},
{
  type: "cta-link",
  links: [
    {
      text: "注册",
      url: "example.com/signup",
      amphtml: true
    },
    {
      text: "订阅",
      url: "example.com/subscribe"
    }
  ]
},
...
```

#### 社交分享

社交分享的配置在响应对象的 `shareProviders` 字段中指定，属于可选配置。

此字段应包含字符串，其中每个字符串对应一个分享服务提供商的名称（例如 `twitter`）。

当需要额外的参数时，应使用具有键值对的对象。该对象应包含一个 `provider` 键，其值（例如 `facebook`）对应于服务提供商的名称。下一个键值对将取决于分享服务提供商。

可用服务提供商的列表与 [amp-social-share](https://www.ampproject.org/docs/reference/components/amp-social-share) 组件中相同。

这些服务提供商中的每一个都有一组不同的可用参数（[请参阅 `data-param-*`](https://www.ampproject.org/docs/reference/components/amp-social-share#data-param-%2a)）。配置对象采用这些参数时不使用 `data-param-` 前缀（例如，`data-param-app_id` 在配置对象中显示为 `app_id`）。

#### JSON 配置

`<amp-story-bookend>` 必须具有指向 bookend 的 JSON 配置的 `src` 属性。它被描述为一个网址端点，用于接受 GET 请求并返回包含 bookend 内容的 JSON 响应。如果省略，amp-story 组件将呈现默认界面作为结束画面。系统负责获取呈现相关文章和热门文章所需的数据。此类数据可以从静态 JSON 文件中获取，也可以动态生成（例如，统计当前热点）。

#### JSON 响应示例

```text
{
  // 您必须指定版本 v1.0。
  bookendVersion: "v1.0",
  shareProviders: [
    email,
    tumblr,
    {
      provider: "twitter",
      // 您可以根据社交平台添加自定义分享参数。
      text: "这是我想要为 Twitter 平台添加的自定义分享文本"
    },
    {
      provider: "facebook",
      // Facebook 需要一个 </code>app_id` 参数
      app_id: "MY_FACEBOOK_APP_ID"
    }
  ],
  components: [
    {
      type: "heading",
      text: "阅读更多内容"
    },
    {
      type: "small",
      title: "这是印度最值得去的地方",
      url: "<a href="
      http: //example.com/article.html">http://example.com/article.html</a>",
        image: "<a href="
      http: //placehold.it/256x128">http://placehold.it/256x128</a>"
    },
    ...
  ]
}
```

## AMP 故事中可用的其他组件

以下是 AMP 故事中可用的其他组件，需要满足一些仅适用于故事的要求。

* [amp-sidebar](https://www.ampproject.org/docs/reference/components/amp-sidebar#sidebar-for-stories)
* [amp-consent](https://www.ampproject.org/docs/reference/components/amp-consent#prompt-ui-for-stories)

如需了解更常用的组件，请参阅[允许使用的子级列表](https://www.ampproject.org/docs/reference/components/amp-story#children)。

## 验证

请参阅 AMP 验证工具规范中的 [amp-story 规则](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii)。

## 本地化

要将您的故事本地化，请在故事的 `<html>` 标记的 `lang` 属性中添加语言代码，例如为英语添加 `<html lang="en">`。支持的语言代码如下：

* ar（阿拉伯语）
* de（德语）
* en-GB（英语，英国）
* en（英语，美国）
* es-419（西班牙语，中美洲/拉丁美洲）
* es（西班牙语，西班牙）
* fr-CA（法语，加拿大）
* fr（法语，法国）
* hi（印地语）
* id（印度尼西亚语）
* it（意大利语）
* ja（日语）
* ko（韩语）
* nl（荷兰语）
* no（挪威语）
* pt-BR（葡萄牙语，巴西）
* pt（葡萄牙语，葡萄牙）
* ru（俄语）
* tr（土耳其语）
* vi（越南语）
* zh-TW（繁体中文）
* zh（简体中文）

此外，对于从右向左书写的语言，您可以在故事的 `<html>` 标记中添加 `dir="rtl"` 属性。该属性也可以与语言代码一起使用，例如 `<html lang="ar" dir="rtl">`。

## 相关资源

* [教程：创建一个视觉效果丰富的 AMP 故事](https://www.ampproject.org/docs/tutorials/visual_story)
* [AMP By Example 中的示例](https://ampbyexample.com/stories/#stories/introduction)
* [创作 AMP 故事的最佳做法](https://www.ampproject.org/docs/guides/amp_story_best_practices)

</amp-story></body>
