---
'$title': Adición de fuentes personalizadas
$order: 6
description: Las páginas AMP no pueden incluir plantillas externas, con la excepción de fuentes personalizadas. Puede incrustar en su página fuentes personalizadas de dos maneras...
formats:
  - websites
  - ads
  - stories
author: pbakaus
---

Las páginas AMP no pueden incluir plantillas externas, con la excepción de fuentes personalizadas. Puede incrustar en su página fuentes personalizadas de dos maneras:

1. Mediante una etiqueta `<link>`: solo para proveedores de fuentes autorizados.
2. Mediante `@font-face` (sin restricciones, se admiten todas las fuentes)

### 1. Utilizando `<link>`

Utilice la etiqueta `<link>` (generalmente en el encabezado de su página), de la siguiente manera:

[sourcecode:html]

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

Los orígenes siguientes se incluyen en la lista blanca y se permite el uso de fuentes mediante etiquetas `<link>`:

- Typography.com: **https://cloud.typography.com**
- Fonts.com: **https://fast.fonts.net**
- Google Fonts: **https://fonts.googleapis.com**
- Typekit: **https://use.typekit.net**
- Font Awesome: **https://maxcdn.bootstrapcdn.com**, **https://use.fontawesome.com**

### 2. Utilizando `@font-face`

Alternativamente, puede utilizar [`@font-face`](https://developer.mozilla.org/es/docs/Web/CSS/@font-face) dentro de su hoja de estilos AMP:

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

Nota: Las fuentes que se incluyen con `@font-face` debe buscarse mediante ambos esquemas, ya sea HTTP o HTTPS.
