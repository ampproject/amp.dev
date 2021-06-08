---
$title: AMP HTML 仕様
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-html-format.md.
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

AMP HTML は、一定のベースラインパフォーマンス特性を保証するようにニュース記事などのコンテンツページを作成するための HTML のサブセットです。

HTML のサブセットであるため、HTML で利用可能なタグと機能のフルセットに制限がありますが、新しいレンダリングエンジンを開発する必要はありません。既存のユーザエージェントは他のすべての HTML と同じように AMP HTML をレンダリングできます。

[tip type="read-on"]

AMP で許可されているものと許可されていないものに関心がある場合は、[AMP の制限事項に関する入門ビデオ](https://www.youtube.com/watch?v=Gv8A4CktajQ)をご覧ください。

[/tip]

また、AMP HTML ドキュメントを Web サーバにアップロードして、他の HTML ドキュメントと同じように配信することもできます。サーバ用の特別な構成は必要ありません。しかしながら、それらはまた、オプションで AMP ドキュメントをプロキシする特別な AMP サービングシステムを通して提供されるように設計されています。これらのドキュメントはそれらを自身のオリジンから提供し、追加のパフォーマンス上のメリットを提供するドキュメントに変換を適用することが許可されています。このようなサービングシステムが行う可能性のある最適化の不完全なリストは次のとおりです:

- 画像の参照を、閲覧者のビューポートに合わせたサイズの画像に置き換えます。
- 折り目の上に表示されるインライン画像。
- CSS 変数をインライン化します。
- 拡張コンポーネントをプリロードします。
- HTML と CSS を縮小します。

AMP HTML は、寄稿されているが一元管理されホストされているカスタム要素のセットを使用して、AMP HTML ドキュメントに見られるかもしれない画像ギャラリーなどの高度な機能を実装します。カスタム CSS を使用してドキュメントをスタイリングすることはできますが、カスタム要素を介して提供されるものを超えて JavaScript を作成しても、そのパフォーマンス目標を達成することはできません。

AMP フォーマットを使用することで、コンテンツ制作者は AMP ファイル内のコンテンツをクロール(robots.txt の制限の対象となる)、キャッシュ、および第三者による表示が可能になります。

## パフォーマンス <a name="performance"></a>

予測可能なパフォーマンスは、AMP HTML の重要な設計目標です。主に私達はページのコンテンツがユーザによって消費/使用されるまでの時間を減らすことを目指しています。
具体的には、次のことを意味します:

- ドキュメントをレンダリングして完全にレイアウトするために必要な HTTP リクエストは最小限に抑えるべきです。
- 画像や広告などのリソースは、ユーザに見られる可能性が高い場合にのみダウンロードしてください。
- ブラウザは、リソースを取得しなくても、ページ上のすべてのリソースに必要なスペースを計算できるはずです。

## AMP HTML フォーマット <a name="the-amp-html-format"></a>

### サンプルドキュメント <a name="sample-document"></a>

[sourcecode:html]

<!doctype html>
<html ⚡>
  <head>
    <meta charset="utf-8">
    <title>Sample document</title>
    <link rel="canonical" href="./regular-html-version.html">
    <meta name="viewport" content="width=device-width">
    <style amp-custom>
      h1 {color: red}
    </style>
    <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "NewsArticle",
      "headline": "Article headline",
      "image": [
        "thumbnail1.jpg"
      ],
      "datePublished": "2015-02-05T08:00:00+08:00"
    }
    </script>
    <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
    <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Sample document</h1>
    <p>
      Some text
      <amp-img src=sample.jpg width=300 height=300></amp-img>
    </p>
    <amp-ad width=300 height=250
        type="a9"
        data-aax_size="300x250"
        data-aax_pubname="test123"
        data-aax_src="302">
    </amp-ad>
  </body>
</html>
[/sourcecode]

### 必要なマークアップ <a name="required-markup"></a>

AMP HTML ドキュメントに必須ものは次の通りです。

- <a name="dctp"></a>Doctype `<!doctype html>`で始まります。[🔗](#dctp)
- <a name="ampd"></a>c トップレベルの `<html ⚡>` タグを含みます (`<html amp>` も同様に受け付けられます)。[🔗](#ampd)
- <a name="crps"></a>`<head>` タグと `<body>` タグを含みます(これらは HTML ではオプションです)。[🔗](#crps)
- <a name="canon"></a>通常の HTML バージョンの AMP HTML ドキュメントを指すか、そのような HTML バージョンが存在しない場合はそれ自体を指す `<link rel="canonical" href="$SOME_URL">` タグを head の中に入れます。[🔗](#canon)
- <a name="chrs"></a>head タグの最初の子として `<meta charset="utf-8">` タグを含めます。[🔗](#chrs)
- <a name="vprt"></a>head タグの中に `<meta name="viewport" content="width=device-width">` タグを含めます。`minimum-scale=1` と `initial-scale=1` を含めることもお勧めです。[🔗](#vprt)
- <a name="scrpt"></a>head タグの中に `<script async src="https://cdn.ampproject.org/v0.js"></script>` タグを含めます。[🔗](#scrpt)
- <a name="boilerplate"></a>head タグに [AMP ボイラープレートコード](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-boilerplate.md) (`head > style[amp-boilerplate]` と `noscript > style[amp-boilerplate]`) を入れてください。[🔗](#boilerplate)

### メタデータ <a name="metadata"></a>

AMP HTML ドキュメントには標準化されたメタデータで注釈を付けることをお勧めします。例えば [Open Graph Protocol](http://ogp.me/)、[Twitter Cards](https://dev.twitter.com/cards/overview) などです。

AMP HTML ドキュメントは [schema.org/CreativeWork](https://schema.org/CreativeWork) または [schema.org/NewsArticle](https://schema.org/NewsArticle) や [schema.org/BlogPosting](https://schema.org/BlogPosting) のようなより具体的なタイプでマークアップすることをお勧めします。

### HTML タグ <a name="html-tags"></a>

HTML タグは AMP HTML では変更なしに使用できます。特定のタグには同等のカスタムタグ (`<img>` と `<amp-img>` など) があり、他のタグは一切禁止されています:

<table>
  <tr>
    <th width="30%">タグ</th>
    <th>AMP HTML の状況</th>
  </tr>
  <tr>
    <td width="30%">script</td>
    <td>タイプが <code>application/ld+json</code> または <code>text/plain</code> でない限り禁止されています。(必要に応じて他に実行不可能な値が追加されるかもしれません。) 例外として、AMP ランタイムをロードするための必須の script タグと、拡張コンポーネントをロードするための script タグがあります。
    </td>
  </tr>
  <tr>
    <td width="30%">noscript</td>
    <td>許可されています。ドキュメント内のどこでも使用できます。指定した場合、JavaScript がユーザによって無効にされていると、<code>&lt;noscript&gt;</code> 要素内のコンテンツが表示されます。</td>
  </tr>
  <tr>
    <td width="30%">base</td>
    <td>禁止されています。</td>
  </tr>
  <tr>
    <td width="30%">img</td>
    <td><code>amp-img</code>に置き換わりました。<br>注意: <code>&lt;img&gt;</code> は <a href="https://www.w3.org/TR/html5/syntax.html#void-elements">HTML5 に準拠した Void 要素</a>なので、終了タグはありません。ただし、<code>&lt;amp-img&gt;</code> には終了タグ <code>&lt;/amp-img&gt;</code> があります。</td>
  </tr>
    <tr>
    <td width="30%">picture</td>
    <td>禁止されています。[fallback](https://amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders?format=websites) 属性を使用して異なる画像フォーマットを提供するか、複数の [<code>&lt;amp-img&gt;</code> の <code>srcset</code>](https://amp.dev/documentation/components/amp-img#attributes)を指定してください。</td>
  </tr>
  <tr>
    <td width="30%">video</td>
    <td><code>amp-video</code> に置き換わりました。</td>
  </tr>
  <tr>
    <td width="30%">audio</td>
    <td><code>amp-audio</code> に置き換わりました。</td>
  </tr>
  <tr>
    <td width="30%">iframe</td>
    <td><code>amp-iframe</code> に置き換わりました。</td>
  </tr>
    <tr>
    <td width="30%">frame</td>
    <td>禁止されています。</td>
  </tr>
  <tr>
    <td width="30%">frameset</td>
    <td>禁止されています。</td>
  </tr>
  <tr>
    <td width="30%">object</td>
    <td>禁止されています。</td>
  </tr>
  <tr>
    <td width="30%">param</td>
    <td>禁止されています。</td>
  </tr>
  <tr>
    <td width="30%">applet</td>
    <td>禁止されています。</td>
  </tr>
  <tr>
    <td width="30%">embed</td>
    <td>禁止されています。</td>
  </tr>
  <tr>
    <td width="30%">form</td>
    <td>許可されています。<a href="https://amp.dev/documentation/components/amp-form">amp-form</a> 拡張子を含める必要があります。</td>
  </tr>
  <tr>
    <td width="30%">input elements</td>
    <td><code>&lt;input[type=image]&gt;</code>、<code>&lt;input[type=button]&gt;</code>、<code>&lt;input[type=password]&gt;</code>、<code>&lt;input[type=file]&gt;</code> などの無効な<a href="https://amp.dev/documentation/components/amp-form#inputs-and-fields">一部の入力タイプを除いて</a>、ほとんどの場合に使用できます。<br/>関連するタグも許可されています：<code>&lt;fieldset&gt;</code>、<code>&lt;label&gt;</code></td>
  </tr>
  <tr>
    <td width="30%">button</td>
    <td>許可されています。</td>
  </tr>
  <tr>
    <td width="30%"><code><a name="cust"></a>style</code></td>
    <td><a href="#boilerplate">amp-boilerplate に必須のスタイルタグ</a>。カスタムスタイルの目的で、head タグに1つの追加スタイルタグを使用できます。このスタイルタグは、<code>amp-custom</code> 属性を持つ必要があります。<a href="#cust">🔗</a></td>
  </tr>
  <tr>
    <td width="30%">link</td>
    <td><a href="http://microformats.org/wiki/existing-rel-values">microformats.org</a> に登録されている <code>rel</code> 値は許可されています。<code>rel</code> 値がホワイトリストにない場合は、issue を送信してください。<code>stylesheet</code>、およびブラウザでの副作用のある <code>preconnect</code>、<code>prerender</code>、<code>prefetch</code> などの値は許可されていません。ホワイトリストのフォントプロバイダからスタイルシートを取得する特殊なケースがあります。</td>
  </tr>
  <tr>
    <td width="30%">meta</td>
    <td><code>http-equiv</code> 属性は特定の許容する値に使用できます。詳細は <a href="https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii">AMP バリデータの仕様</a>を参照してください。</td>
  </tr>
  <tr>
    <td width="30%"><code><a name="ancr"></a>a</code></td>
    <td><code>href</code> 属性値は <code>javascript:</code> で始まってはいけません。設定されている場合、<code>target</code> 属性の値は <code>_blank</code> でなければなりません。それ以外の場合は許可されています。<a href="#ancr">🔗</a></td>
  </tr>
  <tr>
    <td width="30%">svg</td>
    <td>ほとんどの SVG 要素は許可されています。</td>
  </tr>
</table>

バリデーターの実装は上記のタグを取り除いた HTML5 仕様に基づくホワイトリストを使うべきです。[AMP タグ付属文書](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-tag-addendum.md)を参照してください。

### コメント <a name="comments"></a>

条件付き HTML コメントは許可されていません。

### HTML 属性 <a name="html-attributes"></a>

`on` で始まる属性名 (`onclick` や `onmouseover` など) は AMP HTML では許可されていません。リテラル名 `on` (接尾辞なし) の属性は許されます。

xmlns、xml:lang、xml:base、xml:space などの XML 関連の属性は、AMP HTML では許可されていません。

先頭に `i-amp-` が付いた内部 AMP 属性は AMP HTML では許可されていません。

### クラス <a name="classes"></a>

AMP HTML では、内部で AMP クラス名の前に `-amp-` と `i-amp-` を付けることはできません。

接頭辞 `amp-` のクラス名の意味については [AMP のドキュメント](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-css-classes.md) を参照してください。 これらのクラスの使用は許可されており、AMP ランタイムおよび拡張機能の機能の一部をカスタマイズ可能にすることを意図しています。

他のすべての作成したクラス名は AMP HTML マークアップで許可されています。

### ID <a name="ids"></a>

`-amp-` と `i-amp-` をプレフィックスとする内部 AMP ID は AMP HTML では許可されていません。

`amp-access` のような、これらの拡張によって提供される機能との衝突を避けるために、`amp-` と `AMP` ID を使う前に、特定の拡張について AMP のドキュメントを調べてください。

AMP HTML マークアップでは、他のすべての作成した ID が許可されています。

### リンク <a name="links"></a>

`javascript:` スキーマは許可されていません。

### スタイルシート <a name="stylesheets"></a>

主要なセマンティックタグと AMP カスタム要素には、レスポンシブドキュメントの作成を合理的に簡単にするためのデフォルトスタイルが付属しています。デフォルトスタイルを無効にするオプションが将来追加される可能性があります。

#### @ 規則 <a name="-rules"></a>

次の @ 規則はスタイルシートで使用できます。

`@font-face`, `@keyframes`, `@media`, `@page`, `@supports`.

`@import` は許可されません。他のものは将来追加されるかもしれません。

#### 作成したスタイルシート <a name="author-stylesheets"></a>

文書の先頭にある 1 つの `<style amp-custom>` タグまたはインラインスタイルを使ってドキュメントにカスタムスタイルを追加できます。

`@keyframes` ルールは `<style amp-custom>` で許可されています。しかし、それらが多すぎる場合は、追加の `<style amp-keyframes>` タグ内に配置することをお勧めします。これは AMP ドキュメントの最後に配置する必要があります。詳しくは、このドキュメントの [Keyframes スタイルシート](#keyframes-stylesheet) のセクションをご覧ください。

#### セレクタ <a name="selectors"></a>

作成したスタイルシートのセレクタには、次の制限があります。

##### クラス名とタグ名 <a name="class-and-tag-names"></a>

作成したスタイルシートのクラス名、ID、タグ名、属性は文字列 `-amp-` と `i-amp-` で始めることはできません。これらは AMP ランタイムによる内部使用のために予約されています。つまり、ユーザのスタイルシートは `-amp-` クラス、`i-amp-` ID、`i-amp-` タグと属性の CSS セレクタを参照できないということです。これらのクラス、ID、およびタグ/属性名は、作成者によってカスタマイズされることを意図していません。ただし、これらのコンポーネントの仕様で明示的に禁止されていない CSS プロパティについては、作成者が `amp-` クラスおよびタグのスタイルをオーバーライドできます。

クラス名の制限を回避するために属性セレクタを使用しないようにするために、CSS セレクタに `-amp-` と `i-amp-` で始まるトークンと文字列を含めることは一般的に許可されていません。

#### Important <a name="important"></a>

`!important` 修飾子の使用は許可されていません。これは、AMP がその要素サイジング不変量を強制できるようにするために必要な要件です。

#### プロパティ <a name="properties"></a>

AMP は、一般的なブラウザで GPU を高速化できるプロパティの遷移とアニメーションのみを許可します。現在のホワイトリストは、`opacity`、`transform` (`-vendorPrefix-transform`も) です。

以下の例では、`<property>` は上記のホワイトリストに含まれている必要があります。

- `transition <property>` (-vendorPrefix-transition も)
- `@keyframes name { from: {<property>: value} to {<property: value>} }` (`@-vendorPrefix-keyframes` も)

`overflow` (そして `overflow-y`、`overflow-x`) は “auto” や “scroll” のようにはスタイル設定できません。AMP ドキュメント内のユーザ定義要素にスクロールバーを含めることはできません。

#### 最大サイズ <a name="maximum-size"></a>

作成したスタイルシートまたはインラインスタイルが合わせて 75,000 バイトを超える場合は検証エラーです。

### Keyframe スタイルシート <a name="keyframes-stylesheet"></a>

`<style amp-custom>` に加えて、`<style amp-keyframes>` タグを追加することもできます。これは特にキーフレームアニメーションに許可されています。

以下の制限が `<style amp-keyframes>` タグに適用されます:

1.  ドキュメントの `<body>` 要素の最後の子としてのみ配置できます。
2.  `@keyframes`、`@media`、`@supports` のルールとそれらの組み合わせのみが含まれます。
3.  500,000 バイトを超えないようにしてください。

`<style amp-keyframes>` タグが存在するのは、適度に複雑なアニメーションであってもキーフレームの規則はしばしばかさばっているため、CSS の解析が遅くなり、最初のコンテンツの描画が内容豊富なものになるためです。しかし、そのような規則はときに `<style amp-custom>` に課されたサイズ制限を超えます。そのようなキーフレーム宣言をドキュメントの一番下の `<style amp-keyframes>` に置くことで、サイズ制限を超えることができます。キーフレームはレンダリングをブロックしないため、最初のコンテンツペイントをブロックして解析することも避けられます。

例:

[sourcecode:html]

<style amp-keyframes>
@keyframes anim1 {}

@media (min-width: 600px) {
  @keyframes anim1 {}
}
</style>
</body>
[/sourcecode]

### カスタムフォント <a name="custom-fonts"></a>

作成したスタイルシートにはカスタムフォントを含めることができます。サポートされている 2 つの方法はホワイトリストのフォントプロバイダを指すリンクタグと `@font-face` インクルードです。

例:

[sourcecode:html]

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

フォントプロバイダは、CSS のみの統合をサポートし、HTTPS 経由で機能する場合はホワイトリストに登録できます。以下の起源は現在リンクタグを介したフォント提供を許可されています:

- Fonts.com: `https://fast.fonts.net`
- Google Fonts: `https://fonts.googleapis.com`
- Font Awesome: `https://maxcdn.bootstrapcdn.com`
- [Typekit](https://helpx.adobe.com/typekit/using/google-amp.html): `https://use.typekit.net/kitId.css` (適宜 `kitId` を置き換えてください)

実装者注: このリストに追加することは AMP Cache CSP ルールへの変更を必要とします。

作成した自分のカスタム CSS を介して `@font-face` CSS 命令を介してすべてのカスタムフォントを自由に含めることができます。`@font-face` で取り込まれたフォントは HTTP または HTTPS スキームで取り出さなければなりません。

## AMP ランタイム <a name="amp-runtime"></a>

AMP ランタイムは、すべての AMP ドキュメント内で実行される JavaScript の一部です。AMP カスタム要素の実装を提供し、リソースのロードと優先順位付けを管理し、オプションで開発中に使用するための AMP HTML のランタイムバリデータを含みます。

AMP ランタイムは、AMP ドキュメント `<head>` の必須の `<script src="https://cdn.ampproject.org/v0.js"></script>` タグを介してロードされます。

AMP ランタイムは、どのページでも開発モードにすることができます。開発モードでは埋め込みページで AMP 検証がトリガーされ、検証ステータスとエラーが JavaScript 開発者コンソールに送信されます。開発モードはページの URL に `#development=1` を追加することで起動されます。

## リソース <a name="resources"></a>

画像、ビデオ、オーディオファイル、広告などのリソースは、`<amp-img>` などのカスタム要素を通じて AMP HTML ファイルに含める必要があります。それらをロードしてユーザに表示するかどうか、またいつ表示されるかは AMP ランタイムによって決定されるため、これらを「管理対象リソース」と呼びます。

AMP ランタイムの読み込み動作については特に保証はありませんが、一般的にはリソースを素早く読み込むようにしてください。ランタイムは、現在ビューポート内にあるリソースに優先順位を付け、ビューポートへの変更を予測し、それに応じてリソースを事前に読み込もうとします。

AMP ランタイムは、現在ビューポートにないリソースをアンロードするか、iframe などのリソースコンテナを再利用して RAM 全体の消費量を減らすことをいつでも決定できます。

## AMP コンポーネント <a name="amp-components"></a>

AMP HTML は、「AMP コンポーネント」と呼ばれるカスタム要素を使用して、`<img>` や `<video>` などの組み込みリソースローディングタグを置き換えたり、画像ライトボックスやカルーセルなどの複雑なインタラクションを伴う機能を実装します。

サポートされているコンポーネントの詳細については [AMP コンポーネント仕様](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-html-components.md) を参照してください。

サポートされている AMP コンポーネントは 2 種類あります:

1. ビルトイン
2. 拡張

ビルトインコンポーネントは AMP ドキュメント内で常に利用可能で、`<amp-img>` のような専用のカスタム要素を持ちます。拡張コンポーネントはドキュメントに明示的に含まれていなければなりません。

### 共通の属性 <a name="common-attributes"></a>

#### `layout`, `width`, `height`, `media`, `placeholder`, `fallback` <a name="layout-width-height-media-placeholder-fallback"></a>

これらの属性は要素のレイアウトを定義します。
ここでの主な目標は、JavaScript またはリモートリソースがダウンロードされる前に、
要素を表示し、そのスペースを適切に予約できるようにすることです。

レイアウトシステムについての詳細は [AMP レイアウトシステム](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-html-layout.md) を参照してください。

#### `on` <a name="on"></a>

`on` 属性は要素にイベントハンドラをインストールするのに使われます。サポートされているイベントは要素によって異なります。

構文の値は、フォームの単純なドメイン固有の言語です:

[sourcecode:javascript]
eventName:targetId[.methodName[(arg1=value, arg2=value)]]
[/sourcecode]

例: `on="tap:fooId.showLightbox"`

`methodName` が省略された場合、要素に対して定義されていればデフォルトのメソッドが実行されます。
例: `on="tap:fooId"`

ドキュメント化されている場合、一部のアクションは引数を取ります。引数は `key=value` 記法で括弧の間に定義されます。許容される値は:

- 引用符で囲まれていない単純な文字列: `simple-value`;
- 引用符付き文字列: `"string value"` もしくは `'string value'`;
- ブール値: `true` or `false`;
- 数値: `11` or `1.1`.

2 つのイベントをセミコロン `;` で区切ることで、要素上の複数のイベントを待ち受けることができます。

例: `on="submit-success:lightbox1;submit-error:lightbox2"`

[AMP アクションとイベント](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-actions-and-events.md)についての詳細を参照してください。

### 拡張コンポーネント <a name="extended-components"></a>

拡張コンポーネントは、必ずしも AMP ランタイムに付属しているわけではないコンポーネントです。代わりに、それらは明示的にドキュメントに含まれていなければなりません。

拡張コンポーネントはこのようにドキュメントの先頭に `<script>` タグを含めることでロードされます:

[sourcecode:html]

<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>

[/sourcecode]

`<script>` タグは `async` 属性を持ち、要素の名前を参照する `custom-element` 属性を持つ必要があります。

ランタイム実装はこれらの要素のプレースホルダーをレンダリングするために名前を使うかもしれません。

スクリプトの URL は `https://cdn.ampproject.org` で始まり、`/v\d+/[a-z-]+-(latest|\d+|\d+\.\d+)\.js` の非常に厳密なパターンに従う必要があります。

##### URL <a name="url"></a>

拡張コンポーネントの URL は次の形式です:

[sourcecode:html]
https://cdn.ampproject.org/$RUNTIME_VERSION/$ELEMENT_NAME-$ELEMENT_VERSION.js
[/sourcecode]

##### バージョン管理 <a name="versioning"></a>

[AMP バージョン管理ポリシー](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-versioning-policy.md)を参照してください。

### 拡張テンプレート <a name="templates"></a>

テンプレートは、言語固有のテンプレートと提供された JSON データに基づいて HTML コンテンツをレンダリングします。

サポートされているテンプレートの詳細については、[AMP テンプレートの仕様](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-html-templates.md) を参照してください。

拡張テンプレートは AMP ランタイムに同梱されていないため、拡張要素と同様にダウンロードする必要があります。
拡張コンポーネントはこのようにドキュメントの先頭に `<script>` タグを含めることでロードされます:

[sourcecode:html]

<script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"></script>

[/sourcecode]

`<script>` タグは `async` 属性を持っていなければならず、そしてテンプレートの型を参照する `custom-template` 属性を持っていなければなりません。
スクリプトの URL は `https://cdn.ampproject.org` で始まり、
`/v\d+/[a-z-]+-(latest|\d+|\d+\.\d+)\.js`という非常に厳密なパターンに従う必要があります。

テンプレートは次のようにドキュメント内で宣言されています:

[sourcecode:html]
<template type="amp-mustache" id="template1">
Hello {% raw %}{{you}}{% endraw %}!
</template>
[/sourcecode]

`type` 属性は必須であり、宣言された `custom-template` スクリプトを参照しなければなりません。

T`id` 属性はオプションです。個々の AMP 要素はそれら自身のテンプレートを発見します。典型的なシナリオでは、AMP 要素がその子の中から ID で参照される `<template>` を探します。

テンプレート要素内の構文は、特定のテンプレート言語によって異なります。ただし、テンプレート言語は AMP 内で制限される可能性があります。例えば、"template" 要素に従って、すべてのプロダクションは有効な整形式の DOM 上になければなりません。すべてのテンプレート出力は、AMP に準拠した出力を保証するためにサニタイズすることもあります。

拡張テンプレートの構文と制限事項については、[拡張テンプレートのドキュメント](https://github.com/ampproject/amphtml/blob/main/docs/spec/./amp-html-templates.md#templates) を参照してください。

##### URL <a name="url-1"></a>

拡張コンポーネントの URL は次の形式です:

[sourcecode:html]
https://cdn.ampproject.org/$RUNTIME_VERSION/$TEMPLATE_TYPE-$TEMPLATE_VERSION.js
[/sourcecode]

##### バージョン管理 <a name="versioning-1"></a>

詳細については、カスタム要素のバージョン管理を参照してください。

## セキュリティ <a name="security"></a>

AMP HTML ドキュメントは、キーワード `unsafe-inline` と `unsafe-eval` を含まないコンテンツセキュリティポリシーで提供されたときにエラーを引き起こしてはいけません。

AMP HTML フォーマットは、常にそうなるように設計されています。

すべての AMP テンプレート要素は、AMP リポジトリに送信する前に AMP セキュリティレビューを通過する必要があります。

## SVG <a name="svg"></a>

現在、以下の SVG 要素が許可されています:

- 基本: "g", "glyph", "glyphRef", "image", "marker", "metadata", "path", "solidcolor", "svg", "switch", "view"
- 形状: "circle", "ellipse", "line", "polygon", "polyline", "rect"
- テキスト: "text", "textPath", "tref", "tspan"
- レンダリング: "clipPath", "filter", "hkern", "linearGradient", "mask", "pattern", "radialGradient", "vkern"
- 特殊: "defs" (上記のすべての子はここで許可されています), "symbol", "use"
- フィルター: "feColorMatrix", "feComposite", "feGaussianBlur", "feMerge", "feMergeNode", "feOffset", "foreignObject"
- ARIA: "desc", "title"

これらの属性と同様です:

- "xlink:href": "#" で始まる URI のみが許可されます
- "style"

## AMP ドキュメントディスカバリー <a name="amp-document-discovery"></a>

以下で説明されるメカニズムは、AMP バージョンが正規ドキュメント用に存在するかどうかをソフトウェアが発見するための標準化された方法を提供します。

正規ドキュメントの代替表現である AMP 文書が存在する場合、正規ドキュメントは ["amphtml" リレーション](http://microformats.org/wiki/existing-rel-values#HTML5_link_type_extensions)を持つ `link` タグを介して AMP ドキュメントを指すべきです。

例:

[sourcecode:html]

<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

AMP ドキュメント自体は、"canonical" リレーションを持つ `link` タグを介してその正規ドキュメントを指し示すことが期待されます。

例:

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/canonical/document.html">
[/sourcecode]

(単一のリソースが同時に AMP *と*標準ドキュメントである場合、標準リレーションはそれ自体を指す必要があります。つまり "amphtml" リレーションは必要ありません。)

AMP を使用するシステムとの最も広い互換性のために、JavaScript を実行せずに "amphtml" リレーションを参照可能であるべきであることに注意してください。
(つまり、タグは素の HTML 内に存在し、JavaScript を介して挿入されるべきではありません。)
