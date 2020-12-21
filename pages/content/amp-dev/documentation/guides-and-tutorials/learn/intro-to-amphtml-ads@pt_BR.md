---
"$title": Intro to AMPHTML ads
"$order": '1'
description: Os anúncios HTML para AMP são uma forma mais rápida, leve e segura de anunciar na web. Embora as páginas AMP sejam compatíveis com anúncios HTML tradicionais,these ads can be slow to load.
formats:
- ads
---

## O que é um anúncio HTML para AMP?

Os anúncios HTML para AMP são uma maneira mais rápida, leve e segura de anunciar na Web. Embora as páginas AMP sejam compatíveis com anúncios HTML tradicionais, o carregamento deles pode demorar. Para exibir anúncios tão rápidos quanto a página AMP, você pode criá-los no formato HTML para AMP. Esse tipo de anúncio só será exibido após ser validado, o que garante que os anúncios sejam seguros e eficientes. Além do mais, eles podem ser exibidos em qualquer lugar na Web, *não somente nas páginas AMP*.

Os anúncios HTML para AMP são escritos em HTML para AMP, de acordo com as [Especificações de anúncio HTML para AMP](a4a_spec.md) (uma variante de HTML para AMP + CSS). Isso significa que os anúncios não são mais usados para executar JavaScript arbitrário, que é geralmente a principal causa do baixo desempenho de um anúncio. Portanto, assim como no AMP principal, os casos de uso de JavaScript em anúncios principais são integrados diretamente no projeto de código aberto da AMP, o que garante o bom comportamento dos anúncios.

### Vantagens

Por que os anúncios HTML para AMP são melhores que os anúncios tradicionais?

1. **Mais rápidos**: os anúncios HTML para AMP são mais rápidos porque são solicitados antecipadamente no processo de renderização da página e são exibidos imediatamente, pouco antes de o usuário visualizar o anúncio. O tamanho reduzido dos anúncios HTML para AMP também melhora a velocidade.
2. **Mais leves**: os anúncios HTML para AMP agregam recursos de uso comum, o que reduz o tamanho dos arquivos. Depois que estão na página, os anúncios HTML para AMP também consomem menos recursos. Por exemplo, em vez de 10 rastreadores solicitando informações de anúncios convencionais, os anúncios HTML para AMP coletam todos os dados de uma vez e os distribuem a todos os rastreadores interessados.
3. **Coordenados**: nas páginas AMP, o [ambiente de tempo de execução de AMP](spec/amphtml.md#amp-runtime) pode coordenar os recursos limitados de um celular no componente certo no momento certo para oferecer a melhor experiência do usuário. Por exemplo, os anúncios HTML para AMP com animações são pausados quando não estão na janela de visualização atual.
4. **Mais interessantes**: os usuários não interagem com anúncios que não conseguem ver. Anúncios mais rápidos levam a maior visibilidade e, consequentemente, a taxas de cliques mais elevadas, o que, por sua vez, leva a um melhor desempenho do anúncio.
5. **Protegidos contra malware**: com anúncios HTML para AMP, é impossível propagar malware, porque eles são verificados antes da veiculação. Devido a isso, os anunciantes podem garantir uma experiência do usuário segura e uma percepção positiva da marca.
6. **Mais flexíveis**: os anúncios HTML para AMP foram concebidos para funcionar em páginas da Web AMP e não AMP, bem como em qualquer dispositivo.

### Formatos

Os anúncios HTML para AMP são flexíveis e dinâmicos, permitindo muitos formatos de criativos, como carrossel, paralaxe e lightbox, entre outros. Para começar, aproveite os modelos de anúncio HTML para AMP de código aberto no site [Examples](../../../documentation/examples/index.html).

<table class="nocolor">
  <tr>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-01-carousel.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-02-video-parallax.gif">
    </amp-anim></td>
    <td class="col-thirty"><amp-anim width="410" height="731" layout="responsive" src="/static/img/docs/ads/amp-ad-03-lightbox.gif">
    </amp-anim></td>
  </tr>
  <tr>
    <td>Carrossel</td>
    <td>Paralaxe de vídeo</td>
    <td>Lightbox</td>
  </tr>
</table>

## Como funcionam os anúncios HTML para AMP

{{ image('/static/img/docs/ads/amphtml-ads-how.svg', 1019, 434, alt='Veiculação de anúncios HTML para AMP em páginas AMP', caption='Veiculação de anúncios HTML para AMP em páginas AMP', align='' ) }}

1. Os editores inserem um espaço de anúncio na página AMP por meio da tag [`amp-ad`](../../../documentation/components/reference/amp-ad.md), especificando a rede de publicidade que querem usar.
2. O ambiente de tempo de execução de AMP envia uma solicitação de anúncio à rede de publicidade especificada para recuperar o anúncio. As redes de publicidade que veiculam anúncios HTML para AMP oferecem uma [implementação do Fast Fetch](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md) (em inglês) que valida e assina o criativo.
3. A rede de publicidade responde com o anúncio HTML para AMP e o ambiente de tempo de execução de AMP renderiza o anúncio na página AMP.

[tip type="note"] Nenhuma integração especial é necessária para veicular anúncios HTML para AMP em páginas não AMP. Verifique com sua rede de anúncios se eles oferecem suporte a anúncios HTML para AMP. [/tip]

## Veicular anúncios HTML para AMP

### Editores

Para veicular seus formatos de anúncio de venda direta em HTML para AMP, é preciso criar os anúncios de acordo com as [Especificações de anúncio HTML para AMP](a4a_spec.md) e exibi-los usando um servidor de anúncios que seja compatível com veiculação de anúncios HTML para AMP.  Atualmente, os servidores de anúncio compatíveis com anúncios HTML para AMP são os seguintes:

- DoubleClick for Publishers
- TripleLift
- Dianomi
- Adzerk
- Google AdSense

Para exibir anúncios HTML para AMP usando seus canais indiretos (por exemplo, exchange, SSP etc.), escolha uma rede de publicidade ou um servidor de anúncios compatível na [lista a seguir](../../../documentation/guides-and-tutorials/develop/monetization/ads_vendors.md).

### Agências de criação

As agências de criação precisam criar os anúncios de acordo com as [Especificações de anúncio HTML para AMP](a4a_spec.md). Para ver exemplos e se inspirar, confira os modelos de anúncios HTML para AMP de código aberto no site [Examples](../../../documentation/examples/index.html). Como alternativa, use uma das seguintes ferramentas para criar os anúncios HTML para AMP:

- [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (*em breve*)

### Redes e servidores de anúncios

Para exibir anúncios HTML para AMP em páginas AMP, será preciso criar uma extensão [`amp-ad`](../../../documentation/components/reference/amp-ad.md) para sua rede que use a [implementação de solicitação de anúncio Fast Fetch](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/Network-Impl-Guide.md) (em inglês) se você ainda não tiver uma.  Consulte o artigo sobre [integração com AMP para veicular anúncios gráficos](../../../documentation/guides-and-tutorials/contribute/adnetwork_integration.md) para ver mais detalhes.  Tenha em mente que não é necessário fazer uma integração especial para veicular HTML para AMP em páginas não AMP.

## Criar anúncios HTML para AMP

**Do zero**: os anúncios HTML para AMP precisam seguir as [especificações de anúncios HTML para AMP](a4a_spec.md).  Para ver demonstrações e exemplos, confira os modelos de anúncios HTML para AMP de código aberto no site [AMP by Example](../../../documentation/examples/documentation/amp-ad.html).

**Usando ferramentas**: use qualquer uma das seguintes ferramentas se você quiser gerar criativos HTML para AMP:

- [Celtra's Ad Creator](http://www.prnewswire.com/news-releases/celtra-partners-with-the-amp-project-showcases-amp-ad-creation-at-google-io-event-300459514.html)
- [Google Web Designer](https://support.google.com/webdesigner/answer/7529856)
- Adobe Animate (*em breve*)

### Validar a sintaxe do anúncio HTML para AMP

Depois de criar seu anúncio HTML para AMP, certifique-se de que ele está usando a sintaxe HTML para AMP correta. Dependendo do seu ambiente de desenvolvimento, há algumas opções para validar os anúncios HTML para AMP:

- Use o módulo [NPM validador de AMP](https://www.npmjs.com/package/amphtml-validator) para validação da integração no CI de criação.
- Use o [validador de AMP](https://validator.ampproject.org/) para fazer um teste isolado.
- Estabeleça uma parceria com o [Cloudflare](https://blog.cloudflare.com/amp-validator-api/) (em inglês) e use o ponto de extremidade público do validador que ele oferece.

[tip type="note"]Para renderizar rapidamente os anúncios HTML para AMP em páginas AMP (ou seja, usando a renderização preferencial no Fast Fetch), a sintaxe precisa estar correta.  Se ela não for válida, o anúncio ainda será renderizado, mas isso não acontecerá tão rápido.[/tip]

## Compatibilidade com anúncios HTML para AMP em RTB

Se você quiser que Ad Exchanges e SSPs sejam compatíveis com anúncios HTML para AMP em um ambiente de lance em tempo real (RTB), consulte o [guia de implementação para Ad Exchanges RTB](https://github.com/ampproject/amphtml/blob/master/ads/google/a4a/docs/RTBExchangeGuide.md) (em inglês) e veja mais detalhes.

## Perguntas frequentes

#### Há alguma amostra de anúncio HTML para AMP?

Sim. Você encontra vários modelos fantásticos de anúncios HTML para AMP no site [Examples](../../../documentation/examples/documentation/amp-ad.html). Essas amostras usam componentes avançados em AMP.

#### Os anúncios HTML para AMP são compatíveis com verificação e detecção de visibilidade de terceiros?

Sim, há compatibilidade nativa para verificação e detecção de visibilidade usando [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md). Por exemplo, o ActiveView do Google integra-se dessa maneira. Há também outros fornecedores, como a MOAT, que vêm implementando ativamente essa compatibilidade.

#### Os anúncios HTML para AMP são compatíveis com animação baseada em linha do tempo?

Sim. Consulte [`amp-animation`](../../../documentation/components/reference/amp-animation.md).

#### A maioria dos anúncios tem regiões-alvo ativadas por toque e saídas de anúncio configuráveis. Os anúncios HTML para AMP têm um mecanismo semelhante?

Sim. Consulte [`amp-ad-exit`](../../../documentation/components/reference/amp-ad-exit.md).

#### Não encontro o que preciso. Onde posso tirar dúvidas?

- [Stack Overflow](http://stackoverflow.com/questions/tagged/amp-html) é a maneira recomendada de encontrar as respostas para suas dúvidas sobre AMP. Como os membros da comunidade do Projeto AMP monitoram regularmente o Stack Overflow, é provável que por meio dele você receba as respostas mais rápidas para suas perguntas.
- Participe do canal [Slack #a4a-discuss](https://docs.google.com/forms/d/e/1FAIpQLSd83J2IZA6cdR6jPwABGsJE8YL4pkypAbKMGgUZZriU7Qu6Tg/viewform?fbzx=4406980310789882877) para conhecer soluções e encontrar respostas.
- Se você encontrar um bug na AMP ou tiver uma solicitação de recurso, consulte o artigo sobre [relatar problemas com a AMP](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#reporting-issues-with-amp) (em inglês) para ver mais informações sobre como comunicar um problema.
