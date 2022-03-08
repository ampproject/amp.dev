---
$title: Validar páginas AMP
---

[video src='https://www.youtube.com/watch?v=npum8JsITQE' caption='Mira nuestro vídeo sobre las diversas opciones de validación.']

La ventaja principal de AMP no es solo que aumenta la velocidad de tus páginas, sino que las hace rápidas de una forma que se puede *validar*. De este modo, las plataformas de terceros, como Twitter, Instagram o la Búsqueda de Google, pueden mostrar más predisposición a la hora de ofrecer páginas AMP a los lectores de formas cada vez más interesantes.

## ¿Cómo compruebo si mi página AMP es válida?

Existen varias formas de validar un documento AMP. Todas ellas
producen exactamente el mismo resultado, por lo que puedes utilizar la que más se ajuste
a tu estilo de desarrollo.

Además de la validación de AMP, también es posible que quieras confirmar que tu documento AMP sea [visible](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md) para las plataformas de terceros.

### Developers Console para el navegador

El validador de AMP viene con la biblioteca AMP JS, por lo que está disponible en todas las páginas AMP desde el primer momento. Para llevar a cabo la validación, sigue estos pasos:

  1. Abre la página AMP en el navegador.
  2. Añade "`#development=1`" a la URL, por ejemplo, `http://localhost:8000/released.amp.html#development=1`.
  3. Abre la [consola DevTools de Chrome](https://developers.google.com/web/tools/chrome-devtools/debug/console/) y comprueba si hay errores de validación.

Los errores se mostrarán en Developers Console de una forma similar a esta:

<amp-img src="/static/img/docs/validator_errors.png"
         width="713" height="243" layout="responsive"
         alt="Grabación de pantalla de errores del validador de AMP en Developers Console de Chrome">
</amp-img>

### Interfaz web

El validador de AMP se puede utilizar como una interfaz web en
<a href="https://validator.ampproject.org/">validator.ampproject.org</a>. En esta
interfaz se muestran los errores entre líneas junto con el código fuente HTML de la página.
La interfaz es un editor interactivo: cambia al resultado del código fuente HTML en
una revalidación interactiva.

<amp-img src="/static/img/docs/validator_web_ui.png"
         width="660" height="507" layout="responsive"
         alt="Grabación de pantalla de validator.ampproject.org con ejemplos de errores.">
</amp-img>

### Extensión del navegador

Se puede acceder al validador de AMP directamente desde la barra de herramientas del navegador utilizando
una extensión del navegador. Durante la navegación, se validarán automáticamente todas las páginas AMP
visitadas y se facilitará una indicación visual de la validez de cada página en forma de un icono
de color.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png"
               width="20" height="20" layout="fixed"
               alt="El icono rojo de AMP con el que se indica que el documento AMP no es válido.">
      </amp-img>
    </td>
    <td>Si una página AMP contiene errores, el icono de la extensión
      se mostrará de color rojo y se indicará el número de errores detectados.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png"
               width="20" height="20" layout="fixed"
               alt="El icono verde de AMP con el que se indica que el documento AMP es válido.">
      </amp-img>
    </td>
    <td>Si una página AMP no contiene errores, el icono se mostrará de
      color verde y se indicará el número de advertencias, si es que hay alguna.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png"
               width="20" height="20" layout="fixed"
               alt="El icono azul de AMP con el que se indica la variante AMP HTML si se hace clic.">
      </amp-img>
    </td>
    <td>Si la página no es AMP, pero en ella se indica que hay una versión AMP
      disponible, el icono se mostrará de color azul con un icono de enlace. Al hacer clic en
      la extensión, el navegador se redirigirá a la versión AMP.
    </td>
  </tr>
</table>

Extensión del validador de AMP para
[Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) y [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/).

### Paquetes de NPM para CI

Como parte de tus flujos de procesamiento de compilación y prueba, puedes integrar la validación de AMP mediante los paquetes de NPM del validador de AMP: [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) o [gulp-amphtml-validator](https://www.npmjs.com/package/gulp-amphtml-validator) (un complemento de gulp).  Por ejemplo, puedes usar el paquete de NPM del validador de AMP para realizar pruebas de integración o en una tarea programada con el objetivo de verificar la producción de páginas AMP.

##### Ejemplo: Validar un archivo AMP HTML

En este ejemplo, validamos un archivo AMP HTML mediante el paquete de NPM [amphtml-validator](https://www.npmjs.com/package/amphtml-validator).  El estado de validación se canaliza a la consola.

```javascript
'use strict';
var amphtmlValidator = require('amphtml-validator');
var fs = require('fs');

amphtmlValidator.getInstance().then(function (validator) {
  var input = fs.readFileSync('index.html', 'utf8');
  var result = validator.validateString(input);
  ((result.status === 'PASS') ? console.log : console.error)(result.status);
  for (var ii = 0; ii < result.errors.length; ii++) {
    var error = result.errors[ii];
    var msg = 'line ' + error.line + ', col ' + error.col + ': ' + error.message;
    if (error.specUrl !== null) {
      msg += ' (see ' + error.specUrl + ')';
    }
    ((error.severity === 'ERROR') ? console.error : console.warn)(msg);
  }
});
```

##### Ejemplo: Usar una tarea de gulp para validar AMP HTML

En este ejemplo, tenemos una tarea de gulp que valida todos los archivos AMP HTML.  Si se produce un error de validación de AMP, la tarea se cierra con un código de error (1).

```javascript
const gulp = require('gulp');
const gulpAmpValidator = require('gulp-amphtml-validator');

const paths = {
  src: 'src/*.html'
};

gulp.task('amphtml:validate', () => {
  return gulp.src(paths.src)
    .pipe(gulpAmpValidator.validate())
    .pipe(gulpAmpValidator.format())
    .pipe(gulpAmpValidator.failAfterError());
});

gulp.task('default', ['amphtml:validate'], function () {
});
```

### Herramienta de línea de comandos

Puedes validar archivos AMP HTML con la [herramienta de línea de comandos del validador de AMP HTML](https://www.npmjs.com/package/amphtml-validator).

Cómo empezar:

1.  Asegúrate de tener [Node.js con su administrador de paquetes
'npm'](https://docs.npmjs.com/getting-started/installing-node) en el sistema.
2.  Instala la [herramienta de línea de comandos del validador de AMP HTML](https://www.npmjs.com/package/amphtml-validator) ejecutando el comando siguiente: `npm install -g amphtml-validator`.

A continuación, vamos a validar una página AMP HTML real:

[sourcecode:console]
$ amphtml-validator https://amp.dev/
https://amp.dev/: PASS
[/sourcecode]

Como era de esperar, esta página AMP HTML es válida. Vamos a intentarlo con una que no lo sea:
[several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html). Para ejecutar el comando `amphtml-validator`, puedes facilitar la dirección URL de la página o el nombre de un archivo local. Descarga y guarda [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) en un archivo y, a continuación, ejecútalo:

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}})
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see {{g.doc('/content/amp-dev/documentation/components/reference/amp-ad.md', locale=doc.locale).url.path}})
…
[/sourcecode]

El formato de los mensajes de error está compuesto por el nombre del archivo, la línea, la columna y el mensaje,
a menudo seguidos por un enlace a la referencia AMP HTML. Algunos editores, incluido Emacs
(busca el comando y el modo de compilación), pueden interpretar este formato y te
permiten saltar a los errores en el archivo original.

Plantéate usar [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html) como punto de partida para crear tu propia página AMP:

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

La herramienta de línea de comandos ofrece funciones adicionales que incluyen la desactivación del
color, la salida de impresión JSON o la ejecución de una versión específica del
validador de JavaScript (de forma predeterminada, se ejecuta la última secuencia de comandos publicada).

[sourcecode:console]
$ amphtml-validator --help

  Usage: index [options] <fileOrUrlOrMinus...>

  Validates the files or urls provided as arguments. If "-" is
  specified, reads from stdin instead.

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    --validator_js <fileOrUrl>  The Validator Javascript.
      Latest published version by default, or
      dist/validator_minified.js (built with build.py)
      for development.
    --format <color|text|json>  How to format the output.
      "color" displays errors/warnings/success in
              red/orange/green.
      "text"  avoids color (e.g., useful in terminals not
              supporting color).
      "json"  emits json corresponding to the ValidationResult
              message in validator.proto.
[/sourcecode]

## ¿Qué ocurre si mi página no es válida?

El validador de AMP no está pensado solamente para facilitarte el desarrollo. También lo utilizan plataformas como Twitter o Google, que integran tus páginas AMP en sus contenidos y resultados de búsqueda, y que, por lo general, no solicitan las páginas directamente desde tu servidor, sino que hacen uso de la caché de AMP de Google. Este servicio es gratuito, permite almacenar en caché las páginas y las pone a disposición en todo el mundo para que se carguen aún más rápido.

Si el servicio de validación de AMP detecta que algo va mal con tu página, no estará visible ni se distribuirá en sitios web de terceros, y tampoco aparecerá en la caché de AMP de Google. Así pues, no solo se pierden los beneficios de velocidad de la memoria caché, sino que también es posible que tu página no se vea en muchos lugares. Sería una pena que esto ocurriera, así que vamos a asegurarnos de que no suceda.

## ¿Cómo soluciono los errores de validación?

La mayoría de los errores de validación son fáciles de abordar y solucionar. Ten en cuenta esta etiqueta HTML:

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

Esta etiqueta genera el error de validación de AMP que se muestra en estas diferentes herramientas:

* Developers Console para el navegador
<amp-img src="/static/img/docs/validator_console_imgerror.png"
         width="696" height="30" layout="responsive"
         alt="Error de AMP: La etiqueta &quot;img&quot; solo puede depender de la etiqueta
         &quot;noscript&quot;. ¿Querías decir &quot;amp-img&quot;? línea 11, columna 2">
</amp-img>

* Interfaz web
<amp-img src="/static/img/docs/validator_webui_imgerror.png"
         width="676" height="58" layout="responsive"
         alt="Error de AMP: La etiqueta &quot;img&quot; solo puede depender de la etiqueta
         &quot;noscript&quot;. ¿Querías decir &quot;amp-img&quot;? línea 11, columna 2">
</amp-img>

* Extensión del navegador
<amp-img src="/static/img/docs/validator_extension_imgerror.png"
         width="724" height="108" layout="responsive"
         alt="Error de AMP: La etiqueta &quot;img&quot; solo puede depender de la etiqueta
         &quot;noscript&quot;. ¿Querías decir &quot;amp-img&quot;? línea 11, columna 2">
</amp-img>

Cada herramienta ofrece varios fragmentos de información:

  1. Ubicación (línea y columna) en el documento HTML en el que ha ocurrido
     el error; es posible hacer clic en algunas interfaces para resaltar esa ubicación. En este
     caso, el problema se produce en la línea 11, columna 2.
  2. Línea de texto en la que se describe el error. En este caso, en el texto se indica que
     usamos una etiqueta `<img>`, cuando deberíamos haber utilizado una etiqueta [`<amp-img>`](../../../../documentation/components/reference/amp-img.md).
  3. Enlace a un documento relevante relativo al error. En este caso, la
     documentación para la etiqueta [`<amp-img>`](../../../../documentation/components/reference/amp-img.md). No todos los errores generan
     enlaces de documentación.

Al leer de nuevo la [especificación](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md) atentamente, nos damos cuenta de que utilizamos una etiqueta `<img>`, cuando deberíamos haber utilizado una etiqueta [`<amp-img>`](../../../../documentation/components/reference/amp-img.md).

Para entender mejor la lista completa de los posibles errores,
consulta la [guía Errores de validación de AMP](validation_errors.md).
Si sigues sin encontrar la solución después de evaluar los errores atentamente,
[pregúntanos](http://stackoverflow.com/questions/tagged/amp-html) e intentaremos
ayudarte.
