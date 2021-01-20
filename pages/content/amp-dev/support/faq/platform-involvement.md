---
$title@: Platform and Technology Company Involvement
$titles:
  breadcrumb: Platform Involvement
$order: 2
teaser:
  image:
    src: '/static/img/faq/faq-platform-involvement.jpg'
    width: 570
    height: 320
    alt: FAQ – Platform and Technology Company Involvement
  label: Learn more
faq: !g.yaml /shared/data/faq.yaml
---

# Platform and Technology Company Involvement

{% with sections = doc.faq.platform_involvement %}
{% include 'views/partials/accordion.j2' %}
{% endwith %}
