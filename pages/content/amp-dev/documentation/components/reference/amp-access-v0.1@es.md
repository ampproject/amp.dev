---
$title: amp-access
$category@: dynamic-content
teaser:
  text: Proporciona un muro de pago de AMP y asistencia con la suscripción.
---



AMP Access, que proporciona un muro de pago de AMP y asistencia con la suscripción, permite a los editores controlar el contenido al que los usuarios pueden acceder y definir restricciones en función del estado de suscripción, el número de visualizaciones y otros factores.

# amp-access <a name="amp-access"></a>



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

<table>
  <tr>
    <td><strong>Disponibilidad</strong></td>
    <td>Estable</td>
  </tr><tr>
  <td class="col-fourty"><strong>Secuencia de comandos obligatoria</strong></td>
  <td>
    <div>
      <code>&lt;script async custom-element="amp-access" src="https://ampjs.org/v0/amp-access-0.1.js">&lt;/script></code>
    </div>
  </td>
</tr>
<tr>
  <td class="col-fourty"><strong>Ejemplos</strong></td>
  <td><a href="https://ampbyexample.com/components/amp-access/">Ejemplo comentado de código de amp-access</a></td>
</tr>
</table>

## Relación con `amp-subscriptions` <a name="relationship-to-amp-subscriptions"></a>

La extensión [`amp-subscriptions`](amp-subscriptions.md) ofrece funciones similares a `amp-access`, pero admite un protocolo de muro de pago de acceso más especializado. Estas son algunas de las diferencias más importantes:

1. La respuesta de autorizaciones de `amp-subscriptions` es similar a la autorización de amp-access, pero está estrictamente definida y estandarizada.
1. La extensión `amp-subscriptions` permite que se configuren varios servicios para que la página participe en las decisiones de acceso o de muro de pago. Se ejecutan de forma simultánea y se da prioridad a una u otra según el servicio que devuelva una respuesta positiva.
1. Los visores de AMP pueden proporcionar a `amp-subscriptions` como prueba de acceso una respuesta de autorización firmada basada en un acuerdo independiente con los editores.
1. En `amp-subscriptions`, el marcado de contenido está estandarizado, lo que permite a las aplicaciones y a los rastreadores detectar con facilidad las secciones de contenido premium.

Debido a la estandarización del marcado, la compatibilidad con varios proveedores y la compatibilidad mejorada con los visores, se recomienda que las nuevas implementaciones de editores y proveedores de muros de pago utilicen `amp-subscriptions`.

## Solución <a name="solution"></a>

La solución propuesta permite al editor controlar los siguientes flujos y decisiones:
- Creación y gestión de usuarios
- Control del cupo por usuario (permitir un número determinado de visualizaciones gratuitas)
- Responsabilidad sobre el flujo de inicio de sesión
- Responsabilidad de autenticar al usuario
- Responsabilidad sobre la autorización y las reglas de acceso
- Flexibilidad de los parámetros de acceso según el documento

La solución consta de los siguientes componentes:

1. [**ID de lector de AMP:**](#amp-reader-id) lo proporciona el ecosistema de AMP y es un identificador único del lector tal y como lo ve AMP.
1. [**Marcado de acceso al contenido:**](#access-content-markup) lo crea el editor y define qué partes de un documento son visibles y en qué circunstancias.
1. [**Punto de conexión de autorización:**](#authorization-endpoint) lo proporciona el editor y devuelve la respuesta que define qué parte de un documento puede visualizar el lector.
1. [**Punto de conexión de pingback:**](#pingback-endpoint) lo proporciona el editor y se utiliza para enviar la impresión de "visualización" de un documento.
1. [**Enlace de inicio de sesión y página de inicio de sesión:**](#login-page-and-login-link) permiten al editor autenticar al lector y asociar su identidad al ID de lector de AMP.

Google AMP Cache devuelve el documento al lector para que este lo visualice, con algunas secciones oscurecidas que determina el marcado de acceso al contenido. El tiempo de ejecución de AMP hace una llamada al punto de conexión de autorización y utiliza la respuesta para ocultar o mostrar las secciones que defina el marcado de acceso al contenido. Una vez que el documento se ha mostrado al lector, el tiempo de ejecución de AMP llama al punto de conexión de pingback, que el editor puede utilizar para actualizar el medidor que lleva cuenta del número de visualizaciones gratuitas que quedan disponibles.

La solución también permite al editor colocar un enlace de inicio de sesión en el documento AMP que dirija a la página de inicio de sesión o suscripción en la cual el editor puede autenticar al lector y asociar su identidad con el ID de lector de AMP.

En su forma más básica, esta solución envía el documento completo (aunque con secciones ocultas) al lector, y simplemente muestra u oculta las secciones restringidas en función de la respuesta de autorización. Sin embargo, la solución también proporciona la opción "server", por la cual las secciones restringidas se pueden excluir del documento que se muestra inicialmente y solo se pueden descargar después de que se haya confirmado la autorización.

La compatibilidad con AMP Access requiere que el editor implemente los componentes descritos más arriba. El marcado de acceso al contenido y el punto de conexión de autorización son obligatorios, mientras que el punto de conexión de pingback y la página de inicio de sesión son opcionales.

### ID de lector de AMP <a name="amp-reader-id"></a>

Para servir de apoyo a los servicios de acceso y a los casos prácticos, AMP Access introduce el concepto de *ID de lector*.

El ID de lector es un ID anónimo y único creado por el ecosistema de AMP. Es único para cada combinación de lector y editor: un lector tiene un ID diferente para cada editor. El ID de lector no es reversible, se incluye en todas las comunicaciones entre AMP y editor y tiene una entropía muy alta. Los editores pueden utilizarlo para identificar al lector y asociarlo a sus propios sistemas de identificación.

El ID de lector se crea en el dispositivo del usuario, y se pretende que su vida útil sea larga.  No obstante, cumple con las reglas normales de almacenamiento del navegador, incluidas las de las ventanas de incógnito. El ciclo de vida previsto del ID de lector es de 1 año entre cada uso o hasta que el usuario borre sus cookies. Actualmente, no se comparte entre varios dispositivos.

El ID de lector se crea de forma similar al [mecanismo utilizado para crear los ExternalCID](https://docs.google.com/document/d/1f7z3X2GM_ASb3ZCI_7tngglxwS6WoWi1EB3aKzdf6vo/edit#heading=h.hb9q0wpwwhuf). Un ejemplo de ID de lector es: `amp-OFsqR4pPKynymPyMmplPNMvxSTsNQob3TnK-oE3nwVT0clORaZ1rkeEz8xej-vV6`.

### AMP Access y las cookies <a name="amp-access-and-cookies"></a>

Los editores pueden utilizar sus propias cookies de autenticación, los ID de lector o una combinación de ambos.

### Marcado de acceso al contenido <a name="access-content-markup"></a>

El marcado de acceso al contenido determina qué secciones están visibles u ocultas en función de la respuesta de autorización que devuelve el punto de conexión de autorización. Se define mediante atributos especiales de marcado.

### Punto de conexión de autorización <a name="authorization-endpoint"></a>

La autorización es un punto de conexión que proporciona el editor y al que llaman el tiempo de ejecución de AMP o Google AMP Cache. Se trata de un punto de conexión CORS GET con credenciales y que devuelve los parámetros de acceso que puede utilizar el marcado de acceso al contenido para ocultar o mostrar diferentes partes del documento.

### Punto de conexión de pingback <a name="pingback-endpoint"></a>

El pingback es un punto de conexión que proporciona el editor y al que hacen llamadas el tiempo de ejecución de AMP o Google AMP Cache. Se trata de un punto de conexión CORS POST con credenciales. El tiempo de ejecución de AMP llama a este punto de conexión de forma automática cuando el lector empieza a visualizar el documento y una vez que el lector ha completado correctamente el flujo de inicio de sesión. Uno de los objetivos principales del punto de conexión de pingback es que el editor actualice la información del cupo por usuario.

Este componente es opcional, y se puede inhabilitar definiendo la propiedad de configuración `noPingback` como `true`.

### Página de inicio de sesión y enlace de inicio de sesión <a name="login-page-and-login-link"></a>

El editor se encarga de implementar y servir la página de inicio de sesión, y el tiempo de ejecución de AMP se encarga de llamarla. Normalmente se muestra como un cuadro de diálogo de navegador.

La página de inicio de sesión se activa cuando el lector toca en el enlace de inicio de sesión, que el editor puede colocar en cualquier lugar del documento.

## Especificación v. 0.1 <a name="specification-v01"></a>

### Configuración <a name="configuration"></a>

Todos los puntos de conexión se configuran en la sección HEAD del documento AMP como un objeto JSON:

```html

<script id="amp-access" type="application/json">
  {
    "property": value,
    ...
    }
</script>
```

En esta configuración se definen las siguientes propiedades:

<table>
  <tr>
    <th>Propiedad</th>
    <th>Valores</th>
    <th>Descripción</th>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorization</code></td>
    <td><code>&lt;URL&gt;</code></td>
    <td>URL HTTPS del punto de conexión de autorización.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>pingback</code></td>
    <td><code>&lt;URL&gt;</code></td>
    <td>URL HTTPS del punto de conexión de pingback.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>noPingback</code></td>
    <td>"true" o "false"</td>
    <td>Si se define como "true", se inhabilita el pingback.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>login</code></td>
    <td class="col-twenty"><code>&lt;URL&gt;</code> o<br>&lt;Map[cadena, URL]&gt;</td>
    <td>URL HTTPS de la página de inicio de sesión o conjunto de URL de distintos tipos de páginas de inicio de sesión.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorizationFallbackResponse</code></td>
    <td>&lt;objeto&gt;</td>
    <td>Objeto JSON que se utilizará en lugar de la respuesta de autorización si esta falla.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>authorizationTimeout</code></td>
    <td>&lt;número&gt;</td>
    <td>Tiempo de espera (en milisegundos) tras el cual se considera que la solicitud de autorización no se ha procesado correctamente. El valor predeterminado es 3000, y los valores superiores a este solo se permiten en entornos de desarrollo. </td>
  </tr>
  <tr>
    <td class="col-fourty"><code>type</code></td>
    <td>"client" o "server"</td>
    <td>El valor predeterminado es "client". La opción "server" está aún en fase de debate sobre el diseño, y se actualizarán los documentos correspondientes cuando esté lista.</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>namespace</code></td>
    <td>cadena</td>
    <td>El valor está vacío de forma predeterminada. El espacio de nombre es obligatorio si se especifican varios proveedores de acceso.</td>
  </tr>
</table>

Los valores *`<URL>`* especifican las URL HTTPS con variables de sustitución. Las variables de sustitución se tratan con más detalle en la sección [Variables de URL de acceso](#access-url-variables) que aparece más abajo.

Este es un ejemplo de configuración de AMP Access:

```html

<script id="amp-access" type="application/json">
{
  "authorization":
      "https://pub.com/amp-access?rid=READER_ID&url=SOURCE_URL",
  "pingback":
      "https://pub.com/amp-ping?rid=READER_ID&url=SOURCE_URL",
  "login":
      "https://pub.com/amp-login?rid=READER_ID&url=SOURCE_URL",
  "authorizationFallbackResponse": {"error": true}
}
</script>

```

#### Varios proveedores de acceso <a name="multiple-access-providers"></a>

Es posible especificar varios proveedores de acceso utilizando una matriz en lugar de un único objeto y proporcionando un `namespace` para cada entrada.

```html

<script id="amp-access" type="application/json">
[
  {
    "property": value,
    ...
    "namespace": value
  },
  ...
]
</script>

```

### Variables de URL de acceso <a name="access-url-variables"></a>

Al configurar las URL de varios puntos de conexión, el editor puede utilizar las variables de sustitución. La lista completa de estas variables se encuentra en la [especificación de las variables de AMP](https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-var-substitutions.md). Además, en esta especificación se incluyen algunas variables específicas de acceso, como `READER_ID` y `AUTHDATA`. En la tabla que aparece a continuación, se describen algunas de las variables más relevantes:

<table>
  <tr>
    <th>Variable</th>
    <th>Descripción</th>
  </tr>
  <tr>
    <td class="col-thirty"><code>READER_ID</code></td>
    <td>ID de lector de AMP.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>AUTHDATA(field)</code></td>
    <td>Valor del campo en la respuesta de autorización.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>RETURN_URL</code></td>
    <td>Marcador de posición de la URL de devolución que especifica el servidor AMP. La URL de devolución es la dirección que un cuadro de diálogo usa cuando devuelve información de inicio de sesión al servidor.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>SOURCE_URL</code></td>
    <td>URL de la fuente de este documento AMP. Si el documento se sirve desde una red CDN, AMPDOC_URL será una URL de red CDN, mientras que SOURCE_URL será la URL de la fuente original.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>AMPDOC_URL</code></td>
    <td>URL de este documento AMP.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>CANONICAL_URL</code></td>
    <td>URL canónica de este documento AMP.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>DOCUMENT_REFERRER</code></td>
    <td>URL referente.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>VIEWER</code></td>
    <td>URL del visor de AMP.</td>
  </tr>
  <tr>
    <td class="col-thirty"><code>RANDOM</code></td>
    <td>Número aleatorio. Resulta útil para evitar el almacenamiento en la memoria caché del navegador.</td>
  </tr>
</table>

A continuación, se muestra un ejemplo de la URL ampliada con el ID de lector, la URL canónica, la URL referente y la prevención de almacenamiento en caché aleatoria:
```text
https://pub.com/access?
  rid=READER_ID
  &url=CANONICAL_URL
  &ref=DOCUMENT_REFERRER
  &_=RANDOM
```

La variable AUTHDATA está disponible para las URL del punto de conexión de pingback y de la página de inicio de sesión. Permite pasar cualquier campo de la respuesta de autorización como si fuera un parámetro de URL; por ejemplo, `AUTHDATA(isSubscriber)`. También se permiten las expresiones anidadas, como `AUTHDATA(other.isSubscriber)`. Si se utilizan espacios de nombre, pueden anteponerse al campo, por ejemplo, `AUTHDATA(anamespace.afield)`.

### Marcado de acceso al contenido <a name="access-content-markup-1"></a>

El marcado de acceso al contenido determina qué secciones están visibles u ocultas. Se compone de dos atributos de AMP: `amp-access` y `amp-access-hide`, que se pueden colocar en cualquier elemento HTML.

El atributo `amp-access` proporciona la expresión que devuelve "true" o "false" en función de la respuesta de autorización que muestra el punto de conexión de autorización. El valor resultante indica si el elemento y su contenido son visibles o no.

El valor `amp-access` es una expresión booleana definida en un lenguaje parecido a SQL. Su gramática se define en el [Anexo A.](#appendix-a-amp-access-expression-grammar) Se define de la siguiente manera:
```html

<div amp-access="expression">...</div>
```
Sus propiedades y valores hacen referencia a las propiedades y los valores de la respuesta de autorización que devuelve el punto de conexión de autorización. Esto proporciona un sistema flexible que admite diferentes casos de acceso. Si utilizas espacios de nombre, debes anteponerlos a los nombres de propiedades; por ejemplo, `anamespace.aproperty`.

El atributo `amp-access-hide` se puede utilizar para ocultar el contenido antes de que se reciba la respuesta de autorización, que podría indicar que se debe mostrar. Proporciona la semántica de "invisible de forma predeterminada". La respuesta de autorización que devuelva la autorización más adelante puede anular esta configuración predeterminada y hacer que la sección sea visible. Si se omite el atributo `amp-access-hide`, la sección se mostrará o se incluirá de forma predeterminada. El atributo `amp-access-hide` solo se puede utilizar junto con el atributo `amp-access`.
```html
<div amp-access="expression" amp-access-hide>...</div>
```

Si falla la solicitud de autorización, las expresiones `amp-access` no se evalúan y el atributo `amp-access-hide` proporcionado inicialmente por el documento determina si una sección debe estar visible u oculta.

Se puede ampliar el conjunto de atributos `amp-access-*` según sea necesario para admitir diferentes necesidades de ofuscación y renderizado.

Si falla la solicitud de autorización y no se especifica la respuesta "authorizationFallbackResponse" en la documentación, las expresiones `amp-access` no se evalúan y el atributo `amp-access-hide` proporcionado inicialmente por el documento determina si una sección debe estar visible u oculta.

El ejemplo que aparece a continuación muestra el enlace de inicio de sesión o el contenido completo en función del estado de la suscripción:
```html
<header>
  Título del documento
</header>
<div>
  Primer fragmento del documento.
</div>

<div amp-access="NOT subscriber" amp-access-hide>
  <a on="tap:amp-access.login">¡Suscríbete ahora!</a>
</div>

<div amp-access="subscriber">
  Contenido completo.
</div>

```
En este ejemplo:
- *subscriber* es un campo booleano que aparece en la respuesta de autorización que devuelve el punto de conexión de autorización. Esta sección está oculta de forma predeterminada, lo cual es opcional.
- En este ejemplo se elige mostrar todo el contenido antes de recibir la respuesta.

Este es un ejemplo que muestra al lector la renuncia de responsabilidad sobre el estado del cupo por usuario:

```html
{% raw %}
<section amp-access="views <= maxViews">
  <template amp-access-template type="amp-mustache">
    You are reading article {{views}} out of {{maxViews}}.
  </template>
</section>
{% endraw %}
```

Y este es un ejemplo que muestra contenido adicional a los suscriptores premium:
```html
<section amp-access="subscriptonType = 'premium'">
  Shhh… No one but you can read this content.
</section>
```

### Punto de conexión de autorización <a name="authorization-endpoint-1"></a>

La autorización se configura a través de la propiedad `authorization` de la sección de [configuración de AMP Access](#configuration). Se trata de un punto de conexión CORS GET con credenciales. Consulta la sección [Seguridad de origen de CORS](#cors-origin-security) para saber cómo debe protegerse esta solicitud.

La autorización puede adoptar cualquier parámetro definido en la sección [Variables de URL de acceso](#access-url-variables). Por ejemplo, podría transmitir el ID de lector de AMP y la URL del documento. Además de los parámetros de URL, el editor puede utilizar cualquier información enviada de forma normal a través del protocolo HTTP, como la dirección IP del lector. Es obligatorio incluir `READER_ID`.

Este punto de conexión genera la respuesta de autorización que se puede utilizar en las expresiones de marcado de contenido para mostrar u ocultar distintas partes del contenido.

El formato de la solicitud es:
```text
https://publisher.com/amp-access.json?
rid=READER_ID
&url=SOURCE_URL
```
La respuesta es un objeto JSON sin formato: puede contener cualquier propiedad y valor, con algunas limitaciones, que son:
- Los nombres de las propiedades deben ajustarse a las restricciones definidas por la gramática de expresiones de `amp-access` (consulta el [Anexo A](#appendix-a-amp-access-expression-grammar)). Esto quiere decir, a grandes rasgos, que los nombres de las propiedades no pueden contener caracteres como espacios, guiones ni otros que no cumplan la especificación de "amp-access".
- Los valores de propiedad solo pueden ser de uno de los siguientes tipos: string, number o boolean.
- Los valores también se pueden anidar como objetos con valores de los mismos tipos: string, number o boolean.
- El tamaño total de la respuesta de autorización serializada no puede superar los 500 bytes.
- Asegúrate de que la respuesta no incluya información personal identificable (IPI) ni datos personales.

A continuación, se muestra una pequeña lista de propiedades que puede devolver el punto de conexión de autorización:
- Información del cupo por usuario: máximo permitido y número actual de visualizaciones.
- Indica si el lector ha iniciado sesión o si está suscrito.
- Más información sobre el tipo de suscripción: básica o premium
- Información geográfica: región o región de publicación personalizada

A continuación, se muestra un ejemplo de respuesta en la que se indica que el lector no es suscriptor, que su cupo por usuario es de 10 artículos al mes y que ya ha visualizado 6:
```json
{
  "maxViews": 10,
  "currentViews": 6,
  "subscriber": false
}
```
Este es un ejemplo de respuesta en la que se indica que el lector ha iniciado sesión y tiene una suscripción premium:
```json
{
  "loggedIn": true,
  "subscriptionType": "premium"
}
```
Puede hacerse una llamada a esta RPC en la fase de renderizado previo. Si es así, no se puede contabilizar como una visualización a efectos del cupo por usuario, ya que puede que el lector no llegue a visualizar el documento.

Otra consideración importante es que, en algunos casos, el tiempo de ejecución de AMP puede requerir hacer una llamada al punto de conexión de autorización varias veces por cada impresión de documento. Esto puede ocurrir cuando el tiempo de ejecución de AMP considera que los parámetros de acceso del lector han cambiado de forma significativa, como después de un flujo de inicio de sesión correcto.

El tiempo de ejecución de AMP y las extensiones pueden utilizar la respuesta de autorización con tres propósitos distintos:

1. Para evaluar expresiones de `amp-access`.
2. Para evaluar plantillas `<template>`, como `amp-mustache`.
3. Para proporcionar variables adicionales a las URL de pingback y de inicio de sesión mediante `AUTHDATA(field)`.

El tiempo de ejecución de AMP hace una llamada al punto de conexión de autorización en calidad de punto de conexión de CORS con credenciales. Como tal, debe implementar el protocolo de CORS y utilizar el origen de CORS y el de la fuente para restringir el acceso a este servicio, tal y como se describe en la sección [Seguridad de origen de CORS](#cors-origin-security). Este punto de conexión puede utilizar las cookies de editor para su funcionamiento. Por ejemplo, puede asociar el binding entre el ID de lector y la identidad de usuario del editor. AMP no necesita ni quiere tener conocimiento de ello. Para obtener más información, consulta las secciones sobre el [ID de lector de AMP](#amp-reader-id) y sobre [AMP Access y las cookies](#amp-access-and-cookies).

El tiempo de ejecución de AMP (o, mejor dicho, el navegador) tiene en cuenta los encabezados de respuesta de la caché al hacer una llamada al punto de conexión de autorización. Por lo tanto, las respuestas almacenadas en caché se pueden reutilizar. Si esto no es conveniente, el editor puede utilizar los encabezados de control de la caché adecuados o la sustitución de la variable `RANDOM` de la URL del punto de conexión.

Si la solicitud de autorización no se ejecuta correctamente, el tiempo de ejecución de AMP recurrirá a "authorizationFallbackResponse", si se especifica en la configuración. En este caso, el flujo de autorización continuará de forma normal con el valor de la propiedad "authorizationFallbackResponse" en lugar de la respuesta de autorización. Si no se especifica "authorizationFallbackResponse", habrá un fallo en el flujo de autorización, en cuyo caso las expresiones `amp-access` no se evaluarán y la presencia del atributo `amp-access-hide` que proporciona inicialmente el documento determina si las secciones están visibles u ocultas.

La solicitud de autorización se agota automáticamente y se da por hecho que ha fallado cuando han pasado 3 segundos.

El tiempo de ejecución de AMP utiliza las siguientes clases de CSS a lo largo del flujo de autorización:

1. La clase de CSS `amp-access-loading` se define en la raíz del documento cuando se inicia el flujo de autorización y se elimina cuando se completa o falla.
2. La clase de CSS `amp-access-error` se añade en la raíz del documento cuando falla el proceso de autorización.

En la opción *server*, la llamada al punto de conexión de autorización se hace mediante Google AMP Cache como un simple punto de conexión HTTPS. Esto significa que, en este caso, no se pueden enviar las cookies del editor.

### Punto de conexión de pingback <a name="pingback-endpoint-1"></a>

El pingback se configura mediante la propiedad `pingback` de la sección de [configuración de AMP Access](#configuration). Se trata de un punto de conexión CORS POST con credenciales. Consulta la sección [Seguridad de origen de CORS](#cors-origin-security) para saber cómo debe protegerse esta solicitud.

La URL de pingback es opcional, y se puede inhabilitar mediante `"noPingback": true`.

La URL de pingback puede adoptar cualquier parámetro definido en la sección [Variables de URL de acceso](#access-url-variables). Por ejemplo, podría transmitir el ID de lector de AMP y la URL del documento. Es obligatorio incluir `READER_ID`.

El pingback no genera ninguna respuesta, ya que el tiempo de ejecución de AMP las ignora.

Se hace una llamada al punto de conexión de pingback cuando el lector ha empezado a visualizar el documento y después de que el lector haya completado correctamente el flujo de inicio de sesión.

El editor puede optar por utilizar el pingback para:
- Llevar una cuenta del número de visualizaciones gratuitas de la página.
- Asignar el ID de lector de AMP a la identidad del editor. Esto se debe a que el pingback es un punto de conexión CORS con credenciales, y puede contener cookies del editor.

El formato de solicitud es:
```text
https://publisher.com/amp-pingback?
rid=READER_ID
&url=SOURCE_URL
```

### Página de inicio de sesión <a name="login-page"></a>

Las URL de las páginas de inicio de sesión se configuran a través de la propiedad `login` de la sección de [configuración de AMP Access](#configuration).

La configuración puede especificar una sola URL de inicio de sesión o un conjunto de URL de inicio de sesión asignadas a claves según el tipo de inicio de sesión. Ejemplo de una única URL de inicio de sesión:
```json
{
  "login": "https://publisher.com/amp-login.html?rid={READER_ID}"
  }
```

Ejemplo de varias URL de inicio de sesión:
```json
{
  "login": {
    "signin": "https://publisher.com/signin.html?rid={READER_ID}",
    "signup": "https://publisher.com/signup.html?rid={READER_ID}"
    }
  }
```

La URL puede adoptar cualquier parámetro definido en la sección [Variables de URL de acceso](#access-url-variables). Por ejemplo, podría transmitir el ID de lector de AMP y la URL del documento. La sustitución de consulta `RETURN_URL` se puede utilizar para especificar el parámetro de consulta de la URL de retorno, p. ej., `?ret=RETURN_URL`. La URL de retorno es obligatoria y, si no se especifica la sustitución `RETURN_URL`, se inyectará automáticamente el nombre de parámetro de consulta predeterminado, "return".

La página de inicio de sesión es una página web normal sin restricciones especiales, salvo que debe funcionar correctamente como [cuadro de diálogo de navegador](https://developer.mozilla.org/en-US/docs/Web/API/Window/open). Para obtener más información, consulta la sección [Flujo de inicio de sesión](#login-flow).

El formato de la solicitud es:
```text
https://publisher.com/amp-login.html?
rid=READER_ID
&url=SOURCE_URL
&return=RETURN_URL
```
Fíjate en que el tiempo de ejecución de AMP añade automáticamente el parámetro de URL "return" si no se especifica la sustitución `RETURN_URL`. Una vez que la página de inicio de sesión haya completado su trabajo, debe redirigir a la URL de retorno especificada con el siguiente formato:
```text
RETURN_URL#success=true|false
```
Fíjate en el uso del parámetro hash “success”. El valor es "true" o "false" dependiendo de si el inicio de sesión se lleva a cabo o no. Lo ideal es que, siempre que sea posible, la página de inicio de sesión envíe la señal, tanto como si el inicio de sesión se lleva a cabo correctamente como si no.

Si se devuelve la señal `success=true`, el tiempo de ejecución de AMP repetirá las llamadas al punto de conexión de autorización y al de pingback para actualizar el estado del documento e informar de las "view" (visualizaciones) con el nuevo perfil de acceso.

#### Enlace de inicio de sesión <a name="login-link"></a>

El editor puede optar por colocar el enlace de inicio de sesión en cualquier parte del contenido del documento.

Las URL de inicio de sesión se configuran mediante la propiedad "login" de la sección de [configuración de AMP Access](#configuration).

El enlace de inicio de sesión se puede declarar en cualquier elemento HTML que permita el atributo "on". Normalmente, esto sería un elemento de anclaje o de botón. Cuando se configura una sola URL de inicio de sesión, el formato es:
```html
<a on="tap:amp-access.login">Login or subscribe</a>
```

Cuando se configuran varias URL de inicio de sesión, el formato es `tap:amp-access.login-{type}`. Por ejemplo:
```html
<a on="tap:amp-access.login-signup">Subscribe</a>
```

Cuando se utilizan espacios de nombre, el formato es `tap:amp-access.login-{namespace}` o `tap:amp-access.login-{namespace}-{type}`.

AMP no distingue entre inicio de sesión y suscripción. El editor puede configurar una manera de distinguir entre ambos utilizando varias URL o enlaces de inicio de sesión, o usando sus propios medios.

## Integración con *amp-analytics* <a name="integration-with-amp-analytics"></a>

La integración con *amp-analytics* está explicada en [amp-access-analytics.md](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/amp-access-analytics.md).

## Seguridad de origen de CORS <a name="cors-origin-security"></a>

Los puntos de conexión de autorización y de pingback son de tipo CORS y deben implementar el protocolo de seguridad descrito en la [especificación de seguridad de AMP CORS](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md#cors-security-in-amp).

## Cupo por usuario <a name="metering"></a>

El cupo por usuario es el sistema por el que el lector puede acceder a contenido premium de forma gratuita, un número determinado de veces y durante un periodo concreto. Cuando se alcanza el límite del cupo, el muro de pago se activa y el lector solo puede acceder a una parte limitada del contenido. Además, se muestra un mensaje que invita al lector a adquirir un producto o suscripción, y un enlace de registro o inicio de sesión. Por ejemplo, el cupo por usuario se puede definir como: "El lector puede leer 10 artículos al mes de forma gratuita".

AMP Access proporciona las siguientes funciones para implementar el acceso basado en el cupo por usuario:

1. Se debe utilizar READER_ID para almacenar la información acerca del cupo por usuario. Dado que el editor no siempre podrá incluir sus cookies en un contexto de terceros, estos datos se deben almacenar en el servidor.
2. El "recuento de lecturas" solo se puede actualizar en el punto de conexión de pingback.
3. Solo se contabilizan documentos individuales en el cupo. Es decir, si se actualiza diez veces el mismo documento, solo se cuenta una única visualización. Con este fin, los puntos de conexión de authorization y pingback pueden inyectar variables de URL `SOURCE_URL` u otras similares. Para obtener más información, consulta la sección [Variables de URL de acceso](#access-url-variables).

## Primer clic gratuito <a name="first-click-free"></a>

Puedes consultar la [política de Primer clic gratuito de Google](https://support.google.com/news/publisher/answer/40543) o la [actualización más reciente](https://googlewebmastercentral.blogspot.com/2015/09/first-click-free-update.html) explicada en detalle.

Para implementarlo, el editor debe: 1) poder determinar el servicio de referencia de cada visualización y 2) contar el número de visualizaciones diarias de cada lector.

Ambos requisitos aparecen detallados en la especificación de AMP Access. La URL referente puede inyectarse en las URL de autorización y de pingback mediante la sustitución de URL `DOCUMENT_REFERRER`, tal como se describe en [Variables de URL de acceso](#access-url-variables). El recuento de visualizaciones se puede hacer en el servidor mediante el punto de conexión de pingback. Esto es muy similar a la implementación del cupo por usuario que se describe en la sección [Cupo por usuario](#metering).

## Flujo de inicio de sesión <a name="login-flow"></a>

AMP hará que se muestre un cuadro de diálogo de inicio de sesión como una ventana propia, una ventana emergente o una pestaña. Siempre que sea posible, los visores de AMP intentarán hacerlo en el contexto del navegador para aprovechar las API de nivel superior que utiliza este.

El flujo de inicio de sesión se inicia en el tiempo de ejecución de AMP cuando el lector activa el enlace de inicio de sesión. Se compone de los siguientes pasos:

1. El cuadro de diálogo de la URL de inicio de sesión especificada se abre en el tiempo de ejecución de AMP o en el visor de AMP. La URL contiene un parámetro de consulta de URL de retorno adicional (`&amp;return=RETURN_URL`), pero también se pueden incluir otros parámetros en ella, como el ID de lector. Para obtener más información, consulta la sección [Página de inicio de sesión](#login-page).
2. El editor muestra una página de inicio de sesión sin formato.
3. El lector sigue los pasos para iniciar sesión, como introducir un nombre de usuario y una contraseña, o iniciar sesión a través de una red social.
4. El lector envía los datos de inicio de sesión. El editor completa la autenticación, añade las cookies y, por último, redirige al lector a la URL de retorno solicitada anteriormente. La redirección contiene un parámetro hash de URL `success` que puede ser `true` o `false`.
5. El cuadro de diálogo de inicio de sesión redirige a la URL de retorno.
6. El tiempo de ejecución de AMP vuelve a autorizar el documento.

Solo los pasos 2 a 5 requieren gestión por parte del editor, ya que este solo proporciona su propia página de inicio de sesión y garantiza el redireccionamiento correcto una vez que se completa el flujo. No se aplican restricciones especiales a la página de inicio de sesión, salvo que debe funcionar correctamente como cuadro de diálogo.

Como es habitual, el ID de lector se debe incluir en la llamada a la página de inicio de sesión, y el editor puede utilizarlo para el mapeado de identidades. Como esta es una ventana propia, el editor también recibirá sus cookies y podrá añadirlas. Si el lector ya ha iniciado sesión en el sitio web del editor, se recomienda que el editor redirija inmediatamente a la URL de retorno con la respuesta `success=true`.

## Glosario de AMP <a name="amp-glossary"></a>

* **Documento AMP:** documento HTML que sigue el formato AMP y que está validado por AMP Validator. Los documentos AMP se pueden almacenar en caché mediante Google AMP Cache.
* **AMP Validator:** programa informático que realiza un análisis estático de un documento HTML e indica si el documento se ajusta al formato AMP.
* **Tiempo de ejecución de AMP:** tiempo de ejecución de JavaScript que ejecuta el documento AMP.
* **Google AMP Cache:** memoria caché proxy de los documentos AMP.
* **Visor de AMP:** aplicación web o nativa que muestra o inserta documentos AMP.
* **Publisher.com:** sitio web de un editor de AMP.
* **Punto de conexión de CORS:** punto de conexión HTTPS de origen cruzado. Consulta [https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) para obtener más información. Consulta la sección [Seguridad de origen de CORS](#cors-origin-security) de este documento para obtener más información sobre cómo se pueden proteger estas solicitudes.
* **Lector:** persona que visualiza los documentos AMP.
* **Prerenderizado de AMP:** los visores de AMP pueden aprovechar la función de prerenderizado, que renderiza un documento oculto antes de que se pueda mostrar, lo cual supone un aumento significativo del rendimiento. Sin embargo, es importante tener en cuenta que el renderizado previo del documento no constituye una visualización, ya que es posible que el lector no llegue a ver el documento.

## Revisiones <a name="revisions"></a>

* 02/09/2016: Propiedad de configuración "noPingback" y pingback opcional.
* 03/03/2016: Reenvío del pingback tras el inicio de sesión (v. 0.5).
* 19/02/2016: Se han corregido los ejemplos para eliminar `{}` de las sustituciones de variables de URL.
* 15/02/2016: La [configuración](#configuration) y el [punto de conexión de autorización](#authorization-endpoint) ahora admiten la propiedad "authorizationFallbackResponse", que se puede utilizar cuando se produce un error en la autorización.
* 11/02/2016: Tiempo de espera de solicitud de autorización en [Punto de conexión de autorización](#authorization-endpoint).
* 11/02/2016: Ahora se permiten referencias de campos anidadas, como `object.field`.
* 09/02/2016: Secciones [Primer clic gratuito](#first-click-free) y [Cupo por usuario](#metering).
* 03/02/2016: Se ha añadido la especificación de la seguridad de "origen de la fuente" a la sección [Seguridad de origen de CORS](#cors-origin-security).
* 01/02/2016: El parámetro de consulta "return" de la página de inicio de sesión se puede personalizar mediante la sustitución de URL RETURN_URL.

## Anexo A: gramática de la expresión "amp-access" <a name="appendix-a-amp-access-expression-grammar"></a>

La gramática de BNF más reciente está disponible en el archivo [access-expr-impl.jison](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/0.1/access-expr-impl.jison).

El fragmento más importante de esta gramática es el siguiente:

```javascript
search_condition:
  search_condition OR search_condition
  | search_condition AND search_condition
  | NOT search_condition
  | '(' search_condition ')'
  | predicate

predicate:
    comparison_predicate | truthy_predicate

comparison_predicate:
  scalar_exp '=' scalar_exp
  | scalar_exp '!=' scalar_exp
  | scalar_exp '<' scalar_exp
  | scalar_exp '<=' scalar_exp
  | scalar_exp '>' scalar_exp
  | scalar_exp '>=' scalar_exp

truthy_predicate: scalar_exp

scalar_exp: literal | field_ref

field_ref: field_ref '.' field_name | field_name

literal: STRING | NUMERIC | TRUE | FALSE | NULL

```

Ten en cuenta que las expresiones `amp-access` se evalúan mediante el tiempo de ejecución de AMP y Google AMP Cache. Esta gramática no forma parte de la especificación que el editor debe implementar, la hemos incluido simplemente con fines informativos.

## Discusión detallada <a name="detailed-discussion"></a>

En esta sección se explicará de forma pormenorizada el diseño en el que se basa la especificación amp-access y las decisiones que se tomaron para su creación. Información disponible próximamente.

## Validación <a name="validation"></a>

Consulta las [reglas de amp-access](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access/validator-amp-access.protoascii) en la especificación de la herramienta de validación de AMP.
