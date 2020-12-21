---
formats:
- sites
"$title": Faça com que sua página seja descoberta
"$titles":
  teaser: Faça com que sua página seja descoberta
"$order": '5'
description: 'Em alguns casos, você pode querer uma versão não-AMP e uma versão AMP da mesma página, por exemplo, no caso de um artigo de notícia. Considere o seguinte: se a Busca do Google ...'
teaser:
  icon: discover
  text: Saiba como os mecanismos de pesquisa descobrem que existe uma versão AMP do seu site.
  label: Saiba mais
---

Em alguns casos, você pode ter uma versão AMP e uma não AMP da mesma página (um artigo de notícias, por exemplo). Se a Pesquisa Google encontrar a versão não AMP dessa página, como ela saberá que há uma versão AMP do conteúdo?

### Páginas vinculadas com <code><link></code>

Para resolver esse problema, adicionamos informações sobre a página AMP à versão não AMP e vice-versa usando tags `<link>` no `<head>`.

Adicione o seguinte à página não AMP:

[sourcecode:html]

<link rel="amphtml" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

Da mesma forma, inclua isto na página AMP:

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/full/document.html">
[/sourcecode]

### E se eu só tiver uma página?

Se você só tiver uma página, e ela for uma página AMP, ainda assim será preciso adicionar o link canônico (que levará à mesma página):

[sourcecode:html]

<link rel="canonical" href="https://www.example.com/url/to/amp/document.html">
[/sourcecode]

[tip type="read-on"] <strong>LEIA MAIS –</strong> Saiba mais sobre como o Google encontra páginas AMP nas [diretrizes da Pesquisa Google para páginas AMP](https://support.google.com/webmasters/answer/6340290). [/tip]

## Integração com plataformas de terceiros via metadados adicionais <a name="integrate-with-third-party-platforms-through-additional-metadata"></a>

Às vezes, um site de terceiros (que incorpora sua página AMP ou inclui links que levam a ela) precisa saber mais sobre sua página, além do fato de ela ser uma página AMP. As plataformas podem precisar de diversas informações sobre sua página, por exemplo: "é um artigo de notícias?", "é um vídeo?", "Ela possui uma captura de tela e uma breve descrição?"

Isso é relevante tanto para páginas AMP como para qualquer página Web. Em algumas plataformas, esses metadados são adicionais. Em outras, são um requisito, ou seja, **os links para seu conteúdo não serão exibidos se você não incluir os metadados corretos**. Verifique se você incluiu os metadados corretos nas plataformas em que pretende exibir seu conteúdo.

### Use Schema.org para a maioria dos mecanismos de pesquisa

O [Schema.org](http://schema.org/) (em inglês) oferece vocabulários abertos para a adição de metadados a todo tipo de conteúdo. No caso das páginas AMP, as propriedades que fazem sentido no contexto incluem o tipo específico de conteúdo (por exemplo, "artigo"), o título, a data de publicação e as imagens de visualização associadas.

Exemplo:

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

Há mais material na [pasta de exemplos do ampproject](https://github.com/ampproject/amphtml/tree/master/examples/metadata-examples), incluindo a sintaxe alternativa de atributo HTML.

[tip type="read-on"] Acesse estes recursos para saber mais sobre os dados estruturados:

- Saiba como [estruturar seu conteúdo para exibição na versão aprimorada da Busca do Google](https://developers.google.com/search/docs/guides/mark-up-content), por exemplo, notícias principais, carrossel, cards de receitas etc.
- Teste seus dados estruturados com a [Ferramenta de teste de dados estruturados do Google](https://developers.google.com/structured-data/testing-tool/). [/tip]

### Outros metadados para mais plataformas

Acesse o [guia Descoberta social no site Fundamentos da Web](https://developers.google.com/web/fundamentals/discovery-and-monetization/social-discovery/) para saber mais sobre as diferentes formas de preparar seu conteúdo para detecção e distribuição.
