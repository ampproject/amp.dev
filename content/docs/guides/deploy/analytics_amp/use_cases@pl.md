---
$title: Przykłady zastosowań
toc: true
---
[TOC]


W tym przewodniku przedstawiono szereg typowych przykładów zastosowań do monitorowania czynności użytkowników:

Chcesz dodać przykład zastosowania?
[Daj nam znać.](https://github.com/ampproject/docs/issues/new)

Możesz także zgłosić własne przykłady zastosowań;
zobacz [Jak dodać własne materiały](https://www.ampproject.org/docs/support/contribute.html).

## Monitorowanie wyświetleń stron

Dowiedz się, jak monitorować wyświetlenia strony przy użyciu elementów `amp-pixel` i `amp-analytics`.

### Używanie elementu amp-pixel

Wysyłanie danych żądania pageview na podany adres URL przy użyciu elementu
[amp-pixel](/docs/reference/amp-pixel.html):

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
[/sourcecode]

### Używanie elementu amp-analytics — bez dostawcy

Wysyłanie danych żądania pageview na podany adres URL przy użyciu elementu
[amp-analytics](/docs/reference/extended/amp-analytics.html):

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

### Używanie elementu amp-analytics — googleanalytics

Wysyłanie danych żądania pageview do usługi Google Analytics
(zobacz też [Monitorowanie stron w Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)):

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

## Monitorowanie kliknięć na stronie

Dowiedz się, jak monitorować kliknięcia na stronie przy użyciu elementu
[amp-analytics](/docs/reference/extended/amp-analytics.html)
oraz wysyłać dane zdarzenia na podany adres URL i do
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Wysyłanie danych na podany adres URL

W poniższym przykładzie atrybut `selector` jest używany do wysyłania zdarzenia `click`
na podany adres URL za każdym razem, gdy użytkownik kliknie link (`<a href>`):

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

### Wysyłanie danych do Google Analytics

W poniższym przykładzie atrybut `selector` elementu `trigger`
jest używany do wysyłania zdarzenia `click` do Google Analytics, kiedy konkretny element zostanie kliknięty
(zobacz też
[Monitorowanie zdarzeń AMP w Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

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

## Monitorowanie przewijania

Przewijanie strony można monitorować przy użyciu elementu [amp-analytics](/docs/reference/extended/amp-analytics.html).
W poniższym przykładzie atrybut `scrollspec` jest używany do wysyłania zdarzenia `scroll`
na podany adres URL, gdy strona zostanie przewinięta o 25%, 50% i 90%.
Zdarzenie jest wyzwalane także wtedy, gdy strona zostanie przewinięta w poziomie
do 90% szerokości przewijania (`scroll`):

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

## Monitorowanie interakcji społecznościowych

Dowiedz się, jak monitorować interakcje społecznościowe przy użyciu
elementu [amp-analytics](/docs/reference/extended/amp-analytics.html)
oraz wysyłać dane zdarzenia na podany adres URL i do
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Wysyłanie danych na podany adres URL

W poniższym przykładzie atrybut `selector` jest używany do wysyłania zdarzenia `click`
na podany adres URL za każdym razem, gdy użytkownik kliknie tweet (`#tweet-link`):

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

### Wysyłanie danych do Google Analytics

W poniższym przykładzie atrybut `selector` elementu `trigger`
jest używany do wysyłania zdarzenia, gdy użytkownik kliknie konkretny przycisk serwisu społecznościowego
(zobacz też
[Monitorowanie interakcji społecznościowych AMP w Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

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
