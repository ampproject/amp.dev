---
$title: 로그인이 필요한 AMP 페이지 만들기
---

댓글 남기기 같은 사용자의 페이지 인터랙션은 로그인 흐름이 필요할 수 있습니다
[`amp-form`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-form.md', locale=doc.locale).url.path}}) 컴포넌트를 함께 사용하여 AMP로 로그인 흐름을 구현할 수 있습니다.

도움말: 구현 샘플을 보고싶다면,[ampbyexample.com]({{g.doc('/content/amp-dev/documentation/examples/index.html', locale=doc.locale).url.path}})의 [댓글 영역 예제]({{g.doc('/content/amp-dev/documentation/examples/documentation/Comment_Section.html', locale=doc.locale).url.path}})을 방문하세요.

[댓글 영역 예제]({{g.doc('/content/amp-dev/documentation/examples/documentation/Comment_Section.html', locale=doc.locale).url.path}})는 유저가 로그인했을 때만 댓글 영역이 만들어지도록 [`amp-access`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-access.md', locale=doc.locale).url.path}})와 [`amp-form`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-form.md', locale=doc.locale).url.path}})으로 구성하였습니다.
이 샘플이 어떻게 동작하는지 설명하기 위해, 페이지에 도달하면 수행할 일련의 작업을 수행해보겠습니다.
