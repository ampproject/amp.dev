---
$title: ページを検出可能にする
---

[TOC]

たとえばニュース記事などで、同じページの非 AMP バージョンと AMP バージョンの両方を用意したい場合があります。Google 検索がそのページの非 AMP バージョンを検出した場合、AMP バージョンがあることをどのように認識するのでしょうか。この問題について検討してみましょう。

### `link` でページをリンクする

この問題を解決するには、AMP ページに関する情報を非 AMP ページに（または、非 AMP ページに関する情報を AMP ページに）、`<head>` 内の `<link>` タグの形で追加します。

非 AMP ページには次のタグを追加します。

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

AMP ページには次のタグを追加します。

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### 一方のページだけ存在する場合

一方のページだけ存在し、そのページが AMP ページである場合は、正規のリンクを追加する必要があります。単にそのページ自体を指すリンクになります。

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

## 追加のメタデータでサードパーティ プラットフォームと統合する

サードパーティのサイト（AMP ページを埋め込んでいるサイトや、AMP ページへのリンクが含まれるサイトなど）では、ページが AMP ページであること以外に、ページに関する詳しい情報を知る必要がある場合があります。プラットフォームがページについて求めるのは、「ニュース記事かどうか」、「動画かどうか」、「スクリーンショットや短い説明があるか」などの情報です。

これは AMP ページだけでなく、すべてのウェブページに関連する情報です。プラットフォームによって、このメタデータは追加情報の場合もあれば、必須の場合もあります。つまり、**適切なメタデータが含まれない場合、そのコンテンツへのリンクは表示されなくなります。**コンテンツを表示したいプラットフォームの正しいメタデータを指定するようにしてください。

### Schema.org を使用して多くの検索エンジンに対応する

[Schema.org](http://schema.org/) では、あらゆるコンテンツにメタデータを追加するためのオープンな構文を提供しています。AMP の場合、コンテンツの種類（「ニュース記事」など）、見出し、公開日、関連するプレビュー画像などのプロパティをコンテキストに含めることが考えられます。

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

[ampproject の examples フォルダ](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples)には、これ以外にもサンプルがあります（代わりの HTML 属性構文など）。

注: [Google 検索のニュース カルーセル](https://g.co/ampdemo)のデモ（モバイル用）にコンテンツを表示するには、この Schema.org の定義は必須です。[AMP 対応のトップニュース](https://developers.google.com/structured-data/carousels/top-stories)と[構造化データ テストツール](https://developers.google.com/structured-data/testing-tool/)もご覧ください。

### より多くのプラットフォームに対応するその他のメタデータ

コンテンツが検出、配信されるようにするその他の方法について詳しくは、[ウェブの基礎サイト内のソーシャルによる検出ガイド](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/)をご覧ください。
