---
'$title': Melhores práticas para criar um anúncio de História Web
$order: 16
description: As Histórias Web são uma experiência de toque em tela inteira que envolve os leitores no conteúdo. Anúncios que aparecem em Histórias Web devem ter um design consistente e coeso com a experiência das Histórias Web.
formats:
  - ads
  - stories
---

As Histórias Web são uma experiência de toque em tela inteira que envolve os leitores no conteúdo. Anúncios que aparecem em Histórias Web devem ter um design consistente e coeso com a experiência das Histórias Web. Isto evita uma experiência do usuário áspera ou interruptiva. Este guia demonstra como criar um anúncio para Histórias Web.

## Princípios de uma História Web

Os formatos de anúncio atuais, como banners e caixas, não se integram bem com o formato de História AMP. Anúncios clássicos são lentos, interruptivos e parecem fora de lugar na experiência da História.

Os anúncios em Histórias Web aderem aos seguintes princípios:

- Anúncio AMPHTML válido: deve seguir a mesma especificação técnica que um [anúncio AMPHTML](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/amp-a4a-format.md) clássico.
- Visual em primeiro lugar: convidativo, ousado e orientado pelo contexto.
- Nativo: a página do anúncio tem as mesmas dimensões que uma página de história orgânica.
- Mesmo modelo de interação: o usuário pode seguir para a próxima tela assim como faria com uma página de história orgânica.
- Rápido: o anúncio jamais aparece para o usuário num estado semi-carregado.

Para manter a consistência com esses princípios, é o runtime da História Web quem determina a colocação ideal de uma página de anúncio no meio de uma História Web. Leia mais sobre a mecânica de colocação de anúncios em [Anuncie em Histórias Web](advertise_amp_stories.md).

## Exemplo de um anúncio de História Web

Anúncios de Histórias Web são anúncios AMPHTML, mas possuem metadados obrigatórios, atendem a determinadas especificações de layout e incluem certos elementos da UI obrigatórios. Um anúncio de História Web irá sempre conter um botão call-to-action (CTA) e um rótulo de anúncio que aparece sobreposto como aviso de texto no topo da página.

{{ image('/static/img/docs/stampads/stamp_ad.png', 425, 800, layout='intrinsic', alt='Exemplo de um anúncio de História AMP', caption='Exemplo de um anúncio de História AMP', align='' ) }}

Para manter consistente a experiência do usuário, o runtime da História Web é o mecanismo responsável por renderizar o rótulo do anúncio e o botão CTA.

[tip type="important"] **IMPORTANTE** – Apenas o botão CTA é clicável em uma História Web, portanto tenha isto em mente quando estiver desenvolvendo o seu criativo. [/tip]

## Metadados

Os metadados especificam que o anúncio está de acordo com o formato de História Web, definem o enum com texto do botão CTA, direcionam para onde o botão irá enviar o usuário e informam o tipo de página.

[sourcecode:html]

<html amp4ads>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">

    <!-- Specifies where the user is directed -->
    <meta name="amp-cta-url" content="%%CLICK_URL_UNESC%%%%DEST_URL%%">

    <!-- Specifies the call to action button text enum -->
    <meta name="amp-cta-type" content="EXPLORE">

    <!-- Specifies what type of landing page the user is direct to -->
    <meta name="amp-cta-landing-page-type" content="NONAMP">

    <style amp4ads-boilerplate>body{visibility:hidden}</style>
    <style amp-custom>
     amp-img {height: 100vh}
    </style>
    <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>

  </head>
  <body>
    <amp-img src=%%FILE:JPG1%% layout="responsive" height="1280" width="720"></amp-img>
  </body>
</html>
[/sourcecode]

Recomenda-se usar as [opções de texto disponíveis para o botão CTA](#call-to-action-button-text-enum) para selecionar o conteúdo do tag amp-cta-type. O AMP fará a localização automática de opções predefinidas quando for o caso.

Pode-se usar um texto personalizado, mas você precisará implementar você mesmo a localização.

## Enum com texto do botão CTA <a name="call-to-action-button-text-enum"></a>

O botão call-to-action pode ser configurado a partir de um conjunto predefinido de opções:

- `APPLY_NOW`: "Aplicar agora"
- `BOOK_NOW`: "Reservar"
- `BUY_TICKETS`: "Comprar Ingressos"
- `DOWNLOAD`: "Baixar"
- `EXPLORE`: "Explore Agora"
- `GET_NOW`: "Obtenha Agora"
- `INSTALL`: "Instale Agora"
- `LISTEN`: "Ouça Agora"
- `MORE`: "Mais"
- `OPEN_APP`: "Abrir Aplicativo"
- `ORDER_NOW`: "Solicitar Agora"
- `PLAY`: "Executar"
- `READ`: "Ler Agora"
- `SHOP`: "Comprar Agora"
- `SHOWTIMES`: "Horários"
- `SIGN_UP`: "Inscrever-se"
- `SUBSCRIBE`: "Assine Agora"
- `USE_APP`: "Usar Aplicativo"
- `VIEW`: "Visualizar"
- `WATCH`: "Assistir"
- `WATCH_EPISODE`: "Assistir Episódio"

[tip type="note"] **OBSERVAÇÃO** – Não são suportados links profundos para aplicativos, mas links para a página da App Store ou para a página da Loja do Google Play são suportados via http/https. O enum com texto do botão CTA é especificado no payload da resposta do anúncio. [/tip]

Se for necessário suporte para algum novo enum de texto de botão CTA, por favor crie um [issue no GitHub](https://github.com/ampproject/amphtml/issues/new).

## Página de destino do anúncio

Você pode especificar uma dentre três opções para a página de destino de um anúncio de História Web.

- `STORY`: A página de destino é uma [história patrocinada](story_ads_best_practices.md#sponsored-story).
- `AMP`: A página de destino é uma página AMP válida.
- `NONAMP`: Qualquer outro tipo de página web.

## Layout

Histórias Web são horizontais e usam tela cheia. Os anúncios de histórias precisam se adequar a este formato para fornecer uma experiência de usuário consistente.

## Dimensões do rótulo

O rótulo do anúncio sobrepõe uma barra de gradiente escura que se estende horizontalmente por toda a largura do anúncio e verticalmente da parte superior descendo até 46px.

{{ image('/static/img/docs/stampads/ad_overlay.png', 515, 520, layout='intrinsic', alt='Demonstração do rótulo do anúncio', caption='O rótulo do anúncio sobrepõe a parte superior', align='' ) }}

The CTA sits 32px from the bottom and is centered horizontally. It is 120px by 36px.

{{ image('/static/img/docs/stampads/cta_button.png', 515, 520, layout='intrinsic', alt='Demonstração do botão CTA', caption='O botão CTA é posicionado na parte inferior', align='' ) }}

## Imagens e vídeo

As imagens e vídeo incluídos em um anúncio de História AMP devem seguir o padrão 4:3 de tela cheia. Anúncios que incluem vídeo devem usar um [pôster](../../../documentation/components/reference/amp-video.md#poster). As dimensões recomendadas para uma imagem de pôster são 720p (720w x 1280h) .

[sourcecode:html]
<amp-video controls
  width="720"
  height="1280"
  layout="responsive"
  poster="images/kitten-playing.png">

  <source src="videos/kitten-playing.webm"
    type="video/webm" />
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
[/sourcecode]

### Imagens

Imagens de fundo podem ser redimensionadas para ocupar a tela cheia. O seguinte CSS ilustra uma boa solução para recortar e centralizar vídeos e imagens.

[sourcecode:html]

<style amp-custom>
    amp-img, amp-video {
        height: 100vh;
    }
    amp-video video {
        object-fit: cover;
    }
    amp-img img{
        object-fit: cover;
    }
</style>

[/sourcecode]

### Vídeo

#### Especificar `<source>` vs `src`

Ao especificar a fonte para um [`amp-video`](../../../documentation/components/reference/amp-video.md)

Exemplo: especificando múltiplos arquivos-fonte

[sourcecode:html]
<amp-video id="video-page1" autoplay loop
  layout="fill" poster="https://example.com/media/poster.jpg">

  <source src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl" />
  <source src="https://amp-example.com/media/movie.mp4"
    type="video/mp4" />
</amp-video>
[/sourcecode]

#### Tamanho e duração do vídeo

Para obter melhor desempenho, você deve buscar fornecer vídeos que não sejam maiores do que 4 MB. Tamanhos de arquivo menores permitem um download mais rápido, portanto mantenha tudo o menor possível.

#### Formatos de vídeo

Se você só puder fornecer um único formato de vídeo, forneça **MP4**. Porém, sempre que possível, use o formato **HLS** e especifique MP4 como uma reserva para navegadores que ainda não suportam vídeos HLS. HLS realiza streaming com taxa de bits adaptativa, onde a qualidade do vídeo pode ser alterada para melhor atender a conexão de rede do usuário.

[tip type="note"] **OBSERVAÇÃO** – O formato de vídeo HLS não é suportado no navegador Chrome para desktop (nem mesmo via emulação); portanto, será necessário especificar um fallback MP4 para qualquer tipo de tráfego de desktop para sua página. Para depurar vídeos HLS, você precisará usar um dispositivo móvel real via depuração USB. [/tip]

#### Resolução do vídeo

Vídeos de Histórias Web são sempre verticais (orientação de retrato), com proporção esperada de 16:9. Use a resolução recomendada para cada tipo de streaming:

<table>
  <thead>
    <tr>
     <th>Tipo de streaming de vídeo</th>
     <th>Resolução</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td>Não adaptativa</td>
     <td>720 x 1280 px</td>
    </tr>
    <tr>
     <td>Adaptativa</td>
     <td>720 x 1280 px<br>540 x 960 px<br>360 x 480 px</td>
    </tr>
  </tbody>
</table>

[tip type="note"] **NOTE –** For mobile devices that differ from the 16:9 aspect ratio, the video might be cropped horizontally or vertically to fit the viewport. [/tip]

#### Codec de vídeo

1. Para MP4, use `H.264`.
2. Para WEBM, use `VP9`.
3. Para HLS ou DASH, use `H.264`.

#### Video quality

##### Otimização da transcodificação

Há várias ferramentas que você pode usar para codificar vídeos e ajustar a qualidade do vídeo durante a codificação. Eis uma lista:

<table>
  <thead>
    <tr>
     <th>Ferramenta</th>
     <th>Notas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
     <td><a href="https://www.ffmpeg.org/about.html">FFmpeg</a></td>
     <td>Otimizações recomendadas:      <ul>         <li>Para MP4, use <code>-crf 23</code>.</li>         <li>Para WEBM, use <code>-b:v 1M</code>.</li>       </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://libav.org/avconv.html">avconv</a></td>
     <td>Otimizações recomendadas:      <ul>         <li>Para MP4, use <code>-crf 23</code>.</li>         <li>Para WEBM, use <code>-b:v 1M</code>.</li>       </ul>
</td>
    </tr>
    <tr>
     <td><a href="https://github.com/google/shaka-packager">Shaka Packager</a></td>
     <td>Um codificador que também pode gerar o formato HLS, incluindo a lista de reprodução.</td>
    </tr>
  </tbody>
</table>

##### Tamanho do segmento HLS

Garanta que o tamanho de seus segmentos HLS típicos não tenham mais de 10 segundos de duração.

## Animation

Há algumas ressalvas em relação a animações nas histórias, como, por exemplo, o conceito do que é "visível". Por exemplo, no nosso formato desktop que é dividido em três painéis, seu criativo poderá ser visível na página, mas não ter o foco central. Isto pode ser problemático se o efeito desejado for iniciar animações quando uma página se tornar o principal ponto focal.

Para ajudar com essa questão, o AMP incluirá um atributo especial `amp-story-visible` no corpo do seu criativo quando ele for o ponto focal em todos os contextos de serviço. Recomenda-se disparar animações com base neste sinal.

Por exemplo: esta animação vai disparar quando a página entrar em foco e vai reiniciar caso um usuário clique para mudar de página e voltar.

[sourcecode:html]

<style amp-custom>
    body[amp-story-visible] .my-animation-class {
      animation: 2s my-animation-name;
    }
</style>

[/sourcecode]

## Sponsored Story <a name="sponsored-story"></a>

Uma História patrocinada existe como uma URL na web, permitindo que o tráfego do usuário seja redirecionado para uma História patrocinada a partir do botão call-to-action em um anúncio de História AMP. Uma História patrocinada é uma História AMP, mas com foco numa experiência de publicidade imersiva e expansiva.

{{ image('/static/img/docs/stampads/sponsored_story_full.png', 1600, 900, layout='intrinsic', alt='Botão CTA redireciona para uma História patrocinada', caption='Botão CTA redireciona para uma História patrocinada', align='' ) }}

Leia mais sobre como criar uma [História Web aqui](../start/create_successful_stories.md).
