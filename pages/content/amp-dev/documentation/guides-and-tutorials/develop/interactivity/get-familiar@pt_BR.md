---
$title: Apresentação do código inicial
---

[TOC]

## Texto informativo sobre as AMP
As AMP são páginas HTML com algumas restrições que proporcionam um desempenho estável. As páginas AMP têm algumas marcações especiais que as identificam como AMP.

A estrutura básica de uma página AMP é a seguinte:

```html
<!doctype html>
<html amp>
<head>
   <meta charset="utf-8">
   <link rel="canonical" href="hello-world.html">
   <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
   <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
<body>Hello World!</body>
</html>
```

## Componentes AMP

O código inicial do tutorial ([`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html), página em inglês) cria a estrutura básica da página AMP com os conteúdos associados (imagens, texto etc.), além de incluir alguns componentes AMP:

```html
<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
<script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js"></script>
<script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
<script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"></script>
```

Os componentes AMP oferecem elementos de IU e recursos adicionais que dão uma interatividade avançada às páginas AMP. O código inicial usa os seguintes componentes AMP:

- [`<amp-carousel>`](/pt_br/docs/reference/components/amp-carousel.html): é um carrossel de imagens que exibe várias visualizações do produto.
- [`<amp-mustache>`](/pt_br/docs/reference/components/amp-mustache.html): é um sistema de modelos que renderiza as respostas do servidor de amp-form.
- [`<amp-form>`](/pt_br/docs/reference/components/amp-form.html): adiciona aos elementos `<form>` recursos especiais que são necessários paras as páginas AMP.
- [`<amp-selector>`](/pt_br/docs/reference/components/amp-form.html): oferece uma forma semântica de selecionar um ou mais elementos de um grupo. Pode ser usado como origem de entrada para amp-form.

## Interatividade básica

O código inicial oferece alguns elementos de interatividade básica:

- O carrossel de imagens (`<amp-carousel>`) exibe várias visualizações do produto.
- O produto será adicionado ao carrinho do usuário (por `<amp-form>`) quando ele clicar no botão "Adicionar ao carrinho" na parte inferior da página.


**Faça um teste**: deslize o carrossel de imagens e toque no botão "Adicionar ao carrinho".

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/prereqs-setup.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/advanced-interactivity.md', locale=doc.locale).url.path}}"><span class="arrow-next">Próxima</span></a>
</div>
 
