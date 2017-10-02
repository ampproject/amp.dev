---
$title: Inclure une image
---

La plupart des balises HTML peuvent être utilisées directement dans AMP HTML, mais certaines, comme la balise `<img>`, sont remplacées par des balises équivalentes ou des balises AMP HTML personnalisées légèrement améliorées (et quelques balises problématiques sont purement interdites, voir les [balises HTML dans la spécification](/fr/docs/reference/spec.html)).

Pour découvrir à quoi ressemblerait un balisage supplémentaire, voici le code requis pour intégrer une image dans la page :

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

Pour savoir pourquoi nous remplaçons les balises, telles que `<img>` par `<amp-img>`, et combien sont disponibles, accédez à [Inclure des iframes et des éléments multimédias](/fr/docs/guides/amp_replacements.html).

<div class="prev-next-buttons">
  <a class="button prev-button" href="/fr/docs/tutorials/create/basic_markup.html"><span class="arrow-prev">Précédent</span></a>
  <a class="button next-button" href="/fr/docs/tutorials/create/presentation_layout.html"><span class="arrow-next">Prochain</span></a>
</div>
