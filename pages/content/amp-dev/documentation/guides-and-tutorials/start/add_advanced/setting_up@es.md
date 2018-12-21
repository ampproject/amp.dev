---
$title: Configuración
---

## Requisitos Previos

**Antes de comenzar** este tutorial, necesitará lo siguiente:

- Conocimiento básico de HTML, CSS, y JavaScript
- Una comprensión básica de los conceptos básicos de AMP (consulte el tutorial ["Convertir HTML en AMP"]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/index.md', locale=doc.locale).url.path}}))
- Un navegador de su elección que puede inspeccionar la consola de JavaScript
- Un editor de texto de su elección

## Configure su entorno de desarrollo

### Paso 1. Descargue el código

Descargue el código de ejemplo del tutorial como el [archivo ZIP](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/archive/master.zip) o mediante git:

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-advanced.git
```

Descomprima el archivo comprimido (si es necesario) y navegue hasta el directorio del proyecto a través de la línea de comandos en su computadora:

```shell
cd accelerated-mobile-pages-advanced
```

El directorio del proyecto contiene varios archivos de recursos de ejemplo y la página de inicio [`article.amp.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html).

### Paso 2. Ejecute la página de ejemplo

Para probar la página de AMP de muestra, necesitamos acceder a los archivos desde un servidor web. Hay varias maneras de crear un servidor web local temporal con el propósito de probar. Aquí hay algunas opciones, elija la que mejor funcione para usted:

- [“Web Server for Chrome” Google Chrome app](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [A local HTTP Python server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

Nota: Se recomienda encarecidamente utilizar HTTPS en entornos de producción. HTTPS tiene varios beneficios más allá de la seguridad, incluyendo SEO. Puedes leer más sobre este tema en [Google Webmaster](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html).

Después de configurar su servidor web local, acceda al artículo de ejemplo en su navegador en esta dirección URL:

```text
http://localhost:8000/article.amp.html
```

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/review_code.md', locale=doc.locale).url.path}}"><span class="arrow-next">Próximo</span></a>
</div>
