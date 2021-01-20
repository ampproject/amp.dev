---
"$title": Use cases
"$order": '2'
description: 'Este guia mostra um conjunto de casos de uso comuns do rastreamento de engajamento do usuário: OBSERVAÇÃO – Quer adicionar um caso de uso? Fale conosco.'
formats:
- websites
---

Este guia mostra um conjunto de casos de uso comuns do rastreamento de engajamento do usuário:

[tip type="note"] <strong>OBSERVAÇÃO –</strong> Quer adicionar um caso de uso? [Fale conosco.](https://github.com/ampproject/docs/issues/new) Você também pode enviar seus próprios casos de uso. Veja [como contribuir](../../../../documentation/guides-and-tutorials/contribute/index.md).[/tip]

## Rastrear visualizações de página

Saiba como rastrear visualizações de página usando [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) e [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

### Como usar amp-pixel

Envie dados de visualização de página a um URL especificado usando [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md):

```html
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
```

### Como usar amp-analytics – sem fornecedor

Envie dados de visualização de página a uma URL especificada usando [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

```html
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
```

### Como usar amp-analytics – googleanalytics

Envie dados de visualização de página ao Google Analytics. Veja também como funciona o [rastreamento de páginas no Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking):

```html
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
```

## Rastrear cliques na página <a name="tracking-page-clicks"></a>

Saiba como rastrear cliques na página usando [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) e enviando dados de eventos a uma URL especificada e ao [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Como enviar dados a uma URL especificada

O exemplo a seguir usa o atributo `selector` para enviar um evento `click` à URL especificada sempre que um usuário clica em um link (`<a href>`):

```html
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
```

### Como enviar dados ao Google Analytics

O exemplo a seguir usa o atributo `selector` do `trigger` para enviar um evento `click` ao Google Analytics quando um elemento específico recebe um clique. Veja também o [rastreamento de eventos de AMP no Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking):

```html
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
```

## Como rastrear a rolagem de página <a name="tracking-scrolling"></a>

Rastreie a rolagem de página usando [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). O exemplo a seguir usa o atributo `scrollspec` para enviar um evento `scroll` à URL especificada quando um usuário rola 25%, 50% e 90% da página verticalmente. O evento também é acionado pela rolagem horizontal de 90% da largura de `scroll`:

```html
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
```

## Como rastrear interações em redes sociais <a name="tracking-social-interactions"></a>

Saiba como rastrear interações em redes sociais usando [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) e enviando dados de eventos a um URL especificado e ao [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Como enviar dados a uma URL especificada

O exemplo a seguir usa o atributo `selector` para enviar um evento `click` à URL especificada sempre que um usuário clica em um tweet (`#tweet-link`):

```html
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
```

### Como enviar dados ao Google Analytics

O exemplo a seguir usa o atributo `selector` do `trigger` para enviar um evento sempre que um botão específico de redes sociais recebe um clique. Veja também o [rastreamento de interações em redes sociais nas AMP no Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions):

```html
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
```
