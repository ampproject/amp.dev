---
$title: 广告供应商
---

此文档列出了那些提供与 [`amp-ad`](/zh_cn/docs/reference/components/amp-ad.html) 组件搭配使用的内置配置的广告供应商和平台。要查看某个特定供应商的配置详情，请点击此供应商的链接。

{% call callout('注意', type='note') %}
对于想提供 AMP 集成功能的广告供应商，请参阅[面向开发者的 AMP 集成指南](https://github.com/ampproject/amphtml/blob/master/ads/README.md#developer-guidelines-for-a-pull-request).
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
 
 
 
