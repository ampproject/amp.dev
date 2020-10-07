---
$title: Gunakan JavaScript kustom di halaman AMP
$order: 7
author: CrystalOnScript
contributors:
- fstanis
description: Untuk sejumlah pengalaman web yang membutuhkan jumlah kustomisasi yang tinggi, AMP telah membuat amp-script, sebuah komponen yang memungkinkan penggunaan JavaScript sesuai keinginan Anda pada halaman AMP tanpa memengaruhi kinerja keseluruhan halaman.
---

AMP berupaya keras untuk menyediakan pengalaman luar biasa dan konsisten kepada semua pengguna di seluruh web dengan mendorong penggunaan komponen-komponen dengan fungsi yang tinggi dan tanpa hambatan yang siap untuk digunakan.

Beberapa pengalaman web membutuhkan jumlah kustomisasi yang tinggi yang melampaui kemampuan pengikatan status [`amp-bind`](../../../documentation/components/reference/amp-bind.md?format=websites) dan pengambilan data dinamis serta fungsi pembuatan templat [`amp-list`](../../../documentation/components/reference/amp-list.md?format=websites) dan [`amp-mustache`](../../../documentation/components/reference/amp-mustache.md?format=websites). Untuk kasus-kasus yang tidak biasa, AMP telah membuat [`<amp-script>`](../../../documentation/components/reference/amp-script.md?format=websites), sebuah komponen yang memungkinkan penggunaan JavaScript sesuai keinginan Anda pada halaman AMP tanpa memengaruhi kinerja keseluruhan halaman.

# Menyelipkan JavaScript kustom

Halaman AMP mendukung JavaScript kustom melalui komponen `<amp-script>`. Contoh di bawah ini memperlihatkan cara menggunakan `amp-script` dengan berkas JavaScript yang dimuat dari URL:

```html
<!doctype html>
<html ⚡>
<head>
  ...
  <script async custom-element="amp-script" src="https://cdn.ampproject.org/v0/amp-script-0.1.js"></script>
<body>
  ...
  <amp-script layout="container" src="https://example.com/myfile.js">
    <p>Initial content that can be modified from JavaScript</p>
  </amp-script>
  ...
</body>
</html>
```

Komponen `<amp-script>` mendaftarkan sebuah [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) untuk bekerja pada utas yang terpisah dari halaman utama. Web Worker tersebut menerima salinan DOM-nya sendiri melalui penggunaan `amp-script` atas [Worker DOM](https://github.com/ampproject/worker-dom). Ini memungkinkan Web Worker untuk menggunakan perpustakaan JavaScript, seperti [React](https://reactjs.org/) dan [jQuery](https://jquery.com/), tanpa modifikasi.

Komponen `amp-script` mengirimkan pesan antara utas Web Worker dan utas utama, sehingga perubahan apa pun yang dibuat pengguna pada DOM utama akan ditirukan di DOM palsu Web Worker. Pada gilirannya, Web Worker akan dapat memperbarui DOM palsu, yang akan tercermin pada DOM utama.

## Penyimpanan skrip kustom di cache

[Cache AMP](../../../documentation/guides-and-tutorials/learn/amp-caches-and-cors/how_amp_pages_are_cached.md) melayani berkas JavaScript kustom yang diselipi dengan `<amp-script>` dengan cara yang sama seperti melayani skrip komponen AMP, dan ini memastikan bahwa JavaScript kustom apa pun tidak akan memperlambat kecepatan dokumen AMP.

Cache AMP mewakili berkas JavaScript, lalu mengirimkannya. Pengguna dapat mengharapkan pengalaman kinerja yang sama dari halaman yang menggunakan `<amp-script>` seperti halaman yang tidak menyertakannya.

# Menggunakan `<amp-script>`

Untuk menjamin halaman AMP akan selalu dimuat dengan cepat dan dengan UI yang mulus, ada pembatasan pada `<amp-script>`.

## Permulaan

JavaScript di dalam Web Worker memungkinkan perubahan minimal pada DOM saat dimuat. Perubahan yang diizinkan selama fase ini adalah:

- Mendaftarkan pengurus (handler) peristiwa.
- Membagi TextNode menjadi beberapa TextNode, untuk memungkinkannya bagi kerangka kerja yang memerlukannya

DOM di dalam tag `<amp-script>` harus nyaris identik sebelum dan sesudah permulaan.

Contohnya, jika dimulai dengan kode di bawah ini:

```html
<text> Hello world </text>
```

DOM pekerja mengizinkan perubahan minor pada struktur, namun tidak mengizinkannya pada konten:

```html
 <text>Hello </text><text>world</text>
```

## Manipulasi DOM

Demi pengalaman dan keamanan pengguna, `amp-script` menerapkan pembatasan manipulasi DOM.

### Interaksi pengguna

Saat seorang pengguna berinteraksi dengan elemen yang dibungkus di dalam komponen `<amp-script>`, JavaScript kustom Anda harus menghasilkan manipulasi DOM dengan cepat ketika dibutuhkan. Sebagai standar, perubahan pada DOM diizinkan **kurang dari satu detik** dari interaksi awal. Pengecualian yang besar adalah ketika kode Anda harus mengambil data dari jaringan melalui `fetch`. Di sini, perubahan DOM dapat diminta setelah tanggapan dikembalikan ke pengguna dan selama **kurang dari satu detik** setelah itu. Jika sebuah skrip memutasi DOM di luar batas yang diizinkan, ini akan mengakibatkan kesalahan fatal dan komponen `<amp-script>` akan mengakhiri Web Worker. Komponen `<amp-script>` yang telah diakhiri tidak akan bekerja kembali.

### Perubahan yang tidak diminta

Tidak diperlukan interaksi pengguna untuk memanipulasi DOM jika komponen `<amp-script>` mempunyai ketinggian tetap.

## Ukuran skrip

AMP menerapkan batas sebesar 150 kilobyte JavaScript kustom pada setiap halaman. Batas ini dibagi di antara semua komponen `<amp-script>` pada halaman itu. Perpustakaan JavaScript eksternal apa pun harus diimpor ke setiap komponen `<amp-script>`.

## Cakupan

Setiap elemen DOM yang diinginkan berkas JavaScript kustom untuk berinteraksi dengannya harus dibungkus di dalam tag komponen `<amp-script>`. Ini termasuk komponen-komponen AMP lain. Komponen `<amp-script>` menganggap `document.body` sebagai elemen `<amp-script>` dan bukan elemen `<body>` dokumen.

Jika Anda ingin memanggil `document.body.appendChild(document.createElement('span'))` di dalam skrip yang diimpor ke dalam sebuah elemen `<amp-script>` di dalam dokumen berikut ini:

```html
<body>
  <p>Hello!</p>
  <div>
    <amp-script layout="container" src="customjs.js">
    </amp-script>
  </div>
</body>
```

Hasilnya akan seperti ini:

```html
<body>
  <p>Hello!</p>
  <div>
    <amp-script layout="container" src="customjs.js">
      <span></span>
    </amp-script>
  </div>
</body>
```

## Pemicu peristiwa

Semua pemicu peristiwa diizinkan.

## Pembatasan API <a name="api-restrictions"></a>

Beberapa metode sinkron tidak diizinkan di dalam `<amp-script>` dan diganti dengan alternatif, seperti [`Element.getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)). Karena `Element.getBoundingClientRect()` tidak dapat diterapkan di dalam sebuah Web Worker, alternatif asinkronnya, `getBoundingClientRectAsync()`, akan disediakan. `getBoundingClientRectAsync()` menghasilkan [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) bukan memberikan hasil secara langsung.

Lihat [bagan ini](https://github.com/ampproject/worker-dom/blob/main/web_compat_table.md) untuk melihat API yang didukung WorkerDOM.
