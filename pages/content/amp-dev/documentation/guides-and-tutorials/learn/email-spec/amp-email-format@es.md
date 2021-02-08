---
'$title': Formato de AMP for Email
$order: 1
formats:
  - email
teaser:
  text: 'Etiquetas necesarias '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-format.md.
Please do not change this file.
If you have found a bug or an issue please
have a look and request a pull request there.
-->

<!---
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

AMP es una tecnología que se caracteriza por desarrollar páginas web súper rápidas para los clientes que utilizan dispositivos móviles. AMP consiste en un conjunto de etiquetas HTML que se apoya en JavaScript para habilitar fácilmente la funcionalidad poniendo especial atención en el desempeño y la seguridad. Hay [componentes de AMP](https://amp.dev/documentation/components/) para todo, desde carruseles hasta elementos del formulario que son adaptables, e incluso recuperación de contenido nuevo desde endpoints remotos.

El formulario de AMP for Email proporciona [un subconjunto de componentes de AMP](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-components.md) que pueden utilizarse en los mensajes de correo electrónico. Los receptores de los correos electrónicos de AMP pueden ver e interactuar directamente con los componentes de AMP en el correo electrónico.

## Etiquetas necesarias

En el siguiente código se representa la cantidad mínima de etiquetas para generar un mensaje de correo electrónico que sea válido en AMP:

[sourcecode:html]

<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello, world.
  </body>
</html>
[/sourcecode]

Un mensaje de correo electrónico de AMP DEBE:

- <a name="dctp"></a>comenzar con el tipo de documento `<!doctype html>`. [🔗](#dctp)
- <a name="ampd"></a>contener una etiqueta `<html ⚡4email>` de nivel superior (además de aceptar a `<html amp4email>`. [🔗](#ampd)
- <a name="crps"></a>contener las etiquetas `<head>` y `<body>` (en HTML son opcionales). [🔗](#crps)
- <a name="chrs"></a>contener una etiqueta `<meta charset="utf-8">` como primer elemento secundario de su etiqueta principal. [🔗](#chrs)
- <a name="scrpt"></a>contener una etiqueta `<script async src="https://cdn.ampproject.org/v0.js"></script>` dentro de su etiqueta principal. [🔗](#scrpt)
- <a name="boilerplate"></a>contener el texto estándar de amp4email (`<style amp4email-boilerplate>body{visibility:hidden}</style>`) dentro de su etiqueta principal para ocultar inicialmente el contenido hasta que se cargue AMP JS. [🔗](#boilerplate)

El total de etiquetas AMP HTML no debe exceder los 200,000 bytes.

## Estructura y renderización <a name="structure-and-rendering"></a>

AMP for Email se basa en el subtipo [MIME](https://en.wikipedia.org/wiki/MIME) estándar `multipart/alternative` como se define en el [RFC 1521, sección 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

_Para obtener más información, consulte [Estructura y renderización de los correos electrónicos en AMP](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-structure.md)._

## Componentes que son compatibles con AMP <a name="supported-amp-components"></a>

_Consulte el artículo [Componentes que son compatibles con AMP for Email](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-components.md)._

## Requisitos de HTML <a name="html-requirements"></a>

_Consulte el artículo [Compatibilidad de HTML con AMP for Email](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-html.md)._

## Requisitos del CSS <a name="css-requirements"></a>

### Selectores y propiedades que son compatibles <a name="supported-selectors-and-properties"></a>

_Consulte el artículo [Compatibilidad de CSS con AMP for Email](https://github.com/ampproject/amphtml/blob/master/spec/email/amp-email-css.md)._

### Cómo especificar CSS en un documento de AMP <a name="specifying-css-in-an-amp-document"></a>

Todas las CSS que se encuentren en cualquier documento de AMP deben estar incluidas en una etiqueta `<style amp-custom>` dentro del encabezado o como atributos de `style` en línea.

[sourcecode:html]
...

<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
  amp-img.grey-placeholder {
    background-color: grey;
  }
</style>

...

</head>
[/sourcecode]

Nota: el total de etiquetas `<style>` no puede exceder los 50,000 bytes. El verificador comprobará que no se exceda ese tamaño.

## Dimensiones del documento <a name="document-dimensions"></a>

- **Ancho óptimo**: 800 pixeles o menos (el contenido y cualquier tamaño de ancho pueden truncarse repentinamente en algunos clientes).

- **Altura**: variable, el cliente permite que el usuario se desplace por el contenido.

## Validación <a name="validation"></a>

Para garantizar que sus mensajes de correo electrónico cumplan con los estrictos criterios que pide el formato de AMP for Email, puede utilizar las herramientas de validación con las que cuenta AMP.

Para obtener más información, consulte el artículo [Cómo validar el correo electrónico de AMP](https://amp.dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails/).

## Privacidad y seguridad <a name="privacy-and-security"></a>

### Apertura e interacción con el correo electrónico de seguimiento <a name="tracking-email-opens-and-interaction"></a>

AMP HTML permite hacer un seguimiento cada que se abre el correo electrónico con técnicas de rastreo de pixeles, al igual que con los correos electrónicos normales de HTML. Todas las solicitudes que se inicien por el usuario para obtener datos de servicios externos también indicarán que el usuario está interactuando con el mensaje. Los clientes de correo electrónico pueden ofrecerle a sus usuarios la capacidad de desactivar la carga de imágenes remotas y otras solicitudes externas.

### Análisis específicos de AMP <a name="amp-specific-analytics"></a>

Las siguientes técnicas analíticas específicas de AMP no son compatibles:

- [AMP `CLIENT_ID`](https://amp.dev/documentation/guides-and-tutorials/optimize-measure/configure-analytics/analytics_basics#user-identification)
- [`amp-analytics`](https://amp.dev/documentation/components/amp-analytics)
- [`amp-pixel`](https://amp.dev/documentation/components/amp-pixel)
- [Sustitución de variables ](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/configure-analytics/analytics_basics/#variable-substitution)

### Cuestiones específicas de los componentes <a name="component-specific-considerations"></a>

Las solicitudes para reproducir imágenes dentro de [`<amp-carousel>`](https://amp.dev/documentation/components/amp-carousel) o de [`<amp-accordion>`](https://amp.dev/documentation/components/amp-accordion) pueden indicarle al remitente que el usuario está interactuando con el mensaje.

Los redireccionamientos hacia [`<amp-form>`](https://amp.dev/documentation/components/amp-form) son rechazados durante el tiempo de ejecución.

## Comentarios y asistencia <a name="feedback--support"></a>

Para obtener asistencia y realizar comentarios sobre AMP for Email, utilice el siguiente canal: [Participación continua](https://github.com/ampproject/amphtml/blob/master/CONTRIBUTING.md#ongoing-participation)
