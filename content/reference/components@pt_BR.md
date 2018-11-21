---
$title: Componentes
---

[TOC]

A biblioteca de HTML para AMP fornece componentes classificados da seguinte maneira:

- **Incorporados**: são os componentes incluídos na biblioteca de base, como `amp-img` e `amp-pixel`.
- **Estendidos**: são as extensões da biblioteca de base que precisam ser incluídas explicitamente no documento como elementos personalizados (por exemplo, `<script async custom-element="amp-audio" …`).
- **[Experimentais](experimental.html)**: são componentes que foram lançados, mas não estão prontos para uso geral.

Veja a lista de componentes disponíveis abaixo, nas categorias relacionadas.

### Anúncios e análises

| Componente | Descrição |
| --------- | ----------- |
| [`amp-ad`](components/amp-ad.html) | É um contêiner para a exibição de um anúncio. |
| [`amp-ad-exit`](components/amp-ad-exit.html) | Permite a configuração do comportamento das saídas dos anúncios para A4A (AMP for Ads).|
| [`amp-analytics`](components/amp-analytics.html) | Registra dados de análise de documentos AMP. |
| [`amp-auto-ads`](components/amp-auto-ads.html) | Insere anúncios em páginas AMP de maneira dinâmica usando um arquivo de configuração veiculado remotamente. |
| [`amp-call-tracking`](components/amp-call-tracking.html) | Substitui números de telefone em hiperlinks de maneira dinâmica para permitir o rastreamento de chamadas. |
| [`amp-experiment`](components/amp-experiment.html) | Pode ser usado para fazer testes de experiência do usuário em documentos AMP. |
| [`amp-pixel`](components/amp-pixel.html) | É um pixel de rastreamento usado para contar exibições de páginas. |
| [`amp-sticky-ad`](components/amp-sticky-ad.html) | Permite exibir e fixar conteúdo de anúncios na parte inferior da página.|

### Conteúdo dinâmico

| Componente | Descrição |
| --------- | ----------- |
| [`amp-access-laterpay`](components/amp-access-laterpay.html) | Permite que os editores integrem facilmente a plataforma de micropagamentos [LaterPay](https://www.laterpay.net/) (em inglês).
| [`amp-access`](components/amp-access.html) | Oferece uma paywall AMP e compatibilidade com assinaturas.  |
| [`amp-bind`](components/amp-bind.html) | Permite que os elementos se alterem em resposta às ações do usuário ou a mudanças nos dados por meio da vinculação de dados e expressões simples semelhantes a JavaScript. |
| [`amp-byside-content`](components/amp-byside-content.html) | Exibe conteúdo dinâmico do [serviço BySide](http://www.byside.com/) (em inglês). |
| [`amp-consent`](components/amp-consent.html) | Permite coletar e armazenar o consentimento do usuário por meio de um controle da IU. |
| [`amp-date-picker`](components/amp-date-picker.html) | Oferece um widget de calendário para a seleção de datas. |
| [`amp-form`](components/amp-form.html) | Oferece compatibilidade com formulários. |
| [`amp-geo`](components/amp-geo.html) | Fornece uma interface de geolocalização aproximada no nível do país. |
| [`amp-gist`](components/amp-gist.html) | Exibe um [GitHub Gist](https://gist.github.com/) (em inglês). |
| [`amp-install-serviceworker`](components/amp-install-serviceworker.html) | Instala um ServiceWorker. |
| [`amp-list`](components/amp-list.html) | De maneira dinâmica, faz download de dados e cria itens para listas usando um modelo. |
| [`amp-live-list`](components/amp-live-list.html) | Permite exibir e atualizar o conteúdo em tempo real. |
| [`amp-mustache`](components/amp-mustache.html) | Permite a renderização de modelos [`Mustache.js`](https://github.com/janl/mustache.js/) (em inglês). |
| [`amp-next-page`](components/amp-next-page.html) | Carrega dinamicamente mais documentos recomendados para o usuário. |
| [`amp-selector`](components/amp-selector.html) | Representa um controle que exibe um menu de opções para escolha do usuário. |
| [`amp-user-notification`](components/amp-user-notification.html) | Exibe uma notificação que pode ser dispensada pelo usuário. |
| [`amp-web-push`](components/amp-web-push.html) | Permite que os usuários se inscrevam para receber [notificações push da Web](https://developers.google.com/web/fundamentals/engage-and-retain/push-notifications/). |

### Layout

| Componente | Descrição |
| --------- | ----------- |
| [`amp-accordion`](components/amp-accordion.html) | Oferece aos usuários uma visualização rápida do conteúdo que permite pular para a seção desejada. |
| [`amp-app-banner`](components/amp-app-banner.html) | Insere um wrapper e um elemento reduzido de IU em um banner de posição fixa para várias plataformas com uma call-to-action de instalação de aplicativo. |
| [`amp-carousel`](components/amp-carousel.html) | Exibe vários conteúdos semelhantes em um eixo horizontal. |
| [`amp-fx-flying-carpet`](components/amp-fx-flying-carpet.html) | Une os elementos derivados em um contêiner exclusivo de tela cheia com rolagem. Isso permite exibir anúncios de tela cheia sem ocupar toda a janela de visualização. |
| [`amp-fx-collection`](components/amp-fx-collection.html) | Oferece uma coleção de efeitos visuais predefinidos, como paralaxe. |
| [`amp-iframe`](components/amp-iframe.html) | Exibe um iframe. |
| [`amp-image-lightbox`](components/amp-image-lightbox.html) | Atribui um efeito lightbox a uma imagem específica. |
| [`amp-layout`](components/amp-layout.html) | Atribui um elemento de contêiner genérico e multifuncional que permite adicionar os [layouts avançados da AMP](/pt_br/docs/design/responsive/control_layout.html#the-layout-attribute) a qualquer elemento. |
| [`amp-lightbox`](components/amp-lightbox.html) | Exibe elementos em um modal "lightbox" que ocupa toda a janela de visualização. |
| [`amp-lightbox-gallery`](components/amp-lightbox-gallery.html) | Resulta em uma experiência "lightbox". Com a interação do usuário, um componente de IU se expande para preencher a janela de visualização até ser fechado pelo usuário. |
| [`amp-position-observer`](components/amp-position-observer.html) | Monitora a posição de um elemento na janela de visualização conforme o usuário rola a página e envia eventos que podem ser usados com outros componentes. |
| [`amp-sidebar`](components/amp-sidebar.html) | Permite a exibição de metaconteúdo para acesso temporário, como itens de navegação, links, botões e menus. |


### Mídia

| Componente | Descrição |
| --------- | ----------- |
| [`amp-3d-gltf`](components/amp-3d-gltf.html) | Exibe modelos 3D no formato GL Transmission Format (gITF). |
| [`amp-3q-player`](components/amp-3q-player.html) | Incorpora vídeos do [3Q SDN](https://www.3qsdn.com) (indisponível em português). |
| [`amp-anim`](components/amp-anim.html) | Gerencia uma imagem animada, geralmente um GIF. |
| [`amp-apester-media`](components/amp-apester-media.html) | Exibe um bloco inteligente do [Apester](https://apester.com/) (em inglês). |
| [`amp-audio`](components/amp-audio.html) | Substitui a tag HTML5 `audio`. |
| [`amp-bodymovin-animation`](components/amp-bodymovin-animation.html) | Exibe um [player de animação do AirBnB Bodymovin](http://airbnb.io/lottie/) (em inglês), que renderiza uma animação de JSON gerada pelo [Adobe After Effects](https://www.adobe.com/br/products/aftereffects.html). |
| [`amp-brid-player`](components/amp-brid-player.html) | Exibe um player do [Brid.tv](https://www.brid.tv/) (em inglês). |
| [`amp-brightcove`](components/amp-brightcove.html) | Exibe um player [Video Cloud](https://www.brightcove.com/en/online-video-platform) ou [Perform](https://www.brightcove.com/en/perform) do Brightcove (páginas indisponíveis em português). |
| [`amp-dailymotion`](components/amp-dailymotion.html) | Exibe um vídeo do [Dailymotion](https://www.dailymotion.com). |
| [`amp-google-vrview-image`](components/amp-google-vrview-image.html) | Exibe uma imagem em RV. |
| [`amp-hulu`](components/amp-hulu.html) | Exibe um vídeo incorporado simples do [Hulu](http://www.hulu.com/) (em inglês). |
| [`amp-ima-video`](components/amp-ima-video.html) | Incorpora um player para anúncios em vídeo InStream integrados com o [SDK do IMA](https://developers.google.com/interactive-media-ads/docs/sdks/html5/). |
| [`amp-img`](components/amp-img.html) | Substitui a tag HTML5 `img`. |
| [`amp-imgur`](components/amp-imgur.html) | Exibe uma postagem do [Imgur](http://imgur.com/) (em inglês). |
| [`amp-izlesene`](components/amp-izlesene.html) | Exibe um vídeo do [Izlesene](https://www.izlesene.com/) (em turco). |
| [`amp-jwplayer`](components/amp-jwplayer.html) | Exibe um [JW Player](https://www.jwplayer.com/) (em inglês) hospedado na nuvem. |
| [`amp-kaltura-player`](components/amp-kaltura-player.html) | Exibe o Kaltura Player como ele é usado na [plataforma de vídeo do Kaltura](https://br.corp.kaltura.com/). |
| [`amp-nexxtv-player`](components/amp-nexxtv-player.html) | Exibe um stream de mídia da plataforma nexxOMNIA. |
| [`amp-o2-player`](components/amp-o2-player.html) | Exibe um [O2Player do AOL](http://on.aol.com/) (em inglês). |
| [`amp-ooyala-player`](components/amp-ooyala-player.html) | Exibe um vídeo do [Ooyala](https://www.ooyala.com/) (indisponível em português). |
| [`amp-playbuzz`](components/amp-playbuzz.html) | Exibe conteúdo do [Playbuzz](http://www.playbuzz.com/) (em inglês) como listas, enquetes etc. |
| [`amp-reach-player`](components/amp-reach-player.html) | Exibe um player de vídeo do [Beachfront Reach](https://beachfrontreach.com/) (em inglês). |
| [`amp-soundcloud`](components/amp-soundcloud.html) | Exibe um clipe do [Soundcloud](https://soundcloud.com/). |
| [`amp-springboard-player`](components/amp-springboard-player.html) | Exibe um player de vídeo do [Springboard Platform](http://publishers.springboardplatform.com/users/login) (em inglês). |
| [`amp-video`](components/amp-video.html) | Substitui a tag HTML5 `video`. |
| [`amp-vimeo`](components/amp-vimeo.html) | Exibe um vídeo do [Vimeo](https://vimeo.com/). |
| [`amp-wistia-player`](components/amp-wistia-player.html) | Exibe um vídeo do [Wistia](https://wistia.com/) (em inglês). |
| [`amp-youtube`](components/amp-youtube.html) | Exibe um vídeo do [YouTube](https://www.youtube.com/). |

### Apresentação

| Componente | Descrição |
| --------- | ----------- |
| [`amp-animation`](components/amp-animation.html) | Define e exibe uma animação. |
| [`amp-dynamic-css-classes`](components/amp-dynamic-css-classes.html) | Adiciona nomes de classe CSS dinâmicos ao elemento HTML. |
| [`amp-fit-text`](components/amp-fit-text.html) | Expande ou reduz o tamanho da fonte para ajustar o conteúdo ao espaço. |
| [`amp-font`](components/amp-font.html) | Aciona e monitora o carregamento de fontes personalizadas. |
| [`amp-mathml`](components/amp-mathml.html) | Exibe uma [fórmula MathML](https://www.w3.org/Math/) (em inglês). |
| [`amp-story`](components/amp-story.html) | É um formato avançado de narrativa visual. |
| [`amp-timeago`](components/amp-timeago.html) | Atribui carimbos de data/hora ao formatar datas como "*há tanto tempo*" (por exemplo, "há três horas"). |
| [`amp-viz-vega`](components/amp-viz-vega.html) | Exibe gráficos criados com a gramática de visualização [Vega](https://vega.github.io/vega/) (em inglês).|


### Conteúdo social

| Componente | Descrição |
| --------- | ----------- |
| [`amp-beopinion`](components/amp-beopinion.html) | Incorpora conteúdo do [BeOpinion](https://beopinion.com/) (indisponível em português). |
| [`amp-addthis`](components/amp-addthis.html) | Exibe uma incorporação de ferramentas do site do [AddThis](https://www.addthis.com/pt/). |
| [`amp-facebook-comments`](components/amp-facebook-comments.html) | Incorpora o plug-in de comentários do Facebook. |
| [`amp-facebook-like`](components/amp-facebook-like.html) | Incorpora o plug-in do botão de curtir do Facebook. |
| [`amp-facebook-page`](components/amp-facebook-page.html) | Incorpora o [plug-in de página do Facebook](https://developers.facebook.com/docs/plugins/page-plugin). |
| [`amp-facebook`](components/amp-facebook.html) | Exibe uma postagem ou um vídeo do Facebook. |
| [`amp-gfycat`](components/amp-gfycat.html) | Exibe um GIF em vídeo do [Gfycat](https://gfycat.com) (em inglês). |
| [`amp-instagram`](components/amp-instagram.html) | Exibe conteúdo incorporado do Instagram. |
| [`amp-pinterest`](components/amp-pinterest.html) | Exibe um widget do Pinterest ou o botão "Salvar". |
| [`amp-reddit`](components/amp-reddit.html) | Exibe um comentário ou uma postagem incorporada do Reddit. |
| [`amp-riddle-quiz`](components/amp-riddle-quiz.html) | Exibe conteúdo do [Riddle](https://www.riddle.com/) (em inglês), por exemplo, questionários, listas, enquetes etc. |
| [`amp-social-share`](components/amp-social-share.html) | Exibe um botão de compartilhamento social. |
| [`amp-twitter`](components/amp-twitter.html) | Exibe um tweet do Twitter. |
| [`amp-vine`](components/amp-vine.html) | Exibe uma incorporação simples do Vine. |
| [`amp-vk`](components/amp-vk.html) | Incorpora um widget de enquete ou postagem do [VK](https://vk.com/). |
 
