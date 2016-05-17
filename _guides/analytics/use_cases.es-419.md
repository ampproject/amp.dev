---
layout: page
title: Casos de uso
order: 2
locale: es-419
---

En esta guía se incluye un conjunto de casos de uso comunes para realizar un seguimiento de la captación de usuarios:

{% include toc.html %}

¿Quieres agregar un caso de uso? 
[Cuéntanos](https://github.com/ampproject/docs/issues/new).

También puedes aportar tus propios casos de uso;
consulta [Cómo contribuir](https://www.ampproject.org/docs/support/contribute.html).

## Seguimiento de vistas de página

Obtén información acerca de cómo realizar un seguimiento de las vistas de página usando `amp-pixel` y `amp-analytics`. 

### Con amp-pixel

Envía datos de vistas de página a una URL especificada usando
[amp-pixel](/docs/reference/amp-pixel.html):

{% highlight html %}
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
{% endhighlight %}

### Con amp-analytics (sin proveedor)

Envía datos de vistas de página a una URL especificada usando
[amp-analytics](/docs/reference/extended/amp-analytics.html):

{% highlight html %}
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
{% endhighlight %}

### Con amp-analytics (googleanalytics)

Envía datos de vistas de página a Google Analytics
(consulta también [Seguimiento de páginas en Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)): 

{% highlight html %}
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
{% endhighlight %}

## Seguimiento de clics en páginas

Obtén información acerca de cómo realizar un seguimiento de los clics en páginas usando
[amp-analytics](/docs/reference/extended/amp-analytics.html),
enviando datos de eventos a una URL especificada y a
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Envío de datos a URL especificadas

En el ejemplo siguiente se usa el atributo `selector` para enviar un evento `click`
a la URL especificada cada vez que un usuario hace clic en un vínculo (`<a href>`):

{% highlight html %}
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
{% endhighlight %}

### Envío de datos a Google Analytics

En el ejemplo siguiente se usa el atributo `selector` de `trigger`
para enviar un evento `click` a Google Analytics cuando se hace clic en un elemento específico
(consulta también
[Seguimiento de eventos de AMP en Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

{% highlight html %}
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
{% endhighlight %}

## Seguimiento del desplazamiento

Realiza un seguimiento del desplazamiento usando [amp-analytics](/docs/reference/extended/amp-analytics.html).
En el ejemplo siguiente se usa el atributo `scrollspec` para enviar un evento `scroll` 
a la URL especificada cuando la página se desplaza verticalmente un 25, un 50 y un 90%.
El evento también se activa cuando la página se desplaza horizontalmente
hasta el 90% del ancho de `scroll`:

{% highlight html %}
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
{% endhighlight %}

## Seguimiento de interacciones sociales

Obtén información acerca de cómo realizar un seguimiento de las interacciones sociales usando
[amp-analytics](/docs/reference/extended/amp-analytics.html)y
enviando datos de eventos a una URL especificada y a
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Envío de datos a URL especificadas

En el ejemplo siguiente se usa el atributo `selector` para enviar un evento `click`
a la URL especificada cada vez que un usuario hace clic en un tuit (`#tweet-link`):

{% highlight html %}
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
{% endhighlight %}

### Envío de datos a Google Analytics

En el ejemplo siguiente se usa el atributo `selector` de `trigger`
para enviar un evento cuando se hace clic en un botón específico de una red social
(consulta también
[Seguimiento de interacciones sociales de AMP en Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

{% highlight html %}
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
{% endhighlight %}
