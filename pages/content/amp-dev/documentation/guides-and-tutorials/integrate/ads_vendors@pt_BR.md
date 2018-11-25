---
$title: Fornecedores de publicidade
---

Este documento lista as plataformas e os fornecedores de publicidade que oferecem uma configuração integrada para uso com o componente [`amp-ad`](/pt_br/docs/reference/components/amp-ad.html). Para ver os detalhes de configuração de um fornecedor específico, clique no respectivo link. 

{% call callout('Observação', type='note') %}
Para os fornecedores de publicidade que têm a intenção de oferecer integração com a AMP, consulte as [diretrizes de desenvolvedor para integração com a AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md#developer-guidelines-for-a-pull-request).
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
 
 
 
