---
$title: ページの検出、配信の準備をする
---

ニュース記事のように、同じページに対して AMP 版と非 AMP 版のページをそれぞれ用意したい場合を考えましょう。たとえば Google 検索で、あるページの非 AMP 版を検出した場合、そのページには AMP 版も存在することを知らせるにはどうしたらよいでしょうか。

## &lt;link> を使ってページをリンクする

この課題を解決するには、`<head>` 内の `<link>` タグという形で、AMP ページの情報を非 AMP ページに追加します。同様に、非 AMP ページの情報は AMP ページに追加します。

以下を非 AMP ページに追加します。

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

また、以下を AMP ページに追加します。

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## 1 ページしかない場合

1 ページしか存在せず、それが AMP ページである場合も、canonical リンクを追加して単純に自身を指定する必要があります。

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/preview_and_validate.md', locale=doc.locale).url.path}}"><span class="arrow-prev">前へ</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/publish.md', locale=doc.locale).url.path}}"><span class="arrow-next">次へ</span></a>
</div>
