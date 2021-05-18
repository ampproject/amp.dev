---
'$title': Leitfaden für Node.js AMP Optimizer
$order: 2
description: Dieser Leitfaden erläutert die Einrichtung und Verwendung der Node.js Version von AMP Optimizer.
formats:
  - websites
  - stories
author: sebastianbenz
---

Dieser Leitfaden erläutert die Einrichtung und Verwendung der Node.js Version von AMP Optimizer.

## Setup

Installiere das Paket wie folgt via NPM:

```shell
npm install @ampproject/toolbox-optimizer
```

## Verwendung

Die AMP Optimizer API erhält einen HTML String als Eingabe und gibt die optimierte Version des HTML Strings zurück. Die Standardverwendung sieht folgendermaßen aus:

```js
const AmpOptimizer = require('@ampproject/toolbox-optimizer');

// create the AMP Optimizer instance
const ampOptimizer = AmpOptimizer.create();

const html = '<h1>Hello World!</h1>';

const optimizedHtml = await ampOptimizer.transformHtml(html);
```

### Erstellen eines optimierten AMP zum Buildzeitpunkt

Für statische Websites ist es am besten, AMP Seiten zum Buildzeitpunkt der Website zu optimieren. Es folgt ein Beispiel zur Integration eines Builds auf [Gulp.js](https://gulpjs.com/) Basis. In diesem Beispiel wird eine benutzerdefinierte Transformation verwendet, die alle HTML Dateien im Ordner src optimiert:

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

### Renderzeitpunkt

Dynamische Seiten müssen häufig auf dem Server gerendert werden. In diesem Fall kannst du den AMP Optimizer nach dem Rendern deiner Seiten ausführen. Hier ist ein Beispiel für die Integration mit einem [Express.js](https://expressjs.com/) Server. Ein Weg, die AMP Optimierung in einen Express Router zu integrieren, besteht darin, sie im Rückruf nach dem [Rendering](https://expressjs.com/en/api.html#app.render) der Templates auszuführen:

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

Wichtig: Vergiss nicht, Caching oder ein CDN einzurichten, wenn du AMP Optimizer auf dem Server verwendest, um Verzögerungen beim Rendern zu vermeiden.

## Konfiguration

AMP Optimizer bietet eine angemessene Standardkonfiguration, die für die meisten Fälle geeignet sein sollte. Transformationen können aber auch an bestimmte Use Cases angepasst werden. Eine Liste aller verfügbaren Optionen findest du [hier](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer#options).

Einige bedeutende Optionen sind:

- `lts: true` zum Aktivieren von [langfristig stabilen URLs](https://github.com/ampproject/amphtml/blob/main/docs/lts-release.md) für die AMP Runtime und AMP Komponenten.
- `verbose: true` für detaillierte Debug Ausgaben. Besonders sinnvoll zur Identifizierung von Ursachen, wenn die AMP Boilerplate nicht entfernt werden konnte.
- `imageOptimizer`: Aktivierung der automatischen Generierung des Attributs "srcset" von Bildern mithilfe einer Funktion zur Berechnung von srcset URLs für ein bestimmtes "src" Attribut eines Bildes. Die Funktion sollte eine URL zurückgeben, die auf eine Version des `src` Bildes mit der angegebenen Breite verweist. Wenn kein Bild verfügbar ist, sollte ein falscher Wert zurückgegeben werden. Mehr dazu im nächsten Abschnitt.

### Bildoptimierung

AMP Optimizer kann `srcset` Werte für ein gegebenes `amp-img` basierend auf der Definition von `layout` generieren. Damit das funktioniert, musst du eine Funktion bereitstellen, welche die Attribute `src` und `width` des Bildes dem größenangepassten `srcset` Quellwert zuordnet. Die Größenänderung des Bildes wird nicht von AMP Optimizer durchgeführt und muss entweder zum Buildzeitpunkt (z. B. für statische Websites) oder über einen Bildhostingdienst wie [thumbor](https://github.com/thumbor/thumbor) erfolgen.

Hier ist ein Beispiel für eine Implementierung, bei der die Bildbreite an `src` angehängt wird:

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

Mit dieser Implementierung transformiert AMP Optimizer die folgenden `amp-img` Deklarationen:

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

zu:

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

Tipp: Wenn du `layout=responsive` verwendest, gib die Mindestmaße des Bildes mithilfe der Attribute `width` und `height` an. Um z. B. dein Hero Image im Randlosmodus auf einem Smartphone darzustellen, gib `width=320` an.
