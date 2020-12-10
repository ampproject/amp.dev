---
"$title": Node.js AMP Optimizer Kılavuzu
"$order": '2'
description: "Bu kılavuz, AMP Optimizer'ın Node.js sürümünün nasıl kurulacağını ve kullanılacağını açıklıyor."
formats:
- websites
- stories
author: sebastianbenz
---

Bu kılavuz, AMP Optimizer'ın Node.js sürümünün nasıl kurulacağını ve kullanılacağını açıklıyor.

## Yükleme

Aşağıdaki komutla NPM aracılığıyla yükleyin:

```shell
npm install @ampproject/toolbox-optimizer
```

## Kullanım

AMP Optimizer API'si, girdi olarak bir HTML dizesi alır ve HTML dizesinin optimize edilmiş bir sürümünü döndürür. Temel kullanımı şuna benzer:

```js
const AmpOptimizer = require('@ampproject/toolbox-optimizer');

// create the AMP Optimizer instance
const ampOptimizer = AmpOptimizer.create();

const html = '<h1>Hello World!</h1>';

const optimizedHtml = await ampOptimizer.transformHtml(html);
```

### Derleme Zamanında optimize edilmiş AMP oluşturma

Statik siteler için, sitenizi oluştururken derleme sırasında AMP sayfalarını optimize etmek en iyisidir. Bunu [Gulp.js](https://gulpjs.com/) temelli bir derlemeyle nasıl entegre edeceğinize dair bir örnek aşağıda verilmiştir. Bu örnek, src klasöründeki tüm HTML dosyalarını optimize eden özel bir dönüşüm ekler:

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

### İşleme zamanı

Dinamik sayfalar için, sayfaları genellikle sunucuda işlemek gerekir. Bu durumda, sayfalarınızı oluşturduktan sonra AMP Optimizer'ı çalıştırabilirsiniz. Aşağıda, bir [Express.js](https://expressjs.com/) sunucusuna örnek bir entegrasyon verilmiştir. AMP Optimizasyonunu bir Express yönlendiriciye entegre etmenin bir yolu, onu şablonlar [oluşturulduktan](https://expressjs.com/en/api.html#app.render) sonra bir geri aramada çalıştırmaktır:

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

Önemli: İşleme gecikmelerini önlemek için sunucuda AMP Optimizer'ı kullanırken bir CDN veya önbelleğe alma ayarladığınızdan emin olun.

## Yapılandırma

AMP Optimizer, çoğu durumda iyi çalışan makul bir varsayılan yapılandırma sağlar. Ancak, dönüşümler belirli kullanım durumları için özelleştirilebilir. Mevcut tüm seçeneklerin bir listesini [burada](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer#options) bulabilirsiniz.

Birkaç önemli seçenek aşağıda verilmiştir:

- AMP çalışma zamanı ve bileşenleri için [uzun dönemli kararlı URL'ler](https://github.com/ampproject/amphtml/blob/main/contributing/lts-release.md) etkinleştirmek için `lts: true`
- Detaylı hata ayıklama çıkışları için `verbose: true`. AMP standart metninin neden kaldırılamadığını belirlemek için özellikle iyi.
- `imageOptimizer` : belirli bir görüntü kaynağı adına srcset URL'lerini hesaplamak için bir fonksiyon sağlayarak otomatik görüntü srcset oluşturmayı etkinleştirir. Fonksiyon, `src` görüntüsünün verilen genişliğe sahip bir sürümüne işaret eden bir URL döndürmelidir. Görüntü yoksa, yanlış bir değer döndürür. Sonraki bölümde bununla ilgili daha fazla bilgi bulabilirsiniz.

### Görüntü Optimizasyonu

AMP Optimizer, `yerleşim` tanımına göre belirli bir `amp-img` için `srcset` değerleri oluşturabilir. Bunun çalışması için, görüntünün `src` değerini ve bir `width` değerini yeniden boyutlandırılmış bir `srcset` kaynak değeriyle eşleyen bir fonksiyon sağlamanız gerekir. Görüntü yeniden boyutlandırma, AMP Optimizer tarafından gerçekleştirilmez ve ya derleme sırasında (ör. Statik siteler için) ya da [thumbor](https://github.com/thumbor/thumbor) gibi bir görüntü barındırma hizmeti aracılığıyla gerçekleştirilmesi gerekir.

Görüntü genişliğini `src` değerine ekleyen bir örnek uygulamayı burada görebilirsiniz:

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

AMP Optimizer, bu uygulamayı kullanarak aşağıdaki `amp-img` bildirimlerini dönüştürecektir:

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

değer, yukarıdaki şekilden aşağıdakine dönüşecektir:

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

İpucu: `layout=responsive` kullanırken minimum görüntü boyutlarını belirtmek için `width` ve `height` özniteliğini kullanın. Örneğin, mobil cihazdaki tam çerçeve ana görüntü için genişliği `width=320` olarak belirtin.
