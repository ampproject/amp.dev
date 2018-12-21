---
$title: Configuração
---

[TOC]

## Pré-requisitos

Para usar este tutorial, você precisará do seguinte:

- conhecimento básico de HTML, CSS e JavaScript
- um navegador de sua preferência
- um editor de texto de sua preferência
- [Node.js e NPM](https://docs.npmjs.com/getting-started/installing-node) (em inglês) instalados no seu computador

## Como configurar seu ambiente de desenvolvimento

### Etapa 1. Fazer download do código

Faça download do código inicial do tutorial como um [arquivo ZIP](https://github.com/googlecodelabs/advanced-interactivity-in-amp/archive/master.zip) ou por Git:

```shell
git clone https://github.com/googlecodelabs/advanced-interactivity-in-amp.git
```

### Etapa 2. Instalar as dependências

Descompacte o arquivo (caso necessário) e acesse o diretório. Use `npm install` para instalar as dependências.

```shell
cd advanced-interactivity-in-amp
npm install
```


### Etapa 3. Criar o servidor de desenvolvimento

Inicie o servidor de desenvolvimento com node.js:

```shell
node app.js
```

Depois disso, acesse <a href="http://localhost:3000">http://localhost:3000</a> no seu navegador da Web para ver a página AMP em funcionamento.

<div class="prev-next-buttons">
  <a class="button prev-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/index.md', locale=doc.locale).url.path}}"><span class="arrow-prev">Anterior</span></a>
  <a class="button next-button" href="{{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/get-familiar.md', locale=doc.locale).url.path}}"><span class="arrow-next">Próxima</span></a>
</div>
 
 
