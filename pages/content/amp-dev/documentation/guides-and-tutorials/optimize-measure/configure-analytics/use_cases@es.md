---
"$title": Casos de uso
"$order": '2'
description: 'Esta guía proporciona un conjunto de casos prácticos que se utilizan con frecuencia al realizar el seguimiento de las interacciones de los usuarios. NOTA: ¿Desea añadir algún otro caso? Póngase en contacto con nosotros.'
formats:
- websites
---

Esta guía presenta un conjunto de casos prácticos que se utilizan con frecuencia al realizar el seguimiento de las interacciones de los usuarios:

[tip type="note"] **NOTE –**  Want to add a use case? [Let us know.](https://github.com/ampproject/docs/issues/new) Or you can also contribute your own use cases, see [How to Contribute](../../../../documentation/guides-and-tutorials/contribute/index.md). [/tip]

## Seguimiento de las vistas de la página

Learn how to track page views using [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) and [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

### Con amp-pixel

Send pageview data to a specified URL using [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md):

```html
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
```

### Con amp-analytics (sin proveedor)

Send pageview data to a specified URL using [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

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

Send pageview data to Google Analytics (see also [Page tracking in Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)):

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

Learn how to track page clicks using [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), sending event data to a specified URL, and to [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Envío de datos a una URL específica

The following example uses the `selector` attribute to send a `click` event to the specified URL everytime a user clicks on a link (`<a href>`):

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

### Envío de datos a Google Analytics

En el siguiente ejemplo se utiliza el atributo `selector` del `trigger` para enviar un evento de `click` a Google Analytics cuando un elemento en particular recibe un clic (consulte también el artículo [Seguimiento de eventos AMP en Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

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

Haga un seguimiento del desplazamiento en la página utilizando [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). En el siguiente ejemplo se utiliza el atributo `scrollspec` para enviar un evento de `scroll` a la URL determinada cuando el usuario se desplaza de forma vertical por el 25%, 50% y 90% de la página. El evento también se activa cuando el usuario se desplaza de forma horizontal por la página hasta el 90% del ancho de `scroll`:

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

## Seguimiento de las interacciones sociales <a name="tracking-social-interactions"></a>

Obtenga información sobre cómo hacer seguimiento de las interacciones sociales utilizando [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), enviando los datos de eventos a una URL específica y a [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

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

The following example uses the `selector` attribute of the `trigger` to send an event when a particular social button is clicked (see also [AMP social interactions tracking in Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

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
