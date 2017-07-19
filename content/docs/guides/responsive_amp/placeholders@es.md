---
$title: Placeholders & fallbacks
$order: 3
toc: true
components:
  - iframe
---
[TOC]

En el espíritu de rendimiento percibido y mejora progresiva, es la mejor práctica en AMP para proporcionar placeholders y fallbacks siempre que sea posible.

Algunos elementos incluso le recompensarán por hacerlo limitando las restricciones – por ejemplo, si proporciona un placeholder para [`<amp-iframe>`](/es/docs/reference/components/amp-iframe.html#iframe-with-placeholder), puede utilizarse cerca de la parte superior de la página (que no funcionará si no está).

## Placeholders

El elemento marcado con el atributo `placeholder` actúa 
como marcador de posición para el elemento AMP principal. 
Si se especifica, un elemento `placeholder` debe ser un elemento secundario directo del elemento AMP.
El elemento marcado como `placeholder` siempre será `fill` para el elemento AMP principal.

<!--embedded amp-anim responsive example -->
<div>
<amp-iframe height="253"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampanim.responsive.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>


Por defecto, el placeholder se muestra inmediatamente para el elemento AMP,
incluso si no se han descargado o inicializado los recursos del elemento AMP.
Una vez listo, el elemento AMP normalmente oculta su placeholder (o marcador de posición) y muestra el contenido.

{% call callout('Nota', type='note') %}
El placeholder no tiene que ser un elemento AMP; 
cualquier elemento HTML puede actuar como marcador de posición.
{% endcall %}

## Fallbacks

Utiliza el atributo  `fallback` para indicar el comportamiento de respaldo
de cualquier elemento que no sea compatible con el navegador, o si hay una falla al cargar el contenido (ej. un tweet borrado).

Por ejemplo, utiliza el atributo `fallback` para comunicar al usuario 
que el navegador no es compatible con una característica concreta:

<!--embedded video example  -->
<div>
<amp-iframe height="234"
            layout="fixed-height"
            sandbox="allow-scripts allow-forms allow-same-origin"
            resizable
            src="https://ampproject-b5f4c.firebaseapp.com/examples/ampvideo.fallback.embed.html">
  <div overflow tabindex="0" role="button" aria-label="Show more">Show full code</div>
  <div placeholder></div> 
</amp-iframe>
</div>

El atributo `fallback` se puede establecer en cualquier elemento HTML, no solo en los elementos AMP. 
Si se especifica, el elemento `fallback` debe ser un elemento secundario directo del elemento AMP.

## Interacción de placeholders y fallbacks

Para los componentes AMP que obedecen a contenido dinámico (por ejemplo, `amp-twitter`, `amp-list`), la interacción de fallbacks y placeholders opera de la siguiente manera:
 
<ol>
  <li>Muestra el placeholder mientras el contenido está cargando.</li>
  <li>Si el contenido carga exitosamente, oculta el placeholder y muestra el contenido.</li>
  <li>Si el contenido falla al cargar:
    <ol>
      <li>Si hay elemento fallback, muestra el fallback.</li>
      <li>Sino, sigue mostrando el placeholder.</li>
    </ol>
  </li>
</ol>

## Ocultar indicadores de carga

Muchos elementos AMP están incluidos en la lista blanca para mostrar un "indicador de carga", 
que es una animación básica que muestra que el elemento aún no se ha cargado completamente. 
Los elementos pueden excluirse de este comportamiento añadiendo el atributo `noloading`.
