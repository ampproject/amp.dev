---
'$title': Crie sua página AMPHTML
$order: 1
description: Ao criar páginas e conteúdos AMP, é recomendado usar o protocolo HTTPS em vez de HTTP. O HTTPS não é obrigatório para documentos AMP ...
author: pbakaus
contributors:
  - bpaduch
---

O código de marcação a seguir é um bom ponto de partida ou boilerplate. Copie e salve esse código num arquivo com extensão .html.

[sourcecode:html]

<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <title>Hello, AMPs</title>
    <link rel="canonical" href="{{doc.url}}">
    <meta name="viewport" content="width=device-width">
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
  </head>
  <body>
    <h1>Welcome to the mobile web</h1>
  </body>
</html>
[/sourcecode]

Até agora, o conteúdo no corpo da página é bem simples. No entanto, talvez alguns códigos adicionais no cabeçalho da página não sejam tão óbvios. Vamos analisar em detalhes a marcação obrigatória.

Use HTTPS: ao criar páginas e conteúdos AMP, é recomendado usar o protocolo HTTPS em vez de HTTP. O HTTPS não é obrigatório para documentos AMP, imagens nem fontes. No entanto, muitos recursos do AMP exigem HTTPS (por exemplo, vídeos, iframes e muito mais). Para garantir que suas páginas AMP aproveitem todos os recursos disponíveis, use o protocolo HTTPS. Se quiser saber mais sobre o HTTPS, leia o artigo [Por que o HTTPS é importante?](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https).

[tip type="tip"] Use o [Gerador de AMP Boilerplate](/boilerplate) para começar a criar novas páginas AMP rapidamente. [/tip]

## Marcação obrigatória

Documentos AMPHTML DEVEM obedecer as regras a seguir:

| Regra                                                                                                                                    | Descrição                                                                                                                                                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Começar com o doctype ` <!doctype html>`                                                                                                 | É o padrão para HTML.                                                                                                                                                                                                                                                |
| Conter uma tag ` <html ⚡>` de nível superior <br>(também pode-se usar a tag ` <html amp>`)                                              | Identifica a página como conteúdo AMP.                                                                                                                                                                                                                               |
| Conter as tags `<head>` e `<body>`                                                                                                       | É opcional para HTML, mas obrigatório em páginas AMP.                                                                                                                                                                                                                |
| Conter uma tag ` <meta charset="utf-8">` que seja a primeira dentro da tag ` <head>`                                                     | Identifica a codificação da página.                                                                                                                                                                                                                                  |
| Conter uma tag ` <script async src="https://cdn.ampproject.org/v0.js"></script>` como segunda filha da tag `<head>`                      | Inclui e carrega a biblioteca JavaScript AMP.                                                                                                                                                                                                                        |
| Conter uma tag ` <link rel="canonical" href="$ALGUM_URL">` dentro de ` <head>`                                                           | Direciona para a versão em HTML comum do documento AMPHTML. Caso essa versão não exista, essa tag redirecionará para o próprio documento. Saiba mais em [Torne sua página detectável](../../../../documentation/guides-and-tutorials/optimize-measure/discovery.md). |
| Conter uma tag `<meta name="viewport" content="width=device-width">o: incluir também`initial-scale=1`)                                   | Especifica uma janela de visualização responsiva. Saiba mais em [Criar páginas AMP responsivas](../../../../documentation/guides-and-tutorials/develop/style_and_layout/responsive_design.md).                                                                       |
| Conter uma tag de [código de boilerplate AMP](../../../../documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md) em ` <head>` | O boilerplate CSS deve ocultar inicialmente o conteúdo até que a biblioteca de JavaScript AMP seja carregada.                                                                                                                                                        |

## Metadados opcionais

Além dos requisitos básicos, nosso exemplo também inclui a definição da Schema.org dentro do cabeçalho. Essa definição não é obrigatória para páginas AMP, mas é um requisito para que seu conteúdo seja distribuído em certos locais, como no carrossel de notícias principais da Busca do Google.

[tip type="read-on"] Acesse estes recursos para saber mais:

- [Primeiros passos com as AMP na Busca Google](https://developers.google.com/amp/docs): aprenda a preparar as páginas AMP para a Pesquisa Google.
- [Amostras de metadados](https://github.com/ampproject/amphtml/tree/main/examples/metadata-examples): saiba mais sobre todos os metadados necessários em outros lugares, por exemplo, no Twitter. [/tip]

<hr>

Temos boas notícias! Isso é tudo que você precisa para criar sua primeira página AMP. Claro que, a essa altura, ela ainda não possui muito conteúdo no corpo. Na próxima seção, veremos como adicionar recursos básicos, como imagens e elementos AMP personalizados, estilizar a página e criar um layout responsivo.
