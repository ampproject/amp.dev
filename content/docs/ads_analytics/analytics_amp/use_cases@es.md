---
$title: Casos prácticos
$order: 2
toc: true
---
[TOC]

Esta guía presenta un conjunto de casos prácticos que se utilizan con frecuencia al realizar el seguimiento de las interacciones de los usuarios:

{% call callout('Nota', type='note') %} 
¿Quieres añadir algún otro caso? [Ponte en contacto con nosotros.](https://github.com/ampproject/docs/issues/new) También puedes enviar uno propio, consulta cómo hacerlo en [Contribuciones](https://www.ampproject.org/es/docs/support/contribute.html).
{% endcall %}

## Seguimiento de páginas vistas

Obtén información sobre cómo controlar las páginas vistas mediante `amp-pixel` y `amp-analytics`.

### Con amp-pixel

Envía los datos de páginas vistas a una URL específica mediante [amp-pixel](/es/docs/reference/amp-pixel.html):

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
[/sourcecode]

### Con amp-analytics (sin proveedor)

Envía los datos de páginas vistas a una URL específica mediante [amp-analytics](/es/docs/reference/extended/amp-analytics.html):

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

### Con amp-analytics (googleanalytics)

Envía los datos de páginas vistas a Google Analytics (consulta también [Seguimiento de páginas en Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)):

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

## Seguimiento de los clics en la página

Obtén información sobre cómo hacer seguimiento de los clics en la página mediante [amp-analytics](/es/docs/reference/extended/amp-analytics.html), enviando los datos de eventos a una URL específica y a [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Enviar datos a una URL específica

En el siguiente ejemplo se utiliza el atributo `selector` para enviar un evento de `click` a la URL especificada cada vez que un usuario hace clic en un enlace (`<a href>`):

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

### Enviar datos a Google Analytics

En el siguiente ejemplo se utiliza el atributo `selector` del `trigger` para enviar un evento de `click` a Google Analytics cuando un elemento en particular recibe un clic (consulta también [Seguimiento de eventos AMP en Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

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

## Seguimiento del desplazamiento

Realiza el seguimiento del desplazamiento en la página usando [amp-analytics](/es/docs/reference/extended/amp-analytics.html). En el ejemplo siguiente se utiliza el atributo `scrollspec` para enviar un evento de `scroll` a la URL determinada cuando el usuario se desplaza en vertical por el 25%, 50% y 90% de la página. El evento también se activa cuando el usuario se desplaza en horizontal por la página por el 90% del ancho de `scroll`:

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

## Seguimiento de interacciones sociales

Obtén información sobre cómo hacer seguimiento de las interacciones sociales usando [amp-analytics](/es/docs/reference/extended/amp-analytics.html), enviando los datos de eventos a una URL específica y a [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Enviar datos a una URL específica

En el siguiente ejemplo se utiliza el atributo `selector` para enviar un evento de `click` a la URL determinada cada vez que un usuario hace clic en un tuit (`#tweet-link`):

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

### Enviar datos a Google Analytics

En el ejemplo siguiente se utiliza el atributo `selector` del `trigger` para enviar un evento cuando se hace clic en el botón de una aplicación social (consulta también [Seguimiento de interacciones sociales AMP en Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

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

