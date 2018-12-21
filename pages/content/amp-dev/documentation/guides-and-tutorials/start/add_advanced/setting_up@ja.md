---
$title: 設定
---

## 必要な準備

このチュートリアルを**始める前に**、次のものが必要となります。

- HTML、CSS、JavaScript の基本的な知識
- AMP の中心的な概念についての基本的な理解（「[HTML を AMP に変換する]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/index.md', locale=doc.locale).url.path}})」チュートリアルをご覧ください）
- JavaScript コンソールを確認できる任意のブラウザ
- 任意のテキスト エディタ

## 開発環境を設定する

### ステップ 1. コードをダウンロードする

チュートリアルのサンプルコードを [ZIP ファイル](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/archive/master.zip)として、または git コマンドを使ってダウンロードします。

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-advanced.git
```

ダウンロードしたアーカイブ ファイルを解凍し（必要な場合）、パソコンのコマンドラインを使ってプロジェクト ディレクトリに移動します。

```shell
cd accelerated-mobile-pages-advanced
```

このプロジェクト ディレクトリには、複数のサンプル リソース ファイルと、開始ページの [`article.amp.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html) が含まれています。

### ステップ 2. サンプルページを実行する

サンプルの AMP ページをテストするには、ウェブブラウザからファイルにアクセスする必要があります。テストを目的として一時的なローカル ウェブサーバーを作成するには、複数の方法があります。次のような選択肢がありますので、最適なものを選んでください。

- [Google Chrome アプリの「Web Server for Chrome」](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [ローカル HTTP Python サーバー](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

注: 本番環境では HTTPS を使用することを強くおすすめします。HTTPS には SEO など、セキュリティ以外のメリットもあります。このトピックについては、こちらの [Google ウェブマスター向け公式ブログの投稿](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html)をご覧ください。

ローカル ウェブサーバーを設定したら、ブラウザで[こちらの URL](http://localhost:8000/article.amp.html) からサンプルの記事にアクセスします。

```text
http://localhost:8000/article.amp.html
```

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">前へ</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/review_code.md', locale=doc.locale).url.path}}"><span class="arrow-next">次へ</span></a>
</div>
