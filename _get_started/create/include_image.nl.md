---
layout: page
title: Een afbeelding invoegen
order: 1
locale: nl
---

De meeste HTML-tags kunnen rechtstreeks in AMP HTML worden gebruikt, maar bepaalde tags zoals de `<img>`-tag worden vervangen door vergelijkbare of enigszins aangepaste AMP HTML-tags (enkele problematische tags worden zelfs helemaal verbannen, zoals u kunt zien in [HTML-tags in de specificatie](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).

We tonen hier de code die nodig is om een afbeelding in te voegen op de pagina, om te laten zien hoe extra opmaak eruit zou kunnen zien:

{% highlight html %}
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
{% endhighlight %}

Ga naar [Iframes en media invoegen](/docs/guides/amp_replacements.html) voor meer informatie over waarom we tags zoals `<img>` vervangen door `<amp-img>` en hoeveel er beschikbaar zijn.

{% include button.html title="Doorgaan naar stap 3" link="/docs/get_started/create/presentation_layout.nl.html" %}
