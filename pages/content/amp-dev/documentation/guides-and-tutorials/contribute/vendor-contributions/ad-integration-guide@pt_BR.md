---
'$title': Integre suas tecnologias de anúncios no AMP
$order: 3
formats:
  - ads
teaser:
  text: Se você for um provedor de tecnologia de anúncios que pretende integrar com o AMP HTML, por favor confira as orientações abaixo.
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/ads/_integration-guide.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

Se você for um provedor de tecnologia de anúncios que pretende integrar com o AMP HTML, por favor confira as orientações abaixo. Para garantir o mínimo de latência e qualidade, por favor, siga as instruções listadas [aqui](https://github.com/ampproject/amphtml/blob/main/ads/../3p/README.md#ads) antes de enviar uma solicitação de pull para o projeto AMP open-source. Para uma orientação geral sobre como começar a contribuir com o AMP, por favor veja [CONTRIBUTING.md](https://github.com/ampproject/amphtml/blob/main/ads/../CONTRIBUTING.md).

## Servidor de anúncios <a name="ad-server"></a>

_Exemplos: DFP, A9_

Como um servidor de anúncios, os editores para os quais você oferece suporte incluem uma biblioteca JavaScript fornecida por você e publicam vários "fragmentos de anúncios" que dependem dessa biblioteca JavaScript para buscar os anúncios e renderizá-los no site do editor.

Como o AMP não permite que os editores executem scripts arbitrários em JavaScript, você precisará contribuir para o código open-source do AMP para permitir que a tag `amp-ad` faça solicitações de anúncios de seu servidor de anúncios.

Por exemplo: o servidor Amazon A9 pode ser chamado usando a seguinte sintaxe:

[sourcecode:html]
<amp-ad
width="300"
height="250"
type="a9"
data-aax_size="300x250"
data-aax_pubname="test123"
data-aax_src="302"

> </amp-ad>
> [/sourcecode]

Observe que cada um dos atributos que seguem `type` são dependentes dos parâmetros que o servidor A9 da Amazon espera para entregar um anúncio. O arquivo [a9.js](https://github.com/ampproject/amphtml/blob/main/ads/./a9.js) mostra como os parâmetros são mapeados para realizar uma chamada JavaScript que chama o servidor A9 através da URL `https://c.amazon-adsystem.com/aax2/assoc.js`. Os parâmetros correspondentes passados pela tag amp-ad são anexados à URL para retornar um anúncio.

Para mais detalhes sobre como integrar sua rede de anúncios com o AMP, veja [integração de redes de anúncios no AMP](https://github.com/ampproject/amphtml/blob/main/ads/README.md)..

## Supply Side Platform (SSP) ou Ad Exchange <a name="supply-side-platform-ssp-or-an-ad-exchange"></a>

_Exemplos: Rubicon, Criteo ou Appnexus, Ad-Exchange_

Se você é uma plataforma sell-side que espera receber chamadas diretamente a partir da página web de um editor, você precisa seguir as mesmas instruções listadas acima para integrar com um servidor de anúncios. Adicionar o seu próprio valor de `type` para a tag amp-ad permite que você distribua a sua tag diretamente ao editor, para que ele possa inserir suas tags diretamente nas páginas AMP dele.

É mais comum que as SSPs trabalhem com o editor para usar as tags de anúncios da SSP no seu servidor de anúncios. Neste caso, certifique-se de que todos os ativos que estão sendo carregados pelo seu script no criativo do servidor de anúncios estejam sendo carregados via HTTPS. Há algumas restrições em relação a alguns formatos de anúncios, como anúncios expansíveis, portanto recomendamos que você teste, com seus editores, os formatos criativos entregues com mais frequência.

## Agência de publicidade <a name="ad-agency"></a>

_Exemplos: Essence, Omnicom_

Trabalhe com seu editor para garantir que os criativos que você desenvolve sejam compatíveis com o AMP. Como todos os criativos são servidos para iframes cujo tamanho é determinado quando o anúncio é chamado, certifique-se de que o seu criativo não tenta modificar o tamanho do iframe.

Garanta que todos os ativos que fazem parte do criativo sejam solicitados via HTTPS. Alguns formatos de anúncios não são totalmente suportados no momento e recomendamos testar os criativos em um ambiente AMP. Alguns exemplos são: Rich Media Expandables, Interstitials, Page Level Ads.

## Reprodutor de vídeo <a name="video-player"></a>

_Exemplos: Brightcove, Ooyala_

Um reprodutor de vídeo que trabalha em páginas HTML comuns não funciona no AMP e, portanto, uma tag específica precisa ser criada que permita que o runtime AMP carregue seu video player. A Brightcove criou uma tag personalizada [amp-brightcove](https://github.com/ampproject/amphtml/blob/main/extensions/amp-brightcove/amp-brightcove.md) que permite que mídia e anúncios sejam reproduzidos em páginas AMP.

Um reprodutor de vídeo Brightcove pode ser chamado pelo código seguinte:

[sourcecode:html]
<amp-brightcove
data-account="1290862519001"
data-video-id="ref:amp-docs-sample"
data-player="S1Tt8cgaM"
layout="responsive"
width="480"
height="270"

> </amp-brightcove>
> [/sourcecode]

Para instruções sobre como desenvolver uma tag amp como Brightcove, veja [esta solicitação de pull](https://github.com/ampproject/amphtml/pull/1052).

## Rede de anúncios de vídeo <a name="video-ad-network"></a>

_Exemplos: Tremor, Brightroll_

Se você for uma rede de anúncios de vídeo, por favor, trabalhe com o seu editor para garantir que:

- Todos os ativos de vídeo sejam servidos via HTTPS
- O reprodutor de vídeo do editor tenha suporte AMP

## Plataforma de gestão de dados (DMP) <a name="data-management-platform-dmp"></a>

_Examples: KRUX, Bluekai_

Veja [como melhorar a configuração de anúncios personalizados](https://amp.dev/documentation/components/amp-ad#enhance-incoming-ad-configuration).

Você pode utilizar uma abordagem similar para enriquecer a chamada do anúncio, inserindo segmentos de audiência que você recebe do cookie do usuário para a chamada do anúncio.

## Provedor de visibilidade <a name="viewability-provider"></a>

_Exemplos: MOAT, Integral Ad Science_

Provedores de visibilidade tipicamente integram com editores através dos wrappers criativos do servidor de anúncios. Se este for o caso, garanta que o wrapper criativo carregue todos os ativos via HTTPS.

Por exemplo, para o MOAT, garanta que `http://js.moatads.com` seja alterado para`https://z.moatads.com`

Veja também a abordagem para usar o [intersection observer pattern](https://github.com/ampproject/amphtml/blob/main/ads/README.md#ad-viewability).

## Plataforma de recomendação de conteúdo <a name="content-recommendation-platform"></a>

_Exemplos: Taboola, Outbrain_

Útil se você já possui algum fragmento de JavaScript embutido no site do editor, mas essa abordagem não funcionará em páginas AMP. Se você gostaria de recomendar conteúdo em uma página AMP, sugerimos que você utilize a [extensão `amp-embed`](https://amp.dev/documentation/components/amp-ad) para solicitar os detalhes do conteúdo. Por favor veja o exemplo com [Taboola](https://github.com/ampproject/amphtml/blob/main/ads/taboola.md).
