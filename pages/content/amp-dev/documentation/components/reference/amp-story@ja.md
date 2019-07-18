---
$category@: presentation
formats:
- websites
teaser:
  テキスト: 訴求力のあるビジュアルを使ったストーリーテリングを提供します。
---

<!--
       Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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
    <td width="40%"><strong>説明</strong></td>
    <td>訴求力のあるビジュアルを使ったストーリーテリングを提供します。</td>
  </tr>
  <tr>
    <td width="40%"><strong>提供状況</strong></td>
    <td><div><a href="https://www.ampproject.org/docs/reference/experimental.html">試験運用版</a></div></td>
  </tr>
  <tr>
    <td width="40%"><strong>必要なスクリプト</strong></td>
    <td><code>&lt;script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">サポートされるレイアウト</a></strong></td>
    <td>なし</td>
  </tr>
  <tr>
    <td width="40%"><strong>例</strong></td>
    <td><ul>
      <li>AMP By Example の <a href="https://ampbyexample.com/stories/introduction/amp_story_hello_world/">Hello World</a> のサンプルをご覧ください。</li>
      <li><a href="https://www.ampproject.org/docs/tutorials/visual_story">ビジュアルに訴える AMP ストーリーを作成する</a>方法についてのチュートリアルをご覧ください。</li>
    </ul></td>
  </tr>
</table>

[tip type="caution"] このコンポーネントは試験運用版であり、現在開発中です。問題がある場合は、[GitHub で報告](https://github.com/ampproject/amphtml/issues/new)してください。
[/tip]

## バージョンのメモ

| バージョン | 説明 |
|-------|----------------------------------------------------------------------|
| 1.0     | 現在のバージョン（2018 年 7 月 16 日以降）。 |
| 0.1     | 初期実装。サポートは終了しており、2019 年 3 月 19 日に削除される予定です。 |

## 0.1 から 1.0 への移行

2018 年 7 月 16 日の時点でバージョン 0.1 はサポート終了扱いとなっており、2019 年 3 月 19 日に削除される予定です。これに伴い、互換性を破るマイナー変更が発生する可能性があります（ストーリーが自動的にバージョン 1.0 を使用するようにアップグレードされるため）。この日より前にページを手動でバージョン 1.0 に移行することをおすすめします。ページが正常に機能し、表示されることを確認してください。

### 新しいブックエンド機能

AMP ストーリーのブックエンドに新機能が追加されました。この機能により、コンポーネントのサポートが強化され、より高度なビジュアル レイアウトが可能になります。変更の一部は次のとおりです。

* 共有プロバイダが JSON 設定に従って並べ替えられます。
    * 新しいブックエンド コンポーネントには次のものがあります。<li>行動を促すフレーズのリンク
    * テキスト ボックス
    * 縦向きと横向きのカード</li>

これらの新機能を使用するには、以下のように必須の属性を指定して、`<amp-story-bookend>` タグを `<amp-story>` の最後の子として追加します。

```html
<amp-story standalone>
  <amp-story-page id="cover">
    ...
  </amp-story-page>
  <!-- `src` and `layout=nodisplay` are required. -->
  <amp-story-bookend src="bookendv1.json" layout="nodisplay">
  </amp-story-bookend>
<amp-story>
```

新しいコンポーネントの詳細と、JSON 設定でそれらのコンポーネントを指定する方法については、[amp-story-bookend](#bookend-amp-story-bookend) をご覧ください。

### 新しいメタデータの要件

新しいメタデータ属性が `<amp-story>` 要素に追加されました。これらのメタデータ属性は、AMP ストーリーのエコシステム全体でストーリーのプレビュー表示に使用されます。たとえば、これらの属性を使用して、関連記事のブックエンドに魅力的なプレビュー リンクをレンダリングできます。また、これらの属性を指定することで、ストーリーが将来にわたって AMP ストーリーに埋め込まれているリッチなエクスペリエンスで表示されるようになります。

```html
<!--</code>title<code>,</code>publisher<code>,</code>publisher-logo-src<code>and</code>poster-portrait-src` will soon be required. -->
<amp-story title="My Story" standalone="" publisher="The AMP Team" publisher-logo-src="https://example.com/logo/1x1.png" poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"></amp-story></p>

<!-- <code>poster-square-src</code> and <code>poster-landscape-src</code> are optional, but strongly recommended. -->
<amp-story title="My Story" standalone="" publisher="The AMP Team" publisher-logo-src="https://example.com/logo/1x1.png" poster-portrait-src="https://example.com/my-story/poster/3x4.jpg" poster-square-src="https://example.com/my-story/poster/1x1.jpg" poster-landscape-src="https://example.com/my-story/poster/4x3.jpg">
```

これらのメタデータ属性はページ上の構造化データ（JSON-LD など）を補うものであり、それらに代わるものではありません。それでも、AMP ストーリーを含むすべての AMP ページに[構造化データ](https://developers.google.com/search/docs/data-types/article#amp-sd)を追加することをおすすめします。

新しい属性:

| 属性 | 説明 |
|--|--|
| `title` [必須] | ストーリーのタイトル。 |
| `publisher` [必須] | ストーリーのサイト運営者の名前。 |
| `publisher-logo-src` [必須] | スクエア フォーマットのサイト運営者のロゴ（アスペクト比 1x1）。 |
| `poster-portrait-src` [必須] | 縦向きのストーリー ポスター（アスペクト比 3x4）。 |
| `poster-square-src` | スクエア フォーマットのストーリー ポスター（アスペクト比 1x1）。 |
| `poster-landscape-src` | 横向きのストーリー ポスター（アスペクト比 4x3）。 |

#### `publisher-logo-src` のガイドライン

サイト運営者のロゴの画像には以下のガイドラインが適用されます。

* ファイルはラスター ファイル（`.jpg`、`.png`、`.gif` など）である必要があります。ベクター ファイル（`.svg` や `.eps` など）は使用しないでください。
* アニメーション画像（GIF アニメーションなど）は使用しないでください。
* ロゴのグラフィック部分を背景色に対して見やすくする必要があります。

<table>
  <tr>
    <td>
      <amp-img alt="白い背景に青いテキストのロゴ" width="107" height="112" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-1.png" layout="fixed">
        <noscript>
          <img alt="白い背景に青いテキストのロゴ" src="img/publisher-logo-1.png">
        </noscript>
      </amp-img>
      OK
    </td>
    <td>
      <amp-img alt="青い背景に白いテキストのロゴ" width="107" height="101" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-2.png" layout="fixed">
        <noscript>
          <img alt="青い背景に白いテキストのロゴ" src="img/publisher-logo-2.png">
        </noscript>
      </amp-img>
      OK
    </td>
    <td>
      <amp-img alt="青い背景に青いテキストのロゴ" width="103" height="102" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-3.png" layout="fixed">
        <noscript>
          <img alt="青い背景に青いテキストのロゴ" src="img/publisher-logo-3.png">
        </noscript>
      </amp-img>
      NG
    </td>
  </tr>
</table>

* ロゴの形状は長方形ではなく、正方形にする必要があります。
* 背景色を透明にしないでください。
* ブランドごとに 1 つのロゴのみを使用し、AMP ストーリー全体で統一してください。
* ロゴは 96x96 ピクセル以上にする必要があります。

#### ポスターのガイドライン（`poster-portrait-src`、`poster-landscape-src`、`poster-square-src`）

ストーリー ポスターの画像には以下のガイドラインが適用されます。

* ポスター画像は AMP ストーリー全体を表すものにする必要があります。
* ユーザーが AMP ストーリーを開始したときに、ポスター画像が表示されるようにします。ただし、メタデータで使用する画像ファイルの URL は、ストーリーの最初のページで使用する URL と正確に一致する必要はありません。メタデータで使用する URL には、プレビュー用のサイズ設定、切り抜き、軽微なスタイル変更を含めることができます。
* ポスター画像はラスター ファイル（`.jpg`、`.png`、`.gif` など）である必要があります。ベクター ファイル（`.svg` や `.eps` など）は使用しないでください。
* ポスター画像のアスペクト比は、縦向きの場合は 3x4、横向きの場合は 4x3、正方形の場合は 1x1 にします。
* ポスター画像を動画のフレームから作成する場合、サムネイルには動画の代表的なフレームを使用する必要があります。たとえば、動画の最初のフレームは代表的なフレームでないことがほとんどです。
    * 各ポスター画像は、以下の推奨最小サイズ以上にする必要があります。<li>縦向き: 696 ピクセル x 928 ピクセル
    * 横向き: 928 ピクセル x 696 ピクセル
    * 正方形: 928 ピクセル x 928 ピクセル</li>

## 概要

`amp-story` 拡張機能には、ストーリー展開に組み込むことができるビジュアル コンテンツを表示するための新しい形式が用意されています。AMP ストーリーでは、視覚的表現の豊かなわかりやすい情報やコンテンツをユーザーに提供できます。

<figure class="centered-fig">
  <amp-anim width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
    <noscript>
      <img alt="AMP ストーリーの例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
    </noscript>
  </amp-anim>
</figure>

## AMP ストーリーの形式

[AMP ストーリー](#story%3a-amp-story)は、複数の[ページ](#pages%3a-amp-story-page)で構成された、完全な AMP HTML ドキュメントです。ページは複数の[レイヤ](#layers%3a-amp-story-grid-layer)で構成され、レイヤは AMP と HTML の要素（メディア、アナリティクス、テキストなど）で構成されます。

<amp-img alt="AMP ストーリーのタグ階層" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="AMP ストーリーのタグ階層" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png">
    </noscript>
  </amp-img>

### ボイラープレート

まずは以下のマークアップから見ていきましょう。これは、今後のボイラープレートとしても利用できます。これをコピーし、`.html` 拡張子のファイルとして保存してください。

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

この例では、body 内のコンテンツによって 2 ページのストーリーが作成されます。各ページの画面全体に背景画像が表示され、その上に簡単な文字列が表示されます。

### amp-story に必要なマークアップ

AMP ストーリーの HTML 形式は、[有効な AMP HTML ドキュメントと同じマークアップ要件](https://www.ampproject.org/docs/reference/spec#required-markup)と以下の追加要件に準拠します。

| ルール | 説明 |
|----|---|
| `<amp-story standalone>` 要素は `<body>` の唯一の子要素です。 | ドキュメントが AMP ストーリーであることを示します。 |
| `<head>` タグの 3 番目の子として `<script async src="https://cdn.ampproject.org/v0/amp-story-1.0.js" custom-element="amp-story"></script>` タグを含めます。 | amp-story JS ライブラリを含めて読み込みます。 |
| `<head>` タグ内に `<link rel="canonical" href="$STORY_URL">` タグを含めます。 | リンクはストーリー自体を指し、ストーリーを正規ドキュメントとして指定します。 |

## ストーリー: `amp-story`

`amp-story` コンポーネントはストーリー全体を表します。コンポーネント自体が UI シェル（ジェスチャーやナビゲーションの処理、アプリケーション シェル UI（コントロール、進行状況バーなど）の挿入を含む）を実行します。

<figure class="centered-fig">
  <amp-anim alt="amp-story の例" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
    <noscript>
      <img alt="amp-story の例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
      </noscript>
    </amp-anim>
  </figure>

### 例

```html
<amp-story
    standalone
    title="My Story"
    publisher="The AMP Team"
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

##### standalone [必須]

AMP ドキュメントがストーリーであることを示します。

##### title [必須]

ストーリーのタイトル。

##### publisher [必須]

ストーリーのサイト運営者の名前。

##### publisher-logo-src [必須]

ストーリーで使用するスクエア フォーマットのサイト運営者のロゴ（アスペクト比 1x1）の URL。例: `publisher-logo-src="https://example.com/logo/1x1.png"`（1x1.png は 36x36 ピクセルのロゴです）。

##### poster-portrait-src [必須]

縦向きの[ストーリー ポスター](#posters)（アスペクト比 3x4）の URL。

##### supports-landscape [オプション]

モバイル デバイスでの横向き表示、パソコンでの横向きの全画面表示に対応できるようにします。

##### background-audio [オプション]

ストーリー全体で再生される音声ファイルの URL。

##### poster-square-src [オプション]

スクエア フォーマットの[ストーリー ポスター](#posters)（アスペクト比 1x1）の URL。

##### poster-landscape-src [オプション]

横向きの[ストーリー ポスター](#posters)（アスペクト比 4x3）の URL。

### ポスター

「ポスター」は、ストーリーの読み込みが終わるまでの間に UI に表示される画像です。ポスターにはストーリーの最初の画面を使用するのが一般的ですが、ストーリーを代表する任意の画像を使用することもできます。

### （amp-story の）子

`<amp-story>` コンポーネントは 1 つ以上の [`<amp-story-page>`](#pages%3a-amp-story-page) コンポーネントで構成され、<amp-story-page> はストーリーの個々の画面で構成されます。ドキュメントの順序で 1 番目に指定したページが、ストーリーで最初に表示されるページになります。

### 横向き表示とパソコンでの全画面表示の有効化

`<amp-story>` 要素で `supports-landscape` 属性が指定されている場合、次のようになります。

* モバイル デバイスが横向きでもストーリーを表示できます。
* パソコンでの表示を、デフォルトの 3 つの縦向きパネルで表示する代わりに、臨場感あふれる全画面モードに変更できます。

使用方法: `<amp-story ... supports-landscape>...</amp-story>`

<figure class="centered-fig">
  <span class="special-char">変更前:</span>
  <amp-anim alt="パソコンでの 3 つのパネルの表示" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif" width="400" layout="flex-item">
    <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif"></noscript>
  </amp-anim>
  <span class="special-char">変更後:</span>
  <amp-anim alt="パソコンでの全画面表示" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif" width="400" layout="flex-item">
    <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif"></noscript>
  </amp-anim>
</figure>

## ページ: `amp-story-page`

`<amp-story-page>` コンポーネントは、ストーリーの 1 つのページに表示するコンテンツを表します。

<figure class="centered-fig">
  <amp-anim alt="ページ 1 の例" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif" layout="fixed">
    <noscript>
      <img alt="ページ 1 の例" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif">
      </noscript>
    </amp-anim>
  </figure>
  <figure class="centered-fig">
    <amp-anim alt="ページ 2 の例" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif" layout="fixed">
      <noscript>
        <img alt="ページ 2 の例" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif">
        </noscript>
      </amp-anim>
    </figure>

### 例

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-video layout="fill" src="background.mp4" poster="background.png" muted autoplay></amp-video>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical">
    <h1>These are the Top 5 World's Most...</h1>
    <p>Jon Bersch</p>
    <p>May 18</p>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="thirds">
    <amp-img grid-area="bottom-third" src="a-logo.svg" width="64" height="64"></amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

### 属性

##### id [必須]

ページの一意の識別子。CSS においてページとその子孫のスタイル設定に使用できるほか、URL フラグメントでページを一意に指定する際にも使用されます。

##### auto-advance-after [オプション]

次のページに自動的に進むタイミングを指定します。省略すると、ページが自動的に進まなくなります。`auto-advance-after` の値には、次のいずれかを指定する必要があります。

* 次のページに自動的に進むまでに待機する[時間](https://developer.mozilla.org/en-US/docs/Web/CSS/time)（正の値）
* [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) または video-interface 動画の ID（再生が終了すると、自動的に次のページに進みます）

例:

```html
<amp-story-page id="tokyo" auto-advance-after="1s">
```

##### background-audio [オプション]

このページが表示されているときに再生される音声ファイルの URI。

例:

```html
<amp-story-page id="zurich" background-audio="./media/switzerland.mp3">
```

### （amp-story-page の）子

`<amp-story-page>` コンポーネントは 1 つ以上の[レイヤ](#layers)で構成されます。レイヤは下から上にスタックされます（DOM で最初に指定されたレイヤが一番下に、DOM で最後に指定されたレイヤが一番上になります）。

## レイヤ

レイヤを積み重ねることで、目的の視覚効果を生み出すことができます。

### `amp-story-grid-layer`

`<amp-story-grid-layer>` コンポーネントはその子をグリッド状に配置します。その実装は、[CSS グリッド仕様](https://www.w3.org/TR/css-grid-1/)に基づきます。

<div class="flex-images">
  <amp-img alt="レイヤ 1" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif" width="200" height="355" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif"></noscript>
  </amp-img>
  <span class="special-char">+</span>
  <amp-img alt="レイヤ 2" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg"></noscript></amp-img>
  <span class="special-char">+</span>
  <amp-img alt="レイヤ 3" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg"></noscript></amp-img>
  <span class="special-char">=</span>
  <amp-img alt="すべてのレイヤ" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif"></noscript></amp-img>
</div>

#### 属性

##### template [必須]

`template` 属性はグリッドレイヤのレイアウトを決定します。以下の[テンプレート](#templates)で、使用可能なテンプレートについて説明します。

##### grid-area [オプション]

この属性は `<amp-story-grid-layer>` の子で指定されます。`grid-area` では、この属性を含む要素が表示される名前付き領域を（子を定義する `template` を使用して）指定します。

例:

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">Element 1</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>
```

#### テンプレート

グリッドレイヤのレイアウト用に指定できるテンプレートを以下に示します。

[tip type="success"] 使用中のレイアウト テンプレートを確認する場合は、[AMP By Example のレイアウトのデモ](https://ampbyexample.com/stories/features/layouts/)をご覧ください。
[/tip]

##### fill

`fill` テンプレートはその 1 番目の子を全画面表示します。他の子は表示されません。

名前付き領域: （なし）

例:

<amp-img alt="fill テンプレートの例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="horizontal テンプレートの例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="fill">
  <amp-img src="cat.jpg"></amp-img>
</amp-story-grid-layer>
```

##### vertical

`vertical` テンプレートはその要素を Y 軸に沿って配置します。デフォルトでは、その要素が画面の上端から順番に並べられ、X 軸に沿って画面の最下部まで表示されます。

名前付き領域: （なし）

<amp-img alt="vertical テンプレートの例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="horizontal テンプレートの例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="vertical">
  <p>Element 1</p>
  <p>Element 2</p>
  <p>Element 3</p>
</amp-story-grid-layer>
```

##### horizontal

`horizontal` テンプレートはその要素を X 軸に沿って配置します。デフォルトでは、その要素が画面の左端から順番に並べられ、Y 軸に沿って画面の右端まで表示されます。

名前付き領域: （なし）

<amp-img alt="horizontal テンプレートの例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="horizontal テンプレートの例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="horizontal">
  <p>Element 1</p>
  <p>Element 2</p>
  <p>Element 3</p>
</amp-story-grid-layer>
```

##### thirds

`thirds` テンプレートを使用すると、画面を水平方向に三等分し、それぞれの領域にコンテンツを割り当てることができます。

名前付き領域:

* `upper-third`
* `middle-third`
* `lower-third`

<amp-img alt="horizontal テンプレートの例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="thirds テンプレートの例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">Element 1</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>
```

#### 子

`amp-story-grid-layer` には次のいずれかの要素を含めることができます。

**注**: 以下のリストは徐々に拡張される予定です。

<table>
  <tr>
    <th width="40%">分野</th><th>使用可能なタグ</th>
  </tr>
  <tr>
    <td>メディア</td>
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
    <td>アナリティクスと測定</td>
    <td>
      <ul>
        <li><code>&lt;amp-analytics></code></li>
        <li><code>&lt;amp-experiment></code></li>
        <li><code>&lt;amp-pixel></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>セクション</td>
    <td>
      <ul>
        <li><code>&lt;address></code></li>
        <li><code>&lt;article></code></li>
        <li><code>&lt;aside></code></li>
        <li><code>&lt;footer></code></li>
        <li><code>&lt;h1>-<h6></code></li>
        <li><code>&lt;header></code></li>
        <li><code>&lt;hgroup></code></li>
        <li><code>&lt;nav></code></li>
        <li><code>&lt;section></code></li>
        <li><code>&lt;amp-story-cta-layer></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>テキスト</td>
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
    <td>リスト</td>
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
    <td>表</td>
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
    <td>その他</td>
    <td>
      <ul>
        <li><code>&lt;amp-install-serviceworker></code></li>
        <li><code>&lt;noscript></code></li>
      </ul>
    </td>
  </tr>
</table>

### `amp-story-cta-layer`

`<amp-story-cta-layer>` コンポーネントでは、`<amp-story-page>` 内で `<a>` 要素と `<button>` 要素を使用できます。

#### 制限

* 指定する場合、`<amp-story-cta-layer>` 要素を `<amp-story-page>` 内の最後のレイヤにする必要があります。これにより、正確に 1 個または 0 個の `<amp-story-cta-layer>` 要素をすべての `<amp-story-page>` に効果的に設定することができます。
* このレイヤの位置とサイズは制御できません。常にページの 100% の幅、ページの 20% の高さに設定され、ページの下端に揃えて配置されます。

#### 例

```html
<amp-story-page id="vertical-template-thirds">
  <amp-story-grid-layer template="thirds">
    <div class="content" grid-area="upper-third">Paragraph 1</div>
    <div class="content" grid-area="middle-third">Paragraph 2</div>
    <div class="content" grid-area="lower-third">Paragraph 3</div>
  </amp-story-grid-layer>
  <amp-story-cta-layer>
    <a href="https://www.ampproject.org" class="button">Outlink here!</a>
  </amp-story-cta-layer>
</amp-story-page>
```

<amp-img alt="CTA レイヤ" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png" width="404" height="678" layout="fixed">
  <noscript>
    <img width="404" height="678" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png">
    </noscript>
  </amp-img>

  [サンプルコードの全文は examples ディレクトリにあります。](https://github.com/ampproject/amphtml/blob/master/examples/amp-story/cta-layer-outlink.html)

#### 子

`amp-story-cta-layer` では `amp-story-grid-layer` とほとんど同じ子孫を使用できるほか、`<a>` タグと `<button>` タグも使用できます。

サポートされている子の最新のリストは、検証ルールの [amp-story-cta-layer-allowed-descendants](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii) フィールドで確認できます。

## ページの添付ファイル

### `amp-story-page-attachment`

<amp-img alt="AMP ストーリー ページの添付ファイル" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif" width="240" height="480" layout="fixed">
  <noscript>
    <img alt="AMP ストーリー ページの添付ファイル" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif">
    </noscript>
  </amp-img>

  ストーリー ページに追加のコンテンツを添付できます。

  ストーリー ページの添付ファイルを使用すると、特定のページに AMPHTML コンテンツを追加できます。このコンテンツは、ユーザーが上にスワイプするか、行動を促すフレーズの要素をタップすることによって表示されます。添付ファイルを設定したすべてのページの一番下に、添付ファイルを開くための UI プロンプトが自動的に追加されます。

  `<amp-story-page-attachment>` 要素は `<amp-story-page>` の最後の子にする必要があり、また、`layout="nodisplay"` 属性を設定する必要があります。AMP ストーリーのこの `<amp-story-page-attachment>` タグ内で、添付ファイルの AMPHTML コンテンツのインライン指定が可能になる予定です。

### 使用可能なコンテンツとコンポーネント

ストーリー ページの添付ファイルでは、AMP ストーリーと同じ HTML 要素を、以下に示すその他のコンポーネント（サードパーティ製の動画プレーヤーやソーシャル メディアの埋め込みなど）とともに使用することができます。つまり、非常に冗長なコンテンツや、AMP ストーリー ページでは使用できないコンテンツを追加できます。

<details>
  <summary>ページの添付ファイルで使用可能な AMP コンポーネントのリスト</summary>

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

### 例

```html
<amp-story-page id="foo">
  <amp-story-grid-layer template="fill">
    <amp-img src="https://example.ampproject.org/helloworld/bg1.jpg" width="900" height="1600">
    </amp-story-grid-layer>
    <amp-story-page-attachment layout="nodisplay">
      <h1>My title</h1>
      <p>Lots of interesting text with <a href="https://example.ampproject.org">links</a>!</p>
      <p>More text and a YouTube video!</p>
      <amp-youtube
          data-videoid="b4Vhdr8jtx0"
          layout="responsive"
          width="480" height="270">
      </amp-youtube>
      <p>And a tweet!</p>
      <amp-twitter
          data-tweetid="885634330868850689"
          layout="responsive"
          width="480" height="270">
      </amp-twitter>
  </amp-story-page-attachment>
</amp-story-page>
```

## アニメーション

`<amp-story-page>` 内のすべての要素に開始アニメーションを含めることができます。

アニメーションを設定するには、要素に一連の[アニメーション属性](#animation-attributes)を指定します。AMP のその他の拡張機能や設定は必要ありません。

### アニメーション効果

以下のアニメーション効果を AMP ストーリーのプリセットとして使用できます。

| プリセット名 | デフォルトの期間（ミリ秒） | デフォルトの遅延（ミリ秒） |
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

[tip type="success"] AMP By Example で [AMP ストーリーのすべてのアニメーションのライブデモ](https://ampbyexample.com/stories/features/animations/)をご覧いただけます。
[/tip]

### アニメーションの属性

##### animate-in [必須]

この属性では、開始[アニメーションのプリセット](#animation-effects)の名前を指定します。

例**: ページの左から見出しがスライドインします。

```html

<h2 animate-in="fly-in-left">
  Fly from left!
</h2>

```

##### animate-in-duration [オプション]

この属性では、開始アニメーションの再生時間を秒またはミリ秒単位で指定します（0.2s、200ms など）。デフォルトの再生時間は、指定したアニメーション プリセットによって異なります。

例**: ページの左から見出しがスライドインします。アニメーションの再生は 0.5 秒以内に終了します。

```html

<h2 animate-in="fly-in-left" animate-in-duration="0.5s">
  Fly from left!
</h2>

```

##### animate-in-delay [オプション]

この属性では、アニメーションの再生を開始する前の遅延時間を指定します。0 以上の秒またはミリ秒単位の値を指定する必要があります（0.2s、200ms など）。デフォルトの遅延時間は、指定したアニメーション プリセットによって異なります。

例**: ページが表示されてから 0.4 秒後に見出しが左からスライドインを開始し、0.5 秒以内に完全にスライドインします。

```html

<h2 animate-in="fly-in-left" animate-in-duration="0.5s" animate-in-delay="0.4s">
  Fly from left!
</h2>

```

[tip type="note"] アニメーションの遅延時間の正確さは保証されません。最初のアニメーション要素がスキャンされたときにバックグラウンドで `amp-animation` 拡張機能を読み込むと、遅延が増大する可能性があります。属性コントラクトは、「このアニメーションを N ミリ秒以上遅延させる」のように定義されます。**これは、すべての要素（遅延時間が 0 秒の要素を含む）に適用されます。
[/tip]

##### animate-in-after [オプション]

アニメーションを連結または連続再生するには、この属性を使用します（animation1 が完了した後に animation2 を開始するなど）。この要素のアニメーションの次に再生するアニメーション要素の ID を指定します。この要素は同じ `<amp-story-page>` 上に存在する必要があります。遅延は前の要素のアニメーションが終了した後に適用されます。詳しくは、以下の[アニメーションの連続再生](#sequencing-animations)をご覧ください。

たとえば次のコードでは、`object1` のアニメーションの完了後に `object2` のアニメーションが再生されます。

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
      2. <!-- will start after object1 has finished -->
     </div>
    </amp-story-grid-layer>
 </amp-story-page>
```

##### scale-start、scale-end [オプション、`zoom-in` と `zoom-out` のアニメーションでのみ使用可]

この 2 つの属性で、拡大と縮小のアニメーションのパラメータを詳細に指定できます。0 以上の値を指定する必要があり、小数を指定することもできます。拡大のデフォルト値は scale-start: 1、scale-end: 3 で、縮小のデフォルト値はこの逆になります。

例**: 画像が 4 秒間で 2 倍から 5 倍に拡大します。

```html
<amp-img animate-in="zoom-in" scale-start="2" scale-end="5" animate-in-duration="4s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-x [オプション、`pan-left` と `pan-right` のアニメーションでのみ使用可]

この属性では、左または右にパンするアニメーションでの画像の水平パンを指定します。0 以上の値をピクセル数で指定する必要があります。デフォルト値では、指定した画像の幅の分だけパンされます。

例**: 画像が 10 秒間で左に 200 ピクセル分パンされます。

```html
<amp-img animate-in="pan-left" translate-x="200px" animate-in-duration="10s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-y [オプション、`pan-up` と `pan-down` のアニメーションでのみ使用可]

この属性では、上または下にパンするアニメーションでの画像の垂直パンを指定します。0 以上の値をピクセル数で指定する必要があります。デフォルト値では、指定した画像の高さの分だけパンされます。

例**: 画像が 15 秒間で下に 50 ピクセル分パンされます。

```html
<amp-img animate-in="pan-down" translate-y="50px" animate-in-duration="15s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

### アニメーションの連続再生

アニメーションを順番に連結するには、`animate-in-after` 属性を使用します。特定のチェーン内のすべての要素が同じ `<amp-story-page>` 内に存在する必要があります。`animate-in-after` 属性が指定されていない要素は連続するチェーンに属さないため、ページの表示時に個別に開始されます。

```html
<amp-story-page id="my-sequencing-page">
  <amp-story-grid-layer template="vertical">
    <div class="circle"
        animate-in="drop-in"
        animate-in-duration="1.8s">
        1. <!-- will start independently -->
    </div>
    <div id="rotate-in-left-obj"
        class="square"
        animate-in="rotate-in-left"
        animate-in-after="fade-in-obj"
        animate-in-delay="0.2s">
        2. <!-- will start after fade-in-obj has finished -->
    </div>
    <div class="square"
        animate-in-after="rotate-in-left-obj"
        animate-in="whoosh-in-right"
        animate-in-delay="0.2s">
        3. <!-- will start after rotate-in-left-obj has finished -->
    </div>
    <div id="fade-in-obj"
        class="circle"
        animate-in="fade-in"
        animate-in-duration="2.2s">
        1. <!-- will start independently -->
    </div>
  </amp-story-grid-layer>
</amp-story-page>
```

### 複数のアニメーションの結合

1 つの要素に複数の開始アニメーションを適用することができます（たとえば、1 つの要素をページにスライドインするのと同時にフェードインすることができます）。複数のアニメーション プリセットを 1 つの要素に割り当てることはできませんが、複数の開始アニメーションが設定されている要素をネストして 1 つにまとめることは可能です。

```html

<div animate-in="fly-in-left">
  <div animate-in="fade-in">
    I will fly-in and fade-in!
  </div>
</div>

```

[tip type="note"] 作成したアニメーションが別の要素のアニメーションの終了後に開始することになっている場合は、アニメーションを構成するすべてのネストされた要素の属性 `animate-in-after` に同じ `id` が設定されるようにしてください。
[/tip]

## ブックエンド: `amp-story-bookend`

`amp-story-bookend` はストーリーの最後の画面です。この画面には、関連リンク、共有オプション、行動を促すフレーズのリンクなどが含まれます。

<figure class="centered-fig">
  <amp-anim alt="関連記事の例" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif" layout="fixed">
    <noscript>
      <img alt="関連記事の例" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif">
    </noscript>
  </amp-anim>
</figure>

ブックエンドを使用するには、`<amp-story>` の子として `<amp-story-bookend>` タグを含め、必須の属性 `layout=nodisplay` を指定します。さらに、別のファイルで JSON 設定を指定すると、`src` 属性を介してインポートしたり、インラインに配置したりできます。

`src` 属性を使用した JSON 設定のインポート:

```html
<amp-story standalone>
  <amp-story-page id="cover">
    ...
  </amp-story-page>
  <!-- `layout=nodisplay` is required. -->
  <amp-story-bookend src="bookendv1.json" layout=nodisplay>
  </amp-story-bookend>
<amp-story>
```

ブックエンドの設定をサーバーから取得する必要がない場合は、インラインで指定することもできます。

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
<amp-story>
```

次に、JSON 設定を入力する必要があります。ここでブックエンドをカスタマイズできます。設定の全体的な構造は次のようになります。

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

先頭の行を含めて、v1.0 バージョンを使用していることを明示する必要があります。

#### ブックエンド コンポーネント

ブックエンドはさまざまなコンポーネントで構成されています。たとえば、記事、行動を促すフレーズのリンク、テキストなどのコンポーネントです。

コンポーネントは設定済みの JSON の `components` フィールドで指定されます。例については、以下の [JSON レスポンスの例](#example-json-response)をご覧ください。

##### heading

<code>heading</code> コンポーネントの ```text</code> フィールドで、記事のグループにタイトルを追加できます。

```json
{
  type: "heading",
  text: "More to Read"
}
```

<amp-img alt="ブックエンドの heading コンポーネント" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-heading.png" width="386" height="123" layout="fixed">
  <noscript>
  <img alt="ブックエンドの heading コンポーネント" src="img/amp-story-bookend-component-heading.png">
  </noscript>
</amp-img>

##### small

`small` コンポーネントを使用すると、関連記事にリンクできます。このコンポーネントでは、`title` フィールドと `url` フィールドを指定する必要があります。`image` フィールドはオプションです。

```json
{
  type: "small",
  title: "This is India an the best places you should go",
  url: "http://example.com/article.html",
  image: "http://placehold.it/256x128"
}
```

<amp-img alt="ブックエンドの small コンポーネント" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-small.png" width="379" height="192" layout="fixed">
  <noscript>
    <img alt="ブックエンドの small コンポーネント" src="img/amp-story-bookend-component-small.png">
  </noscript>
</amp-img>

##### landscape

`landscape` コンポーネントは、コンテンツの別の形式（動画など）に使用できます。このコンポーネントでは、`title`、`url`、`image` の各フィールドを指定する必要があります。必要に応じて `category` フィールドを追加できます。これにより、タイトルの上に小見出しを表示できます。

```json
{
  type: "landscape",
  title: "TRAPPIST-1 Planets May Still Be Wet Enough for Life",
  url: "http://example.com/article.html",
  category: "astronomy",
  image: "http://placehold.it/256x128"
  }
```

<amp-img alt="ブックエンドの landscape コンポーネント" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-landscape.png" width="388" height="410" layout="fixed">
  <noscript>
    <img alt="ブックエンドの landscape コンポーネント" src="img/amp-story-bookend-component-landscape.png">
  </noscript>
</amp-img>

##### portrait

`portrait` コンポーネントを使用すると、他のストーリーにリンクできます。このコンポーネントでは、`title`、`url`、`image` の各フィールドを指定する必要があります。必要に応じて `category` フィールドを追加できます。これにより、タイトルの上に小見出しを表示できます。

```json
{
  type: "portrait",
  category: "Science",
  title: "New discovery found",
  url: "http://example.com/article.html",
  image: "http://placehold.it/312x416"
}
```

<amp-img alt="ブックエンドの portrait コンポーネント" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-portrait.png" width="382" height="522" layout="fixed">
  <noscript>
    <img alt="ブックエンドの portrait コンポーネント" src="img/amp-story-bookend-component-portrait.png">
    </noscript>
  </amp-img>

##### cta-link

<code>cta-link</code> コンポーネントでは、行動を促すフレーズのリンクを指定できます（<code>Read More</code>、<code>Subscribe</code> など）。このコンポーネントの <code>links</code> キーで一連のリンクを指定できます。各リンクは、```text</code> と <code>url</code> の値が指定されたオブジェクトです。

```json
{
  type: "cta-link",
  links: [
    {
      text: "Sign Up",
      url: "example.com/signup"
      },
    {
      text: "Subscribe",
      url: "example.com/subscribe"
    }
  ]
}
```

<amp-img alt="ブックエンドの cta-links コンポーネント" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-cta-links.png" width="381" height="81" layout="fixed">
  <noscript>
    <img alt="ブックエンドの cta-links コンポーネント" src="img/amp-story-bookend-component-cta-links.png">
  </noscript>
</amp-img>

##### textbox

```textbox</code> コンポーネントでは、ブックエンド内のテキスト（写真提供元など）を指定できます。このコンポーネントでは <code>text</code> 配列（各要素がテキスト行の配列）を指定する必要があります。

```json
{
  type: "textbox",
  text: [
    Food by Enrique McPizza,
    Choreography by Gabriel Filly,
    Script by Alan Ecma S.,
    Direction by Jon Tarantino
  ]
}
```

<amp-img alt="ブックエンドの textbox コンポーネント" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-textbox.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="ブックエンドの textbox コンポーネント" src="img/amp-story-bookend-component-textbox.png">
  </noscript>
</amp-img>

  **AMP 間のリンク**

  AMP ビューアに表示されるドキュメントでは、リンクをクリックすると、通常は `_top` に移動するか、新しいウィンドウで開きます。ただし、AMP ページへのリンクをビューアに表示させ続けることもできます。この動作を有効にするには、リンクをサポートするコンポーネントに `"amphtml": true` を追加します。以下に例を示します。

```json
...
{
  type: "small",
  title: "This is India an the best places you should go",
  url: "http://example.com/my-amp-document.html",
  image: "http://placehold.it/256x128",
  amphtml: true
},
{
  type: "cta-link",
  links: [
    {
      text: "Sign Up",
      url: "example.com/signup",
      amphtml: true
    },
    {
      text: "Subscribe",
      url: "example.com/subscribe"
    }
  ]
},
...
```

#### ソーシャル共有

ソーシャル共有の設定は、レスポンス オブジェクトの `shareProviders` フィールド（オプション）で定義します。

このフィールドには、共有プロバイダの名前（`twitter` など）を表す文字列を含める必要があります。

追加のパラメータが必要な場合は、Key-Value ペアを持つオブジェクトを使用します。このオブジェクトには、プロバイダの名前に対応する値（`facebook` など）が指定されたキー `provider` を含める必要があります。次の Key-Value は共有プロバイダによって決まります。

使用できるプロバイダのリストは [amp-social-share](https://www.ampproject.org/docs/reference/components/amp-social-share) コンポーネントと同じです。

使用できるパラメータのセットはプロバイダごとに異なります（[`data-param-*`](https://www.ampproject.org/docs/reference/components/amp-social-share#data-param-%2a) を参照）。設定オブジェクトでは、`data-param-` プレフィックスのないパラメータが使用されます（たとえば `data-param-app_id` は、設定オブジェクトでは `app_id` と表示されます）。

#### JSON 設定

`<amp-story-bookend>` には、ブックエンドの JSON 設定を指す `src` 属性が必要です。この属性は、GET リクエストを受け取って、ブックエンドのコンテンツを含む JSON レスポンスを返す URL エンドポイントとして記述されます。省略すると、amp-story コンポーネントにおいて終了画面のデフォルトの UI がレンダリングされます。システムは、関連記事や話題の記事のレンダリングに必要なデータを取得します。このデータは、静的な JSON ファイルから提供される場合と、動的に生成される場合があります（何が現在話題になっているかの評価などに使用されます）。

#### JSON レスポンスの例

```text
{
  // You must specify version v1.0.
  bookendVersion: "v1.0",
  shareProviders: [
    email,
    tumblr,
    {
      provider: "twitter",
      // You can add custom sharing parameters depending on the social platform.
      text: "This is custom share text that I would like for the Twitter platform"
    },
    {
      provider: "facebook",
      // Facebook requires an</code>app_id` param
      app_id: "MY_FACEBOOK_APP_ID"
    }
  ],
  components: [
    {
      type: "heading",
      text: "More to read"
    },
    {
      type: "small",
      title: "This is India an the best places you should go",
      url: "<a href="
      http: //example.com/article.html">http://example.com/article.html</a>",
        image: "<a href="
      http: //placehold.it/256x128">http://placehold.it/256x128</a>"
    },
    ...
  ]
}
```

## AMP ストーリーで使用可能なその他のコンポーネント

以下に、AMP ストーリーで使用できるその他のコンポーネントを示します。ただし、ストーリーに固有の注意すべき点がいくつかあります。

* [amp-sidebar](https://www.ampproject.org/docs/reference/components/amp-sidebar#sidebar-for-stories)
* [amp-consent](https://www.ampproject.org/docs/reference/components/amp-consent#prompt-ui-for-stories)

一般に使用可能なその他のコンポーネントについては、[使用可能な子のリスト](https://www.ampproject.org/docs/reference/components/amp-story#children)をご覧ください。

## 検証

AMP 検証ツールの仕様で [amp-story のルール](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii)をご確認ください。

## ローカライズ

ストーリーをローカライズするには、ストーリーの `<html>` タグの `lang` 属性で言語コードを指定する必要があります（たとえば、英語の場合は `<html lang="en">`）。サポートされている言語コードを以下に示します。

* ar（アラビア語）
* de（ドイツ語）
* en-GB（英語、英国）
* en（英語、米国）
* es-419（スペイン語、中南米）
* es（スペイン語、スペイン）
* fr-CA（フランス語、カナダ）
* fr（フランス語、フランス）
* hi（ヒンディー語）
* id（インドネシア語）
* it（イタリア語）
* ja（日本語）
* ko（韓国語）
* nl（オランダ語）
* no（ノルウェー語）
* pt-BR（ポルトガル語、ブラジル）
* pt（ポルトガル語、ポルトガル）
* ru（ロシア語）
* tr（トルコ語）
* vi（ベトナム語）
* zh-TW（繁体字中国語）
* zh（簡体字中国語）

また、右から左方向に表記する言語の場合、ストーリーの `<html>` タグに `dir="rtl"` 属性を含めることができます。この属性は言語コードと組み合わせて使用できます（例: `<html lang="ar" dir="rtl">`）。

## 関連リソース

* [チュートリアル: ビジュアルに訴える AMP ストーリーを作成する](https://www.ampproject.org/docs/tutorials/visual_story)
* [AMP By Example のサンプル](https://ampbyexample.com/stories/#stories/introduction)
* [AMP ストーリーのおすすめの作成方法](https://www.ampproject.org/docs/guides/amp_story_best_practices)

</amp-story></body>
