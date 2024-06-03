---
'$title': Cómo crear su primer correo electrónico de AMP
$order: 0
description: Descubra qué hace diferentes a los correos electrónicos de AMP al crear su primer correo electrónico.
tutorial: 'true'
formats:
  - email
author: CrystalOnScript
---

AMP for Email permite que los remitentes de correo electrónico utilicen AMP en sus mensajes de correo para admitir una gran cantidad de funciones nuevas. Los correos electrónicos escritos con AMP pueden incluir elementos interactivos, como carruseles o acordeones de imágenes, además el contenido se mantiene actualizado en el mensaje al igual que la capacidad de los destinatarios para tomar medidas, como responder a un formulario sin salir de su bandeja de entrada.

AMP for Email es compatible con los correos electrónicos actuales. La versión de los mensajes de AMP está integrada en el correo electrónico como una nueva parte MIME, además del HTML y el texto sin formato, garantizando la compatibilidad con todos los clientes del correo.

Sugerencia: para obtener una lista con las plataformas de correo electrónico (ESP), clientes y proveedores que son compatibles con AMP for Email, consulte cuáles son las [Plataformas de correo electrónico compatibles](../../../support/faq/email-support.md) en la sección de Preguntas frecuentes.

Siga este tutorial para crear y enviar su primer correo electrónico dinámico, desarrollado por AMP. Puede consultar el código terminado [aquí](https://gist.github.com/CrystalOnScript/988c3f0a2eb406da27e9d9bf13a8bf73).

# Comience con el código repetitivo del correo electrónico de AMP

AMP playground es compatible con el formato de AMP for Email, lo que le permite desarrollar, probar y validar sus correos electrónicos de AMP. Abra [AMP Playground](https://playground.amp.dev/?runtime=amp4email) y asegúrese de que el formato esté configurado para `AMP for Email` en la esquina superior izquierda. Debería visualizar el siguiente código:

```html
<!DOCTYPE html>
<html ⚡4email data-css-strict>
  <head>
    <meta charset="utf-8" />
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <style amp4email-boilerplate>
      body {
        visibility: hidden;
      }
    </style>
    <style amp-custom>
      h1 {
        margin: 1rem;
      }
    </style>
  </head>
  <body>
    <h1>Hello, I am an AMP EMAIL!</h1>
  </body>
</html>
```

Este contiene todas las etiquetas obligatorias y la cantidad mínima de código para ser un correo electrónico de AMP válido. También observe todos los demás ejemplos de plantillas válidas de correo electrónico que se encuentran en la lista de la parte superior derecha del menú desplegable.

Dediquemos un momento para establecer algunas diferencias significativas con los correos electrónicos de HTML clásicos:

- Los correos electrónicos de AMP deben identificarse como tales incluyendo `⚡4email`, o `amp4email`, en la etiqueta html.
- La etiqueta `<head>` también debe incluir una etiqueta `<script>` que cargue el tiempo de ejecución de AMP. `<script async src="https://cdn.ampproject.org/v0.js"></script>`
- Deben tener un código repetitivo CSS para que primero oculte el contenido hasta que AMP se cargue. ` <style amp4email-boilerplate>body{visibility:hidden}</style>`

Si ya trabajó previamente con correos electrónicos, ¡la idea de colocar un script en un correo electrónico quizás haga sonar las alarmas en su cabeza! Tenga la certeza de que los proveedores de correos electrónicos que admiten los correos de AMP imponen estrictos controles de seguridad, los cuales solo permiten que los scripts de AMP que se hayan analizado se ejecuten en sus clientes. ¡Esto permite que las funciones dinámicas e interactivas se ejecuten directamente en los buzones de los destinatarios sin que haya vulnerabilidades en su seguridad! Obtenga más información sobre las etiquetas obligatorias para los correos electrónicos de AMP aquí.

[tip type="important"] En los correos electrónicos de AMP solamente pueden incluirse scripts de AMP para los [componentes que son compatibles](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md). [/tip]

# Cómo agregar una imagen

La mayoría de las etiquetas HTML que se utilizan en los correos electrónicos pueden ser usadas en los correos electrónicos de AMP. Sin embargo, algunas etiquetas como `<img>` se reemplazan por un equivalente de AMP, [`<amp-img>`](/content/amp-dev/documentation/components/reference/amp-img.md).

La etiqueta `<amp-img>` requiere que se defina el ancho y el alto de una imagen y, a diferencia de `<img>`, `<amp-img>` debe cerrarse explícitamente con `</amp-img>`.

```html
<amp-img
  src="https://link/to/img.jpg"
  alt="photo description"
  width="100"
  height="100"
>
</amp-img>
```

Adicionalmente, los archivos GIF son compatibles mediante [`<amp-anim>`](/content/amp-dev/documentation/components/reference/amp-anim.md).

Debido a que los correos electrónicos no están alojados en su servidor, las URL deben utilizar rutas absolutas para los correos electrónicos de AMP y es necesario que estas sean HTTPS.

[Placekitten](https://placekitten.com/) es un sitio web que utiliza imágenes de gatitos como marcadores de posición. ¡Estos le permitirán seleccionar el tamaño de una imagen directamente desde la URL!

Podemos incluir una imagen en nuestro primer mensaje de correo electrónico si agregamos el código que se muestra a continuación.

```html
<body>
  <amp-img
    src="https://placekitten.com/800/400"
    alt="Welcome"
    width="800"
    height="400"
  >
  </amp-img>
</body>
```

## Cómo hacer que sea adaptable

Los correos electrónicos se pueden consultar a través de una gran variedad de dispositivos y tamaños de pantallas, ¡y AMP incluye un sistema de diseño incorporado! Gracias al sistema [`amp-layout`](/content/amp-dev/documentation/components/reference/amp-layout.md) y a las consultas de medios, es muy sencillo implementar correos electrónicos que sean adaptables. Para cambiar el tamaño de la imagen de nuestro gatito en las pantallas correctas, agregue el atributo `layout="responsive"` a su `<amp-image>`.

[tip type="read-on"] [Obtenga más información sobre cómo funciona AMP con las consultas de medios y diversos diseños](/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md). [/tip]

```
<amp-img layout="responsive" src="https://placekitten.com/800/400" alt="Welcome" height="400" width="800"></amp-img>
```

¡Expanda y contraiga la ventana del navegador para ver cómo cambia el tamaño de la imagen! Consulte [aquí la lista específica de los componentes que son compatibles con el diseño](../../../documentation/guides-and-tutorials/learn/email-spec/amp-email-components.md#layout).

# Cómo modificar la apariencia y el diseño

Una imagen está bien, pero ¿qué pasa si deseamos mostrar más? AMP for Email es compatible con elementos propios del diseño, como acordeones y barras laterales.

<!-- TODO: Set up link -->

<!-- [Read here for full list of supported layout elements](). -->

En este tutorial utilizaremos [`<amp-carousel>`](/content/amp-dev/documentation/components/reference/amp-carousel.md) para mostrar fotos de gatos en adopción.

Agregue el script `amp-carousel` en el encabezado de su correo electrónico.

```html
<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>
```

Posteriormente, envuelva nuestra primera imagen entre las etiquetas `<amp-carousel>`.

```html
<amp-carousel layout="responsive" width="800" height="400" type="slides">
  <amp-img
    layout="fill"
    src="https://placekitten.com/800/400"
    alt="Welcome"
    height="400"
    width="800"
  ></amp-img>
</amp-carousel>
```

Puede notar que nada ha cambiado, ¡y eso es algo bueno! A nuestro carrusel se le asignó el atributo `type=slides`, lo cual quiere decir que mostrará una foto a la vez. Dado que colocamos una fotografía dentro de las etiquetas, al usuario no se le proporcionan flechas de desplazamiento.

A continuación, reemplace la imagen del gatito con nuestros gatos en adopción dentro del `<amp-carousel>` de AMP.

```html
<amp-carousel
  id="carousel-with-preview"
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({currentCat: event.index})"
>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_caleb_woods.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_craig_mclaclan.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_lightscape.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
  <amp-img
    layout="fill"
    src="https://amp.dev/static/img/docs/tutorials/firstemail/photo_by_nick_karvounis.jpg"
    alt="photo courtesy of Unsplash"
  ></amp-img>
</amp-carousel>
```

¡Ahora debería ser capaz de cambiar las fotos haciendo clic en las flechas de navegación que se encuentran a la izquierda o derecha del carrusel!

## Hacer envíos con estilo

AMP le permite aplicar estilos en el encabezado del documento mediante la etiqueta `<style amp-custom>`. De la misma manera, ahora se pueden utilizar clases y pseudoclases CSS que anteriormente estaban prohibidas. [Consulte la lista completa aquí](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md#emails-with-style).

Vamos a actualizar `Hello, AMP4EMAIL world` en un título real.

```html
<body>
  <h1>Adorable Adoptable Animals</h1>
  ...
</body>
```

Y después agregaremos un poco de estilo en el encabezado.

```html
<head>
  ...
  <style amp-custom>
    h1 {
      font-family: arial;
      margin: 10px;
    }
    .center {
      text-align: center;
    }
    .carousel-preview {
      margin-top: 10px;
    }
  </style>
</head>
```

# Cómo agregar funciones dinámicas

Tradicionalmente, los correos electrónicos solo permitían contenido estático. ¡Con ayuda de AMP, los correos electrónicos se abren a todo un nuevo mundo de posibilidades! Los usuarios ahora pueden responder a los [formularios](/content/amp-dev/documentation/components/reference/amp-form.md), obtener una [lista de contenido actualizada de forma dinámica](/content/amp-dev/documentation/components/reference/amp-list.md), e interactuar con el contenido.

En este tutorial, usaremos [`<amp-bind>`](/content/amp-dev/documentation/components/reference/amp-bind.md) para mostrar el nombre de nuestro gato en adopción y una descripción que podrá visualizar el usuario cuando consulte la diapositiva de ese gato en particular. Comience por incluir el script `amp-bind` en el encabezado de su correo electrónico.

```html
<script
  async
  custom-element="amp-bind"
  src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
></script>
```

Enseguida, declararemos la variable bind de AMP “myState” como una cadena JSON dentro de una etiqueta [`<amp-state>`](/content/amp-dev/documentation/components/reference/amp-bind.md#state). Dado que tenemos cuatro fotos de gatos, incluiremos el estado para las cuatro.

```html
<body>
  <amp-state id="myState">
    <script type="application/json">
      {
        "cats": [
          {
            "name": "Aakash",
            "description": "Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug."
          },
          {
            "name": "Filip",
            "description": "Friendly and enjoys pets and head rubs. Is known to sit on keyboards and refuses to touch anything with catnip on it."
          },
          {
            "name": "Julian",
            "description": "Both bold and extremely sweet. Wastes no time in investigating new smells, objects, and places, but enjoys lazing in the sun!"
          },
          {
            "name": "John",
            "description": "This playful and spirited cat would like to be outside his kennel and will be so happy when he gets to his forever home with more room to move."
          }
        ]
      }
    </script>
  </amp-state>
</body>
```

[Las acciones y eventos de AMP](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md) desencadenan diferentes estados. En nuestro caso, lo que queremos es actualizar el estado cuando el usuario haga clic en las flechas de navegación del carrusel. amp-carousel activa un evento [`slideChange`](/content/amp-dev/documentation/guides-and-tutorials/learn/amp-actions-and-events.md#amp-carouseltypeslides), en el cual actualizaremos la variable `currentCat` mediante `AMP.setState`.

```html
<h1>Adorable Adoptable Animals</h1>
<amp-carousel
  width="800"
  height="400"
  layout="responsive"
  type="slides"
  on="slideChange:AMP.setState({ currentCat: event.index} )"
>
  ...
</amp-carousel>
```

En este código se estableció el estado `currentCat` para que coincida con la foto del gato en el índice del carrusel. De modo que, si nos encontramos en la diapositiva `event.index=2`, el estado se asignará al elemento del índice 2 de la matriz.

Lo único que falta es mostrar el nombre y las descripciones de nuestro gato. Para ello, agregue el siguiente código debajo de la etiqueta de cierre `amp-carousel`.

```html
</amp-carousel>
<div class="center">
  <h1>
    <span [text]="myState.cats[currentCat].name">Aakash</span>  is available for adoption!
  </h1>
</div>
```

En la extensión `amp-bind` se utilizan [expresiones](/content/amp-dev/documentation/components/reference/amp-bind.md#expressions) y [enlaces](/content/amp-dev/documentation/components/reference/amp-bind.md#bindings) para cambiar el contenido de forma dinámica. En el ejemplo del código anterior se utiliza el enlace `[text]` para actualizar el texto dentro de la etiqueta `<span>` cada vez que se cambia el estado mediante la evaluación de la expresión `"myState.cats[currentCat].name"`.

[tip type="note"] Para evitar el riesgo de experimentar saltos imprevistos en el contenido y en el rendimiento, amp-bind no evalúa las expresiones cuando se carga una página. Esto quiere decir que, en los elementos visuales se debe establecer un estado predeterminado y no confiar en amp-bind para realizar la renderización inicial. [/tip]

¡No olvide agregar la descripción de nuestro gato después de la etiqueta `</div>`!

```html
  </div>
  <p class="center">About <span [text]="myState.cats[currentCat].name"> Aakash</span></p>
  <p class="center" [text]="myState.cats[currentCat].description">Very sweet gentleman that is quite shy in a shelter environment. He may hide under his blanket upon initial approach, but he is an affectionate lovebug.</p>
</body>
```

Ahora, cuando cambie la foto del gato en el carrusel, ¡también deberán actualizarse su nombre y su descripción!

# Cómo enviar un mensaje de correo electrónico de AMP

Para saber cómo enviar un mensaje de correo electrónico a su bandeja de entrada, [obtenga más información sobre cómo probar los correos electrónicos de AMP](/content/amp-dev/documentation/guides-and-tutorials/develop/testing_amp_emails.md)

<!-- TODO: Add Screen Shot. Emails sent from tool are not currently displaying. Only receiving information on how to enable AMP emails, but then getting blank messages. -->

¡Felicidades! ¡Envió su primer mensaje de correo electrónico de AMP!

Para saber cuáles son los pasos que deben seguirse a continuación, [obtenga más información sobre los conceptos básicos de AMP for Email](/content/amp-dev/documentation/guides-and-tutorials/learn/email_fundamentals.md).
