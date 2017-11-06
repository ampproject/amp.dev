---
$title@: AMP を支持するプラットフォーム、ベンダー、パートナー
$order: 3
$parent: /content/support/faqs.md
class: who

description@: AMP（Accelerated Mobile Pages）は、どこにいても瞬時に読み込まれるモバイル フレンドリーなコンテンツを簡単に作成できるようにするためのオープンソース プロジェクトです。- Accelerated Mobile Pages プロジェクト

cta:
  title@: 次のよくある質問
  link_text@: AMP の概要
  link_url: /content/support/faqs/overview@ja.md

---
{% set who = g.doc('/content/includes/who.yaml', locale=doc.locale) %}

<div class="inline-toc">
  <ul>
    {% for section in who.tech_companies.sections %}
      <li><a href="#{{section.title|slug}}">{{_(section.title)}}</a></li>
    {% endfor %}
  </ul>
</div>

カスタム コンポーネントの提供や AMP ページのプラットフォームへの統合などを通じて AMP プロジェクトをサポートするプラットフォーム、ベンダー、パートナーの数は増え続けています。

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
