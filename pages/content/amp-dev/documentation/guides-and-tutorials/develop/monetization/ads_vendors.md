---
$title: Advertising vendors
$order: 8
---

This document lists advertising vendors and platforms that provide a built-in configuration for use with the [`amp-ad`](/docs/reference/components/amp-ad.html) component. To see configuration details for the specific vendor, click the vendor's link.

Note: For ad vendors who wish to provide an integration with AMP, please see the [developer guidelines for Integrating with AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md#developer-guidelines-for-a-pull-request).

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

