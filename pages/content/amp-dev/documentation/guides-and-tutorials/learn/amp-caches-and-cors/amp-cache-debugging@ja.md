---
'$title': AMP キャッシュ問題のデバッグ
$order: 8
formats:
  - websites
  - stories
  - ads
teaser:
  text: AMP キャッシュでドキュメントが破損しているのはなぜですか？
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-debugging.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

## AMP キャッシュでドキュメントが破損しているのはなぜですか？ <a name="why-is-my-doc-broken-on-an-amp-cache"></a>

有効な AMP ドキュメントは通常、AMP キャッシュ上と元の場所で同じように表示され、動作します。ただし、問題となるコンポーネントとサーバー構成がいくつかあります。

特定のドキュメントが元のドキュメントと同じように表示され、動作するにも関わらす、キャッシュで表示するとそうでない場合（[元の URL を Google の AMP キャッシュにマッピングするには](https://developers.google.com/amp/cache/overview#amp-cache-url-format)）は、以下をお試しください。

1. ブラウザの開発者/エラーツールコンソールを開き、表示されるエラーや警告を解決します。
2. [AMPBench](https://search.google.com/test/amp) を通じてドキュメントを実行し、予期されないエラーや警告をすべて解決します。

これらの手順に従っても問題が解決しない場合は、以下の表を確認してください。

<table>
<table>
  <thead>
    <tr>
      <th width="30%">症状</th>
      <th width="30%">問題</th>
      <th width="40%">解決策</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ウェブフォントが表示されない（フォールバックフォントが使用される）</td>
      <td>フォントプロバイダのホワイトリストに AMP キャッシュが含まれていない。</td>
      <td>フォントプロバイダに連絡し、<a href="amp-cors-requests.md#cors-security-in-amp">すべてのキャッシュ</a>を allowlist に含めるように依頼してください。</td>
    </tr>
    <tr>
      <td>アセット（フォントや画像など）が表示されない（ (<strong>HTTP オリジン</strong>のみ）</td>
      <td>ドキュメントにプロトコル相対 URL が使用されている。</td>
      <td>絶対 URL に切り替えてください（<code>//www.site.com/doc/amp</code> ではなく <code>http://www.site.com/doc/amp</code> を使用する）。</td>
    </tr>
    <tr>
      <td rowspan="2">アセット（フォントや画像など）が表示されない</td>
      <td>アセットの MIME タイプが誤って配信されている。</td>
      <td> <a href="https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cache-guidelines.md#guidelines-accepted-mime-types">許可される MIME タイプ</a>を指定してください。</td>
    </tr>
    <tr>
      <td>AMP キャッシュからアセットにアクセスできない。</td>
      <td>AMP キャッシュがアセットにアクセスできることと、IP アドレスやユーザーエージェントなどによってブロックされていないことを確認してください（<a href="https://support.google.com/webmasters/answer/1061943?hl=en">Google のクローラーが使用するエージェントのリスト</a>）。</td>
    </tr>
    <tr>
      <td> <code>&lt;amp-form&gt;</code>、<code>&lt;amp-list&gt;</code> などの動的要素が期待通りに動作しない。</td>
      <td>CORS ヘッダーが破損または欠落している。</td>
      <td>これらのコンポーネントは、AMP キャッシュからオリジンにクロスオリジンリクエストを発行します。デフォルトでは、これらのリクエストはブラウザによってブロックされています。これらのリクエストを許可するには、<a href="amp-cors-requests.md">すべてのキャッシュ</a>を allowlist に追加する <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">CORS ヘッダー</a>を発行してください。</td>
    </tr>
    <tr>
      <td>法的削除通知により削除されるべきコンテンツが配信される。</td>
      <td>AMP キャッシュからコンテンツが削除されていない。</td>
      <td>各 AMP キャッシュで、ガイドラインに従って、コンテンツを更新してください。Google AMP キャッシュについては、<a href="https://developers.google.com/amp/cache/update-cache">AMP コンテンツの更新</a>を参照してください。</td>
    </tr>
</tbody>
</table>

</table>
