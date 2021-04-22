---
'$title': Estructura y renderización en los correos electrónicos de AMP
$order: 2
formats:
  - email
teaser:
  text: 'El correo electrónico está estructurado como un '
toc: 'true'
---

<!--
This file is imported from https://github.com/ampproject/amphtml/blob/main/spec/email/amp-email-structure.md.
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

El correo electrónico está estructurado como un árbol MIME. En este árbol MIME se incluyen tanto el cuerpo del mensaje como los archivos adjuntos del correo electrónico.

Para integrar AMP en un correo electrónico, agregue una nueva sección del MIME que tenga un contenido tipo `text/x-amp-html` y sea descendiente de `multipart/alternative`. Debe establecerse junto con el actual `text/html` o las secciones de `text/plain`. Esto garantizará que el mensaje de correo electrónico funcione para todos los clientes.

<amp-img alt="AMP for Email MIME Parts Diagram" layout="responsive" width="752" height="246" src="https://github.com/ampproject/amphtml/raw/master/spec/img/amp-email-mime-parts.png"><noscript data-md-type="raw_html" data-segment-id="12596198"><img data-md-type="raw_html" alt="AMP para diagrama de piezas de MIME de correo electrónico" src="../img/amp-email-mime-parts.png"></noscript></amp-img>

Para obtener más información sobre el subtipo `multipart/alternative` consulte el [RFC 1521, sección 7.2.3](https://tools.ietf.org/html/rfc1521#section-7.2.3).

## Información adicional <a name="additional-information"></a>

La sección `text/x-amp-html` debe estar anidada en un nodo `multipart/alternative`. Un correo electrónico no puede tener más de una sección `text/x-amp-html` dentro de un nodo `multipart/alternative`.

El nodo `multipart/alternative` debe incluir por lo menos un nodo que no sea parte de AMP (`text/plain` o `text/html`) además del nodo `text/x-amp-html`. Esto se mostrará los usuarios cuyos clientes de correo electrónico no son compatibles con AMP o decidieron no participar mediante la configuración de su proveedor de correo electrónico.

Nota: Algunos clientes de correo electrónico[[1]](https://openradar.appspot.com/radar?id=6054696888303616) solo renderizarán la última sección del MIME, por lo que le recomendamos que sitúe la sección `text/x-amp-html` _antes_ de la sección del MIME `text/html`.

### Semántica de respuesta/reenvío <a name="replyingforwarding-semantics"></a>

El cliente de correo electrónico poda o elimina la parte del árbol MIME `text/x-amp-html` cuando un usuario responde o reenvía un mensaje desde el correo electrónico de AMP.

### Vencimiento <a name="expiry"></a>

El cliente de correo electrónico puede ocultar la sección de AMP en un correo electrónico después de un periodo establecido de tiempo, por ejemplo 30 días. De esta manera, los correos electrónicos mostrarán la sección `text/html` o `text/plain`.

## Ejemplo <a name="example"></a>

<!-- prettier-ignore-start -->

[sourcecode:html]
From:  Person A <persona@example.com>
To: Person B <personb@example.com>
Subject: An AMP email!
Content-Type: multipart/alternative; boundary="001a114634ac3555ae05525685ae"

--001a114634ac3555ae05525685ae
Content-Type: text/plain; charset="UTF-8"; format=flowed; delsp=yes

Hello World in plain text!

--001a114634ac3555ae05525685ae
Content-Type: text/x-amp-html; charset="UTF-8"

<!doctype html>
<html ⚡4email data-css-strict>
<head>
  <meta charset="utf-8">
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
<body>
Hello World in AMP!
</body>
</html>
--001a114634ac3555ae05525685ae
Content-Type: text/html; charset="UTF-8"

<span>Hello World in HTML!</span>
--001a114634ac3555ae05525685ae--
[/sourcecode]

<!-- prettier-ignore-end -->
