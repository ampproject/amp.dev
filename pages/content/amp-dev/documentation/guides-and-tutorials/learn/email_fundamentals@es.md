---
'$title': Conceptos básicos de AMP para correo electrónico
$order: 1
description: Todo lo que necesita saber para empezar a escribir correos electrónicos AMP válidos.
author: CrystalOnScript
formats:
  - email
---

¡Hay buenas noticias si está familiarizado con AMP! AMP para correo electrónico es solo un subconjunto de la biblioteca HTML de AMP. ¡Si no está familiarizado con AMP también hay buenas noticias! ¡En esta guía se le brindará todo lo que necesite saber para comenzar a escribir correos electrónicos de AMP válidos!

## Etiquetas necesarias

Los correos electrónicos de AMP son parecidos a los correos electrónicos HTML clásicos, pero presentan algunas diferencias. A continuación se muestra la cantidad mínima de etiquetas necesarias para convertir un correo electrónico en un correo electrónico de AMP válido.

```html
<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <script async src="https://ampjs.org/v0.js"></script>
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
  </head>
  <body>
    Hello, AMP4EMAIL world.
  </body>
</html>
```

Los proveedores de correo electrónico que son compatibles con AMP para correo electrónico han configurado controles de protección para garantizar que los usuarios obtengan una experiencia placentera y segura. Cuando se crea un correo electrónico con AMP se debe cumplir o satisfacer con todos los siguientes requisitos:

- Comenzar con el tipo de documento `<!doctype html>`. Esto también es estándar para HTML.
- Incluir una etiqueta `<html amp4email>` de nivel superior o una etiqueta `<html ⚡4email>`si su correo electrónico es más genial. Esto identifica al documento como un correo electrónico de AMP para que pueda tratarse como tal.
- Definir las etiquetas `<head>` y `<body>`. Esto es opcional en HTML, ¡pero AMP mantiene las cosas perfectas!
- Incluir una etiqueta `<meta charset="utf-8>` como primer elemento secundario de la etiqueta `<head>`. Esto identifica la codificación de la página.
- La biblioteca de AMP se importa mediante una etiqueta `<script async src="https://ampjs.org/v0.js"></script>` colocada en `<head>`. ¡Sin ella, ninguna de las increíbles y dinámicas funciones obtenidas a través de AMP funcionará! Como práctica recomendada, esto debe incluirse lo antes posible en el `<head>`, directamente debajo de la etiqueta `<meta charset="utf-8">`.
- Al principio, oculte el contenido del correo electrónico hasta que se cargue la biblioteca de AMP colocando el modelo estándar de AMP para correo electrónico en el `<head>`.

```html
<head>
  ...
  <style amp4email-boilerplate>
    body {
      visibility: hidden;
    }
  </style>
</head>
```

### Reemplazos de etiquetas específicas de AMP

Dado que la biblioteca de AMP para correo electrónico es un subconjunto de la biblioteca AMP HTML, se implementan muchas de las mismas reglas, las etiquetas específicas de AMP reemplazan a las etiquetas de HTML con muchos recursos diferentes y requieren un ancho y un alto específicos. Esto permite que la plantilla de AMP oculte contenido hasta que sepa cómo se verá en el dispositivo del usuario.

#### Imágenes

Para pintar la página de forma eficaz, todas las etiquetas `<img>` se reemplazan por [`<amp-img>`](../../../documentation/components/reference/amp-img.md). La etiqueta `<amp-img>` requiere un ancho y un alto definidos y es compatible con el [sistema de diseño de AMP](amp-html-layout/index.md)

```
<amp-img src="https://link/to/img.jpg"
    width="100"
    height="100"
    layout="responsive">
</amp-img>
```

La etiqueta `<amp-img>` incluye formas magníficas e integradas de controlar el diseño adaptable y establecer alternativas.

[tip type="note"] Obtenga más información sobre el uso del [diseño de AMP y las consultas de medios](../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md?format=email) y sobre cómo configurar [las alternativas de imagen](../../../documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md). [/tip]

#### GIF

AMP ha creado [`<amp-anim>`](../../../documentation/components/reference/amp-anim.md?format=email), una etiqueta específica para imágenes GIF la cual permite que el tiempo de ejecución de AMP reduzca el uso del CPU cuando la animación se encuentra fuera de la pantalla. De forma similar a `<amp-img>` el ancho y el alto están establecidos y el elemento debe incluir una etiqueta de cierre.

```
<amp-anim
    width="400"
    height="300"
    src="my-gif.gif">
</amp-anim>
```

Además, es compatible con un elemento secundario del `placeholder` opcional para mostrar mientras se carga el archivo `src` y admite al sistema de diseño AMP.

```
<amp-anim width=400 height=300 src="my-gif.gif" layout="responsive">
  <amp-img placeholder width=400 height=300 src="my-gif-screencap.jpg">
  </amp-img>
</amp-anim>
```

## Correos electrónicos con estilo <a name="emails-with-style"></a>

Como todos los clientes de correo electrónico, AMP permite atributos de los estilos integrados en línea `style`, pero también es compatible con CSS mediante el uso de la etiqueta `<style amp-custom>` que se encuentra dentro del encabezado del correo electrónico.

```html
...
<style amp-custom>
  /* any custom styles go here. */
  body {
    background-color: white;
  }
  amp-img {
    border: 5px solid black;
  }
</style>
...
</head>
```

Al igual que los correos electrónicos HTML, AMP para correo electrónico es compatible con un subconjunto limitado de selectores y propiedades de CSS.

Consulte [AMP para correo electrónico compatible con CSS](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md) para obtener una lista completa de CSS permitidos en los clientes de correo electrónico que admiten AMP.

[tip type="important"] AMP impone un límite de tamaño de 75,000 bytes para modificar el estilo. [/tip]

## Componentes de AMP permitidos

Las características dinámicas, visuales e interactivas de los componentes de AMP es lo que lleva a que los correos de AMP hacia el futuro del correo electrónico.

La [lista completa de componentes compatibles en AMP para correo electrónico](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md) está disponible como parte de las especificaciones técnicas de AMP para correo electrónico.

## Autenticar solicitudes

El contenido dinámico del correo electrónico personalizado con frecuencia requiere la autenticación del usuario. Sin embargo, para proteger los datos del usuario, todas las solicitudes HTTP realizadas desde el interior de los correos electrónicos de AMP pueden ser procesadas por proxy y sin cookies.

Para autenticar las solicitudes realizadas desde los correos electrónicos de AMP, puede utilizar tokens de acceso.

### Tokens de acceso

Puede utilizar tokens de acceso para autenticar al usuario. Los tokens de acceso se proporcionan y controlan por el remitente del correo electrónico. El remitente utiliza los tokens para asegurarse de que solo aquellos con acceso al correo electrónico de AMP puedan llevar a cabo las solicitudes incluidas en ese correo electrónico. Los tokens de acceso deben ser criptográficamente seguros y de alcance y tiempo limitados. Se incluyen dentro de la URL de la solicitud.

Este ejemplo demuestra el uso de `<amp-list>` para mostrar datos autenticados:

```html
<amp-list
  src="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  height="300"
>
  <template type="amp-mustache"> ... </template>
</amp-list>
```

De forma similar, cuando utilice `<amp-form>`, coloque su token de acceso en la URL `action-xhr`.

```html
<form
  action-xhr="https://example.com/endpoint?token=REPLACE_WITH_YOUR_ACCESS_TOKEN"
  method="post"
>
  <input type="text" name="data" />
  <input type="submit" value="Send" />
</form>
```

#### Ejemplo

En el siguiente ejemplo se considera un servicio hipotético para tomar apuntes que permite a los usuarios registrados agregar notas a su cuenta y verlas más tarde. El servicio desea enviar un correo electrónico a un usuario, `jane@example.com`, que incluye una lista de notas que tomó previamente. La lista de notas del usuario actual está disponible en el endpoint `https://example.com/personal-notes` en formato JSON.

Antes de enviar el correo electrónico, el servicio genera un token de acceso de uso limitado y criptográficamente seguro para `jane@example.com: A3a4roX9x`. El token de acceso se incluye en el nombre de campo `exampletoken` dentro de la consulta de la URL:

```html
<amp-list
  src="https://example.com/personal-notes?exampletoken=A3a4roX9x"
  height="300"
>
  <template type="amp-mustache">
    <p>{{note}}</p>
  </template>
</amp-list>
```

El endpoint `https://example.com/personal-notes` es responsable de validar el parámetro exampletoken y encontrar al usuario asociado con el token.

### Tokens de acceso de uso limitado

Los tokens de acceso de uso limitado brindan protección contra la suplantación de identidad para enviar solicitudes y los [ataques de reproducción](https://en.wikipedia.org/wiki/Replay_attack), lo que garantiza que la acción la realice el usuario al que se envió el mensaje. La protección se logra agregando un parámetro de token único a los parámetros de la solicitud y verificándolo cuando se invoca la acción.

El parámetro del token debe generarse como una clave que solo se puede utilizar para una acción específica y un usuario específico. Antes de que se realice la acción solicitada, debe verificar que el token sea válido y coincida con el que generó para el usuario. Si el token coincide, la acción se puede realizar y el token deja de ser válido para solicitudes futuras.

Los tokens de acceso deben enviarse al usuario como parte de la propiedad url de HttpActionHandler. Por ejemplo, si su aplicación administra solicitudes de aprobación en `http://www.example.com/approve?requestId=123`, debería considerar incluir un parámetro `accessToken` adicional y poner atención a las solicitudes enviadas a `http://www.example.com/approve?requestId=123&accessToken=xyz`.

La combinación `requestId=123` y `accessToken=xyz` debe generarse previamente, asegurando que el `accessToken` no se pueda deducir del `requestId`. Cualquier solicitud de aprobación con `requestId=123` y sin `accessToken` o con un `accessToken` que no sea igual a `xyz` debe rechazarse. Una vez que se procesa esta solicitud, cualquier solicitud futura con la misma identificación y token de acceso también debe rechazarse.

## Pruebas en diferentes clientes de correo electrónico

Los clientes de correo electrónico que son compatibles con AMP para correo electrónico proporcionan sus propios documentos y herramientas de prueba para ayudarlo con su incorporación.

Consulte [Probando de correos electrónicos de AMP](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md) para obtener más información y enlaces a los documentos específicos para el cliente de correo electrónico.
