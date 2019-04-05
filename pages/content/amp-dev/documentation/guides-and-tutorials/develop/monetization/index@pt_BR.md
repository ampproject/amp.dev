---
$title: Monetização de páginas AMP com anúncios
---

Este guia oferece instruções e práticas recomendadas para a exibição de anúncios nas páginas AMP.

## Adicionar anúncios à página

Quando você quer exibir anúncios em páginas não AMP (HTML tradicional), basta incluir um snippet de JavaScript para veicular anúncios da rede de publicidade.  Por motivos de segurança e desempenho, não é possível incluir JavaScript de terceiros em páginas AMP.  Portanto, para exibir anúncios nas AMP, é preciso adicionar o componente personalizado [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) à página AMP.

[tip type="success"]

Consulte o site [AMP By Example para ver uma demonstração ao vivo]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}) de como adicionar uma tag de anúncio AMP a uma página AMP.

[/tip]

Vamos ver as etapas necessárias para incluir o componente que permite exibir anúncios na página AMP.

### Etapa 1: adicione o script amp-ad

O componente `<amp-ad>` é uma extensão de anúncio personalizada para a biblioteca AMP. O `<amp-ad>`, contém JavaScript personalizado que foi criado especialmente para otimizar o desempenho. Para usar o componente `<amp-ad>`, adicione o JavaScript necessário desse componente na seção `head` da página AMP:

```html
<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
```

### Etapa 2: adicione a tag amp-ad à página AMP

Mais de cem [redes de publicidade e servidores de anúncios]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/monetization/ads_vendors.md', locale=doc.locale).url.path}}) oferecem integrações incorporadas às AMP.  Para adicionar um anúncio de uma determinada rede de publicidade, adicione a tag `<amp-ad>` e especifique a rede no atributo `type`.

Neste exemplo, adicionaremos um local de anúncio para veicular anúncios da rede a9:

```html
<amp-ad type="a9">
</amp-ad>
```

### Etapa 3: especifique o tamanho do bloco de anúncios

Adicione os atributos `width` e `height` à tag `<amp-ad>`.  Isso especificará o tamanho do anúncio na página AMP:

```html hl_lines="2"
<amp-ad type="a9">
   width="300" height="250"
</amp-ad>
```

### Etapa 4: defina os parâmetros da rede de publicidade

Cada rede exige atributos de dados específicos para veicular os anúncios.  Consulte a documentação `<amp-ad>` da rede de publicidade e adicione os atributos necessários. No exemplo a seguir, a rede a9 exige parâmetros adicionais para especificar o tamanho do anúncio, entre outros detalhes:

```html hl_lines="3 4 5"
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
</amp-ad>
```

### Etapa 5: (opcional) especifique um marcador

Dependendo da rede de publicidade, você pode optar por mostrar um marcador até que o anúncio esteja disponível para visualização. Isso evita espaços em branco, melhorando a experiência do usuário.  Para especificar um marcador, adicione um elemento filho com o atributo `placeholder`. Saiba mais no artigo sobre [marcadores e substitutos]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}}).

```html hl_lines="6"
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img placeholder src="placeholder-image.jpg"></amp-img>
</amp-ad>
```

### Etapa 6: (opcional) especifique um substituto

Dependendo da rede de publicidade, você pode optar por mostrar um elemento substituto se não houver um anúncio disponível para veiculação. Para especificar um substituto, adicione um elemento filho com o atributo `fallback`. Saiba mais no artigo sobre [marcadores e substitutos]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}}).

```html hl_lines="6"
<amp-ad type="a9"
    width="300" height="250"
    data-aax_size="300x250"
    data-aax_pubname="test123"
    data-aax_src="302">
   <amp-img fallback src="fallback-image.jpg"></amp-img>
</amp-ad>
```

Parabéns! Você já está veiculando anúncios na sua página AMP.

## Veicular anúncios HTML para AMP de venda direta

O componente [`amp-ad`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}}).

## Adicionar dados de segmentação a solicitações de anúncios

Como parte do mecanismo de veiculação Fast Fetch, o recurso de configuração em tempo real (RTC, na sigla em inglês) permite que os editores incrementem as solicitações de anúncios com informações de segmentação próprias e de terceiros que são recuperadas no tempo de execução. O RTC permite até cinco frases de destaque nos servidores de segmentação para cada local de anúncio, e os resultados delas são anexados à solicitação de anúncio.  Para usar RTC nos seus anúncios, é preciso que sua rede de publicidade seja compatível com RTC e Fast Fetch.

Saiba mais sobre RTC neste vídeo do YouTube:

[video src='https://www.youtube.com/watch?v=mvAmvKiWPfA' caption='Assista o vídeo sobre monetização das AMP com lances de cabeçalho.']

Veja também estes recursos de RTC:

*   [guia de implementação do editor de RTC para AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-publisher-implementation-guide.md) (em inglês)
*   [configuração em tempo real para AMP](https://github.com/ampproject/amphtml/blob/master/extensions/amp-a4a/rtc-documentation.md) (em inglês)

## Práticas recomendadas

Veja algumas dicas para maximizar a eficiência dos anúncios nas páginas AMP:

### Colocação e controles: otimize o posicionamento dos anúncios

*   **Posicione o mesmo número de anúncios** nas páginas AMP e não AMP para gerar o máximo de receita por página.
*   **Posicione o primeiro anúncio imediatamente abaixo da primeira janela de visualização** ("abaixo da dobra") para oferecer uma experiência ideal ao usuário.
*   Se você não usar CSS avançado nem consultas de mídia, **centralize os blocos de anúncios na página** a fim de otimizar a experiência dos seus usuários na Web para dispositivos móveis.
*   Ative as [solicitações de anúncio de vários tamanhos](https://github.com/ampproject/amphtml/blob/master/ads/README.md#support-for-multi-size-ad-requests) (em inglês) no inventário AMP para aumentar a pressão no leilão de anúncios e gerar mais receita.

### Demanda e preços: defina o preço certo para os anúncios

*   **Venda blocos de anúncios das páginas AMP em todos os canais de vendas**, incluindo os diretos e indiretos, para maximizar a competição pelo seu inventário nas páginas AMP.
*   **Estabeleça um preço para o inventário de anúncios nas páginas AMP** que seja semelhante ao das páginas não AMP. Monitore o desempenho e ajuste o preço de acordo com os resultados.
*   **Faça com que todos os canais de demanda concorram** ao inventário de anúncios nas páginas AMP para aumentar a concorrência.

### Tipos de anúncios: veicule os melhores tipos de anúncios

*   **Evite criativos pesados**, de acordo com as [diretrizes do IAB](http://www.iab.com/wp-content/uploads/2015/11/IAB_Display_Mobile_Creative_Guidelines_HTML5_2015.pdf (em inglês).
*   **Evite intersticiais** ou outros formatos de anúncio que causem reflow de conteúdo ao carregar o anúncio.
*   **Otimize a visibilidade** definindo data-loading-strategy como prefer-viewability-over-views.
*   **Coloque anúncios no seu conteúdo de vídeo** usando [players compatíveis]({{g.doc('/content/amp-dev/documentation/components/index.html', locale=doc.locale).url.path}}#media) ou [`amp-iframe`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-iframe.md', locale=doc.locale).url.path}}) para ativar a receita em todos os tipos de conteúdo.
*   **Implemente anúncios nativos** para competir com os de display usando solicitações de anúncios de vários tamanhos. Isso aumenta a pressão de demanda e oferece aos leitores uma experiência do usuário premium.

### Inovação: ofereça os produtos de anúncios mais interessantes

*   **Implemente anúncios em páginas AMP auxiliares** para gerar receita incremental:
    *   [anúncios em um carrossel]({{g.doc('/content/amp-dev/documentation/examples/documentation/Carousel_Ad.html', locale=doc.locale).url.path}})
    *   [anúncios em um lightbox]({{g.doc('/content/amp-dev/documentation/examples/documentation/Lightbox_Ad.html', locale=doc.locale).url.path}})
    *   e [muito mais]({{g.doc('/content/amp-dev/documentation/examples/index.html', locale=doc.locale).url.path}})
*   **Implemente novos formatos de anúncios de venda direta** para que sua equipe de vendas ofereça produtos de anúncios inovadores e de alto impacto:
    *   [anúncios fixos]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-sticky-ad.html', locale=doc.locale).url.path}})
    *   [Flying Carpet]({{g.doc('/content/amp-dev/documentation/examples/documentation/amp-fx-flying-carpet.html', locale=doc.locale).url.path}})

## Outros recursos

*   [modelos de anúncios HTML para AMP]({{g.doc('/content/amp-dev/documentation/examples/index.html', locale=doc.locale).url.path}})
*   [demonstração: como adicionar `amp-ad` à página AMP]({{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})
