---
"$title": Create a login-requiring AMP page
"$order": '0'
description: 댓글 남기기 같은 사용자의 페이지 인터랙션에는 로그인 흐름이 필요할 수 있습니다. AMP로 로그인 흐름을 구현하는 데...
numbered: '1'
"$hidden": 'true'
formats:
- websites
---

댓글 남기기 같은 사용자의 페이지 인터랙션에는 로그인 흐름이 필요할 수 있습니다 [`amp-access`](../../../../documentation/components/reference/amp-form.md) 컴포넌트와 [`amp-form`](../../../../documentation/components/reference/amp-form.md) 컴포넌트를 함께 사용하여 AMP로 로그인 흐름을 구현할 수 있습니다.

[tip type="tip"] <strong>도움말 –</strong> 구현 샘플을 보고 싶다면 [ampbyexample.com](../../../../documentation/examples/index.html)에서 [댓글 영역 샘플](../../../../documentation/examples/documentation/Comment_Section.html)을 확인하세요. [/tip]

[댓글 영역 샘플](../../../../documentation/examples/documentation/Comment_Section.html)은 사용자가 로그인했을 때만 댓글 영역이 만들어지도록 [`amp-access`](../../../../documentation/components/reference/amp-access.md)와 [`amp-form`](../../../../documentation/components/reference/amp-form.md) 컴포넌트로 구성하였습니다. 이 샘플이 어떻게 동작하는지 설명하기 위해 페이지를 열었을 때 수행되는 일련의 작업을 수행해보겠습니다.
