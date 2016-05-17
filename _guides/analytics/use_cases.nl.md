---
layout: page
title: Gebruiksvoorbeelden
order: 2
locale: nl
---

In deze handleiding vindt u een reeks algemene gebruiksvoorbeelden voor het bijhouden van de betrokkenheid van gebruikers:

{% include toc.html %}

Wilt u een gebruiksvoorbeeld toevoegen? 
[Laat het ons weten.](https://github.com/ampproject/docs/issues/new)

U kunt ook uw eigen gebruiksvoorbeelden bijdragen.
Zie daarvoor het gedeelte [Een bijdrage leveren](https://www.ampproject.org/docs/support/contribute.html).

## Paginaweergaven bijhouden

Meer informatie over hoe u paginaweergaven kunt bijhouden met behulp van `amp-pixel` en `amp-analytics`. 

### amp-pixel gebruiken

Gegevens over paginaweergaven verzenden naar een specifieke URL met behulp van 
[amp-pixel](/docs/reference/amp-pixel.html):

{% highlight html %}
<amp-pixel src="https://foo.com/pixel?"></amp-pixel>
{% endhighlight %}

### amp-analytics gebruiken - geen leverancier

Gegevens over paginaweergaven verzenden naar een specifieke URL met behulp van 
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

### amp-analytics gebruiken - googleanalytics

Gegevens over paginaweergaven verzenden naar Google Analytics
(zie ook [Pagina's bijhouden in Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#page_tracking)): 

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

## Paginaklikken bijhouden

Ontdek hoe u paginaklikken kunt bijhouden met behulp van 
[amp-analytics](/docs/reference/extended/amp-analytics.html) en 
gegevens over gebeurtenissen verzendt naar een specifieke URL en naar 
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Gegevens verzenden naar een specifieke URL

In het volgende voorbeeld wordt het kenmerk `selector` gebruikt om een `click`-gebeurtenis 
te verzenden naar een specifieke URL wanneer een gebruiker op een link klikt(`<a href>`):

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

### Gegevens verzenden naar Google Analytics

In de volgende voorbeelden wordt het kenmerk `selector` van de `trigger`
gebruikt om een `click`-gebeurtenis te verzenden naar Google Analytics wanneer er op een specifieke gebeurtenis wordt geklikt
(zie ook
[AMP-gebeurtenissen bijhouden in Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#event_tracking)):

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

## Scrolbewegingen bijhouden

Houd bij hoe mensen door pagina's scrollen met behulp van [amp-analytics](/docs/reference/extended/amp-analytics.html).
In het volgende voorbeeld wordt het kenmerk `scrollspec` gebruikt om een `scroll`-gebeurtenis 
te verzenden naar de specifieke URL wanneer er verticaal met 25%, 50% en 90% wordt gescrold.
De gebeurtenis wordt ook geactiveerd wanneer iemand horizontaal
tot 90% van de `scroll`-breedte scrolt:

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

## Sociale interacties bijhouden

Ontdek hoe u sociale interacties kunt bijhouden met behulp van 
[amp-analytics](/docs/reference/extended/amp-analytics.html) en 
gegevens over gebeurtenissen verzendt naar een specifieke URL en naar 
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/).

### Gegevens verzenden naar een specifieke URL

In het volgende voorbeeld wordt het kenmerk `selector` gebruikt om een `click`-gebeurtenis
te verzenden naar de specifieke URL wanneer een gebruiker op een tweet klikt (#tweet-link):

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

### Gegevens verzenden naar Google Analytics

In het volgende voorbeeld wordt het kenmerk `selector` van de `trigger`
gebruikt om een gebeurtenis te verzenden wanneer er op een specifieke sociale knop wordt geklikt
(zie ook
[Sociale interacties in AMP bijhouden in Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/#social_interactions)):

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
