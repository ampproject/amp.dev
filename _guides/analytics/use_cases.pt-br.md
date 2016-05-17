---
layout: page
title: Casos de uso
order: 2
locale: pt-br
---

Este guia oferece um conjunto de casos de uso comuns para rastrear o envolvimento do usuário:

{% include toc.html %}

Deseja adicionar um caso de uso? 
[Entre em contato.](https://github.com/ampproject/docs/issues/new)

Você também pode colaborar com seus próprios casos;
consulte [Como colaborar](https://www.ampproject.org/docs/support/contribute.html).

## Rastrear visualizações de páginas

Saiba como rastrear visualizações de páginas usando `amp-pixel` e `amp-analytics`. 

### Usando amp-pixel

Envie dados de page view a um URL específico usando
[amp-pixel](/docs/reference/amp-pixel.html):

{% highlight html %}
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
{% endhighlight %}

### Usando amp-analytics - sem fornecedor

Envie dados de page view a um URL específico usando
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

### Usando amp-analytics - googleanalytics

Envie dados de page view ao Google Analytics
(veja também [Rastreamento de páginas no Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)): 

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

## Rastrear cliques de páginas

Saiba como rastrear cliques de páginas usando
[amp-analytics](/docs/reference/extended/amp-analytics.html),
envio de dados de evento a um URL específico e ao
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Envio de dados a um URL específico

O exemplo a seguir usa o atributo `selector` para enviar um evento de `click`
ao URL especificado todas as vezes que um usuário clicar em um link (`<a href>`):

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

### Envio de dados ao Google Analytics

O exemplo a seguir usa o atributo `selector` do `trigger`
para enviar um evento `click` ao Google Analytics quando um elemento específico é clicado
(veja também
[Rastreamento de eventos AMP no Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

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

## Rastrear rolagem

Rastreie a rolagem de páginas com [amp-analytics](/docs/reference/extended/amp-analytics.html).
O exemplo a seguir usa o atributo `scrollspec` para enviar um evento de `scroll`
ao URL especificado quando uma página é rolada verticalmente em 25%, 50% e 90%.
O evento também é acionado quando a página é rolada horizontalmente
em 90% da largura de `scroll`:

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

## Rastrear interações sociais

Saiba como rastrear interações sociais usando
[amp-analytics](/docs/reference/extended/amp-analytics.html),
enviando dados de evento para um URL específico e para o
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Envio de dados a um URL específico

O exemplo a seguir usa o atributo `selector` para enviar um evento de `click`
ao URL especificado todas as vezes que um usuário clicar em um tweet (`#tweet-link`):

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

### Envio de dados ao Google Analytics

O exemplo a seguir usa o atributo `selector` do `trigger`
para enviar um evento quando um botão específico de rede social é clicado
(veja também
[Rastreamento de interações sociais AMP no Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

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
