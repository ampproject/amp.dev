---
"$title": Iniciando nossa história
"$order": '3'
description: Uma História Web completa é representada pelo componente amp-story, que funciona como um container para todas as páginas de uma história. O componente amp-story também é responsável por...
author: bpaduch
---

Uma História Web completa é representada pelo componente [`amp-story`](../../../../documentation/components/reference/amp-story.md), que funciona como um container para todas as páginas de uma história. O componente [`amp-story`](../../../../documentation/components/reference/amp-story.md) também é responsável por criar o shell da interface do usuário, incluindo gestos de manipulação e navegação.

O componente [`amp-story`](../../../../documentation/components/reference/amp-story.md) é um componente AMP personalizado e, como todos os componentes personalizados, você precisa adicionar o script associado ao componente ao documento AMP.

**Abra** o arquivo `pets.html` no seu editor de texto, e na seção `<head>`, **acrescente** o script a seguir:

```html
<head>
<script async custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
</head>
```

**Acrescente** o elemento `<amp-story>` ao `<body>` do seu documento, e especifique o atributo obrigatório `standalone` da seguinte forma:

```html
<body>
  <amp-story standalone>
  </amp-story>
</body>
```

É importante observar que, para ter uma história AMP válida, o elemento `<body>` deve ter apenas um elemento-filho - o componente [`amp-story`](../../../../documentation/components/reference/amp-story.md); todos os outros elementos estão contidos no [`amp-story`](../../../../documentation/components/reference/amp-story.md).

## Fornecendo meta informação

Para que as histórias sejam descobertas na web, certos metadados são necessários para fornecer pequenos detalhes da história, como:

- O título da história, representado pelo atributo `title` (por exempli: "Joy of Pets").
- O nome do editor, representado pelo atributo `publisher` (por exemplo: "AMP tutorials").
- O logotipo do editor, representado pelo atributo `publisher-logo-src`.  Esta é uma URL para a imagem do logotipo, na forma de um quadrado com proporções 1x1.
- Uma imagem de pôster da história, representada pelo atributo `poster-portrait-src`. Esta é uma URL para o pôster e a imagem deve estar no formato retrato com proporção de 3x4.

Vamos acrescentar esses atributos na nossa tag [`amp-story`](../../../../documentation/components/reference/amp-story.md):

```html
<amp-story standalone
    title="Joy of Pets"
    publisher="AMP tutorials"
    publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
    poster-portrait-src="assets/cover.jpg">
```

Além desses atributos obrigatórios, existem outros atributos que você pode aplicar. Para saber mais, veja a seção [atributos](../../../../documentation/components/reference/amp-story.md#attributes) da documentação de referência do [`amp-story`](../../../../documentation/components/reference/amp-story.md).

[tip type="note"] **OBSERVAÇÃO - ** Estes atributos de metadados complementam mas não substituem quaisquer dados estruturados (por exemplo, JSON-LD) na página. Para garantir que suas Histórias Web sejam descobertas em todas as plataformas, você deve adicionar [dados estruturados](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md#integrate-with-third-party-platforms-through-additional-metadata) a todas as suas páginas AMP, inclusive histórias AMP. [/tip]

Nesse ponto, temos a estrutura de uma história sem nenhum conteúdo. Vamos criar essa página.
