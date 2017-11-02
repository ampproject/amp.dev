---
$title: Plataformas, proveedores y socios
$order: 3
$parent: /content/support/faqs.md
class: who

description: El proyecto Accelerated Mobile Pages (AMP) es una iniciativa de código abierto que facilita a los editores crear contenido para móviles una vez y que se cargue instantáneamente en todas partes. – Accelerated Mobile Pages Project

cta:
  title: Próximo FAQ
  link_text: AMP Overview
  link_url: /content/support/faqs/overview@es.md

---
{% set who = g.doc('/content/includes/who.yaml', locale=doc.locale) %}

<div class="inline-toc">
  <ul>
    {% for section in who.tech_companies.sections %}
      <li><a href="#{{section.title|slug}}">{{_(section.title)}}</a></li>
    {% endfor %}
  </ul>
</div>

Un número creciente de plataformas, proveedores y socios soportan el proyecto AMP al proporcionar componentes personalizados o ofrecer integración con páginas AMP dentro de sus plataformas.

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
