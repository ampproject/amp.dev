---
$title: Guía para utilizar el Optimizador de AMP Node.js
$order: 2
description: En esta guía se explica cómo configurar y utilizar la versión Node.js del optimizador de AMP.
author: sebastianbenz
---

En esta guía se explica cómo configurar y utilizar la versión Node.js del optimizador de AMP.

## Configuración

Instálelo mediante NPM utilizando:

```shell
npm install @ampproject/toolbox-optimizer
```

## Cómo utilizarlo

La API del Optimizador de AMP acepta una cadena HTML como entrada y devuelve una versión optimizada de la cadena HTML. El uso básico tiene el siguiente aspecto:

```js
const AmpOptimizer = require('@ampproject/toolbox-optimizer');

// create the AMP Optimizer instance
const ampOptimizer = AmpOptimizer.create();

const html = '<h1>Hello World!</h1>';

const optimizedHtml = await ampOptimizer.transformHtml(html);
```

### Cómo crear páginas AMP optimizadas en el momento de la compilación

Para los sitios estáticos lo mejor es optimizar las páginas AMP en el momento que se compilan, es decir cuando se crea su sitio. En este ejemplo, se explica cómo sería la integración en una construcción basada en [Gulp.js](https://gulpjs.com/), además se agrega un convertidor personalizado que optimiza todos los archivos HTML dentro de la carpeta src:

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

### El tiempo de renderizado

Con frecuencia en las páginas dinámicas es necesario renderizar las páginas en el servidor. En este caso, puede ejecutar el optimizador de AMP después de renderizar sus páginas. Aquí encontrará un ejemplo para integrar un servidor [Express.js](https://expressjs.com/). Una manera de integrar la optimización de AMP en un enrutador Express es ejecutarlo en una llamada de retorno después de que se [rendericen](https://expressjs.com/en/api.html#app.render) las plantillas:

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

Importante: asegúrese de configurar el almacenamiento en el caché o una CDN cuando utilice el optimizador de AMP en el servidor, esto le permitirá evitar retrasos en la renderización.

## Configuración

El optimizador de AMP proporciona una configuración predeterminada bastante razonable, la cual debería funcionar bien en la mayoría de los casos. Sin embargo, las conversiones pueden personalizarse para casos de uso específicos. [Aquí](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer#options) puede encontrar una lista de todas las opciones disponibles.

Algunas de las opciones importantes son:

- `lts: true` se utiliza para habilitar [URL que sean estables a largo plazo](https://github.com/ampproject/amphtml/blob/main/contributing/lts-release.md) mediante el tiempo de ejecución y los componentes de AMP.
- `verbose: true` se utiliza para obtener salidas de depuración detalladas. Especialmente es bueno para identificar las razones por las que no se pudo eliminar el código repetitivo de AMP.
- `imageOptimizer` habilita la generación automática de imágenes srcset ya que proporciona una función para calcular las URL de srcset en una imagen src específica. La función debe devolver una URL que señale una versión de la imagen `src` con el ancho establecido. Si no hay ninguna imagen disponible, debe devolver un valor falso. Para obtener más información sobre este tema puede consultar la siguiente sección.

### Optimización de las imágenes

El optimizador de AMP puede generar valores `srcset` para un componente `amp-img` determinado que esté basado en su definición de `layout`. Para que esto funcione, es necesario proporcionar una función que asigne el `src` y el `width` de la imagen a un valor fuente `srcset` cuyo tamaño se haya modificado. El cambio en el tamaño de la imagen no se llevó a cabo a través del optimizador de AMP y debe realizarse en el momento de la compilación (por ejemplo, para sitios estáticos) o mediante un servicio de alojamiento de imágenes como [thumbor](https://github.com/thumbor/thumbor).

Aquí puede encontrar un ejemplo de una implementación que incorpora el ancho de la imagen al `src`:

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

Con esta implementación, el optimizador de AMP transformará las siguientes declaraciones desde `amp-img`:

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

en:

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

Sugerencia: cuando utilice `layout=responsive`, aproveche los atributos `width` y `height` para especificar las dimensiones mínimas de la imagen. Por ejemplo, para la imagen de un protagonista que ocupe toda la página de un dispositivo móvil, especifique el ancho como `width=320`.
