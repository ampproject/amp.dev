---
$title: Agregando fuentes
---

En AMP, para mantener los tiempos de carga de documentos lo más rápido posible, no puede incluir hojas de estilo externas. Sin embargo, hay una excepción a esta regla &mdash; **fuentes**.

Puede incrustar fuentes personalizadas en su página AMP de dos maneras:

1. A través de una etiqueta `<link>`: sólo para proveedores de fuentes con listas blancas.
2. Al usar la regla CSS de `@font-face`: no hay restricciones, todas las fuentes están permitidas.

En este tutorial, usaremos una etiqueta `<link>` para añadir fuentes a nuestra página. **Agregue** un enlace de hoja de estilo en el `<head>` para solicitar la fuente Raleway:

```html
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Raleway">
```

Ahora, **actualice** su CSS para incluir la referencia a Raleway:

```css
body {
  width: auto;
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
}
```

**Actualice** su página y echa un vistazo a la nueva imagen de tu página. Además, inspeccione la salida del validador AMP. No debe haber errores para esta solicitud de hoja de estilo externa.

¡Has completado tu artículo de noticias de AMP! Así es como debería ser:

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='Artículo completado') }}
