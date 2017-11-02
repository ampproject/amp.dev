---
$title@: 支持的浏览器
$order: 4
$parent: /content/support/faqs.md
class: who

cta:
  title@: 下一个常见问题解答
  link_text@: AMP 概览
  link_url: /content/support/faqs/overview@zh_cn.md

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

一般来说，我们支持 Chrome、Firefox、Edge、Safari 和 Opera 等主流浏览器的最新的两个版本。我们分别支持这些浏览器的桌面设备版本、手机版本、平板电脑版本和网页视图版本。

除此之外，由于 AMP 核心库和内置元素的目标应该是实现非常广泛的浏览器支持，因此我们接受市场份额大于 1% 的所有浏览器的修复程序。

需要特别说明的是，我们会继续努力为手机上的 Android 4.0 系统浏览器和 Chrome 28+ 提供“虽尚不完美，但还算稳定”的支持。
