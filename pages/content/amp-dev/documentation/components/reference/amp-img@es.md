---
$category@: media
formats:
- websites
- email
- ads
- stories
teaser:
  text: Sustituye la etiqueta `img` de HTML5.
---


<!---
Copyright 2015 The AMP HTML Authors. All Rights Reserved.

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

# amp-img

<table>
  <tr>
    <td class="col-fourty"><strong>Descripción</strong></td>
    <td>Sustitución de la etiqueta <code>img</code> de HTML gestionada por el tiempo de ejecución.</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Diseños admitidos</a></strong></td>
    <td>fill, fixed, fixed-height, flex-item, intrinsic, nodisplay y responsive</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Ejemplos</strong></td>
    <td>Consulta el <a href="https://ampbyexample.com/components/amp-img/">ejemplo de amp-img</a> de AMP By Example.</td>
  </tr>
</table>


# Comportamiento

El tiempo de ejecución puede retrasar o priorizar la carga de recursos basándose en la posición del viewport, los recursos del sistema, el ancho de banda de la conexión a Internet u otros factores. De esta forma, los componentes `amp-img` permiten al tiempo de ejecución gestionar eficazmente los recursos de imagen.

Se debe proporcionar a los componentes `amp-img`, como al resto de los recursos AMP obtenidos de forma externa, un tamaño explícito (`width` y `height`) de antemano, para que se conozca la relación de aspecto sin haber recuperado la imagen. El atributo `layout` es el que determina el comportamiento real del diseño.

[tip type="read-on"]
Para obtener más información sobre los diseños, consulta la especificación del [sistema de formatos de AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md) y la lista de [formatos compatibles](https://www.ampproject.org/docs/guides/responsive/control_layout.html#the-layout-attribute).
[/tip]

# Ejemplo: Mostrar una imagen adaptable

En el siguiente ejemplo, hacemos que se muestre una imagen que se adapta al tamaño del viewport; para ello, definimos `layout=responsive`.  La imagen se expande y se oculta según la relación de aspecto definida en `width` y `height`.

<div>
  <amp-iframe height="193" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.basic.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Show more" overflow="" tabindex="0" role="button">Mostrar código completo</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

[tip type="read-on"]
Para obtener más información sobre las páginas AMP adaptables, consulta la guía sobre [cómo crear páginas AMP adaptables](https://www.ampproject.org/docs/guides/responsive/responsive_design.html).
[/tip]

Si el recurso solicitado por el componente `amp-img` no se carga, el espacio quedará en blanco a menos que se proporcione un elemento secundario de respaldo [`fallback`](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-layout.md#fallback). El respaldo solo se ejecuta en el diseño inicial y, si se produce cualquier cambio posterior en el src (a través de resize + srcset, por ejemplo), el recurso no tendrá un respaldo por cuestiones de rendimiento.

# Ejemplo: Especificar una imagen de respaldo

En el siguiente ejemplo, si el navegador no es compatible con WebP, se mostrará la imagen JPG de respaldo:

<div>
  <amp-iframe height="271" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.fallback.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Show more" overflow="" tabindex="0" role="button">Mostrar código completo</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

Se puede establecer un color de fondo de marcador de posición u otro elemento visual mediante un selector de CSS y aplicar un estilo en el propio elemento.

Las funciones de imagen adicionales, como los subtítulos, se pueden implementar mediante código HTML estándar (por ejemplo, `figure` y `figcaption`).

[tip type="read-on"]
Para obtener más información sobre cómo utilizar `amp-img`, consulta estos recursos:

* [Marcadores de posición y respaldos](https://www.ampproject.org/docs/design/responsive/placeholders)
* [Incluir imágenes y vídeos](https://www.ampproject.org/docs/media/amp_replacements)
[/tip]

# Atributos

**src**

Es similar al atributo `src` de la etiqueta `img`. El valor debe ser una URL que dirija a un archivo de imagen que se pueda almacenar en caché de forma pública. Los proveedores de caché pueden reescribir estas URL al ingerir archivos AMP para que apunten a una versión almacenada en caché de la imagen.

**srcset**

Funciona igual que el atributo `srcset` de la etiqueta `img`. En los navegadores que no admiten `srcset`, `<amp-img>` utilizará la `src` predeterminada. Si se proporciona `srcset` pero no `src`, se seleccionará la primera URL de `srcset`.

**sizes**

Funciona igual que el atributo `sizes` de la etiqueta `img`.

[tip type="read-on"]
Para obtener más información sobre el uso de `sizes` y `srcset`, consulta el documento sobre [imágenes adaptables con srcset, sizes y heights](https://www.ampproject.org/docs/design/responsive/art_direction).
[/tip]

**alt**

Cadena de texto alternativo que es similar al atributo `alt` en `img`.

**attribution**

Cadena que define la atribución de la imagen. Por ejemplo, `attribution="CC courtesy of Cats on Flicker"`.

**height** y **width**

Tamaño de imagen explícito que utiliza el tiempo de ejecución de AMP para determinar la relación de aspecto sin recuperar la imagen.

**atributos comunes**

Este elemento incluye [atributos comunes](https://www.ampproject.org/docs/reference/common_attributes) que se aplican a los componentes de AMP.

# Estilo

Se puede aplicar un estilo a `amp-img` directamente mediante propiedades de CSS. Por ejemplo, se puede definir un color de fondo gris que funcione de marcador de posición mediante:

```css
amp-img {
  background-color: grey;
  }
```

# Consejos y trucos

# Escalar una imagen hasta una anchura máxima

Si quieres que el tamaño de la imagen se adapte cuando cambie el tamaño de la ventana, pero con un límite para que la imagen no sobrepase su propia anchura:

1. Define `layout=responsive` en `<amp-img>`.
1. En el contenedor de la imagen, especifica el atributo de CSS `max-width:<max width to display image>`.  Debe ser en el contenedor porque  `amp-img` con `layout=responsive` es un elemento en el nivel de *bloque*, mientras que `<img>` está *insertado*. También puedes definir `display: inline-block` en el CSS del elemento amp-img.

# La diferencia entre los diseños responsive e intrinsic

Tanto los diseños `responsive` como los `intrinsic` crean una imagen que se escalará automáticamente.  La principal diferencia es que `intrinsic` utiliza una imagen SVG como elemento de escalado,  lo cual hará que se comporte de la misma forma que una imagen de HTML estándar y permitirá que el navegador conozca el tamaño del diseño inicial de la imagen, lo cual supone una ventaja. El diseño `intrinsic` tendrá un tamaño intrínseco y aumentará un `div` flotante hasta que alcance el tamaño natural de la imagen o una restricción de CSS como `max-width`. El diseño `responsive` se renderiza como 0x0 en un `div` flotante porque toma su tamaño del elemento principal, que no tiene un tamaño natural cuando es flotante.

# Definir una imagen de tamaño fijo

Si quieres que la imagen siempre se muestre con un tamaño fijo:

1. Define `layout=fixed` en `<amp-img>`.
1. Define `width` y `height`.

[tip type="read-on"]
Obtén más información sobre los [diseños que se aplican](https://www.ampproject.org/docs/design/responsive/control_layout#what-if-the-layout-attribute-isn%E2%80%99t-specified?) si no especificas el atributo `layout`.
[/tip]

# Definir la relación de aspecto

Para las imágenes adaptables, `width` y `height` no tienen que coincidir exactamente con la anchura y la altura del recurso de `amp-img`; solo tienen que dar como resultado la misma relación de aspecto.

Por ejemplo, en lugar de definir `width="900"` y `height="675"`, puedes especificar `width="1.33"` y `height="1"`.

<div>
  <amp-iframe height="193" src="https://ampproject-b5f4c.firebaseapp.com/examples/ampimg.aspectratio.embed.html" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable="">
    <div aria-label="Show more" overflow="" tabindex="0" role="button">Mostrar código completo</div>
    <div placeholder=""></div>
  </amp-iframe>
</div>

# Configurar varios archivos de origen para diferentes resoluciones de pantalla

El atributo [`srcset`](#attributes) debe utilizarse para proporcionar distintas resoluciones para una misma imagen, todas con la misma relación de aspecto. El navegador elegirá automáticamente el archivo más apropiado de `srcset` en función de la resolución de la pantalla y de la anchura del dispositivo del usuario.

Por otro lado, el atributo [`media`](https://www.ampproject.org/docs/reference/common_attributes#media) muestra u oculta los componentes de AMP y debe utilizarse al crear diseños adaptables. La forma adecuada de hacer que se muestren imágenes con diferentes relaciones de aspecto es utilizar varios componentes `<amp-img>`, cada uno con un atributo `media` que coincida con la anchura de la pantalla en la que se mostrará cada instancia.

Para obtener más información, consulta la guía sobre [cómo crear páginas AMP adaptables](https://www.ampproject.org/docs/design/responsive/responsive_design#displaying-responsive-images).

# Mantener la relación de aspecto de las imágenes con dimensiones desconocidas

El sistema de diseño de AMP requiere conocer la relación de aspecto de una imagen antes de poder recuperarla; sin embargo, en algunos casos puede que no conozcas las dimensiones de la imagen. Para mostrar imágenes con dimensiones desconocidas y que se mantengan las relaciones de aspecto, combina el diseño [`fill`](https://www.ampproject.org/docs/design/responsive/control_layout#the-layout-attribute) de AMP con la propiedad [`object-fit`](https://css-tricks.com/almanac/properties/o/object-fit/) de CSS. Para obtener más información, consulta el documento sobre [cómo admitir imágenes con dimensiones desconocidas](https://ampbyexample.com/advanced/how_to_support_images_with_unknown_dimensions) de AMP By Example.

# Validación

Consulta las [reglas de amp-img](https://github.com/ampproject/amphtml/blob/master/validator/validator-main.protoascii) en la especificación de la herramienta de validación de AMP.
