---
layout: page
title: Wat is AMP?
order: 0
locale: nl
---
<amp-youtube
    data-videoid="lBTCB7yLs8Y"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

AMP is een manier om webpagina's te bouwen voor statische content die snel kan worden weergegeven.
Wanneer AMP wordt uitgevoerd, bestaat dit uit drie delen:

{% include toc.html %}

**AMP HTML** is HTML met enkele beperkingen voor betrouwbare prestaties
en een aantal extensies voor de ontwikkeling van rijke content die verder gaat dan eenvoudige HTML.
De **AMP JS**-bibliotheek zorgt ervoor dat AMP HTML-pagina's snel worden weergegeven.
De pagina's worden geleverd door **Google AMP Cache** (optioneel).

## AMP HTML

AMP HTML is eenvoudige HTML uitgebreid met aangepaste AMP-eigenschappen.
Het eenvoudigste AMP HTML-bestand ziet er als volgt uit:

{% highlight html %}
<!doctype html>
<html ⚡>
 <head>
   <meta charset="utf-8">
   <link rel="canonical" href="hello-world.html">
   <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
   <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
 </head>
 <body>Hello World!</body>
</html>
{% endhighlight %}

Hoewel de meeste tags in een AMP HTML-pagina gewone HTML-tags zijn,
worden sommige HTML-tags vervangen door specifieke AMP-tags (zie ook
[HTML-tags in de AMP-specificatie](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).
Deze aangepaste elementen worden AMP HTML-componenten genoemd en
hiermee kunnen algemene patronen eenvoudig en optimaal worden geïmplementeerd.

De tag [`amp-img`](/docs/reference/amp-img.html) biedt bijvoorbeeld
volledige `srcset`-ondersteuning, zelfs in browsers die dit nog niet ondersteunen.
Meer informatie over [hoe u uw eerste AMP HTML-pagina maakt](/docs/get_started/create_page.html).

## AMP JS

De [AMP JS-bibliotheek] (https://github.com/ampproject/amphtml/tree/master/src) implementeert
alle [best practices van AMP] (/docs/get_started/technical_overview.html),
beheert het laden van bronnen en biedt u de bovengenoemde aangepaste tags
om ervoor te zorgen dat uw pagina snel wordt weergegeven.

Een van de grootste optimalisaties is het feit dat het alles wat van externe bronnen afkomstig is asynchroon maakt, zodat geen enkel element van de pagina de weergave van andere elementen kan blokkeren.

Andere prestatietechnieken zijn bijvoorbeeld het sandboxen van alle iframes, de voorberekening van de opmaak van elk element op de pagina voordat bronnen worden geladen en het uitschakelen van trage CSS-selectors.

Voor meer informatie over zowel de [optimalisaties] (/docs/get_started/technical_overview.html) als de beperkingen kunt u [de AMP HTML-specificatie lezen] (https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md).

## Google AMP Cache

Google AMP Cache is een op proxy's gebaseerd netwerk voor contentlevering
voor het leveren van alle geldige AMP-documenten.
U kunt hiermee AMP HTML-pagina's ophalen en de prestaties van de pagina automatisch verbeteren.
Als u Google AMP Cache gebruikt, worden alle JS-bestanden en alle afbeeldingen
geladen uit dezelfde bron, die gebruikmaakt van
[HTTP +6](https://http2.github.io/) voor maximale efficiëntie.

De cache beschikt tevens over een ingebouwd
[validatiesysteem](https://github.com/ampproject/amphtml/tree/master/validator)
waarmee wordt bevestigd dat de pagina gegarandeerd werkt
en dat de pagina niet afhankelijk is van externe bronnen.
Het validatiesysteem voert een aantal stellingen uit
om te bevestigen dat de opmaak van de pagina voldoet aan de AMP HTML-specificatie.

Een andere versie van de validatietool wordt bij elke AMP-pagina meegeleverd. In deze versie kunnen validatiefouten rechtstreeks worden vastgelegd in een logboek op de browserconsole als de pagina wordt weergegeven,
zodat u kunt zien hoe complexe wijzigingen in uw code
invloed kunnen hebben op de prestaties en gebruikerservaring.

Meer informatie over [het testen van uw AMP HTML-pagina's](/docs/guides/validate.html).
