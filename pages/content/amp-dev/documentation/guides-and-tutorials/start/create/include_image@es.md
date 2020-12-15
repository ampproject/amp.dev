---
"$title": Incluir una imagen
"$order": '2'
description: La mayoría de las etiquetas HTML pueden usarse directamente en AMP HTML, pero algunas, como <img>, se reemplazan por etiquetas AMP HTML personalizadas equivalentes o ligeramente optimizadas
author: pbakaus
contributors:
- bpaduch
---

La mayoría de las etiquetas HTML se pueden usar directamente en AMP HTML, pero algunas, como `<img>`, se reemplazan por etiquetas AMP HTML personalizadas equivalentes o ligeramente optimizadas (y algunas etiquetas problemáticas se inhabilitan directamente. Consulte el artículo [etiquetas HTML en la especificación](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md)).

Para demostrar el aspecto que tendría el marcado adicional, le mostramos a continuación el código requerido para incrustar una imagen en la página:

[sourcecode:html]
<amp-img src="welcome.jpg" alt="Welcome" height="400" width="800"></amp-img>
[/sourcecode]

[sourcecode:html] <amp-img src="bienvenido.jpg" alt="Bienvenido" height="400" width="800"></amp-img> [/sourcecode]
