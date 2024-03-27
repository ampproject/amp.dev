---
'$title': 通常の HTML ページの作成
$order: 1
description: プロジェクトディレクトリには、article.html というファイルが保存されています。このファイルは、これから作成しようとしている AMP ページの元になるニュース記事です。...
---

プロジェクトディレクトリには、[`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html) というファイルが保存されています。このファイルは、これから作成しようとしている AMP ページの元になるニュース記事です。

1. `article.html` ファイルに記述されているすべてのコードを**コピー**して、新しいファイルに貼り付けます。
2. 新しいファイルを `article.amp.html` として**保存**します。

[tip type="note"] <strong>注意:</strong> AMP ファイルの名前は、必ずしも `.amp.html` とする必要はありません。実際、AMP ファイルには任意の拡張子を設定できます。AMP ページを正規バージョンと区別する方法としては、URL にパラメータを追加するのが一般的です。たとえば、`http://publisher.com/article.html?amp` のようにします。 [/tip]

`article.amp.html` ファイルは、次のような内容になっているはずです。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>News Article</title>

    <link href="base.css" rel="stylesheet" />

    <script type="text/javascript" src="base.js"></script>
  </head>
  <body>
    <header>News Site</header>
    <article>
      <h1>Article Name</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas
        tortor sapien, non tristique ligula accumsan eu.
      </p>
    </article>
    <img src="mountains.jpg" />
  </body>
</html>
```

ページの内容は、静的なニュース記事で一般的な要素（CSS、JavaScript、画像タグ）を使用しつつ、意図的にシンプルにしています。

現段階では、AMP バージョンの記事は元の記事の単なるコピーにすぎません。これを正式な AMP に変換してみましょう。

まず、AMP ライブラリ ファイルを追加します。これだけで新しいファイルを有効な AMP ページに変換できるわけではありませんが、以降で見ていくように、AMP ライブラリを使用すると修正が必要な箇所を簡単に特定できるようになります。

AMP ライブラリを追加するには、`<head>` タグの末尾に次の行を**追加**します。

```html
<script async src="https://ampjs.org/v0.js"></script>
```

[http://localhost:8000/article.amp.html](http://localhost:8000/article.amp.html) にある新しい `article.amp.html` ページをブラウザで**読み込み**、Chrome（または任意のブラウザ）で[開発者コンソール](https://developer.chrome.com/devtools/docs/console)を開きます。

開発者コンソールの［Console］タブで JavaScript の出力を確認すると、次のログエントリを確認できるはずです。

```text
Powered by AMP ⚡ HTML
```

AMP ライブラリに含まれる [AMP Validator](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) を使用すると、有効な AMP ドキュメントへの変換が行われない原因となっている箇所を確認できます。AMP Validator を**有効**にするため、次のフラグメント識別子をドキュメント URL に追加します。

```text
#development=1
```

例:

```text
http://localhost:8000/article.amp.html#development=1
```

次のような複数の検証エラーが開発者コンソールに表示されるはずです（ブラウザでページを手動更新することが必要な場合もあります）。

{{ image('/static/img/docs/tutorials/tut-convert-html-validation-errors.png', 905, 427, align='', caption='サンプルで発生した AMP 検証エラー') }}

ページを有効な AMP ドキュメントに変換するには、これらのエラーをすべて修正する必要があります。この Codelab では、この修正作業を行っていきます。

ただしその前に、ブラウザのデベロッパー ツールを使用して、実際にモバイル向けニュース記事が表示されるモバイル端末での動作を**シミュレート**してみましょう。たとえば、Chrome デベロッパー ツールでモバイル端末アイコンをクリックし、メニューからモバイル端末を選択します。

次のように、シミュレートされたモバイル端末の解像度で記事が表示されます。

{{ image('/static/img/docs/tutorials/tut-convert-html-nexus5.png', 436, 812, align='third center', caption='AMP ページのモバイル端末シミュレーション') }}

これで、修正作業を行う準備が整いました。検証エラーを 1 つずつ見ていきながら、AMP との関連性を確認していきましょう。
