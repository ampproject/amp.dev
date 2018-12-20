---
$title: 設定
---

## 必要な準備

このチュートリアルを**始める前に**、次のものが必要となります。

- HTML、CSS、JavaScript の基本的な知識
- JavaScript コンソールを確認できる任意のブラウザ
- 任意のテキスト エディタ

## 開発環境を設定する

### ステップ 1. コードをダウンロードする

チュートリアルのサンプルコードを [ZIP ファイル](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/archive/master.zip)として、または git コマンドを使ってダウンロードします。

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-foundations.git
```

ダウンロードしたアーカイブ ファイルを解凍し（必要な場合）、パソコンのコマンドラインを使ってプロジェクト ディレクトリに移動します。

```shell
cd accelerated-mobile-pages-foundations
```

このプロジェクト ディレクトリには、複数のサンプル リソース ファイルと、開始ページの [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html) が含まれています。

### ステップ 2. サンプルページを実行する

サンプルページをテストするには、ウェブブラウザからファイルにアクセスする必要があります。テストを目的として一時的なローカル ウェブサーバーを作成するには、複数の方法があります。次のような選択肢がありますので、最適なものを選んでください。

- [Google Chrome アプリの「Web Server for Chrome」](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [ローカル HTTP Python サーバー](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

[tip type="note"]
本番環境では HTTPS を使用することを強くおすすめします。HTTPS には SEO など、セキュリティ以外のメリットもあります。このトピックについては、こちらの [Google ウェブマスター向け公式ブログの投稿](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html)をご覧ください。
[/tip]

ローカル ウェブサーバーを設定したら、ブラウザで[こちらの URL](http://localhost:8000/article.html) からサンプルの記事にアクセスします。

```text
http://localhost:8000/article.html
```

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">前へ</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/building-page.md', locale=doc.locale).url.path}}"><span class="arrow-next">次へ</span></a>
</div>
