---
"$title": Checklist de publicação do AMP
"$order": '0'
description: O Web design responsivo é sobre a construção de páginas fluidas que atendem às necessidades do seu usuário - páginas que se ajustam ao tamanho da tela e orientação do dispositivo. Você pode alcançar...
formats:
- websites
author: CrystalOnScript
contributors:
- sebastianbenz
---

Siga esta checklist para dar ao seu site a experiência AMP mais completa!

# Garanta validação pela especificação AMP

O AMP vem com uma tonelada de benefícios integrados, como por exemplo, diminuir o tempo de espera do usuário ao pré-carregar o conteúdo dos caches AMP. Para obter esses benefícios, as páginas devem ser documentos AMP válidos. As páginas publicadas com erros relatados pelo AMP validator não são indexáveis pelos caches de AMP e, possivelmente, são servidas como páginas de erro.

Nunca publique uma página AMP inválida novamente. Use estas ferramentas:

- [Valide páginas AMP](../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md?format=websites)
- [O AMP Validator ](https://validator.ampproject.org/)
- [Google AMP Tester](https://search.google.com/test/amp)
- [AMP Linter](https://github.com/ampproject/amp-toolbox/tree/master/packages/linter)
- [AMP Tools](../../../documentation/tools.html?format=websites)

# Conceda acesso ao servidor de páginas AMP em cache

Boas notícias, as páginas AMP válidas são automaticamente aceitas em todos os caches AMP existentes! Isto significa que seus usuários aproveitam o conteúdo que carrega de forma eficiente e segura. Esses tipos de otimizações são muito bons, mas trazem um pequeno problema. Alguns usuários irão receber páginas AMP de domínios que não correspondem ao seu. Isto pode fazer com que as páginas percam o acesso aos dados do site ao usar componentes dinâmicos de AMP, como [`<amp-form>`](../../../documentation/components/reference/amp-form.md?format=websites) ou [`<amp-list>`](../../../documentation/components/reference/amp-list.md?format=websites). Esses tipos de erros são problemas de Compartilhamento de Recursos de Origem Cruzada ou CORS (Cross-Origin Resource Sharing). Trabalhe com segurança, não contra ela, ativando solicitações CORS de todos os [Caches AMP](https://cdn.ampproject.org/caches.json)! Se você estiver usando Node.js no seu back-end, você pode usar o [middleware amp-cors](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors).

Saiba mais sobre como conceder acesso ao servidor:

- [Como páginas AMP são armazenadas em cache](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md?format=websites)
- [CORS no AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cors-requests.md?format=websites)
- [AMP CORS Middleware](https://github.com/ampproject/amp-toolbox/tree/master/packages/cors) para Node.js

# Conteúdo seguro e compartilhável com trocas assinadas

Mantenha a URL do seu domínio e simplifique a análise ao compartilhar conteúdo através de trocas assinadas (SXG). Ao servir páginas AMP com SXG, as assinaturas digitais protegem suas informações vinculando o documento à sua URL de origem. Esse comportamento trata as sessões do usuário e os cookies como primários, fechando possíveis lacunas de análise. A implementação do SXG fornece conteúdo AMP assinado além do (em vez de "ao invés do") conteúdo AMP regular.

Saiba mais sobre a implementação de trocas assinadas:

- [Sirva AMP usando trocas assinadas](signed-exchange.md?format=websites)
- [Trocas HTTP assinadas](https://developers.google.com/web/updates/2018/11/signed-exchanges)
- [Cloudflare AMP Real URL](https://www.cloudflare.com/website-optimization/amp-real-url/)
- [Signed exchanges for better AMP URLs and easier analytics (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)

# Teste páginas em cache

Os caches AMP armazenam imagens, fontes e conteúdo de página para servir seu conteúdo aos usuários assim que eles desejarem. Com isto é importante testar se suas páginas AMP terão a aparência esperada e funcionarão conforme o esperado quando servidas por um cache AMP.

Ao adicionar páginas AMP a um cache AMP, verifique com as [ferramentas de desenvolvedor do seu navegador](https://developers.google.com/web/tools/chrome-devtools/) se todos os recursos externos são carregáveis. Aqui está uma lista para ter em mente:

- imagens
- vídeos
- endpoints amp-analytics
- endpoints amp-pixel
- fontes personalizadas
- iframes

Saiba mais sobre caches AMP:

- [Usando o Cache do Google AMP](../../../documentation/examples/documentation/Using_the_Google_AMP_Cache.html?format=websites)
- [AMP on Google, Google AMP Cache](https://developers.google.com/amp/cache/overview)
- [Depuração de problemas no Cache AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-debugging.md?format=websites)
- [Formato de URL do Cache AMP e Tratamento de Solicitações](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/amp-cache-urls.md?format=websites)

# Garanta que seus arquivos AMP possam ser descobertos por mecanismos de busca

As páginas criadas apenas com AMP (AMP first) e páginas com AMP dupla (paired AMP) precisam garantir que sejam localizáveis por mecanismos de busca. Todas as páginas AMP exigem `<link rel="canonical" href="$SOME_URL">` no seu `<head>`. Páginas AMP first precisam ter um link para si mesmas e as páginas paired AMP que são emparelhadas com uma página não AMP precisam ter um link interligando as duas.

Certifique-se de que seus metadados do [Schema.org](https://schema.org/) contenha informações úteis! Outros sites e mecanismos de pesquisa podem exigir isto para compartilhar seu conteúdo.

Web Robots, Web Wanderers, Crawlers ou Spiders são todos nomes de programas que procuram conteúdo. Eles percorrem a web, ajudando os mecanismos de busca a indexar o conteúdo da web para que as consultas do usuário possam apresentar os resultados corretos! Certifique-se de que seus buscadores possam encontrar seu site, incluindo as instruções adequadas no arquivo `robots.txt` e configurando os cabeçalhos apropriados.

NÃO exclua crawlers através do seu arquivo [robots.txt](https://support.google.com/webmasters/answer/6062608?hl=en).

```
User-agent: *
Disallow: /amp/                            <= don't!
```

NÂO adicione uma meta tag `noindex` aos seus arquivos AMP HTML.

```
<meta name="robots" content="noindex" />   <= don't!
```

NÃO inclua `noindex` como um cabeçalho HTTP X-Robots-Tag para seus arquivos AMP.

```
$ curl -I http://www.example.com/amp.html
HTTP/1.1 200 OK
Date: Tue, 25 May 2010 21:42:43 GMT
(…)
X-Robots-Tag: noindex                      <= don't!
(…)
```

Saiba como fazer com que suas páginas sejam descobertas:

- [Faça com que sua página seja descoberta ](discovery.md?format=websites)
- [Robots.txt](http://www.robotstxt.org/)
- [Especificações do Robots meta tag e especificações HTTP do X-Robots-Tag](https://developers.google.com/search/reference/robots_meta_tag)
- [FAQs sobre indexação de AMP](https://productforums.google.com/forum/?hl=en#!category-topic/webmasters/Vrgj-a-gtm0)

# Medindo o tráfego do usuário e jornadas

A coleta de métricas corretas é essencial para análises úteis. Ao testar como a introdução do AMP em seu site impactou seus usuários, verifique se você está medindo as coisas corretas. Podem surgir falsos negativos, falsos positivos ou resultados irrelevantes se a análise não levar em conta as diferenças que o AMP pode criar. Tenha certeza que você sabe o que está procurando e como medi-lo!

Saiba mais sobre como configurar análises adequadas para AMP:

- [Seu teste AMP não tem boa performance — e agora?](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Análises com cache vs. sem cache](https://support.google.com/analytics/answer/6343176?hl=en#cache)
- [Medindo jornadas do usuário através do Cache AMP e seu site](https://blog.amp.dev/2018/11/08/so-your-amp-test-doesnt-perform%e2%80%8a-%e2%80%8anow-what/)
- [Measuring success: What's new in AMP analytics & experiments (AMP Conf '19)](https://www.youtube.com/watch?v=wPW-kXsONqA&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=27)
- [Signed exchanges for better AMP URLs and easier analytics (AMP Conf '19)](https://www.youtube.com/watch?v=KrjBYzPUGnw&list=PLXTOW_XMsIDSY0USlzgoaIkRyPcHklrEl&index=22)
