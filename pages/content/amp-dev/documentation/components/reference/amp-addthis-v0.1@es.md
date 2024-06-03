---
$title: amp-addthis
$category@: social
teaser:
  text: Muestra un elemento insertado de las herramientas del sitio web AddThis.
---

<!--
Copyright 2018 The AMP HTML Authors. All Rights Reserved.

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



Muestra un elemento insertado de las herramientas del sitio web [AddThis](https://www.addthis.com).

<table>
  <tr>
    <td width="40%"><strong>Secuencia de comandos obligatoria</strong></td>
    <td><code>&lt;script async custom-element="amp-addthis" src="https://cdn.ampproject.org/v0/amp-addthis-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Diseños admitidos</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, nodisplay y responsive</td>
  </tr>
</table>


## Ventajas de usar AddThis <a name="why-addthis"></a>

El componente `amp-addthis` proporciona botones sencillos y atractivos para que los usuarios que visiten tu sitio web puedan compartir el contenido en más de 200 redes sociales, como Messenger, WhatsApp, Facebook, Twitter, Pinterest y muchos más.

AddThis cuenta con la confianza de más de 15.000.000 de sitios web, y tiene más de 2000 millones de usuarios únicos en todo el mundo que comparten contenido en más de 60 idiomas.

## Botones para compartir contenido <a name="share-buttons"></a>

### Flotantes <a name="floating"></a>

Se colocan en los laterales, en la parte superior o inferior de la página y se mantienen a la vista mientras el lector se desplaza por ella. Es una buena forma de estimular a los usuarios a compartir el contenido y, a la vez, de evitar que resulte invasivo.

Ejemplo:
```html
<!--
  Este ejemplo utiliza un marcador de posición pubId.
  Reemplaza este valor con el tuyo, que obtendrás al crear una
  cuenta en https://www.addthis.com/dashboard.
-->
<amp-addthis
  width="320"
  height="92"
  layout="responsive"
  data-pub-id="ra-5c191331410932ff"
  data-widget-id="957l"
  data-widget-type="floating">
</amp-addthis>
```

### Insertados <a name="inline"></a>

Integra los botones en el contenido para lograr una experiencia fluida.

Ejemplo:
```html
<!--
  Este ejemplo utiliza un marcador de posición pubId.
  Reemplaza este valor con el tuyo, que obtendrás al crear una
  cuenta en https://www.addthis.com/dashboard.
-->
<amp-addthis
  width="320"
  height="92"
  data-pub-id="ra-5c191331410932ff"
  data-widget-id="mv93"
  data-widget-type="inline">
</amp-addthis>
```

## Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>data-pub-id</strong></td>
    <td>ID de editor de AddThis que aparece en la URL del <a href="https://addthis.com/dashboard">panel de control de la plataforma</a> después de iniciar sesión. Por ejemplo, en la URL <code>https://www.addthis.com/dashboard#gallery/pub/ra-5c191331410932ff</code>, <code>ra-5c191331410932ff</code> es el ID de editor.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-widget-id</strong></td>
    <td>ID de widget de AddThis que corresponde a la herramienta que se va a mostrar y que también aparece en el <a href="https://addthis.com/dashboard">panel de control de la plataforma</a>. Para encontrar el ID de widget de una herramienta concreta, ábrela en el panel de control y copia la última parte de la URL. Por ejemplo, en la URL <code>https://www.addthis.com/dashboard#tool-config/pub/ra-5c191331410932ff/widgetId/957l</code>, <code>957l</code> es el ID de widget.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-widget-type</strong></td>
    <td>Atributo que describe el tipo de widget.
      <ul>
        <li>Flotante: <code>data-widget-type="floating"</code></li>
        <li>Insertado: <code>data-widget-type="inline"</code></li>
      </ul></td>
    </tr>
    <tr>
      <td width="40%"><strong>data-title</strong></td>
      <td>Opcional: Si se define, es el título que le dará la herramienta AddThis a lo que se va a compartir. De lo contrario, se utilizará el título del documento que contiene la etiqueta <code>amp-addthis</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-url</strong></td>
      <td>Opcional: Si se define, esta será la URL que le dará la herramienta de AddThis a lo que se va a compartir. De lo contrario, se utilizará la propiedad <code>location.href</code> del documento que contiene la etiqueta <code>amp-addthis</code>.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-media</strong></td>
      <td>Opcional: Si se define, es la URL que le dará la herramienta AddThis a un archivo multimedia (p. ej., una imagen o un vídeo) cuando se comparta. De lo contrario, permanecerá sin definir.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-description</strong></td>
      <td>Opcional: Si se define, es la descripción que le dará la herramienta AddThis a lo que se va a compartir. De lo contrario, permanecerá sin definir.</td>
    </tr>
  </table>

## Documentación para la implementación <a name="implementation-documentation"></a>

1. Si aún no lo has hecho, tendrás que crear una cuenta de AddThis en [https://www.addthis.com/register](https://www.addthis.com/register). Es totalmente gratuito y te permite acceder a todas las herramientas del sitio web, así como a nuestros informes de analíticas detallados para que puedas comprender mejor el tráfico social de tu sitio web.
1. Accede al [panel de control](https://addthis.com/dashboard) y personaliza los botones para compartir contenido que quieras utilizar. Actualmente, AMP solo admite los botones flotantes e insertados.
1. Personaliza los botones y, a continuación, pulsa "Activate Tool" (Activar herramienta). Esto te redirigirá a nuestra página Get The Code, donde podrás obtener el código para copiarlo en tu sitio web.
1. Por último, copia el código insertado y pégalo en la sección body de tu página web, donde quieras que aparezcan los botones para compartir contenido. Si vas a utilizar los flotantes, puedes colocar el código en cualquier parte del body, ya que aparecerán automáticamente en la parte izquierda o derecha de la pantalla, según la configuración que hayas definido.

Eso es todo. Ya deberían aparecer en tu página web los botones para compartir contenido.

Echa un vistazo a nuestro [vídeo de YouTube](https://www.youtube.com/watch?v=BSkuAB4er2o) para obtener instrucciones detalladas:
<amp-youtube width="480" height="270" data-videoid="BSkuAB4er2o" layout="responsive"></amp-youtube>

## Validación <a name="validation"></a>

Consulta las [reglas de amp-addthis](https://github.com/ampproject/amphtml/blob/main/extensions/amp-addthis/validator-amp-addthis.protoascii) en la especificación de la herramienta de validación de AMP.

## Privacidad <a name="privacy"></a>

[http://www.addthis.com/privacy/privacy-policy/](http://www.addthis.com/privacy/privacy-policy/)

Las Herramientas de AddThis y la Barra de Herramientas de AddThis recopilan información del dispositivo que utiliza el Usuario Final para interactuar con los Sitios Web del Editor o que utiliza un Usuario de la Barra de Herramientas para interactuar con ella ("Datos de AddThis").

Los Datos de AddThis pueden constar de lo siguiente:

* Dirección de protocolo de Internet (IP); ID de publicidad para móviles (MAID), que permite a los desarrolladores identificar quién utiliza sus aplicaciones móviles; ID de aplicación móvil; tipo de navegador; idioma que utiliza el navegador; tipo de sistema operativo y la fecha y la hora en la que el Usuario Final visita el Sitio Web o la Barra de Herramientas de un Editor.
* El usuario ha utilizado la Barra de Herramientas.
* Comportamiento en un Sitio Web del Editor, como el tiempo que el Usuario Final ha permanecido en él, o sus patrones de compartir contenido o de desplazamiento en él.
* La URL referente y la búsqueda web que el Usuario Final ha utilizado para encontrar un Sitio Web del Editor y visitarlo.
* Las palabras clave introducidas en la función de búsqueda de la Barra de Herramientas de AddThis, y si el Usuario de la Barra de Herramientas descarga, instala o desinstala la Barra de Herramientas y cuándo lo hace.
* Información sobre la frecuencia con la que un Usuario Final utiliza las Herramientas de AddThis y la frecuencia con la que un Usuario de la Barra de Herramientas la utiliza.
* Los datos de geolocalización derivados de la dirección IP del Usuario Final y del usuario de la Barra de Herramientas.

Los Datos de AddThis se tratarán como información personal en la medida en que lo exija la legislación aplicable. Los Editores deben cumplir las Condiciones del Servicio de AddThis para obtener todas las autorizaciones y consentimientos necesarios del Usuario Final, y proporcionar los avisos requeridos para poder trasladar los Datos de AddThis recopilados de los Usuarios Finales a Oracle.

## Ayuda <a name="support"></a>

Si tienes alguna pregunta o necesitas ayuda para implementar AddThis en AMP, ponte en contacto con nuestro estupendo equipo de asistencia [enviando una incidencia](https://www.addthis.com/support/) o un correo electrónico a [help@addthis.com](mailto%3ahelp@addthis.com).
,false,false
