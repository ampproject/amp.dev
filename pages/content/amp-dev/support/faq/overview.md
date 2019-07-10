---
$title@: AMP Overview
$order: 1
teaser:
  image:
    src: '/static/img/faq/faq-overview.jpg'
    width: 570
    height: 320
    alt: FAQ – AMP Overview
  label: Learn more
faq: !g.yaml /shared/data/faq.yaml
---

# AMP Overview

{% with sections = doc.faq.overview %}
{% include 'views/partials/accordion.j2' %}
{% endwith %}
