---
layout: page
title: Preparar sua página para descoberta e distribuição
order: 4
locale: pt-br
---

Em alguns casos, você pode querer uma versão não AMP e uma versão AMP da mesma página, por exemplo, no caso de um artigo de notícia. Considere o seguinte: se a Pesquisa do Google encontrar uma versão não AMP dessa página, *como saberá que há uma versão AMP dela*?

## Páginas vinculadas com um link&lt;>

Para solucionar esse problema, adicionamos informações sobre a página AMP na página não AMP e vice-versa, na forma de tags de `<link>` no elemento `<head>`.

Adicione o seguinte à página não AMP:

{% highlight html %}
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
{% endhighlight %}

Adicione isto à página AMP

{% highlight html %}
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
{% endhighlight %}

## E se eu só tiver uma página?

Se você só tiver uma página, e essa página for AMP, ainda assim deverá adicionar o link canônico a ela, mas ele simplesmente apontará para a própria página:

{% highlight html %}
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
{% endhighlight %}

{% include button.html title="Continuar para a etapa 6" link="/docs/get_started/create/publish.pt-br.html" %}
