---
$title: ログイン
---

このページを初めて開いたときには、2 つのコメントとログインボタンが表示されます。

<amp-img src="/static/img/login-button.png" alt="ログインボタン" height="290" width="300"></amp-img>

ログインボタンは、コードでは次のように記述されています。

[sourcecode:html]
<span amp-access="NOT loggedIn" role="button" tabindex="0" amp-access-hide>
  <h5>Please login to comment</h5>
  <button on="tap:amp-access.login-sign-in" class="button-primary comment-button">Login</button>
</span>
[/sourcecode]

`amp-access` に関連する属性の動作は、`amp-access` に対してページ全体で適用される設定に依存します。ここでは次のようになります。

[sourcecode:html]
<script id="amp-access" type="application/json">
  {
    "authorization": "https://ampbyexample.com/samples_templates/comment_section/authorization?rid=READER_ID&url=CANONICAL_URL&ref=DOCUMENT_REFERRER&_=RANDOM",
    "noPingback": "true",
    "login": {
      "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
      "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
    },
    "authorizationFallbackResponse": {
      "error": true,
      "loggedIn": false
    }
  }
</script>
[/sourcecode]

認証エンドポイントは AMPByExample の一部としてデプロイされます。ページの公開元は、このエンドポイントを提供する責任があります。このケース例では、単純化するために基本ロジックが実装されており、サーバーはこのリクエストを受信すると、`ABE_LOGGED_IN` という名前の Cookie の値を読み取ります。Cookie がない場合は、`loggedIn = false` を含む JSON レスポンスを返します。その結果、ユーザーが初めてこのページを開くと、このリクエストによって `loggedIn = false` が返され、ログインボタンが表示されます。

ボタンの HTML コードをもう一度見てください。`on="tap:amp-access.login-sign-in"` が使用されているので、ユーザーがボタンをタップしたときには、上の JSON で指定された URL が使用されるはずです。

[sourcecode:json]
{
    "login": {
    "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL"
  }
}

[/sourcecode]

メモ: ログインノード内には、異なる URL を定義することができます。この例では、まず `sign-in` の URL を定義し、後で `sign-out` を定義します。

このログインページは非 AMP ページですが、ここではわかりやすいように、このページにログイン ID とパスワードの値を入力します。input type="hidden" である `returnURL` の使い方に注意してください。この値はサーバー側のテンプレート作成を通じて AMPByExample サーバーが設定します。サーバーは、AMP ライブラリによってログイン URL に自動的に追加される `return` というパラメータからこの値を読み取ります。

下の例では、ログインボタンをクリックすると、`return` パラメータの値がリクエストに追加されます。この値を調べるには、Chrome DevTools コンソールを使用して、[Network] タブに移動します。

<amp-img src="/static/img/return-parameter.png" alt="return パラメータ" height="150" width="600"></amp-img>


AMPByExample サーバーがログインページから POST リクエストを受け取り、ログイン ID とパスワードが正しい場合、サーバーはリクエストを前述の `returnURL` にリダイレクトし、`#success=true` パラメータを末尾に追加します。これで AMP ランタイムがページを承認でき、コメントの追加が可能になりました。

サーバーの実装はページ公開元の責任であるため、AMP ランタイムの機能とサーバーの機能について理解することが重要です。

まとめ:

- AMP ランタイムは、ログイン JSON オブジェクトで指定されたログイン リクエストに対して return パラメータを自動的に追加します
- AMP ランタイムはログインページを閉じて、return URL パラメータで指定されたページにリダイレクトします
- ユーザーがログインボタンをクリックすると、サーバーはレスポンスを調整する必要があります

ヒント: このフローの詳細については、[amp-access ドキュメント](/ja/docs/reference/components/amp-access.html#login-flow)をご覧ください。

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">前へ</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/add_comment.md', locale=doc.locale).url.path}}"><span class="arrow-next">次へ</span></a>
</div>
