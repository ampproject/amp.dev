---
"$title": Cómo validar los correos electrónicos de AMP
"$order": '1'
author: CrystalOnScript
formats:
- email
---

Los correos electrónicos de AMP dependen de la biblioteca AMP JS para habilitar numerosas experiencias dinámicas e interactivas para los lectores. Debido a esto, los proveedores del correo electrónico necesitan validar sus mensajes. Las etiquetas de AMP válidas garantizan que los correos electrónicos sean seguros y superen los estándares de la experiencia del usuario.

# ¿Cómo verifico si mi correo electrónico es válido en AMP?

Existen distintas maneras de validar un correo electrónico para que sea un Correo electrónico de AMP válido. Todas ellas producirán exactamente el mismo resultado, de modo que, ¡seleccione la que mejor se adapte a su estilo de desarrollo!

## El validador basado en la web

El [validador basado en la web](https://validator.ampproject.org/#htmlFormat=AMP4EMAIL) de AMP es compatible con la plataforma de AMP para correo electrónico. Utilice el validador basado en la web copiando su correo electrónico de AMP en la herramienta, la cual etiquetará directamente cualquier error del validador en los estilos integrados en el código.

{{ image('/static/img/docs/guides/emailvalidate.jpg', 500, 382, alt='Image of web-based email validator' ) }}

## El validador de la línea de comandos

Puede validar archivos de los correos electrónicos de AMP mediante la [herramienta para líneas de comando del validador AMP HTML](https://www.npmjs.com/package/amphtml-validator).

### Instalación

1. Asegúrese de tener [ Node.js con su administrador de paquetes 'npm'](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) en su sistema.
2. Instale la herramienta para líneas de comando del validador AMP HTML mediante la ejecución del siguiente comando: `npm install -g amphtml-validator`.

### Cómo utilizarlo

Luego de que instale la herramienta para líneas de comando, ejecute el siguiente comando después de reemplazar `<amphtml file` con el archivo que incluye el contenido del correo electrónico de AMP.

```
amphtml-validator --html_format AMP4EMAIL <amphtml file>
```

Si el correo electrónico es válido, la herramienta para líneas de comando dará como resultado un `PASS`. Si no es válido, devolverá los errores que encontró.

## AMP Playground

También puede validar los correos electrónicos de AMP utilizando [AMP Playground](https://playground.amp.dev/?runtime=amp4email). Al igual que con el validador basado en la web, copie su correo electrónico de AMP en la herramienta y la ventana de pruebas etiquetará directamente cualquier error del validador en los estilos integrados en el código.

### Cómo validar los correos electrónicos que se entregaron

Algunas veces, los Correos electrónicos de AMP que se entregaron pueden no ser válidos, incluso cuando las etiquetas para correos electrónicos que creó ya fueron validadas por las herramientas que se mencionaron en esta página. La causa más frecuente para que esto ocurra es que su [ESP](https://amp.dev/support/faq/email-support/) modificó las etiquetas de su correo electrónico y las anuló después de que envió el correo electrónico a su ESP para que lo entregara. Por ejemplo, si su ESP es SparkPost y no configuró los pixeles de seguimiento HTTPS con SparkPost, entonces SparkPost agregará un pixel de seguimiento HTTP poco seguro a su correo electrónico. Dado que los Correos electrónicos de AMP solo permiten imágenes HTTPS, esto hará que su Correo electrónico de AMP no sea válido.

Para verificar si un correo electrónico que se haya entregado en su bandeja de entrada es válido en AMP, siga los siguientes pasos:

1. [Descargue el Correo electrónico de AMP como un archivo ` .eml` ](https://www.codetwo.com/kb/export-email-to-file) desde su cliente de correo electrónico.
2. Abra [AMP Playground](https://playground.amp.dev/?runtime=amp4email).
3. Haga clic en “IMPORTAR CORREO ELECTRÓNICO” y seleccione el archivo `.eml` que acaba de descargar.

La ventana de pruebas importará el Correo electrónico de AMP que descargó en el editor de estilos integrados del código y etiquetará cualquier error de validación.

# ¿Qué ocurre si mi correo electrónico no es válido?

El validador AMP no es simplemente una comodidad para usted durante el proceso de desarrollo, los proveedores de correo electrónico que son compatibles con los Correos electrónicos de AMP recurrirán automáticamente a los validadores que proporcionen HTML o MIME de texto sin formato. Un Correo electrónico de AMP solamente debe enviarse si es aprobado por el validador.
