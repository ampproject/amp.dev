---
$category@: presentation
formats:
- websites
teaser:
  text: Zengin, görsel bir hikaye anlatma biçimi.
---



<!---
       Copyright 2016 The AMP HTML Authors. All Rights Reserved.

       Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS-IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
-->

# amp-story

<table>
  <tr>
    <td width="40%"><strong>Açıklama</strong></td>
    <td>Zengin, görsel bir hikaye anlatma biçimi.</td>
  </tr>
  <tr>
    <td width="40%"><strong>Durum</strong></td>
    <td><div><a href="https://www.ampproject.org/docs/reference/experimental.html">Deneysel</a></div></td>
  </tr>
  <tr>
    <td width="40%"><strong>Zorunlu Komut Dosyası</strong></td>
    <td><code>&lt;script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="https://www.ampproject.org/docs/guides/responsive/control_layout.html">Desteklenen Düzenler</a></strong></td>
    <td>yok</td>
  </tr>
  <tr>
    <td width="40%"><strong>Örnekler</strong></td>
    <td><ul>
      <li>Örneklerle AMP'de <a href="https://ampbyexample.com/stories/introduction/amp_story_hello_world/">Merhaba Dünya</a> örneğine bakın.</li>
      <li><a href="https://www.ampproject.org/docs/tutorials/visual_story">Görsel AMP hikayesi oluşturma</a> eğiticisinden bilgi edinin.</li>
    </ul></td>
  </tr>
</table>

[tip type="caution"]
Bu bileşen deneyseldir ve etkin geliştirme süreci devam etmektedir. Sorunlar için [bir GitHub sorunu oluşturun](https://github.com/ampproject/amphtml/issues/new).
[/tip]

## Sürüm notları

| Sürüm | Açıklama                                                            |
|-------|----------------------------------------------------------------------|
| 1.0     | 16.07.2018 tarihinden itibaren geçerli sürüm.                                     |
| 0.1     | İlk uygulama.  Kullanımdan kaldırıldı ve 19.03.2019 tarihinde tamamen kaldırılacaktır |

## 0.1 sürümünden 1.0 sürümüne taşıma

16.07.2018 tarihinden itibaren, sürüm 0.1 kullanımdan kaldırılmıştır ve 19.03.2019 tarihinde tamamıyla kaldırılacaktır.  Hikayeleriniz otomatik olarak 1.0 sürümünü kullanacak şekilde yeni sürüme geçirileceğinden bu durum, bozulmalara yol açabilecek küçük değişikliklere neden olabilir.  İşlevlerin düzgün çalıştığından ve tasarımın doğru göründüğünden emin olmak için sayfalarınızı bu tarihten önce 1.0 sürümüne manuel olarak taşımanızı öneririz.

### Yeni kitap sonu özellikleri

amp-stories kitap sonuna, daha zengin bileşen desteği ve görsel düzenler sağlayan yeni özellikler ekledik. Değişikliklerden bazıları şunlardır:

* Paylaşım sağlayıcıları JSON yapılandırmasına göre sıralanır.
* Yeni kitap sonu bileşenleri:
    * Harekete geçirici mesaj bağlantıları
    * Metin kutusu
    * Dikey ve yatay kartlar</li>

Bu yeni özellikleri kullanmak için bir `<amp-story-bookend>` etiketini, gerekli özelliklere sahip `<amp-story>` öğenizin son alt öğesi olarak ekleyin. Örneğin:

```html
<amp-story standalone>
  <amp-story-page id="cover">
    ...
  </amp-story-page>
  <!-- `src` and `layout=nodisplay` are required. -->
  <amp-story-bookend src="bookendv1.json" layout="nodisplay">
  </amp-story-bookend>
</amp-story>
```

    Yeni bileşenler ve JSON yapılandırmasında bu bileşenlerin nasıl belirtileceği hakkında daha fazla bilgiyi [amp-story-bookend](#bookend-amp-story-bookend) bölümünden edinebilirsiniz.

### Yeni meta veri gereksinimleri

`<amp-story>` öğesine yeni meta veri özellikleri ekledik. Bu meta veri özellikleri, AMP hikayeleri ekosisteminde hikayenin önizlemesini görüntülemek için kullanılır. Örneğin, bu özellikler, ilgili bir hikayenin kitap sonunda ilgi çekici bir önizleme bağlantısı oluşturmak için kullanılabilir. Bu özelliklerin sağlanması, hikayenizin ileride AMP hikayeler yüzeylerinde sunulacak zengin, yerleştirilmiş deneyimler için geleceğe hazır olmasına da yardımcı olur.

```html
<!--</code>title<code>,</code>publisher<code>,</code>publisher-logo-src<code>and</code>poster-portrait-src` will soon be required. -->
<amp-story title="Hikayem" standalone="" publisher="The AMP Team" publisher-logo-src="https://example.com/logo/1x1.png" poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"></amp-story></p>

<!-- <code>poster-square-src</code> and <code>poster-landscape-src</code> are optional, but strongly recommended. -->
<amp-story title="Hikayem" standalone="" publisher="The AMP Team" publisher-logo-src="https://example.com/logo/1x1.png" poster-portrait-src="https://example.com/my-story/poster/3x4.jpg" poster-square-src="https://example.com/my-story/poster/1x1.jpg" poster-landscape-src="https://example.com/my-story/poster/4x3.jpg">
```

Bu meta veri özelliklerinin sayfadaki Yapılandırılmış Verileri (ör. JSON-LD) tamamladığını ancak bunların yerini almadığını unutmayın. Bununla birlikte, AMP hikayeleri dahil olmak üzere tüm AMP sayfalarınıza [Yapılandırılmış Veriler](https://developers.google.com/search/docs/data-types/article#amp-sd) eklemenizi öneririz.

Yeni özellikler:

| ÖZELLİK | AÇIKLAMA |
|--|--|
| `title` [zorunlu] | Hikayenin başlığı. |
| `publisher` [zorunlu] | Hikaye yayıncısının adı. |
| `publisher-logo-src` [zorunlu] | Kare biçimli (en boy oranı 1x1) yayıncı logosu. |
| `poster-portrait-src` [zorunlu] | Dikey biçimli (3x4 en boy oranı) hikaye posteri. |
| `poster-square-src` | Kare biçimli (1x1 en boy oranı) hikaye posteri. |
| `poster-landscape-src` | Yatay biçimli (4x3 en boy oranı) hikaye posteri. |

#### `publisher-logo-src` yönergeleri

Yayıncı logosu için aşağıdaki yönergeler geçerlidir:

* Dosya, `.jpg`, `.png` veya `.gif` gibi bir kafes dosyası olmalıdır.  `.svg` veya `.eps` gibi vektör dosyalarını kullanmaktan kaçının.
* Animasyonlu resimler (animasyonlu GIF'ler gibi).
* Logonun grafik kısmı arka plan renginde okunabilir olmalıdır.

<table>
  <tr>
    <td>
      <amp-img alt="Beyaz arka plan üzerinde mavi metin içeren logo" width="107" height="112" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-1.png" layout="fixed">
        <noscript>
          <img alt="Beyaz arka plan üzerinde mavi metin içeren logo" src="img/publisher-logo-1.png">
        </noscript>
      </amp-img>
      Tercih edilen
    </td>
    <td>
      <amp-img alt="Mavi arka plan üzerinde beyaz metin içeren logo" width="107" height="101" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-2.png" layout="fixed">
        <noscript>
          <img alt="Mavi arka plan üzerinde beyaz metin içeren logo" src="img/publisher-logo-2.png">
        </noscript>
      </amp-img>
      Tercih edilen
    </td>
    <td>
      <amp-img alt="Mavi arka plan üzerinde mavi metin içeren logo" width="103" height="102" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/publisher-logo-3.png" layout="fixed">
        <noscript>
          <img alt="Mavi arka plan üzerinde mavi metin içeren logo" src="img/publisher-logo-3.png">
        </noscript>
      </amp-img>
      Bundan kaçının
    </td>
  </tr>
</table>

* Logo şekli dikdörtgen değil, kare olmalıdır.
* Arka plan rengi şeffaf olmamalıdır.
* AMP hikayelerinde her marka için tutarlı bir şekilde bir logo kullanın.
* Logo en az 96x96 piksel boyutunda olmalıdır.

#### Poster yönergeleri (`poster-portrait-src`, `poster-landscape-src` ve `poster-square-src` için)

Hikaye poster resimleri için aşağıdaki yönergeler geçerlidir:

* Poster resmi, AMP hikayesinin tamamını temsil etmelidir.
* Poster resmi, kullanıcı AMP hikayesine başladığında kullanıcı tarafından görülebilmelidir.  Bununla birlikte, meta veride kullanılan resim dosyası URL'sinin, hikayenin ilk sayfasında kullanılan URL ile tam olarak eşleşmesine gerek yoktur.  Meta veride kullanılan URL, önizleme amacıyla boyutlandırma, kırpma veya küçük stil değişiklikleri içerebilir.
* Poster resmi, `.jpg`, `.png` veya `.gif` gibi bir taramalı dosya olmalıdır.  `.svg` veya `.eps` gibi vektör dosyalarını kullanmaktan kaçının.
* Poster resmi, dikey yön için 3x4, yatay yön için 4x3 ve kare boyut için 1x1 en boy oranında olmalıdır.
* Poster resmi bir videodaki bir kareden elde edilirse küçük resim, videoyu temsil etmelidir. Örneğin, bir videonun ilk karesi genellikle videoyu temsil eder nitelikte olmaz.
* Her bir poster resmi, önerilen minimum boyutu karşılamalıdır:
    * Dikey: 696px x 928px
    * Yatay: 928px x 696px
    * Kare: 928px x 928px</li>

## Genel Bakış

`amp-story` uzantısı, hikaye anlatma deneyiminde bir araya getirebileceğiniz görsel içerikleri görüntülemeniz için yeni bir biçim sağlar. Bir AMP hikayesi ile kullanıcılara küçük boyutlu, görsel olarak zengin bilgiler ve içerikler sağlayabilirsiniz.

<figure class="centered-fig">
  <amp-anim width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
    <noscript>
      <img alt="AMP Hikayesi Örneği" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
      </noscript>
    </amp-anim>
  </figure>

## AMP hikayesi biçimi

[AMP hikayesi](#story%3a-amp-story), [sayfalardan](#pages%3a-amp-story-page) oluşan eksiksiz bir AMP HTML dokümanıdır. Sayfaların içinde [katmanlar](#layers%3a-amp-story-grid-layer), katmanların içinde medya, analiz, metin gibi AMP ve HTML öğeleri yer alır.

<amp-img alt="AMP hikayesi etiket hiyerarşisi" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="AMP hikayesi etiket hiyerarşisi" src="https://github.com/ampproject/docs/raw/master/assets/img/docs/amp-story-tag-hierarchy.png">
    </noscript>
  </amp-img>

### Ortak metin

Aşağıdaki işaretleme, iyi bir başlangıç noktası veya ortak metindir. Bunu kopyalayın ve `.html` uzantılı bir dosyaya kaydedin.

```html
<!doctype html>
<html amp lang="en">
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <title>Hello, amp-story</title>
    <link rel="canonical" href="http://example.ampproject.org/my-story.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"><style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal
    both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes
    -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes
    -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript>
      <style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none
        }
      </style>
    </noscript>
  </head>
  <body>
    <amp-story standalone>
      <amp-story-page id="my-first-page">
        <amp-story-grid-layer template="fill">
          <amp-img src="https://example.ampproject.org/helloworld/bg1.jpg" width="900" height="1600"></amp-img> </amp-story-grid-layer> <amp-story-grid-layer template="vertical">
            <h1>Hello, amp-story!</h1>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-page id="my-second-page">
        <amp-story-grid-layer template="fill">
          <amp-img src="https://example.ampproject.org/helloworld/bg2.gif" width="900" height="1600"></amp-img> </amp-story-grid-layer> <amp-story-grid-layer template="vertical">
            <h1>The End</h1>
        </amp-story-grid-layer>
      </amp-story-page>
      <amp-story-bookend src="bookendv1.json" layout="nodisplay">
      </amp-story-bookend>
    </amp-story>
  </body>
</html>
```

Gövdedeki içerik, iki sayfalı bir hikaye oluşturur.  Her sayfada, tam çerçeve bir arka plan resmi ve arka planın üzerinde basit bir metin dizesi bulunur.

### amp-story için zorunlu işaretleme

AMP hikayesi HTML biçimi, [geçerli bir AMP HTML dokümanıyla aynı işaretleme gereksinimlerinin](https://www.ampproject.org/docs/reference/spec#required-markup) yanı sıra aşağıdaki ek gereksinimlere uygundur:

| KURAL | AÇIKLAMA |
|----|---|
| `<amp-story standalone>` öğesi, `<body>` öğesinin tek alt öğesidir. | Dokümanın bir AMP hikayesi olduğunu belirtir. |
| `<script async src="https://cdn.ampproject.org/v0/amp-story-1.0.js" custom-element="amp-story"></script>` etiketini, `<head>` etiketinin üçüncü alt öğesi olarak dahil edin. | amp-story JS kitaplığını içerir ve yükler. |
| `<head>` öğesinin içine bir `<link rel="canonical" href="$STORY_URL">` etiketi dahil edin. | Bağlantı, hikayenin kendisine işaret ederek hikayeyi standart doküman olarak tanımlar. |

## Hikaye: `amp-story`

`amp-story` bileşeni bir hikayenin tamamını temsil eder.  Bileşenin kendisi, hareketleri ve gezinmeyi işleme ve uygulama kabuğu kullanıcı arayüzünü (kontroller, ilerleme çubuğu vb.) eklemeyi de içeren kullanıcı arayüzü kabuğunu uygular.

<figure class="centered-fig">
  <amp-anim alt="amp-story örneği" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif" layout="fixed">
    <noscript>
      <img alt="amp-story örneği" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story.gif">
      </noscript>
    </amp-anim>
  </figure>

### Örnek

```html
<amp-story
    standalone
    title="My Story"
    publisher="The AMP Team"
    publisher-logo-src="https://example.com/logo/1x1.png"
    poster-portrait-src="https://example.com/my-story/poster/3x4.jpg"
    poster-square-src="https://example.com/my-story/poster/1x1.jpg"
    poster-landscape-src="https://example.com/my-story/poster/4x3.jpg"
    background-audio="my.mp3">
    <amp-story-page>[...]</amp-story-page>
  <amp-story-page>[...]</amp-story-page>
  <amp-story-page>[...]</amp-story-page>
  <amp-story-bookend src="./related.json"></amp-story-bookend>
</amp-story>
```

### Özellikler

##### standalone [zorunlu]

AMP dokümanının bir hikaye olduğunu belirtir.

##### title [zorunlu]

Hikayenin başlığı.

##### publisher [zorunlu]

Hikaye yayıncısının adı.

##### publisher-logo-src [zorunlu]

Kare biçimli (1x1 en boy oranı) yayıncı logosunun bir URL'si. Örneğin, `publisher-logo-src="https://example.com/logo/1x1.png"`; burada 1x1.png, 36x36 piksel boyutlu bir logodur.

##### poster-portrait-src [zorunlu]

Dikey biçimli (3x4 en boy oranı) [hikaye posterinin](#posters) bir URL'si.

##### supports-landscape [isteğe bağlı]

Mobil cihazlarda yatay yön desteği ve masaüstü cihazlarda tam çerçeve yatay görüntüleme deneyimi sağlar.

##### background-audio [isteğe bağlı]

Hikaye boyunca çalınan bir ses dosyasının URL'si.

##### poster-square-src [isteğe bağlı]

Kare biçimli (1x1 en boy oranı) [hikaye posterinin](#posters) bir URL'si.

##### poster-landscape-src [isteğe bağlı]

Yatay biçimli (4x3 en boy oranı) [hikaye posterinin](#posters) bir URL'si.

### Posterler

"Poster", hikayeniz yüklenene kadar kullanıcı arayüzünde görüntülenen bir resimdir. Poster, genellikle hikayenizin ilk ekranı olabilir. Bununla birlikte, hikayeyi temsil eden herhangi bir resmi kullanabilirsiniz.

### Alt öğeler (amp-story öğesinin)

`<amp-story>` bileşeninde bir veya daha fazla [`<amp-story-page>`](#pages%3a-amp-story-page) bileşeni bulunur. Bu bileşenler, hikayenin her bir bağımsız ekranını içerir.  Doküman sırasında belirtilen ilk sayfa, hikayede gösterilen ilk sayfadır.

### Yatay yön ve tam çerçeve masaüstü deneyimini etkinleştirme

`supports-landscape` özelliği `<amp-story>` öğesinde belirtiliyorsa:

* Bir mobil cihaz yatay yönde tutulduğunda hikayenin görülmesine olanak tanır.
* Varsayılan üç dikey panel deneyimini değiştirerek, masaüstü deneyimini kapsamlı bir tam çerçeve moduna döndürür.

Kullanım: `<amp-story ... supports-landscape>...</amp-story>`

<figure class="centered-fig">
  <span class="special-char">Önce:</span>
  <amp-anim alt="Masaüstü üç panel deneyimi" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif" width="400" layout="flex-item">
    <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-three-panels.gif"></noscript>
  </amp-anim>
  <span class="special-char">Sonra:</span>
  <amp-anim alt="Masaüstü tam çerçeve deneyimi" height="299" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif" width="400" layout="flex-item">
    <noscript><img width="400" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/amp-story-desktop-full-bleed.gif"></noscript>
  </amp-anim>
</figure>

## Sayfalar: `amp-story-page`

`<amp-story-page>` bileşeni, bir hikayenin tek bir sayfasında görüntülenecek içeriği temsil eder.

<figure class="centered-fig">
  <amp-anim alt="Sayfa 1 örneği" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif" layout="fixed">
    <noscript>
      <img alt="Sayfa 1 örneği" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-1.gif">
      </noscript>
    </amp-anim>
  </figure>
  <figure class="centered-fig">
    <amp-anim alt="Sayfa 2 örneği" width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif" layout="fixed">
      <noscript>
        <img alt="Sayfa 2 örneği" width="200" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/pages-page-2.gif">
        </noscript>
      </amp-anim>
    </figure>

### Örnek

```html
<amp-story-page id="cover">
  <amp-story-grid-layer template="fill">
    <amp-video layout="fill" src="background.mp4" poster="background.png" muted autoplay></amp-video>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="vertical">
    <h1>These are the Top 5 World's Most...</h1>
    <p>Jon Bersch</p>
    <p>May 18</p>
  </amp-story-grid-layer>
  <amp-story-grid-layer template="thirds">
    <amp-img grid-area="bottom-third" src="a-logo.svg" width="64" height="64"></amp-img>
  </amp-story-grid-layer>
</amp-story-page>
```

### Özellikler

##### id [zorunlu]

Sayfa için benzersiz bir tanımlayıcı. CSS'de sayfayı ve alt öğelerini biçimlendirmek ve ayrıca, URL parçasında sayfayı benzersiz bir şekilde tanımlamak için kullanılır.

##### auto-advance-after [isteğe bağlı]

Bir sonraki sayfaya otomatik olarak ne zaman ilerleneceğini belirtir.  Belirtilmezse sayfa otomatik olarak ilerlemez. `auto-advance-after` değeri şunlardan biri olmalıdır:

* Otomatik olarak bir sonraki sayfaya ilerlemeden önce beklenecek sıfırdan büyük bir [süre](https://developer.mozilla.org/en-US/docs/Web/CSS/time) değeri
* Bir [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) öğesinin veya tamamlandığında otomatik ilerlemeyi tetikleyecek video arayüzü videosunun kimliği

Örneğin:

```html
<amp-story-page id="tokyo" auto-advance-after="1s">
```

##### background-audio [isteğe bağlı]

Bu sayfa görünümdeyken çalan bir ses dosyasının URI'sı.

Örneğin:

```html
<amp-story-page id="zurich" background-audio="./media/switzerland.mp3">
```

### Alt öğeler (amp-story-page öğesinin)

`<amp-story-page>` bileşeni, bir veya daha fazla [katman](#layers) içerir.  Katmanlar aşağıdan yukarıya doğru yığılır (DOM'da belirtilen ilk katman en altta, DOM'da belirtilen son katman en üstte yer alır).

## Katmanlar

Katmanlar, istenen görsel efekti oluşturmak için üst üste yığılır.

### `amp-story-grid-layer`

`<amp-story-grid-layer>` bileşeni, alt öğelerini bir ızgaraya yerleştirir.  Bu bileşen, [CSS Izgara Spesifikasyonuna](https://www.w3.org/TR/css-grid-1/) göre uygulanır.

<div class="flex-images">
  <amp-img alt="Katman 1" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif" width="200" height="355" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-1.gif"></noscript>
  </amp-img>
  <span class="special-char">+</span>
  <amp-img alt="Katman 2" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-2.jpg"></noscript></amp-img>
  <span class="special-char">+</span>
  <amp-img alt="Katman 3" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-3.jpg"></noscript></amp-img>
  <span class="special-char">=</span>
  <amp-img alt="Tüm katmanlar" height="355" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif" width="200" layout="flex-item">
    <noscript><img width="200" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-layer-4.gif"></noscript></amp-img>
</div>

#### Özellikler

##### template [zorunlu]

`template` özelliği, ızgara katmanının düzenini belirler. Kullanılabilir şablonlar, aşağıdaki [Şablonlar](#templates) bölümünde açıklanmıştır.

##### grid-area [isteğe bağlı]

Bu özellik, `<amp-story-grid-layer>` öğesinin alt öğelerinde belirtilir. `grid-area`, bu özelliği içeren öğenin içinde görünmesi gereken (kendilerini tanımlayan bir  `template` değerine göre) adlandırılmış alanı belirtir.

Örnek:

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">Element 1</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>
```

#### Şablonlar

Aşağıda, ızgara katmanı düzenini belirtmek için kullanabileceğiniz şablonlar bulunmaktadır.

[tip type="success"]
Kullanımdaki düzen şablonlarını görmek için [Örneklerle AMP'de düzenler demosuna](https://ampbyexample.com/stories/features/layouts/) göz atın.
[/tip]

##### fill

`fill` şablonu, alt öğesini tam çerçevede gösterir. Diğer alt öğelerin hiçbiri gösterilmez.

Adlandırılmış Alanlar: (yok)

Örnek:

<amp-img alt="Fill şablonu örneği" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Horizontal şablonu örneği" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-fill.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="fill">
  <amp-img src="cat.jpg"></amp-img>
</amp-story-grid-layer>
```

##### vertical

`vertical` şablonu, öğelerini y ekseni boyunca yerleştirir.  Bu şablonun öğeleri varsayılan olarak üste hizalanır ve x ekseni boyunca ekranın tamamını kaplayabilir.

Adlandırılmış Alanlar: (yok)

<amp-img alt="Vertical şablonu örneği" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Horizontal şablonu örneği" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-vertical.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="vertical">
  <p>Element 1</p>
  <p>Element 2</p>
  <p>Element 3</p>
</amp-story-grid-layer>
```

##### horizontal

`horizontal` şablonu, öğelerini x ekseni boyunca yerleştirir.  Bu şablonun öğeleri varsayılan olarak çizginin başlangıcına hizalanır ve y ekseni boyunca ekranın tamamını kaplayabilir.

Adlandırılmış Alanlar: (yok)

<amp-img alt="Horizontal şablonu örneği" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Horizontal şablonu örneği" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-horizontal.png">
  </noscript>
</amp-img>

```html
<amp-story-grid-layer template="horizontal">
  <p>Element 1</p>
  <p>Element 2</p>
  <p>Element 3</p>
</amp-story-grid-layer>
```

##### thirds

`thirds` şablonu, ekranı eşit boyutlu üç satıra böler ve her bir alana içerik yerleştirmenize olanak tanır.

Adlandırılmış Alanlar:

* `upper-third`
* `middle-third`
* `lower-third`

<amp-img alt="Horizontal şablonu örneği" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png" width="145" height="255" layout="fixed">
  <noscript>
    <img alt="Thirds şablonu örneği" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/template-thirds.png">
    </noscript>
  </amp-img>

```html
<amp-story-grid-layer template="thirds">
  <p grid-area="middle-third">Element 1</p>
  <p grid-area="lower-third">Element 2</p>
  <p grid-area="upper-third">Element 3</p>
</amp-story-grid-layer>
```

#### Alt Öğeler

`amp-story-grid-layer`, aşağıdaki öğelerin herhangi birini içerebilir:

**Not**: Bu liste zaman içinde genişletilecektir.

<table>
  <tr>
    <th width="40%">Alan
    </th><th>İzin verilen etiketler </th>
  </tr>
  <tr>
    <td>Medya</td>
    <td>
      <ul>
        <li><code>&lt;amp-audio></code></li>
        <li><code>&lt;amp-gfycat></code></li>
        <li><code>&lt;amp-google-vrview-image></code></li>
        <li><code>&lt;amp-img></code></li>
        <li><code>&lt;amp-video></code></li>
        <li><code>&lt;source></code></li>
        <li><code>&lt;track></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Analiz ve Ölçüm</td>
    <td>
      <ul>
        <li><code>&lt;amp-analytics></code></li>
        <li><code>&lt;amp-experiment></code></li>
        <li><code>&lt;amp-pixel></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Bölümlere Ayırma</td>
    <td>
      <ul>
        <li><code>&lt;address></code></li>
        <li><code>&lt;article></code></li>
        <li><code>&lt;aside></code></li>
        <li><code>&lt;footer></code></li>
        <li><code>&lt;h1>-&lt;h6></code></li>
        <li><code>&lt;header></code></li>
        <li><code>&lt;hgroup></code></li>
        <li><code>&lt;nav></code></li>
        <li><code>&lt;section></code></li>
        <li><code>&lt;amp-story-cta-layer></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Metin</td>
    <td>
      <ul>
        <li><code>&lt;abbr></code></li>
        <li><code>&lt;amp-fit-text></code></li>
        <li><code>&lt;amp-font></code></li>
        <li><code>&lt;amp-gist></code></li>
        <li><code>&lt;b></code></li>
        <li><code>&lt;bdi></code></li>
        <li><code>&lt;bdo></code></li>
        <li><code>&lt;blockquote></code></li>
        <li><code>&lt;br></code></li>
        <li><code>&lt;cite></code></li>
        <li><code>&lt;code></code></li>
        <li><code>&lt;data></code></li>
        <li><code>&lt;del></code></li>
        <li><code>&lt;dfn></code></li>
        <li><code>&lt;div></code></li>
        <li><code>&lt;em></code></li>
        <li><code>&lt;figcaption></code></li>
        <li><code>&lt;figure></code></li>
        <li><code>&lt;hr></code></li>
        <li><code>&lt;i></code></li>
        <li><code>&lt;ins></code></li>
        <li><code>&lt;kbd></code></li>
        <li><code>&lt;main></code></li>
        <li><code>&lt;mark></code></li>
        <li><code>&lt;p></code></li>
        <li><code>&lt;pre></code></li>
        <li><code>&lt;q></code></li>
        <li><code>&lt;rp></code></li>
        <li><code>&lt;rt></code></li>
        <li><code>&lt;rtc></code></li>
        <li><code>&lt;ruby></code></li>
        <li><code>&lt;s></code></li>
        <li><code>&lt;samp></code></li>
        <li><code>&lt;small></code></li>
        <li><code>&lt;span></code></li>
        <li><code>&lt;strong></code></li>
        <li><code>&lt;sub></code></li>
        <li><code>&lt;sup></code></li>
        <li><code>&lt;time></code></li>
        <li><code>&lt;u></code></li>
        <li><code>&lt;var></code></li>
        <li><code>&lt;wbr></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Listeler</td>
    <td>
      <ul>
        <li><code>&lt;amp-list></code></li>
        <li><code>&lt;amp-live-list></code></li>
        <li><code>&lt;dd></code></li>
        <li><code>&lt;dl></code></li>
        <li><code>&lt;dt></code></li>
        <li><code>&lt;li></code></li>
        <li><code>&lt;ol></code></li>
        <li><code>&lt;ul></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Tablolar</td>
    <td>
      <ul>
        <li><code>&lt;caption></code></li>
        <li><code>&lt;col></code></li>
        <li><code>&lt;colgroup></code></li>
        <li><code>&lt;table></code></li>
        <li><code>&lt;tbody></code></li>
        <li><code>&lt;td></code></li>
        <li><code>&lt;tfoot></code></li>
        <li><code>&lt;th></code></li>
        <li><code>&lt;thead></code></li>
        <li><code>&lt;tr></code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Diğer</td>
    <td>
      <ul>
        <li><code>&lt;amp-install-serviceworker></code></li>
        <li><code>&lt;noscript></code></li>
      </ul>
    </td>
  </tr>
</table>

### `amp-story-cta-layer`

`<amp-story-cta-layer>` bileşeni, bir `<amp-story-page>` içinde `<a>` ve `<button>` öğelerinin kullanımına olanak tanır.

#### Sınırlamalar

* Belirtilirse `<amp-story-cta-layer>` öğesi, bir `<amp-story-page>` içindeki son katman olmalıdır. Sonuç olarak, etkin bir şekilde her `<amp-story-page>` tam olarak bir veya tam olarak sıfır `<amp-story-cta-layer>` öğesine sahip olabilir.
* Bu katmanın konumlandırılması ve boyutlandırılması kontrol edilemez. Her zaman sayfanın %100 genişliğinde, sayfanın %20 yüksekliğinde ve sayfanın alt kısmına hizalı olur.

#### Örnek

```html
<amp-story-page id="vertical-template-thirds">
  <amp-story-grid-layer template="thirds">
    <div class="content" grid-area="upper-third">Paragraph 1</div>
    <div class="content" grid-area="middle-third">Paragraph 2</div>
    <div class="content" grid-area="lower-third">Paragraph 3</div>
  </amp-story-grid-layer>
  <amp-story-cta-layer>
    <a href="https://www.ampproject.org" class="button">Outlink here!</a>
  </amp-story-cta-layer>
</amp-story-page>
```

<amp-img alt="CTA Katmanı" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png" width="404" height="678" layout="fixed">
  <noscript>
    <img width="404" height="678" src="https://raw.githubusercontent.com/ampproject/amphtml/master/extensions/amp-story/img/layers-cta-layer.png">
  </noscript>
</amp-img>

[Tam örneği, örnekler dizininde bulabilirsiniz](https://github.com/ampproject/amphtml/blob/master/examples/amp-story/cta-layer-outlink.html)

#### Alt öğeler

`amp-story-cta-layer`, çoğunlukla `amp-story-grid-layer` ile aynı alt öğelere ve ayrıca, `<a>` ile `<button>` etiketlerine izin verir.

Desteklenen alt öğelerin güncellenmiş bir listesi için doğrulama kurallarındaki [amp-story-cta-layer-allowed-descendants](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii) alanına göz atın.

## Sayfa ekleri

### `amp-story-page-attachment`

<amp-img alt="AMP Hikayesi sayfa eki" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif" width="240" height="480" layout="fixed">
  <noscript>
    <img alt="AMP Hikayesi sayfa eki" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-page-attachment.gif">
  </noscript>
</amp-img>

Bir hikaye sayfasına ilave içerik ekleyin!

Hikaye sayfası ekleri, belirli sayfalara ilave AMPHTML içeriği sağlamanıza olanak tanır. Bu içerik, kullanıcılar tarafından bir "yukarı kaydırma" hareketi veya harekete geçirici mesaj öğesine dokunma sonucu gösterilebilir.
Bir ek yapılandıran her sayfanın alt kısmına, eki açmak için bir kullanıcı arayüzü istemi otomatik olarak eklenir.

`<amp-story-page-attachment>` öğesi, `<amp-story-page>` öğesinin son alt öğesi olmalı ve `layout="nodisplay"` özelliğini içermelidir. Ek AMPHTML içeriğinin, bu `<amp-story-page-attachment>` etiketiyle, AMP Hikayenizde satır içinde sağlanması beklenir.

### İzin verilen içerik ve bileşenler

Hikaye sayfası ekleri, AMP Hikayesi ile aynı HTML öğelerinin yanı sıra aşağıda listelenen, üçüncü taraf video oynatıcılar veya sosyal medya yerleştirmeleri gibi ek bileşenlerin kullanılmasına olanak tanır. Bu, çok ayrıntılı veya bir AMP Hikayesi sayfasında izin verilmeyen ilave içerikler ekleyebileceğiniz anlamına gelir.

<details>
  <summary>Bir sayfa ekinde izin verilen AMP bileşenlerinin listesi</summary>

  * `<amp-3d-gltf>`
  * `<amp-3q-player>`
  * `<amp-accordion>`
  * `<amp-audio>`
  * `<amp-beopinion>`
  * `<amp-bodymovin-animation>`
  * `<amp-brid-player>`
  * `<amp-brightcove>`
  * `<amp-byside-content>`
  * `<amp-call-tracking>`
  * `<amp-carousel>`
  * `<amp-dailymotion>`
  * `<amp-date-countdown>`
  * `<amp-embedly-card>`
  * `<amp-facebook>`
  * `<amp-facebook-comments>`
  * `<amp-facebook-like>`
  * `<amp-facebook-page>`
  * `<amp-fit-text>`
  * `<amp-fx-collection>`
  * `<amp-fx-flying-carpet>`
  * `<amp-gfycat>`
  * `<amp-gfycat>`
  * `<amp-gist>`
  * `<amp-gist>`
  * `<amp-google-document-embed>`
  * `<amp-google-vrview-image>`
  * `<amp-google-vrview-image>`
  * `<amp-hulu>`
  * `<amp-ima-video>`
  * `<amp-image-slider>`
  * `<amp-img>`
  * `<amp-imgur>`
  * `<amp-instagram>`
  * `<amp-izlesene>`
  * `<amp-jwplayer>`
  * `<amp-kaltura-player>`
  * `<amp-list>`
  * `<amp-list>`
  * `<amp-live-list>`
  * `<amp-live-list>`
  * `<amp-mathml>`
  * `<amp-mowplayer>`
  * `<amp-nexxtv-player>`
  * `<amp-o2-player>`
  * `<amp-ooyala-player>`
  * `<amp-pan-zoom>`
  * `<amp-pinterest>`
  * `<amp-playbuzz>`
  * `<amp-powr-player>`
  * `<amp-reach-player>`
  * `<amp-reddit>`
  * `<amp-riddle-quiz>`
  * `<amp-soundcloud>`
  * `<amp-springboard-player>`
  * `<amp-timeago>`
  * `<amp-twitter>`
  * `<amp-video>`
  * `<amp-video-iframe>`
  * `<amp-vimeo>`
  * `<amp-vine>`
  * `<amp-viqeo-player>`
  * `<amp-vk>`
  * `<amp-wistia-player>`
  * `<amp-yotpo>`
  * `<amp-youtube>`

</details>

### Örnek

```html
<amp-story-page id="foo">
  <amp-story-grid-layer template="fill">
    <amp-img src="https://example.ampproject.org/helloworld/bg1.jpg" width="900" height="1600">
    </amp-story-grid-layer>
    <amp-story-page-attachment layout="nodisplay">
      <h1>My title</h1>
      <p>Lots of interesting text with <a href="https://example.ampproject.org">links</a>!</p>
      <p>More text and a YouTube video!</p>
      <amp-youtube
          data-videoid="b4Vhdr8jtx0"
          layout="responsive"
          width="480" height="270">
      </amp-youtube>
    <p>And a tweet!</p>
    <amp-twitter
        data-tweetid="885634330868850689"
        layout="responsive"
        width="480" height="270">
    </amp-twitter>
  </amp-story-page-attachment>
</amp-story-page>
```

## Animasyonlar

Bir `<amp-story-page>` öğesinin içindeki her öğenin bir giriş animasyonu olabilir.

Animasyonları, öğede bir dizi [animasyon özelliği](#animation-attributes) belirterek yapılandırabilirsiniz; ek AMP uzantılarına veya yapılandırmaya gerek yoktur.

### Animasyon efektleri

Aşağıdaki animasyon efektleri, AMP hikayeleri için hazır ayar olarak kullanılabilir:

| Hazır ayar adı       | Varsayılan süre (ms) | Varsayılan gecikme süresi (ms) |
|-----------------|---------------------| ------------------ |
| `drop`            | 1600                  | 0 |
| `fade-in`         | 500                   | 0 |
| `fly-in-bottom`   | 500                   | 0 |
| `fly-in-left`     | 500                   | 0 |
| `fly-in-right`    | 500                   | 0 |
| `fly-in-top`      | 500                   | 0 |
| `pulse`           | 500                   | 0 |
| `rotate-in-left`  | 700                   | 0 |
| `rotate-in-right` | 700                   | 0 |
| `twirl-in`        | 1000                  | 0 |
| `whoosh-in-left`  | 500                   | 0 |
| `whoosh-in-right` | 500                   | 0 |
| `pan-left`        | 1000                  | 0 |
| `pan-right`       | 1000                  | 0 |
| `pan-down`        | 1000                  | 0 |
| `pan-up`          | 1000                  | 0 |
| `zoom-in`         | 1000                  | 0 |
| `zoom-out`        | 1000                  | 0 |

[tip type="success"]
Örneklerle AMP'de [tüm AMP hikayesi animasyonlarının canlı demosuna](https://ampbyexample.com/stories/features/animations/) bakın.
[/tip]

### Animasyon özellikleri

##### animate-in [zorunlu]

Giriş [animasyon hazır ayarının](#animation-effects) adını belirtmek için bu özelliği kullanın.

*Örnek*: Bir başlık sayfanın sol tarafından kayarak görünüme girer.

```html
<h2 animate-in="fly-in-left">
  Fly from left!
</h2>
```

##### animate-in-duration [isteğe bağlı]

Giriş animasyonunun süresini, saniye veya milisaniye cinsinden (ör. 0,2 s veya 200 ms) belirtmek için bu özelliği kullanın. Varsayılan süre, belirttiğiniz animasyon hazır ayarına bağlıdır.

*Örnek*: Bir başlık sayfanın sol tarafından kayarak görünüme girer ve animasyon yarım saniye içinde biter.

```html

<h2 animate-in="fly-in-left" animate-in-duration="0.5s">
  Fly from left!
</h2>

```

##### animate-in-delay [isteğe bağlı]

Animasyonu başlatmadan önceki gecikmeyi belirtmek için bu özelliği kullanın. Değer, saniye veya milisaniye cinsinde 0'dan büyük veya 0'a eşit olmalıdır (örneğin, 0,2 s veya 200 ms). Varsayılan gecikme, belirttiğiniz animasyon hazır ayarına bağlıdır.

*Örnek*: 0,4 saniye sonra, bir başlık sayfanın sol tarafından kayarak görünüme girer ve 0,5 saniye içinde girişini tamamlar.

```html

<h2 animate-in="fly-in-left" animate-in-duration="0.5s" animate-in-delay="0.4s">
  Fly from left!
</h2>

```

[tip type="note"]
Animasyon gecikmesinin kesin olduğu garanti edilmez. İlk animasyonlu öğe tarandığında arka planda `amp-animation` uzantısının yüklenmesinden kaynaklanabilecek ek gecikmeler olabilir. Özellik sözleşmesi, *bu animasyonu en az N milisaniye geciktir* şeklinde tanımlanır. Bu, 0 saniye gecikmeli olanlar da dahil olmak üzere tüm öğeler için geçerlidir.
[/tip]

##### animate-in-after [isteğe bağlı]

Bu özelliği, animasyon zinciri veya sırası (örneğin, animasyon2, animasyon1 tamamlandıktan sonra başlar) oluşturmak için kullanın. Bu öğenin animasyonunun izleyeceği animasyonlu öğenin kimliğini belirtin. Öğe, aynı `<amp-story-page>` öğesinde olmalıdır. Gecikme, önceki öğenin animasyonu bittikten sonra uygulanır. Daha ayrıntılı bilgi için aşağıdaki [Animasyonları sıralama](#sequencing-animations) bölümüne bakın.

Örneğin, aşağıdaki kodda `object2` animasyonu, `object1` girişini tamamladıktan sonra gerçekleştirilir:

```html
<amp-story-page id="page1">
  <amp-story-grid-layer template="vertical">
    <div id="object1"
        animate-in="rotate-in-left">
      1
      </div>
    <div id="object2"
        animate-in="fly-in-right"
        animate-in-after="object1">
      2. <!-- will start after object1 has finished -->
      </div>
    </amp-story-grid-layer>
  </amp-story-page>
 ```

##### scale-start, scale-end [isteğe bağlı, yalnızca `zoom-in` ve `zoom-out` animasyonlarıyla çalışır]

Yakınlaştırma ve uzaklaştırma animasyonlarınızın parametrelerini daha ayrıntılı belirtmek için bu iki özelliği kullanın. Değer, 0'dan büyük veya 0'a eşit olmalıdır ve ondalık basamaklara izin verilir. Varsayılan değer, yakınlaştırma için scale-start: 1 ve scale-start: 3, uzaklaştırma için bunların tersidir.

*Örnek*: 4 saniyede boyutunun 2 katından 5 katına yakınlaşan bir resim.

```html
<amp-img animate-in="zoom-in" scale-start="2" scale-end="5" animate-in-duration="4s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-x [isteğe bağlı, yalnızca `pan-left` ve `pan-right` animasyonlarıyla çalışır]

Bir pan-left/pan-right animasyonunda resminizin yatay kaydırmasını belirtmek için bu özelliği kullanın. Değer, piksel cinsinden 0'dan büyük veya 0'a eşit olmalıdır. Varsayılan değer, belirtilen resmin tüm genişliğini kaydırır.

*Örnek*: 10 saniyede sola doğru 200 piksel kaydırılan bir resim.

```html
<amp-img animate-in="pan-left" translate-x="200px" animate-in-duration="10s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

##### translate-y [isteğe bağlı, yalnızca `pan-up` ve `pan-down` animasyonlarıyla çalışır]

Bir pan-up/pan-down animasyonunda resminizin dikey kaydırmasını belirtmek için bu özelliği kullanın. Değer, piksel cinsinden 0'dan büyük veya 0'a eşit olmalıdır. Varsayılan değer, belirtilen resmin tüm yüksekliğini kaydırır.

*Örnek*: 15 saniyede aşağı doğru 50 piksel kaydırılan bir resim.

```html
<amp-img animate-in="pan-down" translate-y="50px" animate-in-duration="15s" layout="fixed" src="https://picsum.photos/720/320?image=1026" width="720" height="320">
</amp-img>
```

### Animasyonları sıralama

Sıralı animasyonlardan bir zincir oluşturmak için `animate-in-after` özelliğini kullanın. Belirli bir zincirdeki tüm öğeler, aynı `<amp-story-page>` öğesi içinde olmalıdır. `animate-in-after` özelliğine sahip olmayan öğeler bir sıra zincirine ait olmaz ve sayfa girişinde bağımsız olarak başlatılır.

```html
<amp-story-page id="my-sequencing-page">
  <amp-story-grid-layer template="vertical">
    <div class="circle"
        animate-in="drop-in"
        animate-in-duration="1.8s">
        1. <!-- will start independently -->
    </div>
    <div id="rotate-in-left-obj"
        class="square"
        animate-in="rotate-in-left"
        animate-in-after="fade-in-obj"
        animate-in-delay="0.2s">
        2. <!-- will start after fade-in-obj has finished -->
    </div>
    <div class="square"
        animate-in-after="rotate-in-left-obj"
        animate-in="whoosh-in-right"
        animate-in-delay="0.2s">
        3. <!-- will start after rotate-in-left-obj has finished -->
    </div>
    <div id="fade-in-obj"
        class="circle"
        animate-in="fade-in"
        animate-in-duration="2.2s">
        1. <!-- will start independently -->
    </div>
  </amp-story-grid-layer>
</amp-story-page>
```

### Birden çok animasyonu birleştirme

Birden çok giriş animasyonunu bir öğede uygulayabilirsiniz (örneğin, bir öğe sayfa görünümüne kayarak ve aynı zamanda yükselerek girer). Tek bir öğeye birden fazla animasyon hazır ayarının atanması mümkün değildir; bununla birlikte, farklı giriş animasyonlarına sahip öğeler iç içe yerleştirilerek bir animasyonda birleşmeleri sağlanabilir.

```html

<div animate-in="fly-in-left">
  <div animate-in="fade-in">
    I will fly-in and fade-in!
  </div>
</div>

```

[tip type="note"]
Oluşturulan bir animasyonun, ayrı bir öğenin animasyonu sona erdikten sonra başlaması gerekiyorsa, animasyonu oluşturan iç içe yerleştirilmiş tüm öğelerin `animate-in-after` özelliğinin aynı `id` değerine ayarlandığından emin olun.
[/tip]

## Kitap sonu: `amp-story-bookend`

`amp-story-bookend`, hikayenin son ekranıdır. İlgili bağlantılar, paylaşım seçenekleri, harekete geçirici mesaj bağlantıları ve daha fazlasını içerir.

<figure class="centered-fig">
  <amp-anim alt="ilgili makale örneği
      " width="300" height="533" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif" layout="fixed">
    <noscript>
      <img alt="ilgili makale örneği" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/related-articles.gif">
    </noscript>
  </amp-anim>
</figure>

  Bu özelliği kullanmak için zorunlu `layout=nodisplay` özelliğine sahip bir `<amp-story-bookend>` etiketini, `<amp-story>` öğenizin alt öğesi olarak ekleyin.
  Ardından, JSON yapılandırmasını ayrı bir dosyada belirtip `src` özelliğiyle içe aktarabilir ya da satır içine yerleştirebilirsiniz.

  JSON yapılandırmasını `src` özelliğiyle içe aktarma:

```html
<amp-story standalone>
  <amp-story-page id="cover">
    ...
  </amp-story-page>
  <!-- `layout=nodisplay` is required. -->
  <amp-story-bookend src="bookendv1.json" layout=nodisplay>
  </amp-story-bookend>
</amp-story>
```

Kitap sonu yapılandırmasını bir sunucudan getirmek istemiyorsanız yapılandırmayı satır içi olarak da belirtebilirsiniz:

```html
<amp-story standalone>
  ...
  <amp-story-bookend layout=nodisplay>
    <script type="application/json">
      {
        bookendVersion: "v1.0",
        shareProviders: [ ... ],
        components: [ ... ]
      }
    </script>
  </amp-story-bookend>
<amp-story>
```

Ardından, JSON yapılandırmasını doldurmanız gerekir. Bu, kitap sonunu özelleştirdiğiniz adımdır. Yapılandırmanın genel yapısı şu şekildedir:

```text
{
  bookendVersion: "v1.0",
  shareProviders: [
    ...
  ],
  components: [
    ...
  ]
}
```

İlk satırı ekleyerek v1.0'ı kullandığınızı belirtmeniz gerekir.

#### Kitap sonu bileşenleri

Kitap sonu, çeşitli bileşenlerden oluşur. Bu bileşenler; makale, harekete geçirici mesaj bağlantıları, metin ve daha fazlası olabilir.

Bunlar, yapılandırılan JSON öğesinin `components` alanında belirtilir. Bir örnek için aşağıdaki [JSON yanıtı örneği](#example-json-response) bölümüne bakın.

##### heading

<code>heading</code> bileşeninde, bir makale grubuna başlık eklemek için kullanabileceğiniz bir ```text</code> alanı bulunur.

```json
{
  type: "heading",
  text: "More to Read"
}
```

<amp-img alt="Kitap sonu heading bileşeni" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-heading.png" width="386" height="123" layout="fixed">
  <noscript>
    <img alt="Kitap sonu heading bileşeni" src="img/amp-story-bookend-component-heading.png">
  </noscript>
</amp-img>

##### small

`small` bileşeni, ilgili makalelere bağlantı vermek için kullanılabilir. Bu bileşen, şu alanları gerektirir: `title`, `url` ve isteğe bağlı olarak bir `image`.

```json
{
  type: "small",
  title: "This is India an the best places you should go",
  url: "http://example.com/article.html",
  image: "http://placehold.it/256x128"
}
```

<amp-img alt="Kitap sonu small bileşeni" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-small.png" width="379" height="192" layout="fixed">
  <noscript>
    <img alt="Kitap sonu small bileşeni" src="img/amp-story-bookend-component-small.png">
  </noscript>
</amp-img>

##### landscape

`landscape` bileşeni, videolar gibi alternatif içerik biçimleri için kullanılabilir. Bu bileşen, şu alanları gerektirir: `title`, `url` ve `image`. İsteğe bağlı olarak, bir `category` alanı ekleyebilirsiniz. Bu alan, başlığın üzerinde bir alt başlık görüntüler.

```json
{
  type: "landscape",
  title: "TRAPPIST-1 Planets May Still Be Wet Enough for Life",
  url: "http://example.com/article.html",
  category: "astronomy",
  image: "http://placehold.it/256x128"
}
```

<amp-img alt="Kitap sonu landscape bileşeni" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-landscape.png" width="388" height="410" layout="fixed">
  <noscript>
    <img alt="Kitap sonu landscape bileşeni" src="img/amp-story-bookend-component-landscape.png">
  </noscript>
</amp-img>

##### portrait

`portrait` bileşeni, diğer hikayelere bağlantı vermek için kullanılabilir. Bu bileşen, şu alanları gerektirir: `title`, `url` ve `image`. İsteğe bağlı olarak, bir `category` alanı ekleyebilirsiniz. Bu alan, başlığın üzerinde bir alt başlık görüntüler.

```json
{
  type: "portrait",
  category: "Science",
  title: "New discovery found",
  url: "http://example.com/article.html",
  image: "http://placehold.it/312x416"
}
```

<amp-img alt="Kitap sonu portrait bileşeni" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-portrait.png" width="382" height="522" layout="fixed">
  <noscript>
    <img alt="Kitap sonu portrait bileşeni" src="img/amp-story-bookend-component-portrait.png">
  </noscript>
</amp-img>

##### cta-link

<code>cta-link</code> bileşeni, harekete geçirici mesajlar için bağlantılar belirtebilmenizi sağlar (ör. <code>Read More</code> veya <code>Subscribe</code>). Bu bileşen, bir bağlantı dizisi belirten <code>links</code> anahtarını içerir. Her bir bağlantı, ```text</code> ve <code>url</code> değerlerine sahip bir nesnedir.

```json
{
  type: "cta-link",
  links: [
    {
      text: "Sign Up",
      url: "example.com/signup"
      },
    {
      text: "Subscribe",
      url: "example.com/subscribe"
    }
  ]
}
```

<amp-img alt="Kitap sonu cta-links bileşeni" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-cta-links.png" width="381" height="81" layout="fixed">
  <noscript>
    <img alt="Kitap sonu cta-links bileşeni" src="img/amp-story-bookend-component-cta-links.png">
  </noscript>
</amp-img>

##### textbox

```textbox</code> bileşeni, kitap sonu içinde bir metin (örneğin, fotoğraf tanıtma yazısı) belirtebilmenizi sağlar . Bu bileşen bir <code>text</code> dizisi gerektirir. Bu dizinin her bir öğesi, bir metin satırıdır.

```json
{
  type: "textbox",
  text: [
    Food by Enrique McPizza,
    Choreography by Gabriel Filly,
    Script by Alan Ecma S.,
    Direction by Jon Tarantino
  ]
}
```

<amp-img alt="Kitap sonu textbox bileşeni" src="https://github.com/ampproject/amphtml/raw/master/extensions/amp-story/img/amp-story-bookend-component-textbox.png" width="591" height="358" layout="fixed">
  <noscript>
    <img alt="Kitap sonu textbox bileşeni" src="img/amp-story-bookend-component-textbox.png">
    </noscript>
  </amp-img>

  **AMP'den AMP'ye bağlantı oluşturma**

  AMP görüntüleyicide görüntülenen dokümanlar için bağlantılar genellikle `_top` öğesine gider veya yeni bir pencerede açılır. Bununla birlikte, AMP sayfalarının bağlantıları görüntüleyicide görüntülenmeye devam edebilir. Bu davranışı etkinleştirmek için `"amphtml": true` öğesini, bağlantıları destekleyen bir bileşene ekleyin. Örneğin:

```json
...
{
  type: "small",
  title: "This is India an the best places you should go",
  url: "http://example.com/my-amp-document.html",
  image: "http://placehold.it/256x128",
  amphtml: true
},
{
  type: "cta-link",
  links: [
    {
      text: "Sign Up",
      url: "example.com/signup",
      amphtml: true
    },
    {
      text: "Subscribe",
      url: "example.com/subscribe"
    }
  ]
},
...
```

#### Sosyal paylaşım

Sosyal paylaşım yapılandırması, yanıt nesnesinin `shareProviders` alanında tanımlanır ve isteğe bağlıdır.

Bu alan, bir dize içermelidir. Her bir dize bir paylaşım sağlayıcısının adını (ör. `twitter`) temsil eder.

Fazladan parametreler gerekli olduğunda, anahtar/değer çiftlerine sahip bir nesne kullanılmalıdır. Nesne, sağlayıcının adına karşılık gelen bir değere (ör. `facebook`) sahip bir anahtar `provider` öğesi içermelidir. Sonraki anahtar/değer çiftleri, paylaşım sağlayıcıya bağlıdır.

Kullanılabilir sağlayıcıların listesi, [amp-social-share](https://www.ampproject.org/docs/reference/components/amp-social-share) bileşenindekilerle aynıdır.

Bu sağlayıcıların her biri, farklı kullanılabilir parametre gruplarına sahiptir ([`data-param-*` bölümüne bakın](https://www.ampproject.org/docs/reference/components/amp-social-share#data-param-%2a)). Yapılandırma nesnesi, bu parametreleri `data-param-` öneki olmadan alır (örneğin, `data-param-app_id` parametresi, yapılandırma nesnesinde `app_id` olarak görünür).

#### JSON yapılandırması

`<amp-story-bookend>`, kitap sonunun JSON yapılandırmasına işaret eden bir `src` özelliği içermelidir. GET isteklerini kabul eden ve kitap sonunun içeriği ile JSON yanıtı döndüren bir URL uç noktası olarak tanımlanır.  Belirtilmezse amp-story bileşeni bitiş ekranı için bir varsayılan kullanıcı arayüzü oluşturur. Sistem, ilgili ve trend olan makaleleri oluşturmak için gerekli verilerin getirilmesinden sorumludur.  Bu, statik bir JSON dosyasından sunulabilir veya (ör. o anda nelerin trend olduğunu hesaplamak için) dinamik olarak oluşturulur.

#### Örnek JSON yanıtı

```text
{
  // You must specify version v1.0.
  bookendVersion: "v1.0",
  shareProviders: [
    email,
    tumblr,
    {
      provider: "twitter",
      // You can add custom sharing parameters depending on the social platform.
      text: "This is custom share text that I would like for the Twitter platform"
    },
    {
      provider: "facebook",
      // Facebook requires an</code>app_id` param
      app_id: "MY_FACEBOOK_APP_ID"
    }
  ],
  components: [
    {
      type: "heading",
      text: "More to read"
    },
    {
      type: "small",
      title: "This is India an the best places you should go",
      url: "<a href="
      http: //example.com/article.html">http://example.com/article.html</a>",
        image: "<a href="
      http: //placehold.it/256x128">http://placehold.it/256x128</a>"
    },
    ...
  ]
}
```

## AMP hikayelerinde kullanılabilen diğer bileşenler

Aşağıda, AMP hikayelerinde kullanılabilecek ve hikayeye özel bazı uyarıların yapılmasını gerektiren diğer bileşenler bulunmaktadır.

* [amp-sidebar](https://www.ampproject.org/docs/reference/components/amp-sidebar#sidebar-for-stories)
* [amp-consent](https://www.ampproject.org/docs/reference/components/amp-consent#prompt-ui-for-stories)

Genel olarak kullanılabilir daha fazla bileşen için [izin verilen alt öğeler listesine](https://www.ampproject.org/docs/reference/components/amp-story#children) bakın.

## Doğrulama

AMP doğrulayıcı spesifikasyonunda [amp-story kurallarına](https://github.com/ampproject/amphtml/blob/master/extensions/amp-story/validator-amp-story.protoascii) bakın.

## Yerelleştirme

Hikayenizi yerelleştirmek için hikayenizin `<html>` etiketinin `lang` özelliğine dil kodunu ekleyin (ör. İngilizce için `<html lang="en">`).  Desteklenen dil kodları şunlardır:

* ar (Arapça)
* de (Almanca)
* en-GB (İngilizce, Birleşik Krallık)
* en (İngilizce, ABD)
* es-419 (İspanyolca, Orta/Latin Amerika)
* es (İspanyolca, İspanya)
* fr-CA (Fransızca, Kanada)
* fr (Fransızca, Fransa)
* hi (Hintçe)
* id (Endonezce)
* it (İtalyanca)
* ja (Japonca)
* ko (Korece)
* nl (Felemenkçe)
* no (Norveççe)
* pt-BR (Portekizce, Brezilya)
* pt (Portekizce, Portekiz)
* ru (Rusça)
* tr (Türkçe)
* vi (Vietnamca)
* zh-TW (Geleneksel Çince)
* zh (Basitleştirilmiş Çince)

Buna ek olarak, sağdan sola diller için hikayenizin `<html>` etiketine `dir="rtl"` özelliğini ekleyebilirsiniz.  Bu, dil koduyla birlikte de kullanılabilir; örneğin, `<html lang="ar" dir="rtl">`.

## İlgili kaynaklar

* [Eğitici: Bir görsel AMP hikayesi oluşturma](https://www.ampproject.org/docs/tutorials/visual_story)
* [Örneklerle AMP'deki örnekler](https://ampbyexample.com/stories/#stories/introduction)
* [AMP hikayesi oluşturmak için en iyi uygulamalar](https://www.ampproject.org/docs/guides/amp_story_best_practices)

</amp-story></body>
