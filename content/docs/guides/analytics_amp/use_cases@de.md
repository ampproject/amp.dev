---
$title: Anwendungsbeispiele
---

Diese Anleitung enthält eine Reihe von Anwendungsbeispielen für das Erfassen der Nutzerinteraktion:

[TOC]

Sie möchten ein Anwendungsbeispiel hinzufügen?
[Dann geben Sie uns Bescheid.](https://github.com/ampproject/docs/issues/new)

Unter [Beitrag leisten](https://www.ampproject.org/docs/support/contribute.html) erfahren Sie, wie Sie eigene Anwendungsbeispiele bereitstellen können.

## Seitenaufrufe erfassen

Erfahren Sie, wie Sie mittels `amp-pixel` und `amp-analytics` Seitenaufrufe erfassen.

### amp-pixel verwenden

Daten zu Seitenaufrufen mittels [amp-pixel](/docs/reference/amp-pixel.html) an eine angegebene URL senden:

[sourcecode:html]
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
[/sourcecode]

### amp-pixel verwenden – kein Anbieter

Daten zu Seitenaufrufen mittels [amp-analytics](/docs/reference/extended/amp-analytics.html) an eine angegebene URL senden:

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&amp;title=${title}&amp;acct=${account}"
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

### amp-analytics verwenden – googleanalytics

Daten zu Seitenaufrufen an Google Analytics senden (siehe auch [Seiten-Tracking in Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)):

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

## Seitenklicks erfassen

Erfahren Sie, wie Sie Seitenklicks mittels [amp-analytics](/docs/reference/extended/amp-analytics.html) erfassen und Ereignisdaten an eine angegebene URL und an [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/) senden können.

### Daten an eine angegebene URL senden

Im folgenden Beispiel wird mithilfe des `selector`-Attributs jedes Mal ein `click`-Ereignis an die angegebene URL gesendet, wenn ein Nutzer auf einen Link (`a href`) klickt:

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "event": "https://example.com/analytics?eid=${eventId}&amp;elab=${eventLabel}&amp;acct=${account}"
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

### Daten an Google Analytics senden

Im folgenden Beispiel wird mithilfe des `selector`-Attributs von `trigger` ein `click`-Ereignis an Google Analytics gesendet, wenn auf ein bestimmtes Element geklickt wird (siehe auch [AMP-Ereignis-Tracking in Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

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

## Scrollen erfassen

Sie können mittels [amp-analytics](/docs/reference/extended/amp-analytics.html) das Scrollen auf Seiten erfassen.
Im folgenden Beispiel wird mithilfe des `scrollspec`-Attributs ein `scroll`-Ereignis an die angegebene URL gesendet, wenn auf einer Seite vertikal um 25 %, 50 % und 90 % gescrollt wird.
Das Ereignis wird auch dann ausgelöst, wenn auf der Seite horizontal bis 90 % der `scroll`-Breite gescrollt wird:

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "event": "https://example.com/analytics?eid=${eventId}&amp;elab=${eventLabel}&amp;acct=${account}"
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

## Interaktionen über soziale Netzwerke erfassen

Erfahren Sie, wie Sie Interaktionen über soziale Netzwerke mittels [amp-analytics](/docs/reference/extended/amp-analytics.html) erfassen und Ereignisdaten an eine angegebene URL und an [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/) senden.

### Daten an eine angegebene URL senden

Im folgenden Beispiel wird mithilfe des `selector`-Attributs jedes Mal ein `click`-Ereignis an die angegebene URL gesendet, wenn ein Nutzer auf einen Tweet (`#tweet-link`) klickt:

[sourcecode:html]
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "event": "https://example.com/analytics?eid=${eventId}&amp;elab=${eventLabel}&amp;acct=${account}"
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

### Daten an Google Analytics senden

Im folgenden Beispiel wird mithilfe des `selector`-Attributs von `trigger` ein Ereignis gesendet, wenn auf ein bestimmtes Element geklickt wird (siehe auch [AMP-Tracking von Interaktionen über soziale Netzwerke in Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

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
