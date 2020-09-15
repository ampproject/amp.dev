---
$category@: media
formats:
  - websites
  - stories
  - ads
teaser:
  text: 替代 HTML5 audio 标记。
---


<!---
Copyright 2020 The AMP HTML Authors. All Rights Reserved.

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



## 行为

将`amp-audio`组件与直接嵌入HTML5音频文件一起使用。

`amp-audio` 组件将按照运行时确定的时间延迟加载通过其 `src` 属性指定的音频资源。您可以大体上按照控制标准 HTML5 `audio` 标记的方式控制它。
就像所有嵌入在AMP文件中的外部资源一样， 仅当 `amp-audio` 元素在视口中或视口附近时，才“延迟”加载音频。

`amp-audio` 组件最多接受三种不同类型的 HTML 节点作为子级：

* `source` 标记：和在 HTML `<audio>` 标记中一样，您可以添加 `<source>` 标记子级，以指定要播放的不同源媒体文件。
* 音频播放前使用的占位符: 一个或零个直接子节点可以具有`placeholder`属性。如果存在，此节点及其子节点将形成一个占位符，该占位符将显示而不是音频。 在 `amp-audio` 容器内的任何位置单击或点击都会将占位符替换为音频本身。
* 回调（如果浏览器不支持 HTML5 音频）：一个或零个直接子节点可以具有 `fallback` 属性。如果存在此节点，则在用户的浏览器不支持 HTML5 音频时，则显示此节点及其子级的内容。

[sourcecode:html]
<amp-audio
  width="400"
  height="300"
  src="https://yourhost.com/audios/myaudio.mp3"
>
  <div fallback>
    <p>Your browser doesn’t support HTML5 audio</p>
  </div>
  <source type="audio/mpeg" src="foo.mp3" />
  <source type="audio/ogg" src="foo.ogg" />
</amp-audio>
[/sourcecode]

## 属性

### `src`

如果不存在 `<source>` 子级，则该属性为必需的属性。必须为 HTTPS。

### `preload`

如果此属性存在，在html `<audio>` 标记中设置preload属性，该属性指定作者在页面加载时是否认为应加载音频文件。

### `autoplay`

如果此属性存在，则该属性表示音频将在准备就绪后立即开始播放。

### `loop`

如果此属性存在，到达终点时，音频将自动循环回到起点。

### `muted`

如果此属性存在，默认将静音音频。

### `controlsList`

与 HTML5 音频元素的
[controlsList](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList)
属性相同。只有某些浏览器支持此属性。如需了解详情，请参阅 [https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList)
。

### Media Session Attributes

`amp-audio` 实现了
[Media Session API](https://developers.google.com/web/updates/2017/02/media-session)，使开发人员能够指定有关音频文件的更多信息
播放将显示在用户设备的通知中心（该中心内还会显示播放/暂停控件）。

示例：

[sourcecode:html]
<amp-audio
  width="400"
  height="300"
  src="https://yourhost.com/audios/myaudio.mp3"
  artwork="https://yourhost.com/artworks/artwork.png"
  title="Awesome music"
  artist="Awesome singer"
  album="Amazing album"
>
  <source type="audio/mpeg" src="foo.mp3" />
</amp-audio>
[/sourcecode]

#### `artwork`

用作音频海报图片的 PNG/JPG/ICO 图片的网址。 如果 `artwork` 属性不存在， 则 Media Session API 帮助程序将使用 `schema.org` 定义中的 `image` 字段、`og:image` 或网站的 `favicon`。

#### `artist`

(string) 指定音频文件的作者。

#### `album`

(string) i指定从哪个专辑获取音频。

#### `title`

(string)
[common attributes](https://amp.dev/documentation/guides-and-tutorials/learn/common_attributes)的一部分，则作为MediaSession通知中显示的音频名称的两倍。如果未提供此属性，Media Session API 帮助程序将使用 `aria-label` 属性或回退到网页标题。

## Analytics

AMP音频分析收集有关用户如何与AMP文档中的音频进行交互的数据。 AMP音频扩展在其生命周期内发布分析事件。
这些事件可以使用`audio-*`触发器通过分析配置进行报告。`audio-play`和`audio-pause`是现在支持的两个分析事件。

查看有关 [AMP Analytics component](https://amp.dev/documentation/components/amp-analytics/)
配置的详细信息。

### Audio play trigger (`"on": "audio-play"`)

当用户点击播放或从自动播放开始或恢复开始播放音频时，将触发 `audio-play` 触发器。使用这些配置触发此事件的请求。

[sourcecode:javascript]
"triggers": {
  "audioPlay": {
    "on": "audio-play",
    "request": "event",
    "selector": "#audio1"
  }
}
[/sourcecode]

### Audio pause trigger (`"on": "audio-pause"`)

当音频因用户单击暂停，自动播放暂停或音频到达结尾而停止播放时，将触发 `audio-pause` 触发器。
使用这些配置来触发对此事件的请求。

[sourcecode:javascript]
"triggers": {
  "audioPause": {
    "on": "audio-pause",
    "request": "event",
    "selector": "#audio1"
  }
}
[/sourcecode]

## Validation

请参阅 AMP 验证工具规范中的 [amp-audio rules](https://github.com/ampproject/amphtml/blob/master/extensions/amp-audio/validator-amp-audio.protoascii)
