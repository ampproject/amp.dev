---
$title: Preparar sua página para descoberta e distribuição
---

Em alguns casos, você pode querer uma versão não AMP e uma versão AMP da mesma página, por exemplo, no caso de um artigo de notícia. Considere o seguinte: se a Pesquisa do Google encontrar uma versão não AMP dessa página, *como saberá que há uma versão AMP dela*?

## Páginas vinculadas com um link&lt;>

Para solucionar esse problema, adicionamos informações sobre a página AMP na página não AMP e vice-versa, na forma de tags de `<link>` no elemento `<head>`.

Adicione o seguinte à página não AMP:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Adicione isto à página AMP

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

## E se eu só tiver uma página?

Se você só tiver uma página, e essa página for AMP, ainda assim deverá adicionar o link canônico a ela, mas ele simplesmente apontará para a própria página:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/preview_and_validate.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/create/publish.md', locale=doc.locale).url.path}}"><span class="arrow-next">Próxima</span></a>
</div>
