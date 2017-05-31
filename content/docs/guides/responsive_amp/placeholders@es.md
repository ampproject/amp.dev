---
$title: Placeholders & fallbacks
$order: 3
toc: true
---
[TOC]


En el espíritu de rendimiento percibido y mejora progresiva, es la mejor práctica en AMP para proporcionar placeholders y fallbacks siempre que sea posible.

Algunos elementos incluso le recompensarán por hacerlo limitando las restricciones – por ejemplo, si proporciona un placeholder para [`<amp-iframe>`](/es/docs/reference/components/amp-iframe.html#iframe-with-placeholder), puede utilizarse cerca de la parte superior de la página (que no funcionará si no está).

## Placeholders

El elemento marcado con el atributo `placeholder` actúa 
como marcador de posición para el elemento AMP principal. 
Si se especifica, un elemento `placeholder` debe ser un elemento secundario directo del elemento AMP.
El elemento marcado como `placeholder` siempre será `fill` para el elemento AMP principal.

[sourcecode:html]
<amp-anim src="animated.gif" width=466 height=355 layout="responsive">
    <amp-img placeholder src="preview.png" layout="fill"></amp-img>
</amp-anim>
[/sourcecode]

Por defecto, el placeholder se muestra inmediatamente para el elemento AMP,
incluso si no se han descargado o inicializado los recursos del elemento AMP.
Una vez listo, el elemento AMP normalmente oculta su placeholder (o marcador de posición) y muestra el contenido.

{% call callout('Nota', type='note') %}
El placeholder no tiene que ser un elemento AMP; 
cualquier elemento HTML puede actuar como marcador de posición.
{% endcall %}

## Fallbacks

Utiliza el atributo  `fallback` para indicar el comportamiento de respaldo
de cualquier elemento que no sea compatible con el navegador.
Por ejemplo, utiliza el atributo `fallback` para comunicar al usuario 
que el navegador no es compatible con una característica concreta:

[sourcecode:html]
<amp-video width=400 height=300 src="https://yourhost.com/videos/myvideo.mp4"
    poster="myvideo-poster.jpg">
  <div fallback>
    <p>Your browser doesn’t support HTML5 video.</p>
  </div>
</amp-video>
[/sourcecode]

El atributo `fallback` se puede establecer en cualquier elemento HTML, no solo en los elementos AMP. 
Si se especifica, el elemento `fallback` debe ser un elemento secundario directo del elemento AMP.


## Ocultar indicadores de carga

Muchos elementos AMP están incluidos en la lista blanca para mostrar un "indicador de carga", 
que es una animación básica que muestra que el elemento aún no se ha cargado completamente. 
Los elementos pueden excluirse de este comportamiento añadiendo el atributo `noloading`.
