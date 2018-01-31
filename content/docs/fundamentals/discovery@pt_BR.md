---
$title: Torne sua página detectável
---

[TOC]

Em alguns casos, você pode ter uma versão AMP e uma versão não AMP da mesma página, por exemplo, uma página com um artigo de notícias. Considere o seguinte: se a Pesquisa Google encontra a versão não AMP dessa página, como ela saberá que há uma versão AMP dela?

### Vinculação de páginas com `<link>`

A fim de resolver esse problema, nós adicionamos informações sobre a página AMP à página não AMP, e vice-versa, sob a forma de tags `<link>` no `<head>`.

Adicione o seguinte conteúdo à página não AMP:

[sourcecode:html]
<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

E isto à página AMP:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### E se eu tiver apenas uma página?

Se você tiver apenas uma página, e ela for AMP, precisará adicionar o link canônico a ela, que levará à própria página:

[sourcecode:html]
<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

## Integração a plataformas de terceiros por meio de metadados adicionais

Às vezes, um site de terceiros (que incorpora sua página AMP ou inclui links que levam a ela) precisa saber mais sobre sua página, além do fato de ela ser uma página AMP. As plataformas podem precisar de diversas informações sobre a sua página, como se ela é um artigo de notícias ou um vídeo e se ela tem uma captura de tela e uma breve descrição, entre outras.

Isso não é relevante apenas para as páginas AMP, mas para todas as páginas da Web. Em algumas plataformas, esses metadados são adicionais. Em outras, eles são um requisito, ou seja, **os links para o seu conteúdo não serão exibidos se você não incluir os metadados certos**. Verifique se você incluiu os metadados certos nas plataformas em que deseja exibir seu conteúdo.

### Use Schema.org na maioria dos mecanismos de pesquisa

O [Schema.org](http://schema.org/) oferece vocabulários abertos para a adição de metadados a todos os tipos de conteúdo. No caso da AMP, as propriedades que fazem sentido nesse contexto incluem o tipo específico de conteúdo (por exemplo, "artigo"), o título, a data de publicação e as imagens de visualização associadas.

Por exemplo:

[sourcecode:html]
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": "http://cdn.ampproject.org/article-metadata.html",
    "headline": "Lorem Ipsum",
    "datePublished": "1907-05-05T12:02:41Z",
    "dateModified": "1907-05-05T12:02:41Z",
    "description": "The Catiline Orations continue to beguile engineers and designers alike -- but can it stand the test of time?",
    "author": {
      "@type": "Person",
      "name": "Jordan M Adler"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Google",
      "logo": {
        "@type": "ImageObject",
        "url": "http://cdn.ampproject.org/logo.jpg",
        "width": 600,
        "height": 60
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "http://cdn.ampproject.org/leader.jpg",
      "height": 2000,
      "width": 800
    }
  }
</script>
[/sourcecode]

Mais exemplos podem ser encontrados na [pasta de exemplos do ampproject](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples), incluindo a sintaxe de atributo HTML alternativo.

Observação: esta definição do Schema.org é um requisito que qualifica seu conteúdo para ser apresentado na demonstração do [carrossel de notícias da Pesquisa Google (experimente no seu dispositivo móvel)](https://g.co/ampdemo).
Veja também [Notícias principais com a AMP](https://developers.google.com/structured-data/carousels/top-stories) e a [ferramenta de teste de dados estruturados](https://developers.google.com/structured-data/testing-tool/).

### Outros metadados para mais plataformas

Consulte o [guia para descobertas em mídias sociais em "Fundamentos da Web"](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/) para saber mais sobre as diferentes formas de preparar seu conteúdo para descoberta e distribuição.
