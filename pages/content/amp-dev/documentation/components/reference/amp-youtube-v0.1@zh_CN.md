---
$title: amp-youtube
$category@: media
teaser:
  text: 显示 YouTube 视频。
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



显示 [YouTube](https://www.youtube.com/) 视频。

<table>
  <tr>
    <td width="40%"><strong>必需的脚本</strong></td>
    <td><code>&lt;script async custom-element="amp-youtube" src="https://ampjs.org/v0/amp-youtube-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">支持的布局</a></strong></td>
    <td>fill、fixed、fixed-height、flex-item、nodisplay、responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>示例</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-youtube/">amp-youtube 代码示例（带注释）</a></td>
  </tr>
</table>

## 示例 <a name="example"></a>

采用 responsive 布局时，示例中的宽度和高度应针对 16:9 的宽高比视频生成正确的布局。

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270"></amp-youtube>
  [/sourcecode]

  [sourcecode:html]
  <amp-youtube
      id="myLiveChannel"
      data-live-channelid="UCB8Kb4pxYzsDsHxzBfnid4Q"
      width="358"
      height="204"
      layout="responsive">
    <amp-img
      src="https://i.ytimg.com/vi/Wm1fWz-7nLQ/hqdefault_live.jpg"
      placeholder
      layout="fill"
      />
  </amp-youtube>
  [/sourcecode]

## 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>autoplay</strong></td>
    <td>如果此属性存在并且浏览器支持自动播放：
      <ul>
        <li>视频将在自动播放开始之前自动静音</li>
        <li>视频滚动到可视区域以外时，将暂停播放</li>
        <li>视频滚动到可视区域以内时，将恢复播放</li>
        <li>用户点按视频后，视频将取消静音</li>
        <li>如果用户已与视频互动（例如静音/取消静音、暂停播放/恢复播放等），然后将视频滚动到可视区域以内/以外，则视频将一直保持用户最后一次互动后的状态。例如，如果用户暂停视频，将视频滚动到可视区域以外，然后再返回到视频，则视频仍将处于暂停状态。
        </li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>data-videoid</strong></td>
      <td>每个 YouTube 视频页面网址都包含 YouTube 视频 ID。
          例如，在 https://www.youtube.com/watch?v=Z1q71gFeRqM 这个网址中，<code>Z1q71gFeRqM</code> 为视频 ID。</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-live-channelid</strong></td>
        <td>YouTube 频道 ID，可提供稳定的直播网址。例如，在 https://www.youtube.com/embed/live_stream?channel=UCB8Kb4pxYzsDsHxzBfnid4Q 这个网址中，<code>UCB8Kb4pxYzsDsHxzBfnid4Q</code> 为频道 ID。您可以通过提供 <code>data-live-channelid</code> 属性（而非 <code>data-videoid</code> 属性）来嵌入直播（而非视频）的稳定网址。频道不含默认占位符。您可以按照上面的第 2 个示例为视频提供占位符。</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-param-*</strong></td>
        <td>所有 <code>data-param-*</code> 属性都将作为查询参数添加到 YouTube iframe src 中。这可用于将自定义值传递到 YouTube 插件，例如是否显示控件。
            键和值将采用 URI 编码。键将采用驼峰式大小写格式。
            <ul>
            <li>`data-param-controls=1` 变为 `&amp;controls=1`</li>
          </ul>
          如需了解 YouTube 的更多参数选项，请参阅 <a href="https://developers.google.com/youtube/player_parameters">YouTube 嵌入式播放器参数</a>。
        </td>
      </tr>
      <tr>
        <td width="40%"><strong>dock</strong></td>
        <td><strong>需要 <code>amp-video-docking</code> 扩展。</strong> 如果此属性存在并且视频通过手动方式播放，则当用户滚动到视频组件的可视区域以外时，视频将“最小化”并固定到角落或某个元素。如需了解更多详情，请参阅<a href="amp-video-docking.md">关于 docking 扩展的文档</a>。</td>
      </tr>
      <tr>
        <td width="40%"><strong>credentials（可选）</strong></td>
        <td>将 <code>credentials</code> 选项定义为通过 <a href="https://fetch.spec.whatwg.org/">Fetch API</a> 指定的值。
          <ul>
            <li>支持的值：`omit`、`include`</li>
            <li>默认值：`include`</li>
          </ul>
          如果您希望<a href="http://www.google.com/support/youtube/bin/answer.py?answer=141046">在隐私权保护增强模式下使用 YouTube 播放器</a>，请传递 <code>omit</code> 值。
          通常，YouTube 会在加载播放器时设置其 Cookie。在隐私权保护增强模式下，Cookie 是在用户点击播放器后设置的。</td>
        </tr>
        <tr>
          <td width="40%"><strong>常见属性</strong></td>
          <td>此元素包含扩展到 AMP 组件的<a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">常见属性</a>。</td>
        </tr>
      </table>

## 验证 <a name="validation"></a>

请参阅 AMP 验证工具规范中的 [amp-youtube 规则](https://github.com/ampproject/amphtml/blob/main/extensions/amp-youtube/validator-amp-youtube.protoascii)。
