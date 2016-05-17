---
layout: page
title: Inclure une image
order: 1
locale: fr
---

La plupart des balises HTML peuvent être utilisées directement dans AMP HTML, mais certaines, comme la balise `<img>`, sont remplacées par des balises équivalentes ou des balises AMP HTML personnalisées légèrement améliorées (et quelques balises problématiques sont purement interdites, voir les [balises HTML dans la spécification](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).

Pour découvrir à quoi ressemblerait un balisage supplémentaire, voici le code requis pour intégrer une image dans la page :

{% highlight html %}
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
{% endhighlight %}

Pour savoir pourquoi nous remplaçons les balises, telles que `<img>` par `<amp-img>`, et combien sont disponibles, accédez à [Inclure des iframes et des éléments multimédias](/docs/guides/amp_replacements.html).

{% include button.html title="Continuer à l'Étape 3" link="/docs/get_started/create/presentation_layout.fr.html" %}
