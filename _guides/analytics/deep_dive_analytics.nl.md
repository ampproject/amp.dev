---
layout: page
title: Uitgebreide informatie over AMP Analytics
order: 1
locale: nl
---

In deze handleiding vindt u uitgebreide informatie over 
[het onderdeel amp-analytics](/docs/reference/extended/amp-analytics.html),
aan de hand van een voorbeeld van een `amp-analytics`-configuratie met de volgende belangrijke bouwstenen:

{% include toc.html %}

In de rest van deze handleiding wordt dit configuratievoorbeeld,
waarbij de paginaweergaven en het aantal klikken van gebruikers op links wordt bijgehouden,
gebruikt en worden de analysegegevens naar de externe provider,
[Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/), gestuurd:

{% highlight html %}
<amp-analytics type="googleanalytics" config="https://example.com/analytics.account.config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
    "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
  },
  "vars": {
    "account": "ABC123"
  },
  "extraUrlParams": {
    "cd1": "AMP"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    },
    "trackAnchorClicks": {
      "on": "click",
      "selector": "a",
      "request": "event",
      "vars": {
        "eventId": "42",
        "eventLabel": "clicked on a link"
      }
    }
  },
  'transport': {
    'beacon': false,
    'xhrpost': false,
    'image': true
  }
}
</script>
</amp-analytics>
{% endhighlight %}

**Opmerking:** de bovenstaande voorbeeldcode is bedoeld als hulpmiddel, maar deze is geenszins een realistisch voorbeeld. Als u met analyseproviders werkt, is de kans groot dat de daadwerkelijke configuratie niet op het bovenstaande voorbeeld lijkt; configuraties van providers zijn sterk vereenvoudigd. Raadpleeg de documentatie van uw analyseprovider voor voorbeeldconfiguraties.

## Waar moeten de analysegegevens worden verzonden: het kenmerk type

Volgens het ontwerp kan AMP twee gangbare patronen in de gegevensverzameling ondersteunen:

* Invoeging in een eindpunt waarvan de uitgever zelf eigenaar is, voor interne analysesystemen.
* Invoeging in een eindpunt waarvan de leverancier eigenaar is, om te kunnen werken met een oplossing van die leverancier
(bijvoorbeeld [Adobe Analytics](https://helpx.adobe.com/marketing-cloud/analytics.html), [Chartbeat](http://support.chartbeat.com/docs/) of [Google Analytics](https://developers.google.com/analytics/devguides/collection/amp-analytics/)).

Als u analysegegevens naar de analyseprovider verzendt,
voegt u ook het kenmerk `type` in bij de tag `amp-analytics` en stelt u de waarde in
op de juiste leveranciers, zoals wordt gedefinieerd in de 
[amp-analytics-specificatie](/docs/reference/extended/amp-analytics.html).  

Voorbeeld: `<amp-analytics type="googleanalytics">` stuurt analysegegevens
naar de externe analyseprovider, Google Analytics.
Als u gegevens wilt versturen naar een eindpunt waarvan de uitgever eigenaar is,
laat u gewoon het kenmerk `type` weg;
de analysegegevens worden verstuurd naar de gedefinieerde eindpunten voor elk
[verzoek](/docs/guides/analytics/deep_dive_analytics.html#what-data-gets-sent-requests-attribute).

Configuraties van analyseleveranciers bieden een snelle manier
om met `amp-analytics` aan de slag te gaan.
Raadpleeg de documentatie en
hulpbronnen van uw leverancier voor meer hulp.
Zoals eerder genoemd,
kunt u de lijst met leveranciers die al over een AMP-integratie beschikken en de links
naar hun specifieke documentatie vinden in de
[amp-analytics-specificatie](/docs/reference/extended/amp-analytics.html). 

Als u een analyseleverancier bent, kunt u 
meer lezen over
[integratie van uw eigen analyseconfiguratie in AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

## Externe configuratie laden: het kenmerk config

U hoeft niet alle configuratie
voor `amp-analytics` op uw AMP-pagina in te sluiten.
In plaats daarvan kunt u een externe URL gebruiken
voor alle of een deel van de configuraties.

Hierdoor kunt u bijvoorbeeld de configuratie variëren
op basis van een specifiek verzoek.
Als u als uitgever controle over het externe bestand heeft,
kunt u alle eventueel noodzakelijke verwerking op de server uitvoeren
om de configuratiegegevens op te bouwen.
 
De eerste stap bij het laden van externe configuraties betreft
het insluiten van het kenmerk config in de tag `amp-analytics`:

{% highlight html %}
<amp-analytics config="https://example.com/analytics.account.config.json">
{% endhighlight %}

De volgende stap is het maken van de JSON-content die via de externe URL wordt verkregen.
In dit eenvoudige voorbeeld
is de configuratie in het JSON-object simpelweg de variabele waarde voor het Analytics-account.

Voorbeeldcontent in `https://example.com/analytics.account.config.json`:

{% highlight html %}
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  }
}
{% endhighlight %}

Bij de laatste stap moet u ervoor zorgen dat de content van het externe bestand
naar de juiste plaats in de `amp-analytics`-configuratie wordt overgebracht.
In de hier getoonde verzoeken `pageview` en `event`
wordt de variabele waarde voor `account` automatisch ingesteld
op de accountwaarde in de externe URL (`"account": "UA-XXXXX-Y"`):

{% highlight html %}
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
{% endhighlight %}

**Belangrijk:** AMP voert geen validatie uit indien dezelfde variabele meerdere keren wordt gebruikt.
Waarden worden ingevuld naar aanleiding van een variabele voorkeursvolgorde
en waarden in externe URL's staan boven aan die volgorde 
(zie [Variabele vervangingsvolgorde](/docs/guides/analytics/deep_dive_analytics.html#variable-substitution-ordering)).

## Verzoeken, triggers en transport

Het kenmerk `requests` definieert welke gegevens worden verzonden
(zoals `pageviews`, `events`)
en naar welke locatie de gegevens worden verzonden (de URL's die zijn gebruikt om gegevens te verzenden).

Het kenmerk `triggers` beschrijft wanneer analysegegevens moeten worden verzonden,
bijvoorbeeld zodra een gebruiker een pagina bekijkt of op een link klikt. 

Met het kenmerk `transport` wordt aangegeven hoe een verzoek,
of specifieker: het protocol moet worden verzonden. 

Lees verder voor meer informatie over deze configuraties.
(U vindt meer informatie over deze configuraties in de 
[amp-analytics-referentie](/docs/reference/extended/amp-analytics.html).)

### Welke gegevens worden verzonden: het kenmerk requests

De `request-name` wordt gebruikt in de triggerconfiguratie om aan te geven
welk verzoek moet worden verzonden als reactie op een specifieke gebeurtenis.
De `request-value` is een `https`-URL.
Deze waarden kunnen tijdelijke aanduidingen bevatten
die naar andere verzoeken of variabelen kunnen verwijzen.

{% highlight html %}
"requests": {
  "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}",
  "event": "https://example.com/analytics?eid=${eventId}&elab=${eventLabel}&acct=${account}"
}
{% endhighlight %}

Sommige analyseproviders (waaronder Google Analytics)
hebben al configuratie verschaft,
die u kunt gebruiken via het kenmerk `type`.
Als u gebruikmaakt van een analyseprovider,
hoeft u de `requests`-informatie mogelijk niet in te sluiten.
Raadpleeg de documentatie van uw leverancier om erachter te komen
of `requests` moet worden geconfigureerd en hoe.

#### Extra verzoek-URL: Extra URL-parameters

Het kenmerk [extraUrlParams](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/amp-analytics.md#extra-url-params)
geeft extra parameters aan die aan de queryreeks van de verzoek-URL moeten worden toegevoegd via de gebruikelijke conventie '&foo=baz'.

`amp-analytics` voegt bijvoorbeeld een extra parameter <code>cd1</code>
toe aan het verzoek en stelt de parameterwaarde in op 'AMP':

{% highlight html %}
  "extraUrlParams": {
    "cd1": "AMP"
  }
{% endhighlight %}

### Wanneer gegevens worden verzonden: het kenmerk triggers

Het kenmerk `triggers` beschrijft wanneer een analyseverzoek moet worden verzonden.
Het bevat het sleutel-waardepaar trigger-name en trigger-configuration.
De triggernaam kan elke willekeurige tekenreeks zijn bestaande
uit alfanumerieke tekens (a-zA-Z0-9). 

Het volgende
`amp-analytics`-element is bijvoorbeeld geconfigureerd om een verzoek te sturen naar
`https://example.com/analytics` wanneer het document voor de eerste keer wordt geladen
en telkens wanneer er op de tag `a` wordt geklikt:

{% highlight html %}
"triggers": {
  "trackPageview": {
    "on": "visible",
    "request": "pageview"
  },
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
{% endhighlight %}

AMP ondersteunt de volgende triggerconfiguraties:

<table>
  <thead>
    <tr>
      <th data-th="Trigger Config" class="col-thirty">Configuratie activeren</th>
      <th data-th="Description">Beschrijving</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Trigger Config"><code>on</code> (vereist)</td>
      <td data-th="Description">De gebeurtenis waarop moet worden gelet. De geldige waarden zijn <code>click</code>, <code>scroll</code>, <code>timer</code> en <code>visible</code>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>request</code> (vereist)</td>
      <td data-th="Description">De naam van het te verzenden verzoek (zoals is opgegeven bij de <a href="/docs/guides/analytics/deep_dive_analytics.html#what-data-gets-sent-requests-attribute">verzoeken</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>vars</code></td>
      <td data-th="Description">Een object dat de sleutel-waardeparen bevat die worden gebruikt om <code>vars</code> (gedefinieerd in de configuratie op het hoogste niveau) te overschrijven, of om <code>vars</code> (uniek voor deze trigger) op te geven (zie ook <a href="/docs/guides/analytics/deep_dive_analytics.html#variable-substitution-ordering">Variabele vervangingsvolgorde</a>).</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>selector</code> (vereist wanneer <code>on</code> is ingesteld op <code>click</code>)</td>
      <td data-th="Description">Er wordt een CSS-selector gebruikt om te verfijnen welke elementen moeten worden bijgehouden. Gebruik de waarde <code>*</code> om alle elementen bij te houden. Deze configuratie wordt gebruikt in combinatie met de <code>click</code>-trigger. Meer informatie over hoe u de selector gebruikt om <a href="/docs/guides/analytics/use_cases.html#tracking-page-clicks">paginaklikken</a> en <a href="/docs/guides/analytics/use_cases.html#tracking-social-interactions">sociale interacties</a> bij te houden.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>scrollSpec</code> (vereist wanneer <code>on</code> is ingesteld op <code>scroll</code>)</td>
      <td data-th="Description">Hiermee wordt geregeld onder welke voorwaarden de <code>scroll</code>-gebeurtenis wordt geactiveerd wanneer er door de pagina wordt gescrold. Dit object kan <code>verticalBoundaries</code> en <code>horizontalBoundaries</code> bevatten. Ten minste een van de twee eigenschappen is vereist voordat een <code>scroll</code>-gebeurtenis wordt geactiveerd. De waarden voor beide eigenschappen moeten een reeks getallen zijn die de grenzen bevatten waarbinnen een scrolgebeurtenis wordt gegenereerd. Bekijk dit voorbeeld over <a href="/docs/guides/analytics/use_cases.html#tracking-scrolling">het bijhouden van scrolbewegingen</a>.</td>
    </tr>
    <tr>
      <td data-th="Trigger Config"><code>timerSpec</code> (vereist wanneer <code>on</code> is ingesteld op <code>timer</code>)</td>
      <td data-th="Description">Bepaalt wanneer de gebeurtenis <code>timer</code> wordt geactiveerd. De timer wordt meteen geactiveerd en daarna steeds met een opgegeven interval. Deze configuratie wordt gebruikt in combinatie met de <code>timer</code>-trigger.</td>
    </tr>
  </tbody>
</table>

**Belangrijk:** triggers van een configuratie met een lagere prioriteit worden overschreven
door triggers met dezelfde namen van een configuratie met een hogere prioriteit
(zie [Variabele vervangingsvolgorde](/docs/guides/analytics/deep_dive_analytics.html#variable-substitution-ordering)).

### Hoe worden gegevens verzonden: het kenmerk transport

Het kenmerk `transport` geeft aan hoe een verzoek moet worden verzonden.
Standaard zijn de volgende drie methoden ingeschakeld:

<table>
  <thead>
    <tr>
      <th data-th="Transport Method" class="col-thirty">Transportmethode</th>
      <th data-th="Description">Beschrijving</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Transport Method"><code>beacon</code></td>
      <td data-th="Description">Geeft aan dat <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon">navigator.sendBeacon</a> kan worden gebruikt om het verzoek te verzenden. Hiermee wordt een <code>POST</code>-verzoek verzonden, met inloggegevens en een lege hoofdtekst.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>xhrpost</code></td>
      <td data-th="Description">Geeft aan dat <code>XMLHttpRequest</code> kan worden gebruikt om het verzoek te verzenden. Hiermee wordt een <code>POST</code>-verzoek verzonden, met inloggegevens en een lege hoofdtekst.</td>
    </tr>
    <tr>
      <td data-th="Transport Method"><code>image</code></td>
      <td data-th="Description">Geeft aan dat het verzoek kan worden verzonden door de tag <code>Image</code> te genereren. Hiermee wordt een <code>GET</code>-verzoek verzonden.</td>
    </tr>
  </tbody>
</table>

Er wordt maar één transportmethode gebruikt.
Dit is de methode met de hoogste prioriteit
die is ingeschakeld, is toegestaan en beschikbaar is.
De prioriteit is `beacon` > `xhrpost` > `image`.
Als de user-agent van de klant geen methode ondersteunt,
wordt de ingeschakelde methode met de op één na hoogste voorkeur gebruikt. 

Voeg het kenmerk `transport` alleen toe aan uw configuratie
als u het aantal transportopties wilt beperken.
In andere gevallen kunt u verzoeken stoppen.

In het onderstaande voorbeeld
zijn `beacon` en `xhrpost` ingesteld op 'niet waar'.
Ze worden dus niet gebruikt, hoewel ze wel een hogere prioriteit hebben dan `image`.
Als de user-agent van de klant de methode `image` ondersteunt,
wordt deze gebruikt. In andere gevallen worden er geen verzoeken verzonden.

{% highlight html %}
'transport': {
  'beacon': false,
  'xhrpost': false,
  'image': true
}
{% endhighlight %}

## Variabele vervangingsvolgorde

AMP voert bij de variabelen waarden in op volgorde van prioriteit:

1. Externe configuraties (via `config`).
2. `vars` genest in een trigger in `triggers`.
3. `vars` op het hoogste niveau genest in `amp-analytics`.
4. Waarden van het platform.

In dit voorbeeld is er een externe configuratie
en zijn er variabelen gedefinieerd op het hoogste niveau, in triggers en op het platformniveau:

{% highlight html %}
<amp-analytics config="http://example.com/config.json">
<script type="application/json">
{
  "requests": {
    "pageview": "https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(cid-scope)}",
  },
  "vars": {
    "account": "ABC123",
    "title": "Homepage"
  },
  "triggers": {
    "some-event": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
        "clientId": "my user"
      }
  }
}
</script>
</amp-analytics>
{% endhighlight %}

Wanneer dezelfde `var` op meerdere locaties is gedefinieerd,
stelt de variabele prioriteitsvolgorde de waarde eenmalig in.
Met andere woorden: als de externe configuratie `account` definieert als UA-XXXXX-Y in het bovenstaande voorbeeld,
zijn de waarden van verschillende vars als volgt:

<table>
  <thead>
    <tr>
      <th data-th="var" class="col-thirty"><code>var</code></th>
      <th data-th="Value">Waarde</th>
      <th data-th="Defined By" class="col-thirty">Gedefinieerd door</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="var"><code>canonicalUrl</code></td>
      <td data-th="Value"><code>http://example.com/path/to/the/page</code></td>
      <td data-th="Defined By">Platform</td>
    </tr>
    <tr>
      <td data-th="var"><code>title</code></td>
      <td data-th="Value">My homepage</td>
      <td data-th="Defined By">Trigger</td>
    </tr>
    <tr>
      <td data-th="var"><code>account</code></td>
      <td data-th="Value"><code>UA-XXXXX-Y</code></td>
      <td data-th="Defined By">Externe configuratie</td>
    </tr>
    <tr>
      <td data-th="var"><code>clientId</code></td>
      <td data-th="Value">my user</td>
      <td data-th="Defined By">Trigger</td>
    </tr>
  </tbody>
</table>
