---
$title: Membuat halaman AMP responsif
---

## Pendahuluan

Desain web yang responsif adalah tentang membuat halaman lancar yang merespons kebutuhan pengguna Anda—halaman yang sesuai dengan orientasi dan ukuran layar perangkat mereka.  Anda dapat membuatnya dengan mudah di AMP.  AMP mendukung semua kategori perangkat dan layar, serta menyediakan komponen bawaan yang responsif.

Dalam panduan ini, kami akan menunjukkan cara menerapkan dasar-dasar komponen responsif tersebut di AMP dengan mudah:

- [Mengontrol viewport](#mengontrol-viewport)
- [Membuat tata letak responsif](#membuat-tata-letak-responsif)
- [Mengubah skala media](#mengubah-skala-media-untuk-halaman)

## Mengontrol viewport

Guna mengoptimalkan halaman sehingga konten diubah skalanya dan menyesuaikan jendela browser untuk semua perangkat, Anda harus menentukan elemen viewport `meta`. Elemen viewport memberikan petunjuk ke browser tentang cara mengubah skala dan menyesuaikan ukuran area yang terlihat (viewport) dari halaman.

Namun, nilai apa yang harus digunakan?  Di AMP, nilai tersebut sudah tersedia untuk Anda.  Sebagai bagian dari [markup yang diperlukan]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/learn/spec/amp-boilerplate.md', locale=doc.locale).url.path}}#required-markup) untuk halaman AMP, Anda harus menentukan viewport berikut:

```html
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
```

Setelan tersebut adalah setelan viewport umum yang digunakan untuk situs responsif. Meskipun `initial-scale=1` tidak diperlukan untuk halaman AMP yang valid, komponen ini direkomendasikan karena akan menetapkan level zoom ke 1 saat halaman dimuat pertama kali.

## Membuat tata letak responsif

Dengan desain yang responsif, Anda dapat menggunakan kueri CSS [`@media`](https://developer.mozilla.org/en-US/Web/CSS/@media) guna menyesuaikan gaya halaman untuk berbagai dimensi layar, tanpa harus mengubah konten halaman.  Di AMP, Anda tetap dapat menggunakan kueri `@media` CSS yang sama. Selain itu, agar elemen AMP mendapakan kontrol yang lebih baik, Anda dapat menentukan atribut `media` pada elemen. Cara ini khususnya berguna saat Anda perlu menampilkan atau menyembunyikan elemen berdasarkan kueri media. Lihat bagian [Mengubah gambar responsif dari suatu gambar](#mengubah-gambar-responsif-dari-suatu-gambar) untuk mengetahui contoh penggunaan atribut `media`.

Mengubah ukuran setiap elemen agar sesuai dengan ukuran layar bisa jadi rumit<sup><a href="#fn1" id="ref1">*</a></sup>.  Tapi di AMP, Anda dapat membuat elemen responsif hanya dengan menentukan atribut `"layout=responsive"` beserta atribut `width` dan `height` elemen. Saat Anda menerapkan tata letak `responsive` ke sebuah elemen, elemen tersebut otomatis akan berubah ukurannya sesuai dengan lebar elemen penampungnya, dan tinggi elemen akan berubah berdasarkan rasio tinggi lebar yang ditentukan oleh `width` dan `height` elemen. Hampir semua elemen AMP mendukung tata letak `responsive`; buka dokumentasi referensi elemen untuk mengetahui tata letak apa saja yang didukung.

Meskipun Anda dapat membuat elemen responsif dengan mudah menggunakan `"layout=responsive"`, Anda tetap harus mempertimbangkan tampilan elemen di semua ukuran layar--termasuk desktop dan tablet. Kesalahan umum yang dilakukan adalah memungkinkan gambar memiliki lebar layar maksimum, sehingga ukuran gambar melebihi batas ukuran yang ditentukan, yang menyebabkan pengalaman buruk bagi pengguna perangkat berlayar lebar.  Secara default, elemen dengan `layout=responsive` akan menyesuaikan lebar maksimum penampung elemennya, yang sering kali ukuran lebarnya tidak dibatasi (contohnya, width=100%).  Anda dapat menyempurnakan tampilan gambar dengan hanya membatasi lebar penampungnya. Misalnya, dengan menetapkan aturan "max-width" pada "body" atau "main", Anda dapat membatasi ukuran semua gambar ke lebar maksimum tertentu.

##### Misalnya: Membatasi lebar gambar responsif

Pada contoh berikut, kami memiliki gambar bunga (640x427 piksel) yang ingin ditampilkan di semua ukuran layar, jadi kami menentukan `width` dan `height`, lalu menetapkan tata letak ke `responsive`.

<div><amp-iframe height=213 layout=fixed-height sandbox="allow-scripts allow-forms allow-same-origin" resizable src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.basic-image.embed.html"><div overflow tabindex=0 role=button aria-label="Show more">Tampilkan kode lengkap</div><div placeholder></div></amp-iframe></div>

Namun, kami ingin gambar tersebut tidak berukuran melebihi batas yang ditentukan, jadi kami menetapkan `max-width` di penampung sebesar 700 piksel melalui CSS kustom:

```html
<style amp-custom>
.resp-img {
    max-width: 700px;
  }
</style>
```

Baca lebih lanjut: Untuk mempelajari lebih lanjut tentang berbagai tata letak di AMP, lihat panduan [Kueri Tata Letak & Media]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md', locale=doc.locale).url.path}}#atribut-tata-letak).

<a id="fn1"></a>
[tip type="note"]
***Mengapa mengubah ukuran elemen agar sesuai dengan ukuran layar dikatakan rumit, padahal saya dapat melakukannya dengan mudah menggunakan gaya "width=100%"?**  Bagian rumitnya adalah merender elemen responsif di halaman tanpa memengaruhi metrik performa atau pengalaman pengguna.  Ya, Anda dapat menyesuaikan ukuran gambar dan ukuran layar dengan mudah menggunakan "width=100%", namun akan ada penurunan performa.  Browser harus mendownload gambar terlebih dahulu untuk mendapatkan dimensi gambar, lalu mengubah ukuran gambar agar sesuai dengan ukuran layar, dan pada akhirnya menyesuaikan tata letak (reflow) dan tampilan (repaint) halaman.  Di AMP,  jalur perenderan akan dioptimalkan sehingga halaman ditampilkan, dengan menetapkan gambar di samping placeholder berdasarkan dimensi yang diberikan oleh [`amp-img`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-img.md', locale=doc.locale).url.path}}) (angka tersebut digunakan untuk menetapkan rasio tinggi lebar), kemudian resource didownload, dan halaman disesuaikan tampilannya (repaint).  Tidak perlu menyesuaikan tata letak (reflow).
[/tip]

## Mengubah skala media untuk halaman

Aspek yang paling menantang saat membuat desain responsif kemungkinan adalah menampilkan media dengan benar di halaman sehingga media tersebut dapat merespons karakteristik layar.  Pada bagian ini, kita akan mengetahui cara menyematkan video dan gambar responsif di halaman AMP.

### Menyematkan video

Saat menyertakan video di halaman, Anda ingin memastikan bahwa pengguna dapat melihat konten video dan kontrol video (yaitu, tidak ada overflowing).  Biasanya, Anda memerlukan gabungan kueri media CSS, penampung, dan CSS lainnya untuk mencapai tujuan tersebut.  Di AMP, Anda hanya perlu menambahkan elemen video ke halaman dan menentukan `layout=responsive` di elemen—tanpa memerlukan CSS tambahan.

##### Contoh: Menyematkan video YouTube

Pada contoh berikut, kami ingin menampilkan video YouTube tersemat yang dapat disesuaikan dengan ukuran dan orientasi layar perangkat. Dengan menambahkan `"layout=responsive"` ke elemen [`amp-youtube`]({{g.doc('/content/amp-dev/documentation/components/reference/amp-youtube.md', locale=doc.locale).url.path}}), ukuran video akan berubah agar sesuai dengan ukuran layar perangkat, dan rasio tinggi lebar video akan disesuaikan dengan `width` dan `height` yang ditentukan.

<div>
<amp-iframe height="174" layout="fixed-height" sandbox="allow-scripts allow-forms allow-same-origin" resizable src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.youtube.embed.html"> <div overflow tabindex="0" role="button" aria-label="Show more">Tampilkan kode lengkap</div> <div placeholder></div> </amp-iframe></div>

Ada banyak jenis video yang dapat Anda tambahkan ke halaman AMP.  Untuk detailnya,  lihat daftar [komponen media]({{g.doc('/content/amp-dev/documentation/components/index.html', locale=doc.locale).url.path}}#media) yang tersedia.

### Menampilkan gambar responsif

Gambar menghasilkan byte paling besar dari keseluruhan halaman (sekitar [65% dari byte halaman](http://httparchive.org/interesting.php#bytesperpage)).  Setidaknya, gambar harus terlihat di berbagai orientasi dan ukuran layar (misalnya, pengguna tidak perlu melakukan scrolling, mencubit/melakukan zoom untuk melihat keseluruhan gambar).  Hal ini dapat dilakukan di AMP dengan mudah menggunakan atribut  `"layout=responsive"` (lihat [Menyertakan Gambar di AMP]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/media_iframes_3p/index.md', locale=doc.locale).url.path}})).  Selain gambar responsif dasar, Anda mungkin ingin menampilkan beberapa resource gambar untuk:

- [Menayangkan gambar tajam untuk resolusi yang sesuai](#menayangkan-gambar-tajam-untuk-resolusi-yang-sesuai)
- [Mengubah gambar responsif dari suatu gambar](#mengubah-gambar-responsif-dari-suatu-gambar)
- [Memberikan format gambar yang dioptimalkan](#memberikan-format-gambar-yang-dioptimalkan)

#### Menayangkan gambar tajam untuk resolusi yang sesuai

Untuk layar beresolusi tinggi (misalnya, tampilan Retina), Anda harus memberikan gambar yang tajam; namun, sebaiknya jangan menggunakan gambar yang tajam di perangkat beresolusi rendah karena akan menyebabkan waktu muat jadi lebih lama.  Di halaman non-AMP dan AMP,  Anda dapat menampilkan gambar yang sesuai untuk kepadatan piksel layar menggunakan atribut `srcset` dengan deskripsi lebar (`w`).

Catatan: Pemilih srcset berbasis DPR (`x`) juga dapat digunakan; namun, agar lebih fleksibel, sebaiknya gunakan pemilih `w`. Sebelumnya (pada proposal srcset yang lama), deskripsi `w` menjelaskan lebar viewport, namun deskripsi tersebut kini menjelaskan lebar file sumber gambar, yang memungkinkan agen pengguna menghitung kepadatan piksel yang efektif untuk setiap gambar dan memilih gambar yang sesuai untuk dirender.

##### Contoh: Menampilkan gambar tajam yang sesuai dengan ukuran layar

Pada contoh berikut, ada beberapa file gambar yang memiliki rasio tinggi lebar yang sama, namun memiliki resolusi yang berbeda.  Dengan menyediakan berbagai resolusi gambar, browser dapat memilih gambar yang paling cocok dengan resolusi perangkat.  Selain itu, kami telah menentukan ukuran untuk merender gambar :

- Untuk lebar viewport hingga 400 piksel, render gambar 100% dari lebar viewport.
- Untuk lebar viewport hingga 900 piksel, render gambar 75% dari lebar viewport.
- Untuk lebar viewport di atas 900 piksel, render gambar dengan lebar 600 piksel.

<div>
<amp-iframe height=326 layout=fixed-height sandbox="allow-scripts allow-forms allow-same-origin" resizable src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.resolution.embed.html"><div overflow tabindex=0 role=button aria-label="Show more">Tampilkan kode lengkap</div><div placeholder></div></amp-iframe></div>

Misalnya, ada perangkat yang memiliki lebar viewport 412 piksel dan DPR 2,6. Berdasarkan kode di atas, gambar harus ditampilkan 75% dari lebar viewport, jadi browser akan memilih gambar yang ukurannya mendekati 803 piksel  (412 * 0,75 * 2,6), yang akan disimpan sebagai `apple-800.jpg`.

Baca lebih lanjut: Untuk mempelajari lebih lanjut tentang cara menggunakan srcset dan sizes di AMP, lihat panduan [Gambar responsif dengan atribut srcset, sizes & heights]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md', locale=doc.locale).url.path}}).

#### Mengubah gambar responsif dari suatu gambar

Gambar responsif adalah penerapan karakteristik visual gambar untuk breakpoint tertentu.  Misalnya, bukannya mengubah skala gambar saat ukuran layar mengecil, Anda mungkin ingin menampilkan gambar versi crop yang memperkecil fokus gambar, atau Anda mungkin ingin menampilkan gambar yang sepenuhnya berbeda pada breakpoint yang berbeda.  Di HTML, Anda dapat melakukannya menggunakan elemen `picture`.  Di AMP, gambar responsif dapat dicapai menggunakan atribut `media`.

##### Contoh: Gambar berukuran berbeda untuk breakpoint yang berbeda

Pada contoh berikut, kami memiliki 3 gambar kucing yang di-crop berbeda, yang ingin ditampilkan pada breakpoint yang berbeda. Jadi, jika lebar viewport sebesar:

- 670 piksel atau lebih besar, tampilkan `cat-large.jpg` (650x340 piksel)
- 470-669 piksel,  tampilkan `cat-medium.jpg`  (450x340 piksel)
- 469 piksel atau lebih kecil, tampilkan `cat-small.jpg` (226x340 piksel)

Catatan: Karena kami menginginkan ukuran gambar tetap (misalnya, simetris), kami tidak menentukan nilai tata letak, yang secara default akan ditetapkan ke `layout=fixed` karena kami telah menetapkan lebar dan tinggi. Untuk informasi selengkapnya, lihat ["Bagaimana jika atribut tata letak tidak ditentukan?"]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout.md', locale=doc.locale).url.path}}#bagaimana-jika-atributlayout-tidak-ditetapkan?).

<div><amp-iframe height=407 layout=fixed-height sandbox="allow-scripts allow-forms allow-same-origin" resizable src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.breakpoints.embed.html"><div overflow tabindex=0 role=button aria-label="Show more">Tampilkan kode penuh</div><div placeholder></div></amp-iframe></div>

Baca lebih lanjut: Untuk mempelajari lebih lanjut tentang gambar responsif di AMP, lihat panduan [Gambar responsif dengan atribut srcset, sizes & heights]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/art_direction.md', locale=doc.locale).url.path}}).

#### Memberikan format gambar yang dioptimalkan

Menampilkan halaman yang dimuat dengan cepat memerlukan gambar yang dioptimalkan--baik dari segi ukuran, kualitas, dan format.  Selalu lakukan kompresi ukuran file ke tingkat kualitas terendah yang dapat diterima.  Ada berbagai fitur yang dapat Anda gunakan untuk "mengompresi" gambar (misalnya, [ImageAlph](http://pngmini.com/lossypng.html) atau [TinyPNG](https://tinypng.com/)).  Dari segi format gambar,  beberapa format gambar memberikan kemampuan kompresi yang lebih baik dibandingkan yang lainnya (misalnya, WebP dan JPEG XR vs JPEG).  Anda pasti ingin memberikan gambar yang paling dioptimalkan bagi pengguna, serta memastikan gambar tersebut didukung oleh browser penggguna (misalnya, [tidak semua browser mendukung semua format gambar](https://en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support)).

Di HTML, Anda dapat menampilkan format gambar yang berbeda menggunakan tag `picture`.  Di AMP, meskipun tag `picture` tidak didukung, Anda dapat menampilkan gambar yang berbeda menggunakan atribut `fallback`.

Baca lebih lanjut: Untuk mempelajari lebih lanjut tentang fallback, lihat panduan [Placeholder & Fallback]({{g.doc('/content/amp-dev/documentation/guides-and-tutorials/develop/style_and_layout/placeholders.md', locale=doc.locale).url.path}}).

##### Contoh: Menampilkan format gambar yang berbeda

Pada contoh berikut, apabila browser mendukung WebP, tampilkan mountains.webp, jika tidak menampilkan mountains.jpg.

<div>
<amp-iframe height=309 layout=fixed-height sandbox="allow-scripts allow-forms allow-same-origin" resizable src="https://ampproject-b5f4c.firebaseapp.com/examples/responsive.webp.embed.html"><div overflow tabindex=0 role=button aria-label="Show more">Tampilkan kode penuh</div><div placeholder></div></amp-iframe></div>

Sebagai tambahan yang menarik, beberapa cache, seperti Google AMP Cache, otomatis mengompresi dan mengonversi gambar menjadi WebP dan resolusi yang sesuai, jika Anda tidak melakukannya. Namun, tidak semua platform menggunakan cache, jadi Anda harus mengoptimalkan gambar secara manual sendiri.

Baca lebih lanjut: Untuk mempelajari lebih lanjut tentang pengoptimalan gambar yang diterapkan oleh Google AMP Cache, lihat entri blog ["Google AMP Cache, AMP Lite, dan kebutuhan kecepatan"](https://developers.googleblog.com/2017/01/google-amp-cache-amp-lite-and-need-for.html).

## Contoh yang dapat Anda gunakan sebagai inspirasi

Berikut beberapa contoh yang dapat Anda gunakan sebagai inspirasi untuk membuat halaman AMP responsif:

#### Produksi

- ["2016 in Focus" Getty Images ](http://www.gettyimages.com/2016/)
- [Panduan hadiah liburan BRIT + CO](http://www.brit.co/the-coolest-tech-gadget-holiday-gift-guide/amp/)
- [The Guardian](https://amp.theguardian.com/travel/2017/feb/26/trekking-holidays-in-patagonia)

#### Dibuat oleh AMP

- [Examples]({{g.doc('/content/amp-dev/documentation/examples/index.html', locale=doc.locale).url.path}})
- [Templates]({{g.doc('/content/amp-dev/documentation/templates/index.html', locale=doc.locale).url.path}})
- [Workshop Konferensi AMP Codelab: Membuat AMP yang menarik](https://codelabs.developers.google.com/codelabs/amp-beautiful-interactive-canonical)
