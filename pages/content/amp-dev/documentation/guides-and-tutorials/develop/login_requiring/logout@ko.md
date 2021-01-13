---
"$title": Logout
"$order": '3'
description: 로그인 버튼과 마찬가지로 로그아웃 버튼의 존재 여부는 amp-access 컴포넌트의 상태에 따라 달라집니다...
---

로그인 버튼과 마찬가지로 로그아웃 버튼의 존재 여부는 [`amp-access`](../../../../documentation/components/reference/amp-access.md) 컴포넌트의 상태에 따라 달라집니다.

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

로그아웃 버튼을 클릭할 경우 로그인 객체의 일부로 [`amp-access`](../../../../documentation/components/reference/amp-access.md) JSON 환경에 정의된 URL로 이동합니다.

[sourcecode:json]
{
"login": {
  "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
  "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
  }
}
[/sourcecode]

로그인과 마찬가지로 AMPByExample 서버가 로그아웃 요청을 받으면 자동으로 AMP 라이브러리에서 추가한 반환 URL 쿼리 매개변수를 사용하여 리디렉션하고 `#success=true`를 추가합니다. 이 시점에 사용자는 처음 페이지로 돌아오며 로그인 페이지(`ABE_LOGGED_IN`)에서 이전에 생성된 AMPByExample 쿠키는 삭제됩니다.
