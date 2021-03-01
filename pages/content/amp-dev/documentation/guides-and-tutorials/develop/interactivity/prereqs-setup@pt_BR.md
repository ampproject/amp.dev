---
'$title': Setting up
$order: 0
description: 'Para usar este tutorial, você precisará do seguinte: - Um conhecimento básico de HTML, CSS e JavaScript - Um navegador de sua preferência - Um editor de texto de ...'
'$parent': '/content/docs/interaction_dynamic/interactivity.md'
---

## Pré-requisitos

Para usar este tutorial, você precisará do seguinte:

- Um conhecimento básico de HTML, CSS e JavaScript
- Um navegador de sua preferência
- Um editor de texto de sua preferência
- [Node.js e NPM](https://docs.npmjs.com/getting-started/installing-node) (em inglês) instalados no seu computador

## Como configurar seu ambiente de desenvolvimento

### Etapa 1. Baixe o código

Faça download do código inicial do tutorial como um [arquivo ZIP](https://github.com/googlecodelabs/advanced-interactivity-in-amp/archive/master.zip) ou por Git:

```shell
git clone https://github.com/googlecodelabs/advanced-interactivity-in-amp.git
```

### Etapa 2. Instale as dependências

Descompacte o arquivo (caso necessário) e acesse o diretório. Use `npm install` para instalar as dependências.

```shell
cd advanced-interactivity-in-amp
npm install
```

### Etapa 3. Rode o servidor de desenvolvimento

Inicie o servidor de desenvolvimento com node.js:

```shell
node app.js
```

Depois disso, acesse <a href="http://localhost:3000">http://localhost:3000</a> no seu navegador da Web para ver a página AMP em funcionamento.
