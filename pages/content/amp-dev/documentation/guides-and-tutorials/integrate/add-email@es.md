---
'$title': Cómo agregar AMP a los correos electrónicos existentes
$order: 1
author: CrystalOnScript
formats:
  - email
---

El formato de AMP para correos electrónicos está integrado como un nuevo segmento de MIME. Este se visualizará si su correo electrónico se envía a un proveedor que es compatible con AMP para correos electrónicos, ¡si no es así, no se preocupe! El proveedor le mostrará su HTML o texto sin formato de respaldo. Utilice esta guía para incluir AMP en sus correos electrónicos.

# Incluya la parte de AMP MIME

El correo electrónico tiene una estructura parecida a un [árbol en MIME](https://en.wikipedia.org/wiki/MIME), el cual contiene el contenido del mensaje y todos los archivos adjuntos en el correo electrónico. Para incluir AMP en sus correos electrónicos, deberá agregar un nuevo segmento de MIME con el tipo de contenido `text/x-amp-html`.

El segmento AMP MIME debe anidarse dentro de un nodo `multipart/alternative` y establecerse junto a los segmentos ya existentes `text/html` o `text/plain`. Esto garantizará que el mensaje de correo electrónico se renderice para todos los clientes.

```html
From: Person A
<persona@example.com>
  To: Person B
  <personb@example.com>
    Subject: An AMP email! Content-Type: multipart/alternative;
    boundary="001a114634ac3555ae05525685ae" --001a114634ac3555ae05525685ae
    Content-Type: text/plain; charset="UTF-8"; format=flowed; delsp=yes Hello
    World in plain text! --001a114634ac3555ae05525685ae Content-Type:
    text/x-amp-html; charset="UTF-8"

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
        Hello World in AMP!
      </body>
    </html>
    --001a114634ac3555ae05525685ae-- Content-Type: text/html; charset="UTF-8"

    <span>Hello World in HTML!</span>
    --001a114634ac3555ae05525685ae</personb@example.com
  ></persona@example.com
>
```

[tip type="important"] Algunos clientes de correo electrónico solo renderizarán la última parte de MIME. Para garantizar que un correo electrónico se renderizó, coloque el segmento `text/x-amp-html` antes del segmento `text/html` de MIME. [/tip]

# ¿Qué ocurre cuando los destinatarios envían o responden un correo electrónico de AMP?

Cuando un usuario reenvía o responde un correo electrónico de AMP se elimina el segmento `text/x-amp-html` del árbol en MIME. Por esta razón, es importante que proporcione contenido alternativo en la parte correspondiente al HTML, incluso cuando envíe correos electrónicos de AMP a clientes que admitan el tipo MIME.
