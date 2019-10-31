---
$title: Casistica
---

Questa guida offre una serie di tipologie di utilizzo comuni per seguire l’evoluzione del coinvolgimento degli utenti:

Vuoi aggiungere una tipologia di utilizzo?
[Comunicacelo.](https://github.com/ampproject/docs/issues/new)

Puoi anche contribuire condividendo la tua casistica personale,
scopri [Come dare il tuo contributo](../../../../documentation/guides-and-tutorials/contribute/index.md).

## Come monitorare le visualizzazioni di pagina

Scopri come monitorare le visualizzazioni di pagina tramite [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) e [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

### Uso di amp-pixel

Invia i dati sulla visualizzazione di pagina a un URL specifico utilizzando
[`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md):

```html
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
```

### Uso di amp-analytics - no vendor

Invia i dati sulla visualizzazione di pagina a un URL specifico utilizzando
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

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

### Uso di amp-analytics - googleanalytics

Invia i dati sulla visualizzazione di pagina a Google Analytics
(vedi anche [Monitoraggio delle pagine in Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)):

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

## Come monitorare i clic sulla pagina <a name="tracking-page-clicks"></a>

Scopri come monitorare i clic sulla pagina tramite
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md),
inviando dati eventi a un URL specifico e a
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Invio di dati a un URL specifico

Il seguente esempio utilizza l’attributo `selector` per inviare un evento `click`
all’URL specifico ogni volta che l’utente fa clic su un link (`<a href>`):

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

### Invio di dati a Google Analytics

Il seguente esempio utilizza l’attributo `selector` del `trigger`
per inviare un evento `click` a Google Analytics quando si fa clic su un determinato elemento
(vedi anche
[Monitoraggio degli eventi AMP in Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

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

## Come monitorare lo scorrimento delle pagine <a name="tracking-scrolling"></a>

Puoi eseguire il monitoraggio dello scorrimento delle pagine utilizzando [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).
Il seguente esempio utilizza l’attributo `scrollspec` per inviare un evento `scroll`
all’URL specifico quando l’utente scorre la pagina in verticale del 25%, 50% e 90%.
L’evento si attiva anche quando viene eseguito lo scorrimento in orizzontale
per il 90% della larghezza di `scroll`:

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

## Come monitorare le interazioni con i social network <a name="tracking-social-interactions"></a>

Scopri come monitorare le interazioni con i social network utilizzando
[`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md),
inviando dati eventi a un URL specifico e a
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Invio di dati a un URL specifico

Il seguente esempio utilizza l’attributo `selector` per inviare un evento `click`
all’URL specifico ogni volta che un utente fa clic su un tweet (`#tweet-link`):

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

### Invio di dati a Google Analytics

Il seguente esempio utilizza l’attributo `selector` del `trigger`
per inviare un evento quando si fa clic su un determinato pulsante dei social
(vedi anche
[Monitoraggio delle interazioni con i social network con AMP in Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

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
