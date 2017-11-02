---
$title@: Browser yang Didukung
$order: 4
$parent: /content/support/faqs.md
class: who

cta:
  title@: FAQ Selanjutnya
  link_text@: Ringkasan AMP
  link_url: /content/support/faqs/overview@id.md

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

Pada umumnya, kami mendukung 2 versi terbaru browser besar seperti Chrome, Firefox, Edge, Safari, dan Opera. Kami mendukung versi tampilan desktop, ponsel, tablet, dan web dari masing-masing browser ini.

Lebih dari itu, koleksi AMP inti serta elemen bawaan harus bertujuan untuk mencapai dukungan browser yang sangat luas, dan kami menerima perbaikan bagi semua browser dengan pangsa pasar yang lebih besar dari 1 persen.

Secara khusus, kami mencoba mempertahankan dukungan "sepertinya tidak sempurna, tapi masih dapat digunakan" untuk browser sistem Android 4.0 dan Chrome 28+ di ponsel.
