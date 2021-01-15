---
"$title": Membuat halaman AMP responsif
"$order": '5'
description: Desain web yang responsif adalah tentang membangun halaman web yang luwes yang menanggapi kebutuhan pengguna Anda—halaman yang pas dengan ukuran dan orientasi layar pengguna. Anda dapat mencapai ....
formats:
- websites
- email
- ads
- stories
components:
- iframe
- youtube
author: bpaduch
contributors:
- pbakaus
---

## Pendahuluan

Desain web yang responsif adalah tentang membangun halaman web yang luwes yang menanggapi kebutuhan pengguna Anda—halaman yang pas dengan orientasi dan ukuran layar perangkat pengguna. Anda dapat membuatnya dengan mudah di AMP.  AMP mendukung semua kategori perangkat dan layar, serta menyediakan komponen bawaan yang responsif.

Dalam panduan ini, kami akan menunjukkan cara menerapkan dasar-dasar komponen responsif tersebut di AMP dengan mudah:

- [Mengontrol viewport](#controlling-the-viewport)
- [Membuat tata letak responsif](#creating-a-responsive-layout)
- [Mengubah skala media](#scaling-media-for-the-page)

[video src='https://www.youtube.com/watch?v=XDvbJ2apaiA' caption='Belajar tentang desain responsif di AMP dari video ini.']

## Mengontrol viewport <a name="controlling-the-viewport"></a>

[filter formats="websites, ads, stories"] Guna mengoptimalkan halaman web sehingga konten menyesuaikan skalanya dan jendela browser untuk perangkat apa pun, Anda harus menentukan elemen viewport `meta`. Elemen viewport memberikan petunjuk kepada browser tentang cara menyesuaikan skala dan ukuran area yang terlihat (viewport) dari halaman web tersebut.

Setelan tersebut adalah setelan viewport umum yang digunakan untuk situs responsif. Meskipun `initial-scale=1` tidak diperlukan untuk halaman AMP yang valid, komponen ini direkomendasikan karena akan menetapkan level zoom ke 1 saat halaman dimuat pertama kali.

```html
<meta name="viewport" content="width=device-width" />
```

Ini adalah pengaturan viewport umum yang digunakan untuk situs responsif. Meskipun `initial-scale=1` tidak diperlukan untuk halaman AMP yang valid, komponen ini direkomendasikan karena akan menetapkan tingkat zoom ke 1 saat halaman dimuat pertama kali. [/filter]

[filter format="email"] Bagian ini hanya berlaku untuk cerita, iklan, dan situs web AMP. [/filter]

## Membuat tata letak responsif <a name="creating-a-responsive-layout"></a>

Meskipun Anda dapat membuat elemen responsif dengan mudah menggunakan `"layout=responsive"`, Anda tetap harus mempertimbangkan tampilan elemen di semua ukuran layar--termasuk desktop dan tablet. Kesalahan umum yang dilakukan adalah memungkinkan gambar memiliki lebar layar maksimum, sehingga ukuran gambar melebihi batas ukuran yang ditentukan, yang menyebabkan pengalaman buruk bagi pengguna perangkat berlayar lebar. Secara default, elemen dengan `layout=responsive` akan menyesuaikan lebar maksimum penampung elemennya, yang sering kali ukuran lebarnya tidak dibatasi (contohnya, width=100%). Anda dapat menyempurnakan tampilan gambar dengan hanya membatasi lebar penampungnya. Misalnya, dengan menetapkan aturan "max-width" pada "body" atau "main", Anda dapat membatasi ukuran semua gambar ke lebar maksimum tertentu.

Mengubah ukuran setiap elemen agar sesuai dengan ukuran layar bisa jadi rumit<sup><a href="#fn1" id="ref1">*</a></sup>. Tapi di AMP, Anda dapat membuat elemen responsif hanya dengan menentukan atribut `"layout=responsive"` beserta atribut `width` dan `height` elemen. Saat Anda menerapkan tata letak `responsive` pada sebuah elemen, elemen tersebut otomatis akan berubah ukurannya sesuai dengan lebar elemen penampungnya, dan tinggi elemen akan berubah berdasarkan rasio aspek yang ditentukan oleh `width` dan `height` elemen. Hampir semua elemen AMP mendukung tata letak `responsive`; buka dokumentasi referensi elemen untuk mengetahui tata letak apa saja yang didukung.

Meskipun Anda dapat membuat elemen responsif dengan mudah menggunakan `"layout=responsive"`, Anda tetap harus mempertimbangkan tampilan elemen di semua ukuran layar--termasuk desktop dan tablet. Kesalahan umum yang dilakukan adalah memungkinkan gambar memiliki lebar layar maksimum, sehingga ukuran gambar melebihi batas ukuran yang ditentukan, yang menyebabkan pengalaman buruk bagi pengguna perangkat berlayar lebar.  Secara default, elemen dengan `layout=responsive` akan menyesuaikan lebar maksimum penampung elemennya, yang sering kali ukuran lebarnya tidak dibatasi (contohnya, width=100%).  Anda dapat menyempurnakan tampilan gambar dengan hanya membatasi lebar penampungnya. Misalnya, dengan menetapkan aturan "max-width" pada "body" atau "main", Anda dapat membatasi ukuran semua gambar ke lebar maksimum tertentu.

##### Misalnya: Membatasi lebar gambar responsif

Pada contoh berikut ini, ada gambar bunga (640x427 piksel) yang ingin kita tampilkan di semua ukuran layar, jadi kita menentukan `width` dan `height`, lalu menetapkan tata letak menjadi `responsive`.

[example preview="top-frame" playground="true"]

```html
<div class="resp-img">
  <amp-img
    alt="flowers"
    src="{{server_for_email}}/static/inline-examples/images/flowers.jpg"
    layout="responsive"
    width="640"
    height="427"
  ></amp-img>
</div>
```

[/example]

However, we want the image to not stretch beyond its intended size, so we set the `max-width` on the container to 700 px via custom CSS:

```html
<style amp-custom>
  .resp-img {
    max-width: 700px;
  }
</style>
```

[tip type="read-on"] **READ ON –** To learn more about the different layouts in AMP, see the [Layout & Media queries](control_layout.md#the-layout-attribute) guide. [/tip]

<a id="fn1"></a> [tip type="note"] **Mengapa rumit mengubah ukuran elemen agar sesuai dengan ukuran layar, padahal saya dapat melakukannya dengan mudah menggunakan gaya `width=100%` style?**

Bagian rumitnya adalah merender elemen responsif di halaman tanpa memengaruhi metrik performa atau pengalaman pengguna. Ya, Anda dapat menyesuaikan ukuran gambar dan ukuran layar dengan mudah dengan menggunakan "width=100%", namun akan ada penurunan kinerja. Browser harus mengunduh gambar terlebih dahulu untuk mendapatkan dimensi gambar, lalu mengubah ukuran gambar agar sesuai dengan ukuran layar, dan pada akhirnya menyesuaikan tata letak (reflow) dan tampilan (repaint) halaman. Di AMP,  jalur perenderan akan dioptimalkan sehingga halaman ditampilkan, dengan menetapkan gambar di samping bakal tempat berdasarkan dimensi yang diberikan oleh [`amp-img`](../../../../documentation/components/reference/amp-img.md) (angka tersebut digunakan untuk menetapkan rasio aspek), kemudian sumber daya diunduh, dan halaman disesuaikan tampilannya (repaint). Tidak perlu menyesuaikan tata letak (reflow). [/tip]

## Mengubah skala media untuk halaman <a name="scaling-media-for-the-page"></a>

Probably the most challenging aspect of responsive design is displaying media correctly on the page so that it responds to the screen's characteristics. In this section, we'll look at how you can embed responsive videos and images on AMP pages.

### Menyematkan video

When you include a video in your web page, you want to ensure that the user can see the contents of the video and the video's controls (i.e., no overflowing). Typically, you'll achieve this with a combination of CSS media queries, a container, and other CSS. In AMP, you just need to add the video element to your page, and specify `layout=responsive` on the element—no extra CSS.

##### Contoh: Menyematkan video YouTube

Pada contoh berikut ini, kita ingin menampilkan video YouTube yang disematkan yang dapat disesuaikan dengan ukuran dan orientasi layar perangkat. Dengan menambahkan <code>"layout=responsive"</code> ke elemen <a><code>amp-youtube</code></a>, ukuran video akan berubah agar sesuai dengan ukuran layar perangkat, dan rasio aspek video akan disesuaikan dengan <code>width</code> dan <code>height</code> yang ditentukan.

[example preview="top-frame" playground="true" imports="amp-youtube:0.1"]

```html
<amp-youtube
  data-videoid="lBTCB7yLs8Y"
  layout="responsive"
  width="560"
  height="315"
>
</amp-youtube>
```

[/example]

Banyak jenis video yang dapat Anda tambahkan ke halaman AMP. Untuk mengetahui selengkapnya, kunjungi daftar <a>komponen media</a> yang tersedia.

### Menampilkan gambar responsif <a name="displaying-responsive-images"></a>

Images make up a large part of a web page (approximately [65% of the page's bytes](http://httparchive.org/interesting.php#bytesperpage)). At minimum, your images should be visible on various screen sizes and orientations (i.e., the user doesn't have to scroll, pinch/zoom to see the entire image). That's easily done in AMP via the `"layout=responsive"` attribute (see [Include Images in AMP](../../../../documentation/guides-and-tutorials/develop/media_iframes_3p/index.md)). In addition to the basic responsive image, you might want to serve multiple image resources to:

- [Menayangkan gambar tajam untuk resolusi yang sesuai](#serving-crisp-images-for-the-right-resolution)
- [Mengubah gambar responsif dari suatu gambar](#changing-the-art-direction-of-an-image)
- [Memberikan format gambar yang dioptimalkan](#providing-optimized-images)

#### Menayangkan gambar tajam untuk resolusi yang sesuai <a name="serving-crisp-images-for-the-right-resolution"></a>

For high-resolution screens (e.g., Retina display), you should provide images that look crisp and sharp; however, you don't want to use that same image on low-res devices because that'll cause unnecessary extra load time. In non-AMP and AMP pages, you can serve the correct image for the screen's pixel density by using `srcset` with the width descriptor ( `w` ).

[tip type="note"] **NOTE –** The DPR (`x`) based srcset selector also works; however, for more flexibility, we recommend using the `w` selector. Previously (in the old srcset proposal), the `w` descriptor described the viewport width, but now it describes the width of the image source file, which allows the user agent to calculate the effective pixel density of each image and choose the appropriate image to render. [/tip]

##### Contoh: Menampilkan gambar tajam yang sesuai dengan ukuran layar

Dalam contoh berikut ini, ada beberapa berkas gambar dengan rasio aspek yang sama, tetapi resolusinya berbeda. Dengan menyediakan berbagai resolusi gambar, browser dapat memilih gambar yang paling sesuai dengan resolusi perangkat. Selain itu, kami telah menentukan ukuran untuk merender gambar di:

- Untuk lebar viewport hingga 400 piksel, render gambar 100% dari lebar viewport.
- Untuk lebar viewport hingga 900 piksel, render gambar 75% dari lebar viewport.
- Untuk lebar viewport di atas 900 piksel, render gambar dengan lebar 600 piksel.

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="apple"
  src="{{server_for_email}}/static/inline-examples/images/apple.jpg"
  height="596"
  width="900"
  srcset="{{server_for_email}}/static/inline-examples/images/apple-900.jpg 900w,
            {{server_for_email}}/static/inline-examples/images/apple-800.jpg 800w,
            {{server_for_email}}/static/inline-examples/images/apple-700.jpg 700w,
            {{server_for_email}}/static/inline-examples/images/apple-600.jpg 600w,
            {{server_for_email}}/static/inline-examples/images/apple-500.jpg 500w,
            {{server_for_email}}/static/inline-examples/images/apple-400.jpg 400w"
  sizes="(max-width: 400px) 100vw,
            (max-width: 900px) 75vw, 600px"
>
</amp-img>
```

[/example]

For example, say we have a device that has a viewport width of 412 px and a DPR of 2.6. Based on the code above, the image must be displayed at 75% of the viewport width, so the browser chooses an image close to 803 px (412 _ .75 _ 2.6), which happens to be `apple-800.jpg`.

[tip type="read-on"] **READ ON –** To learn more using srcset and sizes in AMP, see the [Art direction with srcset, sizes & heights](art_direction.md) guide. [/tip]

#### Mengubah gambar responsif dari suatu gambar <a name="changing-the-art-direction-of-an-image"></a>

Art direction refers to adapting an image's visual characteristics for certain breakpoints. For example, instead of just scaling an image as the screen narrows, you might want to serve a cropped version of the image that narrows the focus of the image or you might want to serve completely different images at the different breakpoints. In HTML, you can accomplish this by using the `picture` element. In AMP, art direction can be achieved by using the `media` attribute.

##### Contoh: Gambar berukuran berbeda untuk breakpoint yang berbeda

Pada contoh berikut ini, ada 3 gambar kucing yang dipangkas, yang ingin kita tampilkan pada breakpoint yang berbeda. Jadi, jika lebar viewport sebesar:

- 670 piksel atau lebih besar, tampilkan `cat-large.jpg` (650x340 piksel)
- 470-669 piksel, tampilkan `cat-medium.jpg` (450x340 piksel)
- 469 piksel atau lebih kecil, tampilkan `cat-small.jpg` (226x340 piksel)

[tip type="note"] **NOTE –** As we wanted the images to be fixed sizes (i.e., not skew), we didn't specify a layout value, which by default will be set to `layout=fixed` because we set the width and height. For more information, see ["What if the layout attribute isn’t specified?"](control_layout.md#what-if-the-layout-attribute-isnt-specified). [/tip]

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="grey cat"
  media="(min-width: 670px)"
  width="650"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-large.jpg"
></amp-img>
<amp-img
  alt="grey cat"
  media="(min-width: 470px) and (max-width: 669px)"
  width="450"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-medium.jpg"
></amp-img>
<amp-img
  alt="grey cat"
  media="(max-width: 469px)"
  width="226"
  height="340"
  src="{{server_for_email}}/static/inline-examples/images/cat-small.jpg"
></amp-img>
```

[/example]

[tip type="read-on"] **READ ON –** To learn more about art direction in AMP, see the [Art direction with srcset, sizes & heights](art_direction.md) guide. [/tip]

#### Memberikan format gambar yang dioptimalkan <a name="providing-optimized-images"></a>

Menampilkan halaman yang dimuat dengan cepat memerlukan gambar yang dioptimalkan--baik dari segi ukuran, mutu, maupun format. Selalu kompresi ukuran berkas ke tingkat kualitas terendah yang dapat diterima. Ada berbagai fitur yang dapat Anda gunakan untuk "mengompresi" gambar (cth.: <a>ImageAlph</a> atau <a>TinyPNG</a>). Dari segi format gambar, beberapa format gambar menyediakan kemampuan kompresi yang lebih baik dibandingkan yang lainnya (ch.: WebP dan JPEG XR vs JPEG). Anda pasti ingin memberikan gambar yang paling dioptimalkan bagi pengguna, serta memastikan gambar tersebut didukung oleh browser pengguna (yaitu <a>tidak semua browser mendukung semua format gambar</a>).

Di HTML, Anda dapat menampilkan format gambar yang berbeda menggunakan tag `picture`.  Di AMP, meskipun tag `picture` tidak didukung, Anda dapat menampilkan gambar yang berbeda menggunakan atribut `fallback`.

[tip type="read-on"]Baca lebih lanjut: Untuk mempelajari lebih lanjut tentang fallback, lihat panduan [Placeholder & Fallback](placeholders.md). [/tip]

Di AMP, ada dua cara untuk mencapai penayangan gambar yang optimal:

- Pengembang yang menggunakan format gambar yang tidak didukung secara luas, seperti WebP, dapat mengonfigurasi server mereka untuk memproses tajuk `Accept` browser dan merespons dengan byte gambar serta [tajuk `Content-Type`](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/client-hints/) yang sesuai. Hal ini untuk menghindari browser mengunduh jenis gambar yang tidak didukungnya. Baca lebih lanjut tentang [negosiasi konten](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation).[sourcecode:html] Accept: image/webp,image/apng,image/_,_/\*;q=0.8 [/sourcecode]
- Berikan fallback gambar bertingkat, seperti contoh di bawah ini.

##### Contoh: Menampilkan format gambar yang berbeda

Pada contoh berikut ini, apabila browser mendukung WebP, tampilkan mountains.webp, jika tidak, tampilkan mountains.jpg.

[example preview="top-frame" playground="true"]

```html
<amp-img
  alt="Mountains"
  width="550"
  height="368"
  layout="responsive"
  src="{{server_for_email}}/static/inline-examples/images/mountains.webp"
>
  <amp-img
    alt="Mountains"
    fallback
    width="550"
    height="368"
    layout="responsive"
    src="{{server_for_email}}/static/inline-examples/images/mountains.jpg"
  ></amp-img>
</amp-img>
```

[/example]

Sebagai tambahan yang menarik, beberapa cache, seperti Cache AMP Google, otomatis mengompresi dan mengonversi gambar menjadi WebP dan resolusi yang sesuai, jika Anda tidak melakukannya. Namun, tidak semua platform menggunakan cache, jadi Anda sendiri yang harus mengoptimalkan gambar secara manual.

[tip type="read-on"] **BACA –** Untuk mempelajari lebih lanjut tentang pengoptimalan gambar yang diterapkan Cache AMP Google, kunjungi pos blog ["Cache AMP Google, AMP Lite, dan perlunya kecepatan"](https://developers.googleblog.com/2017/01/google-amp-cache-amp-lite-and-need-for.html). [/tip]

## Contoh yang dapat Anda gunakan sebagai inspirasi

Berikut ini adalah beberapa contoh yang dapat Anda gunakan sebagai inspirasi untuk membuat halaman AMP responsif:

#### Produksi

- [Getty Images "2016 in Focus" ](http://www.gettyimages.com/2016/)
- [BRIT + CO's holiday gift guide](http://www.brit.co/the-coolest-tech-gadget-holiday-gift-guide/amp/)
- [The Guardian](https://amp.theguardian.com/travel/2017/feb/26/trekking-holidays-in-patagonia)

#### Dibuat oleh AMP

- [Examples](../../../../documentation/examples/index.html)
- [Templates](../../../../documentation/templates/index.html)
- [AMP Conf Workshop Codelab: Making beautiful AMPs](https://codelabs.developers.google.com/codelabs/amp-beautiful-interactive-canonical)
