---
'$title': Transforme seu site AMP em um PWA
$order: 10
description: Ao armazenar recursos em cache no navegador, um PWA é capaz de fornecer dados, ativos e páginas offline ao usuário para mantê-lo envolvido e informado.
tutorial: 'true'
formats:
  - websites
author: crystalonscript
---

Os Progressive Web Apps (Aplicativos Web Progressivos) aproveitam o poder dos [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) para permitir que o site mantenha funcionalidades offline abrangentes e garanta experiências de usuário consistentes em ambientes com qualidade de rede diversa. Ao armazenar recursos em cache no navegador, um PWA é capaz de fornecer dados, ativos e páginas offline ao usuário para mantê-lo sempre envolvido e informado.

Este tutorial irá ensiná-lo a transformar um site AMP em um PWA instalável com funcionalidades offline, adicionando um Manifesto Web e um Service Worker implementado pelo AMP Service Worker.

# Baixe e execute o código iniciante

Baixe o [código iniciante aqui](/static/files/tutorials/amptopwa.zip).

Use um servidor web local para visualizar o site.

[tip type="default"] **TIP –** For a quick web server, run `python -m SimpleHTTPServer`. [/tip]

Você deve conseguir visualizar a página inicial do Lyrical Lyghtning, o festival Mobile Music Magic. Há um link na página inicial para visualizar a programação e em que palco as bandas estão.

{{ image('/static/img/docs/tutorials/tut-lyricallyghtning.png', 594, 558, alt='Image of PWA' ) }}

Os usuários do nosso site podem ter uma conectividade de rede irregular no evento, quando provavelmente irão desejar ver a programação. Isto faz desse site um ótimo candidato para transformar num PWA que poderia ser instalado na tela inicial de nosso usuário, fornecendo todas as funcionalidades críticas, mesmo quando offline.

# Crie um Manifesto de Web App

O [manifesto da web app](https://developers.google.com/web/fundamentals/web-app-manifest/) é um arquivo JSON comum que informa ao navegador sobre seu aplicativo web e como ele deve se comportar quando 'instalado' no dispositivo móvel ou desktop do usuário. Um manifesto é exigido por diversos navegadores para que mostrem a [opção Adicionar a Tela Principal](https://developers.google.com/web/fundamentals/app-install-banners/).

Adicione um arquivo chamado `manifest.json` ao seu repositório com o seguinte código:

[sourcecode:JSON]
{
"short_name": "LyLy",
"name": "Lyrical Lyghtning",
"icons": [
{
"src": "./images/amplogo192.png",
"type": "image/png",
"sizes": "192x192"
},
{
"src": "./images/amplogo512.png",
"type": "image/png",
"sizes": "512x512"
}
],
"start_url": "/index.html",
"background_color": "#222325",
"display": "standalone",
"scope": "/",
"theme_color": "#222325"
}
[/sourcecode]

# Adicione o AMP Service Worker

Um service worker é um script que seu navegador executa em segundo plano, separado de uma página da web, que estende os recursos do navegador ao armazenar solicitações em cache para melhorar o desempenho e fornecer funcionalidades offline. Construir um service worker do zero é possível, mas trabalhoso. Bibliotecas como o Workbox ajudam, mas o AMP vai além ao oferecer o [AMP Service Worker](https://github.com/ampproject/amp-sw), no qual o AMP automatiza diversas etapas diretamente, inclusive o armazenamento em cache de scripts AMP, ativos e documentos, bem como a implementação de práticas recomendadas, tais como [carregamento prévio de navegação](https://developers.google.com/web/updates/2017/02/navigation-preload).

O AMP Service Worker automaticamente [armazena em cache scripts AMP](https://github.com/ampproject/amp-sw/tree/master/src/modules/amp-caching) e [documentos](https://github.com/ampproject/amp-sw/tree/master/src/modules/document-caching) à medida em que o usuário os solicita, após a instalação. Começaremos adicionando o AMP Service Worker básico.

## Crie o arquivo do service worker

Crie um arquivo chamado `sw.js` e acrescente o código a seguir:

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init();
[/sourcecode]

Esses duas linhas de código importam o AMP Service Worker no seu Service Worker e o inicializa.

## Instale automaticamente seu service worker nas suas páginas AMP

Sites AMP usam o componente [`<amp-install-serviceworker>`](../../../documentation/components/reference/amp-install-serviceworker.md) para instalar o service worker em segundo plano, no navegador, enquanto o usuário aproveita seu conteúdo.

Coloque a tag de script necessária no cabeçalho do `index.html` e o elemento `<amp-install-serviceworker>` dentro de `<body>`:

[sourcecode:html]
…

<script async custom-element="amp-install-serviceworker" src="https://ampjs.org/v0/amp-install-serviceworker-0.1.js"></script>

…
...
<amp-install-serviceworker src="/sw.js"
           data-iframe-src="install-sw.html"
           layout="nodisplay">
</amp-install-serviceworker>

</body>
[/sourcecode]

[tip type="important"] **Importante –** O service worker deve ser servido a partir do diretório raiz (`/sw.js`) para ser capaz de armazenar em cache todo o conteúdo do seu site. [/tip]

O `<amp-install-serviceworker>` instala o service worker criando um iframe e executando o arquivo `data-iframe-src`. Crie o arquivo `install-sw.html` e adicione o código a seguir:

[sourcecode:html]

<!doctype html>
<title>installing service worker</title>
<script type='text/javascript'>
 if('serviceWorker' in navigator) {
   navigator.serviceWorker.register('./sw.js');
 };
</script>
[/sourcecode]

O iframe registra o arquivo do AMP Service Worker no navegador.

# Personalize o que está em cache

O AMP Service Worker vem com benefícios integrados, enquanto permite campos opcionais que você pode configurar para otimizar de acordo com as necessidades do seu aplicativo.

Nosso aplicativo de festival de música armazenará em cache nossos ativos de imagem, e fará carregamento prévio do link para a programação, especificando uma página offline.

## Armazene ativos em cache

Você pode configurar o AMP Service Worker para [ativos de cache](https://github.com/ampproject/amp-sw/tree/master/src/modules/asset-caching), tais como imagens, vídeos e fontes. Ele será usado para armazenar em cache nossa imagem de fundo e o logotipo AMP. Abra o arquivo `sw.js` atualize-o para incluir o código abaixo:

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}]
});
[/sourcecode]

Especificamos a estratégia de cache para ser [cache first](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network). Isto significa que o aplicativo tentará servir imagens do cache primeiro, antes de solicitar qualquer coisa da rede. Isto é particularmente útil neste aplicativo já que não iremos atualizar nossa imagem de fundo ou o logotipo AMP.

## Realize carregamento prévio de links (prefetching)

O AMP Service Worker realiza carregamento prévio de links que têm o atributo `data-rel=prefetch`. Isso permite que os usuários visualizem as páginas offline, mesmo que elas ainda não tenham sido visitadas. Adicionaremos o atributo à nossa tag com o link para `lineup.html`.

[sourcecode:html]
...
<a href="/lineup.html" data-rel="prefetch">See Full Lineup</a>
...
[/sourcecode]

# Mostre uma página offline

Para lidar com casos inesperados ou cliques em links para páginas que não carregamos previamente, adicionaremos uma página offline para oferecer uma experiência de usuário consistente que esteja "dentro da marca", em vez de mostrar a página offline do navegador genérico. Baixe [`offline.html` aqui](/static/files/tutorials/offline.zip) e atualize`sw.js` para o código a seguir:

[sourcecode:js]
importScripts('https://ampjs.org/sw/amp-sw.js');
AMP_SW.init({
assetCachingOptions: [{
regexp: /\.(png|jpg)/,
cachingStrategy: 'CACHE_FIRST'
}],
offlinePageOptions: {
url: '/offline.html',
assets: []
}
});
[/sourcecode]

# Teste seu PWA

Você pode testar se seu AMP Service Worker está armazenando em cache os ativos necessários e fornecendo uma solução offline ideal usando o [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/progressive-web-apps).

Vamos testar o Lyrical Lyghtning abrindo o painel DevTools usando `Ctrl + Shift + I` no Windows ou `Cmd + Opt + I` no Mac. Você também pode clicar com o botão direito na página e selecionar `inspect` do menu. Depois selecione `Application` para visualizar seu registro de service worker.

{{ image('/static/img/docs/tutorials/amp-sw-test.png', 1349, 954, alt='DevTools panel open on lyrical lyghtning PWA' ) }}

Clique na caixa `offline` para mudar para o modo offline. Clique no link `see full lineup` e navegue para `offline.html` para verificar se tudo foi corretamente armazenado em cache e carregado previamente.

[tip type="default"] **Dica –** Para uma análise completa dos recursos de um Progressive Web App, rode a [ferramenta Google's Lighthouse](https://developers.google.com/web/ilt/pwa/lighthouse-pwa-analysis-tool) para gerar um relatório. [/tip]

# Parabéns!

Você conseguiu criar um PWA com AMP! Neste tutorial, você aprendeu a:

- Criar um [Manifesto de Web App](https://developers.google.com/web/fundamentals/web-app-manifest/)
- Instalar um Service Worker no AMP usando [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md)
- Personalizar o [AMP Service Worker ](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html)
- [Realize carregamento prévio de links (prefetching)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)
- Criar uma página offline

Saiba mais sobre [Service Worker](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-as-pwa.html)s e [considerações de experiência do usuário offline](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux). Saiba como [acompanhar o envolvimento com analytics](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/index.html) e acompanhe o tutorial sobre [como configurar análises básicas para suas páginas AMP](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/tracking-engagement.html).
