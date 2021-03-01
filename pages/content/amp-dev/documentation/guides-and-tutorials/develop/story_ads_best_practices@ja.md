---
'$title': Web ストーリー広告を作成するためのベストプラクティス
$order: 16
description: Web ストーリーは、読者にコンテンツへの没入感を与える、タップ可能な全画面エクスペリエンスです。Web ストーリーに表示される広告には、Web ストーリー UX を備えた一貫性のあるデザインが必要です。
formats:
  - 広告
  - ストーリー
---

Web ストーリーは、読者にコンテンツへの没入感を与える、タップ可能な全画面エクスペリエンスです。Web ストーリーに表示される広告には、Web ストーリー UX を備えた一貫性のあるデザインが必要であり、こうすることで、ユーザーエクスペリエンスが中断された、ユーザーに不快感を与えたりすることはありません。このガイドでは、Web ストーリー用の広告を構築する方法を説明します。

## Web ストーリー広告の原則

バナーやボックスといった現在の広告形態は、AMP ストーリー形式とうまく統合しません。従来型の広告は読み込みと実行に時間がかかり、割り込み型で、ストーリーエクスペリエンスとは場違いの感覚を生じてしまうからです。

Web ストーリー広告は、次の原則に従っています。

- 有効な AMPHTML 広告: 従来の [AMPHTML 広告](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/amp-a4a-format.md)と同じ技術仕様に従う。
- 視覚優先: 魅力的で迫力のある、コンテキスト主導型の招待ステート。
- ネイティブ: 広告ページの寸法はオーガニックストーリーページと同じである。
- 同一のインタラクションモデル: ユーザーは、オーガニックストーリーページと同じように次の画面に進むことができる。
- 高速: 広告が読み込み途中の状態で表示されることがない。

上記の原則との一貫性を得るため、Web ストーリーランタイムは Web ストーリーの途中に最適な広告ページのプレースメントを判断します。広告プレースメントの仕組みについては、「[Web ストーリーでの広告表示](advertise_amp_stories.md)」をお読みください。

## Web ストーリー広告の例

Web ストーリー広告は AMPHTML 広告ですが、必要なメタタグデータを持ち、定義されたレイアウト仕様と必要な UI 要素の要件を満たしています。Web ストーリー広告には、ページの上部に必ずコールトゥアクション（CTA）ボタンとテキスト形式の免責事項として表示される広告ラベルが含まれます。

{{ image('/static/img/docs/stampads/stamp_ad.png', 425, 800, layout='intrinsic', alt='Example of an AMP Story ad', caption='Example of an AMP Story ad', align='' ) }}

ユーザーエクスペリエンスの一貫性を維持するために、Web ストーリーランタイムは、広告ラベルと CTA ボタンをレンダリングする必要があります。

[tip type="important"] **重要 –** Web ストーリーでは CTA ボタンのみがクリック可能であるため、クリエイティブを作成する際は、このことに注意してください。 [/tip]

## メタタグデータ

メタタグデータは、広告が Web ストーリー形式を満たすことを示すほか、CTA ボタンテキストの列挙の設定や、ユーザーの移動先とページの種類の指示を行うデータです。

[sourcecode:html]

<html amp4ads>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">

    <!-- Specifies where the user is directed -->
    <meta name="amp-cta-url" content="%%CLICK_URL_UNESC%%%%DEST_URL%%">

    <!-- Specifies the call to action button text enum -->
    <meta name="amp-cta-type" content="EXPLORE">

    <!-- Specifies what type of landing page the user is direct to -->
    <meta name="amp-cta-landing-page-type" content="NONAMP">

    <style amp4ads-boilerplate>body{visibility:hidden}</style>
    <style amp-custom>
     amp-img {height: 100vh}
    </style>
    <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>

  </head>
  <body>
    <amp-img src=%%FILE:JPG1%% layout="responsive" height="1280" width="720"></amp-img>
  </body>
</html>
[/sourcecode]

[利用可能な CTA ボタンのテキストのオプション](#call-to-action-button-text-enum) から <code>amp-cta-type tag</code> を選択することをお勧めします。事前定義済みのオプションは、必要に応じて AMP で自動的にローカライズされます。

Custom text is allowed, but you will need to implement your own localization.

## コールトゥアクションボタンのテキスト列挙<a name="call-to-action-button-text-enum"></a>

The call to action button can be configured from a predefined set of choices:

- `APPLY_NOW`: "Apply Now"（今すぐ申し込む）
- `BOOK_NOW`: "Book"（予約）
- `BUY_TICKETS`: "Buy Tickets"（チケットを買う）
- `DOWNLOAD`: "Download"（ダウンロード）
- `EXPLORE`: "Explore Now"（今すぐ探索）
- `GET_NOW`: "Get Now"（今すぐ入手）
- `INSTALL`: "Install Now"（今すぐインストール）
- `LISTEN`: "Listen Now"（今すぐ聞く）
- `MORE`: "More"（さらに）
- `OPEN_APP`: "Open App"（アプリを開く）
- `ORDER_NOW`: "Order Now"（今すぐ注文）
- `PLAY`: "Play"（プレイ）
- `READ`: "Read Now"（今すぐ読む）
- `SHOP`: "Shop Now"（今すぐ購入）
- `SHOWTIMES`: "Showtimes"（上映時間）
- `SIGN_UP`: "Sign Up"（サインアップ）
- `SUBSCRIBE`: "Subscribe Now"（今すぐ購読）
- `USE_APP`: "Use App"（アプリを使用）
- `VIEW`: "View"（表示）
- `WATCH`: "Watch"（見る）
- `WATCH_EPISODE`: "Watch Episode"（エピソードを見る）

[tip type="note"] **注意 –** アプリへのディープリンクはサポートされていませんが、App Store ページや Google Play ストアページへのリンクは、http/https でサポートされています。CTA ボタンのテキスト列挙は、広告のレスポンスのペイロードで指定されます。[/tip]

新しい CTA ボタンのテキスト列挙のサポートが必要な場合は、[GitHub 課題](https://github.com/ampproject/amphtml/issues/new) を提出してください。

## 広告ランディングページ

Web ストーリー広告のランディングページには、以下の 3 つのオプションを指定できます。

- `STORY`: ランディングページは [スポンサーストーリー](story_ads_best_practices.md#sponsored-story)です。
- `AMP`: ランディングページは有効な AMP ページです。
- `NONAMP`: その他のウェブページ。

## レイアウト

AMP ストーリーは水平型全画面です。ストーリー広告はこの形式を満たして一貫したユーザーエクスペリエンスを提供する必要があります。

## オーバーレイのサイズ

広告ラベルは、暗いグラデーションバーを広告の全幅にオーバーレイ表示し、縦の長さは上部から 46 px 下までとします。

{{ image('/static/img/docs/stampads/ad_overlay.png', 515, 520, layout='intrinsic', alt='Demonstration of ad overlay', caption='The ad overlay sits at the top', align='' ) }}

CTA は、下から 32 px に配置され、水平方向中央に整列されます。サイズは 120 px x 36 px です。

{{ image('/static/img/docs/stampads/cta_button.png', 515, 520, layout='intrinsic', alt='Demonstration of the CTA Button', caption='The CTA Button sits near the bottom', align='' ) }}

## 画像と動画

AMP ストーリー広告に含まれる画像と動画は、4:3 の標準的な全画面である必要があります。動画を含む広告には[ポスター画像](../../../documentation/components/reference/amp-video.md#poster)が必要です。ポスター画像の推奨サイズは 720p（幅 720 x 高さ 1280）です。

[sourcecode:html]
<amp-video controls
  width="720"
  height="1280"
  layout="responsive"
  poster="images/kitten-playing.png">

  <source src="videos/kitten-playing.webm"
    type="video/webm" />
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
[/sourcecode]

### 画像

背景画像は全画面に拡大できます。以下の CSS は、動画と画像をトリムして中央揃えにしています。

[sourcecode:html]

<style amp-custom>
    amp-img, amp-video {
        height: 100vh;
    }
    amp-video video {
        object-fit: cover;
    }
    amp-img img{
        object-fit: cover;
    }
</style>

[/sourcecode]

### 動画

#### `<source>` と `src` の指定

1 つの [`amp-video`](../../../documentation/components/reference/amp-video.md) のソースを指定する場合

例: 複数のソースファイルを指定する

[sourcecode:html]
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">

  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
[/sourcecode]

#### 動画のサイズと長さ

最適なパフォーマンスを得るには、4 MB 以下の動画を提供するようにします。ファイルサイズが小さいほど、ダウンロードの速度が高くなるため、できるだけ小さくするようにしてください。

#### 動画の形式

指定できる動画形式が 1 つだけであれば、**MP4** を指定するようにします。ただし、可能であれば、**HLS** 動画を使用して、HLS 動画をサポートしていないブラウザのフォールバックとして MP4 を指定します。HLS はアダプティブビットレートストリーミングを実行するため、ユーザーのネットワーク接続に最適な品質に動画を変更することができます。

[tip type="note"] **注意 –** HLS 動画形式は Chrome for Desktop ブラウザでサポートされていません（エミュレーション経由も不可）。そのため、ページへのデスクトップトラフィックには MP4 フォールバックが必要です。HLS 動画のデバッグには、USB デバッグモードによって実際のモバイルデバイスを使用する必要があります。[/tip]

#### 動画の解像度

Web ストーリー動画は常に縦方向表示（ポートレートビュー）で、期待アスペクト比は 16:9 です。動画ストリーミングタイプに合った、以下の推奨解像度を使用してください。

<table>
  <thead>
    <tr>
     <th>動画ストリーミングタイプ</th>
     <th>解像度</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>非アダプティブ</td>
     <td>720 x 1280 px</td>
    </tr>
    <tr>
     <td>アダプティブ</td>
     <td>720 x 1280 px<br>540 x 960 px<br>360 x 480 px</td>
    </tr>
  </tbody>
</table>

[tip type="note"] **注意 –** アスペクト比が 16:9 でないモバイルデバイスについては、ビューポートにフィットするように、動画が水平または縦方向にトリムされる可能性があります。 [/tip]

#### 動画コーデック

1. MP4: `H.264`
2. WEBM: `VP9`
3. HLS または DASH: `H.264`

#### 動画の品質

##### トランスコードの最適化

動画のエンコーディングとエンコード中の品質の調整に使用できるツールには多種あります。その一部を以下に紹介します。

<table>
  <thead>
    <tr>
     <th>ツール</th>
     <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><a href="https://www.ffmpeg.org/about.html">FFmpeg</a></td>
     <td>推奨される最適化:       <ul>         <li>MP4: <code>-crf 23</code>
</li>         <li>WEBM: <code>-b:v 1M</code>
</li>       </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://libav.org/avconv.html">avconv</a></td>
     <td>推奨される最適化:       <ul>         <li>MP4: <code>-crf 23</code>
</li>         <li>WEBM: <code>-b:v 1M</code>
</li>       </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://github.com/google/shaka-packager">Shaka Packager</a></td>
     <td>プレイリストとともに HLS 形式を出力することもできるエンコーダ。</td>
    </tr>
  </tbody>
</table>

##### HLS のセグメントサイズ

HLS セグメントのサイズが、通常、10 秒以下の長さであることを確認してください。

## アニメーション

アニメーションには、「可視性」の概念など、いくつかの注意事項があります。たとえば、「3 パネル」デスクトップビューでは、ページにクリエイティブが表示されても、センターフォーカスではない場合があります。ページがメインのフォーカスポイントになる場合にアニメーションを開始する効果を期待している場合には、これは問題です。

AMP ではこれを回避する上で役立てられるように、クリエイティブがすべての配信コンテキストのフォーカスポイントになる場合に、ボディに `amp-story-visible` という特別な属性を追加します。この合図をもとに、アニメーションを開始するようにすることをお勧めします。

例: このアニメーションは、ページがフォーカスされると開始し、ユーザーがストーリー内の別のページをクリックしてから戻ってくると再開します。

[sourcecode:html]

<style amp-custom>
    body[amp-story-visible] .my-animation-class {
      animation: 2s my-animation-name;
    }
</style>

[/sourcecode]

## スポンサーストーリー <a name="sponsored-story"></a>

スポンサーストーリーは、ウェブ上の URL として存在し、AMP ストーリー広告のコールトゥアクションボタンからスポンサーストーリーへのユーザートラフィックを促進することができます。スポンサーストーリーは AMP ストーリーですが、没入型の拡張広告エクスペリエンスに焦点が当てられています。

{{ image('/static/img/docs/stampads/sponsored_story_full.png', 1600, 900, layout='intrinsic', alt='CTA button directs to a Sponsored Story', caption='CTA button directs to a Sponsored Story', align='' ) }}

[Web ストーリーの作成については、こちら](../start/create_successful_stories.md)を参照してください。
