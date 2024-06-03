---
'$title': AMP for Ads の仕様
$order: 3
formats:
  - ads
teaser:
  text: 標準への変更を提案する場合は、Intent to Implement としてコメントを
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/amp-a4a-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
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

_標準への変更を提案するには、[Intent to Implement](https://github.com/ampproject/amphtml/issues/4264)_ としてコメントを残してください。

AMPHTML 広告は、高速で高性能の広告を AMP ページにレンダリングする仕組みを指します。AMPHTML 広告ドキュメント（「AMP クリエイティブ」）をブラウザに素早くスムーズにレンダリングする一方で、ユーザーエクスペリエンスを低下させないようにするには、一連の検証ルールに従った AMP クリエイティブを作成する必要があります。[AMP 書式設定ルール](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml) と同様に、AMPHTML 広告で許可されるタグ、機能、および拡張機能にも制限があります。

## AMPHTML 広告の書式設定ルール <a name="amphtml-ad-format-rules"></a>

以下で指定されていない限り、クリエイティブは、ここにリファレンスとして含まれる[AMP 書式設定ルール](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml.html)に示されるすべてのルールに従う必要があります。たとえば、AMPHTML 広告の[ボイラープレート](#boilerplate)に関して言えば、AMP 標準ボイラープレートから逸脱しています。

さらに、クリエイティブは以下のルールにも従う必要があります。

<table>
<thead><tr>
  <th>ルール</th>
  <th>根拠</th>
</tr></thead>
<tbody>
<tr>
<td>エンクロージングタグとして <code>&lt;html ⚡4ads></code> または <code>&lt;html amp4ads></code> を使用すること。</td>
<td>バリデータは、クリエイティブドキュメントを一般的な AMP ドキュメントか制限された AMPHTML 広告ドキュメントのどちらであるかを識別し、適宜ディスパッチできるようにします。</td>
</tr>
<tr>
<td>ランタイムスクリプトとして、<code>https://cdn.ampproject.org/v0.js</code> ではなく、<code>&lt;script async src="https://cdn.ampproject.org/amp4ads-v0.js">&lt;/script></code> を含めること。</td>
<td>クロスオリジンの iframe に配信される AMPHTML 広告のランタイムの動作をカスタマイズできます。</td>
</tr>
<tr>
<td>
<code>&lt;link rel="canonical"></code> タグを含めないこと。</td>
<td>広告クリエイティブには「non-AMP canonical version」がなく、検索用に個別にインデックス化されないため、自己参照が無意味になります。</td>
</tr>
<tr>
<td>HTML の head に識別子としてオプションのメタタグを含めることができる。形式は <code>&lt;meta name="amp4ads-id" content="vendor=${vendor},type=${type},id=${id}"></code> とする。これらのメタタグは <code>amp4ads-v0.js</code> スクリプトの前に配置すること。<code>vendor</code> と <code>id</code> の値は [0-9a-zA-Z_-] のみを含む文字列。<code>type</code> の値は <code>creative-id</code> または <code>impression-id</code>。</td>
<td>カスタム識別子はインプレッションかクリエイティブかを識別するために使用され、レポート作成とデバッグに役立ちます。<br><br><p>例:</p>
<pre>
&lt;meta name="amp4ads-id"
  content="vendor=adsense,type=creative-id,id=1283474">
&lt;meta name="amp4ads-id"
  content="vendor=adsense,type=impression-id,id=xIsjdf921S"></pre>
</td>
</tr>
<tr>
<td>
<code>&lt;amp-analytics></code> ビューアビリティ追跡は、<code>"visibilitySpec": { "selector": "amp-ad" }</code> によって full-ad セレクタのみをターゲットできる。<a href="https://github.com/ampproject/amphtml/issues/4018">Issue #4018</a> と <a href="https://github.com/ampproject/amphtml/pull/4368">PR #4368</a> で定義。特に、広告クリエイティブ内にある要素のセレクタをターゲットしない可能性がある。</td>
<td>一部のケースでは、AMPHTML 広告は、iframe に広告クリエイティブをレンダリングすることとを選択する場合があります。このような場合でも、ホストページのアナリティクスは iframe 全体をターゲットし、より細かいセレクタにはアクセスできません。<br><br> <p>例:</p> <pre>
&lt;amp-analytics id="nestedAnalytics">
  &lt;script type="application/json">
  {
    "requests": {
      "visibility": "https://example.com/nestedAmpAnalytics"
    },
    "triggers": {
      "visibilitySpec": {
      "selector": "amp-ad",
      "visiblePercentageMin": 50,
      "continuousTimeMin": 1000
      }
    }
  }
  &lt;/script>
&lt;/amp-analytics>
</pre> <p>この構成は、エンクロージング広告の 50% が 1 秒間画面に連続表示されると、リクエストを <code>https://example.com/nestedAmpAnalytics</code> URL に送信します。</p>
</td>
</tr>
</tbody>
</table>

### ボイラープレート <a name="boilerplate"></a>

AMPHTML 広告クリエイティブには、[一般的な AMP ドキュメントが必要とする](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md)ボイラープレートとは別の、非常にシンプルなボイラープレートスタイル行が必要です。

[sourcecode:html]

<style amp4ads-boilerplate>
  body {
    visibility: hidden;
  }
</style>

[/sourcecode]

<em>根拠:</em> <code>amp-boilerplate</code> スタイルは、AMP ランタイムの準備が整うまで body コンテンツを非表示に、準備ができたらそれを表示します。Javascript が無効化されているか AMP ランタイムが読み込みに失敗すると、デフォルトのボイラープレートによって、準備の可否にかかわらず最終的にコンテンツが表示されます。ただし、AMPHTML 広告では Javascript が完全に無効化されているため、AMPHTML 広告は実行せず、広告が表示されることがありません。したがって、<code><noscript></code> セクションは不要と言えます。AMP ランタイムが存在しない場合、AMPHTML 広告が依存する機構のほとんど（可視性追跡またはコンテンツ表示用の <code>amp-img</code> の分析など）は利用できないため、正しく機能しない広告を表示するよりも、広告を何も表示しない方が賢明と言えます。

最後に、AMPHTML 広告ボイラープレートは、<code>amp-boilerplate</code> ではなく <code>amp-a4a-boilerplate</code> を使用するため、バリデータはそれを簡単に識別子、開発者が理解しやすいより正確なエラーを発することができます。

ボイラープレートテキストには、<a>一般的な AMP ボイラープレート</a>と同じミューテーションに関するルールが適用されることに注意してください。

### CSS <a name="css"></a>

<table>
<thead><tr>
  <th>ルール</th>
  <th>根拠</th>
</tr></thead>
<tbody>
  <tr>
    <td>クリエイティブ CSS では、<code>position:fixed</code> と <code>position:sticky</code> は使用禁止。</td>
    <td> <code>position:fixed</code> は、AMPHTML 広告が依存するシャドー DOM から抜け出します。またすでに、AMP で定位置を使用することは許可されていません。</td>
  </tr>
  <tr>
    <td>
<code>touch-action</code> は使用禁止。</td>
    <td>
<code>touch-action</code> を操作できる広告では、ユーザーはホストドキュメントをスクロールできません。</td>
  </tr>
  <tr>
    <td>クリエイティブ CSS は 20,000 バイトに制限されています。</td>
    <td>大規模な CSS ブロックによってクリエイティブが増幅するため、ネットワークレイテンシが増加し、ページのパフォーマンスが低下してしまいます。</td>
  </tr>
  <tr>
    <td>トランジションやアニメーションは、その他の追加制限に基づきます。</td>
    <td>AMP は、広告が画面上にない場合やシステムリソースが非常に少ない場合にアニメーションを停止できるように、広告に属するすべてのアニメーションを制御できる必要があります。</td>
  </tr>
  <tr>
    <td>検証目的により、ベンダー特有のプレフィクスは、プレフィクスのない同一のシンボルのエイリアスとしてみなされます。つまり、シンボル <code>foo</code> が CSS 検証ルールで禁止されている場合、シンボル <code>-vendor-foo</code> も禁止されることになります。</td>
    <td>一部のベンダー特有のプレフィクスを伴うプロパティは、これらのルールで禁止または制限されたプロパティと同等の機能を提供します。<br><br><p>例: <code>-webkit-transition</code> および <code>-moz-transition</code> は共に、<code>transition</code> のエイリアスとみなされます。これらは、ベア <code>transition</code> が許可されるコンテキストのみで許可されます（以下の「<a href="#selectors">セレクタ</a>」セクションを参照してください）。</p>
</td>
  </tr>
</tbody>
</table>

#### CSS アニメーションとトランジション <a name="css-animations-and-transitions"></a>

##### セレクタ <a name="selectors"></a>

`transition` と `animation` プロパティは、以下に該当するセレクタのみで許可されています。

- `transition`、`animation`, `transform`、`visibility`、または `opacity` プロパティのみを含むセレクタ。

  _根拠:_ ページのパフォーマンスを得るために、必要に応じて AMP ランタイムはコンテキストからこのクラスを削除して、アニメーションを無効化することができます。

**良い例**

[sourcecode:css]
.box {
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

**悪い例**

許可されていないプロパティが CSS クラスに含まれます。

[sourcecode:css]
.box {
color: red; // non-animation property not allowed in animation selector
transform: rotate(180deg);
transition: transform 2s;
}
[/sourcecode]

##### トランジショナブルおよびアニメータブルプロパティ <a name="transitionable-and-animatable-properties"></a>

トランジション可能なプロパティは、opacity と transform のみです。（[根拠](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)）

**良い例**

[sourcecode:css]
transition: transform 2s;
[/sourcecode]

**悪い例**

[sourcecode:css]
transition: background-color 2s;
[/sourcecode]

**良い例**

[sourcecode:css]
@keyframes turn {
from {
transform: rotate(180deg);
}

to {
transform: rotate(90deg);
}
}
[/sourcecode]

**悪い例**

[sourcecode:css]
@keyframes slidein {
from {
margin-left: 100%;
width: 300%;
}

to {
margin-left: 0%;
width: 100%;
}
}
[/sourcecode]

### 許可されている AMP 拡張機能とビルトイン <a name="allowed-amp-extensions-and-builtins"></a>

以下のリストには、AMPHTML 広告クリエイティブでの使用が*許可されている* AMP 拡張機能モジュールと AMP ビルトインタグです。ここに明示的に示されていない拡張機能またはビルトインタグの使用は禁止されています。

- [amp-accordion](https://amp.dev/documentation/components/amp-accordion)
- [amp-ad-exit](https://amp.dev/documentation/components/amp-ad-exit)
- [amp-analytics](https://amp.dev/documentation/components/amp-analytics)
- [amp-anim](https://amp.dev/documentation/components/amp-anim)
- [amp-animation](https://amp.dev/documentation/components/amp-animation)
- [amp-audio](https://amp.dev/documentation/components/amp-audio)
- [amp-bind](https://amp.dev/documentation/components/amp-bind)
- [amp-carousel](https://amp.dev/documentation/components/amp-carousel)
- [amp-fit-text](https://amp.dev/documentation/components/amp-fit-text)
- [amp-font](https://amp.dev/documentation/components/amp-font)
- [amp-form](https://amp.dev/documentation/components/amp-form)
- [amp-img](https://amp.dev/documentation/components/amp-img)
- [amp-layout](https://amp.dev/documentation/components/amp-layout)
- [amp-lightbox](https://amp.dev/documentation/components/amp-lightbox)
- amp-mraid（実験のみ）。使用を検討している場合は、[wg-monetization](https://github.com/ampproject/wg-monetization/issues/new) に課題を提出してください。
- [amp-mustache](https://amp.dev/documentation/components/amp-mustache)
- [amp-pixel](https://amp.dev/documentation/components/amp-pixel)
- [amp-position-observer](https://amp.dev/documentation/components/amp-position-observer)
- [amp-selector](https://amp.dev/documentation/components/amp-selector)
- [amp-social-share](https://amp.dev/documentation/components/amp-social-share)
- [amp-video](https://amp.dev/documentation/components/amp-video)

上記に含まれていないもののほとんどは、パフォーマンスを維持するため、または AMPHTML 広告を分析しやすくするために含まれていません。

_例:_ `<amp-ad>` はこのリストに含まれていません。`<amp-ad>` で `<amp-ad>` を使用した場合、際限のないウォーターフォール式の広告読み込みが発生する可能性があり、AMPHTML 広告のパフォーマンスの目標にそぐわないため、これは明示的に許可されていません。

_例:_ `<amp-iframe>` はこのリストに含まれていません。広告がこれを使用して任意の JavaScript を実行し、任意のコンテンツを読みこむ可能性があるためです。広告がこのような機能を使用しようとすると、<a>a4aRegistry</a> エントリから <code>false</code> が返され、既存の '3p iframe' 広告表示メカニズムが使用されます。

_例:_ `<amp-facebook>`、`<amp-instagram>`、`<amp-twitter>`、および `<amp-youtube>` は、`<amp-iframe>` と同じ理由でリストに含まれていません。これらは iframe を作成して、リソースを際限なく消費する可能性があります。

_例:_ `<amp-ad-network-*-impl>` はこのリストに含まれていません。`<amp-ad>` タグはこれらの実装タグへの移譲を処理します。クリエイティブはこれらのタグを直接含めてはいけません。

_例:_ `<amp-lightbox>` は、このリストにまだ含まれていません。AMPHTML 広告クリエイティブが iframe 内に表示されても、iframe を超えて拡大する仕組みがまだ広告に備わっていないためです。この機能の要望が示されれば、そのサポートが将来的に追加される可能性はあります。

### HTML タグ <a name="html-tags"></a>

以下は、AMPHTML 広告クリエイティブでの使用が*許可されている*タグです。明示的に示されていないタグの使用は禁止されています。このリストは、一般的な [AMP タグの allowlist 付録](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/../../spec/amp-tag-addendum.md) のサブセットです。そのリストと同様に、HTML5 仕様書のセクション 4「[The Elements of HTML](http://www.w3.org/TR/html5/single-page.html#html-elements)」に従って記載されています。

以下に記載されていないもののほとんどは、パフォーマンスを維持するため、またはタグが HTML5 標準ではないため記載されていません。たとえば、`<noscript>` は、AMPHTML 広告が有効化される JavaScript に依存しており、`<noscript>` ブロックは決して実行されることがなく、したがってクリエイティブを増幅し、帯域幅とレイテンシに影響を及ぼすため、以下には含まれていません。同様に、`<acronym>`、`<big>` などは、HTML5 対応ではないため禁止されています。

#### 4.1 ルート要素<a name="41-the-root-element"></a>

4.1.1 `<html>`

- `<html ⚡4ads>` または `<html amp4ads>` を使用する必要があります

#### 4.2 ドキュメントのメタデータ <a name="42-document-metadata"></a>

4.2.1 `<head>`

4.2.2 `<title>`

4.2.4 `<link>`

- `<link rel=...>` タグは使用できませんが、`<link rel=stylesheet>` はこの対象ではありません。

- **注意:** 一般的な AMP とは異なり、`<link rel="canonical">` タグは禁止されています。

  4.2.5 `<style>` 4.2.6 `<meta>`

#### 4.3 セクション <a name="43-sections"></a>

4.3.1 `<body>` 4.3.2 `<article>` 4.3.3 `<section>` 4.3.4 `<nav>` 4.3.5 `<aside>` 4.3.6 `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, and `<h6>` 4.3.7 `<header>` 4.3.8 `<footer>` 4.3.9 `<address>`

#### 4.4 グループ化コンテンツ <a name="44-grouping-content"></a>

4.4.1 `<p>` 4.4.2 `<hr>` 4.4.3 `<pre>` 4.4.4 `<blockquote>` 4.4.5 `<ol>` 4.4.6 `<ul>` 4.4.7 `<li>` 4.4.8 `<dl>` 4.4.9 `<dt>` 4.4.10 `<dd>` 4.4.11 `<figure>` 4.4.12 `<figcaption>` 4.4.13 `<div>` 4.4.14 `<main>`

#### 4.5 テキストレベルのセマンティクス <a name="45-text-level-semantics"></a>

4.5.1 `<a>` 4.5.2 `<em>` 4.5.3 `<strong>` 4.5.4 `<small>` 4.5.5 `<s>` 4.5.6 `<cite>` 4.5.7 `<q>` 4.5.8 `<dfn>` 4.5.9 `<abbr>` 4.5.10 `<data>` 4.5.11 `<time>` 4.5.12 `<code>` 4.5.13 `<var>` 4.5.14 `<samp>` 4.5.15 `<kbd >` 4.5.16 `<sub>` and `<sup>` 4.5.17 `<i>` 4.5.18 `<b>` 4.5.19 `<u>` 4.5.20 `<mark>` 4.5.21 `<ruby>` 4.5.22 `<rb>` 4.5.23 `<rt>` 4.5.24 `<rtc>` 4.5.25 `<rp>` 4.5.26 `<bdi>` 4.5.27 `<bdo>` 4.5.28 `<span>` 4.5.29 `<br>` 4.5.30 `<wbr>`

#### 4.6 編集 <a name="46-edits"></a>

4.6.1 `<ins>` 4.6.2 `<del>`

#### 4.7 埋め込みコンテンツ <a name="47-embedded-content"></a>

- 埋め込みコンテンツは、`<amp-img>` または `<amp-video>` といった AMP タグ経由でのみサポートされます。

#### 4.7.4 `<source>` <a name="474-source"></a>

#### 4.7.18 SVG <a name="4718-svg"></a>

SVG タグは HTML5 名前空間にありません。セクション ID 無しで記載されています。

` <svg>``<g>``<path>``<glyph>``<glyphref>``<marker>``<view>``<circle>``<line>``<polygon>``<polyline>``<rect>``<text>``<textpath>``<tref>``<tspan>``<clippath>``<filter>``<lineargradient>``<radialgradient>``<mask>``<pattern>``<vkern>``<hkern>``<defs>``<use>``<symbol>``<desc>``<title> `

#### 4.9 表形式データ <a name="49-tabular-data"></a>

4.9.1 `<table>` 4.9.2 `<caption>` 4.9.3 `<colgroup>` 4.9.4 `<col>` 4.9.5 `<tbody>` 4.9.6 `<thead>` 4.9.7 `<tfoot>` 4.9.8 `<tr>` 4.9.9 `<td>` 4.9.10 `<th>`

#### 4.10 フォーム <a name="410-forms"></a>

4.10.8 `<button>`

#### 4.11 スクリプティング <a name="411-scripting"></a>

- 一般的な AMP ドキュメントと同様に、クリエイティブの `<head>` タグには、`<script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>` タグが含まれている必要があります。
- 一般的な AMP とは異なり、`<noscript>` は禁止されています。
  - _根拠:_ AMPHTML 広告が’機能するには、Javascript が必ず必要です。AMPHTML 広告の `<noscript>` ブロックには意味がないため、ネットワーク帯域幅を浪費してしまいます。
- 一般的な AMP とは異なり、`<script type="application/ld+json">` は禁止されています。
  - _根拠:_ ホストページでは構造化データのマークアップに JSON LD が使用されていますが、広告クリエイティブはスタンドアロンドキュメントではなく、構造化データを持ちません。JSON LD ブロックは、ネットワーク帯域幅を浪費してしまいます。
- その他すべてのスクリプティングルールと除外については、一般的な AMP の内容が適用されます。
