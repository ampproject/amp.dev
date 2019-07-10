---
$title@: Supported Platforms
$order: 4
teaser:
  image:
    src: '/static/img/faq/faq-platform-and-vendor-partners.jpg'
    width: 570
    height: 320
    alt: FAQ – Supported Platforms
  label: Learn more
faq: !g.yaml /shared/data/faq.yaml
---

# Supported Platforms, Vendors and Partners

A growing number of platforms, vendors, and partners support the AMP Project by providing custom components or offering integration with AMP pages within their platforms.

{% with sections = doc.faq.platform_and_vendor_partners %}
{% include 'views/partials/accordion.j2' %}
{% endwith %}
