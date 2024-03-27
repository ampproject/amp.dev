---
'$title': Creación de una página HTML normal
$order: 1
description: En el directorio del proyecto, encontrará un archivo denominado article.html. Este es el artículo de noticias para el que estamos creando en una página equivalente de AMP...
---

En el directorio del proyecto, encontrará un archivo denominado [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html). Este es el artículo de noticias para el que estamos creando una página equivalente de AMP.

1. **Copie** el código completo del archivo `article.html` y péguelo en un nuevo archivo.
2. **Guarde** el archivo nuevo como `article.amp.html`.

[tip type="note"] <strong>NOTE:</strong> No es necesario que nombre los archivos AMP como `.amp.html`. De hecho, los archivos AMP pueden tener cualquier extensión que desee. Es común ver que los editores diferencian las páginas AMP de sus versiones canónicas usando parámetros en la url. Por ejemplo: `http://publisher.com/article.html?amp`. [/tip]

Su archivo `article.amp.html` debe tener el siguiente aspecto:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>News Article</title>

    <link href="base.css" rel="stylesheet" />

    <script type="text/javascript" src="base.js"></script>
  </head>
  <body>
    <header>News Site</header>
    <article>
      <h1>Article Name</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas
        tortor sapien, non tristique ligula accumsan eu.
      </p>
    </article>
    <img src="mountains.jpg" />
  </body>
</html>
```

Esta es una página intencionalmente simple con elementos comunes del artículo de noticias estáticas: CSS, JavaScript y una etiqueta de imagen.

Nuestra versión de AMP del artículo es simplemente una copia del artículo original en este momento. Vamos a convertirlo en un AMP.

Para empezar, agregaremos el archivo de la biblioteca de AMP. Por sí solo, esto no hará que su nuevo archivo sea una página válida de AMP, pero veremos más adelante cómo la biblioteca de AMP puede ayudarnos a averiguar cómo podemos arreglarlo.

Para incluir la biblioteca de AMP, **agregue** esta línea a la parte inferior de la etiqueta `<head>`:

```html
<script async src="https://ampjs.org/v0.js"></script>
```

<strong>Cargue</strong> la nueva página <code>article.amp.html</code> en su navegador en <a>http://localhost:8000/article.amp.html</a> y, después, <strong>abra</strong> la <a>Consola del programador</a> en Chrome (o en su navegador preferido).

Cuando inspeccione la salida de JavaScript en la Consola del programador (asegúrese de que tiene seleccionada la ficha Consola). Debe ver esta entrada de registro:

```text
Powered by AMP ⚡ HTML
```

La biblioteca de AMP incluye un <a>AMP validator</a> que le informará si algo impide que su página sea un documento válido de AMP. <strong>Habilite</strong> el validador de AMP agregando este identificador de fragmentos a la URL de su documento:

```text
#development=1
```

Por ejemplo:

```text
http://localhost:8000/article.amp.html#development=1
```

En la Consola del programador, debe recibir varios errores de validación (es posible que deba actualizar manualmente la página en su navegador para verlos):

{{ image('/static/img/docs/tutorials/tut-convert-html-validation-errors.png', 905, 427, align='', caption='Errores de validación de AMP para nuestro ejemplo') }}

Para que esto sea un documento de AMP válido debemos corregir todos estos errores, lo cual es exactamente lo que haremos en este codelab.

Pero antes de hacer eso, <strong>simularemos</strong> una experiencia de dispositivo móvil en las herramientas de desarrollo del navegador ya que estamos trabajando con un artículo de noticias para móviles. Por ejemplo, en Chrome DevTools, haga clic en el icono del teléfono móvil y seleccione un dispositivo móvil en el menú.

Debe ver una resolución móvil simulada en su navegador como la siguiente:

{{ image('/static/img/docs/tutorials/tut-convert-html-nexus5.png', 436, 812, align='third center', caption='Simulación móvil de nuestra página de AMP') }}

¡Ahora estamos listos para trabajar! Solucionaremos los errores de validación uno por uno y analizaremos cómo se relacionan con AMP.
