---
$title: 設定
---

## 必要な準備

このチュートリアルを始める前に、次のものが必要となります。

- HTML、CSS、JavaScript の基本的な知識
- AMP の中心となる概念についての基本的な理解（「[HTML を AMP に変換する]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/index.md', locale=doc.locale).url.path}})」チュートリアルをご覧ください）
- お好みのブラウザ
- 任意のテキスト エディタ

## 開発環境を設定する

#### ステップ 1. コードをダウンロードする

1. チュートリアルのコードを次の URL からダウンロードします（コードは zip ファイルとして圧縮されています）: <a href="https://github.com/ampproject/docs/raw/master/tutorial_source/amp-pets-story.zip">https://github.com/ampproject/docs/raw/master/tutorial_source/amp-pets-story.zip</a>

2. zip ファイルのコンテンツを抽出します。**amp-pets-story** ディレクトリには、ストーリーの作成に使用する画像、動画、音声、データファイルがあります。**pets.html** ファイルをたたき台として、ストーリーを作成します。ストーリーの完成版は [pets-completed.html](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html) ファイルにあります。

#### ステップ 2. サンプルページを実行する

サンプルのストーリーをテストするには、ウェブサーバーからファイルにアクセスできるようにしてください。テスト用に一時的なローカル ウェブサーバーを作成するには、さまざまな方法があります。次のような選択肢がありますので、最適なものを選んでください。

- [Google Chrome アプリの「Web Server for Chrome」](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [ローカル HTTP Python サーバー](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

ローカル ウェブサーバーを設定したら、このチュートリアルの最後に次の <a href="http://localhost:8000/pets-completed.html">URL</a> にアクセスして、完成したストーリーがどのように表示されるかご確認ください:

```html
http://localhost:8000/pets-completed.html
```

[tip type="important"]

URL は必ず `localhost` から提供されるようにしてください。そうでない場合、AMP ストーリーが正しく読み込まれず、次のようなエラーが発生する可能性があります: `"source" "must start with "https://" or "//" or be relative and served from either https or from localhost.`

[/tip]


クリックしながら完成したストーリー全体を見返し、このコンポーネントの仕組みを把握するようにしてください。

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">前へ</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/visual_story/parts_of_story.md', locale=doc.locale).url.path}}"><span class="arrow-next">次へ</span></a>
</div>

