---
$title: 로그인
---

페이지에 처음 방문하면, 댓글 2개와 로그인 버튼을 볼 수 있습니다.

<amp-img src="/static/img/login-button.png" alt="Login button" height="290" width="300"></amp-img>

코드에서 로그인 버튼을 보면 아래와 같습니다:

[sourcecode:html]
<span amp-access="NOT loggedIn" role="button" tabindex="0" amp-access-hide>
  <h5>Please login to comment</h5>
  <button on="tap:amp-access.login-sign-in" class="button-primary comment-button">Login</button>
</span>
[/sourcecode]

`amp-access` 관련 속성의 동작은 `amp-access`를 위한 페이지 전체 구성에 따라 다릅니다. 이 경우 다음과 같습니다:

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

인증 엔드포인트는 AMPByExample의 일부에 배치됩니다. 이 엔드포인트를 제공하는 건 페이지 발행자의 책임입니다.
이 예제에서는 간단히 설명하기 위해 요청을 받으면 서버가 `ABE_LOGGED_IN`이라는 쿠키를 읽는 간단한 로직을 구현했습니다.
만약 쿠키가 없다면, `loggedIn = false`가 포함된 JSON 결과값을 반환할겁니다.
결과적으로 사용자가 처음 페이지에 방문했을 때, 이 요청은 `loggedIn = false`를 반환할 거고 로그인 버튼이 보일겁니다.

버튼의 HTML 코드를 다시 살펴보면, `on="tap:amp-access.login-sign-in"`를 사용하여, 사용자가 버튼을 클릭하면 위 JSON에 지정한 URL을 사용해야한다고 정의합니다.

[sourcecode:json]
{
	"login": {
    "sign-in": "https://ampbyexample.com/samples_templates/comment_section/login?rid=READER_ID&url=CANONICAL_URL"
  }
}

[/sourcecode]

참고: 로그인 노드 내부에 다른 URL을 정의할 수 있습니다. 위 경우 `sign-in`을 지정하고, 나중에 `sign-out`을 지정할겁니다.

로그인 페이지는 간단히 하기 위해 로그인 및 비밀번호 값을 입력받는 단순한 AMP가 아닌 페이지입니다.
서버사이드 템플릿을 통한 AMPByExample 서버에 의해 채워지는 `returnURL` hidden input type 사용을 주의하세요.
서버는 `return` 파라미터에서 이 값을 읽고, 자동으로 AMP 라이브러리에 의해 로그인 URL이 추가됩니다.

아래 예제에서, 로그인 버튼을 클릭하면 `return` 파라미터 값이 요청에 추가됩니다.
Chrome DevTools 콘솔의 네트워크 탭을 사용하여 이 값을 탐색할 수 있습니다.

<amp-img src="/static/img/return-parameter.png" alt="Return parameter" height="150" width="600"></amp-img>

AMPByExample 서버가 로그인 페이지에서 POST 요청을 받고 로그인 및 비밀번호가 맞으면 위에서 언급 한 returnURL로 요청을 리디렉션하고 `#success = true` 파라미터를 추가합니다.
이제 AMP 런타임에서 페이지를 인증하고 드디어 댓글을 추가 할 수 있습니다.

서버 구현은 페이지 게시자의 책임이므로 AMP 런타임이 수행하는 작업과 서버가 수행해야하는 작업을 이해하는 것이 중요합니다.

요약하자면 다음과 같습니다:

- AMP 런타임은 로그인 JSON 객체 내에 지정된 로그인 요청에 return 파라미터를 자동으로 추가합니다
- AMP 런타임은 로그인 페이지를 닫고 return URL 매개 변수로 지정된 페이지로 리디렉션합니다
- 사용자가 로그인 버튼을 클릭하면 서버가 응답을 조정해야합니다.

도움말: 이 flow에 대한 더 상세한 설명은 [amp-access documentation](/ko/docs/reference/components/amp-access.html#login-flow)에서 볼 수 있습니다.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">이전</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/login_requiring/add_comment.md', locale=doc.locale).url.path}}"><span class="arrow-next">다음</span></a>
</div>
