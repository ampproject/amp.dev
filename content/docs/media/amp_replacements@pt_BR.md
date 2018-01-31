---
$title: Incluir imagens e vídeo
---

[TOC]

Como qualquer página HTML, as AMP permitem incorporar **imagens**, **vídeo** e **áudio**
content. Learn what's different about the AMP equivalents and learn how to
include them in your pages.

##  Por que não `<img>`, `<video>` e `<audio>`?

 As AMP não são compatíveis com os correspondentes padrão em HTML para exibir mídia, como `<img>`. Fornecemos componentes equivalentes pelos seguintes motivos:

*  Precisamos entender o layout da página antes de carregar os recursos, algo crucial para [oferecer suporte ao pré-carregamento da janela de visualização primária.](/pt_br/learn/about-how/#size-all-resources-statically)
*  Precisamos controlar as solicitações de rede para [carregamento lento e priorizar os recursos de maneira efetiva.](/pt_br/learn/about-how/#prioritize-resource-loading)

{% call callout('Cuidado', type='caution') %}
 Embora não sejam compatíveis, eles*serão*  renderizados, mas as AMP não [validarão suas páginas](/pt_br/docs/guides/debug/validate.html) 
e não será possível aproveitar todos os benefícios que as AMP oferecem. {% endcall %}

## Imagens

 Inclua uma imagem na página usando o elemento [`amp-img`](/pt_br/docs/reference/components/amp-img.html) como em:

<!--embedded example - fixed size image -->
<div>
<amp-iframe height="174"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.fixed.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

Neste exemplo mais básico, a imagem será exibida com a altura e largura fixas que foram especificadas. Ao menos uma altura e uma largura explícita precisam ser definidas.

#### Exibir imagens quando o JavaScript está desativado

 Como `<amp-img>` se baseia no JavaScript, se o usuário escolher desativar os scripts, as imagens não serão exibidas. Nesse caso, forneça um fallback para a imagem usando `<img>` e `<noscript>` como em:

<!--embedded example - img with noscript -->
<div>
<amp-iframe height="215"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.noscript.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

### Layouts avançados

 As AMP facilitam muito mais a criação de imagens responsivas do que o CSS/HTML padrão. Em sua forma mais básica, basta apenas adicionar `layout="responsive"`:

<!--embedded example - basic responsive image -->
<div>
<amp-iframe height="193"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

{% call callout('Leia mais', type='success') %}
 Saiba mais sobre [técnicas de layout avançadas](/pt_br/docs/guides/responsive/control_layout.html)
. {% endcall %}

### Comportamento e marcadores de posição

O tempo de execução das AMP em HTML pode gerenciar recursos de imagens de maneira eficiente, escolhendo atrasar ou priorizar o carregamento de recursos com base na posição da janela de visualização, nos recursos do sistema, na conexão de largura de banda ou em outros fatores.

{% call callout('Leia mais', type='success') %}
 Saiba como [fornecer fallbacks e marcadores de posição para imagens](/pt_br/docs/guides/responsive/placeholders.html)
. {% endcall %}

## Imagens animadas

 O elemento [`amp-anim`](/pt_br/docs/reference/components/amp-anim.html) é muito similar ao elemento `amp-img` e fornece funcionalidades adicionais para gerenciar o carregamento e a reprodução de imagens animadas, como GIFs.

<!--embedded amp-anim basic example -->
<div>
<amp-iframe height="253"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampanim.basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

{% call callout('Observação', type='note') %}
 Para usar esse componente, inclua `<script async custom-element="amp-anim"
src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>` 
no topo da página. {% endcall %}

## Vídeo

 Inclua um vídeo na página usando o elemento [`amp-video`](/pt_br/docs/reference/components/amp-video.html).

 Somente use esse elemento para incorporar diretamente arquivos de vídeo HTML5. O elemento carrega o recurso de vídeo especificado pelo atributo `src` com lazy loading, em um momento determinado pelas AMP.

Inclua um marcador de posição antes do começo do vídeo e um fallback, caso o navegador não seja compatível com vídeo HTML5, por exemplo:

<!--embedded video example  -->
<div>
<amp-iframe height="234"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampvideo.fallback.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

## Áudio

 Inclua um recurso de áudio na página usando o elemento [`amp-audio`](/pt_br/docs/reference/components/amp-audio.html).

 Use esse elemento somente para incorporar diretamente arquivos de áudio HTML5. Como todos os recursos externos incorporados em AMP, o elemento carrega o recurso de áudio especificado pelo atributo `src` com lazy loading, em um momento determinado pelas AMP.

Inclua um marcador de posição antes do começo do áudio e um fallback, caso o navegador não seja compatível com áudio HTML5, por exemplo:

<!--embedded audio example  -->
<div>
<amp-iframe height="314"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampaudio.basic.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

{% call callout('Observação', type='note') %}
 Para usar esse componente, inclua `<script async custom-element="amp-audio"
src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>` 
no cabeçalho da página. {% endcall %}

