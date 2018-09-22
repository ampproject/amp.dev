---
$title@: 지원되는 브라우저
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

일반적으로 Chrome, Firefox, Edge, Safari, Opera, UC Browser와 같은 주요 브라우저의 최신 버전 2개가 지원됩니다. 각 브라우저의 데스크톱, 스마트폰, 태블릿, 웹 보기 버전이 지원됩니다.

그 외에도 핵심 AMP 라이브러리 및 내장 요소는 아주 광범위한 브라우저를 지원할 예정이며, 시장점유율이 1% 이상인 모든 브라우저에서는 관련 수정사항을 제출할 수 있습니다.

특히 휴대전화의 Android 4.0 시스템 브라우저 및 Chrome 28 이상과 관련해서는 '완벽하지는 않지만 지속적으로' 지원하려고 노력하고 있습니다.
 
