---
$title: Casos prácticos
---

Esta guía presenta un conjunto de casos prácticos que se utilizan con frecuencia al realizar el seguimiento de las interacciones de los usuarios:

[tip type="note"]
**NOTE –**  ¿Quieres añadir algún otro caso? [Ponte en contacto con nosotros.](https://github.com/ampproject/docs/issues/new) También puedes enviar uno propio, consulta cómo hacerlo en [Contribuciones](../../../../documentation/guides-and-tutorials/contribute/index.md).
[/tip]

## Seguimiento de páginas vistas

Obtén información sobre cómo controlar las páginas vistas mediante [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) y [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

### Con amp-pixel

Envía los datos de páginas vistas a una URL específica mediante [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md):

```html
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
```

### Con amp-analytics (sin proveedor)

Envía los datos de páginas vistas a una URL específica mediante [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

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

### Con amp-analytics (googleanalytics)

Envía los datos de páginas vistas a Google Analytics (consulta también [Seguimiento de páginas en Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)):

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

## Seguimiento de los clics en la página <a name="tracking-page-clicks"></a>

Obtén información sobre cómo hacer seguimiento de los clics en la página mediante [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), enviando los datos de eventos a una URL específica y a [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Enviar datos a una URL específica

En el siguiente ejemplo se utiliza el atributo `selector` para enviar un evento de `click` a la URL especificada cada vez que un usuario hace clic en un enlace (`<a href>`):

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

### Enviar datos a Google Analytics

En el siguiente ejemplo se utiliza el atributo `selector` del `trigger` para enviar un evento de `click` a Google Analytics cuando un elemento en particular recibe un clic (consulta también [Seguimiento de eventos AMP en Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

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

## Seguimiento del desplazamiento <a name="tracking-scrolling"></a>

Realiza el seguimiento del desplazamiento en la página usando [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). En el ejemplo siguiente se utiliza el atributo `scrollspec` para enviar un evento de `scroll` a la URL determinada cuando el usuario se desplaza en vertical por el 25%, 50% y 90% de la página. El evento también se activa cuando el usuario se desplaza en horizontal por la página por el 90% del ancho de `scroll`:

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

## Seguimiento de interacciones sociales <a name="tracking-social-interactions"></a>

Obtén información sobre cómo hacer seguimiento de las interacciones sociales usando [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), enviando los datos de eventos a una URL específica y a [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Enviar datos a una URL específica

En el siguiente ejemplo se utiliza el atributo `selector` para enviar un evento de `click` a la URL determinada cada vez que un usuario hace clic en un tuit (`#tweet-link`):

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

### Enviar datos a Google Analytics

En el ejemplo siguiente se utiliza el atributo `selector` del `trigger` para enviar un evento cuando se hace clic en el botón de una aplicación social (consulta también [Seguimiento de interacciones sociales AMP en Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

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
