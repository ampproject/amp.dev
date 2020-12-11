---
"$title": Przewodnik po optymalizatorze AMP opartym na Node.js
"$order": '2'
description: Ten przewodnik wyjaśnia jak skonfigurować i używać wersję optymalizatora AMP opartą na Node.js.
formats:
- websites
- stories
author: sebastianbenz
---

Ten przewodnik wyjaśnia jak skonfigurować i używać wersję optymalizatora AMP opartą na Node.js.

## Instalacja

Zainstaluj za pomocą NPM:

```shell
npm install @ampproject/toolbox-optimizer
```

## Użycie

Interfejs API optymalizatora AMP pobiera ciąg HTML jako dane wejściowe i zwraca zoptymalizowaną wersję ciągu HTML. Podstawowa składnia wygląda tak:

```js
const AmpOptimizer = require('@ampproject/toolbox-optimizer');

// create the AMP Optimizer instance
const ampOptimizer = AmpOptimizer.create();

const html = '<h1>Hello World!</h1>';

const optimizedHtml = await ampOptimizer.transformHtml(html);
```

### Tworzenie zoptymalizowanego AMP w czasie kompilacji

W przypadku witryn statycznych najlepiej jest optymalizować strony AMP podczas kompilowania witryny. Oto przykład integracji z kompilacją opartą na [Gulp.js](https://gulpjs.com/). Ten przykład dodaje niestandardowe przekształcenie, optymalizujące wszystkie pliki HTML w folderze src:

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

### Czas renderowania

W przypadku stron dynamicznych często konieczne jest renderowanie stron na serwerze. W tym przypadku można uruchamiać optymalizator AMP po wyrenderowaniu stron. Oto przykładowa integracja z serwerem [Express.js](https://expressjs.com/). Jednym ze sposobów na zintegrowanie optymalizacji AMP z routerem Express jest uruchomienie go w wywołaniu zwrotnym po [wyrenderowaniu](https://expressjs.com/en/api.html#app.render) szablonów:

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

Ważne: w razie używania optymalizatora AMP na serwerze skonfiguruj buforowanie lub CDN, aby uniknąć opóźnień renderowania.

## Konfiguracja

Optymalizator AMP zapewnia rozsądną konfigurację domyślną, która powinna działać dobrze w większości przypadków. Przekształcenia można jednak dostosować do konkretnych przypadków użycia. Lista wszystkich dostępnych opcji znajduje się [tutaj](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer#options).

Kilka wartych uwagi opcji:

- `lts: true` do włączania [długoterminowo stabilnych adresów URL](https://github.com/ampproject/amphtml/blob/main/contributing/lts-release.md) środowiska uruchomieniowego i składników AMP.
- `verbose: true` do generowania szczegółowych danych wyjściowych debugowania. Jest to szczególnie przydatne do identyfikowania przyczyn, dla których nie można było usunąć kodu standardowego AMP.
- `imageOptimizer`: włączyć automatyczne generowanie atrybutów srcset obrazów, udostępniając funkcję obliczania adresów URL srcset dla danego src obrazu. Funkcja powinna zwracać adres URL wskazujący na wersję obrazu `src` o danej szerokości. Jeśli obraz nie jest dostępny, powinna zwracać wartość false. Więcej informacji na ten temat zawiera następna sekcja.

### Optymalizacja obrazów

Optymalizator AMP może generować wartości `srcset` danego elementu `amp-img` na podstawie jego atrybutu `layout`. Aby to zadziałało, należy dostarczyć funkcję, która mapuje wartości `src` i `width` na wartość źródła `srcset` o zmienionym rozmiarze. Zmiana rozmiaru obrazu nie jest wykonywana przez optymalizator AMP i musi nastąpić albo w czasie kompilacji (np. w przypadku witryn statycznych), albo poprzez usługę hostingu obrazów, taką jak [thumbor](https://github.com/thumbor/thumbor).

Oto przykładowa implementacja, która dodaje szerokość obrazu do atrybutu `src`:

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

Używając tej implementacji, optymalizator AMP przekształci następujące deklaracje `amp-img`:

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

w:

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

Porada: w razie używania atrybutu `layout=responsive` należy określić minimalne rozmiary obrazów za pomocą atrybutów `width` i `height`. Na przykład w przypadku obrazu hero image na pełne spady na telefonie komórkowym należy określić szerokość jako `width=320`.
