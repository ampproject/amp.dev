---
"$title": コメントを追加する
"$order": '2'
description: At this point, the user can add a comment using the amp-form, library. Notice how the presence of the form is conditional, depending on the state of the amp-access component ...
---

<amp-img src="/static/img/comment.png" alt="Add comment" height="325" width="300"></amp-img>

ここで、ユーザーは [`amp-form`](../../../../documentation/components/reference/amp-form.md) ライブラリを使用してコメントを追加できます。フォームが存在するかどうかは、[`amp-access`](../../../../documentation/components/reference/amp-access.md) コンポーネントの状態によって決まることに注意してください。

[sourcecode:html]
<form amp-access="loggedIn" amp-access-hide method="post" action-xhr="<%host%>/samples_templates/comment_section/submit-comment-xhr" target="_top">
[/sourcecode]

AMP では XHR 以外のアクションを POST メソッドとともに使用できないため、POST メソッドと XHR アクションを指定します。 これはデモであり、コメントを残すことを想定していないため、ここで追加できるコメントは 1 つのみです。コメントを追加するたびに、AMPByExample サーバーは、入力したテキストと、タイムスタンプとユーザーのアバターや名前などの追加情報を含む JSON レスポンスを返します。

JSON レスポンスの例を次に示します。

[sourcecode:json] {"Datetime":"09:34:21", "User":"Charlie", "Text":"Hello!", "UserImg":"/img/ic_account_box_black_48dp_1x.png"} [/sourcecode]

フォーム コンポーネントは、[`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md) テンプレートを使用して、ページ内に値を表示します。

[sourcecode:html]
<div submit-success>
  <template type="amp-mustache">
    <div class="comment-user">
      <amp-img width="44" class="user-avatar" height="44" alt="user" src="{{UserImg}}"></amp-img>
      <div class="card comment">
        <p><span class="user">{% raw %}{{User}}{% endraw %}</span><span class="date">{% raw %}{{Datetime}}{% endraw %}</span></p>
        <p>{% raw %}{{Text}}{% endraw %}</p>
      </div>
    </div>
  </template>
</div>
[/sourcecode]

この例では、コメントの値が空でないことのみをチェックしています。値が空の場合は、エラーが返されて次のコードが実行されます。

[sourcecode:html]
<div submit-error>
  <template type="amp-mustache">
    Error! Looks like something went wrong with your comment, please try to submit it again.
  </template>
</div>
[/sourcecode]

さらに念のため、テキストを入力しないとコメントを送信できないように `required` 属性を追加します。

<amp-img src="/static/img/enforce-comment.png" alt="Enforce comment" height="325" width="300"></amp-img>

[sourcecode:html]
<input type="text" class="data-input" name="text" placeholder="Your comment..." required>
[/sourcecode]

コメントを追加して送信ボタンをクリックすると、次のスクリーンショットのような画面が表示されます。

<amp-img src="/static/img/logout-button.png" alt="Comment added" height="352" width="300"></amp-img>
