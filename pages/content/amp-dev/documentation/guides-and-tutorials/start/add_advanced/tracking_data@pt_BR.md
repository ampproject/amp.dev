---
$title: Acompanhar o engajamento com análises
---

Em geral, as plataformas de análise são integradas aos sites por meio de snippets de JavaScript in-line e chamadas de função, que acionam eventos retornados ao sistema de análise. A tecnologia AMP oferece uma sintaxe de configuração JSON flexível para reproduzir esse processo em diversos parceiros de análise.

A seguir, veja um exemplo do acompanhamento tradicional do Google Analytics com base em JavaScript. O conteúdo será reescrito no formato JSON [amp-analytics](/pt_br/docs/reference/components/amp-analytics.html). Antes disso, veja a abordagem tradicional:

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

Para reproduzir esse recurso em uma página AMP, primeiro é preciso **incluir** a biblioteca de componentes [amp-analytics](/pt_br/docs/reference/components/amp-analytics.html) no `<head>` do documento:

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

Agora, é preciso **adicionar** o componente `amp-analytics` ao final do `body` do documento:

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

Assim como o exemplo de JavaScript no início desta página, esse snippet `amp-analytics` enviará uma notificação para o Google Analytics indicando que uma página foi exibida.

Para especificar isso, definimos `type` como `googleanalytics`. No JSON, criamos um acionador chamado de "default pageview".  Esse acionador é disparado quando a página é exibida (devido a `"on": "visible"`). Ao ser disparado, ele envia uma solicitação de análise `pageview` para o Google Analytics com os `vars` especificados.

O JSON usado para configurar `amp-analytics` é um formato muito flexível para descrever quais dados de análise devem ser enviados e quando.  Veja informações completas sobre o formato no artigo sobre [como especificar dados de configuração com amp-analytics](/pt_br/docs/reference/components/amp-analytics.html#specifying-configuration-data).

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

Se você tiver uma plataforma personalizada de acompanhamento para integração, ainda poderá usar `amp-analytics` e definir pontos de extremidade do URL personalizados que receberão os dados de acompanhamento. Saiba mais nos documentos de referência do componente [amp-analytics](/pt_br/docs/reference/components/amp-analytics.html).

Observação: `“UA-YYYY-Y”` é uma conta de exemplo do Google Analytics. Se você usar esse exemplo, substitua esse valor pelo código de acompanhamento do Google Analytics do seu site.

Dica: Se você estiver interessado em um sistema de acompanhamento mais simples, dê uma olhada em [amp-pixel](/pt_br/docs/reference/components/amp-pixel.html). Caso você só precise acompanhar exibições de página, o amp-pixel é uma solução mais leve do que o amp-analytics, porque só atende aos requisitos do acompanhamento de pixels tradicional. Saiba mais em [Analytics: conceitos básicos]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics.md', locale=doc.locale).url.path}}).

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/adding_carousels.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/navigating.md', locale=doc.locale).url.path}}"><span class="arrow-next">Próxima</span></a>
</div>
