---
$title: Adicionar fontes personalizadas
---

As páginas AMP não incluem folhas de estilo externas, com exceção das fontes personalizadas. É possível incorporar fontes personalizadas nas suas páginas de duas formas:

1.  por meio de uma `<link>` tag (somente de provedores da lista de permissões)
2.  por meio de `@font-face` (sem restrições, todas as fontes são permitidas)

###  1. Como usar a tag `<link>`

 Use uma tag `<link>` (normalmente no cabeçalho da página) desta forma:

[sourcecode:html]
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine">
[/sourcecode]

As origens a seguir estão na lista de permissões e podem veicular fontes através de tags de link:

*  Typography.com:**https://cloud.typography.com**
*  Fonts.com:**https://fast.fonts.net**
*  Google Fonts:**https://fonts.googleapis.com**
*  Typekit: **https://use.typekit.net**
*  Font Awesome:**https://maxcdn.bootstrapcdn.com**, **https://use.fontawesome.com**

###  2. Como usar a tag `@font-face`

 Como opção, é possível usar[@font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)
within your AMP stylesheet:

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

Observação: Fontes incluídas através de `@font-face` precisam ser buscadas por meio do esquema HTTP ou HTTPS.

