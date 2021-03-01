---
'$title': "Guide de l'optimisation AMP Node.js"
$order: 2
description: "Ce guide explique comment configurer et utiliser la version Node.js de l'optimiseur AMP."
formats:
  - websites
  - stories
author: sebastianbenz
---

Ce guide explique comment configurer et utiliser la version Node.js de l'optimiseur AMP.

## Installation

Installez via NPM en utilisant :

```shell
npm install @ampproject/toolbox-optimizer
```

## Utilisation

L'API AMP Optimizer prend une chaîne HTML en entrée et renvoie une version optimisée de la chaîne HTML. L'utilisation de base ressemble à ceci :

```js
const AmpOptimizer = require('@ampproject/toolbox-optimizer');

// create the AMP Optimizer instance
const ampOptimizer = AmpOptimizer.create();

const html = '<h1>Hello World!</h1>';

const optimizedHtml = await ampOptimizer.transformHtml(html);
```

### Créer un AMP optimisé pendant le temps de génération

Pour les sites statiques, il est préférable d'optimiser les pages AMP pendant le temps de génération lors de la création de votre site. Voici un exemple de la façon dont vous l'intégreriez dans une compilation basée sur [ Gulp.js](https://gulpjs.com/). Cet exemple ajoute une transformation personnalisée qui optimise tous les fichiers HTML dans le dossier src :

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

### Temps de diffusion

Pour les pages dynamiques, il est souvent nécessaire de diffuser les pages sur le serveur. Dans ce cas, vous pouvez exécuter l'optimiseur AMP après la diffusion de vos pages. Voici un exemple d'intégration dans un serveur [Express.js](https://expressjs.com/). Une façon d'intégrer l'optimisation AMP dans un routeur Express est de l'exécuter dans un rappel après la [diffusion](https://expressjs.com/en/api.html#app.render) des modèles :

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

Important : assurez-vous de configurer la mise en cache ou un CDN lorsque vous utilisez l'optimiseur AMP sur le serveur pour éviter les retards de rendu.

## Configuration

L'optimiseur AMP fournit une configuration par défaut raisonnable qui devrait bien fonctionner dans la plupart des cas. Cependant, les transformations peuvent être personnalisées pour des cas d'utilisation spécifiques. Vous pouvez trouver une liste de toutes les options disponibles [ici](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer#options).

Quelques options notables sont :

- `lts: true` pour l'activation d'[URL stables à long terme](https://github.com/ampproject/amphtml/blob/main/contributing/lts-release.md) pour l'environnement d'exécution et les composants AMP.
- `verbose: true` pour les sorties de débogage détaillées. Particulièrement utile pour identifier les raisons pour lesquelles le passe-partout AMP n'a pas pu être retiré.
- `imageOptimizer` : permet la génération automatique de srcset d'images en fournissant une fonction de calcul des URL srcset pour une image src donnée. La fonction doit renvoyer une URL pointant vers une version de l'image `src` avec la largeur donnée. Si aucune image n'est disponible, elle doit renvoyer une valeur erronée. Plus d'informations à ce sujet sont fournies dans la section suivante.

### Optimisation d'image

L'optimiseur AMP peut générer des valeurs `srcset` pour un `amp-img` en fonction de sa définition de `layout`. Pour que cela fonctionne, vous devez fournir une fonction qui mappe le `src` et une `width` à une valeur source `srcset` redimensionnée. Le redimensionnement de l'image n'est pas effectué par l'optimiseur AMP et doit se produire soit au moment de la génération (par exemple pour les sites statiques), soit via un service d'hébergement d'images tel que [thumbor](https://github.com/thumbor/thumbor).

Voici un exemple d'implémentation qui ajoute la largeur de l'image au `src` :

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

En utilisant cette implémentation, l'optimiseur AMP transformera les déclarations `amp-img` :

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

en :

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

Conseil : lorsque vous utilisez `layout=responsive`, utilisez l'attribut `width` et `height` pour spécifier les dimensions minimales de l'image. Par exemple, pour une image de héros à fond perdu sur mobile, spécifiez la largeur comme `width=320`.
