---
"$title": Logout
"$order": '3'
description: 로그인 버튼과 마찬가지로 로그아웃 버튼의 존재 여부는 amp-access 컴포넌트의 상태에 따라 달라집니다...
---

로그인 버튼과 마찬가지로 로그아웃 버튼의 존재 여부는 [`amp-access`](../../../../documentation/components/reference/amp-access.md) 컴포넌트의 상태에 따라 달라집니다.

[sourcecode:html]
<button amp-access="loggedIn" amp-access-hide tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button>
[/sourcecode]

[sourcecode:html] <button amp-access="loggedIn" amp-access-hide="" tabindex="0" on="tap:amp-access.login-sign-out" class="button-primary comment-button">Logout</button> [/sourcecode]

[sourcecode:json]
{
"login": {
  "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL",
  "sign-out": "https://ampbyexample.com/samples_templates/comment_section/logout"
  }
}
[/sourcecode]

로그아웃 버튼을 클릭하면, 로그인 객체의 일부로 [`amp-access`](../../../../documentation/components/reference/amp-access.md) JSON 환경에 정의된 URL로 이동합니다.
