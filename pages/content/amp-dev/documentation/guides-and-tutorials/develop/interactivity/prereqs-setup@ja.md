---
$title: 設定
---

[TOC]

## 必要な準備

このチュートリアルを始める前に、次のものが必要となります。

- HTML、CSS、JavaScript の基本的な知識
- お好みのブラウザ
- お好みのテキスト エディタ
- お使いのマシンに [Node.js と NPM](https://docs.npmjs.com/getting-started/installing-node) をインストールしておくこと

## 開発環境を設定する

### ステップ 1. コードをダウンロードする

チュートリアルのスターター コードを [ZIP ファイル](https://github.com/googlecodelabs/advanced-interactivity-in-amp/archive/master.zip)として、または次のように git コマンドを使ってダウンロードします。

```shell
git clone https://github.com/googlecodelabs/advanced-interactivity-in-amp.git
```

### ステップ 2. 依存関係をインストールする

ダウンロードしたアーカイブ ファイルを解凍し（必要な場合）、そのディレクトリに移動します。`npm install` を実行して依存関係をインストールします。

```shell
cd advanced-interactivity-in-amp
npm install
```


### ステップ 3. 開発用サーバーを稼働させる

node.js を使って開発用サーバーを起動します。

```shell
node app.js
```

次に、ウェブブラウザで <a href="http://localhost:3000">http://localhost:3000</a> に移動して、AMP ページが機能していることを確認します。

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">前へ</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/get-familiar.md', locale=doc.locale).url.path}}"><span class="arrow-next">次へ</span></a>
</div>
 
 
