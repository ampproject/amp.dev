---
'$title': Add custom fonts
$order: 6
description: As páginas AMP não podem incluir folhas de estilo externas, com exceção das fontes personalizadas. É possível incorporar fontes personalizadas nas suas páginas de duas formas ...
formats:
  - websites
  - ads
  - stories
author: pbakaus
---

As páginas AMP não podem incluir folhas de estilo externas, com exceção das fontes personalizadas. É possível incorporar fontes personalizadas nas suas páginas de duas formas:

1. por meio de uma tag `<link>` (somente provedores incluídos na lista de permissões - allowlist)
2. por meio de `@font-face` (sem restrições, todas as fontes são permitidas)

### 1. Como usar a tag `<link>`

Use uma tag `<link>` (normalmente no cabeçalho da página) da seguinte forma:

[sourcecode:html]

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

As origens a seguir fazem parte da lista de permissões e podem servir fontes via tags link:

- Typography.com: **https://cloud.typography.com**
- Fonts.com:**https://fast.fonts.net**
- Google Fonts: **https://fonts.googleapis.com**
- Typekit: **https://use.typekit.net**
- Font Awesome:**https://maxcdn.bootstrapcdn.com**, **https://use.fontawesome.com**

### 2. Como usar a tag `@font-face`

Como alternativa, é possível usar [@font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) dentro da sua folha de estilos AMP:

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

[tip type="note"] <strong>OBSERVAÇÃO</strong>: Fontes incluídas via `@font-face` precisam ser buscadas através do esquema HTTP ou HTTPS.[/tip]
