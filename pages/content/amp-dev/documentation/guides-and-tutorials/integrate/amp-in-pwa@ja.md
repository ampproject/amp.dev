---
"$title": AMP を PWA のデータソースとして使用する
"$order": '1'
description: AMP に投資したもののプログレッシブウェブアプリをまだ構築していない場合、AMP ページはプログレッシブウェブアプリの開発を劇的に単純化できます。
formats:
- websites
author: pbakaus
---

AMP に投資したもののプログレッシブウェブアプリをまだ構築していない場合、AMP ページによってプログレッシブウェブアプリの開発を劇的に単純化することができます。このガイドでは、プログレッシブウェブアプリ内で AMP を消費し、既存の AMP ページをデータソースとして使用する方法について説明します。

## JSON から AMP に

PWA として最も一般的なのは、Ajax で JSON API にアクセスする単一ページのアプリケーションです。この場合、ナビゲーションに使用するデータと、記事をレンダリングするための実際のコンテンツは、JSON API から返されます。

JSON API から返されるコンテンツは未加工ですので、クライアントにレンダリングする前に HTML に変換する必要があります。この処理が大変なことが、PWA の維持管理を難しくしています。これに代わる方法として、既存の AMP ページをコンテンツ ソースとして再利用することができます。AMP を使用すれば、数行のコードを追加するだけでこの処理を実装できます。

## PWA に「Shadow AMP」をインクルードする

最初のステップとして、「Shadow AMP」という特別な AMP を PWA に含めます。これにより、最上位のページに AMP ライブラリが読み込まれます。これは上位のコンテンツの管理ではなく、指定したページの一部を「増幅」するためだけに使用します。

ページの head に次のように記述して Shadow AMP をインクルードします。

[sourcecode:html]
<!-- Asynchronously load the AMP-with-Shadow-DOM runtime library. -->
<script async src="https://cdn.ampproject.org/shadow-v0.js"></script>
[/sourcecode]

### Shadow AMP API が使用可能になったことを確認する方法

Shadow AMP ライブラリは、`async` 属性を指定して読み込むことをおすすめします。ただしその場合は、ライブラリが完全に読み込まれて使用可能な状態になったかどうかを、何らかの方法で確認する必要があります。

Shadow AMP ライブラリが使用可能になったかどうかは、グローバル `AMP` 変数が使用できるかどうかで判断できます。Shadow AMP では、「[関数を非同期で読み込む方法](http://mrcoles.com/blog/google-analytics-asynchronous-tracking-how-it-work/)」を使用します。次のコードを挿入することを検討してください。

[sourcecode:javascript] (window.AMP = window.AMP || []).push(function(AMP) { // AMP is now available. }); [/sourcecode]

コードが正常に動作し、いくつかのコールバックが追加されれば、AMP は使用可能な状態になっています。以下にその理由を説明します。

このコードは次のように解釈されます。

1. 「window.AMP が存在しない場合は、その位置を確保するために空の配列を作成する」
2. 「その配列に、AMP が使用可能になったときに実行すべきコールバック関数をプッシュする」

Shadow AMP ライブラリが実際に読み込まれると、すでに `window.AMP` にコールバックの配列があることを認識してキュー全体を処理します。この関数は、もう一度実行しても正常に動作します。Shadow AMP によって `window.AMP` が置き換えられ、カスタムの `push` メソッドによって直ちにコールバックが処理されるからです。

[tip type="tip"] <strong>ヒント: </strong>上のサンプルコードを実際に使用するときは、Promise でラップし、AMP API にアクセスする前には常に Promise を使用することをおすすめします。例として、[React デモコード](https://github.com/ampproject/amp-publisher-sample/blob/master/amp-pwa/src/components/amp-document/amp-document.js#L20)をご覧ください。[/tip]

## プログレッシブウェブアプリのナビゲーションの処理

この手順は手動で実装する必要があります。ユーザーをどのようにナビゲートしたいかに応じて、コンテンツへのリンクを柔軟に表示できるようするためです。リスト形式やカード形式も選択できます。

一般的な方法としては、指定した URL とメタデータを返す JSON をフェッチします。最終的には、ユーザーがリンクをクリックしたときに関数コールバックが発生します。このコールバックには、リクエストした AMP ページの URL が含まれます。ここまで来ればあと一息です。

## AMP API を使用したページインラインのレンダリング

最後に、ユーザーの操作に応じてコンテンツを表示します。そのためには、関連する AMP ドキュメントをフェッチして Shadow AMP に引き継ぐ必要があります。まず次のようなコードを記述して、ページをフェッチする関数を実装します。

[sourcecode:javascript]
function fetchDocument(url) {

  // unfortunately fetch() does not support retrieving documents,
  // so we have to resort to good old XMLHttpRequest.
  var xhr = new XMLHttpRequest();

  return new Promise(function(resolve, reject) {
    xhr.open('GET', url, true);
    xhr.responseType = 'document';
    xhr.setRequestHeader('Accept', 'text/html');
    xhr.onload = function() {
      // .responseXML contains a ready-to-use Document object
      resolve(xhr.responseXML);
    };
    xhr.send();
  });
}
[/sourcecode]

[tip type="important"] <strong>重要:</strong> 上のサンプルコードは、エラー処理を省略して単純化されています。エラーは、必ず適切に処理してください。 [/tip]

これで `Document` オブジェクトが準備できたので、AMP に引き継いでレンダリングします。次のように、AMP ドキュメントのコンテナとして機能する DOM 要素への参照を取得し、`AMP.attachShadowDoc()` を呼び出します。

[sourcecode:javascript]
// This can be any DOM element
var container = document.getElementById('container');

// The AMP page you want to display
var url = "https://my-domain/amp/an-article.html";

// Use our fetchDocument method to get the doc
fetchDocument(url).then(function(doc) {
  // Let AMP take over and render the page
  var ampedDoc = AMP.attachShadowDoc(container, doc, url);
});
[/sourcecode]

[tip type="tip"] <strong>ヒント:</strong> AMP ページを単独で表示する場合（ヘッダーやフッターなどを埋め込んでいない場合）、ページ要素を削除するタイミングとしては、ドキュメントを実際に AMP に引き継ぐ前が最適です。[/tip]

これで、リクエストした AMP ページがプログレッシブウェブアプリの子としてレンダリングされます。

## クリーンアップ

クリーンアップに最適なタイミングは、ユーザーがプログレッシブウェブアプリ内で AMP から AMP にナビゲートするときです。以前レンダリングした AMP ページを破棄する際は、必ず次のような形で AMP に伝えてください。

[sourcecode:javascript] // ampedDoc is the reference returned from AMP.attachShadowDoc ampedDoc.close(); [/sourcecode]

これにより、このドキュメントをもう使用しないことが AMP に伝わり、メモリや CPU のオーバーヘッドが解放されます。

## サンプルアプリ

[video src="/static/img/docs/pwamp_react_demo.mp4" width="620" height="1100" loop="true", controls="true"]

AMP を埋め込んだ PWA の動作を実際にご覧いただくため、[React サンプル](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa)を作成しました。ここで説明した手順をシンプルな React コンポーネントにまとめてあります。柔軟にカスタマイズできる JavaScript の PWA と、コンテンツを瞬時に提供できる AMP の長所を兼ね備えており、ナビゲーション時の遷移もスムーズです。

- ソースコードはこちら: [https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa)
- npm により React コンポーネントをスタンドアロンで使用したい場合はこちら: [https://www.npmjs.com/package/react-amp-document](https://www.npmjs.com/package/react-amp-document)
- 操作可能なサンプルはこちら: [https://choumx.github.io/amp-pwa/](https://choumx.github.io/amp-pwa/)（スマートフォンまたはモバイルエミュレーションで最適に動作します）

Polymer フレームワークを使用した PWA と AMP のサンプルも用意しました。このサンプルでは、[amp-viewer](https://github.com/PolymerLabs/amp-viewer/) を使用して AMP ページを埋め込んでいます。

- コードはこちら: [https://github.com/Polymer/news/tree/amp](https://github.com/Polymer/news/tree/amp)
- 操作可能なサンプルはこちら: [https://polymer-news-amp.appspot.com/](https://polymer-news-amp.appspot.com/)
