---
'$title': Guida a Node.js AMP Optimizer
$order: 2
description: "Questa guida spiega come configurare e utilizzare la versione Node.js dell'ottimizzatore AMP."
formats:
  - websites
  - stories
author: sebastianbenz
---

Questa guida spiega come configurare e utilizzare la versione Node.js dell'ottimizzatore AMP.

## Configurazione

Installare tramite NPM utilizzando il comando:

```shell
npm install @ampproject/toolbox-optimizer
```

## Utilizzo

L'API dell'ottimizzatore AMP accetta una stringa HTML come input e restituisce una versione ottimizzata della stringa HTML. L'utilizzo di base è il seguente:

```js
const AmpOptimizer = require('@ampproject/toolbox-optimizer');

// create the AMP Optimizer instance
const ampOptimizer = AmpOptimizer.create();

const html = '<h1>Hello World!</h1>';

const optimizedHtml = await ampOptimizer.transformHtml(html);
```

### Creazione di AMP ottimizzato in fase di build

Per i siti statici, la soluzione migliore per le ottimizzazioni è applicarle in fase di build, durante la compilazione del sito. Segue un esempio di come integrare l'ottimizzatore in un build basato su [Gulp.js](https://gulpjs.com/). In questo esempio aggiungiamo una trasformazione personalizzata che ottimizza tutti i file HTML all'interno della cartella src:

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

### Fase di rendering

Per le pagine dinamiche è spesso necessario eseguire il rendering delle pagine sul server. In questo caso, si può eseguire AMP Optimizer dopo il rendering delle pagine. Ecco un esempio di integrazione in un server [Express.js](https://expressjs.com/). Un modo per integrare l'ottimizzazione AMP in un router Express è eseguirla in una nuova chiamata dopo il [rendering](https://expressjs.com/en/api.html#app.render) dei modelli:

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

Importante: assicurati di configurare la cache o un CDN quando utilizzi AMP Optimizer sul server per evitare ritardi nel rendering.

## Configurazione

L'ottimizzatore AMP fornisce una ragionevole configurazione predefinita che dovrebbe funzionare bene nella maggior parte dei casi. Tuttavia, le trasformazioni possono essere personalizzate per casi d'uso specifici. Puoi trovare un elenco di tutte le opzioni disponibili [qui](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer#options).

Le opzioni principali sono le seguenti:

- `lts: true` per abilitare [URL stabili a lungo termine](https://github.com/ampproject/amphtml/blob/main/docs/lts-release.md) per il runtime e i componenti AMP.
- `verbose: true` per output di debugging dettagliati. Particolarmente utile per identificare i motivi per cui non è stato possibile rimuovere il boilerplate AMP.
- `imageOptimizer` : abilita la generazione automatica di elementi srcset per immagini, fornendo una funzione per il calcolo degli URL di srcset per una data immagine src. La funzione dovrebbe restituire un URL che punta a una versione dell'immagine `src` con la larghezza data. Se nessuna immagine è disponibile, dovrebbe restituire un valore falso. Maggiori informazioni nella prossima sezione.

### Ottimizzazione immagini

L'ottimizzatore AMP può generare valori `srcset` per un dato elemento `amp-img` in base alla definizione del proprio `layout`. A questo scopo, occorre fornire una funzione che mappa gli `src` delle immagini e un parametro `width` a un valore sorgente di un `srcset` ridimensionato. Il ridimensionamento delle immagini non è eseguito da AMP Optimizer e deve avvenire in fase di build (per i siti statici) o tramite un servizio di hosting di immagini quali [thumbor](https://github.com/thumbor/thumbor).

Ecco un esempio di implementazione che aggiunge il parametro della larghezza dell'immagine a `src`:

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

Utilizzando questa implementazione, AMP Optimizer trasformerà le seguenti dichiarazioni `amp-img`:

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

in:

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

Suggerimento: quando si impiega `layout=responsive`, utilizzare gli attributi `width` e `height` per specificare le dimensioni minime dell'immagine. Ad esempio, per un'immagine hero a pagina intera su dispositivi mobili, specificare la larghezza `width=320`.
