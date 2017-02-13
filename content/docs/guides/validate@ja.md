---
$title: AMP ページを検証する
---

AMP の主な長所は、単にページの読み込み時間を短縮するだけでなく、それを検証可能な方法で行うことです。<i></i>そのため、Twitter、Instagram、Google 検索などのサードパーティでは、興味深い方法でユーザーに AMP ページを積極的に配信しています。

## ページが有効な AMP かどうかを確認する方法

AMP ドキュメントを検証するにはいくつかの方法があります。どの方法でも結果は同じになるため、自分の開発スタイルに最適なものを使用してください。

AMP の有効性に加えて、AMP ドキュメントがサードパーティ プラットフォームにとって[検出可能](/docs/guides/discovery.html)かどうかも確認できます。

### ブラウザの Developer Console

AMP JS ライブラリには AMP 検証ツールが付属しているため、すべての AMP ページですぐに使用できます。検証方法は次のとおりです。

  * ブラウザで AMP ページを開きます。
  * URL に「`#development=1`」を追加します（例: `http://localhost:8000/released.amp.html#development=1`）
  * [Chrome DevTools Console](https://developers.google.com/web/tools/chrome-devtools/debug/console/) を開いて検証エラーを確認します。

Developer Console のエラーは次のように表示されます。

<amp-img src="/static/img/docs/validator_errors.png" width="713" height="243" alt="Chrome Developer Console の AMP 検証ツール エラーのスクリーンショット" layout="responsive"></amp-img>


### ウェブ インターフェース

[validator.ampproject.org](https://validator.ampproject.org/) では AMP 検証ツールをウェブ インターフェースとして使用できます。このインターフェースには、ページの HTML ソースとともに、インラインでエラーが表示されます。このインターフェースは対話型エディタなので、HTML ソースに変更を加えると、インタラクティブに再検証できます。

<amp-img src="/static/img/docs/validator_web_ui.png" width="660" height="507" alt="エラーの例を表示した validator.ampproject.org のスクリーンショット。" layout="responsive"></amp-img>


### ブラウザの拡張機能

ブラウザの拡張機能を使用すると、AMP 検証ツールにブラウザのツールバーから直接アクセスできるようになります。ブラウザでページを表示すると、アクセスした各 AMP ページが自動的に検証され、ページの有効性が色付きのアイコンで視覚的に示されます。

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png" width="20" height="20" alt="無効な AMP ドキュメントを示す赤い AMP アイコン。"></amp-img>
      
    </td>
    <td>AMP ページ内にエラーがある場合は、拡張機能のアイコンが赤色になり、見つかったエラーの数が表示されます。
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png" width="20" height="20" alt="無効な AMP ドキュメントを示す緑の AMP アイコン。"></amp-img>
      
    </td>
    <td>AMP ページ内にエラーがない場合は、アイコンが緑色になります。警告がある場合はその数が表示されます。
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png" width="20" height="20" alt="クリックすると AMP バージョンの HTML が表示される青い AMP アイコン。"></amp-img>
      
    </td>
    <td>ページが AMP でなくても、AMP バージョンが存在することがわかっている場合は、アイコンが青色になってリンクアイコンが表示されます。拡張機能のアイコンをクリックすると AMP バージョンのページにリダイレクトされます。
    </td>
  </tr>
</table>

[Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) と [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/) の AMP 検証ツール拡張機能をご利用ください。

### コマンドライン ツール

前提条件として、[Node.js とそのパッケージ マネージャー `npm` をシステムにインストール](https://docs.npmjs.com/getting-started/installing-node)する必要があります。

[AMP HTML 検証ツールのコマンドライン ツール](https://www.npmjs.com/package/amphtml-validator)をインストールするには、`npm install -g amphtml-validator` と入力します。

実際の AMP HTML ページを検証してみましょう。

[sourcecode:console]
$ amphtml-validator https://www.ampproject.org/
https://www.ampproject.org/: PASS
[/sourcecode]

当然ですが、このページは有効な AMP HTML です。有効でない [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) ページを試してみましょう。`amphtml-validator` コマンドを実行するには、ページの URL またはローカル ファイル名を指定します。[several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) をダウンロードしてファイルとして保存してから、実行します。

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see https://www.ampproject.org/docs/reference/amp-img.html)
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see https://www.ampproject.org/docs/reference/amp-ad.html)
...
[/sourcecode]

エラー メッセージの形式は、ファイル名、行、列、メッセージから成り、その後に AMP HTML リファレンスへのリンクが続くこともあります。Emacs などの一部のエディタでは（コンパイル コマンドやコンパイル モードを探してください）、この形式を解釈して、元のファイル内のエラーにジャンプできるものがあります。

AMP ページを作成する際の参考として、[minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html) を検討してみましょう。

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

コマンドライン ツールには、色の切り替え、JSON 出力の印刷、特定のバージョンの検証ツール Javascript の実行（デフォルトでは、最新の公開版を実行します）などの追加の機能があります。

[sourcecode:console]
$ amphtml-validator --help

  Usage: index [options] <fileOrUrlOrMinus...>

  Validates the files or urls provided as arguments. If "-" is
  specified, reads from stdin instead.

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    --validator_js <fileOrUrl>  The Validator Javascript.
      Latest published version by default, or
      dist/validator_minified.js (built with build.py)
      for development.
    --format <color|text|json>  How to format the output.
      "color" displays errors/warnings/success in
              red/orange/green.
      "text"  avoids color (e.g., useful in terminals not
              supporting color).
      "json"  emits json corresponding to the ValidationResult
              message in validator.proto.
[/sourcecode]

## ページが有効でない場合

AMP 検証ツールは開発中に役に立つだけではありません。AMP ページをコンテンツや検索結果に統合している Twitter や Google などのプラットフォームでも使用されています。プラットフォームでは一般に、サーバーに直接ページをリクエストするだけでなく、Google AMP キャッシュ（ページをキャッシュして世界中で利用できるようにする無料のサービス）も利用しているため、さらに高速に読み込むことができます。

AMP 検証サービスでページに問題があることが検出されると、そのページはサードパーティのウェブサイトによって検出、配信されなくなり、Google AMP キャッシュに表示されなくなります。つまり、キャッシュによるスピードのメリットが失われるだけでなく、多くの場所でページが表示されなくなる可能性があります。そのような事態が起きないようにしてください。

## 検証エラーの修正方法

ほとんどの検証エラーは簡単に対応して修正することができます。次の HTML タグを検討してみましょう。

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

このタグでは次の AMP 検証エラーが生成され、各ツールでは次のように表示されます。

 * ブラウザの Developer Console
<amp-img alt="AMP エラー: タグ「img」はタグ「noscript」の子孫としてのみ使用できます。「amp-img」ではありませんか？行 11、列 2" height="30" src="/static/img/docs/validator_console_imgerror.png" width="696" layout="responsive"></amp-img>

 * ウェブ インターフェース
<amp-img alt="AMP エラー: タグ「img」はタグ「noscript」の子孫としてのみ使用できます。「amp-img」ではありませんか？行 11、列 2" height="58" src="/static/img/docs/validator_webui_imgerror.png" width="676" layout="responsive"></amp-img>

 * ブラウザの拡張機能
<amp-img alt="AMP エラー: タグ「img」はタグ「noscript」の子孫としてのみ使用できます。「amp-img」ではありませんか？行 11、列 2" height="108" src="/static/img/docs/validator_extension_imgerror.png" width="724" layout="responsive"></amp-img>

各ツールから、次のような情報がわかります。

  1. エラーが発生した HTML ドキュメント内の場所（行と列）。インターフェースによっては、クリック可能になっていて、その場所がハイライト表示されます。このケースでは、行 11、列 2 で問題が発生しています。
  1. エラーに関する説明。このケースでは、`<amp-img>` タグを使用すべきところで `<img>` タグを使用していることが示されています。
  1. エラーに関連するドキュメントへのリンク。このケースでは、`<amp-img>` タグに関するドキュメントです。すべてのエラーにドキュメントのリンクが表示されるわけではありません。

仕様をよく確認したところ、`<amp-img>` タグを使用すべきところで `<img>` タグを使用していることがわかりました。

可能性のあるエラーの詳細なリストを確認するには、[AMP 検証エラーガイド](https://www.ampproject.org/docs/reference/validation_errors.html)をご覧ください。慎重に評価しても引き続きエラーが発生する場合は、[質問を投稿](http://stackoverflow.com/questions/tagged/amp-html)してください。サポートいたします。
