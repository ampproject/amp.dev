---
$title: Inclure une image
---

La plupart des balises HTML peuvent être utilisées directement dans AMP HTML, mais certaines, comme la balise `<img>`, sont remplacées par des balises équivalentes ou des balises AMP HTML personnalisées légèrement améliorées (et quelques balises problématiques sont purement interdites, voir les [balises HTML dans la spécification]({{g.doc('/content/docs/fundamentals/spec.md', locale=doc.locale).url.path}})).

Pour découvrir à quoi ressemblerait un balisage supplémentaire, voici le code requis pour intégrer une image dans la page :

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

Pour savoir pourquoi nous remplaçons les balises, telles que `<img>` par `<amp-img>`, et combien sont disponibles, accédez à [Inclure des iframes et des éléments multimédias]({{g.doc('/content/docs/media/amp_replacements.md', locale=doc.locale).url.path}}).

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/docs/getting_started/create/basic_markup.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Précédent</span></a>
  <a class="button next-button" href="{{g.doc('/content/docs/getting_started/create/presentation_layout.md', locale=doc.locale).url.path}}"><span class="arrow-next">Prochain</span></a>
</div>
