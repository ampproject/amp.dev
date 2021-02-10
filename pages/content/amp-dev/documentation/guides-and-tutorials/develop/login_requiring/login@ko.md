---
'$title': Login
$order: 1
description: 페이지에 처음 방문하면, 댓글 2개와 로그인 버튼을 볼 수 있습니다. 코드에서 로그인 버튼을 찾으면...
---

<a>페이지</a>에 처음 방문하면, 댓글 2개와 로그인 버튼을 볼 수 있습니다.

<amp-img src="/static/img/login-button.jpg" alt="Login button" height="290" width="300"></amp-img>

코드에서 로그인 버튼을 찾으면 아래와 같습니다:

[sourcecode:html]
<span amp-access="NOT loggedIn" role="button" tabindex="0" amp-access-hide>

  <h5>Please login to comment</h5>
  <button on="tap:amp-access.login-sign-in" class="button-primary comment-button">Login</button>
</span>
[/sourcecode]

[`amp-access`](../../../../documentation/components/reference/amp-access.md) 관련 속성의 동작은 [`amp-access`](../../../../documentation/components/reference/amp-access.md)를 위한 페이지 전체 구성에 따라 다릅니다. 예제의 경우 다음과 같습니다:

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

인증 엔드포인트는 AMPByExample의 일부로서 배치됩니다. 이 엔드포인트를 제공하는 건 페이지 퍼블리셔의 책임입니다. 이 예제에서는 간단히 설명하기 위해 요청을 받으면 서버가 `ABE_LOGGED_IN`이라는 쿠키를 읽는 간단한 로직을 구현했습니다. 만약 쿠키가 없다면, `loggedIn = false`가 포함된 JSON 결과값이 반환됩니다. 결과적으로 사용자가 처음 페이지에 방문했을 때 이 요청은 `loggedIn = false`를 반환하고 로그인 버튼이 표시됩니다.

버튼의 HTML 코드를 다시 살펴보겠습니다. `on="tap:amp-access.login-sign-in"`를 사용하여 사용자가 버튼을 클릭할 경우 위 JSON에 지정된 URL이 사용되도록 정의했습니다.

[sourcecode:json]
{
"login": {
"sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL"
}
}

[/sourcecode]

[tip type="note"] <strong>참고 –</strong> 로그인 노드 내부에 다른 URL을 정의할 수 있습니다. 위 경우 `sign-in`을 정의하고 추후 `sign-out`을 지정하게 됩니다. [/tip]

로그인 페이지는 간소화를 위해 로그인 및 비밀번호 값을 입력받는 단순한 AMP가 아닙니다. 서버 측 템플릿을 통한 AMPByExample 서버로 채워지는 숨겨진 입력 유형인 `returnURL` 사용에 주의하세요. 서버는 AMP 라이브러리가 로그인 URL에 자동으로 추가한 `return` 매개변수에서 이 값을 판독합니다.

아래 예제에서, 로그인 버튼을 클릭하면 `return` 매개변수 값이 요청에 추가됩니다. Chrome DevTools 콘솔의 네트워크 탭을 사용하여 이 값을 탐색할 수 있습니다.

<amp-img src="/static/img/return-parameter.jpg" alt="Return parameter" height="150" width="600"></amp-img>

AMPByExample 서버가 로그인 페이지에서 POST 요청을 받고 로그인 및 비밀번호가 올바르면 위에서 언급된 `returnURL`로 요청을 리디렉션하고 `#success = true` 매개변수를 추가합니다. 이제 AMP 런타임에서 페이지를 인증하고 댓글을 추가할 수 있습니다.

서버 구현은 페이지 퍼블리셔의 책임이므로 AMP 런타임이 수행하는 작업과 서버가 수행해야 할 작업을 이해하는 것이 중요합니다.

요약하자면 다음과 같습니다:

- AMP 런타임은 로그인 JSON 객체 내에 지정된 로그인 요청에 return 매개변수를 자동으로 추가합니다
- AMP 런타임은 로그인 페이지를 닫고 return URL 매개변수로 지정된 페이지로 리디렉션합니다
- 사용자가 로그인 버튼을 클릭하면 서버에서 응답을 통제해야 합니다.

[tip type="tip"] <strong>도움말 –</strong> 이 흐름에 대한 상세한 설명은 [`amp-access`](../../../../documentation/components/reference/amp-access.md)에서 확인할 수 있습니다. [/tip]
