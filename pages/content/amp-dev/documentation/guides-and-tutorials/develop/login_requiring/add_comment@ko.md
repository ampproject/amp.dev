---
$title: 댓글 추가
---

<amp-img src="/static/img/comment.png" alt="Add comment" height="325" width="300"></amp-img>

이 시점에서 사용자는 `amp-form` 라이브러리를 사용하여 댓글을 추가할 수 있습니다. `amp-access` 컴포넌트의 상태에 따라 form의 존재여부가 조건부인 지 확인하십시오.

[sourcecode:html]
<form amp-access="loggedIn" amp-access-hide method="post" action-xhr="<%host%>/samples_templates/comment_section/submit-comment-xhr" target="_top">
[/sourcecode]

XHR이 아닌 액션은 AMP의 POST 메서드에서 허용하지 않으므로, POST 메서드와 XHR 액션을 정의합니다. 데모에서 이후에 댓글을 계속 사용하지 않기 때문에 댓글은 그 시점에만 추가할 수 있습니다.
댓글이 추가될 때마다, AMPByExample 서버는 타임 스탬프, 아바타, 유저 이름같은 몇가지 추가 정보와 함께 유저가 입력한 텍스트를 포함하는 JSON 응답을 반환합니다.

JSON 응답 예제입니다:

[sourcecode:json]
{"Datetime":"09:34:21",
"User":"Charlie",
"Text":"Hello!",
"UserImg":"/img/ic_account_box_black_48dp_1x.png"}
[/sourcecode]

폼 컴포넌트는 단순히 [amp-mustache](/ko/docs/reference/components/amp-mustache.html) 템플릿을 이용한 페이지 내에 그 값을 표현합니다.

[sourcecode:html]
<div submit-success>
  <template type="amp-mustache">
    <div class="comment-user">
      <amp-img width="44" class="user-avatar" height="44" alt="user" src="{{UserImg}}"></amp-img>
      <div class="card comment">
        <p><span class="user">{{User}}</span> <span class="date">{{Datetime}}</span></p>
        <p>{{Text}}</p>
      </div>
    </div>
  </template>
</div>
[/sourcecode]

이 예제에서는 댓글 값이 비어있는지 확인합니다. 값이 비어있으면 다음 코드가 실행되도록 하는 오류를 반환합니다.

[sourcecode:html]
<div submit-error>
  <template type="amp-mustache">
    Error! Looks like something went wrong with your comment, please try to submit it again.
  </template>
</div>
[/sourcecode]

추가로, 댓글을 제출하기 전에 댓글 텍스트가 있는지 확인하기 위해 `required` 속성을 추가합니다.

<amp-img src="/static/img/enforce-comment.png" alt="Enforce comment" height="325" width="300"></amp-img>

[sourcecode:html]
<input type="text" class="data-input" name="text" placeholder="Your comment..." required>
[/sourcecode]

댓글을 추가하고 제출 버튼을 클릭하면 다음 스크린 샷과 비슷한 내용을 볼 수 있습니다.

<amp-img src="/static/img/logout-button.png" alt="Comment added" height="352" width="300"></amp-img>

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/login.md', locale=doc.locale).url.path}}"><span class="arrow-prev">이전</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/logout.md', locale=doc.locale).url.path}}"><span class="arrow-next">다음</span></a>
</div>
