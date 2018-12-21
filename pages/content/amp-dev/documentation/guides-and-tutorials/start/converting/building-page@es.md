---
$title: Creación de una página HTML normal
---

En el directorio del proyecto, encontrará un archivo denominado [`article.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-foundations/blob/master/article.html). Este es el artículo de noticias que estamos creando una página equivalente de AMP para.

1. **Copie** el código completo del archivo `article.html` y péguelo en un nuevo archivo.
2. **Guarde** el archivo nuevo como `article.amp.html`.

Nota: No es necesario que nombre los archivos AMP como `.amp.html`. De hecho, los archivos AMP pueden tener cualquier extensión que desee. Es común ver editores diferenciando páginas AMP de sus versiones canónicas usando parámetros en la url. Por ejemplo: `http://publisher.com/article.html?amp`.

Su archivo `article.amp.html` debe tener el siguiente aspecto:

```html
<!doctype html>
<html lang="en">
  <head>

    <title>News Article</title>

    <link href="base.css" rel="stylesheet" />

    <script type="text/javascript" src="base.js"></script>
  </head>
  <body>
    <header>
      News Site
    </header>
    <article>
      <h1>Article Name</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas tortor sapien, non tristique ligula accumsan eu.</p>
    </article>
    <img src="mountains.jpg">
  </body>
</html>
```

Esta es una página intencionalmente simplista con elementos comunes del artículo de noticias estáticas: CSS, JavaScript y una etiqueta de imagen.

Nuestra versión de AMP del artículo es apenas una copia del artículo original ahora. Vamos a convertirlo a un AMP. Para empezar, agregamos el archivo de biblioteca de JavaScript de AMP y ver qué errores aparecen cuando se activa el validador de AMP.

Para incluir la biblioteca AMP, **agregue** esta línea a la parte inferior de la etiqueta `<head>`:

```html
<script async src="https://cdn.ampproject.org/v0.js"></script>
```

**Cargue** la nueva página `article.amp.html` en su navegador en [http://localhost:8000/article.amp.html](http://localhost:8000/article.amp.html) y, a continuación, **abra** la [Developer Console](https://developer.chrome.com/devtools/docs/console) (o en su navegador preferido).

Cuando inspecciona la salida de JavaScript en la Consola del programador (asegúrese de que tiene la ficha Consola seleccionada), debería ver esta entrada de registro:

```text
Powered by AMP ⚡ HTML
```

**Habilite** el [AMP validator]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validate.md', locale=doc.locale).url.path}}) agregando este identificador de fragmento a su URL:

```text
#development=1
```

Por ejemplo:

```text
http://localhost:8000/article.amp.html#development=1
```

Es posible que deba actualizar manualmente la página en su navegador.

En la Consola del programador, debe recibir varios errores de validación:

{{ image('/static/img/docs/tutorials/tut-convert-html-validation-errors.png', 905, 427, align='', caption='Errores de validación de AMP para nuestra muestra') }}

A medida que trabajamos con un artículo de noticias móvil, vamos a **simular** una experiencia de dispositivo móvil en las herramientas de desarrollo del navegador. Por ejemplo, en Chrome Developer Tools, haz clic en el icono del teléfono móvil y selecciona un dispositivo móvil en el menú.

Debería ver una resolución móvil simulada en su navegador como la siguiente:

{{ image('/static/img/docs/tutorials/tut-convert-html-nexus5.png', 436, 812, align='third center', caption='Simulación móvil de nuestra página AMP') }}

¡Ahora estamos listos para trabajar! Paso a paso a través de los errores de validación, uno por uno y la dirección de cómo se relacionan con AMP.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/setting-up.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/resolving-errors.md', locale=doc.locale).url.path}}"><span class="arrow-next">Próximo</span></a>
</div>
