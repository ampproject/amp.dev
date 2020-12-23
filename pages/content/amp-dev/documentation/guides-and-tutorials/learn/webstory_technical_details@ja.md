---
"$title": ウェブストーリーの技術情報
"$order": '1'
description: ウェブストーリーの技術情報
"$category": Develop
formats:
- stories
author: CrystalOnScript
---

このガイドは、AMP でウェブストーリーをうまく作成するために知っておくべきすべての技術的な情報と実践を説明します。

## AMP の妥当性

ウェブストーリーは、厳密に言うと、AMP で作成され、以下の AMP 仕様に従う、1 つのウェブページです。

- 先頭に `<!doctype html>` doctype を指定する。
- 最上位階層のタグを `<html ⚡>` または `<html amp>` タグにする。
- `<head>` タグと `<body>` タグを含めます。
- `<meta charset="utf-8">` タグを `<head>` タグの最初の子要素にする。
- `<script async src="https://cdn.ampproject.org/v0.js"></script>` タグを `<head>` タグに含める。このスクリプトを `<head>` の 2 番目の子要素にするのがベストプラクティスです。
- `<head>` タグに ` <link rel="canonical" href="page/url">` タグを含め、href をウェブストーリーの URL にポイントする。
- Contain a `<meta name="viewport" content="width=device-width">` tag inside the `<head>` tag. It's also recommended to include initial-scale=1.
- `<head>` タグ内に [AMP ボイラープレート](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites)コードを含める。

AMP ウェブページと AMP を使って作成されたウェブストーリーの違いは、[`amp-story`](https://amp.dev/documentation/components/amp-story/?format=stories) コンポーネントにあります。これがドキュメントの `<body>` の直下にある唯一の子要素であり、`standalone` 属性を含める必要があります。すべてのウェブストーリー、レイヤー、および要素は、`<amp-story>` タグ内に定義されます。

```html
<!doctype html>
<html ⚡>
  <head>
    <meta charset="utf-8">
    <title>Joy of Pets</title>
    <link rel="canonical" href="pets.html">
    <meta name="viewport" content="width=device-width">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-video"
        src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>
    <script async custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <style amp-custom>
    ...
    </style>
  </head>
  <body>
    <!-- Cover page -->
    <amp-story standalone
        title="Joy of Pets"
        publisher="AMP tutorials"
        publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
        poster-portrait-src="assets/cover.jpg">
      <amp-story-page id="cover">
        <amp-story-grid-layer template="fill">
          <amp-img src="assets/cover.jpg"
              width="720" height="1280"
              layout="responsive">
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
          <amp-img src="assets/cat.jpg"
              width="720" height="1280"
              layout="responsive">
          </amp-img>
          <q>Dogs come when they're called. Cats take a message and get back to you. --Mary Bly</q>
        </amp-story-grid-layer>
      </amp-story-page>
      ...
    </amp-story>
  </body>
</html>
```

[「初めてのウェブストーリーを作成する」チュートリアル](../start/visual_story/?format=stories)に従い、[amp-story リファレンスドキュメントを参照](../../components/reference/amp-story/?format=stories)し、さらに学習しましょう。

## ピークパフォーマンスとユーザーエクスペリエンス

ユーザーは、ネットワークに接続しにくい地域や古いデバイスでウェブストーリーを表示している場合があります。これらのベストプラクティスに従って、そういったユーザーのエクスペリエンスが確保されるようにしましょう。

### 背景色

各ウェブストーリーページの背景色を指定します。背景色を使用すると、ユーザーの状況によって画像や動画アセットをダウンロードできない場合に適切なフォールバックとなります。ページが目的としている背景アセットの主要な色を表す色を選択するか、すべてのストーリーページに一貫したカラーテーマを使用します。可読性を得るために、背景色とテキストに必ず異なる色を指定してください。

ウェブストーリードキュメントの head に含まれる `<style amp-custom>` タグ内、または [`<amp-story-page>`](https://amp.dev/documentation/components/amp-story-page/?format=stories) コンポーネントにインラインで、ページの背景色を定義します。

### 要素をレイヤーで重ねる

システムヘッダーには、ミュートや共有アイコンなどのコントロールが含まれており、背景の画像や動画よりも高い Z-index に表示されます。これらのアイコンで、重要な情報が覆われていないことを確認してください。

### アスペクト比

ウェブストーリーアセットはアスペクト比 9:16 でデザインしてください。ページの高さと幅はブラウザによって異なり、デバイスは不可欠なコンテンツをページのエッジ近くに配置しないためです。

### ポスター画像

ポスター画像は、動画がダウンロードされている間にユーザーに表示されます。ポスター画像は、トランジションをスムーズに行えるように、動画を代表するイメージである必要があります。ポスター画像を追加するには、amp-video 要素に `poster` 属性を追加し、画像の場所にポイントします。

```
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

## 動画

すべての動画は、[amp-video](https://amp.dev/documentation/components/amp-video/?format=stories) コンポーネントを介して追加されます。

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

### 解像度と品質

動画をエンコーディングし、以下の推奨される最適化を得られるように品質を調整してください。

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

HLS セグメントを 10 秒未満の長さに維持するようにしてください。

### 形式とサイズ

最適なパフォーマンスを得るために、動画を 4MB 未満に維持してください。大規模な動画については、複数のページに分割することも検討します。

単一の動画形式しか提供できない場合は、MP4 を指定してください。可能であれば、HLS 動画を使用し、ブラウザの互換性を考慮して、MP4 をフォールバックとして指定します。動画コーデックには以下を使用します。

<table>
  <tr>
   <td>MP4、HLS、および DASH</td>
   <td>H.264</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>VP9</td>
  </tr>
</table>

### <source> または src の指定</source>

`<amp-video>` コンポーネント内に `<source>` 子要素を使用し、`src` 属性の代わりに動画のソースを指定します。`<source>` 要素を使用すると、動画の種類とバックアップ動画のソースを指定できます。MIME タイプの指定には、`type` 属性を使用します。HLS 動画には、`application/x-mpegurl` または `application/vnd.apple.mpegurl` を使用します。その他の動画には、`”video/mp4”` のように、`video/` MIME プレフィクスを使用してその動画形式を続けます。

```html
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">
  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
```

### 動画後の自動先送り

amp-story-page が公開する [`auto-advance-after`](https://amp.dev/documentation/components/amp-story-page/?format=stories#auto-advance-after-%5Boptional%5D) 属性は、ユーザーがタップせずにストーリーページを先に進めるかどうか、またいつ行うかということを指定します。動画の後に先送りにするには、属性を動画の ID にポイントします。

```html
<amp-story-page auto-advance-after="myvideo">
```

## デスクトップエクスペリエンス

ウェブストーリー形式は、[オプションのデスクトップエクスペリエンス](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/amp-story.md#landscape-orientation-and-full-bleed-desktop-experience-opt-in)をサポートしています。これにより、デスクトップエクスペリエンスは、デフォルトの 3 ポートレートパネルエクスペリエンスから没入型のフルブリードモードに変わり、モバイルユーザーがデバイスを横向きにしたときに表示できるようになります。

`supports-landscape` 属性を `<amp-story>` コンポーネントに追加すると、デスクトップサポートにオプトインします。

```html
<amp-story standalone
    supports-landscape
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/icon.svg"
    poster-portrait-src="assets/cover.jpg">
</amp-story>
```
