---
'$title': Casi di utilizzo
$order: 2
description: "Questa guida fornisce una serie di casi di utilizzo comuni per il monitoraggio dell'engagement degli utenti: NOTA - Vuoi aggiungere nuovi casi di utilizzo? Faccelo sapere."
formats:
  - websites
---

Questa guida offre una serie di tipologie di utilizzo comuni per seguire l’evoluzione del coinvolgimento degli utenti:

[tip type="note"] **NOTA –** Vuoi aggiungere una tipologia di utilizzo? <a>Comunicacelo.</a> Puoi anche contribuire condividendo la tua casistica personale, scopri <a>Come dare il tuo contributo</a>. [/tip]

## Come monitorare le visualizzazioni di pagina

Scopri come monitorare le visualizzazioni di pagina tramite [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) e [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

### Uso di amp-pixel

Invia i dati sulla visualizzazione di pagina a un URL specifico utilizzando [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md):

```html
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
```

### Uso di amp-analytics - no vendor

Invia i dati sulla visualizzazione di pagina a un URL specifico utilizzando [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

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

Invia i dati sulla visualizzazione di pagina a Google Analytics (vedi anche [Monitoraggio delle pagine in Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)):

```html
<amp-analytics type="googleanalytics" id="analytics1">
  <script type="application/json">
    {
      "vars": {
        "account": "UA-XXXXX-Y" // Replace with your property ID.
      },
      "triggers": {
        "trackPageview": {
          // Trigger names can be any string. trackPageview is not a required name.
          "on": "visible",
          "request": "pageview"
        }
      }
    }
  </script>
</amp-analytics>
```

## Come monitorare i clic sulla pagina <a name="tracking-page-clicks"></a>

Scopri come monitorare i clic sulla pagina tramite [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), inviando dati eventi a un URL specifico e a [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Invio di dati a un URL specifico

Il seguente esempio utilizza l’attributo `selector` per inviare un evento `click` all’URL specifico ogni volta che l’utente fa clic su un link (`<a href>`):

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

L'esempio seguente utilizza l'attributo `selector` del `trigger` per inviare un evento `click` a Google Analytics quando viene fatto clic su un particolare elemento (consulta anche la sezione [Tracciamento eventi AMP in Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

```html
<amp-analytics type="googleanalytics" id="analytics3">
  <script type="application/json">
    {
      "vars": {
        "account": "UA-XXXXX-Y" // Replace with your property ID.
      },
      "triggers": {
        "trackClickOnHeader": {
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

Monitora lo scorrimento della pagina utilizzando [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). L'esempio seguente utilizza l'attributo `scrollspec` per inviare un evento code3}scroll all'URL specificato quando la pagina viene fatta scorrere verticalmente del 25%, 50% e 90%. L'evento si attiva anche quando la pagina viene fatta scorrere orizzontalmente fino al 90% della larghezza di `scroll`:

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

Scopri come monitorare le interazioni con i social network utilizzando [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), inviando dati degli eventi a un URL specifico e a <a>Google Analytics</a>.

### Invio di dati a un URL specifico

Il seguente esempio utilizza l’attributo <code>selector</code> per inviare un evento `click` all’URL specificato ogni volta che un utente fa clic su un tweet (<code>#tweet-link</code>):

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

L'esempio seguente utilizza l'attributo `selector` del `trigger` per inviare un evento quando viene fatto clic su un particolare pulsante dei social network (consulta anche la sezione <a>Tracciamento interazioni social in Google Analytics</a>):

```html
<amp-analytics type="googleanalytics" id="analytics4">
  <script type="application/json">
    {
      "vars": {
        "account": "UA-XXXXX-Y" // Replace with your property ID.
      },
      "triggers": {
        "trackClickOnTwitterLink": {
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
