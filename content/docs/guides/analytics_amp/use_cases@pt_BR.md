---
$title: Casos de uso
$order: 2
toc: true
---
[TOC]

Este guia mostra um conjunto de casos de uso comuns do rastreamento de engajamento do usuário:

{% call callout('Observação', type='note') %} 
Quer adicionar um caso de uso? [Fale conosco.](https://github.com/ampproject/docs/issues/new) Você também pode enviar seus próprios casos. Veja [como contribuir](https://www.ampproject.org/pt_br/docs/support/contribute.html).
{% endcall %}

## Rastrear visualizações de página

Saiba como rastrear visualizações de página usando `amp-pixel` e `amp-analytics`.

### Como usar amp-pixel


Envie dados de visualização de página a um URL especificado usando [amp-pixel](/pt_br/docs/reference/amp-pixel.html):

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
[/sourcecode]

### Como usar amp-analytics – sem fornecedor


Envie dados de visualização de página a um URL especificado usando [amp-analytics](/pt_br/docs/reference/extended/amp-analytics.html):

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
    "requests": {
        "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}"
    },
    "vars": {
        "account": "ABC123"
    },
    "triggers": {
        "trackPageview": {
            "on": "visible",
            "request": "pageview"
        }
  } 
}
</script>
</amp-analytics>
[/sourcecode]

### Como usar amp-analytics – googleanalytics

Envie dados de visualização de página ao Google Analytics. Veja também como funciona o [rastreamento de páginas no Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking):

[sourcecode:html]
<amp-analytics type="googleanalytics" id="analytics1">
<script type="application/json">
{
    "vars": {
        "account": "UA-XXXXX-Y"  // Replace with your property ID.
    },
    "triggers": {
        "trackPageview": {  // Trigger names can be any string. trackPageview is not a required name.
            "on": "visible",
            "request": "pageview"
        } 
    } 
}
</script>

</amp-analytics>
[/sourcecode]

## Rastrear cliques na página

Saiba como rastrear cliques na página usando [amp-analytics](/pt_br/docs/reference/extended/amp-analytics.html)
e enviando dados de eventos a um URL especificado e ao [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Como enviar dados a um URL especificado

O exemplo a seguir usa o atributo `selector` para enviar um evento `click` ao URL especificado sempre que um usuário clica em um link (`<a href>`):

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
    "requests": {
        "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
    },
    "vars": {
        "account": "ABC123"
    },
    "triggers": {
        "trackAnchorClicks": {
            "on": "click",
            "selector": "a",
            "request": "event",
            "vars": {
                "eventId": "42",
                "eventLabel": "clicked on a link"
            }
        } 
    } 
}
</script>
</amp-analytics>
[/sourcecode]

### Como enviar dados ao Google Analytics

O exemplo a seguir usa o atributo `selector` do `trigger` para enviar um evento `click` ao Google Analytics quando um elemento específico recebe um clique. Veja também o [rastreamento de eventos de AMP no Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking):

[sourcecode:html]
<amp-analytics type="googleanalytics" id="analytics3">
<script type="application/json">
{
    "vars": {
        "account": "UA-XXXXX-Y"  // Replace with your property ID.
    },
    "triggers": {
        "trackClickOnHeader" : {
            "on": "click",
            "selector": "#header",
            "request": "event",
            "vars": {
                "eventCategory": "ui-components",
                "eventAction": "header-click"
            }
        }
    }
}
</script>
</amp-analytics>
[/sourcecode]

## Como rastrear a rolagem de página

Rastreie a rolagem de página usando [amp-analytics](/pt_br/docs/reference/extended/amp-analytics.html). O exemplo a seguir usa o atributo `scrollspec` para enviar um evento `scroll` ao URL especificado quando um usuário rola 25%, 50% e 90% da página verticalmente. O evento também é acionado pela rolagem horizontal de 90% da largura de `scroll`:

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
    "requests": {
        "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
    },
    "vars": {
        "account": "ABC123"
    },
    "triggers": {
        "scrollPings": {
            "on": "scroll",
            "scrollSpec": {
                "verticalBoundaries": [25, 50, 90],
                "horizontalBoundaries": [90]
            }
        } 
    } 
}
</script>
</amp-analytics>
[/sourcecode]

## Como rastrear interações em redes sociais

Saiba como rastrear interações em redes sociais usando [amp-analytics](/pt_br/docs/reference/extended/amp-analytics.html)
e enviando dados de eventos a um URL especificado e ao [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Como enviar dados a um URL especificado

O exemplo a seguir usa o atributo `selector` para enviar um evento `click` ao URL especificado sempre que um usuário clica em um tweet (`#tweet-link`):

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
    "requests": {
        "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
    },
    "vars": {
        "account": "ABC123"
    },
    "triggers": {
        "trackClickOnTwitterLink": {
            "on": "click",
            "selector": "#tweet-link",
            "request": "event",
            "vars": {
                "eventId": "43",
            "eventLabel": "clicked on a tweet link"
            }
        }
    }
}
</script>
</amp-analytics>
[/sourcecode]

### Como enviar dados ao Google Analytics

O exemplo a seguir usa o atributo `selector` do `trigger` para enviar um evento sempre que um botão específico de redes sociais recebe um clique. Veja também o [rastreamento de interações em redes sociais nas AMP no Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

[sourcecode:html]
<amp-analytics type="googleanalytics" id="analytics4">
<script type="application/json">
{
    "vars": {
        "account": "UA-XXXXX-Y" // Replace with your property ID.
    },
    "triggers": {
        "trackClickOnTwitterLink" : {
            "on": "click",
            "selector": "#tweet-link",
            "request": "social",
            "vars": {
                "socialNetwork": "twitter",
                "socialAction": "tweet",
                "socialTarget": "https://www.examplepetstore.com"
            }
        }
    } 
}
</script>
</amp-analytics>
[/sourcecode]

