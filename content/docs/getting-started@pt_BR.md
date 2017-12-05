---
$title: Primeiros passos
$order: 0
toc: true
---
[TOC]

Este guia de início rápido ajudará você nos primeiros passos com as AMP.

Para ver instruções mais detalhadas, acesse o tutorial [criar sua primeira página AMP](/pt_br/docs/tutorials/create.html).

### Etapa 1: usar o modelo de HTML para AMP

Este é o HTML básico que você precisa ter em uma página AMP:

```html
<!doctype html>
<html ⚡>
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello AMP world</title>
    <link rel="canonical" href="hello-world.html">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <h1>Hello AMP World!</h1>
  </body>
</html>
```

{% call callout('Leia mais', type='read') %}
Saiba mais sobre a [marcação necessária](/pt_br/docs/reference/spec.html#required-markup) para páginas AMP.
{% endcall %}

### Etapa 2: adicionar componentes à página

Crie sua página AMP adicionando componentes, como imagens:

```html
<amp-img src="https://www.ampproject.org/examples/images/amp.jpg"
  width="900" height="508" layout="responsive"></amp-img>
```

ou vídeos do YouTube:

```html
<!-- este script é obrigatório para amp-youtube e deve estar na seção <head> -->
<script async custom-element="amp-youtube"
      src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>

…

<amp-youtube data-videoid="9Cfxm7cikMY"
    layout="responsive"
    width="480" height="270"></amp-youtube>
```

Há muito mais opções. Veja uma lista de [componentes disponíveis para as AMP](/pt_br/docs/reference/components.html).

### Etapa 3: definir o estilo dos seus elementos

Para definir o estilo dos elementos nas suas páginas AMP, adicione CSS em uma folha de estilo chamada `<style amp-custom>` na seção `<head>` do documento:

```html
<style amp-custom>
  amp-img {
    margin: 0.5em;
  }
  body {
    max-width: 900px;
  }
</style>
```

{% call callout('Leia mais', type='read') %}
Saiba mais sobre o [CSS compatível](/pt_br/docs/guides/responsive/style_pages.html) com páginas AMP.
{% endcall %}

### Etapa 4: validar o HTML para AMP

Use o [validador de AMP](https://validator.ampproject.org/) e confira se o HTML para AMP das páginas é válido.

Para ver outras ferramentas de validação que você pode usar, acesse a página sobre como [validar páginas AMP](/pt_br/docs/guides/validate.html).

### Próximas etapas

Para conhecer melhor os aspectos básicos das páginas AMP, acesse o tutorial sobre como [criar sua primeira página AMP](pt_br/docs/tutorials/create.html).

Veja outros recursos para aprimorar sua experiência:

* [Permita que sua página seja detectada](/pt_br/docs/guides/discovery.html).
* [Adicione análises à página](/pt_br/docs/guides/analytics_amp.html).
* [Melhore o engajamento dos usuários](/pt_br/docs/guides/engagement.html).
* Veja demonstrações ativas no site [AMP BY Example](https://ampbyexample.com).
 
 
