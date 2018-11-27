---
$title: Missing content
---
{% do doc.styles.addCssFile('css/components/molecules/tip.css') %}
{% do doc.icons.useIcon('icons/warning.svg') %}

<div class="ad-m-tip ad-m-tip-important">
  <div class="ad-m-tip-content">
    <div class="ad-a-ico ad-m-tip-icon">
      <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning"></use></svg>
    </div>
    <h4>This is work in progress</h4>
    <p>Some or this particular part of the document is currently missing as it is not final or hasn't been created yet.</p>
  </div>
</div>
