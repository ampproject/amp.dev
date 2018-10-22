---
$title: Proveedores de publicidad
---

En este documento se indican proveedores y plataformas de publicidad que proporcionan una configuración integrada que puede utilizarse con el componente [`amp-ad`] (/es/docs/reference/components/amp-ad.html). Para consultar los detalles de un proveedor concreto, haz clic en el enlace correspondiente. 

{% call callout('Nota', type='note') %}
Los proveedores de anuncios que quieran ofrecer una integración con AMP deben consultar las [directrices de desarrolladores para realizar integraciones con AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md#developer-guidelines-for-a-pull-request).
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
 
 
 
