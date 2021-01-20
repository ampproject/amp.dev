---
$title: Cómo comenzar nuestra historia
$order: 3
description: Una historia web completa se representa por el componente amp-story, el cual sirve como un contenedor para todas las páginas de una historia. El componente amp-story también es responsable de ...
author: bpaduch
---

Una historia web completa se representa por el componente [`amp-story`, el cual sirve como un contenedor para todas las páginas de una historia. El componente ](../../../../documentation/components/reference/amp-story.md)[`amp-story`](../../../../documentation/components/reference/amp-story.md) también es responsable de crear la estructura para la interfaz del usuario, incluyendo el control de la apariencia y la navegación.

[`amp-story`](../../../../documentation/components/reference/amp-story.md) es un componente personalizado de AMP y, al igual que todos los componentes personalizados, debe agregar el script que esté asociado con el componente del documento AMP.

Para ello, **abra** el archivo `pets.html` que se encuentra en su editor de texto, y en la sección `<head>` **agregue** el siguiente script:

```html
<head>
<script async custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
</head>
```

Posteriormente, **agregue** el elemento `<amp-story>` en el `<body>` de su documento, y especifique el atributo obligatorio <code>standalone</code> de la siguiente manera:

```html
<body>
  <amp-story standalone>
  </amp-story>
</body>
```

Es importante señalar que para tener una historia de AMP válida, el elemento `<body>` debe contar con un solo elemento secundario: el componente [`amp-story`](../../../../documentation/components/reference/amp-story.md), ya que todos los demás elementos se incluyen en [`amp-story`](../../../../documentation/components/reference/amp-story.md).

## Cómo proporcionar metainformación

Para que las historias sean localizables en la web, se necesitan ciertos metadatos que proporcionen pequeños detalles de las historias, tales como:

- El título de la historia, representado por el atributo `title` (por ejemplo, “La alegría de tener mascotas”).
- El nombre del editor, representado a través del atributo `publisher` (por ejemplo, “Tutoriales de AMP”).
- El logotipo del editor, representado por el atributo `publisher-logo-src`. Este debe ser una URL que contenga una imagen del logotipo en formato cuadrado, con una relación de aspecto 1:1.
- Una imagen del cartel de la historia, representada a través del atributo `poster-portrait-src`. Esta debe ser una URL para el cartel, y la imagen debe estar en formato de retrato con una relación de aspecto 3:4.

Ahora, agreguemos estos atributos a nuestra etiqueta [`amp-story`](../../../../documentation/components/reference/amp-story.md):

```html
<amp-story standalone
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
```

Además de estos atributos necesarios, también pueden implementarse otros atributos. Para obtener más información, consulte la sección [atributos](../../../../documentation/components/reference/amp-story.md#attributes) que se encuentra en los documentos de referencia de [`amp-story`](../../../../documentation/components/reference/amp-story.md).

[tip type="note"] **NOTA –** Estos atributos de los metadatos complementan pero no reemplazan ningún tipo de información que se haya estructurado en la página (por ejemplo, JSON-LD). Para garantizar que sus historias web puedan localizarse en todas las plataformas, debe agregar [información estructurada](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md#integrate-with-third-party-platforms-through-additional-metadata) en todas sus páginas de AMP, incluyendo las historias de AMP. [/tip]

Hasta ahora tenemos una historia que no tiene ningún tipo de contenido. ¡Entonces, vayamos a crear esa página!
