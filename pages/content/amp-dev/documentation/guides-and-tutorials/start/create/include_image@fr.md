---
$title: Inclure une image
---

La plupart des balises HTML peuvent être utilisées directement dans AMP HTML, mais certaines, comme la balise `<img>`, sont remplacées par des balises équivalentes ou des balises AMP HTML personnalisées légèrement améliorées (et quelques balises problématiques sont purement interdites, voir les [balises HTML dans la spécification](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)).

Pour découvrir à quoi ressemblerait un balisage supplémentaire, voici le code requis pour intégrer une image dans la page :

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

Pour savoir pourquoi nous remplaçons les balises, telles que `<img>` par [`<amp-img>`](../../../../documentation/components/reference/amp-img.md), et combien sont disponibles, accédez à [Inclure des iframes et des éléments multimédias](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md).
