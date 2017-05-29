---
$title: 지원하는 플랫폼, 벤더 및 파트너
$order: 3
$parent: /content/support/faqs.md
class: who

description: AMP (Accelerated Mobile Pages) 프로젝트는 게시자가 모바일 친화적인 콘텐츠를 한 번만 만들고 즉시로딩할 수있는 오픈 소스 이니셔티브입니다. – Accelerated Mobile Pages Project

cta:
  title: 다음 FAQ
  link_text: AMP 살펴보기
  link_url: /content/support/faqs/overview.md

---
{% set who = g.doc('/content/includes/who.yaml', locale=doc.locale) %}

<div class="inline-toc">
  <ul>
    {% for section in who.tech_companies.sections %}
      <li><a href="#{{section.title|slug}}">{{_(section.title)}}</a></li>
    {% endfor %}
  </ul>
</div>

AMP 프로젝트를 지원하는 플랫폼, 공급 업체 및 파트너가 증가함에 따라 사용자 정의 컴포넌트를 제공하거나 플랫폼 내의 AMP 페이지와의 통합을 제공합니다.

<div class="who-container">
  <amp-accordion disable-session-states>
  {% for section in who.tech_companies.sections %}
    <section id="{{section.title|slug}}" {% if loop.index == 1 %}expanded{% endif %}>
      <header class="accordion-header">
        <h4 class="accordion-title">{{_(section.title)}}</h4>
        {% if section.description %}<p>{{_(section.description)}}</p>{% endif %}
      </header>
      <div class="accordion-content">
        <ol class="item-container">
        {% for item in section.section_items %}
          <li class="item">
            {% if item.link %}
              <a href="{{item.link}}">{{item.title}}</a>
            {% else %}
              {{item.title}}
            {% endif %}
          </li>
        {% endfor %}
        </ol>
      </div>
    </section>
  {% endfor %}
  </amp-accordion>
</div>

<hr>

# 지원하는 브라우저

<div class="browser-container">
{% for item in who.browsers %}
  <div class="browser">
    <amp-img width="75"
        height="75"
        layout="responsive"
        src="{{item.img}}"></amp-img>
    <p class="browser-title">{{item.title}}</p>
  </div>
{% endfor %}
</div>

보통 Chrome, Firefox, Edge, Safari, Opera같은 주요 브라우저의 2가지 최신 버전을 지원합니다.
우리는 이러한 브라우저의 데스크탑, 휴대전화, 태블릿 및 웹 뷰 버전을 지원합니다.

이외에도 핵심 AMP 라이브러리 및 내장 요소는 매우 광범위한 브라웢 지원을 목표로 하며,
시장 점유율이 1% 이상인 모든 브라우저에 대한 수정 사항을 허용합니다.

특히 Android 4.0 시스템 브라우저 및 휴대전화의 Chrome 28+를 지원하며,
"완벽하게 동작하지는 않지만 깨지지는 않음" 상태를 유지하고자 합니다.
