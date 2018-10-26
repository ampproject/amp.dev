---
$title: Vendor periklanan
---

Dokumen ini mencantumkan vendor dan platform periklanan yang menyediakan konfigurasi built-in untuk digunakan dengan komponen [`amp-ad`](/id/docs/reference/components/amp-ad.html). Untuk melihat detail konfigurasi bagi vendor tertentu, klik link vendor tersebut. 

{% call callout('Catatan', type='note') %}
Untuk vendor iklan yang ingin menyediakan integrasi dengan AMP, silakan lihat [panduan developer untuk Berintegrasi dengan AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md#developer-guidelines-for-a-pull-request).
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
 
 
 
