---
$title: Create an AMPHTML ad
$order: 6
tutorial: true
---

{{ image('/static/img/docs/ads/amp-ad-framed-final.png', 597, 1240, align='right third', caption='Completed AMPHTML image ad') }}

In this tutorial, you'll learn how to create an [AMPHTML ad]({{g.doc('/content/docs/ads/amphtml_ads.md', locale=doc.locale).url.path}}) from scratch that can be served to AMP and non-AMP pages. The ad format used in this tutorial is a simple image ad.

AMPHTML ads are similar to traditional HTML ads, but instead of coding them in traditional HTML, they are coded in AMPHTML, according to the [AMPHTML ad spec]({{g.doc('/content/docs/ads/a4a_spec.md', locale=doc.locale).url.path}}). By creating the ads in AMPHTML, the ads take advantage of the same optimizations and performance utilized in AMP pages, making them a faster, lighter and a more secure way to advertise on the web. Most of all, these ads can be delivered anywhere on the web, _not just on AMP pages_.

## You will learn to:

* Create a valid AMPHTML ad according to the [AMPHTML ad spec]({{g.doc('/content/docs/ads/a4a_spec.md', locale=doc.locale).url.path}})
* Track ad views by using the [`amp-pixel`](/docs/reference/components/amp-pixel.html) component
* Verify the AMPHTML ad syntax by using the [AMP validator](https://validator.ampproject.org/#htmlFormat=AMP4ADS)

## Prerequisites:

* A basic knowledge of HTML, CSS, and JavaScript
* A browser and text editor of your choice

<div class="start-button">
<a class="button" href="{{g.doc('/content/docs/ads/amphtml_ads/create_shell.md', locale=doc.locale).url.path}}"><span class="arrow-next">Get started</span></a>
</div>

{% call callout('Tip', type='success') %}
*Don't want to create an ad from scratch?*  Use one of the following tools to create your AMPHTML ad:

* [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
* [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
* Adobe Animate (*coming soon*)
{% endcall %}
