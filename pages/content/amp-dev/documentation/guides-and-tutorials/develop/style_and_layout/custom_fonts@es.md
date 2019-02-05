---
$title: Agregar fuentes personalizadas
---

Las páginas AMP no pueden incluir plantillas externas con la excepción de fuentes personalizadas.
Puede incrustar fonts de forma personalizada en su página de dos maneras:

1. A través del tag `<link>` (solo proveedores de fuentes admitidos)
2. Via `@font-face` (sin restricciones, todas las fuentes admitidas)

### 1. Usando `<link>`

Utilizar el tag `<link>` (generalmente en el head de tu página), así:

[sourcecode:html]
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

Los orígenes siguientes se incluyen en la lista blanca y se permite el uso de fuentes mediante etiquetas `<link>`:

* Typography.com: **https://cloud.typography.com**
* Fonts.com: **https://fast.fonts.net**
* Google Fonts: **https://fonts.googleapis.com**
* Typekit: **https://use.typekit.net**
* Font Awesome: **https://maxcdn.bootstrapcdn.com**, **https://use.fontawesome.com**

### 2. Usando `@font-face`

Alternativamente, puedes utilizar [`@font-face`](https://developer.mozilla.org/es/docs/Web/CSS/@font-face) dentro de tu hoja de estilos AMP:

[sourcecode:html]
<style amp-custom>
  @font-face {
    font-family: "Bitstream Vera Serif Bold";
    src: url("https://somedomain.org/VeraSeBd.ttf");
  }

  body {
    font-family: "Bitstream Vera Serif Bold", serif;
  }
</style>
[/sourcecode]

Nota: Las fuentes incluídas con `@font-face` debe ser buscado a través de ambos esquemas, ya sea HTTP o HTTPS.
