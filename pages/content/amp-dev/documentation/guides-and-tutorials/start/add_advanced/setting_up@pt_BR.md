---
'$title': Setting up
$order: 0
description: 'Para usar este tutorial, você precisará do seguinte: - Conhecimento básico de HTML, CSS e JavaScript - Entendimento básico dos principais conceitos da tecnologia AMP (consulte o tutorial ...'
'$parent': '/content/docs/fundamentals/add_advanced.md'
---

## Pré-requisitos

**Para usar** este tutorial, você precisará do seguinte:

- Conhecimento básico de HTML, CSS e JavaScript
- Entendimento básico dos principais conceitos da tecnologia AMP (consulte o tutorial ["Converta seu HTML para AMP"](../../../../documentation/guides-and-tutorials/start/converting/index.md))
- Um navegador de sua escolha que possa inspecionar o console JavaScript
- Um editor de texto de sua preferência

## Como configurar seu ambiente de desenvolvimento

### Etapa 1. Baixe o código

Faça o download do código de exemplo do tutorial como um [arquivo ZIP](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/archive/master.zip) ou por Git:

```shell
git clone https://github.com/googlecodelabs/accelerated-mobile-pages-advanced.git
```

Descompacte o arquivo (caso necessário) e acesse o diretório do projeto por meio da linha de comando do computador.

```shell
cd accelerated-mobile-pages-advanced
```

O diretório do projeto contém diversos arquivos de recursos de exemplo e a página inicial [`article.amp.html`](https://github.com/googlecodelabs/accelerated-mobile-pages-advanced/blob/master/article.amp.html).

### Etapa 2. Execute a página de exemplo

Para testar a página AMP de exemplo, você precisa acessar os arquivos através de um servidor Web. Existem várias maneiras de criar um servidor Web temporário e local para fins de teste. Estas são algumas opções, escolha a que funciona melhor para você:

- [Aplicativo do Google Chrome "Web Server for Chrome"](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [Um servidor HTTP Python local](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

[tip type="note"] <strong>OBSERVAÇÃO –</strong> É altamente recomendável usar o HTTPS em ambientes de produção. O HTTPS oferece vários benefícios além da segurança, incluindo SEO. Se quiser saber mais sobre esse tópico, leia esta [postagem do blog do Google para webmasters](https://webmasters.googleblog.com/2014/08/https-as-ranking-signal.html).[/tip]

Após configurar o servidor Web local, acesse o artigo de exemplo no navegador [nesta URL](http://localhost:8000/article.amp.html):

```text
http://localhost:8000/article.amp.html
```
