---
$title: 로그인이 필요한 AMP 페이지 만들기
$order: 2
numbered: 1
---

페이지에서 댓글을 남기는 등, 몇가지 유저 인터렉션은 로그인 flow로 조절할 수 있습니다. 
[amp-form](https://www.ampproject.org/docs/reference/components/amp-form) 컴포넌트와 [amp-access](https://www.ampproject.org/docs/reference/components/amp-access) 컴포넌트를 함께 사용하여 AMP로 로그인 flow를 구현할 수 있습니다. 
{% call callout('Tip', type='success') %}
구현 샘플을 보고싶다면,[ampbyexample.com](https://ampbyexample.com)의 [comment section sample](https://ampbyexample.com/samples_templates/comment_section/)을 방문하세요.
{% endcall %}

[comment section sample](https://ampbyexample.com/samples_templates/comment_section/)은 유저가 로그인했을 때만 댓글 섹션이 만들어지도록 `amp-access`와 `amp-form`으로 구성하였습니다.
이 샘플이 어떻게 동작하는 지 설명하기 위해, 페이지에 도달하면 수행할 일련의 작업을 수행해보겠습니다.

{% include "/views/partials/sub_nav.html" %}

<a class="button go-button" href="/ko/docs/get_started/login_requiring/login.html">1단계로 계속</a>
