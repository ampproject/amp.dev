---
'$title': Include an image
$order: 2
description: La plupart des balises HTML peuvent être utilisées directement dans HTML AMP, mais certaines balises, telles que la balise <img>, sont remplacées par des balises HTML AMP personnalisées équivalentes ou légèrement améliorées
author: pbakaus
contributors:
  - bpaduch
---

La plupart des balises HTML peuvent être utilisées directement dans HTML AMP, mais certaines, comme la balise `<img>`, sont remplacées par des balises équivalentes ou des balises HTML AMP personnalisées légèrement améliorées (et quelques balises problématiques sont purement interdites, voir les [balises HTML dans la spécification](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)).

Pour découvrir à quoi ressemblerait un balisage supplémentaire, voici le code requis pour intégrer une image dans la page :

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

[tip type="read-on"] <strong>LIRE -</strong> Pour savoir pourquoi nous remplaçons des balises telles que <code><img></code> par <a><code><amp-img></code></a> ainsi que le nombre de balises disponibles, consultez la page <a>Inclure les images et vidéos</a>. [/tip]
