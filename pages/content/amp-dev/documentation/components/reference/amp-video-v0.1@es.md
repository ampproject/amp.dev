---
$title: amp-video
$category@: media
teaser:
  text: Sustituye la etiqueta `video` de HTML5.
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



Funciona como sustituto de la etiqueta `video` de HTML5. Solo se utiliza para insertar directamente archivos de vídeo en HTML5.

<table>
  <tr>
    <td width="40%"><strong>Secuencia de comandos obligatoria</strong></td>
    <td><code>&lt;script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td width="40%"><strong>Ejemplos</strong></td>
    <td>Ejemplos de AMP By Example:<ul>
      <li><a href="https://ampbyexample.com/components/amp-video/">Ejemplo de amp-video</a></li>
      <li><a href="https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/">Superposición de reproducción por clic (click-to-play) para amp-video</a></li></ul></td>
    </tr>
    <tr>
      <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Diseños admitidos</a></strong></td>
      <td>fill, fixed, fixed-height, flex-item, nodisplay y responsive</td>
    </tr>
  </table>

## Comportamiento <a name="behavior"></a>

El componente `amp-video` carga el recurso de vídeo que especifica su atributo `src` mediante la carga diferida, con un ritmo que determina el tiempo de ejecución de AMP. Puedes controlar los componentes `amp-video` de forma similar a las etiquetas `<video>` estándar de HTML5.

El componente `amp-video` acepta hasta cuatro tipos únicos de nodos HTML como elementos secundarios:

* Etiquetas `source`: al igual que en la etiqueta `<video>` de HTML, puedes añadir etiquetas `<source>` secundarias y, de este modo, especificar diferentes archivos multimedia de origen para reproducirlos.
* Etiquetas `track` para habilitar subtítulos en el vídeo. Si la pista está alojada en un origen que no es el documento, debes añadir el atributo `crossorigin` a la etiqueta `<amp-video>`.
* Un marcador de posición para mostrar antes de que comience a reproducirse el vídeo.
* Un respaldo que funcione si el navegador no admite vídeos de HTML5: uno o cero nodos secundarios inmediatos pueden tener el atributo `fallback`. Si está presente, este nodo y sus nodos secundarios forman el contenido que se muestra si el navegador del usuario no es compatible con los vídeos de HTML5.

#### Ejemplo <a name="example"></a>

[example preview="inline" playground="true" imports="amp-video"]
```html
<amp-video {% if format=='stories'%}autoplay {% endif %}controls
  width="640"
  height="360"
  layout="responsive"
  poster="{{server_for_email}}/static/inline-examples/images/kitten-playing.png">
  <source src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.webm"
    type="video/webm" />
  <source src="{{server_for_email}}/static/inline-examples/videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```
[/example]

## Analytics <a name="analytics"></a>

`amp-video` admite analíticas predeterminadas. Para obtener más información, consulta esta página sobre [analíticas de vídeo](https://github.com/ampproject/amphtml/blob/main/extensions/amp-analytics/amp-video-analytics.md).

## Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>src</strong></td>
    <td>Es obligatorio si no hay ningún elemento secundario <code>&lt;source&gt;</code> presente. Debe ser HTTPS.</td>
  </tr>
  <tr>
    <td width="40%"><strong>poster</strong></td>
    <td>Imagen del marco que se muestra antes de que se haya iniciado la reproducción del vídeo. De forma predeterminada, se muestra el primer marco.
      <br>
        También puedes añadir una superposición de reproducción por clic. Para obtener más información, consulta la sección <a href="#click-to-play-overlay">Superposición de reproducción por clic</a> que aparece más abajo.</td>
      </tr>
      <tr>
        <td width="40%"><strong>autoplay</strong></td>
        <td>Si se incluye este atributo y el navegador admite la reproducción automática, el vídeo se reproducirá automáticamente en cuanto esté visible. Hay algunas condiciones que el componente debe cumplir para reproducirse, <a href="https://github.com/ampproject/amphtml/blob/main/spec/amp-video-interface.md#autoplay">que se describen en la especificación de vídeo en AMP</a>.</td>
      </tr>
      <tr>
        <td width="40%"><strong>controls</strong></td>
        <td>Este atributo es similar al atributo <code>controls</code> de la etiqueta <code>video</code> de HTML5. Si este atributo está presente, el navegador ofrece controles que permiten al usuario controlar la reproducción del vídeo.</td>
      </tr>
      <tr>
        <td width="40%"><strong>controlsList</strong></td>
        <td>Funciona igual que el atributo <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList">controlsList</a> del elemento de vídeo de HTML5. Solo es compatible con algunos navegadores. Para obtener más información, consulta <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList">https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList</a>.</td>
      </tr>
      <tr>
        <td width="40%"><strong>dock</strong></td>
        <td><strong>Requiere la extensión <code>amp-video-docking</code>.</strong> Si este atributo está presente y el vídeo se reproduce de forma manual, se minimizará y permanecerá fijado en una esquina o en un elemento cuando el usuario se desplace fuera del área visual del componente de vídeo.
            Para obtener más información, consulta la <a href="amp-video-docking.md">documentación de la propia extensión</a>.</td>
        </tr>
        <tr>
          <td width="40%"><strong>loop</strong></td>
          <td>Si está presente, el vídeo se reproducirá en bucle automáticamente.</td>
        </tr>
        <tr>
          <td width="40%"><strong>crossorigin</strong></td>
          <td>Es obligatorio si un recurso <code>track</code> está alojado en un origen que no es el documento.</td>
        </tr>
        <tr>
          <td width="40%"><strong>disableremoteplayback</strong></td>
          <td>Determina si el elemento multimedia puede tener una UI de reproducción remota, como Chromecast o AirPlay.</td>
        </tr>
        <tr>
          <td width="40%"><strong>muted (obsoleto)</strong></td>
          <td>El atributo <code>muted</code> ha quedado obsoleto y ya no tiene ningún efecto. El atributo <code>autoplay</code> controla automáticamente el comportamiento de la función para silenciar.</td>
        </tr>
        <tr>
          <td width="40%"><strong>noaudio</strong></td>
          <td>Añade una anotación que indica al usuario que el vídeo no tiene audio. De esta forma, se oculta el icono de ecualizador que aparece cuando el vídeo tiene la función de reproducción automática activada.</td>
        </tr>
        <tr>
          <td width="40%"><strong>rotate-to-fullscreen</strong></td>
          <td>Si el vídeo está visible, se mostrará en pantalla completa cuando el usuario gire su dispositivo y entre en modo de vista horizontal. Para obtener más información, consulta la <a href="https://github.com/ampproject/amphtml/blob/main/spec/amp-video-interface.md#rotate-to-fullscreen">especificación de vídeo en AMP</a>.</td>
        </tr>
        <tr>
          <td width="40%"><strong>atributos comunes</strong></td>
          <td>Este elemento incluye <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">atributos comunes</a> que se aplican a los componentes de AMP.</td>
        </tr>
      </table>

## Atributos de la API de Media Session <a name="media-session-api-attributes"></a>

El componente `amp-video` implementa la [API de Media Session](https://developers.google.com/web/updates/2017/02/media-session), que permite a los desarrolladores especificar más información sobre el archivo de vídeo. La información adicional del vídeo se muestra en el centro de notificaciones del dispositivo del usuario (junto con los controles de reproducción y pausa).

<table>
  <tr>
    <td width="40%"><strong>artwork</strong></td>
    <td>Especifica la URL de una imagen PNG, JPG o ICO que funciona como carátula del vídeo. Si `artwork` no está definido, el asistente de la API de Media Session utiliza cualquiera de estas opciones: el campo `image` de la definición `schema.org`, `og:image` o la imagen `favicon` del sitio web.</td>
  </tr>
  <tr>
    <td width="40%"><strong>artist</strong></td>
    <td>Indica el autor del archivo de vídeo, especificado como una cadena.</td>
  </tr>
  <tr>
    <td width="40%"><strong>album</strong></td>
    <td>Indica la colección o el álbum del que se tomó el vídeo, especificado como una cadena.</td>
  </tr>
  <tr>
    <td width="40%"><strong>title</strong></td>
    <td>Indica el nombre o título del vídeo, especificado como una cadena. Si no se proporciona, el asistente de la API de Media Session utiliza como respaldo el atributo `aria-label` o el título de la página.</td>
  </tr>
</table>

Ejemplo:

En este ejemplo se incluyen los atributos `poster` y `artwork`. `poster` sirve como imagen de marcador de posición antes de que se reproduzca el vídeo, mientras que `artwork` es la imagen que se muestra en la notificación a través de la API de Media Session.

```html
<amp-video width="720" height="305" layout="responsive"
    src="https://yourhost.com/videos/myvideo.mp4"
    poster="https://yourhost.com/posters/poster.png"
    artwork="https://yourhost.com/artworks/artwork.png"
    title="Awesome video" artist="Awesome artist"
    album="Amazing album">
</amp-video>
```

## Superposición de reproducción por clic <a name="click-to-play-overlay"></a>

En Internet, es habitual añadir una superposición de reproducción por clic a los reproductores de vídeo como una función de experiencia de usuario.  Por ejemplo, puedes hacer que se muestre un icono de reproducción personalizado en el que el usuario puede hacer clic, así como incluir el título del vídeo, imágenes de póster de distintos tamaños, etc.  Dado que el componente `amp-video` admite la acción de AMP `play` estándar, puedes implementar fácilmente la reproducción por clic.

Para obtener más detalles, consulta el ejemplo de [superposición de reproducción por clic para amp-video](https://ampbyexample.com/advanced/click-to-play_overlay_for_amp-video/) de AMP By Example.

## Validación <a name="validation"></a>

Consulta las [reglas de amp-video](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) en la especificación de la herramienta de validación de AMP.
