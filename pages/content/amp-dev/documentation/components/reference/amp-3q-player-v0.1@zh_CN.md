---
$category@: media
formats:
  - websites
teaser:
  text: 嵌入来自3Q SDN的视频。
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



使AMP能够将3Q SDN中的视频嵌入到您的网站中。

## 用法

`amp-3q-player` 组件将来自3Q SDN的视频嵌入到AMP页面。 该组件包括一个视频界面，您可以自定义播放器的 `width` 和
`height` 。 指定 `responsive` 布局来保持16:9的视频宽高比。

### Example

[sourcecode:html]
<amp-3q-player
  data-id="c8dbe7f4-7f7f-11e6-a407-0cc47a188158"
  layout="responsive"
  width="480"
  height="270"
></amp-3q-player>
[/sourcecode]

## 属性

### data-id

`data-id` 属性指定来自3Q SDN中适当的 `sdnPlayoutId`。

### autoplay (optional)

如果存在 `autoplay` 属性，并且浏览器支持autoplay，则
启用以下行为：

- 自动播放开始前，视频会自动静音。
- 当用户将视频滚动到视图之外时，视频将暂停。
- 当用户将视频滚动到视图中时，视频将继续。
- 当用户点击视频时，视频将取消静音。

如果用户与视频进行交互，然后将其滚动到视图中或之外，则视频的状态将保持不变。例如，如果用户暂停视频，将视频滚动到视图之外，然后再滚动回视频，那么视频将保持暂停状态。

### 常见属性

`amp-3q-player` 组件包含扩展到所有 AMP 组件的 [常见属性](https://amp.dev/documentation/guides-and-tutorials/learn/common_attributes)。

## 验证

请参阅 AMP 验证工具规范中的 [amp-3q-player 规则](https://github.com/ampproject/amphtml/blob/master/extensions/amp-3q-player/validator-amp-3q-player.protoascii)。