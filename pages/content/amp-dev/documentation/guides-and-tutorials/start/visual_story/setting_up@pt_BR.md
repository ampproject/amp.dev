---
'$title': Setting up
$order: 1
description: Como configurar seu ambiente de desenvolvimento Etapa 1. Baixe o código. Baixe o código de exemplo do tutorial como um arquivo ZIP ou via git ...
author: bpaduch
---

## Pré-requisitos

Para usar este tutorial, você precisará do seguinte:

- conhecimento básico de HTML, CSS e JavaScript
- entendimento básico dos principais conceitos da tecnologia AMP (consulte o tutorial ["Converter HTML para AMP"](../../../../documentation/guides-and-tutorials/start/converting/index.md))
- um navegador de sua preferência
- um editor de texto de sua preferência

## Como configurar seu ambiente de desenvolvimento

#### Etapa 1. Fazer o download do código

1. Acesse o seguinte URL e faça o download do código para o tutorial, que é compactado como um arquivo ZIP: <a href="/static/files/tutorials/amp-pets-story.zip">/static/files/tutorials/amp-pets-story.zip</a>

2. Extraia o conteúdo do arquivo ZIP. No diretório **amp-pets-story** estão os arquivos de imagem, vídeo, áudio e dados que usaremos para criar nossa história. O arquivo **pets.html** é nosso ponto de partida. Veja a versão completa da história no arquivo [pets-completed.html](https://github.com/ampproject/docs/blob/master/tutorial_source/amp-pets-story/pets-completed.html).

#### Etapa 2. Gerar a página de exemplo

Para testar nossa história de exemplo, é preciso acessar os arquivos por meio de um servidor da Web. Existem várias maneiras de criar um servidor da Web temporário e local para fins de teste. Estas são algumas opções, escolha a que funciona melhor para você:

- [Aplicativo do Google Chrome "Web Server for Chrome"](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)
- [um servidor HTTP Python local](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#Running_a_simple_local_HTTP_server)
- [Apache](https://httpd.apache.org/docs/2.4/getting-started.html)
- [nginx](http://nginx.org/)

Após configurar seu servidor da Web local, <a href="http://localhost:8000/pets-completed.html">acesse este URL</a> para ver como será a história completa ao final deste tutorial:

```html
http://localhost:8000/pets-completed.html
```

[tip type="important"]<br />O URL precisa ser disponibilizado por <code>localhost</code>. Caso contrário, a história AMP não será carregada corretamente, e talvez você veja erros como `"source" "must start with "https://" or "//" or be relative and served from either https or from localhost.`<br />[/tip]

Clique para ver a história concluída e ter uma ideia do resultado.
