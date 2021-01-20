---
"$title": Memicu transisi & animasi CSS
"$order": '1'
description: Memicu animasi CSS pada halaman mengandalkan penambahan dan penghapusan kelas, dilakukan melalui JavaScript. Anda bisa mendapatkan perilaku yang sama pada halaman AMP dengan menggunakan tindakan toggleClass ....
formats:
- websites
- ads
---

Animasi CSS memungkinkan elemen web untuk bertransisi dari satu konfigurasi gaya CSS ke yang lain. Browser dapat memulai animasi yang telah ditentukan saat dimuat, namun animasi CSS yang dipicu peristiwa [bergantung pada penambahan dan penghapusan kelas](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations). AMP mendukung kedua jenis animasi.

Gunakan CSS jika Anda mempunyai animasi berisi yang lebih kecil yang tidak perlu penetapan waktu yang akurat.

## Menentukan CSS dan keyframe

Anda dapat menentukan CSS dalam AMP dengan cara berikut ini:

[filter formats="websites, stories"]

- Dalam tag `<style amp-custom>` di dalam tajuk dokumen. Batas 75.000 byte.
- Gaya inline. Setiap gaya inline mempunyai batas 1.000 byte. Gaya inline dihitung hingga batas 75.000 byte `<style amp-custom>`.
- Dalam tag `<style amp-keyframes>` di dalam tajuk dokumen. Batas 500.000 byte. Dibatasi pada properti keyframe.

[/filter]

[filter formats="ads"]

- Dalam tag `<style amp-custom>` di dalam tajuk dokumen. Batas 20.000 byte.
- Gaya inline. Setiap gaya inline mempunyai batas 1.000 byte. Gaya inline dihitung hingga batas 20.000 byte `<style amp-custom>`.
- Dalam tag `<style amp-keyframes>` di dalam tajuk dokumen. Batas 500.000 byte. Dibatasi pada properti keyframe.

[/filter]

[tip type="read-on"] Baca selengkapnya di [Gaya & tata letak](../style_and_layout/index.md) tentang menggunakan CSS dalam AMP. [/tip]

[filter formats="websites, stories"] Agar halaman Anda tetap ramping dan kencang, AMP telah menerapkan batas CSS 75.000 byte pada tag `<amp style-custom>`. Walaupun Anda dapat menggunakan ini untuk menentukan gaya animasi, batas 500.000 byte di dalam tag `<amp style-keyframes>` memungkinkan lebih banyak animasi berlebihan yang tidak akan menghabiskan sumber daya gaya situs yang berharga. [/filter]

[filter formats="ads"] Agar iklan Anda tetap ramping dan kencang, AMP telah menerapkan batas CSS 20.000 byte pada tag `<amp style-custom>`. Walaupun Anda dapat menggunakan ini untuk menentukan gaya animasi, batas 500.000 byte di dalam tag `<amp style-keyframes>` memungkinkan lebih banyak animasi berlebihan yang tidak akan menghabiskan sumber daya gaya situs yang berharga. [/filter]

```html
  <style amp-custom>
    div {
      width: 100px;
      height: 100px;
      background: red;
      position: relative;
      animation: mymove 5s infinite;
    }
  </style>
</head>
<body>

<div></div>
  <style amp-keyframes>
   @keyframes mymove {
      0%   {transform: translatey(0px);}
      25%  {transform: translatey(200px);}
      75%  {transform: translatey(50px);}
      100% {transform: translatey(100px);}
    }
  </style>
</body>
```

## Menambahkan, menghapus, dan mengalihkan kelas

Tindakan AMP, `toggleClass` memungkinkan penambahan dan penghapusan kelas pada elemen yang telah ditentukan.

```js
elementName.toggleClass(class="className")
```

Anda dapat mengalihkan kelas pada elemen yang sama yang Anda inginkan berinteraksi dengan pengguna, seperti menu hamburger animasi.

```html
 <div id="hamburger" tabindex=1 role=button on="tap:hamburger.toggleClass(class='close')">
```

Tindakan `toggleClass` dapat berlaku pada elemen lain serta beralih di antara dua kelas dengan menambahkan atribut `force`.

```html
<button on="tap:magicBox.toggleClass(class='invisible', force=true),magicBox.toggleClass(class='visible', force=false)">
  Disappear
</button>
<button on="tap:magicBox.toggleClass(class='visible', force=true),magicBox.toggleClass(class='invisible', force=false)">
  Reappear
</button>
```

Jika Anda perlu menghapus sebuah kelas dan tidak mengizinkan penerapan ulang, tambahkan atribut `force` dengan nilai `false`. Jika Anda perlu menambahkan dan tidak mengizinkan penghapusan, tambahkan `force` dengan nilai `true`.

## Animasi dengan CSS dan status

Anda dapat menambahkan dan menghapus berapa pun jumlah kelas CSS dengan status yang menggunakan [`amp-bind`](../../../../documentation/components/reference/amp-bind.md).

[example preview="top-frame" playground="true"]
```html
<head>
  <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
  <style amp-custom>
    div {
      height: 100px;
      width: 100px;
      margin: 1em;
      background-color: green;
      margin-left: 100px;
      transition: 2s;
    }
    .visible {
      opacity: 1;
    }
    .invisible {
      opacity: 0;
    }
    .left {
      transform: translatex(-50px)
    }
    .right {
      transform: translatex(50px)
    }
    button {
      margin-top:  1rem;
      margin-left: 1rem;
    }
  </style>
</head>
<body>
  <amp-state id="magicBox">
    <script type="application/json">
      {
        "visibleBox": {
          "className": "visible"
        },
        "invisibleBox": {
          "className": "invisible"
        },
        "moveLeft": {
          "className": "left"
        },
        "moveRight": {
          "className": "right"
        }
      }
    </script>
  </amp-state>
  <div [class]="magicBox[animateBox].className"> </div>
  <button on="tap:AMP.setState({animateBox: 'invisibleBox'})">
    Disappear
  </button>
  <button on="tap:AMP.setState({animateBox: 'visibleBox'})">
    Reappear
  </button>
  <button on="tap:AMP.setState({animateBox: 'moveLeft'})">
    Move Left
  </button>
  <button on="tap:AMP.setState({animateBox: 'moveRight'})">
    Move Right
  </button>
</body>
```
[/example]

Tentukan beberapa kelas animasi dengan terlebih dahulu menambahkan daftar kelas CSS dalam tag `<style amp-custom>` di dalam `head` dokumen:

```css
    .visible {
      opacity: 1;
    }
    .invisible {
      opacity: 0;
    }
    .left {
      transform: translatex(-50px)
    }
    .right {
      transform: translatex(50px)
    }
```

Lalu, pasangkan setiap kelas dengan sebuah status:

```html
<amp-state id="magicBox">
  <script type="application/json">
    {
      "visibleBox": {
        "className": "visible"
      },
      "invisibleBox": {
        "className": "invisible"
      },
      "moveLeft": {
        "className": "left"
      },
      "moveRight": {
        "className": "right"
      }
    }
  </script>
</amp-state>
```

Dan tautkan elemen dengan kelas:

```html
  <div [class]="magicBox[animateBox].className"> </div>
```

Status berubah dari peristiwa atau tindakan AMP yang tertaut. Contoh berikut ini mengubah status dari interaksi pengguna:

```html
<button on="tap:AMP.setState({animateBox: 'invisibleBox'})">
    Disappear
</button>
<button on="tap:AMP.setState({animateBox: 'visibleBox'})">
    Reappear
</button>
<button on="tap:AMP.setState({animateBox: 'moveLeft'})">
    Move Left
</button>
<button on="tap:AMP.setState({animateBox: 'moveRight'})">
  Move Right
</button>
```

Menggunakan [`amp-bind`](../../../../documentation/components/reference/amp-bind.md) dengan cara ini akan menetapkan kelas secara eksplisit pada kelas yang telah ditentukan. Anda tidak akan perlu menyuruhnya untuk menghapus kelas lain.
