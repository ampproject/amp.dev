---
layout: page
title: Uw AMP HTML-pagina maken
order: 0
locale: nl
---

De volgende opmaak is een redelijk beginpunt of standaardtekst.
Kopieer deze opmaak en sla die op als een bestand met de extensie .html.

{% highlight html %}
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello, AMPs</title>
    <link rel="canonical" href="http://example.ampproject.org/article-metadata.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
{% endhighlight %}

De content in de hoofdtekst is tot dusver vrij standaard. Maar in de titel van de pagina staat een heleboel extra code die in eerste instantie misschien niet eens opvalt. Laten we de vereiste opmaak eens stap voor stap doornemen.

## Vereiste opmaak

Het volgende is VEREIST voor AMP HTML-documenten:

  - Ze moeten beginnen met het documenttype `<!doctype html>`.
  - Ze moeten de `<html ⚡>`-tag op het hoogste niveau bevatten (`<html amp>` wordt ook geaccepteerd).
  - Ze moeten de tags `<head>` en `<body>` bevatten (in HTML zijn deze optioneel).
  - In de titel moet de tag `<link rel="canonical" href="$SOME_URL" />` staan, die naar de gewone HTML-versie van het AMP HTML-document verwijst of naar zichzelf, als er geen HTML-versie bestaat.
  - Ze moeten de tag `<meta charset="utf-8">` bevatten als het eerste onderliggende element van hun hoofdtag.
  - De hoofdtag moet de tag `<meta name="viewport" content="width=device-width,minimum-scale=1">` bevatten. Het wordt ook aangeraden om initial-scale=1 in de tag op te nemen.
  - Als laatste element van de hoofdtag moeten ze de tag `<script async src="https://cdn.ampproject.org/v0.js"></script>` bevatten (hiermee wordt de AMP JS-bibliotheek ingesloten en geladen).
  - De `<head>`-tag moet het volgende bevatten:
    `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`

## Optionele metagegevens

Naast deze minimale vereisten bevat ons voorbeeld ook een definitie van Schema.org in de hoofdtag. Voor AMP is dit niet strikt noodzakelijk, maar het is wel een vereiste als u uw content naar bepaalde locaties wilt distribueren, bijvoorbeeld in de [demo van de nieuwscarrousel van Google Zoeken (proberen op uw telefoon)](https://g.co/ampdemo).

Voor meer informatie over alle metagegevens die u op verschillende locaties zoals Twitter nodig heeft, kunt u [onze voorbeelden bekijken](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples). Raadpleeg [Topverhalen met AMP](https://developers.google.com/structured-data/carousels/top-stories) voor meer specifieke informatie over AMP in Google Zoeken.

<hr>

Goed nieuws! Dat is alles wat u nodig heeft om uw eerste AMP-pagina te maken, maar er staat natuurlijk nog niets in de hoofdtekst. In het volgende hoofdstuk vertellen we u hoe u basiselementen zoals afbeeldingen en aangepaste AMP-elementen toevoegt, de stijl van uw pagina aanpast en een responsieve lay-out kunt creëren.

{% include button.html title="Doorgaan naar stap 2" link="/docs/get_started/create/include_image.nl.html" %}
