---
$title: Supported Platforms
$order: 1
class: who

description: The Accelerated Mobile Pages (AMP) Project is an open source initiative that makes it easy for publishers to create mobile-friendly content once and have it load instantly everywhere. – Accelerated Mobile Pages Project

---
{% set who = g.doc('/content/includes/who.yaml', locale=doc.locale) %}
An ever-growing number of platforms and vendors support AMP, either by providing an AMP component, or by offering advanced integration with AMP pages within their platforms.

<div>
  {% for section in who.tech_companies.sections %}
  <h3 id="{{section.title|slug}}">{{section.title}}<a href="#{{section.title|slug}}">#</a></h3>
  <ol class="items">
    {% for item in section.section_items | sort %}
      <li class="item">{{item}}</li>
    {% endfor %}
  </ol>
  {% endfor %}
</div>
