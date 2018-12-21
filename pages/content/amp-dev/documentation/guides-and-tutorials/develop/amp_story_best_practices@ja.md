---
$title: AMP ストーリーのおすすめの作成方法
---

[TOC]

[AMP ストーリー](/ja/docs/reference/components/amp-story.html)を作成する場合は、このガイドで紹介する内容に沿って作業することをおすすめします。


## 背景色

AMP ストーリーのページに背景色を指定することをおすすめします。背景色を指定しておけば、ネットワークの状態が不安定で画像や動画アセットをダウンロードできない場合でも、適切なフォールバックのユーザー エクスペリエンスが提供されます。

*   背景色には、ページの背景のアセットにおける支配色と同じ色か、それに近い色を選ぶ必要があります。
*   画像やページ自体にスムーズに遷移できるよう、以下のいずれかの色にします。
    *   画像や動画における支配色か、それに近い色。
    *   ストーリー内の全ページに一貫するテーマ色。
*   画像の読み込み前でもテキストを読むことができるよう、背景色とフォントの色は別の色にします。

## テキスト

### 判読できるようにする

ページのテキスト オーバーレイを判読できるようにします。

* フォント色には、背景画像や背景色とは対照的な色を選びます。
* 画像とテキストの間にグラデーション オーバーレイを追加し、テキストを画像と対比して引き立たせます。

### テキストの分量を抑える

AMP ストーリーは、より視覚的なエクスペリエンスの提供を目的としています。そのため、ページ上のテキストの分量は 1～2 文程度に抑えます。ページ上のテキストの量を増やしたほうがよいと思われる場合は、その目的と、テキストを読み取る際の流れを十分に考慮してください。

## 動画

### poster 属性を指定する

`poster` は、動画のダウンロードが終わるまでの間 UI に表示する画像です。任意の画像を使用できますが、通常は動画の最初のフレームを使用します。ただし、動画の内容を代表するような画像を選んで、スムーズに遷移できるようにしてください。動画の最初のフレームを選ぶ場合は、そのフレームが空白ではなく画像が含まれていることを確認します。

ポスター画像の推奨サイズは 720p（幅 720 x 高さ 1,280）です。

例: ポスターの指定

```html
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

### `src` ではなく `<source>` を指定する

[amp-video](/ja/docs/reference/components/amp-video.html) のソースを指定する際は、`src` ではなく子要素の `<source>` を使用します。`<source>` 要素を使用することで、動画の種類を指定したり、複数の動画のソースを追加したりできるようになります。`<source>` 要素内で、`"type"` 属性を使用して MIME タイプを指定します。HLS 動画の場合は、MIME タイプに `application/x-mpegurl` か `application/vnd.apple.mpegurl` のいずれかを指定する必要があります。他の動画の場合は、`video/` という MIME プレフィックスの後に動画フォーマットを指定します（例: "`video/mp4`"）。

例: 複数のソースファイルの指定

```html
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">
  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
```

### 動画のサイズ、長さ

*  最適なパフォーマンスのために、動画のサイズが 4 MB 以下になるようにする必要があります。
*   長い動画の場合は、動画を複数のページに分割することを検討します。
*   カバーページの場合は、大きすぎる動画は避けます。

### 動画のフォーマット

動画フォーマットを 1 種類のみ提供する場合は、**MP4** を使用します。ただし、可能であれば **HLS** 動画を使用したうえで、ブラウザが HLS 動画に対応していない場合のフォールバックとして MP4 を指定することをおすすめします。HLS ではアダプティブ ビットレートによるストリーミングが行われ、ユーザーのネットワーク接続の状態に合わせて画質を調整できます。

[tip type="note"]

パソコン版の Chrome ブラウザでは HLS 動画フォーマットがサポートされていないため（エミュレーションによるサポートもありません）、パソコンからのページへのトラフィックに備えて MP4 のフォールバックの指定が必要です。HLS 動画のデバッグは、実際のモバイル端末を用意して USB デバッグを使って行う必要があります。

[/tip]

### 動画の解像度

AMP ストーリーの動画は常に縦向きのビューで、予期されるアスペクト比は 16:9 です。動画ストリーミングの種類に応じて推奨の解像度を使用してください。

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

アスペクト比が 16:9 ではないモバイル端末の場合、動画はビューポートに収まるように縦または横にトリミングされます。

[/tip]


### 動画コーデック

1.  MP4 の場合、`H.264` を使用します。
1.  WEBM の場合、`VP9` を使用します。
1.  HLS または DASH の場合、`H.264` を使用します。


### 画質

#### コード変換の最適化

動画のエンコードや、エンコード中の画質の調整に利用できるさまざまなツールがあります。たとえば、次のようなツールを利用できます。

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

#### HLS セグメントのサイズ

通常、HLS セグメントは 10 秒以下の長さにしてください。

### 動画の終了後に次のページに移動する

動画の再生が終わった後で自動的に別のページへ移動させる場合は、`<amp-story-page>` の `auto-advance-after` 属性の値に、想定される動画の長さではなく動画 ID を設定する必要があります。つまり、以下のような値を使用します。

```html
<amp-story-page auto-advance-after="myvideo">
```

以下のような値は使用しません。

```html
<amp-story-page auto-advance-after="9s">
```

これは、ページの表示と動画の再生開始のタイミングがずれた場合や、指定された動画の長さの値が不正確な場合に、想定される長さと実際の長さとの間に差が生じるためです。これは動画がループする原因となり、ユーザーに不快感を与えてしまうおそれがあります。
 
