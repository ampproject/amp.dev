---
$title: Nuestra Primer Página AMP
$order: 3
leveled: true
---

[filter level="beginner"]
## Iniciando Nuestro Viaje

Es el primer dia de nuestro equipo desarrollando nuestro sitio Chico's Cheese Bike. Hasta ahora, el sitio es una página HTML básica, con un encabezado que contiene el título de nuestro sitio, una imagen de una de nuestras bicicletas y algún texto de marketing.

{{ image('/static/img/courses/beginner/image17.png', 275, 263,  align='center half', caption='Nuestro sitio basico HTML') }}

En tu proyecto Glitch, abre index.html y verifica que el HTML se vea como esto:

[sourcecode:html]
{% raw %}<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Chico's Cheese Bicycles</title>
    <link
      rel="shortcut icon"
      href="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese-favicon.png?1540228964214"
    />
  </head>
  <body>
    <header class="headerbar"><h2>Chico's Cheese Bicycles</h2></header>
    <main>
      <div class="main-content">
        <img
          src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fricotta-racer.jpg?1540228217746"
        />
        <div class="below-hero">
          <h2 class="main-heading">What we're about</h2>
          <p class="main-text">
            We sell the only ten-speed bicycles in the world made entirely of
            cheese. They get you where you need to go, and you never arrive
            hungry. Our bikes are 100% biodegradable. And with our new
            rodent-repelling varnish they last longer than ever!
          </p>
        </div>
      </div>
    </main>
  </body>
</html>
{% endraw %}[/sourcecode]

Nuestro equipo ha determinado que el uso de AMP facilitará la creación de las funciones del sitio que queremos, por lo que es nuestro trabajo convertir esta página HTML en una página AMP válida.

Primero, debemos indicarle al mundo que estamos intentando crear un sitio AMP. Para hacer esto, agregaremos algo de decoración a nuestra etiqueta `<html>`. Si la etiqueta `<html>` contiene un símbolo `⚡` o la palabra `amp`, herramientas como el Validador AMP y el Cache AMP podrán tratar nuestro sitio como un sitio AMP.

En tu proyecto Glitch, agrega el símbolo `⚡` a la etiqueta `<html>` como esta:

[sourcecode:html]
{% raw %}<html ⚡ lang="en">{% endraw %}[/sourcecode]

Este símbolo es esencial. Indica que estamos haciendo un sitio AMP. A continuación, discutiremos que herramientas cómo el Validador AMP puede ayudarnos a determinar los cambios que necesitamos para hacer nuestro sitio valido.

## Validación y el Cache AMP

Hemos mencionado el concepto de escribir "AMP valido" tiempo atras. Véamos qué significa y por qué es importante.

En primer lugar, una AMP valida es importante porque es bueno para los usuarios. Las reglas de AMP representan las mejores prácticas en rendimiento, accesibilidad y seguridad. Por lo tanto, los errores de validación son la forma que tiene AMP de decirte que hay posibilidades de mejorar tu sitio para tus usuarios. 

En segundo lugar, una AMP valida es importante debido a la utilidad de la caché de AMP. La caché es una parte poderosa de la arquitectura AMP. Es una red de entrega de contanido (CDN) diseñada para:

- Servir sólo páginas AMP válidas.

- Permitir que las páginas AMP se carguen previamente de forma eficiente y segura.

- Realizar varias optimizaciones de rendimiento en las páginas de la caché.

Cuando los usuarios solicitan tu sitio AMP, se les envía el sitio desde un servidor de cache AMP cerca de ellos. Si tu sitio esta en la cache de AMP, se puede precargar efectivamente en segundo plano cuando utiliza motores de búsqueda como Google. Si los usuarios seleccionan tu sitio desde los resultados de búsqueda, aparecerá en cuestión de segundos incluso con una mala conexión. Además la cache de AMP realizará optimizaciones automáticas en tu sitio, tales como:

- Pondrá las fuentes en cache.

- Comprimirá y pondrá en cache las imágenes, y las convertirá a nuevos formatos como WebP.

- Sanitizará documentos AMP para prevenir ataques de scripting cross-site o otras vulnerabilidades.

- Arreglará problemas de HTML que puedan resultar en inconsistencias de visualización en varios buscadores; por ejemplo, cerrando todas las etiquetas, nombres de atributos en minúsculas, o escapando texto.

A medida que creas sitios web con AMP y realizando los ejercicios de estas capacitaciones, podrás estar seguro que tus sitios seran validos. Para realizar un seguimiento de los errores de validación, usaremos el Validador AMP que hemos colocado en el [course introduction](course-introduction.md#setting-up-the-amp-validator).

## Ejercicio 1: Usando el Validador AMP

Despues de que hayas instalado la extensión de Chrome del Validador AMP, el validador podrá correr automáticamente en cualquier página abierta que tenga el símbolo de AMP (⚡) en su etiqueta `<html>`, como nosotros ahora. Abre tu proyecto Glitch y mira el icono para la extensión del Validador AMP. Debe ser similar al rojo con la etiqueta indicando que hay 7 errores de validación, como esta:

{{ image('/static/img/courses/beginner/image6.png', 58, 58,  align='center third', caption='The AMP Validator Chrome extension showing AMP issues.') }}

Al dar clic en el icono del Validador AMP abre un ventana emergente que enlista los errores de validación de la página actual y brinda algunas posibles soluciones a nuestros problemas.

{{ image('/static/img/courses/beginner/image22.png', 1548, 1170, align='center', caption='The issues displayed in the AMP Validator Chrome Extension.') }}

En el caso del renglón de la etiqueta `<img>`:

`The tag <img> may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?`


Da clic en el enlace “Debug” al final del renglón. El enlace te llevará directamente a la linea de código en tu página que contiene el error listado. Esto te ayuda a encontrar los errores que ocurren en tus archivos, y te ayuda mencionando el contexto necesario para entender cómo reparar los errores.
Y no te preocupes: Este mensaje parecerá poco claro ahora, pero es un arreglo fácil. Necesitamos usar el componente AMP `<amp-img>` en lugar de la etiqueta HTML  `<img>`. En la sección [Thinking in Components](thinking-in-components.md) de este curso, exploraremos por qué aparece este error, que es `<amp-img>`, y cómo repararlo.

{{ image('/static/img/courses/beginner/image16.png', 1999, 798, align='center', caption='AMP debugger showing an error inline.') }}

Para cualquier otra validación de error, da clic en el enlace etiquetado como “Learn more.” Este enlace te lleva directamente de la descripción del error a la documentación AMP correspondiente que podrá ayudarte a reparar el problema.

{{ image('/static/img/courses/beginner/image21.png', 512, 342, align='center', caption='AMP documentation reached via the “Learn more” link in the AMP Validator.') }}

[tip type="read-on"]
**Nota**: ¿No puedes enteneder cómo corregir un error basándote en las opciones Debug y Learn More de la extensión del Validador AMP? Lee el listado completo de errores de validación y las acciones de corrección sugeridas [aqui](../../../documentation/guides-and-tutorials/learn/validation-workflow/validation_errors.md).
[/tip]

El siguiente paso es reparar los errores de validación. Para hacer esto, necesitamos aprender un poco mas sobre los elementos requeridos de una página AMP. Necesitamos más que sólo agregar un símbolo a nuestro HTML para crear una página AMP valida.

## La Anatomía de una página AMP

Cada página AMP comienza con la misma plantilla básica. Luego, pernalizamos y construimos considerando esto. Esta plantilla de inicio es algunas veces llamada AMP “boilerplate“. Este “boilerplate“ es una combinación de etiquetas que configuran el tiempo de ejecución de AMP y ayudan a que las páginas AMP se ejecuten sin problemas.

En esta sección, explicaremos un poco sobre cada parte del AMP “boilerplate“. Sin embargo, no necesitas recordar agregar estas etiquetas en cada página que crees con AMP. Puedes simplemente comenzar tus páginas futuras de AMP con [esto](../../../documentation/guides-and-tutorials/start/create/basic_markup.md).

Las siguientes etiquetas son requeridas en páginas AMP. Las páginas AMP validas deben:

- Comenzar con el doctype `<!doctype html>`.

- Contener ambas etiquetas `<head>` y `<body>`.

- Contener una etiqueta `<meta charset="utf-8">` como primer elemento de la etiqueta `<head>`.

- Contener una etiqueta `<meta name="viewport" content="width=device-width">` dentro de la etiqueta `<head>`. **Nota**: Tambien se recomienda incluir `initial-scale=1`.

Las siguientes reglas son específicamente para configurar el tiempo de ejecución de AMP. Las páginas AMP válidas deben:

- Contener una etiqueta superior `<html ⚡>`. El símbolo del rayo indica que este es un sitio AMP. **Nota**: `<html amp>` es aceptado tambien.

- Contener una etiqueta `<script async src="https://cdn.ampproject.org/v0.js"></script>` dentro de la etiqueta `<head>`. Esto carga la libreria JavaScript de AMP. **Nota**: Como una buena práctica, debes incluir el script tan pronto sea posible en el `<head>`.

- Contener una etiqueta `<link rel="canonical" href="$SOME_URL">` dentro del `<head>`. Este apunta a una versión regular HTML de tu sitio si es que existe, o apunta asi mismo si no existe una version no AMP de tu sitio. **Nota**: Debes reemplazar `$SOME_URL` en el atributo `href` con la actual URL de tu pagina.

- Contener el estilo de código boilerplate de AMP en la etiqueta `<head>`. Este CSS oculta el contenido de la página hasta que la libreria AMP se ha cargado por completo. El estilo boilerplate de AMP es similar a:

[sourcecode:html]
{% raw %}
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
{% endraw %}[/sourcecode]

[tip type="note"]
**Nota**: El código boilerplate de AMP debe ser copiado tal cual. El código esta reducido, pero también funciona si  estas usando un auto-formateador en tu código, como Prettier. Asegurate no cambiar el orden del texto dentro de las etiquetas o cambiar los valores. Si quieres conocer más esas etiquetas y porqué son importantes, puedes leer más sobre ellas en el [apendice](appendix.md).
[/tip]

## CSS y AMP

CSS personaliza la apariencia de tus sitios web. Casi siempre agregarás estilos personalizados a tus páginas AMP. Aún así, ten en cuenta que AMP tiene algunas restricciones en el uso de CSS:

- Los estilos deben estar solo en el encabezado del documento dentro de la etiqueta `<style amp-custom>` o dentro de cada atributo `style` cuando así se requiera. Esta limitación impide cargar una hoja de estilos externa, así como evitar solicitudes de red adicionales, habilitando el cache y mejorando el rendimiento.

- Una página AMP debe sólo tener una etiqueta `<style amp-custom>`.

- La página debe incluir no más de 75K de CSS.

- La regla `!important` está restringida.

- Para más reglas CSS deshabilitadas o restringidas, revisa la documentación [aqui](../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md).

Para practicar el agregar estilos personalizados a tu página AMP, agrega la siguiente etiqueta `<style amp-custom>` a tu página en el `<head>` y observa qué pasa. Una vez que hayas terminado, puedes quitar los estilos de tu página.

[sourcecode:html]
{% raw %}<style amp-custom>
    body {
        font-family: sans-serif;
        line-height: 1.5rem;
        padding: 20px;
    }
    p, h2 {
        border: 1px dotted red;
    }
</style>
{% endraw %}[/sourcecode]

{{ image('/static/img/courses/beginner/image10.png', 185, 323, align='center third', caption='Custom CSS affecting our page.') }}

## Ejercicio 2: Convirtiendo el resto de nuestra página HTML

Ahora es tiempo de corregir los errores de validación en nuestro sitio que hemos descubierto en el ejercicio anterior. Para hacer esto, tenemos que agregar las partes faltantes de la plantilla boilerplate de AMP a nuestro sitio HTML básico.

Para este y todos los ejercicios futuros, aplicaremos lo que hemos aprendido para implementar cambios reales de código a nuestro sitio en Glitch. Te daremos algunas pistas a lo largo del camino. Al final de cada ejercicio, te proporcionaremos la solución completa. Intenta completar los ejercicios por tu cuenta, pero si estas atascado o necesitas sugerencias, no dudes en copiar el código de las secciones de solución.

Adicionalmente, al principio y final de cada uno de estos cursos, te daremos una plantilla Glitch que incluye todo el código que hemos completado hasta ese momento. Si alguna vez pierdes tu página actual de Glitch o deseas comenzar desde nuestras soluciones, puede copiar el código de estos ejemplos de Glitch, o simplemente mezclar esos ejemplos y seguir adelante desde allí.

Usa la [documentacion](../../../documentation/guides-and-tutorials/start/create/basic_markup.md) para el boilerplate AMP y los siguientes comentarios, actualiza tu proyecto Glitch si solo el error de validacion de la etiqueta `<img>` persiste. Adicionalmente, para ayudarnos con el sitio Chico’s Cheese Bikes, tendremos algo de CSS para usarlo en los entrenamientos. Si abres [esta](https://pastebin.com/vNws2bA1) página, la etiqueta `<style amp-custom>` estará ahí con los estilos que necesitas. Debes copiar estos estilos al proyecto en el que estas trabajando.

### Solucion

La solución la puedes encontrar en <a href="https://glitch.com/~hungry-modem" target="_blank">este Glitch de ejemplo</a>. La porción de la pagina que contiene los cambios debe parecerse a esto:

[sourcecode:html]
{% raw %}<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <title>Chico's Cheese Bicycles</title>
  <link rel="shortcut icon" href="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese-favicon.png?1540228964214">
  <meta name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1">
  <link rel="canonical" href="https://hungry-modem.glitch.me/">
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <style amp-custom>
    ... styles elided due to length ...
  </style>
</head>
{% endraw %}[/sourcecode]

## Una Página AMP Valida...Casi

Si tu completaste todos los ejercicios anteriores, ¡felicidades! Tu página es casi una página AMP valida.
Si abres tu página con Chrome DevTools (`Command+Option+I` en Mac o `Control+Shift+I` en Windows/Linux) y seleccionas la **Console**, verás este mensaje en la consola, indicando que la libreria AMP fue cargada satisfactoriamente:

```
Powered by AMP ⚡ HTML
```

Next, if you open the AMP Validator extension, it shows that we’re down to the last error:

```
The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?
```

Este es un error importante de entender. Algunas etiquetas HTML no estan permitidas en documentos AMP. En algunos casos, AMP requiere que uses una alternativa. Llaamamos a estas etiquetas HTML personalizadas, sin estandar "componentes" y analizaremos más a detalle más adelante en la siguiente sección de esta capacitación.

[tip type="note"]

**Nota**: Puedes iniciar tus futuras páginas AMP usando el HTML de [aqui](../../../documentation/guides-and-tutorials/start/create/basic_markup.md) como punto de partida. Este HTML incluye el boilerplate AMP anterior. Contiene además todas las etiquetas y elementos necesarios que hemos mencionado hasta ahora. Alternativamente, puedes personalizar tu punto de partida con caracteristicas adicionales usando la herramienta de generación boilerplate [aqui](https://amp.dev/boilerplate).

[/tip]
[/filter]
[filter level="advanced"]
## Iniciando Nuestro Viaje

Es el primer dia de nuestro equipo desarrollando nuestro sitio Chico's Cheese Bike. Hasta ahora, el sitio es una página HTML básica, con un encabezado que contiene el título de nuestro sitio, una imagen de una de nuestras bicicletas y algún texto de marketing. Nuestro objetivo es convertir esta página en AMP!

{{ image('/static/img/courses/beginner/image17.png', 824, 790,  align='center half', caption='Our basic HTML website') }}

En <a href="https://glitch.com/edit/#!/nosy-leech" target="_blank">tu</a> proyecto Glitch, abre `index.html` y verifica que el HTML se vea como esto:

[sourcecode:html]
{% raw %}<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Chico's Cheese Bicycles</title>
    <link
      rel="shortcut icon"
      href="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese-favicon.png?1540228964214"
    />
  </head>
  <body>
    <header class="headerbar"><h2>Chico's Cheese Bicycles</h2></header>
    <main>
      <div class="main-content">
        <img
          src="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fricotta-racer.jpg?1540228217746"
        />
        <div class="below-hero">
          <h2 class="main-heading">What we're about</h2>
          <p class="main-text">
            We sell the only ten-speed bicycles in the world made entirely of
            cheese. They get you where you need to go, and you never arrive
            hungry. Our bikes are 100% biodegradable. And with our new
            rodent-repelling varnish they last longer than ever!
          </p>
        </div>
      </div>
    </main>
  </body>
</html>
{% endraw %}[/sourcecode]

Para convertir esto en una página AMP, primero debemos indicarle al mundo que estamos intentando crear un sitio AMP. Para hacer esto, agregaremos algo de decoración a nuestra etiqueta `<html>`. Si la etiqueta `<html>` contiene un símbolo `⚡` o la palabra `amp`, herramientas como el Validador AMP y el Cache AMP podrán tratar nuestro sitio como un sitio AMP.

En tu proyecto Glitch, agrega el símbolo `⚡` a la etiqueta `<html>` como esta:

[sourcecode:html]
{% raw %}<html ⚡ lang="en">{% endraw %}[/sourcecode]

Este símbolo es esencial. Indica que estamos haciendo un sitio AMP. A continuación, discutiremos que herramientas cómo el Validador AMP puede ayudarnos a determinar los cambios que necesitamos para hacer nuestro sitio valido.

## Validacion y el Cache AMP

¿Porqué esto es importante para escribir un AMP valido?

En primer lugar, una AMP valida es importante porque es bueno para los usuarios. Las reglas de AMP representan las mejores prácticas en rendimiento, accesibilidad y seguridad. Por lo tanto, los errores de validación son la forma que tiene AMP de decirte que hay posibilidades de mejorar tu sitio para tus usuarios. 

En segundo lugar, una AMP valida es importante debido a la utilidad de la caché de AMP. La caché es una parte poderosa de la arquitectura AMP. Es una red de entrega de contanido (CDN) diseñada para:

- Servir sólo páginas AMP válidas.

- Permitir que las páginas AMP se carguen previamente de forma eficiente y segura.

- Realizar varias optimizaciones de rendimiento en las páginas de la caché.

Las arañas web están ahí afuera en este momento buscando páginas AMP válidas. Cuando esta araña encuentra una página AMP válida, la caché AMP correspondiente almacenará su HTML. Luego, cuando los usuarios solicitan tu sitio AMP, se les envía el sitio desde un servidor de cache AMP cerca de ellos. Si tu sitio esta en la cache de AMP, se puede precargar efectivamente en segundo plano cuando utiliza motores de búsqueda como Google. Si los usuarios seleccionan tu sitio desde los resultados de búsqueda, aparecerá en cuestión de segundos incluso con una mala conexión. Además la cache de AMP realizará optimizaciones automáticas en tu sitio, tales como:

- Pondrá las fuentes en cache.

- Comprimirá y pondrá en cache las imágenes, y las convertirá a nuevos formatos como WebP.

- Sanitizará documentos AMP para prevenir ataques de scripting cross-site o otras vulnerabilidades.

- Arreglará problemas de HTML que puedan resultar en inconsistencias de visualización en varios buscadores; por ejemplo, cerrando todas las etiquetas, nombres de atributos en minúsculas, o escapando texto.

A medida que creas sitios web con AMP y realizando los ejercicios de estas capacitaciones, podrás estar seguro que tus sitios seran validos. Para realizar un seguimiento de los errores de validación, usaremos el Validador AMP que hemos colocado en el [course introduction]({{g.doc('/content/amp-dev/documentation/courses/beginning-course/course-introduction.md', locale=doc.locale).url.path}}#setting-up-the-amp-validator).

## Ejercicio 1: Usando el Validador AMP

Despues de que hayas instalado la extensión de Chrome del Validador AMP, el validador podrá correr automáticamente en cualquier página abierta que tenga el símbolo de AMP (⚡) en su etiqueta `<html>`, como nosotros ahora. Abre tu proyecto Glitch y mira el icono para la extensión del Validador AMP. Debe ser similar al rojo con la etiqueta indicando que hay 7 errores de validación, como esta:

{{ image('/static/img/courses/beginner/image6.png', 58, 58,  align='center third', caption='The AMP Validator Chrome extension showing AMP issues.') }}

Al dar clic en el icono del Validador AMP abre un ventana emergente que enlista los errores de validación de la página actual y brinda algunas posibles soluciones a nuestros problemas.

{{ image('/static/img/courses/beginner/image22.png', 1548, 1170, align='center', caption='The issues displayed in the AMP Validator Chrome Extension.') }}

En el caso del renglón de la etiqueta `<img>`:

`The tag <img> may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?`

Da clic en el enlace “Debug” al final del renglón. El enlace te llevará directamente a la linea de código en tu página que contiene el error listado. Esto te ayuda a encontrar los errores que ocurren en tus archivos, y te ayuda mencionando el contexto necesario para entender cómo reparar los errores.
Y no te preocupes: Este mensaje parecerá poco claro ahora, pero es un arreglo fácil. Necesitamos usar el componente AMP `<amp-img>` en lugar de la etiqueta HTML  `<img>`. En la sección [Thinking in Components](thinking-in-components.md) de este curso, exploraremos por qué aparece este error, que es `<amp-img>`, y cómo repararlo.

{{ image('/static/img/courses/beginner/image16.png', 1999, 798, align='center', caption='AMP debugger showing an error inline.') }}

Para cualquier otra validación de error, da clic en el enlace etiquetado como “Learn more.” Este enlace te lleva directamente de la descripción del error a la documentación AMP correspondiente que podrá ayudarte a reparar el problema.

{{ image('/static/img/courses/beginner/image21.webp', 1024, 684, align='center', caption='AMP documentation reached via the "Learn more" link in the AMP Validator.') }}

[tip type="read-on"]
**Nota**: ¿No puedes enteneder cómo corregir un error basándote en las opciones Debug y Learn More de la extensión del Validador AMP? Lee el listado completo de errores de validación y las acciones de corrección sugeridas [aqui]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validation_errors.md', locale=doc.locale).url.path}}).
[/tip]

El siguiente paso es reparar los errores de validación. Para hacer esto, necesitamos aprender un poco mas sobre los elementos requeridos de una página AMP.

## La Anatomía de una página AMP

Cada página AMP comienza con la misma plantilla básica HTML, algunas veces llamada AMP “boilerplate“. Este “boilerplate“ es una combinación de etiquetas que configuran el tiempo de ejecución de AMP y ayudan a que las páginas AMP se ejecuten sin problemas.

Las siguientes etiquetas son requeridas en páginas AMP. Las páginas AMP validas deben:

- Comenzar con el doctype `<!doctype html>`.

- Contener ambas etiquetas `<head>` y `<body>`.

- Contener una etiqueta `<meta charset="utf-8">` como primer elemento de la etiqueta `<head>`.

- Contener una etiqueta `<meta name="viewport" content="width=device-width">. **Nota**: Tambien se recomienda incluir `initial-scale=1`.

Las siguientes reglas son específicamente para configurar el tiempo de ejecución de AMP. Las páginas AMP válidas deben:

- Contener una etiqueta superior `<html ⚡>`. El símbolo del rayo indica que este es un sitio AMP. **Nota**: `<html amp>` es aceptado tambien.

- Contener una etiqueta `<script async src="https://cdn.ampproject.org/v0.js"></script>` dentro de la etiqueta `<head>`. Esto carga la libreria JavaScript de AMP. **Nota**: Como una buena práctica, debes incluir el script tan pronto sea posible en el `<head>`.

- Contener una etiqueta `<link rel="canonical" href="$SOME_URL">` dentro del `<head>`. Este apunta a una versión regular HTML de tu sitio si es que existe, o apunta asi mismo si no existe una version no AMP de tu sitio. **Nota**: Debes reemplazar `$SOME_URL` en el atributo `href` con la actual URL de tu pagina.

- Contener el estilo de código boilerplate de AMP en la etiqueta `<head>`. Este CSS oculta el contenido de la página hasta que la libreria AMP se ha cargado por completo. El estilo boilerplate de AMP es similar a:

[sourcecode:html]
{% raw %}

<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>

{% endraw %}[/sourcecode]


[tip type="note"]
**Nota**: El código boilerplate de AMP debe ser copiado tal cual. El código esta reducido, pero también funciona si  estas usando un auto-formateador en tu código, como Prettier. Asegurate no cambiar el orden del texto dentro de las etiquetas o cambiar los valores. Si quieres conocer más esas etiquetas y porqué son importantes, puedes leer más sobre ellas en el [apendice]({{g.doc('/content/amp-dev/documentation/courses/beginning-course/appendix.md', locale=doc.locale).url.path}}).
[/tip]

## CSS and AMP

Para asegurar un buen desempeño y permitir que AMP haga lo necesario, AMP pone algunas restricciones en el uso de CSS:

- Los estilos deben estar solo en el encabezado del documento dentro de la etiqueta `<style amp-custom>` o dentro de cada atributo `style` cuando así se requiera. Esta limitación impide cargar una hoja de estilos externa, así como evitar solicitudes de red adicionales, habilitando el cache y mejorando el rendimiento.

- Una página AMP debe sólo tener una etiqueta `<style amp-custom>`.

- La página debe incluir no más de 75K de CSS.

- La regla `!important` está restringida.

- Para más reglas CSS deshabilitadas o restringidas, revisa la documentación [aqui]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md', locale=doc.locale).url.path}}).

[sourcecode:html]
{% raw %}<style amp-custom>
    body {
        font-family: sans-serif;
        line-height: 1.5rem;
        padding: 20px;
    }
    p, h2 {
        border: 1px dotted red;
    }
</style>
{% endraw %}[/sourcecode]

{{ image('/static/img/courses/beginner/image10.png', 738, 1290, align='center third', caption='Custom CSS affecting our page.') }}

## Ejercicio 2: Convirtiendo el resto de nuestra página HTML

Ahora es tiempo de corregir los errores de validación en nuestro sitio que hemos descubierto en el ejercicio anterior. Para hacer esto, tenemos que agregar las partes faltantes de la plantilla boilerplate de AMP a nuestro sitio HTML básico.

Para este y todos los ejercicios futuros, aplicaremos lo que hemos aprendido para implementar cambios reales de código a nuestro sitio en Glitch. Te daremos algunas pistas a lo largo del camino. Al final de cada ejercicio, te proporcionaremos la solución completa. Intenta completar los ejercicios por tu cuenta, pero si estas atascado o necesitas sugerencias, no dudes en copiar el código de las secciones de solución. Adicionalmente, al principio y final de cada uno de estos cursos, te daremos una plantilla Glitch que incluye todo el código que hemos completado hasta ese momento.

Usa la [documentacion]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/basic_markup.md', locale=doc.locale).url.path}}) para el boilerplate AMP y los siguientes comentarios, actualiza tu proyecto Glitch si solo el error de validacion de la etiqueta `<img>` persiste. Adicionalmente, para ayudarnos con el sitio Chico’s Cheese Bikes, tendremos algo de CSS para usarlo en los entrenamientos. Si abres [esta](https://pastebin.com/vNws2bA1) página, la etiqueta `<style amp-custom>` estará ahí con los estilos que necesitas. Debes copiar estos estilos al proyecto en el que estas trabajando.

### Solucion

La solución se puede encontar en <a href="https://glitch.com/~hungry-modem" target="_blank">este ejemplo Glitch</a>. La porción de la página conteniendo los cambios debe parecerse a esto:

[sourcecode:html]
{% raw %}<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <title>Chico's Cheese Bicycles</title>
  <link rel="shortcut icon" href="https://cdn.glitch.com/d7f46a57-0ca4-4cca-ab0f-69068dec6631%2Fcheese-favicon.png?1540228964214">
  <meta name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1">
  <link rel="canonical" href="https://hungry-modem.glitch.me/">
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <style amp-custom>
    ... styles elided due to length ...
  </style>
</head>
{% endraw %}[/sourcecode]

## Una Página AMP Valida...Casi

Si tu completaste todos los ejercicios anteriores, ¡felicidades! Tu página es casi una página AMP valida.
Si abres tu página con la consola de Chrome DevTools verás este mensaje en la consola, indicando que la libreria AMP fue cargada satisfactoriamente:

```
Powered by AMP ⚡ HTML
```

Next, if you open the AMP Validator extension, it shows that we're down to the last error:

```
The tag 'img' may only appear as a descendant of tag 'noscript'. Did you mean 'amp-img'?
```

Este es un error importante de entender. Algunas etiquetas HTML no estan permitidas en documentos AMP. En algunos casos, AMP requiere que uses una alternativa. Llaamamos a estas etiquetas HTML personalizadas, sin estandar "componentes" y analizaremos más a detalle más adelante en la siguiente sección de esta capacitación.
[/filter]
