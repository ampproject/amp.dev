---
layout: page
title: Criar sua página em AMP HTML
order: 0
locale: pt-br
---

A marcação a seguir é um ponto de partida ou texto clichê aceitável.
Copie e salve-a em um arquivo de extensão .html.

{% highlight html %}
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <title>Hello, AMPs</title>
    <link rel="canonical" href="http://example.ampproject.org/article-metadata.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "Open-source framework for publishing content",
        "datePublished": "2015-10-07T12:02:41Z",
        "image": [
          "logo.jpg"
        ]
      }
    </script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
{% endhighlight %}

O conteúdo do corpo, até agora, é bastante simples. No então, há muito código adicional no cabeçalho da página que pode não ser imediatamente óbvio. Vamos desconstruir a marcação obrigatória.

## Marcação obrigatória

Documentos em AMP HTML DEVEM:

  - Ser iniciados pelo doctype `<!doctype html>`.
  - Conter uma tag `<html ⚡>` de nível superior (`<html amp>` também é aceita).
  - Conter as tags `<head>` e `<body>` (elas são opcionais em HTML).
  - Conter uma tag `<link rel="canonical" href="$SOME_URL" />` dentro do cabeçalho que aponte para a versão em HTML comum do documento em AMP HTML, ou para o próprio documento se a versão em HTML não existir.
  - Conter uma tag `<meta charset="utf-8">` como primeira filha da tag do cabeçalho.
  - Conter uma tag `<meta name="viewport" content="width=device-width,minimum-scale=1">`dentro da tag do cabeçalho. Também é recomendável incluir initial-scale=1.
  - Conter uma tag `<script async src="https://cdn.ampproject.org/v0.js"></script>` como o último elemento do cabeçalho (isso inclui e carrega a biblioteca de AMP JS).
  - Conter o seguinte na tag `<head>`:
    `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`

## Metadados opcionais

Além dos requisitos básicos, nosso exemplo também inclui uma definição de Schema.org no cabeçalho, o que não é um requisito obrigatório para o AMP, mas é necessário para que seu conteúdo seja distribuído para certos lugares, como a [demonstração do carrossel de notícias da Pesquisa do Google (experimente no seu telefone)](https://g.co/ampdemo).

Para saber mais sobre todos os metadados necessários para outros locais, como o Twitter, [explore nossos exemplos](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples). Para saber especificamente sobre o AMP na Pesquisa do Google, consulte [Principais histórias com o AMP](https://developers.google.com/structured-data/carousels/top-stories).

<hr>

Boa notícia! Isso é tudo de que precisamos para criar nossa primeira página AMP, mas é claro que ainda falta muita coisa no corpo. Na próxima seção, abordaremos como adicionar itens básicos como imagens, elementos AMP personalizados, como compor o estilo da sua página e desenvolver um layout responsivo.

{% include button.html title="Continuar para a etapa 2" link="/docs/get_started/create/include_image.pt-br.html" %}
