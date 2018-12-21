---
$title: Tornar sua página detectável
---

Agora que você criou um artigo em AMP, vamos garantir que os usuários possam encontrar e descobrir seu conteúdo.

## Vincular conteúdo AMP

Seu site pode ser composto totalmente de páginas AMP, de algumas páginas AMP ou nenhuma.  Esta parte do tutorial abordará como incorporar AMP na estrutura do site.

A vinculação canônica em páginas HTML regulares é uma técnica comum para declarar a página que deve ser considerada a preferida quando várias páginas incluírem o mesmo conteúdo.

Uma abordagem comum ao adicionar AMP a um site é gerar versões AMP de páginas HTML tradicionais não AMP.  As duas versões têm geralmente o mesmo conteúdo (por exemplo, o texto de um artigo), mas podem ter apresentações diferentes.  Nesse cenário, é necessário tratar as páginas HTML tradicionais como as "canônicas" e associar as páginas AMP a elas.

Se possível, use as AMPs como qualquer outra biblioteca JavaScript para criar o site e não faça a vinculação canônica.  O uso de AMP para criar um site inteiro reduz drasticamente a necessidade de manutenção.

{{ image('/static/img/docs/tutorials/tut-convert-html-linking.png', 751, 500, align='center ninety', caption='Vincular conteúdo AMP') }}

Neste tutorial, veremos casos em que há versões AMP e não AMP de uma página.  O site deste tutorial inclui um artigo que tem uma página HTML não AMP (`article.html`) e uma versão AMP da página (`article.amp.html`).  Elas serão emparelhadas por meio de `link`s.

Já realizamos a primeira etapa para isso em nosso documento AMP ao incluir uma tag de vinculação em `<head>` na página canônica:

```html
<link rel="canonical" href="/article.html">
```

A próxima etapa é vincular o artigo canônico à página AMP. Para isso, incluiremos uma tag `<link rel="amphtml">` à seção `<head>` do artigo canônico.

No arquivo `article.html`, **adicione** o seguinte código à seção `<head>`:

```html
<link rel="amphtml" href="/article.amp.html">
```

O diagrama a seguir ilustra as direções das tags de vinculação:

{{ image('/static/img/docs/tutorials/tut-convert-html-link-between.png', 564, 238, align='ninety center', caption='Vincular conteúdo AMP') }}

É necessário configurar a vinculação bidirecional para que os mecanismos de pesquisa entendam a relação entre o documento canônico HTML e o documento AMP. Se não forem fornecidos links, não ficará claro para o rastreador qual artigo é a "versão AMP" do documento HTML normal. Ao fornecer explicitamente esses links, garantimos que não haja ambiguidade.

## Adicionar dados estruturados

Páginas AMP válidas não exigem dados estruturados [schema.org](http://schema.org/), mas algumas plataformas como a Pesquisa Google exigem isso para determinadas experiências (por exemplo, o carrossel de principais notícias). Em geral, recomendamos a inclusão de dados estruturados. Eles ajudam os mecanismos de pesquisa a entender melhor sua página da Web, além de exibir de maneira mais adequada seu conteúdo nas páginas de resultado do mecanismo de pesquisa (como em rich snippets).  Os dados estruturados são incluídos na tag `<head>` da sua página AMP por meio de uma tag de script do tipo `application/ld+json`.

Para nosso artigo, **adicione** os seguintes dados estruturados na parte inferior da seção `<head>` do seu documento AMP:

```html
<script type="application/ld+json">
{
"@context": "http://schema.org",
"@type": "NewsArticle",
"mainEntityOfPage":{
   "@type":"WebPage",
   "@id":"https://example.com/my-article.html"
},
"headline": "My First AMP Article",
"image": {
   "@type": "ImageObject",
   "url": "https://example.com/article_thumbnail1.jpg",
   "height": 800,
   "width": 800
},
"datePublished": "2015-02-05T08:00:00+08:00",
"dateModified": "2015-02-05T09:20:00+08:00",
"author": {
   "@type": "Person",
   "name": "John Doe"
},
"publisher": {
   "@type": "Organization",
   "name": "⚡ AMP Times",
   "logo": {
     "@type": "ImageObject",
     "url": "https://example.com/amptimes_logo.jpg",
     "width": 600,
     "height": 60
   }
},
"description": "My first experience in an AMPlified world"
}
</script>
```

Observação: O conteúdo deve ser sempre o mesmo. Para artigos, especifique o tipo "NewsArticle". O cabeçalho precisa corresponder ao título do artigo. O objeto de imagem faz referência à imagem principal do artigo.

**Atualize** a página no seu navegador e verifique se não há erros de validação de AMP.

[tip type="note"]
Além do formato de dados estruturados schema.org, há outros formatos compatíveis com mecanismos de pesquisa e redes de mídia social. Consulte a documentação de compatibilidade:

- [Metatags de cards do Twitter](https://dev.twitter.com/cards/overview)
- [Metatags de Open Graph do Facebook](https://developers.facebook.com/docs/sharing/webmasters)
[/tip]

### Validar os dados estruturados

Para verificar se os dados estruturados estão corretos, várias plataformas oferecem ferramentas de validação.  Neste tutorial, validaremos nossos dados estruturados com a [ferramenta de teste de dados estruturados do Google](https://developers.google.com/structured-data/testing-tool/).

1.  Em uma nova janela do navegador, abra a [ferramenta da teste de dados estruturados do Google](https://developers.google.com/structured-data/testing-tool/).
2.  Selecione a guia **Snippet de código**.
3.  Copie e cole todo o código-fonte da sua página AMP no painel de edição de texto da ferramenta de teste.
3.  Clique em **Realizar teste**.

Se os dados estruturados forem válidos, você verá **0 erros** e **0 avisos**.

<<<<<<< HEAD
Leia mais: Para saber mais sobre detecção de página, consulte o guia [Torne sua página detectável]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/discovery.md', locale=doc.locale).url.path}}).
=======
Leia mais: Para saber mais sobre detecção de página, consulte o guia [Torne sua página detectável]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/optimize-measure/discovery.md', locale=doc.locale).url.path}}).
>>>>>>> 3aeec0a67c667957f9f54faf118da91faf46313f

Bom trabalho!  Seu artigo em AMP está pronto!

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/resolving-errors.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/congratulations.md', locale=doc.locale).url.path}}"><span class="arrow-next">Próxima</span></a>
</div>
