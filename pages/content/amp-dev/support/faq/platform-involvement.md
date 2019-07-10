---
$title@: Platform and Technology Company Involvement
$order: 2
teaser:
  icon: community
  label: Learn more
faq: !g.yaml /shared/data/faq.yaml
---

# Platform and Technology Company Involvement

{% with sections = doc.faq.platform_involvement %}
{% include 'views/partials/accordion.j2' %}
{% endwith %}
