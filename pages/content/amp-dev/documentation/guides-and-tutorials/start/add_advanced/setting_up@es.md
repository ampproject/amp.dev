---
"$title": Configuración
"$order": '0'
description: 'Antes de comenzar este tutorial, necesitará lo siguiente: - Conocimientos básico de HTML, CSS, y JavaScript - Comprensión básica de los conceptos fundamentales de AMP (consulte...'
"$parent": "/content/docs/fundamentals/add_advanced.md"
---

## Requisitos Previos

**Antes de comenzar** este tutorial, necesitará lo siguiente:

- Conocimientos básico de HTML, CSS, y JavaScript
- Comprensión básica de los conceptos fundamentales de AMP (consulte el tutorial ["Cómo convertir HTML en AMP"](../../../../documentation/guides-and-tutorials/start/converting/index.md))
- Un navegador web de su elección en el que pueda inspeccionar la consola de JavaScript
- Un editor de texto de su elección

## Configure su entorno de desarrollo

### Paso 1. Descargue el código

Descargue el código de ejemplo que se proporciona en el tutorial como [archivo ZIP](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/archive/master.zip) o mediante git:

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-advanced.git
```

Descomprima el archivo (si es necesario) y navegue hasta el directorio del proyecto mediante la línea de comandos en su computadora:

```shell
cd accelerated-mobile-pages-advanced
```

El directorio del proyecto contiene varios archivos de recursos de ejemplo y la página de inicio [`article.amp.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html).

### Paso 2. Ejecute la página de ejemplo

Para probar la página de AMP de muestra, necesitamos acceder a los archivos desde un servidor web. Hay varias maneras de crear un servidor web local temporal con el objetivo de probarla. Aquí hay algunas opciones, elija la que mejor funcione para usted:

- [Aplicación de Google Chrome "Servidor Web para Chrome"](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Un servidor local HTTP Python](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

Nota: Se recomienda encarecidamente que utilice HTTPS en entornos de producción. HTTPS incluye varios beneficios que van más allá de la seguridad, incluido el SEO. Puede obtener más información sobre este tema en [Google Webmaster](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html).

Después de configurar su servidor web local, acceda al artículo de ejemplo en su navegador en esta dirección URL:

```text
http://localhost:8000/article.amp.html
```
