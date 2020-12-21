---
"$title": Preload your PWA from your AMP pages
"$order": '1'
description: Uma boa estratégia é fazer com que o ponto de entrada do seu site seja uma página AMP, carregar o PWA em segundo plano e mudar para ...
formats:
- websites
author: pbakaus
---

Uma boa estratégia é fazer com que o **ponto de entrada do seu site seja uma página AMP**, **carregar o PWA em segundo plano** e mudar para ele durante a navegação:

- Todas as páginas de detalhes com conteúdo (aquelas que têm material específico, e não páginas de visão geral) são publicadas como AMP para proporcionar uma experiência de carregamento quase instantâneo.
- Essas páginas AMP usam o elemento especial [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) para carregar um cache e o shell do PWA enquanto o usuário navega pelo conteúdo.
- Quando o usuário clicar em outro link no site (por exemplo, a call-to-action na parte inferior, que cria uma experiência mais semelhante a um aplicativo), o service worker interceptará a solicitação, assumirá o controle da página e carregará o shell do PWA.

Leia mais para saber como e por que usar esse padrão de desenvolvimento.

## Melhore a jornada do usuário com a conexão a um PWA

### AMP para aquisição inicial de usuários

As páginas AMP são a solução ideal para as chamadas **páginas de detalhes**, com conteúdo que os usuários descobrem organicamente por meio de mecanismos de pesquisa, links compartilhados por amigos ou links em outros sites. Com a [pré-renderização especializada das páginas AMP](../../../about/how-amp-works.html), o carregamento é extremamente rápido, e isso leva a uma taxa de desistência muito menor. O [estudo mais recente da DoubleClick](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/) mostrou que **mais de 53% dos usuários desistem após três segundos**.

### PWA para mais interatividade e engajamento

Por sua vez, os Progressive Web Apps possibilitam muito mais interatividade e engajamento, mas não têm as *características de primeiro carregamento instantâneo* das páginas AMP. A base deles é uma tecnologia chamada service worker, um proxy do cliente que permite armazenar em cache todos os tipos de recursos das páginas. No entanto, o service worker só é ativado *após* o primeiro carregamento.

{{ image('/static/img/docs/pwamp_comparison.png', 977, 549, align='', caption='Aspectos positivos e negativos das AMP em comparação com PWA') }}

## Carregue o PWA com `amp-install-serviceworker`

É possível instalar o service worker do seu Progressive Web App a partir de uma página AMP, mesmo que essa página seja veiculada a partir de um cache de AMP. Se isto for feito corretamente, o funcionamento dos links que direcionam ao PWA a partir de suas páginas AMP será quase instantâneo, semelhante ao primeiro acesso à página AMP.

[tip type="tip"] <strong>DICA –</strong> Caso você ainda não esteja familiarizado com o service worker, recomendamos o [curso da Udacity](https://www.udacity.com/course/offline-web-applications--ud899) de Jake Archibald (em inglês).[/tip]

Primeiro, instale o service worker em todas as suas páginas AMP usando [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md). Para isso, inclua antes o componente por meio do script correspondente na seção `<head>` da página:

[sourcecode:html]
<script async custom-element="amp-install-serviceworker"
  src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>
[/sourcecode]

Depois, adicione o código a seguir na seção `<body>` (modifique-o para que ele leve ao seu service worker):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

Por último, na etapa de instalação do service worker, armazene em cache os recursos de que o PWA precisará:

[sourcecode:javascript]
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
[/sourcecode]

[tip type="tip"] <strong>DICA –</strong> existem maneiras mais fáceis de lidar com o service worker. Confira as [bibliotecas de ajuda do service worker](https://github.com/GoogleChrome/sw-helpers) (em inglês).[/tip]

## Faça todos os links de uma página AMP navegarem para o PWA

Provavelmente, a maioria dos links nas suas páginas AMP leva a outras páginas de conteúdo. Há duas estratégias que podem ser usadas para garantir que os cliques em links subsequentes façam o "upgrade" para o Progressive Web App, [dependendo da forma como você usa as AMP](../../../documentation/guides-and-tutorials/optimize-measure/discovery.md):

### 1. Caso você faça o pareamento das páginas canônicas com as páginas AMP

Nesse caso, você tem um site canônico (não-AMP) e gera páginas AMP vinculadas às canônicas. Atualmente, essa é a forma mais comum de usar o AMP. Com essa estrutura, o mais provável é que os links das páginas AMP levem à versão canônica do site. **Boa notícia: se o site canônico for seu PWA, já estará tudo pronto**.

### 2. Caso seu site canônico seja AMP

Nesse caso, suas páginas canônicas *são* páginas AMP: você cria o site inteiro com AMP e simplesmente o usa como uma biblioteca. Curiosidade: este mesmo site que você está lendo foi criado assim. **Neste cenário, a maioria dos links nas suas páginas AMP direcionará a outras páginas AMP.**

Agora você pode implantar o PWA em um caminho separado, como `your-domain.com/pwa`, e usar o service worker já em funcionamento para **interceptar o navegador quando alguém clicar em um link na página AMP**:

[sourcecode:javascript]
self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
      event.respondWith(fetch('/pwa'));

      // Immediately start downloading the actual resource.
      fetch(event.request.url);
    }

});
[/sourcecode]

O interessante dessa técnica é o uso do aprimoramento progressivo para trocar de AMP para PWA. No entanto, isto também significa que os navegadores que ainda não são compatíveis com os service workers navegarão pelas páginas AMP sem nunca acessar o PWA.

O AMP resolve isto com um recurso chamado [reescrita do URL do shell](../../../documentation/components/reference/amp-install-serviceworker.md#shell-url-rewrite). Com a adição de um padrão de URL substituto na tag [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md), você pode instruir o AMP a reescrever todos os links correspondentes em uma determinada página para que eles levem a outro URL de shell legado caso a compatibilidade com o service worker não seja detectada:

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay"
      data-no-service-worker-fallback-url-match=".*"
      data-no-service-worker-fallback-shell-url="https://www.your-domain.com/pwa">
</amp-install-serviceworker>
[/sourcecode]

Com esses atributos, todos os cliques subsequentes em uma AMP direcionarão para o PWA, independentemente de qualquer service worker.

Leia mais: Se você já chegou até aqui, que tal reutilizar as páginas AMP existentes para criar seu PWA? [Saiba como fazer isso](amp-in-pwa.md).
