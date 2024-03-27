---
'$title': Cómo crear la estructura para un anuncio
$order: 0
description: 'Con ayuda de su editor de texto favorito, genere un archivo HTML llamado my-amphtml-ad.html. Posteriormente, copie los siguientes marcadores HTML en ese archivo: ...'
---

El [HTML que necesite para un anuncio](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md) es una variante del [AMP HTML que necesita para crear una página de AMP](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md). Debemos acostumbrarnos a utilizar el código que sea necesario para generar la estructura de nuestro anuncio AMP HTML.

Con ayuda de su editor de texto favorito, genere un archivo HTML llamado **`my-amphtml-ad.html`**. Posteriormente, copie los siguientes marcadores HTML en ese archivo:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My amphtml ad</title>
    <meta name="viewport" content="width=device-width" />
  </head>
  <body></body>
</html>
```

Estos marcadores se utilizan en los archivos HTML básicos que son válidos. Tenga en cuenta que incluimos la `meta` etiqueta de la ventana de visualización para que tengamos una [ventana de visualización adaptable](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md#controlling-the-viewport).

Ahora, modifiquemos el archivo HTML para convertirlo en un anuncio AMP HTML.

En la etiqueta `<html> `, agregue el atributo `⚡4ads`, que identifica el documento como un anuncio AMP HTML. De forma alternativa, puede especificar el atributo `amp4ads`, lo cual también es válido.

```html
<!DOCTYPE html>
<html ⚡4ads>
  <head>
    ...
  </head>
</html>
```

[tip type="note"] **NOTA –** A diferencia de las páginas AMP, [los anuncios AMP HTML no necesitan una etiqueta `<link rel="canonical">`](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#amphtml-ad-format-rules). [/tip]

Los anuncios AMP HTML necesitan su propia versión del tiempo de ejecución en AMP, por lo que debe agregar la siguiente etiqueta `<script>` en la sección `<head>` de su documento:

```html
<script async src="https://ampjs.org/amp4ads-v0.js"></script>
```

Los creativos de los anuncios AMP HTML requieren de un [código reutilizable](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#boilerplate) diferente y con un estilo considerablemente más simple en comparación con las páginas de AMP. Para conseguir esto, agregue el siguiente código a su sección `<head>`:

```html
<style amp4ads-boilerplate>
  body {
    visibility: hidden;
  }
</style>
```

Si desea establecer el estilo de su anuncio AMP HTML, su CSS debe estar integrado en el documento AMP HTML mediante las etiquetas `<style amp-custom>` en la sección `<head>`. Como estamos renderizando un anuncio con una imagen básica, no se necesita ninguna CSS así que no agregaremos estas etiquetas.

[tip type="note"] **NOTA –** Para los anuncios AMP HTML, el tamaño máximo para una hoja de estilos integrados en el código es de _20 kilobytes_. Puede obtener más información sobre [los requisitos de las CSS en las especificaciones para los anuncios AMP HTML](../../../../documentation/guides-and-tutorials/learn/a4a_spec.md#css). [/tip]

Este es el código completo de su archivo HTML:

```html
<!DOCTYPE html>
<html ⚡4ads>
  <head>
    <meta charset="utf-8" />
    <title>My amphtml ad</title>
    <meta name="viewport" content="width=device-width" />
    <script async src="https://ampjs.org/amp4ads-v0.js"></script>
    <style amp4ads-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
  </head>
  <body></body>
</html>
```

Ahora ya tiene un anuncio AMP HTML válido, aunque está bastante vacío. Por lo tanto, vayamos a crear la imagen del anuncio.
