---
'$title': Modificación de la presentación y el diseño
$order: 3
description: Las AMP son páginas web. Cualquier estilo en la página y en sus elementos se aplica mediante propiedades CSS comunes. Esto le da estilo a los elementos con selectores...
author: pbakaus
contributors:
  - bpaduch
---

## Modificación de la presentación

Las AMP son páginas web. Cualquier estilo en la página y en sus elementos se aplica mediante propiedades CSS comunes. Los elementos de estilo utilizan selectores de clase o de elemento en una hoja de estilo incrustada en `<head>`, llamada `<style amp-custom>`:

[sourcecode:html]

<style amp-custom>
  /* any custom style goes here */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>

[/sourcecode]

Las páginas AMP solo pueden tener una hoja de estilo incrustada y estilos en línea, pero hay ciertos selectores que no se pueden utilizar. [Aprenda todo sobre el estilo](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md).

## Control del diseño

AMP sigue reglas estrictas al distribuir los elementos en la página. En una página HTML normal, CSS se usa casi exclusivamente para distribuir elementos. Sin embargo, por motivos de rendimiento, AMP requiere que todos los elementos tengan un tamaño explícito establecido desde el principio.

[tip type="read-on"] <strong>LEER MÁS:</strong> Obtenga más información sobre cómo AMP representa y diseña una página, y cómo puede modificar el diseño, en el artículo [Dudas sobre diseño y los medios](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md).[/tip]
