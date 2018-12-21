---
$title: Configuração
---

## Pré-requisitos

**Para usar** este tutorial, você precisará do seguinte:

- conhecimento básico de HTML, CSS e JavaScript
- entendimento básico dos principais conceitos da tecnologia AMP (consulte o tutorial ["Converter HTML para AMP"]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/converting/index.md', locale=doc.locale).url.path}}))
- um navegador de sua escolha que possa inspecionar o Console JavaScript
- um editor de texto de sua preferência

## Como configurar seu ambiente de desenvolvimento

### Etapa 1. Fazer download do código

Faça o download do código de exemplo do tutorial como um [arquivo ZIP](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/archive/master.zip) ou por Git:

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-advanced.git
```

Descompacte o arquivo (caso necessário) e acesse o diretório do projeto por meio da linha de comando do computador.

```shell
cd accelerated-mobile-pages-advanced
```

O diretório do projeto contém diversos arquivos de recursos de exemplo e a página inicial [`article.amp.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html).

### Etapa 2. Executar a página de exemplo

Para testar a página AMP de exemplo, você precisa acessar os arquivos por meio de um servidor da Web. Existem várias maneiras de criar um servidor da Web temporário e local para fins de teste.  Estas são algumas opções, escolha a que funciona melhor para você:

- [Aplicativo do Google Chrome "Web Server for Chrome"](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Um servidor HTTP Python local](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

Observação: É altamente recomendável usar o HTTPS em ambientes de produção. O HTTPS oferece vários benefícios além da segurança, incluindo SEO. Se quiser saber mais sobre esse tópico, leia esta [postagem do blog do Google para webmasters](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html).

Após configurar o servidor da Web local, acesse o artigo de exemplo no navegador [neste URL](http://localhost:8000/article.amp.html):

```text
http://localhost:8000/article.amp.html
```

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/start/add_advanced/review_code.md', locale=doc.locale).url.path}}"><span class="arrow-next">Próxima</span></a>
</div>
