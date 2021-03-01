---
'$title': セットアップ
$order: 0
description: このチュートリアルを始める前に、次のものが必要となります。- HTML、CSS、JavaScript の基本的な知識 - AMP の中心的概念の基本的な知識 ...
'$parent': '/content/docs/fundamentals/add_advanced.md'
---

## 前提条件

このチュートリアルを**始める前に**、次のものが必要となります。

- HTML、CSS、JavaScript の基本的な知識
- AMP の中心的な概念についての基本的な理解（「[HTML から AMP への変換](../../../../documentation/guides-and-tutorials/start/converting/index.md)」チュートリアルをご覧ください）
- JavaScript コンソールを確認できる任意のブラウザ
- 任意のテキストエディタ

## 開発環境のセットアップ

### ステップ 1. コードをダウンロードする

チュートリアルのサンプルコードを [ZIP ファイル](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/archive/master.zip)として、または git コマンドを使ってダウンロードします。

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-advanced.git
```

ダウンロードしたアーカイブファイルを解凍し（必要な場合）、コンピュータのコマンドラインを使ってプロジェクトディレクトリに移動します。

```shell
cd accelerated-mobile-pages-advanced
```

このプロジェクトディレクトリには、複数のサンプルリソースファイルと、開始ページの [`article.amp.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html) が含まれています。

### ステップ 2. サンプルページを実行する

サンプルの AMP ページをテストするには、ウェブサーバーからファイルにアクセスする必要があります。テストを目的として一時的なローカルウェブサーバーを作成するには、複数の方法があります。次のような選択肢がありますので、最適なものを選んでください。

- [Google Chrome アプリの「Web Server for Chrome」](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [ローカル HTTP Python サーバー](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

[tip type="note"] <strong>注意:</strong> 本番環境では HTTPS を使用することを強くお勧めします。HTTPS には SEO など、セキュリティ以外のメリットもあります。このトピックについては、こちらの [Google ウェブマスター向け公式ブログの投稿](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html)をご覧ください。[/tip]

ローカルウェブサーバーをセットアップしたら、ブラウザで[こちらの URL](http://localhost:8000/article.amp.html) からサンプルの記事にアクセスします。

```text
http://localhost:8000/article.amp.html
```
