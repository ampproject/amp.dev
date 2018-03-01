---
$title: 로그인이 필요한 AMP 페이지 만들기
$order: 4
numbered: 1
---

댓글 남기기 같은 사용자의 페이지 인터랙션은 로그인 흐름이 필요할 수 있습니다
[amp-form](https://www.ampproject.org/ko/docs/reference/components/amp-form) 컴포넌트와 [amp-access](https://www.ampproject.org/ko/docs/reference/components/amp-access) 컴포넌트를 함께 사용하여 AMP로 로그인 흐름을 구현할 수 있습니다.
{% call callout('Tip', type='success') %}
구현 샘플을 보고싶다면,[ampbyexample.com](https://ampbyexample.com)의 [댓글 영역 예제](https://ampbyexample.com/samples_templates/comment_section/)을 방문하세요.
{% endcall %}

[댓글 영역 예제](https://ampbyexample.com/samples_templates/comment_section/)는 유저가 로그인했을 때만 댓글 영역이 만들어지도록 `amp-access`와 `amp-form`으로 구성하였습니다.
이 샘플이 어떻게 동작하는지 설명하기 위해, 페이지에 도달하면 수행할 일련의 작업을 수행해보겠습니다.

{% include "/views/partials/sub_nav.html" %}

<div class="prev-next-buttons">
<a class="button" href="/ko/docs/tutorials/login_requiring/login.html"><span class="arrow-next">시작하기</span></a>
</div>
