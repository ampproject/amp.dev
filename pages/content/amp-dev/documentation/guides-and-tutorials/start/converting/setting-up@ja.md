---
"$title": セットアップ
"$order": '0'
description: 開発環境のセットアップ ステップ 1. コードをダウンロードする チュートリアル用のサンプルコードを、ZIP ファイルとして、または git コマンドを使ってダウンロードします。
"$parent": "/documentation/guides-and-tutorials/start/converting/setting-up.md"
---

## 前提条件

このチュートリアルを**始める前に**、次のものが必要となります。

- HTML、CSS、JavaScript の基本的な知識
- JavaScript コンソールを確認できる任意のブラウザ
- 任意のテキストエディタ

## 開発環境のセットアップ

### ステップ 1. コードをダウンロードする

チュートリアル用のサンプルコードを [ZIP ファイル](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/archive/master.zip)として、または git コマンドを使ってダウンロードします。

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-foundations.git
```

ダウンロードしたアーカイブファイルを解凍し（必要な場合）、パソコンのコマンドラインを使ってプロジェクトディレクトリに移動します。

```shell
cd accelerated-mobile-pages-foundations
```

このプロジェクトディレクトリには、複数のサンプルリソース ファイルと、開始ページの [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html) が含まれています。

### ステップ 2. サンプルページを実行する

サンプルページをテストするには、ウェブサーバーからファイルにアクセスする必要があります。テストを目的として一時的なローカルウェブサーバーを作成するには、複数の方法があります。次のような選択肢がありますので、最適なものを選んでください。

- [Google Chrome アプリの「Web Server for Chrome」](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [ローカル HTTP Python サーバー](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

[tip type="note"] <strong>注意:</strong> 本番環境では HTTPS を使用することを強くお勧めします。HTTPS には SEO など、セキュリティ以外のメリットもあります。このトピックについては、こちらの <a>Google ウェブマスター向け公式ブログの投稿</a>をご覧ください。[/tip]

ローカルウェブサーバーをセットアップしたら、ブラウザで[こちらの URL](http://localhost:8000/article.html) からサンプルの記事にアクセスします。

```text
http://localhost:8000/article.html
```
