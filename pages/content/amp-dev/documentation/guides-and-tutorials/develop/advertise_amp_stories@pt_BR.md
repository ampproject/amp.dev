---
"$title": Advertise in Web Stories
"$order": '3'
description: Web Stories are a full-screen tappable experience that immerses readers in the content. Advertising with AMP Story ads allows for seamless and disruption-free ...
formats:
- stories
author: CrystalOnScript
---

As histórias Web são uma experiência orientada a toque em tela cheia que mergulha os leitores no seu conteúdo. A publicidade com anúncios de histórias Web permite uma integração sem descontinuidades nem interrupções na jornada do usuário, mantendo-o totalmente envolvido e encantado pela plataforma.

## Colocação de anúncios

As Histórias Web usam um único componente [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) para ditar a quantidade e o posicionamento do anúncio.

O [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) é um wrapper em volta do componente [`amp-ad`](../../../documentation/components/reference/amp-ad.md). Ele insere dinamicamente um ou vários anúncios enquanto o usuário consome o conteúdo da história. Para garantir a melhor experiência do usuário:

1. Ads are pre-rendered by the Web Stories runtime, then inserted. This guarantees that the users will never be shown a blank or unloaded ad.

2. A densidade do anúncio é otimizada de forma proporcional ao conteúdo para evitar o excesso de saturação. O componente [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) decide quando e onde inserir anúncios à medida que o usuário avança.

Uma História Web coloca o primeiro anúncio algum tempo depois das duas primeiras páginas com o objetivo de otimizar a receita de monetização e a experiência do usuário.

<amp-anim width="360" height="640" src="/static/img/docs/stampads/stamp_gif_ad.gif">
  <amp-img placeholder width="360" height="640" src="/static/img/docs/stampads/stamp_gif_still.png">
  </amp-img></amp-anim>

[tip type="note"] **OBSERVAÇÃO** – Uma História Web mais longa oferece mais oportunidades para colocação de anúncios. A colocação exata do algoritmo do anúncio continuará a ser otimizada ao longo do tempo. [/tip]

## Interação do usuário

Os usuários podem pular um anúncio da mesma maneira como passa as páginas normais da história: tocando nos dois terços da tela à direita.

{{ image('/static/img/docs/stampads/story_ad_ui.png', 304, 512, layout='intrinsic', alt= 'Imagem mostrando a área que os usuários podem tocar para pular um anúncio', caption='Usuários podem pular anúncios tocando nos dois terços da tela à direita.', align='' ) }}

Usuários podem interagir diretamente com o anúncio ao tocar no botão [call-to-action](story_ads_best_practices.md#call-to-action-button-text-enum) gerado pelo sistema que aparece no terço inferior de todos os anúncios de Histórias Web. O botão pode ser configurado para enviar o usuário a uma URL arbitrária (ou à loja de aplicativos relevante).

{{ image('/static/img/docs/stampads/sponsored_story.png', 1600, 597, layout='intrinsic', alt='Imagem mostrando que os usuários são redirecionados para um destino de de anúncio, mas podem retornar à história.', caption='Usuários são redirecionados para um destino de anúncio, mas podem retornar à história.', align='' ) }}

## Configure uma História Web para anúncios

As histórias Web não suportam um [`amp-ad`](../../../documentation/components/reference/amp-ad.md) diretamente na página. Em vez disso, todos os anúncios são buscados e exibidos pelo componente [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md). O componente [`amp-story-auto-ads`](../../../documentation/components/reference/amp-story-auto-ads.md) amp-story-auto-ads deve ser declarado como um elemento-filho direto de [`amp-story`](../../../documentation/components/reference/amp-story.md).

[sourcecode:html]
<amp-story>
  <amp-story-auto-ads>
    <script type="application/json">
      {
        "ad-attributes": {
          // ad server configuration
        }
      }
    </script>
  </amp-story-auto-ads>
  <amp-story-page>
  ...
</amp-story>
[/sourcecode]

Ao contrário de um [`amp-ad`](../../../documentation/components/reference/amp-ad.md) comum, não é necessário nenhum `<fallback>` ou `<placeholder>`, já que os anúncios de Histórias Web só são exibidos quando estão totalmente renderizados.

## Como usar anúncios de histórias

A maneira mais fácil de incluir anúncios na sua História Web é servindo anúncios a partir de um servidor de anúncios suportado.

Servidores de anúncios que atualmente suportam anúncios de Histórias Web:

- Google Ad Manager <a name="google-ad-manager"></a>
    - [Anúncios de venda direta](https://support.google.com/admanager/answer/9038178)
    - [Anúncios programados](https://support.google.com/admanager/answer/9416436)
- Google AdSense em breve
- Outras plataformas de anúncios podem integrar (entre em contato para mais [detalhes via Github](https://github.com/ampproject/amphtml/issues/30769))

Se você for um anunciante interessado em veicular seus anúncios em Histórias Web, [entre em contato](mailto:story-ads-wg@google.com) para mais informações.

Editores também podem colocar anúncios personalizados se eles configurarem seus próprios servidores de anúncios. [O processo é detalhado aqui](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/amp-story-ads.md#publisher-placed-ads).

[tip type="note"] Read [Traffic custom creatives in Web Stories](https://support.google.com/admanager/answer/9038178) for information about uploading ads to Google Ad Manager and checkout our guide on [Best practices for creating an AMP Story ad](story_ads_best_practices.md). [/tip]
