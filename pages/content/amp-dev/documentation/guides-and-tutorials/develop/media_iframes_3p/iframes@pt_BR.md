---
'$title': Include iframes
$order: 10
description: Saiba como exibir conteúdo de mídia nas páginas e usar iframes para mostrar conteúdo avançado e superar as limitações do AMP.
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

## Conceitos básicos

Você pode exibir iframes na página usando o elemento [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md).

Nas páginas AMP, os iframes são úteis principalmente para exibir conteúdos incompatíveis no contexto da página principal, como os que exigem JavaScript criado pelo usuário.

### Requisitos do elemento `amp-iframe`:

- Precisa estar a uma distância de pelo menos **600 px** ou **75%** da primeira janela de visualização em relação à parte superior (exceto em iframes que usam um <a><code>placeholder</code></a>).
- Pode solicitar recursos somente através de HTTPS, e eles não podem estar na mesma origem que o container, a menos que não especifiquem o valor allow-same-origin.

[tip type="read-on"] <strong>LEIA MAIS –</strong>: Saiba mais nas [especificações completas do `amp-iframe`](../../../../documentation/components/reference/amp-iframe.md).[/tip]

### Inclua o script

Para incluir o [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) em sua página, inclua primeiro o script a seguir em `<head>`. Ele carregará código adicional para o componente estendido:

[sourcecode:html]

<script async custom-element="amp-iframe"
  src="https://ampjs.org/v0/amp-iframe-0.1.js"></script>

[/sourcecode]

### Escreva a marcação

No exemplo a seguir criamos um [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) responsivo para integrar um Mapa do Google através da [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/guide):

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

## Usando placeholders <a name="using-placeholders"></a>

É possível exibir um [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) na parte superior de um documento desde que o [`amp-iframe`](../../../../documentation/components/reference/amp-iframe.md) inclua um elemento com o atributo `placeholder` (por exemplo, um elemento [`amp-img`](../../../../documentation/components/reference/amp-img.md)) para ser renderizado como placeholder até que o iframe esteja pronto para exibição.

[tip type="read-on"] <strong>LEIA MAIS –</strong>: Saiba mais sobre placeholders em <a>iframe com placeholder</a>.[/tip]

Exemplo com placeholder:

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

Renderização do exemplo:

<amp-iframe width="400" height="225" sandbox="allow-scripts allow-same-origin" layout="responsive" src="https://giphy.com/embed/OWabwoEn7ezug"><amp-img placeholder layout="fill" src="https://ampproject-b5f4c.firebaseapp.com/examples/images/kittens-biting.jpg"></amp-img></amp-iframe>

## Exemplos

Veja mais exemplos avançados em [AMP através de exemplos](../../../../documentation/examples/documentation/amp-iframe.html).
