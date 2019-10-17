---
$title: Incluir imagens e vídeo
---

Como qualquer página HTML, as AMP permitem incorporar **imagens**, **vídeo** e **áudio**
content. Learn what's different about the AMP equivalents and learn how to
include them in your pages.

##  Por que não `<img>`, `<video>` e `<audio>`?

 As AMP não são compatíveis com os correspondentes padrão em HTML para exibir mídia, como `<img>`. Fornecemos componentes equivalentes pelos seguintes motivos:

*  Precisamos entender o layout da página antes de carregar os recursos, algo crucial para [oferecer suporte ao pré-carregamento da janela de visualização primária.](../../../../about/how-amp-works.html#size-all-resources-statically)
*  Precisamos controlar as solicitações de rede para [carregamento lento e priorizar os recursos de maneira efetiva.](../../../../about/how-amp-works.html#prioritize-resource-loading)

Cuidado: Embora não sejam compatíveis, eles*serão*  renderizados, mas as AMP não [validarão suas páginas](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) e não será possível aproveitar todos os benefícios que as AMP oferecem.

## Imagens

 Inclua uma imagem na página usando o elemento [`amp-img`](../../../../documentation/components/reference/amp-img.md) como em:

[example preview="inline" playground="true"]
```html
<amp-img alt="A beautiful sunset"
  src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195">
</amp-img>
```
[/example]

Neste exemplo mais básico, a imagem será exibida com a altura e largura fixas que foram especificadas. Ao menos uma altura e uma largura explícita precisam ser definidas.

#### Exibir imagens quando o JavaScript está desativado

 Como `<amp-img>` se baseia no JavaScript, se o usuário escolher desativar os scripts, as imagens não serão exibidas. Nesse caso, forneça um fallback para a imagem usando `<img>` e `<noscript>` como em:

[example preview="inline" playground="true"]
```html
<amp-img src="{{server_for_email}}/static/inline-examples/images/sunset.jpg"
  width="264"
  height="195">
  <noscript>
    <img src="{{server_for_email}}/static/inline-examples/images/sunset.jpg" width="264" height="195" />
  </noscript>
</amp-img>
```
[/example]

### Layouts avançados

 As AMP facilitam muito mais a criação de imagens responsivas do que o CSS/HTML padrão. Em sua forma mais básica, basta apenas adicionar `layout="responsive"`:

[example preview="inline" playground="true"]
```html
<amp-img alt="A view of the sea"
  src="{{server_for_email}}/static/inline-examples/images/sea.jpg"
  width="900"
  height="675"
  layout="responsive">
</amp-img>
```
[/example]

Leia mais Saiba mais sobre [técnicas de layout avançadas](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md).

### Comportamento e marcadores de posição

O tempo de execução das AMP em HTML pode gerenciar recursos de imagens de maneira eficiente, escolhendo atrasar ou priorizar o carregamento de recursos com base na posição da janela de visualização, nos recursos do sistema, na conexão de largura de banda ou em outros fatores.

Leia mais: Saiba como [fornecer fallbacks e marcadores de posição para imagens](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

## Imagens animadas

 O elemento [`amp-anim`](../../../../documentation/components/reference/amp-anim.md) é muito similar ao elemento [`amp-img`](../../../../documentation/components/reference/amp-img.md) e fornece funcionalidades adicionais para gerenciar o carregamento e a reprodução de imagens animadas, como GIFs.

[example preview="inline" playground="true" imports="amp-anim:0.1"]
```html
<amp-anim width="400"
  height="300"
  src="{{server_for_email}}/static/inline-examples/images/wavepool.gif">
  <amp-img placeholder
    width="400"
    height="300"
    src="{{server_for_email}}/static/inline-examples/images/wavepool.png">
  </amp-img>
</amp-anim>
```
[/example]

Observação: Para usar esse componente, inclua `<script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>` no topo da página.

## Vídeo

 Inclua um vídeo na página usando o elemento [`amp-video`](../../../../documentation/components/reference/amp-video.md).

 Somente use esse elemento para incorporar diretamente arquivos de vídeo HTML5. O elemento carrega o recurso de vídeo especificado pelo atributo `src` com lazy loading, em um momento determinado pelas AMP.

Inclua um marcador de posição antes do começo do vídeo e um fallback, caso o navegador não seja compatível com vídeo HTML5, por exemplo:

[example preview="inline" playground="true" imports="amp-video:0.1"]
```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```
[/example]

## Áudio

 Inclua um recurso de áudio na página usando o elemento [`amp-audio`](../../../../documentation/components/reference/amp-audio.md).

 Use esse elemento somente para incorporar diretamente arquivos de áudio HTML5. Como todos os recursos externos incorporados em AMP, o elemento carrega o recurso de áudio especificado pelo atributo `src` com lazy loading, em um momento determinado pelas AMP.

Inclua um marcador de posição antes do começo do áudio e um fallback, caso o navegador não seja compatível com áudio HTML5, por exemplo:

[example preview="inline" playground="true" imports="amp-audio:0.1"]
```html
<amp-audio width="400"
  height="200"
  {% if format == 'stories' %}  layout="nodisplay" autoplay
  {% endif %}
  src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <div fallback>
    <p>Your browser doesn’t support HTML5 audio.</p>
  </div>
  <source type="audio/mpeg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.mp3">
  <source type="audio/ogg"
    src="{{server_for_email}}/static/inline-examples/audio/cat-meow.ogg">
</amp-audio>
```
[/example]

Observação: Para usar esse componente, inclua `<script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>` no cabeçalho da página.
