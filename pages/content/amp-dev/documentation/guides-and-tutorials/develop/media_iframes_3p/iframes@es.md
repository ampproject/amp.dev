---
'$title': Inclusión de iframes
$order: 10
description: Descubra cómo incluir contenido multimedia en sus páginas y cómo usar iframes para mostrar contenido avanzado sin importar las limitaciones de AMP.
formats:
  - websites
components:
  - iframe
author: pbakaus
contributors:
  - Meggin
  - bpaduch
---

Learn how to display include media content in your pages, and how to use iframes to display advanced content outside of AMP's limitations.

## Aspectos básicos

Puede incluir un iframe en su página usando el elemento [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md).

Los iframes son especialmente útiles en AMP para mostrar contenido que no sea admitido en la página principal, como el contenido que requiere JavaScript creado por usuarios.

### Requisitos de `amp-iframe`

- Debe tener por lo menos **600 píxeles** o un **75%** de la primera ventana gráfica si empezamos por el principio de la página (excepto para los iframes que utilizan un <a><code>placeholder</code></a>).
- Solo puede solicitar recursos mediante HTTPS, y estos no deben tener el mismo origen que el contenedor, a menos que no se especifique.

[tip type="read-on"] <strong>MÁS INFORMACIÓN: </strong> Obtenga más información [en la especificación completa de `amp-iframe`](../../../../documentation/components/reference/amp-iframe.md). [/tip]

### Inclusión de la secuencia de comandos

Para incluir un [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) en su página, primero debe incluir la siguiente secuencia de comandos en el `<head>`, el cual carga el código adicional del componente ampliado:

[sourcecode:html]

<script async custom-element="amp-iframe"
  src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>

[/sourcecode]

### Escritura de las etiquetas

En el siguiente ejemplo, creamos un [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) responsivo para incrustar un Google Map mediante la <a>API de Google Maps Embed</a>:

```html
<amp-iframe
  width="200"
  height="100"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://www.google.com/maps/embed/v1/place?key={YOUR API KEY}&q=europe"
>
</amp-iframe>
```

## Uso de marcadores de posición <a name="using-placeholders"></a>

Puede mostrar un [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) en la parte superior de un documento siempre y cuando el atributo `placeholder` se incluya en algún elemento de [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md), (por ejemplo, [`amp-img`](../../../../documentation/components/reference/amp-img.md)). Este elemento se renderizará como un marcador de posición hasta que el iframe esté listo para mostrarse.

[tip type="read-on"] <strong>MÁS INFORMACIÓN: </strong> Obtenga más información sobre los elementos placeholder en la sección [Iframes con elementos placeholder](../../../../documentation/components/reference/amp-iframe.md#iframe-with-placeholder). [/tip]

Este ejemplo de un elemento placeholder:

```html
<amp-iframe
  width="400"
  height="225"
  sandbox="allow-scripts allow-same-origin"
  layout="responsive"
  src="https://giphy.com/embed/OWabwoEn7ezug"
>
  <amp-img
    placeholder
    layout="fill"
    src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"
  ></amp-img>
</amp-iframe>
```

Aparecerá así:

<amp-iframe width="400" height="225" sandbox="allow-scripts allow-same-origin" layout="responsive" src="https://giphy.com/embed/OWabwoEn7ezug"><amp-img placeholder layout="fill" src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img></amp-iframe>

## Ejemplos

Puede encontrar más ejemplos avanzados de [<code>amp-iframe</code>](../../../../documentation/examples/documentation/amp-iframe.html) nuestra página de [Ejemplos de AMP](../../../../documentation/examples/documentation/amp-iframe.html).
