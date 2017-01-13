---
$title: FAQs
$order: 0
$parent: /content/support/support.md
$localization:
  path: /{locale}/support/{base}/
---

<div class="card-container grid">
  {% for item in g.collection(doc.collection.pod_path + '/' + doc.base).docs(recursive=false, locale=doc.locale) %}
    {% with doc = item %}
      {% include "/views/partials/grid-card.html" %}
    {% endwith %}
  {% endfor %}
</div>
