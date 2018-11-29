---
$title: Dummy content
---
{% do doc.styles.addCssFile('css/components/molecules/tip.css') %}
{% do doc.icons.useIcon('icons/warning.svg') %}

<div class="ad-m-tip ad-m-tip-important">
  <div class="ad-m-tip-content">
    <div class="ad-a-ico ad-m-tip-icon">
      <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning"></use></svg>
    </div>
    <h4>This is work in progress</h4>
    <p>Neither the position of this document nor its contents are yet final and need to be discussed. It may also be not in its final state regarding the design.</p>
  </div>
</div>
