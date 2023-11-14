---
'$title': CORS en AMP
$order: 12
formats:
  - websites
  - email
  - stories
  - ads
teaser:
  text: Muchos de los componentes y extensiones de AMP aprovechan los endpoints remotos mediante el uso de CORS
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/docs/spec/amp-cors-requests.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
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

Muchos de los componentes y extensiones de AMP aprovechan los endpoints remotos mediante el uso de solicitudes para el Intercambio de recursos de origen cruzado (CORS). En este documento se explican los aspectos más importantes sobre el uso de CORS en AMP. Para obtener más información sobre CORS, consulte la [especificación W3 de CORS](https://www.w3.org/TR/cors/).

<div class="noshowtoc"></div>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#why-do-i-need-cors-for-my-own-origin-" data-md-type="link">¿Por qué necesito CORS para mi propio origen?</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#utilizing-cookies-for-cors-requests" data-md-type="link">Cómo utilizar las cookies en las solicitudes CORS</a></li>
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#cors-security-in-amp" data-md-type="link">La seguridad de CORS en AMP</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#verify-cors-requests" data-md-type="link">Cómo verificar las solicitudes CORS</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#1-allow-requests-for-specific-cors-origins" data-md-type="link">1) Cómo autorizar las solicitudes CORS de orígenes específicos </a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#2-allow-same-origin-requests" data-md-type="link">2) Cómo autorizar las solicitudes que provengan del mismo origen</a></li>
</ul>
</li></ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered">
<p data-md-type="paragraph"><a href="#send-cors-response-headers" data-md-type="link">Cómo enviar la respuesta a los encabezados CORS</a></p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true"><li data-md-type="list_item" data-md-list-type="unordered">
<a href="#access-control-allow-origin-origin" data-md-type="link">El encabezado de respuesta Access-Control-Allow-Origin: </a>
</li></ul>
</li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#processing-state-changing-requests" data-md-type="link">Cómo procesar las solicitudes de cambio de estado</a></li>
</ul>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="true">
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#example-walkthrough-handing-cors-requests-and-responses" data-md-type="link">Ejemplo paso a paso: cómo administrar solicitudes y respuestas CORS</a></li>
<li data-md-type="list_item" data-md-list-type="unordered"><a href="#testing-cors-in-amp" data-md-type="link">Cómo probar CORS en AMP</a></li>
</ul>
</li>
</ul>
<div data-md-type="block_html"></div>

## ¿Por qué necesito CORS para mi propio origen? <a name="why-do-i-need-cors-for-my-own-origin"></a>

Posiblemente esté confundido sobre por qué necesitaría CORS para administrar las solicitudes que llegan a su propio origen, a continuación, profundizaremos en eso.

Los componentes de AMP que obtienen datos dinámicos (por ejemplo, amp-form, amp-list, etc.) llevan a cabo solicitudes CORS en endpoints remotos para recuperar los datos. Si su página AMP incluye dichos componentes, deberá habilitar CORS para que esas solicitudes no fallen.

Representemos esto con un ejemplo:

Supongamos que tiene una página AMP en la que se registran productos con precios. Para actualizar los precios en la página, el usuario hace clic en un botón que recupera los precios más recientes desde un endpoint JSON (lo realiza a través del componente amp-list). El JSON se encuentra en su dominio.

Bien, entonces si la página se encuentra _en mi dominio_ y JSON también está _en mi dominio_. ¡No veo ningún problema!

Vaya, pero ¿cómo llegó el usuario a su página AMP? ¿accede desde una página que está almacenada en el caché? Es muy probable que su usuario no haya accedido a su página AMP directamente, sino que haya descubierto su página mediante otra plataforma. Por ejemplo, Google Search utiliza el caché AMP de Google para renderizar rápidamente las páginas AMP. Estas son páginas almacenadas en el caché y proporcionan sus servicios desde el caché AMP de Google, que es un dominio _diferente_. Cuando su usuario hace clic en el botón para actualizar los precios en su página, la página que está almacenada en el caché de AMP envía una solicitud a su dominio de origen para obtener los precios, lo cual genera una discrepancia entre los orígenes (caché -> dominio de origen). Para permitir tales solicitudes de origen cruzado es necesario que habilite CORS, de lo contrario las solicitudes fallarán.

<amp-img alt="CORS and Cache" layout="responsive" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png" width="809" height="391">
  <noscript><img alt="CORS y caché" src="https://www.ampproject.org/static/img/docs/CORS_with_Cache.png"></noscript></amp-img>

**Muy bien, ¿qué debo hacer ahora?**

1. Para las Páginas AMP que obtienen datos dinámicos, asegúrese de probar la versión en caché de esas páginas, _no se restrinja a probarlas solo en su propio dominio_. (Consulte la sección [Cómo probar CORS en AMP](#testing-cors-in-amp) que se encuentra más adelante).
2. Siga las instrucciones que se encuentran en este documento para habilitar las solicitudes y respuestas de CORS.

## Cómo utilizar las cookies en las solicitudes CORS <a name="utilizing-cookies-for-cors-requests"></a>

En la mayoría de los componentes de AMP que utilizan las solicitudes CORS se configura automáticamente el [modo de credenciales](https://fetch.spec.whatwg.org/#concept-request-credentials-mode) o permiten que el autor lo habilite de forma opcional. Por ejemplo, el componente [`amp-list`](https://amp.dev/documentation/components/amp-list) obtiene contenido dinámico desde un endpoint JSON mediante CORS y permite que autor establezca el modo de credenciales mediante el atributo `credentials`.

_Ejemplo: Cómo incorporar contenido personalizado en un componente amp-list utilizando cookies_

[sourcecode:html]
<amp-list
credentials="include"
src="<%host%>/json/product.json?clientId=CLIENT_ID(myCookieId)"

>   <template type="amp-mustache">

    Your personal offer: ${% raw %}{{price}}{% endraw %}

  </template>
</amp-list>
[/sourcecode]

En cuanto especifique el modo credenciales, el origen puede incluir cookies en la solicitud CORS y también establecer cookies para la respuesta (sujeto a las [restricciones de las cookies de terceros](#third-party-cookie-restrictions)).

### Restricciones de las cookies de terceros <a name="third-party-cookie-restrictions"></a>

Las mismas restricciones de las cookies de terceros que se especifican en el navegador también se aplican a las solicitudes CORS acreditadas en AMP. Estas restricciones dependen del navegador y de la plataforma, pero para algunos navegadores, solo pueden establecerse cookies si el usuario visitó previamente la primera parte de una ventana (la parte superior) del origen. O dicho de otra manera, solo después de que el usuario haya visitado directamente el sitio web de origen. Teniendo en cuenta esto, si accede a un servicio a través de CORS no puede suponer que podrán establecerse las cookies de forma predeterminada.

## La seguridad de CORS en AMP <a name="cors-security-in-amp"></a>

Con el fin de verificar que las solicitudes y respuestas sean válidas y seguras para sus páginas AMP, debe:

1. [Verificar la solicitud](#verify-cors-requests).
2. [Enviar la respuesta apropiada a los encabezados](#send-cors-response-headers).

Si está usando Node en su backend, puede usar el [middleware AMP mediante CORS](https://www.npmjs.com/package/amp-toolbox-cors), que es parte del [conjunto de herramientas de AMP](https://github.com/ampproject/amp-toolbox).

### Cómo verificar las solicitudes CORS <a name="verify-cors-requests"></a>

Cuando su endpoint reciba una solicitud CORS, realice lo siguiente:

1. [Compruebe que el encabezado <code>Origin</code> de CORS provenga de un origen permitido (el origen del editor + los cachés de AMP)](#verify-cors-header).
2. [Si no hay un encabezado Origin, verifique que la solicitud provenga del mismo origen (mediante `AMP-Same-Origin`)](#allow-same-origin-requests).

#### <a name="1-allow-requests-for-specific-cors-origins">1) Cómo autorizar las solicitudes CORS de orígenes específicos </a>

<span id="verify-cors-header"></span>

Los endpoints de CORS reciben la solicitud del origen a través del encabezado HTTP `Origin`. Los endpoints solo deben permitir solicitudes que provengan de: (1) el propio origen del editor y de (2) cada `cacheDomain` con un origen registrado en [https://ampjs.org/caches.json](https://ampjs.org/caches.json).

Por ejemplo, los endpoints deben permitir solicitudes que provengan de:

- Un subdominio del caché AMP de Google: `https://<publisher's domain>.cdn.ampproject.org` <br>(por ejemplo, `https://nytimes-com.cdn.ampproject.org`)

[tip type="read-on"] Para obtener más información sobre los formatos de las URL que se utilizan para el caché de AMP, consulte los siguientes recursos:

- [Información general sobre el caché AMP de Google](https://developers.google.com/amp/cache/overview) [/tip]

#### <a name="2-allow-same-origin-requests">2) Cómo autorizar las solicitudes que provengan del mismo origen</a>

<span id="allow-same-origin-requests"></span>

Para las solicitudes que provengan del mismo origen dónde falte el encabezado `Origin`, AMP establece el siguiente encabezado personalizado:

[sourcecode:text]
AMP-Same-Origin: true
[/sourcecode]

El tiempo de ejecución de AMP envía este encabezado personalizado cuando se realiza una solicitud XHR desde el mismo origen (es decir, un documento que presta servicios desde una URL sin caché). Permite solicitudes que contengan el encabezado `AMP-Same-Origin:true`.

### Cómo enviar la respuesta a los encabezados CORS <a name="send-cors-response-headers"></a>

Después de verificar la solicitud CORS, la respuesta que se origine de HTTP debe contener los siguientes encabezados:

##### El encabezado de respuesta Access-Control-Allow-Origin: &lt;origin&gt; <a name="access-control-allow-origin-origin"></a>

Este encabezado es un requisito de la <a href="https://www.w3.org/TR/cors/">especificación W3 de CORS</a> donde <code>origin</code> se refiere al origen de la solicitud que se autorizó mediante el encabezado de la solicitud CORS <code>Origin</code> (por ejemplo, <code>"https://&lt;publisher's subdomain&gt;.cdn.ampproject.org"</code>).

A pesar de que la especificación W3 de CORS permite devolver el valor de <code>\*</code> en la respuesta, para mejorar la seguridad, debe hacer lo siguiente:

- Si el encabezado `Origin` está presente, compruebe y repita la validación del encabezado <code>Origin</code>.

### Cómo procesar las solicitudes de cambio de estado <a name="processing-state-changing-requests"></a>

[tip type="important"] Realice estos controles de validación _antes_ de procesar la solicitud. Esta validación le proporciona protección contra los ataques CSRF y evita el procesamiento de solicitudes que provengan de fuentes no confiables. [/tip]

Antes de procesar solicitudes que podrían cambiar el estado de su sistema (por ejemplo, cuando un usuario se suscribe o cancela su suscripción de una lista de correos), verifique lo siguiente:

**Si contiene el encabezado `Origin`**:

1. Si el origen no coincide con alguno de los siguientes valores, detenga el proceso y devuelva una respuesta de error:

   - `<publisher's domain>.cdn.ampproject.org`
   - el origen del editor (alias “el suyo”)

   donde `*` corresponde a un comodín y no es un asterisco real (\*).

2. De lo contrario, procese la solicitud.

**Si NO contiene el encabezado `Origin`**:

1. Verifique que la solicitud contenga el encabezado `AMP-Same-Origin: true`. Si la solicitud no contiene este encabezado, detenga el proceso y devuelva una respuesta de error.
2. De lo contrario, procese la solicitud.

## Ejemplo paso a paso: cómo administrar solicitudes y respuestas CORS <a name="example-walkthrough-handing-cors-requests-and-responses"></a>

Debe tener en cuenta dos escenarios para las solicitudes CORS que recibe su endpoint:

1. Una solicitud que provenga del mismo origen.
2. Una solicitud proveniente un origen que se almacene en el caché (desde un caché de AMP).

Analicemos estos escenarios con un ejemplo. En nuestro ejemplo, administramos el sitio `example.com` que aloja una página AMP llamada `article-amp.html.` La página AMP contiene un `amp-list` para recuperar datos dinámicos de un archivo `data.json` que también está alojado en `example.com`. Si deseamos procesar las solicitudes en nuestro archivo `data.json` que provengan de nuestra página AMP. Estas solicitudes podrían tener el mismo origen que la página AMP (la cual no está almacenada en el caché) o provenir de la página AMP (que está almacenada en el caché) pero tiene un origen diferente.

<amp-img alt="CORS example" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png" width="629" height="433">
  <noscript><img alt="Ejemplo de CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough.png"></noscript></amp-img>

### Los orígenes que están permitidos <a name="allowed-origins"></a>

Basándonos en lo que sabemos sobre CORS y AMP (desde la sección [Verificar las solicitudes CORS](#verify-cors-requests) que se encuentra más arriba), en nuestro ejemplo aceptaremos las solicitudes que provengan de los siguientes dominios:

- `example.com` --- Provenientes del dominio del editor
- `example-com.cdn.ampproject.org` --- Provenientes del subdominio para el caché AMP de Google

### Los encabezados de respuesta para las solicitudes que están permitidas <a name="response-headers-for-allowed-requests"></a>

En las solicitudes que provengan de orígenes permitidos, nuestra respuesta deberá incluir los siguientes encabezados:

[sourcecode:text]
Access-Control-Allow-Origin: <origin>
[/sourcecode]

Estos son encabezados de respuesta adicionales que podríamos incluir en nuestra respuesta CORS:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Content-Type: application/json
Access-Control-Max-Age: <delta-seconds>
Cache-Control: private, no-cache
[/sourcecode]

### La pseudológica de CORS <a name="pseudo-cors-logic"></a>

Nuestra lógica para administrar las solicitudes y respuestas de CORS puede simplificarse en el siguiente pseudocódigo:

[sourcecode:text]
IF CORS header present
IF origin IN allowed-origins
allow request & send response
ELSE
deny request
ELSE
IF "AMP-Same-Origin: true"
allow request & send response
ELSE
deny request
[/sourcecode]

#### Ejemplo del código que se utiliza en CORS <a name="cors-sample-code"></a>

Este es el ejemplo de una función en JavaScript que podríamos utilizar para habilitar las solicitudes y respuestas de CORS:

[sourcecode:javascript]
function assertCors(req, res, opt_validMethods, opt_exposeHeaders) {
var unauthorized = 'Unauthorized Request';
var origin;
var allowedOrigins = [
'https://example.com',
'https://example-com.cdn.ampproject.org',
'https://cdn.ampproject.org',
];
var allowedSourceOrigin = 'https://example.com'; //publisher's origin
// If same origin
if (req.headers['amp-same-origin'] == 'true') {
origin = sourceOrigin;
// If allowed CORS origin & allowed source origin
} else if (
allowedOrigins.indexOf(req.headers.origin) != -1 &&
sourceOrigin == allowedSourceOrigin
) {
origin = req.headers.origin;
} else {
res.statusCode = 403;
res.end(JSON.stringify({message: unauthorized}));
throw unauthorized;
}

res.setHeader('Access-Control-Allow-Credentials', 'true');
res.setHeader('Access-Control-Allow-Origin', origin);
}
[/sourcecode]

**Nota**: Si desea un ejemplo funcional del código, consulte [amp-cors.js](https://github.com/ampproject/amphtml/blob/main/build-system/server/amp-cors.js).

### Escenario 1: cómo recibir solicitudes desde la página de AMP que provengan del mismo origen <a name="scenario-1-get-request-from-amp-page-on-same-origin"></a>

En el siguiente escenario, la página `article-amp.html` solicita el archivo `data.json`, cuyos orígenes son los mismos.

<amp-img alt="CORS example - scenario 1" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png" width="657" height="155">
  <noscript><img alt="Ejemplo de CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex1.png"></noscript></amp-img>

Si analizamos esta solicitud, encontraremos:

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
AMP-Same-Origin: true
[/sourcecode]

Como esta solicitud proviene del mismo origen, no hay un encabezado `Origin`, pero el encabezado personalizado de la solicitud AMP de `AMP-Same-Origin: true` está presente. Permitiremos esta solicitud ya que proviene del mismo origen (`https://example.com`).

Nuestros encabezados de respuesta serían los siguientes:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example.com
[/sourcecode]

### Escenario 2: cómo recibir solicitudes desde una página que se almacenó en el caché de AMP <a name="scenario-2-get-request-from-cached-amp-page"></a>

En el siguiente escenario, la página `article-amp.html` que se almacenó en el caché AMP de Google solicita el archivo `data.json`, en este caso los orígenes son diferentes.

<amp-img alt="CORS example - scenario 2" layout="fixed" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png" width="657" height="155">
  <noscript><img alt="Ejemplo de CORS" src="https://www.ampproject.org/static/img/docs/cors_example_walkthrough_ex2.png"></noscript></amp-img>

Si analizamos esta solicitud, encontraremos:

[sourcecode:text]
Request URL: https://example.com/data.json
Request Method: GET
Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

Como esta solicitud contiene un encabezado `Origin`, verificaremos que provenga de un origen permitido. Debido a que esta solicitud proviene de un origen permitido, entonces podemos autorizarla.

Nuestros encabezados de respuesta serían los siguientes:

[sourcecode:text]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://example-com.cdn.ampproject.org
[/sourcecode]

## Cómo trabajar con fuentes que se almacenaron en el caché <a name="working-with-cached-fonts"></a>

En el caché AMP de Google se almacenan documentos, imágenes y fuentes AMP HTML con la finalidad de optimizar la velocidad de la página de AMP. Conforme esto hace que la página AMP sea más rápida, también deseamos que proteja los recursos que se almacenen en el caché. Para ello, realizaremos un cambio en la forma que el caché de AMP responde ante los recursos que se almacenaron en el caché, aunque generalmente para las fuentes se respeta el valor del origen `Access-Control-Allow-Origin`.

### Comportamiento anterior (antes de octubre del 2019) <a name="past-behavior-before-october-2019"></a>

Cuando una página de AMP estaba cargando `https://example.com/some/font.ttf` desde el atributo `@font-face src`, el caché de AMP almacena temporalmente en el caché la fuente del archivo y funcionará como un recurso sin la necesidad de tener el comodín `Access-Control-Allow-Origin`, como se muestra a continuación:

- URL `https://example-com.cdn.ampproject.org/r/s/example.com/some/font.tff`
- Access-Control-Allow-Origin: \*

### Comportamiento nuevo (a partir de octubre del 2019) <a name="new-behavior-october-2019-and-after"></a>

Mientras la implementación actual sea laxa podría conducir a un uso imprevisto de las fuentes que provienen de sitios de origen cruzado. En este cambio, el caché de AMP comenzará a responder exactamente con el mismo valor de `Access-Control-Allow-Origin` que el servidor de origen. Para cargar correctamente las fuentes desde el documento que está almacenado en el caché de AMP, deberá aceptar el origen del caché de AMP mediante el encabezado.

Un ejemplo de la implementación sería el siguiente:

[sourcecode:javascript]
function assertFontCors(req, res, opt_validMethods, opt_exposeHeaders) {
var unauthorized = 'Unauthorized Request';
var allowedOrigins = [
'https://example.com',
'https://example-com.cdn.ampproject.org',
];
// If allowed CORS origin
if (allowedOrigins.indexOf(req.headers.origin) != -1) {
res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
} else {
res.statusCode = 403;
res.end(JSON.stringify({message: unauthorized}));
throw unauthorized;
}
}
[/sourcecode]

Por ejemplo, si desea cargar /some/font.ttf en `https://example.com/amp.html`, el servidor de origen debe responder con el encabezado Access-Control-Allow-Origin, como se muestra a continuación.

<amp-img alt="CORS font example" layout="responsive" src="https://amp.dev/static/img/docs/cors-font.jpg" width="2268" height="1594">
  <noscript><img alt="Ejemplo de fuente CORS" src="https://amp.dev/static/img/docs/cors-font.jpg"></noscript></amp-img>

[tip type="note"] Si la fuente de su archivo es correcta para ser accesible desde cualquier origen, puede responder con un comodín `Access-Control-Allow-Origin`, el caché de AMP también repetirá la validación, lo cual significa que responderá con `Access-Control-Allow-Origin: *`. Si ya tiene esta configuración, no es necesario cambiar nada. [/tip]

Planeamos realizar este cambio a mediados de octubre del 2019 y esperamos que todos los editores de AMP que utilizan fuentes de alojamiento propio verifiquen si esto les afecta.

#### Plan de implementación <a name="roll-out-plan"></a>

- 30-09-2019: la versión del lanzamiento contiene un control más preciso sobre cuáles son los dominios en los que se aplica este cambio. Esa compilación debería implementarse en el transcurso de esta semana.
- 07-10-2019: los dominios de prueba se habilitarán para las pruebas manuales.
- 14-10-2019: (pero dependiendo de cuáles hayan sido los resultados de las pruebas): la función se implementará de manera general.

Siga todas las novedades sobre [este tema aquí.](https://github.com/ampproject/amphtml/issues/24834)

## Cómo probar CORS en AMP<a name="testing-cors-in-amp"></a>

Cuando esté probando sus páginas de AMP, asegúrese de incluir pruebas de las versiones que se hayan almacenado en el caché.

### Cómo verificar la página mediante la URL que se almacenó en el caché <a name="verify-the-page-via-the-cache-url"></a>

Para garantizar que la página almacenada en el caché de AMP se renderice y funcione correctamente, siga los siguientes pasos:

1. Desde su navegador, abra la URL que el caché de AMP utilizaría para acceder a su página AMP. Puede establecer el formato que tendrá la URL en el caché con la [herramienta AMP By Example](https://amp.dev/documentation/examples/guides/using_the_google_amp_cache/).

   Por ejemplo:

   - URL: `https://amp.dev/documentation/guides-and-tutorials/start/create/`
   - Formato de URL para el caché de AMP: `https://www-ampproject-org.cdn.ampproject.org/c/s/www.ampproject.org/docs/tutorials/create.html`

2. Abra las herramientas de desarrollo para su navegador, verifique que no haya errores y que todos los recursos se hayan cargado correctamente.

### Cómo verificar los encabezados de respuesta en su servidor <a name="verify-your-server-response-headers"></a>

Puede utilizar el comando `curl` para verificar que su servidor envíe los encabezados de respuesta HTTP correctos. En el comando `curl`, proporcione la solicitud de la URL y los encabezados personalizados que desee agregar.

**Sintaxis**: `curl <request-url> -H <custom-header> - I`

#### Cómo probar la solicitud desde el mismo origen <a name="test-request-from-same-origin"></a>

En una solicitud con el mismo origen, el sistema de AMP agrega el encabezado personalizado `AMP-Same-Origin:true`.

Aquí encontrará nuestro comando curl para probar una solicitud que provenga de `https://ampbyexample.com` en el archivo `examples.json` (en el mismo dominio):

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'AMP-Same-Origin: true' -I
[/sourcecode]

En los resultados del comando se muestran los encabezados de respuesta correctos (nota: se omitió la información adicional):

[sourcecode:http]
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample.com
access-control-allow-methods: POST, GET, OPTIONS
[/sourcecode]

#### Cómo probar la solicitud de la página AMP almacenada en el caché <a name="test-request-from-cached-amp-page"></a>

En una solicitud CORS que no proviene del mismo dominio (es decir, del caché), el encabezado `origin` es parte de la solicitud.

Aquí encontrará nuestro comando curl para probar una solicitud que proviene desde la página AMP, la cual está almacenada en el caché AMP de Google en el archivo `examples.json`:

[sourcecode:shell]
curl 'https://amp.dev/static/samples/json/examples.json' -H 'origin: https://ampbyexample-com.cdn.ampproject.org' -I
[/sourcecode]

En los resultados del comando se muestran los encabezados de respuesta correctos:

```http
HTTP/2 200
access-control-allow-headers: Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token
access-control-allow-credentials: true
access-control-allow-origin: https://ampbyexample-com.cdn.ampproject.org
access-control-allow-methods: POST, GET, OPTIONS
```
