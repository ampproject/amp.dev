---
'$title': Adición de fuentes
$order: 6
description: 'Puede incrustar fuentes personalizadas en su página AMP de dos maneras: 1. Mediante una etiqueta <link>: solo para proveedores de fuentes autorizados. 2. Utilizando...'
---

Para mantener lo más rápido posible los tiempos de carga de documentos en AMP, no puede incluir hojas de estilo externas. Sin embargo, hay una excepción a esta regla, las **fuentes**.

Puede incrustar fuentes personalizadas en su página AMP de dos maneras:

1. Mediante una etiqueta `<link>`: solo para proveedores de fuentes autorizados.
2. Utilizando la regla CSS de `@font-face`: no hay restricciones, todas las fuentes están permitidas.

En este tutorial, usaremos una etiqueta `<link>` para añadir fuentes a nuestra página. **Agregue** un enlace de hoja de estilo en `<head>` para solicitar la fuente Raleway:

```html
<link
  rel="stylesheet"
  type="text/css"
  href="https://fonts.googleapis.com/css?family=Raleway"
/>
```

Ahora, **actualice** su selector CSS <code>body</code> para incluir una referencia a Raleway:

```css
body {
  width: auto;
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
}
```

**Actualice** su página y dele un vistazo a la nueva imagen de su página. Además, inspeccione la salida del validador AMP. No debe haber errores para esta solicitud de hoja de estilo externa.

Las fuentes web pueden ser perjudiciales para el rendimiento de un sitio web, incluso en un sitio de AMP que además es rápido. Utilice la propiedad de CSS <a><code>font-display</code></a> para optimizar el comportamiento de carga de sus fuentes. [/tip]

¡Ya completó su artículo de noticias de AMP! Así es como debería verse:

{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='Completed news article') }}
