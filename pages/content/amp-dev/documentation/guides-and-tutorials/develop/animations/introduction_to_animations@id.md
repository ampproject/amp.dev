---
"$title": Pengantar untuk animasi kompleks
"$order": '2'
description: Untuk animasi yang tidak dapat digerakkan dengan menambahkan dan menghapus kelas, AMP menawarkan beberapa komponen yang spesifik untuk animasi. Komponen-komponen ini menerapkan prinsip-prinsip AMP pada animasi ....
formats:
- websites
- ads
author: CrystalOnScript
---

Untuk animasi yang tidak dapat digerakkan dengan [menambahkan dan menghapus kelas](triggering_css_animations.md), AMP menawarkan beberapa komponen yang spesifik untuk animasi. Komponen-komponen ini menerapkan prinsip-prinsip AMP pada animasi: cepat, efisien, dan mengutamakan pengguna. AMP membatasi properti CSS apa di dalam keyframe yang diizinkan, namun memberikan keuntungan, seperti kontrol mendetail, animasi mulus, dan kompatibilitas lintas browser tanpa kerja ekstra.

Gunakan amp-animation jika Anda perlu mengontrol pemutaran secara ketat serta mempunyai penghitungan waktu yang akurat dengan beberapa elemen yang beranimasi pada saat yang sama.

## Membuat animasi AMP dasar

Komponen [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) memungkinkan penggunaan [API Animasi Web](https://www.w3.org/TR/web-animations/) di dalam AMP.

Sebuah [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) dasar adalah objek JSON yang terbuat dari bagian-bagian penting berikut ini:

- Elemen komponen beranimasi, atau `selector`.
- [Properti Penghitungan Waktu](../../../../documentation/components/reference/amp-animation.md#timing-properties)
- [Keyframe](../../../../documentation/components/reference/amp-animation.md#keyframes)
- [Pemicu](../../../../documentation/components/reference/amp-animation.md#triggering-animation)

```
<amp-animation layout="nodisplay" id="exampleAnimation">
<script type="application/json">
{
 "selector": "#elementID", //select the element to animate
 "duration": "1s", //timing property
 "iterations": 2, //timing property
 "fill": "both", //timing property
 "keyframes": {"opacity": 0, "transform": "scale(2)"} //keyframes
}
</script>
</amp-animation>
<!-- trigger -->
<button on="tap:exampleAnimation.start">
```

### Pemilih

Serupa dengan CSS, komponen [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) menautkan properti animasi ke elemen dengan menyatakan nama, kelas, atau ID elemen di dalam bidang `"selector"` Komponen tersebut menganimasi setiap elemen dengan jenis tag atau nama kelas yang dinyatakan. Gunakan sebuah ID untuk memastikan Anda menganimasi elemen tunggal.

### Properti penghitungan waktu

[Properti penghitungan waktu](../../../../documentation/components/reference/amp-animation.md#timing-properties) mengontrol berapa lama animasi berlangsung, berapa kali diputar, dan keyframe arah mana yang bekerja.

Tidak diperlukan properti penghitungan waktu, namun animasi mungkin tidak berjalan jika properti yang terkait dengan waktu dan tampilan tidak ada, seperti `duration` dan `fill`.

### Keyframe

Meskipun CSS mengizinkan Anda untuk melakukan morfing dari satu status ke yang lainnya melalui transisi, Anda harus menyatakan properti animasi sebagai keyframe untuk menerapkan [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) (serupa dengan [animasi CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)). Untuk memastikan pemutaran yang mulus dan kompatibilitas lintas browser, [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) [membatasi apa properti keyframe](../../../../documentation/components/reference/amp-animation.md#allow-listed-properties-for-keyframes) yang dapat digunakan pada properti GPU yang dipercepat yang tidak menyebabkan pengulangan tata letak dan dapat menganimasi pada [utas kompositor](https://dev.chromium.org/developers/design-documents/compositor-thread-architecture). Ini mencegah animasi mengganggu AMP dan [merender proses](https://developers.google.com/web/updates/2018/09/inside-browser-part3#javascript_can_block_the_parsing) browser.

[tip type="note"] Keyframe didefinisikan secara langsung di dalam sebuah [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) atau dirujuk dari [`<amp style-keyframe>`](../../../../documentation/guides-and-tutorials/learn/spec/amphtml.md#keyframes-stylesheet) sepanjang mereka mengikuti pembatasan properti. Baca selengkapnya [di sini tentang keyframe di dalam `amp-animation`](../../../../documentation/components/reference/amp-animation.md#keyframes). [/tip]

### Pemicu

Pemicu memulai urutan animasi. Ekstensi [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) dimulai baik saat `<body>` menjadi terlihat di halaman atau dengan menghubungkannya ke sebuah [peristiwa atau tindakan AMP](../../../../documentation/guides-and-tutorials/learn/amp-actions-and-events.md)

Pemicuan saat `<body>` dapat dilihat berguna ketika animasi seharusnya berjalan begitu halaman memuat karena ia muncul “di atas lipatan”, atau dalam viewport pertama halaman tersebut. Pemicu animasi melalui visibilitas dengan menambahkan `trigger="visibility"` sebagai atribut pada komponen.

```
<amp-animation layout="nodisplay"
    trigger="visibility">
  ...
</amp-animation>
```

Animasi terhubung ke suatu tindakan atau peristiwa dengan memberi komponen [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) sebuah `id` dan menautkan `id` tersebut ke pemicu peristiwa yang diinginkan, seperti mengetuk sebuah tombol.

```
<amp-animation layout="nodisplay" id="exampleAnimation">
  ...
</amp-animation>

<button on="tap:exampleAnimation.start">
```

## Membuat animasi yang kompleks

Membuat suatu animasi dalam [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) memungkinkan kontrol mendetail yang melampaui kegiatan memulai dan menghentikan animasi: ini juga dapat menjeda, membalik, dan mengarahkan ke titik yang spesifik. Anda bahkan dapat merangkai beberapa animasi bersama dan menganimasi elemen dalam suatu urutan.

### Subtarget

Elemen tag atau kelas yang sama dapat mempunyai properti penghitungan waktu yang ditentukan dan menimpa nilai-nilai variabel yang telah ditentukan pada animasi tingkat atas.

[example preview="top-frame" playground="true" imports="amp-animation"]
```html
<body>
  <h1>Hello World!</h1>
  <h1>Hello World!</h1>
  <h1 id="helloMe">Hello World!</h1>
  <h1>Hello World!</h1>
  <amp-animation layout="nodisplay" id="animateThis">
    <script type="application/json">
      {
        "selector": "h1",
        "duration": "3s",
        "fill": "both",
        "keyframes": [{"transform": "translateX(0px)"}, {"transform": "translateX(50%)"}],
        "subtargets": [
          {
            "index": 1,
            "duration": "1s"
          },
          {
            "selector": "#helloMe",
            "direction": "reverse",
            "duration": "5s"
          }
        ]
      }
    </script>
  </amp-animation>
  <button on="tap:animateThis.start">
   start
  </button>
</body>
```
[/example]

### Animasi berantai

Beberapa animasi dapat terhubung untuk membentuk urutan yang panjang. Anda dapat membuat efek terjadwal, seperti hamparan pada video, dengan menulis animasi dalam susunan `animations` dalam komponen [`amp-animation`](../../../../documentation/components/reference/amp-animation.md).

```
<amp-animation id="overlaysAnim" layout="nodisplay">
  <script type="application/json">
    {
      "duration": "3s",
      "fill": "both",
      "animations": [{
          "selector": ".one",
          "keyframes": [{
              "opacity": "1",
              "offset": 0
            },
            {
              "opacity": "1",
              "offset": 0.04
            },
            {
              "opacity": "0",
              "offset": 0.0401
            },
            {
              "opacity": "0",
              "offset": 1
            }
          ]
        },
      ]
    }
  </script>
</amp-animation>
```

Pengaturan ini memutar setiap animasi selama 3 detik dalam satu urutan.

Untuk animasi yang lebih besar, animasi di dalam susunan `animations` mampu merujuk komponen [`amp-animation`](../../../../documentation/components/reference/amp-animation.md) lain.

```
<amp-animation id="addEnergy" layout="nodisplay">
  <script type="application/json">
  {
    "duration": "0.3s",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": "#energy",
        "keyframes": [
          {"transform": "scaleX(calc(num(width('#energy'))/10))"},
          {"transform": "scaleX(calc(num(width('#energy'))/10 + 3))"}
        ]
      },
      {
        "animation": "atomExcite"
      }
    ]
  }
  </script>
</amp-animation>


<amp-animation id="atomExcite" layout="nodisplay" trigger="visibility">
<script type="application/json">
  {
    "duration": "0.3s",
    "iterations": "2",
    "fill": "both",
    "direction": "alternate",
    "animations": [
      {
        "selector": ".atom",
        "keyframes": {
          "transform": "translate(20vw)"
        }
      }
    ]
  }
  </script>
</amp-animation>
```

### Menganimasi jumlah elemen yang tidak diketahui

Dengan menggunakan [ekspresi `var()` dan `calc()`](../../../../documentation/components/reference/amp-animation.md) bersama [ekstensi CSS](../../../../documentation/components/reference/amp-animation.md#css-extensions), Anda dapat menulis animasi yang kompleks dan terjadwal yang berfungsi dengan berapa pun jumlah elemen. Ini memungkinkan data yang dibuat pengguna dan data yang dinamis dapat dianimasi dengan mudah dan mulus.

[example preview="top-frame" playground="true"]
```html
<head>
  <script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></script>
  <style amp-custom>
    .parent {
      perspective: 1000px;
      transform-style: preserve-3d;
      position: relative;
      margin: 10px;
      width: 239px;
      height: 335px;
    }
    .card {
      transform-origin: left;
      height: 50%;
      width: 50%;
    }
  </style>
</head>
<body>
  <amp-animation layout="nodisplay" id="cardAdmin">
    <script type="application/json">
      {
        "selector": ".card",
        "--duration": "2s",
        "duration": "var(--duration)",
        "delay": "calc((length() - index() - 1) * var(--duration))",
        "easing": "ease-in",
        "iterations": "1",
        "fill": "both",
        "keyframes": [
            {"transform": "translate3d(0px, 0px, 0px)"},
            {"transform": "translate3d(50%, 0px, 100px)"},
            {"transform": "translate3d(110%, 0px, 0px) rotateY(-20deg)"},
            {"transform": "translate3d(50%, 0px, -100px)"},
            {"transform": "translate3d(0px, 0px, -1px)"}
        ]
      }
    </script>
  </amp-animation>
  <div class="parent" on="tap:cardAdmin.start" tabindex=none role="animation">
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/7/70/3C.svg" layout="fill"></amp-img>
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/3/3a/3H.svg" layout="fill"></amp-img>
    <amp-img class="card" src="https://upload.wikimedia.org/wikipedia/commons/e/e1/KC.svg" layout="fill"></amp-img>
  </div>
</body>
```
[/example]

- Menyatakan sebuah variabel, `--duration`, dan memberinya nilai selama dua detik.
- Menetapkan `duration` pada nilai `--duration` variabel.
- Menghitung penundaan yang diterapkan pada setiap elemen dengan yang memenuhi `.card` pemilih.
    1. [Ekstensi `length()` ](../../../../documentation/components/reference/amp-animation.md#css-length()-extension) menghitung berapa jumlah elemen `.card` yang dipilih
    2. Panjang lalu mengurangi setiap [indeks()](../../../../documentation/components/reference/amp-animation.md#css-index()-extension)`.card`
    3. Nilai hasil dikalikan dengan `--duration` variabel
    4. Total jumlah final diterapkan dalam detik pada penundaan elemen itu
- Animasi diterapkan pada setiap elemen secara terpisah sehingga kartu diacak satu demi satu, bukan sekaligus.

Buka animasi di AMP playground dan tambahkan lebih banyak elemen [`amp-img`](../../../../documentation/components/reference/amp-img) untuk menguji perilaku ini.

### Tampak bagus, di mana pun

Animasi dapat menyertakan [`conditions`](../../../../documentation/components/reference/amp-animation.md#conditions) yang mengizinkan efek yang disesuaikan. Sesuaikan animasi dengan ukuran layar apa pun melalui [kondisi `media`](../../../../documentation/components/reference/amp-animation.md#media-query) dan dukung kompatibilitas browser mundur dengan mengaktifkan [kondisi `supports`](../../../../documentation/components/reference/amp-animation.md#supports-condition) dalam sebuah [pernyataan `switch`](../../../../documentation/components/reference/amp-animation.md#animation-switch-statement).

[example preview="top-frame" playground="true"]
```html
<head>
 <style amp-custom>
    .drop {
      width: 20px;
      height: 20px;
      background: blue;
      margin-top: 1em;
      border-radius: 50%;
    }
    .right {
      position: absolute;
      right: 0;
      background: red;
    }
  </style>
  <script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></script>
</head>
<body>
<amp-animation id="mediaAnimation" layout="nodisplay">
  <script type="application/json">
    {
      "duration": "1s",
      "iterations": "4",
      "fill": "both",
      "direction": "alternate",
      "animations": [
        {
          "media": "(min-width: 300px)",
          "selector": ".drop",
          "keyframes": {
            "transform": "translate(100vw)"
          }
        },
        {
          "media": "(max-width: 300px)",
          "selector": ".drop",
          "keyframes": {
            "transform": "translate(50vw)"
          }
        },
        {
          "media": "(min-width: 300px)",
          "selector": ".right",
          "keyframes": {
            "transform": "translate(-100vw)"
          }
        },
        {
          "media": "(max-width: 300px)",
          "selector": ".right",
          "keyframes": {
            "transform": "translate(-50vw)"
          }
        }
      ]
    }
  </script>
</amp-animation>
    
  <div class="rain">
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
    <div class="drop"></div>
    <div class="drop right"></div>
  </div>
  <button on="tap:mediaAnimation.start">Start</button>
</body>
```
[/example]
