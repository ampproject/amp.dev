---
$title: Who uses AMP?
$order: 1
class: who

description: The Accelerated Mobile Pages (AMP) Project is an open source initiative that makes it easy for publishers to create mobile-friendly content once and have it load instantly everywhere. – Accelerated Mobile Pages Project

---
{% set who = g.doc('/content/includes/who.yaml', locale=doc.locale) %}

<div class="who__section">
  <h2 id="{{who.partners.section_title|slug}}">{{who.partners.section_title}}<a href="#{{who.partners.section_title|slug}}">#</a></h2>
  {% for section in who.partners.sections %}
  <h3 id="{{section.title|slug}}">{{section.title}}<a href="#{{section.title|slug}}">#</a></h3>
  <ol class="items">
    {% for item in section.section_items | sort %}
      <li class="item">{{item}}</li>
    {% endfor %}
  </ol>
  {% endfor %}
</div>

<div>
  <h2 id="{{who.tech_companies.section_title|slug}}">{{who.tech_companies.section_title}}<a href="#{{who.tech_companies.section_title|slug}}">#</a></h2>
  {% for section in who.tech_companies.sections %}
  <h3 id="{{section.title|slug}}">{{section.title}}<a href="#{{section.title|slug}}">#</a></h3>
  <ol class="items">
    {% for item in section.section_items | sort %}
      <li class="item">{{item}}</li>
    {% endfor %}
  </ol>
  {% endfor %}
</div>
