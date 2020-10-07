---
$title: amp-lightbox
$category@: layout
teaser:
  text: Muestra elementos en modo lightbox con viewport completo.
---



<!--
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

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



<table>
  <tr>
    <td width="40%"><strong>Descripción</strong></td>
    <td>Muestra elementos en modo lightbox con viewport completo.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Secuencia de comandos obligatoria</strong></td>
    <td><code>&lt;script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"&gt;&lt;/script&gt;</code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Diseños admitidos</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td width="40%"><strong>Ejemplos</strong></td>
    <td>Consulta el ejemplo de <a href="https://ampbyexample.com/components/amp-lightbox/">amp-lightbox</a> de AMP By Example.</td>
  </tr>
</table>

## Comportamiento <a name="behavior"></a>

El componente `amp-lightbox` define los elementos secundarios que se muestran en una superposición o en un modo de viewport completo. Cuando el usuario toca o hace clic en un elemento (p. ej., un botón), el ID de `amp-lightbox` al que se hace referencia en el atributo `on` del elemento que ha recibido el clic activa el lightbox; este ocupa todo el viewport y muestra los elementos secundarios de `amp-lightbox`.

Al pulsar la tecla Esc del teclado se cierra el lightbox. Otra posibilidad es definir el atributo `on` en uno o varios elementos del lightbox y definir su método en `close` para cerrar el lightbox cuando se toque el elemento o se haga clic en él.

```html
<button on="tap:quote-lb">See Quote</button>
<amp-lightbox id="quote-lb" layout="nodisplay">
  <blockquote>"Don't talk to me about JavaScript fatigue" - Horse JS</blockquote>
  <button on="tap:quote-lb.close">Nice!</button>
</amp-lightbox>
```

[tip type="read"]
Para mostrar imágenes en un lightbox, también tienes el componente [`<amp-image-lightbox>`](amp-image-lightbox.md).
[/tip]

## Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>animate-in (opcional)</strong></td>
    <td>Define el estilo de la animación para abrir el lightbox. De forma predeterminada, se definirá en <code>fade-in</code>. Los valores válidos son <code>fade-in</code> , <code>fly-in-bottom</code> y <code>fly-in-top</code>.
      <br><br>
        <strong>Nota:</strong> Los valores predefinidos de animación de <code>fly-in-*</code> modifican la propiedad <code>transform</code> del elemento <code>amp-lightbox</code>. No transformes el elemento <code>amp-lightbox</code> directamente. Si necesitas aplicar una transformación, defínela en un elemento anidado.</td>
      </tr>
      <tr>
        <td width="40%"><strong>close-button (obligatorio en los anuncios AMP HTML)</strong></td>
        <td>Muestra un encabezado de botón de cierre en la parte superior del lightbox. Este atributo solo es obligatorio y válido para los <a href="#a4a">anuncios AMP HTML</a>.</td>
      </tr>
      <tr>
        <td width="40%"><strong>id (obligatorio)</strong></td>
        <td>ID único del lightbox.</td>
      </tr>
      <tr>
        <td width="40%"><strong>layout (obligatorio)</strong></td>
        <td>Se debe definir en <code>nodisplay</code>.</td>
      </tr>
      <tr>
        <td width="40%"><strong>scrollable (obligatorio)</strong></td>
        <td>Si el atributo <code>scrollable</code> está presente, el contenido del lightbox se puede desplazar cuando hay altura adicional en el lightbox.
          <br><br>
            <strong>Nota:</strong> Cuando se usa <code>&lt;amp-lightbox&gt;</code> en un anuncio AMP HTML, el atributo <code>scrollable</code> no está permitido. Para obtener más información, consulta la sección sobre el <a href="#a4a">uso de amp-lightbox en anuncios AMP HTML</a>.</td>
          </tr>
          <tr>
            <td width="40%"><strong>scrollable (obligatorio)</strong></td>
            <td></td>
          </tr>
        </table>

## Estilo <a name="styling"></a>

Puedes aplicar estilo a `amp-lightbox` con CSS estándar.

## Acciones <a name="actions"></a>

El componente `amp-lightbox` muestra las acciones que se pueden [activar con AMP on-syntax](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md):

<table>
  <tr>
    <th width="20%">Acción</th>
    <th>Descripción</th>
  </tr>
  <tr>
    <td><code>open</code> (predeterminado)</td>
    <td>Abre el lightbox.</td>
  </tr>
  <tr>
    <td><code>close</code></td>
    <td>Cierra el lightbox.</td>
  </tr>
</table>

## <a id="a4a"></a> Usar `amp-lightbox` en anuncios AMP HTML <a name="a4a"></a>

[tip type="note"]
El componente `amp-lightbox` para anuncios AMP HTML está en fase [experimental](../../../documentation/guides-and-tutorials/learn/experimental.md) porque se está desarrollando. Para utilizar `amp-lightbox` en anuncios AMP HTML, [habilita el experimento `amp-lightbox-a4a-proto`](http://cdn.ampproject.org/experiments.html).
[/tip]

Existen algunas diferencias entre usar `amp-lightbox` en documentos AMP normales y en [anuncios escritos en AMP HTML](../../../documentation/guides-and-tutorials/learn/a4a_spec.md):

### El atributo close-button es obligatorio <a name="requires-close-button"></a>

En los anuncios AMP HTML se debe incluir el atributo `close-button`. Con este atributo, los encabezados se muestran en la parte superior del lightbox. El encabezado, que contiene un botón de cierre y una etiqueta que indica "Anuncio", se necesita para lograr los siguientes objetivos:

* Ofrecer una experiencia de usuario coherente y predecible para los anuncios AMP HTML.
* Asegurarse de que el lightbox siempre tenga un punto de salida; de lo contrario, la creatividad podría interceptar el contenido del documento host a través de un lightbox.

El atributo `close-button` es obligatorio y solo se permite en anuncios AMP HTML. En los documentos AMP normales, se puede mostrar un botón de cierre donde lo necesites como parte del contenido de `<amp-lightbox>`.

### No se permite usar lightboxes desplazables <a name="scrollable-lightboxes-are-disallowed"></a>

No se permite usar lightboxes desplazables en los anuncios AMP HTML.

### Fondo transparente <a name="transparent-background"></a>

Si usas `<amp-lightbox>` en anuncios AMP HTML, el fondo del elemento `<body>` se vuelve transparente porque el tiempo de ejecución de AMP cambia el tamaño y reajusta el contenido de la creatividad antes de mostrar el lightbox. Con esto se evita que la creatividad salte al abrirse el lightbox. Si la creatividad necesita un fondo, colócalo en un contenedor intermedio (como un `<div>` de tamaño completo) en lugar de insertarlo en `<body>`.

Cuando el anuncio AMP HTML se ejecuta en un entorno de terceros (por ejemplo, en un documento que no es AMP), la creatividad se centra con respecto al viewport y luego se muestra. Esto se debe a que los iframes de terceros deben basarse en una API postMessage para habilitar funciones como el cambio de tamaño de los marcos, que es asíncrono. Por lo tanto, al centrar la creatividad en primer lugar, la transición se hace de manera fluida y sin saltos visuales.

### Ejemplos de transiciones en lightbox para anuncios AMP HTML <a name="examples-of-transitions-in-lightbox-for-amphtml-ads"></a>

En los ejemplos siguientes se muestra la transición de un anuncio AMP HTML que tiene el atributo `animate-in="fly-in-bottom"` definido en el elemento lightbox de un anuncio AMP HTML en un friendly iframe, y de un anuncio AMP HTML en un iframe de terceros.

##### En friendly iframes (p. ej., procedente de una caché AMP) <a name="on-friendly-iframes-eg-coming-from-an-amp-cache"></a>

<amp-img alt="lightbox ad in friendly iframe" width="360" height="480" src="https://github.com/ampproject/amphtml/raw/master/spec/img/lightbox-ad-fie.gif" layout="fixed">
  <noscript>
    <img alt="lightbox ad in friendly iframe" src="../../spec/img/lightbox-ad-fie.gif">
    </noscript>
  </amp-img>

##### En iframes de terceros (p. ej., no procedente de una caché AMP) <a name="on-third-party-iframes-eg-outside-the-amp-cache"></a>

<amp-img alt="lightbox ad in 3p iframe" width="360" height="480" src="https://github.com/ampproject/amphtml/raw/master/spec/img/lightbox-ad-3p.gif" layout="fixed">
  <noscript>
    <img alt="lightbox ad in 3p iframe" src="../../spec/img/lightbox-ad-3p.gif">
    </noscript>
  </amp-img>

## Validación <a name="validation"></a>

Consulta las [reglas de amp-lightbox](https://github.com/ampproject/amphtml/blob/master/extensions/amp-lightbox/validator-amp-lightbox.protoascii) en la especificación de la herramienta de validación de AMP.
