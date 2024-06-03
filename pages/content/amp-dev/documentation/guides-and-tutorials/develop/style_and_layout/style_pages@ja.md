---
$title: サポートされる CSS
---

他のウェブページと同様に、AMP ページは CSS でスタイル設定されますが、外部のスタイルシートを参照することはできません（[カスタム フォント](#the-custom-fonts-exception)を除く）。また、パフォーマンス上の理由から特定のスタイルが許可されていません。たとえば、インラインのスタイル属性は使用できません。

すべてのスタイルはドキュメントの先頭で指定する必要があります（[ページへのスタイルの追加に関する記事](index.md#add-styles-to-a-page) をご覧ください）。ただし、CSS プリプロセッサとテンプレートを使用して静的なページを作成し、コンテンツを管理しやすくすることができます。

注: AMP コンポーネントには、レスポンシブなページを簡単に作成できるように、デフォルトのスタイルが用意されています。これらのスタイルは [`amp.css`](https://github.com/ampproject/amphtml/blob/main/css/amp.css) で定義されています。

## 許可されないスタイル

次のスタイルは AMP ページでは許可されません。

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">許可されないスタイル</th>
      <th data-th="Description">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Banned style">インラインのスタイル属性</td>
      <td data-th="Description"> すべてのスタイルはページの <code>&lt;head&gt;</code> で <code>&lt;style amp-custom&gt;</code> タグ内に定義する必要があります。</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>!important</code> 修飾子</td>
      <td data-th="Description">この用法は許可されていません。これは AMP で要素のサイズ設定ルールを有効にするための必須要件です。</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>&lt;link rel="stylesheet"&gt;</code></td>
      <td data-th="Description"><a href="#the-custom-fonts-exception">カスタム フォント</a>を除いて許可されていません。</td>
    </tr>
    <tr>
      <td data-th="Banned style"><code>-amp-</code> クラス名、<code>i-amp-</code> タグ名</td>
      <td data-th="Description"> 作成者のスタイルシートで、クラス名を文字列 <code>-amp-</code> で始めることはできません。この文字列は AMP ランタイムが内部で使用する予約文字列です。また、ユーザーのスタイルシートで <code>-amp-</code> クラスや <code>i-amp</code> タグの CSS セレクタを参照することはできません。</td>
    </tr>
  </tbody>
</table>

## 制約のあるスタイル

次のスタイルは許可されていますが、サポートする値について制約があります。

<table>
  <thead>
    <tr>
      <th class="col-thirty" data-th="Banned style">制約のあるスタイル</th>
      <th data-th="Description">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Restricted style"><code>transition</code> プロパティ</td>
      <td data-th="Description">GPU アクセラレーションが可能なプロパティのみ（現在は<code> opacity</code> 、<code>transform</code>  、<code>-vendorPrefix-transform</code>）。</td>
    </tr>
    <tr>
      <td data-th="Restricted style"><code>@keyframes {...}</code></td>
      <td data-th="Description"> GPU アクセラレーションが可能なプロパティのみ（現在は<code> opacity</code>、<code>transform</code>、<code>-vendorPrefix-transform</code>）。</td>
    </tr>
  </tbody>
</table>

## カスタム フォントの例外 <a name="the-custom-fonts-exception"></a>

AMP ページでは外部のスタイルシートを使用できませんが、カスタム フォントは例外です。

詳細情報: 詳しくは、[AMP のカスタム フォント](custom_fonts.md) をご覧ください。

## CSS プリプロセッサを使用する <a name="using-css-preprocessors"></a>

プリプロセッサで生成される出力は、他のウェブページと同様に AMP でも機能します。たとえば、[amp.dev](https://amp.dev/)
のサイトでは [Sass](http://sass-lang.com/) を使用しています（[Grow](http://grow.io/) を使用して、 [amp.dev](https://amp.dev/) サイトを構成する静的な AMP ページを作成しています）。

プリプロセッサを使用する場合は、追加する対象に特に注意を払い、ページで使用するものだけを読み込むようにしてください。たとえば、[head.html](https://github.com/ampproject/docs/blob/master/views/partials/head.html)
には、必要なすべての AMP マークアップと、`*.scss` ソースファイルからのインラインの CSS を含めます。また、サイトの多くのページで埋め込みの YouTube 動画を使用できるように、[`amp-youtube`](../../../../documentation/components/reference/amp-youtube.md) のカスタム要素のスクリプトも指定します。

[sourcecode:html]{% raw %}

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <meta property="og:description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">
  <meta name="description" content="{% if doc.description %}{{doc.description}} – {% endif %}AMP Project">

  <title>AMP Project</title>
  <link rel="icon" href="/static/img/amp_favicon.png">
  <link rel="canonical" href="{{doc.url}}">
  <link href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700" rel="stylesheet">
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
{% endraw %}[/sourcecode]

上記のコードがフォーマットされた AMP HTML にどのように変換されるか確認するには、[amp.dev](https://amp.dev/) で任意のページのソースを表示してください（Chrome では、右クリックして `View Page Source` をクリックします）。
