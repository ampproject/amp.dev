---
'$title': Przypadki użycia
$order: 2
description: '"Niniejszy przewodnik zawiera zestaw typowych przypadków użycia śledzenia zaangażowania użytkowników: UWAGA — chcesz dodać przypadek użycia? Daj nam znać."'
formats:
  - websites
---

Niniejszy przewodnik zawiera zestaw typowych przypadków użycia śledzenia zaangażowania użytkowników:

[tip type="note"] **UWAGA —** chcesz dodać przypadek użycia? [Daj nam znać.](https://github.com/ampproject/docs/issues/new) Możesz też dodać własne przypadki użycia, patrz [Jak wnieść wkład](../../../../documentation/guides-and-tutorials/contribute/index.md). [/tip]

## Śledzenie odsłon

Dowiedz się, jak śledzić odsłony stron za pomocą składników [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md) i [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md).

### Użycie składnika `amp-pixel`

Wysyłaj dane odsłon na określony adres URL za pomocą składnika [`amp-pixel`](../../../../documentation/components/reference/amp-pixel.md):

```html
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
```

### Użycie składnika amp-analytics — bez dostawcy usług

Wysyłaj dane odsłon na określony adres URL za pomocą składnika [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md):

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

### Użycie składnika amp-analytics — googleanalytics

Wysyłaj dane odsłon do Google Analytics (patrz też [Śledzenie stron w Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)):

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

## Śledzenie kliknięć na stronie <a name="tracking-page-clicks"></a>

Dowiedz się, jak śledzić kliknięcia na stronie za pomocą składnika [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), wysyłając dane zdarzeń na określony adres URL oraz do [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Wysyłanie danych na określony adres URL

W poniższym przykładzie atrybut `selector` służy do wysyłania zdarzenia `click` na podany adres URL za każdym razem, gdy użytkownik kliknie link (`<a href>`):

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

### Wysyłanie danych do Google Analytics

W poniższym przykładzie atrybut `selector` właściwości `trigger` służy do wysyłania zdarzenia `click` do Google Analytics po kliknięciu określonego elementu (patrz też [ Śledzenie zdarzeń AMP w Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

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

## Śledzenie przewijania <a name="tracking-scrolling"></a>

Śledź przewijanie strony za pomocą składnhika [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md). W poniższym przykładzie atrybut `scrollspec` służy do wysyłania zdarzenia `scroll` na określony adres URL, gdy strona zostanie przewinięta w pionie o 25%, 50% i 90%. Zdarzenie jest generowane również w razie przewinięcia strony w poziomie do 90% szerokości atrybutu `scroll`:

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

## Śledzenie interakcji społecznościowych <a name="tracking-social-interactions"></a>

Dowiedz się, jak śledzić interakcje społecznościowe za pomocą składnika [`amp-analytics`](../../../../documentation/components/reference/amp-analytics.md), wysyłając dane zdarzeń na podany adres URL i do [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Wysyłanie danych na określony adres URL

W poniższym przykładzie atrybut `selector` służy do wysyłania zdarzenia `click` na podany adres URL za każdym razem, gdy użytkownik kliknie tweet (`#tweet-link`):

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

### Wysyłanie danych do Google Analytics

W poniższym przykładzie atrybut `selector` właściwości `trigger` służy do wysyłania zdarzenia po kliknięciu określonego przycisku portalu społecznościowego (patrz też [Śledzenie interakcji społecznościowych AMP w Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

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
