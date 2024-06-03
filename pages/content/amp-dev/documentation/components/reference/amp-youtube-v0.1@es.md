---
$title: amp-youtube
$category@: media
teaser:
  text: Muestra un vídeo de YouTube.
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



Muestra un vídeo de [YouTube](https://www.youtube.com/).

<table>
  <tr>
    <td width="40%"><strong>Secuencia de comandos obligatoria</strong></td>
    <td><code>&lt;script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Diseños admitidos</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay y responsive</td>
  </tr>
  <tr>
    <td width="40%"><strong>Ejemplos</strong></td>
    <td><a href="https://ampbyexample.com/components/amp-youtube/">Ejemplo comentado de código de amp-youtube</a></td>
  </tr>
</table>

## Ejemplo <a name="example"></a>

Con el diseño responsive (es decir, adaptable), la anchura y la altura del ejemplo deben equivaler a la proporción adecuada para los vídeos con una relación de aspecto de 16:9:

[sourcecode:html]
<amp-youtube
    data-videoid="mGENRKrdoGY"
    layout="responsive"
    width="480" height="270"></amp-youtube>
  [/sourcecode]

  [sourcecode:html]
  <amp-youtube
      id="myLiveChannel"
      data-live-channelid="UCB8Kb4pxYzsDsHxzBfnid4Q"
      width="358"
      height="204"
      layout="responsive">
    <amp-img
      src="https://i.ytimg.com/vi/Wm1fWz-7nLQ/hqdefault_live.jpg"
      placeholder
      layout="fill"
      />
  </amp-youtube>
  [/sourcecode]

## Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>autoplay</strong></td>
    <td>Si este atributo está presente y el navegador admite la reproducción automática:
      <ul>
        <li>El vídeo se silencia automáticamente antes de que comience la reproducción automática.
        </li>
        <li>El vídeo se detiene cuando no se encuentra a la vista.
        </li>
        <li>El vídeo continúa reproduciéndose cuando se encuentra a la vista.
        </li>
        <li>El sonido del vídeo se activa cuando el usuario toca el vídeo.
        </li>
        <li>Si el usuario ha interactuado con el vídeo (por ejemplo, silenciando o activando el sonido, pausando o reanudando el vídeo, etc.) y este se encuentra dentro o fuera de la vista, seguirá en las mismas condiciones en las que se haya dejado. Por ejemplo, si el usuario pausa el vídeo, lo desplaza fuera de la vista y vuelve a él, este seguirá en pausa.
        </li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>data-videoid</strong></td>
      <td>ID de vídeo de YouTube que aparece en todas las URL de las páginas de vídeos de la plataforma.
          Por ejemplo, en la URL https://www.youtube.com/watch?v=Z1q71gFeRqM, el ID de vídeo es <code>Z1q71gFeRqM</code>.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-live-channelid</strong></td>
        <td>ID de canal de YouTube que proporciona una URL de emisión en directo estable. Por ejemplo, en la URL https://www.youtube.com/embed/live_stream?channel=UCB8Kb4pxYzsDsHxzBfnid4Q, el ID de canal es <code>UCB8Kb4pxYzsDsHxzBfnid4Q</code>. Puedes incluir un atributo <code>data-live-channelid</code> en lugar de <code>data-videoid</code> para insertar una URL estable de la emisión en directo en lugar de un vídeo. Los canales no incluyen marcadores de posición predeterminados. Puedes proporcionar un marcador de posición para el vídeo siguiendo el ejemplo 2, que aparece más arriba.</td>
      </tr>
      <tr>
        <td width="40%"><strong>data-param-*</strong></td>
        <td>Todos los atributos <code>data-param-*</code> se añadirán como parámetros de consulta al iframe src de YouTube. Esto se puede utilizar para transferir valores personalizados a los complementos de YouTube; por ejemplo, para mostrar controles.
            Las claves y los valores se codificarán mediante URI. Las claves alternarán mayúsculas y minúsculas (camel case).
            <ul>
            <li>`data-param-controls=1` se convierte en `&amp;controls=1`</li>
          </ul>
          Para conocer más opciones de parámetros de YouTube, consulta la página sobre los <a href="https://developers.google.com/youtube/player_parameters">parámetros del reproductor insertado de esta plataforma</a>.
        </td>
      </tr>
      <tr>
        <td width="40%"><strong>dock</strong></td>
        <td><strong>Requiere la extensión <code>amp-video-docking</code>.</strong> Si este atributo está presente y el vídeo se reproduce manualmente, se minimizará y permanecerá fijado en una esquina o elemento cuando el usuario se desplace fuera del área visual del componente de vídeo.
            Para obtener más información, consulta la <a href="amp-video-docking.md">documentación de la propia extensión</a>.</td>
        </tr>
        <tr>
          <td width="40%"><strong>credentials (opcional)</strong></td>
          <td>Define una opción <code>credentials</code> tal y como especifica la <a href="https://fetch.spec.whatwg.org/">API de Fetch</a>.
            <ul>
              <li>Valores admitidos: `omit` e `include`</li>
              <li>Predeterminado: `include`</li>
            </ul>
            Si quieres utilizar el <a href="http://www.google.com/support/youtube/bin/answer.py?answer=141046">reproductor de YouTube en el modo de mejora de la privacidad</a>, pasa el valor de <code>omit</code>.
            Normalmente, YouTube añade sus cookies cuando se carga el reproductor. En el modo de mejora de la privacidad, las cookies se añaden cuando el usuario hace clic en el reproductor.</td>
          </tr>
          <tr>
            <td width="40%"><strong>common attributes</strong></td>
            <td>Este elemento incluye <a href="../../../documentation/guides-and-tutorials/learn/common_attributes.md">atributos comunes</a> que se aplican a los componentes de AMP.</td>
          </tr>
        </table>

## Validación <a name="validation"></a>

Consulta las [reglas de amp-youtube](https://github.com/ampproject/amphtml/blob/main/extensions/amp-youtube/validator-amp-youtube.protoascii) en la especificación de la herramienta de validación de AMP.
