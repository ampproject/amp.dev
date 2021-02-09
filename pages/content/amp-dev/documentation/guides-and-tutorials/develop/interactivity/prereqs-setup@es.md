---
'$title': Setting up
$order: 0
description: 'Antes de comenzar este tutorial, necesitará lo siguiente: - Conocimientos básicos de HTML, CSS, y JavaScript - Un navegador de su elección - Un editor de texto de...'
'$parent': '/content/docs/interaction_dynamic/interactivity.md'
---

## Requisitos previos

Antes de comenzar este tutorial, necesitará lo siguiente:

- Conocimientos básicos de HTML, CSS y JavaScript
- Un navegador de su elección
- Un editor de texto de su elección
- [Node.js y NPM](https://docs.npmjs.com/getting-started/installing-node) instalado en su máquina

## Configure su entorno de desarrollo

### Paso 1. Descargue el código

Descargue el código de inicio del tutorial como un [archivo ZIP](https://github.com/googlecodelabs/advanced-interactivity-in-amp/archive/master.zip) o mediante git:

```shell
git clone https://github.com/googlecodelabs/advanced-interactivity-in-amp.git
```

### Paso 2. Instale las dependencias

Descomprima el archivo (si es necesario) y navegue hasta el directorio. Instale las dependencias ejecutando `npm install`.

```shell
cd advanced-interactivity-in-amp
npm install
```

### Paso 3. Ejecute el servidor de desarrollo

Inicie el servidor de desarrollo con node.js:

```shell
node app.js
```

A continuación, vaya a <a href="http://localhost:3000">http://localhost:3000</a> en su navegador para ver la página de AMP en acción.
