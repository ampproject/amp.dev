---
$title@: Navegadores compatíveis
$order: 4
$parent: /content/support/faqs@pt_br.md
classe: quem

cta:
  title@: Próximas Perguntas frequentes
  link_text@: Visão geral de AMP
  link_url: /content/support/faqs/overview@pt_br.md

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

Em geral, oferecemos compatibilidade com as duas versões mais recentes dos principais navegadores como Chrome, Firefox, Edge, Safari e Opera. As versões para tablet, smartphone, computadores desktop e visualização da Web desses navegadores também são compatíveis com AMP.

Além disso, o ideal é que os elementos integrados e a biblioteca AMP principal tenham compatibilidade com uma grande variedade de navegadores. Aceitamos correções de todos os navegadores com participação no mercado maior do que 1%.

Para o navegador do sistema Android 4.0 e o Chrome versão 28 e posteriores em smartphones, nosso suporte tenta seguir a abordagem "pode não ser perfeito, mas está funcionando".
