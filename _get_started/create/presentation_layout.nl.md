---
layout: page
title: Presentatie en opmaak aanpassen
order: 2
locale: nl
---

## De presentatie aanpassen

AMP's zijn webpagina's. Als u de stijl van de pagina en de pagina-elementen wilt bewerken, moet u hiervoor algemene CSS-eigenschappen gebruiken. Stijlelementen die klasse- of elementselectors gebruiken in een ingebouwde stylesheet in de `<head>`, ook wel `<style amp-custom>` genoemd:

{% highlight html %}
<style amp-custom>
  /* any custom style goes here */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>
{% endhighlight %}

Elke AMP-pagina kan maar één ingebouwde stylesheet bevatten en er zijn bepaalde selectors die u niet mag gebruiken. [Meer informatie over stijl](/docs/guides/responsive/style_pages.html).

## De opmaak bewerken

AMP volgt strengere regels wat de opmaak van elementen op de pagina betreft. Op een normale HTML-pagina gebruikt u vrijwel uitsluitend CSS voor de opmaak van elementen. Maar met het oog op de prestaties moet in AMP voor alle elementen vanaf het begin een expliciet formaat worden ingesteld.

Ontdek hoe AMP een pagina weergeeft en opmaakt, en hoe u de opmaak kunt aanpassen in [De opmaak bewerken](/docs/guides/responsive/control_layout.html).

{% include button.html title="Doorgaan naar stap 4" link="/docs/get_started/create/preview_and_validate.nl.html" %}
