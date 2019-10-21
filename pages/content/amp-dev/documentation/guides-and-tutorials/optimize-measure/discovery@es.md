---
$title: Hacer que una página sea reconocible
---

En ocasiones, puede que prefieras tener tanto una versión de AMP como una que no lo sea de una misma página, por ejemplo, en un artículo de noticias. Pero si la búsqueda de Google encuentra la versión que no es de AMP de esa página, ¿cómo puede saber que también hay una versión de AMP?

### Enlazar las páginas con `<link>`

Para resolver este problema, debemos añadir información sobre la página de AMP a la versión que no es de AMP y viceversa, en forma de etiquetas `<link>` en `<head>`.

Añade lo siguiente a la página que no es de AMP:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Y esto a la página de AMP:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### ¿Qué ocurre si solo tengo una página?

Si solo tienes una página, y es una página de AMP, sigues teniendo que añadir el enlace canónico que, simplemente, apuntará a sí mismo:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Leer más: Aprende más sobre cómo Google encuentra las páginas en [Directrices de la Búsqueda de Google para las páginas de AMP](https://support.google.com/webmasters/answer/6340290).

## Integrar con plataformas de terceros mediante metadatos adicionales <a name="integrate-with-third-party-platforms-through-additional-metadata"></a>

En ocasiones, un sitio web de terceros (que incorpora tu página AMP o incluye enlaces a ella) necesita más información acerca de tu página aparte del hecho de que se trata de una página de AMP. Las preguntas que una plataforma puede hacerte acerca de tu página pueden ser: "¿Eres un artículo de prensa?", "¿O un vídeo?" o "¿Tienes una captura de pantalla y una breve descripción?".

Esto no solo es relevante para las páginas de AMP, sino para todas las páginas web. Para algunas plataformas, estos metadatos son adicionales, mientras que, para otras, son un requisito, lo que significa que **no se mostrarán enlaces a su contenido si no has incluido los metadatos correctos**. Asegúrate de incluir los metadatos adecuados para las plataformas en las que deseas que aparezca el contenido.

### Usar Schema.org para la mayoría de los motores de búsqueda

[Schema.org](http://schema.org/) ofrece vocabularios abiertos para añadir metadatos a todo tipo de elementos. En el caso de AMP, las propiedades que tienen sentido en contexto incluyen el tipo específico de contenido (por ejemplo, "artículo de noticias"), el título, la fecha de publicación y la vista previa de imágenes asociadas.

Ejemplo:

[sourcecode:html]
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": "http://cdn.ampproject.org/article-metadata.html",
    "headline": "Lorem Ipsum",
    "datePublished": "1907-05-05T12:02:41Z",
    "dateModified": "1907-05-05T12:02:41Z",
    "description": "The Catiline Orations continue to beguile engineers and designers alike -- but can it stand the test of time?",
    "author": {
      "@type": "Person",
      "name": "Jordan M Adler"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Google",
      "logo": {
        "@type": "ImageObject",
        "url": "http://cdn.ampproject.org/logo.jpg",
        "width": 600,
        "height": 60
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "http://cdn.ampproject.org/leader.jpg",
      "height": 2000,
      "width": 800
    }
  }
</script>
[/sourcecode]

Puedes encontrar más ejemplos en la [carpeta de ejemplos de ampproject](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples), que incluye la sintaxis de atributo HTML alternativa).

[tip type="read-on"] Visita estas páginas para más información sobre datos estructurados:

* Aprende cómo [Estructurar tu contenido para aparecer en Google como resultado enriquecido](https://developers.google.com/search/docs/guides/mark-up-content) (por ejemplo, top stories carousel, recipe cards, etc.).
* Prueba tus datos estructurados con la [herramienta de pruebas de datos estructurados](https://developers.google.com/structured-data/testing-tool/).
[/tip]

### Otros metadatos para aún más plataformas

Accede a la [guía de Búsqueda social en Aspectos básicos de la Web](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/) para descubrir las diferentes formas que existen a la hora de preparar el contenido para su visualización y distribución.
