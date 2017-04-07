---
$title@: Supported Platforms, Vendors and Partners
$order: 3
$parent: /content/support/faqs.md
class: who

description@: The Accelerated Mobile Pages (AMP) Project is an open source initiative that makes it easy for publishers to create mobile-friendly content once and have it load instantly everywhere. – Accelerated Mobile Pages Project

cta:
  title@: Próximo FAQ
  link_text@: AMP Overview
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

Un número creciente de plataformas, proveedores y socios soportan el proyecto AMP al proporcionar componentes personalizados o ofrecer integración con páginas AMP dentro de sus plataformas.

<div class="who-container">
  <amp-accordion>
  {% for section in who.tech_companies.sections %}
    <section id="{{section.title|slug}}" {% if loop.index == 1 %}expanded{% endif %}>
      <header class="accordion-header">
        <h4 class="accordion-title">{{_(section.title)}}</h4>
        {% if section.description %}<p>{{_(section.description)}}</p>{% endif %}
      </header>
      <div class="accordion-content">
        <ol class="item-container">
        {% for item in section.section_items | sort %}
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

# Navegadores Soportados

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

En general, apoyamos las 2 últimas versiones de los principales navegadores como Chrome, Firefox, Edge, Safari y Opera. Soportamos las versiones de escritorio, el teléfono, y la versión en tableta de estos browsers.

Más allá de eso, la biblioteca principal de AMP y los elementos integrados deben apuntar a un soporte de navegador muy amplio y aceptamos correcciones para todos los navegadores con cuota de mercado superior al 1 por ciento.

En particular, tratamos de mantener un soporte "puede que no sea perfecto, pero no está roto" para el navegador del sistema Android 4.0 y Chrome 28+ en los teléfonos.
