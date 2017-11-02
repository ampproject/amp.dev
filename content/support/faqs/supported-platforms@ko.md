---
$title: 지원하는 플랫폼, 벤더 및 파트너
$order: 3
$parent: /content/support/faqs.md
class: who

description: AMP (Accelerated Mobile Pages) 프로젝트는 게시자가 모바일 친화적인 콘텐츠를 한 번만 만들고 즉시로딩할 수있는 오픈 소스 이니셔티브입니다. – Accelerated Mobile Pages Project

cta:
  title: 다음 FAQ
  link_text: AMP 살펴보기
  link_url: /content/support/faqs/overview@ko.md

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
    <section id="{{section.title|slug}}">
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
