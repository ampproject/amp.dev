---
$title@: AMP Overview
$order: 1
teaser:
  icon: logo-transparent
  label: Learn more
faq: !g.yaml /shared/data/faq.yaml
---

# AMP Overview

{% with sections = doc.faq.overview %}
{% include 'views/partials/accordion.j2' %}
{% endwith %}
