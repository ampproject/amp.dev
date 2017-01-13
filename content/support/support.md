---
$title: Support
$order: 0
$hidden: true
$path: /support/
$localization:
  path: /{locale}/support/
---

<div class="card-container grid">
  {% for item in g.collection(doc.collection.pod_path).docs(recursive=false, locale=doc.locale) %}
    {% with doc = item %}
      {% include "/views/partials/grid-card.html" %}
    {% endwith %}
  {% endfor %}
</div>
