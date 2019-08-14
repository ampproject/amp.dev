---
$title: Hacer que tu página sea detectable
---

Ahora que ha creado un artículo de noticias en AMP, aseguremos de que los usuarios puedan encontrar y descubrir su contenido.

## Enlazar el contenido de la AMP

Su sitio web se puede hacer de algunas páginas de AMP, todas las páginas de AMP, o sin páginas de AMP. No discutiremos la última opción, pero vamos a discutir cómo incorporar páginas de AMP dentro de la estructura de un sitio web.

La vinculación canónica en páginas HTML normales es una técnica común para declarar qué página debe considerarse la página preferida cuando varias páginas incluyen el mismo contenido. Para el caso en el que genere documentos AMP junto con las páginas de artículos tradicionales, debe tratar las páginas HTML tradicionales como las páginas "canónicas" y vincular las páginas AMP con esas páginas HTML. Para el caso en que sus documentos AMP sean las páginas canónicas, trate las páginas AMP como canónicas; No se requiere emparejamiento.

{{ image('/static/img/docs/tutorials/tut-convert-html-linking.png', 751, 500, align='center ninety', caption='Vinculación de contenido de AMP') }}

La mayoría de las veces, recomendamos mantener una sola versión de su página, en este caso la página AMP. A veces eso no es práctico por una multitud de razones, como querer mostrar una página diferente para los usuarios de escritorio. Así que para este tutorial, nuestro sitio web incluye un artículo de noticias que tiene una página HTML que no es AMP (archivo `article.html`) y una página AMP (archivo `article.amp.html`), emparejaremos estas páginas a través de enlaces.

Ya hemos dado el primer paso para lograr esto en nuestro documento de AMP, incluyendo una etiqueta de enlace en el `<head>` de nuevo a la página canónica:

```html
<link rel="canonical" href="/article.html">
```
El siguiente paso es vincular el artículo canónico a la página AMP. Esto se logra mediante la inclusión de una etiqueta `<link rel="amphtml">` en la sección <head> del artículo canónico.

En el archivo `article.html`, **agregue** el siguiente código en la sección `<head>`:

```html
<link rel="amphtml" href="/article.amp.html">
```

El siguiente diagrama ilustra las direcciones de las etiquetas de enlace:

{{ image('/static/img/docs/tutorials/tut-convert-html-link-between.png', 564, 238, align='ninety center', caption='Vinculación de contenido de AMP') }}

Es necesario establecer este enlace bidireccional para que los motores de búsqueda entiendan la relación entre nuestro documento canónico HTML normal y nuestro documento AMP. Si no se proporcionaron enlaces, entonces no necesariamente estaría claro para el rastreador qué artículos son las "versiones AMP" de los documentos HTML normales. Al proporcionar explícitamente estos vínculos aseguramos que no hay ambigüedad!

## Añadir datos estructurados

Las páginas de AMP válidas no requieren datos estructurados de [schema.org](http://schema.org/), pero algunas plataformas como Google Search lo requieren para ciertas experiencias como el carrusel de Top stories. En general, es una buena idea incluir datos estructurados. Los datos estructurados ayudan a los motores de búsqueda a comprender mejor su página web ya visualizar mejor su contenido en páginas de resultados de motores de búsqueda (por ejemplo, en fragmentos enriquecidos). Los datos estructurados se incluyen en la etiqueta `<head>` de su página AMP a través de una etiqueta de script `application/ld+json`.

Para nuestro artículo de noticias, **añada** los siguientes datos estructurados al final de la sección `<head>` de su documento AMP:

```html

<script type="application/ld+json">
{
 "@context": "http://schema.org",
 "@type": "NewsArticle",
 "mainEntityOfPage":{
   "@type":"WebPage",
   "@id":"https://example.com/my-article.html"
 },
 "headline": "My First AMP Article",
 "image": {
   "@type": "ImageObject",
   "url": "https://example.com/article_thumbnail1.jpg",
   "height": 800,
   "width": 800
 },
 "datePublished": "2015-02-05T08:00:00+08:00",
 "dateModified": "2015-02-05T09:20:00+08:00",
 "author": {
   "@type": "Person",
   "name": "John Doe"
 },
 "publisher": {
   "@type": "Organization",
   "name": "⚡ AMP Times",
   "logo": {
     "@type": "ImageObject",
     "url": "https://example.com/amptimes_logo.jpg",
     "width": 600,
     "height": 60
   }
 },
 "description": "My first experience in an AMPlified world"
}
</script>
```

Nota: El contenido siempre debe ser el mismo. Para artículos de noticias, especifique el tipo "NewsArticle". El titular debe coincidir con el título de su artículo. El objeto de imagen se refiere a la imagen de héroe del artículo.

**Vuelva a cargar** la página en su navegador y verifique que no se hayan introducido errores de validación de AMP.

[tip]
Además del formato de datos estructurado schema.org, existen otros formatos compatibles con los motores de búsqueda y redes de redes sociales. Consulte la documentación admitida:

- [Meta tags de Twitter](https://dev.twitter.com/cards/overview)
- [Meta tags de Facebook Open Graph](https://developers.facebook.com/docs/sharing/webmasters)
[/tip]

### Validar los datos estructurados

Para verificar que sus datos estructurados son correctos, muchas plataformas proporcionan herramientas de validación. En este tutorial, validaremos nuestros datos estructurados con la Herramienta [Google Structured Data Validation Tool](https://developers.google.com/structured-data/testing-tool/).

1. En una nueva ventana del navegador, abra [Google Structured Data Validation Tool](https://developers.google.com/structured-data/testing-tool/).
2. Seleccione la pestaña **Code Snippet**.
3. Copie y pegue el código fuente completo de su página AMP en el panel del editor de texto de la herramienta de validación.
4. Haga clic en **Run Test**.

Si los datos estructurados son válidos, debería ver **0 errors** y **0 warnings**.

[tip type="read-on"]
Leer más: Para obtener más información sobre la detección de páginas, consulte la guía [Hacer que tu página sea reconocible](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md).
[/tip]

¡Impresionante trabajo! Has completado tu artículo de noticias de AMP.
