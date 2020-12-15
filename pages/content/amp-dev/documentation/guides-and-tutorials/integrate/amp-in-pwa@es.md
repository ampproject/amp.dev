---
"$title": Inserción y uso de AMP como fuente de datos
"$order": '1'
description: Si ya utiliza AMP pero aún no ha creado una aplicación web progresiva, sus páginas AMP podrían simplificar radicalmente el desarrollo de dicha aplicación.
formats:
- websites
author: pbakaus
---

Si ya utiliza AMP pero aún no ha creado una aplicación web progresiva, sus páginas AMP podrían simplificar radicalmente el desarrollo de dicha aplicación. Con esta guía aprenderá a utilizar AMP en aplicaciones web progresivas y como fuente de datos.

## Transición de JSON a AMP

En la mayoría de los casos, una aplicación web progresiva es una aplicación de una sola página que se conecta a una API JSON utilizando Ajax. Después, esta API devuelve, por un lado, conjuntos de datos para administrar la navegación y, por otro, el contenido real para renderizar los artículos.

En este punto, se convierte el contenido sin renderizar en código HTML que pueda usarse y se renderiza en un cliente. Este procedimiento suele ser costoso y, a menudo, difícil de mantener. Una buena alternativa sería reutilizar las páginas AMP que ya tenga como fuentes de datos. Lo mejor de todo es que puede hacerlo fácilmente con unas cuantas líneas de código gracias a la tecnología AMP.

## Incluya "Shadow AMP" en su aplicación web progresiva

En primer lugar, se debe incluir la versión especial de AMP "Shadow AMP" en la aplicación web progresiva. Sí, es correcto, debe cargar la biblioteca AMP en la página de nivel superior, pero esto no controlará el contenido del nivel superior, solo "amplificará" las secciones de la página que indique.

Incluya Shadow AMP en la cabecera de su página de la siguiente manera:

[sourcecode:html]
<!-- Asynchronously load the AMP-with-Shadow-DOM runtime library. -->
<script async src="https://cdn.ampproject.org/shadow-v0.js"></script>
[/sourcecode]

### ¿Cómo saber si la API de Shadow AMP está lista para usarse?

Le recomendamos que cargue la biblioteca de Shadow AMP con el atributo `async`. Sin embargo, al hacerlo, debe adoptar cierto enfoque para saber cuándo se cargó completamente la biblioteca y ya está lista para utilizarla.

La señal que debe observar es la disponibilidad de la variable global `AMP`, y Shadow AMP utiliza un "[enfoque de carga de función asíncrona](http://mrcoles.com/blog/google-analytics-asynchronous-tracking-how-it-work/)" para facilitarlo. Dele un vistazo al código que se incluye a continuación:

[sourcecode:javascript]
(window.AMP = window.AMP || []).push(function(AMP) {
  // AMP is now available.
});
[/sourcecode]

Este código funcionará y todas las devoluciones de llamada que se hayan agregado de esta forma se activarán en cuanto AMP esté disponible, pero ¿por qué?

El código puede leerse así:

1. Si "window.AMP" no existe, crea una matriz vacía que ocupe su posición.
2. A continuación, envía una función de devolución de llamada a la matriz que debe ejecutarse en cuanto AMP esté disponible.

Funciona porque la biblioteca Shadow AMP, después de cargarse, se da cuenta de que ya hay una matriz de devoluciones de llamada en `window.AMP` y procesa toda la cola. Si posteriormente ejecuta la misma función, seguirá funcionando porque `window.AMP` se sustituye por Shadow AMP y por un método `push` personalizado que sencillamente activa la devolución de la llamada al instante.

[tip type="tip"] <strong>Nota:</strong> Para que el código de ejemplo sea viable, le recomendamos que lo incluya en un objeto Promise. De este modo, podrá usar este objeto siempre que trabaje con la API de AMP. Consulte nuestro [código de muestra React](https://github.com/ampproject/amp-publisher-sample/blob/master/amp-pwa/src/components/amp-document/amp-document.js#L20) para ver un ejemplo. [/tip]

## Administración de la navegación en su aplicación web progresiva

Este paso aún debe implementarse de forma manual. Al fin y al cabo, usted decide cómo desea presentar los enlaces al contenido en su estructura de navegación. ¿En forma de listas? ¿En tarjetas?

Por lo general, obtendrá una respuesta JSON que devolverá URL ordenadas con algunos metadatos. Al final debe obtener una devolución de llamada de función que se activa cuando el usuario hace clic en uno de los enlaces y dicha llamada debería incluir la URL de la página AMP solicitada. Si ya la tiene, puede ir al último paso.

## Uso de la API Shadow AMP para renderizar la inserción de una página

Por último, cuando desee mostrar contenido después de que el usuario inicie una acción, es  momento de obtener el documento AMP correspondiente y dejar que Shadow AMP haga todo a partir de ahora. En primer lugar, implemente una función similar a esta para obtener la página:

[sourcecode:javascript]
function fetchDocument(url) {

  // unfortunately fetch() does not support retrieving documents,
  // so we have to resort to good old XMLHttpRequest.
  var xhr = new XMLHttpRequest();

  return new Promise(function(resolve, reject) {
    xhr.open('GET', url, true);
    xhr.responseType = 'document';
    xhr.setRequestHeader('Accept', 'text/html');
    xhr.onload = function() {
      // .responseXML contains a ready-to-use Document object
      resolve(xhr.responseXML);
    };
    xhr.send();
  });
}
[/sourcecode]

[tip type="important"] <strong>IMPORTANTE:</strong> Para simplificar el código anterior, nos hemos saltado la corrección de errores. Asegúrate de detectar y corregir errores y, posteriormente, comprueba que no se hayan incluido nuevos. [/tip]

Ahora que ya tenemos el objeto `Document` listo para usarse, dejaremos que AMP tome el control y lo renderice. Obtenga una referencia al elemento DOM que pueda usarse como contenedor del documento AMP y después llame a `AMP.attachShadowDoc()`, tal como se muestra a continuación:

[sourcecode:javascript]
// This can be any DOM element
var container = document.getElementById('container');

// The AMP page you want to display
var url = "https://my-domain/amp/an-article.html";

// Use our fetchDocument method to get the doc
fetchDocument(url).then(function(doc) {
  // Let AMP take over and render the page
  var ampedDoc = AMP.attachShadowDoc(container, doc, url);
});
[/sourcecode]

[tip type="tip"] <strong>Nota:</strong> Antes de pasar el documento a AMP, debe eliminar los elementos de la página, como los encabezados o los pies de página, que solo tienen sentido si se muestra la página AMP de forma independiente, pero no en modo de inserción. [/tip]

¡Y listo! Su página AMP se renderizará como un elemento secundario de su aplicación web progresiva global.

## Deje todo limpio

Es posible que sus usuarios naveguen de una AMP a otra con su aplicación web progresiva. Al descartar la página AMP renderizada anterior, asegúrese de indicarlo a AMP, por ejemplo, de la siguiente manera:

[sourcecode:javascript]
// ampedDoc is the reference returned from AMP.attachShadowDoc
ampedDoc.close();
[/sourcecode]

De esta forma le indica a AMP que no utilizará más este documento y se libera espacio en la memoria y recursos en la CPU.

## ¿Quiere verlo en acción?

[video src="/static/img/docs/pwamp_react_demo.mp4" width="620" height="1100" loop="true", controls="true"]

Puede ver el funcionamiento del patrón de páginas AMP en una aplicación web progresiva en la página de demostración [Muestra de React](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa) que creamos. Incluye transiciones fluidas durante la navegación y se presenta con un sencillo componente React que realiza los pasos que se explicaron anteriormente. Posee las ventajas de ambas tecnologías: la flexibilidad y personalización de JavaScript en la aplicación web progresiva y la administración de contenidos de AMP.

- Tome el código fuente de este enlace: [https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa](https://github.com/ampproject/amp-publisher-sample/tree/master/amp-pwa).
- Utilice el componente React independiente de npm: [https://www.npmjs.com/package/react-amp-document](https://www.npmjs.com/package/react-amp-document).
- Vea cómo funciona en esta página: [https://choumx.github.io/amp-pwa/](https://choumx.github.io/amp-pwa/) (de preferencia en el teléfono o en una simulación para dispositivos móviles).

También puede ver ejemplos de páginas AMP y PWA utilizando un framework Polymer. Esta muestra utiliza [amp-viewer](https://github.com/PolymerLabs/amp-viewer/) para insertar páginas AMP.

- Tome el código fuente de este enlace: [https://github.com/Polymer/news/tree/amp](https://github.com/Polymer/news/tree/amp).
- Vea cómo funciona aquí: [https://polymer-news-amp.appspot.com/](https://polymer-news-amp.appspot.com/).
