---
'$title': Detalhes técnicos para Histórias Web
$order: 1
description: Detalhes técnicos para Histórias Web
'$category': Develop
formats:
  - stories
author: CrystalOnScript
---

Este guia explica todos os detalhes técnicos e práticas recomendadas que você deve conhecer para ter sucesso ao criar Histórias na Web com o AMP.

## AMP válido

Uma História Web é tecnicamente uma única página Web criada com o AMP e que segue as especificações do AMP:

- Comece com o doctype `<!doctype html>`.
- Inclua uma tag top-level `<html ⚡>` ou `<html amp>`.
- Inclua as tags `<head>` e `<body>`.
- Inclua uma tag `<meta charset="utf-8">` como primeiro elemento-filho da tag `<head>`.
- Inclua uma `<script async src="https://ampjs.org/v0.js"></script>` dentro da tag `<head>`. Como boa prática, você deve incluir o script o mais próximo do início do bloco `<head>`.
- Inclua uma tag ` <link rel="canonical" href="page/url">` dentro de `<head>` com o href apontando para a URL da História Web.
- Inclua uma tag `<meta name="viewport" content="width=device-width">` dentro de `<head>`. Também é recomendada a inclusão de initial-scale=1.
- Inclua o código [AMP boilerplate](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) dentro da tag `<head>`.

A diferença entre uma página Web do AMP e uma História Web criada com o AMP é o componente [`amp-story`](https://amp.dev/documentation/components/amp-story/?format=stories). É o único elemento-filho direto do documento `<body>` e deve conter o atributo `standalone`. Todas as páginas, camadas e elementos da História Web são definidos nas tags `<amp-story>`.

```html
<!DOCTYPE html>
<html ⚡>
  <head>
    <meta charset="utf-8" />
    <title>Joy of Pets</title>
    <link rel="canonical" href="pets.html" />
    <meta name="viewport" content="width=device-width" />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://ampjs.org/v0.js"></script>
    <script
      async
      custom-element="amp-video"
      src="https://ampjs.org/v0/amp-video-0.1.js"
    ></script>
    <script
      async
      custom-element="amp-story"
      src="https://ampjs.org/v0/amp-story-1.0.js"
    ></script>
    <style amp-custom>
      ...;
    </style>
  </head>
  <body>
    <!-- Cover page -->
    <amp-story
      standalone
      title="Joy of Pets"
      publisher="AMP tutorials"
      publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
      poster-portrait-src="assets/cover.jpg"
    >
      <amp-story-page id="cover">
        <amp-story-grid-layer template="fill">
          <amp-img
            src="assets/cover.jpg"
            width="720"
            height="1280"
            layout="responsive"
          >
          </amp-img>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="vertical">
          <h1>The Joy of Pets</h1>
          <p>By AMP Tutorials</p>
        </amp-story-grid-layer>
      </amp-story-page>

      <!-- Page 1 -->
      <amp-story-page id="page1">
        <amp-story-grid-layer template="vertical">
          <h1>Cats</h1>
          <amp-img
            src="assets/cat.jpg"
            width="720"
            height="1280"
            layout="responsive"
          >
          </amp-img>
          <q
            >Dogs come when they're called. Cats take a message and get back to
            you. --Mary Bly</q
          >
        </amp-story-grid-layer>
      </amp-story-page>
      ...
    </amp-story>
  </body>
</html>
```

Siga as instruções no [tutorial Crie sua primeira História Web](../start/visual_story/?format=stories) e [leia a documentação de referência do amp-story ](../../components/reference/amp-story/?format=stories)para saber mais.

## Pico de desempenho e experiência do usuário

Os usuários podem estar visualizando Histórias Web em regiões com conexões de rede de baixa qualidade ou dispositivos mais antigos. Garanta que eles curtam sua experiência seguindo as práticas recomendadas a seguir.

### Cor de fundo

Especifique uma cor de fundo para cada página da História Web. Ter uma cor de fundo garante uma boa alternativa se as condições do usuário impedirem o download de imagens ou recursos de vídeo. Escolha uma cor que represente a cor dominante do recurso que seria plano de fundo pretendido da página ou utilize um tema de cores consistente para todas as páginas da história. Certifique-se que a cor do plano de fundo seja contrastante em relação ao texto, para garantir a legibilidade.

Defina a cor de plano de fundo para as páginas usando as tags`<style amp-custom>` no head do documento da História Web ou inline no componente [`<amp-story-page>`](https://amp.dev/documentation/components/amp-story-page/?format=stories) .

### Elementos de camadas

O cabeçalho do sistema contém controles tais como os ícones silenciar e compartilhar. Ele é exibido com um z-index maior que a imagem de fundo e vídeo. Certifique-se que nenhuma informação essencial seja coberta por esses ícones.

### Proporção

Projete os recursos da História Web na proporção de 9:16. Como altura e largura da página variam entre navegadores e dispositivos, não deixe conteúdo essencial próximo às bordas da página.

### Imagens de pôster

Uma imagem de pôster é exibida para o usuário enquanto um vídeo é baixado. A imagem do pôster deve ser representativa do vídeo para permitir uma transição suave. Especifique uma imagem de pôster adicionando o atributo `poster` ao seu elemento amp-video e faça com que aponte para o endereço da imagem.

```
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

## Vídeo

Todos os vídeos devem ser adicionados através do componente [amp-video](https://amp.dev/documentation/components/amp-video/?format=stories).

```
<amp-video controls
  width="640"
  height="360"
  layout="responsive"
  poster="/static/inline-examples/images/kitten-playing.png">
  <source src="/static/inline-examples/videos/kitten-playing.webm"
    type="video/webm" />
  <source src="/static/inline-examples/videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```

### Resolução e qualidade

Codifique os vídeos para ajustar a qualidade das seguintes otimizações recomendadas:

<table>
  <tr>
   <td>MP4</td>
   <td>-crf 23</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>-b:v 1M</td>
  </tr>
</table>

Tente manter os segmentos HLS com duração inferior a 10 segundos.

### Formato e tamanho

Mantenha vídeos menores que 4MB para o melhor desempenho. Considere dividir vídeos grandes em múltiplas páginas.

Se você só puder fornecer um único formato de vídeo, forneça MP4. Quando possível, use o formato HLS e especifique MP4 como reserva para garantir a compatibilidade com o navegador. Use o seguinte codec de vídeo:

<table>
  <tr>
   <td>MP4, HLS e DASH</td>
   <td>H.264</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>VP9</td>
  </tr>
</table>

### Especifique &lt;source&gt; em vez de src

Use os elementos-filho `<source>` dentro do componente `<amp-video>` para especificar a fonte de vídeo sobre o atributo `src`. O uso do elemento `<source>` permite que você indique o tipo de vídeo e adicione fontes de vídeo como backup. Você precisa usar o atributo `type` para especificar o componente MIME. Use `application/x-mpegurl` ou `application/vnd.apple.mpegurl` para vídeos HLS. Para todos os outros tipos de vídeo, use o prefixo MIME `video/` e acrescente o formato de vídeo, como por exemplo `”video/mp4”`.

```html
<amp-video
  id="video-page1"
  autoplay
  loop
  layout="fill"
  poster="https://example.com/media/poster.jpg"
>
  <source
    src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl"
  />
  <source src="https://amp-example.com/media/movie.mp4" type="video/mp4" />
</amp-video>
```

### Avanço automático depois de um vídeo

O atributo [`auto-advance-after`](https://amp.dev/documentation/components/amp-story-page/?format=stories#auto-advance-after-%5Boptional%5D) exposto por amp-story-page especifica se e quando uma página da história deve avançar sem a intervenção do usuário. Para avançar após um vídeo, indique o ID do vídeo no atributo.

```html
<amp-story-page auto-advance-after="myvideo"></amp-story-page>
```

## Experiência desktop

O formato de Histórias Web suporta uma [experiência desktop opcional](https://github.com/ampproject/amphtml/blob/main/extensions/amp-story/amp-story.md#landscape-orientation-and-full-bleed-desktop-experience-opt-in). Isto altera a experiência desktop para um modo imersivo de tela cheia, substituindo a experiência default de três painéis em orientação vertical e permite que os usuários móveis vejam a história quando seus dispositivos são mantidos na posição horizontal.

Ative o suporte a desktop adicionando o atributo `supports-landscape` ao componente `<amp-story>`.

```html
<amp-story
  standalone
  supports-landscape
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/icon.svg"
  poster-portrait-src="assets/cover.jpg"
>
</amp-story>
```
