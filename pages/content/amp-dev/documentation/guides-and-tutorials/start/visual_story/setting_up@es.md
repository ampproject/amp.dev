---
$title: Configuración
---

## Requisitos

Antes de comenzar este tutorial, necesitas lo siguiente:

- Nociones básicas sobre HTML, CSS y JavaScript
- Conocimientos de los conceptos básicos de AMP (consulta el tutorial ["Convertir HTML en AMP"](../../../../documentation/guides-and-tutorials/start/converting/index.md))
- Un navegador
- Un editor de texto

## Configurar el entorno de desarrollo

#### Paso 1. Descarga el código

1.  Descarga el código del tutorial, que está comprimido en un archivo ZIP, desde la siguiente URL: <a href="/static/files/tutorials/amp-pets-story.zip">/static/files/tutorials/amp-pets-story.zip</a>

2. Extrae el contenido del archivo ZIP.  En el directorio **amp-pets-story** se encuentran los archivos de imagen, vídeo, audio y datos que usaremos para crear nuestra historia, con el archivo **pets.html** como punto de partida. La versión completa de la historia se puede encontrar en el archivo [pets-completed.html](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html).

#### Paso 2. Ejecuta la página de muestra

Para probar nuestra historia de muestra, se tiene que poder acceder a los archivos desde un servidor web. Hay varias formas de crear un servidor web local temporal en el que hacer pruebas.  A continuación te mostramos algunas opciones; elige la que te vaya mejor:

- [La aplicación de Google Chrome "Web Server for Chrome"](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Un servidor Python HTTP local](https://developer.mozilla.org/es/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

Una vez que hayas configurado un servidor web local, echa un vistazo al aspecto que tendrá nuestra historia completa al terminar este tutorial accediendo a la siguiente <a href="http://localhost:8000/pets-completed.html">URL</a>:

```html
http://localhost:8000/pets-completed.html
```

[tip type="important"]

Asegúrate de que la URL se sirve desde "localhost"; de lo contrario, es posible que la historia AMP no se cargue correctamente y te encuentres errores, como "El elemento "source" debe empezar con "https://" o "//" o ser relativo y servirse desde https o desde localhost".

[/tip]

Haz clic en la historia completa para tener una idea de lo que crearemos.
