---
'$title': セットアップ
$order: 0
description: このチュートリアルを始める前に、次のものが必要となります。 - HTML、CSS、JavaScript の基本的な知識 - お好みのブラウザ - お好みのテキストエディタ ...
'$parent': '/content/docs/interaction_dynamic/interactivity.md'
---

## 前提条件

このチュートリアルを始める前に、次のものが必要となります。

- HTML、CSS、JavaScript の基本的な知識
- お好みのブラウザ
- お好みのテキストエディタ
- お使いのマシンに [Node.js と NPM](https://docs.npmjs.com/getting-started/installing-node) をインストールしておくこと

## 開発環境のセットアップ

### ステップ 1. コードをダウンロードする

チュートリアルのスターターコードを [ZIP ファイル](https://github.com/googlecodelabs/advanced-interactivity-in-amp/archive/master.zip)として、または次のように git コマンドを使ってダウンロードします。

```shell
git clone https://github.com/googlecodelabs/advanced-interactivity-in-amp.git
```

### ステップ 2. 依存関係をインストールする

ダウンロードしたアーカイブファイルを解凍し（必要な場合）、そのディレクトリに移動します。`npm install` を実行して依存関係をインストールします。

```shell
cd advanced-interactivity-in-amp
npm install
```

### ステップ 3. 開発用サーバーを実行する

node.js を使って開発用サーバーを起動します。

```shell
node app.js
```

次に、ウェブブラウザで <a href="http://localhost:3000">http://localhost:3000</a> に移動して、AMP ページが機能していることを確認します。
