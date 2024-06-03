---
'$title': Web Hikayesi teknik ayrıntıları
$order: 1
description: Web Hikayesi teknik ayrıntıları
'$category': Develop
formats:
  - stories
author: CrystalOnScript
---

Bu kılavuz, AMP ile başarılı bir şekilde Web Hikayeleri oluşturmak için bilmeniz gereken tüm teknik ayrıntıları ve en iyi uygulamaları açıklamaktadır.

## AMP Uyumlu

Web Hikayesi, teknik olarak AMP ile oluşturulmuş tek bir web sayfasıdır ve AMP spesifikasyonlarına uygundur:

- Belge tipiyle `<!doctype html>` başlar.
- Üst seviye `<html ⚡>` veya`<html amp>` etiketi içerir.
- `<head>` ve `<body>` etiketleri içerir.
- `<head>` etiketinin ilk alt öğesi olarak bir ` <meta charset="utf-8">` içerir.
- `<head>` etiketlerinin içinde bir `<script async src="https://cdn.ampproject.org/v0.js"></script>` etiketi içerir. En iyi uygulama olarak, betiği olabildiğince erken ` <head>` içine eklemelisiniz.
- Href, Web Hikayesi URL'sini işaret edecek şekilde `<head>` içinde bir `<link rel="canonical" href="page/url">` etiketi içerir.
- `<head>` etiketi içinde `<meta name="viewport" content="width=device-width">` etiketi içerir. Ayrıca initial-scale=1 eklemek de önerilir.
- `<head>` etiketinde [AMP ortak metni](https://amp.dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate/?format=websites) kodunu içerir.

Bir AMP web sayfası ile AMP ile oluşturulmuş bir Web Hikayesi arasındaki fark, [`amp-story`](https://amp.dev/documentation/components/amp-story/?format=stories) bileşenidir. `<body>` belgesinin doğrudan alt öğesidir ve `standalone` özniteliğini içermelidir. Tüm Web Hikayesi sayfaları, katmanları ve öğeleri `<amp-story>` etiketleri içinde tanımlanmıştır.

```html
<!DOCTYPE html>
<html ⚡>
  <head>
    <meta charset="utf-8" />
    <title>Joy of Pets</title>
    <link rel="canonical" href="pets.html" />
    <meta name="viewport" content="width=device-width" />
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
        to {
          visibility: visible;
        }
      }
    </style>
    <noscript
      ><style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style></noscript
    >
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script
      async
      custom-element="amp-video"
      src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
    ></script>
    <script
      async
      custom-element="amp-story"
      src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
    ></script>
    <style amp-custom>
      ...;
    </style>
  </head>
  <body>
    <!-- Cover page -->
    <amp-story
      standalone
      title="Joy of Pets"
      publisher="AMP tutorials"
      publisher-logo-src="assets/AMP-Brand-White-Icon.svg"
      poster-portrait-src="assets/cover.jpg"
    >
      <amp-story-page id="cover">
        <amp-story-grid-layer template="fill">
          <amp-img
            src="assets/cover.jpg"
            width="720"
            height="1280"
            layout="responsive"
          >
          </amp-img>
        </amp-story-grid-layer>
        <amp-story-grid-layer template="vertical">
          <h1>The Joy of Pets</h1>
          <p>By AMP Tutorials</p>
        </amp-story-grid-layer>
      </amp-story-page>

      <!-- Page 1 -->
      <amp-story-page id="page1">
        <amp-story-grid-layer template="vertical">
          <h1>Cats</h1>
          <amp-img
            src="assets/cat.jpg"
            width="720"
            height="1280"
            layout="responsive"
          >
          </amp-img>
          <q
            >Dogs come when they're called. Cats take a message and get back to
            you. --Mary Bly</q
          >
        </amp-story-grid-layer>
      </amp-story-page>
      ...
    </amp-story>
  </body>
</html>
```

[İlk Web Hikayenizi Oluşturun öğreticisini](../start/visual_story/?format=stories) izleyin ve daha fazla bilgi edinmek için [amp-story referans belgelerini okuyun](../../components/reference/amp-story/?format=stories).

## Üst düzey performans ve kullanıcı deneyimi

Kullanıcılar, Web Hikayelerini düşük ağ bağlantısına sahip alanlarda veya daha eski cihazlarda görüntülüyor olabilir. Buradaki en iyi uygulamaları izleyerek deneyimlerinden keyif aldıklarından emin olun.

### Arka plan rengi

Her Web Hikayesi sayfası için bir arka plan rengi belirleyin. Arka plan rengine sahip olmak, kullanıcının koşulları, görüntüleri veya video varlıklarını indirmelerini engellediğinde iyi bir geri dönüş sağlar. Sayfanın amaçlanan arka plan varlığının baskın rengini temsil eden bir renk seçin veya tüm hikaye sayfaları için tutarlı bir renk teması kullanın. Arka plan renginin okunabilirlik açısından metinden farklı olduğundan emin olun.

Web Hikayesi belgesinin başlığında veya <a><code><amp-story-page></code></a> bileşeninde satır içi olarak `<style amp-custom>` etiketleri içindeki sayfalar için arka plan rengini tanımlayın.

### Öğeleri katmanlara ayırma

Sistem başlığı, sessize alma ve paylaşma simgeleri gibi kontroller içerir. Bu başlık, arka plan görüntüsü ve videodan daha yüksek bir z-endeksinde görünür. Bu simgelerin hiçbir önemli bilgiyi kapsanmadığından emin olun.

### En boy oranı

Web Hikayesi varlıklarını 9:16 en boy oranında tasarlayın. Sayfa yüksekliği ve genişliği tarayıcılar ve cihazlar arasında değişiklik gösterdiğinden, temel içeriği sayfa kenarlarına yakın yerleştirmeyin.

### Poster resimleri

Bir video indirilirken kullanıcıya bir poster görüntüsü gösterilir. Sorunsuz bir geçişe izin vermek için poster görüntüsü videoyu temsil etmelidir. `poster` özelliğini amp-video öğenize ekleyerek ve bunu resim konumuna yönlendirerek bir poster resmi belirtin.

```
<amp-video autoplay loop
  width="720" height="1280" layout="responsive"
  poster="images/kitten-playing.png">
  <source src="videos/kitten-playing.mp4"
    type="video/mp4" />
</amp-video>
```

## Video

Tüm videolar [amp-video](https://amp.dev/documentation/components/amp-video/?format=stories) bileşeni aracılığıyla eklenmelidir.

```
<amp-video controls
  width="640"
  height="360"
  layout="responsive"
  poster="/static/inline-examples/images/kitten-playing.png">
  <source src="/static/inline-examples/videos/kitten-playing.webm"
    type="video/webm" />
  <source src="/static/inline-examples/videos/kitten-playing.mp4"
    type="video/mp4" />
  <div fallback>
    <p>This browser does not support the video element.</p>
  </div>
</amp-video>
```

### Çözünürlük ve kalite

Aşağıdaki önerilen optimizasyonlar için kaliteyi ayarlamak için videoları kodlayın:

<table>
  <tr>
   <td>MP4</td>
   <td>-crf 23</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>-b:v 1M</td>
  </tr>
</table>

HLS segmentlerini 10 saniyenin altında tutmaya çalışın.

### Biçim ve boyut

Optimum performans için videoları 4MB'den küçük tutun. Büyük videoları birden çok sayfaya bölmeyi düşünün.

Yalnızca tek bir video biçimi sağlayabiliyorsanız, MP4 sağlayın. Mümkün olduğunda, HLS videoyu kullanın ve tarayıcı uyumluluğu için yedek olarak MP4'ü belirtin. Aşağıdaki video codec bileşenini kullanın:

<table>
  <tr>
   <td>MP4, HLS ve DASH</td>
   <td>H.264</td>
  </tr>
  <tr>
   <td>WEBM</td>
   <td>VP9</td>
  </tr>
</table>

### &lt;source&gt; ve src belirtme

`src` özelliği üzerinden video kaynağını belirtmek için `<amp-video>` bileşeni içindeki `<source>` alt öğelerini kullanın. `<source>` öğesini kullanmak, video türünü belirtmenize ve yedek video kaynakları eklemenize olanak tanır. MIME türünü belirtmek için `type` özniteliğini kullanmalısınız. HLS videoları için `application/x-mpegurl` veya `application/vnd.apple.mpegurl` kullanın. Diğer tüm video türleri için, `video/` MIME önekini kullanın ve `”video/mp4”` gibi bir video biçimini izleyin.

```html
<amp-video
  id="video-page1"
  autoplay
  loop
  layout="fill"
  poster="https://example.com/media/poster.jpg"
>
  <source
    src="https://amp-example.com/media/movie.m3u8"
    type="application/vnd.apple.mpegurl"
  />
  <source src="https://amp-example.com/media/movie.mp4" type="video/mp4" />
</amp-video>
```

### Videolardan sonra otomatik ilerleme

Amp-story-page tarafından gösterilen [`auto-advance-after`](https://amp.dev/documentation/components/amp-story-page/?format=stories#auto-advance-after-%5Boptional%5D) özelliği, bir hikaye sayfasının kullanıcı dokunmadan ilerleyip ilerlemeyeceğini ve ne zaman ilerlemesi gerektiğini belirtir. Bir videodan sonra ilerlemek için özelliği video kimliğine yönlendirin.

```html
<amp-story-page auto-advance-after="myvideo"></amp-story-page>
```

## Masaüstü deneyimi

Web Hikayesi biçimi, [isteğe bağlı bir masaüstü deneyimini](https://github.com/ampproject/amphtml/blob/main/extensions/amp-story/amp-story.md#landscape-orientation-and-full-bleed-desktop-experience-opt-in) destekler. Bu, masaüstü deneyimini sürükleyici bir tam çerçeve moduna dönüştürerek varsayılan üç dikey panel deneyiminin yerini alır ve mobil kullanıcıların cihazları yatay olarak tuttuklarında bunları görüntülemelerine olanak tanır.

`supports-landscape` özelliğini `<amp-story>` bileşenine ekleyerek masaüstü desteğini etkinleştirin.

```html
<amp-story
  standalone
  supports-landscape
  title="Joy of Pets"
  publisher="AMP tutorials"
  publisher-logo-src="assets/icon.svg"
  poster-portrait-src="assets/cover.jpg"
>
</amp-story>
```
