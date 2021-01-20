---
"$title": Getting familiar with the starter code
"$order": '1'
description: Uma página AMP é uma página HTML com algumas restrições que proporcionam um desempenho estável. As páginas AMP têm algumas marcações especiais que as identificam como AMP.
---

## Texto informativo sobre as AMP

As AMP são páginas HTML com algumas restrições que proporcionam um desempenho estável. As páginas AMP têm algumas marcações especiais que as identificam como AMP.

A estrutura básica de uma página AMP é a seguinte:

```html
<!DOCTYPE html>
<html amp>
  <head>
    <meta charset="utf-8" />
    <link rel="canonical" href="hello-world.html" />
    <meta name="viewport" content="width=device-width" />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    Hello World!
  </body>
</html>
```

O código inicial do tutorial ([`static/index.html`](https://github.com/googlecodelabs/advanced-interactivity-in-amp/blob/master/static/index.html), página em inglês) cria a estrutura básica da página AMP com os conteúdos associados (imagens, texto etc.), além de incluir alguns componentes AMP:

## Componentes AMP

Os componentes AMP oferecem elementos de IU e recursos adicionais que dão uma interatividade avançada às páginas AMP. O código inicial usa os seguintes componentes AMP:

```html
<script
  async
  custom-element="amp-carousel"
  src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"
></script>
<script
  async
  custom-template="amp-mustache"
  src="https://cdn.ampproject.org/v0/amp-mustache-0.1.js"
></script>
<script
  async
  custom-element="amp-form"
  src="https://cdn.ampproject.org/v0/amp-form-0.1.js"
></script>
<script
  async
  custom-element="amp-selector"
  src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"
></script>
```

O código inicial oferece alguns elementos de interatividade básica:

- [`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md): é um carrossel de imagens que exibe várias visualizações do produto.
- [`amp-mustache`](../../../../documentation/components/reference/amp-mustache.md): é um sistema de modelos que renderiza as respostas do servidor de amp-form.
- [`amp-form`](../../../../documentation/components/reference/amp-form.md): adiciona aos elementos `<form>` recursos especiais que são necessários paras as páginas AMP.
- [`amp-selector`](../../../../documentation/components/reference/amp-selector.md): oferece uma forma semântica de selecionar um ou mais elementos de um grupo. Pode ser usado como origem de entrada para amp-form.

## Interatividade básica

**Faça um teste**: deslize o carrossel de imagens e toque no botão "Adicionar ao carrinho".

- O carrossel de imagens ([`amp-carousel`](../../../../documentation/components/reference/amp-carousel.md)) exibe várias visualizações do produto.
- O produto será adicionado ao carrinho do usuário (por [`amp-form`](../../../../documentation/components/reference/amp-form.md)) quando ele clicar no botão "Adicionar ao carrinho" na parte inferior da página.

**Faça um teste**: deslize o carrossel de imagens e toque no botão "Adicionar ao carrinho".
