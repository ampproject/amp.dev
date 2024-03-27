---
$title: amp-access-laterpay
$category@: dynamic-content
teaser:
  text: >-
    Allows publishers to easily integrate with the LaterPay micropayments
    platform.
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



Permite a los editores integrar fácilmente la plataforma de micropagos [LaterPay](https://www.laterpay.net). `amp-access-laterpay` está basado en [AMP Access](amp-access.md), y lo necesita para su funcionamiento.

<table>
  <tr>
    <td class="col-fourty"><strong>Secuencias de comandos obligatorias</strong></td>
    <td>
      <small>Ten en cuenta que necesitas las secuencias de comandos de "amp-access-laterpay", "amp-access" y "amp-analytics".</small>
      <div>
        <code>&lt;script async custom-element="amp-access" src="https://ampjs.org/v0/amp-access-0.1.js">&lt;/script></code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-analytics" src="https://ampjs.org/v0/amp-analytics-0.1.js">&lt;/script></code>
      </div>
      <div>
        <code>&lt;script async custom-element="amp-access-laterpay" src="https://ampjs.org/v0/amp-access-laterpay-0.2.js">&lt;/script></code>
      </div>
    </td>
  </tr>
  <tr>
    <td><strong>Ejemplos</strong></td>
    <td>Consulta el <a href="https://ampbyexample.com/components/amp-access-laterpay/">ejemplo comentado de amp-access-laterpay</a> de AMP By Example.</td>
  </tr>
</table>

## Comportamiento <a name="behavior"></a>

[LaterPay](https://laterpay.net) es una plataforma de micropagos que permite a los usuarios comprar cualquier contenido online con solo un par de clics y obtener acceso inmediato sin necesidad de pagar por adelantado, de proporcionar datos personales ni de registrarse. Los usuarios solo pagan una vez que sus compras en sitios web alcanzan un total de 5 $ o 5 €. Los proveedores de contenido pueden vender artículos individuales o pases por tiempo limitado, lo cual da acceso ilimitado o con limitación de tiempo al usuario.

Ten en cuenta que no podrás integrar LaterPay en las páginas AMP [mediante la integración de Connector Script](https://docs.laterpay.net/connector/). `amp-access-laterpay` es similar a Connector Script, ya que proporciona un conjunto parecido de funciones, pero que están diseñadas para páginas AMP.

También es posible vender contenido a través de LaterPay utilizando `amp-access-laterpay` como método único de integración.

El componente `amp-access-laterpay` utiliza AMP Access de manera interna para poder tener un funcionamiento similar al de AMP Access, pero adaptado para su uso con el servicio LaterPay.

Si ya tienes un servicio de muro de pago y quieres utilizarlo con AMP Access y junto con LaterPay en la misma página, [también puedes hacerlo](#using-amp-access-laterpay-together-with-amp-access).

El componente `amp-access-laterpay` no requiere una configuración de autorización ni de pingback, ya que está preconfigurado para funcionar con el servicio LaterPay. Tampoco requiere la configuración manual de enlaces de inicio de sesión.

Se pueden configurar las diferentes opciones de compra en la cuenta de LaterPay del editor, tras lo cual el componente obtendrá la configuración y creará una lista de las opciones de compra disponibles.

Puedes consultar la documentación sobre cómo configurar [Laterpay Connector](https://docs.laterpay.net/connector/configuration/), la integración de frontend de la plataforma, para aprender a configurar las opciones de compra.

Se puede aplicar un estilo a la lista generada y presentarla de acuerdo con las preferencias del editor.

Este componente también utiliza el [marcado de acceso al contenido](amp-access.md#access-content-markup) para mostrar y ocultar el contenido.

## Configuración <a name="configuration"></a>

La configuración es similar a la de AMP Access, pero no se necesita autorización, pingback ni enlaces de inicio de sesión.

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "property": value
      }
    }
</script>

```

Se pueden asignar los siguientes valores al objeto de configuración `laterpay`:

<table>
  <tr>
    <th class="col-fourty">Propiedad</th>
    <th class="col-twenty">Valores</th>
    <th class="col-fourty">Descripción</th>
  </tr>
  <tr>
    <td><code>articleTitleSelector</code></td>
    <td>Selector de CSS <strong>obligatorio</strong></td>
    <td>Selector de CSS que determina el elemento de la página que contiene el título del artículo. De este modo, la página en la que se lleva a cabo la compra del artículo incluirá este título para que el usuario sepa lo que está comprando.</td>
  </tr>
  <tr>
    <td><code>articleId</code></td>
    <td>Lista de identificadores separados por comas</td>
    <td>De forma predeterminada, se utiliza la URL de un artículo para asociarlo a una opción de compra. Para hacer eso mismo sin especificar una ruta de URL para la opción de compra, puedes definir un ID de artículo en la interfaz de LaterPay Connector y utilizar la propiedad <code>articleId</code> para asociarlos.
      <br>
        Este procedimiento es necesario si asociar una opción de compra con la URL de un artículo no es una opción lo suficientemente flexible. Consulta la <a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/article_id/">página de configuración de LaterPay Connector()</a> para obtener información sobre algunas situaciones de ejemplo en las que esta opción resulta útil.</td>
      </tr>
      <tr>
        <td><code>jwt</code></td>
        <td>Token de JWT para la configuración de pagos dinámicos</td>
        <td>Esta opción permite especificar un JSON Web Token firmado que contiene una configuración para el contenido de pago disponible. Esto significa que puedes proporcionar una configuración integrada y generada mediante programación en las páginas, en lugar de tener que especificarla manualmente en la interfaz de Connector Admin de LaterPay. Esto puede ser especialmente útil al configurar compras individuales de muchos artículos diferentes.
          <br>
            Si quieres obtener más información sobre cómo crear este token y qué contenido se puede especificar en él, consulta la documentación de la <a href="https://docs.laterpay.net/connector/configuration/inpage_configuration/config_token/#jwt-object-properties">API de JWT Paid Content</a> de LaterPay para la integración de Connector Script.
          </td>
        </tr>
        <tr>
          <td><code>locale</code></td>
          <td>cadena</td>
          <td>Define el formato de precio adecuado para la configuración regional.</td>
        </tr>
        <tr>
          <td><code>localeMessages</code></td>
          <td>objeto</td>
          <td>Permite al editor personalizar o localizar el texto de la lista de opciones de compra generada. Para obtener más información, consulta la sección <a href="#localization">Localización</a>.</td>
        </tr>
        <tr>
          <td><code>scrollToTopAfterAuth</code></td>
          <td>booleano</td>
          <td>Si el valor es "true", desplaza la página hasta la parte superior después de que el proceso de autorización se haya realizado correctamente. Esto puede resultar útil para evitar que el usuario se confunda debido a su posición de desplazamiento después de volver a la página, si el lugar donde has decidido mostrar el cuadro de diálogo se encuentra más abajo.</td>
        </tr>
        <tr>
          <td><code>region</code></td>
          <td>cadena</td>
          <td>Especifica si estás en la <a href="https://connectormwi.laterpay.net/docs/regions-environments-locales.html">región de LaterPay</a> <code>eu</code> (UE) o <code>us</code> (EE. UU.).</td>
        </tr>
        <tr>
          <td><code>sandbox</code></td>
          <td>booleano</td>
          <td>Solo se necesita si estás utilizando el modo de zona de pruebas para probar la configuración de tu servidor. Debes utilizar también el <a href="../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#amp-runtime">modo de desarrollo</a> de AMP.</td>
        </tr>
      </table>

## Usar el marcado de acceso al contenido y mostrar la lista de compra <a name="using-access-content-markup-and-showing-the-purchase-list"></a>

El marcado de acceso al contenido se debe utilizar de la misma forma que con AMP Access.

El elemento con el id `amp-access-laterpay-dialog` mostrará una lista de las opciones de compra cuando el usuario no tenga acceso al artículo. Esta lista tiene un estilo muy básico y se puede personalizar para que parezca estar más integrada en la página del editor.

Asegúrate de añadir la clase `amp-access-laterpay` si quieres utilizar el estilo predeterminado.

```html
<section amp-access="NOT error AND NOT access" amp-access-hide>
  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section class="error-section" amp-access="error" amp-access-hide="">
  Vaya... Algo no funciona.
</section>

<div amp-access="access" amp-access-hide="">
  <p>...contenido del artículo...</p>
</div>

```

## Estilo <a name="styling"></a>

Se aplican varias clases a algunos de los elementos del marcado generado. Se puede hacer referencia de forma inequívoca a los elementos sin clases mediante selectores de elementos de CSS.

Incluye un diseño básico de CSS, pero se recomienda que los editores apliquen un estilo que se ajuste al aspecto de sus páginas web.

La estructura que se ha creado para el cuadro de diálogo es la siguiente:

```html

<div id="amp-access-laterpay-dialog" class="amp-access-laterpay">
  <div class="amp-access-laterpay-container">
    <p class="amp-access-laterpay-header">
      Opcional, aparece si se ha definido el mensaje del encabezado de la configuración regional.
    </p>
    <ul>
      <li>
        <label>
          <input name="purchaseOption" type="radio">
            <div class="amp-access-laterpay-metadata">
              <span class="amp-access-laterpay-title">Título de la opción de compra</span>
              <p class="amp-access-laterpay-description">Descripción de la opción de compra</p>
            </div>
          </label>
          <p class="amp-access-laterpay-price-container">
            <span class="amp-access-laterpay-price">0,15</span>
            <sup class="amp-access-laterpay-currency">USD</sup>
          </p>
        </li>
        <!-- ... más elementos de la lista que corresponden a otras opciones de compra ... -->
      </ul>
      <button class="amp-access-laterpay-purchase-button">Comprar ahora</button>
      <p class="amp-access-laterpay-already-purchased-container">
        <a href="…">Ya lo he comprado</a>
      </p>
      <p class="amp-access-laterpay-footer">
        Opcional, aparece si se ha definido el mensaje del pie de página de la configuración regional.
      </p>
    </div>
    <p class="amp-access-laterpay-badge">Con la tecnología de <a href="https://laterpay.net" target="_blank">LaterPay</a></p>
  </div>

```

## Localización <a name="localization"></a>

El editor puede definir en la interfaz de LaterPay Connector el texto que se muestra en el cuadro de diálogo de las opciones de compra.

El resto del texto forma parte del componente extendido y se puede modificar y localizar en las opciones de configuración de la siguiente manera:

```html

<script id="amp-access" type="application/json">
  {
    "vendor": "laterpay",
    "laterpay": {
      "localeMessages": {
        "messageKey": "message value"
        }
      }
    }
</script>

```

Las siguientes claves de mensaje se pueden traducir o personalizar, pero ten en cuenta que deben conservar su significado e intención originales.

<table>
  <tr>
    <th class="col-fourty">Clave</th>
    <th class="col-fourty">Descripción</th>
    <th>Valor predeterminado</th>
  </tr>
  <tr>
    <td><code>payLaterButton</code></td>
    <td>Texto del botón de compra en las opciones que permiten al usuario pagar más adelante.</td>
    <td>"Comprar ahora y pagar más adelante"</td>
  </tr>
  <tr>
    <td><code>payNowButton</code></td>
    <td>Texto del botón de compra en las opciones que requieren al usuario pagar en el momento de la compra.</td>
    <td>"Comprar ahora"</td>
  </tr>
  <tr>
    <td><code>defaultButton</code></td>
    <td>Texto predeterminado del botón de compra antes de seleccionar una opción.</td>
    <td>"Comprar ahora"</td>
  </tr>
  <tr>
    <td><code>alreadyPurchasedLink</code></td>
    <td>Enlace que puede utilizar el usuario si ya ha comprado el artículo pero ha perdido las cookies (o está utilizando otro dispositivo) para iniciar sesión en LaterPay y recuperar sus compras.</td>
    <td>"Ya lo he comprado"</td>
  </tr>
  <tr>
    <td class="col-fourty"><code>header</code></td>
    <td>Texto opcional del encabezado.</td>
    <td></td>
  </tr>
  <tr>
    <td class="col-fourty"><code>footer</code></td>
    <td>Texto opcional del pie de página.</td>
    <td></td>
  </tr>
</table>

## Analíticas <a name="analytics"></a>

Dado que `amp-access-laterpay` está basado en `amp-access`, admite todos los [eventos de analíticas](amp-access.md#integration-with-amp-analytics) que envía `amp-access`.

Si quieres ver un ejemplo más completo de cómo se haría en la práctica, puedes consultar los ejemplos de [https://ampexample.laterpay.net/](https://ampexample.laterpay.net/), que están configurados para enviar dichos eventos de analíticas.

## Utilizar AMP Access LaterPay junto con AMP Access <a name="using-amp-access-laterpay-together-with-amp-access"></a>

Si ya tienes un sistema de suscripción y quieres utilizar LaterPay solo para las ventas de artículos individuales, puedes incluir ambos métodos de venta en la misma página utilizando AMP Access y AMP Access LaterPay.

En primer lugar, consulta la documentación de [AMP Access](amp-access.md) para obtener información sobre cómo configurarlo para utilizarlo en tu muro de pago.

También puedes consultar la sección sobre cómo configurar [varios proveedores](amp-access.md#multiple-access-providers) mediante espacios de nombre.

Al utilizarlo con LaterPay y con una integración de muro de pago existente, la configuración necesaria puede tener un aspecto similar a este:

```html

<script id="amp-access" type="application/json">
  [
    {
      "vendor": "laterpay",
      "laterpay": {
        "region": "us"
        },
      "namespace": "laterpay"
      },
    {
      "authorization":
      "https://pub.com/amp-access?rid=READER_ID&url=SOURCE_URL",
      "pingback":
      "https://pub.com/amp-ping?rid=READER_ID&url=SOURCE_URL",
      "login":
      "https://pub.com/amp-login?rid=READER_ID&url=SOURCE_URL",
      "authorizationFallbackResponse": {"error": true},
    "namespace": "publishername"
    }
  ]
</script>

```

Por otro lado, el marcado de acceso al contenido puede quedar así:

```html
<section amp-access="NOT error AND NOT laterpay.access AND NOT publishername.access" amp-access-hide>
  <p>
    <a on="tap:amp-access.login-publishername">Inicia sesión aquí para acceder a tu suscripción a NombreDelEditor.</a>
  </p>

  <div id="amp-access-laterpay-dialog" class="amp-access-laterpay"></div>
</section>

<section class="error-section" amp-access="error" amp-access-hide>
  Vaya... Algo no funciona.
</section>

<div amp-access="laterpay.access OR publishername.access" amp-access-hide>
  <p>...contenido del artículo...</p>
</div>

```

Encontrarás un ejemplo más completo en [https://ampexample.laterpay.net/dual-amp-access.html](https://ampexample.laterpay.net/dual-amp-access.html).

## Documentación relacionada <a name="related-documentation"></a>

* [AMP Access](amp-access.md)
* [LaterPay](https://www.laterpay.net)
* [LaterPay: How we do MicroPayments](https://docs.laterpay.net/how_we_do_micropayments/)
* [LaterPay Connector](https://connectormwi.laterpay.net/docs/index.html): similar a AMP Access LaterPay, pero para páginas que no son AMP.

## Validación <a name="validation"></a>

Consulta las [reglas de amp-access-laterpay](https://github.com/ampproject/amphtml/blob/main/extensions/amp-access-laterpay/validator-amp-access-laterpay.protoascii) en la especificación de la herramienta de validación de AMP.
