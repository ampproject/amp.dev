---
$title: Integração com AMP para veicular anúncios de display
---

[TOC]

Este guia é voltado a redes de publicidade que pretendem fazer a integração com AMP para veicular anúncios de display em páginas AMP.

## Visão geral

É possível integrar um servidor de anúncios às AMP para veicular anúncios HTML tradicionais em páginas AMP, além dos anúncios [HTML para AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/amphtml_ads/index.md', locale=doc.locale).url.path}}).

##### Quer veicular anúncios HTML tradicionais?

1.  [Crie uma implementação amp-ad](#creating-an-amp-ad-implementation).

##### Quer veicular anúncios HTML para AMP?

1. [Crie uma implementação amp-ad](#creating-an-amp-ad-implementation) se você ainda não tiver feito isso para veicular anúncios HTML tradicionais.
2. [Crie uma integração com o Fast Fetch para veicular anúncios HTML para AMP](#creating-a-fast-fetch-integration).


## Criar uma implementação amp-ad

Assim como um servidor de anúncios, os editores compatíveis incluem uma biblioteca JavaScript fornecida por você e adicionam vários "snippets de anúncios". Esses snippets usam a biblioteca para buscar anúncios e renderizá-los no site do editor. Como a AMP não permite que os editores executem JavaScript arbitrário, será preciso contribuir para o código aberto da AMP se você quiser que a tag [`amp-ad`](/pt_br/docs/reference/components/amp-ad.html) solicite anúncios do seu servidor de anúncios.

[tip type="note"]

Use essa implementação amp-ad para exibir anúncios HTML tradicionais **e** HTML para AMP.

[/tip]


Por exemplo, é possível chamar o servidor Amazon A9 usando esta sintaxe:

```html
<amp-ad width="300" height="250"
    type="a9"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
```

No código acima, o atributo `type` especifica a rede de publicidade, que neste caso é a A9. Os atributos `data-*` dependem dos parâmetros que o servidor A9 da Amazon espera ao exibir um anúncio. O arquivo [`a9.js`](https://github.com/ampproject/amphtml/blob/master/ads/a9.js) mostra como os parâmetros são mapeados para fazer uma chamada JavaScript ao URL do servidor A9. Os parâmetros correspondentes transmitidos pela tag amp-ad são anexados ao URL para retornar um anúncio.

Se quiser instruções para criar uma integração `amp-ad`, confira como [integrar redes de publicidade à AMP](https://github.com/ampproject/amphtml/blob/master/ads/README.md).

## Criar uma integração com o Fast Fetch

O [Fast Fetch](/latest/blog/even-faster-loading-ads-in-amp/) é um mecanismo AMP que separa a solicitação da resposta de anúncio. Assim, as solicitações de anúncio podem ocorrer em etapas anteriores do ciclo de vida da página, e os anúncios só serão renderizados quando for provável que eles sejam vistos pelos usuários. O Fast Fetch dá tratamento preferencial a anúncios HTML para AMP verificados em relação aos anúncios HTML tradicionais. No Fast Fetch, quando um anúncio não é aprovado na validação, ele é inserido em um iframe de vários domínios para colocá-lo no sandbox e separá-lo do restante do documento AMP. Por outro lado, um anúncio HTML para AMP validado é inserido diretamente na página. O Fast Fetch lida com anúncios AMP e não AMP. Não é preciso gerar solicitações adicionais para anúncios reprovados na validação. 

{{ image('/static/img/docs/ads/amphtml-ad-flow.svg', 843, 699, alt='Fluxo de integração do Fast Fetch', caption='Fluxo de integração do Fast Fetch' ) }}

Para veicular anúncios HTML para AMP no servidor de anúncios, é necessário fornecer uma integração Fast Fetch que inclua:

1.  compatibilidade com comunicação de rede SSL
1.  JavaScript para criar a solicitação de anúncio (exemplos de implementação: [AdSense](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-adsense-impl) e [DoubleClick](https://github.com/ampproject/amphtml/tree/master/extensions/amp-ad-network-doubleclick-impl)).
1.  validação e assinatura do criativo por meio de um serviço de validação (O [Cloudflare](https://blog.cloudflare.com/firebolt/) oferece um serviço de verificação de anúncios AMP. Com ele, qualquer provedor de anúncios independente pode exibir anúncios mais rápidos, leves e interessantes.)

Para ver instruções sobre como criar uma integração com o Fast Fetch, confira o [guia de implementação de rede do Fast Fetch](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md) (em inglês). 


## Recursos relacionados

*   [diretório do GitHub para todas as extensões amp-ad](https://github.com/ampproject/amphtml/tree/master/ads)
*   [lista de fornecedores de anúncios compatíveis]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/monetization/ads_vendors.md', locale=doc.locale).url.path}})
*   [postagem de blog sobre o lançamento do Fast Fetch](/latest/blog/even-faster-loading-ads-in-amp/)
 
