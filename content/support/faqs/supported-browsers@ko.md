---
$title: 지원하는 브라우저
$order: 4
$parent: /content/support/faqs.md
class: who

cta:
  title: 다음 FAQ
  link_text: AMP 살펴보기
  link_url: /content/support/faqs/overview.md
---
{% set who = g.doc('/content/includes/who.yaml', locale=doc.locale) %}

<div class="browser-container">
{% for browser in who.browsers %}
  <div class="browser">
    <amp-img width="75"
        height="75"
        layout="responsive"
        src="{{browser.img}}"></amp-img>
    <p class="browser-title">{{browser.title}}</p>
  </div>
{% endfor %}
</div>

보통 Chrome, Firefox, Edge, Safari, Opera같은 주요 브라우저의 2가지 최신 버전을 지원합니다.
우리는 이러한 브라우저의 데스크탑, 휴대전화, 태블릿 및 웹 뷰 버전을 지원합니다.

이외에도 핵심 AMP 라이브러리 및 내장 요소는 매우 광범위한 브라웢 지원을 목표로 하며,
시장 점유율이 1% 이상인 모든 브라우저에 대한 수정 사항을 허용합니다.

특히 Android 4.0 시스템 브라우저 및 휴대전화의 Chrome 28+를 지원하며,
"완벽하게 동작하지는 않지만 깨지지는 않음" 상태를 유지하고자 합니다.
