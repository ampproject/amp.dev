---
$title: amp-iframe
$category@: layout
teaser:
  text: Muestra un iframe.
---


<!--
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->



Muestra un iframe.


<table>
  <tr>
    <td width="40%"><strong>Secuencia de comandos obligatoria</strong></td>
    <td><code>&lt;script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Diseños admitidos</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay y responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Ejemplos</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-iframe/">Ejemplo comentado de código de amp-iframe</a></td>
  </tr>
</table>

# Comportamiento <a name="behavior"></a>

`amp-iframe` presenta varias diferencias importantes con respecto a los iframes estándar que tienen como objetivo aumentar la seguridad y evitar que los archivos AMP estén dominados por un único iframe:

* Un `amp-iframe` no aparece cerca de la parte superior del documento, excepto los que utilizan el atributo `placeholder` (consulta la sección [Iframe con marcador de posición](#iframe-with-placeholder) de este documento). El iframe debe estar situado a 600 píxeles de distancia de la parte superior o a partir del primer 75 % del viewport cuando el desplazamiento es hasta la parte superior de la página, la opción que sea más pequeña.
* De forma predeterminada, los amp-iframe están en zona de pruebas ([más información](#sandbox)).
* `amp-iframe` solo debe solicitar recursos a través de HTTPS, de una URI de datos o del atributo `srcdoc`.
* `amp-iframe` no debe estar situado en el mismo origen que el contenedor, a menos que no admitan `allow-same-origin` en el atributo `sandbox`. Para obtener más información sobre los orígenes permitidos para iframes, consulta la [política de origen de iframe](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-iframe-origin-policy.md).

*Ejemplo: Incrustar un mapa de Google Maps en un amp-iframe*

```html
<amp-iframe width="200" height="100"
    sandbox="allow-scripts allow-same-origin"
    layout="responsive"
    frameborder="0"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&q=iceland">
  </amp-iframe>
```

Se renderiza así:

<amp-iframe width="200" height="100" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDG9YXIhKBhqclZizcSzJ0ROiE0qgVfwzI&amp;q=iceland" sandbox="allow-scripts allow-same-origin" layout="responsive" frameborder="0">
</amp-iframe>

[tip type="success"]
Para ver más ejemplos del componente `amp-iframe`, visita [AMP By Example](https://ampbyexample.com/components/amp-iframe/).
[/tip]

# Usar amp-iframe con fines publicitarios <a name="usage-of-amp-iframe-for-advertising"></a>

`amp-iframe` ****no debe utilizarse con el propósito principal de mostrar publicidad, ``pero se puede usar para mostrar vídeos que contienen anuncios. Para aplicar esta política, se puede denegar el renderizado de los respectivos iframes.

Cuando la finalidad es mostrar anuncios, se debe utilizar [`amp-ad`](amp-ad.md).

Los motivos de esta política son los siguientes:

* `amp-iframe` aplica la zona de pruebas y también se aplica a los iframes secundarios. Por ello, aunque parezca que el anuncio sí funciona, puede que las páginas de destino no estén disponibles.
* `amp-iframe` no proporciona ningún mecanismo para transferir configuración al iframe.
* `amp-iframe` no tiene un mecanismo de cambio de tamaño que controle totalmente el iframe.
* La información de visibilidad puede no estar disponible para `amp-iframe`.

# Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>El atributo <code>src</code> se comporta principalmente como en un iframe estándar, con una excepción: se añade el fragmento <code>#amp=1</code> a la URL para permitir que los documentos fuente sepan que están insertados en el contexto de AMP. Este fragmento no se añade si la URL definida en <code>src</code> ya tiene uno.</td>
  </tr>
  <tr>
    <td width="40%"><strong>srcdoc, frameborder, allowfullscreen, allowpaymentrequest, allowtransparency y referrerpolicy</strong></td>
    <td>Todos estos atributos deben funcionar como en los iframes estándar.
      <br>
        Si no se especifica <code>frameborder</code>, su valor predeterminado será <code>0</code>.</td>
      </tr>
      <tr>
        <td width="40%"><strong>sandbox</strong><a name="sandbox"></a></td>
        <td>Los iframes que crea <code>amp-iframe</code> siempre tienen definido el atributo <code>sandbox</code>. El valor está vacío de forma predeterminada, lo que significa que están en "grado máximo de zona de pruebas". Si se definen los valores de <code>sandbox</code>, se puede hacer que el iframe esté menos aislado en la zona de pruebas. Se pueden definir todos los valores que admitan los navegadores. Por ejemplo, <code>sandbox="allow-scripts"</code> permite que el iframe ejecute JavaScript, mientras que <code>sandbox="allow-scripts allow-same-origin"</code> permite que el iframe ejecute JavaScript, haga solicitudes XHR que no sean de CORS y que lea o introduzca cookies.
          <br><br>
            Si vas a incluir iframes en un documento que no se haya creado específicamente para ponerlo en zona de pruebas, lo más probable es que tengas que añadir <code>allow-scripts allow-same-origin</code> al atributo <code>sandbox</code>, además de otras funciones adicionales.
            <br><br>
              Ten en cuenta también que la zona de pruebas afecta a todas las ventanas que se abren desde un iframe que esté puesto en zona de pruebas, incluidas las que se abran mediante un enlace que contenga <code>target=_blank</code> (para que esto pueda ocurrir, debes añadir <code>allow-popups</code>). Si añades <code>allow-popups-to-escape-sandbox</code> al atributo <code>sandbox</code>, dichas ventanas se comportarán como ventanas nuevas sin zona de pruebas, que es lo que probablemente quieras y esperes que ocurra la mayoría de las veces. Lamentablemente, en la actualidad <code>allow-popups-to-escape-sandbox</code> solo es compatible con Chrome.
              <br><br>
                Para obtener más información sobre el atributo "sandbox", consulta los <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox">documentos de MDN</a> al respecto.</td>
              </tr>
              <tr>
                <td width="40%"><strong>atributos comunes</strong></td>
                <td>Este elemento incluye <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">atributos comunes</a> que se aplican a los componentes de AMP.</td>
              </tr>
            </table>

# Iframe con marcador de posición <a name="iframe-with-placeholder"></a>

Se puede incluir un elemento `placeholder` para lograr que `amp-iframe` aparezca en la parte superior de un documento``, como se muestra en el ejemplo que aparece más abajo.

* `amp-iframe` debe contener un elemento con el atributo `placeholder`, como `amp-img`, que se renderiza como marcador de posición hasta que el iframe esté listo para mostrarse.
* La disponibilidad del iframe se puede conocer escuchando un evento `onload` del iframe o un `embed-ready` `postMessage` que enviaría el documento de iframe, lo que suceda primero.

*Ejemplo: Iframe con un marcador de posición*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow-same-origin"
    src="https://foo.com/iframe">
    <amp-img layout="fill" src="https://foo.com/foo.png" placeholder></amp-img>
</amp-iframe>
```

*Ejemplo: Solicitud embed-ready de iframe*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-ready'
  }, '*');
```

# Cambio de tamaño del iframe <a name="iframe-resizing"></a>

`amp-iframe` debe tener un diseño estático definido, como cualquier otro elemento AMP. Sin embargo, se puede cambiar el tamaño de un `amp-iframe` en el tiempo de ejecución. Para ello:

1. El `amp-iframe` debe contener el atributo `resizable`.
1. El `amp-iframe` debe contener un elemento secundario `overflow`.
1. El `amp-iframe` debe tener definido el atributo de zona de pruebas `allow-same-origin`.
1. El documento de iframe debe enviar una solicitud `embed-size` como un mensaje de ventana.
1. La solicitud `embed-size` se denegará si su altura es inferior a un determinado umbral (100 px).

Fíjate en que `resizable` hace que el valor de `scrolling` cambie a `no`.

*Ejemplo: `amp-iframe` con elemento `overflow`*

```html
<amp-iframe width=300 height=300
    layout="responsive"
    sandbox="allow-scripts allow-same-origin"
    resizable
    src="https://foo.com/iframe">
    <div overflow tabindex=0 role=button aria-label="Read more">Read more!</div>
</amp-iframe>
```

*Ejemplo: Solicitud de cambio de tamaño de iframe*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'embed-size',
  height: document.body.scrollHeight
  }, '*');
```

Una vez recibido este mensaje, el tiempo de ejecución de AMP intenta procesar la solicitud lo antes posible, pero tiene en cuenta la posición del lector en la página, si continúa el desplazamiento y cualquier otro factor de experiencia de usuario o de rendimiento. Si el tiempo de ejecución no puede aplicar el cambio de tamaño de la solicitud, `amp-iframe` mostrará un elemento `overflow`. Al hacer clic en el elemento `overflow`, se modificará el tamaño del `amp-iframe` inmediatamente, ya que se activa mediante una acción del usuario.

Algunos factores que afectan a la rapidez con la que se realizará el cambio de tamaño son:

* Si se ha activado por una acción del usuario.
* Si se ha solicitado para un iframe que está activo en ese momento.
* Si se ha solicitado para un iframe situado debajo o encima del viewport.

# Visibilidad del iframe <a name="iframe-viewability"></a>

Los iframes pueden enviar un mensaje `send-intersections` a sus elementos superiores para empezar a recibir [registros de cambios de estilo IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) de la intersección del iframe con el viewport principal.

*Nota: En los siguientes ejemplos, suponemos que la secuencia de comandos se encuentra en el iframe creado, en el que `window.parent` es la ventana superior. Si la secuencia de comandos se encuentra en un iframe anidado, haz que `window.parent` sea la ventana superior de AMP.*

*Ejemplo: Solicitud `send-intersections` de iframe*

```javascript
window.parent.postMessage({
  sentinel: 'amp',
  type: 'send-intersections'
  }, '*');
```

El iframe puede escuchar un mensaje `intersection` de la ventana principal para recibir de él los datos de intersección.

*Ejemplo: Solicitud `send-intersections` de iframe*

```javascript
window.addEventListener('message', function(event) {
  if (event.source != window.parent ||
  event.origin == window.location.origin ||
  !event.data ||
  event.data.sentinel != 'amp' ||
  event.data.type != 'intersection') {
    return;
    }
  event.data.changes.forEach(function (change) {
    console.log(change);
  });
});
```

El elemento superior envía el mensaje de intersección al iframe cuando este se mueva dentro o fuera del viewport (o esté parcialmente visible), se desplace o se modifique.

# Iframes de seguimiento y analíticas <a name="trackinganalytics-iframes"></a>

Recomendamos encarecidamente el uso de [`amp-analytics`](amp-analytics.md) para realizar analíticas, ya que es una solución mucho más potente, completa y eficiente, y se puede configurar con un gran número de proveedores de analíticas.

AMP solo permite un único iframe por página con fines de analíticas y de seguimiento. Para ahorrar recursos, estos iframes se eliminarán del DOM 5 segundos después de cargarse, lo que debería ser suficiente para llevar a cabo cualquier proceso necesario.

Los iframes se identifican como de seguimiento o de analíticas si no parecen ofrecer una utilidad directa al usuario (p. ej., si son invisibles o pequeños).

# Directriz: Es mejor usar otros componentes de AMP antes que amp-iframe <a name="guideline-use-existing-amp-components-over-amp-iframe"></a>

El componente `amp-iframe` debe considerarse como un respaldo si no se puede ofrecer la experiencia de usuario deseada utilizando otros medios de AMP; es decir, si no existe un [componente de AMP](../../../documentation/components/index.html) que se ocupe de dicho caso práctico. Si se utiliza un componente de AMP diseñado para un caso práctico específico, se logran ventajas como las siguientes:

* Mejor rendimiento y gestión de los recursos.
* En algunos casos, los componentes personalizados pueden proporcionar imágenes de marcador de posición integradas. Esto puede suponer, por ejemplo, que se pueda obtener la miniatura correspondiente de un vídeo antes de que este se cargue, y reducir de este modo el esfuerzo que supone añadir un marcador de posición de forma manual a la hora de escribir el código.
* Cambio de tamaño integrado, lo que supone que el contenido de un iframe de tamaño impredecible se pueda mostrar al usuario como si fuera nativo de la página en lugar de un marco desplazable.
* Se pueden integrar otras funciones adicionales (por ejemplo, la reproducción automática para reproductores de vídeo).

# Validación <a name="validation"></a>

Consulta las [reglas de amp-iframe](https://github.com/ampproject/amphtml/blob/main/extensions/amp-iframe/validator-amp-iframe.protoascii) en la especificación de la herramienta de validación de AMP.
