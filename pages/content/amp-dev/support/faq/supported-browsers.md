---
$title@: Supported Browsers
$order: 6
teaser:
  image:
    src: '/static/img/faq/faq-supported-browsers.jpg'
    width: 570
    height: 320
    alt: FAQ – Supported Browsers
  label: Learn more
faq: !g.yaml /shared/data/faq.yaml
---

# AMP Supported Browsers

{% do doc.styles.addCssFile('css/components/organisms/browsers.css') %}

<div class="ap-o-browsers">
{% for browser in doc.faq.supported_browsers %}
  <div class="browser">
    <amp-img width="75"
        height="75"
        layout="responsive"
        src="{{browser.img}}"></amp-img>
    <p class="browser-title">{{browser.title}}</p>
  </div>
{% endfor %}
</div>

In general we support the latest two versions of major browsers like Chrome, Firefox, Edge, Safari, Opera and UC Browser. We support desktop, phone, tablet and the web view version of these respective browsers.

Beyond that, the core AMP library and built-in elements should aim for very wide browser support and we accept fixes for all browsers with market share greater than 1 percent.

In particular, we try to maintain "it might not be perfect but isn't broken"-support for IE 11, iOS 8, the Android 4.0 system browser and Chrome 41.
