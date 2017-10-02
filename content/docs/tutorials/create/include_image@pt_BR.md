---
$title: Incluir uma imagem
---

A maioria das tags HTML podem ser usadas diretamente em AMP HTML, mas algumas, como a tag `<img>`, são substituídas por tags AMP HTML equivalentes ou ligeiramente melhoradas e personalizadas (e algumas poucas tags problemáticas são diretamente eliminadas, consulte [Tags HTML na especificação](/pt_br/docs/reference/spec.html)).

Para demonstrar qual seria a aparência de uma marcação adicional, veja o código necessário para incorporar uma imagem na página:

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

{% call callout('Leia Mais', type='read') %}
Para saber por que estamos substituindo tags como `<img>` por `<amp-img>` e quantas estão disponíveis, consulte [Incluir imagens e vídeo](/pt_br/docs/guides/amp_replacements.html).
{% endcall %}

<div class="prev-next-buttons">
  <a class="button prev-button" href="/pt_br/docs/tutorials/create/basic_markup.html"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="/pt_br/docs/tutorials/create/presentation_layout.html"><span class="arrow-next">Próxima</span></a>
</div>
