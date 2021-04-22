---
'$title': 'Analytics: the basics'
$order: 0
description: 'O AMP oferece dois componentes para atender às suas necessidades de análise e medição: amp-pixel e amp-analytics. As duas opções enviam dados de análise para um endpoint definido.'
formats:
  - websites
  - stories
---

Conheça os conceitos básicos da análise de AMP.

## Usar amp-pixel ou amp-analytics? <a name="use-amp-pixel-or-amp-analytics"></a>

O AMP oferece dois componentes para atender às suas necessidades de análise e medição: [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) e [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). As duas opções enviam dados de análise para um endpoint definido.

Se você quiser um comportamento semelhante ao de um simples [pixel de rastreamento](https://en.wikipedia.org/wiki/Web_beacon#Implementation), o componente [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) fornecerá um rastreamento básico de exibições de página. Os dados de exibição de página são enviados para uma URL definida. Algumas integrações com fornecedores podem precisar desse componente. Nesse caso, elas especificarão o endpoint exato da URL.

Na maioria das soluções de análise, use [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). O rastreamento de exibições de página também funciona em [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). No entanto, também é possível rastrear o engajamento dos usuários com qualquer tipo de conteúdo da página, incluindo cliques em links e botões. Além disso, você pode medir até onde o usuário rolou a página, se ele interagiu ou não com mídias sociais e muito mais.

Saiba mais: Consulte [Informações detalhadas sobre o AMP Analytics](deep_dive_analytics.md).

Como parte da integração com a plataforma AMP, os fornecedores ofereceram configurações predefinidas de [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) para que seja mais fácil coletar dados e movê-los para suas ferramentas de rastreamento. Acesse a documentação de fornecedores na lista [Fornecedores de análise](analytics-vendors.md).

Você pode usar [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) e [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) nas suas páginas: [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) para rastreamento simples de exibições de página e [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) para todo o restante. Também é possível adicionar várias instâncias de cada tag. Se estiver trabalhando com vários fornecedores de análise, será necessário usar uma tag por solução. As páginas AMP mais simples são melhores para os usuários, portanto se você não precisar de tags adicionais, não as use.

## Criar uma configuração de análise simples

Saiba como criar uma configuração simples de [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) e [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) .

### Configuração simples de amp-pixel

Para criar uma configuração simples de [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md), insira no corpo da página AMP algo como o seguinte :

```html
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
```

Neste exemplo, os dados de exibição de página são enviados para a URL definida, juntamente com um número aleatório. A variável `RANDOM` é uma entre as muitas [variáveis ​​de substituição na plataforma AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md). Saiba mais sobre a [substituição de variáveis](analytics_basics.md#variable-substitution).

O componente [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) é integrado, de modo que não é necessário fazer uma declaração de inclusão, como ocorre com os componentes estendidos de AMP, incluindo [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Entretanto, é necessário colocar a tag [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) o mais perto possível do início de `<body>`. O pixel de rastreamento será acionado somente quando a tag for exibida. Se [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) estiver posicionado perto da parte inferior da página, talvez ele não seja acionado.

### Configuração simples de `amp-analytics`

Para criar uma configuração simples de [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), primeiro é necessário incluir esta declaração `custom-element` no `<head>` documento AMP (consulte também [Declaração de inclusão de componente](../../../../documentation/components/index.html)):

```html
<script
  async
  custom-element="amp-analytics"
  src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
></script>
```

O exemplo a seguir é semelhante ao [exemplo de `amp-pixel`](../../../../documentation/components/reference/amp-pixel.md). Todas as vezes que uma página estiver visível, o evento será acionado e enviará os dados de exibição de página para uma URL definida, juntamente com um código aleatório:

```html
<amp-analytics>
  <script type="application/json">

      {"requests":
        {"pageview": "https://foo.com/pixel?RANDOM
      ", },"triggers":
        {"trackPageview":
          {"on": "visible",
          "request": "pageview"

    } } }
  </script>
</amp-analytics>
```

No exemplo acima, definimos uma solicitação chamada "pageview" como `https://foo.com/pixel?RANDOM`. Como visto anteriormente, RANDOM é substituído por um número aleatório, de modo que a solicitação será algo parecido com `https://foo.com/pixel?0.23479283687235653498734`.

Quando a página se tornar visível (como especificado pelo uso da palavra-chave de acionamento `visible`), um evento será acionado, e a solicitação `pageview` será enviada. O atributo "triggers" determinará quando a solicitação "pageview" será acionada. Saiba mais sobre [solicitações e acionamentos](deep_dive_analytics.md#requests-triggers--transports).

[filter formats="stories"]

## Configuração default de histórias AMP <a name="variable-substitution"></a>

Uma jornada típica do usuário para um site é muito diferente das histórias. Em um site, um usuário poderá ler o título, rolar até a parte inferior da página, interagir com um formulário antes de clicar num link para a página seguinte. As histórias ocupam toda a janela de visualização e os usuários não rolam, mas tocam para avançar.

{{ image('/static/img/docs/guides/analytics-pages.png', 660, 501, alt='Image of PWA' ) }}

Muitos gostariam de tratar cada nova [`<amp-story-page>`](../../../../documentation/components/reference/amp-story-page.md) na história como uma nova exibição de página porque o conteúdo de tela a tela é substancialmente diferente. No entanto, a página é apenas um elemento dentro da história completa - e um usuário geralmente precisa ver muitas páginas da história para ter uma idéia completa da história. Portanto, a questão de como contamos algo tão simples como a exibição de página tem enormes implicações para nossa abordagem analítica.

{{ image('/static/img/docs/guides/analytics-setup-stories.png', 1037, 528, alt='Image of PWA' ) }}

O AMP Analytics facilita a implementação dos itens acima usando qualquer fornecedor de análise. Por exemplo, com o [Global Site Tag](https://developers.google.com/gtagjs/) do Google Analytics, será semelhante ao snippet abaixo.

```html
<amp-analytics type="gtag" data-credentials="include">
  <script type="application/json">
    {
      "vars": {
        "gtag_id": "YOUR_GOOGLE_ANALYTICS_ID",
        "config": {
          "YOUR_GOOGLE_ANALYTICS_ID": {
            "groups": "default"
          }
        }
      },
      "triggers": {
        "storyProgress": {
          "on": "story-page-visible",
          "vars": {
            "event_name": "custom",
            "event_action": "story_progress",
            "event_category": "${title}",
            "event_label": "${storyPageId}",
            "send_to": ["YOUR_GOOGLE_ANALYTICS_ID"]
          }
        },
        "storyEnd": {
          "on": "story-last-page-visible",
          "vars": {
            "event_name": "custom",
            "event_action": "story_complete",
            "event_category": "${title}",
            "send_to": ["YOUR_GOOGLE_ANALYTICS_ID"]
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Esta configuração default deve lhe dar uma configuração funcional completa para uma história AMP.

Se você estiver interessado em ir além do que a configuração default pode oferecer, leia [Analytics for your AMP Stories](https://blog.amp.dev/2019/08/28/analytics-for-your-amp-stories/?_gl=1*pw0bu5*_ga*MzM1MjQ0ODE5LjE1NjUwMzU1MTg) para encontrar casos de uso mais avançados com o Google Analytics.

[/filter]

## Substituição de variáveis <a name="user-identification"></a>

Tanto o componente [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) quanto [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) permitem todas as substituições de variáveis ​​de URL padrão (consulte [Substituições de variáveis ​​de AMP HTML](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md)). No exemplo abaixo, a solicitação de exibição de página é enviada à URL juntamente com a URL canônica do documento AMP atual, o title e um [código de cliente](analytics_basics.md#user-identification):

```html
<amp-pixel
  src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"
></amp-pixel>
```

Por ser bastante simples, a tag [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) só pode incluir variáveis ​​definidas pela plataforma ou que possam ser analisadas pelo runtime AMP a partir da página AMP. No exemplo acima, a plataforma preenche os valores de `canonicalURL` e `clientId(site-user-id)`. A tag [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) pode incluir as mesmas variáveis que [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md), assim como as variáveis ​​definidas de modo exclusivo dentro da configuração da tag.

Use o formato `${varName}` em strings de solicitação para variáveis definidas pela página ou pela plataforma. As variáveis [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) substituirão o modelo por seu valor real no momento da construção da solicitação de análise (consulte também [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

No exemplo de [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) abaixo, a solicitação de pageview é enviada à URL com dados adicionais extraídos de substituições de variáveis, algumas fornecidas pela plataforma, outras definidas inline, dentro da configuração de [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

```html
<amp-analytics>
  <script type="application/json">
    {
      "requests": {
        "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}"
      },
      "vars": {
        "account": "ABC123"
      },
      "triggers": {
        "someEvent": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "My homepage"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

No exemplo acima, as variáveis `account` e `title` são definidas na configuração de [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). As variáveis `canonicalUrl` e `clientId` não são definidas na configuração, por isso os valores delas são substituídos pela plataforma.

[tip type="important"] **IMPORTANTE –** A substituição de variáveis é flexível. As mesmas variáveis ​​podem ser definidas em locais diferentes, e o runtime AMP analisará os valores nessa ordem de precedência (consulte <a>Ordem da substituição de variáveis</a>). [/tip]

## Identificação do usuário <a name="user-identification"></a>

Os websites usam cookies para armazenar informações específicas dos usuários no navegador. Os cookies podem ser usados ​​para informar que um usuário já visitou um site antes. No AMP, as páginas podem ser veiculadas pelo site de um editor ou por um cache (como o cache de AMP do Google). O website do editor e o cache provavelmente terão domínios diferentes. Por motivos de segurança, os navegadores podem limitar o acesso a cookies de outros domínios (consulte também [Rastrear usuários em diferentes origens](https://github.com/ampproject/amphtml/blob/main/spec/amp-managing-user-state.md)).

Por default, o AMP fornecerá um código de cliente, seja a página acessada pelo site original do editor ou por um cache. O código de cliente gerado pelo AMP tem o valor da string codificada `"amp-"` seguido por um `base64` aleatório e permanece o mesmo para o usuário, caso ele volte a acessar a página.

O AMP administra a leitura e a gravação do código de cliente em todos os casos. Isto é importante principalmente no caso de páginas servidas por meio de um cache ou de alguma outra forma fora do contexto de exibição do site original do editor. Nestas circunstâncias, o acesso aos cookies do site do editor não estará disponível.

Quando uma página AMP é servida pelo site do editor, é possível fazer com que o framework de identificação do cliente usado pelo AMP busque e use um cookie de fallback. Nesse caso, o argumento `cid-scope-cookie-fallback-name` da variável `clientId` será interpretado como o nome do cookie. A formatação pode aparecer como `CLIENT_ID(cid-scope-cookie-fallback-name)` ou `${clientId(cid-scope-cookie-fallback-name)}`.

Por exemplo:

```html
<amp-pixel
  src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"
></amp-pixel>
```

Se o AMP descobrir que o cookie está definido, a substituição da identificação do cliente retornará o valor do cookie. Se o AMP descobrir que esse cookie não está definido, ela gerará um valor no formato `amp-` seguido de uma string aleatória codificada base64.

Saiba mais sobre a substituição da identificação do cliente, incluindo como adicionar um código de notificação de ID de usuário opcional em [Variáveis ​​suportadas em AMP Analytics](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/analytics-vars.md).

Saiba mais: Continue seu aprendizado sobre análises em [Aprofunde-se no AMP Analytics](deep_dive_analytics.md) e [Casos de uso](use_cases.md).
