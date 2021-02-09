---
'$title': Modify presentation and layout
$order: 3
description: 'Páginas AMP são páginas Web; qualquer estilo adicionado à página e a seus elementos é feito usando propriedades CSS comuns. Adicione estilos aos elementos usando os seletores de classe ou elemento ...'
author: pbakaus
contributors:
  - bpaduch
---

## Modifique a apresentação

Páginas AMP são páginas Web; qualquer estilo adicionado à página e a seus elementos é feito usando propriedades CSS comuns. Adicione estilos aos elementos usando os seletores de classe ou elemento em uma folha de estilo do `<head>`, chamada `<style amp-custom>`:

[sourcecode:html]

<style amp-custom>
  /* any custom style goes here */
  body {
    background-color: white;
  }
  amp-img {
    background-color: gray;
    border: 1px solid black;
  }
</style>

[/sourcecode]

Cada página AMP pode ter apenas uma folha de estilo inline e há certos seletores que você não tem permissão para usar. [Saiba tudo sobre estilos](../../../../documentation/guides-and-tutorials/develop/style_and_layout/style_pages.md).

## Controle o layout

O AMP segue regras mais restritas para o layout dos elementos na página. Em uma página HTML normal, você quase que exclusivamente usa CSS para criar o layout. No entanto, por razões de desempenho, o AMP exige que todos os elementos tenham um conjunto de dimensões explícitas desde o início.

Saiba mais sobre como o AMP renderiza e faz o layout de uma página e como você pode modificá-lo em [Layout e Media queries](../../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md).
