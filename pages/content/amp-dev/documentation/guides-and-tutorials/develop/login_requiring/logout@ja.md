---
"$title": Logout
"$order": '3'
description: ログアウトボタンも、ログインボタンと同じように amp-access コンポーネントの状態に応じて表示が切り替わります ...
---

ログアウトボタンも、ログインボタンと同じように [`amp-access`](../../../../documentation/components/reference/amp-access.md) コンポーネントの状態に応じて表示が切り替わります。

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

Logout ボタンをクリックすると、[`amp-access`](../../../../documentation/components/reference/amp-access.md) JSON 構成の login オブジェクトの一部として指定した URL にリダイレクトされます。

[sourcecode:json]
{
"login": {
  "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
  "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
  }
}
[/sourcecode]

ログインの場合と同様に、AMPByExample サーバーはログアウト リクエストを受け取ると、AMP ライブラリによって自動的に追加されるリターン URL クエリ パラメータを使用し、`#success=true` を追加してリダイレクトします。この時点で初期ページに戻り、ログインページで作成した AMPByExample Cookie（`ABE_LOGGED_IN`）は削除されます。
