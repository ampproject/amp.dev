---
layout: page
title: O que é o AMP?
order: 0
locale: pt-br
---
<amp-youtube
    data-videoid="lBTCB7yLs8Y"
    layout="responsive"
    width="480" height="270">
</amp-youtube>

O AMP é uma maneira de criar páginas da Web para conteúdo estático com renderização rápida.
O AMP em ação consiste em três partes diferentes:

{% include toc.html %}

**AMP HTML** é o HTML com algumas restrições para um desempenho confiável
e algumas extensões para a criar conteúdo avançado além do HTML básico.
A biblioteca de **AMP JS** assegura a renderização rápida de páginas em AMP HTML.
O **Google AMP Cache** entrega (opcionalmente) as páginas em AMP HTML.

## AMP HTML

O AMP HTML é basicamente o HTML ampliado com propriedades de AMP personalizadas.
O arquivo AMP HTML mais simples tem esta aparência:

{% highlight html %}
<!doctype html>
<html ⚡>
 <head>
   <meta charset="utf-8">
   <link rel="canonical" href="hello-world.html">
   <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
   <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
   <script async src="https://cdn.ampproject.org/v0.js"></script>
 </head>
 <body>Hello World!</body>
</html>
{% endhighlight %}

Embora a maioria das tags em uma página em AMP HTML sejam tags normais de HTML,
algumas são substituídas por tags específicas do AMP (consulte também
[Tags HTML na especificação do AMP](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md)).
Esses elementos personalizados, chamados de componentes AMP HTML,
facilitam a implementação de padrões comuns, resultando em um bom desempenho.

Por exemplo, a tag [`amp-img`](/docs/reference/amp-img.html)
proporciona suporte total a `srcset` mesmo em navegadores que ainda não são compatíveis com esse recurso.
Saiba como [criar sua primeira página em AMP HTML](/docs/get_started/create_page.html).

## AMP JS

A [biblioteca de AMP JS](https://github.com/ampproject/amphtml/tree/master/src) implementa
todas as [melhores práticas de desempenho do AMP](/docs/get_started/technical_overview.html),
administra o carregamento de recursos e oferece as tags personalizadas mencionadas acima,
tudo para assegurar a renderização rápida de sua página.

Uma das principais otimizações é o fato de que ela torna assíncrono tudo o que vem de recursos externos, de modo que nenhum elemento da página possa bloquear a renderização de outros elementos.

Entre outras técnicas de desempenho está incluída a criação de uma sandbox para todos os iframes, o cálculo prévio do layout de cada elemento da página antes que os recursos sejam carregados e a desativação de seletores CSS lentos.

Para saber mais não só sobre as [otimizações](/docs/get_started/technical_overview.html) mas também as limitações, [leia a especificação do AMP HTML](https://github.com/ampproject/amphtml/blob/master/spec/amp-html-format.md).

## Google AMP Cache

O Google AMP Cache é uma rede de entrega de conteúdo baseado em proxy
para todos os documentos AMP válidos.
Ele recupera todas as páginas em AMP HTML, as armazena em cache e melhora o seu desempenho automaticamente.
Ao usar o Google AMP Cache, o documento, todos os arquivos JS e todas as imagens são carregadas
a partir da mesma origem que está usando
[HTTP 2.0](https://http2.github.io/) para obter a máxima eficiência.

O cache também vem com um
[sistema de validação](https://github.com/ampproject/amphtml/tree/master/validator)
 integrado que confirma a garantia de funcionamento da página
e sua não dependência de recursos externos.
O sistema de validação executa uma série de declarações
que confirmam que a marcação da página atende às especificações do AMP HTML.

Outra versão do validador é fornecida em conjunto com todas as páginas AMP. Essa versão pode registrar erros de validação diretamente no console do navegador quando a página é renderizada,
permitindo que você veja como alterações complexas em seu código
podem afetar o desempenho e a experiência do usuário.

Saiba mais sobre [como testar suas páginas em AMP HTML](/docs/guides/validate.html).
