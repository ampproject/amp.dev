---
'$title': AMP オプティマイザの仕組み
$order: 1
description: AMP オプティマイザは、有効な AMPHTML ドキュメントを入力として取り、「手作業」では面倒な最適化をさらに適用することで最適化バージョンに変換します。このガイドでは、AMP オプティマイザがどのように動作するのかを詳しく説明します。
formats:
  - websites
  - stories
author: sebastianbenz
---

AMP オプティマイザは、有効な AMPHTML ドキュメントを入力として取り、「手作業」では面倒な最適化をさらに適用することで最適化バージョンに変換します。最適化された「**変換済み AMP**」は、`html` 要素の `transformed` 属性で識別することができます。

```
<html ⚡ i-amphtml-layout i-amphtml-no-boilerplate transformed="self;v=1">
```

注意: AMP キャッシュでは別の変換済みフラグが使用されています。Google AMP キャッシュの場合は、`transformed=google;v=1` が追加されます。

AMP オプティマイザは、サーバー側のレンダリングレイアウトから画像最適化まで、さまざまな最適化処理を実行します。ここに示すのは、AMP ページとその最適化バージョンの違いです（[クリックして拡大表示](/static/img/docs/guides/optimized-amp-diff.png)）。

<a href="/static/img/docs/guides/optimized-amp-diff.png"><amp-img lightbox layout="responsive" width="2560" height="773" src="/static/img/docs/guides/optimized-amp-diff.png"></amp-img></a>

このガイドの残りでは、最適化をより詳しく紹介します。

### サーバー側レンダリング AMP レイアウト

サーバー側レンダリング AMP レイアウトには、AMP ページの読み込みパフォーマンスを改善する最大の能力があります。コンテンツのジャンプを回避するために、AMP ではウェブサイトの head に [AMP ボイラープレートコード](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites)を追加する必要があります。AMP ボイラープレートは、ページの body の不透明度を 0 に設定することで、ページコンテンツを非表示にします。AMP が読み込まれるとページのレイアウトを計算することができるため、その後で AMP は body の不透明度を 1 に設定し、ページコンテンツを表示状態にします。残念ながら、このアプローチでは、ページをレンダリングする前に AMP フレームワークをダウンロードする必要があります。

これを改善するために、`responsive` や `fixed-height` といった AMP レイアウトは、ページをユーザーエージェントに配信する前にサーバー側でレンダリングすることができます。このようにすることで、ページの読み込み中に[コンテンツの移動](https://web.dev/cls/)を回避しながら、AMP ボイラープレートを削除することが可能になります。

サーバー側レンダリングでは、以下の 3 つのことが行われます。

⁣**1. AMP ボイラープレートを削除する。** AMP レイアウトを使用する各要素に対し、レイアウト固有のマークアップがインジェクトされます。

⁣**2. Inline AMP-internal CSS styles: ** the AMP-boilerplate code is replaced by the <a href="https://ampjs.org/v0.css">AMP-runtime CSS styles</a>:`<style amp-runtime>...</style>`. For non-server-side rendered documents, AMP adds these styles at runtime. However, server-side-rendered AMP pages require these for the AMP layouts to work before AMP has been loaded. To avoid potential version conflicts, at runtime, AMP will check if the version specified in i-amphtml-version="011905222334000" differs from the current AMP version and will update the CSS with the latest version if not.

```
<style amp-runtime i-amphtml-version="011905222334000">html{overflow-x:hidden!important}html.i-amphtml-...</style>
```

⁣**3. サーバー側でレンダリングされる AMP レイアウト。** AMP レイアウトを使用する各要素に対し、レイアウト固有の sizer 要素がインジェクトされます。

```
<amp-img src="image.jpg" width="1080" height="610" layout="responsive"
         class="i-amphtml-layout-responsive i-amphtml-layout-size-defined" i-amphtml-layout="responsive">
  <i-amphtml-sizer style="display:block;padding-top:56.4815%;"></i-amphtml-sizer>
</amp-img>
```

警告: AMP ボイラープレートは必ず削除されるわけではありません。ボイラープレートが削除されたかどうかは、`i-amphtml-no-boilerplate` 属性が `html` 要素に存在するかどうかを確認して調べることができます。たとえば、`amp-experiment` コンポーネントは、ランタイム時にページのコンテンツを変更します。コンテンツの移動を回避するには、ページに `amp-experiment` が使用されている場合、AMP ボイラープレートコードが存在する必要があります。

### ヒーロー画像の最適化

AMP オプティマイザは、最初のビューポートで画像のレンダリングにかかる時間を大幅に改善することができます。この改善は、[Core Web Vitals](https://web.dev/vitals) を満たすように [LCP 時間](https://web.dev/lcp/)を最適化する際に重要です。

AMP では、ヒーロー画像は、`amp-img` を `data-hero` 属性で注釈して明示的に宣言できます。

```
<amp-img data-hero src="/hero.jpg" layout="responsive" width="640" height="480"></amp-img>
```

AMP オプティマイザは、1 つのページに最大 2 つのヒーロー画像の使用をサポートし、ほかの重要なリソースの帯域幅をブロックしないようにしています。この制限が都合に合わない場合は、[どうぞお知らせください](https://github.com/ampproject/amp-toolbox/issues)。

AMP オプティマイザは、`amp-img`、`amp-iframe`、`amp-video`、または `amp-video-iframe` 要素のヒーロー画像を自動検出し、画像の `src` に `link rel=preload` をインジェクトします。自動検出は、HTML マークアップと画像レイアウトを分析し、最初のビューポートの大きな画像を検出して行われます。

`amp-img` の場合、AMP オプティマイザは、`amp-img` 内の `img` タグをサーバー側でレンダリングします。このため、ブラウザは AMP ランタイムを必要とせずに、直接画像をレンダリングすることができます。

### 画像の最適化

AMP オプティマイザは、AMP レイアウト固有の `srcset` 属性を生成することで、最適化されたレスポンシブ画像を配信できるようにします。以下の `amp-img` 宣言を例に使用します。

```
<amp-img src="image1.png" width="400" height="800" layout="responsive"></amp-img>
```

上記の宣言は、以下の `srcset` 定義で強化されます。

```
<amp-img src="image1.png" width="400" height="800" layout="responsive" srcset="image1.470w.png 470w, image1.820w.png 820w, image1.1440w.png 1440w"></amp-img>
```

上記が機能するには、ビルド/ホスティング環境で画像のサイズ変更や最適化がサポートされている必要があります。画像最適化を最もよく統合する方法については、各オプティマイザガイドを参照してください。

### AMP モジュールビルド（近日公開）

ユーザーが AMP ページを表示する際にダウンロードされる JavaScript を減らした、[JavaScript モジュール](https://v8.dev/features/modules#browser)に基づく小型バージョンの AMP ランタイムとコンポーネントがあります。AMP オプティマイザはデフォルトで AMP モジュールビルドを有効化し、以下のようにコードを変換させます。

```
<script async src="https://www.ampproject.org/v0.js"></script>
```

上記を以下のように変換します。

```
<script type="module" async src="https://www.ampproject.org/v0.mjs"></script>
<script nomodule async src="https://www.ampproject.org/v0.js"></script>
```

`type="module"` を理解するブラウザは、`nomodule` 属性のあるスクリプトを無視します。つまり、最新のブラウザを使用するユーザーは、規模が縮小されたランタイムバンドルを利用できますが、古いブラウザを使用するユーザーは、AMP ランタイムの非モジュールバージョンにフォールバックすることになります。

注意: AMP ランタイム CSS はインライン化される必要があるため、AMP モジュールビルドは、変換済みの AMP でのみ利用できます。
