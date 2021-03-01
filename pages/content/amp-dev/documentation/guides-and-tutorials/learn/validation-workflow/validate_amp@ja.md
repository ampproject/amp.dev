---
'$title': AMP ページの検証
$order: 0
description: 各種検証オプションについて、動画をご覧ください。ページを高速化するだけが AMP の主なメリットではなく、ページ...
formats:
  - websites
  - stories
  - ads
---

[video src='https://www.youtube.com/watch?v=npum8JsITQE' caption='各種検証オプションについての動画をご覧ください。']

AMP の主な長所は、単にページの読み込み時間を短縮するだけでなく、それを行う方法が<em>検証</em>可能であるということです。このため、Twitter、Instagram、Google 検索などのサードパーティでも、積極的に AMP ページを配信してもらえます。

## ページが有効な AMP かどうかを確認する方法

AMP ドキュメントを検証するにはいくつかの方法があります。どの方法でも結果は同じになるため、自分の開発スタイルに最適なものを使用してください。

AMP の妥当性に加えて、AMP ドキュメントがサードパーティプラットフォームで[検出可能](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md)かどうかを確認することもお勧めします。

### ブラウザの Developer Console

AMP Validator には AMP JS ライブラリが付属しているため、すべての AMP ページですぐに使用できます。検証方法は次のとおりです。

1. ブラウザで AMP ページを開きます。
2. URL に「`#development=[1,actions,amp,amp4ads,amp4email]`」を追加します。たとえば、`http://localhost:8000/released.amp.html#development=1` は、<code>AMP</code> 形式の過去の検証方法です。<code>http://localhost:8000/released.amp.html#development=amp4email</code> は、AMP for email 仕様に対してドキュメントを検証します。
3. [Chrome DevTools のコンソール](https://developers.google.com/web/tools/chrome-devtools/debug/console/)を開いて、検証エラーを確認します。

Developer Console のエラーは次のように表示されます。

<amp-img src="/static/img/docs/validator_errors.png" width="713" height="243" layout="responsive" alt="Screen grab of AMP Validator errors in chrome developer console"></amp-img>

### ウェブインターフェース

AMP Validator のウェブインターフェースには、<a href="https://validator.ampproject.org/">validator.ampproject.org</a> からアクセスできます。このインターフェースでは、ページの HTML ソースとともに、インラインでエラーが表示されます。このインターフェースは対話型エディタとなっており、HTML ソースに加えた変更は、インタラクティブに再検証されます。

<amp-img src="/static/img/docs/validator_web_ui.png" width="660" height="507" layout="responsive" alt="Screen grab of validator.ampproject.org with error examples."></amp-img>

### ブラウザの拡張機能

ブラウザの拡張機能を使用すると、AMP Validator にブラウザのツールバーから直接アクセスできるようになります。ブラウザでページを表示すると、アクセスした各 AMP ページが自動的に検証され、ページの妥当性が色付きのアイコンで視覚的に示されます。

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png" width="20" height="20" layout="fixed" alt="Red AMP icon indicating invalid AMP document.">
      </amp-img>
    </td>
    <td>     AMP ページ内にエラーがある場合は、拡張機能のアイコンが赤色になり、見つかったエラーの数が表示されます。</td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png" width="20" height="20" layout="fixed" alt="Green AMP icon indicating valid AMP document.">
      </amp-img>
    </td>
    <td>     AMP ページ内にエラーがない場合は、アイコンが緑色になります。警告がある場合はその数が表示されます。</td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png" width="20" height="20" layout="fixed" alt="Blue AMP icon indicating AMP HTML variant if clicked.">
      </amp-img>
    </td>
    <td>ページが AMP でなくても、AMP バージョンが存在することがわかっている場合は、アイコンが青色になってリンクアイコンが表示されます。拡張機能のアイコンをクリックすると AMP バージョンのページにリダイレクトされます。</td>
  </tr>
</table>

AMP Validator 拡張機能は、[Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) と [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/) でご利用いただけます。

### CI 向けの NPM パッケージ

AMP Validator の NPM パッケージを使用すると、AMP の検証をビルドやテストのパイプラインの一部として統合することができます。[amphtml-validator](https://www.npmjs.com/package/amphtml-validator) または [gulp-amphtml-validator](https://www.npmjs.com/package/gulp-amphtml-validator)（gulp プラグイン）のいずれかのパッケージをご利用いただけます。たとえば、AMP Validator の NPM パッケージを統合テストやスケジュールタスク内で使用して、本番環境の AMP ページを検証できます。

##### 例: AMP HTML ファイルの検証

この例では、AMP HTML ファイルの検証を [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) NPM パッケージを使用して実施します。検証のステータスはコンソールに出力されます。

```javascript
'use strict';
var amphtmlValidator = require('amphtml-validator');
var fs = require('fs');

amphtmlValidator.getInstance().then(function (validator) {
  var input = fs.readFileSync('index.html', 'utf8');
  var result = validator.validateString(input);
  (result.status === 'PASS' ? console.log : console.error)(result.status);
  for (var ii = 0; ii < result.errors.length; ii++) {
    var error = result.errors[ii];
    var msg =
      'line ' + error.line + ', col ' + error.col + ': ' + error.message;
    if (error.specUrl !== null) {
      msg += ' (see ' + error.specUrl + ')';
    }
    (error.severity === 'ERROR' ? console.error : console.warn)(msg);
  }
});
```

##### 例: gulp タスクを使った AMP HTML の検証

この例では、gulp タスクを使用してすべての AMP HTML ファイルを検証します。AMP 検証エラーが見つかった場合、タスクはエラーコード（1）で終了します。

```javascript
const gulp = require('gulp');
const gulpAmpValidator = require('gulp-amphtml-validator');

const paths = {
  src: 'src/*.html',
};

gulp.task('amphtml:validate', () => {
  return gulp
    .src(paths.src)
    .pipe(gulpAmpValidator.validate())
    .pipe(gulpAmpValidator.format())
    .pipe(gulpAmpValidator.failAfterError());
});
gulp.task('default', ['amphtml:validate'], function () {});
```

### コマンドラインツール

AMP HTML ファイルの検証は、[AMP HTML Validator のコマンドラインツール](https://www.npmjs.com/package/amphtml-validator)を使用して実施することもできます。

使い方:

1. お使いのシステムに [Node.js とそのパッケージマネージャ「npm」が](https://docs.npmjs.com/getting-started/installing-node) インストールされていることを確認します。
2. 次のコマンドを実行して、[AMP HTML Validator のコマンドラインツール](https://www.npmjs.com/package/amphtml-validator)をインストールします（`npm install -g amphtml-validator`）。

実際の AMP HTML ページを検証してみましょう。

[sourcecode:console]
$ amphtml-validator https://amp.dev/
https://amp.dev/: PASS
[/sourcecode]

当然ですが、このページは有効な AMP HTML です。有効でないページ [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) を試してみましょう。`amphtml-validator` コマンドを実行するには、ページの URL またはローカルファイル名を指定します。 [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) をダウンロードしてファイルとして保存してから、実行します。

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}})
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})
...
[/sourcecode]

エラーメッセージの形式は、ファイル名、行、列、メッセージから成り、その後に AMP HTML 参照へのリンクが続くこともあります。Emacs などの一部のエディタでは、この形式を解釈して、元のファイル内のエラーにジャンプできるものがあります。

AMP ページを作成する際の参考として、[minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html) を検討してみましょう。

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

コマンドラインツールには、色の切り替え、JSON 出力の表示、特定のバージョンの Validator JavaScript の実行（デフォルトでは、最新の公開スクリプトを実行します）などの追加の機能があります。

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

AMP Validator は開発中に役に立つだけではありません。AMP ページをコンテンツや検索結果に統合している Twitter や Google などのプラットフォームでも使用されています。さらに、こうしたプラットフォームでは一般に、サーバーに直接ページをリクエストするのではなく、Google AMP キャッシュ（ページをキャッシュして世界中で利用できるようにする無料のサービス）を利用しているため、読み込みは一層高速になります。

AMP 検証サービスでページに問題があることが検出されると、そのページはサードパーティのウェブサイトによって検出、配信されなくなり、Google AMP キャッシュに表示されなくなります。つまり、キャッシュによるスピードのメリットが失われるだけでなく、多くの場所でページが表示されなくなる可能性があります。そうした事態が起こらないように対応することが重要です。

## 検証エラーの修正方法

ほとんどの検証エラーは簡単に対応して修正することができます。次の HTML タグを検討してみましょう。

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

このタグでは AMP 検証エラーが生成され、次の各ツールで表示されます。

- ブラウザの Developer Console
  <amp-img src="/static/img/docs/validator_console_imgerror.png" width="696" height="30" layout="responsive" alt="AMP error: The tag 'img' may only appear as a descendant of tag'noscript'. Did you mean 'amp-img'? line 11, column 2"></amp-img>

- ウェブインターフェース {amp-img0}{/amp-img0}

- ブラウザの拡張機能
  <amp-img src="/static/img/docs/validator_extension_imgerror.png" width="724" height="108" layout="responsive" alt="AMP error: The tag 'img' may only appear as a descendant of tag'noscript'. Did you mean 'amp-img'? line 11, column 2"></amp-img>

各ツールから、次のような情報がわかります。

1. エラーが発生した HTML ドキュメント内の場所（行と列）。インターフェースによっては、クリック可能になっていて、その場所がハイライト表示されます。このケースでは、行 11、列 2 で問題が発生しています。
2. エラーに関する説明。このケースでは、`<img>` タグが使用されていますが、本来は [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) タグを使用すべきであることが示されています。
3. エラーに関連するドキュメントへのリンク。このケースでは、[`<amp-img>`](../../../../documentation/components/reference/amp-img.md) タグに関するドキュメントです。すべてのエラーにドキュメントのリンクが表示されるわけではありません。

[仕様](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)をよく確認したところ、`<img>` タグが使用されているところで、本来は [`<amp-img>`](../../../../documentation/components/reference/amp-img.md) タグを使用すべきであることがわかりました。

表示される可能性のあるエラーの一覧は、[AMP 検証エラーガイド](validation_errors.md)で詳しくご覧いただけます。慎重に評価しても引き続きエラーが発生する場合は、[質問を投稿](http://stackoverflow.com/questions/tagged/amp-html)してください。サポートいたします。
