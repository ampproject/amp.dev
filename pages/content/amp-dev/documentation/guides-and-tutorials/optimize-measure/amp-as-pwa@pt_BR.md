---
$title: Ativar os recursos de Progressive Web App nas suas páginas AMP
---

{{ image('/static/img/docs/pwamp_add_to_homescreen.png', 848, 1500, align='right third', caption='AMPbyExample acionando a solicitação "Adicione à tela inicial".') }}

Muitos sites não precisam de recursos além dos oferecidos pelas AMP. [Examples](../../../documentation/examples/index.html), por exemplo, é uma página AMP e um Progressive Web App:

1. Ela tem um [manifesto de app da Web](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/) e solicita o banner "Adicione à tela inicial".
2. Ela tem um [service worker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) que possibilita acesso off-line, entre outras coisas.

Quando o usuário visita [Examples](../../../documentation/examples/index.html) de uma plataforma compatível com AMP e clica para navegar no site, ele sai do cache de AMP e acessa a origem. O site ainda usa a biblioteca AMP, mas, como ele fica na origem, é possível usar um service worker, solicitar instalações e assim por diante.

Lembre-se: O service worker não poderá interagir com a versão AMP em cache da sua página. Use o recurso para caminhos direcionados à sua origem.

## Adicionar um manifesto de app da Web

Adicionar um [manifesto de app da Web](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/) às suas páginas AMP permitirá que os usuários instalem seu site na tela inicial de dispositivos. Os manifestos de app da Web nas AMP são muito simples.

Primeiro, crie o manifesto:

[sourcecode:json]
{
  "short_name": "ABE",
  "name": "AMPByExample",
  "icons": [
    {
      "src": "launcher-icon-1x.png",
      "type": "image/png",
      "sizes": "48x48"
    },
    {
      "src": "launcher-icon-2x.png",
      "type": "image/png",
      "sizes": "96x96"
    },
    {
      "src": "launcher-icon-4x.png",
      "type": "image/png",
      "sizes": "192x192"
    }
  ],
  "start_url": "index.html?launcher=true"
}
[/sourcecode]

Em seguida, vincule-o à seção `<head>` da página AMP:

[sourcecode:html]
<link rel="manifest" href="/manifest.json">
[/sourcecode]

Dica: Saiba mais sobre o [Manifesto de app da Web no WebFundamentals](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/).

## Instalar um service worker para permitir o acesso off-line

O service worker é um proxy do lado do cliente que fica entre a página e o servidor. Ele pode ser usado para criar experiências off-line incríveis, cenários de shell do app com carregamento rápido e enviar notificações push.

Observação: Se o conceito de service workers for novidade para você, leia [esta introdução no WebFundamentals](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers).

O service worker precisa ser registrado em uma página determinada, caso contrário, o navegador não será capaz de encontrá-lo ou executá-lo. Por padrão, isso é feito com [uma pequena ajuda do JavaScript](https://developers.google.com/web/fundamentals/instant-and-offline/service-worker/registration). Em páginas AMP, use o componente [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) para alcançar o mesmo resultado.

Para isso, primeiro inclua o componente [`amp-install-serviceworker`](../../../documentation/components/reference/amp-install-serviceworker.md) por meio do script correspondente na seção `<head>` da sua página:

[sourcecode:html]
<script async custom-element="amp-install-serviceworker"
  src="https://ampjs.org/v0/amp-install-serviceworker-0.1.js"></script>
[/sourcecode]

Em seguida, adicione o código a seguir dentro da seção `<body>` (modifique-o para apontar para seu service worker):

[sourcecode:html]
<amp-install-serviceworker
      src="https://www.your-domain.com/serviceworker.js"
      layout="nodisplay">
</amp-install-serviceworker>
[/sourcecode]

Se o usuário acessar as páginas AMP na origem (e não pelo primeiro clique, que normalmente é veiculado a partir de um cache de AMP), o service worker assumirá o controle e poderá fazer [várias coisas interessantes](https://developers.google.com/web/fundamentals/instant-and-offline/offline-ux).

## Estender páginas AMP por meio do service worker

Você pode usar a técnica acima para permitir acesso off-line ao site AMP e estender suas páginas **assim que elas forem exibidas a partir da origem**. Isso é possível porque você pode modificar a resposta usando o evento `fetch` do service worker e retornar qualquer resposta que você queira:

[sourcecode:js]
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('mysite').then(function(cache) {
      return cache.match(event.request).then(function(response) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })

        // Modify the response here before it goes out..
        …

        return response || fetchPromise;
      })
    })
  );
});
[/sourcecode]

Com essa técnica, você poderá alterar sua página AMP com várias
funcionalidades adicionais que não passariam na [validação de AMP](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) se fossem usadas de outra forma. Por exemplo:

* recursos dinâmicos que exigem JS personalizado
* componentes personalizados/relevantes apenas para seu site
