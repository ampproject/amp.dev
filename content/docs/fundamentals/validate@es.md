---
$title: Validar páginas de AMP
---
[TOC]

{{ youtube('npum8JsITQE', 480, 270, caption='Watch our video about the various validation options.') }}

La ventaja principal de AMP no es solo que aumenta la velocidad de tus páginas, sino que las hace rápidas de una forma que se puede *validar*. De este modo, las plataformas de terceros, como Twitter, Instagram o la Búsqueda de Google, pueden mostrar más predisposición a la hora de ofrecer páginas de AMP a los lectores de formas cada vez más interesantes.

## ¿Cómo puedo comprobar si mi página de AMP es válida?

Hay varias formas disponibles para validar un documento de AMP. Todas ellas
producen el mismo resultado, por lo que se puede utilizar la que más se ajuste
a tu estilo de desarrollo.

Además de la validación de AMP, también es posible que desees confirmar que tu documento de AMP es [visible](/es/docs/guides/discovery.html) para las plataformas de terceros.

### Developer Console para el navegador

El validador de AMP viene con la biblioteca AMP JS, por lo que está disponible en todas las páginas de AMP desde el primer momento. Para llevar a cabo la validación, sigue estos pasos:

  1. Abre la página de AMP en el navegador.
  1. Añade "`#development=1`" a la URL, por ejemplo,
`http://localhost:8000/released.amp.html#development=1`.
  1. Abre la [consola DevTools de Chrome](https://developers.google.com/web/tools/chrome-devtools/debug/console/) y comprueba si hay errores de validación.

Los errores se mostrarán en Developer Console de una forma similar a esta:

<amp-img src="/static/img/docs/validator_errors.png"
         width="713" height="243" layout="responsive"
         alt="Screen grab of AMP Validator errors in chrome developer console">
</amp-img>


### Interfaz web

El validador de AMP se puede utilizar como una interfaz web
en [validator.ampproject.org](https://validator.ampproject.org/). Esta interfaz muestra los errores entre líneas, junto con el código fuente HTML de la página.
La interfaz es un editor interactivo: cambia al resultado del código fuente HTML en
una revalidación interactiva.

<amp-img src="/static/img/docs/validator_web_ui.png"
         width="660" height="507" layout="responsive"
         alt="Screen grab of validator.ampproject.org with error examples.">
</amp-img>


### Extensión del navegador

Se puede acceder al validador de AMP directamente desde la barra de herramientas del navegador utilizando
una extensión del navegador. Durante la navegación, se validarán automáticamente todas las páginas de AMP visitadas y se proporcionará una indicación visual de la validez de cada página en forma de un icono de color.

<table>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_invalid.png" width="20" height="20" alt="El icono rojo de AMP indica que el documento AMP no es válido."></amp-img>
      
    </td>
    <td>Si una página de AMP contiene errores, el icono de la extensión
      se mostrará de color rojo y se indicará el número de errores detectados.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_valid.png" width="20" height="20" alt="El icono verde de AMP indica que el documento AMP es válido."></amp-img>
      
    </td>
    <td>Si una página de AMP no contiene errores, el icono se mostrará de
      color verde y se indicará el número de advertencias, si es que hay alguna.
    </td>
  </tr>
  <tr>
    <td>
      <amp-img src="/static/img/docs/validator_icon_link.png" width="20" height="20" alt="El icono azul de AMP indica la variante HTML de AMP si se hace clic."></amp-img>
      
    </td>
    <td>Si la página no es de AMP pero en ella se indica que hay una versión de AMP
      disponible, el icono se mostrará de color azul con un icono de enlace. Al hacer clic en
      la extensión, el navegador se redirigirá a la versión de AMP.
    </td>
  </tr>
</table>

Extensión del validador de AMP para
[Chrome](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc) y [Opera](https://addons.opera.com/en-gb/extensions/details/amp-validator/).

### Paquetes de NPM para CI

Como parte de la construcción y pruebas de pipelines, puede integrar la validación de AMP a través de los paquetes NPM de Validación de AMP: [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) o [gulp-amphtml-validator](https://www.npmjs.com/package/gulp-amphtml-validator) (un plugin gulp).  Por ejemplo, puede utilizar el paquete AMP Validator NPM para pruebas de integración o en una tarea de programación para verificar las páginas de AMP de producción.


##### Ejemplo: Validando un archivo AMP HTML 

En este ejemplo, validaremos un archivo AMP HTML usando el [amphtml-validator](https://www.npmjs.com/package/amphtml-validator) NPM package.  El estado de validación se transmite a la consola.

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

##### Ejemplo: Usando un gulp task para validar AMP HTML

En este ejemplo, tenemos una tarea gulp que valida todos los archivos HTML de AMP. Si hay un error de validación de AMP, la tarea sale con un código de error (1).

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

Puede validar archivos HTML de AMP utilizando [AMP HTML validator con la linea de comandos](https://www.npmjs.com/package/amphtml-validator).

Empezando:

1.  Asegúrese de tener [Node.js con su gestor de paquetes 
'npm'](https://docs.npmjs.com/getting-started/installing-node) en tu sistema.
2.  Instale el  [AMP HTML validator command line tool](https://www.npmjs.com/package/amphtml-validator) ejecutando la siguiente linea de comandos: `npm install -g amphtml-validator`.

Ahora vamos a validar una página AMP HTML real:

[sourcecode:console]
$ amphtml-validator https://www.ampproject.org/
https://www.ampproject.org/: PASS
[/sourcecode]

Como era de esperar, esta página AMP HTML es válida. Vamos a intentarlo con una página que no lo sea: [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html). Para ejecutar el comando `amphtml-validator`, puedes proporcionar la dirección URL de la página o el nombre de un archivo local. Descarga y guarda [several_errors.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/several_errors.html) en un archivo y, a continuación, ejecútalo:

[sourcecode:console]
$ amphtml-validator several_errors.html
several_errors.html:23:2 The attribute 'charset' may not appear in tag 'meta name= and content='.
several_errors.html:26:2 The tag 'script' is disallowed except in specific forms.
several_errors.html:32:2 The mandatory attribute 'height' is missing in tag 'amp-img'. (see https://www.ampproject.org/docs/reference/amp-img.html)
several_errors.html:34:2 The attribute 'width' in tag 'amp-ad' is set to the invalid value '100%'. (see https://www.ampproject.org/docs/reference/amp-ad.html)
...
[/sourcecode]

El formato de los mensajes de error está compuesto por el nombre del archivo, la línea, la columna y el mensaje,
a menudo seguidos por un enlace a la referencia AMP HTML. Algunos editores, incluido Emacs (busca el comando de compilación y el modo de compilación), pueden interpretar este formato y te permiten saltar a los errores en el archivo original.

Plantéate utilizar [minimum_valid_amp.html](https://raw.githubusercontent.com/ampproject/amphtml/master/validator/testdata/feature_tests/minimum_valid_amp.html) como punto de partida para crear tu propia página de AMP:

[sourcecode:console]
$ amphtml-validator minimum_valid_amp.html
minimum_valid_amp.html: PASS
[/sourcecode]

La herramienta de línea de comandos ofrece funciones adicionales que incluyen la desconexión de la impresión en color, la salida de impresión JSON o la ejecución de una versión específica del validador de JavaScript (de forma predeterminada se ejecuta la última secuencia de comandos publicada).

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

El validador de AMP no está pensado solamente para facilitarte el desarrollo. También lo utilizan plataformas como Twitter o Google, que integran tus páginas de AMP en sus contenidos y resultados de búsqueda, y que por lo general, no solicitan las páginas directamente desde tu servidor, sino que hacen uso de la caché de AMP de Google. Este servicio es gratuito, permite almacenar en caché las páginas y las pone a disposición en todo el mundo para que se carguen aún más rápido.

Si el servicio de validación de AMP detecta que algo va mal con tu página, no estará visible ni se distribuirá en sitios web de terceros, y tampoco aparecerá en la caché de AMP de Google. Así pues, no solo se pierden los beneficios de velocidad de la memoria caché, sino que también es posible que tu página no se vea en muchos lugares. Sería una pena que esto ocurriera, así que vamos a asegurarnos de que no suceda.

## ¿Cómo puedo solucionar los errores de validación?

La mayoría de los errores de validación son fáciles de abordar y solucionar. Ten en cuenta esta etiqueta HTML:

[sourcecode:html]
<img src="cat.png">
[/sourcecode]

Esta etiqueta genera el error de validación de AMP que se muestra en estas diferentes herramientas:

 * Developer Console para el navegador
<amp-img alt="AMP error: The tag &#39;img&#39; may only appear as a descendant of tag &#39;noscript&#39;. Did you mean &#39;amp-img&#39;? line 11, column 2" height="30" src="/static/img/docs/validator_console_imgerror.png" width="696"></amp-img>

 * Interfaz web
<amp-img alt="AMP error: The tag &#39;img&#39; may only appear as a descendant of tag &#39;noscript&#39;. Did you mean &#39;amp-img&#39;? line 11, column 2" height="58" src="/static/img/docs/validator_webui_imgerror.png" width="676"></amp-img>

 * Extensión del navegador
<amp-img alt="AMP error: The tag &#39;img&#39; may only appear as a descendant of tag &#39;noscript&#39;. Did you mean &#39;amp-img&#39;? line 11, column 2" height="108" src="/static/img/docs/validator_extension_imgerror.png" width="724"></amp-img>

Cada herramienta ofrece varios fragmentos de información:

  1. La ubicación (línea y columna) en el documento HTML en el que ha ocurrido
     el error; es posible hacer clic en algunas interfaces para resaltar esa ubicación. En este
     caso, el problema se produce en la línea 11, columna 2.</li>
  1. Una línea de texto que describe el error. En este caso, el texto indica que
     estamos utilizando una etiqueta `<img>`, cuando deberíamos haber utilizado una etiqueta `<amp-img>`.</li>
  1. Un enlace a un documento relevante acerca del error. En este caso, la
     documentación para la etiqueta `<amp-img>`. No todos los errores generan
     enlaces de documentación.</li>

Al leer la [especificación](/es/docs/reference/spec.html) atentamente, nos damos cuenta de que estamos utilizando una etiqueta `<img>`, cuando deberíamos haber utilizado una etiqueta `<amp-img>`.

Para entender mejor la lista completa de los posibles errores,
consulta la [Guía de errores de validación de AMP](/es/docs/reference/validation_errors.html).
Si sigues sin encontrar la solución después de evaluar los errores atentamente, [pregúntanos](http://stackoverflow.com/questions/tagged/amp-html) e intentaremos ayudarte.
