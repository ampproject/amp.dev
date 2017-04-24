---
$title: サポートされる CSS
---

他のウェブページと同様に、AMP ページは CSS でスタイル設定されますが、（[カスタム フォント](#カスタム-フォントの例外)を除いて）外部のスタイルシートを参照することはできません。また、パフォーマンス上の理由から特定のスタイルが許可されていません。たとえば、インラインのスタイル属性は使用できません。

すべてのスタイルはドキュメントの先頭で指定する必要があります（[ページへのスタイルの追加に関する記事](/ja/docs/guides/debug/validate.html)をご覧ください）。ただし、CSS プリプロセッサとテンプレートを使用して静的なページを作成し、コンテンツを管理しやすくすることもできます。

**注:** AMP コンポーネントには、レスポンシブなページを簡単に作成できるように、デフォルトのスタイルが用意されています。これらのスタイルは [`amp.css`](https://github.com/ampproject/amphtml/blob/master/css/amp.css) で定義されています。

[TOC]

## CSS プリプロセッサを使用する

プリプロセッサで生成される出力は、他のウェブページと同様に AMP でも機能します。たとえば、[ampproject.org](https://www.ampproject.org/) のサイトでは [Sass](http://sass-lang.com/) を使用しています（[ampproject.org](https://www.ampproject.org/) サイトを構成する静的な AMP ページの作成には [Grow](http://grow.io/)</a> を使用しています）。

プリプロセッサを使用する場合は、追加する対象に特別な注意を払い、ページで使用するものだけを読み込むようにしてください。たとえば、[head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html) には、必要なすべての AMP マークアップと、`*.scss` ソースファイルからのインラインの CSS を含めます。また、サイトの多くのページで埋め込みの YouTube 動画を使用できるように、[`amp-youtube`](/docs/reference/extended/amp-youtube.html) のカスタム要素のスクリプトも指定します。

[sourcecode:html] {% raw %}
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <meta content="IE=Edge" http-equiv="X-UA-Compatible">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}Accelerated Mobile Pages Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}Accelerated Mobile Pages Project">

  <title>Accelerated Mobile Pages Project</title>
  <link rel="shortcut icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="https://www.ampproject.org{{doc.url.path}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet" type="text/css">
  <style amp-custom>
  {% include "/assets/css/main.min.css" %}
  </style>

  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
  <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
  <script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"></script>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>
</head>
{% endraw %} [/sourcecode]

上記のコードがフォーマットされた AMP HTML にどのように変換されるか確認するには、[ampproject.org](https://www.ampproject.org/) で任意のページのソースを表示してください（Chrome では、右クリックして [`ページのソースを表示`] をクリックします）。

## 許可されないスタイル

次のスタイルは AMP ページでは許可されません。

<table>
  <thead>
    <tr>
      <th data-th="Banned style">禁止スタイル</th>
      <th data-th="Description">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">インラインのスタイル属性</td>
      <td data-th="Description">すべてのスタイルはページの <code>&lt;head&gt;</code> で <code>&lt;style amp-custom&gt;</code> タグ内に定義する必要があります。</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>!</code>important 修飾子</td>
      <td data-th="Description">この用法は許可されていません。これは AMP で要素のサイズ設定ルールを有効にするための必須要件です。</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel=”stylesheet”&gt;</code></td>
      <td data-th="Description"><a href="#カスタム-フォントの例外">カスタム フォント</a> を除いて許可されていません。</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>*</code>（ユニバーサル セレクタ）</td>
      <td data-th="Description">パフォーマンスに悪影響を与えることがあります。他のセレクタの制限を回避するために使用できます。</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>:not()</code></td>
      <td data-th="Description">ユニバーサル セレクタをシミュレートするために使用できます。</td>
    </tr>
    <tr>
      <td data-th="Banned style">疑似セレクタ、疑似クラス、疑似要素</td>
      <td data-th="Description">疑似セレクタ、疑似クラス、疑似要素は、<code>amp-</code> 以外で始まるタグ名を含むセレクタでのみ許可されています（このタグ名を amp- で始めることはできません）。許可される例: <code>a:hover、div:last-of-type</code>、許可されない例: <code>amp-img:hover、amp-img:last-of-type</code></td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>-amp-</code> クラス名、<code>i-amp-</code> タグ名</td>
      <td data-th="Description">作成者のスタイルシートで、クラス名を文字列 <code>-amp-</code> で始めることはできません。この文字列は AMP ランタイムが内部で使用する予約文字列です。また、ユーザーのスタイルシートで <code>-amp-</code> クラスや <code>i-amp</code> タグの CSS セレクタを参照することはできません。</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>behavior</code>, <code>-moz-binding</code></td>
      <td data-th="Description">これらのプロパティはセキュリティ上の理由から許可されていません。</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>filter</code></td>
      <td data-th="Description">パフォーマンスに関する問題があるためブラックリストに登録されています。</td>
    </tr>
  </tbody>
</table>

## ホワイトリストに登録された遷移とアニメーションのプロパティ

AMP では、一般的なブラウザで GPU アクセラレーションが可能なプロパティの遷移やアニメーションのみに対応しています。AMP プロジェクトは現在、`opacity`、`transform`、`-vendorPrefix-transform` をホワイトリストに登録しています。

次の例では、`<property>` がホワイトリストに登録されている必要があります。

* `transition <property> (Also -vendorPrefix-transition)`
* @ `@keyframes name { from: {<property>: value} to {<property: value>} } (also @-vendorPrefix-keyframes)`

`overflow` プロパティ（および `overflow-y`、`overflow-x`）を “auto” または “scroll” として設定することはできません。AMP ドキュメントでは、ユーザー定義の要素でスクロールバーを使用できません。

## カスタム フォントの例外

AMP ページでは外部のスタイルシートを使用できませんが、カスタム フォントは例外です。カスタム フォントを参照するには、ホワイトリストに登録されているフォント プロバイダを指すリンクタグを使用する方法と、`@font-face` を指定する方法の 2 通りがサポートされています。

フォント プロバイダは、CSS のみの統合に対応し、HTTPS 経由で配信している場合にのみ、ホワイトリストに登録されます。現在は、次のプロバイダがホワイトリストに登録されており、リンクタグ経由でのフォント配信が許可されています。

* [https://fast.fonts.net](https://fast.fonts.net)
* [https://fonts.googleapis.com](https://fonts.googleapis.com)

ホワイトリストに登録されたフォント プロバイダ Google Fonts を指すリンクタグの例は次のとおりです。

[sourcecode:html]
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

また、[`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) を使用することもできます。`@font-face` を介して追加されるフォントは、HTTP または HTTPS スキームで取得する必要があります。
