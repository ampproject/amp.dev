---
$title@: Plataformas, fornecedores e parceiros compatíveis
$order: 3
$parent: /content/support/faqs@pt_br.md
class: who

description@: O projeto Accelerated Mobile Pages (AMP) é uma iniciativa de código aberto que facilita a criação de conteúdo otimizado para dispositivos móveis. Com ele, os editores podem criar conteúdo uma vez só e carregar esse material de maneira instantânea em qualquer lugar. – Projeto Accelerated Mobile Pages

cta:
  title@: Próximas Perguntas frequentes
  link_text@: Visão geral de AMP
  link_url: /content/support/faqs/overview@pt_br.md

---
{% set who = g.doc('/content/includes/who.yaml', locale=doc.locale) %}

<div class="inline-toc">
  <ul>
    {% for section in who.tech_companies.sections %}
      <li><a href="#{{section.title|slug}}">{{_(section.title)}}</a></li>
    {% endfor %}
  </ul>
</div>

Um número cada vez maior de plataformas, fornecedores e parceiros oferece compatibilidade com o projeto AMP por meio de componentes personalizados ou integração de páginas AMP em plataformas.

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
