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

[tip]
La inclusión de una fuente en el documento no requiere ningún componente adicional. Dicho esto, hay un componente llamado [`amp-font`](/es/docs/reference/components/amp-font.html). El componente `amp-font` no se utiliza para cargar fuentes web, sino que puede utilizarlo para detectar si una fuente web ha cargado correctamente o no y responder adecuadamente, si es necesario.

Puede utilizar amp-font para ocultar su texto hasta que su fuente esté completamente cargada para que el usuario no vea el texto de su fuente temporal a su fuente verdadera. En el caso de que la fuente no se cargue, es posible que desee revelar la fuente temporal en su lugar. Después de todo, el peor escenario sería si el usuario no llegó a leer ningún texto! Obtenga más información leyendo la documentación de referencia de [`amp-font`](/es/docs/reference/components/amp-font.html).
[/tip]

¡Has completado tu artículo de noticias de AMP! Así es como debería ser:

{{ image('/static/img/docs/tutorials/tut-advanced-done.png', 412, 732, align='center half', caption='Artículo completado') }}


<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/navigating.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/congratulations.md', locale=doc.locale).url.path}}"><span class="arrow-next">Próximo</span></a>
</div>
