---
$title: amp-video
$category@: media
teaser:
  text: HTML5 video タグの代替機能です。
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



HTML5 `video` タグの代替機能です。HTML5 動画ファイルを直接埋め込む場合に限り使用できます。

<table>
  <tr>
    <td width="40%"><strong>必須のスクリプト</strong></td>
    <td><code>&lt;script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td width="40%"><strong>例</strong></td>
    <td>AMP By Example:<ul>
      <li><a href="https://ampbyexample.com/components/amp-video/">amp-video サンプル</a></li>
      <li><a href="https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/">amp-video の Click-to-Play オーバーレイ</a></li></ul></td>
    </tr>
    <tr>
      <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">サポートされるレイアウト</a></strong></td>
      <td>fill、fixed、fixed-height、flex-item、nodisplay、responsive</td>
    </tr>
  </table>

## 動作 <a name="behavior"></a>

`amp-video` コンポーネントは、`src` 属性によって指定された動画リソースを、ランタイムによって定義された時刻に遅延読み込みします。`amp-video` コンポーネントは、標準の HTML5 `<video>` タグと同じように制御することができます。

`amp-video` コンポーネントは、最大で 4 つのタイプの HTML ノードを子として受け取ります。

* `source` タグ: HTML `<video>` タグと同様、子タグとして `<source>` タグを追加することで、異なるソース メディア ファイルを指定して再生することができます。
* `track` タグ: 動画の字幕を有効にします。ドキュメントとは別のオリジンで字幕トラックがホストされている場合は、`<amp-video>` タグに `crossorigin` 属性を追加する必要があります。
* 動画再生開始前のプレースホルダ。
* ブラウザが HTML5 動画をサポートしていない場合のフォールバック: 必要に応じて、直接の子ノードの 1 つに `fallback` 属性を設定することができます。ユーザーのブラウザが HTML5 動画をサポートしていなかった場合、この属性を設定されたノードが存在していれば、このノードとその子が表示コンテンツを形成します。

#### 例 <a name="example"></a>

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

## 分析機能 <a name="analytics"></a>

`amp-video` は、簡単に使用できる分析機能を備えています。詳細については、[動画分析機能](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-video-analytics.md)をご覧ください。

## 属性 <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>子タグとなる <code>&lt;source&gt;</code> タグが存在しない場合は必須。HTTPS にする必要があります。</td>
  </tr>
  <tr>
    <td width="40%"><strong>poster</strong></td>
    <td>動画の再生を開始する前に表示するフレームの画像。デフォルトでは、最初のフレームが表示されます。
      <br>Click-to-Play オーバーレイを表示することもできます。詳細については、下記の <a href="#click-to-play-overlay">Click-to-Play オーバーレイ</a>をご覧ください。</td>
      </tr>
      <tr>
        <td width="40%"><strong>autoplay</strong></td>
        <td>この属性が存在し、ブラウザが自動再生をサポートしている場合、動画は表示されるとすぐに自動的に再生されます。自動再生を行うには、いくつかのコンポーネント要件を満たす必要があります。詳細については、<a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-video-interface.md#autoplay">AMP 内動画に関する仕様</a>をご覧ください。</td>
      </tr>
      <tr>
        <td width="40%"><strong>controls</strong></td>
        <td>この属性は、HTML5 <code>video</code> の <code>controls</code> 属性と似ています。この属性が存在すると、ブラウザに各種コントロールが表示され、ユーザーが動画の再生を制御できるようになります。</td>
      </tr>
      <tr>
        <td width="40%"><strong>controlsList</strong></td>
        <td>HTML5 video 要素の <a href="https://developer.mozilla.org/ja/docs/Web/API/HTMLMediaElement/controlsList">controlsList</a> 属性と同じです。特定のブラウザでのみサポートされます。詳細については、<a href="https://developer.mozilla.org/ja/docs/Web/API/HTMLMediaElement/controlsList">https://developer.mozilla.org/ja/docs/Web/API/HTMLMediaElement/controlsList</a> をご覧ください。</td>
      </tr>
      <tr>
        <td width="40%"><strong>dock</strong></td>
        <td><strong><code>amp-video-docking</code> 拡張機能が必要です。</strong> この属性が存在していて、動画を手動で再生している場合、ユーザーが動画コンポーネントの表示領域からスクロール アウトすると、動画は「最小化」され、角または要素に固定されます。詳細については、<a href="amp-video-docking.md">ドッキング拡張機能のドキュメント</a>をご覧ください。</td>
      </tr>
      <tr>
        <td width="40%"><strong>loop</strong></td>
        <td>この属性が存在している場合、動画は最後に到達すると自動的に最初に戻ってもう一度再生を開始します。</td>
      </tr>
      <tr>
        <td width="40%"><strong>crossorigin</strong></td>
        <td>ドキュメントとは別のオリジンで <code>track</code> リソースがホストされている場合は必須。</td>
      </tr>
      <tr>
        <td width="40%"><strong>disableremoteplayback</strong></td>
        <td>メディア要素がリモート再生 UI（Chromecast や AirPlay など）を使用することを許可するかどうかを指定します。</td>
      </tr>
      <tr>
        <td width="40%"><strong>muted（サポート終了）</strong></td>
        <td><code>muted</code> 属性はサポートが終了しており、今後は影響を持ちません。<code>autoplay</code> 属性は、ミュート動作を自動的に制御します。</td>
      </tr>
      <tr>
        <td width="40%"><strong>noaudio</strong></td>
        <td>動画に音声がないことを示すアノテーションを付けます。この属性が存在すると、通常であれば動画の自動再生時に表示されるイコライザー アイコンが非表示になります。</td>
      </tr>
      <tr>
        <td width="40%"><strong>rotate-to-fullscreen</strong></td>
        <td>動画が表示されている場合、ユーザーがデバイスを横向きに回転すると、動画が全画面表示されます。詳細については、<a href="https://github.com/ampproject/amphtml/blob/master/spec/amp-video-interface.md#rotate-to-fullscreen">AMP 内動画に関する仕様</a>をご覧ください。</td>
      </tr>
      <tr>
        <td width="40%"><strong>共通の属性</strong></td>
        <td>この要素には、AMP コンポーネントに拡張された<a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">共通の属性</a>が含まれます。</td>
      </tr>
    </table>

## Media Session API の属性 <a name="media-session-api-attributes"></a>

`amp-video` コンポーネントは、[Media Session API](https://developers.google.com/web/updates/2017/02/media-session) を実装しています。そのため、デベロッパーは、動画ファイルに関する詳細情報を指定することができます。動画の追加情報は、再生 / 一時停止コントロールと一緒にデバイスの通知センター内に表示されます。

<table>
  <tr>
    <td width="40%"><strong>artwork</strong></td>
    <td>動画のアートワークとして使用する PNG / JPG / ICO 画像の URL を指定します。`artwork` が存在しない場合、Media Session API ヘルパーは、`schema.org` 定義の `image` フィールドか、`og:image`、ウェブサイトの `favicon` のいずれかを使用します。</td>
  </tr>
  <tr>
    <td width="40%"><strong>artist</strong></td>
    <td>動画ファイルの作成者を示します。文字列で指定します。</td>
  </tr>
  <tr>
    <td width="40%"><strong>album</strong></td>
    <td>動画が属しているアルバム / コレクションを示します。文字列で指定します。</td>
  </tr>
  <tr>
    <td width="40%"><strong>title</strong></td>
    <td>動画の名前 / タイトルを示します。文字列で指定します。この属性が存在しない場合、Media Session API ヘルパーは、`aria-label` 属性を使用するか、代替的にページタイトルを使用します。</td>
  </tr>
</table>

例:

以下の例では、`poster` 属性と `artwork` 属性の両方が含まれています。`poster` は、動画再生前のプレースホルダ画像として機能します。他方、`artwork` は、MediaSession API 経由で通知内に表示される画像です。

```html
<amp-video width="720" height="305" layout="responsive"
    src="https://yourhost.com/videos/myvideo.mp4"
    poster="https://yourhost.com/posters/poster.png"
    artwork="https://yourhost.com/artworks/artwork.png"
    title="Awesome video" artist="Awesome artist"
    album="Amazing album">
</amp-video>
```

## Click-to-Play オーバーレイ <a name="click-to-play-overlay"></a>

ウェブ上の動画プレーヤーで広く利用されている UX 機能として、Click-to-Play オーバーレイがあります。たとえば、ユーザーがクリックできるカスタム再生アイコンや、動画のタイトル、サイズの異なるポスター画像などを表示することができます。`amp-video` コンポーネントは、標準の `play` AMP アクションをサポートしているため、Click-to-Play を簡単に実装できます。

詳細な例については、AMP By Example の [amp-video 用 Click-to-Play オーバーレイ](https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/)をご覧ください。

## 検証 <a name="validation"></a>

AMP 検証ツール仕様の [amp-video ルール](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii)をご覧ください。
