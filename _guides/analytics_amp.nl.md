---
layout: page
title: Analytics configureren
order: 5
folder: analytics
locale: nl
---

## Eerst beslissen, dan beginnen

Alle analyseoplossingen worden gebouwd op basis van uw kennis over de gegevens die u nodig heeft
en hoe u van plan bent die gegevens te analyseren. Voordat u begint, moet u eerst het volgende beslissen:

* Gaat u analysetools van derden gebruiken om de betrokkenheid van gebruikers te analyseren
of uw eigen interne oplossing?
* Welk gebruikersgedrag wilt u meten om de betrokkenheid van gebruikers te bepalen?

### Gaat u de gegevens naar uzelf of naar een leverancier verzenden?

Als u voor het meten van de betrokkenheid van gebruikers uw eigen interne oplossing gebruikt,
heeft u alleen een URL nodig om AMP Analytics in die oplossing te integreren.
Dit is de locatie waar u de gegevens naartoe verzendt.
U kunt ook gegevens naar verschillende URL's verzenden.
De gegevens over paginaweergaven kunt u bijvoorbeeld naar de ene URL verzenden
en gegevens over sociale betrokkenheid naar een andere URL.

AMP Analytics is speciaal ontworpen om eenmalig te meten en verslag uit te brengen bij velen.
Als u al met een of meer analyseleveranciers werkt,
controleert u de
[amp-analytics specificatie](/docs/reference/extended/amp-analytics.html)
om te zien of zij hun oplossing met AMP hebben geïntegreerd.
Als dit het geval is, hoeft u alleen maar een link naar hun documenten op te geven vanuit de specificatie
en de instructies op te volgen.

Als de analyseleverancier niet over een integratie met AMP beschikt,
vraag dan de leverancier om hulp.
We raden u ook aan [een probleem te melden in het AMP-project](https://github.com/ampproject/amphtml/issues/new)
met het verzoek de leverancier toe te voegen.
Zie ook
[Uw analysetools integreren in AMP HTML](https://github.com/ampproject/amphtml/blob/master/extensions/amp-analytics/integrating-analytics.md).

### Welke gegevens heeft u nodig?

Welke gegevens over uw gebruikers wilt u vastleggen om hun betrokkenheid te meten?
U moet deze gegevens identificeren voordat u ze kunt configureren.

Belangrijke punten om te overwegen:

* Wilt u alleen paginaweergaven bijhouden of ook extra patronen in het betrokkenheid van gebruikers
(zie ook [amp-pixel of amp-analytics](/docs/guides/analytics/analytics_basics.html#use-amp-pixel-or-amp-analytics))?
* Wat voor soort gegevens wilt u vastleggen over uw gebruikers, uw content,
het apparaat of de browser (zie ook [Vervanging van variabelen](/docs/guides/analytics/analytics_basics.html#variable-substition))?
* Hoe gaat u gebruikers identificeren (zie ook [Gebruikersidentificatie](/docs/guides/analytics/analytics_basics.html#user-identification))?
