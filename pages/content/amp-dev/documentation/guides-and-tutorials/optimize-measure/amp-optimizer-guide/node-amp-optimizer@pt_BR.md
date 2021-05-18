---
'$title': Guia do Otimizador AMP do Node.js
$order: 2
description: Este guia explica como configurar e usar a versão Node.js do Otimizador AMP.
formats:
  - websites
  - stories
author: sebastianbenz
---

Este guia explica como configurar e usar a versão Node.js do Otimizador AMP.

## Configuração

Instale via NPM usando:

```shell
npm install @ampproject/toolbox-optimizer
```

## Uso

A API do Otimizador AMP recebe uma string HTML como entrada e retorna uma versão otimizada dessa string HTML. O uso básico é ilustrado abaixo:

```js
const AmpOptimizer = require('@ampproject/toolbox-optimizer');

// create the AMP Optimizer instance
const ampOptimizer = AmpOptimizer.create();

const html = '<h1>Hello World!</h1>';

const optimizedHtml = await ampOptimizer.transformHtml(html);
```

### Criação de AMP otimizado no tempo de build

Para sites estáticos, o ideal é otimizar as páginas AMP em tempo de build, ao criar seu site. Eis um exemplo de como você o poderia integrá-lo a um build baseado no [Gulp.js](https://gulpjs.com/). Este exemplo adiciona uma transformação personalizada que otimiza todos os arquivos HTML dentro da pasta src:

```js
const {src, dest} = require('gulp');
const through2 = require('through2');

const AmpOptimizer = require('@ampproject/toolbox-optimizer');
const ampOptimizer = AmpOptimizer.create();

function build(cb) {
  return src('src/*.html')
    .pipe(
      through2.obj(async (file, _, cb) => {
        if (file.isBuffer()) {
          const optimizedHtml = await ampOptimizer.transformHtml(
            file.contents.toString()
          );
          file.contents = Buffer.from(optimizedHtml);
        }
        cb(null, file);
      })
    )
    .pipe(dest('dist/'));
}

exports.default = build;
```

### Tempo de renderização

Para páginas dinâmicas, muitas vezes é necessário renderizar as páginas no servidor. Nesse caso, você pode executar o Otimizador AMP depois de renderizar suas páginas. Eis um exemplo de integração num servidor [Express.js](https://expressjs.com/). Uma maneira de integrar a otimização de AMP a um router Express é executá-lo num callback depois que os modelos forem [renderizados](https://expressjs.com/en/api.html#app.render):

```js
const express = require('express');
const router = express.Router();
const AmpOptimizer = require('@ampproject/toolbox-optimizer');
const ampOptimizer = AmpOptimizer.create();

router.get('/', (req, res) => {
  const locals = {title: 'Express with AMP Optimizer'};
  res.render('index', locals, async (err, html) => {
    const optimizedHtml = await ampOptimizer.transformHtml(html);
    res.send(optimizedHtml);
  });
});

module.exports = router;
```

Importante: certifique-se de configurar o cache ou um CDN quando usar o Otimizador AMP no servidor para evitar atrasos na renderização.

## Configuração

O Otimizador AMP fornece uma configuração default mínima que deve funcionar bem na maioria dos casos. No entanto, as transformações podem ser personalizadas para casos de uso específicos. Você encontra uma lista de todas as opções disponíveis [aqui](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer#options).

Algumas opções notáveis são:

- `lts: true` para habilitar [URLs long-term stable <br> (LTS)](https://github.com/ampproject/amphtml/blob/main/docs/lts-release.md) para o runtime AMP e componentes.
- `verbose: true` para saídas de depuração detalhadas. Ideal para identificar os motivos pelos quais o boilerplate AMP não pôde ser removido.
- `imageOptimizer`: habilita a geração automática do srcset da imagem, fornecendo uma função que calcula as URLs do srcset para um determinado src de imagem. A função deve retornar uma URL apontando para uma versão da imagem `src` com a largura fornecida. Se nenhuma imagem estiver disponível, ele retorna um valor falso. Mais sobre isto na próxima seção.

### Otimização de imagens

Um Otimizador AMP pode gerar valores `srcset` para um determinado `amp-img` com base na sua definição de `layout`. Para que isto funcione, você precisa fornecer uma função que mapeie o `src` da imagem e uma `width` para um valor de `srcset` redimensionado. O redimensionamento da imagem não é executado pelo Otimizador AMP e precisa acontecer no momento do build (por exemplo, para sites estáticos) ou através de um serviço de hospedagem de imagem, como o [thumbor](https://github.com/thumbor/thumbor).

Eis um exemplo de implementação que anexa a largura da imagem ao `src`:

```js
const ampOptimizer = AmpOptimizer.create({
  // parameters are the amp-img `src` and the `width` of the to be generated srcset source value
  imageOptimizer: (src, width) => {
    // we cannot rename if the image does not have a file extension
    const index = src.lastIndexOf('.');
    if (index === -1) {
      // return null means we won't generate a srcset source value for this width
      return null;
    }
    const prefix = src.substring(0, index);
    const postfix = src.substring(index, src.length);
    return `${prefix}.${width}w${postfix}`;
  };
})
```

Usando esta implementação, o Otimizador AMP transformará as seguintes declarações de `amp-img`:

```html
<!-- Injects srcset for responsive layout -->
<amp-img
  src="image1.png"
  width="400"
  height="800"
  layout="responsive"
></amp-img>
<!-- Ignores existing srcset -->
<amp-img
  layout="fill"
  srcset="image-1x.png 1x,
                             image-2x.png 2x"
></amp-img>
```

em:

```html
<!-- Injects srcset for responsive layout -->
<amp-img
  src="image1.png"
  width="400"
  height="800"
  layout="responsive"
  srcset="image1.470w.png 470w, image1.820w.png 820w, image1.1440w.png 1440w"
></amp-img>
<!-- Ignores existing srcset -->
<amp-img
  layout="fill"
  srcset="image-1x.png 1x,
                               image-2x.png 2x"
></amp-img>
```

Dica: Ao utilizar `layout=responsive` use os atributos `width` e `height`para especificar as dimensões mínimas da imagem. Por exemplo, para uma imagem hero sem margens no celular, especifique a largura como `width=320`.
