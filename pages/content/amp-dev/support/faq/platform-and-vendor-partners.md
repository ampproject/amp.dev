---
$title@: Supported Platforms
$order: 4
teaser:
  icon: rocket
  label: Learn more
faq: !g.yaml /shared/data/faq.yaml
---

# Supported Platforms, Vendors and Partners

A growing number of platforms, vendors, and partners support the AMP Project by providing custom components or offering integration with AMP pages within their platforms.

{% with sections = doc.faq.platform_and_vendor_partners %}
{% include 'views/partials/accordion.j2' %}
{% endwith %}
