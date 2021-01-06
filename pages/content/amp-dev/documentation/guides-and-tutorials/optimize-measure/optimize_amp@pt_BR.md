---
"$title": Otimize suas páginas AMP hospedadas
"$order": '7'
description: O runtime AMP foi otimizado tendo a velocidade como objetivo e se suas páginas AMP forem servidas por um cache AMP, elas serão plenamente otimizadas e garantirão o melhor desempenho de carregamento...
formats:
- websites
- stories
author: sebastianbenz
---

Este guia fornece dicas e orientações para webmasters sobre como otimizar seus sites AMP hospedados.

### O AMP não é rápido por default?

O runtime AMP foi [otimizado tendo a velocidade como objetivo](../../../about/how-amp-works.html) e se suas páginas AMP forem servidas por um [cache AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md), elas serão plenamente otimizadas e garantirão o melhor desempenho de carregamento. Por exemplo, se seus usuários acessam suas páginas AMP a partir da Pesquisa Google em dispositivos móveis, por default essas páginas são servidas por um cache AMP.

No entanto, nem sempre as páginas AMP são servidas a partir de um cache AMP. Um site pode decidir mostrar páginas AMP dos seus próprios servidores para outras fontes de tráfego. O caso de uso mais frequente são os sites criados totalmente em AMP, como [tasty.co](https://tasty.co), onde que os usuários vão direto para o site. Outra fonte de tráfego é o Twitter, que [começou a incluir links para páginas AMP](https://searchengineland.com/twitter-ramps-amp-278300) em vez de fornecer a versão padrão para dispositivos móveis. Isso significa que, se um usuário clicar num link em um dos aplicativos móveis do Twitter, o link vai para a versão AMP de sua página que está na sua própria origem (se houver uma disponível).

Como resultado, nem sempre você pode ter certeza de que suas páginas AMP são servidas apenas por um cache AMP. Para esses casos, onde você serve páginas AMP a partir dos seus próprios servidores, é importante verificar se suas páginas AMP estão garantindo o desempenho de carregamento ideal.

As páginas AMP carregam rápido por default, mas existem algumas otimizações de desempenho adicionais que você pode implementar para ajudar o navegador a carregar páginas AMP ainda mais rápido. Este guia descreve algumas otimizações que você deve considerar ao publicar páginas AMP. No entanto, antes de começar a ler este guia, certifique-se de que você já abordou todas as [práticas recomendadas de desempenho web fundamentais](#basic-optimizations). A otimização de imagens, em particular, tem um grande impacto no desempenho de carregamento.

Por exemplo, ao aplicar as seguintes técnicas de otimização:

- [Carga otimizada do AMP runtime](#optimize-the-amp-runtime-loading)
- [Imagem hero pré-carregada](#preload-hero-images) (não houve alterações no tamanho/encoding da imagem)
- [Otimização de fontes personalizadas](#optimize-custom-fonts) (neste caso, Google fonts)

o [modelo "The Scenic"](../../../documentation/templates/index.html) carrega [dois segundos mais rápido numa conexão 3G](https://www.webpagetest.org/video/compare.php?tests=180529_RY_9198dcdba1824c169887c6e40c221dae-r:1-c:0).

Se você quiser pular os detalhes, dê uma olhada no [gerador de AMP Boilerplate](/boilerplate), que pode ser usado para gerar páginas AMP personalizadas e otimizadas.

### Otimize o carregamento do AMP runtime <a name="optimize-the-amp-runtime-loading"></a>

Embora o AMP já seja bastante restritivo sobre a marcação permitida na seção `<head>`, ainda há espaço para otimização. A chave é estruturar a seção `<head>` de uma maneira tal que todos os scripts que bloqueiam a renderização e fontes personalizadas carreguem o mais rápido possível.

Eis a ordem recomendada para a seção `<head>` numa página AMP:

[sourcecode:html]

<!doctype html>
<html ⚡ lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="This is the AMP Boilerplate.">
    <link rel="preload" as="script" href="https://cdn.ampproject.org/v0.js">
    <link rel="preload" as="script" href="https://cdn.ampproject.org/v0/amp-experiment-0.1.js">
    <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-experiment" src="https://cdn.ampproject.org/v0/amp-experiment-0.1.js"></script>
    <!-- Import other AMP Extensions here -->
    <style amp-custom>
      /* Add your styles here */
    </style>
    <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible.selected}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <link rel="canonical" href=".">
    <title>My AMP Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
[/sourcecode]

Veja uma descrição passo a passo:

1. A primeira tag deve ser a tag `meta charset`, seguida por quaisquer tags `meta` restantes.

2. Em seguida, faça o pré-carregamento da tag `<script>` com o runtime AMP `v0.js` usando `<link as=script href=https://cdn.ampproject.org/v0.js rel=preload>`. O runtime AMP deve começar a baixar o quanto antes porque o [boilerplate AMP](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) oculta o documento através de `body { visibility:hidden }` até que o runtime AMP termine de carregar. O pré-carregamento do runtime AMP avisa ao navegador que faça o download do script com uma prioridade mais alta. Dê uma olhada em [server-side-rendering](#server-side-rendering) para saber como evitar isso. {amp-img6} {/amp-img6}

3. Se sua página incluir extensões que provocam atraso na renderização (por exemplo, amp-experiment, amp-dynamic-css-classes, amp-story), faça o pré-carregamento dessas extensões conforme sejam requeridas pelo runtime AMP para renderizar a página.

[sourcecode:html]
<link as="script" rel="preload" href="https://cdn.ampproject.org/v0/amp-custom-css-0.1.js">
<link as="script" rel="preload" href="https://cdn.ampproject.org/v0/amp-experiment-0.1.js">
<link as="script" rel="preload" href="https://cdn.ampproject.org/v0/story-1.0.js">[/sourcecode]

1. Use [preconnect](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/) para acelerar a conexão com outra origem onde a URL completa do recurso não seja conhecida com antecedência, por exemplo, ao usar Google Fonts:

[sourcecode:html]<link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>[/sourcecode]

1. Carregue o tempo de execução de AMP:

[sourcecode:html]<script async src="https://cdn.ampproject.org/v0.js"></script>[/sourcecode]

1. Especifique as tags `<script>` para [render-delaying extensions](https://github.com/ampproject/amphtml/blob/master/src/render-delaying-services.js) (por exemplo, [`amp-experiment`](../../../documentation/components/reference/amp-experiment.md) [`amp-dynamic-css-classes`](../../../documentation/components/reference/amp-dynamic-css-classes.md) e [`amp-story`](../../../documentation/components/reference/amp-story.md)
2. Especifique as tags `<script>` para as extensões restantes (por exemplo, [`amp-bind`](../../../documentation/components/reference/amp-bind.md) ...). Essas extensões não atrasam a renderização e, portanto, não devem ser pré-carregadas, pois podem consumir uma largura de banda importante para a renderização inicial.
3. Especifique qualquer estilo personalizado usando a tag `<style amp-custom>`.
4. Adicione quaisquer outras tags permitidas na seção `<head>`. Em particular, quaisquer fontes externas devem vir por último, uma vez que bloqueiam a renderização.
5. Finalmente, especifique o [código AMP boilerplate](../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md). Ao incluir o código boilerplate por último, ele evita que estilos personalizados acidentalmente sobrescrevam as regras de boilerplate css.

[tip] O cache AMP executa todas essas otimizações automaticamente (e mais algumas). Você pode usar a ferramenta AMP Optimizer para executar automaticamente essas otimizações na sua própria origem. [/tip]

### Faça o carregamento prévio de imagens hero <a name="preload-hero-images"></a>

[O AMP HTML usa seu próprio elemento de imagem: `amp-img `](../../../documentation/components/reference/amp-img.md). Embora [`amp-img`](../../../documentation/components/reference/amp-img.md) tenha muitas vantagens sobre a tag HTML `img` tradicional, uma desvantagem é que o runtime AMP precisa estar carregado antes que o download da imagem possa começar. Para algumas imagens, como imagens hero para uma página de produto, é essencial que as imagens carreguem o mais rápido possível. Nesses casos, é melhor pré-carregar a imagem para garantir que o navegador comece a baixá-la o quanto antes e não precise aguardar até que o runtime AMP seja carregado.

[sourcecode:html]

<head>
  <link rel="preload" href="/images/elephants.png" as="image">
</head>
<body>
  ...
  <amp-img width="404" height="720" layout="responsive"
           src="/images/elephants.png" alt="..." >
  </amp-img>
</body>
[/sourcecode]

Mas e se o seu layout responsivo exigir imagens hero diferentes dependendo da largura da tela? Por exemplo, uma imagem larga para desktop e uma imagem estreita para celular assim:

[sourcecode:html]
<amp-img width="404" height="720"
    alt="..." layout="responsive"
    src="/images/elephants_narrow.png"
    media="(max-width: 415px)">
</amp-img>
<amp-img height="720"
    alt="..." layout="fixed-height"
    src="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
</amp-img>
[/sourcecode]

Como `link rel=preload` também oferece suporte a media queries, podemos usar as mesmas media queries em nossas instruções de pré-carregamento, assim:

[sourcecode:html]

<link rel="preload" as="image"
    href="/images/elephants_narrow.png"
    media="(max-width: 415px)">
<link rel="preload" as="image"
    href="/images/elephants_wide.jpg"
    media="(min-width: 416px)">
[/sourcecode]

A propósito, a mesma solução funciona para imagens de pôster [`amp-video`](../../../documentation/components/reference/amp-video.md):

[sourcecode:html]

<link rel="preload" href="/images/poster.jpg" as="image">
...
 <amp-video width="480" height="270" src="elephant.mp4"
             poster="/images/poster.jpg"
             layout="responsive">
     ...
</amp-video>
[/sourcecode]

Apenas certifique-se de colocar as instruções de pré-carregamento *após* a declaração viewport, pois o navegador precisa das dimensões da viewport para determinar a largura da tela:

[sourcecode:html]

<meta name="viewport" content="width=device-width">
...
<link rel="preload" media="(max-width: 415px)" ...>
[/sourcecode]

[tip type="important"] Faça pré-carregamento apenas de imagens críticas, caso contrário, o download da imagem pode ocupar a largura de banda necessária para outros downloads críticos.[/tip]

### Considere o uso de um service worker

Agora que todos os [principais navegadores oferecem suporte a service workers](https://caniuse.com/#feat=serviceworkers), é uma boa ideia avaliar se faz sentido adicionar um service worker ao seu site.

Existem dois padrões arquitetônicos diferentes que sabemos que funcionam para navegações rápidas e confiáveis:

- Para aplicativos de página única (SPA): o modelo App Shell (no contexto AMP conhecido como [AMP-in-PWA](../../../documentation/guides-and-tutorials/integrate/amp-in-pwa.md)). Este padrão requer um service worker para promover um documento AMP em uma experiência PWA baseada em app-shell.
- Para aplicativos multi-página: [streaming de recursos compostos](https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#streaming_composite_responses). Um service worker armazena em cache o cabeçalho e rodapé estáticos e usa streaming para retornar instantaneamente uma resposta parcial, em cache, ao carregar o conteúdo.

Se nenhum desses padrões for usado e não for possível armazenar em cache o site inteiro (o que só é razoável para sites muito pequenos), um service worker pode ter um [impacto negativo no desempenho](https://developers.google.com/web/updates/2017/02/navigation-preload). A melhor solução neste caso é **não** usar um service worker.

Porém, se você deseja que seu site seja [instalável a partir da tela inicial](https://developers.google.com/web/fundamentals/app-install-banners/), ou deseja oferecer uma experiência off-line, você terá que usar um service worker. Nesse caso, é importante usar o [pré-carregamento de navegação](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/02/navigation-preload%23the-problem&sa=D&ust=1529662115405000&usg=AFQjCNHHInHtSdsMeZdYG92rXMaZkkAtZw) para mitigar uma possível desaceleração (Observação: atualmente, o pré-carregamento de navegação é suportado apenas no Chrome).

Se seu site AMP usa um service worker, eis algumas práticas recomendadas:

- Faça cacheamento prévio do [AMP runtime](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime) e extensões (ex.: [`amp-carousel`](../../../documentation/components/reference/amp-carousel.md)).
- Faça pré-cacheamento de logotipos, fontes e outros conteúdos estáticos que seja usado na maior parte de suas páginas.
- Sirva logotipos, fontes e imagens usando uma estratégia [cache-first](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network).
- Sirva o runtime e as extensões AMP usando uma estratégia [stale-while-revalidate](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate).
- Ao usar uma estratégia network-first para solicitações de navegação, certifique-se de habilitar [navigation preload](https://developers.google.com/web/updates/2017/02/navigation-preload).

Se você está procurando uma maneira de começar a trabalhar com um service worker no seu site AMP, veja este [exemplo](https://www.google.com/url?q=https://gist.github.com/sebastianbenz/1d449dee039202d8b7464f1131eae449&sa=D&ust=1529413323498000&usg=AFQjCNE4fepX-hqVeRBW8df43uV5Bi4Llg) que fornece um service worker que implementa todas essas práticas recomendadas.

[tip type="note"] O runtime AMP é servido com uma max-age de apenas 50 minutos para garantir que as atualizações estejam disponíveis rapidamente. Para evitar possíveis perdas de cache do navegador, é uma boa ideia servir o runtime AMP a partir de um service worker. [/tip]

O pré-cacheamento não é relevante apenas para a transição de páginas AMP armazenadas em cache para páginas não AMP da sua própria origem, mas também para a transição de páginas AMP armazenadas em cache para páginas AMP da sua própria origem. O motivo é que o cache AMP reescreve as URLs do runtime AMP a partir da URL permanente para a versão mais recente lançada, por exemplo:

`https://cdn.ampproject.org/v0.js` -> `https://cdn.ampproject.org/rtv/001515617716922/v0.js`.

A consequência é que uma página AMP servida a partir da sua própria origem não se beneficia do cache do navegador e, nesse caso, precisa baixar o runtime AMP (não-versionado) novamente. Com um service worker, você pode pré-armazenar em cache o runtime AMP não-versionado e acelerar a transição. Para saber mais sobre por que o cache AMP versiona as URLs do runtime AMP, leia [este documento](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer##versioned-amp-runtime).

[tip type="note"] No Safari, há uma diferença fundamental na forma como os service workers são implementados - não é possível, no Safari, instalar um service worker para sua origem, se a página for servida a partir de um cache AMP. [/tip]

### Otimize fontes personalizadas <a name="optimize-custom-fonts"></a>

Com o AMP, existem algumas coisas que você pode fazer para otimizar o carregamento de fontes ([a maioria delas não é restrita ao AMP](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)):

- Se possível, use [font-display: optional](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display): Isso só usará a fonte se ela já estiver no cache e retornará à fonte do sistema caso a fonte personalizada ainda não tiver sido carregada.
- Otimize suas fontes Web (por exemplo, sirva fontes personalizadas usando WOFF2).
- Pré-carregar fontes personalizadas:

[sourcecode:html]
<link rel="preload" as="font" href="/bundles/app/fonts/helveticaneue-roman-webfont.woff2" >[/sourcecode]

- Se você estiver usando fontes do Google ou qualquer outro provedor de fontes com URLs de fontes desconhecidas, conecte previamente o servidor de fontes correspondente:

[sourcecode:html]
 <link rel="preconnect dns-prefetch" href="https://fonts.gstatic.com/" crossorigin>
[/sourcecode]

Por último, mas não menos importante, tente minimizar o número de fontes personalizadas que você usa na sua página. Se possível, use as fontes do sistema em vez de fontes personalizadas, porque as fontes do sistema fazem com que seu site corresponda ao sistema operacional do usuário e ajuda a evitar o carregamento de mais recursos.

### Layouts AMP renderizados no servidor <a name="server-side-rendering"></a>

A renderização de layouts  AMP no servidor é uma técnica que caches AMP usam para acelerar ainda mais o tempo de carregamento. Com a renderização do lado do servidor, é possível remover o bolierplate AMP para que o documento AMP possa ser renderizado sem executar o JavaScript do runtime AMP. Por exemplo, a versão do AMP Boilerplate Generator renderizada no servidor [renderiza duas vezes mais rapidamente](https://www.webpagetest.org/video/compare.php?tests=180810_W7_f343aff20fe04fcf84598080fcb98716%2C180810_ZG_24f02134178d96ce8cfc9912f86c873c&thumbSize=200&ival=500&end=visual) que a versão AMP normal!

Se você estiver publicando uma página AMP, com certeza deve considerar o uso do [AMP Optimizer](amp-optimizer-guide/index.md). O AMP Optimizer permite que você sirva páginas AMP otimizadas a partir do seu próprio back-end, que inclui a renderização de layouts AMP no servidor. O AMP Optimizer também executa automaticamente várias outras otimizações descritas neste documento.

### Otimizações básicas <a name="basic-optimizations"></a>

É claro que todos os princípios básicos para otimizações de desempenho da Web também se aplicam às páginas AMP:

- [Otimize imagens](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization) e vídeos. A otimização de imagens pode ter um grande impacto no desempenho do carregamento.
- [Comprima e minifique o CSS e o HTML](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer). Como todo o CSS nas páginas AMP são inline, vale a pena usar algo como [purifycss](https://github.com/purifycss/purifycss) para eliminar o CSS não utilizado.
- Use [HTTP Caching](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
- ... e mais
