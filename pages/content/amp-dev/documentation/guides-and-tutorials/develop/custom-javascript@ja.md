---
$title: AMP ページでのカスタム JavaScript の使用
$order: 7
author: CrystalOnScript
contributors:
- fstanis
description: 大量のカスタマイズが必要なウェブエクスペリエンスのために、AMP は、ページの全体的なパフォーマンスを劣化させることなく任意の JavaScript を AMP ページで利用できるようにする amp-script コンポーネントを作成しました。
---

AMPは、調整や設定を行わずに使用できる高機能でシームレスなコンポーネントの使用を促進することで、ウェブ全体のすべてのユーザーに一貫して優れたエクスペリエンスを提供するよう努めています。

一部のウェブエクスペリエンスには、[`amp-bind`](../../../documentation/components/reference/amp-bind.md?format=websites) のバインド機能、 [`amp-list`](../../../documentation/components/reference/amp-list.md?format=websites) の動的データ取得とテンプレート機能、および [`amp-mustache`](../../../documentation/components/reference/amp-mustache.md?format=websites) をはるかに上回る大量のカスタマイズが必要です。そういった一回限りのケースのために、AMP は、ページの全体的なパフォーマンスを劣化させることなく任意の JavaScript を AMP ページで利用できるようにする [`<amp-script>`](../../../documentation/components/reference/amp-script.md?format=websites) コンポーネントを作成しました。

# カスタム JavaScript の挿入

AMP ページは、`<amp-script>` コンポーネントを通じて カスタム JavaScript をサポートしています。以下の例は、`amp-script` と URL から読み込んだ JavaScript ファイルの使用方法を示しています。

```html
<!doctype html>
<html ⚡>
<head>
  ...
  <script async custom-element="amp-script" src="https://cdn.ampproject.org/v0/amp-script-0.1.js"></script>
<body>
  ...
  <amp-script layout="container" src="https://example.com/myfile.js">
    <p>Initial content that can be modified from JavaScript</p>
  </amp-script>
  ...
</body>
</html>
```

`<amp-script>` コンポーネントは、メインページとは別のスレッドで実行する [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) を登録します。Web Worker には、[Worker DOM](https://github.com/ampproject/worker-dom) による `amp-script` の使用によって、自身の DOM のコピーを与えられます。これにより、Web Worker は、[React](https://reactjs.org/) や [jQuery](https://jquery.com/) といった JavaScript ライブラリを変更せずに使用できるようになります。

`amp-script` コンポーネントは、Web Worker スレッドとメインスレッド間でメッセージを送信し、メインの DOM で行われた変更を Web Worker の false DOM にエコーさせます。一方で、Web Worker が flase DOM を更新すると、その内容がメイン DOM に反映されます。

## カスタムスクリプトのキャッシング

[AMP キャッシュ](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md)は、`<amp-script>` で挿入されたカスタム JavaScript ファイルを、AMP コンポーネントスクリプトと同じ方法で配信することで、カスタム JavaScript によって 速度の低下が生じないようにしています。

AMP キャッシュは、JavaSciprt ファイルをプロキシして配信します。`<amp-script>` を使用するページでは、それを含まないページと同じパフォーマンスエクスペリエンスがユーザーに提供されます。

# `<amp-script>` の使用

AMP ページが一貫して素早くスムーズな UI で読み込まれるように保証するために、`<amp-script>` には制限があります。

## 初期化

Web Worker 内の JavaScript は、読み込み時に DOM に最小限の変更を許可しています。このフェーズで許可される変更は、以下のとおりです。

- イベントハンドラの登録。
- 複数の TextNode への TextNode の分割。それを必要とするフレームワークを可能にする目的があります。

`<amp-script>` タグ内の DOM は、初期化の前後でほぼ同一である必要があります。

たとえば、以下のようなコードで起動するすとします。

```html
<text> Hello world </text>
```

Worker DOM は、構造へのわずかな変更を許可しますが、コンテンツへの変更は許可しません。

```html
 <text>Hello </text><text>world</text>
```

## DOM マニピュレーション

ユーザーエクスペリエンスとセキュリティの理由により、`amp-script` は、DOM マニピュレーションに制限を設けています。

### ユーザーインタラクション

ユーザーが、`<amp-script>` コンポーネントにラップされた要素を操作する場合、カスタム JavaSciprt は必要なときに DOM マニピュレーションを素早く返す必要があります。デフォルトでは、DOM への変更は、最初のインタラクションから **1 秒未満**許可されています。注目すべき例外は、コードが `fetch` を介してネットワークからデータを取得する必要がある場合です。ここで、DOM の変更は、レスポンスがユーザーに返された後の **1 秒未満** の間要求できます。許可された期間外でスクリプトが DOM を変更すると、致命的なエラーが発生し、`<amp-script>` コンポーネントによって Web Worker が終了されます。終了された `<amp-script>` コンポーネントが再び実行することはありません。

### プロンプトなしの変更

`<amp-script>` コンポーネントの高さが固定である場合、DOM マニピュレーションに必要となるユーザーインタラクションはありません。

## スクリプトのサイズ

AMP は、各ページのカスタム JavaSciprt を 150 キロバイトに制限しています。この制限は、そのページ上のすべての `<amp-script>` コンポーネントで共有されます。すべての外部 JavaScript ライブラリは、個別の `<amp-script>` コンポーネントにインポートする必要があります。

## スコープ

カスタム JavaScript ファイルが対話するすべての DOM 要素は、`<amp-script>` コンポーネントタグでラップする必要があります。これには、ほかの AMP コンポーネントも含まれます。`<amp-script>` コンポーネントは、ドキュメントの `<body>` 要素ではなく、`document.body` が `<amp-script>` 要素であるとみなします。

以下のドキュメントの `<amp-script>` 要素にインポートされたスクリプト内で `document.body.appendChild(document.createElement('span'))` を呼び出すとします。

```html
<body>
  <p>Hello!</p>
  <div>
    <amp-script layout="container" src="customjs.js">
    </amp-script>
  </div>
</body>
```

これは、以下のような結果になります。

```html
<body>
  <p>Hello!</p>
  <div>
    <amp-script layout="container" src="customjs.js">
      <span></span>
    </amp-script>
  </div>
</body>
```

## イベントトリガ

すべてのイベントトリガを使用できます。

## API の制限 <a name="api-restrictions"></a>

一部の同期メソッドは、`<amp-script>` で許可されておらず、[`Element.getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) といった別のものに置き換えられています。Web Worker に `Element.getBoundingClientRect()` を実装することはできないため、その非同期の代替である `getBoundingClientRectAsync()` が提供されています。`getBoundingClientRectAsync()` は、直接結果を返す代わりに、[`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) を返します。

WorkerDOM 対応 API を確認するには、[こちらのチャート](https://github.com/ampproject/worker-dom/blob/main/web_compat_table.md)を参照してください。
