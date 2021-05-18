---
$title: amp-video
$category@: media
teaser:
  text: 替代 HTML5 视频标记。
---



<!--
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



替代 HTML5 `video` 标记；仅用于直接嵌入 HTML5 视频文件。

<table>
  <tr>
    <td width="40%"><strong>必需的脚本</strong></td>
    <td><code>&lt;script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td width="40%"><strong>示例</strong></td>
    <td>AMP By Example 的：<ul>
      <li><a href="https://ampbyexample.com/components/amp-video/">amp-video 示例</a></li>
      <li><a href="https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/">amp-video 的点击播放叠加层</a></li></ul></td>
    </tr>
    <tr>
      <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">支持的布局</a></strong></td>
      <td>fill、fixed、fixed-height、flex-item、nodisplay、responsive</td>
    </tr>
  </table>

## 行为 <a name="behavior"></a>

`amp-video` 组件将按照运行时确定的时间延迟加载通过其 `src` 属性指定的视频资源。您可以大体上按照控制标准 HTML5 `<video>` 标记的方式控制 `amp-video` 组件。

`amp-video` 组件最多接受四种不同类型的 HTML 节点作为子级：

* `source` 标记：和在 HTML `<video>` 标记中一样，您可以添加 `<source>` 标记子级，以指定要播放的不同源媒体文件。
* `track` 标记，用于在视频中启用字幕。如果字幕轨托管在文档之外的其他来源，那么您必须将 `crossorigin` 属性添加到 `<amp-video>` 标记中。
* 视频播放前使用的占位符
* 回调（如果浏览器不支持 HTML5 视频）：一个或零个直接子节点可以具有 `fallback` 属性。如果存在此节点，则在用户的浏览器不支持 HTML5 视频时，则显示此节点及其子级的内容。

#### 示例 <a name="example"></a>

[example preview="inline" playground="true" imports="amp-video"]
```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  layout="responsive"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <source src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.webm"
    type="video/webm" />
  <source src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```
[/example]

## 分析 <a name="analytics"></a>

`amp-video` 自动支持分析功能。如需了解更多信息，请参阅[视频分析](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md)。

## 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>如果不存在 <code>&lt;source&gt;</code> 子级，则该属性为必需的属性。必须为 HTTPS。</td>
  </tr>
  <tr>
    <td width="40%"><strong>poster</strong></td>
    <td>视频开始播放之前显示的帧的图片。默认情况下，显示第一帧。
      <br>
        或者，您也可以显示点击播放叠加层。如需了解详情，请参阅下面的<a href="#click-to-play-overlay">点击播放叠加层</a>部分。</td>
      </tr>
      <tr>
        <td width="40%"><strong>autoplay</strong></td>
        <td>如果此属性存在并且浏览器支持自动播放，则视频将在变为可见时自动播放。该组件需要满足一些条件才能播放，<a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-video-interface.md#autoplay">在“AMP 中的视频”规范中列出了这些条件</a>。</td>
      </tr>
      <tr>
        <td width="40%"><strong>controls</strong></td>
        <td>此属性类似于 HTML5 <code>video</code> 中的 <code>controls</code> 属性。如果此属性存在，浏览器将提供相应控件，以便用户控制视频播放。</td>
      </tr>
      <tr>
        <td width="40%"><strong>controlsList</strong></td>
        <td>与 HTML5 视频元素的 <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList">controlsList</a> 属性相同。只有某些浏览器支持此属性。如需了解详情，请参阅 <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList">https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/controlsList</a>。</td>
      </tr>
      <tr>
        <td width="40%"><strong>dock</strong></td>
        <td><strong>需要 <code>amp-video-docking</code> 扩展。</strong> 如果此属性存在并且视频通过手动方式播放，则当用户滚动到视频组件的可视区域以外时，视频将“最小化”并固定到角落或某个元素。如需了解更多详情，请参阅<a href="amp-video-docking.md">关于 docking 扩展的文档</a>。</td>
      </tr>
      <tr>
        <td width="40%"><strong>loop</strong></td>
        <td>如果此属性存在，则视频在播放完毕后会自动循环至开始位置。</td>
      </tr>
      <tr>
        <td width="40%"><strong>crossorigin</strong></td>
        <td>如果 <code>track</code> 资源托管在文档之外的其他来源，则此属性为必需的属性。</td>
      </tr>
      <tr>
        <td width="40%"><strong>disableremoteplayback</strong></td>
        <td>确定是否允许媒体元素具有远程播放界面（如 Chromecast 或 AirPlay）。</td>
      </tr>
      <tr>
        <td width="40%"><strong>muted（已弃用）</strong></td>
        <td><code>muted</code> 属性已被弃用且不再有效。<code>autoplay</code> 属性会自动控制静音行为。</td>
      </tr>
      <tr>
        <td width="40%"><strong>noaudio</strong></td>
        <td>将视频注释为没有音频。这会在视频具有 autoplay 属性时隐藏已显示的均衡器图标。</td>
      </tr>
      <tr>
        <td width="40%"><strong>rotate-to-fullscreen</strong></td>
        <td>如果视频可见，则在用户将设备旋转到横屏模式后会全屏显示。如需了解更多详情，请参阅<a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-video-interface.md#rotate-to-fullscreen">“AMP 中的视频”规范</a>。</td>
      </tr>
      <tr>
        <td width="40%"><strong>常见属性</strong></td>
        <td>此元素包含扩展到 AMP 组件的<a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">常见属性</a>。</td>
      </tr>
    </table>

## Media Session API 属性 <a name="media-session-api-attributes"></a>

`amp-video` 组件可实现 [Media Session API](https://developers.google.com/web/updates/2017/02/media-session)，以便开发者指定关于视频文件的更多信息。关于视频的其他信息将显示在用户设备的通知中心内（该中心内还会显示播放/暂停控件）。

<table>
  <tr>
    <td width="40%"><strong>artwork</strong></td>
    <td>指定用作视频海报图片的 PNG/JPG/ICO 图片对应的网址。如果 `artwork` 属性不存在，则 Media Session API 帮助程序将使用 `schema.org` 定义中的 `image` 字段、`og:image` 或网站的 `favicon`。</td>
  </tr>
  <tr>
    <td width="40%"><strong>artist</strong></td>
    <td>以字符串形式指定视频文件的作者。</td>
  </tr>
  <tr>
    <td width="40%"><strong>album</strong></td>
    <td>以字符串形式指定从哪个专辑/集合获取视频。</td>
  </tr>
  <tr>
    <td width="40%"><strong>title</strong></td>
    <td>以字符串形式指定视频的名称/标题。如果未提供此属性，Media Session API 帮助程序将使用 `aria-label` 属性或回退到网页标题。</td>
  </tr>
</table>

示例：

此示例同时包含 `poster` 和 `artwork` 属性。`poster` 用作视频播放前的占位符图片，而 `artwork` 是通过 MediaSession API 显示在通知中的图片。

```html
<amp-video width="720" height="305" layout="responsive"
    src="https://yourhost.com/videos/myvideo.mp4"
    poster="https://yourhost.com/posters/poster.png"
    artwork="https://yourhost.com/artworks/artwork.png"
    title="Awesome video" artist="Awesome artist"
    album="Amazing album">
</amp-video>
```

## 点击播放叠加层 <a name="click-to-play-overlay"></a>

网站上的视频播放器提供点击播放叠加层是一种常见的用户体验功能。例如，您可以显示自定义播放图标供用户点击，也可以添加视频标题、不同尺寸的海报图片，等等。由于 `amp-video` 组件支持标准的 `play` AMP 操作，因此您可以轻松实现点击播放。

如需查看详细示例，请访问 AMP By Example 的 [amp-video 的点击播放叠加层](https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/)。

## 验证 <a name="validation"></a>

请参阅 AMP 验证工具规范中的 [amp-video 规则](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii)。
