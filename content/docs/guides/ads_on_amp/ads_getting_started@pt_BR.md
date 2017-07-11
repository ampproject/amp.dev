---
$title : "Primeiros passos"
$order : 0
---

## Três etapas fáceis para veicular anúncios em AMP

Não sabe por onde começar? Neste pequeno guia, você aprenderá a veicular anúncios de maneira fácil e rápida em AMP.

###  1. Adicione o `<amp-ads>` componente à página AMP:

[sourcecode:html]

<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>

[/sourcecode]

 Ao adicionar ob `componente` amp-ads, você adiciona a biblioteca de anúncios à sua página AMP.

###  2. Especifique o servidor ou a rede de anúncios no atributo `type`:

[sourcecode:html]
<amp-ad
type="a9">
</amp-ad>
[/sourcecode]

[Veja](https://www.ampproject.org/docs/reference/components/amp-ad#supported-ad-networks) uma lista de redes de anúncio compatíveis.

### 3. Especifique a altura e largura do bloco de anúncios:

[sourcecode:html]
<amp-ad width="300"
height="250"
type="a9"
data-aax_size="300x250"
data-aax_pubname="test123"
data-aax_src="302">
</amp-ad>
[/sourcecode]

Ao definir a altura e largura do bloco de anúncios, você especifica o tamanho do anúncio na página AMP.

{% call callout('Observação', type='note') %}
 Os atributos de dados adicionais estão informando à rede de anúncios para buscar o pub e o tamanho correto nos servidores. Cada rede de anúncios tem atributos diferentes para enviar. [Saiba mais](https://www.ampproject.org/docs/reference/components/amp-ad#supported-ad-networks)
. {% endcall %}

###  4. [Opcional] Especifique um marcador de posição:

[sourcecode:html]
<amp-ad width="300"
height="200"
type="doubleclick"
data-slot="/4119129/doesnt-exist">
<amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
[/sourcecode]

As AMP são compatíveis com um atributo opcional de marcador de posição. Dependendo da rede de anúncios, é possível escolher exibir um marcador de posição até que o anúncio esteja disponível para visualização. Isso oferece uma experiência de usuário melhor, evitando a exibição de espaços em branco:

###  5. [Opcional] Especifique um atributo substituto:

[sourcecode:html]
<amp-ad width="300"
height="200"
type="doubleclick"
data-slot="/4119129/doesnt-exist">
<amp-img fallback src="fallback-image.jpg"></amp-img>
</amp-ad>
[/sourcecode]

As AMP são compatíveis com um atributo substituto opcional. Dependendo da rede de anúncios, é possível escolher exibir este elemento substituto, caso o anúncio não esteja disponível para veiculação.

### 6. Parabéns! Agora você está veiculando anúncios em uma página AMP.

