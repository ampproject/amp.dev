---
"$title": スターターコードの確認
"$order": '1'
description: コードの追加を開始する前に、サンプルの article.amp.html ページを確認してみましょう。次のような内容です。 ...
---

コードの追加を開始する前に、サンプルの [article.amp.html](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html) ページを確認してみましょう。次のような内容です。

```html
<!DOCTYPE html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />

    <link rel="canonical" href="/article.html" />
    <link rel="shortcut icon" href="amp_favicon.png" />

    <title>News Article</title>

    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <style amp-custom>
      body {
        width: auto;
        margin: 0;
        padding: 0;
      }

      header {
        background: tomato;
        color: white;
        font-size: 2em;
        text-align: center;
      }

      h1 {
        margin: 0;
        padding: 0.5em;
        background: white;
        box-shadow: 0px 3px 5px grey;
      }

      p {
        padding: 0.5em;
        margin: 0.5em;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
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
  </head>
  <body>
    <header>News Site</header>
    <article>
      <h1>Article Name</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas
        tortor sapien, non tristique ligula accumsan eu.
      </p>

      <amp-img
        src="mountains.jpg"
        layout="responsive"
        width="266"
        height="150"
      ></amp-img>
    </article>
  </body>
</html>
```

これは、[AMP 検証](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)と [schema.org](http://schema.org/) の構造化データ検証の両方を渡す、単純な AMP ページです。ニュースのウェブサイトにこのページを掲載した場合、ユーザーは検索エンジンの結果ページのリッチ エクスペリエンス（Google 検索のトップニュース カルーセルなど）からこのページを見つけることができます。

## AMP Validator を有効にする

ページを変更する前に、有効な AMP HTML を扱っていることがわかるように、[AMP Validator](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) を有効にしましょう。URL に次のフラグメント識別子を**追加**します。

```text
# development=1

```

例:

```text
http://localhost:8000/article.amp.html#development=1
```

Chrome（または任意のブラウザ）で [Developer Console](https://developer.chrome.com/devtools/docs/console) を開いて、AMP エラーがないことを確認します。

[tip] AMP ページを検証するには、他のツールも使用できます。次のようなツールがあります。

- [AMP 検証ツール拡張機能（Chrome 用）](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc)
- [AMP 検証ツール拡張機能（Opera 用）](https://addons.opera.com/en-gb/extensions/details/amp-validator/)
- [AMP Validator ウェブインターフェース](https://validator.ampproject.org/)
- ... その他

詳しくは、[AMP ページの検証](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md)のガイドをご覧ください。 [/tip]

{{ image('/static/img/docs/tutorials/tut-advanced-start-nexus5.png', 428, 801, align='right third', caption='Nexus 5X 端末でのシミュレーション') }}

## モバイルエクスペリエンスのシミュレーション

このページはモバイル端末向けに設計されているので、ブラウザの開発者ツールでモバイル端末での表示を**シミュレーション**してみましょう。たとえば、Chrome デベロッパー ツールでは、モバイル端末アイコンをクリックし、メニューからモバイル端末を選択します。

これで、ページの操作を開始できるようになりました。AMP コンポーネントをページに追加してみましょう。
