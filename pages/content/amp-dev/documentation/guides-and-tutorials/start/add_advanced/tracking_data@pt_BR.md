---
"$title": Acompanhe o envolvimento com análises
"$order": '4'
description: Analytics platforms are commonly integrated into websites through inline JavaScript snippets and function calls, which trigger events that are sent back to the analytics system.
---

As plataformas de análise são frequentemente integradas a sites através de fragmentos de JavaScript inline e chamadas de função, que disparam eventos que são enviados de volta ao sistema de análise. O AMP fornece uma sintaxe de configuração JSON flexível para replicar esse processo para diferentes parceiros de análise.

A seguir, veja um exemplo do acompanhamento tradicional do Google Analytics com base em JavaScript. O conteúdo será reescrito no formato JSON [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). Antes disso, veja a abordagem tradicional:

```html
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
```

Esse JavaScript é bem simples. Ele envia uma notificação para acompanhar o evento de exibição de página.

Para reproduzir esse recurso em uma página AMP, primeiro é preciso **incluir** a biblioteca de componentes [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) no `<head>` do documento:

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

Agora, é preciso **adicionar** o componente [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) ao final do `body` do documento:

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

Assim como o exemplo de JavaScript no início desta página, esse snippet [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) enviará uma notificação para o Google Analytics indicando que uma página foi exibida.

Para especificar isso, definimos `type` como `googleanalytics`. No JSON, criamos um acionador chamado de "default pageview".  Esse acionador é disparado quando a página é exibida (devido a `"on": "visible"`). Ao ser disparado, ele envia uma solicitação de análise `pageview` para o Google Analytics com os `vars` especificados.

O JSON usado para configurar [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) é um formato muito flexível para descrever quais dados de análise devem ser enviados e quando.  Veja informações completas sobre o formato no artigo sobre [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

Usando o exemplo acima, é possível **adicionar** outro acionador chamado `"click on #header trigger"`:

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

Como você já deve imaginar pelo nome desse novo acionador, ele será disparado quando o usuário clicar no elemento com o código `"header"` (especificado por `"on": "click"` e `"selector": "#header"`).  Nesse momento, enviaremos uma solicitação `event` ao nosso provedor de análise, especificando algumas variáveis para inclusão na solicitação.

Se você tiver uma plataforma personalizada de acompanhamento para integração, ainda poderá usar [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) e definir pontos de extremidade do URL personalizados que receberão os dados de acompanhamento. Saiba mais nos documentos de referência do componente [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

Observação: `“UA-YYYY-Y”` é uma conta de exemplo do Google Analytics. Se você usar esse exemplo, substitua esse valor pelo código de acompanhamento do Google Analytics do seu site.

Dica: Se você estiver interessado em um sistema de acompanhamento mais simples, dê uma olhada em [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md).
