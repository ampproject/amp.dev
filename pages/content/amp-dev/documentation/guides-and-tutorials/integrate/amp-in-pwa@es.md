---
$title: Insertar y utilizar AMP como fuente de datos
---

Si ya utilizas AMP pero todavía no has creado una aplicación web progresiva, tus páginas AMP podrían simplificar drásticamente el desarrollo de esta aplicación. Con esta guía aprenderás a utilizar AMP en aplicaciones web progresivas y como fuente de datos.

## Transición de JSON a AMP

En la mayoría de los casos, una aplicación web progresiva es una aplicación de una sola página que se conecta a una API JSON utilizando Ajax. Luego, esta API devuelve, por un lado, conjuntos de datos para gestionar la navegación y, por otro, el contenido real para renderizar los artículos.

En este punto, se convierte el contenido sin renderizar en código HTML que pueda usarse y se renderiza en un cliente. Este procedimiento suele ser costoso y, a menudo, difícil de mantener. Una buena alternativa sería reutilizar las páginas AMP que ya tengas como fuentes de datos, y en este caso lo mejor de todo es que puedes hacerlo fácilmente en pocas líneas de código gracias a la tecnología AMP.

##  Incluye "Shadow AMP" en tu aplicación web progresiva

En primer lugar, hay que incluir la versión especial de AMP "Shadow AMP" en la aplicación web progresiva. Sí, lo has entendido bien, tienes que cargar la biblioteca AMP en la página de nivel superior, pero no te preocupes, no va a controlar el contenido del nivel superior. Solo se pasarán a AMP las partes de la página que indiques.

Incluye Shadow AMP en la cabecera de tu página, así:

[sourcecode:html]
<!-- Asynchronously load the AMP-with-Shadow-DOM runtime library. -->
<script async src="https://cdn.ampproject.org/shadow-v0.js"></script>
[/sourcecode]

### ¿Cómo sabes que la API de Shadow AMP está lista para utilizar?

Te recomendamos que cargues la biblioteca de Shadow AMP con el atributo `async`. Sin embargo, al hacerlo, tienes que adoptar un cierto enfoque para saber cuándo se termina de cargar completamente la biblioteca y puedes usarla.

La señal que hay que observar es la disponibilidad de la variable global `AMP`. Shadow AMP utiliza un "[enfoque de carga de función asíncrona](http://mrcoles.com/blog/google-analytics-asynchronous-tracking-how-it-work/)" para facilitarlo. Echa un vistazo al código que se incluye a continuación:

[sourcecode:javascript]
(window.AMP = window.AMP || []).push(function(AMP) {
  // AMP está disponible.
});
[/sourcecode]

Este código funcionará y todas las devoluciones de llamada añadidas de esta forma se activarán en cuanto AMP esté disponible, pero ¿por qué motivo?

El código se puede leer así:

  1. Si "window.AMP" no existe, crea una matriz vacía que ocupe su posición.
  2. A continuación, envía una función de devolución de llamada a la matriz, que debe ejecutarse en cuanto AMP esté disponible.

Funciona porque la biblioteca Shadow AMP, después de cargarse, se da cuenta de que ya hay una matriz de devoluciones de llamada en `window.AMP`, y procesa toda la cola. Si ejecutas la misma función más tarde, seguirá funcionando porque `window.AMP` se sustituye por Shadow AMP y por un método `push` personalizado que sencillamente activa la devolución de llamada al momento.

Nota: Para que el código de ejemplo sea viable, te recomendamos que lo incluyas en un objeto Promise. De este modo, puedes usar este objeto siempre que vayas a trabajar con la API de AMP. Consulta nuestro [código de muestra React](https://github.com/ampproject/amp-publisher-sample/blob/master/amp-pwa/src/components/amp-document/amp-document.js#L20).

## Gestionar la navegación por una aplicación web progresiva

Este paso todavía se tiene que implementar de forma manual. Al fin y al cabo, tú decides cómo quieres presentar los enlaces al contenido en tu estructura de navegación. ¿En listas? ¿En tarjetas?

Por lo general, obtendrás una respuesta JSON que devolverá URL ordenadas con algunos metadatos. Al final deberías tener una devolución de llamada de función que se activa cuando el usuario hace clic en uno de los enlaces y dicha llamada debería incluir la URL de la página AMP solicitada. Si ya la tienes, puedes ir al último paso.

## Utilizar la API Shadow AMP para renderizar un insertado de página

Por último, cuando quieres mostrar contenido después de que el usuario inicie una acción, toca obtener el documento AMP pertinente y dejar que Shadow AMP lo haga todo a partir de ahora. En primer lugar, implementa una función parecida a esta para obtener la página:

[sourcecode:javascript]
function fetchDocument(url) {

  // fetch() no permite recuperar documentos,
  // por lo que recurrimos al siempre fiable XMLHttpRequest.
  var xhr = new XMLHttpRequest();

  return new Promise(function(resolve, reject) {
    xhr.open('GET', url, true);
    xhr.responseType = 'document';
    xhr.setRequestHeader('Accept', 'text/html');
    xhr.onload = function() {
      // .responseXML contiene un objeto Document listo para usarse
      resolve(xhr.responseXML);
    };
    xhr.send();
  });
}
[/sourcecode]

Importante: Para simplificar el código anterior, nos hemos saltado la corrección de errores. Asegúrate de detectar y corregir errores y, posteriormente, comprueba que no se hayan incluido nuevos.

Ahora que ya tenemos el objeto `Document` listo para usar, vamos a dejar que AMP tome el control y lo renderice. Consigue una referencia al elemento DOM que pueda usarse de contenedor del documento AMP y, a continuación, llama a `AMP.attachShadowDoc()` como se muestra a continuación:

[sourcecode:javascript]
// Aquí iría cualquier elemento DOM
var container = document.getElementById('container');

// La página AMP que quieres mostrar
var url = "https://my-domain/amp/an-article.html";

// Usa nuestro método fetchDocument para obtener el documento
fetchDocument(url).then(function(doc) {
  // Deja que AMP tome el control y renderice la página
  var ampedDoc = AMP.attachShadowDoc(container, doc, url);
});
[/sourcecode]

Nota: Antes de pasar el documento a AMP, hay que eliminar los elementos de página, como los encabezados o los pies de página, que solo tienen sentido si se muestra la página AMP de forma independiente, pero no si está insertada.

¡Y ya está! Tu página AMP se renderiza como un elemento secundario de tu aplicación web progresiva global.

## Déjalo todo limpio

Es posible que tus usuarios naveguen de una AMP a otra con tu aplicación web progresiva. Al descartar la anterior página AMP renderizada, asegúrate de indicárselo a AMP, por ejemplo, así:

[sourcecode:javascript]
// ampedDoc es la referencia devuelta por AMP.attachShadowDoc
ampedDoc.close();
[/sourcecode]

De esta forma le indicas a AMP que no vas a utilizar más este documento y se libera espacio en la memoria y recursos en la CPU.

## ¿Quieres verlo en acción?

[video src="/static/img/docs/pwamp_react_demo.mp4" width="620" height="1100" loop="true", controls="true"]

Puedes ver el funcionamiento del patrón de páginas AMP en una aplicación web progresiva en la página de demostración [Muestra de React](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa) que hemos creado. Incluye transiciones fluidas durante la navegación y se presenta con un sencillo componente React que realiza los pasos que se han explicado anteriormente. Tiene las ventajas de ambas tecnologías: la flexibilidad y personalización de JavaScript en la aplicación web progresiva y la gestión de contenidos de AMP.

* Toma el código fuente de este enlace: [https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa).
* Utiliza el componente React independiente de npm: [https://www.npmjs.com/package/react-amp-document](https://www.npmjs.com/package/react-amp-document).
* Mira cómo funciona en esta página: [https://choumx.github.io/amp-pwa/](https://choumx.github.io/amp-pwa/) (preferiblemente, en el teléfono o en una simulación de dispositivos móviles).

También puedes consultar una muestra de páginas AMP y PWA con un framework Polymer. Esta muestra utiliza [amp-viewer](https://github.com/PolymerLabs/amp-viewer/) para insertar páginas AMP.

* Toma el código fuente de este enlace: [https://github.com/Polymer/news/tree/amp](https://github.com/Polymer/news/tree/amp).
* Mira cómo funciona en esta página: [https://polymer-news-amp.appspot.com/](https://polymer-news-amp.appspot.com/).
