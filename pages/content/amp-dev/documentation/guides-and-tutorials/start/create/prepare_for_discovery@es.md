---
'$title': Prepare su página para su publicación y distribución
$order: 4
description: 'En algunos casos, podría tener una versión AMP y una versión que no es de AMP de la misma página, por ejemplo, un artículo informativo. Considere lo siguiente: si Google Search...'
author: pbakaus
contributors:
  - bpaduch
---

En algunos casos, podría tener una versión AMP y una versión que no es AMP de la misma página, por ejemplo, un artículo informativo. Considere lo siguiente: si Google Search encuentra una versión que no es AMP de esa página, _¿cómo sabe si existe una versión AMP "emparejada"_?

## Vinculación de páginas con `<link>`

Para establecer que una página no AMP y una página AMP deben ser tratadas como si estuvieran "emparejadas" juntas, agregamos información sobre la página AMP a la página no AMP y viceversa en forma de las etiquetas `<link>` en el `<head>`.

Agregue lo siguiente a la página no AMP:

[sourcecode:html]

<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Y agregue lo siguiente a la página AMP:

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## ¿Qué sucede si tengo una sola página?

Si solo tiene una página y es AMP, debe agregarle el vínculo canónico, el cual simplemente apuntará a sí mismo.

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"] <strong>LEER MÁS:</strong> Obtenga más información sobre cómo Google encuentra las páginas AMP en el artículo <a class="" href="https://support.google.com/webmasters/answer/6340290">Lineamientos de Google Search para las páginas AMP</a>. [/tip]
