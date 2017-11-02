---
$title@: 支持的平台、供应商和合作伙伴
$order: 3
$parent: /content/support/faqs.md
class: who

description@: Accelerated Mobile Pages (AMP) 项目是一项开放源代码计划，旨在让发布商轻松做到：只需创建一次适合在移动设备上浏览的内容，即可使这些内容在各种设备上都能瞬间完成加载 - Accelerated Mobile Pages 项目

cta:
  title@: 下一个常见问题解答
  link_text@: AMP 概览
  link_url: /content/support/faqs/overview@zh_cn.md

---
{% set who = g.doc('/content/includes/who.yaml', locale=doc.locale) %}

<div class="inline-toc">
  <ul>
    {% for section in who.tech_companies.sections %}
      <li><a href="#{{section.title|slug}}">{{_(section.title)}}</a></li>
    {% endfor %}
  </ul>
</div>

越来越多的平台、供应商和合作伙伴通过在各自的平台内提供自定义组件或集成 AMP 网页功能来支持 AMP 项目。

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
