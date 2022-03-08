---
'$title': Monetização de páginas AMP com anúncios
$order: 0
description: Este guia oferece instruções e práticas recomendadas para a exibição de anúncios nas páginas AMP. Portanto, para exibir anúncios em AMP, é preciso adicionar o componente personalizado amp-ad....
formats:
  - sites
---

Este guia oferece instruções e práticas recomendadas para a exibição de anúncios nas páginas AMP.

## Adicionar anúncios à página

Quando você quer exibir anúncios em páginas não AMP (HTML tradicional), basta incluir um snippet de JavaScript para veicular anúncios da rede de publicidade. Por motivos de segurança e desempenho, não é possível incluir JavaScript de terceiros em páginas AMP. Portanto, para exibir anúncios em AMP, é preciso adicionar o componente personalizado [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) à página AMP.

[tip type = "tip"] **&nbsp;TIP - {/ strong0} Consulte [ AMP por exemplo para ver uma demonstração ao vivo {/ a1} que demonstra como adicionar uma tag de anúncio amp a uma página AMP. [/dica]](../../../../documentation/components/reference/amp-ad.md)**

Vejamos as etapas necessárias para incluir o componente que permite exibir anúncios numa página AMP.

### Etapa 1: adicione o script amp-ad

O componente `<amp-ad>` é uma extensão de anúncio personalizada para a biblioteca AMP. O `<amp-ad>`, contém JavaScript personalizado que foi criado especialmente para otimizar o desempenho. Para usar o componente `<amp-ad>`, adicione o JavaScript necessário desse componente na seção `head` da página AMP:

```html
<script
  async
  custom-element="amp-ad"
  src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
></script>
```

### Etapa 2: adicione a tag amp-ad à página AMP

Mais de cem [redes de publicidade e servidores de anúncios](ads_vendors.md) oferecem integrações incorporadas às AMP. Para adicionar um anúncio de uma determinada rede de publicidade, adicione a tag `<amp-ad>` e especifique a rede no atributo `type`.

Neste exemplo, adicionaremos um local de anúncio para veicular anúncios da rede a9:

```html
<amp-ad type="a9"> </amp-ad>
```

### Etapa 3: especifique o tamanho do bloco de anúncios

Adicione os atributos `width` e `height` à tag [`amp-ad`](../../../../documentation/components/reference/amp-ad.md). Isso especificará o tamanho do anúncio na página AMP:

```html
<amp-ad type="a9"> width="300" height="250" </amp-ad>
```

### Etapa 4: defina os parâmetros da rede de publicidade

Cada rede exige atributos de dados específicos para veicular os anúncios. Consulte a documentação [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) da rede de publicidade e adicione os atributos necessários. No exemplo a seguir, a rede a9 exige parâmetros adicionais para especificar o tamanho do anúncio, entre outros detalhes:

```html
<amp-ad
  type="a9"
  width="300"
  height="250"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
</amp-ad>
```

### Etapa 5: (opcional) especifique um placeholder

Dependendo da rede de publicidade, você pode optar por exibir um placeholder até que o anúncio esteja disponível para visualização. Isso evita espaços em branco, melhorando a experiência do usuário. Para especificar um placeholder, adicione um elemento filho com o atributo `placeholder`. Saiba mais no artigo sobre [placeholders e fallbacks](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad
  type="a9"
  width="300"
  height="250"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
  <amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
```

### Etapa 6: (opcional) especifique um fallback

Dependendo da rede de publicidade, você pode optar por mostrar um elemento substituto de fallback se não houver um anúncio disponível para veiculação. Para especificar um fallback, adicione um elemento filho com o atributo `fallback`. Saiba mais no artigo sobre [placeholders e fallbacks](../../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md).

```html
<amp-ad
  type="a9"
  width="300"
  height="250"
  data-aax_size="300x250"
  data-aax_pubname="test123"
  data-aax_src="302"
>
  <amp-img fallback src="fallback-image.jpg"></amp-img>
</amp-ad>
```

Parabéns! Você já está veiculando anúncios na sua página AMP.

## Veicular anúncios HTML para AMP de venda direta

O componente [`amp-ad`](../../../../documentation/components/reference/amp-ad.md) exibe anúncios da rede que você especificar. Esses anúncios podem ser anúncios HTML padrão ou AMPHTML, desde que a rede de publicidade seja compatível com anúncios AMPHTML. Para servir seus anúncios de venda direta como anúncios AMPHTML, crie o anúncio em AMPHTML de acordo com os requisitos da [especificação de anúncios AMPHTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) e use um [servidor de anúncios capaz de servir anúncios AMPHTML](https://github.com/ampproject/amphtml/blob/main/ads/google/a4a/docs/a4a-readme.md#publishers).

## Adicionar dados de segmentação a solicitações de anúncios

Como parte do mecanismo de veiculação Fast Fetch, o recurso de configuração em tempo real (RTC - Real-Time Config) permite que os editores incrementem as solicitações de anúncios com informações de segmentação próprias e de terceiros que são recuperadas no tempo de execução. O RTC permite até cinco frases de destaque nos servidores de segmentação para cada local de anúncio, e os resultados delas são anexados à solicitação de anúncio. Para usar RTC nos seus anúncios, é preciso que sua rede de publicidade seja compatível com RTC e Fast Fetch.

Saiba mais sobre RTC neste vídeo do YouTube:

[video src='https://www.youtube.com/watch?v=mvAmvKiWPfA' caption='Assista o vídeo sobre monetização de AMP com Header Bidding.']

Veja também estes recursos de RTC:

- [Guia de implementação do editor de RTC para AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/rtc-publisher-implementation-guide.md) (em inglês)
- [Configuração em tempo real para AMP](https://github.com/ampproject/amphtml/blob/main/extensions/amp-a4a/rtc-documentation.md) (em inglês)

## Práticas recomendadas

Veja algumas dicas para maximizar a eficiência dos anúncios nas páginas AMP:

### Colocação e controles: otimize o posicionamento dos anúncios

- **Posicione o mesmo número de anúncios** nas páginas AMP e não AMP para gerar o máximo de receita por página.
- **Posicione o primeiro anúncio imediatamente abaixo da primeira janela de visualização** ("abaixo da dobra") para oferecer uma experiência ideal ao usuário.
- Se você não usar CSS avançado nem consultas de mídia, **centralize os blocos de anúncios na página** a fim de otimizar a experiência dos seus usuários na Web para dispositivos móveis.
- Ative as [solicitações de anúncios de tamanhos variados](https://github.com/ampproject/amphtml/blob/main/ads/README.md#support-for-multi-size-ad-requests) no inventário AMP para aumentar a pressão no leilão de anúncios e gerar mais receita.

### Demanda e preços: defina o preço certo para os anúncios

- **Venda blocos de anúncios das páginas AMP em todos os canais de vendas**, incluindo os diretos e indiretos, para maximizar a competição pelo seu inventário nas páginas AMP.
- **Estabeleça um preço para o inventário de anúncios nas páginas AMP** que seja semelhante ao das páginas não AMP. Monitore o desempenho e ajuste o preço de acordo com os resultados.
- **Faça com que todos os canais de demanda concorram** ao inventário de anúncios nas páginas AMP para aumentar a concorrência.

### Tipos de anúncios: veicule os melhores tipos de anúncios

- **Evite criativos pesados**, de acordo com as <a>diretrizes do IAB</a>.
- **Evite intersticiais** ou outros formatos de anúncio que causem reflow de conteúdo ao carregar o anúncio.
- **Otimize a visibilidade** definindo data-loading-strategy como prefer-viewability-over-views.
- **Coloque anúncios no seu conteúdo de vídeo** usando [players compatíveis](../../../../documentation/components/index.html#media) ou [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) para ativar a receita em todos os tipos de conteúdo.
- **Implemente anúncios nativos** para competir com os de display usando solicitações de anúncios de tamanhos variados. Isto aumenta a pressão de demanda e oferece aos leitores uma experiência do usuário premium.

### Inovação: ofereça os produtos de anúncios mais interessantes

- **Implemente anúncios em páginas AMP auxiliares** para gerar receita incremental:
  - [Anúncios em um carrossel](../../../../documentation/examples/documentation/Carousel_Ad.html)
  - [Anúncios em um lightbox](../../../../documentation/examples/documentation/Lightbox_Ad.html)
  - E [muito mais](../../../../documentation/examples/index.html)
- **Implemente novos formatos de anúncios de venda direta** para que sua equipe de vendas ofereça produtos de anúncios inovadores e de alto impacto:
  - [Anúncios fixos](../../../../documentation/examples/documentation/amp-sticky-ad.html)
  - [Flying Carpet](../../../../documentation/examples/documentation/amp-fx-flying-carpet.html)

## Outros recursos

- [Modelos de anúncios AMPHTML](../../../../documentation/examples/index.html)
- [Demonstração: como adicionar `amp-ad` à sua página AMP](../../../../documentation/components/reference/amp-ad.md)
