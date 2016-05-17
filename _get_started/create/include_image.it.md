---
layout: page
title: Aggiunta di un’immagine
order: 1
locale: it
---

La maggior parte dei tag HTML può essere utilizzata direttamente in HTML AMP, tuttavia alcuni tag, come `<img>`, vengono sostituiti con tag HTML AMP personalizzati equivalenti o leggermente ottimizzati (inoltre alcuni tag problematici sono stati del tutto esclusi, vedi [Tag HTML nelle specifiche](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).

Per illustrare il possibile aspetto del markup supplementare, ecco il codice necessario per incorporare un’immagine nella pagina:

{% highlight html %}
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
{% endhighlight %}

Per capire perché stiamo sostituendo tag come `<img>` con `<amp-img>` e quanti di essi sono disponibili, vai alla sezione [Includere Iframe ed elementi multimediali](/docs/guides/amp_replacements.html).

{% include button.html title="Vai al Passaggio 3" link="/docs/get_started/create/presentation_layout.it.html" %}
