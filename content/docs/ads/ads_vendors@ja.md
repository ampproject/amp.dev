---
$title: 広告ベンダー
---

このドキュメントでは、[`amp-ad`](/ja/docs/reference/components/amp-ad.html) コンポーネントで使用するための組み込み設定を提供する広告ベンダーとプラットフォームを一覧表示しています。特定ベンダーの設定の詳細を表示するには、ベンダーのリンクをクリックしてください。

{% call callout('注', type='note') %}
AMP との統合を希望する広告ベンダーについては、[AMP との統合に関するデベロッパー向けガイドライン](https://github.com/ampproject/amphtml/blob/master/ads/README.md#developer-guidelines-for-a-pull-request)をご覧ください。
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
 
 
 
