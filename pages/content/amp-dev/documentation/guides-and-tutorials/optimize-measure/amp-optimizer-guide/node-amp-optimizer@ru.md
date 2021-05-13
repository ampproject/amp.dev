---
'$title': Руководство по AMP-оптимизатору для Node.js
$order: 2
description: Это руководство рассказывает, как настроить и использовать версию AMP-оптимизатора для Node.js.
formats:
  - websites
  - stories
author: sebastianbenz
---

Это руководство рассказывает, как настроить и использовать версию AMP-оптимизатора для Node.js.

## Подготовка

Установка выполняется через NPM при помощи следующей команды:

```shell
npm install @ampproject/toolbox-optimizer
```

## Использование

API AMP-оптимизатора принимает на входе HTML-строку и возвращает ее оптимизированную версию. Вот простой пример его использования:

```js
const AmpOptimizer = require('@ampproject/toolbox-optimizer');

// create the AMP Optimizer instance
const ampOptimizer = AmpOptimizer.create();

const html = '<h1>Hello World!</h1>';

const optimizedHtml = await ampOptimizer.transformHtml(html);
```

### Оптимизация AMP-кода во время сборки

AMP-страницы статических сайтов лучше всего оптимизировать во время сборки. Ниже показано, как можно интегрировать оптимизацию в инструкции для сборки на основе [Gulp.js](https://gulpjs.com/). Код в данном примере добавляет дополнительное преобразование, которое оптимизирует все HTML-файлы в каталоге src:

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

### Оптимизация во время рендеринга

Если страница генерируется динамически, то ее рендеринг часто приходится выполнять на сервере. В этом случае можно запускать AMP-оптимизатор после рендеринга страницы. Ниже показан пример интеграции с сервером [Express.js](https://expressjs.com/). Один из возможных способов интегрировать AMP-оптимизацию в маршрутизатор Express заключается в том, чтобы запускать ее после завершения [рендеринга](https://expressjs.com/en/api.html#app.render) шаблонов, используя функцию обратного вызова:

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

Важно. При использовании AMP-оптимизатора на сервере обязательно настройте кеширование или CDN, чтобы избежать задержек при рендеринге.

## Конфигурация

AMP-оптимизатор содержит конфигурацию по умолчанию, которая подходит для большинства ситуаций. Однако преобразования можно настраивать под конкретные пользовательские сценарии. Список всех доступных параметров можно найти по [ссылке](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer#options).

Вот несколько важных параметров:

- `lts: true` для переключения на [URL-адреса долгосрочных стабильных версий](https://github.com/ampproject/amphtml/blob/main/docs/lts-release.md) среды выполнения AMP и AMP-компонентов.
- `verbose: true` для вывода подробных отладочных сообщений. Особенно полезно, когда нужно выяснить, почему не получается удалить шаблонный код AMP.
- `imageOptimizer`: автоматически генерирует атрибут srcset для изображений с помощью функции, которая вычисляет URL-адреса srcset на основании атрибута `src` определенного изображения. Функция должна возвращать URL-адрес версии данного изображения, имеющей заданную ширину. Если изображение недоступно, функция должна возвращать значение, эквивалентное false. Подробнее об этом читайте в следующем разделе.

### Оптимизация изображений

AMP-оптимизатор может генерировать для элементов `amp-img` значения `srcset` на основании используемого элементом макета (`layout`). Для этого вы должны предоставить функцию, преобразующую `src` изображения и его значение `width` в значение источника `srcset`, указывающее на изображение соответствующего размера. При этом сам AMP-оптимизатор не меняет размер изображения; необходимо либо делать это во время сборки (например, для статических сайтов), либо использовать хостинг изображений, такой как [thumbor](https://github.com/thumbor/thumbor).

Вот пример реализации, которая добавляет к значению атрибута `src` ширину изображения:

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

При использовании этой реализации AMP-оптимизатор преобразует элементы `amp-img`:

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

...в следующий код:

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

Совет. При использовании `layout=responsive` указывайте минимальные размеры изображения при помощи атрибутов `width` и `height`. Например, чтобы растянуть hero-изображение на всю ширину экрана на мобильном устройстве, укажите `width=320`.
