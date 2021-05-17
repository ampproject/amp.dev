---
$title: amp-animation
$category@: presentation
teaser:
  text: Defines and displays an animation.
---


<!--
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



Menentukan dan menjalankan animasi.

<table>
  <tr>
    <td width="40%"><strong>Skrip yang Diperlukan</strong></td>
    <td><code>&lt;script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js">&lt;/script></code></td>
  </tr>
  <tr>
    <td class="col-fourty"><strong><a href="../../../documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md">Tata Letak yang Didukung</a></strong></td>
    <td>nodisplay</td>
  </tr>
  <tr>
    <td class="col-fourty"><strong>Contoh</strong></td>
    <td><a href="https://github.com/ampproject/amphtml/blob/main/examples/animations.amp.html">animations.amp.html</a></td>
  </tr>
</table>


## Ringkasan <a name="overview"></a>

Animasi AMP mengandalkan [Web Animations API](https://www.w3.org/TR/web-animations/) untuk menentukan dan menjalankan animasi di dokumen AMP.

## Format <a name="format"></a>

Elemen `amp-animation` menentukan animasi seperti struktur JSON.

### Spesifikasi animasi level teratas <a name="top-level-animation-specification"></a>

Objek level teratas menentukan keseluruhan proses animasi yang terdiri dari sembarang jumlah komponen animasi yang ditetapkan sebagai array `animations` :
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  // Timing properties
  ...
  "animations": [
    {
      // Animation 1
    },
    ...
    {
      // Animation N
    }
  ]
}
</script>
</amp-animation>
```

### Penempatan dalam DOM <a name="placement-in-dom"></a>

`<amp-animation>` hanya boleh ditempatkan sebagai turunan langsung dari elemen `<body>` jika `trigger="visibility"`. Jika `trigger` tidak ditetapkan dan pemutaran animasi dikontrol secara terprogram melalui tindakannya, elemen ini dapat ditempatkan di mana saja dalam DOM.

### Komponen animasi <a name="animation-component"></a>

Setiap komponen animasi adalah [efek keyframe](https://www.w3.org/TR/web-animations/#dom-keyframeeffect-keyframeeffect) dan terdiri dari:

- Elemen target yang dirujuk oleh selektor
- Kondisi: kueri media dan kondisi dukungan
- Properti pengaturan waktu
- Keyframe

```text
{
  "selector": "#target-id",
  // Conditions
  // Variables
  // Timing properties
  // Subtargets
  ...
  "keyframes": []
}
```

### Kondisi <a name="conditions"></a>

Kondisi dapat menentukan apakah komponen animasi ini disertakan dalam animasi final atau tidak.

#### Kueri media <a name="media-query"></a>

Kueri media dapat ditentukan menggunakan properti `media`. Properti ini dapat berisi ekspresi apa pun yang diizinkan untuk [Window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API dan sesuai dengan aturan CSS `@media`.

Jika ada nilai yang ditentukan untuk sebuah komponen animasi, komponen animasi tersebut hanya akan disertakan jika kueri media cocok dengan lingkungan saat ini.

#### Kondisi dukungan <a name="supports-condition"></a>

Kondisi dukungan dapat ditentukan menggunakan properti `supports`. Properti ini dapat berisi ekspresi apa pun yang diizinkan untuk [CSS.supports](https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports) API dan sesuai dengan aturan CSS `@supports`.

Jika ada nilai yang ditentukan untuk sebuah komponen animasi, komponen animasi tersebut hanya akan disertakan jika kondisi dukungan cocok dengan lingkungan saat ini.

### Pernyataan `switch` animasi <a name="animation-switch-statement"></a>

Dalam beberapa kasus, Anda dapat menggabungkan beberapa [animasi bersyarat](#conditions) dengan sebuah default opsional ke dalam satu animasi. Hal ini dapat dilakukan menggunakan pernyataan animasi `switch` dalam format:

```
{
  // Optional selector, vars, timing
  ...
  "switch": [
    {
      "media": "(min-width: 320px)",
      "keyframes": {...},
    },
    {
      "supports": "offset-distance: 0",
      "keyframes": {...},
    },
    {
      // Optional default: no conditionals
    }
  ]
}
```

Dalam animasi `switch`, kandidat dievaluasi sesuai urutan yang ditentukan dan animasi pertama yang cocok dengan [pernyataan bersyarat](#conditions) dieksekusi dan sisanya diabaikan.

Misalnya, animasi ini menjalankan animasi jalur gerak jika didukung dan melakukan fallback ke transformasi:
```
{
  "selector": "#target1",
  "duration": "1s",
  "switch": [
    {
      "supports": "offset-distance: 0",
      "keyframes": {
        "offsetDistance": [0, '300px']
      }
    },
    {
      "keyframes": {
        "transform": [0, '300px']
      }
    }
  ]
}
```

### Variabel <a name="variables"></a>

Komponen animasi dapat mendeklarasikan variabel CSS yang akan digunakan untuk nilai pengaturan waktu dan keyframe melalui ekspresi `var()`. Ekspresi `var()` dievaluasi menggunakan konteks target saat ini. Variabel CSS yang ditentukan dalam komponen animasi disebarkan ke animasi bertingkat, diterapkan ke target animasi, sehingga mengganti variabel CSS yang digunakan dalam animasi final.

Misalnya:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  "--delay": "0.5s",
  "--x": "100px",
  "animations": [
    {
      "selector": "#target1",
      "delay": "var(--delay)",
      "--x": "150px",
      "keyframes": {"transform": "translate(var(--x), var(--y, 0px)"}
    },
    ...
  ]
}
</script>
</amp-animation>
```

Dalam contoh ini:

- `--delay` disebarkan ke animasi bertingkat dan digunakan sebagai penundaan untuk animasi `#target1`.
- `--x` disebarkan ke animasi bertingkat namun digantikan oleh animasi `#target1` dan selanjutnya digunakan untuk properti `transform`.
- `--y` tidak ditentukan di mana pun dalam `<amp-animation>` dan selanjutnya akan dikueri dalam elemen `#target1`. Nilai defaultnya adalah `0px` jika tidak ditetapkan dalam CSS.

Untuk informasi lebih lanjut tentang `var()`, lihat [bagian `var()` dan `calc()`](#var-and-calc-expressions).

### Properti pengaturan waktu <a name="timing-properties"></a>

Komponen animasi dan animasi level teratas dapat berisi properti pengaturan waktu. Properti ini dijelaskan secara terperinci dalam spesifikasi Animasi Web
[AnimationEffectTimingProperties](https://www.w3.org/TR/web-animations/#dictdef-animationeffecttimingproperties). Kumpulan properti yang diizinkan di sini meliputi:

<table>
  <tr>
    <th class="col-twenty">Properti</th>
    <th class="col-twenty">Jenis</th>
    <th class="col-twenty">Default</th>
    <th>Deskripsi</th>
  </tr>
  <tr>
    <td><code>duration</code></td>
    <td>time</td>
    <td>0</td>
    <td>Durasi animasi. Nilai numerik dalam milidetik atau nilai waktu CSS, misalnya `2s`.</td>
  </tr>
  <tr>
    <td><code>delay</code></td>
    <td>time</td>
    <td>0</td>
    <td>Penundaan sebelum animasi mulai dijalankan. Nilai numerik dalam milidetik atau nilai waktu CSS, misalnya `2s`.</td>
  </tr>
  <tr>
    <td><code>endDelay</code></td>
    <td>time</td>
    <td>0</td>
    <td>Penundaan setelah animasi selesai dan sebelum benar-benar dianggap selesai. Nilai numerik dalam milidetik atau nilai waktu CSS, misalnya `2s`.</td>
  </tr>
  <tr>
    <td><code>iterations</code></td>
    <td>angka atau<br>"Infinity" atau<br>"infinite"</td>
    <td>1</td>
    <td>Frekuensi pengulangan efek animasi.</td>
  </tr>
  <tr>
    <td><code>iterationStart</code></td>
    <td>angka/CSS</td>
    <td>0</td>
    <td>Offset waktu saat efek mulai dianimasikan.</td>
  </tr>
  <tr>
    <td><code>easing</code></td>
    <td>string</td>
    <td>"linear"</td>
    <td><a href="https://www.w3.org/TR/web-animations/#timing-function">Fungsi pengaturan waktu</a> digunakan untuk menskalakan waktu guna menghasilkan efek easing.</td>
  </tr>
  <tr>
    <td><code>direction</code></td>
    <td>string</td>
    <td>"normal" </td>
    <td>Salah satu dari "normal", "reverse", "alternate" atau "alternate-reverse".</td>
  </tr>
  <tr>
    <td><code>fill</code></td>
    <td>string</td>
    <td>"none"</td>
    <td>Salah satu dari "none", "forwards", "backwards", "both", "auto".</td>
  </tr>
</table>

Semua properti pengaturan waktu menerima nilai numerik/string langsung atau nilai CSS. Misalnya, "duration" dapat ditetapkan sebagai `1000` atau `1s` atau `1000ms`. Selain itu, `calc()` dan `var()` serta ekspresi CSS lainnya juga didukung.

Contoh properti pengaturan waktu di JSON:
```text
{
  ...
  "duration": "1s",
  "delay": 100,
  "endDelay": "var(--end-delay, 10ms)",
  "easing": "ease-in",
  "fill": "both"
  ...
}
```

Komponen animasi mewarisi properti pengaturan waktu yang ditentukan untuk animasi level teratas.

### Subtarget <a name="subtargets"></a>

Di mana pun `selector` dapat ditentukan, `subtargets: []` juga dapat ditentukan. Subtarget dapat menggantikan properti pengaturan waktu atau variabel yang ditentukan dalam animasi untuk subtarget tertentu yang ditunjukkan melalui indeks atau selektor CSS.

Misalnya:
```text
{
  "selector": ".target",
  "delay": 100,
  "--y": "100px",
  "subtargets": [
    {
      "index": 0,
      "delay": 200,
    },
    {
      "selector": ":nth-child(2n+1)",
      "--y": "200px"
    }
  ]
}
```

Dalam contoh ini, secara default semua target yang cocok dengan ".target" memiliki penundaan 100 milidetik dan "--y" 100 piksel. Namun, target pertama (`index: 0`) diganti agar memiliki penundaan 200 milidetik; dan target ganjil diganti agar memiliki "--y" 200 piksel.

Perlu diperhatikan bahwa beberapa subtarget dapat mencocokkan satu elemen target.

### Keyframe <a name="keyframes"></a>

Keyframe dapat ditentukan dengan berbagai cara yang dijelaskan di [bagian keyframe](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument) pada spesifikasi Animasi Web atau sebagai string yang merujuk ke nama `@keyframes` di CSS.

Berikut beberapa contoh umum definisi keyframe.

Shorthand format "to" bentuk objek menentukan status akhir 100%:
```text
{
  "keyframes": {"opacity": 0, "transform": "scale(2)"}
}
```

Shorthand format "from-to" bentuk objek menentukan status awal dan akhir 0 dan 100%:
```text
{
  "keyframes": {
    "opacity": [1, 0],
  "transform": ["scale(1)", "scale(2)"]
}
}
```

Shorthand format "value-array" bentuk objek menentukan beberapa nilai untuk status awal, akhir, dan beberapa offset (berjarak sama):
```text
{
  "keyframes": {
    "opacity": [1, 0.1, 0],
  "transform": ["scale(1)", "scale(1.1)", "scale(2)"]
}
}
```

Bentuk array menentukan keyframe. Offset ditetapkan secara otomatis pada 0, 100% dan berjarak sama di antaranya:
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
  {"opacity": 0, "transform": "scale(2)"}
]
}
```

Bentuk array juga dapat menyertakan "offset" secara eksplisit:
```text
{
  "keyframes": [
    {"opacity": 1, "transform": "scale(1)"},
  {"offset": 0.1, "opacity": 0.1, "transform": "scale(2)"},
{"opacity": 0, "transform": "scale(3)"}
]
}
```

Bentuk array juga dapat menyertakan "easing":
```text
{
  "keyframes": [
    {"easing": "ease-out", "opacity": 1, "transform": "scale(1)"},
  {"opacity": 0, "transform": "scale(2)"}
]
}
```

Untuk format keyframe lainnya, lihat [spesifikasi Animasi Web](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument).

Nilai properti menerima semua nilai CSS yang valid, termasuk `calc()`, `var()`, dan ekspresi CSS lainnya.

#### Keyframe dari CSS <a name="keyframes-from-css"></a>

Cara lain untuk menentukan keyframe ada dalam stylesheet dokumen (tag `<style>`) sebagai aturan CSS `@keyframes`. Misalnya:
```html
<style amp-custom>
  @keyframes keyframes1 {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

<amp-animation layout="nodisplay">
<script type="application/json">
{
  "duration": "1s",
  "keyframes": "keyframes1"
}
</script>
</amp-animation>
```

Sebagian besar `@keyframes` CSS setara dengan penempatan definisi keyframe secara inline di JSON sesuai [spesifikasi Animasi Web](https://www.w3.org/TR/web-animations/#processing-a-keyframes-argument). Namun, terdapat beberapa variasi:

- Untuk dukungan platform luas, prefiks vendor, misalnya `@-ms-keyframes {}` atau `-moz-transform` mungkin diperlukan. Prefiks vendor tidak diperlukan dan tidak diizinkan dalam format JSON, tetapi mungkin diperlukan dalam CSS.
- Platform yang tidak mendukung `calc()` dan `var()` tidak akan dapat memanfaatkan polyfill `amp-animation` jika keyframe ditentukan dalam CSS. Oleh karena itu, direkomendasikan untuk selalu menyertakan nilai fallback dalam CSS.
- Ekstensi CSS seperti [`width()`, `height()`, `num()`, `rand()`, `index()`, dan `length()`](#css-extensions) tidak dapat digunakan dalam CSS.

#### Properti yang diizinkan untuk keyframe <a name="allow-listed-properties-for-keyframes"></a>

Tidak semua properti CSS dapat digunakan dalam keyframe. Hanya properti CSS yang dapat dioptimalkan dan dianimasikan dengan cepat oleh browser modern yang diizinkan. Daftar ini akan bertambah dengan semakin banyaknya properti yang dikonfirmasi untuk memberikan performa yang baik. Saat ini daftar ini berisi:
- [`opacity`](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity)
- [`transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
- [`visibility`](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility)
- [`offset-distance`](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-distance)

Perlu diperhatikan bahwa penggunaan properti CSS yang diberi prefiks oleh vendor tidak diperlukan dan tidak diizinkan.

### Bentuk singkat konfigurasi animasi <a name="abbreviated-forms-of-animation-configuration"></a>

Jika animasi hanya melibatkan satu elemen, dan satu efek keyframe sudah memadai, konfigurasi dapat disederhanakan menjadi satu komponen animasi ini saja. Misalnya:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
{
  "selector": "#target-id",
  "duration": "1s",
  "keyframes": {"opacity": 1}
}
</script>
</amp-animation>
```

Jika animasi terdiri dari daftar komponen, tetapi tidak memiliki animasi level teratas, konfigurasi dapat disederhanakan menjadi sebuah array komponen. Misalnya:
```html
  <amp-animation layout="nodisplay">
  <script type="application/json">
  [
    {
      "selector": ".target-class",
      "duration": 1000,
      "keyframes": {"opacity": 1}
    },
    {
      "selector": ".target-class",
      "duration": 600,
      "delay": 400,
      "keyframes": {"transform": "scale(2)"}
    }
  ]
  </script>
  </amp-animation>
```

### Komposisi animasi <a name="animation-composition"></a>

Animasi dapat merujuk animasi lain sehingga menggabungkan beberapa deklarasi `amp-animation` menjadi satu animasi final. Merujuk animasi dari animasi lain secara umum sama dengan nesting (penyarangan). Alasan mengapa seseorang ingin membagi animasi menjadi beberapa elemen berbeda adalah agar dapat menggunakan kembali animasi yang sama dari beberapa tempat, atau agar setiap deklarasi animasi menjadi lebih kecil dan lebih mudah dikelola.

Misalnya:
```html
<amp-animation id="anim1" layout="nodisplay">
<script type="application/json">
{
  "animation": "anim2",
  "duration": 1000,
  "--scale": 2
}
</script>
</amp-animation>

<amp-animation id="anim2" layout="nodisplay">
<script type="application/json">
{
  "selector": ".target-class",
  "keyframes": {"transform": "scale(var(--scale))"}
}
</script>
</amp-animation>
```

Contoh animasi ini akan menggabungkan animasi "anim2" sebagai bagian dari "anim1". "Anim2" disertakan tanpa target (`selector`). Dalam kasus semacam ini, animasi yang disertakan diharapkan akan merujuk ke targetnya sendiri.

Bentuk lainnya memungkinkan penyertaan animasi untuk menyediakan satu atau beberapa target. Dalam kasus semacam ini, animasi yang disertakan dieksekusi untuk setiap target yang cocok. Misalnya:
```html
<amp-animation id="anim1" layout="nodisplay">
<script type="application/json">
{
  "selector": ".target-class",
  "animation": "anim2",
  "duration": 1000,
  "--scale": 2
}
</script>
</amp-animation>

<amp-animation id="anim2" layout="nodisplay">
<script type="application/json">
{
  "keyframes": {"transform": "scale(var(--scale))"}
}
</script>
</amp-animation>
```

Di sini, entah ".target-class" cocok dengan satu elemen, beberapa elemen, atau tidak cocok dengan elemen mana pun, "anim2" akan dieksekusi untuk setiap target yang cocok.

Variabel dan properti pengaturan waktu yang ditentukan dalam animasi caller juga diteruskan ke animasi yang disertakan.

### Ekspresi `var()` dan `calc()` <a name="var-and-calc-expressions"></a>

`amp-animation` memungkinkan penggunaan ekspresi `var()` dan `calc()` untuk nilai pengaturan waktu dan keyframe.

Misalnya:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
[
  {
    "selector": ".target-class",
    "duration": "4s",
    "delay": "var(--delay)",
    "--y": "var(--other-y, 100px)",
    "keyframes": {"transform": "translate(calc(100vh + 20px), var(--y))"}
  }
]
</script>
</amp-animation>
```

Baik `var()` maupun `calc()` di-polyfill pada platform yang tidak mendukungnya secara langsung. Properti `var()` diekstrak dari elemen target yang terkait. Namun, Anda tidak dapat mem-polyfill sepenuhnya properti `var()`. Jadi, jika kompatibilitas menjadi pertimbangan penting, sebaiknya sertakan nilai default dalam ekspresi `var()`. Misalnya:
```html
<amp-animation layout="nodisplay">
<script type="application/json">
[
  {
    "selector": ".target-class",
    "duration": "4s",
    "delay": "var(--delay, 100ms)",
  }
]
</script>
</amp-animation>
```

Komponen animasi dapat menentukan variabelnya sendiri sebagai kolom `--var-name`. Variabel ini disebarkan ke dalam animasi bersarang dan menggantikan variabel elemen target yang ditentukan melalui stylesheet (tag `<style>`). Ekspresi `var()` mula-mula mencoba mengetahui nilai variabel yang ditentukan dalam animasi dan kemudian mengkueri gaya target.

### Ekstensi CSS <a name="css-extensions"></a>

`amp-animation` menyediakan beberapa ekstensi CSS untuk keperluan animasi umum: `rand()`, `num()`, `width()`, dan `height()`. Fungsi ini dapat digunakan di mana pun nilai CSS dapat digunakan dalam `amp-animation`, termasuk nilai pengaturan waktu dan keyframe.

#### Ekstensi `index()` CSS <a name="css-index-extension"></a>

Fungsi `index()` menampilkan indeks elemen target saat ini dalam efek animasi. Hal ini paling relevan jika beberapa target dianimasikan dengan efek yang sama menggunakan properti `selector`. Target pertama yang cocok dengan selektor akan memiliki indeks `0`, target kedua memiliki indeks `1`, dan seterusnya.

Di antara hal-hal lainnya, properti ini dapat dikombinasikan dengan ekspresi `calc()` dan dapat digunakan untuk membuat efek bergilir. Misalnya:
```
{
  "selector": ".class-x",
  "delay": "calc(200ms * index())"
  }
```

#### Ekstensi `length()` CSS <a name="css-length-extension"></a>

Fungsi `length()` menampilkan jumlah elemen target dalam efek animasi. Hal ini paling relevan jika dikombinasikan dengan `index()`:

```
{
  "selector": ".class-x",
  "delay": "calc(200ms * (length() - index()))"
  }
```

#### Ekstensi `rand()` CSS <a name="css-rand-extension"></a>

Fungsi `rand()` menampilkan nilai CSS acak. Bentuknya ada dua.

Bentuk tanpa argumen hanya akan menampilkan angka acak antara 0 dan 1.
```
{
  "delay": "calc(10s * rand())"
  }
```

Bentuk kedua memiliki dua argumen dan menampilkan nilai acak antara kedua argumen tersebut.
```
{
  "delay": "rand(5s, 10s)"
  }
```

#### Ekstensi `width()` dan `height()` CSS <a name="css-width-and-height-extensions"></a>

Ekstensi `width()` dan `height()` menampilkan lebar/tinggi elemen animasi atau elemen yang ditentukan oleh selektor. Nilai ditampilkan dalam satuan piksel, misalnya `100px`.

Bentuk berikut didukung:

- `width()` dan `height()` - lebar/tinggi elemen animasi.
- `width('.selector')` dan `height('.selector')` - lebar/tinggi elemen yang ditentukan oleh selektor. Semua selektor CSS dapat digunakan. Misalnya, `width('#container &gt; li')`.
- `width(closest('.selector'))` dan `height(closest('.selector'))` - lebar/tinggi elemen yang ditentukan oleh selektor terdekat.

Ekstensi `width()` dan `height()` sangat berguna khususnya untuk properti transformi. `left`, `top`, dan properti CSS serupa dapat menggunakan nilai `%` untuk mengekspresikan animasi yang sebanding dengan ukuran container. Namun, properti `transform` menafsirkan nilai `%` secara berbeda - sebagai persentase dari elemen yang dipilih. Dengan demikian, `width()` dan `height()` dapat digunakan untuk mengekspresikan animasi transformasi dari segi elemen container dan sejenisnya.

Fungsi ini dapat dikombinasikan dengan `calc()`, `var()` dan ekspresi CSS lainnya. Misalnya:
```
{
  "transform": "translateX(calc(width('#container') + 10px))"
  }
```

#### Ekspresi `num()` CSS <a name="css-num-extension"></a>

Fungsi `num()` menampilkan representasi angka dari sebuah nilai CSS. Misalnya:

- `num(11px)` menghasilkan `11`;
- `num(110ms)` menghasilkan `110`;
- dll.

Sebagai contoh, ekspresi berikut menghitung penundaan dalam detik yang sebanding dengan lebar elemen:
```
{
  "delay": "calc(1s * num(width()) / 100)"
  }
```

### Animasi SVG <a name="svg-animations"></a>

SVG sangat canggih dan kami sangat merekomendasikannya untuk animasi!

Animasi SVG didukung melalui properti CSS yang sama seperti yang dijelaskan dalam [Properti yang diizinkan untuk keyframe](#allow-listed-properties-for-keyframes) dengan beberapa variasi:

* Elemen IE/Edge SVG [tidak mendukung properti `transform` CSS](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/1173754/). Animasi `transform` itu sendiri di-polyfill. Namun, status awal yang ditentukan dalam stylesheet tidak diterapkan. Jika status transformasi awal dibutuhkan di IE/Edge, sebaiknya duplikasikan melalui [atribut `transform` SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform).
* Meskipun `transform` CSS di-polyfill untuk IE/Edge, sayangnya `transform-origin` tidak dapat di-polyfill. Jadi, jika kompatibilitas dengan IE/Edge menjadi pertimbangan penting, sebaiknya gunakan hanya `transform-origin` default.
* Saat ini, sebagian besar browser mengalami masalah dalam menafsirkan `transform-origin` CSS dengan benar. Lihat masalah untuk [Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=740300), [Safari](https://bugs.webkit.org/show_bug.cgi?id=174285) dan [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1379340). Sebagian besar kebingungan ini akan terselesaikan setelah [`transform-box` CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-box) diimplementasikan. Meskipun `transform-origin` itu penting, sebaiknya sertakan juga `transform-box` CSS yang diinginkan untuk kompatibilitas di masa mendatang.

## Memicu animasi <a name="triggering-animation"></a>

Animasi dapat dipicu melalui atribut `trigger` atau tindakan `on`.

### Atribut `trigger` <a name="trigger-attribute"></a>

Saat ini, `visibility` adalah satu-satunya nilai yang tersedia untuk atribut `trigger`. `visibility` dipicu saat dokumen atau sematan sumber terlihat (di viewport).

Misalnya:
```html
<amp-animation id="anim1" layout="nodisplay"
    trigger="visibility">
    ...
  </amp-animation>
```

### Memicu melalui tindakan `on` <a name="triggering-via-on-action"></a>

Misalnya:

```html
<amp-animation id="anim1" layout="nodisplay">
  ...
</amp-animation>
<button on="tap:anim1.start">Animate</button>
```

## Tindakan `on` <a name="on-actions"></a>

Elemen `amp-animation` mengekspor tindakan berikut:

* `start` - Memulai animasi jika belum dijalankan. Properti dan variabel pengaturan waktu dapat ditentukan sebagai argumen tindakan. Misalnya, `anim1.start(delay=-100, --scale=2)`.
* `restart` - Memulai animasi atau memulai ulang animasi yang sedang dijalankan. Properti dan variabel pengaturan waktu dapat ditentukan sebagai argumen tindakan. Misalnya, `anim1.start(delay=-100, --scale=2)`.
* `pause` - Menjeda animasi yang sedang berjalan.
* `resume` - Melanjutkan lagi animasi yang sedang berjalan.
* `togglePause` - Beralih antara tindakan jeda/lanjutkan.
* `seekTo` - Menjeda animasi dan mencari ke titik waktu yang ditetapkan oleh argumen `time` dalam milidetik atau argumen `percent` sebagai titik persentase dalam timeline.
* `reverse` - Membalik animasi.
* `finish` - Menyelesaikan animasi.
* `cancel` - Membatalkan animasi.
