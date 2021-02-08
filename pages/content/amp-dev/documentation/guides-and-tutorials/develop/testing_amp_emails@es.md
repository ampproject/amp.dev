---
'$title': Probando los correos electrónicos de AMP
$order: 2
'$category': Develop
description: Garantice que el usuario tenga una excelente experiencia probando los correos electrónicos de AMP antes de enviarlos al público en general.
formats:
  - email
author: fstanis
---

Garantice que el usuario tenga una excelente experiencia probando los correos electrónicos de AMP antes de enviarlos al público en general.

## Listas de verificación

1. Incluya una versión en HTML y/o una versión de texto sin formato de su correo electrónico de AMP. Cuando el correo electrónico de los clientes no sea compatible con AMP mostrará esto como una solución alterna.
2. Asegúrese de que su AMP sea válido siguiendo los pasos descritos en el artículo [Cómo validar correos electrónicos de AMP](/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_emails.md).
3. Revise el artículo [AMP para CSS compatibles con el correo electrónico](/content/amp-dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-css.md) con la finalidad de garantizar que el CSS que está utilizando sea compatible con el correo electrónico de todos los clientes.
4. Pruebe su correo electrónico en el [AMP Playground](https://playground.amp.dev/?runtime=amp4email) y asegúrese de que todas las características dinámicas, como los formularios, funcionen correctamente.

## Pruebas específicas para el correo electrónico de los clientes

Cuando el correo electrónico de los clientes es compatible con AMP también ofrece documentación para desarrolladores que puede contener requisitos y recomendaciones adicionales.

### Gmail

La documentación de Gmail menciona las recomendaciones que deben seguirse para realizar pruebas en [Cómo probar sus correos electrónicos de AMP en Gmail](https://developers.google.com/gmail/ampemail/testing-dynamic-email).

Los usuarios de Gmail pueden utilizar el artículo [AMP de Gmail para Email Playground](https://amp.gmail.dev/playground/) para enviarse un correo electrónico a sí mismos y efectuar pruebas.

### Mail.ru

En los [correos electrónicos de Mail.ru AMP](https://postmaster.mail.ru/amp) se proporciona información para que realice pruebas en su cuenta de Mail.ru.

Los usuarios de Mail.ru pueden utilizar [Mail.ru AMP Playground](https://postmaster.mail.ru/amp/playground.html) para enviarse un correo electrónico a sí mismos y efectuar pruebas.
