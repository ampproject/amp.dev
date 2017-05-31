---
$title@: Supported Browsers
$order: 4
$parent: /content/support/faqs.md
class: who

cta:
  title@: Next FAQ
  link_text@: AMP Overview
  link_url: /content/support/faqs/overview.md

---
{% set who = g.doc('/content/includes/who.yaml', locale=doc.locale) %}

<div class="browser-container">
{% for browser in who.browsers %}
  <div class="browser">
    <amp-img width="75"
        height="75"
        layout="responsive"
        src="{{browser.img}}"></amp-img>
    <p class="browser-title">{{browser.title}}</p>
  </div>
{% endfor %}
</div>

In general we support the latest two versions of major browsers like Chrome, Firefox, Edge, Safari and Opera. We support desktop, phone, tablet and the web view version of these respective browsers.

Beyond that, the core AMP library and built-in elements should aim for very wide browser support and we accept fixes for all browsers with market share greater than 1 percent.

In particular, we try to maintain "it might not be perfect but isn't broken"-support for the Android 4.0 system browser and Chrome 28+ on phones.
