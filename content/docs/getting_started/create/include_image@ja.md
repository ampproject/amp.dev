---
$title: イメージを含める
---

ほとんどの HTML タグは、そのまま AMP HTML でも使用できますが、中には `<img>` タグのように同等か少し高機能のカスタム AMP HTML タグに置き換えなくてはいけないものがあります（一部のタグは問題があるため、使用が一切禁止されています。詳細については、[仕様書の HTML タグ](/ja/docs/reference/spec.html)の内容をご覧ください）。

以下のコードは追加のマークアップを使った例で、ページ内にイメージを埋め込んでいます。

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

{% call callout('参照', type='read') %}
`<img>` タグの代わりに `<amp-img>` タグを使っている理由や、使用できるタグの種類については、[画像や動画を含める](/ja/docs/guides/amp_replacements.html)をご覧ください。
{% endcall %}

<div class="prev-next-buttons">
  <a class="button prev-button" href="/ja/docs/tutorials/create/basic_markup.html"><span class="arrow-prev">前へ</span></a>
  <a class="button next-button" href="/ja/docs/tutorials/create/presentation_layout.html"><span class="arrow-next">次へ</span></a>
</div>
