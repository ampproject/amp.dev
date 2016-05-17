---
layout: page
title: Analytics&#58; de basis
order: 0
locale: nl
---

Start hier voor meer basisinformatie over AMP Analytics.

{% include toc.html %}

## Moet u amp-pixel of amp-analytics gebruiken?

AMP biedt twee componenten om aan uw behoeften op het gebied van analyseren en meten te voldoen:
[amp-pixel](/docs/reference/amp-pixel.html) en
[amp-analytics](/docs/reference/extended/amp-analytics.html).
Via beide opties worden analysegegevens naar een opgegeven eindpunt verstuurd.

Als u bepaald gedrag zoekt zoals een eenvoudige
[trackingpixel](https://en.wikipedia.org/wiki/Web_beacon#Implementation),
biedt het component `amp-pixel` basisacties voor het bijhouden van paginaweergaven.
Gegevens over paginaweergaven worden naar een opgegeven URL gestuurd.
Sommige integraties met leveranciers vragen mogelijk om dit component.
In dit geval geven ze het exacte URL-eindpunt op. 

Voor de meeste analyseoplossingen gebruikt u `amp-analytics`.
Het bijhouden van paginaweergaven werkt ook in `amp-analytics`.
Maar u kunt de betrokkenheid van gebruikers bijhouden met elk type paginacontent,
inclusief het aantal klikken op links en knoppen.
En u kunt meten toe hoever een gebruiker op de pagina scrolt,
of gebruikers betrokken zijn met sociale media en meer
(zie
[Uitgebreide informatie over AMP Analytics](/docs/guides/analytics/deep_dive_analytics.html)).

Als onderdeel van de integratie met het AMP-platform
bieden leveranciers vooraf gedefinieerde `amp-analytics`-configuraties
zodat u gegevens gemakkelijk kunt vastleggen en naar hun trackingtools kunt doorsturen.
U krijgt toegang tot de documentatie van leveranciers via de
[amp-analytics-specificatie](/docs/reference/extended/amp-analytics.html).

U kunt op uw pagina's zowel `amp-pixel` als `amp-analytics` gebruiken:
gebruik `amp-pixel` voor het eenvoudig bijhouden van paginaweergaven
en `amp-analytics` voor alle andere functies.
U kunt dezelfde tag ook meerdere malen toevoegen.
Als u met meerdere analyseproviders werkt,
heeft u één tag per oplossing nodig.
Onthoud dat eenvoudigere AMP-pagina's beter zijn voor gebruikers.
Als u dus geen extra tags nodig heeft, kunt u ze beter niet gebruiken.

## Maak een eenvoudige analyseconfiguratie

Ontdek hoe u een eenvoudige
[amp-pixel](/docs/reference/amp-pixel.html)- en
[amp-analytics](/docs/reference/extended/amp-analytics.html)-configuratie maakt.

### Eenvoudige amp-pixel-configuratie

Voor het maken van een eenvoudige `amp-pixel`-configuratie
voegt u iets aan de hoofdtekst van uw pagina toe, zoals het volgende:

{% highlight html %}
<amp-pixel src="https://foo.com/pixel?RANDOM"></amp-pixel>
{% endhighlight %}

In dit voorbeeld
worden de gegevens over de paginaweergaven verzonden naar de opgegeven URL, in combinatie met een willekeurig nummer.
De variabele `RANDOM` is een van de vele
[vervangingsvariabelen op het AMP-platform](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md).
Bekijk hier meer informatie over
[Vervanging van variabelen](/docs/guides/analytics/analytics_basics.html#variable-substitution).

Het component [amp-pixel](/docs/reference/amp-pixel.html)
is ingebouwd.
U hoeft dus geen insluitingsvermelding toe te voegen zoals u dat
voor de uitgebreide componenten van AMP zoals `amp-analytics` doet.
Plaats de tag `amp-pixel` echter wel zo dicht mogelijk
bij het begin van uw `<body>`.
De trackingpixel wordt alleen geactiveerd als de tag zelf in zicht komt.
Als u `amp-pixel` onder aan de pagina plaatst,
wordt deze mogelijk niet geactiveerd.

### Eenvoudige amp-analytics-configuratie

Voor het maken van een eenvoudige
[amp-analytics](/docs/reference/extended/amp-analytics.html)-configuratie
moet u eerst deze `custom-element`-vermelding toevoegen
in de `<head>` van het AMP-document (zie ook
[Vermelding over toevoeging aan document](/docs/reference/extended.html#component-inclusion-declaration)):

{% highlight html %}
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
{% endhighlight %}

Het volgende voorbeeld is vergelijkbaar met het [`amp-pixel`-voorbeeld](/docs/guides/analytics/analytics_basics.html#simple-amp-pixel-configuration).
Telkens wanneer een pagina zichtbaar is,
wordt de triggergebeurtenis geactiveerd en
worden de gegevens over de paginaweergaven naar een opgegeven URL verzonden, inclusief een willekeurige ID: 

{% highlight html %}
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview": "https://foo.com/pixel?RANDOM",
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

In het bovenstaande voorbeeld hebben we een verzoek met de naam 'pageview' gedefinieerd dat https://foo.com/pixel?RANDOM moet zijn. Zoals eerder vermeld, wordt RANDOM vervangen door een willekeurig nummer. Het verzoek zal er dus uiteindelijk uitzien als https://foo.com/pixel?0.23479283687235653498734.

Wanneer de pagina zichtbaar wordt
(zoals opgegeven door het gebruik van het triggerzoekwoord `visible`),
wordt er een gebeurtenis geactiveerd en wordt het `pageview`-verzoek verzonden.
Het kenmerk van de triggers bepaalt wanneer het verzoek voor paginaweergaven wordt geactiveerd.
Meer informatie over [verzoeken en triggers](/docs/guides/analytics/deep_dive_analytics.html#requests-triggers--transports).

## Vervanging van variabelen

Voor zowel het component [amp-pixel](/docs/reference/amp-pixel.html) als
[amp-analytics](/docs/reference/extended/amp-analytics.html)
kunnen alle standaard URL-variabelen worden vervangen (zie
[Vervanging van AMP HTML-variabelen](https://github.com/ampproject/amphtml/blob/master/spec/amp-var-substitutions.md)).
In het volgende voorbeeld
wordt het verzoek voor paginaweergaven naar de URL verzonden,
in combinatie met de canonieke URL van het huidige AMP-document, de titel en een
[klant-ID](/docs/guides/analytics/analytics_basics.html#user-identification).

{% highlight html %}
<amp-pixel src="https://example.com/analytics?url=${canonicalUrl}&title=${title}&clientId=${clientId(site-user-id)}"></amp-pixel>
{% endhighlight %}

Omdat de tag
`amp-pixel` zo eenvoudig is, kan deze alleen variabelen bevatten die door het platform zijn gedefinieerd
of die door de AMP-runtime kunnen worden geparseerd via de AMP-pagina.
In het bovenstaande voorbeeld
vult het platform de waarden in voor zowel
`canonicalURL` als `clientId(site-user-id)`.
De tag `amp-analytics` kan dezelfde variabelen bevatten als `amp-pixel`,
alsmede uniek gedefinieerde variabelen in de tagconfiguratie.

Gebruik de indeling `${varName}` in een verzoekreeks voor een pagina
of een door het platform gedefinieerde variabele.
De tag `amp-analytics` vervangt de sjabloon met de daadwerkelijke waarde
op het moment dat het analyseverzoek wordt gemaakt (zie ook
[Ondersteunde variabelen in amp-analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md)).

In het volgende `amp-analytics`-voorbeeld
wordt het verzoek voor paginaweergaven naar de URL verzonden
, in combinatie met aanvullende gegevens die afkomstig zijn uit vervangingen van variabelen;
enkele geleverd door het platform en
enkele intern gedefinieerd,
binnen de `amp-analytics`-configuratie:

{% highlight html %}
<amp-analytics>
<script type="application/json">
{
  "requests": {
    "pageview":"https://example.com/analytics?url=${canonicalUrl}&title=${title}&acct=${account}&clientId=${clientId(site-user-id)}",
  },
  "vars": {
    "account": "ABC123",
  },
  "triggers": {
    "someEvent": {
      "on": "visible",
      "request": "pageview",
      "vars": {
        "title": "My homepage",
      }
    }
  }  
}
</script>
</amp-analytics>
{% endhighlight %}

In het bovenstaande voorbeeld
worden de variabelen, `account` en `title`, gedefinieerd
in de `amp-analytics`-configuratie.
De variabelen `canonicalUrl` en `clientId` worden niet in de configuratie gedefinieerd.
Hun waarden worden dus door het platform vervangen.

**Belangrijk:** het vervangen van variabelen is flexibel:
u kunt dezelfde variabelen via verschillende locaties definiëren
en de AMP-runtime parseert de waarden op volgorde van prioriteit
(zie [Variabele vervangingsvolgorde](/docs/guides/analytics/deep_dive_analytics.html#variable-substitution-ordering)).

## Identificatie van gebruikers

Websites gebruiken cookies om informatie op te slaan die specifiek is voor een gebruiker in de browser.
Cookies kunnen worden gebruikt om aan te geven dat een website eerder door een gebruiker is bezocht.
In AMP
kunnen pagina's worden geopend via de website van een uitgever of via de cache
(zoals Google AMP Cache).
De website van de uitgever en de cache hebben waarschijnlijk verschillende domeinen.
Uit veiligheidsoverwegingen
kunnen (en zullen) browsers toegang tot cookies van een ander domein beperken
(zie ook
[Gebruikers bijhouden vanuit verschillende startpunten](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/cross-origin-tracking.md)).

Standaard
beheert AMP het verschaffen van een klant-ID, of de pagina nu wordt geopend via de oorspronkelijke website van de uitgever of via een cache.
De door AMP gegenereerde klant-ID heeft een waarde van `"amp-"`,
gevolgd door een willekeurig volgens `base64` gecodeerde tekenreeks. Deze waarde blijft hetzelfde
voor de gebruiker als diezelfde gebruiker de pagina weer bezoekt.

In alle gevallen beheert AMP de lees- en schrijfbewerkingen van de klant-ID.
Dit komt duidelijk naar voren in het geval een pagina wordt geopend
via een cache of op een andere manier buiten de weergavecontext
van de oorspronkelijke website van de uitgever wordt getoond.
In deze situatie is toegang tot de cookies van de website van de uitgever niet beschikbaar.

Wanneer een AMP-pagina wordt geopend via de website van een uitgever,
kan het klant-ID-kader dat door AMP wordt gebruikt op de hoogte worden gebracht van een vervangend cookie
om te zoeken en te gebruiken.
In dit geval
wordt het argument `cid-scope-cookie-fallback-name` van de variabele `clientId`
als de naam van het cookie beschouwd.
De indeling kan worden weergegeven als
`CLIENT_ID(cid-scope-cookie-fallback-name)` of als
`${clientId(cid-scope-cookie-fallback-name)}`.

Voorbeeld:

{% highlight html %}
<amp-pixel src="https://foo.com/pixel?cid=CLIENT_ID(site-user-id-cookie-fallback-name)"></amp-pixel>
{% endhighlight %}

Als AMP ontdekt dat dit cookie is ingesteld,
geeft de vervanging van de klant-ID de waarde van het cookie.
Als AMP ontdekt dat dit cookie niet is ingesteld,
genereert AMP een waarde in de vorm `amp-`, gevolgd door
een willekeurig volgens base64 gecodeerde tekenreeks.

Krijg meer informatie over vervanging van klant-ID's,
inclusief informatie over het toevoegen van een optionele gebruikersmelding-ID, in
[Ondersteunde variabelen in AMP Analytics](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/analytics-vars.md).
