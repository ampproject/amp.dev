---
'$title': Use Cases
$order: 2
description: '"Diese Anleitung enthält eine Reihe allgemeiner Use Cases zum Tracken von User Engagement. HINWEIS: Vermisst du einen Use Case? Schreibe uns."'
formats:
  - websites
---

Diese Anleitung enthält eine Reihe allgemeiner Use Cases zum Tracken von User Engagement:

[tip type="note"] **HINWEIS:**Vermisst du einen Use Case? [Schreibe uns.](https://github.com/ampproject/docs/issues/new) Du kannst auch deine eigenen Use Cases beitragen. Lies dir dazu den Abschnitt [So trägst du bei](../../../../documentation/guides-and-tutorials/contribute/index.md) durch. [/tip]

## Tracking von Seitenaufrufen

Hier lernst du, wie das Tracking von Seitenaufrufen mithilfe von [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) und [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) funktioniert.

### Verwendung von `amp-pixel`

Sende die Daten der Seitenaufrufe an eine bestimmte URL mittels [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md):

```html
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
```

### Verwendung von amp-analytics – ohne Anbieter

Sende die Daten der Seitenaufrufe an eine bestimmte URL mittels [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

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

### Verwendung von amp-analytics – googleanalytics

Sende die Daten der Seitenaufrufe an Google Analytics (siehe auch [Tracking von Seiten in Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)):

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

## Tracking von Klicks auf der Seite <a name="tracking-page-clicks"></a>

Hier lernst du, wie das Tracking von Klicks auf der Seite mithilfe von [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) sowie der Versand von Event Daten an eine bestimmte URL und an [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/) funktionieren.

### Daten an eine bestimmte URL senden

Das folgende Beispiel verwendet das Attribut `selector`, um ein `click` Event an eine bestimmte URL zu senden, sobald ein Benutzer einen Link anklickt (`<a href>`):

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

### Daten an Google Analytics senden

Im folgenden Beispiel wird das Attribut `selector` von `trigger` dazu verwendet, ein `click` Event an Google Analytics zu senden, wenn ein bestimmtes Element angeklickt wird (siehe auch [AMP Event Tracking in Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

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

## Scrolltracking <a name="tracking-scrolling"></a>

Das Scrollen auf Seiten kann mithilfe von [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) getrackt werden. Das folgende Beispiel verwendet das Attribut `scrollspec`, um ein `scroll` Event an die angegebene URL zu senden, wenn die Seite vertikal 25 %, 50 % und 90 % weit gescrollt wird. Das Event wird auch ausgelöst, wenn das horizontale Scrollen auf der Seite 90 % der `scroll` Breite erreicht:

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

## Tracking von sozialen Interaktionen <a name="tracking-social-interactions"></a>

Hier lernst du, wie das Tracking von sozialen Interaktionen mithilfe von [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md) sowie der Versand von Event Daten an eine bestimmte URL und an [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/) funktionieren.

### Daten an eine bestimmte URL senden

Das folgende Beispiel verwendet das Attribut `selector`, um ein `click` Event an eine bestimmte URL zu senden, sobald ein Benutzer einen Tweet anklickt (`#tweet-link`):

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

### Daten an Google Analytics senden

Im folgenden Beispiel wird das Attribut `selector` von `trigger` dazu verwendet, ein Event zu senden, wenn ein bestimmter Button eines sozialen Netzwerks angeklickt wird (siehe auch <a>Tracking von sozialen Interaktionen mit AMP in Google Analytics</a>):

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
