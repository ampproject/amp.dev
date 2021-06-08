---
'$title': AMP ビューアを使ったメールのレンダリング
$order: 5
author: alabiaga
formats:
  - email
---

AMP for Email のサポートを考えていえるメールクライアントは、[AMP ビューア](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/integrating-viewer-with-amp-doc-guide.md)を使用して送信者の AMP メールをホストする必要があります。[AMP ビューアライブラリ](https://github.com/ampproject/amphtml/tree/main/extensions/amp-viewer-integration)を使って構築されたビューアは、AMP ドキュメントをカプセル化し、postMessage を介して AMP ドキュメントと双方向通信を行う[機能を](https://github.com/ampproject/amphtml/blob/main/extensions/amp-viewer-integration/CAPABILITIES.md)有効化します。これらの機能には、メールの可視性の制御の許可、ほかのメトリックのリレー、およびメールから発行される XHR リクエストの安全性を確保する手段の提供が含まれます。

## ビューアによる XHR インターセプト

AMP ビューアライブラリの `xhrInterceptor` 機能により、ビューアは発信 XHR リクエストをインターセプトすることができます。AMP ビューアはその有効性と目的を内省し、ユーザーの保護とプライバシーを確保します。

#### XHR リクエスト

[`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) や [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email) といった AMP コンポーネントには、データの投稿と取得を行うエンドポイントへの呼び出しが必要です。これらの呼び出しは、XHR リクエストとして分類されています。

#### ビューアと AMP ドキュメントの通信

ビューアと AMP ドキュメント間の通信に使用されるプロトコルは、[postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) を介してアーカイブされます。以下は、XHR インターセプトの使用事例における postMessage の簡単な例で、ビューアは AMP ドキュメントから送られた xhr postMessage を処理してカスタムレスポンスを返しています。

```js
// The viewer iframe that will host the amp doc.
viewerIframe = document.createElement('iframe');
viewerIframe.contentWindow.onMessage = (xhrRequestIntercepted) => {
  const blob = new Blob([JSON.stringify({body: 'hello'}, null, 2)], {
    type: 'application/json',
  });
  const response = new Reponse(blob, {status: 200});
  return response;
};
```

### XHR インターセプトの有効化

ビューアの初期化時に xhrInterceptor 機能にオプトインすることにより、xhr インターセプトを有効にします。このやり方と xhr インターセプトの例については、ビューアの例を参照してください。xhr インターセプトを有効化した後で、XHR インターセプトを実行できるように、AMP ドキュメントをオプトインします。`<html amp4email>` タグに `allow-xhr-interception` 属性を追加すると、ドキュメントがオプトインされます。この属性は意図的に無効な属性にされており、AMP ドキュメントの検証中に無効であるフラグが立てられるため、メールクライアントは AMP ドキュメントを表示する前にこの属性を設定しておく必要があります。

```html
<!DOCTYPE html>
<html ⚡4email allow-xhr-interception>
  ...
</html>
```

## ビューアのサーバーサイドテンプレートのレンダリング

`viewerRenderTemplate` 機能を使って、ビューアの [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) と [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=email) テンプレートのレンダリングを管理することができます。これを有効にすると、AMP ランタイムは、元の XHR 呼び出し、テンプレートデータ、およびコンポーネントのコンテンツをビューアにレンダリングするために必要なその他の詳細を含むリクエストをプロキシします。これにより、ビューアはエンドポイントデータのコンテンツを内省できるようになるため、テンプレートの [mustache](https://mustache.github.io/) レンダリングを管理してデータの検証とサニタイゼーションを実施することができます。amp-form と amp-list コンポーネントでこの機能を xhrInterceptor とともに有効にすると、同様にビューアにリクエストをプロキシする `viewerRenderTemplate` 機能は、xhrInterceptor の機能よりも優先されることに注意してください。

[viewer.html](https://github.com/ampproject/amphtml/blob/main/examples/viewer.html) の例では、AMP ドキュメントから送信された`viewerRenderTemplate` メッセージがどのように処理されるかを示しています。この例では、Viewer.prototype.processRequest\_ が `viewerRenderTemplate` メッセージをキャッチし、リクエストにある AMP コンポーネントの種類に応じて、以下の JSON 形式でレンダリングされる HTML を返送します。

```js
Viewer.prototype.ssrRenderAmpListTemplate_ = (data) =>
  Promise.resolve({
    'html':
      "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'>" +
      "<div class='product' role='listitem'>Apple</div>" +
      '</div>',
    'body': '',
    'init': {
      'headers': {
        'Content-Type': 'application/json',
      },
    },
  });
```

これは、[mustache](https://mustache.github.io/) ライブラリの依存関係やコンテンツのサニタイゼーションが伴わない簡単な例です。

以下の図では、`viewerRenderTemplate` 機能を使用したメールクライアントビューアの AMP ドキュメントが [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) テンプレートのレンダリングをどのように処理できるかという、より実世界に沿った例を示しています。

<amp-img alt="Viewer render template diagram" layout="responsive" width="372" height="279" src="/static/img/docs/viewer_render_template_diagram.png"></amp-img>

AMP ランタイムは [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=email) コンポーネントデータのフェッチリクエストをビューアにプロキシし、このビューアはそれをメールクライアントに転送します。サーバーはさまざまなサービスを通じてこの URL と URL フェッチの結果をフィードし、おそらく URL の妥当性、URL から返されたデータのコンテンツを検査した上で、そのデータで [mustache](https://mustache.github.io/) テンプレートをレンダリングします。そして、レンダリングされたテンプレートを返して、以下の JSON レスポンス形式でビューアに返送します。

```json
{
  "html": "<div role='list' class='i-amphtml-fill-content i-amphtml-replaced-content'> <div class='product' role='listitem'>List item 1</div> <div class='product' role='listitem'>List item 2</div> </div>",
  "body": "",
  "init": {
    "headers": {
      "Content-Type": "application/json"
    }
  }
}
```

JSON ペイロードの html 値は、レンダリングするために AMP ドキュメントにインジェクションされたものになります。

以下の表では、機能とそれが影響するコンポーネントを概説しています。

<table>
  <thead>
    <tr>
      <th width="30%">ビューアの機能</th>
      <th>影響のあるコンポーネント</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>xhrInterceptor</td>
      <td><code>[amp-form](../../../documentation/components/reference/amp-form.md?format=email), [amp-list](../../../documentation/components/reference/amp-list.md?format=email), [amp-state](https://amp.dev/documentation/components/amp-bind?format=email#initializing-state-with-amp-state)</code></td>
    </tr>
     <tr>
       <td>viewerRenderTemplate</td>
       <td><code>[amp-form](../../../documentation/components/reference/amp-form.md?format=email), [amp-list](../../../documentation/components/reference/amp-list.md?format=email)</code></td>
    </tr>
  </tbody>
</table>
