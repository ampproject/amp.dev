---
$title: 광고 공급업체
---

이 문서에서는 [`amp-ad`](/ko/docs/reference/components/amp-ad.html) 구성요소와 함께 사용할 수 있는 내장 설정을 제공하는 광고 공급업체 및 플랫폼을 소개합니다. 특정 공급업체와 관련된 설정 세부정보를 보려면 공급업체 링크를 클릭하세요. 

{% call callout('참고', type='note') %}
AMP와의 통합 기능을 제공하려는 광고 공급업체는 [AM 통합에 관한 개발자 가이드라인](https://github.com/ampproject/amphtml/blob/master/ads/README.md#developer-guidelines-for-a-pull-request)을 참조하세요.
{% endcall %}


{% set who = g.doc('/content/includes/who.yaml', locale=doc.locale) %}

<div class="ads-container">
  {% for section in who.tech_companies.sections %}
    {% if section.title == 'Ads' %}
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
      {% endif %}
  {% endfor %}
</div>
 
 
 
