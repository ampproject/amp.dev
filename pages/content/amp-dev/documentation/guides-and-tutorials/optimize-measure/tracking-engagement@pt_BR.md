---
'$title': Como configurar análises básicas para suas páginas AMP
$order: 100
description: As plataformas de análise são frequentemente integradas a sites através de fragmentos de JavaScript inline e chamadas de função, que disparam eventos que são enviados de volta ao sistema de análise.
tutorial: 'true'
formats:
  - websites
  - stories
  - ads
---

As plataformas de análise são frequentemente integradas a sites através de fragmentos de JavaScript inline e chamadas de função, que disparam eventos que são enviados de volta ao sistema de análise. O AMP fornece uma sintaxe de configuração JSON flexível para replicar esse processo para diferentes parceiros de análise.

[tip] **DICA –** Se você usa o Google Analytics como seu provedor de análises, aprenda a usar [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md). [/tip]

## Contexto: Análises em páginas não-AMP

A seguir está um exemplo de rastreamento tradicional do Google Analytics usando JavaScript. Vamos reescrever isso no formato JSON [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md), mas primeiro vamos dar uma olhada na abordagem tradicional:

```html
<script>
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    (i[r] =
      i[r] ||
      function () {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(
    window,
    document,
    'script',
    '//www.google-analytics.com/analytics.js',
    'ga'
  );

  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('send', 'pageview');
</script>
```

Este JavaScript é bastante simples; ele envia uma notificação para rastrear o evento pageview.

## Passo 1: Inclua o script `amp-analytics`

Para reproduzir essa funcionalidade no AMP, devemos primeiro **incluir** a biblioteca de componentes [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) no `<head>` do nosso documento:

```html
<script
  async
  custom-element="amp-analytics"
  src="https://ampjs.org/v0/amp-analytics-0.1.js"
></script>
```

## Passo 2: Adicione o código de configuração

Agora vamos **acrescentar** o componente [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) no final do `body` do documento:

```html
<amp-analytics type="googleanalytics">
  <script type="application/json">
    {
      "vars": {
        "account": "UA-YYYY-Y"
      },
      "triggers": {
        "default pageview": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "Name of the Article"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Assim como no exemplo JavaScript na parte superior desta página, este trecho de [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) enviará uma notificação ao Google Analytics indicando que uma página foi visualizada.

Para especificar isto, definimos o `type` como `googleanalytics` e depois no JSON, criamos um disparador que chamamos de "default preview". Esse disparador será acionado quando a página estiver visível (devido ao `"on": "visible"`) e, quando ele disparar, enviaremos uma solicitação de análise de `pageview` ao Google Analytics com os `vars` que especificamos.

O JSON usado para configurar [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) é um formato muito flexível para descrever quais dados de análise devem ser enviados e quando enviá-los. O [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) tem detalhes completos sobre o formato.

## Passo 3: Adicionando mais disparadores

A partir do exemplo acima, podemos **acrescentar** outro disparador chamado `"click on #header trigger"`:

```html
<amp-analytics type="googleanalytics">
  <script type="application/json">
    {
      "vars": {
        "account": "UA-YYYY-Y"
      },
      "triggers": {
        "default pageview": {
          "on": "visible",
          "request": "pageview",
          "vars": {
            "title": "Name of the Article"
          }
        },
        "click on #header trigger": {
          "on": "click",
          "selector": "#header",
          "request": "event",
          "vars": {
            "eventCategory": "examples",
            "eventAction": "clicked-header"
          }
        }
      }
    }
  </script>
</amp-analytics>
```

Como você poderá adivinhar pelo nome deste novo disparador, ele será acionado quando o elemento com o ID `"header"` for clicado (especificado por `"on": "click"` e `"selector": "#header"`). Quando este disparador for acionado, enviaremos a solicitação do `event` para nosso provedor de análises, especificando algumas variáveis a serem incluídas na solicitação.

Se você tem uma plataforma de rastreamento personalizada com a qual deseja se integrar, ainda pode usar [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) e definir seus próprios endpoints de URL personalizados para enviar dados de rastreamento. Saiba mais na documentação de referência do componente [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md).

[tip type="note"] **OBSERVAÇÃO –** `“UA-YYYY-Y”` é uma conta Google Analytics de exemplo; ela deve ser substituída pelo código de rastreamento do Google Analytics do seu próprio site, se você estiver usando este exemplo no seu site. [/tip]

[tip type="tip"] **DICA –** Se você estiver interessado em um sistema de rastreamento mais simples, dê uma olhada em [`amp-pixel`](../../../documentation/components/reference/amp-pixel.md). Se você só precisa rastrear pageviews, [`amp-pixel`](../../../documentation/components/reference/amp-pixel.md) é uma solução mais leve que [`amp-analytics`](../../../documentation/components/reference/amp-analytics.md) porque só pretende resolver os requisitos de um rastreamento de pixel tradicional. Saiba mais em [Analytics: the basics guide](../../../documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md). [/tip]
