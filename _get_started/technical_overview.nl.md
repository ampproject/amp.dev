---
layout: page
title: Hoe AMP de prestaties versnelt
order: 2
locale: nl
---

Dankzij de combinatie van de volgende optimalisaties zijn AMP-pagina's zo snel dat het lijkt of ze direct worden geladen:

{% include toc.html %}

Liever luisteren dan lezen? Bekijk dan de volgende video van Malte Ubl, het hoofd van de technische afdeling van AMP, met daarin een vergelijkbaar overzicht als in de volgende paragrafen.

<amp-youtube
    data-videoid="hVRkG1CQScA"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

## Alleen asynchrone scripts toestaan

JavaScript is krachtig,
het kan worden gebruikt om vrijwel elk aspect van de pagina aan te passen,
maar het kan ook een DOM-constructie blokkeren en de weergave van pagina's vertragen
(zie ook [Interactiviteit toevoegen met JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript)).
AMP staat alleen asynchroon JavaScript toe
om te voorkomen dat JavaScript de weergave van pagina's vertraagt. 

AMP-pagina's mogen geen door auteurs geschreven JavaScript bevatten.
In plaats van JavaScript
te gebruiken, worden interactieve paginakenmerken verwerkt in aangepaste AMP-elementen.
De aangepaste AMP-elementen bevatten mogelijk wel JavaScript,
maar ze zijn zorgvuldig ontworpen om er zeker van te zijn dat ze niet voor verslechterde prestaties zorgen.

JavaScript van derden is wel toegestaan in iframes,
maar ze kunnen de weergave niet blokkeren.
Als JavaScript van derden bijvoorbeeld de 
[prestatieverslechterende `document.write`-API](http://www.stevesouders.com/blog/2012/04/10/dont-docwrite-scripts/) gebruikt,
wordt de weergave van de hoofdpagina niet geblokkeerd.

## De grootte van alle bronnen statisch bepalen

Externe bronnen zoals afbeeldingen, advertenties of iframes moeten hun grootte in de HTML opgeven,
zodat AMP de grootte en positie van elk element kan bepalen voordat bronnen worden gedownload.
AMP laadt de opmaak van de pagina zonder op het downloaden van bronnen te wachten.

AMP koppelt de opmaak van het document los van de opmaak van bronnen.
Er is slechts één HTTP-verzoek nodig om de opmaak van het hele document te bepalen
([+ lettertypen](#font-triggering-must-be-efficient)).
Aangezien AMP is geoptimaliseerd om dure herberekeningen van stijlen en opmaken in de browser te vermijden,
wordt de opmaak niet opnieuw bepaald wanneer bronnen worden geladen.

## Extensiemechanismen de weergave niet laten blokkeren

AMP staat niet toe dat extensiemechanismen de weergave van pagina's blokkeren.
AMP ondersteunt extensies voor zaken als 
[lightboxes](/docs/reference/extended/amp-lightbox.html),
[Instagram-invoegingen](/docs/reference/extended/amp-instagram.html),
[tweets](/docs/reference/extended/amp-twitter.html) etc.
Hoewel hiervoor extra HTTP-verzoeken nodig zijn,
blokkeren dergelijke verzoeken de pagina-opmaak en -weergave niet. 

Voor elke pagina die een aangepast script gebruikt, moet het AMP-systeem
weten dat deze pagina uiteindelijk een aangepaste tag zal bevatten.
Het script [`amp-iframe`](/docs/reference/extended/amp-iframe.html)
vertelt het systeem bijvoorbeeld dat er een `amp-iframe`-tag zal zijn.
AMP maakt het iframe-vak voordat bekend is wat er in dit vak komt te staan: 

{% highlight html %}
<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
{% endhighlight %}

## Alle JavaScript van derden uit het kritieke pad houden

Voor JavaScript van derden wordt vaak gebruikgemaakt van synchroon laden.
Ook `document.write` ze meer synchronisatiescripts.
Als u bijvoorbeeld vijf advertenties heeft en elke advertentie drie keer gesynchroniseerd wordt geladen
 met een verbinding met een vertraging van 1 seconde,
is er al sprake van een laadtijd van 18 seconden, en dan heeft u alleen nog maar JavaScript geladen. 

AMP-pagina's kunnen over JavaScript van derden beschikken, maar alleen in lege iframes.
Door JavaScript van derden uitsluitend in iframes te gebruiken, kan dit de uitvoering van de hoofdpagina niet blokkeren.
Zelfs als JavaScript van derden meerdere herberekeningen van de stijl activeert,
bevatten de gekoppelde minuscule iframes zeer weinig DOM. 

Herberekeningen van stijlen en opmaken zijn afhankelijk van de DOM-grootte.
De herberekeningen van het iframe zijn daarom erg snel vergeleken met
de herberekening van de stijlen en opmaak voor de pagina.

## Alle CSS moet intern zijn en zijn beperkt tot een bepaalde grootte

CSS blokkeert alle weergaven en het laden van pagina's. Ook raakt CSS vaak overvol.
In AMP HTML-pagina's zijn alleen interne stijlen toestaan.
Hiermee worden een of vaak meer HTTP-verzoeken verwijderd uit het kritieke weergavepad
, vergeleken met de meeste webpagina's.

De interne stylesheet heeft bovendien een maximale grootte van 50 kilobytes.
Hoewel dit groot genoeg is voor zeer uitgebreide pagina's,
wordt van de pagina-auteur nog steeds verwacht goed over CSS na te denken.

## De activering van lettertypen moet efficiënt zijn

Weblettertypen zijn enorm groot, dus
[optimalisatie van weblettertypen](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)
is van groot belang voor de prestaties.
Op een typische pagina met weinig synchronisatiescripts en een paar externe stylesheets
wacht de browser met het downloaden van lettertypen tot dit allemaal is uitgevoerd.

Het AMP-systeem kent nul HTTP-verzoeken totdat de lettertypen worden gedownload.
Dit is uitsluitend mogelijk omdat alle JavaScript in AMP het kenmerk async heeft
en alleen interne stylesheets zijn toegestaan;
er zijn geen HTTP-verzoeken die het downloaden van lettertypen in de browser blokkeren.

## De herberekening van stijlen minimaliseren

Telkens wanneer u iets meet, worden herberekeningen van de stijl geactiveerd. Deze zijn duur
omdat de browser de opmaak van de volledige pagina moet bepalen.
In AMP-pagina's vinden alle DOM-leesbewerkingen plaats voordat alle schrijfbewerkingen plaatsvinden.
Hierdoor profiteert u optimaal van één herberekening van de stijlen per frame.

Meer informatie over de impact van stijl- en opmaakherberekeningen op
[de prestaties tijdens de weergave](https://developers.google.com/web/fundamentals/performance/rendering/).

## Alleen door GPU versnelde animaties uitvoeren

De enige manier om snelle optimalisaties te krijgen, is ze uitvoeren via de GPU.
De GPU heeft kennis over lagen, weet hoe bepaalde acties op deze lagen moeten worden uitgevoerd,
kan ze verplaatsen en vervagen. De GPU kan echter niet de pagina-opmaak updaten.
Die taak wordt overgeheveld naar de browser en dat is een slechte zaak.

De regels voor CSS met betrekking tot animaties zorgen ervoor dat animaties met de GPU kunnen worden versneld.
Dit betekent specifiek dat AMP alleen animaties en overdrachten toestaat bij transformaties en doorzichtigheid
, zodat de pagina-opmaak niet is vereist.
Meer informatie over
[transformatie en doorzichtigheid voor wijzigingen in animaties](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count).

## Prioriteit geven aan het laden van bronnen

AMP regelt de download van alle bronnen: het geeft prioriteit aan het laden van bronnen,
laadt alleen wat nodig is en haalt vooraf traag ladende bronnen op. 

Wanneer AMP bronnen downloadt, worden downloads geoptimaliseerd
zodat de momenteel belangrijkste bronnen als eerste worden gedownload.
Afbeeldingen en advertenties worden alleen gedownload als de kans groot is dat ze door de gebruiker worden gezien,
boven de vouw, of als de kans groot is dat de gebruiker er snel naartoe scrolt.  

Ook haalt AMP van tevoren traag ladende bronnen op.
Bronnen worden zo laat mogelijk geladen, maar zo vroeg mogelijk vooraf opgehaald.
Op die manier laden items supersnel, maar wordt de CPU alleen gebruikt
als de bronnen daadwerkelijk aan gebruikers worden getoond.

## Pagina's in een mum van tijd laden

Er wordt veel gebruikgemaakt van de nieuwe [preconnect-API](http://www.w3.org/TR/resource-hints/#dfn-preconnect)
om ervoor te zorgen dat HTTP-verzoeken, nadat ze zijn gemaakt, zo snel mogelijk worden verwerkt.
Hierdoor
kan een pagina worden gegenereerd nog voordat de gebruiker nadrukkelijk meldt dat hij/zij naar die pagina willen navigeren.
Mogelijk is de pagina zelfs al beschikbaar op het moment dat de gebruiker de pagina daadwerkelijk selecteert.
Op die manier wordt de pagina direct geladen.

Hoewel het vooraf genereren op alle webcontent kan worden toegepast,
kan dit ook veel bandbreedte en CPU-kracht vergen. AMP is geoptimaliseerd om beide factoren te reduceren. Met vooraf genereren worden alleen bronnen boven de vouw gedownload.
Er worden geen elementen gegenereerd die mogelijk veel van de CPU vergen.

Wanneer AMP-documenten vooraf worden gegenereerd zodat ze meteen worden geladen,
worden alleen bronnen boven de vouw daadwerkelijk gedownload.
Wanneer AMP-documenten vooraf worden gegenereerd zodat ze meteen worden geladen,
worden bronnen die veel van de CPU vergen (zoals externe iframes) niet gedownload. 

Meer informatie over de reden
[waarom AMP HTML niet volledig van de vooraf ladende scanner profiteert](https://medium.com/@cramforce/why-amp-html-does-not-take-full-advantage-of-the-preload-scanner-7e7f788aa94e).

## Uw hulp is nodig om AMP sneller te maken
AMP is open-source.
Wij hebben uw hulp nodig om AMP nog sneller te maken.
Meer informatie over hoe u [een bijdrage kunt leveren](/docs/support/contribute.html).
