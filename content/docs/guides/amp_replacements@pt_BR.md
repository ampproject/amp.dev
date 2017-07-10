---

$title: Incluir imagens e vídeo
$order: 1
$category: Desenvolver

toc: true
---

[TOC]

Como qualquer página HTML, as AMP permitem incorporar **imagens**, **vídeo** e **áudio**
content. Learn what's different about the AMP equivalents and learn how to
include them in your pages.

##  Por que não `<img>`, `<video>` e `<audio>`?

 As AMP não são compatíveis com os correspondentes padrão em HTML para exibir mídia, como `<img>`. Fornecemos componentes equivalentes pelos seguintes motivos:

*  Precisamos entender o layout da página antes de carregar os recursos, algo crucial para [oferecer suporte ao pré-carregamento da janela de visualização primária.](/learn/about-how/#size-all-resources-statically)
*  Precisamos controlar as solicitações de rede para [carregamento lento e priorizar os recursos de maneira efetiva.](/learn/about-how/#prioritize-resource-loading)

{% call callout('Cuidado', type='caution') %}
 Embora não sejam compatíveis, eles*serão*  renderizados, mas as AMP não [validarão suas páginas](/docs/guides/debug/validate.html) 
e não será possível aproveitar todos os benefícios que as AMP oferecem. {% endcall %}

## Imagens

 Inclua uma imagem na página usando o elemento [`amp-img`](/docs/reference/components/amp-img.html) como em:

[sourcecode:html]
<amp-img src="fixed.jpg" width="264" height="96"></amp-img>
[/sourcecode]

Neste exemplo mais básico, a imagem será exibida com a altura e largura fixas que foram especificadas. Ao menos uma altura e uma largura explícita precisam ser definidas.

#### Exibir imagens quando o JavaScript está desativado

 Como `<amp-img>` se baseia no JavaScript, se o usuário escolher desativar os scripts, as imagens não serão exibidas. Nesse caso, forneça um fallback para a imagem usando `<img>` e `<noscript>` como em:

[sourcecode:html]
<amp-img src="fixed.jpg" width="264" height="96">
<noscript>
<img src="fixed.jpg" width="264" height="96" />
</noscript>
</amp-img>
[/sourcecode]

### Layouts avançados

 As AMP facilitam muito mais a criação de imagens responsivas do que o CSS/HTML padrão. Em sua forma mais básica, basta apenas adicionar `layout="responsive"`:

[sourcecode:html]
<amp-img src="responsive.jpg" width="527" height="193" layout="responsive">
</amp-img>
[/sourcecode]

{% call callout('Leia mais', type='success') %}
 Saiba mais sobre [técnicas de layout avançadas](/docs/guides/author-develop/responsive/control_layout.html)
. {% endcall %}

### Comportamento e marcadores de posição

O tempo de execução das AMP em HTML pode gerenciar recursos de imagens de maneira eficiente, escolhendo atrasar ou priorizar o carregamento de recursos com base na posição da janela de visualização, nos recursos do sistema, na conexão de largura de banda ou em outros fatores.

{% call callout('Leia mais', type='success') %}
 Saiba como [fornecer fallbacks e marcadores de posição para imagens](/docs/guides/author-develop/responsive/placeholders.html)
. {% endcall %}

## Imagens animadas

 O elemento [`amp-anim`](/docs/reference/components/amp-anim.html) é muito similar ao elemento `amp-img` e fornece funcionalidades adicionais para gerenciar o carregamento e a reprodução de imagens animadas, como GIFs.

[sourcecode:html]
<amp-anim width="400" height="300" src="my-gif.gif">
<amp-img placeholder width="400" height="300" src="my-gif-screencap.jpg">
</amp-img>
</amp-anim>
[/sourcecode]

{% call callout('Observação', type='note') %}
 Para usar esse componente, inclua `<script async custom-element="amp-anim"
src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>` 
no topo da página. {% endcall %}

## Vídeo

 Inclua um vídeo na página usando o elemento [`amp-video`](/docs/reference/components/amp-video.html).

 Somente use esse elemento para incorporar diretamente arquivos de vídeo HTML5. O elemento carrega o recurso de vídeo especificado pelo atributo `src` com lazy loading, em um momento determinado pelas AMP.

Inclua um marcador de posição antes do começo do vídeo e um fallback, caso o navegador não seja compatível com vídeo HTML5, por exemplo:

[sourcecode:html]
<amp-video width="400" height="300" src="https://yourhost.com/videos/myvideo.mp4"
poster="myvideo-poster.jpg">

<div fallback>
    <p>O navegador não é compatível com vídeo HTML5</p>
  </div>
</amp-video>
[/sourcecode]

## Áudio

 Inclua um recurso de áudio na página usando o elemento [`amp-audio`](/docs/reference/components/amp-audio.html).

 Use esse elemento somente para incorporar diretamente arquivos de áudio HTML5. Como todos os recursos externos incorporados em AMP, o elemento carrega o recurso de áudio especificado pelo atributo `src` com lazy loading, em um momento determinado pelas AMP.

Inclua um marcador de posição antes do começo do áudio e um fallback, caso o navegador não seja compatível com áudio HTML5, por exemplo:

[sourcecode:html]
<amp-audio width="400" height="300" src="https://yourhost.com/audios/myaudio.mp3">

<div fallback>
    <p>O navegador não é compatível com áudio HTML5</p>
  </div>
  <source type="audio/mpeg" src="foo.mp3">
  <source type="audio/ogg" src="foo.ogg">
</amp-audio>
[/sourcecode]

{% call callout('Observação', type='note') %}
 Para usar esse componente, inclua `<script async custom-element="amp-audio"
src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>` 
no cabeçalho da página. {% endcall %}

