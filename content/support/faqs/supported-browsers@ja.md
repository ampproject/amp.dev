---
$title@: 対応ブラウザ
$order: 4
$parent: /content/support/faqs.md
class: who

cta:
  title@: 次のよくある質問
  link_text@: AMP の概要
  link_url: /content/support/faqs/overview@ja.md

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

AMP は通常、Chrome、Firefox、Edge、Safari、Opera といった主要ブラウザの最新バージョンとその 1 つ前のバージョンをサポートしており、パソコン、スマートフォン、タブレット、各種ブラウザのウェブビュー版に対応しています。

また、さまざまなブラウザで主要な AMP ライブラリと組み込み要素を利用できるよう、市場シェアが 1% を超えるブラウザについては、それぞれに応じた修正を行います。

スマートフォンに搭載されている Android 4.0 システム ブラウザと Chrome 28 以降については、「完璧ではないが破損もしていない」という状態でのサポートを維持するよう努めています。
