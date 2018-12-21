---
$title: 로그아웃
---

로그인 버튼과 마찬가지로 로그아웃 버튼의 존재 여부는 `amp-access` 컴포넌트의 상태에 따라 다릅니다.

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

로그아웃 버튼을 클릭하면, 로그인 객체의 일부로 `amp-access` JSON 환경에 정의된 URL로 이동합니다.

[sourcecode:json]
{
"login": {
  "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
  "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
  }
}
[/sourcecode]

로그인과 마찬가지로 AMPByExample 서버가 로그아웃 요청을 받으면 자동으로 AMP 라이브러리에서 추가한 반환 URL 쿼리 파라미터를 사용하여 리디렉션하고 `#success=true`를 추가합니다
이 시점에 여러분은 처음 페이지로 돌아왔으며, 동일 시점에서 로그인 페이지(`ABE_LOGGED_IN`)에 대해 이전에 생성 된 AMPByExample 쿠키가 지워집니다.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/add_comment.md', locale=doc.locale).url.path}}"><span class="arrow-prev">이전</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/summary.md', locale=doc.locale).url.path}}"><span class="arrow-next">다음</span></a>
</div>
