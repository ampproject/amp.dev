---
formats:
  - ウェブサイト
'$title': ページを検出可能にする
'$titles':
  teaser: ページを検出可能にする
$order: 5
description: ニュース記事のように、同じページに対して AMP バージョンと非 AMP バージョンの両方のページを用意する場合を考えましょう。たとえば、Google 検索 ...
teaser:
  icon: 検出
  text: 検索エンジンがどのようにしてサイトの AMP バージョンを検出しているのかを学習します。
  label: もっと詳しく知る
---

たとえばニュース記事などで、同じページの非 AMP バージョンと AMP バージョンの両方を用意する場合があります。Google 検索がそのページの非 AMP バージョンを検出した場合、AMP バージョンがあることをどのように認識するのでしょうか。この問題について検討してみましょう。

### &lt;link&gt; でページをリンクする

この問題を解決するには、`<head>` 内の `<link>` タグを使用して、AMP ページに関する情報と非 AMP ページに関する情報を互いのページに追加します。

非 AMP ページには次のタグを追加します。

[sourcecode:html]

<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

そして AMP ページには次のタグを追加します。

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### 一方のページだけ存在する場合

一方のページだけが存在し、そのページが AMP ページである場合でも、そのページに正規のリンク、つまりそのページ自体を指すリンクを追加する必要があります。

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"] <strong>参考情報 –</strong> Google が AMP ページを検出する方法について詳しくは、「[Google 検索での AMP ページに関するガイドライン](https://support.google.com/webmasters/answer/6340290)」をご確認ください。 [/tip]

## 追加のメタデータでサードパーティプラットフォームと統合する <a name="integrate-with-third-party-platforms-through-additional-metadata"></a>

サードパーティのサイト（AMP ページを埋め込んだサイトや、AMP ページへのリンクが含まれるサイトなど）では、あなたのページが AMP ページであること以外に、ページに関する詳しい情報が必要となる場合があります。たとえば、「ニュース記事かどうか」、「動画かどうか」、「スクリーンショットや短い説明があるか」などのようなページに関する情報が、プラットフォームから求められます。

これは AMP ページだけでなく、すべてのウェブページに当てはまります。このようなメタデータを任意とするプラットフォームもありますが、必須である場合、**適切なメタデータを提供しなければ、そのプラットフォームでコンテンツへのリンクは表示されません**。コンテンツを表示するプラットフォームで必要とされる適切なメタデータを、必ず提供するようにしてください。

### Schema.org を使用して多くの検索エンジンに対応する

[Schema.org](http://schema.org/) では、あらゆる種類のコンテンツにメタデータを追加するためのオープンな構文を提供しています。AMP を検索エンジンに対応させるためには、コンテンツの種類（「ニュース記事」など）、見出し、公開日、関連するプレビュー画像などのプロパティが有用な情報となります。

例:

[sourcecode:html]

<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": "http://cdn.ampproject.org/article-metadata.html",
    "headline": "Lorem Ipsum",
    "datePublished": "1907-05-05T12:02:41Z",
    "dateModified": "1907-05-05T12:02:41Z",
    "description": "The Catiline Orations continue to beguile engineers and designers alike -- but can it stand the test of time?",
    "author": {
      "@type": "Person",
      "name": "Jordan M Adler"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Google",
      "logo": {
        "@type": "ImageObject",
        "url": "http://cdn.ampproject.org/logo.jpg",
        "width": 600,
        "height": 60
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "http://cdn.ampproject.org/leader.jpg",
      "height": 2000,
      "width": 800
    }
  }
</script>

[/sourcecode]

[ampproject の examples フォルダ](https://github.com/ampproject/amphtml/tree/main/examples/metadata-examples)には、代替の HTML 属性構文など、このほかにもサンプルが用意されています。

[tip type="read-on"] 構造化データについて詳しくは、次の関連資料をご覧ください。

- [コンテンツを構造化して Google 検索のリッチリザルトに表示されるようにする方法](https://developers.google.com/search/docs/guides/mark-up-content)（トップニュースのカルーセルやレシピカードなど）をご確認ください。
- [Google 構造化データ テストツール](https://developers.google.com/structured-data/testing-tool/)を使用して構造化データをテストする方法をご確認ください。 [/tip]

### より多くのプラットフォームに対応するその他のメタデータ

コンテンツを検出、配信可能にするその他の方法については、[Web Fundamentals の「ソーシャルディスカバリー」](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/)をご覧ください。
