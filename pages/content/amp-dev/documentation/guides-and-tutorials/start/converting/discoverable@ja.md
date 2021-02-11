---
'$title': Making your page discoverable
$order: 3
description: 検索エンジンが通常の 正式な HTML ドキュメントと AMP ドキュメントの関係を理解するように、相互リンクをセットアップする必要があります。
---

AMP 形式のニュース記事を作成したので、ユーザーがコンテンツを検索して見つけられるようにしましょう。

## AMP コンテンツのリンク

ウェブサイトは、全体が AMP ページで構成される場合、一部が AMP ページで構成される場合、そして AMP ページを使用せずに構成される場合があります。ここでは、ウェブサイトの構造に AMP を組み込む方法について説明します。

複数のページで同一のコンテンツを使用している場合、優先するページを指定するための方法としては、標準の HTML ページに正規ページとのリンクを追加する方法がよく使用されます。

ウェブサイトに AMP を追加する場合、従来からある非 AMP HTML ページの AMP バージョンを作成するという手法がよく用いられます。一般的に、両方のバージョンのコンテンツ（記事のテキストなど）は同じですが、体裁は異なることがあります。このシナリオでは、従来からある HTML ページを「正規」ページとして扱い、そうした HTML ページと AMP ページをペアに設定する必要があります。

可能であれば、AMP を他の JavaScript ライブラリと同じように使用してウェブサイトを構築してください。そうすれば、正規ページとのリンクについて意識する必要がなくなります。AMP を使用してウェブサイト全体を構築すると保守の負担が大幅に軽減されます。

{{ image('/static/img/docs/tutorials/tut-convert-html-linking.png', 751, 500, align='center ninety', caption='AMP コンテンツのリンク') }}

ここでは、AMP バージョンと非 AMP バージョンのページがあるケースに焦点を当てて説明します。このチュートリアルのウェブサイトにはニュース記事が 1 つ含まれており、この記事には非 AMP の HTML ページ（`article.html`）と AMP バージョンのページ（`article.amp.html`）があります。双方のページに `link` タグを追加して、ページ同士をペア設定します。

AMP ドキュメントの側には `<head>` に正規ページを指す下記の link タグがすでに追加されているため、最初の手順は完了しています。

```html
<link rel="canonical" href="/article.html" />
```

次の手順として、正規の記事を AMP ページにリンクします。具体的には、正規の記事の `<head>` セクションに `<link rel="amphtml">` タグを追加します。

`article.html` ファイルの `<head>` セクションに以下のコードを**追加**します。

```html
<link rel="amphtml" href="/article.amp.html" />
```

以下の図は、双方のファイルの link タグの方向を示したものです。

{{ image('/static/img/docs/tutorials/tut-convert-html-link-between.png', 564, 238, align='ninety center', caption='AMP コンテンツのリンク') }}

標準 HTML の正規ドキュメントと AMP ドキュメントの関係を検索エンジンに認識させるために、この双方向のリンクの設定が必要となります。リンクが設定されていない場合、記事が標準 HTML ドキュメントの「AMP バージョン」であることをクローラが認識できない可能性があります。こうしたリンクを明示的に設定することで、不明確さをなくすことができます。

## 構造化データの追加

[schema.org](http://schema.org/) の構造化データは、有効な AMP ページを作成するために必須のものではありませんが、Google 検索などの一部のプラットフォームでは、トップニュースカルーセルなどの特定の機能の提供に構造化データを必要とします。通常は、構造化データを含めることをおすすめします。構造化データがあれば、検索エンジンにウェブページが正しく認識されて、検索エンジンの結果ページ（リッチスニペットなど）にコンテンツが適切に表示されるようになります。構造化データは、AMP ページの `<head>` タグ内に `application/ld+json` タイプの script タグとして追加します。

このチュートリアルのニュース記事では、AMP ドキュメントの `<head>` セクションの一番下に、以下の構造化データを**追加**します。

```html
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://example.com/my-article.html"
    },
    "headline": "My First AMP Article",
    "image": {
      "@type": "ImageObject",
      "url": "https://example.com/article_thumbnail1.jpg",
      "height": 800,
      "width": 800
    },
    "datePublished": "2015-02-05T08:00:00+08:00",
    "dateModified": "2015-02-05T09:20:00+08:00",
    "author": {
      "@type": "Person",
      "name": "John Doe"
    },
    "publisher": {
      "@type": "Organization",
      "name": "⚡ AMP Times",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/amptimes_logo.jpg",
        "width": 600,
        "height": 60
      }
    },
    "description": "My first experience in an AMPlified world"
  }
</script>
```

[tip type="note"] <strong>注意: </strong> 2 つのコンテンツは常に同じである必要があります。ニュース記事の場合は、「NewsArticle」タイプを指定します。headline は、記事のタイトルと一致している必要があります。画像オブジェクトには、記事のヒーロー画像を指定します。 [/tip]

ブラウザでページを**再読み込み**し、AMP 検証エラーが発生していないことを確認します。

[tip type="note"] 検索エンジンやソーシャルメディアネットワークでは、schema.org の構造化データ以外の形式もサポートされています。詳しくは、サポートされている形式のドキュメントをご覧ください。

- [Twitter カードのメタタグ](https://dev.twitter.com/cards/overview)
- [Facebook Open Graph メタタグ](https://developers.facebook.com/docs/sharing/webmasters) [/tip]

### 構造化データの検証

構造化データが正しいことを確認するために、さまざまなプラットフォームが検証ツールを提供しています。このチュートリアルでは、[Google 構造化データ テストツール](https://developers.google.com/structured-data/testing-tool/)を使用して構造化データを検証します。

1. ブラウザ ウィンドウで [Google 構造化データ テストツール](https://developers.google.com/structured-data/testing-tool/)を開きます。
2. ［**コードスニペット**］タブを選択します。
3. AMP ページのソースコード全体をコピーして、テストツールのテキストエディタパネルに貼り付けます。
4. ［**テストを実行**］をクリックします。

構造化データに問題がなければ、「**エラーなし**」、「**警告なし**」と表示されます。

[tip type="read-on"] <strong>参考情報:</strong> ページの検出可能性について詳しくは、<a>ページを検出可能にする</a>に関するガイドをご覧ください。[/tip]

おつかれさまでした。これで AMP のニュース記事は完成です。
