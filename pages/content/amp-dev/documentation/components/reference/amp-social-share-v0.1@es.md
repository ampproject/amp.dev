---
$title: amp-social-share
$category@: ads-analytics
teaser:
  text: Se está desarrollando la función para hacer un seguimiento del uso compartido de contenido en redes sociales.
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



Muestra un botón para compartir contenido en redes sociales.


<table>
  <tr>
    <td class="col-fourty"><strong>Secuencia de comandos obligatoria</strong></td>
    <td>
      <div>
        <code>&lt;script async custom-element="amp-social-share" src="https://ampjs.org/v0/amp-social-share-0.1.js"&gt;&lt;/script&gt;</code>
      </div>
    </td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Diseños admitidos</a></strong></td>
    <td>container, fill, fixed, fixed-height, flex-item, nodisplay y responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Ejemplos</strong></td>
    <td>Consulta el <a href="https://ampbyexample.com/components/amp-social-share/">ejemplo de amp-social-share</a> de AMP By Example</td>
  </tr>
</table>

## Descripción general <a name="overview"></a>

El componente `amp-social-share` muestra un botón para compartir contenido en redes sociales de distintos proveedores.

## Ejemplo <a name="examples"></a>

**Ejemplo: Botón básico para compartir contenido en redes sociales**

El botón para compartir contenido extrae algunos valores predeterminados de algunos proveedores preconfigurados. Asume que la URL canónica del documento actual es la URL que quieres compartir y que el título de la página es el texto que quieres compartir.

```html
<amp-social-share type="twitter"></amp-social-share>
```

**Ejemplo: Transferencia de parámetros**

Si quieres transferir parámetros al punto de conexión para compartir, puedes especificar `data-param-<attribute>` para que se añada al punto de conexión.
```html
<amp-social-share type="linkedin" width="60" height="44"
    data-param-text="Hello world"
    data-param-url="https://example.com/">
</amp-social-share>
```

LinkedIn es uno de los proveedores preconfigurados, por lo que no es necesario que incluyas el atributo `data-share-endpoint`.

## Atributos <a name="attributes"></a>

<table>
  <tr>
    <td width="40%"><strong>type (obligatorio)</strong></td>
    <td>Selecciona un tipo de proveedor. Es obligatorio tanto para los proveedores preconfigurados como para los demás.</td>
  </tr>
  <tr>
    <td width="40%"><strong>data-target</strong></td>
    <td>Especifica el destino en el que se abrirá el elemento. El valor predeterminado es <code>&#95;blank</code> en todos los casos que no sean correos electrónicos o SMS en iOS, donde se asigna el valor <code>&#95;top</code>.
        Ten en cuenta que solo recomendamos usar esta anulación con correos electrónicos.</td>
    </tr>
    <tr>
      <td width="40%"><strong>data-share-endpoint</strong></td>
      <td>Este atributo es <strong>obligatorio para los proveedores no configurados</strong>.
        <br>
          Algunos proveedores conocidos tienen puntos de conexión para compartir preconfigurados. Para obtener más información, consulta la sección <a href="#pre-configured-providers">Proveedores preconfigurados</a>. Con los proveedores no configurados, debes especificar el punto de conexión para compartir.</td>
  </tr>
  <tr>
          <td width="40%"><strong>data-param-*</strong></td>
          <td>Todos los atributos <code>data-param-*</code> predeterminados se convierten en parámetros de URL y se transfieren al punto de conexión para compartir.</td>
  </tr>
</table>

## Proveedores preconfigurados <a name="pre-configured-providers"></a>

El componente `amp-social-share` incluye [algunos proveedores preconfigurados](0.1/amp-social-share-config.js) cuyos puntos de conexión para compartir y algunos parámetros predeterminados se conocen.

<table>
  <tr>
    <th class="col-twenty">Proveedor</th>
    <th class="col-twenty">Tipo</th>
    <th>Parámetros</th>
  </tr>
  <tr>
    <td><a href="https://developers.google.com/web/updates/2016/10/navigator-share">API Web Share</a> (activa el cuadro de diálogo para compartir del SO)</td>
    <td><code>system</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code>: es opcional y su valor predeterminado es "Título de la página actual".</li>
        <li><code>data-mode</code>: es opcional. Si se le asigna el valor <code>replace</code>, se eliminan las demás opciones para compartir.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Dirección de correo electrónico</td>
    <td><code>email</code></td>
    <td>
      <ul>
        <li><code>data-param-subject</code>: es opcional y su valor predeterminado es "Título de la página actual".</li>
        <li><code>data-param-body</code>: es opcional y su valor predeterminado es la URL <code>rel=canonical</code>.</li>
        <li><code>data-param-recipient</code>: es opcional y su valor predeterminado es '' (cadena vacía).</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Facebook</td>
    <td><code>facebook</code></td>
    <td>
      <ul>
        <li><code>data-param-app_id</code>: es <strong>obligatorio</strong> y su valor predeterminado es none. Este parámetro es el atributo <code>app_id</code> de Facebook obligatorio en el <a href="https://developers.facebook.com/docs/sharing/reference/share-dialog">cuadro de diálogo para compartir de Facebook</a>.</li>
        <li><code>data-param-href</code>: es opcional y su valor predeterminado es la URL <code>rel=canonical</code>.</li>
        <li><code>data-param-quote</code>: es opcional. Se puede utilizar para compartir una cita o un texto.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LinkedIn</td>
    <td><code>linkedin</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: es opcional y su valor predeterminado es la URL <code>rel=canonical</code>.</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>Pinterest</td>
    <td><code>pinterest</code></td>
    <td>
      <ul>
        <li><code>data-param-media</code>: es opcional (aunque se recomienda usarlo) y su valor predeterminado es none. Es la URL de las redes sociales que se comparte en Pinterest. Si no se le asigna ningún valor, el usuario final tendrá que subir un elemento multimedia de Pinterest.</li>
        <li><code>data-param-url</code>: es opcional y su valor predeterminado es la URL <code>rel=canonical</code>.</li>
        <li><code>data-param-description</code>: es opcional y su valor predeterminado es "Título de la página actual".</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>G+</td>
    <td><code>gplus</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: es opcional y su valor predeterminado es la URL <code>rel=canonical</code>.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Tumblr</td>
    <td><code>tumblr</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: es opcional y su valor predeterminado es la URL <code>rel=canonical</code>.</li>
        <li><code>data-param-text</code>: es opcional y su valor predeterminado es "Título de la página actual".</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Twitter</td>
    <td><code>twitter</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: es opcional y su valor predeterminado es la URL <code>rel=canonical</code>.</li>
        <li><code>data-param-text</code>: es opcional y su valor predeterminado es "Título de la página actual".</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>WhatsApp</td>
    <td><code>whatsapp</code></td>
    <td>
      <ul>
        <li><code>data-param-text</code>: es opcional y su valor predeterminado es "Título de la página actual - URL de la página actual".</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>LINE</td>
    <td><code>line</code></td>
    <td>
      <ul>
        <li><code>data-param-url</code>: es opcional y su valor predeterminado es la URL <code>rel=canonical</code>.</li>
        <li><code>data-param-text</code>: es opcional y su valor predeterminado es "Título de la página actual".</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SMS</td>
    <td><code>sms</code></td>
    <td>
      <ul>
        <li><code>data-param-body</code>: es opcional y su valor predeterminado es la URL <code>rel=title - rel=canonical</code>.</li></ul>
    </td>
  </tr>
</table>

## Proveedores no configurados <a name="non-configured-providers"></a>

Además de los proveedores preconfigurados, puedes utilizar proveedores no configurados especificando atributos adicionales en el componente `amp-social-share`.

**Ejemplo: Crear un botón para compartir contenido en un proveedor no configurado**

En el siguiente ejemplo se crea un botón para compartir contenido a través de Facebook Messenger. Para ello, se asigna al atributo `data-share-endpoint` el punto de conexión del protocolo personalizado de Facebook Messenger.

```html
<amp-social-share type="facebookmessenger"
    data-share-endpoint="fb-messenger://share"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

Como estos proveedores no están preconfigurados, deberás crear la imagen y los estilos de botón adecuados para cada proveedor.

## Estilos <a name="styles"></a>

### Estilos predeterminados <a name="default-styles"></a>

De forma predeterminada, `amp-social-share` incluye algunos proveedores preconfigurados conocidos. Los botones de estos proveedores incluyen el color y el logotipo oficiales del proveedor. El ancho predeterminado es de 60 píxeles y el alto predeterminado es de 44 píxeles.

[tip type="success"]
En [AMP Start](https://ampstart.com/components#links-and-sharing) encontrarás menús de navegación prediseñados que podrás adaptar para tus páginas AMP.
[/tip]

### Estilos personalizados <a name="custom-styles"></a>

Si quieres aplicar un estilo propio, simplemente anula los estilos proporcionados, como el siguiente:
```css
amp-social-share[type="twitter"] {
  background: red;
  background-image: url(datauri:svg/myownsvgicon);
}
```

## Sustitución de variables <a name="variable-substitution"></a>

Puedes usar la [sustitución global de variables AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md) en el elemento `<amp-social-share>`. En el siguiente ejemplo, `TITLE` se sustituye por el título de la página, y `CANONICAL_URL` se sustituye por la URL canónica del documento.

```html
<amp-social-share type="whatsapp"
    data-param-text="Check out this article: TITLE - CANONICAL_URL">
</amp-social-share>
```

## Validación <a name="validation"></a>

Consulta las [reglas de amp-social-share](https://github.com/ampproject/amphtml/blob/main/extensions/amp-social-share/validator-amp-social-share.protoascii) en la especificación de la herramienta de validación de AMP.
