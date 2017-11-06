---
$title@: Platform, Vendor, dan Partner yang Didukung
$order: 3
$parent: /content/support/faqs.md
class: who

description@: Proyek Accelerated Mobile Pages (AMP) adalah inisiatif open source yang mempermudah penayang untuk membuat konten mobile-friendly dan dapat dimuat dengan cepat di mana saja. – Proyek Accelerated Mobile Pages

cta:
  title@: FAQ Berikutnya
  link_text@: Ringkasan AMP
  link_url: /content/support/faqs/overview@id.md

---
{% set who = g.doc('/content/includes/who.yaml', locale=doc.locale) %}

<div class="inline-toc">
  <ul>
    {% for section in who.tech_companies.sections %}
      <li><a href="#{{section.title|slug}}">{{_(section.title)}}</a></li>
    {% endfor %}
  </ul>
</div>

Semakin banyak platform, vendor, dan partner mendukung Proyek AMP dengan menyediakan komponen kustom atau menawarkan integrasi dengan halaman AMP dalam platform mereka.

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
