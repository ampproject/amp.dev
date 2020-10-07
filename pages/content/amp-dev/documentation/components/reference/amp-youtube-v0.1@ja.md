---
$title: amp-youtube
$category@: media
teaser:
  text: YouTube 動画を表示します。
---


<!--
       Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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



[YouTube](https://www.youtube.com/) 動画を表示します。

<table>
  <tr>
    <td width="40%"><strong>必須のスクリプト</strong></td>
    <td><code>&lt;script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">サポートされるレイアウト</a></strong></td>
    <td>fill、fixed、fixed-height、flex-item、nodisplay、responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>例</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-youtube/">amp-youtube のアノテーション付きコードの例</a></td>
  </tr>
</table>


## 例 <a name="example"></a>

次の例はレスポンシブ レイアウトを備えており、アスペクト比が 16:9 の動画の場合に適切な幅と高さのレイアウトになります。

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
    <td>この属性が存在していて、ブラウザが自動再生をサポートしている場合:<ul>
      <li>自動再生が始まる前に、動画が自動的にミュート状態になります。</li>
      <li>表示範囲外にスクロール アウトすると、動画が一時停止します。</li>
      <li>表示範囲内にスクロールインすると、動画の再生が再開されます。</li>
      <li>ユーザーが動画をタップすると、動画のミュートが解除されます。</li>
      <li>ユーザーが動画を操作した後（ミュート / ミュート解除、一時停止 / 再開など）、動画を表示範囲内にスクロールインした場合や表示範囲外にスクロール アウトした場合、動画は、ユーザーが最後に操作した状態を維持します。たとえば、ユーザーが動画を一時停止した後、動画を表示範囲外にスクロール アウトして、さらにもう一度動画をスクロールインした場合、動画は一時停止状態を維持します。
      </li>
    </ul></td>
  </tr>
  <tr>
    <td width="40%"><strong>data-videoid</strong></td>
    <td>YouTube 動画 ID。各 YouTube 動画ページの URL に表示されています。
        たとえば、URL が「https://www.youtube.com/watch?v=Z1q71gFeRqM」の場合、<code>Z1q71gFeRqM</code> が動画 ID になります。</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-live-channelid</strong></td>
      <td>YouTube チャンネル ID。永続的ライブ配信 URL に表示されます。たとえば、URL が「https://www.youtube.com/embed/live_stream?channel=UCB8Kb4pxYzsDsHxzBfnid4Q」の場合、<code>UCB8Kb4pxYzsDsHxzBfnid4Q</code> がチャンネル ID になります。<code>data-videoid</code> 属性の代わりに <code>data-live-channelid</code> 属性を指定すると、動画 URL の代わりに永続的ライブ配信 URL を埋め込むことができます。チャンネルの場合、デフォルトのプレースホルダは指定できません。動画の場合は、プレースホルダを指定できます（上記の例 2 を参照）。</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-param-*</strong></td>
      <td><code>data-param-*</code> 属性はすべて、クエリ パラメータとして YouTube iframe src に追加されます。この属性は、コントロールを表示するかどうかなど、カスタム値を YouTube プラグインに渡す場合に使用します。
          キーと値は URI エンコードされます。キーはキャメルケースになります。
          <ul>
          <li>`data-param-controls=1` は `&amp;controls=1` になります。</li>
        </ul>
        YouTube の他のパラメータ オプションについては、<a href="https://developers.google.com/youtube/player_parameters">YouTube 埋め込みプレーヤー パラメータ</a>をご覧ください。
      </td>
    </tr>
    <tr>
      <td width="40%"><strong>dock</strong></td>
      <td><strong><code>amp-video-docking</code> 拡張機能が必要です。</strong> この属性が存在していて、動画を手動で再生している場合、ユーザーが動画コンポーネントの表示領域からスクロール アウトすると、動画は「最小化」され、角または要素に固定されます。詳細については、<a href="amp-video-docking.md">ドッキング拡張機能のドキュメント</a>をご覧ください。</td>
    </tr>
    <tr>
      <td width="40%"><strong>credentials（省略可）</strong></td>
      <td><code>Fetch API</code> で指定されているとおりに <a href="https://fetch.spec.whatwg.org/">credentials</a> オプションを定義します。
        <ul>
          <li>サポートされている値: `omit`、`include`</li>
          <li>デフォルト: `include`</li>
        </ul>
        <a href="http://www.google.com/support/youtube/bin/answer.py?answer=141046">プライバシー強化モードで YouTube プレーヤーを使用</a>する場合は、<code>omit</code> 値を渡します。YouTube は通常、プレーヤーが読み込まれると Cookie を設定します。プライバシー強化モードの場合、ユーザーがプレーヤーをクリックしたときに Cookie が設定されます。</td>
      </tr>
      <tr>
        <td width="40%"><strong>共通の属性</strong></td>
        <td>この要素には、AMP コンポーネントに拡張された<a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">共通の属性</a>が含まれます。</td>
      </tr>
    </table>

## 検証 <a name="validation"></a>

AMP 検証ツール仕様の [amp-youtube ルール](https://github.com/ampproject/amphtml/blob/master/extensions/amp-youtube/validator-amp-youtube.protoascii)をご覧ください。
