---
$category@: dynamic-content
formats:
  - websites
  - email
  - ads
teaser:
  text: Allows you to create forms to submit input fields in an AMP document.
toc: true
$title: amp-form
---

<!--
Copyright 2017 The AMP HTML Authors. All Rights Reserved.

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
    <td>Permite crear etiquetas <code>form</code> e <code>input</code>.</td>
  </tr>
  <tr>
    <td><strong>Secuencia de comandos obligatoria</strong></td>
    <td><code>&lt;script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md#the-layout-attribute">Diseños admitidos</a></strong></td>
    <td>N/D</td>
  </tr>
  <tr>
    <td><strong>Ejemplos</strong></td>
    <td>Consulta los <a href="https://ampbyexample.com/components/amp-form/">ejemplos de amp-form</a> de AMP By Example.</td>
  </tr>
</table>


# Comportamiento <a name="behavior"></a>

La extensión `amp-form` permite crear formularios (`<form>`) para añadir campos de entrada a un documento AMP. ``Además, proporciona [polyfills](#polyfills) para algunos comportamientos que no están incluidos en los navegadores.

[tip type="important"]
Si envías datos en un formulario, el punto de conexión del servidor debe implementar los [requisitos de seguridad de CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).
[/tip]

Antes de crear un `<form>`, debes incluir la secuencia de comandos obligatoria de la extensión `<amp-form>`; de lo contrario, el documento no será válido. Si utilizas etiquetas `input` para fines distintos a enviar sus valores (p. ej., campos de entrada que no estén dentro de un `<form>`), no necesitas cargar la extensión `amp-form`.

A continuación, se muestra un ejemplo de formulario básico:

[example preview="inline" playground="true" imports="amp-form" template="amp-mustache"]
```html
<form method="post"
    action-xhr="https://example.com/subscribe"{% if not format=='email'%}  
    target="_top"{% endif %}>
    <fieldset>
      <label>
        <span>Name:</span>
        <input type="text"
          name="name"
          required>
      </label>
      <br>
      <label>
        <span>Email:</span>
        <input type="email"
          name="email"
          required>
      </label>
      <br>
      <input type="submit"
        value="Subscribe">
    </fieldset>
    <div submit-success>
      <template type="amp-mustache">
        Subscription successful!
      </template>
    </div>
    <div submit-error>
      <template type="amp-mustache">
        Subscription failed!
      </template>
    </div>
  </form>
```
[/example]

# Atributos <a name="attributes"></a>

# target <a name="target"></a>

Indica dónde mostrar las respuestas del formulario después de enviarlo. El valor debe ser `_blank` o `_top`.

# action <a name="action"></a>

Especifica el punto de conexión del servidor que procesará los datos introducidos en el formulario. El valor debe ser una URL `https` (absoluta o relativa), y no puede ser un enlace a una red CDN.

* Para `method=GET`: utiliza este atributo o [`action-xhr`](#action-xhr).
* Para `method=POST`: utiliza el atributo [`action-xhr`](#action-xhr).

[tip type="note"]
Los atributos `target` y `action` solo se utilizan para las solicitudes GET que no son de XHR. El tiempo de ejecución de AMP utiliza `action-xhr` para hacer la solicitud e ignora `action` y `target`. Si no se incluye `action-xhr`, AMP realiza una solicitud GET al punto de conexión de `action` y utiliza `target` para abrir una ventana nueva (si el valor es `_blank`). El tiempo de ejecución de AMP también puede utilizar `action` y `target` como respaldo si la extensión `amp-form` no puede cargarse.
[/tip]

# action-xhr <a name="action-xhr"></a>

Especifica el punto de conexión del servidor que procesará los datos introducidos en el formulario y los enviará mediante XMLHttpRequest (XHR). Las solicitudes XHR (a veces denominadas "solicitudes AJAX") son aquellas en las que el navegador lleva a cabo la solicitud sin cargar del todo la página o sin abrir una página nueva. Los navegadores la envían en segundo plano mediante la [API de Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), si está disponible, y con la [API de XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) en los navegadores más antiguos.

[tip type="important"]
El punto de conexión XHR debe implementar los [requisitos de seguridad de CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).
[/tip]

Este atributo es obligatorio para `method=POST` y opcional para `method=GET`.

El valor de `action-xhr` puede ser el mismo punto de conexión o uno distinto del de `action` y tiene los mismos requisitos que `action`, que puedes consultar más arriba.

Para obtener más información sobre cómo redireccionar al usuario después de que se envíe el formulario correctamente, consulta la sección [Redireccionar después del envío](#redirecting-after-a-submission) que aparece más abajo.

# Otros atributos de formulario <a name="other-form-attributes"></a>

El resto de los [atributos de formulario](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) son opcionales.

# custom-validation-reporting <a name="custom-validation-reporting"></a>

Se trata de un atributo opcional que habilita y selecciona una estrategia personalizada para informar al usuario de si los datos que ha introducido en el formulario son válidos o no. Los valores admitidos son: `show-first-on-submit`, `show-all-on-submit` y `as-you-go`.

Para obtener más información, consulta la sección [Validaciones personalizadas](#custom-validations).

# Campos de entrada <a name="inputs-and-fields"></a>

**Se admiten:**

* Otros elementos relacionados con los formularios, como `<textarea>`, `<select>`, `<option>`, `<fieldset>`, `<label>`, `<input type=text>`, `<input type=submit>`, etc.
* `<input type=password>` y `<input type=file>` dentro de `<form method=POST action-xhr>`
* [`amp-selector`](amp-selector.md)

**No se admiten:**

* `<input type=button>` ni `<input type=image>`
* La mayoría de los atributos de campos de entrada relacionados con los formularios, como `form`, `formaction`, `formtarget`, `formmethod` y otros

Es posible que modifiquemos algunas de estas normas en el futuro para hacerlas menos estrictas; [ponte en contacto con nosotros](https://github.com/ampproject/amphtml/blob/main/CONTRIBUTING.md#suggestions-and-feature-requests) si te hacen falta y descríbenos casos prácticos.

Para obtener más información sobre los campos de entrada válidos, consulta las [reglas de amp-form](https://github.com/ampproject/amphtml/blob/main/validator/validator-main.protoascii) en la especificación de la herramienta de validación de AMP.

# Acciones <a name="actions"></a>

El elemento `amp-form` expone las siguientes acciones:

| Acción | Descripción |
|--------|-------------|
| `submit` | Permite activar el envío del formulario tras una acción específica, como al tocar un enlace o [al producirse un cambio en el campo de entrada](#input-events). |
| `clear` | Borra los valores de los campos de entrada del formulario. De este modo, los usuarios pueden volver a rellenar un formulario rápidamente. |

[tip type="read-on"]
Obtén más información sobre las [acciones y los eventos en AMP](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md).
[/tip]

# Eventos <a name="events"></a>

`amp-form` expone los siguientes eventos:

| Evento | Se activa cuando |
|-------|-------------|
| `submit` | Se envía el formulario y antes de que finalice el envío. |
| `submit-success` | Se envía el formulario y la respuesta indica que el envío se ha llevado a cabo correctamente. |
| `submit-error` | Se envía el formulario y la respuesta indica que se ha producido un error. |
| `verify` | Se inicia la verificación asíncrona. |
| `verify-error` | Se ha llevado a cabo la verificación asíncrona y la respuesta indica que se ha producido un error. |
| `valid` | El estado de validación del formulario cambia a "valid" (de acuerdo con su [estrategia para informar de la validación](#reporting-strategies)). |
| `invalid` | El estado de validación del formulario cambia a "invalid" (de acuerdo con su [estrategia para informar de la validación](#reporting-strategies)). |

Estos eventos se pueden utilizar mediante el [atributo `on`](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#on).

En este ejemplo, el código tiene en cuenta los eventos `submit-success` y `submit-error`, y muestra diferentes lightboxes en función del evento:

```html

<form ...="" on="submit-success:success-lightbox;submit-error:error-lightbox">
</form>

```

Consulta el [ejemplo completo](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

# Eventos de entrada <a name="input-events"></a>

AMP expone los eventos `input-debounced` y `change` a los elementos `<input>` secundarios, lo que te permite utilizar el [atributo `on`](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#on) para ejecutar una acción en cualquier elemento cuando cambia un valor de entrada.

Por ejemplo, un caso práctico habitual es enviar un formulario cuando se produce un cambio en un campo de entrada (se selecciona un botón de selección para responder a una encuesta, se elige un idioma en una lista desplegable `select` para traducir una página, etc.).

[example preview="inline" playground="true" imports="amp-form"]
```html
<form id="myform"
    method="post"
    action-xhr="https://example.com/myform"{% if not format=='email'%}  
    target="_blank"{% endif %}>
    <fieldset>
      <label>
        <input name="answer1"
          value="Value 1"
          type="radio"
          on="change:myform.submit">Value 1
      </label>
      <label>
        <input name="answer1"
          value="Value 2"
          type="radio"
          on="change:myform.submit">Value 2
      </label>
    </fieldset>
  </form>
```
[/example]

Consulta el [ejemplo completo](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

# Activadores de analíticas <a name="analytics-triggers"></a>

La extensión `amp-form` activa los siguientes eventos, que puedes monitorizar en tu configuración de [amp-analytics](amp-analytics.md):

| Evento                     | Se activa cuando                        |
|---------------------------|-----------------------------------|
| `amp-form-submit`         | Se inicia una solicitud de formulario.      |
| `amp-form-submit-success` | Se ha recibido una respuesta que indica que el envío se ha procesado correctamente (es decir, cuando la respuesta tiene el estado `2XX`). |
| `amp-form-submit-error`   | Se ha recibido una respuesta que indica que se ha producido un error al procesar el envío (es decir, cuando la respuesta no tiene el estado `2XX`). |

Puedes configurar tus analíticas para enviar estos eventos, como en el siguiente ejemplo:

```html
<amp-analytics>
  <script type="application/json">
  {
    "requests": {
      "event": "https://www.example.com/analytics/event?eid=${eventId}",
      "searchEvent": "https://www.example.com/analytics/search?formId=${formId}&query=${formFields[query]}"
    },
    "triggers": {
      "formSubmit": {
        "on": "amp-form-submit",
        "request": "searchEvent"
      },
      "formSubmitSuccess": {
        "on": "amp-form-submit-success",
        "request": "event",
        "vars": {
          "eventId": "form-submit-success"
        }
      },
      "formSubmitError": {
        "on": "amp-form-submit-error",
        "request": "event",
        "vars": {
          "eventId": "form-submit-error"
        }
      }
    }
  }
  </script>
</amp-analytics>
```

Los tres eventos generan un conjunto de variables que corresponden a ese formulario específico y sus campos. Estas variables se pueden utilizar para llevar a cabo analíticas.

Por ejemplo, el siguiente formulario tiene un campo:

```html
<form id="submit_form" action-xhr="/comment" method="POST">
  <input type="text" name="comment">
    <input type="submit" value="Comment">
    </form>
```

Cuando se activan los eventos `amp-form-submit`, `amp-form-submit-success` o `amp-form-submit-error`, se generan las siguientes variables, que contienen los valores especificados en el formulario:

  * `formId`
  * `formFields[comment]`

# Renderizar las respuestas procesadas correctamente o con errores <a name="successerror-response-rendering"></a>

Puedes renderizar en el formulario las respuestas procesadas correctamente o que tengan errores mediante las [plantillas ampliadas](../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#templates), como [amp-mustache](amp-mustache.md). También puedes representar las respuestas procesadas correctamente utilizando un data binding de [amp-bind](amp-bind.md) y los siguientes atributos de respuesta:

| Atributo de respuesta | Descripción |
|-----------|---------------------|
| `submit-success` | Se puede utilizar para mostrar un mensaje de éxito si la respuesta es adecuada (es decir, tiene el estado `2XX`). |
| `submit-error` | Se puede utilizar para mostrar un mensaje de error si la respuesta no es adecuada (es decir, no tiene el estado `2XX`).  |
| `submitting` | Se puede utilizar para mostrar un mensaje cuando se está enviando el formulario.  La plantilla de este atributo tiene acceso a los campos de entrada del formulario con fines visuales. Para obtener más información sobre cómo utilizar el atributo `submitting`, consulta el [ejemplo completo de formulario](#example-submitting) que aparece más abajo. |

# Para renderizar las respuestas mediante plantillas: <a name="to-render-responses-with-templating"></a>

* Aplica un atributo de respuesta a *cualquier elemento secundario directo* de `<form>`.
* Renderiza la respuesta en el elemento secundario incluyendo una plantilla a través de las etiquetas `<template></template>` o `<script type="text/plain"></script>`, o haciendo referencia a una plantilla utilizando el atributo `template="id_of_other_template"`.
* Proporciona un objeto JSON válido para las respuestas a `submit-success` y `submit-error`. Tanto las respuestas procesadas correctamente como las que muestran errores deben tener un encabezado `Content-Type: application/json`.

<a id="example-submitting"></a>

# Ejemplo: El formulario muestra mensajes de éxito, de error y de envío. <a name="example-form-displays-success-error-and-submitting-messages"></a>

En el siguiente ejemplo, las respuestas se renderizan en una plantilla insertada dentro del formulario.

```html
{% raw %}<form ...="">
  <fieldset>
    <input type="text" name="firstName">
      …
    </fieldset>
    <div verify-error="">
      <template type="amp-mustache">
        There is a mistake in the form!
        {{#verifyErrors}}{{message}}{{/verifyErrors}}
    </template>
  </div>
  <div submitting="">
    <template type="amp-mustache">
      Form submitting... Thank you for waiting {{name}}.
    </template>
  </div>
  <div submit-success="">
    <template type="amp-mustache">
      Success! Thanks {{name}} for subscribing! Please make sure to check your email {{email}}
    to confirm! After that we'll start sending you weekly articles on {{#interests}}<b>{{name}}</b> {{/interests}}.
  </template>
</div>
<div submit-error="">
  <template type="amp-mustache">
    Oops! {{name}}, {{message}}.
  </template>
</div>
</form>
{% endraw %}
```

El punto de conexión `action-xhr` devuelve las siguientes respuestas de JSON:

Si no hay errores:

```json
{
  "name": "Jane Miller",
  "interests": [{"name": "Basketball"}, {"name": "Swimming"}, {"name": "Reading"}],
  "email": "email@example.com"
}
```

Si hay errores:
```json
{
  "name": "Jane Miller",
  "message": "The email (email@example.com) you used is already subscribed."
}
```

Puedes renderizar las respuestas en una plantilla referenciada definida anteriormente en el documento utilizando el ID de la plantilla como el valor del atributo `template`, definido en los elementos con los atributos `submit-success` y `submit-error`.

```html
{% raw %}<template id="submit_success_template" type="amp-mustache">
  ¡Listo! Thanks {{name}} for subscribing! Please make sure to check your email {{email}}
to confirm! After that we'll start sending you weekly articles on {{#interests}}<b>{{name}}</b> {{/interests}}.
</template>
<template id="submit_error_template" type="amp-mustache">
  Vaya... {{name}}, {{message}}.
</template></p>

<form ...="">
  <fieldset>
    …
  </fieldset>
  <div submit-success="" template="submit_success_template"></div>
  <div submit-error="" template="submit_error_template"></div>
</form>
{% endraw %}
```

Consulta el [ejemplo completo](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

# Para renderizar una respuesta procesada con éxito mediante data binding: <a name="to-render-a-successful-response-with-data-binding"></a>

* Utiliza el [atributo on](../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md) para vincular el atributo de formulario *submit-success* con [`AMP.setState()`](amp-bind.md#updating-state-with-amp.setstate%28%29).
* Utiliza la propiedad `event` para capturar los datos de respuesta.
* Añade el atributo de estado al elemento deseado para vincularlo con la respuesta del formulario.

El siguiente ejemplo muestra una respuesta de formulario `submit-success` utilizando [`amp-bind`](amp-bind.md):
```html
<p [text]="'Thanks, ' + subscribe +'! You have successfully subscribed.'">Subscribe to our newsletter</p>
<form method="post"
      action-xhr="/components/amp-form/submit-form-input-text-xhr"
      target="_ top"
      on="submit-success: AMP.setState({'subscribe': event.response.name})">
  <div>
    <input type="text"
        name="name"
        placeholder="Name..."
        required>
    <input type="email"
      name="email"
      placeholder="Email..."
      required>
  </div>
  <input type="submit" value="Subscribe">
</form>
```

Cuando el formulario se envíe correctamente, devolverá una respuesta JSON similar a la siguiente:

```json
        {
          "name": "Jane Miller",
          "email": "email@example.com"
          }
```
A continuación, `amp-bind` actualiza el texto del elemento `<p>` para que coincida con el estado de `subscribe`:

```html
...
  <p [text]="'Thanks, ' + subscribe +'! You have successfully subscribed.'">Thanks Jane Miller! You have successfully subscribed.</p>
...
```

# Redireccionar después del envío <a name="redirecting-after-a-submission"></a>

Puedes redirigir a los usuarios a una página nueva después de que se envíe correctamente el formulario definiendo el encabezado de respuesta `AMP-Redirect-To` y especificando una URL de redirección. Dicha URL debe ser HTTPS; de lo contrario, se producirá un error con AMP y no se hará la redirección.  Los encabezados de respuesta de HTTP se configuran en tu servidor.

Asegúrate de actualizar el encabezado de respuesta `Access-Control-Expose-Headers` para incluir `AMP-Redirect-To` en la lista de encabezados permitidos.  Obtén más información sobre estos encabezados en [Seguridad de CORS en AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp)

*Ejemplo de encabezado de respuesta:*

```text
AMP-Redirect-To: https://example.com/forms/thank-you
Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin, AMP-Redirect-To
```

[tip type="success"]
Consulta los ejemplos de [envío de formulario con actualización](https://ampbyexample.com/components/amp-form/#form-submission-with-page-update) y de [página de producto](https://ampbyexample.com/samples_templates/product_page/#product-page) de AMP By Example, que demuestran el uso de la redirección después de enviar un formulario.
[/tip]

# Validaciones personalizadas <a name="custom-validations"></a>

La extensión `amp-form` te permite crear una UI personalizada mediante el atributo `custom-validation-reporting`, junto con una de las siguientes estrategias para informar de la validación: `show-first-on-submit`, `show-all-on-submit` o `as-you-go`.

Para incluir la validación personalizada en un formulario:

1. Define el atributo `custom-validation-reporting` de `form` junto con una de las [estrategias para informar de la validación](#reporting-strategies).
1. Proporciona tu propia UI de validación que incluya atributos especiales. AMP los detectará y los tendrá en cuenta en el momento oportuno, en función de la estrategia para informar de la validación que hayas especificado.

Por ejemplo:

[example preview="inline" playground="true" imports="amp-form"]
```html
<form method="post"
    action-xhr="https://example.com/subscribe"
    custom-validation-reporting="show-all-on-submit"{% if not format=='email'%}  
    target="_blank"{% endif %}>
    <fieldset>
      <label>
        <span>Name:</span>
        <input type="text"
          name="name"
          id="name5"
          required
          pattern="\w+\s\w+">
        <span visible-when-invalid="valueMissing"
          validation-for="name5"></span>
        <span visible-when-invalid="patternMismatch"
          validation-for="name5">
          Please enter your first and last name separated by a space (e.g. Jane Miller)
        </span>
      </label>
      <br>
      <label>
        <span>Email:</span>
        <input type="email"
          name="email"
          id="email5"
          required>
        <span visible-when-invalid="valueMissing"
          validation-for="email5"></span>
        <span visible-when-invalid="typeMismatch"
          validation-for="email5"></span>
      </label>
      <br>
      <input type="submit"
        value="Subscribe">
    </fieldset>
  </form>
```
[/example]

Para obtener más ejemplos, consulta [examples/forms.amp.html](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

En cuanto a los mensajes de validación, si el elemento no contiene texto, AMP lo rellenará con el mensaje de validación predeterminado del navegador. En el ejemplo anterior, cuando la entrada `name5` está vacía y se inicia la validación (es decir, el usuario intenta enviar el formulario), AMP rellenará `<span visible-when-invalid="valueMissing" validation-for="name5"></span>` con el mensaje de validación del navegador y muestra ese `span` al usuario.

[tip type="important"]
Debes proporcionar tu propia UI para cada tipo de estado no válido que pueda tener la entrada. Si no se han incluido, los usuarios no verán ningún mensaje de error de `custom-validation-reporting` que falte. Los estados de validez se pueden consultar en la [documentación oficial sobre las estrategias para informar de la validación de W3C HTML](https://www.w3.org/TR/html50/forms.html#validitystate).
[/tip]

# Estrategias para informar de la validación <a name="reporting-strategies"></a>

Especifica una de las siguientes opciones para informar de la validación del atributo `custom-validation-reporting`:

# Mostrar el primer error después de enviar (show-first-on-submit) <a name="show-first-on-submit"></a>

La opción para informar de la validación `show-first-on-submit` imita el comportamiento predeterminado que tiene el navegador cuando se activa la validación predeterminada. Muestra el primer error de validación que encuentra pero no el resto.

# Mostrar todos los errores después de enviar (show-all-on-submit) <a name="show-all-on-submit"></a>

Tras enviar el formulario, la opción para informar de la validación `show-all-on-submit` muestra todos los errores de validación en todos los campos de entrada que contienen respuestas no válidas. Esto resulta útil si quieres mostrar un resumen de las validaciones.

# Mostrar los errores al interactuar con el campo de entrada (as-you-go) <a name="as-you-go"></a>

La opción `as-you-go` permite a los usuarios ver los mensajes de validación mientras interactúan con el campo de entrada. Por ejemplo, si el usuario escribe una dirección de correo electrónico que no es válida, verá el mensaje de error inmediatamente.  Una vez que corrija el valor, el mensaje de error desaparecerá.

# Mostrar los errores al interactuar y al enviar (interact-and-submit) <a name="interact-and-submit"></a>

La opción para informar de la validación `interact-and-submit` combina el comportamiento de `show-all-on-submit` y de `as-you-go`. Los errores se mostrarán en los campos en los que se hayan introducido datos no válidos inmediatamente después de las interacciones y también en todos los campos tras intentar hacer el envío.

# Verificación <a name="verification"></a>

La validación de HTML5 proporciona información basada únicamente en la información disponible en la página, por ejemplo, si un valor coincide o no con un determinado patrón. Con la verificación de `amp-form`, puedes proporcionar al usuario la información que la validación de HTML5 no puede por sí sola. Por ejemplo, un formulario puede utilizar la verificación para comprobar si el usuario ya se ha registrado con una dirección de correo electrónico determinada. Otro caso práctico es verificar que un campo de entrada de ciudad y uno de código postal coinciden.

Por ejemplo:
```html
{% raw %}<h4>Ejemplo de verificación</h4>
<form method="post" action-xhr="/form/verify-json/post" verify-xhr="/form/verify-json/post"{% if not format=='email'%}   target="_blank"{% endif %}>
  <fieldset>
    <label>
      <span>Dirección de correo electrónico</span>
      <input type="text" name="email" required="">
      </label>
      <label>
        <span>Código postal</span>
        <input type="tel" name="zip" required="" pattern="[0-9]{5}(-[0-9]{4})?">
        </label>
        <label>
          <span>Ciudad</span>
          <input type="text" name="city" required="">
          </label>
          <label>
            <span>Documento</span>
            <input type="file" name="document" no-verify="">
            </label>
            <div class="spinner"></div>
            <input type="submit" value="Submit">
            </fieldset>
            <div submit-success="">
              <template type="amp-mustache">
                <p>¡Enhorabuena! Te has registrado con {{email}}</p>
              </template>
            </div>
            <div submit-error="">
              <template type="amp-mustache">
                {{#verifyErrors}}
              <p>{{message}}</p>
              {{/verifyErrors}}
            {{^verifyErrors}}
          <p>Algo no va bien. Inténtalo de nuevo más tarde.</p>
          {{/verifyErrors}}
      </template>
    </div>
  </form>
{% endraw %}
  ```

El formulario envía un campo `__amp_form_verify` como parte de los datos del formulario que indica al servidor que el envío es una solicitud de verificación, y no un envío formal.
Esto resulta útil para que el servidor sepa que no debe almacenar la solicitud de verificación si se utiliza el mismo punto de conexión para la verificación y para el envío.

Este es un ejemplo de cómo tiene que ser una respuesta de error de verificación:
```json
{
  "verifyErrors": [
    {"name": "email", "message": "That email is already taken."},
    {"name": "zip", "message": "The city and zip do not match."}
  ]
}
```

Para excluir un campo de la solicitud `verify-xhr`, añade el atributo `no-verify` al elemento de entrada.

Para obtener más ejemplos, consulta [examples/forms.amp.html](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

# Sustituciones de variables <a name="variable-substitutions"></a>

La extensión `amp-form` permite la [sustitución de variables de plataforma](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md) a los campos de entrada que están ocultos y que tienen el atributo `data-amp-replace`. En cada envío de formulario, `amp-form` localiza todas las cadenas `input[type=hidden][data-amp-replace]` y aplica sustituciones a las variables de su atributo `value`.

Debes indicar las variables que utilizas para cada sustitución de cada campo de entrada. Para ello, introduce una cadena con las variables utilizadas en el parámetro `data-amp-replace` separadas por espacios (consulta el ejemplo que aparece más abajo). AMP no reemplazará las variables que no se especifiquen de forma explícita.

A continuación, se muestra un ejemplo de cómo son los campos de entrada antes y después de las sustituciones. Ten en cuenta que debes utilizar la sintaxis de sustituciones de variables de la plataforma y no de analíticas:
```html
<!-- Carga inicial -->
<form ...>
  <input name="canonicalUrl" type="hidden"
        value="The canonical URL is: CANONICAL_URL - RANDOM - CANONICAL_HOSTNAME"
        data-amp-replace="CANONICAL_URL RANDOM">
  <input name="clientId" type="hidden"
        value="CLIENT_ID(myid)"
        data-amp-replace="CLIENT_ID">
  ...
</form>
```

Cuando el usuario intenta enviar el formulario, AMP intenta aplicar las sustituciones adecuadas a las variables del atributo `value` de todos los campos de entrada. En el caso de los envíos XHR, es probable que se sustituyan todas las variables. Sin embargo, en los envíos GET que no sean XHR, es posible que los valores que requieran resolución asíncrona no estén disponibles porque no se hayan resuelto previamente. Por ejemplo, `CLIENT_ID` no se resuelve si no se ha resuelto y almacenado en caché anteriormente.

```html
<!-- El usuario envía el formulario y los valores de las variables se aplican a los campos. -->
<form ...>
  <input name="canonicalUrl" type="hidden"
        value="The canonical URL is: https://example.com/hello - 0.242513759125 - CANONICAL_HOSTNAME"
        data-amp-replace="CANONICAL_URL RANDOM">
  <input name="clientId" type="hidden"
        value="amp:asqar893yfaiufhbas9g879ab9cha0cja0sga87scgas9ocnas0ch"
        data-amp-replace="CLIENT_ID">
    ...
</form>
```

Fíjate en cómo `CANONICAL_HOSTNAME` no se ha sustituido porque no estaba incluida en la lista blanca mediante el atributo `data-amp-replace` del primer campo.

Se producirán sustituciones en cada envío posterior. Obtén más información sobre las [sustituciones de variables en AMP](https://github.com/ampproject/amphtml/blob/main/spec/amp-var-substitutions.md).

# Polyfills <a name="polyfills"></a>

La extensión `amp-form` proporciona polyfills para los comportamientos y las funciones que faltan en algunos navegadores o que se van a implementar en la siguiente versión de CSS.

# Bloqueo de envíos no válidos y cuadros de mensaje de validación <a name="invalid-submit-blocking-and-validation-message-bubble"></a>

Los navegadores que utilizan motores basados en webkit en la actualidad (desde agosto del 2016) no admiten envíos de formularios no válidos. Esto incluye Safari en todas las plataformas y todos los navegadores en iOS. Por este motivo, la extensión `amp-form` proporciona un polyfill para bloquear los envíos no válidos y muestra cuadros con mensajes de validación para las respuestas no válidas.

# Pseudoclases de interacción del usuario <a name="user-interaction-pseudo-classes"></a>

Las pseudoclases `:user-invalid` y `:user-valid` forman parte de la [futura especificación de selectores de CSS 4](https://drafts.csswg.org/selectors-4/#user-pseudos) y se introducen para permitir mejores hooks para aplicar estilo a campos válidos o no válidos utilizando unos pocos criterios.

Una de las principales diferencias entre `:invalid` y `:user-invalid` es el momento en el que se aplican al elemento. La clase `:user-invalid` se aplica después de que el usuario lleve a cabo una interacción significativa con el campo de entrada (p. ej., cuando el usuario escribe en él o selecciona otro distinto).

La extensión `amp-form` incluye [clases](#classes-and-css-hooks) para proporcionar un polyfill para estas pseudoclasificaciones. La extensión `amp-form` también hace que se propaguen a antecedentes como los elementos `fieldset` y `form`.

# Validación mediante `<textarea>` <a name="-validation"></a>

La coincidencia de expresiones regulares es una función de validación habitual y compatible de forma nativa con la mayoría de los elementos de entrada, excepto `<textarea>`, para el cual se proporciona un polyfill y se admite el atributo `pattern```.

AMP Form proporciona un atributo `autoexpand` para los elementos `<textarea>`. Esto permite que el área de texto se expanda y contraiga para adaptar el texto que ha introducido el usuario, hasta alcanzar el tamaño máximo del campo. Si el usuario modifica manualmente el tamaño del campo, se anula el comportamiento del atributo autoexpand.

```html
<textarea autoexpand></textarea>
```

# Estilo <a name="styling"></a>

# Clases y hooks de CSS <a name="classes-and-css-hooks"></a>

La extensión `amp-form` proporciona clases y hooks de CSS para que los editores apliquen estilos a sus formularios y campos de entrada.

Se pueden utilizar las siguientes clases para indicar el estado de envío del formulario:

* `.amp-form-initial`
* `.amp-form-verify`
* `.amp-form-verify-error`
* `.amp-form-submitting`
* `.amp-form-submit-success`
* `.amp-form-submit-error`

Las siguientes clases funcionan como [polyfill para las pseudoclases de interacción del usuario](#user-interaction-pseudo-classes):

* `.user-valid`
* `.user-invalid`

Los editores pueden utilizar estas clases para hacer que sus campos de entrada y conjuntos de estos se adapten a las acciones del usuario (p. ej., destacando una entrada de datos no válida con un borde rojo cuando el usuario selecciona otro campo).

Para obtener más información sobre cómo utilizarlos, consulta el [ejemplo completo](https://github.com/ampproject/amphtml/blob/main/examples/forms.amp.html).

[tip type="success"]
Accede a [AMP Start](https://ampstart.com/components#form-elements) para echar un vistazo a los elementos de formulario de AMP adaptables y prediseñados que puedes utilizar en tus páginas AMP.
[/tip]

# Cuestiones sobre seguridad <a name="security-considerations"></a>

# Protección frente a XSRF <a name="protecting-against-xsrf"></a>

Además de seguir las recomendaciones de la [especificación de AMP CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md), presta especial atención a la sección sobre [procesar solicitudes de cambio de estado](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md)#processing-state-changing-requests) para evitar [ataques XSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery), en los que un atacante puede ejecutar comandos no autorizados utilizando la sesión actual de un usuario sin que este sea consciente de ello.

En general, ten en cuenta los siguientes puntos al aceptar datos del usuario introducidos en formularios:

* Utiliza solo solicitudes POST para cambios de estado.
* Utiliza las solicitudes GET que no son XHR solo con fines de navegación (p. ej., la Búsqueda).
    * Las solicitudes GET que no son XHR no recibirán orígenes o encabezados precisos, y los backends no podrán proteger frente a ataques XSRF con el mecanismo que se explica más arriba.
    * En general, utiliza las solicitudes XHR o las GET que no son XHR solo para la navegación o para la recuperación de información.</li>
* Las solicitudes POST que no son XHR no están permitidas en los documentos de AMP. Esto se debe a las incoherencias al incluir el encabezado `Origin` de estas solicitudes en distintos navegadores y a las complicaciones para proteger frente a ataques XSRF que surgirían al intentar lograr la compatibilidad con este encabezado. Puedes ponerte en contacto con nosotros si crees que deberíamos permitir estas solicitudes, ya que quizá reconsideremos esta política en el futuro.
