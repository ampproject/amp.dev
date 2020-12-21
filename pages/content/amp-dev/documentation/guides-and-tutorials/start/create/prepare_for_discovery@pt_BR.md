---
"$title": Prepare your page for discovery and distribution
"$order": '4'
description: 'Em alguns casos, você pode querer uma versão não-AMP e uma versão AMP da mesma página, por exemplo, no caso de um artigo de notícia. Considere o seguinte: se a Busca do Google ...'
author: pbakaus
contributors:
- bpaduch
---

Em alguns casos, você pode querer uma versão não-AMP e uma versão AMP da mesma página, por exemplo, no caso de um artigo de notícia. Considere o seguinte: se a Busca do Google encontrar uma versão não-AMP dessa página, *como saberá que há uma versão AMP dela*?

## Páginas vinculadas com <code><link></code>

Para solucionar esse problema, adicionamos informações sobre a página AMP na página não-AMP e vice-versa, na forma de tags `<link>` no elemento `<head>`.

Adicione o seguinte à página não-AMP:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Adicione isto à página AMP

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## E se eu só tiver uma página?

Se você só tiver uma página, e essa página for AMP, ainda assim deverá adicionar o link canônico a ela, mas ele simplesmente apontará para ela mesma:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"] **LEIA MAIS –** Saiba como o Google encontra páginas AMP em [Diretrizes para páginas AMP em Buscas do Google](https://support.google.com/webmasters/answer/6340290). [/tip]
