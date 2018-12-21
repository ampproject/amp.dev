---
$title: Marcadores de posición y respaldos
---
[TOC]

En cuanto al rendimiento percibido y la mejora progresiva, en AMP se recomienda incluir marcadores de posición y respaldos donde sea posible.

Algunos elementos incluso te recompensarán por hacerlo suavizando algunas restricciones; por ejemplo, si incluyes un marcador de posición en ['<amp-iframe>'](/es/docs/reference/components/amp-iframe.html#iframe-with-placeholder), podrás utilizarlo cerca de la parte superior de la página, cosa que no podrías hacer de otro modo.

## Marcadores de posición

El elemento marcado con el atributo `placeholder` hace
de marcador de posición del elemento AMP principal.
Si se indica un elemento `placeholder`, este debe ser un elemento secundario directo del elemento AMP.
Los elementos marcados como `placeholder` siempre llenarán el elemento AMP principal.

<!--Elemento amp-anim adaptable insertado de ejemplo-->
<div>
<amp-iframe height="253"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampanim.responsive.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Mostrar más">Mostrar todo el código</div>
  <div placeholder></div> 
</amp-iframe>
</div>

De forma predeterminada, el marcador de posición de los elementos AMP se muestra inmediatamente,
aunque no se hayan descargado ni inicializado los recursos de estos elementos.
Una vez que los recursos estén listos, los elementos AMP suelen ocultar su marcador de posición y mostrar el contenido.

[tip type="note"]

Los marcadores de posición no tienen por qué ser elementos AMP;
pueden ser cualquier elemento HTML.

[/tip]

## Respaldos

Puedes incluir el atributo `fallback` en elementos para indicar qué comportamiento de respaldo debe seguirse en estos casos:

* Si un elemento no es compatible con el navegador.
* Si el contenido no se carga (por ejemplo, porque se ha eliminado un tuit).
* Si no se admite el tipo de imagen (por ejemplo, WebP no es compatible con todos los navegadores).

Puedes añadir el atributo `fallback` en cualquier elemento HTML, no solo en los AMP. Si lo incluyes, el elemento con `fallback` debe ser un secundario directo del elemento AMP.

##### Ejemplo: función incompatible

En el ejemplo siguiente, utilizamos el atributo `fallback` para comunicar a los usuarios que su navegador no es compatible con una función concreta:

<!--ejemplo de vídeo insertado-->
<div>
<amp-iframe height="234"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampvideo.fallback.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Mostrar más">Mostrar todo el código</div>
  <div placeholder></div> 
</amp-iframe>
</div>

##### Ejemplo: servir formatos de imagen diferentes

En el ejemplo siguiente, con el atributo `fallback` indicamos al navegador que utilice el archivo JPEG si no admite el formato WebP. 

<div>
<amp-iframe height=309 layout=fixed-height sandbox="allow-scripts allow-forms allow-same-origin" resizable src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.webp.embed.html"><div overflow tabindex=0 role=button aria-label="Mostrar todo">Mostrar todo el código</div><div placeholder></div></amp-iframe></div>

## Cómo interactúan los marcadores de posición y los respaldos

En el caso de los componentes AMP que dependen de contenido dinámico (por ejemplo, `amp-twitter`, `amp-list`), los respaldos y los marcadores de posición interactúan de la siguiente manera:

<ol>
  <li>Se muestra el marcador de posición mientras se carga el contenido.</li>
  <li>Si el contenido se carga correctamente, el marcador de posición se oculta y se muestra el contenido.</li>
  <li>Si el contenido no se carga:
    <ol>
      <li>Si hay un elemento de respaldo, se muestra.</li>
      <li>En caso contrario, se sigue mostrando el marcador de posición.</li>
    </ol>
  </li>
</ol>

## Ocultar indicadores de carga

Muchos elementos AMP están incluidos en la lista blanca para mostrar un "indicador de carga",
que es una animación básica que muestra que el elemento aún no se ha cargado completamente.
Los elementos pueden excluirse de este comportamiento añadiéndoles el atributo `noloading`.
 
