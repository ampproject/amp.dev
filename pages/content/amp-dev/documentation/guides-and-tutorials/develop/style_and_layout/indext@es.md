---
$title: Estilo y Layout
---
[TOC]

Dar diseño y mejorar el layout de las páginas AMP HTML es muy similar al HTML de páginas normales – en ambos casos, usarás CSS.

Sin embargo, AMP limita el uso del CSS por razones de performance y usabilidad, mientras expande algunas capacidades de diseño responsivo con caracteristicas como [placeholders & fallbacks]({{g.doc('/content/docs/design/responsive_amp/placeholders.md', locale=doc.locale).url.path}}), [uso avanzado vía srcset]({{g.doc('/content/docs/design/responsive_amp/art_direction.md', locale=doc.locale).url.path}}) y los [atributos del layout]({{g.doc('/content/docs/design/responsive_amp/control_layout.md', locale=doc.locale).url.path}}) para un mejor control sobre cómo se muestran los elementos en la página.

Tip: Es super fácil hacer los elementos responsivos en AMP. Solo pon layout="responsive". Para aprender más sobre el diseño responsivo en AMP, dale una leída a [Crear páginas AMP adaptables](/es/docs/design/responsive/responsive_design.html)

{{ youtube('y6kA3u3GIws', 480, 270, caption='Vea a UpperQuad hablar sobre el rediseño del sitio de AMPproject, incluyendo los retos de usar AMP por primera vez.') }}

## Agregar estilos a una página

Añade todos los estilos CSS dentro de la etiqueta `<style amp-custom>` en el encabezado del documento.
Por ejemplo:

[sourcecode:html]
<!doctype html>
  <head>
    ...
    <style amp-custom>
      /* any custom styles go here. */
      body {
        background-color: white;
      }
      amp-img {
        border: 5px solid black;
      }

      amp-img.grey-placeholder {
        background-color: grey;
      }
    </style>
    ...
  </head>
[/sourcecode]

Importante: Asegúrate de que solo hay una etiqueta `<style amp-custom>` en la página, ya que en AMP solo se admite la presencia de una.

Define los estilos de los componentes con selectores de clase o de elemento
usando propiedades comunes de CSS. Por ejemplo:

[sourcecode:html]
<body>
  <p>Hello, Kitty.</p>
  <amp-img
    class="grey-placeholder"
    src="https://placekitten.com/g/500/300"
    srcset="/img/cat.jpg 640w,
           /img/kitten.jpg 320w"
    width="500"
    height="300"
    layout="responsive">
  </amp-img>
</body>
[/sourcecode]

Importante: Comprueba que los estilos estén admitidos en AMP, ya que algunos estilos no lo están por cuestiones de rendimiento (consulta también [CSS compatibles]({{g.doc('/content/docs/design/responsive_amp/style_pages.md', locale=doc.locale).url.path}})).

## Diseña elementos de forma responsive

Especifique el tamaño y la posición de todos los elementos AMP visibles
proporcionando un atributo `width` y` height`.
Estos atributos implican la relación de aspecto del elemento,
que puede escalar con el contenedor.

Configure el diseño como adaptable (responsive).
Esto ajusta el tamaño del elemento a la anchura del elemento contenedor
y cambia la altura automáticamente a la relación de aspecto determinada por los atributos de anchura y altura.

Leer más: Aprende más acerca de [los diseños compatibles con AMP]({{g.doc('/content/docs/design/responsive_amp/control_layout.md', locale=doc.locale).url.path}})

## Proporcionar placeholders & fallbacks

El soporte incorporado para placeholders y fallbacks significará que los usuarios nunca tendrán que mirar una pantalla en blanco de nuevo.

Leer más: Aprende más sobre [Placeholders y fallbacks]({{g.doc('/content/docs/design/responsive_amp/placeholders.md', locale=doc.locale).url.path}})

## Dirige tus imágenes

AMP admite los atributos `srcset` y `sizes` para darle un control fino sobre cuáles imágenes se cargarán en qué escenario.

Leer más: Aprende más sobre [dirección con srcset y tamaños]({{g.doc('/content/docs/design/responsive_amp/art_direction.md', locale=doc.locale).url.path}})

## Valida tus estilos y diseños

Usa el validador de AMP para comprobar
los valores de diseño y CCS de tu página.

El validador confirma que el CSS de la página no exceda el límite de 50.000 bytes,
comprueba que no haya estilos no permitidos y garantiza que el diseño de la página sea compatible y el formato sea correcto.
Consulta también esta lista completa de [errores de estilo y diseño](/es/docs/troubleshooting/validation_errors.html#errores-de-estilo-y-de-diseno).

Ejemplo de error en la consola de una página con CSS que excede el límite de 50.000 bytes:

<amp-img src="/static/img/docs/too_much_css.png" width="1404" height="334" layout="responsive"></amp-img>

Leer más: Aprende más sobre cómo [validar las páginas de AMP]({{g.doc('/content/docs/fundamentals/validate.md', locale=doc.locale).url.path}}).
